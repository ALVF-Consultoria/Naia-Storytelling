import { StoryRepository } from "../repositories/StoryRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { GeminiService } from "./GeminiService.js";
import { ImagenService } from "./ImagenService.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class StoryService {
    static async generateStory(prompt: string, userId: number, visualStyle?: string): Promise<any> {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('Server configuration error: API Key missing');
        }

        const user = await UserRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // 1. Gerar a história estruturada usando o GeminiService
        console.log("Gerando história estruturada...");
        const parsed = await GeminiService.generateStructuredStory(prompt, visualStyle);

        // Identificador temporário para nomear as imagens antes de salvar no banco
        const tempId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();

        // 2. Otimizar prompts de imagem em lote (Batch) para economizar requisições
        console.log("Otimizando prompts de imagem em lote...");
        const optimizedPrompts = await GeminiService.optimizeImagePromptsBatch(parsed.chapters, visualStyle || "Cinematográfico");

        // 3. Gerar imagens para cada capítulo usando ImagenService
        const chaptersWithImages = [];
        const uploadDir = path.join(__dirname, "../../public/uploads/stories");

        for (let i = 0; i < parsed.chapters.length; i++) {
            const chap = parsed.chapters[i];
            const optimizedPrompt = optimizedPrompts[i] || `A scene from chapter ${chap.chapterNumber}`;

            try {
                console.log(`Gerando imagem para o capítulo ${chap.chapterNumber}...`);
                
                // Agora gera a imagem via Imagen usando o prompt já otimizado
                const imgBase64 = await ImagenService.generateImage(optimizedPrompt);
                
                if (imgBase64) {
                    const fileName = `story_temp_${tempId}_ch_${chap.chapterNumber}.jpg`;
                    const filePath = path.join(uploadDir, fileName);
                    fs.writeFileSync(filePath, Buffer.from(imgBase64, 'base64'));
                    
                    chaptersWithImages.push({
                        ...chap,
                        imageUrl: `/uploads/stories/${fileName}`
                    });
                } else {
                    chaptersWithImages.push({ ...chap, imageUrl: null });
                }
            } catch (err) {
                console.error(`Erro no fluxo de imagem do capítulo ${chap.chapterNumber}:`, err);
                chaptersWithImages.push({ ...chap, imageUrl: null });
            }
        }

        return { 
            title: parsed.title, 
            synopsis: parsed.synopsis,
            chapters: chaptersWithImages,
            prompt: prompt,
            visualStyle: visualStyle
        };
    }

    static async saveGeneratedStory(data: any, userId: number) {
        const user = await UserRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const story = StoryRepository.create({
            prompt: data.prompt,
            title: data.title,
            synopsis: data.synopsis,
            content: JSON.stringify({
                title: data.title,
                synopsis: data.synopsis,
                chapters: data.chapters
            }),
            chapters: data.chapters,
            visualStyle: data.visualStyle,
            user: user
        });

        return await StoryRepository.save(story);
    }

    static async getUserStories(userId: number) {
        return await StoryRepository.findByUser(userId);
    }

    static async deleteStory(storyId: number, userId: number) {
        const result = await StoryRepository.deleteByIdAndUser(storyId, userId);

        if (!result) {
            throw new Error("História não encontrada ou sem permissão para excluir.");
        }

        return result;
    }

    static async translateStory(storyId: number, targetLanguage: string, userId: number) {
        // 1. Buscar a história original
        const originalStory = await StoryRepository.findOne({
            where: { id: storyId, user: { id: userId } },
            relations: ["user"] // Garantir que temos o usuário para clonar
        });

        if (!originalStory) {
            throw new Error("História original não encontrada.");
        }

        console.log(`Traduzindo história ${storyId} para ${targetLanguage}...`);

        // 2. Traduzir a história inteira de uma vez (Batch)
        const translatedData = await GeminiService.translateStoryStructured(
            {
                title: originalStory.title,
                synopsis: originalStory.synopsis,
                chapters: originalStory.chapters
            },
            targetLanguage
        );

        // 3. Preservar URLs de imagens e metadados originais ao montar os novos capítulos
        const originalChapters = originalStory.chapters || [];
        const finalTranslatedChapters = translatedData.chapters.map((tChap: any, index: number) => ({
            ...originalChapters[index], // Mantém imageUrl e chapterNumber
            title: tChap.title,
            content: tChap.content
        }));

        // 4. Criar a NOVA história clonada com os textos traduzidos
        const newStory = StoryRepository.create({
            prompt: `[TRADUÇÃO - ${targetLanguage}] ${originalStory.prompt}`,
            title: translatedData.title,
            synopsis: translatedData.synopsis,
            chapters: finalTranslatedChapters,
            content: JSON.stringify({ 
                title: translatedData.title, 
                synopsis: translatedData.synopsis, 
                chapters: finalTranslatedChapters 
            }),
            visualStyle: originalStory.visualStyle,
            user: originalStory.user
        });
        

        return await StoryRepository.save(newStory);
    }
}

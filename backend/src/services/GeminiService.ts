import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
    private static apiKey = process.env.GEMINI_API_KEY!;
    private static modelName = process.env.STORY_MODEL || "gemini-2.5-flash";
    private static genAI = new GoogleGenerativeAI(GeminiService.apiKey);

    static async generateStructuredStory(prompt: string, visualStyle?: string): Promise<any> {
        const model = this.genAI.getGenerativeModel({ 
            model: this.modelName,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: this.getStorySchema() as any
            }
        });

        const systemPrompt = `
        Você é um mestre contador de histórias. 
        Gere uma história completa dividida estritamente em 5 capítulos.
        Cada capítulo deve ser um objeto separado dentro do array 'chapters'.
        Não retorne a história como um texto único.
        O estilo visual para as ilustrações será: ${visualStyle || 'Cinematográfico'}.
        `;

        try {
            const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`);
            const response = await result.response;
            const text = response.text();
            
            if (!text) throw new Error("IA retornou resposta vazia.");
            return this.parseAndValidateStory(text);
        } catch (error: any) {
            console.error("Erro no Gemini Service (SDK Estável):", error.message || error);
            throw new Error("Falha na geração da história via SDK estável.");
        }
    }

    static async optimizeImagePrompt(chapterContent: string, style: string): Promise<string> {
        try {
            const model = this.genAI.getGenerativeModel({ model: this.modelName });
            const result = await model.generateContent(`Crie um prompt de imagem altamente detalhado em INGLÊS para o seguinte trecho de história, no estilo ${style}. Responda APENAS o prompt: "${chapterContent}"`);
            const response = await result.response;
            return response.text()?.trim() || "";
        } catch (error: any) {
            console.error("Erro ao otimizar prompt de imagem:", error.message || error);
            return `A scene from a story: ${chapterContent.substring(0, 50)}... in ${style} style`;
        }
    }

    static async optimizeImagePromptsBatch(chapters: any[], style: string): Promise<string[]> {
        try {
            const model = this.genAI.getGenerativeModel({ 
                model: this.modelName,
                generationConfig: { responseMimeType: "application/json" }
            });

            const chaptersText = chapters.map(c => `Capítulo ${c.chapterNumber}: ${c.content}`).join("\n\n");
            const result = await model.generateContent(`Para cada um dos capítulos a seguir, crie um prompt de imagem altamente detalhado em INGLÊS no estilo ${style}. Retorne APENAS um array JSON de strings, onde cada string é o prompt para o capítulo correspondente na ordem.\n\n${chaptersText}`);
            const response = await result.response;
            
            let text = response.text() || "";
            if (text.startsWith("```json")) {
                text = text.replace(/```json|```/g, "").trim();
            }
            const parsed = JSON.parse(text);
            return Array.isArray(parsed) ? parsed : chapters.map(() => "");
        } catch (error: any) {
            console.error("Erro ao otimizar prompts de imagem em lote:", error.message || error);
            return chapters.map(c => `A scene from a story: ${c.content.substring(0, 50)}... in ${style} style`);
        }
    }

    static async translateText(text: string, targetLanguage: string): Promise<string> {
        try {
            const model = this.genAI.getGenerativeModel({ model: this.modelName });
            const result = await model.generateContent(`Translate the following text to ${targetLanguage}. Return ONLY the translated text, no quotes, no explanations: "${text}"`);
            const response = await result.response;
            return response.text()?.trim() || text;
        } catch (error: any) {
            console.error("Erro ao traduzir texto:", error.message || error);
            return text; // Fallback para o texto original
        }
    }

    static async translateStoryStructured(storyData: any, targetLanguage: string): Promise<any> {
        try {
            const model = this.genAI.getGenerativeModel({ 
                model: this.modelName,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: this.getStorySchema() as any
                }
            });

            const result = await model.generateContent(`Traduza a seguinte história para ${targetLanguage}. Mantenha exatamente a mesma estrutura JSON e chaves. Traduza os campos 'title', 'synopsis' e os campos 'title' e 'content' de cada capítulo no array 'chapters'.\n\n${JSON.stringify(storyData)}`);
            const response = await result.response;
            
            let text = response.text() || "";
            if (text.startsWith("```json")) {
                text = text.replace(/```json|```/g, "").trim();
            }
            return JSON.parse(text);
        } catch (error: any) {
            console.error("Erro ao traduzir história estruturada:", error.message || error);
            throw error;
        }
    }

    private static getStorySchema() {
        return {
            description: "Esquema para uma história estruturada de 5 capítulos",
            type: 'object',
            properties: {
                title: { type: 'string' },
                synopsis: { type: 'string' },
                chapters: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            chapterNumber: { type: 'number' },
                            title: { type: 'string' },
                            content: { type: 'string' }
                        },
                        required: ["chapterNumber", "title", "content"]
                    }
                }
            },
            required: ["title", "synopsis", "chapters"]
        };
    }

    private static parseAndValidateStory(text: string): any {
        let parsed: any;
        try {
            let cleaned = text.trim();
            if (cleaned.startsWith("```json")) {
                cleaned = cleaned.replace(/```json|```/g, "").trim();
            }
            parsed = JSON.parse(cleaned);
        } catch (e) {
            console.error("Erro ao dar parse no JSON do Gemini:", text);
            throw new Error("Falha na geração estruturada da história: Resposta não é um JSON válido.");
        }

        // Fallback de Divisão Automática
        if (!parsed.chapters || !Array.isArray(parsed.chapters) || parsed.chapters.length < 5) {
            console.warn("IA falhou na estrutura de array. Tentando divisão automática...");
            const fullStory = parsed.story || parsed.content || (typeof parsed === 'string' ? parsed : "");
            if (fullStory) {
                const chapterRegex = /Capítulo\s*(\d+)\s*[:\-\.]?\s*([^\n\.]+)?\n?([\s\S]*?)(?=Capítulo\s*\d+|$)/gi;
                const matches = [...fullStory.matchAll(chapterRegex)];
                if (matches.length > 0) {
                    parsed.chapters = matches.map((match: any, index: number) => ({
                        chapterNumber: index + 1,
                        title: match[2]?.trim() || `Capítulo ${index + 1}`,
                        content: match[3]?.trim() || match[0].trim()
                    })).slice(0, 5);
                }
            }
        }

        // Fallback bruto
        if (!parsed.chapters || !Array.isArray(parsed.chapters) || parsed.chapters.length === 0) {
             const parts = (parsed.story || text).split(/\n\s*\n/).filter((p: string) => p.length > 20);
             parsed.chapters = parts.slice(0, 5).map((p: string, i: number) => ({
                 chapterNumber: i + 1,
                 title: `Parte ${i + 1}`,
                 content: p.trim()
             }));
        }

        return parsed;
    }
}

export class ImagenService {
    private static apiKey = process.env.IMAGE_API_KEY;
    private static modelName = process.env.IMAGE_MODEL || "google/gemini-2.5-flash-image";
    private static isEnabled = process.env.ENABLE_IMAGE_GENERATION === "true";

    static async generateImage(prompt: string): Promise<string | null> {
        if (!this.isEnabled) {
            console.log("⏸️ Geração de imagens desabilitada temporariamente.");
            return null;
        }

        if (!this.apiKey) {
            console.warn("⚠️ IMAGE_API_KEY não configurada. Nenhuma imagem será gerada.");
            return null;
        }

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "Naia Storytelling",
                },
                body: JSON.stringify({
                    // O modelo agora é parametrizado pelo .env para facilitar trocas futuras
                    model: this.modelName, 
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    modalities: ["image"]
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error(`Erro da API OpenRouter (${response.status}):`, errorData);
                return null;
            }

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const message = data.choices[0].message;
                let imageUrlOrBase64 = "";

                // 1. O OpenRouter mais recente retorna a imagem num array 'images'
                if (message.images && message.images.length > 0) {
                    imageUrlOrBase64 = message.images[0].image_url?.url || "";
                } 
                // 2. Fallback caso a imagem venha via markdown no 'content' (ex: ![alt](url))
                else if (message.content) {
                    const content = message.content;
                    const markdownMatch = content.match(/!\[.*?\]\((.*?)\)/);
                    imageUrlOrBase64 = markdownMatch ? markdownMatch[1] : content;
                }

                if (!imageUrlOrBase64) return null;

                // Se retornar um Data URL (data:image/...;base64,...)
                if (imageUrlOrBase64.startsWith("data:image")) {
                    return imageUrlOrBase64.split(",")[1];
                }

                // Se retornar uma URL pública, fazemos o fetch e convertemos para base64
                // Pois o StoryService espera uma string base64 para salvar o arquivo
                if (imageUrlOrBase64.startsWith("http")) {
                    const imgRes = await fetch(imageUrlOrBase64);
                    const arrayBuffer = await imgRes.arrayBuffer();
                    return Buffer.from(arrayBuffer).toString('base64');
                }
                
                // Se já for puramente base64
                return imageUrlOrBase64;
            }

            console.warn("OpenRouter SDK não retornou imagens para o prompt:", prompt);
            return null;
        } catch (error: any) {
            console.error("Erro no OpenRouter Image Service:", error.message || error);
            return null;
        }
    }
}

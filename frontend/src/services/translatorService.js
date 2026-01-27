import { promptAPI } from "./promptAPI";

export async function translateText(text, targetLanguage, onProgress) {
  try {
    // Simula progresso simples, já que a API não fornece stream de progresso exato facilmente aqui
    if (onProgress) onProgress(10);
    
    // Mapeamento simples de códigos para nomes de idioma para melhor prompt
    const langMap = {
      'en': 'English',
      'pt': 'Portuguese',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'ja': 'Japanese',
      'zh': 'Chinese',
      'ru': 'Russian'
    };
    
    const langName = langMap[targetLanguage] || targetLanguage;

    const prompt = `Translate the following text to ${langName}.
IMPORTANT: Return ONLY the translated text. Do not add explanations, quotes or preambles.
Text to translate:
"${text}"`;

    if (onProgress) onProgress(30);

    const translatedText = await promptAPI(prompt);

    if (onProgress) onProgress(100);

    return translatedText.trim();
  } catch (err) {
    console.error("Translation Error:", err);
    throw new Error("Failed to translate text via AI.");
  }
}

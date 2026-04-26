// --- VARIÁVEIS GLOBAIS DA API ---
// Agora aponta para o backend local (Vercel ou similar)
const API_URL = "/api/generate";

// --- FUNÇÕES DE CHECKAGEM E CRIAÇÃO ---

/**
 * Verifica a disponibilidade do modelo.
 * No caso da API Cloud, assumimos que está 'ready' se a chave estiver configurada no backend.
 */
export async function checkModelAvailability() {
    // Para simplificar a migração e manter compatibilidade com componentes existentes,
    // retornamos 'ready' simulando que o modelo está pronto.
    // O erro real aparecerá na hora de gerar se a chave estiver faltando.
    return "ready";
}

/**
 * Função principal para enviar um prompt, agora via API.
 */
export async function promptAPI(promptText, visualStyle = "Cinematográfico") {
    try {
        const token = localStorage.getItem("naia_token");
        const headers = {
            "Content-Type": "application/json",
        };
        
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ 
                prompt: promptText,
                visualStyle: visualStyle 
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        // Retornamos tudo agora: text, chapters, title, etc.
        return data;
    } catch (err) {
        console.error("Erro na promptAPI:", err);
        return `[ERRO] Falha ao comunicar com a IA: ${err.message}. Verifique se a chave de API está configurada e o backend rodando.`;
    }
}

// Mantendo compatibilidade de exportação se houver outras chamadas
export async function getSession() {
    return {
        prompt: async (text) => {
            return await promptAPI(text);
        }
    };
}

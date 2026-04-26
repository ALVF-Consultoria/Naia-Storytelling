// --- VARIÁVEIS GLOBAIS DA API ---
const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${API_BASE_URL}/api/generate`;

// --- FUNÇÕES DE CHECKAGEM E CRIAÇÃO ---

/**
 * Verifica a disponibilidade do modelo.
 */
export async function checkModelAvailability() {
    return "ready";
}

/**
 * Função principal para enviar um prompt.
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
        return data;
    } catch (err) {
        console.error("Erro na promptAPI:", err);
        throw err; // Agora lançamos o erro para o componente tratar
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

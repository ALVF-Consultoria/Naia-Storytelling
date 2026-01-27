import { useEffect, useState } from "react";
// Importa as funções do arquivo JS
import { checkModelAvailability, promptAPI } from "../services/promptAPI";

const Chat = () => {
    // Note que não usamos mais <ModelState | "loading">. O tipo agora é inferido.ds
    const [modelState, setModelState] = useState("loading");
    const [promptInput, setPromptInput] = useState("");
    const [response, setResponse] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Verifica a disponibilidade do modelo ao montar o componente
    useEffect(() => {
        const check = async () => {
            // O retorno de checkModelAvailability é uma string JS simples
            const state = await checkModelAvailability();
            setModelState(state);
        };
        check();
    }, []);

    const handleSendPrompt = async () => {

      setPromptInput('')
        // Checagem de segurança e estado
        if (!promptInput.trim() || isProcessing || modelState !== 'ready') {
            return;
        }

        setIsProcessing(true);
        // MELHORIA UX: Limpa a resposta anterior e mostra "Processando..."
        setResponse("Processando..."); 

        try {
            const res = await promptAPI(promptInput);
            setResponse(res);
        } catch (error) {
            console.error("Erro ao chamar promptAPI:", error);
            setResponse("Erro inesperado ao processar o prompt.");
        } finally {
            setIsProcessing(false);
        }
    };

    // Helper para determinar se a ação principal deve ser desabilitada
    const isSendDisabled = modelState !== 'ready' || isProcessing || !promptInput.trim();

    const getStatusMessage = () => {
        switch (modelState) {
            case 'loading':
                return 'Verificando a disponibilidade do modelo...';
            case 'ready':
                return 'O modelo está pronto. Envie um prompt!';
            case 'available':
                return 'O modelo está disponível, mas não totalmente carregado. Pode ficar pronto em breve. Tente recarregar a página.';
            case 'downloadable':
                return 'O modelo precisa ser baixado. Verifique chrome://components e atualize o "On Device Model".';
            default:
                return 'O modelo não está disponível. Certifique-se de estar no Chrome 127+ com as flags de IA ativadas.';
        }
    };
    
    // Função para determinar a cor do badge de status
    const getStatusBadgeClass = () => {
        switch (modelState) {
            case 'ready':
                return 'bg-green-100 text-green-800';
            case 'available':
                return 'bg-blue-100 text-blue-800';
            case 'loading':
            case 'downloading':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-red-100 text-red-800';
        }
    };


    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
            <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold text-gray-800">Teste da IA Embutida do Chrome (Gemini Nano)</h1>
                <div className="mt-4 flex items-center gap-3">
                    <p className="font-semibold text-gray-700">Status do Modelo:</p>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${getStatusBadgeClass()}`}>
                        {modelState.toUpperCase()}
                    </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 italic">{getStatusMessage()}</p>

                {response && (
                    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm animate-fade-in">
                        <strong className="font-semibold text-gray-700">Resposta:</strong>
                        <p className="mt-2 whitespace-pre-wrap text-gray-800">{response}</p>
                    </div>
                )}

                <div className="mt-6">
                    <input
                        type="text"
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder="Digite seu prompt aqui"
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
              
                    />
                    <button
                        onClick={handleSendPrompt}
                        className="mt-3 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                        disabled={isSendDisabled}
                    >
                        {isProcessing ? "Processando..." : "Enviar Prompt"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Chat;


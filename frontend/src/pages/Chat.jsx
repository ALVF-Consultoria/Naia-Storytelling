import { useEffect, useState } from "react";
import { checkModelAvailability, promptAPI } from "../services/promptAPI";
import ThemeToggle from "../components/ThemeToggle";

const Chat = () => {
    const [modelState, setModelState] = useState("loading");
    const [promptInput, setPromptInput] = useState("");
    const [response, setResponse] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const check = async () => {
            const state = await checkModelAvailability();
            setModelState(state);
        };
        check();
    }, []);

    const handleSendPrompt = async () => {
        if (!promptInput.trim() || isProcessing || modelState !== 'ready') return;

        setIsProcessing(true);
        setResponse("Processando..."); 

        try {
            const res = await promptAPI(promptInput);
            setResponse(res);
            setPromptInput(''); // Limpa apenas após o sucesso
        } catch (error) {
            console.error("Erro ao chamar promptAPI:", error);
            setResponse("Erro inesperado ao processar o prompt.");
        } finally {
            setIsProcessing(false);
        }
    };

    const isSendDisabled = modelState !== 'ready' || isProcessing || !promptInput.trim();

    const getStatusMessage = () => {
        switch (modelState) {
            case 'loading': return 'Verificando conectividade com o backend...';
            case 'ready': return 'A IA está pronta para responder! Envie seu prompt.';
            default: return 'IA indisponível. Verifique a API ou sua conta.';
        }
    };
    
    const getStatusBadgeClass = () => {
        switch (modelState) {
            case 'ready': return 'bg-green-500/10 text-green-400 border border-green-500/20';
            case 'loading': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
            default: return 'bg-red-500/10 text-red-400 border border-red-500/20';
        }
    };

    return (
        <div className="bg-background min-h-screen flex items-center justify-center pt-24 pb-32 px-4 transition-colors duration-300">
            <ThemeToggle className="fixed bottom-6 left-6 z-50" />

            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-100">
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-magic/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-auto p-8 bg-surface shadow-2xl rounded-2xl border border-white/5 backdrop-blur-md">
                <h1 className="text-3xl font-display font-bold text-primary">Chat Teste NAIA</h1>
                <div className="mt-4 flex items-center gap-3">
                    <p className="font-semibold text-secondary">Status:</p>
                    <span className={`px-3 py-1 text-sm font-bold rounded-lg ${getStatusBadgeClass()}`}>
                        {modelState.toUpperCase()}
                    </span>
                </div>
                <p className="mt-2 text-sm text-muted italic">{getStatusMessage()}</p>

                {response && (
                    <div className="mt-6 p-6 bg-surface-light border border-white/10 rounded-xl shadow-inner animate-fade-in transition-all">
                        <strong className="font-semibold text-primary">Resposta:</strong>
                        <p className="mt-2 whitespace-pre-wrap text-secondary leading-relaxed font-sans">{response}</p>
                    </div>
                )}

                <div className="mt-6 space-y-3">
                    <input
                        type="text"
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder="Digite o que deseja da IA..."
                        className="w-full p-4 bg-surface-light border border-white/10 text-primary rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-magic focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                    <button
                        onClick={handleSendPrompt}
                        className="w-full px-6 py-4 bg-magic text-primary font-bold rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out hover:-translate-y-1"
                        disabled={isSendDisabled}
                    >
                        {isProcessing ? "Processando feitiço..." : "Enviar Prompt ✦"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;

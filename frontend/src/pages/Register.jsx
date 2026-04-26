import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "../components/ThemeToggle";
import { Eye, EyeOff } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null); // 'username' | 'email' | 'password' | null
    const [error, setError] = useState("");
    const { register, login, setIsLogoFocused } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const blurTimeoutRef = useRef(null);

    // Limpar timeout ao desmontar
    useEffect(() => {
        return () => {
            if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validação de Username no Cliente
        const usernameRegex = /^[a-zA-Z0-9._]+$/;
        if (!usernameRegex.test(username)) {
            setError("Username inválido! Use apenas letras, números, ponto (.) ou underline (_). Espaços não são permitidos.");
            return;
        }
        
        const res = await register(username, email, password);
        if (res.success) {
            setIsLogoFocused(false);
            await login(email, password);
            navigate("/create-history");
        } else {
            setError(res.message);
        }
    };

    // Mapeamento de posições da logo (usando layoutId para voo contínuo)
    const getLogoStyles = () => {
        // Posições de foco (Relativas ao FORM)
        // x: -60 posiciona a logo à esquerda do início do input 'do lado'
        const commonStyles = { position: 'absolute', opacity: 1, scale: 0.7, x: -60, left: 0 };
        
        if (focusedField === 'username') return { ...commonStyles, y: 12 };
        if (focusedField === 'email') return { ...commonStyles, y: 96 };
        if (focusedField === 'password') return { ...commonStyles, y: 180 };
        
        return commonStyles;
    };

    const handleFocus = (field) => {
        if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
        setFocusedField(field);
        setIsLogoFocused(true);
    };

    const handleBlur = () => {
        blurTimeoutRef.current = setTimeout(() => {
            setFocusedField(null);
            setIsLogoFocused(false);
        }, 100); // Pequeno delay para permitir que o handleFocus do próximo campo cancele isso
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 transition-colors duration-500 overflow-x-hidden">
            <ThemeToggle className="fixed bottom-6 left-6 z-50" />
            
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[15%] right-[15%] w-[450px] h-[450px] bg-accent/10 rounded-full blur-[110px] animate-pulse"></div>
                <div className="absolute bottom-[15%] left-[15%] w-[350px] h-[350px] bg-magic/10 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-sm py-12 flex flex-col items-center">
                
                <div className="w-full mt-24">
                    <h2 className="text-4xl font-display font-black text-primary mb-1 text-center tracking-tighter">NAIA</h2>
                    <p className="text-muted text-center mb-10 text-sm">Crie seu legado digital.</p>
                    
                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs text-center animate-shake">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6 relative">
                        {/* LOGO ESTABILIZADA: Só renderiza quando há foco para evitar caminhos erráticos */}
                        {focusedField && (
                            <Motion.img 
                                layoutId="main-logo"
                                src="/imgs/logos/naia-logo-curto-reduzida.png" 
                                alt="Logo" 
                                animate={getLogoStyles()}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 25,
                                    mass: 1
                                }}
                                className="z-50 w-12 h-12 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                            />
                        )}

                        <div className="relative group">
                            <label className={`absolute left-0 -top-6 text-xs font-bold transition-all duration-300 ${focusedField === 'username' ? 'text-magic' : 'text-muted'}`}>
                                {t('register.username_label')}
                            </label>
                            <input 
                                type="text" 
                                required
                                value={username}
                                onFocus={() => handleFocus('username')}
                                onBlur={handleBlur}
                                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                                className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 text-primary text-lg focus:outline-none focus:border-magic transition-all placeholder:text-white/5"
                                placeholder={t('register.username_placeholder')}
                            />
                        </div>

                        <div className="relative group">
                            <label className={`absolute left-0 -top-6 text-xs font-bold transition-all duration-300 ${focusedField === 'email' ? 'text-magic' : 'text-muted'}`}>
                                {t('register.email_label')}
                            </label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onFocus={() => handleFocus('email')}
                                onBlur={handleBlur}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 text-primary text-lg focus:outline-none focus:border-magic transition-all placeholder:text-white/5"
                                placeholder={t('register.email_placeholder')}
                            />
                        </div>

                        <div className="relative group">
                            <label className={`absolute left-0 -top-6 text-xs font-bold transition-all duration-300 ${focusedField === 'password' ? 'text-magic' : 'text-muted'}`}>
                                {t('register.password_label')}
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onFocus={() => handleFocus('password')}
                                    onBlur={handleBlur}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-white/10 text-primary text-lg focus:outline-none focus:border-magic transition-all placeholder:text-white/5"
                                    placeholder={t('register.password_placeholder')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors p-2"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            className="w-full px-6 py-4 mt-8 bg-magic text-primary rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] active:scale-95 group overflow-hidden relative"
                        >
                            <span className="relative z-10">{t('register.submit')}</span>
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                    </form>

                    <div className="mt-12 space-y-4 text-center">
                        <p className="text-secondary text-sm">
                            Já possui acesso? <Link to="/login" className="text-magic font-bold hover:underline">Fazer Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateSession = async () => {
            const storedToken = localStorage.getItem("naia_token");
            const storedUser = localStorage.getItem("naia_user");
            
            if (storedToken) {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
                        headers: { "Authorization": `Bearer ${storedToken}` }
                    });

                    if (response.ok) {
                        const contentType = response.headers.get("content-type");
                        if (contentType && contentType.includes("application/json")) {
                            const data = await response.json();
                            setToken(storedToken);
                            setUser(data.user);
                        }
                    } else {
                        // Se o token for inválido/expirado, desloga
                        logout();
                    }
                } catch (error) {
                    console.error("Erro ao validar sessão:", error);
                    // Em caso de erro de rede, podemos manter o estado local ou deslogar dependendo da política
                }
            } else if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        validateSession();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const contentType = response.headers.get("content-type");
            let data = {};
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            }

            if (!response.ok) {
                throw new Error(data.error || "Erro no Login");
            }

            setToken(data.token);
            setUser(data.user);
            localStorage.setItem("naia_token", data.token);
            localStorage.setItem("naia_user", JSON.stringify(data.user));

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const contentType = response.headers.get("content-type");
            let data = {};
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            }

            if (!response.ok) {
                throw new Error(data.error || "Erro no Cadastro");
            }

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const [isLogoFocused, setIsLogoFocused] = useState(false);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("naia_token");
        localStorage.removeItem("naia_user");
    };

    return (
        <AuthContext.Provider value={{ 
            user, token, loading, login, register, logout,
            isLogoFocused, setIsLogoFocused 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

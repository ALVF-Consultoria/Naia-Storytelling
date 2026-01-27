import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage or default to 'dark'
        const saved = localStorage.getItem('naia-theme');
        return saved || 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        console.log("Theme changing to:", theme); // DEBUG
        if (theme === 'dark') {
            root.classList.add('dark');
            console.log("Added dark class to HTML");
        } else {
            root.classList.remove('dark');
            console.log("Removed dark class from HTML");
        }
        localStorage.setItem('naia-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

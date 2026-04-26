import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full shadow-lg border transition-all duration-300 z-50 bg-surface border-muted/20 hover:border-accent ${theme === 'dark'
                    ? 'text-yellow-400'
                    : 'text-orange-500'
                } ${className}`}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>
    );
};

export default ThemeToggle;

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full shadow-lg border transition-all duration-300 z-50 ${theme === 'dark'
                    ? 'bg-gray-800 text-yellow-400 border-gray-700 hover:bg-gray-700'
                    : 'bg-white text-orange-500 border-gray-200 hover:bg-gray-50'
                } ${className}`}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>
    );
};

export default ThemeToggle;

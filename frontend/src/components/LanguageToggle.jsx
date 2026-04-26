import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageToggle = ({ className = "" }) => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'pt' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 bg-surface/80 border border-muted/20 rounded-full shadow-md hover:border-accent transition-all text-primary text-xs font-bold ${className}`}
        >
            <span className={i18n.language === 'en' ? 'text-accent' : 'text-secondary/50'}>🇺🇸 EN</span>
            <div className="h-4 w-px bg-muted/30 mx-1"></div>
            <span className={i18n.language === 'pt' ? 'text-accent' : 'text-secondary/50'}>🇧🇷 PT</span>
        </motion.button>
    );
};

export default LanguageToggle;

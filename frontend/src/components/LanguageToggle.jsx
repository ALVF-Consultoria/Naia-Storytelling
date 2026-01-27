
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
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
            className="fixed top-[10%] right-6 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all text-white text-xs font-bold"
        >
            <span className={i18n.language === 'en' ? 'opacity-100' : 'opacity-50 text-xs'}>🇺🇸 EN</span>
            <div className="h-4 w-[1px] bg-white/30 mx-1"></div>
            <span className={i18n.language === 'pt' ? 'opacity-100' : 'opacity-50 text-xs'}>🇧🇷 PT</span>
        </motion.button>
    );
};

export default LanguageToggle;

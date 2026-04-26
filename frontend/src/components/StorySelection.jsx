import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, MessageSquareText, Sparkles } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const StorySelection = ({ onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-display font-black text-primary mb-4 tracking-tight">
          <Trans 
            i18nKey="selection.title" 
            components={[<span className="text-magic" />]}
          />
        </h2>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          {t('selection.subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Opção Formulário */}
        <motion.button
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('form')}
          className="group relative bg-surface border border-white/5 p-8 rounded-3xl shadow-2xl hover:border-magic/30 transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-magic/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-magic/20 transition-colors" />
          
          <div className="w-16 h-16 bg-magic/20 rounded-2xl flex items-center justify-center text-magic mb-6 group-hover:scale-110 transition-transform">
            <Wand2 size={32} />
          </div>
          
          <h3 className="text-2xl font-bold text-primary mb-3">{t('selection.form_title')}</h3>
          <p className="text-secondary leading-relaxed mb-6">
            {t('selection.form_desc')}
          </p>
          
          <div className="flex items-center gap-2 text-magic font-bold text-sm">
            <span>{t('selection.form_btn')}</span>
            <motion.span 
              animate={{ x: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </div>
        </motion.button>

        {/* Opção Chatbot */}
        <motion.button
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('chat')}
          className="group relative bg-surface border border-white/5 p-8 rounded-3xl shadow-2xl hover:border-accent/30 transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/20 transition-colors" />
          
          <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
            <MessageSquareText size={32} />
          </div>
          
          <h3 className="text-2xl font-bold text-primary mb-3">{t('selection.chat_title')}</h3>
          <p className="text-secondary leading-relaxed mb-6">
            {t('selection.chat_desc')}
          </p>
          
          <div className="flex items-center gap-2 text-accent font-bold text-sm">
            <span>{t('selection.chat_btn')}</span>
            <motion.span 
              animate={{ x: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </div>
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex justify-center items-center gap-2 text-muted text-sm font-medium"
      >
        <Sparkles size={16} className="text-magic" />
        <span>{t('selection.footer')}</span>
      </motion.div>
    </div>
  );
};

export default StorySelection;

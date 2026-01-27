// src/components/IdeaLamp.jsx
import React, { useState } from "react";
import { Lamp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { promptAPI } from "../services/promptAPI";
import { useTranslation } from "react-i18next";

import logo from '../assets/logos/naia-logo-curto.png';

const IdeaLamp = ({ currentStepData }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    try {
      const prompt = `
You are Naia, a creative AI muse helping a user write a story.
The user is currently working on the step: "${currentStepData?.title || "Story Planning"}".
Context/Description of this step: "${currentStepData?.description || ""}".

User Question: "${question}"

Respond in the user's language (detect from question). Be concise, inspiring, and helpful. Give 2-3 creative ideas if asked.
`;

      const response = await promptAPI(prompt);
      setAnswer(response);
      setQuestion(""); // limpa o input após enviar
    } catch (err) {
      console.error(err);
      setAnswer("Error processing your question. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Janela AI (Renderizada ANTES do botão para aparecer ACIMA) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-80 bg-[#0a0a1a]/95 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)] p-4 flex flex-col gap-3 border border-blue-500/30"
          >
            <h4 className="font-bold text-blue-400 text-lg flex items-center gap-2 drop-shadow-sm opacity-90">
              {t('idea_lamp.title')}
            </h4>

            {/* Resposta da IA com scroll */}
            {answer && (
              <div className="max-h-40 overflow-y-auto p-2 bg-white/5 border border-white/10 rounded-lg text-gray-200 whitespace-pre-wrap text-sm leading-relaxed scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
                {answer}
              </div>
            )}

            {/* Input da pergunta */}
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t('idea_lamp.placeholder')}
              className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            <button
              onClick={handleAsk}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg py-2 font-bold hover:scale-[1.02] transition shadow-lg"
            >
              {isLoading ? t('idea_lamp.button_loading') : t('idea_lamp.button')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão da logo */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ scale: 1.2 }}
        className={`cursor-pointer p-0 rounded-full relative z-10 transition-shadow duration-300 ${isOpen ? "shadow-[0_0_30px_#3b82f6]" : "shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          }`}
      >
        <img src={logo} alt="NAIA AI" className="w-16 h-16 drop-shadow-md" />
      </motion.button>
    </div>
  );
};

export default IdeaLamp;

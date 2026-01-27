import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import EbookViewer from "../components/EbookViewer";
import { useStory } from "../context/StoryContext";
import ThemeToggle from "../components/ThemeToggle";

const FlipbookPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { storyData, storyTitle } = useStory();

  if (!storyData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#050510] text-gray-900 dark:text-white transition-colors duration-300 font-['Inter']">
        <ThemeToggle className="fixed top-6 right-6" />
        <p className="text-xl mb-4 opacity-80">{t('my_stories.empty_title')}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all"
        >
          {t('create_story.buttons.back')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-100 dark:bg-[#050510] flex flex-col justify-center items-center transition-colors duration-500 font-['Inter']">

      {/* Theme Toggle */}
      <ThemeToggle className="fixed top-24 right-6 z-50 md:top-6" />

      {/* Background Glow Effect (Safe CSS) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none dark:bg-blue-600/15 animate-pulse"></div>

      {/* Floating Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-2xl dark:drop-shadow-[0_20px_60px_rgba(59,130,246,0.25)]"
        >
          <EbookViewer storyText={storyData} storyTitle={storyTitle} />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mt-10 px-8 py-3 bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white font-semibold rounded-full shadow-lg hover:bg-white dark:hover:bg-white/20 transition-all duration-300"
        >
          {t('create_story.buttons.back')}
        </motion.button>
      </motion.div>

    </div>
  );
};

export default FlipbookPage;

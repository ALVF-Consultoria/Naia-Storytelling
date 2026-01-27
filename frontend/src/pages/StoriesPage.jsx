import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import StoryCard from "../components/StoryCard";
import { useStory } from "../context/StoryContext";
import { jsPDF } from "jspdf";
import TranslateModal from "../components/TranslateModal";
import TranslationOverlay from "../components/TranslationOverlay";
import { translateText } from "../services/translatorService";
import ThemeToggle from "../components/ThemeToggle";
import { useTranslation } from "react-i18next";

const StoriesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setFinalStory } = useStory();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showTranslateModal, setShowTranslateModal] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);

  // Delete Modal State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    setStories(savedStories);
  }, []);

  const handleDeleteStory = (id) => {
    setStoryToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (storyToDelete) {
      const updated = stories.filter((story) => story.id !== storyToDelete);
      setStories(updated);
      localStorage.setItem("stories", JSON.stringify(updated));
    }
    setShowDeleteConfirm(false);
    setStoryToDelete(null);
  };

  const handleOpenFlipbook = (story) => {
    setFinalStory(story.text, story.title);
    navigate("/flipbook");
  };

  const handleViewStory = (story) => {
    setFinalStory(story.text, story.title);
    navigate("/history-view");
  };

  const handleDownloadPDF = (story) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const pageHeight = doc.internal.pageSize.getHeight();
    const lineHeight = 18;

    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text(story.title || "Untitled Story", pageWidth / 2 + margin, 70, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const paragraphs = story.text.split(/\n\s*\n/);
    let y = 110;

    paragraphs.forEach((paragraph) => {
      const lines = doc.splitTextToSize(paragraph.trim(), pageWidth);
      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });
      y += lineHeight;
    });

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2 + margin, pageHeight - 30, { align: "center" });
    }

    doc.save(`${story.title?.replace(/\s+/g, "_") || "story"}.pdf`);
  };

  const openTranslateModal = (story) => {
    setSelectedStory(story);
    setShowTranslateModal(true);
  };

  const handleTranslateStory = async (language) => {
    setShowTranslateModal(false);
    if (!selectedStory) return;

    setIsTranslating(true);
    setTranslationProgress(0);

    try {
      // 1️⃣ Translate title
      const translatedTitle = await translateText(selectedStory.title, language);

      // 2️⃣ Split into paragraphs and translate each
      const paragraphs = selectedStory.text.split(/\n\s*\n/);
      const translatedParagraphs = [];

      for (let i = 0; i < paragraphs.length; i++) {
        const translatedPara = await translateText(paragraphs[i], language, (prog) => {
          const overallProgress = Math.floor(((i + prog / 100) / paragraphs.length) * 100);
          setTranslationProgress(overallProgress);
        });
        translatedParagraphs.push(translatedPara);
      }

      const translatedText = translatedParagraphs.join("\n\n");

      const newStory = {
        id: Date.now(),
        title: translatedTitle || `${selectedStory.title} (${language.toUpperCase()})`,
        text: translatedText,
      };

      const updatedStories = [...stories, newStory];
      setStories(updatedStories);
      localStorage.setItem("stories", JSON.stringify(updatedStories));
    } catch (error) {
      console.error("Error translating the story:", error);
    } finally {
      setIsTranslating(false);
      setTranslationProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#050510] pt-28 px-6 pb-32 transition-colors duration-300">
      <ThemeToggle className="fixed bottom-6 left-6" />

      <h1 className="text-3xl sm:text-5xl font-black text-center mb-16 tracking-tighter text-indigo-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-500 dark:to-indigo-500 dark:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
        {t('my_stories.title')}
      </h1>

      {stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-[60vh] bg-transparent dark:bg-white/5 rounded-2xl dark:border dark:border-white/10 dark:backdrop-blur-sm max-w-2xl mx-auto p-8">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">{t('my_stories.empty_desc')}</p>
          <button
            onClick={() => navigate("/create-history")}
            className="px-6 py-3 bg-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 text-white rounded-lg dark:rounded-full hover:scale-105 transition-all font-bold shadow-md dark:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            {t('my_stories.create_btn')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onOpenFlipbook={handleOpenFlipbook}
              onViewStory={handleViewStory}
              onDownloadPDF={() => handleDownloadPDF(story)}
              onDelete={handleDeleteStory}
              onTranslate={() => openTranslateModal(story)}
            />
          ))}
        </div>
      )}

      {/* Language selection modal */}
      <TranslateModal
        isOpen={showTranslateModal}
        onClose={() => setShowTranslateModal(false)}
        onTranslate={handleTranslateStory}
        isTranslating={isTranslating}
        progress={translationProgress}
      />

      {/* Progress overlay */}
      <TranslationOverlay visible={isTranslating} progress={translationProgress} />

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 transition-opacity animate-in fade-in">
          <div className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-white/10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Story?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;

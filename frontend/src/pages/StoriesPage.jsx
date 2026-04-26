import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoryCard from "../components/StoryCard";
import { useStory } from "../hooks/useStory";
import { jsPDF } from "jspdf";
import TranslateModal from "../components/TranslateModal";
import TranslationOverlay from "../components/TranslationOverlay";
import ThemeToggle from "../components/ThemeToggle";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const StoriesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setFinalStory } = useStory();
  const { token } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showTranslateModal, setShowTranslateModal] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/stories`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setStories(data);
        }
      } catch (err) {
        console.error("Erro ao carregar histórias:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchStories();
  }, [token]);

  const handleDeleteStory = (id) => {
    setStoryToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (storyToDelete && token) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/stories/${storyToDelete}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          setStories(stories.filter((s) => s.id !== storyToDelete));
        }
      } catch (err) {
        console.error("Erro ao deletar:", err);
      }
    }
    setShowDeleteConfirm(false);
    setStoryToDelete(null);
  };

  const handleOpenFlipbook = (story) => {
    setFinalStory(story);
    navigate("/flipbook");
  };

  const handleViewStory = (story) => {
    setFinalStory(story);
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
    doc.text(story.title || "Minha História", pageWidth / 2 + margin, 70, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    let y = 110;

    // Adicionar Sinopse se houver
    if (story.synopsis) {
      doc.setFont("times", "italic");
      const synopsisLines = doc.splitTextToSize(story.synopsis, pageWidth);
      synopsisLines.forEach(line => {
        if (y + lineHeight > pageHeight - margin) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += lineHeight;
      });
      y += 20;
    }

    const chapters = story.chapters || [];
    doc.setFont("times", "normal");

    chapters.forEach((chap) => {
      // Título do Capítulo
      if (y + 40 > pageHeight - margin) { doc.addPage(); y = margin; }
      doc.setFont("times", "bold");
      doc.text(chap.title || `Capítulo ${chap.chapterNumber}`, margin, y);
      y += lineHeight + 5;

      doc.setFont("times", "normal");
      const lines = doc.splitTextToSize(chap.content || "", pageWidth);
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
      doc.text(`Página ${i} de ${totalPages}`, pageWidth / 2 + margin, pageHeight - 30, { align: "center" });
    }

    doc.save(`${story.title?.replace(/\s+/g, "_") || "story"}.pdf`);
  };

  const openTranslateModal = (story) => {
    setSelectedStory(story);
    setShowTranslateModal(true);
  };

  const handleTranslateStory = async (language) => {
    setShowTranslateModal(false);
    if (!selectedStory || !token) return;

    setIsTranslating(true);
    setTranslationProgress(0);

    try {
      // Simulação de progresso para UX
      setTranslationProgress(10);
      
      const response = await fetch(`${API_BASE_URL}/api/stories/${selectedStory.id}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ language })
      });

      setTranslationProgress(60);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao traduzir história no servidor");
      }

      const newStory = await response.json();
      setTranslationProgress(100);

      // Adiciona a NOVA história traduzida no topo da lista
      setStories([newStory, ...stories]);
      
    } catch (error) {
      console.error("Erro ao traduzir história:", error);
      alert("Falha na tradução: " + error.message);
    } finally {
      setIsTranslating(false);
      setTranslationProgress(0);
      setSelectedStory(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-28 px-6 pb-32 transition-colors duration-300">
      <ThemeToggle className="fixed bottom-6 left-6 z-50" />

      <h1 className="text-3xl sm:text-5xl font-display font-bold text-center mb-16 text-primary drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        {t('my_stories.title')}
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <div className="w-12 h-12 border-4 border-magic border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-secondary animate-pulse">Carregando suas aventuras...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-[60vh] bg-surface rounded-2xl border border-white/5 backdrop-blur-sm max-w-2xl mx-auto p-8 shadow-2xl">
          <p className="text-secondary text-lg mb-6">{t('my_stories.empty_desc')}</p>
          <button
            onClick={() => navigate("/create-history")}
            className="px-6 py-3 bg-magic text-primary rounded-lg hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all font-bold"
          >
            {t('my_stories.create_btn')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
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

      <TranslateModal
        isOpen={showTranslateModal}
        onClose={() => setShowTranslateModal(false)}
        onTranslate={handleTranslateStory}
        isTranslating={isTranslating}
        progress={translationProgress}
      />

      <TranslationOverlay visible={isTranslating} progress={translationProgress} />

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 transition-opacity fade-in">
          <div className="bg-surface p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-white/5">
            <h3 className="text-xl font-display font-bold text-primary mb-2">Excluir História?</h3>
            <p className="text-secondary mb-6">Esta ação apagará esse registro do banco de dados.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-primary font-medium hover:bg-surface-light rounded-lg transition-colors border border-transparent"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600/80 hover:bg-red-600 border border-red-500/50 text-white font-bold rounded-lg shadow-md transition-transform hover:-translate-y-1"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;

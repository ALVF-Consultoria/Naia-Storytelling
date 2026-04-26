import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useStory } from "../hooks/useStory";
import { jsPDF } from "jspdf";
import { Maximize, Minimize } from "lucide-react";

import AmbientBackground from "../components/AmbientBackground";
import ReadingProgress from "../components/ReadingProgress";
import StoryNarrator from "../components/StoryNarrator";
import StoryChapter from "../components/StoryChapter";

const HistoryView = () => {
  const navigate = useNavigate();
  const { storyChapters, storyTitle, storySynopsis } = useStory();
  const [isSaved, setIsSaved] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const scrollRef = useRef(null);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const pageHeight = doc.internal.pageSize.getHeight();
    const lineHeight = 18;

    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text(storyTitle || "Minha História", pageWidth / 2 + margin, 70, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    let y = 110;

    if (storySynopsis) {
      doc.setFont("times", "italic");
      const lines = doc.splitTextToSize(storySynopsis, pageWidth);
      lines.forEach(line => {
          if (y + lineHeight > pageHeight - margin) { doc.addPage(); y = margin; }
          doc.text(line, margin, y);
          y += lineHeight;
      });
      y += 20;
    }

    doc.setFont("times", "normal");
    storyChapters.forEach((chap) => {
      if (y + 40 > pageHeight - margin) { doc.addPage(); y = margin; }
      doc.setFont("times", "bold");
      doc.text(chap.title || `Capítulo ${chap.chapterNumber}`, margin, y);
      y += lineHeight + 5;

      doc.setFont("times", "normal");
      const lines = doc.splitTextToSize(chap.content.trim(), pageWidth);
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

    doc.save(`${storyTitle?.replace(/\s+/g, "_") || "story"}.pdf`);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!storyChapters || storyChapters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-center px-4">
        <p className="text-secondary mb-4">Nenhuma história estruturada foi gerada ainda.</p>
        <button
          onClick={() => navigate("/create-history")}
          className="px-6 py-3 bg-magic text-primary rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          Voltar para Geração
        </button>
      </div>
    );
  }

  const fullStoryText = `${storyTitle}. ${storySynopsis ? storySynopsis + "." : ""} ${storyChapters.map(c => `${c.title}. ${c.content}`).join(" ")}`;

  return (
    <div 
      ref={scrollRef}
      className={`bg-background p-4 sm:p-6 pb-32 flex flex-col items-center relative transition-all duration-700
        ${isFocusMode 
          ? "fixed inset-0 z-50 overflow-y-auto pt-20" 
          : "min-h-screen pt-40 lg:pt-36"
        }
      `}
    >
      <AmbientBackground isFocusMode={isFocusMode} />
      <ReadingProgress containerRef={isFocusMode ? scrollRef : null} />

      {!isFocusMode && <ThemeToggle className="fixed bottom-6 left-6 z-50 transition-transform active:scale-95" />}
      
      {/* Action Bar (Sticky) */}
      <div className={`fixed z-50 flex items-center gap-3 transition-all duration-500
        ${isFocusMode 
          ? "bottom-6 right-4 sm:bottom-auto sm:top-6 sm:right-6" 
          : "bottom-6 right-4 sm:bottom-auto sm:top-32 sm:right-10"}
      `}>
        <StoryNarrator textToRead={fullStoryText} />
        
        <button
          onClick={() => setIsFocusMode(!isFocusMode)}
          className="flex items-center justify-center w-10 h-10 bg-surface border border-white/10 rounded-full shadow-lg text-primary hover:text-magic hover:bg-white/5 transition-colors backdrop-blur-sm"
          title={isFocusMode ? "Sair do Modo Foco" : "Modo Foco"}
        >
          {isFocusMode ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>

      <div className={`w-full bg-surface p-6 sm:p-10 shadow-2xl border border-white/5 relative z-10 transition-all duration-700
        ${isFocusMode ? "max-w-3xl rounded-none sm:rounded-2xl border-x-0 sm:border-x bg-surface/95 backdrop-blur-md" : "max-w-4xl rounded-2xl"}
      `}>
        
        <header className="mb-10 text-center sm:text-left border-b border-white/5 pb-8">
            <h1 className="text-4xl sm:text-5xl font-display font-black text-primary mb-4 drop-shadow-md tracking-tight">
                {storyTitle}
            </h1>
            {storySynopsis && (
                <p className="text-lg text-muted italic leading-relaxed max-w-2xl">
                    "{storySynopsis}"
                </p>
            )}
        </header>

        <main className="space-y-16">
            {storyChapters.map((chap, index) => (
                <StoryChapter key={index} chap={chap} />
            ))}
        </main>

        {!isFocusMode && (
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-10">
            <button
              onClick={() => navigate("/flipbook")}
              className="w-full py-4 bg-magic text-primary font-bold rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 hidden md:flex"
            >
              📚 Livro Animado
            </button>

            <button
              onClick={handleDownloadPDF}
              className="w-full py-4 bg-accent text-primary font-bold rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              ⬇️ Baixar PDF
            </button>

            <button
              onClick={handleSave}
              className={`w-full py-4 font-bold rounded-xl transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${
                  isSaved ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]" : "bg-blue-600 text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
              }`}
            >
              {isSaved ? "✅ História Salva!" : "💾 Salvar História"}
            </button>

            <button
              onClick={() => navigate("/create-history")}
              className="w-full py-4 bg-surface-light border border-white/10 text-primary font-bold rounded-xl hover:bg-white/10 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              🔁 Nova História
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;

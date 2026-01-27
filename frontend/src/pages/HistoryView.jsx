import React, { useState } from "react";
import { useNavigate } from "react-router";
import EditWord from "../components/EditWord";
import ThemeToggle from "../components/ThemeToggle";
import SaveStoryButton from "../components/SaveStoryButton";
import { useStory } from "../context/StoryContext";
import { jsPDF } from "jspdf";

const HistoryView = () => {
  const navigate = useNavigate();
  const { storyData, storyTitle } = useStory();
  const [story, setStory] = useState(storyData || "");
  const [showEditModal, setShowEditModal] = useState(false);

  // ✅ Function updated to correctly download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const pageHeight = doc.internal.pageSize.getHeight();
    const lineHeight = 18;

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text(storyTitle || "My Story", pageWidth / 2 + margin, 70, {
      align: "center",
    });

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    // Split text into paragraphs based on double line breaks
    const paragraphs = story.split(/\n\s*\n/);
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

      y += lineHeight; // extra space between paragraphs
    });

    // Footer with page numbers
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2 + margin,
        pageHeight - 30,
        { align: "center" }
      );
    }

    doc.save(`${storyTitle?.replace(/\s+/g, "_") || "story"}.pdf`);
  };

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-gray-600 mb-4">No story has been generated yet.</p>
        <button
          onClick={() => navigate("/create-history")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go Back and Create Story
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050510] p-4 sm:p-6 pb-32 flex flex-col items-center mt-16 text-gray-900 dark:text-white transition-colors duration-300">
      <ThemeToggle className="fixed bottom-6 left-6" />

      <div className="w-full max-w-3xl bg-white dark:bg-white/5 dark:backdrop-blur-md p-6 rounded-xl shadow-lg dark:shadow-[0_0_30px_rgba(37,99,235,0.2)] relative border border-gray-200 dark:border-white/10 transition-all duration-300">
        {/* Header with buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
          <SaveStoryButton storyText={story} title={storyTitle} />

          <button
            onClick={() => setShowEditModal(true)}
            className="py-2 px-3 bg-yellow-500/80 text-white rounded-lg hover:bg-yellow-500 transition font-semibold shadow w-full sm:w-auto backdrop-blur-sm"
          >
            ✨ Refine Story
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black mb-4 text-center sm:text-left tracking-tighter text-blue-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-400 dark:to-white drop-shadow-md">
          📖 {storyTitle}
        </h2>

        {/* Story content */}
        <div className="h-[60vh] sm:h-[70vh] overflow-y-auto border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0a0a1a]/50 p-6 rounded-lg mb-6 whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed font-serif text-lg shadow-inner scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
          {story}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/flipbook")}
            className="w-full py-3 bg-purple-600 dark:bg-purple-600/80 text-white font-bold rounded-xl hover:bg-purple-700 dark:hover:bg-purple-600 transition duration-300 shadow-lg dark:backdrop-blur-md hover:scale-[1.02]"
          >
            📚 View as Flipbook
          </button>

          <button
            onClick={handleDownloadPDF}
            className="w-full py-3 bg-green-600 dark:bg-green-600/80 text-white font-bold rounded-xl hover:bg-green-700 dark:hover:bg-green-600 transition duration-300 shadow-lg dark:backdrop-blur-md hover:scale-[1.02]"
          >
            ⬇️ Download as PDF
          </button>

          <button
            onClick={() => navigate("/create-history")}
            className="w-full py-3 bg-gray-200 dark:bg-gray-700/80 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 shadow-lg dark:backdrop-blur-md hover:scale-[1.02] border border-transparent dark:border-gray-600"
          >
            🔁 Create New Story
          </button>
        </div>
      </div>

      {/* Refine Story Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Refine Story</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-800 font-bold"
              >
                ✕
              </button>
            </div>
            <EditWord storyText={story} setStoryText={setStory} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryView;

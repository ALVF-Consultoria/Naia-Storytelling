import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const SaveStoryButton = ({ storyText, title = "My Story" }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSaveStory = () => {
    if (!storyText || storyText.trim().length === 0) return;

    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];

    const newStory = {
      id: Date.now(),
      title,
      text: storyText,
      createdAt: new Date().toLocaleString(),
    };

    const updatedStories = [newStory, ...savedStories];
    localStorage.setItem("stories", JSON.stringify(updatedStories));

    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000); // Auto close after 2s
  };

  return (
    <>
      <button
        onClick={handleSaveStory}
        className="px-4 py-2 bg-blue-600 dark:bg-blue-600/80 text-white font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300 shadow-lg flex items-center gap-2"
      >
        💾 Save Story
      </button>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
          <div className="bg-white dark:bg-[#1a1a2e] border border-green-500/30 px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center gap-3 animate-in fade-in zoom-in duration-300">
            <CheckCircle className="text-green-500 w-8 h-8" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Saved!</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Story saved to your library.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveStoryButton;

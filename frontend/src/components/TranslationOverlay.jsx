import React from "react";

const TranslationOverlay = ({ visible, progress }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center text-white">
      <div className="p-8 rounded-xl shadow-lg flex flex-col items-center gap-6 w-96">
        <h2 className="text-2xl font-bold">Traduzindo História</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-200 mt-2">{progress}%</p>
      </div>
    </div>
  );
};

export default TranslationOverlay;

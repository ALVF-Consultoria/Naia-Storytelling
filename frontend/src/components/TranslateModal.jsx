import React, { useState, useEffect } from "react";

const TranslateModal = ({ isOpen, onClose, onTranslate, isTranslating, progress }) => {
  const [language, setLanguage] = useState("pt"); // default to Portuguese for convenience

  useEffect(() => {
    if (!isTranslating) setLanguage("pt");
  }, [isTranslating]);

  if (!isOpen) return null;

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "en", name: "English" },
    { code: "pt", name: "Portuguese (Brazil)" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">
          🌍 Translate Story
        </h2>

        {!isTranslating ? (
          <>
            <label className="block text-gray-700 mb-2">Select language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => onTranslate(language)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Translate
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-4">Translating story...</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 text-center">{progress}%</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TranslateModal;

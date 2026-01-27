import React, { useState } from "react";
import { promptAPI } from "../services/promptAPI"; // your AI call function

const EditWord = ({ storyText, setStoryText }) => {
  const [findWord, setFindWord] = useState("");
  const [replaceWord, setReplaceWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReplace = async () => {
    if (!findWord || !replaceWord) return;
    setLoading(true);

    try {
      // Adjusted prompt to return ONLY the updated text
      const prompt = `
Replace all occurrences of the word "${findWord}" with "${replaceWord}" in the text below.
Return only the updated text, without comments, explanations, or repetitions of the prompt.
Original text: """${storyText}"""
`;

      const rawResponse = await promptAPI(prompt);

      // Clean possible code blocks ```...```
      let updatedStory = rawResponse.trim();
      if (updatedStory.startsWith("```")) {
        const firstLineBreak = updatedStory.indexOf("\n");
        const lastBackticks = updatedStory.lastIndexOf("```");
        updatedStory = updatedStory.substring(firstLineBreak + 1, lastBackticks).trim();
      }
      setStoryText(updatedStory);
      setFindWord("");
      setReplaceWord("");
    } catch (err) {
      console.error(err);
      alert("Error updating the story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-[#0a0a1a] rounded-lg shadow-md w-full max-w-2xl border border-gray-700">
      <label className="text-gray-300">
        Find word:
        <input
          type="text"
          value={findWord}
          onChange={(e) => setFindWord(e.target.value)}
          className="bg-[#1a1a2e] border border-gray-700 p-2 rounded w-full mt-1 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Word to be replaced"
        />
      </label>

      <label className="text-gray-300">
        Replace with:
        <input
          type="text"
          value={replaceWord}
          onChange={(e) => setReplaceWord(e.target.value)}
          className="bg-[#1a1a2e] border border-gray-700 p-2 rounded w-full mt-1 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="New word"
        />
      </label>

      <button
        onClick={handleReplace}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 transition shadow-lg"
      >
        {loading ? "Updating..." : "Apply"}
      </button>
    </div>
  );
};

export default EditWord;

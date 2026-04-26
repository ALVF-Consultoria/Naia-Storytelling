import React, { useState } from "react";
import { StoryContext } from "./StoryContext";

export const StoryProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [storyData, setStoryData] = useState(""); // texto bruto
  const [storyTitle, setStoryTitle] = useState("Minha História"); // título
  const [storyChapters, setStoryChapters] = useState([]); // capítulos com imagens
  const [storySynopsis, setStorySynopsis] = useState(""); // sinopse
  const [isGenerating, setIsGenerating] = useState(false);

  const updateFormData = (partial) => setFormData((prev) => ({ ...prev, ...partial }));

  const setFinalStory = (data) => {
    setStoryData(data.text || "");
    setStoryTitle(data.title || "Minha História");
    setStoryChapters(data.chapters || []);
    setStorySynopsis(data.synopsis || "");
  };

  return (
    <StoryContext.Provider
      value={{
        formData,
        updateFormData,
        storyData,
        storyTitle,
        storyChapters,
        storySynopsis,
        setFinalStory,
        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

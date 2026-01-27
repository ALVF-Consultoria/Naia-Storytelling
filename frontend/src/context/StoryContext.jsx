import React, { createContext, useContext, useState } from "react";

const StoryContext = createContext(null);

export const StoryProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [storyData, setStoryData] = useState(""); // texto da história
  const [storyTitle, setStoryTitle] = useState("Minha História"); // título
  const [isGenerating, setIsGenerating] = useState(false);

  const updateFormData = (partial) => setFormData((prev) => ({ ...prev, ...partial }));

  const setFinalStory = (storyText, title = "Minha História") => {
    setStoryData(storyText);
    setStoryTitle(title);
  };

  return (
    <StoryContext.Provider
      value={{
        formData,
        updateFormData,
        storyData,
        storyTitle,
        setFinalStory,
        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("useStory must be used within StoryProvider");
  return ctx;
};

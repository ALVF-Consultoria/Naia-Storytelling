import React from "react";
import StoryForm from "../components/StoryForm";
import StoryGenerationOverlay from "../components/StoryGenerationOverlay";
import { promptAPI } from "../services/promptAPI";
import { buildStoryPrompt } from "../utils/buildStoryPrompt";
import { useStory } from "../hooks/useStory";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import IdeaLamp from "../components/IdeaLamp";
import { stepsConfig } from "../constants/storySteps";

const CreateHistory = () => {
  const { formData, setFinalStory, isGenerating, setIsGenerating } = useStory();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = React.useState(1); // 1-based index

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    try {
      const prompt = buildStoryPrompt(formData);
      // Passamos o prompt e o estilo visual opcional
      const result = await promptAPI(prompt, formData.visualStyle);

      setFinalStory(result);
      navigate("/history-view");
    } catch (error) {
      console.error("Error generating the story:", error);
      alert("Error generating the story. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start pt-24 pb-32 px-4 sm:px-8 relative">
      <ThemeToggle className="fixed bottom-6 left-6 z-50" />

      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-100">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-magic/5 rounded-full blur-[100px]"></div>
      </div>

      <StoryForm onSubmit={handleGenerateStory} onStepChange={setCurrentStepIndex} />

      <IdeaLamp currentStepData={stepsConfig[currentStepIndex - 1]} />

      <StoryGenerationOverlay visible={isGenerating} />
    </div>
  );
};

export default CreateHistory;

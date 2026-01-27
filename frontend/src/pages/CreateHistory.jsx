import React from "react";
import StoryForm from "../components/StoryForm";
import StoryGenerationOverlay from "../components/StoryGenerationOverlay";
import { promptAPI } from "../services/promptAPI";
import { buildStoryPrompt } from "../utils/buildStoryPrompt";
import { useStory } from "../context/StoryContext";
import { useNavigate } from "react-router";
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

      console.log(prompt)

      const response = await promptAPI(prompt);

      console.log(response)

      // Clean possible code blocks ```...```
      let cleaned = response.trim();
      if (cleaned.startsWith("```")) {
        const firstLineBreak = cleaned.indexOf("\n");
        const lastBackticks = cleaned.lastIndexOf("```");
        cleaned = cleaned.substring(firstLineBreak + 1, lastBackticks).trim();
      }

      // If it returns JSON {"title": "...", "story": "..."}
      let storyText = cleaned;
      let title = formData.title || "My Story";

      try {
        const parsed = JSON.parse(cleaned);
        if (parsed.story) storyText = parsed.story;
        if (parsed.title) title = parsed.title;
      } catch {
        // if not JSON, assume plain text
      }

      // Save in context
      setFinalStory(storyText, title);

      // Navigate to story view
      navigate("/history-view");
    } catch (error) {
      console.error("Error generating the story:", error);
      alert("Error generating the story. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050510] flex flex-col items-center justify-start pt-24 pb-32 px-4 sm:px-8 relative transition-colors duration-300">
      <ThemeToggle className="fixed bottom-6 left-6 z-50" />

      {/* Background Glow (Dark Mode Only) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-300">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <StoryForm onSubmit={handleGenerateStory} onStepChange={setCurrentStepIndex} />
      </div>

      <IdeaLamp currentStepData={stepsConfig[currentStepIndex - 1]} />

      <StoryGenerationOverlay visible={isGenerating} />
    </div>
  );
};

export default CreateHistory;

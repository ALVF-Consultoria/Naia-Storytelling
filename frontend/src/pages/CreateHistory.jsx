import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StoryForm from "../components/StoryForm";
import StoryGenerationOverlay from "../components/StoryGenerationOverlay";
import { promptAPI } from "../services/promptAPI";
import { buildStoryPrompt } from "../utils/buildStoryPrompt";
import { useStory } from "../hooks/useStory";
import ThemeToggle from "../components/ThemeToggle";
import IdeaLamp from "../components/IdeaLamp";
import { stepsConfig } from "../constants/storySteps";
import StorySelection from "../components/StorySelection";
import StoryChat from "../components/StoryChat";

const CreateHistory = () => {
  const { formData, setFinalStory, isGenerating, setIsGenerating } = useStory();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = React.useState(1); 
  const [creationMode, setCreationMode] = React.useState(null); // null, 'form', 'chat'
  const [isChatComplete, setIsChatComplete] = React.useState(false);

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    try {
      const prompt = buildStoryPrompt(formData);
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-start pt-24 pb-32 px-4 sm:px-8 relative overflow-x-hidden">
      <ThemeToggle className="fixed bottom-6 left-6 z-50" />

      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-100">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-magic/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Mode Selection */}
      {!creationMode && (
        <StorySelection onSelect={setCreationMode} />
      )}

      {/* Form Mode */}
      {creationMode === 'form' && (
        <StoryForm onSubmit={handleGenerateStory} onStepChange={setCurrentStepIndex} />
      )}

      {/* Chat Mode */}
      {creationMode === 'chat' && (
        <div className="w-full flex flex-col items-center gap-6">
          <StoryChat 
            onBack={() => setCreationMode(null)} 
            onComplete={() => setIsChatComplete(true)} 
          />
          
          {isChatComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleGenerateStory}
              className="px-12 py-4 bg-linear-to-r from-magic to-accent text-white font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 group"
            >
              🚀 Gerar História Mágica
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
          )}
        </div>
      )}

      {/* Solo IdeaLamp in Form Mode */}
      {creationMode === 'form' && (
        <IdeaLamp currentStepData={stepsConfig[currentStepIndex - 1]} />
      )}

      <StoryGenerationOverlay visible={isGenerating} />
    </div>
  );
};

export default CreateHistory;

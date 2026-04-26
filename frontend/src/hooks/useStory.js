import { useContext } from "react";
import { StoryContext } from "../context/StoryContext";

export const useStory = () => {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("useStory must be used within StoryProvider");
  return ctx;
};

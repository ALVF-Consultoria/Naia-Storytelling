import React, { useState, useEffect } from 'react';
import { Play, Square, Pause } from 'lucide-react';

const StoryNarrator = ({ textToRead }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (!window.speechSynthesis) return alert("Seu navegador não suporta narração por voz.");

    if (isPlaying && !isPaused) {
      // Pause
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPlaying && isPaused) {
      // Resume
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      // Start fresh
      window.speechSynthesis.cancel(); // clear queue
      const utterance = new SpeechSynthesisUtterance(textToRead);
      // Optional: try to set a specific language if needed
      utterance.lang = 'pt-BR'; 
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-surface border border-white/10 rounded-full px-4 py-2 shadow-lg backdrop-blur-sm">
      <button 
        onClick={handlePlayPause}
        className="text-primary hover:text-magic transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5"
        title={isPlaying && !isPaused ? "Pausar Narração" : "Ouvir História"}
      >
        {isPlaying && !isPaused ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
      </button>
      
      {isPlaying && (
        <button 
          onClick={handleStop}
          className="text-red-400 hover:text-red-500 transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5"
          title="Parar Narração"
        >
          <Square size={16} />
        </button>
      )}
      
      {!isPlaying && <span className="text-xs text-muted font-medium pr-2">Ouvir</span>}
      {isPlaying && <span className="text-xs text-magic font-medium pr-2 animate-pulse">{isPaused ? "Pausado" : "Lendo..."}</span>}
    </div>
  );
};

export default StoryNarrator;

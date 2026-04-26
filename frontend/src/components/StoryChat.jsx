import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, ArrowLeft } from 'lucide-react';
import { stepsConfig, visualStyles } from '../constants/storySteps';
import { useStory } from '../hooks/useStory';

import { useTranslation } from 'react-i18next';

const StoryChat = ({ onBack, onComplete }) => {
  const { t } = useTranslation();
  const { updateFormData } = useStory();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [currentFieldIdx, setCurrentFieldIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial greeting and first question
  useEffect(() => {
    const startChat = async () => {
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1000));
      
      setMessages([{
        id: Date.now(),
        role: 'bot',
        content: t('chat.intro')
      }]);
      setIsTyping(false);
    };
    startChat();
  }, [t]);

  const handleSend = async (val) => {
    const userMessage = val || inputValue.trim();
    if (!userMessage && stepsConfig[currentStepIdx].fields[currentFieldIdx].type !== 'visual_selector') return;

    const currentStep = stepsConfig[currentStepIdx];
    const currentField = currentStep.fields[currentFieldIdx];

    // 1. Add user message to UI
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: userMessage }]);
    setInputValue('');

    // 2. Update global Form Data
    updateFormData({ [currentField.id]: userMessage });

    // 3. Logic to find next field/step
    let nextStepIdx = currentStepIdx;
    let nextFieldIdx = currentFieldIdx + 1;

    if (nextFieldIdx >= currentStep.fields.length) {
      nextStepIdx = currentStepIdx + 1;
      nextFieldIdx = 0;
    }

    // 4. Check if we finished all steps
    if (nextStepIdx >= stepsConfig.length) {
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1000));
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: 'bot', 
        content: t('chat.completion')
      }]);
      setIsTyping(false);
      onComplete(); // Notify parent that we are ready
      return;
    }

    // 5. Ask next question
    setCurrentStepIdx(nextStepIdx);
    setCurrentFieldIdx(nextFieldIdx);
    
    askQuestion(nextStepIdx, nextFieldIdx);
  };

  const askQuestion = async (sIdx, fIdx) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1200));
    
    const nextStep = stepsConfig[sIdx];
    const nextField = nextStep.fields[fIdx];
    
    let questionText = "";
    
    // Add context if it's the first field of a new step
    if (fIdx === 0) {
      questionText += t('chat.phase_prefix', { title: nextStep.title }) + "\n\n";
    }
    
    // Formulate the question more naturally
    const specificQuestion = t(`chat.questions.${nextField.id}`, { defaultValue: nextField.label });
    questionText += `**${specificQuestion}** \n\n_${nextField.placeholder || ''}_`;
    
    setMessages(prev => [...prev, { id: Date.now(), role: 'bot', content: questionText, type: nextField.type }]);
    setIsTyping(false);
  };

  const handleVisualSelect = (styleId) => {
    // We set the input value and trigger handleSend
    setInputValue(styleId);
    setTimeout(() => {
        handleSend(styleId);
    }, 100);
  };

  const isVisualStep = stepsConfig[currentStepIdx]?.fields[currentFieldIdx]?.type === 'visual_selector';

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[70vh] bg-surface/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative z-10">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-surface-light/50 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-magic to-accent flex items-center justify-center text-white shadow-lg">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-primary text-sm">Naia</h3>
            <p className="text-[10px] text-magic font-mono uppercase tracking-widest font-bold">Creative Oracle</p>
          </div>
        </div>
        <div className="w-10" /> {/* spacer */}
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <Motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-md
                  ${msg.role === 'user' ? 'bg-accent text-white' : 'bg-surface-light border border-white/10 text-magic'}
                `}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                  ${msg.role === 'user' 
                    ? 'bg-accent text-white rounded-tr-none' 
                    : 'bg-surface/80 border border-white/10 text-secondary rounded-tl-none shadow-sm'
                  }
                `}>
                  {msg.content}

                  {msg.type === 'visual_selector' && msg.role === 'bot' && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {visualStyles.map(style => (
                        <button
                          key={style.id}
                          onClick={() => handleVisualSelect(style.id)}
                          className="p-3 bg-surface border border-white/5 rounded-xl hover:border-magic/50 transition-all text-left flex items-center gap-2 group"
                        >
                          <span className="text-xl">{style.icon}</span>
                          <span className="text-xs font-bold text-primary group-hover:text-magic transition-colors">{style.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <Motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex justify-start items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-surface-light border border-white/10 flex items-center justify-center text-magic shadow-md">
              <Bot size={16} />
            </div>
            <div className="bg-surface/80 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <Motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-magic rounded-full" />
              <Motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-magic rounded-full" />
              <Motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-magic rounded-full" />
            </div>
          </Motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className={`p-4 bg-surface-light/30 border-t border-white/5 transition-opacity ${isVisualStep ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <div className="relative flex items-center">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isVisualStep}
            placeholder={isVisualStep ? t('create_story.fields.visualStyle.label') : t('chat.input_placeholder')}
            rows={1}
            className="w-full bg-surface border border-white/10 rounded-2xl py-3 px-4 pr-12 text-sm text-primary placeholder:text-muted focus:border-magic/50 focus:ring-1 focus:ring-magic/20 outline-none transition-all resize-none overflow-hidden"
          />
          <button
            onClick={() => handleSend()}
            disabled={isVisualStep || (!inputValue.trim())}
            className="absolute right-2 p-2 bg-magic text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-lg"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-muted mt-2 text-center flex items-center justify-center gap-1">
          <Sparkles size={10} className="text-magic" />
          {isVisualStep ? t('chat.style_selected_hint', { defaultValue: 'Selecione um estilo acima para continuar' }) : t('chat.input_hint')}
        </p>
      </div>
    </div>
  );
};

export default StoryChat;

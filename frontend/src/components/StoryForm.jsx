import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, BookOpen, User, Zap, Globe, MessageSquare } from 'lucide-react';
import TopWizardProgress from "./TopWizardProgress";
import { useStory } from "../context/StoryContext";
import { INITIAL_FORM_DATA, stepsConfig } from "../constants/storySteps";
import { useTranslation } from "react-i18next";

const iconMap = { User, Zap, Globe, BookOpen, MessageSquare };

const FormSummary = ({ data, onRestart, onGenerateStory, onBack, isSubmitting }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t('create_story.summary.title')}</h2>
      <p className="text-gray-600 dark:text-gray-400">{t('create_story.summary.subtitle')}</p>

      {stepsConfig.map((step, index) => (
        <div key={index} className="bg-white dark:bg-white/5 p-4 rounded-xl shadow-md border-l-4 border-blue-400 dark:border-blue-500 dark:backdrop-blur-sm">
          <h3 className="flex items-center text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            {React.createElement(iconMap[step.iconName], { className: 'w-5 h-5 mr-2' })}
            {t(`create_story.steps.${step.id}`)}
          </h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-300">
            {step.fields.map(field => (
              <li key={field.id}>
                <span className="font-medium text-gray-800 dark:text-gray-200">{field.label}:</span> {String(data[field.id] || t('create_story.summary.not_filled'))}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button onClick={onRestart} className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 shadow-md">{t('create_story.buttons.restart')}</button>
        <button onClick={onGenerateStory} disabled={isSubmitting} className={`w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
          {isSubmitting ? t('create_story.buttons.generating') : t('create_story.buttons.generate')}
        </button>
        <button onClick={onBack} className="w-full py-3 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/80 transition duration-300 shadow-md border-transparent dark:border-indigo-500/30">{t('create_story.buttons.back')}</button>
      </div>
    </div>
  );
};

const CurrentStep = ({ step, formData, handleChange, currentStep, totalSteps, handleNext, handleBack, isStepValid }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
        {React.createElement(iconMap[step.iconName], { className: 'w-7 h-7 mr-3 text-blue-500 dark:text-blue-400' })}
        {t(`create_story.steps.${step.id}`)}
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">{t(`create_story.steps.${step.id}_desc`)}</p>

      {step.fields.map(field => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.id}
              rows="3"
              value={formData[field.id]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 bg-white dark:bg-[#0a0a1a] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 shadow-sm resize-none"
            />
          ) : (
            <input
              id={field.id}
              type={field.type === 'number' ? 'text' : field.type}
              value={formData[field.id]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 bg-white dark:bg-[#0a0a1a] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 shadow-sm"
            />
          )}
        </div>
      ))}

      <div className="flex justify-between pt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${currentStep === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-50 dark:bg-white/5 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-white/10 border-transparent dark:border dark:border-indigo-500/30'}`}
        >
          {t('create_story.buttons.back')}
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid(currentStep)}
          className={`flex items-center px-6 py-2 rounded-lg font-bold transition duration-200 ${isStepValid(currentStep) ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md dark:shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'}`}
        >
          {currentStep < totalSteps ? t('create_story.buttons.next') : t('create_story.buttons.finish')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

const StoryForm = ({ onSubmit, onStepChange }) => {
  const { t } = useTranslation();
  const { formData: ctxFormData, updateFormData } = useStory();
  const [currentStep, setCurrentStep] = useState(1);
  const [localForm, setLocalForm] = useState({ ...INITIAL_FORM_DATA, ...ctxFormData });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = stepsConfig.length;

  // Propagate step change to parent
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  useEffect(() => {
    setLocalForm(prev => ({ ...prev, ...ctxFormData }));
  }, [ctxFormData]);

  const handleFieldChange = (id, value) => {
    const sanitized = id === 'cenarioEpoca' ? value.replace(/[^\d]/g, '') : value;
    setLocalForm(prev => {
      const next = { ...prev, [id]: sanitized };
      updateFormData({ [id]: sanitized });
      return next;
    });
  };

  const isStepValid = (stepIndex) => {
    const step = stepsConfig[stepIndex - 1];
    if (!step) return false;
    return step.fields.every(f => {
      const val = localForm[f.id];
      if (f.type === 'number') return val !== '' && val !== null && val !== undefined;
      return typeof val === 'string' ? val.trim().length > 0 : Boolean(val);
    });
  };

  const handleNext = () => {
    if (!isStepValid(currentStep)) return;
    setCurrentStep(prev => Math.min(totalSteps + 1, prev + 1));
  };

  const handleBack = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleGenerateStory = async () => {
    if (!onSubmit) return;
    setIsSubmitting(true);
    await onSubmit(localForm);
    setIsSubmitting(false);
  };

  const handleRestart = () => {
    setLocalForm(INITIAL_FORM_DATA);
    updateFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
  };

  const handleBackFromSummary = () => setCurrentStep(totalSteps);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-['Inter'] bg-transparent">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1a1a2e]/90 backdrop-blur-md dark:backdrop-blur-xl rounded-xl shadow-2xl p-6 sm:p-10 border border-transparent dark:border-blue-500/20">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center dark:drop-shadow-lg">
            <Sparkles className="w-6 h-6 mr-3 text-yellow-500 dark:text-yellow-400" />
            {t('create_story.title')}
          </h1>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-2">{t('create_story.subtitle')}</p>
        </header>

        <TopWizardProgress steps={stepsConfig} current={currentStep} />

        {currentStep > totalSteps ? (
          <FormSummary
            data={localForm}
            onRestart={handleRestart}
            onGenerateStory={handleGenerateStory}
            onBack={handleBackFromSummary}
            isSubmitting={isSubmitting}
          />
        ) : (
          <CurrentStep
            step={stepsConfig[currentStep - 1]}
            formData={localForm}
            handleChange={(e) => handleFieldChange(e.target.id, e.target.value)}
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handleBack={handleBack}
            isStepValid={isStepValid}
          />
        )}

      </div>
    </div>
  );
};

export default StoryForm;

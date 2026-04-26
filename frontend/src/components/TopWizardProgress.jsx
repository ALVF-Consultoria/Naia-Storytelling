// src/components/TopWizardProgress.jsx
import React from "react";
import { CheckCircle, Circle, ChevronRight } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * Props:
 * - steps: array of { title: string }
 * - current: 1-based current step (1..n)
 */
const TopWizardProgress = ({ steps = [], current = 1 }) => {
  const total = steps.length;
  const { t } = useTranslation();

  return (
    <div className="w-full relative overflow-hidden">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="flex flex-col gap-3">

          {/* Desktop Steps */}
          <div className="hidden sm:flex items-center justify-between relative">
            {steps.map((s, i) => {
              const index = i + 1;
              const state = index < current ? "completed" : index === current ? "active" : "upcoming";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-1 flex flex-col items-center relative mr-4"
                  style={{ maxWidth: `${100 / steps.length}%` }}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300
                      ${state === "completed"
                        ? "bg-linear-to-br from-cyan-400 via-indigo-500 to-purple-600 text-white"
                        : state === "active"
                          ? "bg-linear-to-br from-cyan-400/30 via-indigo-400/30 to-purple-500/30 text-blue-600 dark:text-white ring-2 ring-blue-400 dark:ring-cyan-400/40 backdrop-blur-sm"
                          : "bg-gray-200 dark:bg-white/20 text-gray-400 dark:text-gray-300"
                      }`}
                    style={{
                      boxShadow:
                        state === "active"
                          ? "0 6px 24px rgba(99,102,241,0.18), 0 0 30px rgba(99,102,241,0.08)"
                          : state === "completed"
                            ? "0 8px 30px rgba(99,102,241,0.22)"
                            : "none",
                    }}
                  >
                    {state === "completed" ? <CheckCircle size={18} /> : <Circle size={16} />}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs mt-1  text-center truncate transition-colors duration-300 ${state === "active" ? "text-blue-600 dark:text-cyan-400 font-bold" : state === "completed" ? "text-gray-800 dark:text-white" : "text-gray-400 dark:text-gray-400"
                      }`}
                  >
                    {s.id ? t(`create_story.steps.${s.id}`, { defaultValue: s.title }) : s.title}
                  </span>

                  {/* Connector line */}
                  {i !== steps.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute top-5 right-[-50%] w-[200%] h-[2px]"
                      style={{
                        background:
                          index < current
                            ? "linear-gradient(90deg, rgba(59,130,246,0.95), rgba(139,92,246,0.9))"
                            : "linear-gradient(90deg, rgba(209,213,219,0.5), rgba(209,213,219,0.2))", // Gray for light mode default
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Steps */}
          <div className="sm:hidden flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-br from-cyan-400 via-indigo-500 to-purple-600 text-white shadow-lg">
                <CheckCircle size={16} />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{t('create_story.buttons.step_of', { current, total, defaultValue: `Passo ${current} de ${total}` })}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{steps[Math.max(0, current - 1)]?.id ? t(`create_story.steps.${steps[Math.max(0, current - 1)].id}`, { defaultValue: steps[Math.max(0, current - 1)].title }) : steps[Math.max(0, current - 1)]?.title || ""}</div>
              </div>
            </div>
            <div className="text-sm text-gray-400 dark:text-gray-300 font-medium">
              <ChevronRight size={20} />
            </div>
          </div>

          {/* Neon progress bar */}
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-white/20 relative overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-600"
              style={{
                width: `${Math.min(100, Math.round(((current - 1) / (total - 1 || 1)) * 100))}%`,
                transition: "width 400ms ease",
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopWizardProgress;

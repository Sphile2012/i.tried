/**
 * Infinity Code - Build an App Across Languages Page
 * 
 * This page allows users to select a language and follow step-by-step
 * instructions to build the same application across different programming languages.
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  Clock,
  CheckCircle,
  Circle,
  Code,
  BookOpen,
  Play,
  Award,
  ArrowRight
} from 'lucide-react';
import {
  todoAppProject,
  getProjectById,
  getCodeExampleForLanguage,
  getLanguageInfo,
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  AppProject,
  Phase,
  Step
} from '@/config/build-across-languages';

export default function BuildAcrossLanguagesPage() {
  const [selectedProject] = useState<AppProject>(todoAppProject);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('python');
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['planning']);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showCodeExample, setShowCodeExample] = useState<string | null>(null);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev =>
      prev.includes(phaseId)
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const getProgress = () => {
    const totalSteps = selectedProject.phases.reduce(
      (acc, phase) => acc + phase.steps.length,
      0
    );
    return totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;
  };

  const sortedPhases = [...selectedProject.phases].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/learning-hub"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
          >
            <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
            Back to Learning Hub
          </Link>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {selectedProject.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            {selectedProject.description}
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-[#00d4ff] mb-1">
              {selectedProject.estimatedTotalHours}h
            </div>
            <div className="text-sm text-gray-500">Estimated Time</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-[#7c3aed] mb-1">
              {SUPPORTED_LANGUAGES.length}
            </div>
            <div className="text-sm text-gray-500">Languages</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {selectedProject.phases.length}
            </div>
            <div className="text-sm text-gray-500">Phases</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-[#00d4ff] mb-1">
              {getProgress()}%
            </div>
            <div className="text-sm text-gray-500">Progress</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Your Progress</span>
            <span className="text-sm text-[#00d4ff]">{getProgress()}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
            />
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Choose Your Language</h2>
          <div className="flex flex-wrap gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const info = getLanguageInfo(lang);
              const isSelected = lang === selectedLanguage;
              return (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{info.icon}</span>
                  <span className="font-medium">{info.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Technologies You'll Learn</h2>
          <div className="flex flex-wrap gap-2">
            {selectedProject.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {selectedProject.learningOutcomes.map((outcome, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phases & Steps */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Development Phases</h2>
          <div className="space-y-4">
            {sortedPhases.map((phase) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                isExpanded={expandedPhases.includes(phase.id)}
                onToggle={() => togglePhase(phase.id)}
                selectedLanguage={selectedLanguage}
                completedSteps={completedSteps}
                onToggleStep={toggleStepCompletion}
                showCodeExample={showCodeExample}
                onShowCodeExample={setShowCodeExample}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Code Example Modal */}
      <AnimatePresence>
        {showCodeExample && (
          <CodeExampleModal
            step={
              sortedPhases
                .flatMap(p => p.steps)
                .find(s => s.id === showCodeExample)!
            }
            language={selectedLanguage}
            onClose={() => setShowCodeExample(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface PhaseCardProps {
  phase: Phase;
  isExpanded: boolean;
  onToggle: () => void;
  selectedLanguage: SupportedLanguage;
  completedSteps: string[];
  onToggleStep: (stepId: string) => void;
  showCodeExample: string | null;
  onShowCodeExample: (stepId: string | null) => void;
}

function PhaseCard({
  phase,
  isExpanded,
  onToggle,
  selectedLanguage,
  completedSteps,
  onToggleStep,
  onShowCodeExample
}: PhaseCardProps) {
  const sortedSteps = [...phase.steps].sort((a, b) => a.order - b.order);
  const completedCount = sortedSteps.filter(s => completedSteps.includes(s.id)).length;
  const totalCount = sortedSteps.length;
  const isComplete = completedCount === totalCount && totalCount > 0;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      {/* Phase Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-2xl`}
          >
            {phase.icon}
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
            <p className="text-sm text-gray-500">
              {completedCount} of {totalCount} steps completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isComplete && (
            <CheckCircle className="w-6 h-6 text-green-400" />
          )}
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Phase Description */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <div className="px-4 pb-4">
            <p className="text-gray-400 mb-4">{phase.description}</p>
            
            {/* Steps */}
            <div className="space-y-3">
              {sortedSteps.map((step) => (
                <StepCard
                  key={step.id}
                  step={step}
                  isCompleted={completedSteps.includes(step.id)}
                  onToggleComplete={() => onToggleStep(step.id)}
                  selectedLanguage={selectedLanguage}
                  onShowCode={() => onShowCodeExample(step.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface StepCardProps {
  step: Step;
  isCompleted: boolean;
  onToggleComplete: () => void;
  selectedLanguage: SupportedLanguage;
  onShowCode: () => void;
}

function StepCard({
  step,
  isCompleted,
  onToggleComplete,
  selectedLanguage,
  onShowCode
}: StepCardProps) {
  const codeExample = getCodeExampleForLanguage(step, selectedLanguage);

  return (
    <div
      className={`bg-white/[0.03] border rounded-xl p-4 ${
        isCompleted ? 'border-green-500/30' : 'border-white/10'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggleComplete}
          className="flex-shrink-0 mt-1"
        >
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <Circle className="w-5 h-5 text-gray-500 hover:text-gray-300" />
          )}
        </button>
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className={`font-medium mb-1 ${isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>
                {step.title}
              </h4>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
              <Clock className="w-3 h-3" />
              {step.estimatedDuration}
            </div>
          </div>

          {/* Objectives */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Objectives:</p>
            <ul className="space-y-1">
              {step.objectives.map((obj, idx) => (
                <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-[#00d4ff]">•</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Hints */}
          <div className="mt-3">
            <details className="group">
              <summary className="text-sm text-gray-500 cursor-pointer hover:text-white transition-colors">
                💡 Hints ({step.hints.length})
              </summary>
              <ul className="mt-2 space-y-1 pl-4 border-l-2 border-white/10 ml-1">
                {step.hints.map((hint, idx) => (
                  <li key={idx} className="text-sm text-gray-400">
                    {hint}
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Code Example Button */}
          {codeExample && (
            <div className="mt-4">
              <button
                onClick={onShowCode}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00d4ff]/20 to-[#7c3aed]/20 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
              >
                <Code className="w-4 h-4" />
                View {codeExample.language.toUpperCase()} Code
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CodeExampleModalProps {
  step: Step;
  language: SupportedLanguage;
  onClose: () => void;
}

function CodeExampleModal({ step, language, onClose }: CodeExampleModalProps) {
  const codeExample = getCodeExampleForLanguage(step, language);

  if (!codeExample) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-4 md:inset-10 bg-[#0d0d1a] border border-white/10 rounded-2xl z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            <p className="text-sm text-gray-500">{codeExample.fileName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4">
          <pre className="bg-[#0a0a0f] rounded-xl p-4 overflow-x-auto">
            <code className="text-sm text-gray-300 font-mono whitespace-pre">
              {codeExample.code}
            </code>
          </pre>
          
          {codeExample.description && (
            <div className="mt-4 p-4 bg-white/5 rounded-xl">
              <p className="text-gray-400">{codeExample.description}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
              {codeExample.language.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </>
  );
}
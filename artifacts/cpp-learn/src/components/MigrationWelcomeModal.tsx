import { useState } from 'react';
import { X, Sparkles, Award, TrendingUp, Target } from 'lucide-react';

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

interface MigrationWelcomeModalProps {
  assignedLevel: ProficiencyLevel;
  xp: number;
  onClose: () => void;
}

export function MigrationWelcomeModal({
  assignedLevel,
  xp,
  onClose,
}: MigrationWelcomeModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const levelColors = {
    BEGINNER: {
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      accent: 'text-amber-600',
    },
    INTERMEDIATE: {
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      accent: 'text-blue-600',
    },
    EXPERT: {
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-50',
      accent: 'text-purple-600',
    },
  };

  const colors = levelColors[assignedLevel];

  const slides = [
    {
      icon: Sparkles,
      title: 'Welcome to the New Learning System!',
      description: `We've introduced a level-based progression system to personalize your learning experience.`,
      content: (
        <div className="space-y-4">
          <div className={`${colors.bg} rounded-xl p-4`}>
            <h4 className="font-bold text-gray-900 mb-2">What's New?</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Personalized UI that adapts to your skill level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Content tailored to your proficiency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Clear progression path with XP and milestones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Unlock new features as you advance</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      icon: Award,
      title: `You've Been Assigned: ${assignedLevel}`,
      description: `Based on your ${xp.toLocaleString()} XP, we've placed you at the ${assignedLevel} level.`,
      content: (
        <div className="space-y-4">
          <div className={`bg-gradient-to-r ${colors.gradient} rounded-xl p-6 text-white text-center`}>
            <Award className="w-16 h-16 mx-auto mb-3" />
            <h3 className="text-3xl font-bold mb-2">{assignedLevel}</h3>
            <p className="text-white/90">{xp.toLocaleString()} XP</p>
          </div>

          {assignedLevel === 'BEGINNER' && (
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Your Experience:</strong> You'll get a focused, step-by-step learning
                interface with helpful hints and visual explanations.
              </p>
              <p>
                <strong>Goal:</strong> Reach 1,000 XP and complete 80% of beginner lessons to
                advance to Intermediate.
              </p>
            </div>
          )}

          {assignedLevel === 'INTERMEDIATE' && (
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Your Experience:</strong> You'll have a flexible two-panel workspace with
                standard development tools.
              </p>
              <p>
                <strong>Goal:</strong> Reach 5,000 XP and complete 70% of intermediate lessons to
                advance to Expert.
              </p>
            </div>
          )}

          {assignedLevel === 'EXPERT' && (
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Your Experience:</strong> You'll get the full IDE experience with advanced
                features and all content unlocked.
              </p>
              <p>
                <strong>Achievement:</strong> You're at the highest level! Continue learning to
                maintain your mastery.
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      icon: TrendingUp,
      title: 'How Progression Works',
      description: 'Level up by earning XP and completing lessons at your current level.',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Earn XP</h4>
              </div>
              <p className="text-sm text-gray-700">
                Complete lessons and challenges to earn experience points based on difficulty.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Complete Content</h4>
              </div>
              <p className="text-sm text-gray-700">
                Finish a percentage of lessons at your level to prove mastery.
              </p>
            </div>
          </div>

          <div className={`${colors.bg} rounded-lg p-4`}>
            <h4 className="font-semibold text-gray-900 mb-2">
              Progression Requirements
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>BEGINNER → INTERMEDIATE:</span>
                <span className="font-semibold">1,000 XP + 80% completion</span>
              </div>
              <div className="flex justify-between">
                <span>INTERMEDIATE → EXPERT:</span>
                <span className="font-semibold">5,000 XP + 70% completion</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <Icon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{currentSlideData.title}</h2>
              <p className="text-white/80 text-sm mt-1">
                {currentSlideData.description}
              </p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mt-4">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="min-h-[300px]">{currentSlideData.content}</div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            {currentSlide === slides.length - 1 ? "Let's Go!" : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

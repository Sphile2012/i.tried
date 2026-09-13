import { Award, X, Sparkles, TrendingUp } from 'lucide-react';

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

interface LevelProgressionModalProps {
  newLevel: ProficiencyLevel;
  unlockedFeatures: string[];
  onClose: () => void;
}

export function LevelProgressionModal({
  newLevel,
  unlockedFeatures,
  onClose,
}: LevelProgressionModalProps) {
  const levelColors = {
    BEGINNER: {
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      accent: 'text-amber-600',
    },
    INTERMEDIATE: {
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      accent: 'text-blue-600',
    },
    EXPERT: {
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      accent: 'text-purple-600',
    },
  };

  const colors = levelColors[newLevel];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in duration-500">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${colors.gradient} p-8 text-white relative overflow-hidden`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated sparkles */}
          <div className="absolute top-0 right-0 opacity-20">
            <Sparkles className="w-32 h-32 animate-pulse" />
          </div>

          <div className="relative">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Award className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold text-center mb-2">
              🎉 Congratulations!
            </h1>
            <p className="text-xl text-center text-white/90">
              You've advanced to <span className="font-bold">{newLevel}</span> level!
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Achievement message */}
          <div className={`${colors.bg} rounded-2xl p-6 mb-6`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 ${colors.bg} rounded-xl`}>
                <TrendingUp className={`w-6 h-6 ${colors.accent}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold ${colors.text} mb-2`}>
                  Your skills have leveled up!
                </h3>
                <p className="text-gray-700 text-sm">
                  {newLevel === 'INTERMEDIATE' &&
                    'You\'ve mastered the basics and are ready for more complex challenges. Your workspace now includes professional tools and flexibility.'}
                  {newLevel === 'EXPERT' &&
                    'You\'ve reached the highest level! You now have access to the full IDE experience with advanced features and all expert-level content.'}
                </p>
              </div>
            </div>
          </div>

          {/* Unlocked features */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className={`w-5 h-5 ${colors.accent}`} />
              Newly Unlocked Features
            </h3>
            <div className="space-y-3">
              {unlockedFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg animate-in slide-in-from-left duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-6 h-6 rounded-full ${colors.gradient} bg-gradient-to-r flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onClose}
            className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl`}
          >
            Explore New Features
          </button>
        </div>
      </div>
    </div>
  );
}

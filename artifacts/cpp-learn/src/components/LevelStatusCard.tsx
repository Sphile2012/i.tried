import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { TrendingUp, Award, Target, Lock, Sparkles } from 'lucide-react';

interface LevelStatus {
  currentLevel: string;
  totalXp: number;
  completionRate: number;
  progressionEligible: boolean;
  nextLevel: {
    level: string;
    requiredXp: number;
    requiredCompletionRate: number;
    currentXp: number;
    currentCompletionRate: number;
  } | null;
}

export function LevelStatusCard() {
  const { user } = useUser();
  const [levelStatus, setLevelStatus] = useState<LevelStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLevelStatus();
  }, [user?.level]);

  const fetchLevelStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/api/user/level-status', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setLevelStatus(data);
      }
    } catch (error) {
      console.error('Error fetching level status:', error);
    } finally {
      setLoading(false);
    }
  };

  const levelColors = {
    BEGINNER: {
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      accent: 'text-amber-600',
      border: 'border-amber-200',
    },
    INTERMEDIATE: {
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      accent: 'text-blue-600',
      border: 'border-blue-200',
    },
    EXPERT: {
      gradient: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      accent: 'text-purple-600',
      border: 'border-purple-200',
    },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 animate-pulse">
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!levelStatus) {
    return null;
  }

  const colors = levelColors[levelStatus.currentLevel as keyof typeof levelColors] || levelColors.BEGINNER;
  const xpProgress = levelStatus.nextLevel
    ? (levelStatus.totalXp / levelStatus.nextLevel.requiredXp) * 100
    : 100;
  const completionProgress = levelStatus.nextLevel
    ? (levelStatus.completionRate / levelStatus.nextLevel.requiredCompletionRate) * 100
    : 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white/90">Your Level</h3>
              <h2 className="text-3xl font-bold">{levelStatus.currentLevel}</h2>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/90">Total XP</div>
            <div className="text-2xl font-bold">{levelStatus.totalXp.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Progress section */}
      <div className="p-6">
        {levelStatus.nextLevel ? (
          <>
            {/* XP Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-5 h-5 ${colors.accent}`} />
                  <span className="font-semibold text-gray-900">XP Progress</span>
                </div>
                <span className="text-sm text-gray-600">
                  {levelStatus.totalXp} / {levelStatus.nextLevel.requiredXp}
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`bg-gradient-to-r ${colors.gradient} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(xpProgress, 100)}%` }}
                  />
                </div>
                <div className="absolute -top-1 left-0 right-0 flex justify-between px-2">
                  {xpProgress >= 50 && (
                    <span className="text-xs font-semibold text-white drop-shadow">
                      {Math.round(xpProgress)}%
                    </span>
                  )}
                </div>
              </div>
              {xpProgress < 100 && (
                <p className="text-xs text-gray-600 mt-2">
                  {levelStatus.nextLevel.requiredXp - levelStatus.totalXp} XP needed
                </p>
              )}
            </div>

            {/* Completion Rate Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className={`w-5 h-5 ${colors.accent}`} />
                  <span className="font-semibold text-gray-900">Completion Rate</span>
                </div>
                <span className="text-sm text-gray-600">
                  {Math.round(levelStatus.completionRate * 100)}% / {Math.round(levelStatus.nextLevel.requiredCompletionRate * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${colors.gradient} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(completionProgress, 100)}%` }}
                />
              </div>
              {completionProgress < 100 && (
                <p className="text-xs text-gray-600 mt-2">
                  Complete {Math.round((levelStatus.nextLevel.requiredCompletionRate - levelStatus.completionRate) * 100)}% more lessons
                </p>
              )}
            </div>

            {/* Next Level Info */}
            <div className={`${colors.bg} border ${colors.border} rounded-xl p-4`}>
              <div className="flex items-start gap-3">
                {levelStatus.progressionEligible ? (
                  <>
                    <Sparkles className={`w-6 h-6 ${colors.accent} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1">
                      <h4 className={`font-bold ${colors.text} mb-1`}>
                        Ready to Advance! 🎉
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        You've met all requirements for {levelStatus.nextLevel.level} level!
                      </p>
                      <button
                        onClick={async () => {
                          const token = localStorage.getItem('token');
                          const response = await fetch('http://localhost:3000/api/level/advance', {
                            method: 'POST',
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          if (response.ok) {
                            window.location.reload();
                          }
                        }}
                        className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-opacity`}
                      >
                        Advance to {levelStatus.nextLevel.level}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Lock className={`w-6 h-6 ${colors.accent} mt-0.5 flex-shrink-0`} />
                    <div>
                      <h4 className={`font-bold ${colors.text} mb-1`}>
                        Next Level: {levelStatus.nextLevel.level}
                      </h4>
                      <p className="text-sm text-gray-700">
                        Keep learning to unlock advanced features and content!
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          // Expert level (no next level)
          <div className={`${colors.bg} border ${colors.border} rounded-xl p-6 text-center`}>
            <div className="inline-block p-4 bg-white rounded-full mb-4">
              <Award className={`w-12 h-12 ${colors.accent}`} />
            </div>
            <h4 className={`font-bold ${colors.text} text-xl mb-2`}>
              Mastery Level Achieved! 🏆
            </h4>
            <p className="text-gray-700">
              You've reached the highest level. Continue learning to maintain your expertise!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

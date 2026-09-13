import { ReactNode } from 'react';
import { useUser } from '../context/UserContext';
import { useLocation } from 'wouter';
import { Lock, TrendingUp } from 'lucide-react';

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

interface LevelGuardProps {
  requiredLevel: ProficiencyLevel;
  children: ReactNode;
}

const LEVEL_HIERARCHY: Record<ProficiencyLevel, number> = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  EXPERT: 3,
};

export function LevelGuard({ requiredLevel, children }: LevelGuardProps) {
  const { user } = useUser();
  const [, setLocation] = useLocation();

  if (!user || !user.level) {
    // Redirect to onboarding quiz
    setLocation('/onboarding/quiz');
    return null;
  }

  const userLevelRank = LEVEL_HIERARCHY[user.level];
  const requiredLevelRank = LEVEL_HIERARCHY[requiredLevel];

  if (userLevelRank < requiredLevelRank) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Content Locked
            </h2>
            <p className="text-gray-600">
              This content requires <span className="font-semibold text-amber-600">{requiredLevel}</span> level access.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Your Level</span>
              <span className="text-sm font-semibold text-gray-800">{user.level}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Required Level</span>
              <span className="text-sm font-semibold text-amber-600">{requiredLevel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Your XP</span>
              <span className="text-sm font-semibold text-gray-800">{user.xp}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 text-left">
              Complete more lessons at your current level to gain XP and progress to {requiredLevel} level.
            </p>
          </div>

          <button
            onClick={() => setLocation('/dashboard')}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

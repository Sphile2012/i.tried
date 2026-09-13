import { ReactNode, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, CheckCircle } from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface BeginnerLayoutProps {
  children: ReactNode;
  onPrevious?: () => void;
  onNext?: () => void;
  onShowHint?: () => void;
  showHintButton?: boolean;
  progressPercent?: number;
  lessonTitle?: string;
  showCelebration?: boolean;
}

export default function BeginnerLayout({
  children,
  onPrevious,
  onNext,
  onShowHint,
  showHintButton = true,
  progressPercent = 0,
  lessonTitle,
  showCelebration = false,
}: BeginnerLayoutProps) {
  const { user } = useUser();
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (showCelebration) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2000);
    }
  }, [showCelebration]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar - Always Visible */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-bold text-gray-800">Your Learning Journey</span>
            <span className="text-2xl font-bold text-indigo-600">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Keep going. Every lesson brings you closer to mastery.</p>
        </div>

        {/* Main Learning Card - One Task Per Screen */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-indigo-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/80 font-semibold text-sm uppercase tracking-wide">Beginner Level</span>
                {lessonTitle && <h2 className="text-white font-bold text-xl mt-1">{lessonTitle}</h2>}
              </div>
              <div className="text-right">
                <span className="text-white/80 text-sm block">Experience Points</span>
                <span className="text-white font-bold text-2xl">{user?.xp || 0}</span>
              </div>
            </div>
          </div>

          {/* Content Area - Big Friendly Fonts, Lots of White Space */}
          <div className="p-12 min-h-[600px]">
            <div className="prose prose-xl max-w-none leading-relaxed">
              <style>{`
                .prose h1 { font-size: 2.5rem; font-weight: 800; color: #1e293b; margin-bottom: 1.5rem; }
                .prose h2 { font-size: 2rem; font-weight: 700; color: #334155; margin-top: 2rem; margin-bottom: 1rem; }
                .prose p { font-size: 1.25rem; line-height: 2; color: #475569; margin-bottom: 1.5rem; }
                .prose code { background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 1.125rem; color: #6366f1; font-weight: 600; }
                .prose pre { background: #1e293b; padding: 2rem; border-radius: 1rem; font-size: 1.125rem; line-height: 1.75; }
                .prose ul, .prose ol { font-size: 1.25rem; line-height: 2; margin-top: 1rem; margin-bottom: 1rem; }
                .prose li { margin-bottom: 0.75rem; }
              `}</style>
              {children}
            </div>
          </div>

          {/* Always-Visible Hint Button at Bottom */}
          {showHintButton && onShowHint && (
            <div className="px-12 pb-8">
              <button
                onClick={onShowHint}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-900 font-bold text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
              >
                <Lightbulb className="w-6 h-6" />
                Need Help? Click Here for a Hint
              </button>
            </div>
          )}

          {/* Navigation Controls - Large and Clear */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-12 py-8 border-t-4 border-gray-200">
            <div className="flex items-center justify-between gap-6">
              {/* Previous Button */}
              <button
                onClick={onPrevious}
                disabled={!onPrevious}
                className="flex items-center gap-3 px-8 py-4 bg-white border-3 border-gray-300 rounded-2xl font-bold text-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg min-w-[180px]"
              >
                <ChevronLeft className="w-6 h-6" />
                Previous Lesson
              </button>

              {/* Celebration Animation */}
              {celebrate && (
                <div className="flex items-center gap-2 px-6 py-4 bg-green-100 border-2 border-green-400 rounded-2xl animate-bounce">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-800 font-bold">Great work</span>
                </div>
              )}

              {/* Next Button */}
              <button
                onClick={onNext}
                disabled={!onNext}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold text-lg rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 min-w-[180px]"
              >
                Continue Learning
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Cues - Reassurance */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-3xl font-bold text-indigo-600">{user?.completionRate ? Math.round(user.completionRate * 100) : 0}%</div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-3xl font-bold text-purple-600">{user?.xp || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Total XP</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-3xl font-bold text-green-600">Learning</div>
            <div className="text-sm text-gray-600 mt-1">Your Pace</div>
          </div>
        </div>

        {/* Encouragement - No Emojis */}
        <div className="mt-6 text-center">
          <p className="text-gray-700 text-lg font-medium">
            Take your time and learn at your own pace. You are making real progress.
          </p>
        </div>
      </div>
    </div>
  );
}

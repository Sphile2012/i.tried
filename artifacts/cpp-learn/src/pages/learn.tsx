/**
 * Learn Page - Your Languages Full Page View
 */

import { Link } from 'wouter';
import { Plus } from 'lucide-react';

export default function LearnPage() {
  // ALL user's programming languages
  const allLanguages = [
    {
      name: 'C++',
      icon: '++',
      totalXp: 1200,
      level: 5,
      lessonsCompleted: 15,
      totalLessons: 25,
      isPrimary: true,
      color: 'from-[#00599C] to-[#004482]',
    },
    {
      name: 'Python',
      icon: 'Py',
      totalXp: 300,
      level: 2,
      lessonsCompleted: 3,
      totalLessons: 30,
      isPrimary: false,
      color: 'from-[#3776AB] to-[#FFD43B]',
    },
    {
      name: 'JavaScript',
      icon: 'JS',
      totalXp: 850,
      level: 4,
      lessonsCompleted: 12,
      totalLessons: 28,
      isPrimary: false,
      color: 'from-[#F7DF1E] to-[#F0DB4F]',
    },
    {
      name: 'Java',
      icon: 'Jv',
      totalXp: 500,
      level: 3,
      lessonsCompleted: 8,
      totalLessons: 22,
      isPrimary: false,
      color: 'from-[#5382A1] to-[#E76F00]',
    },
    {
      name: 'TypeScript',
      icon: 'TS',
      totalXp: 400,
      level: 3,
      lessonsCompleted: 6,
      totalLessons: 20,
      isPrimary: false,
      color: 'from-[#3178C6] to-[#235A97]',
    },
    {
      name: 'Go',
      icon: 'Go',
      totalXp: 200,
      level: 1,
      lessonsCompleted: 2,
      totalLessons: 18,
      isPrimary: false,
      color: 'from-[#00ADD8] to-[#5DC9E2]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A1931]">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#F5F7FF] mb-3">
            Your Languages
          </h1>
          <p className="text-lg text-[#F5F7FF]/70">
            Track your progress across different programming languages
          </p>
        </div>

        {/* Languages Grid - Responsive with 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allLanguages.map((lang) => {
            const progressPercent = Math.round((lang.lessonsCompleted / lang.totalLessons) * 100);
            
            return (
              <div
                key={lang.name}
                className="relative bg-[#F5F7FF] rounded-xl p-6 border border-[#F5F7FF]/20 hover:border-[#38BDF8] transition-all hover:shadow-[0_4px_20px_rgba(56,189,248,0.2)]"
              >
                {/* Primary Badge */}
                {lang.isPrimary && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#38BDF8] text-white text-[11px] font-bold rounded-full">
                      PRIMARY
                    </span>
                  </div>
                )}

                {/* Header with Icon and Name */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-white font-mono font-bold text-base shadow-md`}>
                    {lang.icon}
                  </div>
                  <div>
                    <h3 className="font-mono text-[20px] font-bold text-[#0A1931]">{lang.name}</h3>
                  </div>
                </div>

                {/* XP and Level - Same Row */}
                <div className="flex items-center gap-5 mb-4">
                  <div>
                    <div className="text-[11px] font-medium text-[#0A1931]/60 mb-1">TOTAL XP</div>
                    <div className="font-mono text-[16px] font-bold text-[#0A1931]">
                      {lang.totalXp.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-[#0A1931]/60 mb-1">LEVEL</div>
                    <div className="font-mono text-[16px] font-bold text-[#38BDF8]">
                      Lv {lang.level}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-medium text-[#0A1931]/60">Lessons Progress</span>
                    <span className="font-mono font-bold text-[#0A1931]">
                      {lang.lessonsCompleted}/{lang.totalLessons}
                    </span>
                  </div>
                  <div className="h-2 bg-[#0A1931]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#38BDF8] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-[#38BDF8]">{progressPercent}%</span>
                  </div>
                </div>

                {/* Continue/Resume Button */}
                <Link href={`/lessons?language=${lang.name.toLowerCase()}`}>
                  <button className="w-full py-2.5 bg-[#38BDF8] hover:bg-[#0EA5E9] text-white font-semibold rounded-lg transition text-sm">
                    {lang.lessonsCompleted > 0 ? 'Continue' : 'Start Learning'}
                  </button>
                </Link>
              </div>
            );
          })}

          {/* Add Another Language Card - ALWAYS LAST */}
          <div className="relative bg-[#F5F7FF]/10 rounded-xl p-6 border-2 border-dashed border-[#F5F7FF]/20 hover:border-[#38BDF8] transition-all hover:shadow-[0_4px_20px_rgba(56,189,248,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[280px]">
            <div className="w-12 h-12 rounded-xl bg-[#F5F7FF]/20 flex items-center justify-center mb-3">
              <Plus className="w-7 h-7 text-[#F5F7FF]" />
            </div>
            <h3 className="font-semibold text-base text-[#F5F7FF] mb-2">Add Another Language</h3>
            <p className="text-sm text-[#F5F7FF]/60 text-center">
              Start learning a new programming language
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

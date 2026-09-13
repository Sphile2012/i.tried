/**
 * Learn Page - Your Languages Full Page View
 */

import { Link } from 'wouter';
import { Plus } from 'lucide-react';

export default function LearnPage() {
  const languages = [
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
  ];

  return (
    <div className="min-h-screen bg-[#EFEDE5]">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#1B1D24] mb-3">
            Your Languages
          </h1>
          <p className="text-lg text-[#5B5E6B]">
            Track your progress across different programming languages
          </p>
        </div>

        {/* Languages Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {languages.map((lang) => {
            const progressPercent = Math.round((lang.lessonsCompleted / lang.totalLessons) * 100);
            
            return (
              <div
                key={lang.name}
                className="relative bg-[#F7F6F1] rounded-2xl p-7 border border-[#DEDBD0] hover:border-[#2D5BFF] transition-all hover:shadow-lg"
              >
                {/* Primary Badge */}
                {lang.isPrimary && (
                  <div className="absolute top-5 right-5">
                    <span className="px-3 py-1 bg-[#2D5BFF] text-white text-[11px] font-bold rounded-full">
                      PRIMARY
                    </span>
                  </div>
                )}

                {/* Header with Icon and Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-white font-mono font-bold text-lg shadow-md`}>
                    {lang.icon}
                  </div>
                  <div>
                    <h3 className="font-mono text-[22px] font-bold text-[#1B1D24]">{lang.name}</h3>
                  </div>
                </div>

                {/* XP and Level - Same Row */}
                <div className="flex items-center gap-6 mb-5">
                  <div>
                    <div className="text-[12px] font-medium text-[#5B5E6B] mb-1">TOTAL XP</div>
                    <div className="font-mono text-[18px] font-bold text-[#1B1D24]">
                      {lang.totalXp.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-[#5B5E6B] mb-1">LEVEL</div>
                    <div className="font-mono text-[18px] font-bold text-[#2D5BFF]">
                      Lv {lang.level}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-[#5B5E6B]">Lessons Progress</span>
                    <span className="font-mono font-bold text-[#1B1D24]">
                      {lang.lessonsCompleted}/{lang.totalLessons}
                    </span>
                  </div>
                  <div className="h-2.5 bg-[#DEDBD0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2D5BFF] to-[#5B8FFF] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] font-bold text-[#2D5BFF]">{progressPercent}%</span>
                  </div>
                </div>

                {/* Continue/Resume Button */}
                <Link href={`/lessons?language=${lang.name.toLowerCase()}`}>
                  <button className="w-full py-3 bg-[#2D5BFF] hover:bg-[#2347CC] text-white font-semibold rounded-lg transition">
                    {lang.lessonsCompleted > 0 ? 'Continue Learning' : 'Start Learning'}
                  </button>
                </Link>
              </div>
            );
          })}

          {/* Add Another Language Card */}
          <div className="relative bg-[#F7F6F1] rounded-2xl p-7 border-2 border-dashed border-[#DEDBD0] hover:border-[#2D5BFF] transition-all hover:shadow-lg cursor-pointer flex flex-col items-center justify-center min-h-[320px]">
            <div className="w-14 h-14 rounded-xl bg-[#DEDBD0] flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-[#5B5E6B]" />
            </div>
            <h3 className="font-semibold text-lg text-[#1B1D24] mb-2">Add Another Language</h3>
            <p className="text-sm text-[#5B5E6B] text-center">
              Start learning a new programming language
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

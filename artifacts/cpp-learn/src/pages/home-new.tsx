/**
 * New Home Page - Dashboard with Language Progress
 * Multi-language learning dashboard
 */

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  Code2, 
  Flame, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  Target,
  Trophy,
  Calendar
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LANGUAGES, type LanguageId } from '@/data/languages';
import { calculateLanguageLevel } from '@/data/languages';

interface LanguageProgress {
  languageId: LanguageId;
  xp: number;
  level: number;
  progress: number; // 0-100
  completedLessons: number;
  totalLessons: number;
  isPrimary: boolean;
}

export default function HomeNew() {
  const [streak, setStreak] = useState(7);
  const [totalXP, setTotalXP] = useState(1500);
  const [userLanguages, setUserLanguages] = useState<LanguageProgress[]>([
    {
      languageId: 'cpp',
      xp: 1200,
      level: 5,
      progress: 60,
      completedLessons: 15,
      totalLessons: 25,
      isPrimary: true,
    },
    {
      languageId: 'python',
      xp: 300,
      level: 2,
      progress: 10,
      completedLessons: 3,
      totalLessons: 30,
      isPrimary: false,
    },
  ]);

  // Load from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('streak');
    const savedXP = localStorage.getItem('totalXP');
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedXP) setTotalXP(parseInt(savedXP));
  }, []);

  const primaryLanguage = userLanguages.find(l => l.isPrimary) || userLanguages[0];
  const totalLevel = calculateLanguageLevel(totalXP);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Infinity Code
                </span>
              </div>
            </Link>

            {/* Stats */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Streak */}
              <div className="flex items-center gap-2 px-3 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="font-bold text-white">{streak}</span>
              </div>

              {/* Total XP */}
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Trophy className="h-5 w-5 text-blue-400" />
                <span className="font-bold text-white">{totalXP} XP</span>
              </div>

              {/* Level */}
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <span className="font-bold text-white">Lv {totalLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Your Languages Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Your Languages</h2>
          
          <div className="space-y-4">
            {userLanguages.map((langProgress) => {
              const lang = LANGUAGES[langProgress.languageId];
              
              return (
                <div
                  key={langProgress.languageId}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-6 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Language Icon */}
                    <div 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: lang.color }}
                    >
                      {lang.icon}
                    </div>

                    {/* Progress Info */}
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {lang.displayName}
                        </h3>
                        {langProgress.isPrimary && (
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                            Primary
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-400">
                            {langProgress.completedLessons} / {langProgress.totalLessons} lessons
                          </span>
                          <span className="text-white font-semibold">
                            {langProgress.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${langProgress.progress}%`,
                              backgroundColor: lang.color 
                            }}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="text-slate-400">
                          <span className="text-white font-semibold">{langProgress.xp}</span> XP
                        </span>
                        <span className="text-slate-400">
                          Level <span className="text-white font-semibold">{langProgress.level}</span>
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link href={`/learn?lang=${langProgress.languageId}`}>
                      <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 min-h-[48px] touch-target">
                        {langProgress.isPrimary ? 'Continue' : 'Resume'}
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Language Button */}
          <button
            onClick={() => {/* Show language selector modal */}}
            className="w-full mt-4 px-6 py-4 bg-slate-800/30 border border-slate-700 border-dashed rounded-2xl text-slate-400 hover:text-white hover:border-slate-600 transition-colors flex items-center justify-center gap-2 min-h-[56px] touch-target"
          >
            <Plus className="h-5 w-5" />
            <span className="font-semibold">Add Another Language</span>
          </button>
        </div>

        {/* Explore 6 Languages */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Explore 6 Languages</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {Object.values(LANGUAGES).map((lang) => {
              const isActive = userLanguages.some(l => l.languageId === lang.id);
              
              return (
                <Link key={lang.id} href={`/learn?lang=${lang.id}`}>
                  <div className={`p-4 rounded-xl border transition-all cursor-pointer min-h-[120px] flex flex-col items-center justify-center gap-2 touch-target ${
                    isActive
                      ? 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                      : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                  }`}>
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                      style={{ backgroundColor: lang.color }}
                    >
                      {lang.icon}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-white text-sm">
                        {lang.displayName}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {lang.useCase}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Daily Challenge</h2>
          
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-orange-400" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">Reverse a String</h3>
                  <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full">
                    {primaryLanguage ? LANGUAGES[primaryLanguage.languageId].displayName : 'C++'}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Write a function to reverse a string without using built-in methods
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-400">15 XP • Medium</span>
                  <Link href="/challenges/daily">
                    <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition min-h-[44px] touch-target">
                      Start Challenge
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {userLanguages.reduce((sum, l) => sum + l.completedLessons, 0)}
            </div>
            <div className="text-sm text-slate-400">Lessons Done</div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">{streak}</div>
            <div className="text-sm text-slate-400">Day Streak</div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">{userLanguages.length}</div>
            <div className="text-sm text-slate-400">Languages</div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">{totalLevel}</div>
            <div className="text-sm text-slate-400">Total Level</div>
          </div>
        </div>
      </div>
    </div>
  );
}

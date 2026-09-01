/**
 * Learn Path Page - Visual Timeline with Language Toggle
 * Shows learning path for selected language
 */

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle, Lock, Play, Target, Trophy } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { type LanguageId, LANGUAGES } from '@/data/languages';
import { getConceptsForLanguage } from '@/data/unified-concepts';

interface LessonNode {
  id: string;
  title: string;
  type: 'lesson' | 'checkpoint' | 'project';
  status: 'completed' | 'current' | 'locked';
  xpReward: number;
  duration: string;
  preview?: string;
}

export default function LearnPath() {
  const [, navigate] = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageId>('cpp');
  const [lessons, setLessons] = useState<LessonNode[]>([]);

  // Load language from URL or localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang') as LanguageId;
    const savedLang = localStorage.getItem('currentLanguage') as LanguageId;
    
    const initialLang = langParam || savedLang || 'cpp';
    setCurrentLanguage(initialLang);
  }, []);

  // Load lessons for current language
  useEffect(() => {
    const concepts = getConceptsForLanguage(currentLanguage);
    const completedLessons = JSON.parse(localStorage.getItem(`completed_${currentLanguage}`) || '[]');
    const langName = LANGUAGES[currentLanguage].displayName;
    
    const lessonNodes: LessonNode[] = concepts.map((concept, index) => ({
      id: concept.id,
      title: `${concept.title}`,
      type: index === concepts.length - 1 ? 'project' : index % 5 === 4 ? 'checkpoint' : 'lesson',
      status: completedLessons.includes(concept.id) 
        ? 'completed' 
        : completedLessons.length === index 
        ? 'current' 
        : 'locked',
      xpReward: concept.xpReward,
      duration: concept.duration,
      preview: concept.implementation?.codeExample?.split('\n')[0] || '', // First line of code
    }));
    
    setLessons(lessonNodes);
  }, [currentLanguage]);

  const handleLanguageChange = (langId: LanguageId) => {
    setCurrentLanguage(langId);
    navigate(`/learn?lang=${langId}`);
  };

  const handleLessonClick = (lesson: LessonNode) => {
    if (lesson.status === 'locked') return;
    navigate(`/lessons/${lesson.id}?lang=${currentLanguage}`);
  };

  const currentLang = LANGUAGES[currentLanguage];
  const completedCount = lessons.filter(l => l.status === 'completed').length;
  const progress = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Learning Path</h1>
              <p className="text-sm text-slate-400">
                Master {currentLang.displayName} step by step
              </p>
            </div>
            
            <LanguageSwitcher 
              value={currentLanguage}
              onChange={handleLanguageChange}
              showLabel={true}
            />
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-400">
                {completedCount} / {lessons.length} completed
              </span>
              <span className="text-white font-semibold">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: currentLang.color 
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path Timeline */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-800" />

          {/* Lesson Nodes */}
          <div className="space-y-4">
            {lessons.map((lesson, index) => {
              const isCompleted = lesson.status === 'completed';
              const isCurrent = lesson.status === 'current';
              const isLocked = lesson.status === 'locked';

              return (
                <div key={lesson.id} className="relative">
                  {/* Node Icon */}
                  <div 
                    className={`absolute left-3 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                      isCompleted 
                        ? 'bg-green-500' 
                        : isCurrent 
                        ? 'bg-blue-500 ring-4 ring-blue-500/20' 
                        : 'bg-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : isLocked ? (
                      <Lock className="h-3 w-3 text-slate-400" />
                    ) : (
                      <Play className="h-3 w-3 text-white" />
                    )}
                  </div>

                  {/* Lesson Card */}
                  <div className="ml-16">
                    <button
                      onClick={() => handleLessonClick(lesson)}
                      disabled={isLocked}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all min-h-[80px] touch-target ${
                        isCompleted
                          ? 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                          : isCurrent
                          ? 'bg-slate-900/50 border-blue-500/50 hover:border-blue-500'
                          : 'bg-slate-900/20 border-slate-800/50 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {/* Language Badge */}
                            <div
                              className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                              style={{ backgroundColor: currentLang.color }}
                            >
                              {currentLang.icon}
                            </div>
                            {lesson.type === 'checkpoint' && (
                              <Target className="h-4 w-4 text-orange-400" />
                            )}
                            {lesson.type === 'project' && (
                              <Trophy className="h-4 w-4 text-yellow-400" />
                            )}
                            <h3 className="font-semibold text-white text-base sm:text-lg">
                              {lesson.title}
                            </h3>
                          </div>
                          
                          {/* Code Preview */}
                          {lesson.preview && !isLocked && (
                            <div className="mb-2 px-3 py-2 bg-slate-950/50 border border-slate-800 rounded text-xs font-mono text-slate-300 overflow-x-auto">
                              {lesson.preview}
                            </div>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-slate-400">{lesson.duration}</span>
                            <span className="text-blue-400">{lesson.xpReward} XP</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-400">{currentLang.displayName}</span>
                            {lesson.type === 'checkpoint' && (
                              <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                                Quiz
                              </span>
                            )}
                            {lesson.type === 'project' && (
                              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                                Project
                              </span>
                            )}
                          </div>
                        </div>

                        {isCurrent && !isLocked && (
                          <div className="flex-shrink-0">
                            <div className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition text-sm">
                              Start
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Message */}
        {completedCount === lessons.length && (
          <div className="mt-8 p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl text-center">
            <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">
              Path Completed!
            </h3>
            <p className="text-slate-400 mb-4">
              You've mastered {currentLang.displayName}. Ready for another language?
            </p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition min-h-[48px]"
            >
              Choose Next Language
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

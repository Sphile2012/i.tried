/**
 * PolyCode - Book-Style Lesson Reader
 * Professional, narrative-driven learning experience
 * No stars, no bullets - just clean, readable prose
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Code2, Lightbulb, CheckCircle } from 'lucide-react';
import { getAllLessons } from '@/data/comprehensive-curriculum';
import type { LanguageId } from '@/data/languages';

const languages = [
  { id: 'python' as LanguageId, name: 'Python', color: 'bg-blue-500' },
  { id: 'cpp' as LanguageId, name: 'C++', color: 'bg-blue-600' },
  { id: 'javascript' as LanguageId, name: 'JavaScript', color: 'bg-yellow-500' },
  { id: 'java' as LanguageId, name: 'Java', color: 'bg-orange-500' },
  { id: 'typescript' as LanguageId, name: 'TypeScript', color: 'bg-blue-400' },
  { id: 'csharp' as LanguageId, name: 'C#', color: 'bg-purple-500' },
];

export default function LessonReaderPage() {
  const lessons = getAllLessons();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>('python');
  const [showHints, setShowHints] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentLesson = lessons[currentLessonIndex];
  const canGoPrev = currentLessonIndex > 0;
  const canGoNext = currentLessonIndex < lessons.length - 1;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setShowHints(false);
      setShowQuiz(false);
      setQuizSubmitted(false);
      setSelectedAnswer(null);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setShowHints(false);
      setShowQuiz(false);
      setQuizSubmitted(false);
      setSelectedAnswer(null);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div>
              <div className="text-sm text-gray-400">
                Lesson {currentLesson.order} of {lessons.length}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {currentLesson.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">
              {currentLesson.duration}
            </span>
            <span className="px-3 py-1 bg-[#00d4ff]/20 border border-[#00d4ff]/30 rounded-full text-[#00d4ff]">
              {currentLesson.xpReward} XP
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 capitalize">
              {currentLesson.category}
            </span>
          </div>
        </div>

        {/* Main Content - Book Style */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-6">
          <div className="prose prose-invert prose-lg max-w-none">
            {currentLesson.conceptText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-300 leading-relaxed mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Language Switcher */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-white">See It In Action</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`flex-shrink-0 px-4 py-2 text-sm rounded-lg transition min-h-[44px] active:scale-[0.95] flex items-center gap-2 ${
                  selectedLanguage === lang.id
                    ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${lang.color}`} />
                {lang.name}
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className="bg-[#0d0d1a] border border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0f] border-b border-white/5">
              <span className="text-xs text-gray-500">
                {currentLesson.id}.
                {selectedLanguage === 'python' ? 'py' : selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : selectedLanguage === 'csharp' ? 'cs' : selectedLanguage === 'typescript' ? 'ts' : 'js'}
              </span>
              <span className="text-xs text-[#00d4ff] font-medium">
                {languages.find(l => l.id === selectedLanguage)?.name}
              </span>
            </div>
            <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
              <code>{currentLesson.codeExamples[selectedLanguage]}</code>
            </pre>
          </div>
        </div>

        {/* Hints Section */}
        <div className="mb-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition mb-3"
          >
            <Lightbulb className="w-5 h-5" />
            <span className="font-medium">
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </span>
          </button>
          
          {showHints && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 space-y-3">
              {currentLesson.hints.map((hint, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {hint}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Try It Challenge */}
        {currentLesson.tryIt && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Try It Yourself</h3>
            <p className="text-gray-300">{currentLesson.tryIt}</p>
          </div>
        )}

        {/* Quiz Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="flex items-center gap-2 text-[#00d4ff] hover:text-[#00a8cc] transition mb-3"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">
              {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
            </span>
          </button>

          {showQuiz && currentLesson.quiz.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
              {currentLesson.quiz.map((q, qIndex) => (
                <div key={qIndex}>
                  <p className="text-white font-medium mb-4">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => !quizSubmitted && setSelectedAnswer(oIndex)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-lg border transition ${
                          quizSubmitted
                            ? oIndex === q.correctAnswer
                              ? 'bg-green-500/20 border-green-500/50 text-white'
                              : oIndex === selectedAnswer
                              ? 'bg-red-500/20 border-red-500/50 text-white'
                              : 'bg-white/5 border-white/10 text-gray-400'
                            : selectedAnswer === oIndex
                            ? 'bg-[#00d4ff]/20 border-[#00d4ff]/50 text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {quizSubmitted && (
                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-gray-300 leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              ))}

              {!quizSubmitted && selectedAnswer !== null && (
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full min-h-[48px] px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Submit Answer
                </button>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-xl font-semibold transition-all ${
              canGoPrev
                ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-[0.98]'
                : 'bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-xl font-semibold transition-all ${
              canGoNext
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white hover:opacity-90 active:scale-[0.98]'
                : 'bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed'
            }`}
          >
            Next Lesson
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {lessons.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentLessonIndex(index);
                setShowHints(false);
                setShowQuiz(false);
                setQuizSubmitted(false);
                setSelectedAnswer(null);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentLessonIndex
                  ? 'bg-[#00d4ff] w-8'
                  : index < currentLessonIndex
                  ? 'bg-green-500'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

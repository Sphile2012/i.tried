/**
 * Modern Lesson Reader
 * Lessons displayed with modern navy/light/sky blue theme
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Code2, Lightbulb, CheckCircle, Clock, Award } from 'lucide-react';
import { getAllLessons } from '@/data/comprehensive-curriculum';
import type { LanguageId } from '@/data/languages';
import { cleanMarkdown, cleanMarkdownPreserveStructure } from '@/utils/cleanMarkdown';

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
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const currentLesson = lessons[currentLessonIndex];
  const canGoPrev = currentLessonIndex > 0;
  const canGoNext = currentLessonIndex < lessons.length - 1;

  const handleNext = () => {
    if (canGoNext && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentLessonIndex(currentLessonIndex + 1);
        setShowHints(false);
        setShowQuiz(false);
        setQuizSubmitted(false);
        setSelectedAnswer(null);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (canGoPrev && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentLessonIndex(currentLessonIndex - 1);
        setShowHints(false);
        setShowQuiz(false);
        setQuizSubmitted(false);
        setSelectedAnswer(null);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A1931] py-8 pt-20">
      {/* Modern Container */}
      <div className="max-w-5xl mx-auto px-4">
        {/* Main Content Card */}
        <div className={`bg-[#F5F7FF] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${isFlipping ? 'scale-95 opacity-90' : 'scale-100'}`}>
          
          {/* Page Navigation Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#0A1931] border-b-2 border-[#38BDF8]">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev || isFlipping}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                canGoPrev && !isFlipping
                  ? 'text-[#38BDF8] hover:bg-[#38BDF8]/10'
                  : 'text-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Page {currentLesson.order > 1 ? currentLesson.order - 1 : 1}</span>
            </button>
            
            <div className="text-center">
              <div className="text-xs text-[#F5F7FF]/60 uppercase tracking-wider">
                Page {currentLesson.order}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoNext || isFlipping}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                canGoNext && !isFlipping
                  ? 'text-[#38BDF8] hover:bg-[#38BDF8]/10'
                  : 'text-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              <span className="hidden sm:inline">Page {currentLesson.order < lessons.length ? currentLesson.order + 1 : lessons.length}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Lesson Content */}
          <div className="p-8 sm:p-12">
            {/* Lesson Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-[#38BDF8] text-[#0A1931] rounded-full">
                  Lesson {currentLesson.order} of {lessons.length}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-[#38BDF8]/10 text-[#38BDF8] rounded-full">
                  <Clock className="w-3 h-3" />
                  {currentLesson.duration}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-[#38BDF8]/10 text-[#38BDF8] rounded-full capitalize">
                  <Award className="w-3 h-3" />
                  {currentLesson.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#0A1931] mb-4">
                {currentLesson.title}
              </h1>
            </div>

            {/* Main Text */}
            <div className="text-[#0A1931] leading-relaxed text-base sm:text-lg space-y-6 mb-8">
              {cleanMarkdownPreserveStructure(currentLesson.conceptText).split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Code Examples Card */}
        <div className="mt-6 bg-[#F5F7FF] rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-[#0A1931] mb-6 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-[#38BDF8]" />
              Code Examples
            </h2>

            {/* Language Selector with Dropdown Arrow */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0A1931]/70 mb-3">
                Select Programming Language
              </label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as LanguageId)}
                  onFocus={() => setIsLanguageDropdownOpen(true)}
                  onBlur={() => setIsLanguageDropdownOpen(false)}
                  className="w-full sm:w-64 px-4 py-3 pr-10 bg-[#0A1931] border-2 border-[#0A1931] rounded-lg text-[#F5F7FF] focus:outline-none focus:border-[#38BDF8] transition appearance-none font-medium"
                  style={{ backgroundImage: 'none' }}
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <ChevronDown 
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#38BDF8] pointer-events-none transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </div>

            {/* Code Block - Dark Theme with Sky Blue Syntax */}
            <div className="bg-[#0A1931] border-2 border-[#38BDF8]/20 rounded-2xl p-6 overflow-x-auto shadow-inner">
              <pre className="text-[#F5F7FF] font-mono text-sm leading-relaxed whitespace-pre-wrap">
                <code className="text-[#38BDF8]">{currentLesson.codeExamples[selectedLanguage]}</code>
              </pre>
            </div>

            {/* Try It Section */}
            {currentLesson.tryIt && (
              <div className="mt-6 bg-[#38BDF8]/10 border-l-4 border-[#38BDF8] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#0A1931] mb-3 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#38BDF8]" />
                  Try It Yourself
                </h3>
                <p className="text-[#0A1931] leading-relaxed">{cleanMarkdown(currentLesson.tryIt)}</p>
              </div>
            )}

            {/* Hints Section */}
            {currentLesson.hints.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 text-[#0A1931] rounded-lg font-medium transition-all"
                >
                  <Lightbulb className="w-5 h-5 text-[#38BDF8]" />
                  <span>{showHints ? 'Hide Hints' : 'Show Hints'}</span>
                  <ChevronDown className={`w-4 h-4 text-[#38BDF8] transition-transform duration-200 ${showHints ? 'rotate-180' : ''}`} />
                </button>
                
                {showHints && (
                  <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 space-y-2">
                    {currentLesson.hints.map((hint, index) => (
                      <p key={index} className="text-[#0A1931] leading-relaxed">
                        {cleanMarkdown(hint)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quiz Section */}
            {currentLesson.quiz && currentLesson.quiz.length > 0 && (
              <div className="mt-8">
                <button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 text-[#0A1931] rounded-lg font-medium transition-all"
                >
                  <CheckCircle className="w-5 h-5 text-[#38BDF8]" />
                  <span>{showQuiz ? 'Hide Quiz' : 'Test Your Knowledge'}</span>
                  <ChevronDown className={`w-4 h-4 text-[#38BDF8] transition-transform duration-200 ${showQuiz ? 'rotate-180' : ''}`} />
                </button>

                {showQuiz && (
                  <div className="mt-4 bg-[#0A1931]/5 border-2 border-[#38BDF8]/30 rounded-2xl p-6 space-y-6">
                    {currentLesson.quiz.map((q, qIndex) => (
                      <div key={qIndex}>
                        <p className="text-[#0A1931] font-semibold mb-4">{cleanMarkdown(q.question)}</p>
                        <div className="space-y-2">
                          {q.options.map((option, oIndex) => (
                            <button
                              key={oIndex}
                              onClick={() => !quizSubmitted && setSelectedAnswer(oIndex)}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-4 rounded-lg border-2 font-medium transition-all ${
                                quizSubmitted
                                  ? oIndex === q.correctAnswer
                                    ? 'bg-green-100 border-green-500 text-green-900'
                                    : oIndex === selectedAnswer
                                    ? 'bg-red-100 border-red-500 text-red-900'
                                    : 'bg-white border-gray-300 text-gray-500'
                                  : selectedAnswer === oIndex
                                  ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#0A1931]'
                                  : 'bg-white border-gray-300 text-[#0A1931] hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]/50'
                              }`}
                            >
                              {cleanMarkdown(option)}
                            </button>
                          ))}
                        </div>
                        
                        {quizSubmitted && (
                          <div className="mt-4 p-4 bg-[#38BDF8]/10 border-l-4 border-[#38BDF8] rounded-lg">
                            <p className="text-[#0A1931] leading-relaxed">{cleanMarkdown(q.explanation)}</p>
                          </div>
                        )}
                      </div>
                    ))}

                    {!quizSubmitted && selectedAnswer !== null && (
                      <button
                        onClick={handleSubmitQuiz}
                        className="w-full px-6 py-3 bg-[#38BDF8] text-[#0A1931] rounded-lg font-bold hover:bg-[#38BDF8]/90 transition-all shadow-md"
                      >
                        Submit Answer
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F5F7FF] rounded-2xl p-6 shadow-lg">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev || isFlipping}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
              canGoPrev && !isFlipping
                ? 'bg-[#38BDF8] text-[#0A1931] hover:bg-[#38BDF8]/90 shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Progress Indicator */}
          <div className="text-center">
            <div className="text-sm text-[#0A1931]/60 font-medium mb-3">
              Lesson {currentLesson.order} of {lessons.length}
            </div>
            <div className="flex items-center gap-2">
              {lessons.slice(0, 10).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentLessonIndex
                      ? 'bg-[#38BDF8] w-8'
                      : index < currentLessonIndex
                      ? 'bg-green-500 w-2'
                      : 'bg-gray-300 w-2'
                  }`}
                />
              ))}
              {lessons.length > 10 && <span className="text-[#0A1931]/40 text-xs">+{lessons.length - 10}</span>}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!canGoNext || isFlipping}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
              canGoNext && !isFlipping
                ? 'bg-[#38BDF8] text-[#0A1931] hover:bg-[#38BDF8]/90 shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

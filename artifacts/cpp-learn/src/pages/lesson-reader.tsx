/**
 * Book-Style Lesson Reader
 * Lessons displayed as physical book pages
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
  const [isFlipping, setIsFlipping] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-8">
      {/* Book Container */}
      <div className="max-w-5xl mx-auto px-4">
        {/* Book with Page Flip Effect */}
        <div className={`relative bg-white shadow-2xl rounded-r-2xl transition-transform duration-300 ${isFlipping ? 'scale-95 opacity-90' : 'scale-100'}`}
             style={{
               boxShadow: '-5px 5px 20px rgba(0,0,0,0.3), inset 2px 0 5px rgba(0,0,0,0.1)',
               background: 'linear-gradient(to right, #fefefe 0%, #ffffff 3%, #ffffff 97%, #f5f5f5 100%)'
             }}>
          
          {/* Page Binding Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-amber-100/50 to-transparent pointer-events-none" />
          
          {/* Left Page Number */}
          <div className="absolute left-8 top-8 text-amber-800/40 text-sm font-serif">
            Page {currentLesson.order * 2 - 1}
          </div>
          
          {/* Right Page Number */}
          <div className="absolute right-8 top-8 text-amber-800/40 text-sm font-serif">
            Page {currentLesson.order * 2}
          </div>

          {/* Page Content */}
          <div className="p-12 sm:p-16 min-h-[600px]">
            {/* Chapter Header */}
            <div className="mb-8 pb-6 border-b-2 border-amber-200">
              <div className="text-xs uppercase tracking-widest text-amber-700/60 mb-2 font-serif">
                Lesson {currentLesson.order} of {lessons.length}
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-3">
                {currentLesson.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-amber-700/70">
                <span className="italic">{currentLesson.duration}</span>
                <span>•</span>
                <span className="capitalize">{currentLesson.category}</span>
              </div>
            </div>

            {/* Main Text - Book Paragraphs */}
            <div className="font-serif text-gray-800 leading-relaxed text-base sm:text-lg space-y-6">
              {currentLesson.conceptText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-justify first-letter:text-5xl first-letter:font-bold first-letter:text-amber-800 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Code Examples Page */}
        <div className="mt-6 bg-white shadow-2xl rounded-r-2xl overflow-hidden"
             style={{
               boxShadow: '-5px 5px 20px rgba(0,0,0,0.3), inset 2px 0 5px rgba(0,0,0,0.1)',
               background: 'linear-gradient(to right, #fefefe 0%, #ffffff 3%, #ffffff 97%, #f5f5f5 100%)'
             }}>
          
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-amber-100/50 to-transparent pointer-events-none" />
          
          <div className="p-12 sm:p-16">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 border-b-2 border-amber-200 pb-3">
              Code Examples
            </h2>

            {/* Language Tabs */}
            <div className="flex gap-2 flex-wrap mb-6">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`px-4 py-2 text-sm font-medium rounded transition ${
                    selectedLanguage === lang.id
                      ? 'bg-amber-700 text-white shadow'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="bg-gray-50 border-2 border-amber-200 rounded p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-800 whitespace-pre-wrap">{currentLesson.codeExamples[selectedLanguage]}</pre>
            </div>

            {/* Try It Section */}
            {currentLesson.tryIt && (
              <div className="mt-6 bg-amber-50 border-l-4 border-amber-600 p-6 rounded">
                <h3 className="text-lg font-serif font-bold text-amber-900 mb-2">Try It Yourself</h3>
                <p className="font-serif text-gray-800 leading-relaxed">{currentLesson.tryIt}</p>
              </div>
            )}

            {/* Hints Section */}
            {currentLesson.hints.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 text-amber-800 hover:text-amber-900 font-serif font-medium mb-3"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span>{showHints ? 'Hide Hints' : 'Show Hints'}</span>
                </button>
                
                {showHints && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded p-4 space-y-2">
                    {currentLesson.hints.map((hint, index) => (
                      <p key={index} className="font-serif text-gray-800 leading-relaxed">
                        💡 {hint}
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
                  className="flex items-center gap-2 text-amber-800 hover:text-amber-900 font-serif font-medium mb-4"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{showQuiz ? 'Hide Quiz' : 'Test Your Knowledge'}</span>
                </button>

                {showQuiz && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-6">
                    {currentLesson.quiz.map((q, qIndex) => (
                      <div key={qIndex}>
                        <p className="font-serif text-gray-900 font-semibold mb-4">{q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((option, oIndex) => (
                            <button
                              key={oIndex}
                              onClick={() => !quizSubmitted && setSelectedAnswer(oIndex)}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-3 rounded border-2 font-serif transition ${
                                quizSubmitted
                                  ? oIndex === q.correctAnswer
                                    ? 'bg-green-100 border-green-500 text-green-900 font-medium'
                                    : oIndex === selectedAnswer
                                    ? 'bg-red-100 border-red-500 text-red-900'
                                    : 'bg-white border-gray-200 text-gray-500'
                                  : selectedAnswer === oIndex
                                  ? 'bg-amber-100 border-amber-500 text-amber-900'
                                  : 'bg-white border-gray-300 text-gray-800 hover:bg-amber-50'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        
                        {quizSubmitted && (
                          <div className="mt-4 p-4 bg-blue-100 border-l-4 border-blue-600 rounded">
                            <p className="font-serif text-gray-800 leading-relaxed">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}

                    {!quizSubmitted && selectedAnswer !== null && (
                      <button
                        onClick={handleSubmitQuiz}
                        className="w-full px-6 py-3 bg-amber-700 text-white rounded-lg font-serif font-semibold hover:bg-amber-800 transition shadow-md"
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

        {/* Page Navigation - Book Style */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev || isFlipping}
            className={`flex items-center gap-2 px-8 py-4 rounded-lg font-serif font-semibold transition-all shadow-md ${
              canGoPrev && !isFlipping
                ? 'bg-amber-700 text-white hover:bg-amber-800 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous Page
          </button>

          {/* Page Counter */}
          <div className="text-center">
            <div className="text-sm text-amber-800/60 font-serif">
              Lesson {currentLesson.order} of {lessons.length}
            </div>
            <div className="flex items-center gap-2 mt-2">
              {lessons.slice(0, 10).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-6 rounded-sm transition-all ${
                    index === currentLessonIndex
                      ? 'bg-amber-700 w-3'
                      : index < currentLessonIndex
                      ? 'bg-green-600'
                      : 'bg-amber-300'
                  }`}
                />
              ))}
              {lessons.length > 10 && <span className="text-amber-800/40">...</span>}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!canGoNext || isFlipping}
            className={`flex items-center gap-2 px-8 py-4 rounded-lg font-serif font-semibold transition-all shadow-md ${
              canGoNext && !isFlipping
                ? 'bg-amber-700 text-white hover:bg-amber-800 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next Page
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

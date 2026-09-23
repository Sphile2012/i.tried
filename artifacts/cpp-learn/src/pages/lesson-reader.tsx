/**
 * Modern Lesson Reader
 * Fetches lessons from backend API
 */

import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { ChevronLeft, ChevronRight, Lightbulb, Clock, Award, ArrowLeft } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  xpReward: number;
  hints: string[];
  nextLessonId: string | null;
  previousLessonId: string | null;
}

export default function LessonReaderPage() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const lessonId = urlParams.get('id');
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    if (!lessonId) {
      setError('No lesson ID provided');
      setLoading(false);
      return;
    }

    fetchLesson(lessonId);
  }, [lessonId]);

  const fetchLesson = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/curriculum/lesson/${id}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch lesson');
      }

      const data = await response.json();
      setLesson(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lesson');
      console.error('Error fetching lesson:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FF] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#38BDF8] mb-4"></div>
          <p className="text-[#0A1931]/60">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-[#F5F7FF] flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="bg-white rounded-2xl p-8 border border-red-200">
            <p className="text-red-600 mb-4">{error || 'Lesson not found'}</p>
            <Link href="/browse">
              <a className="inline-block px-6 py-3 bg-[#38BDF8] text-white rounded-lg font-medium hover:bg-[#0EA5E9] transition">
                Back to Browse
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/browse">
          <a className="inline-flex items-center gap-2 text-[#0A1931]/60 hover:text-[#38BDF8] transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Lessons
          </a>
        </Link>

        {/* Lesson Header */}
        <div className="bg-white rounded-2xl p-8 mb-6 border border-[#0A1931]/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-bold rounded-full uppercase">
              {lesson.difficulty}
            </span>
            <span className="flex items-center gap-1 text-sm text-[#0A1931]/60">
              <Award className="w-4 h-4" />
              {lesson.xpReward} XP
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-[#0A1931] mb-2">
            {lesson.title}
          </h1>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-2xl p-8 mb-6 border border-[#0A1931]/10">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-[#0A1931]/80 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </div>

        {/* Hints Section */}
        {lesson.hints && lesson.hints.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#0A1931]/10 mb-6">
            <button
              onClick={() => setShowHints(!showHints)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F5F7FF] transition"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-[#38BDF8]" />
                <span className="font-semibold text-[#0A1931]">
                  Hints ({lesson.hints.length})
                </span>
              </div>
              <ChevronRight className={`w-5 h-5 text-[#0A1931]/40 transition-transform ${showHints ? 'rotate-90' : ''}`} />
            </button>
            
            {showHints && (
              <div className="px-6 pb-6 space-y-3">
                {lesson.hints.map((hint, index) => (
                  <div key={index} className="p-4 bg-[#38BDF8]/5 rounded-lg border-l-4 border-[#38BDF8]">
                    <p className="text-sm text-[#0A1931]/70">{hint}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {lesson.previousLessonId ? (
            <Link href={`/lesson-reader?id=${lesson.previousLessonId}`}>
              <a className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#0A1931]/10 text-[#0A1931] rounded-xl font-medium hover:border-[#38BDF8] hover:bg-[#38BDF8]/5 transition">
                <ChevronLeft className="w-4 h-4" />
                Previous Lesson
              </a>
            </Link>
          ) : (
            <div></div>
          )}

          {lesson.nextLessonId ? (
            <Link href={`/lesson-reader?id=${lesson.nextLessonId}`}>
              <a className="flex items-center gap-2 px-6 py-3 bg-[#38BDF8] text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition">
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </a>
            </Link>
          ) : (
            <Link href="/browse">
              <a className="px-6 py-3 bg-[#38BDF8] text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition">
                Back to Browse
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

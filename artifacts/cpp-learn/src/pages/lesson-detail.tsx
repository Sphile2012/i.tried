import { Link, useParams, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { ArrowLeft, Play, BookOpen, Code, Brain, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cleanMarkdown } from '@/utils/cleanMarkdown';

const courseDataByLanguage: Record<string, Record<string, any>> = {
  cpp: {
    '1': { title: 'C++ Fundamentals', level: 'Beginner', description: 'Master the basics of C++ programming.', modules: [
      { title: 'Getting Started', lessons: [
        { id: '1-1', title: 'Introduction to C++', type: 'text', duration: '10 min', completed: false },
        { id: '1-2', title: 'Setting Up Environment', type: 'text', duration: '15 min', completed: false },
        { id: '1-3', title: 'Your First Program', type: 'exercise', duration: '20 min', completed: false },
      ]},
      { title: 'Variables & Data Types', lessons: [
        { id: '2-1', title: 'Understanding Variables', type: 'text', duration: '12 min', completed: false },
        { id: '2-2', title: 'Data Types in C++', type: 'text', duration: '18 min', completed: false },
        { id: '2-3', title: 'Working with Variables', type: 'exercise', duration: '25 min', completed: false },
        { id: '2-4', title: 'Variables Quiz', type: 'quiz', duration: '10 min', completed: false },
      ]},
      { title: 'Control Flow', lessons: [
        { id: '3-1', title: 'Conditional Statements', type: 'text', duration: '15 min', completed: false },
        { id: '3-2', title: 'Loops', type: 'text', duration: '20 min', completed: false },
        { id: '3-3', title: 'Control Flow Exercises', type: 'exercise', duration: '30 min', completed: false },
      ]},
    ]},
  },
  javascript: {
    '1': { title: 'JavaScript Fundamentals', level: 'Beginner', description: 'Master the basics of JavaScript programming.', modules: [
      { title: 'Getting Started', lessons: [
        { id: '1-1', title: 'Introduction to JavaScript', type: 'text', duration: '10 min', completed: false },
        { id: '1-2', title: 'Setting Up Environment', type: 'text', duration: '15 min', completed: false },
        { id: '1-3', title: 'Your First Program', type: 'exercise', duration: '20 min', completed: false },
      ]},
      { title: 'Variables & Data Types', lessons: [
        { id: '2-1', title: 'Understanding Variables', type: 'text', duration: '12 min', completed: false },
        { id: '2-2', title: 'Data Types in JavaScript', type: 'text', duration: '18 min', completed: false },
        { id: '2-3', title: 'Working with Variables', type: 'exercise', duration: '25 min', completed: false },
        { id: '2-4', title: 'Variables Quiz', type: 'quiz', duration: '10 min', completed: false },
      ]},
      { title: 'Control Flow', lessons: [
        { id: '3-1', title: 'Conditional Statements', type: 'text', duration: '15 min', completed: false },
        { id: '3-2', title: 'Loops', type: 'text', duration: '20 min', completed: false },
        { id: '3-3', title: 'Control Flow Exercises', type: 'exercise', duration: '30 min', completed: false },
      ]},
    ]},
  },
  python: {
    '1': { title: 'Python Fundamentals', level: 'Beginner', description: 'Master the basics of Python programming.', modules: [
      { title: 'Getting Started', lessons: [
        { id: '1-1', title: 'Introduction to Python', type: 'text', duration: '10 min', completed: false },
        { id: '1-2', title: 'Setting Up Environment', type: 'text', duration: '15 min', completed: false },
        { id: '1-3', title: 'Your First Program', type: 'exercise', duration: '20 min', completed: false },
      ]},
      { title: 'Variables & Data Types', lessons: [
        { id: '2-1', title: 'Understanding Variables', type: 'text', duration: '12 min', completed: false },
        { id: '2-2', title: 'Data Types in Python', type: 'text', duration: '18 min', completed: false },
        { id: '2-3', title: 'Working with Variables', type: 'exercise', duration: '25 min', completed: false },
        { id: '2-4', title: 'Variables Quiz', type: 'quiz', duration: '10 min', completed: false },
      ]},
      { title: 'Control Flow', lessons: [
        { id: '3-1', title: 'Conditional Statements', type: 'text', duration: '15 min', completed: false },
        { id: '3-2', title: 'Loops', type: 'text', duration: '20 min', completed: false },
        { id: '3-3', title: 'Control Flow Exercises', type: 'exercise', duration: '30 min', completed: false },
      ]},
    ]},
  },
};

export default function LessonDetail() {
  const { id } = useParams();
  const [location] = useLocation();
  
  // Get language from URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const urlLanguage = urlParams.get('language') || 'cpp';
  
  // Get course data based on selected language
  const languageCourses = courseDataByLanguage[urlLanguage] || courseDataByLanguage['cpp'];
  const course = languageCourses[id as string] || languageCourses['1'];
  const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
  const progress = 0;
  
  const handleEnroll = () => {
    // Mark as enrolled in localStorage
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolled.includes(id)) {
      enrolled.push(id);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
    }
    // Redirect to first lesson
    const firstLesson = course.modules[0]?.lessons[0];
    if (firstLesson) {
      window.location.href = `/lessons/${firstLesson.id}`;
    }
  };
  
  const iconForType = (type: string) => {
    switch(type) { 
      case 'text': return <BookOpen className="h-4 w-4" />; 
      case 'exercise': return <Code className="h-4 w-4" />; 
      case 'quiz': return <Brain className="h-4 w-4" />; 
      default: return <BookOpen className="h-4 w-4" />; 
    }
  };
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Max-width container with responsive padding */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Back button */}
        <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
          <ArrowLeft className="h-4 w-4" /> 
          Back to Courses
        </Link>
        
        {/* Course Header Card */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            {/* Header - Stack on mobile, row on desktop */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 break-words">
                  {cleanMarkdown(course.title)}
                </h1>
                <p className="text-slate-400 text-sm sm:text-base mb-4 break-words">
                  {cleanMarkdown(course.description)}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary">{course.level}</Badge>
                  <span className="text-sm text-slate-400">{totalLessons} lessons</span>
                </div>
              </div>
              {/* Button - Full width on mobile, auto width on desktop */}
              <Button 
                onClick={handleEnroll}
                className="w-full md:w-auto md:min-w-[140px] shrink-0"
              >
                Enroll Now
              </Button>
            </div>
            
            {/* Progress bar - Full width */}
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
        
        {/* Modules */}
        <div className="space-y-4">
          {course.modules.map((module: any, mi: number) => (
            <Card key={mi}>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg break-words">
                  {module.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4 sm:p-6 pt-0">
                {module.lessons.map((lesson: any) => (
                  <div 
                    key={lesson.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg border border-slate-800 p-3 sm:p-4 hover:bg-slate-800/50 transition-colors cursor-pointer min-h-[80px] sm:min-h-[60px]"
                  >
                    {/* Icon */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 shrink-0">
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        iconForType(lesson.type)
                      )}
                    </div>
                    
                    {/* Content - Full width, allows wrapping */}
                    <div className="flex-1 min-w-0 w-full">
                      <p className="text-sm sm:text-base font-medium break-words mb-1">
                        {cleanMarkdown(lesson.title)}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-400 capitalize break-words">
                        {lesson.type} - {lesson.duration}
                      </p>
                    </div>
                    
                    {/* Quiz button */}
                    {lesson.type === 'quiz' && (
                      <Link href={`/quiz/${lesson.id}`} className="w-full sm:w-auto">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full sm:w-auto whitespace-nowrap"
                        >
                          Start Quiz
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

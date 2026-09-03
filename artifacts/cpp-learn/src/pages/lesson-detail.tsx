import { Link, useParams } from 'wouter';
import { ArrowLeft, Play, BookOpen, Code, Brain, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const courseData: Record<string, any> = {
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
};

export default function LessonDetail() {
  const { id } = useParams();
  const course = courseData[id as string] || courseData['1'];
  const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
  const progress = 0;
  const iconForType = (type: string) => {
    switch(type) { case 'text': return <BookOpen className="h-4 w-4" />; case 'exercise': return <Code className="h-4 w-4" />; case 'quiz': return <Brain className="h-4 w-4" />; default: return <BookOpen className="h-4 w-4" />; }
  };
  return (
    <div className="space-y-6">
      <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"><ArrowLeft className="h-4 w-4" /> Back to Courses</Link>
      <Card><CardContent className="p-6">
        <div className="flex items-start justify-between mb-4"><div><h1 className="text-2xl font-bold mb-2">{course.title}</h1><p className="text-slate-400 mb-4">{course.description}</p><div className="flex items-center gap-3"><Badge variant="secondary">{course.level}</Badge><span className="text-sm text-slate-400">{totalLessons} lessons</span></div></div><Button>Enroll Now</Button></div>
        <div className="space-y-2"><div className="flex justify-between text-sm"><span className="text-slate-400">Progress</span><span className="font-medium">{progress}%</span></div><Progress value={progress} /></div>
      </CardContent></Card>
      <div className="space-y-4">
        {course.modules.map((module: any, mi: number) => (
          <Card key={mi}><CardHeader><CardTitle className="text-lg">{module.title}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {module.lessons.map((lesson: any) => (
                <div key={lesson.id} className="flex items-center gap-3 rounded-lg border border-slate-800 p-3 hover:bg-slate-800/50 transition-colors cursor-pointer">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800">{lesson.completed ? <CheckCircle className="h-5 w-5 text-green-500" /> : iconForType(lesson.type)}</div>
                  <div className="flex-1"><p className="text-sm font-medium">{lesson.title}</p><p className="text-xs text-slate-400 capitalize">{lesson.type} - {lesson.duration}</p></div>
                  {lesson.type === 'quiz' && <Link href={`/quiz/${lesson.id}`}><Button size="sm" variant="outline">Start Quiz</Button></Link>}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Calendar, Target, TrendingUp, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const studyPlan = [
  { day: 'Monday', task: 'C++ Variables & Data Types', duration: '45 min', completed: false },
  { day: 'Tuesday', task: 'Control Flow Exercises', duration: '60 min', completed: false },
  { day: 'Wednesday', task: 'Functions Quiz', duration: '30 min', completed: false },
  { day: 'Thursday', task: 'Arrays Practice', duration: '45 min', completed: false },
  { day: 'Friday', task: 'Code Playground Project', duration: '90 min', completed: false },
];

export default function AIStudyPlanner() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold mb-2">AI Study Planner</h1><p className="text-slate-400">Personalized learning plan powered by AI</p></div>
        <Button><Plus className="h-4 w-4 mr-2" />New Goal</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-3 mb-3"><Target className="h-8 w-8 text-blue-400" /><div><p className="text-sm text-slate-400">Weekly Goal</p><p className="text-2xl font-bold">5 hours</p></div></div><Progress value={0} /></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-3 mb-3"><TrendingUp className="h-8 w-8 text-green-400" /><div><p className="text-sm text-slate-400">Current Streak</p><p className="text-2xl font-bold">0 days</p></div></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-3 mb-3"><Clock className="h-8 w-8 text-purple-400" /><div><p className="text-sm text-slate-400">Total Study Time</p><p className="text-2xl font-bold">0 hrs</p></div></div></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>This Week Plan</CardTitle></CardHeader><CardContent className="space-y-3">
        {studyPlan.map((item, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border border-slate-800 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800"><Calendar className="h-5 w-5 text-blue-400" /></div>
            <div className="flex-1"><p className="font-medium">{item.task}</p><p className="text-sm text-slate-400">{item.day} - {item.duration}</p></div>
            <Badge variant={item.completed ? 'success' : 'outline'}>{item.completed ? 'Done' : 'Pending'}</Badge>
          </div>
        ))}
      </CardContent></Card>
    </div>
  );
}

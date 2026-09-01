import { Trophy, Award, Flame, Zap, Target, Medal, Crown, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const badges = [
  { id: 1, name: 'First Steps', description: 'Complete your first lesson', icon: CheckCircle, color: 'text-green-400', earned: false },
  { id: 2, name: 'Code Warrior', description: 'Complete 10 coding exercises', icon: Zap, color: 'text-blue-400', earned: false },
  { id: 3, name: 'Quiz Master', description: 'Pass 5 quizzes with 100%', icon: Trophy, color: 'text-purple-400', earned: false },
  { id: 4, name: 'On Fire', description: 'Maintain a 7-day streak', icon: Flame, color: 'text-orange-400', earned: false },
  { id: 5, name: 'Goal Getter', description: 'Complete your first course', icon: Target, color: 'text-green-400', earned: false },
  { id: 6, name: 'Scholar', description: 'Complete 10 lessons', icon: Award, color: 'text-cyan-400', earned: false },
  { id: 7, name: 'Champion', description: 'Reach level 10', icon: Medal, color: 'text-red-400', earned: false },
  { id: 8, name: 'Legend', description: 'Reach level 25', icon: Crown, color: 'text-amber-400', earned: false },
];

const leaderboard = [
  { rank: 1, name: 'Alice', xp: 12500, avatar: 'A' },
  { rank: 2, name: 'Bob', xp: 10200, avatar: 'B' },
  { rank: 3, name: 'Charlie', xp: 8700, avatar: 'C' },
  { rank: 4, name: 'You', xp: 0, avatar: 'Y', isYou: true },
  { rank: 5, name: 'Eve', xp: 0, avatar: 'E' },
];

export default function Achievements() {
  return (
    <div className="space-y-8">
      <div><h1 className="text-2xl font-bold mb-2">Achievements</h1><p className="text-slate-400">Track your progress and earn badges</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-6 text-center"><div className="text-3xl font-bold text-blue-400 mb-1">0</div><p className="text-sm text-slate-400">Total XP</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><div className="text-3xl font-bold text-purple-400 mb-1">1</div><p className="text-sm text-slate-400">Level</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><div className="text-3xl font-bold text-orange-400 mb-1">0</div><p className="text-sm text-slate-400">Day Streak</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><div className="text-3xl font-bold text-green-400 mb-1">0</div><p className="text-sm text-slate-400">Badges Earned</p></CardContent></Card>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <Card key={badge.id} className={badge.earned ? 'border-green-500/50' : 'opacity-60'}><CardContent className="p-6 text-center">
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 mb-3 ${badge.earned ? badge.color : 'text-slate-600'}`}><badge.icon className="h-8 w-8" /></div>
              <h3 className="font-semibold mb-1">{badge.name}</h3>
              <p className="text-xs text-slate-400">{badge.description}</p>
              {badge.earned ? <Badge variant="success" className="mt-2">Earned</Badge> : <Badge variant="outline" className="mt-2">Locked</Badge>}
            </CardContent></Card>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
        <Card><CardContent className="p-4 space-y-2">
          {leaderboard.map((entry) => (
            <div key={entry.rank} className={`flex items-center gap-4 rounded-lg p-3 ${entry.isYou ? 'bg-blue-500/10 border border-blue-500/30' : 'hover:bg-slate-800/50'}`}>
              <span className={`text-lg font-bold w-8 ${entry.rank <= 3 ? 'text-yellow-400' : 'text-slate-400'}`}>#{entry.rank}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white font-medium">{entry.avatar}</div>
              <span className="flex-1 font-medium">{entry.name}{entry.isYou && ' (You)'}</span>
              <span className="text-sm text-slate-400">{entry.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </CardContent></Card>
      </div>
    </div>
  );
}
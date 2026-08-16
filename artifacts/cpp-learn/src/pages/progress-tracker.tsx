import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Star,
  Award,
  TrendingUp,
  Target,
  Zap,
  Flame,
  Calendar,
  BookOpen,
  Code,
  Brain,
  Clock,
  ChevronRight,
  Medal,
  Crown,
  Rocket,
  Fire,
  Gem,
  Shield,
  Heart,
  Eye,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Level configuration
const LEVELS = [
  { level: 1, name: 'Beginner', xpRequired: 0, color: 'bg-slate-500' },
  { level: 2, name: 'Learner', xpRequired: 100, color: 'bg-blue-500' },
  { level: 3, name: 'Explorer', xpRequired: 300, color: 'bg-green-500' },
  { level: 4, name: 'Adventurer', xpRequired: 600, color: 'bg-yellow-500' },
  { level: 5, name: 'Scholar', xpRequired: 1000, color: 'bg-orange-500' },
  { level: 6, name: 'Expert', xpRequired: 1500, color: 'bg-red-500' },
  { level: 7, name: 'Master', xpRequired: 2100, color: 'bg-purple-500' },
  { level: 8, name: 'Grandmaster', xpRequired: 3000, color: 'bg-pink-500' },
  { level: 9, name: 'Legend', xpRequired: 4000, color: 'bg-cyan-500' },
  { level: 10, name: 'Infinity', xpRequired: 5000, color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
];

// Badge definitions
const BADGES = [
  { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: Star, requirement: 1, category: 'milestone' },
  { id: 'lesson_10', name: 'Dedicated Learner', description: 'Complete 10 lessons', icon: BookOpen, requirement: 10, category: 'milestone' },
  { id: 'lesson_50', name: 'Knowledge Seeker', description: 'Complete 50 lessons', icon: BookOpen, requirement: 50, category: 'milestone' },
  { id: 'quiz_perfect', name: 'Perfect Score', description: 'Get 100% on any quiz', icon: Trophy, requirement: 1, category: 'achievement' },
  { id: 'quiz_streak_5', name: 'Quiz Streak', description: 'Pass 5 quizzes in a row', icon: Flame, requirement: 5, category: 'streak' },
  { id: 'code_first', name: 'First Code', description: 'Write your first program', icon: Code, requirement: 1, category: 'milestone' },
  { id: 'code_100', name: 'Coder', description: 'Write 100 lines of code', icon: Code, requirement: 100, category: 'achievement' },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day learning streak', icon: Fire, requirement: 7, category: 'streak' },
  { id: 'streak_30', name: 'Monthly Master', description: '30-day learning streak', icon: Calendar, requirement: 30, category: 'streak' },
  { id: 'xp_1000', name: 'XP Hunter', description: 'Earn 1000 XP total', icon: Zap, requirement: 1000, category: 'achievement' },
  { id: 'xp_5000', name: 'XP Master', description: 'Earn 5000 XP total', icon: Gem, requirement: 5000, category: 'achievement' },
  { id: 'level_5', name: 'Scholar', description: 'Reach level 5', icon: Medal, requirement: 5, category: 'milestone' },
  { id: 'level_10', name: 'Infinity Coder', description: 'Reach max level', icon: Crown, requirement: 10, category: 'milestone' },
  { id: 'challenge_first', name: 'Challenger', description: 'Complete first challenge', icon: Target, requirement: 1, category: 'achievement' },
  { id: 'challenge_10', name: 'Problem Solver', description: 'Complete 10 challenges', icon: Brain, requirement: 10, category: 'achievement' },
  { id: 'premium', name: 'Premium Member', description: 'Subscribe to Premium', icon: Crown, requirement: 1, category: 'special' },
  { id: 'pro', name: 'Pro Developer', description: 'Subscribe to Pro', icon: Rocket, requirement: 1, category: 'special' },
  { id: 'community_first', name: 'Social Butterfly', description: 'Post in community', icon: Heart, requirement: 1, category: 'community' },
  { id: 'helpful_10', name: 'Helper', description: 'Help 10 community members', icon: Eye, requirement: 10, category: 'community' },
  { id: 'early_adopter', name: 'Early Adopter', description: 'Join during beta', icon: Shield, requirement: 1, category: 'special' },
];

interface UserProgress {
  xp: number;
  level: number;
  lessonsCompleted: number;
  quizzesPassed: number;
  quizzesPerfect: number;
  quizStreak: number;
  bestQuizStreak: number;
  linesOfCode: number;
  challengesCompleted: number;
  currentStreak: number;
  bestStreak: number;
  lastActivity: string;
  totalLearningTime: number; // in minutes
  badges: string[];
  weeklyActivity: number[]; // [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
}

export default function ProgressTracker() {
  const { user } = useAuth();
  
  // Mock progress data (would come from API in real app)
  const [progress, setProgress] = useState<UserProgress>({
    xp: 1250,
    level: 5,
    lessonsCompleted: 23,
    quizzesPassed: 8,
    quizzesPerfect: 2,
    quizStreak: 3,
    bestQuizStreak: 5,
    linesOfCode: 450,
    challengesCompleted: 12,
    currentStreak: 7,
    bestStreak: 14,
    lastActivity: new Date().toISOString(),
    totalLearningTime: 2400, // 40 hours
    badges: ['first_lesson', 'lesson_10', 'code_first', 'streak_7', 'xp_1000', 'level_5'],
    weeklyActivity: [45, 90, 30, 120, 60, 15, 0], // minutes per day
  });

  const currentLevel = LEVELS[progress.level - 1];
  const nextLevel = LEVELS[progress.level] || LEVELS[LEVELS.length - 1];
  const xpForCurrentLevel = currentLevel.xpRequired;
  const xpForNextLevel = nextLevel.xpRequired;
  const xpProgress = ((progress.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  const earnedBadges = BADGES.filter(badge => progress.badges.includes(badge.id));
  const availableBadges = BADGES.filter(badge => !progress.badges.includes(badge.id));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'achievement': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'streak': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'special': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'community': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Your Progress</h1>
        <p className="text-slate-400">Track your learning journey and achievements</p>
      </div>

      {/* Level & XP Card */}
      <Card className="border-slate-800 overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${currentLevel.color} bg-opacity-20`}>
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Level {progress.level}</p>
                <h2 className="text-2xl font-bold text-white">{currentLevel.name}</h2>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Total XP</p>
              <p className="text-2xl font-bold text-yellow-400">{progress.xp.toLocaleString()}</p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Progress to Level {progress.level + 1}</span>
              <span className="text-slate-400">{progress.xp - xpForCurrentLevel} / {xpForNextLevel - xpForCurrentLevel} XP</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${nextLevel.color} rounded-full`}
              />
            </div>
            <p className="text-xs text-slate-500 text-center">
              {xpForNextLevel - progress.xp} XP needed for Level {progress.level + 1} - {nextLevel.name}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{progress.lessonsCompleted}</p>
            <p className="text-sm text-slate-400">Lessons</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{progress.quizzesPassed}</p>
            <p className="text-sm text-slate-400">Quizzes Passed</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Code className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{progress.linesOfCode}</p>
            <p className="text-sm text-slate-400">Lines of Code</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{progress.challengesCompleted}</p>
            <p className="text-sm text-slate-400">Challenges</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{progress.currentStreak}</p>
            <p className="text-sm text-slate-400">Day Streak</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{formatTime(progress.totalLearningTime)}</p>
            <p className="text-sm text-slate-400">Learning Time</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Medal className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{progress.quizzesPerfect}</p>
            <p className="text-sm text-slate-400">Perfect Quizzes</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-pink-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{earnedBadges.length}</p>
            <p className="text-sm text-slate-400">Badges Earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card className="border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32 gap-2">
            {progress.weeklyActivity.map((minutes, index) => {
              const height = Math.max((minutes / 120) * 100, 4); // Minimum height for visibility
              const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-800 rounded-t-lg relative" style={{ height: `${height}%` }}>
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg" />
                  </div>
                  <span className="text-xs text-slate-400">{days[index]}</span>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-slate-400 text-center mt-4">
            Total: {formatTime(progress.weeklyActivity.reduce((a, b) => a + b, 0))} this week
          </p>
        </CardContent>
      </Card>

      {/* Badges */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Earned Badges ({earnedBadges.length}/{BADGES.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {earnedBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Card className={`border-2 ${getCategoryColor(badge.category)} bg-slate-900/50`}>
                    <CardContent className="p-4 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-white" />
                      <p className="text-sm font-semibold text-white">{badge.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{badge.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Available Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {availableBadges.map((badge) => {
              const Icon = badge.icon;
              const progressPercent = Math.min(100, (progress.lessonsCompleted / badge.requirement) * 100);
              return (
                <Card key={badge.id} className="border-slate-800 bg-slate-900/30 opacity-60">
                  <CardContent className="p-4 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-400">{badge.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{badge.description}</p>
                    {badge.category !== 'special' && (
                      <div className="mt-2">
                        <Progress value={progressPercent} className="h-1" />
                        <p className="text-xs text-slate-500 mt-1">
                          {Math.floor(progress.lessonsCompleted)} / {badge.requirement}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievements Summary */}
      <Card className="border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Achievement Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">{progress.lessonsCompleted}</p>
              <p className="text-sm text-slate-400">Lessons Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">{progress.quizzesPassed}</p>
              <p className="text-sm text-slate-400">Quizzes Passed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">{progress.challengesCompleted}</p>
              <p className="text-sm text-slate-400">Challenges Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-400">{progress.currentStreak}</p>
              <p className="text-sm text-slate-400">Current Streak (Days)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">{formatTime(progress.totalLearningTime)}</p>
              <p className="text-sm text-slate-400">Total Learning Time</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-400">{progress.bestStreak}</p>
              <p className="text-sm text-slate-400">Best Streak (Days)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
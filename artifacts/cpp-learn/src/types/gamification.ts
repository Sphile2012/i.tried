/**
 * Gamification System Types
 * XP, Levels, Streaks, Badges, Hearts
 */

export interface UserGameState {
  userId: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  hearts: number; // Max 5
  heartsRegenTime: string | null;
  completedLessons: string[];
  completedQuizzes: string[];
  completedChallenges: string[];
  currentPath: string | null;
  currentLesson: string | null;
  badges: string[];
  weeklyXP: number;
  totalLessonsCompleted: number;
  perfectQuizzes: number;
  bugsFixed: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: string;
  xpReward: number;
  unlockedAt?: Date;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalLessons: number;
  estimatedTime: string;
  xpReward: number;
  icon: string;
  color: string;
  lessons: PathLesson[];
}

export interface PathLesson {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'checkpoint' | 'project';
  duration: string; // "3 min"
  xpReward: number;
  locked: boolean;
  completed: boolean;
  order: number;
}

export interface XPActivity {
  type: 'lesson' | 'quiz' | 'challenge' | 'project' | 'streak' | 'help';
  amount: number;
  timestamp: Date;
  description: string;
}

// XP Calculation
export const calculateLevel = (xp: number): number => {
  // Level formula: sqrt(XP / 50)
  return Math.floor(Math.sqrt(xp / 50)) + 1;
};

export const calculateXPForNextLevel = (currentLevel: number): number => {
  // XP needed for next level: (level)² × 50
  return currentLevel * currentLevel * 50;
};

export const calculateXPProgress = (xp: number, level: number): number => {
  const currentLevelXP = (level - 1) * (level - 1) * 50;
  const nextLevelXP = level * level * 50;
  const xpInCurrentLevel = xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  return (xpInCurrentLevel / xpNeededForLevel) * 100;
};

// XP Rewards
export const XP_REWARDS = {
  LESSON_COMPLETE: 10,
  QUIZ_PERFECT: 20,
  QUIZ_GOOD: 15,
  QUIZ_PASS: 10,
  CHALLENGE_EASY: 10,
  CHALLENGE_MEDIUM: 15,
  CHALLENGE_HARD: 25,
  PROJECT_COMPLETE: 50,
  DAILY_STREAK: 5,
  HELP_FORUM: 3,
  FIRST_LESSON: 20,
  PERFECT_WEEK: 50,
};

// Badge Definitions
export const BADGES: Badge[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    rarity: 'common',
    requirement: 'Complete 1 lesson',
    xpReward: 10,
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    rarity: 'rare',
    requirement: '7 day streak',
    xpReward: 50,
  },
  {
    id: 'loop-ninja',
    name: 'Loop Ninja',
    description: 'Master all loop lessons',
    icon: '🥷',
    rarity: 'rare',
    requirement: 'Complete all loop lessons',
    xpReward: 30,
  },
  {
    id: 'bug-hunter',
    name: 'Bug Hunter',
    description: 'Fix 10 bugs successfully',
    icon: '🐛',
    rarity: 'rare',
    requirement: 'Fix 10 bugs',
    xpReward: 25,
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get 10 perfect quiz scores',
    icon: '💯',
    rarity: 'epic',
    requirement: '10 perfect quizzes',
    xpReward: 100,
  },
  {
    id: 'code-master',
    name: 'Code Master',
    description: 'Reach level 50',
    icon: '👑',
    rarity: 'legendary',
    requirement: 'Reach level 50',
    xpReward: 500,
  },
  {
    id: 'century-club',
    name: 'Century Club',
    description: 'Complete 100 lessons',
    icon: '💯',
    rarity: 'epic',
    requirement: 'Complete 100 lessons',
    xpReward: 200,
  },
  {
    id: 'month-marathon',
    name: 'Month Marathon',
    description: 'Maintain a 30-day streak',
    icon: '🏃',
    rarity: 'epic',
    requirement: '30 day streak',
    xpReward: 150,
  },
  {
    id: 'year-champion',
    name: 'Year Champion',
    description: 'Maintain a 365-day streak',
    icon: '🏆',
    rarity: 'legendary',
    requirement: '365 day streak',
    xpReward: 1000,
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete 10 lessons in one day',
    icon: '⚡',
    rarity: 'rare',
    requirement: 'Complete 10 lessons in 1 day',
    xpReward: 50,
  },
];

// Check if user earned any new badges
export const checkBadges = (gameState: UserGameState): string[] => {
  const newBadges: string[] = [];
  
  BADGES.forEach(badge => {
    if (gameState.badges.includes(badge.id)) return;
    
    let earned = false;
    
    switch (badge.id) {
      case 'first-steps':
        earned = gameState.totalLessonsCompleted >= 1;
        break;
      case 'week-warrior':
        earned = gameState.streak >= 7;
        break;
      case 'bug-hunter':
        earned = gameState.bugsFixed >= 10;
        break;
      case 'perfect-score':
        earned = gameState.perfectQuizzes >= 10;
        break;
      case 'code-master':
        earned = gameState.level >= 50;
        break;
      case 'century-club':
        earned = gameState.totalLessonsCompleted >= 100;
        break;
      case 'month-marathon':
        earned = gameState.streak >= 30;
        break;
      case 'year-champion':
        earned = gameState.streak >= 365;
        break;
    }
    
    if (earned) {
      newBadges.push(badge.id);
    }
  });
  
  return newBadges;
};

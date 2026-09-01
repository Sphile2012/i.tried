/**
 * 6 Language System - Python, C++, JavaScript, Java, TypeScript, C#
 * No Certificates - Skill-Based Learning
 */

export type LanguageId = 'python' | 'cpp' | 'javascript' | 'java' | 'typescript' | 'csharp';

export interface Language {
  id: LanguageId;
  name: string;
  displayName: string;
  color: string;
  icon: string;
  description: string;
  useCase: string;
  difficulty: 'easy' | 'medium' | 'hard';
  syntax: string;
  fileExtension: string;
  focus: string; // What this language focuses on in the app
}

export const LANGUAGES: Record<LanguageId, Language> = {
  python: {
    id: 'python',
    name: 'Python',
    displayName: 'Python',
    color: '#3776AB',
    icon: 'Py',
    description: 'Beginner-friendly language perfect for logic and automation',
    useCase: 'Logic, DSA, Automation',
    difficulty: 'easy',
    syntax: 'python',
    fileExtension: '.py',
    focus: 'Logic, Data Structures, Automation',
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    displayName: 'C++',
    color: '#00599C',
    icon: 'C++',
    description: 'High-performance language for competitive programming and interviews',
    useCase: 'Speed, DSA, Interviews',
    difficulty: 'hard',
    syntax: 'cpp',
    fileExtension: '.cpp',
    focus: 'Pointers, STL, Performance',
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    displayName: 'JavaScript',
    color: '#F7DF1E',
    icon: 'JS',
    description: 'The language of the web - frontend and backend',
    useCase: 'Web Development',
    difficulty: 'easy',
    syntax: 'javascript',
    fileExtension: '.js',
    focus: 'DOM, Frontend Logic',
  },
  java: {
    id: 'java',
    name: 'Java',
    displayName: 'Java',
    color: '#F89820',
    icon: 'Java',
    description: 'Enterprise-grade OOP language for backend and Android',
    useCase: 'OOP, Backend, Android',
    difficulty: 'medium',
    syntax: 'java',
    fileExtension: '.java',
    focus: 'Classes, OOP, Collections',
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    displayName: 'TypeScript',
    color: '#3178C6',
    icon: 'TS',
    description: 'JavaScript with types for safer, scalable code',
    useCase: 'Modern Web',
    difficulty: 'medium',
    syntax: 'typescript',
    fileExtension: '.ts',
    focus: 'Types, Interfaces, JS Upgrade',
  },
  csharp: {
    id: 'csharp',
    name: 'C#',
    displayName: 'C#',
    color: '#68217A',
    icon: 'C#',
    description: 'Microsoft\'s powerful language for games, desktop, and .NET',
    useCase: 'Game Dev, Windows, .NET',
    difficulty: 'medium',
    syntax: 'csharp',
    fileExtension: '.cs',
    focus: 'OOP, Unity, .NET',
  },
};

export const LANGUAGE_ORDER: LanguageId[] = ['python', 'cpp', 'javascript', 'java', 'typescript', 'csharp'];

// User's language progress
export interface LanguageProgress {
  languageId: LanguageId;
  xp: number;
  level: number;
  completedLessons: string[];
  currentLesson: string | null;
  isPrimary: boolean;
  startedAt: Date;
  lastActiveAt: Date;
}

// Get language by difficulty
export const getLanguagesByDifficulty = () => {
  return {
    easy: [LANGUAGES.python, LANGUAGES.javascript],
    medium: [LANGUAGES.java, LANGUAGES.go],
    hard: [LANGUAGES.cpp, LANGUAGES.c],
  };
};

// Recommended learning order
export const RECOMMENDED_ORDER = {
  beginner: ['python', 'javascript', 'java', 'cpp', 'go', 'c'],
  intermediate: ['javascript', 'python', 'java', 'go', 'cpp', 'c'],
  advanced: ['cpp', 'c', 'go', 'java', 'python', 'javascript'],
};

// Language comparison for "show in all languages"
export interface CodeComparison {
  concept: string;
  description: string;
  examples: Record<LanguageId, string>;
}

// Example: For loop in 6 languages
export const LOOP_COMPARISON: CodeComparison = {
  concept: 'For Loop',
  description: 'Iterate from 0 to 9 and print each number',
  examples: {
    cpp: `for (int i = 0; i < 10; i++) {
    cout << i << endl;
}`,
    python: `for i in range(10):
    print(i)`,
    java: `for (int i = 0; i < 10; i++) {
    System.out.println(i);
}`,
    javascript: `for (let i = 0; i < 10; i++) {
    console.log(i);
}`,
    c: `for (int i = 0; i < 10; i++) {
    printf("%d\\n", i);
}`,
    go: `for i := 0; i < 10; i++ {
    fmt.Println(i)
}`,
  },
};

// Calculate level for a language
export const calculateLanguageLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 50)) + 1;
};

// Calculate total level across all languages
export const calculateTotalLevel = (languageProgresses: LanguageProgress[]): number => {
  const totalXP = languageProgresses.reduce((sum, prog) => sum + prog.xp, 0);
  return calculateLanguageLevel(totalXP);
};

// Language-specific badges (Skill-based, no certificates)
export interface LanguageBadge {
  id: string;
  languageId: LanguageId;
  name: string;
  description: string;
  requirement: string;
  icon: string;
}

export const LANGUAGE_BADGES: LanguageBadge[] = [
  {
    id: 'python-logic-master',
    languageId: 'python',
    name: 'Python Logic Master',
    description: 'Complete all Python logic lessons',
    requirement: 'Complete 20 Python lessons',
    icon: '🧠',
  },
  {
    id: 'cpp-pointer-pro',
    languageId: 'cpp',
    name: 'C++ Pointer Pro',
    description: 'Master pointers and memory management',
    requirement: 'Complete C++ pointers module',
    icon: '⚡',
  },
  {
    id: 'js-async-master',
    languageId: 'javascript',
    name: 'JS Async Master',
    description: 'Master callbacks, promises, and async/await',
    requirement: 'Complete JS async module',
    icon: '🌐',
  },
  {
    id: 'java-oop-expert',
    languageId: 'java',
    name: 'Java OOP Expert',
    description: 'Master all OOP concepts in Java',
    requirement: 'Complete Java OOP module',
    icon: '☕',
  },
  {
    id: 'ts-type-guru',
    languageId: 'typescript',
    name: 'TypeScript Type Guru',
    description: 'Master TypeScript type system',
    requirement: 'Complete TypeScript types module',
    icon: '📘',
  },
  {
    id: 'csharp-unity-builder',
    languageId: 'csharp',
    name: 'C# Unity Builder',
    description: 'Build your first Unity project',
    requirement: 'Complete C# Unity project',
    icon: '🎮',
  },
];

// Get user's primary language
export const getPrimaryLanguage = (progresses: LanguageProgress[]): LanguageId => {
  const primary = progresses.find(p => p.isPrimary);
  return primary?.languageId || 'python';
};

// Get user's active languages (started learning)
export const getActiveLanguages = (progresses: LanguageProgress[]): LanguageId[] => {
  return progresses
    .filter(p => p.completedLessons.length > 0)
    .map(p => p.languageId);
};

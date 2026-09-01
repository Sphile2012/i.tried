# Technical Design: PolyCode - 6 Language Learning Platform

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web App    │  │  PWA Mobile  │  │ Admin Panel  │          │
│  │  (React/TS)  │  │ (Service Wkr)│  │  (React/TS)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTPS/WebSocket
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                           │
│                   (Vercel Edge Functions)                        │
│              Rate Limiting • Auth • Load Balancing               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                           │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐      │
│  │  Core API      │  │  Code Executor │  │  AI Service  │      │
│  │  (Node.js)     │  │  (Judge0/      │  │  (GPT-4)     │      │
│  │                │  │   Piston)      │  │              │      │
│  └────────────────┘  └────────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       Data Layer                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐      │
│  │   Firestore    │  │  Cloud Storage │  │   Redis      │      │
│  │   (Primary DB) │  │  (Offline Packs│  │   (Cache)    │      │
│  │                │  │   & Assets)    │  │              │      │
│  └────────────────┘  └────────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Analytics & Monitoring                        │
│           Mixpanel • Sentry • Firebase Analytics                 │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend**
- Framework: React 18 with TypeScript
- State Management: Zustand
- Routing: React Router v6
- UI Components: Tailwind CSS + shadcn/ui
- Code Editor: Monaco Editor (VS Code engine)
- Build: Vite
- PWA: Workbox (Service Worker)
- Offline Storage: IndexedDB (via Dexie.js)

**Backend**
- Runtime: Node.js 20 LTS
- API Framework: Express.js
- Authentication: Firebase Auth
- Database: Firestore (NoSQL)
- File Storage: Firebase Cloud Storage
- Cache: Redis (Upstash)
- Code Execution: Judge0 API (primary) + Piston API (fallback)
- AI: OpenAI GPT-4 API

**DevOps**
- Frontend Hosting: Vercel
- Backend: Cloud Run (Google Cloud)
- CI/CD: GitHub Actions
- Monitoring: Sentry + Cloud Monitoring
- Analytics: Mixpanel

---

## Database Schema

### Firestore Collections

#### **users** Collection
```typescript
interface User {
  uid: string;                    // Firebase Auth UID
  email: string;
  displayName: string;
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  
  // Subscription
  subscriptionTier: 'free' | 'pro';
  subscriptionEndDate: Timestamp | null;
  stripeCustomerId: string | null;
  
  // Learning preferences
  primaryLanguageId: LanguageId;
  activeLanguageIds: LanguageId[];  // Max 6
  skillLevel: Record<LanguageId, 'beginner' | 'intermediate' | 'advanced'>;
  
  // Gamification
  totalXP: number;
  totalLevel: number;
  streakDays: number;
  lastStreakDate: Timestamp;
  streakFreezesUsed: number;        // Max 1 per week
  
  // Settings
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;                  // 50-200%
  vimMode: boolean;
  codeTheme: string;                 // 'vs-dark' | 'monokai' | etc.
  
  // Privacy
  agreedToTerms: boolean;
  codeStorageConsent: boolean;       // "We don't store your code"
}
```

#### **languageProgress** Collection
```typescript
// Path: users/{uid}/languageProgress/{languageId}
interface LanguageProgress {
  userId: string;
  languageId: LanguageId;
  xp: number;
  level: number;
  isPrimary: boolean;
  
  // Progress tracking
  completedLessonIds: string[];
  currentLessonId: string | null;
  completedQuizIds: string[];
  completedProjectIds: string[];
  
  // Analytics
  startedAt: Timestamp;
  lastActiveAt: Timestamp;
  totalMinutesSpent: number;
  averageQuizScore: number;
  
  // Revision tracking
  weakTopics: Array<{
    topicId: string;
    failureCount: number;
    lastFailedAt: Timestamp;
    nextRevisionDate: Timestamp;
  }>;
}
```

#### **lessons** Collection
```typescript
interface Lesson {
  id: string;
  languageId: LanguageId;
  
  // Content
  title: string;
  category: string;                  // 'basics' | 'control-flow' | 'oop' | etc.
  order: number;
  duration: string;                  // '5 min'
  xpReward: number;
  
  // Multi-language content
  conceptText: string;
  diagram?: string;                  // URL or base64
  codeExamples: Record<LanguageId, string>;
  
  // Learning aids
  hints: string[];
  commonErrors: Record<LanguageId, string[]>;
  tips: Record<LanguageId, string[]>;
  
  // Practice
  task?: string;
  starterCode?: Record<LanguageId, string>;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
  }>;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  version: number;
  publishedAt: Timestamp | null;
}
```

#### **quizzes** Collection
```typescript
interface Quiz {
  id: string;
  lessonId: string;
  languageId: LanguageId;
  
  questions: Array<{
    id: string;
    question: string;
    type: 'multiple-choice' | 'code-completion' | 'error-fix';
    options?: string[];               // For multiple-choice
    correctAnswer: number | string;
    explanation: string;
    points: number;
  }>;
  
  passingScore: number;               // Default: 70
  timeLimit?: number;                 // Seconds
}
```

#### **quizAttempts** Collection
```typescript
// Path: users/{uid}/quizAttempts/{attemptId}
interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  lessonId: string;
  languageId: LanguageId;
  
  answers: Record<string, string | number>;  // questionId -> answer
  score: number;
  passed: boolean;
  
  startedAt: Timestamp;
  completedAt: Timestamp;
  durationSeconds: number;
}
```

#### **notes** Collection
```typescript
// Path: users/{uid}/notes/{noteId}
interface Note {
  id: string;
  userId: string;
  lessonId: string;
  languageId: LanguageId;
  
  content: string;                   // Rich text markdown
  tags: string[];                    // ['important', 'revise', 'interview']
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### **bookmarks** Collection
```typescript
// Path: users/{uid}/bookmarks/{bookmarkId}
interface Bookmark {
  id: string;
  userId: string;
  lessonId: string;
  languageId: LanguageId;
  
  tags: string[];
  note?: string;
  
  createdAt: Timestamp;
}
```

#### **codeHistory** Collection
```typescript
// Path: users/{uid}/codeHistory/{historyId}
interface CodeHistory {
  id: string;
  userId: string;
  languageId: LanguageId;
  lessonId?: string;
  
  code: string;
  output: string;
  executionTime: number;              // ms
  success: boolean;
  
  createdAt: Timestamp;
}
```

#### **errorDictionary** Collection
```typescript
interface ErrorEntry {
  id: string;
  languageId: LanguageId;
  errorPattern: string;               // Regex pattern
  errorName: string;                  // 'IndentationError'
  
  plainEnglish: string;
  codeExample: string;                // Shows the error
  fixExample: string;                 // Shows the fix
  commonCauses: string[];
  
  autoFixAvailable: boolean;
  autoFixFunction?: string;           // Function name to call
}
```

#### **weeklyReports** Collection
```typescript
// Path: users/{uid}/weeklyReports/{weekId}
interface WeeklyReport {
  id: string;                         // Format: 'YYYY-WW'
  userId: string;
  weekStartDate: Timestamp;
  weekEndDate: Timestamp;
  
  daysCoded: number;
  totalXPEarned: number;
  problemsSolved: number;
  languagesPracticed: LanguageId[];
  
  strongestArea: {
    topicId: string;
    languageId: LanguageId;
    averageScore: number;
  };
  
  weakestArea: {
    topicId: string;
    languageId: LanguageId;
    averageScore: number;
  };
  
  streakStatus: {
    currentStreak: number;
    longestStreak: number;
    freezesUsed: number;
  };
  
  comparisonToPreviousWeek: {
    xpChange: number;               // +/- percentage
    problemsChange: number;
  };
  
  generatedAt: Timestamp;
}
```

#### **offlinePacks** Collection
```typescript
interface OfflinePack {
  id: string;
  languageId: LanguageId;
  version: string;
  
  lessons: string[];                  // Array of lesson IDs
  totalSize: number;                  // Bytes
  
  downloadUrl: string;
  expiresAt: Timestamp;               // CDN URL expiry
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## API Design

### Base URL
```
Production: https://api.polycode.dev/v1
Development: https://dev-api.polycode.dev/v1
```

### Authentication
All endpoints require Firebase Auth token in header:
```
Authorization: Bearer <firebase_id_token>
```

### Core Endpoints

#### **User Management**

**POST /auth/register**
```typescript
Request: {
  email: string;
  password: string;
  displayName: string;
}

Response: {
  uid: string;
  token: string;
  user: User;
}
```

**GET /users/me**
```typescript
Response: User
```

**PATCH /users/me**
```typescript
Request: Partial<User>
Response: User
```

#### **Language & Progress**

**GET /languages**
```typescript
Response: {
  languages: Language[];
}
```

**POST /users/me/languages**
```typescript
Request: {
  languageId: LanguageId;
  isPrimary?: boolean;
}

Response: LanguageProgress
```

**GET /users/me/languages/{languageId}/progress**
```typescript
Response: LanguageProgress
```

**POST /users/me/languages/{languageId}/xp**
```typescript
Request: {
  amount: number;
  source: 'lesson' | 'quiz' | 'project';
  sourceId: string;
}

Response: {
  newXP: number;
  newLevel: number;
  leveledUp: boolean;
}
```

#### **Lessons**

**GET /lessons**
```typescript
Query Parameters:
  - languageId: LanguageId
  - category?: string
  - limit?: number
  - offset?: number

Response: {
  lessons: Lesson[];
  total: number;
}
```

**GET /lessons/{id}**
```typescript
Response: Lesson
```

**GET /lessons/{id}/compare**
```typescript
// Returns code examples in all 6 languages
Response: {
  conceptId: string;
  conceptTitle: string;
  description: string;
  codeExamples: Record<LanguageId, {
    code: string;
    explanation: string;
    uniqueFeatures: string[];
  }>;
}
```

**POST /lessons/{id}/complete**
```typescript
Request: {
  languageId: LanguageId;
  timeSpent: number;            // seconds
}

Response: {
  xpEarned: number;
  newProgress: LanguageProgress;
}
```

#### **Code Execution**

**POST /code/execute**
```typescript
Request: {
  languageId: LanguageId;
  code: string;
  input?: string;
  lessonId?: string;
}

Response: {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;        // ms
  memoryUsed: number;           // KB
  historyId: string;
}

Rate Limit: 100 requests per hour per user
Timeout: 2 seconds
```

**POST /code/convert**
```typescript
Request: {
  sourceLanguageId: LanguageId;
  targetLanguageId: LanguageId;
  code: string;
}

Response: {
  convertedCode: string;
  explanation: string;
  differences: string[];
}

Rate Limit: 
  - Free: 3 per day
  - Pro: 100 per day
```

**POST /code/review**
```typescript
Request: {
  languageId: LanguageId;
  code: string;
  problemId?: string;
}

Response: {
  correctness: {
    score: number;              // 0-100
    issues: string[];
  };
  performance: {
    timeComplexity: string;     // 'O(n)'
    spaceComplexity: string;
    optimizationSuggestions: string[];
  };
  codeQuality: {
    score: number;              // 0-100
    styleSuggestions: string[];
    bestPractices: string[];
  };
  crossLanguageComparison: {
    similarApproach: Record<LanguageId, string>;
    idiomaticPatterns: Record<LanguageId, string>;
  };
}

Rate Limit:
  - Free: 3 per day
  - Pro: Unlimited
```

#### **Quizzes**

**GET /quizzes**
```typescript
Query Parameters:
  - lessonId?: string
  - languageId?: LanguageId

Response: {
  quizzes: Quiz[];
}
```

**POST /quizzes/{id}/attempt**
```typescript
Request: {
  answers: Record<string, string | number>;
}

Response: {
  attemptId: string;
  score: number;
  passed: boolean;
  correctAnswers: Record<string, boolean>;
  explanations: Record<string, string>;
  xpEarned: number;
}
```

#### **Notes & Bookmarks**

**POST /users/me/notes**
```typescript
Request: {
  lessonId: string;
  languageId: LanguageId;
  content: string;
  tags: string[];
}

Response: Note
```

**GET /users/me/notes**
```typescript
Query Parameters:
  - languageId?: LanguageId
  - tags?: string[]
  - search?: string

Response: {
  notes: Note[];
}
```

**POST /users/me/bookmarks**
```typescript
Request: {
  lessonId: string;
  languageId: LanguageId;
  tags: string[];
}

Response: Bookmark
```

#### **Offline Support**

**GET /offline-packs/{languageId}**
```typescript
Response: {
  packId: string;
  downloadUrl: string;
  size: number;
  lessons: string[];
  version: string;
  expiresAt: string;
}
```

**POST /offline/sync**
```typescript
Request: {
  completedLessons: Array<{
    lessonId: string;
    languageId: LanguageId;
    completedAt: string;
    timeSpent: number;
  }>;
  quizAttempts: Array<{
    quizId: string;
    score: number;
    completedAt: string;
  }>;
  xpGains: Array<{
    languageId: LanguageId;
    amount: number;
    source: string;
  }>;
}

Response: {
  synced: boolean;
  conflicts: Array<{
    type: string;
    resolution: string;
  }>;
  updatedProgress: Record<LanguageId, LanguageProgress>;
}
```

#### **Error Dictionary**

**GET /errors/search**
```typescript
Query Parameters:
  - languageId: LanguageId
  - errorMessage: string

Response: {
  matched: boolean;
  error?: ErrorEntry;
  suggestedFix?: string;
}
```

#### **Analytics & Reports**

**GET /users/me/reports/weekly/{weekId}**
```typescript
Response: WeeklyReport
```

**GET /users/me/analytics/dashboard**
```typescript
Response: {
  totalXP: number;
  totalLevel: number;
  streak: number;
  languageBreakdown: Array<{
    languageId: LanguageId;
    xp: number;
    level: number;
    lessonsCompleted: number;
    percentComplete: number;
  }>;
  recentActivity: Array<{
    type: 'lesson' | 'quiz' | 'project';
    id: string;
    languageId: LanguageId;
    timestamp: string;
  }>;
}
```

#### **Admin Endpoints**

**POST /admin/lessons**
```typescript
Request: Lesson
Response: Lesson

Requires: Admin role
```

**PUT /admin/lessons/{id}**
```typescript
Request: Partial<Lesson>
Response: Lesson

Requires: Admin role
```

**DELETE /admin/lessons/{id}**
```typescript
Requires: Admin role
```

**GET /admin/analytics**
```typescript
Response: {
  totalUsers: number;
  activeUsers: number;
  proUsers: number;
  languagePopularity: Record<LanguageId, number>;
  lessonCompletionRates: Array<{
    lessonId: string;
    completionRate: number;
    averageScore: number;
    dropOffPoint: number;
  }>;
  quizPerformance: Array<{
    quizId: string;
    averageScore: number;
    failureRate: number;
    commonMistakes: string[];
  }>;
}

Requires: Admin role
```

---

## Component Architecture

### Frontend Component Tree

```
App
├── AuthProvider
├── ThemeProvider
├── Router
│   ├── PublicRoutes
│   │   ├── Landing
│   │   ├── Login
│   │   └── Signup
│   │       └── OnboardingQuiz
│   │
│   └── ProtectedRoutes
│       ├── DashboardLayout
│       │   ├── Sidebar
│       │   │   ├── LanguageSwitcher
│       │   │   ├── Navigation
│       │   │   └── ProfileButton
│       │   │
│       │   └── MainContent
│       │       ├── Home
│       │       │   ├── LanguageProgressCards
│       │       │   ├── ContinueLearning
│       │       │   ├── DailyChallenge
│       │       │   └── WeeklyReport
│       │       │
│       │       ├── Learn
│       │       │   ├── LessonList
│       │       │   └── LessonDetail
│       │       │       ├── ConceptText
│       │       │       ├── CodeExample
│       │       │       ├── ViewAllLanguagesButton
│       │       │       ├── HintsPanel
│       │       │       └── Quiz
│       │       │
│       │       ├── CodeComparison
│       │       │   ├── ConceptSelector
│       │       │   ├── LanguageTabs
│       │       │   └── CodePanel [×6]
│       │       │       ├── SyntaxHighlighter
│       │       │       ├── CopyButton
│       │       │       └── ExplanationText
│       │       │
│       │       ├── Editor (Playground)
│       │       │   ├── EditorHeader
│       │       │   │   ├── LanguageSelector
│       │       │   │   ├── VersionBadge
│       │       │   │   ├── RunButton
│       │       │   │   └── ConvertButton
│       │       │   ├── FileTabs
│       │       │   ├── MonacoEditor
│       │       │   ├── InputPanel
│       │       │   ├── OutputConsole
│       │       │   └── EditorToolbar
│       │       │       ├── SaveButton
│       │       │       ├── HistoryButton
│       │       │       ├── ShareButton
│       │       │       └── AIReviewButton
│       │       │
│       │       ├── Practice
│       │       │   ├── ProblemFilter
│       │       │   ├── ProblemList
│       │       │   └── ProblemDetail
│       │       │       ├── Description
│       │       │       ├── StarterCodeTabs [×6]
│       │       │       ├── TestCases
│       │       │       └── SubmitButton
│       │       │
│       │       ├── Profile
│       │       │   ├── UserStats
│       │       │   ├── LanguageBreakdown
│       │       │   ├── BadgesGrid
│       │       │   ├── NotesManager
│       │       │   ├── BookmarksManager
│       │       │   └── Settings
│       │       │
│       │       └── FocusMode
│       │           ├── ProblemStatement
│       │           ├── Timer
│       │           ├── MinimalEditor
│       │           └── ExitButton
│       │
│       └── Modals
│           ├── CommandPalette
│           ├── CodeShareModal
│           ├── AIReviewModal
│           ├── ErrorExplanationModal
│           └── UpgradeToProModal
```

### Key Component Specifications

#### **LanguageSwitcher Component**
```typescript
interface LanguageSwitcherProps {
  value: LanguageId;
  onChange: (languageId: LanguageId) => void;
  showLabel?: boolean;
  compact?: boolean;
}

// Features:
// - Dropdown with all 6 languages
// - Language badges with brand colors
// - Difficulty indicators
// - Persists to localStorage
// - Mobile responsive
```

#### **CodeComparison Component**
```typescript
interface CodeComparisonProps {
  conceptId: string;
  defaultLanguage?: LanguageId;
}

// Features:
// - Tabbed view of all 6 languages
// - Side-by-side layout on desktop
// - Swipeable cards on mobile
// - Copy button per language
// - Syntax differences highlighted
// - Language-specific annotations
```

#### **MonacoEditor Component**
```typescript
interface MonacoEditorProps {
  languageId: LanguageId;
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  readOnly?: boolean;
  theme?: string;
}

// Features:
// - Full VS Code editing experience
// - Auto-complete and IntelliSense
// - Error underlining
// - Format on save
// - Vim mode support
// - Multiple file tabs
```

#### **CommandPalette Component**
```typescript
interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

// Features:
// - Fuzzy search
// - Recent items prioritized
// - Keyboard navigation
// - Category grouping (Lessons, Topics, Languages, Actions)
// - Opens with Ctrl/Cmd + K
```

---

## Code Execution System

### Architecture

```
User Code Request
        ↓
Rate Limiter (100/hour per user)
        ↓
Code Validator (syntax check, size limit)
        ↓
Execution Queue (Redis)
        ↓
Judge0/Piston API
        ↓
    ┌───────────────────┐
    │ Docker Container  │
    │ (Sandboxed)       │
    │ - 2s timeout      │
    │ - 256MB memory    │
    │ - No network      │
    │ - No filesystem   │
    └───────────────────┘
        ↓
Result Parser
        ↓
Cache (Redis, 1 hour)
        ↓
Response to User
```

### Implementation

**Judge0 Integration**
```typescript
class CodeExecutor {
  async execute(
    languageId: LanguageId,
    code: string,
    input?: string
  ): Promise<ExecutionResult> {
    // Map language to Judge0 ID
    const languageMap = {
      python: 71,      // Python 3.11
      cpp: 54,         // C++ 17
      javascript: 93,  // Node 20
      java: 91,        // Java 17
      typescript: 94,  // TypeScript 5.0
      csharp: 51,      // C# .NET 8
    };
    
    // Create submission
    const submission = await judge0.createSubmission({
      language_id: languageMap[languageId],
      source_code: Buffer.from(code).toString('base64'),
      stdin: input ? Buffer.from(input).toString('base64') : undefined,
      cpu_time_limit: 2.0,
      memory_limit: 262144,  // 256 MB
      wall_time_limit: 3.0,
    });
    
    // Poll for result
    const result = await this.pollSubmission(submission.token);
    
    return {
      success: result.status.id === 3,  // Accepted
      output: result.stdout || result.stderr || '',
      error: result.compile_output || result.message,
      executionTime: result.time,
      memoryUsed: result.memory,
    };
  }
}
```

**Safety Measures**
1. Rate limiting: 100 executions per hour per user
2. Code size limit: 10,000 characters
3. Timeout: 2 seconds wall time
4. Memory limit: 256 MB
5. No network access in sandbox
6. No filesystem access
7. Blacklist dangerous functions (eval, exec, system, etc.)

---

## AI Integration

### OpenAI GPT-4 Configuration

**Code Conversion Service**
```typescript
class CodeConverter {
  async convert(
    sourceLanguage: LanguageId,
    targetLanguage: LanguageId,
    code: string
  ): Promise<ConversionResult> {
    const cacheKey = `convert:${sourceLanguage}:${targetLanguage}:${hashCode(code)}`;
    
    // Check cache first
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    
    // Call GPT-4
    const prompt = `Convert this ${sourceLanguage} code to ${targetLanguage}.
Maintain the same logic and functionality.
Provide explanation of key syntax differences.

Source code:
\`\`\`${sourceLanguage}
${code}
\`\`\`

Provide response in JSON format:
{
  "convertedCode": "...",
  "explanation": "...",
  "keyDifferences": ["..."]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 2000,
    });
    
    const result = JSON.parse(response.choices[0].message.content);
    
    // Cache for 24 hours
    await redis.setex(cacheKey, 86400, JSON.stringify(result));
    
    return result;
  }
}
```

**Code Review Service**
```typescript
class CodeReviewer {
  async review(
    languageId: LanguageId,
    code: string,
    problemContext?: string
  ): Promise<ReviewResult> {
    const prompt = `Review this ${languageId} code for correctness, performance, and style.

${problemContext ? `Problem: ${problemContext}\n\n` : ''}
Code:
\`\`\`${languageId}
${code}
\`\`\`

Provide detailed analysis in JSON format:
{
  "correctness": {
    "score": 0-100,
    "issues": ["..."]
  },
  "performance": {
    "timeComplexity": "O(...)",
    "spaceComplexity": "O(...)",
    "optimizations": ["..."]
  },
  "codeQuality": {
    "score": 0-100,
    "styleSuggestions": ["..."],
    "bestPractices": ["..."]
  },
  "alternativeApproach": {
    "description": "...",
    "exampleIn": {
      "python": "...",
      "javascript": "..."
    }
  }
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 3000,
    });
    
    return JSON.parse(response.choices[0].message.content);
  }
}
```

**Cost Optimization**
- Cache all conversions and reviews for 24 hours
- Use GPT-3.5 for simpler explanations (fallback)
- Batch requests when possible
- Set daily budget limits per user tier
- Track token usage per request

---

## Offline Architecture

### Service Worker Strategy

```typescript
// service-worker.ts
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache API responses
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/lessons'),
  new CacheFirst({
    cacheName: 'lessons-cache',
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // Only cache successful responses
          return response.status === 200 ? response : null;
        },
      },
    ],
  })
);

// Network-first for user data
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/users'),
  new NetworkFirst({
    cacheName: 'user-cache',
    networkTimeoutSeconds: 3,
  })
);
```

### IndexedDB Schema

```typescript
import Dexie from 'dexie';

class PolyCodeDB extends Dexie {
  lessons!: Dexie.Table<Lesson, string>;
  progress!: Dexie.Table<OfflineProgress, string>;
  codeHistory!: Dexie.Table<CodeHistory, string>;
  
  constructor() {
    super('PolyCodeDB');
    
    this.version(1).stores({
      lessons: 'id, languageId, category',
      progress: 'id, languageId, lessonId',
      codeHistory: '++id, languageId, timestamp',
    });
  }
}

const db = new PolyCodeDB();
```

### Sync Strategy

```typescript
class OfflineSync {
  async syncOnReconnect() {
    const pendingProgress = await db.progress.where('synced').equals(0).toArray();
    
    for (const progress of pendingProgress) {
      try {
        await api.post('/offline/sync', progress);
        await db.progress.update(progress.id, { synced: 1 });
      } catch (error) {
        // Retry later
        console.error('Sync failed:', error);
      }
    }
  }
}
```

---

## Error Dictionary System

### Error Pattern Matching

```typescript
class ErrorMatcher {
  private patterns: Map<LanguageId, ErrorEntry[]>;
  
  async matchError(
    languageId: LanguageId,
    errorMessage: string
  ): Promise<ErrorEntry | null> {
    const patterns = this.patterns.get(languageId) || [];
    
    for (const entry of patterns) {
      const regex = new RegExp(entry.errorPattern, 'i');
      if (regex.test(errorMessage)) {
        return entry;
      }
    }
    
    return null;
  }
  
  async explainError(entry: ErrorEntry): Promise<string> {
    return `
## ${entry.errorName}

**What it means:** ${entry.plainEnglish}

**Common causes:**
${entry.commonCauses.map(c => `- ${c}`).join('\n')}

**Example of the error:**
\`\`\`${entry.languageId}
${entry.codeExample}
\`\`\`

**How to fix it:**
\`\`\`${entry.languageId}
${entry.fixExample}
\`\`\`
    `;
  }
}
```

### Language-Specific Error Patterns

**Python Errors**
```json
[
  {
    "errorPattern": "IndentationError",
    "errorName": "IndentationError",
    "plainEnglish": "Your code's indentation (spacing) is incorrect. Python requires consistent indentation.",
    "commonCauses": ["Mixing tabs and spaces", "Missing indentation after colon", "Inconsistent spacing"]
  },
  {
    "errorPattern": "TypeError.*not supported between",
    "errorName": "TypeError",
    "plainEnglish": "You're trying to use an operation with incompatible types (like adding a number and a string)."
  }
]
```

**C++ Errors**
```json
[
  {
    "errorPattern": "expected.*before",
    "errorName": "Syntax Error",
    "plainEnglish": "You're missing a semicolon or have incorrect syntax."
  },
  {
    "errorPattern": "segmentation fault",
    "errorName": "Segmentation Fault",
    "plainEnglish": "Your program tried to access memory it shouldn't. Usually caused by null pointers or array out-of-bounds."
  }
]
```

---

## Analytics Pipeline

### Event Tracking

```typescript
interface AnalyticsEvent {
  userId: string;
  eventType: string;
  timestamp: Timestamp;
  properties: Record<string, any>;
}

// Key events to track
const TRACKED_EVENTS = {
  // User flow
  'user_signup': { channel: string },
  'user_login': {},
  'language_selected': { languageId: LanguageId, isPrimary: boolean },
  
  // Learning
  'lesson_started': { lessonId: string, languageId: LanguageId },
  'lesson_completed': { lessonId: string, languageId: LanguageId, timeSpent: number },
  'quiz_attempted': { quizId: string, score: number, passed: boolean },
  
  // Code execution
  'code_executed': { languageId: LanguageId, success: boolean },
  'code_converted': { from: LanguageId, to: LanguageId },
  'ai_review_requested': { languageId: LanguageId },
  
  // Engagement
  'same_logic_6_syntax_used': { conceptId: string },
  'error_explained': { languageId: LanguageId, errorType: string },
  'focus_mode_entered': {},
  
  // Drop-off points
  'page_exit': { page: string, timeOnPage: number },
};

class Analytics {
  track(eventType: string, properties: Record<string, any>) {
    mixpanel.track(eventType, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  }
}
```

---

## Performance Optimizations

1. **Code splitting**: Lazy load editor and heavy components
2. **Image optimization**: Use WebP with fallbacks
3. **CDN**: CloudFlare for static assets
4. **Caching**: Redis for API responses (1-hour TTL)
5. **Database indexes**: On userId, languageId, lessonId
6. **Connection pooling**: Reuse database connections
7. **Compression**: Gzip/Brotli for API responses

---

## Security Measures

1. **HTTPS everywhere**: TLS 1.3 minimum
2. **CORS**: Whitelist frontend origins only
3. **Rate limiting**: Per-user and per-IP
4. **Input validation**: Sanitize all user input
5. **XSS protection**: Content Security Policy headers
6. **Code execution**: Sandboxed containers, no network
7. **Authentication**: Firebase Auth with secure tokens
8. **Secrets management**: Environment variables, never in code

---

## Deployment Architecture

```
GitHub Repository
        ↓
   GitHub Actions CI/CD
        ↓
    ┌────────────────────┐
    │   Build & Test     │
    └────────────────────┘
        ↓
    ┌────────────────────────────┐
    │  Deploy Frontend to Vercel │
    │  Deploy Backend to Cloud Run│
    └────────────────────────────┘
        ↓
    Production (multi-region)
```

**Environments:**
- Development: Auto-deploy on commits to `develop` branch
- Staging: Auto-deploy on commits to `staging` branch
- Production: Manual approval required for `main` branch

---

This design supports 1M+ concurrent users, sub-3s page loads, and the unique "Same Logic, 6 Syntax" feature that makes PolyCode stand out.

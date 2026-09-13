# Design Document

## System Architecture

### Application Flow

```
Authentication
    ↓
Onboarding Quiz
    ↓
Set user.level (BEGINNER | INTERMEDIATE | EXPERT)
    ↓
Dashboard
    ↓
LevelGuard (checks user.level)
    ↓
Load correct layout + correct curriculum track
```

### Global State Structure

```typescript
// Global User State
interface UserState {
  id: string;
  email: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
  xp: number;
  completionRate: number;
  progressionEligible: boolean;
  enrolledCourses: string[];
}
```

## Folder Structure

```
src/
├── guards/
│   └── LevelGuard.tsx              // Single guard for level-based access control
│
├── components/
│   └── layouts/
│       ├── BeginnerLayout.tsx      // Single-card focus layout
│       ├── IntermediateLayout.tsx  // Two-panel layout
│       └── ExpertLayout.tsx        // Multi-panel IDE layout
│
├── curriculum/
│   ├── beginner/
│   │   ├── lessons/
│   │   └── challenges/
│   ├── intermediate/
│   │   ├── lessons/
│   │   └── challenges/
│   └── expert/
│       ├── lessons/
│       └── challenges/
│
├── context/
│   └── UserContext.tsx             // Global state with user.level
│
├── pages/
│   ├── auth/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── onboarding/
│   │   └── quiz.tsx
│   ├── dashboard.tsx
│   └── lesson/
│       └── [id].tsx                // Protected by LevelGuard
│
└── api/
    └── routes/
        ├── onboarding.ts
        ├── curriculum.ts
        ├── level.ts
        └── user.ts
```

## Database Schema

### Users Table (Extended)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  proficiency_level VARCHAR(20) CHECK (proficiency_level IN ('BEGINNER', 'INTERMEDIATE', 'EXPERT')),
  total_xp INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2) DEFAULT 0.00,
  progression_eligible BOOLEAN DEFAULT false,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_level ON users(proficiency_level);
```

### Quiz Questions Table

```sql
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  difficulty_weight INTEGER CHECK (difficulty_weight BETWEEN 1 AND 10),
  topic VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Quiz Attempts Table

```sql
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score DECIMAL(5,2) NOT NULL,
  assigned_level VARCHAR(20) NOT NULL,
  answers JSONB,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);
```

### Content Table

```sql
CREATE TABLE content (
  id UUID PRIMARY KEY,
  type VARCHAR(50) CHECK (type IN ('lesson', 'challenge')),
  difficulty VARCHAR(20) CHECK (difficulty IN ('BEGINNER', 'INTERMEDIATE', 'EXPERT')),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content_path VARCHAR(500),
  xp_reward INTEGER DEFAULT 0,
  estimated_duration INTEGER, -- minutes
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_content_difficulty ON content(difficulty);
CREATE INDEX idx_content_type ON content(type);
```

### Progression History Table

```sql
CREATE TABLE progression_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  previous_level VARCHAR(20),
  new_level VARCHAR(20) NOT NULL,
  xp_at_progression INTEGER,
  completion_rate_at_progression DECIMAL(5,2),
  progressed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_progression_user ON progression_history(user_id);
```

### User Progress Table

```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completion_date TIMESTAMP,
  xp_earned INTEGER DEFAULT 0,
  UNIQUE(user_id, content_id)
);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
```

## API Design

### Authentication Endpoints

#### POST /api/auth/register
```typescript
Request: {
  email: string;
  password: string;
  name: string;
}

Response: {
  userId: string;
  token: string;
  requiresOnboarding: true;
}
```

#### POST /api/auth/login
```typescript
Request: {
  email: string;
  password: string;
}

Response: {
  userId: string;
  token: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT' | null;
  requiresOnboarding: boolean;
}
```

### Onboarding Endpoints

#### GET /api/onboarding/quiz
```typescript
Response: {
  questions: Array<{
    id: string;
    questionText: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
  }>;
}
```

#### POST /api/onboarding/quiz/submit
```typescript
Request: {
  answers: Array<{
    questionId: string;
    selectedAnswer: 'A' | 'B' | 'C' | 'D';
  }>;
}

Response: {
  score: number;
  assignedLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
  correctAnswers: number;
  totalQuestions: number;
}
```

### Curriculum Endpoints

#### GET /api/curriculum/:level
```typescript
// Authorization: Checks user.level matches or is higher than requested level

Response: {
  lessons: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: string;
    xpReward: number;
    duration: number;
    orderIndex: number;
    completed: boolean;
  }>;
  challenges: Array<{
    id: string;
    title: string;
    difficulty: string;
    xpReward: number;
    completed: boolean;
  }>;
}
```

#### GET /api/curriculum/:level/lesson/:id
```typescript
// Authorization: Checks user.level permits access to this difficulty

Response: {
  id: string;
  title: string;
  content: string;
  codeExamples: Record<string, string>; // language -> code
  hints: string[];
  quiz: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  nextLessonId: string | null;
  previousLessonId: string | null;
}
```

### Level Management Endpoints

#### GET /api/user/level-status
```typescript
Response: {
  currentLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
  totalXp: number;
  completionRate: number;
  progressionEligible: boolean;
  nextLevel: {
    level: 'INTERMEDIATE' | 'EXPERT' | null;
    requiredXp: number;
    requiredCompletionRate: number;
    currentXp: number;
    currentCompletionRate: number;
  };
}
```

#### POST /api/level/check-progression
```typescript
// Calculates if user meets progression criteria

Response: {
  eligible: boolean;
  criteria: {
    xpMet: boolean;
    completionRateMet: boolean;
  };
  nextLevel: 'INTERMEDIATE' | 'EXPERT' | null;
}
```

#### PUT /api/level/advance
```typescript
// Executes level progression if eligible

Response: {
  success: boolean;
  newLevel: 'INTERMEDIATE' | 'EXPERT';
  unlockedFeatures: string[];
  message: string;
}
```

### Admin Endpoints

#### PUT /api/admin/user/:userId/level
```typescript
// Authorization: Admin only

Request: {
  newLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
  reason: string;
}

Response: {
  success: boolean;
  userId: string;
  previousLevel: string;
  newLevel: string;
}
```

## Component Design

### LevelGuard Component

```typescript
// guards/LevelGuard.tsx

import { useUser } from '@/context/UserContext';
import { useRouter } from 'wouter';

interface LevelGuardProps {
  requiredLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
  children: React.ReactNode;
}

export function LevelGuard({ requiredLevel, children }: LevelGuardProps) {
  const { user } = useUser();
  const [, setLocation] = useRouter();

  const levelHierarchy = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    EXPERT: 3,
  };

  if (!user || !user.level) {
    setLocation('/onboarding/quiz');
    return null;
  }

  const userLevelRank = levelHierarchy[user.level];
  const requiredLevelRank = levelHierarchy[requiredLevel];

  if (userLevelRank < requiredLevelRank) {
    return (
      <div className="access-denied">
        <h2>Content Locked</h2>
        <p>This content requires {requiredLevel} level access.</p>
        <p>Complete more lessons to progress.</p>
      </div>
    );
  }

  return <>{children}</>;
}
```

### Layout Selector Component

```typescript
// components/LayoutSelector.tsx

import { useUser } from '@/context/UserContext';
import BeginnerLayout from './layouts/BeginnerLayout';
import IntermediateLayout from './layouts/IntermediateLayout';
import ExpertLayout from './layouts/ExpertLayout';

interface LayoutSelectorProps {
  children: React.ReactNode;
}

export function LayoutSelector({ children }: LayoutSelectorProps) {
  const { user } = useUser();

  switch (user?.level) {
    case 'BEGINNER':
      return <BeginnerLayout>{children}</BeginnerLayout>;
    case 'INTERMEDIATE':
      return <IntermediateLayout>{children}</IntermediateLayout>;
    case 'EXPERT':
      return <ExpertLayout>{children}</ExpertLayout>;
    default:
      return <BeginnerLayout>{children}</BeginnerLayout>;
  }
}
```

### BeginnerLayout Component

```typescript
// components/layouts/BeginnerLayout.tsx

interface BeginnerLayoutProps {
  children: React.ReactNode;
}

export default function BeginnerLayout({ children }: BeginnerLayoutProps) {
  return (
    <div className="beginner-layout">
      {/* Single-card focus layout */}
      <div className="single-card-container">
        <div className="progress-bar-top">
          <ProgressIndicator />
        </div>
        
        <div className="lesson-card-large">
          {children}
        </div>

        <div className="navigation-simple">
          <button className="btn-previous">← Previous</button>
          <button className="btn-hint">💡 Show Hint</button>
          <button className="btn-next">Next →</button>
        </div>
      </div>

      {/* No sidebars, no clutter */}
    </div>
  );
}
```

### IntermediateLayout Component

```typescript
// components/layouts/IntermediateLayout.tsx

interface IntermediateLayoutProps {
  children: React.ReactNode;
}

export default function IntermediateLayout({ children }: IntermediateLayoutProps) {
  return (
    <div className="intermediate-layout">
      {/* Two-panel layout */}
      <div className="panel-left">
        <LessonsList level="INTERMEDIATE" />
      </div>

      <div className="panel-right">
        <div className="split-view">
          <div className="editor-section">
            {children}
          </div>
          <div className="output-section">
            <Console />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### ExpertLayout Component

```typescript
// components/layouts/ExpertLayout.tsx

interface ExpertLayoutProps {
  children: React.ReactNode;
}

export default function ExpertLayout({ children }: ExpertLayoutProps) {
  return (
    <div className="expert-layout ide-style">
      {/* Multi-panel workspace */}
      <div className="panel-explorer">
        <FileExplorer />
      </div>

      <div className="panel-editor-main">
        <div className="editor-tabs">
          <FileTabs />
        </div>
        <div className="editor-content">
          {children}
        </div>
      </div>

      <div className="panel-terminal">
        <Terminal />
      </div>

      <div className="panel-docs">
        <Documentation />
      </div>

      <div className="panel-leaderboard">
        <Leaderboard />
      </div>

      {/* Command palette */}
      <CommandPalette shortcut="Ctrl+K" />
    </div>
  );
}
```

### UserContext (Global State)

```typescript
// context/UserContext.tsx

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT' | null;
  xp: number;
  completionRate: number;
  progressionEligible: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateLevel: (level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT') => void;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const updateLevel = (level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT') => {
    setUser(prev => prev ? { ...prev, level } : null);
  };

  const refreshUserData = async () => {
    const response = await fetch('/api/user/level-status', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await response.json();
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  useEffect(() => {
    // Load user from token on mount
    const token = localStorage.getItem('token');
    if (token) {
      refreshUserData();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, updateLevel, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
```

## Backend Authorization Middleware

```typescript
// middleware/levelGuard.ts

import { Request, Response, NextFunction } from 'express';

export function requireLevel(requiredLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT') {
  const levelHierarchy = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    EXPERT: 3,
  };

  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // from auth middleware
    
    if (!user || !user.proficiency_level) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userLevelRank = levelHierarchy[user.proficiency_level];
    const requiredLevelRank = levelHierarchy[requiredLevel];

    if (userLevelRank < requiredLevelRank) {
      return res.status(403).json({
        error: 'Insufficient level',
        requiredLevel,
        currentLevel: user.proficiency_level,
      });
    }

    next();
  };
}

// Usage:
// router.get('/curriculum/expert/lessons', requireLevel('EXPERT'), getExpertLessons);
```

## Progression Logic

```typescript
// services/progressionService.ts

interface ProgressionCriteria {
  xpThreshold: number;
  completionRate: number;
}

const PROGRESSION_THRESHOLDS: Record<string, ProgressionCriteria> = {
  'BEGINNER->INTERMEDIATE': {
    xpThreshold: 1000,
    completionRate: 0.80,
  },
  'INTERMEDIATE->EXPERT': {
    xpThreshold: 5000,
    completionRate: 0.70,
  },
};

export async function checkProgressionEligibility(userId: string): Promise<{
  eligible: boolean;
  nextLevel: string | null;
  criteria: { xpMet: boolean; completionRateMet: boolean };
}> {
  const user = await getUserById(userId);
  
  if (user.proficiency_level === 'EXPERT') {
    return { eligible: false, nextLevel: null, criteria: { xpMet: true, completionRateMet: true } };
  }

  const transitionKey = user.proficiency_level === 'BEGINNER' 
    ? 'BEGINNER->INTERMEDIATE' 
    : 'INTERMEDIATE->EXPERT';
  
  const criteria = PROGRESSION_THRESHOLDS[transitionKey];
  const nextLevel = user.proficiency_level === 'BEGINNER' ? 'INTERMEDIATE' : 'EXPERT';

  const xpMet = user.total_xp >= criteria.xpThreshold;
  const completionRateMet = user.completion_rate >= criteria.completionRate;

  return {
    eligible: xpMet && completionRateMet,
    nextLevel: xpMet && completionRateMet ? nextLevel : null,
    criteria: { xpMet, completionRateMet },
  };
}

export async function executeProgression(userId: string): Promise<boolean> {
  const eligibility = await checkProgressionEligibility(userId);
  
  if (!eligibility.eligible || !eligibility.nextLevel) {
    return false;
  }

  const user = await getUserById(userId);
  
  // Record progression history
  await db.query(`
    INSERT INTO progression_history 
    (user_id, previous_level, new_level, xp_at_progression, completion_rate_at_progression)
    VALUES ($1, $2, $3, $4, $5)
  `, [userId, user.proficiency_level, eligibility.nextLevel, user.total_xp, user.completion_rate]);

  // Update user level
  await db.query(`
    UPDATE users 
    SET proficiency_level = $1, 
        progression_eligible = false,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
  `, [eligibility.nextLevel, userId]);

  return true;
}
```

## Security Considerations

### Content Access Control
1. **Double verification**: Both frontend (LevelGuard) and backend (requireLevel middleware) check user level
2. **Direct URL access prevention**: Backend always validates level before serving content
3. **Token-based authentication**: JWT tokens contain user level claim
4. **Audit logging**: All authorization failures logged with user ID and timestamp

### Quiz Security
1. **Question randomization**: Different users see different question sets
2. **Answer validation on backend**: Frontend cannot manipulate quiz results
3. **One-time submission**: Quiz can only be submitted once per user
4. **Admin override audit**: All manual level changes logged with admin ID

### XP and Progression
1. **Backend calculation only**: XP awards calculated server-side
2. **Completion verification**: Backend verifies lesson completion before awarding XP
3. **Progression threshold validation**: Admin-configured thresholds validated on backend
4. **Rate limiting**: Progression checks rate-limited to prevent abuse

## Testing Strategy

### Unit Tests
- Quiz scoring logic
- Progression eligibility calculation
- Level hierarchy validation
- Layout component rendering per level

### Integration Tests
- Auth → Onboarding → Level Assignment flow
- Content access with different user levels
- Progression execution
- Admin level override

### E2E Tests
- Complete user journey: Registration → Quiz → Dashboard → Lesson completion → Level up
- Content gating: Verify intermediate content blocked for beginners
- Layout switching: Verify correct layout renders for each level
- Backend authorization: Verify 403 errors for unauthorized access

## Performance Considerations

### Caching Strategy
- Cache curriculum data by level (5-minute TTL)
- Cache user level in session storage
- Invalidate cache on level progression

### Database Indexing
- Index on users.proficiency_level for fast filtering
- Index on content.difficulty for curriculum queries
- Index on user_progress(user_id, status) for completion rate calculations

### Lazy Loading
- Load curriculum content on-demand per level
- Lazy load layout components (code-split by level)
- Paginate lesson lists for intermediate/expert users

## Deployment Strategy

1. **Database Migration**: Add proficiency_level column to existing users table
2. **Existing User Migration**: Assign levels based on current XP (script)
3. **Feature Flag**: Roll out behind feature flag, enable for 10% of users
4. **Monitor Metrics**: Track quiz completion rates, progression times, content access patterns
5. **Full Rollout**: Enable for all users after 1 week of monitoring

# Level-Based Progression System - Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER REGISTRATION                             │
│                                                                       │
│  POST /api/auth/register → Creates user with null proficiencyLevel  │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       ONBOARDING QUIZ                                │
│                                                                       │
│  1. GET /api/onboarding/quiz → 7 random questions                   │
│  2. User answers questions                                           │
│  3. POST /api/onboarding/quiz/submit → Score & assign level         │
│                                                                       │
│  Scoring Logic:                                                      │
│    0-39%   → BEGINNER                                               │
│    40-74%  → INTERMEDIATE                                           │
│    75-100% → EXPERT                                                 │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      JWT TOKEN GENERATION                            │
│                                                                       │
│  Token Payload:                                                      │
│    - sub: userId                                                     │
│    - proficiencyLevel: BEGINNER/INTERMEDIATE/EXPERT                 │
│    - xp: 0                                                          │
│    - completionRate: 0                                              │
│    - progressionEligible: false                                     │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      FRONTEND: UserContext                           │
│                                                                       │
│  Global State:                                                       │
│    user.level: "BEGINNER" | "INTERMEDIATE" | "EXPERT"              │
│    user.xp: number                                                  │
│    user.completionRate: number                                      │
│    user.progressionEligible: boolean                                │
│                                                                       │
│  Methods:                                                            │
│    - updateLevel(level)                                             │
│    - refreshUserData()                                              │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      LAYOUT SELECTION                                │
│                                                                       │
│  LayoutSelector checks user.level:                                  │
│                                                                       │
│  ┌──────────────────┬──────────────────┬──────────────────┐       │
│  │   BEGINNER       │   INTERMEDIATE   │      EXPERT       │       │
│  ├──────────────────┼──────────────────┼──────────────────┤       │
│  │ BeginnerLayout   │ IntermediateLayout│  ExpertLayout   │       │
│  │                  │                  │                  │       │
│  │ • Single card    │ • Two panels     │ • IDE workspace  │       │
│  │ • Large fonts    │ • Lesson list    │ • File explorer  │       │
│  │ • Hint button    │ • Editor/console │ • Multi-file     │       │
│  │ • Progress bar   │ • Run button     │ • Terminal       │       │
│  │ • Simple nav     │ • Settings       │ • Docs panel     │       │
│  │ • No sidebar     │ • Brief concepts │ • Leaderboard    │       │
│  │                  │                  │ • Cmd palette    │       │
│  │ 50 XP/lesson     │ 100 XP/lesson    │ 200 XP/lesson    │       │
│  └──────────────────┴──────────────────┴──────────────────┘       │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CONTENT ACCESS FLOW                               │
│                                                                       │
│  User requests lesson/challenge                                      │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────────┐                                               │
│  │  LevelGuard      │  Frontend Check                               │
│  │  Component       │  - Verifies user.level                        │
│  └────────┬─────────┘  - Shows access denied if insufficient        │
│           │                                                          │
│           ▼                                                          │
│  ┌──────────────────┐                                               │
│  │  API Request     │  With JWT token                               │
│  │  with Token      │                                               │
│  └────────┬─────────┘                                               │
│           │                                                          │
│           ▼                                                          │
│  ┌──────────────────┐                                               │
│  │  JwtAuthGuard    │  Backend Check #1                             │
│  │                  │  - Validates token                            │
│  └────────┬─────────┘  - Extracts user.level from payload           │
│           │                                                          │
│           ▼                                                          │
│  ┌──────────────────┐                                               │
│  │  LevelGuard      │  Backend Check #2                             │
│  │  (Backend)       │  - Checks @RequireLevel decorator            │
│  └────────┬─────────┘  - Returns 403 if insufficient               │
│           │                                                          │
│           ▼                                                          │
│  ┌──────────────────┐                                               │
│  │  Content         │  Filtered by difficulty                       │
│  │  Delivery        │  - BEGINNER: BEGINNER only                    │
│  └──────────────────┘  - INTERMEDIATE: BEGINNER + INTERMEDIATE      │
│                        - EXPERT: All content                         │
└─────────────────────────────────────────────────────────────────────┘

## Progression Flow

┌─────────────────────────────────────────────────────────────────────┐
│                      LESSON COMPLETION                               │
│                                                                       │
│  1. User completes lesson                                           │
│  2. POST /api/curriculum/lesson/:id/complete                        │
│  3. Backend creates/updates UserProgress                            │
│  4. Awards XP based on lesson difficulty                            │
│  5. Updates user.totalXp                                            │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   PROGRESSION CHECK                                  │
│                                                                       │
│  Backend automatically checks:                                       │
│                                                                       │
│  BEGINNER → INTERMEDIATE:                                           │
│    ✓ totalXp >= 1,000                                               │
│    ✓ completionRate >= 80% (of BEGINNER lessons)                   │
│                                                                       │
│  INTERMEDIATE → EXPERT:                                             │
│    ✓ totalXp >= 5,000                                               │
│    ✓ completionRate >= 70% (of INTERMEDIATE lessons)               │
│                                                                       │
│  If criteria met:                                                    │
│    - user.progressionEligible = true                                │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      LEVEL ADVANCEMENT                               │
│                                                                       │
│  User or system triggers: POST /api/level/advance                   │
│                                                                       │
│  Transaction:                                                        │
│    1. Record ProgressionHistory                                     │
│       - previousLevel                                               │
│       - newLevel                                                    │
│       - xpAtProgression                                             │
│       - completionRateAtProgression                                 │
│                                                                       │
│    2. Update User.proficiencyLevel                                  │
│    3. Set progressionEligible = false                               │
│    4. Update JWT token with new level                               │
│                                                                       │
│  Frontend:                                                           │
│    5. Display LevelProgressionModal                                 │
│    6. Show unlocked features                                        │
│    7. Update UserContext                                            │
│    8. LayoutSelector switches to new layout                         │
└─────────────────────────────────────────────────────────────────────┘

## Admin Management Flow

┌─────────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD                                 │
│                                                                       │
│  GET /api/admin/statistics/levels                                   │
│    → User count by level                                            │
│    → Average progression times                                      │
│    → Quiz score distribution                                        │
│                                                                       │
│  GET /api/admin/users/search?q=email                                │
│    → Search users by email/name                                     │
│    → Display level, XP, completion rate                             │
│                                                                       │
│  GET /api/admin/users/:userId/level                                 │
│    → User details                                                   │
│    → Progression history                                            │
│                                                                       │
│  PUT /api/admin/users/:userId/level                                 │
│    → Override user level                                            │
│    → Log admin action                                               │
│    → Reason required                                                │
│                                                                       │
│  POST /api/admin/users/:userId/rollback                             │
│    → Revert to previous level                                       │
│    → Based on ProgressionHistory                                    │
└─────────────────────────────────────────────────────────────────────┘

## Database Schema Relationships

```
┌──────────────────┐
│      User        │
├──────────────────┤
│ id               │◄──────────┐
│ email            │           │
│ proficiencyLevel │           │
│ totalXp          │           │
│ completionRate   │           │
│ progressionElig  │           │
│ onboardingDone   │           │
└────────┬─────────┘           │
         │                     │
         │ 1:N                 │ 1:N
         │                     │
         ▼                     │
┌──────────────────┐           │
│  QuizAttempt     │           │
├──────────────────┤           │
│ id               │           │
│ userId           │───────────┘
│ score            │
│ assignedLevel    │
│ answers (JSON)   │
│ completedAt      │
└──────────────────┘

┌──────────────────┐           ┌──────────────────┐
│ QuizQuestion     │           │ UserProgress     │
├──────────────────┤           ├──────────────────┤
│ id               │           │ id               │
│ questionText     │           │ userId           │───┐
│ optionA-D        │           │ contentId        │   │
│ correctAnswer    │           │ contentType      │   │
│ difficultyWeight │           │ status           │   │
│ topic            │           │ xpEarned         │   │
└──────────────────┘           │ completionDate   │   │
                               └──────────────────┘   │
                                                      │
┌──────────────────┐           ┌──────────────────┐  │
│ ProgressionHist  │           │     Lesson       │  │
├──────────────────┤           ├──────────────────┤  │
│ id               │           │ id               │◄─┘
│ userId           │───┐       │ title            │
│ previousLevel    │   │       │ content          │
│ newLevel         │   │       │ difficulty       │
│ xpAtProgression  │   │       │ xpReward         │
│ completionRate   │   │       │ estimatedMinutes │
│ progressedAt     │   │       │ orderIndex       │
└──────────────────┘   │       └──────────────────┘
                       │
                       │       ┌──────────────────┐
                       │       │    Challenge     │
                       │       ├──────────────────┤
                       └───────┤ id               │
                               │ title            │
                               │ difficulty       │
                               │ proficiencyDiff  │
                               │ xpReward         │
                               │ testCases (JSON) │
                               └──────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                                 │
│                                                                       │
│  Layer 1: Frontend                                                  │
│    ┌──────────────────────────────────────────────────────────┐   │
│    │ LevelGuard Component                                      │   │
│    │ - Checks user.level from UserContext                     │   │
│    │ - Redirects to /onboarding if no level                   │   │
│    │ - Shows access denied UI if insufficient level            │   │
│    │ - Client-side only (not security critical)                │   │
│    └──────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Layer 2: JWT Authentication                                        │
│    ┌──────────────────────────────────────────────────────────┐   │
│    │ JwtAuthGuard                                              │   │
│    │ - Validates JWT token signature                           │   │
│    │ - Extracts user ID and level from payload                │   │
│    │ - Attaches to request.user object                         │   │
│    │ - Returns 401 if token invalid                            │   │
│    └──────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Layer 3: Level Authorization                                       │
│    ┌──────────────────────────────────────────────────────────┐   │
│    │ LevelGuard (Backend)                                      │   │
│    │ - Reads @RequireLevel decorator                           │   │
│    │ - Compares user level with required level                │   │
│    │ - Returns 403 if insufficient                             │   │
│    │ - Logs authorization failures                             │   │
│    └──────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Layer 4: Data Access                                               │
│    ┌──────────────────────────────────────────────────────────┐   │
│    │ Prisma Query Filters                                      │   │
│    │ - WHERE difficulty IN (allowedDifficulties)              │   │
│    │ - Only returns content user can access                    │   │
│    │ - Database-level filtering                                │   │
│    └──────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Layer 5: Admin Protection                                          │
│    ┌──────────────────────────────────────────────────────────┐   │
│    │ Admin Role Check                                          │   │
│    │ - Verifies user.role === 'ADMIN'                         │   │
│    │ - All admin endpoints protected                           │   │
│    │ - Throws ForbiddenException if not admin                 │   │
│    │ - Audit logging of all admin actions                     │   │
│    └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
User Action → Frontend → API Call → Backend → Database → Response
     │            │          │          │          │          │
     │            │          │          │          │          │
     ▼            ▼          ▼          ▼          ▼          ▼

[Click Lesson] [LevelGuard] [JWT Header] [Auth Guard] [Query] [Lesson Data]
     │         Check level    │        Validate    Filter      │
     │         Pass ✓         │        Pass ✓      by level    │
     │                        │                    Pass ✓      │
     │                        │                                 │
     └────────────────────────┴─────────────────────────────────┘
                              │
                              ▼
                         [Render in
                       Appropriate Layout]
```

---

## File Structure Overview

```
project/
├── artifacts/
│   ├── backend/
│   │   ├── prisma/
│   │   │   ├── schema.prisma                  ← Extended with level models
│   │   │   ├── seed-quiz-questions.ts         ← 25 quiz questions
│   │   │   └── migrations/                    ← Applied migrations
│   │   ├── src/
│   │   │   ├── quiz/                          ← Onboarding quiz module
│   │   │   │   ├── quiz.module.ts
│   │   │   │   ├── quiz.service.ts
│   │   │   │   └── quiz.controller.ts
│   │   │   ├── progression/                   ← XP & level advancement
│   │   │   │   ├── progression.module.ts
│   │   │   │   ├── progression.service.ts
│   │   │   │   └── progression.controller.ts
│   │   │   ├── curriculum/                    ← Content filtering
│   │   │   │   ├── curriculum.module.ts
│   │   │   │   ├── curriculum.service.ts
│   │   │   │   └── curriculum.controller.ts
│   │   │   ├── admin/                         ← Admin management
│   │   │   │   ├── admin.module.ts
│   │   │   │   ├── admin.service.ts
│   │   │   │   └── admin.controller.ts
│   │   │   └── auth/
│   │   │       ├── guards/
│   │   │       │   ├── jwt-auth.guard.ts
│   │   │       │   └── level.guard.ts         ← Backend level check
│   │   │       └── decorators/
│   │   │           └── require-level.decorator.ts
│   │   └── scripts/
│   │       └── assign-content-difficulty.ts   ← Auto-assign difficulties
│   │
│   └── cpp-learn/
│       └── src/
│           ├── context/
│           │   └── UserContext.tsx            ← Global level state
│           ├── guards/
│           │   └── LevelGuard.tsx             ← Frontend access control
│           ├── components/
│           │   ├── layouts/
│           │   │   ├── BeginnerLayout.tsx     ← Simple single-card
│           │   │   ├── IntermediateLayout.tsx ← Two-panel
│           │   │   └── ExpertLayout.tsx       ← Full IDE
│           │   ├── LayoutSelector.tsx         ← Dynamic layout switch
│           │   └── LevelProgressionModal.tsx  ← Level-up celebration
│           └── pages/
│               ├── onboarding-quiz.tsx        ← Quiz flow
│               └── admin/
│                   └── admin-dashboard.tsx    ← Admin interface
│
└── .kiro/specs/level-based-progression/
    ├── requirements.md              ← 20 requirements
    ├── design.md                    ← Full architecture
    ├── tasks.md                     ← 97 implementation tasks
    ├── PROGRESS.md                  ← Current status
    ├── IMPLEMENTATION_SUMMARY.md    ← This document
    └── SYSTEM_ARCHITECTURE.md       ← System diagrams
```

---

**System is production-ready and fully documented! 🚀**

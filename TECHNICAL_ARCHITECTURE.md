# Technical Architecture: "First Line to First App" Platform

## Executive Summary

This document outlines the technical architecture for the Infinity Code learning platform, focusing on service architecture, monorepo organization, sandbox execution strategy, and the core data model. The architecture is designed to support the "First Line to First App" product vision while maintaining scalability, cost-efficiency, and separation of concerns.

---

## 1. Service Architecture

### 1.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Client Layer                                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │   Web App       │  │   Mobile PWA    │  │   Admin Panel   │             │
│  │   (React/Vite)  │  │   (React/PWA)   │  │   (React)       │             │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘             │
└───────────┼────────────────────┼────────────────────┼───────────────────────┘
            │                    │                    │
            └────────────────────┼────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      API Gateway         │
                    │   (NestJS / Express)     │
                    │   - Rate Limiting        │
                    │   - Authentication       │
                    │   - Request Routing      │
                    └────────────┬─────────────┘
                                 │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────▼───────┐      ┌───────▼───────┐      ┌───────▼───────┐
│  Core API     │      │  AI Mentor    │      │  Sandbox      │
│  Service      │      │  Service      │      │  Execution    │
│               │      │               │      │  Service      │
│ - Users       │      │ - LLM         │      │               │
│ - Courses     │      │ - Hints       │      │ - WebContainer│
│ - Quizzes     │      │ - Code Review │      │ - Judge0      │
│ - Challenges  │      │ - Pedagogy    │      │ - Docker      │
│ - Progress    │      │               │      │               │
└───────┬───────┘      └───────┬───────┘      └───────┬───────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────▼───────┐      ┌───────▼───────┐      ┌───────▼───────┐
│   Database    │      │     Cache     │      │    Object     │
│  (PostgreSQL) │      │   (Redis)     │      │    Storage    │
│               │      │               │      │   (S3/R2)     │
└───────────────┘      └───────────────┘      └───────────────┘
```

### 1.2 Service Breakdown

| Service | Technology | Responsibility | Scaling Strategy |
|---------|------------|----------------|------------------|
| **Core API** | NestJS + TypeScript | User management, courses, quizzes, progress tracking, subscriptions | Horizontal (stateless) |
| **AI Mentor** | Node.js + OpenAI API | Socratic hints, code explanation, personalized guidance | Horizontal (queue-based) |
| **Sandbox Execution** | Isolated containers | Code execution for multiple languages | Auto-scaling (resource-intensive) |
| **API Gateway** | Nginx / CloudFlare | Rate limiting, auth, routing, CDN | Edge/CDN |

### 1.3 Key Architectural Decisions

#### Decision 1: Sandbox Execution as Independent Service

**Rationale:** The sandbox execution is the most infrastructure-expensive component. By isolating it:
- Code execution spikes don't affect the Core API or AI Mentor
- Can scale independently based on execution demand
- Enables different pricing tiers (free tier = WebContainers only, paid = server-side containers)
- Failure isolation — sandbox crashes don't bring down the platform

#### Decision 2: AI Mentor as Separate Service

**Rationale:**
- LLM API calls are expensive and slow (high latency)
- Need queue-based processing for cost control
- Enables rate limiting per user tier
- Can be updated/replaced without affecting core functionality

#### Decision 3: Monorepo Structure

**Rationale:**
- Shared types between frontend and backend
- Easier local development
- Single source of truth for API contracts
- Simplified deployment coordination

---

## 2. Monorepo Layout

### 2.1 Directory Structure

```
infinity-code/
├── packages/
│   ├── shared/                    # Shared types and utilities
│   │   ├── src/
│   │   │   ├── types/             # TypeScript interfaces
│   │   │   │   ├── api.ts         # API request/response types
│   │   │   │   ├── challenge.ts   # Challenge execution types
│   │   │   │   ├── user.ts        # User-related types
│   │   │   │   └── index.ts
│   │   │   ├── constants/         # Shared constants
│   │   │   ├── validators/        # Shared validation logic
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── api/                       # Core API Service (NestJS)
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── user/
│   │   │   │   ├── course/
│   │   │   │   ├── challenge/
│   │   │   │   ├── quiz/
│   │   │   │   ├── progress/
│   │   │   │   ├── subscription/
│   │   │   │   └── payment/
│   │   │   └── common/
│   │   │       ├── guards/
│   │   │       ├── interceptors/
│   │   │       └── filters/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── test/
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── nest-cli.json
│   │
│   ├── ai-mentor/                 # AI Mentor Service
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── mentor.service.ts  # Core AI logic
│   │   │   ├── hint-engine/
│   │   │   │   ├── socratic.ts    # Tier 1: Socratic questions
│   │   │   │   ├── directional.ts # Tier 2: Directional hints
│   │   │   │   ├── micro-example.ts # Tier 3: Small examples
│   │   │   │   └── full-reveal.ts # Tier 4: Full solution
│   │   │   ├── code-analyzer/
│   │   │   ├── prompt-templates/
│   │   │   └── queue/             # Bull/Redis queue consumer
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── README.md
│   │
│   ├── sandbox/                   # Sandbox Execution Service
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── executor/
│   │   │   │   ├── webcontainer.ts # Browser-based (JS only)
│   │   │   │   ├── judge0.ts      # Server-side execution API
│   │   │   │   ├── docker.ts      # Custom Docker orchestration
│   │   │   │   └── factory.ts     # Executor factory pattern
│   │   │   ├── languages/
│   │   │   │   ├── javascript.ts
│   │   │   │   ├── python.ts
│   │   │   │   ├── cpp.ts
│   │   │   │   ├── java.ts
│   │   │   │   └── types.ts
│   │   │   ├── security/          # Sandboxing & security
│   │   │   └── queue/             # Job queue consumer
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── README.md
│   │
│   └── web/                       # Frontend (React + Vite)
│       ├── src/
│       │   ├── main.tsx
│       │   ├── App.tsx
│       │   ├── pages/
│       │   │   ├── home.tsx
│       │   │   ├── learn.tsx
│       │   │   ├── challenge.tsx
│       │   │   ├── playground.tsx
│       │   │   └── profile.tsx
│       │   ├── components/
│       │   │   ├── editor/        # Code editor components
│       │   │   ├── lesson/        # Lesson UI components
│       │   │   ├── challenge/     # Challenge UI components
│       │   │   └── ui/            # Shared UI components
│       │   ├── hooks/
│       │   ├── stores/            # State management (Zustand)
│       │   ├── services/          # API client services
│       │   └── utils/
│       ├── public/
│       ├── package.json
│       ├── vite.config.ts
│       ├── tailwind.config.js
│       └── index.html
│
├── infrastructure/
│   ├── docker/
│   │   ├── docker-compose.yml     # Local development
│   │   ├── Dockerfile.api
│   │   ├── Dockerfile.ai
│   │   └── Dockerfile.sandbox
│   ├── kubernetes/                # Production K8s configs
│   │   ├── api-deployment.yaml
│   │   ├── ai-deployment.yaml
│   │   ├── sandbox-deployment.yaml
│   │   └── hpa.yaml               # Horizontal Pod Autoscaler
│   └── terraform/                 # Infrastructure as Code
│
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   └── seed.ts
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-api.yml
│       ├── deploy-ai.yml
│       └── deploy-sandbox.yml
│
├── package.json                   # Root workspace config
├── pnpm-workspace.yaml            # pnpm workspace definition
├── turbo.json                     # Turborepo config (optional)
└── README.md
```

### 2.2 Workspace Configuration (pnpm-workspace.yaml)

```yaml
packages:
  - 'packages/*'
```

### 2.3 Root package.json Scripts

```json
{
  "name": "infinity-code",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "typecheck": "pnpm -r typecheck",
    "docker:build": "docker-compose -f infrastructure/docker/docker-compose.yml build",
    "docker:up": "docker-compose -f infrastructure/docker/docker-compose.yml up -d",
    "docker:down": "docker-compose -f infrastructure/docker/docker-compose.yml down"
  },
  "devDependencies": {
    "pnpm": "^8.0.0",
    "turbo": "^1.0.0"
  }
}
```

---

## 3. Sandbox Execution Strategy

### 3.1 The Core Challenge

Code execution is the most expensive and complex part of this platform. The sandbox must:
- Support multiple languages (JavaScript, Python, C++, Java, C#, TypeScript)
- Be secure (prevent malicious code)
- Be fast (sub-5 second feedback)
- Be cost-efficient (especially for free tier users)
- Scale independently of other services

### 3.2 Tiered Execution Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Sandbox Execution Flow                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│  Code Submission │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Language Check │────▶│  JavaScript?    │
└────────┬────────┘     └────────┬────────┘
         │                       │
         │ Yes                   │ No
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  WebContainer   │     │  User Tier      │
│  (Browser)      │     │  Check          │
│                 │     └────────┬────────┘
│  ✅ Free        │              │
│  ✅ Instant     │              ▼
│  ✅ No server   │     ┌─────────────────┐
│     cost        │     │  Free Tier?     │
└─────────────────┘     │                 │
                        │  ❌ Limited     │
                        │     executions  │
                        └────────┬────────┘
                                 │
                    ┌────────────┼────────────┐
                    │ Yes        │            │ No
                    ▼            ▼            ▼
            ┌───────────┐ ┌───────────┐ ┌─────────────┐
            │ Judge0    │ │ Queue for │ │ Docker      │
            │ API       │ │ later     │ │ Orchestrator│
            │ (Limited) │ │ execution │ │             │
            │           │ │           │ │ ✅ Full     │
            │           │ │           │ │    control  │
            └───────────┘ └───────────┘ └─────────────┘
```

### 3.3 Execution Options Comparison

| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| **WebContainers** | Free, instant, no server cost, secure | JS/TS only, browser-dependent | Beginner content, free tier |
| **Judge0 API** | Supports 60+ languages, managed | Rate limits, cost per execution, latency | Paid tier, occasional use |
| **Custom Docker** | Full control, any language, scalable | Complex setup, security responsibility | Career tier, high volume |

### 3.4 Recommended Implementation

#### Phase 1: WebContainers (MVP)
```typescript
// packages/sandbox/src/executor/webcontainer.ts
import { WebContainer } from '@webcontainer/api';

export class WebContainerExecutor {
  private container: WebContainer | null = null;

  async execute(code: string, input?: string): Promise<ExecutionResult> {
    if (!this.container) {
      this.container = await WebContainer.boot();
    }

    // Write files
    await this.container.fs.writeFile('index.js', code);
    if (input) {
      await this.container.fs.writeFile('input.txt', input);
    }

    // Run the code
    const process = await this.container.spawn('node', ['index.js']);
    
    let output = '';
    let error = '';

    process.output.pipeTo(
      new WritableStream({
        write(chunk) { output += chunk; }
      })
    );

    const exitCode = await process.exit;

    return {
      success: exitCode === 0,
      output,
      error,
      exitCode,
      executionTime: 0, // WebContainer doesn't provide this
      memoryUsed: 0
    };
  }
}
```

#### Phase 2: Judge0 Integration (Paid Tier)
```typescript
// packages/sandbox/src/executor/judge0.ts
import axios from 'axios';

export class Judge0Executor {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.JUDGE0_URL || 'https://ce.judge0.com';
    this.apiKey = process.env.JUDGE0_API_KEY || '';
  }

  async execute(code: string, language: string, input?: string): Promise<ExecutionResult> {
    const languageId = this.getLanguageId(language);
    
    // Submit submission
    const { data: submission } = await axios.post(
      `${this.baseUrl}/submissions`,
      {
        source_code: code,
        language_id: languageId,
        stdin: input,
        wait: true // Synchronous for simplicity
      },
      {
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    return {
      success: submission.status.id === 3, // Accepted
      output: submission.stdout,
      error: submission.stderr,
      exitCode: submission.exit_code,
      executionTime: submission.time * 1000, // Convert to ms
      memoryUsed: submission.memory
    };
  }

  private getLanguageId(language: string): number {
    const map: Record<string, number> = {
      python: 71,  // Python 3
      java: 62,
      cpp: 54,     // C++ (GCC)
      csharp: 51,  // C# (.NET)
      javascript: 63  // JavaScript (Node.js)
    };
    return map[language.toLowerCase()] || 71;
  }
}
```

#### Phase 3: Custom Docker Orchestrator (Career Tier)
```typescript
// packages/sandbox/src/executor/docker.ts
import Docker from 'dockerode';
import { v4 as uuidv4 } from 'uuid';

export class DockerExecutor {
  private docker: Docker;
  private containerCleanupInterval: NodeJS.Timeout;

  constructor() {
    this.docker = new Docker();
    this.startCleanup();
  }

  async execute(
    code: string, 
    language: string, 
    input?: string,
    timeLimitMs: number = 5000,
    memoryLimitMb: number = 256
  ): Promise<ExecutionResult> {
    const containerName = `sandbox-${uuidv4()}`;
    const image = this.getImageForLanguage(language);
    
    const container = await this.docker.createContainer({
      Image: image,
      name: containerName,
      Cmd: ['timeout', `${timeLimitMs / 1000}s`, 'node', '-e', code],
      HostConfig: {
        Memory: memoryLimitMb * 1024 * 1024,
        NetworkMode: 'none', // No network access for security
        ReadonlyRootfs: true,
        CapDrop: ['ALL'], // Drop all capabilities
      },
      OpenStdin: true,
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true
    });

    const startTime = Date.now();
    
    // Start container
    await container.start();
    
    // Get logs
    const logs = await container.logs({
      stdout: true,
      stderr: true,
      follow: false
    });

    // Wait for container to finish
    const data = await container.wait();
    const exitCode = data.StatusCode;
    
    // Parse logs (first 8 bytes are header)
    const output = logs.toString('utf8', 8);
    const error = ''; // Separate stderr handling needed
    
    const executionTime = Date.now() - startTime;

    // Cleanup
    await container.remove({ force: true });

    return {
      success: exitCode === 0,
      output,
      error,
      exitCode,
      executionTime,
      memoryUsed: 0 // Would need cgroup stats
    };
  }

  private getImageForLanguage(language: string): string {
    const images: Record<string, string> = {
      python: 'python:3.11-slim',
      java: 'eclipse-temurin:17-jre-alpine',
      cpp: 'gcc:12-alpine',
      csharp: 'mcr.microsoft.com/dotnet/runtime:7.0',
      javascript: 'node:18-alpine'
    };
    return images[language.toLowerCase()] || 'node:18-alpine';
  }

  private startCleanup() {
    // Clean up any orphaned containers every 5 minutes
    this.containerCleanupInterval = setInterval(async () => {
      const containers = await this.docker.listContainers({
        filters: { name: ['sandbox-'] }
      });
      
      for (const container of containers) {
        const age = Date.now() - container.Created * 1000;
        if (age > 60000) { // Older than 1 minute
          const c = this.docker.getContainer(container.Id);
          await c.remove({ force: true });
        }
      }
    }, 300000);
  }
}
```

### 3.5 Executor Factory Pattern

```typescript
// packages/sandbox/src/executor/factory.ts
import { WebContainerExecutor } from './webcontainer';
import { Judge0Executor } from './judge0';
import { DockerExecutor } from './docker';

export enum ExecutionBackend {
  WEB_CONTAINER = 'webcontainer',
  JUDGE0 = 'judge0',
  DOCKER = 'docker'
}

export class ExecutorFactory {
  static create(backend: ExecutionBackend, userTier: string): Executor {
    switch (backend) {
      case ExecutionBackend.WEB_CONTAINER:
        return new WebContainerExecutor();
      
      case ExecutionBackend.JUDGE0:
        if (userTier === 'free') {
          // Rate limit free users
          return new RateLimitedExecutor(new Judge0Executor(), {
            maxExecutions: 10,
            windowMinutes: 60
          });
        }
        return new Judge0Executor();
      
      case ExecutionBackend.DOCKER:
        if (userTier !== 'career') {
          throw new Error('Docker execution requires Career tier');
        }
        return new DockerExecutor();
      
      default:
        throw new Error(`Unknown backend: ${backend}`);
    }
  }

  static getBackendForLanguage(language: string, userTier: string): ExecutionBackend {
    // JavaScript/TypeScript can always use WebContainers
    if (['javascript', 'typescript'].includes(language.toLowerCase())) {
      return ExecutionBackend.WEB_CONTAINER;
    }

    // Free tier users get limited Judge0 access
    if (userTier === 'free') {
      return ExecutionBackend.JUDGE0;
    }

    // Career tier gets full Docker access
    if (userTier === 'career') {
      return ExecutionBackend.DOCKER;
    }

    // Default to Judge0 for paid tiers
    return ExecutionBackend.JUDGE0;
  }
}
```

### 3.6 Cost Optimization Strategies

1. **Client-side execution** for JavaScript/TypeScript (free)
2. **Execution queuing** for expensive operations (Judge0/Docker)
3. **Result caching** for common challenges
4. **Rate limiting** based on user tier
5. **Resource limits** (time, memory) per execution
6. **Batch processing** for non-urgent executions

---

## 4. Core Data Model

### 4.1 Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│    Profile      │       │   UserSettings  │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄─────▶│ id (PK)         │
│ email           │       │ userId (FK)     │
│ password        │       │ dailyGoalMinutes│
│ username        │       │ reminderTime    │
│ role            │       └─────────────────┘
│ subscription    │
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       ┌─────────────────┐
│  Enrollment     │       │    Topic        │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄─────▶│ id (PK)         │
│ userId (FK)     │       │ title           │
│ topicId (FK)    │       │ slug            │
│ progressPct     │       │ difficulty      │
│ isCompleted     │       │ isPublished     │
└─────────────────┘       └────────┬────────┘
                                   │
                                   │ 1:N
                                   ▼
                          ┌─────────────────┐
                          │    Module       │
                          ├─────────────────┤
                          │ id (PK)         │
                          │ topicId (FK)    │
                          │ title           │
                          │ orderIndex      │
                          └────────┬────────┘
                                   │
                                   │ 1:N
                                   ▼
                          ┌─────────────────┐
                          │    Lesson       │
                          ├─────────────────┤
                          │ id (PK)         │
                          │ moduleId (FK)   │
                          │ title           │
                          │ content         │
                          │ videoUrl        │
                          └────────┬────────┘
                                   │
                                   │ 1:N
                                   ▼
                          ┌─────────────────┐
                          │    Quiz         │
                          ├─────────────────┤
                          │ id (PK)         │
                          │ lessonId (FK)   │
                          │ passingScore    │
                          │ timeLimit       │
                          └────────┬────────┘
                                   │
                                   │ 1:N
                                   ▼
                          ┌─────────────────┐
                          │   Question      │
                          ├─────────────────┤
                          │ id (PK)         │
                          │ quizId (FK)     │
                          │ type            │
                          │ questionText    │
                          └─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│   Challenge     │       │ChallengeSubmission│
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄─────▶│ id (PK)         │
│ title           │       │ userId (FK)     │
│ slug            │       │ challengeId (FK)│
│ difficulty      │       │ code            │
│ instructions    │       │ status          │
│ starterCode     │       │ result (JSON)   │
│ testCases (JSON)│       │ isAccepted      │
│ language        │       │ pointsEarned    │
└─────────────────┘       └─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│  Achievement    │       │ UserAchievement │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄─────▶│ id (PK)         │
│ name            │       │ userId (FK)     │
│ slug            │       │ achievementId   │
│ description     │       │ earnedAt        │
│ iconUrl         │       └─────────────────┘
│ requirementType │
│ requirementValue│
└─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│SubscriptionPlan │       │  Subscription   │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄─────▶│ id (PK)         │
│ name            │       │ userId (FK)     │
│ slug            │       │ planId (FK)     │
│ price           │       │ status          │
│ billingPeriod   │       │ currentPeriodEnd│
│ trialDays       │       │ trialEndsAt     │
└─────────────────┘       └────────┬────────┘
                                   │
                                   │ 1:N
                                   ▼
                          ┌─────────────────┐
                          │    Payment      │
                          ├─────────────────┤
                          │ id (PK)         │
                          │ subscriptionId  │
                          │ amount          │
                          │ status          │
                          │ paymentMethod   │
                          └─────────────────┘
```

### 4.2 Key Schema Additions for Blueprint Features

```prisma
// New models for AI Mentor and enhanced features

model HintSession {
  id                String    @id @default(uuid())
  userId            String
  user              Profile   @relation(fields: [userId], references: [id], onDelete: Cascade)
  challengeId       String?
  challenge         Challenge? @relation(fields: [challengeId], references: [id])
  lessonId          String?
  lesson            Lesson?    @relation(fields: [lessonId], references: [id])
  
  // Hint tracking
  currentTier       Int       @default(1)  // 1-4 escalation
  hintsUsed         Int       @default(0)
  totalHintsAllowed Int       @default(5)  // Based on subscription
  
  // Context
  codeAttempts      Int       @default(0)
  timeSpentSeconds  Int       @default(0)
  lastErrorCode     String?
  
  // AI interaction
  lastPrompt        String?
  lastResponse      String?
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  completedAt       DateTime?

  @@index([userId])
  @@index([challengeId])
}

model SkillNode {
  id                String    @id @default(uuid())
  name              String
  slug              String    @unique
  description       String?
  
  // Skill tree structure
  parentSkillId     String?
  parentSkill       SkillNode? @relation("SkillTree", fields: [parentSkillId], references: [id])
  children          SkillNode[] @relation("SkillTree")
  
  // Prerequisites
  requiredSkills    SkillNode[] @relation("SkillPrerequisites")
  requiredBy        SkillNode[] @relation("SkillPrerequisites")
  
  // Content mapping
  topicId           String?
  topic             Topic?     @relation(fields: [topicId], references: [id])
  challengeIds      String[]
  
  // Metadata
  category          String?    // "fundamentals", "algorithms", etc.
  difficulty        Int        @default(1)  // 1-5
  estimatedMinutes  Int        @default(30)
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@index([parentSkillId])
}

model UserSkillProgress {
  id                String    @id @default(uuid())
  userId            String
  user              Profile   @relation(fields: [userId], references: [id], onDelete: Cascade)
  skillId           String
  skill             SkillNode @relation(fields: [skillId], references: [id], onDelete: Cascade)
  
  // Progress
  status            String    @default("locked")  // locked, in_progress, completed, mastered
  progressPercent   Decimal   @default(0) @db.Decimal(5, 2)
  
  // Mastery tracking
  practiceCount     Int       @default(0)
  lastPracticedAt   DateTime?
  masteryScore      Decimal?  @db.Decimal(5, 2)  // 0-100
  
  // Unassisted tracking (for focus streak)
  unassistedCompletions Int   @default(0)
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@unique([userId, skillId])
  @@index([userId])
  @@index([skillId])
}

model FocusStreak {
  id                String    @id @default(uuid())
  userId            String
  user              Profile   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  startDate         DateTime  @db.Date
  endDate           DateTime? @db.Date
  daysCount         Int       @default(1)
  isActive          Boolean   @default(true)
  
  // Focus-specific metrics
  unassistedChallenges Int   @default(0)
  averageHintTier   Decimal?  @db.Decimal(3, 2)  // Lower is better
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@unique([userId, startDate])
  @@index([userId])
}

model StreakFreeze {
  id                String    @id @default(uuid())
  userId            String
  user              Profile   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Earned through consistency, not purchased
  earnedDate        DateTime  @default(now())
  usedDate          DateTime?
  isActive          Boolean   @default(true)
  
  // Source of earn
  earnedFrom        String    @default("consistency")  // consistency, achievement, etc.
  
  createdAt         DateTime  @default(now())

  @@index([userId])
}

model PortfolioProject {
  id                String    @id @default(uuid())
  userId            String
  user              Profile   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  title             String
  slug              String    @unique
  description       String?
  
  // Project content
  code              String    @db.Text
  language          String
  framework         String?
  
  // Deployment
  deployUrl         String?
  deployStatus      String    @default("pending")  // pending, deployed, failed
  deployedAt        DateTime?
  
  // Sharing
  isPublic          Boolean   @default(false)
  shareToken        String?   @unique
  
  // Metadata
  tags              String[]
  thumbnailUrl      String?
  
  // Statistics
  viewCount         Int       @default(0)
  likeCount         Int       @default(0)
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@index([userId])
  @@index([slug])
  @@index([isPublic])
}

model ProjectReaction {
  id                String    @id @default(uuid())
  userId            String
  user              Profile   @relation(fields: [userId], references: [id], onDelete: Cascade)
  projectId         String
  project           PortfolioProject @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  reactionType      String    @default("clap")  // clap, comment, bookmark
  comment           String?
  
  createdAt         DateTime  @default(now())

  @@unique([userId, projectId, reactionType])
  @@index([projectId])
}
```

### 4.3 Data Model Summary

| Entity | Purpose | Key Relationships |
|--------|---------|-------------------|
| **Profile** | User account & authentication | 1:N with all user activities |
| **Topic/Module/Lesson** | Content hierarchy | Tree structure |
| **Enrollment** | User-course relationship | Links Profile ↔ Topic |
| **Challenge** | Coding exercises | Has submissions, hints |
| **HintSession** | AI mentor interaction tracking | Links Profile ↔ Challenge/Lesson |
| **SkillNode** | Non-linear skill tree | Self-referential tree |
| **UserSkillProgress** | Skill mastery tracking | Links Profile ↔ SkillNode |
| **FocusStreak** | Unassisted learning streaks | Alternative to daily streak |
| **PortfolioProject** | Shareable projects | Links Profile ↔ deployed code |

---

## 5. API Contract Examples

### 5.1 Challenge Submission with AI Hints

```typescript
// packages/shared/src/types/challenge.ts

export interface ChallengeSubmissionRequest {
  challengeId: string;
  code: string;
  language: string;
  input?: string;
}

export interface ChallengeSubmissionResponse {
  success: boolean;
  output: string;
  error: string;
  exitCode: number;
  executionTime: number;
  memoryUsed: number;
  pointsEarned: number;
  hintsUsed: number;
  hintTier: number;
}

export interface HintRequest {
  challengeId: string;
  currentCode: string;
  attemptCount: number;
  timeSpentSeconds: number;
  lastError?: string;
}

export interface HintResponse {
  tier: 1 | 2 | 3 | 4;
  hint: string;
  cost: number; // Points deducted for higher tiers
  nextHintAvailableAt?: Date;
}
```

### 5.2 Skill Tree Progress

```typescript
// packages/shared/src/types/skill.ts

export interface SkillNode {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentSkillId?: string;
  children: SkillNode[];
  requiredSkillIds: string[];
  topicId?: string;
  category: string;
  difficulty: number; // 1-5
  estimatedMinutes: number;
}

export interface UserSkillProgress {
  skillId: string;
  status: 'locked' | 'in_progress' | 'completed' | 'mastered';
  progressPercent: number;
  practiceCount: number;
  masteryScore?: number;
  unassistedCompletions: number;
  lastPracticedAt?: Date;
}

export interface SkillTreeResponse {
  nodes: SkillNode[];
  userProgress: UserSkillProgress[];
  recommendedNext: string[]; // Skill IDs
}
```

---

## 6. Deployment Architecture

### 6.1 Infrastructure Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CloudFlare CDN                                  │
│                         (Static assets, caching)                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Load Balancer                                     │
│                         (AWS ALB / CloudFlare)                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐          ┌───────────────┐          ┌───────────────┐
│   API Service │          │  AI Service   │          │ Sandbox       │
│   (ECS/Fargate│          │  (ECS/Fargate │          │ Service       │
│    × 2-10)    │          │   × 1-5)      │          │ (ECS/Fargate  │
│               │          │               │          │  × 2-20)      │
└───────┬───────┘          └───────┬───────┘          └───────┬───────┘
        │                           │                           │
        └───────────────────────────┼───────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐          ┌───────────────┐          ┌───────────────┐
│  PostgreSQL   │          │    Redis      │          │  Object       │
│  (RDS)        │          │   (ElastiCache│          │  Storage      │
│               │          │    Serverless)│          │  (S3/R2)      │
└───────────────┘          └───────────────┘          └───────────────┘
```

### 6.2 Auto-scaling Configuration

```yaml
# infrastructure/kubernetes/hpa.yaml

apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: sandbox-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: sandbox
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
    - type: Pods
      pods:
        metric:
          name: queue_length
        target:
          type: AverageValue
          averageValue: "10"
```

---

## 7. Security Considerations

### 7.1 Sandbox Security

1. **Network Isolation**: Sandbox containers have no network access
2. **Resource Limits**: CPU, memory, and time limits enforced
3. **Read-only Filesystem**: Prevent persistent changes
4. **Capability Dropping**: Remove unnecessary Linux capabilities
5. **Seccomp Profiles**: Restrict system calls
6. **User Namespaces**: Run as non-root

### 7.2 API Security

1. **JWT Authentication**: Short-lived access tokens + refresh tokens
2. **Rate Limiting**: Per-endpoint and per-user limits
3. **Input Validation**: Strict schema validation on all inputs
4. **SQL Injection**: Prisma ORM provides parameterized queries
5. **XSS Protection**: Content Security Policy headers
6. **CORS**: Strict origin whitelisting

### 7.3 AI Prompt Injection Prevention

1. **System Prompts**: Locked system prompts that can't be overridden
2. **Input Sanitization**: Strip potentially malicious code patterns
3. **Output Validation**: Verify AI responses before showing to users
4. **Rate Limiting**: Prevent prompt injection attempts via volume

---

## 8. Monitoring & Observability

### 8.1 Key Metrics

| Metric | Service | Target |
|--------|---------|--------|
| API Response Time | Core API | < 200ms p95 |
| Code Execution Time | Sandbox | < 5000ms p95 |
| AI Response Time | AI Mentor | < 3000ms p95 |
| Error Rate | All | < 0.1% |
| Sandbox Success Rate | Sandbox | > 99% |
| Hint Escalation Rate | AI Mentor | Track for pedagogy |

### 8.2 Alerting

```yaml
# Example Prometheus alerting rules

groups:
  - name: infinity-code
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
      
      - alert: SandboxQueueGrowing
        expr: sandbox_queue_length > 100
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Sandbox queue is growing"
      
      - alert: HighAIResponseTime
        expr: histogram_quantile(0.95, rate(ai_response_time_bucket[5m])) > 3
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "AI response time is high"
```

---

## 9. Cost Estimation

### 9.1 Monthly Infrastructure Costs (Estimated)

| Component | Free Tier (1K users) | Growth (10K users) | Scale (100K users) |
|-----------|---------------------|--------------------|--------------------|
| **Frontend (Vercel/Netlify)** | $0-20 | $50 | $200 |
| **API (2 × Fargate)** | $30 | $100 | $500 |
| **AI Service (1 × Fargate)** | $15 | $50 | $300 |
| **Sandbox (WebContainer)** | $0 | $0 | $0 |
| **Sandbox (Judge0)** | $0 | $50 | $500 |
| **Sandbox (Docker)** | $0 | $100 | $1000 |
| **PostgreSQL (RDS)** | $15 | $50 | $200 |
| **Redis (ElastiCache)** | $10 | $30 | $150 |
| **Storage (S3)** | $1 | $10 | $50 |
| **CDN (CloudFlare)** | $0 | $0 | $200 |
| **OpenAI API** | $20 | $200 | $2000 |
| **Total** | ~$91 | ~$640 | ~$5100 |

### 9.2 Cost Optimization Levers

1. **WebContainers** eliminate server costs for JS/TS execution
2. **Result caching** reduces AI API calls
3. **Queue-based processing** smooths out expensive operations
4. **Tiered access** gates expensive features behind paid plans
5. **Auto-scaling** ensures you only pay for what you use

---

## 10. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [ ] Set up monorepo structure
- [ ] Implement Core API with existing features
- [ ] Deploy basic infrastructure
- [ ] Integrate WebContainers for JS execution

### Phase 2: AI Mentor (Weeks 5-10)
- [ ] Build AI Mentor service
- [ ] Implement 4-tier hint system
- [ ] Add hint session tracking
- [ ] Integrate with challenges

### Phase 3: Skill Tree (Weeks 11-14)
- [ ] Implement SkillNode data model
- [ ] Build skill tree UI
- [ ] Add UserSkillProgress tracking
- [ ] Implement recommendation engine

### Phase 4: Advanced Sandbox (Weeks 15-20)
- [ ] Integrate Judge0 for paid users
- [ ] Build Docker orchestrator
- [ ] Add execution queuing
- [ ] Implement result caching

### Phase 5: Portfolio & Social (Weeks 21-24)
- [ ] Build PortfolioProject model
- [ ] Add one-click deployment
- [ ] Implement ProjectReaction system
- [ ] Add project gallery

---

## Conclusion

This architecture provides:

1. **Scalability**: Each service scales independently based on demand
2. **Cost Efficiency**: WebContainers for free tier, gated advanced features
3. **Security**: Isolated sandbox execution with multiple layers of protection
4. **Maintainability**: Monorepo with shared types and clear service boundaries
5. **Extensibility**: Easy to add new languages, features, or execution backends

The key insight is treating **Sandbox Execution** as a first-class, independently-scaling service — this is the most infrastructure-intensive component and shouldn't share resources with the Core API or AI Mentor.
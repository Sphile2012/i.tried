# Implementation Plan: Level-Based Progression System

## Overview

This implementation plan breaks down the Level-Based Progression System into discrete coding tasks following the architecture defined in the design document. The system uses a three-tier proficiency classification (BEGINNER, INTERMEDIATE, EXPERT) with onboarding quiz assessment, content gating, adaptive UI layouts, and XP-based progression tracking.

**Tech Stack:**
- Backend: NestJS with Prisma ORM (SQLite for development)
- Frontend: React with Vite, Wouter routing, TanStack Query, Tailwind CSS
- Global State: React Context API

## Tasks

### 1. Database Schema and Migrations

- [ ] 1.1 Extend Prisma schema with proficiency level support
  - Add `proficiencyLevel` enum field to User model (BEGINNER, INTERMEDIATE, EXPERT)
  - Add `totalXp` field to User model (separate from existing `xp` field for progression tracking)
  - Add `completionRate` field to User model
  - Add `progressionEligible` boolean field to User model
  - Add `onboardingCompleted` boolean field to User model
  - Create indexes on `proficiencyLevel` field for fast filtering
  - _Requirements: 2.1, 2.2, 2.5_

- [ ] 1.2 Create QuizQuestion model
  - Define QuizQuestion schema with id, questionText, optionA, optionB, optionC, optionD, correctAnswer, difficultyWeight, topic fields
  - Add validation constraint for correctAnswer (must be A, B, C, or D)
  - Add validation constraint for difficultyWeight (must be between 1 and 10)
  - _Requirements: 1.2, 16.2, 16.3_

- [ ] 1.3 Create QuizAttempt model
  - Define QuizAttempt schema with id, userId, score, assignedLevel, answers (JSONB), completedAt fields
  - Add foreign key relationship to User model with cascade delete
  - Create index on userId for fast user lookup
  - _Requirements: 1.3, 1.7_

- [ ] 1.4 Extend Content model with difficulty classification
  - Add `difficulty` enum field to existing Lesson and Challenge models (BEGINNER, INTERMEDIATE, EXPERT)
  - Add `xpReward` field to Lesson model (default 0)
  - Add `estimatedDuration` field if not present
  - Add `orderIndex` field if not present
  - Create indexes on `difficulty` field for content filtering
  - _Requirements: 3.1, 4.1, 5.1_

- [ ] 1.5 Create ProgressionHistory model
  - Define ProgressionHistory schema with id, userId, previousLevel, newLevel, xpAtProgression, completionRateAtProgression, progressedAt fields
  - Add foreign key relationship to User model with cascade delete
  - Create index on userId for fast user lookup
  - _Requirements: 11.2, 12.5, 17.2_

- [ ] 1.6 Create UserProgress tracking model
  - Define UserProgress schema with id, userId, contentId, status (not_started, in_progress, completed), completionDate, xpEarned fields
  - Add unique constraint on (userId, contentId) combination
  - Create composite index on (userId, status) for completion rate calculations
  - _Requirements: 10.1, 10.5_

- [ ] 1.7 Generate Prisma migration and apply to database
  - Run `npx prisma migrate dev --name add-level-progression-system`
  - Verify migration creates all tables and indexes correctly
  - Test rollback and re-apply to ensure migration is reversible
  - _Requirements: 2.2_

- [ ] 1.8 Checkpoint - Verify database schema
  - Ensure all models are created successfully
  - Verify indexes exist and are being used by query planner
  - Check foreign key constraints work correctly
  - Ask the user if questions arise

### 2. Backend - Onboarding Quiz System

- [ ] 2.1 Create Quiz module and service structure
  - Generate NestJS module: `nest g module quiz`
  - Generate NestJS service: `nest g service quiz`
  - Generate NestJS controller: `nest g controller quiz`
  - Register module in AppModule imports
  - _Requirements: 1.1_

- [ ] 2.2 Implement quiz question retrieval endpoint
  - Create GET `/api/onboarding/quiz` endpoint
  - Implement randomized question selection (5-10 questions from pool)
  - Ensure varied difficulty distribution in selected questions
  - Return questions without correct answers in response
  - Add request rate limiting (max 3 requests per hour per user)
  - _Requirements: 1.1, 1.2, 16.5_

- [ ] 2.3 Implement quiz submission and scoring logic
  - Create POST `/api/onboarding/quiz/submit` endpoint
  - Validate submitted answers against correct answers
  - Calculate weighted score based on difficulty weights
  - Determine proficiency level: <40% → BEGINNER, 40-75% → INTERMEDIATE, >75% → EXPERT
  - Store quiz attempt in QuizAttempt table
  - Calculate response time (must complete within 500ms)
  - _Requirements: 1.3, 1.4, 1.5, 1.6_

- [ ] 2.4 Implement level assignment on quiz completion
  - Update User.proficiencyLevel with assigned level
  - Set User.onboardingCompleted to true
  - Update User.updatedAt timestamp
  - Return assigned level and confirmation message in response
  - Log level assignment event
  - _Requirements: 1.7, 1.8_

- [ ]* 2.5 Write unit tests for quiz scoring logic
  - Test score calculation with different answer combinations
  - Test level assignment thresholds (boundary values at 40% and 75%)
  - Test edge cases: all correct, all incorrect, partial correct
  - Test weighted scoring with different difficulty distributions
  - _Requirements: 1.3, 1.4, 1.5, 1.6_

### 3. Backend - Authentication with Level Data

- [ ] 3.1 Extend authentication response to include level data
  - Modify existing auth service to load proficiencyLevel from User model
  - Include level, xp, completionRate, progressionEligible in JWT payload
  - Update POST `/api/auth/login` response to include level and requiresOnboarding flag
  - Update POST `/api/auth/register` response to set requiresOnboarding: true
  - _Requirements: 2.3_

- [ ] 3.2 Create JWT strategy to include level in session
  - Extend existing JwtStrategy to extract proficiencyLevel from token
  - Attach level to request.user object for use in guards and controllers
  - Handle null proficiencyLevel case (user hasn't completed onboarding)
  - _Requirements: 2.3, 13.1_

- [ ]* 3.3 Write integration tests for authentication with level data
  - Test registration returns requiresOnboarding: true
  - Test login includes level data when user has completed onboarding
  - Test login includes requiresOnboarding: true when user hasn't completed quiz
  - Test JWT token includes level claim
  - _Requirements: 2.3_

### 4. Backend - Content Authorization Middleware

- [ ] 4.1 Create level authorization guard
  - Create `src/auth/guards/level.guard.ts` implementing CanActivate interface
  - Implement level hierarchy validation (BEGINNER=1, INTERMEDIATE=2, EXPERT=3)
  - Extract required level from route metadata using @SetMetadata decorator
  - Compare user level with required level
  - Return 401 if user not authenticated, 403 if level insufficient
  - _Requirements: 13.1, 13.2_

- [ ] 4.2 Create @RequireLevel decorator
  - Create custom decorator `@RequireLevel(level: ProficiencyLevel)` using SetMetadata
  - Apply decorator to controller methods requiring level checks
  - Document usage examples in decorator comments
  - _Requirements: 13.1_

- [ ] 4.3 Implement authorization error responses
  - Return HTTP 403 with JSON error including requiredLevel and currentLevel
  - Log authorization failures with userId, requestedContentId, timestamp
  - Create error response DTO with structured error format
  - _Requirements: 13.2, 13.4, 13.5_

- [ ] 4.4 Apply level guards to existing lesson and challenge endpoints
  - Add @RequireLevel decorator to GET `/api/lessons/:id` endpoint
  - Add @RequireLevel decorator to GET `/api/challenges/:id` endpoint
  - Extract difficulty from content metadata to determine required level
  - _Requirements: 3.4, 4.4, 13.3_

- [ ]* 4.5 Write integration tests for content authorization
  - Test BEGINNER user blocked from INTERMEDIATE content (expect 403)
  - Test INTERMEDIATE user can access BEGINNER content (expect 200)
  - Test EXPERT user can access all content (expect 200)
  - Test authorization failure logging
  - _Requirements: 13.2, 13.3, 13.4_

### 5. Backend - Curriculum Endpoints

- [ ] 5.1 Create curriculum module and service
  - Generate NestJS module: `nest g module curriculum`
  - Generate NestJS service: `nest g service curriculum`
  - Generate NestJS controller: `nest g controller curriculum`
  - Register module in AppModule imports
  - _Requirements: 3.1, 4.1, 5.1_

- [ ] 5.2 Implement GET /api/curriculum/:level endpoint
  - Query lessons filtered by difficulty matching or below requested level
  - Query challenges filtered by difficulty matching or below requested level
  - Apply @RequireLevel guard to endpoint
  - Join with UserProgress to include completion status
  - Return lessons and challenges with completion flags
  - Sort by orderIndex for proper sequencing
  - _Requirements: 3.1, 3.2, 4.1, 4.2, 5.1_

- [ ] 5.3 Implement GET /api/curriculum/:level/lesson/:id endpoint
  - Query lesson by ID with difficulty check
  - Apply @RequireLevel guard based on lesson difficulty
  - Return lesson content, code examples, hints, quiz questions
  - Include previous and next lesson IDs for navigation
  - _Requirements: 3.3, 7.6_

- [ ] 5.4 Add caching layer for curriculum data
  - Implement Redis caching with 5-minute TTL for curriculum lists
  - Cache lesson content with 10-minute TTL
  - Invalidate cache on content updates
  - _Requirements: Performance optimization_

- [ ]* 5.5 Write unit tests for curriculum filtering
  - Test BEGINNER level returns only BEGINNER content
  - Test INTERMEDIATE level returns BEGINNER and INTERMEDIATE content
  - Test EXPERT level returns all content
  - Test completion status correctly joined from UserProgress
  - _Requirements: 3.1, 4.1, 5.1_

### 6. Backend - Progression Logic Service

- [ ] 6.1 Create progression service module
  - Generate NestJS module: `nest g module progression`
  - Generate NestJS service: `nest g service progression`
  - Generate NestJS controller: `nest g controller progression`
  - Register module in AppModule imports
  - _Requirements: 9.1, 9.2, 10.1_

- [ ] 6.2 Implement XP threshold configuration
  - Define PROGRESSION_THRESHOLDS constant with BEGINNER→INTERMEDIATE (1000 XP) and INTERMEDIATE→EXPERT (5000 XP)
  - Create configuration service for runtime threshold updates
  - Validate threshold values between 100 and 100000
  - _Requirements: 9.1, 9.2, 18.2, 18.3_

- [ ] 6.3 Implement completion rate calculation
  - Query UserProgress for lessons at user's current difficulty level
  - Calculate percentage of completed vs total available lessons
  - Cache calculation result with user context
  - Update User.completionRate field
  - _Requirements: 10.1, 10.5_

- [ ] 6.4 Implement progression eligibility check
  - Create `checkProgressionEligibility(userId)` method
  - Check if user.totalXp >= XP_THRESHOLD for current level
  - Check if user.completionRate >= required completion rate (80% for BEGINNER, 70% for INTERMEDIATE)
  - Return eligibility status with criteria breakdown (xpMet, completionRateMet)
  - Update User.progressionEligible field
  - _Requirements: 9.3, 9.4, 10.2, 10.3, 10.4_

- [ ] 6.5 Implement GET /api/level/status endpoint
  - Return current level, totalXp, completionRate, progressionEligible
  - Calculate and return next level requirements
  - Include progress toward next XP threshold and completion rate
  - _Requirements: 20.2, 20.3, 20.4_

- [ ] 6.6 Implement POST /api/level/check-progression endpoint
  - Call checkProgressionEligibility service method
  - Return eligibility status and criteria breakdown
  - Rate limit to prevent abuse (max 10 requests per minute per user)
  - _Requirements: 9.3, 9.4_

- [ ]* 6.7 Write unit tests for progression logic
  - **Property 1: XP threshold monotonicity**
  - **Validates: Requirements 9.1, 9.2**
  - Test BEGINNER→INTERMEDIATE requires 1000 XP
  - Test INTERMEDIATE→EXPERT requires 5000 XP
  - Test XP below threshold marks user as ineligible

- [ ]* 6.8 Write unit tests for completion rate logic
  - **Property 2: Completion rate calculation correctness**
  - **Validates: Requirements 10.1, 10.2, 10.3**
  - Test completion rate with 0%, 50%, 80%, 100% completion
  - Test completion rate filtering by difficulty level
  - Test BEGINNER requires 80% completion for progression
  - Test INTERMEDIATE requires 70% completion for progression

### 7. Backend - Level Progression Execution

- [ ] 7.1 Implement POST /api/level/advance endpoint
  - Verify user is eligible for progression using checkProgressionEligibility
  - Return 400 if user not eligible with criteria breakdown
  - Query current user level and progression target
  - _Requirements: 11.1_

- [ ] 7.2 Implement level progression transaction
  - Start database transaction
  - Insert record into ProgressionHistory table with previous level, new level, XP, completion rate
  - Update User.proficiencyLevel to next level
  - Set User.progressionEligible to false
  - Update User.updatedAt timestamp
  - Commit transaction or rollback on error
  - Complete all operations within 1 second
  - _Requirements: 11.1, 11.2, 12.5_

- [ ] 7.3 Implement progression notification generation
  - Create notification message with new level and congratulatory text
  - List newly unlocked features (3+ items specific to new level)
  - Return notification data in API response
  - _Requirements: 12.1, 12.2, 12.3_

- [ ] 7.4 Implement cache invalidation on progression
  - Invalidate user session cache
  - Invalidate curriculum cache for user
  - Trigger frontend state refresh via response flag
  - _Requirements: 11.3, 11.4_

- [ ]* 7.5 Write integration tests for level progression
  - **Property 3: Progression state consistency**
  - **Validates: Requirements 11.1, 11.2, 11.3**
  - Test successful progression updates User.proficiencyLevel
  - Test progression creates ProgressionHistory record
  - Test ineligible user cannot progress (returns 400)
  - Test progression completes within 1 second
  - Test transaction rollback on error

### 8. Backend - Admin Level Management

- [ ] 8.1 Create admin module and guards
  - Generate NestJS module: `nest g module admin`
  - Create @RequireAdmin decorator using existing role system
  - Create AdminGuard checking user.role === 'ADMIN'
  - _Requirements: 14.1_

- [ ] 8.2 Implement GET /api/admin/users/:userId/level endpoint
  - Apply @RequireAdmin guard
  - Query user with proficiencyLevel, xp, completionRate
  - Return current level data and progression history
  - _Requirements: 14.2_

- [ ] 8.3 Implement PUT /api/admin/users/:userId/level endpoint
  - Apply @RequireAdmin guard
  - Validate new level is valid proficiency level
  - Log level change with adminId, userId, previousLevel, newLevel, reason, timestamp
  - Update User.proficiencyLevel within 1 second
  - Optionally send email notification to affected user
  - _Requirements: 14.3, 14.4, 14.5_

- [ ] 8.4 Implement GET /api/admin/statistics/levels endpoint
  - Apply @RequireAdmin guard
  - Query count of users at each proficiency level
  - Calculate average time to progress BEGINNER→INTERMEDIATE from ProgressionHistory
  - Calculate average time to progress INTERMEDIATE→EXPERT from ProgressionHistory
  - Generate histogram of quiz scores from QuizAttempt table
  - Cache statistics with 5-minute TTL
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ] 8.5 Implement quiz question management endpoints
  - Create POST `/api/admin/quiz/questions` endpoint for creating questions
  - Create PUT `/api/admin/quiz/questions/:id` endpoint for updating questions
  - Create DELETE `/api/admin/quiz/questions/:id` endpoint for deleting questions
  - Validate exactly one correct answer per question
  - Require question text, 4 options, correct answer, difficulty weight
  - Apply @RequireAdmin guard to all endpoints
  - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [ ] 8.6 Implement progression rollback endpoint
  - Create POST `/api/admin/users/:userId/rollback` endpoint
  - Apply @RequireAdmin guard
  - Query most recent ProgressionHistory record for user
  - Revert User.proficiencyLevel to previousLevel from history
  - Log rollback with adminId, userId, timestamp
  - Send email notification to affected user explaining change
  - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5_

- [ ] 8.7 Implement progression threshold configuration endpoints
  - Create GET `/api/admin/config/progression` endpoint returning current thresholds
  - Create PUT `/api/admin/config/progression` endpoint for updating thresholds
  - Validate XP thresholds between 100 and 100000
  - Validate completion rate requirements between 50 and 100 percent
  - Apply @RequireAdmin guard
  - Apply changes to all subsequent progression evaluations
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6_

- [ ]* 8.8 Write integration tests for admin endpoints
  - Test non-admin user blocked from admin endpoints (expect 403)
  - Test admin can update user levels
  - Test admin can view statistics
  - Test admin can manage quiz questions
  - Test admin can rollback progressions
  - _Requirements: 14.1, 14.3, 15.1, 16.1, 17.3_

### 9. Checkpoint - Backend API Complete
  - Ensure all backend endpoints are implemented and tested
  - Verify database migrations applied successfully
  - Test authentication flow with level data
  - Test content authorization with different user levels
  - Test progression logic and admin management
  - Ask the user if questions arise

### 10. Frontend - Global State Management

- [ ] 10.1 Create UserContext with level support
  - Create `src/context/UserContext.tsx` file
  - Define User interface with id, email, name, level, xp, completionRate, progressionEligible fields
  - Implement UserProvider component with useState for user state
  - Implement useUser hook with context validation
  - Add updateLevel method for level changes
  - Add refreshUserData method to fetch latest user data from API
  - _Requirements: 2.4_

- [ ] 10.2 Implement user data persistence and hydration
  - Load user data from localStorage on app mount
  - Store user data in localStorage on user state changes
  - Fetch fresh user data from `/api/user/level-status` on app load if token exists
  - Handle token expiration and redirect to login
  - _Requirements: 2.4_

- [ ] 10.3 Implement level update mechanisms
  - Create updateLevel function to update local state
  - Trigger re-render of level-dependent components on level change
  - Invalidate TanStack Query cache on level change
  - _Requirements: 11.3_

- [ ]* 10.4 Write unit tests for UserContext
  - Test UserProvider initializes with null user
  - Test updateLevel updates state correctly
  - Test refreshUserData fetches and updates user data
  - Test localStorage persistence and hydration
  - _Requirements: 2.4, 11.3_

### 11. Frontend - LevelGuard Component

- [ ] 11.1 Create LevelGuard component
  - Create `src/guards/LevelGuard.tsx` file
  - Implement level hierarchy map (BEGINNER=1, INTERMEDIATE=2, EXPERT=3)
  - Accept requiredLevel prop and children prop
  - Use useUser hook to get current user level
  - _Requirements: 3.4, 4.4_

- [ ] 11.2 Implement level access logic
  - Compare userLevelRank with requiredLevelRank
  - Redirect to `/onboarding/quiz` if user has no level
  - Render children if user level sufficient
  - Render access denied UI if user level insufficient
  - _Requirements: 3.4, 4.4, 13.2_

- [ ] 11.3 Create access denied UI
  - Display "Content Locked" heading
  - Show required level message
  - Display progress information (XP and completion rate needed)
  - Show encouraging message to complete more lessons
  - Add lock icon visual indicator
  - _Requirements: 3.5, 4.5_

- [ ]* 11.4 Write unit tests for LevelGuard
  - Test BEGINNER user blocked from INTERMEDIATE content
  - Test INTERMEDIATE user can access BEGINNER content
  - Test EXPERT user can access all content
  - Test redirect to onboarding for user without level
  - _Requirements: 3.4, 4.4_

### 12. Frontend - Layout Components

- [ ] 12.1 Create BeginnerLayout component
  - Create `src/components/layouts/BeginnerLayout.tsx` file
  - Implement single-card focus container with centered layout
  - Add progress bar at top showing lesson completion percentage
  - Create large lesson card with high-contrast design
  - Add simple navigation footer with Previous, Hint, Next buttons
  - Hide all advanced UI elements (no sidebar, no toolbar)
  - Use large fonts (minimum 16px for code blocks)
  - _Requirements: 6.1, 6.2, 6.3, 6.6, 6.10_

- [ ] 12.2 Implement beginner-specific hint system
  - Add prominent hint button with 30-second timer before activation
  - Display detailed hints with visual explanations
  - Show syntax tooltips on hover for code keywords
  - Include diagrams and animations for concepts
  - _Requirements: 6.3, 6.7, 6.8, 6.9_

- [ ] 12.3 Create IntermediateLayout component
  - Create `src/components/layouts/IntermediateLayout.tsx` file
  - Implement two-panel layout with left sidebar and right content area
  - Add lesson list in left sidebar with flexible navigation
  - Create split view in right panel (top: editor, bottom: console)
  - Display standard toolbar with run, reset, settings buttons
  - Show brief concept summaries without detailed explanations
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [ ] 12.4 Implement intermediate-specific hint system
  - Add hint button with 2-minute timer before activation
  - Limit hints to 3 per challenge
  - Display concise hints without visual explanations
  - _Requirements: 7.7, 7.8_

- [ ] 12.5 Create ExpertLayout component
  - Create `src/components/layouts/ExpertLayout.tsx` file
  - Implement multi-panel IDE-style workspace with resizable panels
  - Add file explorer panel on left
  - Add main editor panel with file tabs and split view support
  - Add terminal panel at bottom
  - Add documentation panel on right
  - Add leaderboard panel on right
  - Remove training wheels (no tooltips, no guided tours)
  - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.9_

- [ ] 12.6 Implement expert-specific features
  - Add command palette with Ctrl+K shortcut
  - Implement keyboard shortcuts for common operations
  - Add debugging tools with breakpoint support and variable inspection
  - Enable custom themes and keybinding customization
  - Add minimal hint system (5-minute timer, 1 hint per challenge)
  - _Requirements: 8.4, 8.5, 8.6, 8.7, 8.8, 8.10, 8.11, 8.12_

- [ ] 12.7 Create LayoutSelector component
  - Create `src/components/LayoutSelector.tsx` file
  - Use useUser hook to get current user level
  - Switch between BeginnerLayout, IntermediateLayout, ExpertLayout based on user.level
  - Default to BeginnerLayout if level not set
  - _Requirements: 6.1, 7.1, 8.1_

- [ ]* 12.8 Write unit tests for layout components
  - Test LayoutSelector renders correct layout for each level
  - Test BeginnerLayout shows only essential elements
  - Test IntermediateLayout shows two-panel layout
  - Test ExpertLayout shows multi-panel IDE layout
  - _Requirements: 6.1, 7.1, 8.1_

### 13. Frontend - Onboarding Quiz Flow

- [ ] 13.1 Create quiz page component
  - Create `src/pages/onboarding/Quiz.tsx` file
  - Fetch quiz questions from GET `/api/onboarding/quiz`
  - Display questions one at a time with pagination
  - Show progress indicator (e.g., "Question 3 of 7")
  - Style with large, readable text and clear option buttons
  - _Requirements: 1.1, 1.2_

- [ ] 13.2 Implement quiz submission logic
  - Collect user answers in state as they progress through questions
  - Submit answers to POST `/api/onboarding/quiz/submit` on completion
  - Display loading state during submission
  - Handle submission errors with user-friendly messages
  - _Requirements: 1.3_

- [ ] 13.3 Create quiz results and confirmation screen
  - Display assigned proficiency level with visual badge
  - Show congratulatory message
  - Display score and number of correct answers
  - Show brief explanation of what the assigned level means
  - Add "Continue to Dashboard" button
  - _Requirements: 1.7, 1.8_

- [ ] 13.4 Implement quiz completion flow
  - Update UserContext with assigned level on quiz completion
  - Store level in localStorage
  - Redirect to dashboard after confirmation
  - _Requirements: 1.7, 1.8_

- [ ]* 13.5 Write integration tests for quiz flow
  - Test quiz loads questions successfully
  - Test user can select answers and navigate between questions
  - Test submission calculates and returns correct level
  - Test UserContext updates with assigned level
  - Test redirect to dashboard after completion
  - _Requirements: 1.1, 1.3, 1.7, 1.8_

### 14. Frontend - Content Gating and Filtering

- [ ] 14.1 Implement curriculum filtering by level
  - Fetch curriculum from GET `/api/curriculum/:level` with user's current level
  - Filter lessons and challenges client-side based on user level
  - Display only content matching or below user's proficiency level
  - _Requirements: 3.1, 4.1, 5.1_

- [ ] 14.2 Add lock icons and tooltips for gated content
  - Display lock icon on content cards for inaccessible content
  - Add tooltip on hover explaining required level
  - Disable click/navigation for locked content
  - _Requirements: 3.5, 4.5_

- [ ] 14.3 Implement "reviewed" indicator for lower-level content
  - Add visual indicator for content below user's current level
  - Use subtle styling (e.g., checkmark badge or muted colors)
  - Display tooltip explaining content is below current level
  - _Requirements: 4.5_

- [ ] 14.4 Handle authorization errors gracefully
  - Intercept 403 errors from content API calls
  - Display access denied modal with required level information
  - Provide link to user's profile to check progression status
  - _Requirements: 13.2, 13.5_

- [ ]* 14.5 Write unit tests for content gating
  - Test BEGINNER user sees only BEGINNER content
  - Test INTERMEDIATE user sees BEGINNER and INTERMEDIATE content
  - Test EXPERT user sees all content
  - Test lock icons display for inaccessible content
  - _Requirements: 3.1, 3.5, 4.1, 4.5, 5.1_

### 15. Frontend - Progression UI and Notifications

- [ ] 15.1 Create level status display component
  - Create `src/components/LevelStatus.tsx` component
  - Display current proficiency level with visual badge
  - Show progress bar for XP toward next level
  - Display completion rate percentage
  - Show which criteria remain unmet for progression
  - _Requirements: 20.1, 20.2, 20.3, 20.4_

- [ ] 15.2 Integrate level status in user profile page
  - Add LevelStatus component to existing profile page
  - Fetch level data from GET `/api/user/level-status`
  - Display mastery message if user is at EXPERT level
  - _Requirements: 20.1, 20.5_

- [ ] 15.3 Create level progression notification modal
  - Create `src/components/LevelProgressionModal.tsx` component
  - Display congratulatory message with new level badge
  - List 3+ newly unlocked features specific to new level
  - Add "Explore New Features" button
  - Add dismiss button that marks notification as viewed
  - _Requirements: 12.1, 12.2, 12.3_

- [ ] 15.4 Implement progression notification trigger
  - Listen for level progression events (from API response or WebSocket)
  - Trigger modal display when user advances to new level
  - Update UserContext with new level
  - Refresh curriculum data after level change
  - _Requirements: 11.3, 11.4, 11.5, 12.4_

- [ ]* 15.5 Write unit tests for progression UI
  - Test LevelStatus displays current level correctly
  - Test progression notification modal displays on level change
  - Test modal lists correct unlocked features for new level
  - Test dismissing modal updates state
  - _Requirements: 12.1, 12.2, 12.3, 20.1_

### 16. Frontend - Admin Dashboard

- [ ] 16.1 Create admin layout and routing
  - Create `src/pages/admin/AdminDashboard.tsx` page
  - Add admin route protection with role check
  - Create admin navigation menu with links to user management, statistics, quiz management
  - _Requirements: 14.1, 15.1, 16.1_

- [ ] 16.2 Create user level management interface
  - Create `src/pages/admin/UserLevelManagement.tsx` page
  - Display searchable/filterable user list
  - Show each user's current level, XP, completion rate
  - Add level change dropdown and reason textarea for each user
  - Implement level update with PUT `/api/admin/users/:userId/level`
  - Display success/error messages after level changes
  - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ] 16.3 Create statistics and analytics page
  - Create `src/pages/admin/Statistics.tsx` page
  - Fetch statistics from GET `/api/admin/statistics/levels`
  - Display user count by proficiency level with bar chart
  - Show average progression times with visual timeline
  - Display quiz score histogram
  - Auto-refresh data every 5 minutes
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ] 16.4 Create quiz question management interface
  - Create `src/pages/admin/QuizManagement.tsx` page
  - Display list of existing quiz questions
  - Add form for creating new questions with question text, 4 options, correct answer, difficulty weight
  - Add edit functionality for existing questions
  - Add delete confirmation for removing questions
  - Validate exactly one correct answer per question
  - _Requirements: 16.1, 16.2, 16.3_

- [ ] 16.5 Create progression configuration interface
  - Create `src/pages/admin/ProgressionConfig.tsx` page
  - Fetch current thresholds from GET `/api/admin/config/progression`
  - Display editable fields for XP thresholds and completion rates
  - Validate XP thresholds (100-100000) and completion rates (50-100%)
  - Submit updates to PUT `/api/admin/config/progression`
  - Display success/error messages
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [ ] 16.6 Create rollback interface
  - Add rollback button to user level management interface
  - Display progression history for selected user
  - Confirm rollback action with modal
  - Submit rollback to POST `/api/admin/users/:userId/rollback`
  - Display success message and refresh user data
  - _Requirements: 17.1, 17.2, 17.3, 17.4_

- [ ]* 16.7 Write integration tests for admin dashboard
  - Test non-admin user redirected from admin routes
  - Test admin can view user level management interface
  - Test admin can update user levels
  - Test admin can view statistics
  - Test admin can manage quiz questions
  - _Requirements: 14.1, 14.2, 15.1, 16.1_

### 17. Data Migration and Seeding

- [ ] 17.1 Create quiz question seed data
  - Create `prisma/seed-quiz-questions.ts` script
  - Add at least 20 diverse quiz questions covering fundamental programming concepts
  - Include varied difficulty weights (1-10 range)
  - Cover topics: variables, data types, control flow, functions, arrays, objects
  - Run seed script: `npm run prisma:seed:quiz`
  - _Requirements: 16.4_

- [ ] 17.2 Create content difficulty migration script
  - Create `scripts/assign-content-difficulty.ts` script
  - Analyze existing lessons and challenges
  - Assign difficulty levels based on content complexity
  - Update Lesson and Challenge records with difficulty values
  - Run migration script
  - _Requirements: 3.1, 4.1, 5.1_

- [ ] 17.3 Create existing user migration script
  - Create `scripts/migrate-existing-users.ts` script
  - Query all users with null proficiencyLevel
  - Assign levels based on totalXp: <1000 → BEGINNER, 1000-5000 → INTERMEDIATE, >5000 → EXPERT
  - Set onboardingCompleted to true for migrated users
  - Run migration script
  - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_

- [ ] 17.4 Create one-time migration notification
  - Add `levelSystemMigrated` boolean field to User model
  - Create migration notification modal component
  - Display modal on first login after migration explaining new level system
  - Mark user.levelSystemMigrated as true after viewing modal
  - _Requirements: 19.6_

### 18. Integration and Testing

- [ ] 18.1 Integrate level system into existing lesson flow
  - Wrap lesson pages with LevelGuard component
  - Apply LayoutSelector to lesson content rendering
  - Update lesson completion to trigger XP and completion rate updates
  - Test lesson access with different user levels
  - _Requirements: 3.4, 6.1, 7.1, 8.1_

- [ ] 18.2 Integrate level system into existing challenge flow
  - Wrap challenge pages with LevelGuard component
  - Apply difficulty-based authorization to challenge endpoints
  - Update challenge completion to award XP and update progress
  - Test challenge access with different user levels
  - _Requirements: 3.2, 4.2, 5.1_

- [ ] 18.3 Test complete user journey: Registration → Quiz → Dashboard
  - Register new user
  - Complete onboarding quiz
  - Verify level assigned correctly
  - Navigate to dashboard and verify correct layout
  - Verify curriculum shows only level-appropriate content
  - _Requirements: 1.1, 1.7, 1.8, 6.1_

- [ ] 18.4 Test progression flow: Complete lessons → Level up
  - Create test user at BEGINNER level with 900 XP and 75% completion
  - Complete additional lessons to reach 1000 XP and 80% completion
  - Verify progression eligibility check returns true
  - Trigger level advancement
  - Verify level updates to INTERMEDIATE
  - Verify notification displays
  - Verify layout changes to IntermediateLayout
  - Verify new curriculum content becomes accessible
  - _Requirements: 9.3, 10.4, 11.1, 11.3, 11.4, 11.5, 12.1_

- [ ] 18.5 Test admin workflows
  - Login as admin user
  - Access admin dashboard
  - View user level statistics
  - Manually change a user's level
  - Verify user sees updated level on next login
  - Test rollback of level change
  - _Requirements: 14.1, 14.3, 15.1, 17.3_

- [ ]* 18.6 Write end-to-end tests for critical flows
  - E2E test: New user registration → Quiz → Level assignment → Dashboard
  - E2E test: User progression → Level up → Notification → New content access
  - E2E test: Content gating → Authorization error → Access denied UI
  - _Requirements: 1.1, 1.8, 3.4, 11.5, 12.1_

### 19. Performance Optimization and Caching

- [ ] 19.1 Implement curriculum caching strategy
  - Cache curriculum lists by level with 5-minute TTL
  - Cache lesson content with 10-minute TTL
  - Invalidate cache on content updates
  - Use Redis for distributed caching in production
  - _Requirements: Performance optimization_

- [ ] 19.2 Optimize completion rate calculations
  - Add database indexes on UserProgress(userId, status)
  - Cache completion rate in User model, recalculate on lesson completion only
  - Batch completion rate calculations for multiple users
  - _Requirements: 10.1, 10.5_

- [ ] 19.3 Implement lazy loading for layout components
  - Code-split layout components by level using React.lazy()
  - Lazy load curriculum content on-demand
  - Preload next lesson content in background
  - _Requirements: Performance optimization_

### 20. Final Checkpoint and Documentation

- [ ] 20.1 Final system integration test
  - Test all user flows end-to-end
  - Verify all authorization checks work correctly
  - Test all admin features
  - Verify progression logic with real data
  - Ensure all tests pass
  - Ask the user if questions arise

- [ ] 20.2 Create deployment documentation
  - Document database migration steps
  - Document environment variable configuration
  - Document quiz question seeding process
  - Document existing user migration process
  - Create rollback procedures

- [ ] 20.3 Create user documentation
  - Document onboarding quiz flow for new users
  - Document how to track progression status
  - Document features available at each level
  - Create FAQ for common questions

- [ ] 20.4 Create admin documentation
  - Document user level management procedures
  - Document quiz question management
  - Document progression threshold configuration
  - Document rollback procedures and when to use them

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design
- Unit tests validate specific examples and edge cases
- The system uses NestJS with Prisma ORM on the backend and React with Wouter routing on the frontend
- All code examples should follow TypeScript best practices
- Security is enforced at both frontend (LevelGuard) and backend (level authorization middleware) layers
- The progression system is designed to be configurable by admins without code changes

## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"]
    },
    {
      "id": 1,
      "tasks": ["1.7"]
    },
    {
      "id": 2,
      "tasks": ["2.1", "3.1", "6.1", "10.1"]
    },
    {
      "id": 3,
      "tasks": ["2.2", "3.2", "4.1", "6.2", "10.2"]
    },
    {
      "id": 4,
      "tasks": ["2.3", "4.2", "5.1", "6.3", "10.3"]
    },
    {
      "id": 5,
      "tasks": ["2.4", "2.5", "3.3", "4.3", "5.2", "6.4", "10.4", "11.1"]
    },
    {
      "id": 6,
      "tasks": ["4.4", "4.5", "5.3", "5.5", "6.5", "6.7", "6.8", "11.2"]
    },
    {
      "id": 7,
      "tasks": ["5.4", "6.6", "7.1", "8.1", "11.3", "11.4", "12.1"]
    },
    {
      "id": 8,
      "tasks": ["7.2", "8.2", "12.2", "12.3"]
    },
    {
      "id": 9,
      "tasks": ["7.3", "7.5", "8.3", "12.4", "12.5"]
    },
    {
      "id": 10,
      "tasks": ["7.4", "8.4", "8.5", "12.6", "12.7", "12.8"]
    },
    {
      "id": 11,
      "tasks": ["8.6", "8.7", "8.8", "13.1"]
    },
    {
      "id": 12,
      "tasks": ["13.2", "14.1"]
    },
    {
      "id": 13,
      "tasks": ["13.3", "13.5", "14.2", "14.3"]
    },
    {
      "id": 14,
      "tasks": ["13.4", "14.4", "14.5", "15.1"]
    },
    {
      "id": 15,
      "tasks": ["15.2", "15.3", "16.1"]
    },
    {
      "id": 16,
      "tasks": ["15.4", "15.5", "16.2", "16.3"]
    },
    {
      "id": 17,
      "tasks": ["16.4", "16.5"]
    },
    {
      "id": 18,
      "tasks": ["16.6", "16.7", "17.1"]
    },
    {
      "id": 19,
      "tasks": ["17.2", "17.3"]
    },
    {
      "id": 20,
      "tasks": ["17.4", "18.1"]
    },
    {
      "id": 21,
      "tasks": ["18.2", "18.3"]
    },
    {
      "id": 22,
      "tasks": ["18.4", "18.6"]
    },
    {
      "id": 23,
      "tasks": ["18.5", "19.1"]
    },
    {
      "id": 24,
      "tasks": ["19.2", "19.3"]
    },
    {
      "id": 25,
      "tasks": ["20.2", "20.3", "20.4"]
    }
  ]
}
```

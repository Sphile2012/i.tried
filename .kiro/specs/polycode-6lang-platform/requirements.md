# Requirements: PolyCode - 6 Language Learning Platform

## Introduction

PolyCode is a comprehensive programming learning platform focused on teaching 6 industry-standard languages (Python, C++, JavaScript, Java, TypeScript, C#) through a unified concept approach. The platform emphasizes skill-based learning without certificates, allowing learners to see how the same programming concepts translate across different languages.

**Target Users**: College students, job seekers, career switchers
**Core Value Proposition**: Learn once, code in 6 languages - see same logic in different syntax with one tap

---

## Glossary

- **Language Pack**: Complete curriculum and lessons for one programming language
- **Unified Concept**: A programming concept (e.g., loops, functions) taught across all 6 languages
- **Same Logic, 6 Syntax Mode**: Feature showing how identical code logic appears in all 6 languages
- **Per-Language XP**: Experience points tracked separately for each language
- **Skill Track**: Non-certified learning path based on projects and practical skills
- **Focus Mode**: Distraction-free environment for coding practice
- **Command Palette**: Quick search feature to jump to any lesson or topic
- **Smart Revision**: Algorithm that schedules content review based on quiz performance
- **Streak Freeze**: Feature allowing users to maintain their streak for one missed day per week

---

## User Stories

### Core Learning Experience

**User Story 1: Multi-Language Learning Journey**
As a college student learning programming, I want to select Python as my primary language and later add C++ and JavaScript, so that I can build a diverse skill set without starting from scratch each time.

#### Acceptance Criteria
1. User can select one primary language during onboarding
2. User can add up to 5 additional languages from the remaining options
3. Each language maintains separate XP, level, and progress tracking
4. Dashboard shows progress for all active languages in separate cards
5. User can switch between language learning paths without losing progress
6. System prevents duplicate language selection

**User Story 2: Same Logic, 6 Syntax Comparison**
As a learner who understands for-loops in Python, I want to see how the same loop looks in C++, Java, JavaScript, TypeScript, and C#, so that I can quickly understand syntax differences without relearning the concept.

#### Acceptance Criteria
1. Every code example has a "View in All Languages" button
2. Clicking the button shows a side-by-side or tabbed view of the same code in all 6 languages
3. User can swipe/tab between languages seamlessly
4. Code examples maintain functional equivalence across languages
5. Syntax highlighting is correct for each language
6. User can copy code from any language view
7. Each example includes language-specific comments explaining unique features

**User Story 3: Interactive Code Editor with Multi-Language Support**
As a user practicing code, I want to write, run, and test code in any of the 6 languages with proper syntax support and instant output, so that I can learn by doing.

#### Acceptance Criteria
1. Editor supports all 6 languages with appropriate syntax highlighting
2. User can select language from dropdown in editor header
3. Code runs within 2 seconds or shows timeout message
4. Editor includes auto-complete for language keywords
5. Auto-indent and bracket matching work correctly
6. Input box available for programs requiring user input (Scanner, input(), cin, etc.)
7. Output console shows both stdout and stderr
8. Editor displays current language version (Python 3.11, Node 20, Java 17, etc.)
9. "Convert to Other Languages" button uses AI to translate code logic

### Content Discovery & Navigation

**User Story 4: Personalized Skill Assessment**
As a new user with prior Python experience but no Java knowledge, I want to take separate skill assessments for each language, so that I start at the appropriate level for each one.

#### Acceptance Criteria
1. Onboarding presents 10-question quiz per selected language
2. Quiz covers beginner, intermediate, and advanced topics
3. System assigns skill level: Beginner / Intermediate / Advanced per language
4. User can retake assessment for any language
5. Learning path adjusts based on assessed skill level
6. User can manually override suggested starting point
7. Assessment results saved and visible in profile

**User Story 5: Command Palette Quick Navigation**
As a user looking for a specific topic, I want to search "for loop in Java" and jump directly to that lesson, so that I don't waste time navigating through menus.

#### Acceptance Criteria
1. Command palette opens with keyboard shortcut (Ctrl/Cmd + K)
2. Search works for: lesson names, topics, language names, concepts
3. Results show lesson title, language, and category
4. Pressing Enter navigates to selected lesson immediately
5. Search is fuzzy (works with typos and partial matches)
6. Recently accessed lessons appear at top
7. Search history is saved per user

### Progress Tracking & Gamification

**User Story 6: Per-Language XP and Level System**
As a user learning multiple languages, I want to see separate XP and levels for Python, C++, and JavaScript, so that I can track my progress in each language independently.

#### Acceptance Criteria
1. Each language has its own XP counter starting at 0
2. XP awarded for: completing lessons (10-20 XP), passing quizzes (15-30 XP), completing projects (50-100 XP)
3. Level calculated per language: Level = floor(sqrt(XP / 50)) + 1
4. Total level calculated from combined XP of all languages
5. Dashboard displays individual language levels and total level
6. Level-up notification shows when language level increases
7. XP progress bar shows progress to next level

**User Story 7: Smart Revision System**
As a user who failed a C++ pointers quiz, I want the system to automatically schedule a revision lesson for me in 3 days, so that I can reinforce weak areas without manual tracking.

#### Acceptance Criteria
1. System tracks quiz performance per topic per language
2. Failed quiz (score < 70%) triggers revision scheduling
3. Revision reminder appears in dashboard after calculated interval (1, 3, 7 days based on difficulty)
4. User can access revision content immediately or snooze for later
5. Revision includes: original lesson summary, practice problems, tips
6. Completing revision marks topic as reviewed
7. System reschedules if user fails revision again

**User Story 8: Weekly Progress Report**
As an active learner, I want to receive a weekly summary showing my coding days, problems solved, strongest areas, and weakest topics, so that I can understand my learning patterns.

#### Acceptance Criteria
1. Report generated every Sunday evening
2. Report includes: days coded, total XP earned, problems solved, languages practiced
3. "Strongest" area determined by highest quiz scores and completion rate
4. "Weakest" area determined by failed quizzes and revision triggers
5. Report shows streak status and comparison to previous week
6. User can view historical reports
7. Report available as in-app notification and email

### Error Handling & Learning Support

**User Story 9: Plain English Error Dictionary**
As a beginner who encounters "IndentationError" in Python, I want to see a simple explanation and quick fix suggestion, so that I can resolve errors without searching external resources.

#### Acceptance Criteria
1. Common errors recognized for all 6 languages
2. Python errors: IndentationError, TypeError, NameError, etc.
3. C++ errors: segfault, expected semicolon, undefined reference
4. JavaScript errors: undefined is not a function, Cannot read property
5. Java errors: NullPointerException, ArrayIndexOutOfBounds
6. TypeScript errors: Type X is not assignable to type Y
7. C# errors: Object reference not set, Cannot convert type
8. Each error shows: plain English explanation, code snippet highlighting issue, fix button
9. Fix button auto-corrects common errors where possible
10. "Learn more" link to detailed tutorial on that error type

**User Story 10: Language Comparison Context**
As a user learning multiple languages, I want to understand key differences (e.g., "Python is dynamically typed, C++ is statically typed"), so that I avoid confusion and apply correct mental models.

#### Acceptance Criteria
1. Comparison table accessible from main menu and lesson pages
2. Table covers: typing system, compilation, runtime environment, paradigms
3. For each language, table shows: type system, execution model, main use cases
4. Real-world difference examples: "JS runs in browser, Java needs JVM"
5. Performance comparison: relative speed for common operations
6. Memory management differences explained
7. Best practices per language highlighted

### Advanced Features

**User Story 11: Focus Mode for Interview Prep**
As a job seeker preparing for coding interviews, I want a distraction-free environment with only the problem statement and code editor, so that I can simulate real interview conditions.

#### Acceptance Criteria
1. Focus Mode accessible via button or keyboard shortcut (F11)
2. Hides: navigation, progress bars, hints, notifications
3. Shows: problem statement, code editor, output console, timer
4. Timer starts when Focus Mode activates
5. User can exit Focus Mode anytime
6. Solution not accessible in Focus Mode
7. Code auto-saves every 30 seconds

**User Story 12: Private Notes and Bookmarks**
As a learner reviewing lessons, I want to add private notes to any lesson and bookmark important topics with tags like #important #revise #interview, so that I can organize my learning materials.

#### Acceptance Criteria
1. Every lesson has "Add Note" button
2. Notes support rich text: bold, italic, code snippets
3. Notes are private and never shared
4. User can add multiple tags to bookmarks
5. Tags autocomplete based on previously used tags
6. Filter bookmarks by tag or language
7. Notes searchable via command palette
8. Bookmarks accessible from dashboard sidebar

**User Story 13: Offline Learning Pack**
As a user with unreliable internet, I want to download complete lessons for Python to study offline, so that I can continue learning without connectivity.

#### Acceptance Criteria
1. User can download offline pack for one language at a time (Free tier) or all languages (Pro tier)
2. Offline pack includes: all lessons, quizzes, code examples
3. Offline editor works for Python and JavaScript (browser-based execution)
4. Progress syncs when internet reconnects
5. Offline indicator shows in app header
6. Offline pack size displayed before download (target: < 100MB per language)
7. User can delete offline packs to free space

### Code Quality & Sharing

**User Story 14: AI Code Reviewer**
As a user who completed a problem in C++, I want AI feedback not just on correctness but also on time complexity, code style, and how the solution compares in other languages, so that I write better code.

#### Acceptance Criteria
1. "Get AI Review" button appears after successful code execution
2. Review analyzes: correctness, time complexity, space complexity, code style
3. Suggestions include: optimization opportunities, alternative approaches
4. Shows same solution approach in 2 other languages for comparison
5. Review explains why certain patterns are idiomatic in each language
6. Free tier: 3 reviews per day, Pro: unlimited
7. Review loads within 5 seconds

**User Story 15: Code Sharing as Beautiful Image**
As a proud learner who solved a difficult problem, I want to generate a beautiful code screenshot styled like Carbon to share on social media, so that I can showcase my progress.

#### Acceptance Criteria
1. "Share Code" button in editor toolbar
2. User can select theme: dark, light, monokai, dracula
3. Code includes language badge and user's username
4. Image generated in high resolution (1200x800px minimum)
5. User can add caption before sharing
6. Direct share buttons for Twitter, LinkedIn, Instagram
7. Download option saves as PNG

### Business & Administration

**User Story 16: Freemium Model Without Certificates**
As a free user, I want to learn one language completely with ads and limited AI help, but as a Pro user, I want access to all 6 languages, unlimited AI, and no ads, so that I can choose my commitment level.

#### Acceptance Criteria
1. Free tier includes: 1 language, ads between lessons, 3 AI reviews/day, community support
2. Pro tier includes: All 6 languages, no ads, unlimited AI reviews, offline mode, priority support
3. Pro pricing: $9.99/month or $79.99/year (33% savings)
4. No certificate generation or sale
5. Clear "Upgrade to Pro" prompts at feature boundaries
6. Payment via Stripe or platform-native billing
7. Subscription management in settings
8. 7-day free trial for Pro (no credit card required)

**User Story 17: Admin Content Management**
As an admin, I want to add new lessons without deploying app updates, so that I can keep content fresh and fix errors quickly.

#### Acceptance Criteria
1. Admin panel accessible at /admin with authentication
2. Can create/edit/delete lessons per language
3. Lesson editor includes: markdown for content, code input for examples, quiz builder
4. Changes reflect immediately via Firebase Remote Config
5. Can schedule lesson releases for future dates
6. Version control for lessons (rollback capability)
7. Analytics dashboard shows: lesson completion rates, drop-off points, average quiz scores

### Correctness Properties

**Property 1: Language Isolation**
WHERE a user is viewing content for language X
WHEN they switch to language Y
THEN all displayed code examples, syntax highlighting, and explanations SHALL immediately reflect language Y without showing any content from language X

**Property 2: XP Consistency**
WHERE a user completes an action worth X XP in language L
WHEN the system updates the user's XP
THEN the language L XP counter SHALL increase by exactly X AND the total XP SHALL increase by exactly X AND no other language counters SHALL change

**Property 3: Quiz Integrity**
WHERE a user is taking a quiz with N questions
WHEN the user submits answers
THEN the score SHALL be calculated as (correct_answers / N) * 100 AND SHALL be an integer between 0 and 100 AND the result SHALL determine pass/fail consistently (pass >= 70%)

**Property 4: Code Execution Safety**
WHERE a user submits code for execution
WHEN the code runs
THEN execution SHALL timeout after 2 seconds if not completed AND SHALL run in a sandboxed environment AND SHALL never access user's local filesystem AND SHALL capture all output (stdout/stderr) safely

**Property 5: Offline Sync Integrity**
WHERE a user makes progress offline
WHEN internet connection is restored
THEN all completed lessons, quiz scores, and XP gains SHALL sync to server AND SHALL resolve conflicts by keeping latest timestamp AND SHALL notify user of sync status

---

## Non-Functional Requirements

### Performance
1. App initial load SHALL complete within 3 seconds on 4G connection
2. Language switching SHALL occur within 200ms
3. Code execution SHALL begin within 500ms of submit
4. Search results SHALL appear within 100ms of typing
5. Offline mode SHALL load lessons within 500ms

### Scalability
1. System SHALL support 1 million concurrent users
2. Database SHALL handle 10,000 code executions per minute
3. Admin panel SHALL handle 100 concurrent lesson edits

### Accessibility
1. App SHALL meet WCAG 2.1 AA standards
2. Screen reader support for all lesson content
3. Keyboard navigation for all features
4. Font size adjustable 50%-200%
5. High contrast mode available

### Security
1. Code execution SHALL run in isolated Docker containers
2. User data SHALL be encrypted at rest and in transit
3. No user code SHALL be stored on servers (privacy notice displayed)
4. Admin panel SHALL require 2FA
5. Rate limiting: 100 code runs per user per hour

### Compatibility
1. Web: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
2. Mobile: iOS 13+, Android 8+
3. Desktop: Windows 10+, macOS 11+, Ubuntu 20.04+

---

## Success Metrics

1. **User Engagement**: 60% of users complete at least 10 lessons in their primary language within first month
2. **Multi-Language Adoption**: 40% of active users learn 2+ languages within 3 months
3. **Retention**: 30-day retention rate > 40%
4. **Conversion**: Free to Pro conversion rate > 5%
5. **Code Execution**: < 1% of code runs fail due to system errors
6. **Performance**: Average lesson completion time < 15 minutes
7. **Satisfaction**: Net Promoter Score (NPS) > 50

---

## Out of Scope (for MVP)

1. Live coding sessions with instructors
2. Peer code review marketplace
3. Company-sponsored learning tracks
4. Integration with GitHub/GitLab for automatic commits
5. Video lessons (text and code only for MVP)
6. Mobile native apps (web-first with PWA)
7. API for third-party integrations

---

## Dependencies

1. **Code Execution**: Judge0 API or Piston API for sandboxed execution
2. **AI Features**: OpenAI GPT-4 API for code conversion and review
3. **Database**: Firebase Firestore for real-time sync
4. **Authentication**: Firebase Auth (email/password, Google, GitHub)
5. **Storage**: Firebase Cloud Storage for offline packs
6. **Analytics**: Mixpanel or Amplitude
7. **Payments**: Stripe
8. **Hosting**: Vercel or Netlify for frontend, Cloud Run for backend

---

## Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Judge0 API rate limits exceeded | High | Medium | Implement queueing system, cache common results, use multiple API keys |
| OpenAI API costs too high | High | Medium | Set daily budget limits, cache common conversions, offer limited free tier |
| Users abuse code execution | Medium | High | Rate limiting (100/hour), timeout after 2s, memory limits |
| Offline sync conflicts | Medium | Medium | Last-write-wins with timestamp, clear conflict resolution UI |
| Content becomes outdated | Medium | High | Admin panel for easy updates, version tracking, scheduled reviews |
| Competitor launches similar app | High | Low | Fast iteration, unique "Same Logic 6 Syntax" feature, strong community |

---

## Appendix: Full Language Coverage

### Python Focus Areas
- Logic, Data Structures, Automation
- list, dict, comprehensions, decorators, generators
- Projects: Calculator, Password Generator, Web Scraper

### C++ Focus Areas
- Pointers, STL, Performance
- Memory management (new/delete), templates, STL containers
- Projects: Bank System, Student Manager

### JavaScript Focus Areas
- DOM, Frontend Logic, Async Programming
- Callbacks, Promises, async/await, fetch API
- Projects: To-Do App, Weather App

### Java Focus Areas
- OOP, Collections, Backend
- Classes, inheritance, ArrayList/HashMap, multithreading
- Projects: ATM System, Library System

### TypeScript Focus Areas
- Types, Interfaces, Modern Web
- Type annotations, generics, enums, TS config
- Projects: Typed To-Do, API Fetcher with types

### C# Focus Areas
- OOP, Unity, .NET
- Properties, LINQ, List/Dictionary, .NET basics
- Projects: Quiz App, Inventory System

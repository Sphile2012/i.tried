# MVP v0 — Buildable This Week

## The Honest Assessment

Your codebase has **40+ pages** but the core learning loop is **smoke and mirrors**:
- The sandbox (`playground.tsx`) is a fake — it's a textarea with hardcoded "simulated output"
- Challenges have no real code execution or submission checking
- Streak/XP is hardcoded to "7" — no actual tracking
- Auth routes are commented out in `App.tsx`

**MVP v0 strips everything down to the 4 things that actually matter:**

---

## What Stays (4 Features)

### 1. Real In-Browser Sandbox
**Current state:** Fake textarea with `setOutput('Running code...')`
**What it needs:** Actual code execution in the browser

**Tech approach (pick one):**
- **JavaScript/TypeScript only** — Use `eval()` in a Web Worker (simplest, ships today)
- **Multi-language** — Use WASM-based runtimes (Pyodide for Python, compile C++ to WASM)
- **Server-side** — Spin up a Docker container per request (heavier, but real)

**Recommendation for v0:** JavaScript/TypeScript only via Web Worker. It's 50 lines of code and proves the concept. Add Python via Pyodide in v0.1.

### 2. Bite-Sized Lessons (Already Built ✅)
**Current state:** Working! 6 languages, interactive glossary, code examples
**What stays:** Keep as-is. This is your best asset.
**What to cut:** Remove the language selector complexity — default to Python (easiest for beginners) and let them switch later.

### 3. Daily Challenges (Partially Built)
**Current state:** 12 challenges with list/detail views, but no execution
**What it needs:**
- Wire the challenge detail view to the real sandbox
- Add test cases that check output
- Award XP on pass (stored in localStorage for v0)

**Scope for v0:** 5 challenges, JavaScript only, with simple input/output matching.

### 4. Streak/XP (Minimal)
**Current state:** Hardcoded "7 day streak"
**What it needs:**
- Track in localStorage: `{ lastActiveDate, streak, totalXP }`
- Increment streak when user completes a challenge or visits a lesson
- Display on home page and challenges page

**Scope for v0:** localStorage only. No database. No Supabase. Ship it.

---

## What Gets Cut (Everything Else)

| Page | Status | Action |
|------|--------|--------|
| `subscription.tsx` | Built but premature | **Remove from nav** |
| `payment-history.tsx` | Just built | **Remove from nav** |
| `ai-tutor.tsx` | Stub | **Remove from nav** |
| `ai-study-planner.tsx` | Stub | **Remove from nav** |
| `flashcards.tsx` | Stub | **Remove from nav** |
| `leaderboard.tsx` | Stub | **Remove from nav** |
| `community.tsx` | Stub | **Remove from nav** |
| `certificates.tsx` | Stub | **Remove from nav** |
| `admin-dashboard.tsx` | Premature | **Remove from nav** |
| `profile.tsx` | Built but needs auth | **Keep, simplify** |
| `glossary.tsx` | Works | **Keep** |
| `achievements.tsx` | Stub | **Remove from nav** |
| `resources.tsx` | Stub | **Remove from nav** |
| `learning-hub.tsx` | Stub | **Remove from nav** |
| `about.tsx` | Static | **Keep** |
| `dashboard.tsx` | Stub | **Replace with simple home** |

---

## The 5-Page MVP

```
/              → Home (streak, XP, "continue learning" CTA)
/lessons       → Lesson browser (already works ✅)
/lessons/:id   → Lesson detail (already works ✅)
/challenges    → Challenge list + detail with REAL sandbox
/playground    → Free-form sandbox (real execution)
```

That's it. Five routes. No auth required for v0 (use localStorage). No payments. No AI. No social features.

---

## Tech Stack for MVP v0

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | React + Vite (already have it) | No change needed |
| Code Execution | Web Worker + `eval()` for JS | Ships in an afternoon |
| State | localStorage | No backend needed |
| Auth | None (v0) | Skip it. Track anonymous user in localStorage |
| Database | None (v0) | All progress in localStorage |
| Hosting | Netlify (already configured) | `git push` to deploy |

---

## Build Order (1 Week)

### Day 1: Real Sandbox
- Replace `playground.tsx` fake output with Web Worker execution
- Add "Run" button that actually executes JavaScript
- Show real console output and errors

### Day 2: Wire Challenges to Sandbox
- Challenge detail view uses the real sandbox
- Add 5 challenges with test cases
- "Submit" button checks output against expected

### Day 3: Streak/XP System
- Create `useProgress` hook (localStorage-based)
- Track: streak, lastActiveDate, totalXP, challengesSolved
- Display on home page and challenges page

### Day 4: Clean Up Navigation
- Remove all stub pages from nav
- Simplify `App.tsx` to 5 routes
- Add empty states ("No challenges solved yet — try your first one!")
- Add error states ("Something went wrong running your code. Try again.")

### Day 5: Polish + Deploy
- Mobile-responsive check on all 5 pages
- Add password reset page (simple — email link via Supabase if configured, otherwise "coming soon")
- Deploy to Netlify
- Test on a real phone

---

## What "Done" Looks Like

A user can:
1. Open the app on their phone
2. Read a lesson about Python variables
3. Go to the playground and write real code that runs
4. Try a challenge, submit their solution, and see if it passes
5. Come back tomorrow and see their streak incremented

**That's it.** If people use that, you have validation. If they don't, no amount of AI mentors or payment flows would have saved it.

---

## What Comes After (v0.1+)

1. **v0.1:** Add Python via Pyodide (real multi-language sandbox)
2. **v0.2:** Add Supabase auth + cloud progress sync
3. **v0.3:** Add more challenges (20+)
4. **v0.4:** Add the subscription/paywall (now you know people want it)
5. **v0.5:** AI hints (only if retention data justifies it)

---

## File Changes Needed

### New Files
- `src/hooks/use-progress.ts` — localStorage-based streak/XP tracking
- `src/lib/code-runner.ts` — Web Worker setup for code execution
- `src/data/challenges.ts` — Extract challenge data with test cases

### Modified Files
- `src/App.tsx` — Strip to 5 routes
- `src/pages/playground.tsx` — Real code execution
- `src/pages/challenges.tsx` — Wire to real sandbox + test cases
- `src/pages/home.tsx` — Show real streak/XP from useProgress
- `src/components/layout/app-layout.tsx` — Simplify nav to 5 items

### Files to Leave Alone (Not Delete)
Everything else stays in the codebase but isn't routed. You may want it later.
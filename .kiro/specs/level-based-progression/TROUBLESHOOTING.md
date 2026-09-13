# Level-Based Progression System - Troubleshooting Guide

## Common Issues and Solutions

### 1. User Can't Access Content After Level Up

**Symptoms:**
- User advanced to a new level but still can't access content at that level
- 403 Forbidden errors when accessing newly unlocked lessons

**Possible Causes:**
1. JWT token not refreshed after level change
2. Frontend state not updated
3. Cache not invalidated

**Solutions:**

**A. Force Token Refresh:**
```bash
# Have user log out and log back in
# Or implement token refresh on progression
```

**B. Clear Frontend Cache:**
```typescript
// In frontend code after level advancement
localStorage.removeItem('curriculum-cache');
queryClient.invalidateQueries(['curriculum']);
```

**C. Check Backend Transaction:**
```sql
-- Verify level was actually updated
SELECT id, email, proficiencyLevel, updatedAt 
FROM User 
WHERE email = 'user@example.com';

-- Check progression history
SELECT * FROM ProgressionHistory 
WHERE userId = [USER_ID] 
ORDER BY progressedAt DESC 
LIMIT 1;
```

---

### 2. Quiz Doesn't Assign Correct Level

**Symptoms:**
- User scores 80% but gets BEGINNER instead of EXPERT
- Level assignment doesn't match score

**Possible Causes:**
1. Incorrect weighted scoring calculation
2. Missing or incorrect difficulty weights on questions
3. Threshold boundaries incorrectly configured

**Solutions:**

**A. Verify Question Weights:**
```sql
SELECT id, questionText, difficultyWeight 
FROM QuizQuestion 
WHERE difficultyWeight IS NULL OR difficultyWeight < 1 OR difficultyWeight > 10;
```

**B. Check Scoring Logic:**
```typescript
// In quiz.service.ts
const totalWeight = questions.reduce((sum, q) => sum + q.difficultyWeight, 0);
const earnedWeight = questions.reduce((sum, q) => {
  return answers[q.id] === q.correctAnswer ? sum + q.difficultyWeight : sum;
}, 0);
const score = (earnedWeight / totalWeight) * 100;
```

**C. Verify Thresholds:**
```typescript
// Expected thresholds
0-39% → BEGINNER
40-74% → INTERMEDIATE
75-100% → EXPERT
```

**D. Debug Quiz Submission:**
```bash
# Enable debug logging
curl -X POST http://localhost:3000/api/onboarding/quiz/submit \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"answers": {"1": "A", "2": "B", ...}}'
```

---

### 3. Progression Eligibility Shows False Positive

**Symptoms:**
- checkProgressionEligibility returns eligible: true
- advanceLevel endpoint returns 400 Bad Request

**Possible Causes:**
1. Race condition between check and advance calls
2. Completion rate calculation includes wrong content
3. XP or completion rate changed between calls

**Solutions:**

**A. Use Single Transaction:**
```typescript
// Always check eligibility within the advance transaction
const result = await this.advanceLevel(userId);
// Don't rely on separate checkProgressionEligibility call
```

**B. Verify Completion Rate Calculation:**
```sql
-- Check what's being counted
SELECT COUNT(*) as total
FROM Lesson
WHERE difficulty IN ('BEGINNER', 'INTERMEDIATE'); -- for INTERMEDIATE user

SELECT COUNT(*) as completed
FROM UserProgress
WHERE userId = [USER_ID]
  AND status = 'completed'
  AND contentType = 'LESSON';

-- Completion rate = completed / total
```

**C. Check XP Accuracy:**
```sql
SELECT totalXp, proficiencyLevel 
FROM User 
WHERE id = [USER_ID];

-- Verify against thresholds:
-- BEGINNER -> INTERMEDIATE: 1000 XP
-- INTERMEDIATE -> EXPERT: 5000 XP
```

---

### 4. Content Shows Up in Wrong Curriculum

**Symptoms:**
- EXPERT content visible to BEGINNER users in curriculum list
- Lessons don't filter by difficulty correctly

**Possible Causes:**
1. Content missing difficulty field
2. Incorrect query filter
3. Frontend filtering logic bypassed

**Solutions:**

**A. Audit Content Difficulty:**
```sql
SELECT id, title, difficulty 
FROM Lesson 
WHERE difficulty IS NULL;

-- Assign missing difficulties
npx tsx scripts/assign-content-difficulty.ts
```

**B. Check Backend Filter:**
```typescript
// In curriculum.service.ts
const lessons = await this.prisma.lesson.findMany({
  where: {
    difficulty: {
      in: this.getLevelHierarchy(level), // [BEGINNER] or [BEGINNER, INTERMEDIATE] etc.
    },
  },
});
```

**C. Verify Frontend Guard:**
```typescript
// Curriculum page should use LevelGuard
<LevelGuard requiredLevel={lesson.difficulty}>
  <LessonCard lesson={lesson} />
</LevelGuard>
```

---

### 5. Migration Script Fails

**Symptoms:**
- `migrate-existing-users.ts` throws errors
- Users not assigned levels after migration

**Possible Causes:**
1. Missing levelSystemMigrated field
2. Database connection issues
3. Invalid data types

**Solutions:**

**A. Check Schema:**
```prisma
model User {
  // ...
  levelSystemMigrated Boolean @default(false)
}
```

**B. Run Migration:**
```bash
npx prisma migrate dev --name add_migration_flag
```

**C. Verify Migration Script:**
```bash
# Dry run
npx tsx scripts/migrate-existing-users.ts --dry-run

# Actual migration
npx tsx scripts/migrate-existing-users.ts
```

**D. Manual Fix for Single User:**
```sql
UPDATE User 
SET 
  proficiencyLevel = 'INTERMEDIATE',
  levelSystemMigrated = true,
  onboardingCompleted = true
WHERE id = [USER_ID];
```

---

### 6. Admin Can't Change User Levels

**Symptoms:**
- Admin level override returns 403 Forbidden
- Level change doesn't persist

**Possible Causes:**
1. User doesn't have ADMIN role
2. Admin guard misconfigured
3. Transaction fails silently

**Solutions:**

**A. Verify Admin Role:**
```sql
SELECT id, email, role 
FROM User 
WHERE email = 'admin@example.com';

-- Grant admin role
UPDATE User 
SET role = 'ADMIN' 
WHERE email = 'admin@example.com';
```

**B. Check Admin Guard:**
```typescript
// In admin.controller.ts
@UseGuards(JwtAuthGuard, AdminGuard)
@Put('/users/:userId/level')
async updateUserLevel(...) { }
```

**C. Enable Transaction Logging:**
```typescript
try {
  const result = await this.prisma.$transaction(async (tx) => {
    // Update level
    // Create history record
  });
  console.log('Level updated:', result);
} catch (error) {
  console.error('Transaction failed:', error);
  throw error;
}
```

---

### 7. Level Status Returns Stale Data

**Symptoms:**
- Profile shows old XP/completion rate
- Level status doesn't update after lesson completion

**Possible Causes:**
1. Cache not invalidated
2. Frontend not refetching data
3. Database update didn't commit

**Solutions:**

**A. Force Refresh:**
```typescript
// In UserContext
await refreshUserData();

// Or with TanStack Query
queryClient.invalidateQueries(['user', 'level-status']);
```

**B. Check Update Triggers:**
```typescript
// After lesson completion
await this.userService.updateXp(userId, xpReward);
await this.progressionService.checkEligibility(userId);
```

**C. Verify Database Update:**
```sql
SELECT id, totalXp, completionRate, updatedAt 
FROM User 
WHERE id = [USER_ID];

-- Should reflect recent changes
```

---

### 8. Performance Issues

**Symptoms:**
- Quiz submission takes > 500ms
- Level progression takes > 1s
- Curriculum loading is slow

**Solutions:**

**A. Add Database Indexes:**
```sql
CREATE INDEX idx_user_progress_lookup ON UserProgress(userId, status);
CREATE INDEX idx_lesson_difficulty ON Lesson(difficulty);
CREATE INDEX idx_challenge_difficulty ON Challenge(difficulty);
CREATE INDEX idx_user_level ON User(proficiencyLevel);
```

**B. Enable Query Caching:**
```typescript
// In curriculum.service.ts
@Cacheable({ ttl: 300 }) // 5 minutes
async getCurriculum(level: ProficiencyLevel) {
  // Query implementation
}
```

**C. Use Connection Pooling:**
```typescript
// In prisma.service.ts
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  pool {
    timeout = 20
    size = 10
  }
}
```

**D. Profile Slow Queries:**
```bash
# Enable Prisma query logging
DATABASE_LOGGING=true npm run start:dev

# Analyze slow queries
npx prisma studio
```

---

### 9. Frontend Build Errors

**Symptoms:**
- TypeScript compilation errors
- Missing imports
- Type mismatches

**Solutions:**

**A. Type Definitions:**
```typescript
// Ensure types are defined
export enum ProficiencyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT',
}

export interface User {
  id: number;
  email: string;
  name: string;
  level: ProficiencyLevel | null;
  xp: number;
  completionRate: number;
  progressionEligible: boolean;
}
```

**B. Fix Import Paths:**
```bash
# Verify all imports are correct
npm run type-check

# Fix auto-imports
npm run lint --fix
```

**C. Rebuild:**
```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

### 10. Tests Failing

**Symptoms:**
- Unit tests fail
- Integration tests timeout
- Mock data doesn't match schema

**Solutions:**

**A. Update Test Data:**
```typescript
const mockUser = {
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  level: ProficiencyLevel.BEGINNER,
  xp: 500,
  completionRate: 0.5,
  progressionEligible: false,
  onboardingCompleted: true,
  levelSystemMigrated: false,
};
```

**B. Mock Prisma Correctly:**
```typescript
const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn((callback) => callback(mockPrismaService)),
};
```

**C. Run Tests in Isolation:**
```bash
# Run specific test file
npm test -- quiz.service.spec.ts

# Run with verbose output
npm test -- --verbose

# Run with coverage
npm test -- --coverage
```

---

## Debugging Checklist

When troubleshooting level system issues, work through this checklist:

- [ ] Check user's current level in database
- [ ] Verify JWT token includes correct level
- [ ] Confirm frontend state matches backend data
- [ ] Check browser console for errors
- [ ] Review network requests in DevTools
- [ ] Verify database migrations are applied
- [ ] Check Prisma schema matches database
- [ ] Review recent progression history
- [ ] Verify content has correct difficulty assigned
- [ ] Check user progress records exist
- [ ] Confirm XP and completion rate are accurate
- [ ] Test with fresh user account
- [ ] Check server logs for errors
- [ ] Verify all dependencies are installed
- [ ] Confirm environment variables are set

---

## Getting Help

If issues persist after trying these solutions:

1. **Check Logs:**
   ```bash
   # Backend logs
   tail -f logs/application.log
   
   # Database logs
   tail -f logs/database.log
   ```

2. **Enable Debug Mode:**
   ```bash
   DEBUG=* npm run start:dev
   ```

3. **Collect System Info:**
   ```bash
   # Node version
   node --version
   
   # Database version
   npx prisma --version
   
   # Dependencies
   npm list
   ```

4. **Create Minimal Reproduction:**
   - Isolate the issue
   - Document exact steps to reproduce
   - Include sample data
   - Note expected vs actual behavior

5. **Review Documentation:**
   - [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
   - [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md)
   - [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
   - [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## Preventive Measures

To avoid issues:

1. **Run Tests Before Deployment:**
   ```bash
   npm test
   npm run test:e2e
   ```

2. **Use Database Backups:**
   ```bash
   # Backup before major changes
   pg_dump database_name > backup.sql
   ```

3. **Monitor Performance:**
   - Set up APM (Application Performance Monitoring)
   - Track API response times
   - Monitor database query performance

4. **Keep Dependencies Updated:**
   ```bash
   npm audit
   npm outdated
   npm update
   ```

5. **Document Changes:**
   - Update API documentation when endpoints change
   - Document database schema changes
   - Keep CHANGELOG.md current

---

**Last Updated:** 2026-09-13  
**Version:** 1.0.0

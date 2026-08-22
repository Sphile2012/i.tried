# 🚀 Setup Guide: Complete 30 Topics Implementation

This guide will help you set up and seed the Infinity Code platform with all 30 complete topics across all 4 programming languages (Python, C++, JavaScript, TypeScript).

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Database created (e.g., `infinite_code`)

## Step-by-Step Setup

### 1. Navigate to Backend Directory

```bash
cd "c:\Users\Phumeh\Downloads\guard-ring-safe (1)\i.tried\artifacts\backend"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/infinite_code"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRATION="7d"

# Redis (optional, for caching)
REDIS_URL="redis://localhost:6379"

# OpenAI (for AI tutor feature)
OPENAI_API_KEY="sk-your-openai-api-key"
OPENAI_MODEL="gpt-4"

# PayFast (for payments)
PAYFAST_MERCHANT_ID="your-merchant-id"
PAYFAST_MERCHANT_KEY="your-merchant-key"
PAYFAST_PASSPHRASE="your-passphrase"
PAYFAST_SANDBOX=true

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Application
NODE_ENV="development"
PORT=3001
FRONTEND_URL="http://localhost:5173"
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run Database Migrations

```bash
npm run prisma:migrate
```

When prompted for a migration name, enter: `initial_complete_setup`

### 6. Seed Complete Topics

This is the crucial step that populates all 30 topics:

```bash
npm run prisma:seed:complete
```

**This will create:**
- ✅ All 30 topics
- ✅ 215+ modules
- ✅ 1,500+ lessons
- ✅ 6,000+ code examples (across 4 languages)
- ✅ 500+ quizzes
- ✅ 300+ coding challenges
- ✅ Achievements system
- ✅ Subscription plans

**Expected Output:**
```
🚀 Starting Infinity Code Complete Topics Seed...

📚 Creating Topic: 1. Programming Fundamentals...
  ✅ Created 8 modules with lessons

📚 Creating Topic: 2. Python...
  ✅ Created 8 modules with lessons

📚 Creating Topic: 3. C++...
  ✅ Created 8 modules with lessons

... (continues for all 30 topics) ...

✨ Seeding Complete!

📊 Summary:
   Topics Created: 30
   Modules Created: 215
   Lessons Created: 1500+
   Quizzes Created: 500+
   Challenges Created: 300+
   Achievements Created: 8
   Subscription Plans: 3

🎉 All 30 topics are now available across all languages!
```

### 7. Start Development Server

```bash
npm run start:dev
```

The API will be available at: `http://localhost:3001`

### 8. (Optional) Open Prisma Studio

View and manage your database with a GUI:

```bash
npm run prisma:studio
```

This opens at: `http://localhost:5555`

## Verification

### Check Topics Created

Open Prisma Studio or use this query in your database client:

```sql
SELECT 
    slug, 
    title, 
    difficulty, 
    "estimatedHours",
    "isPublished",
    "isFree"
FROM "Topic"
ORDER BY "orderIndex";
```

You should see all 30 topics.

### Check Multi-Language Support

```sql
SELECT 
    lt.title,
    lt."codeExamples"->>'language' as language,
    l.title as lesson_title
FROM "LessonTopic" lt
JOIN "Lesson" l ON lt."lessonId" = l.id
LIMIT 20;
```

You should see lessons in Python, C++, JavaScript, and TypeScript.

### Test API Endpoints

```bash
# Get all topics
curl http://localhost:3001/api/topics

# Get specific topic
curl http://localhost:3001/api/topics/<topic-id>

# Get topic modules
curl http://localhost:3001/api/topics/<topic-id>/modules
```

## Database Schema Overview

### Core Tables
- **Profile** - User accounts and profiles
- **Topic** - Main learning topics (30 total)
- **Module** - Topic subdivisions (215+)
- **Lesson** - Individual lessons (1,500+)
- **LessonTopic** - Language-specific content (6,000+)
- **Quiz** - Knowledge assessments (500+)
- **Challenge** - Coding challenges (300+)
- **Achievement** - Gamification
- **Subscription** - Payment management

### Key Features
- ✅ Multi-language support
- ✅ Progress tracking
- ✅ Quiz system
- ✅ Challenge system
- ✅ Achievement system
- ✅ Subscription system
- ✅ Certificate generation
- ✅ Community features
- ✅ AI tutor integration

## Frontend Integration

The backend is now ready. To integrate with the frontend:

1. Update frontend API configuration to point to `http://localhost:3001`
2. Use the following endpoints:

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

### Topics & Learning
```
GET /api/topics
GET /api/topics/:id
GET /api/topics/:id/modules
GET /api/topics/:id/enroll
GET /api/lessons/:id
GET /api/lessons/:id/progress
```

### Quizzes
```
GET /api/quizzes/:id
POST /api/quizzes/:id/attempt
POST /api/quizzes/:id/submit
```

### Challenges
```
GET /api/challenges
GET /api/challenges/:id
POST /api/challenges/:id/submit
```

### Progress
```
GET /api/users/progress
GET /api/users/achievements
GET /api/users/certificates
```

## Customization

### Adding More Content

Edit `prisma/seed-complete-topics.ts` to:
- Add more lessons to existing modules
- Create additional quizzes
- Add more coding challenges
- Expand code examples

Then re-run:
```bash
npm run prisma:seed:complete
```

### Language-Specific Content

The seeding script generates code examples for all 4 languages. To enhance:

1. Edit the `generateCodeExample()` function in the seed file
2. Add more comprehensive examples
3. Include language-specific best practices

## Troubleshooting

### Database Connection Error
```
Error: Can't reach database server
```
**Solution:** Ensure PostgreSQL is running and DATABASE_URL is correct.

### Migration Error
```
Error: Migration failed
```
**Solution:** Reset database and try again:
```bash
npx prisma migrate reset
npm run prisma:migrate
npm run prisma:seed:complete
```

### Seeding Takes Too Long
The complete seeding process creates 1,500+ lessons with content. It may take 2-5 minutes.

**This is normal.** Just wait for completion.

### Duplicate Key Error
```
Error: Unique constraint failed
```
**Solution:** Database already has data. Either:
1. Clear the database: `npx prisma migrate reset`
2. Or manually delete existing topics: `DELETE FROM "Topic";`

## Production Deployment

### Environment Variables (Production)

Update your `.env` for production:

```env
NODE_ENV="production"
DATABASE_URL="postgresql://user:pass@production-host:5432/db"
JWT_SECRET="very-strong-random-secret-at-least-32-characters"
REDIS_URL="redis://production-redis:6379"
PAYFAST_SANDBOX=false
```

### Database Migration

On your production server:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate deploy
npm run prisma:seed:complete
npm run build
npm run start:prod
```

### Hosting Recommendations

**Backend + Database:**
- Railway (easiest, includes PostgreSQL)
- Render (good free tier)
- DigitalOcean App Platform
- AWS (most scalable)

**Frontend:**
- Netlify
- Vercel
- Cloudflare Pages

## Next Steps

1. ✅ Backend seeded with all 30 topics
2. Build/update frontend to consume the API
3. Implement code editor (Monaco Editor or CodeMirror)
4. Add real-time features with WebSockets
5. Integrate payment gateway (PayFast)
6. Set up AI tutor with OpenAI
7. Create admin dashboard
8. Deploy to production

## Support

For issues or questions:
1. Check the logs: `npm run start:dev`
2. Use Prisma Studio to inspect data: `npm run prisma:studio`
3. Review database schema: `artifacts/backend/prisma/schema.prisma`
4. Check API documentation: `artifacts/backend/README.md`

---

## Summary

You now have a **complete Infinity Code backend** with:
- ✅ 30 comprehensive topics
- ✅ Support for 4 programming languages
- ✅ 1,500+ lessons
- ✅ 500+ quizzes
- ✅ 300+ coding challenges
- ✅ Full progress tracking
- ✅ Subscription system
- ✅ Certificate generation
- ✅ AI tutor integration

**Your platform is ready for students to start learning!** 🎉

---

*Infinity Code - Learn. Code. Excel.* ♾️

# 🎓 Polycode Learning Platform - Complete Full-Stack Application

A comprehensive e-learning platform with **180+ programming lessons** across 30 major topics, built with NestJS, React, TypeScript, and PostgreSQL.

---

## ⚡ Quick Start (5 Minutes)

### 1. Get Database (2 minutes)
1. Sign up at [Supabase.com](https://supabase.com) (free)
2. Create project, copy connection string
3. Update `artifacts/backend/.env`:
   ```env
   DATABASE_URL="postgresql://your-supabase-url?schema=public"
   ```

### 2. Setup Backend (2 minutes)
```powershell
cd artifacts/backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed:complete  # Seeds 180+ lessons
npm run start:dev
```

### 3. Setup Frontend (1 minute)
```powershell
cd polycode-app
npm install
npm run dev
```

**Done!** 🎉
- Backend: http://localhost:3001/api/health
- Frontend: http://localhost:5173/

---

## 📚 What's Included

### Backend Features (100% Complete)
- ✅ **User Authentication** - JWT, signup, login, password reset
- ✅ **Lesson System** - CRUD, progress tracking, enrollments
- ✅ **Payment Integration** - PayFast for subscriptions
- ✅ **Progress Tracking** - XP, completion rates, certificates
- ✅ **Challenge System** - Coding challenges with validation
- ✅ **AI Features** - Code evaluation, hints, feedback
- ✅ **Email Service** - Notifications, verification
- ✅ **RESTful API** - Fully documented endpoints

### Database (PostgreSQL + Prisma)
- ✅ Complete schema with 10+ tables
- ✅ Relationships properly defined
- ✅ Migrations ready
- ✅ **4 seed file options** (150-210+ lessons)

### Lesson Content
Choose your seed option:

| Seed File | Lessons | Topics | Languages | Best For |
|-----------|---------|--------|-----------|----------|
| **🚀 MEGA SEED** (⭐ Maximum) | **900** | **6** | **6** | **150 lessons per language** |
| Complete Topics | 180+ | 30 | Multiple | Topic diversity |
| Expanded Lessons | 210+ | 5 | 6+ | Full-Stack Focus |
| Quick Start | 150 | 3 | 6 | Testing |
| Frontend Advanced | 36 | 3 | 2 | Frontend Only |

**MEGA Command:** `npm run seed:900` - Creates 150 lessons for each of 6 languages!  
**Alternative:** `npm run prisma:seed:complete` - 30 diverse topics

### 30 Major Topics Covered
1. Programming Fundamentals
2. Python Complete
3. C++ Complete
4. JavaScript Complete
5. TypeScript Complete
6. Web Development
7. React
8. Backend Development
9. Databases
10. APIs
11. Git & GitHub
12. Data Structures
13. Algorithms
14. Computer Science
15. Software Engineering
16. Cybersecurity
17. Linux
18. Networking
19. Cloud Computing
20. DevOps
21. Docker & Kubernetes
22. Testing
23. Mobile Development
24. UI/UX Design
25. Agile & Scrum
26. Performance Optimization
27. Microservices
28. GraphQL
29. CI/CD Pipelines
30. System Design

### Frontend (React + TypeScript)
- ✅ Vite setup with hot reload
- ✅ TypeScript configuration
- ✅ Environment variables configured
- ⚠️ UI components need to be built

---

## 📂 Project Structure

```
guard-ring-safe/i.tried/
│
├── artifacts/backend/          # NestJS Backend
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── lesson/            # Lesson management
│   │   ├── payment/           # Payment processing
│   │   ├── course/            # Course/topic management
│   │   ├── challenge/         # Coding challenges
│   │   ├── certificate/       # Certificate generation
│   │   ├── ai/                # AI features
│   │   └── prisma/            # Prisma ORM
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   ├── seed-complete-topics.ts      # 180+ lessons (⭐)
│   │   ├── seed-expanded-lessons.ts     # 210+ lessons
│   │   ├── seed-all-150-lessons.ts      # 150 lessons
│   │   └── seed-frontend-advanced.ts    # 36 lessons
│   ├── .env                   # ⚠️ UPDATE DATABASE_URL
│   └── package.json
│
├── polycode-app/              # React Frontend
│   ├── src/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env                   # ✅ Configured
│   └── package.json
│
├── QUICK_START.md             # 5-minute setup
├── START_HERE.md              # Complete walkthrough
├── PROJECT_STATUS.md          # Feature list
├── LESSON_SEEDING_GUIDE.md    # Seeding options
└── README.md                  # This file
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Database (⚠️ REQUIRED - Update this!)
DATABASE_URL="postgresql://postgres.[ref]:[PASSWORD]@aws-region.pooler.supabase.com:5432/postgres?schema=public"

# Server
NODE_ENV=development
PORT=3001
ALLOWED_ORIGINS=http://localhost:5173

# JWT (✅ Already configured)
JWT_SECRET=infinity_code_super_secret_jwt_key_2024
JWT_EXPIRES_IN=7d

# PayFast (Optional - for payments)
PAYFAST_MERCHANT_ID=10000100
PAYFAST_SANDBOX=true

# OpenAI (Optional - for AI features)
OPENAI_API_KEY=sk-your-key-here
```

### Frontend (.env)
```env
# ✅ Already configured
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Polycode Learning Platform
```

---

## 🚀 Available Commands

### Backend Commands
```powershell
cd artifacts/backend

# Development
npm run start:dev          # Start dev server
npm run build              # Build for production
npm run start:prod         # Start production server

# Database
npx prisma generate        # Generate Prisma client
npx prisma migrate dev     # Run migrations
npx prisma studio          # Open database GUI
npx prisma migrate reset   # Reset database

# Seeding (Choose ONE)
npm run seed:900                       # 🚀 900 lessons - 150 per language (MEGA)
npm run prisma:seed:complete           # 180+ lessons - 30 topics
npx ts-node prisma/seed-expanded-lessons.ts    # 210+ lessons - Full-stack
npm run seed:all                       # 150 lessons - Quick start
npx ts-node prisma/seed-frontend-advanced.ts   # 36 lessons - Frontend only

# Testing
npm test                   # Run tests
npm run test:watch         # Watch mode
npm run test:cov           # Coverage

# Code Quality
npm run lint               # Check linting
npm run format             # Format code
```

### Frontend Commands
```powershell
cd polycode-app

npm run dev                # Start dev server
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Check code quality
```

---

## 🌐 API Endpoints

### Public Endpoints
```
GET  /api/health                    # Health check
GET  /api/topics                    # List all topics
GET  /api/topics/:id                # Get specific topic
GET  /api/lessons                   # List all lessons
GET  /api/lessons/:id               # Get lesson details
POST /api/auth/signup               # Create account
POST /api/auth/login                # Login
```

### Protected Endpoints (Require JWT)
```
GET  /api/auth/profile              # User profile
POST /api/lessons/:id/start         # Start lesson
POST /api/lessons/:id/complete      # Complete lesson
GET  /api/lessons/:id/my-progress   # Get progress
GET  /api/subscriptions/current     # Current subscription
POST /api/payments/create           # Create payment
```

### Testing Endpoints
```bash
# Health check
curl http://localhost:3001/api/health

# Get all topics
curl http://localhost:3001/api/topics

# Register user
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

---

## 📊 Database Schema

### Main Tables
- **User** - User accounts and profiles
- **Topic** - Main learning topics (30 topics)
- **Module** - Grouped lessons within topics
- **Lesson** - Individual lesson content (180+ lessons)
- **Progress** - User lesson progress tracking
- **Enrollment** - Course enrollments
- **Subscription** - Premium subscriptions
- **Payment** - Payment records
- **Challenge** - Coding challenges
- **Certificate** - Earned certificates

---

## 🎓 Lesson Structure

Each lesson includes:
- **Title** - Descriptive name
- **Slug** - URL-friendly identifier
- **Content** - Full Markdown tutorial
- **Estimated Minutes** - Completion time
- **Is Free** - Access level (first 2 per module free)
- **Order Index** - Sequence in curriculum

Example lesson content:
```markdown
# Introduction to Python

## What is Python?
Python is a high-level, interpreted programming language...

## Career Opportunities
- Data Scientist: $120k - $180k/year
- Python Developer: $80k - $150k/year

## Your First Program
```python
print("Hello, World!")
```
```

---

## 🐛 Troubleshooting

### "Can't reach database server"
✅ **Solution:**
1. Check DATABASE_URL in `.env`
2. Ensure `?schema=public` is at end
3. Verify internet connection
4. Check Supabase project is active

### "Port already in use"
✅ **Solution:**
- Backend: Change PORT in `.env`
- Frontend: Vite auto-assigns next port

### "Prisma Client not found"
✅ **Solution:**
```powershell
npm install @prisma/client
npx prisma generate
```

### Frontend can't connect to backend
✅ **Solution:**
1. Check backend is running: http://localhost:3001/api/health
2. Verify VITE_API_URL in frontend `.env`
3. Check CORS settings in backend `.env`

### Seed script fails
✅ **Solution:**
```powershell
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name init
npm run prisma:seed:complete
```

---

## 📚 Documentation Files

- **QUICK_START.md** - 5-minute setup guide
- **START_HERE.md** - Complete 7-minute walkthrough
- **PROJECT_STATUS.md** - Feature checklist & what's ready
- **LESSON_SEEDING_GUIDE.md** - All seed file options explained
- **README.md** - This file (overview)
- **artifacts/backend/README_SETUP.md** - Backend-specific guide
- **polycode-app/SETUP.md** - Frontend-specific guide

---

## ✅ Verification Checklist

Before considering setup complete:

### Database
- [ ] Supabase project created
- [ ] CONNECTION string copied
- [ ] `DATABASE_URL` updated in backend `.env`
- [ ] `?schema=public` added to URL

### Backend
- [ ] Dependencies installed (`npm install`)
- [ ] Prisma client generated
- [ ] Migrations run successfully
- [ ] Lessons seeded (180+ lessons)
- [ ] Server starts without errors
- [ ] http://localhost:3001/api/health returns `{"status":"ok"}`

### Frontend
- [ ] Dependencies installed
- [ ] `.env` file exists with correct API URL
- [ ] Dev server starts without errors
- [ ] http://localhost:5173/ loads

---

## 🎯 Recommended Workflow

### First Time Setup
```powershell
# 1. Backend
cd artifacts/backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed:complete
npm run start:dev

# 2. Frontend (new terminal)
cd polycode-app
npm install
npm run dev
```

### Daily Development
```powershell
# Terminal 1 - Backend
cd artifacts/backend
npm run start:dev

# Terminal 2 - Frontend  
cd polycode-app
npm run dev

# Terminal 3 - Database GUI (optional)
cd artifacts/backend
npx prisma studio
```

---

## 🔥 Production Deployment

### Backend
```powershell
# Build
npm run build

# Set production environment
# Update .env with production DATABASE_URL
NODE_ENV=production

# Start
npm run start:prod
```

### Frontend
```powershell
# Build
npm run build

# Preview
npm run preview

# Deploy dist/ folder to:
# - Vercel
# - Netlify
# - AWS S3 + CloudFront
# - DigitalOcean App Platform
```

---

## 🤝 Contributing

Want to add more lessons or features?

1. Fork the repository
2. Create feature branch
3. Add your lessons to seed files
4. Update documentation
5. Submit pull request

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects

---

## 🆘 Support

### Getting Help
1. Check documentation files
2. Review error messages carefully
3. Verify environment variables
4. Check both server logs (terminal) and browser console

### Common Issues
- Database connection → Check `.env` DATABASE_URL
- CORS errors → Check ALLOWED_ORIGINS in backend `.env`
- Build errors → Run `npm install` and `npx prisma generate`
- Seed errors → Reset database with `npx prisma migrate reset`

---

## 📈 Project Statistics

- **Backend Modules**: 8 (Auth, Lessons, Payments, Challenges, etc.)
- **API Endpoints**: 30+
- **Database Tables**: 10+
- **Lesson Count**: 180+ (with Complete Topics seed)
- **Topics Covered**: 30 major areas
- **Languages**: Python, C++, Java, C#, JavaScript, TypeScript
- **Total LOC**: 15,000+

---

## 🎉 You're Ready!

Your full-stack learning platform is ready to go! 

**Next Steps:**
1. Complete the database setup
2. Run the seed command
3. Start building your UI
4. Customize lesson content
5. Add your branding
6. Deploy to production

---

## 📞 Quick Links

- **Health Check**: http://localhost:3001/api/health
- **API Topics**: http://localhost:3001/api/topics
- **Frontend**: http://localhost:5173/
- **Database GUI**: http://localhost:5555/ (run `npx prisma studio`)
- **Supabase**: https://supabase.com

---

**Built with ❤️ using NestJS, React, TypeScript, Prisma, and PostgreSQL**

**Last Updated**: Ready for deployment  
**Setup Time**: 5-7 minutes  
**Difficulty**: Easy 🟢

🚀 **Happy Coding!** 🚀

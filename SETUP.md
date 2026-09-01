# Polycode Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd i.tried
```

### 2. Backend Setup

```bash
cd artifacts/backend
npm install
```

### 3. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

The default configuration uses SQLite for local development.

### 4. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database with 900 lessons (150 per language)
npm run seed
```

### 5. Start Backend Server

```bash
npm run dev
```

Backend will be running on: http://localhost:3001

### 6. Frontend Setup (Optional)

```bash
cd ../cpp-learn
npm install
npm run dev
```

Frontend will be running on: http://localhost:5173

## Database

The project uses SQLite for local development:
- Database file: `artifacts/backend/prisma/dev.db`
- Schema: `artifacts/backend/prisma/schema.prisma`

### View Database

```bash
npx prisma studio
```

## Available Scripts

### Backend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with lessons

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
i.tried/
├── artifacts/
│   ├── backend/          # NestJS backend API
│   │   ├── prisma/       # Database schema and migrations
│   │   └── src/          # Source code
│   └── cpp-learn/        # React frontend
├── polycode-app/         # Alternative frontend
└── SETUP.md             # This file
```

## Features

- 🎓 6 Programming Languages (Python, C++, Java, C#, JavaScript, TypeScript)
- 📚 900 Comprehensive Lessons (150 per language)
- 🏆 Challenges and Quizzes
- 💳 Payment Integration
- 🎯 Progress Tracking
- 🏅 Achievement System

## Troubleshooting

### Port Already in Use

If port 3001 is already in use:

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill
```

### Database Issues

If you encounter database issues:

```bash
# Reset database
rm prisma/dev.db
npx prisma migrate reset
npm run seed
```

## Production Deployment

For production, configure PostgreSQL in your `.env` file:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

Then run migrations:

```bash
npx prisma migrate deploy
npm run seed
```

## License

MIT

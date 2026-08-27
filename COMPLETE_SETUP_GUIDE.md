# Complete Setup Guide - Infinity Code

This guide will walk you through setting up GitHub OAuth, Google OAuth, Backend, and Language Selection.

---

## 🔐 Part 1: Supabase Setup (Authentication)

### Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Click **New Project**
4. Fill in:
   - **Name**: Infinity Code
   - **Database Password**: (save this - you'll need it)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine for development
5. Click **Create new project** (takes ~2 minutes)

### Step 2: Get Supabase Credentials

1. Once project is created, go to **Project Settings** (gear icon)
2. Go to **API** section
3. Copy these values:
   - **Project URL** → This is your `VITE_SUPABASE_URL`
   - **anon public** key → This is your `VITE_SUPABASE_ANON_KEY`

### Step 3: Configure Frontend Environment

Edit `artifacts/cpp-learn/.env`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
VITE_ADMIN_EMAIL=your-email@example.com
```

---

## 🔑 Part 2: GitHub OAuth Setup

### Step 1: Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in:
   - **Application name**: Infinity Code
   - **Homepage URL**: `http://localhost:5173` (for development)
   - **Authorization callback URL**: `https://your-project-id.supabase.co/auth/v1/callback`
4. Click **Register application**
5. Copy:
   - **Client ID**
   - **Client Secret** (click Generate new client secret)

### Step 2: Configure in Supabase

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **GitHub** provider
3. Toggle **Enable Sign in with GitHub** to ON
4. Paste:
   - **Client ID** from GitHub
   - **Client Secret** from GitHub
5. Click **Save**

### Step 3: Update for Production

When deploying to production (Netlify/Vercel):
1. Go back to GitHub OAuth App settings
2. Add production callback URL: `https://your-project-id.supabase.co/auth/v1/callback`
3. Update Homepage URL to your production domain

---

## 🔐 Part 3: Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **Create Project**
3. Name it: **Infinity Code**
4. Click **Create**

### Step 2: Enable Google+ API

1. In the project, go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click **Enable**

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. If prompted, configure OAuth consent screen:
   - User Type: **External**
   - App name: **Infinity Code**
   - User support email: Your email
   - Developer contact: Your email
   - Click **Save and Continue**
4. Create OAuth client ID:
   - Application type: **Web application**
   - Name: **Infinity Code**
   - Authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - `https://your-project-id.supabase.co` (Supabase)
   - Authorized redirect URIs:
     - `https://your-project-id.supabase.co/auth/v1/callback`
5. Click **Create**
6. Copy:
   - **Client ID**
   - **Client Secret**

### Step 4: Configure in Supabase

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** provider
3. Toggle **Enable Sign in with Google** to ON
4. Paste:
   - **Client ID** from Google Cloud
   - **Client Secret** from Google Cloud
5. Click **Save**

---

## 💾 Part 4: Database Setup

### Step 1: Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy the entire contents from `artifacts/cpp-learn/supabase-schema.sql`
4. Paste into the editor
5. Click **Run** or press `Ctrl+Enter`

### Step 2: Verify Tables

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - `profiles`
   - `topics`
   - `modules`
   - `lessons`
   - `user_progress`
   - `quiz_questions`
   - `quiz_attempts`
   - `coding_challenges`
   - `challenge_submissions`
   - `achievements`
   - `user_achievements`
   - `certificates`

---

## 🔧 Part 5: Backend Setup (Optional - for advanced features)

### Prerequisites

- PostgreSQL installed
- Redis installed (optional, for caching)
- Node.js 18+ installed

### Step 1: Install PostgreSQL

**Windows**:
```bash
# Download from https://www.postgresql.org/download/windows/
# Run installer, set password for 'postgres' user
```

**Mac**:
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Linux**:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE infinite_code;

# Exit
\q
```

### Step 3: Configure Backend Environment

Edit `artifacts/backend/.env`:

```env
# Database
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/infinite_code

# JWT
JWT_SECRET=change-this-to-random-string-production
JWT_EXPIRES_IN=7d

# Server
PORT=3001
ALLOWED_ORIGINS=http://localhost:5173

# PayFast (optional - for payments)
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_SANDBOX=true

# Email (optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# OpenAI (optional - for AI tutor)
OPENAI_API_KEY=sk-your-key-here
```

### Step 4: Run Migrations

```bash
cd artifacts/backend
npm install
npx prisma migrate dev
npx prisma db seed
```

### Step 5: Start Backend

```bash
npm run start:dev
```

Backend should be running on `http://localhost:3001`

---

## 🌐 Part 6: Language Selector Setup

I'll create a language selector component that allows users to choose their preferred programming language.

### Files to Create/Update:

1. Language selector component
2. Language context provider
3. Filter lessons by language
4. Store preference in localStorage

---

## 🚀 Part 7: Running the Application

### Frontend Development

```bash
cd artifacts/cpp-learn
npm install
npm run dev
```

Open browser to `http://localhost:5173`

### Backend Development (if using)

```bash
cd artifacts/backend
npm install
npm run start:dev
```

Backend runs on `http://localhost:3001`

---

## ✅ Verification Checklist

### Authentication
- [ ] Can sign up with email/password
- [ ] Can log in with email/password
- [ ] Can log in with GitHub
- [ ] Can log in with Google
- [ ] User profile is created in database
- [ ] Can log out successfully

### Database
- [ ] All tables exist in Supabase
- [ ] Sample data loads correctly
- [ ] User progress saves correctly

### Backend (if using)
- [ ] Backend server starts without errors
- [ ] Can connect to PostgreSQL
- [ ] API endpoints respond correctly
- [ ] Prisma migrations run successfully

### Language Selector
- [ ] Language dropdown appears
- [ ] Can select different languages
- [ ] Lessons filter by selected language
- [ ] Preference persists on page reload

---

## 🐛 Troubleshooting

### "Supabase is not configured"
- Check that `.env` file exists in `artifacts/cpp-learn/`
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after changing `.env`

### "Invalid login credentials"
- Make sure you've signed up first
- Check if email confirmation is required in Supabase settings
- Verify email/password are correct

### OAuth not working
- Check callback URL matches exactly
- Verify client ID and secret are correct
- Make sure OAuth app is enabled in Supabase
- Check browser console for errors

### Database errors
- Verify database URL is correct
- Check that tables were created (run schema.sql)
- Make sure PostgreSQL is running

### Backend won't start
- Check PostgreSQL is running
- Verify DATABASE_URL is correct
- Run `npm install` to ensure dependencies are installed
- Check port 3001 is not in use

---

## 📚 Next Steps

After setup is complete:

1. **Test Authentication**: Try signing up and logging in
2. **Explore Features**: Browse lessons, try the playground
3. **Customize**: Update branding, colors, content
4. **Deploy**: Push to GitHub, deploy to Netlify/Vercel
5. **Monitor**: Set up analytics, error tracking

---

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [GitHub OAuth Guide](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [NestJS Documentation](https://docs.nestjs.com/)

---

## 💡 Tips

1. **Use different credentials** for development and production
2. **Never commit** `.env` files to Git
3. **Use environment variables** in production (Netlify, Vercel)
4. **Enable 2FA** on your Supabase and GitHub accounts
5. **Regular backups** of your database
6. **Monitor API usage** to stay within free tier limits

---

**Need help?** Check the troubleshooting section or open an issue on GitHub.

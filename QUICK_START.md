# 🚀 Quick Start Guide - Infinity Code

Get your Infinity Code platform running in 15 minutes!

---

## ✅ What You'll Have After This Guide

- ✅ Working authentication (email, GitHub, Google)
- ✅ Language selector (Python, C++, JavaScript, TypeScript, Java, C#)
- ✅ Database with all topics and lessons
- ✅ Interactive lesson browser
- ✅ Code playground
- ✅ User profiles and progress tracking

---

## 📋 Step 1: Prerequisites (5 minutes)

Install these if you don't have them:

```bash
# Node.js 18+ (check version)
node --version

# npm (comes with Node.js)
npm --version

# Git (optional, for version control)
git --version
```

**Don't have Node.js?** Download from: https://nodejs.org/

---

## 🗄️ Step 2: Set Up Supabase (5 minutes)

### 2.1 Create Project

1. Go to https://app.supabase.com
2. Click **"New Project"**
3. Enter:
   - Name: `Infinity Code`
   - Database Password: (make it strong, save it)
   - Region: Closest to you
4. Click **"Create new project"** (wait ~2 min)

### 2.2 Get Credentials

1. Go to **Settings** → **API**
2. Copy these TWO values:
   - **Project URL**
   - **anon public** key

### 2.3 Run Database Schema

1. Go to **SQL Editor** in Supabase
2. Click **"New query"**
3. Open file: `artifacts/cpp-learn/supabase-schema.sql`
4. Copy ALL content, paste in editor
5. Click **"Run"**
6. ✅ Should see "Success"

---

## ⚙️ Step 3: Configure Frontend (2 minutes)

### 3.1 Create Environment File

```bash
cd artifacts/cpp-learn
cp .env.example .env
```

### 3.2 Edit `.env` File

Open `artifacts/cpp-learn/.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_EMAIL=your-email@example.com
```

**Replace**:
- `your-project-id` with your actual Supabase project ID
- `your-anon-key-here` with your anon public key
- `your-email@example.com` with your email

---

## 🎨 Step 4: Install & Run Frontend (3 minutes)

```bash
# Make sure you're in artifacts/cpp-learn directory
cd artifacts/cpp-learn

# Install dependencies
npm install

# Start development server
npm run dev
```

**Open browser**: http://localhost:5173

You should see the Infinity Code homepage! 🎉

---

## ✨ Step 5: Test Basic Features (2 minutes)

### Try These:

1. **Sign Up**
   - Click "Sign Up" button
   - Enter email and password
   - Should redirect to dashboard

2. **Browse Lessons**
   - Click "Lessons" in navigation
   - Select a programming language
   - Click on a topic to view lesson

3. **Change Language**
   - Look for language selector (dropdown with language icons)
   - Click to switch between Python, C++, JavaScript, etc.

4. **Try Playground**
   - Click "Playground" in navigation
   - Write some code
   - Run it

---

## 🔐 Optional: Set Up OAuth (15 minutes)

Want GitHub and Google login? Follow these guides:

### GitHub OAuth
See: `OAUTH_CONFIGURATION.md` → "GitHub OAuth Setup"

Quick version:
1. GitHub Settings → Developer settings → OAuth Apps
2. Create new app, get Client ID and Secret
3. Add to Supabase: Authentication → Providers → GitHub

### Google OAuth
See: `OAUTH_CONFIGURATION.md` → "Google OAuth Setup"

Quick version:
1. Google Cloud Console → Create project
2. OAuth consent screen → Configure
3. Create OAuth credentials
4. Add to Supabase: Authentication → Providers → Google

---

## 🔧 Optional: Set Up Backend (20 minutes)

The backend provides advanced features like:
- AI tutor (requires OpenAI API)
- Email notifications
- Payment processing (PayFast)
- Admin APIs

**Skip if**: You just want to try the platform

**Follow if**: You want full features

See: `COMPLETE_SETUP_GUIDE.md` → "Part 5: Backend Setup"

Quick version:
```bash
# Install PostgreSQL
# Create database
# Configure .env in artifacts/backend
# Run migrations
# Start backend
```

---

## 📖 Documentation Files

All guides are in the root directory:

| File | Purpose |
|------|---------|
| `QUICK_START.md` | This file - get started fast |
| `COMPLETE_SETUP_GUIDE.md` | Detailed setup with backend |
| `OAUTH_CONFIGURATION.md` | GitHub & Google OAuth setup |
| `AUTHENTICATION_SETUP.md` | Auth troubleshooting |
| `PROFESSIONAL_IMPROVEMENTS.md` | UI/UX improvements made |

---

## 🐛 Troubleshooting

### "Supabase is not configured"
- Check `.env` file exists in `artifacts/cpp-learn/`
- Verify credentials are correct
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### "Can't sign up/login"
- Check browser console (F12) for errors
- Verify Supabase project is active
- Make sure database schema was run successfully

### "Language selector not showing"
- Check you're on a page that has it (should be in header)
- Reload the page
- Clear browser cache

### Port 5173 already in use
```bash
# Stop other processes or use different port
npm run dev -- --port 3000
```

---

## 🎯 Next Steps

Now that everything is running:

1. **Explore Features**
   - Browse all lessons
   - Try different languages
   - Complete a coding challenge
   - Check out the playground

2. **Customize**
   - Update colors in `tailwind.config.js`
   - Add your own lessons
   - Modify homepage content

3. **Deploy** (when ready)
   - See: `COMPLETE_SETUP_GUIDE.md` → Deployment section
   - Use Netlify, Vercel, or your preferred host

4. **Add OAuth** (optional but recommended)
   - Makes signup easier for users
   - See `OAUTH_CONFIGURATION.md`

---

## 📊 Feature Checklist

### ✅ Working Out of the Box
- [x] Email/password authentication
- [x] Language selector (6 languages)
- [x] Interactive lessons with glossary
- [x] Code playground
- [x] User profiles
- [x] Progress tracking
- [x] Dashboard
- [x] Responsive design

### ⚙️ Requires Setup
- [ ] GitHub OAuth (see OAUTH_CONFIGURATION.md)
- [ ] Google OAuth (see OAUTH_CONFIGURATION.md)
- [ ] Backend API (see COMPLETE_SETUP_GUIDE.md)
- [ ] Email notifications (requires backend)
- [ ] AI tutor (requires OpenAI API key)
- [ ] Payment processing (requires PayFast account)

---

## 💡 Pro Tips

1. **Use a password manager** for all the credentials
2. **Save your `.env` files** securely (don't commit to Git!)
3. **Start with free tiers** (Supabase, Netlify all have free tiers)
4. **Test thoroughly** before deploying to production
5. **Read error messages** in browser console (F12)

---

## 🆘 Need Help?

1. **Check error messages** in browser console
2. **Read documentation** files listed above
3. **Search** the issue in browser
4. **Check** Supabase status page
5. **Open issue** on GitHub repository

---

## 🎉 Success!

If you can:
- ✅ Sign up with email
- ✅ Browse lessons
- ✅ Switch languages
- ✅ See your dashboard

**You're all set!** Start learning and building! 🚀

---

**Estimated Total Time**: 15 minutes (basic) or 30 minutes (with OAuth)

**Next**: Customize your platform and add content!

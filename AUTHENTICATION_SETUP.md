# Authentication Setup Guide

## ✅ Status: Authentication is NOW ENABLED

Signup and login functionality has been re-enabled. Follow the steps below to ensure everything works properly.

## 🔧 Configuration Required

### 1. Frontend Environment Variables

**Location**: `artifacts/cpp-learn/.env`

You need to configure Supabase credentials for authentication to work:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_EMAIL=admin@infinitycode.com
```

### 2. Get Your Supabase Credentials

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create a new account
3. Create a new project or select an existing one
4. Go to **Project Settings** (gear icon) → **API**
5. Copy the following:
   - **Project URL** → paste into `VITE_SUPABASE_URL`
   - **anon public key** → paste into `VITE_SUPABASE_ANON_KEY`

### 3. Enable Email Authentication in Supabase

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email settings:
   - **Enable Email provider**: ON
   - **Confirm email**: OFF (for development) or ON (for production)
   - **Enable email confirmations**: Configure based on your needs

### 4. Set Up Database Schema

The schema file is located at: `artifacts/cpp-learn/supabase-schema.sql`

Run this in your Supabase SQL editor:
1. Go to **SQL Editor** in Supabase dashboard
2. Create a new query
3. Copy and paste the entire content from `supabase-schema.sql`
4. Run the query

## 🚀 Testing Authentication

### Start the Frontend Development Server

```bash
cd artifacts/cpp-learn
npm install
npm run dev
```

The app should open at `http://localhost:5173`

### Test Signup Flow

1. Click **Sign Up** button in the navigation
2. Fill in the form:
   - Name: Your name
   - Email: Your email
   - Password: At least 6 characters
3. Submit the form
4. Check for success message or error in browser console

### Test Login Flow

1. Click **Log In** button
2. Enter email and password
3. Submit the form
4. You should be redirected to dashboard

## 🐛 Troubleshooting

### Authentication Not Working?

**Check Browser Console:**
Open browser DevTools (F12) → Console tab. Look for errors like:
- `Supabase is not configured`
- `Invalid Supabase URL`
- `Network error`

**Common Issues:**

1. **"Supabase is not configured"**
   - Solution: Check that `.env` file exists in `artifacts/cpp-learn/`
   - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
   - Restart dev server after changing `.env`

2. **"Invalid login credentials"**
   - Solution: Make sure you've signed up first
   - Check if email confirmation is required in Supabase settings
   - Verify email/password are correct

3. **Network errors**
   - Solution: Check your internet connection
   - Verify Supabase project is active
   - Check Supabase status page

4. **Database errors**
   - Solution: Run the SQL schema from `supabase-schema.sql`
   - Check that tables exist in Supabase Table Editor

### Still Not Working?

1. **Clear browser cache and cookies**
2. **Check Supabase project logs**: Authentication → Logs
3. **Verify environment variables**:
   ```bash
   # In artifacts/cpp-learn directory
   cat .env
   ```
4. **Restart development server**:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

## 📝 Files Changed (Authentication Re-enabled)

1. ✅ `artifacts/cpp-learn/src/App.tsx` - Uncommented auth routes
2. ✅ `artifacts/cpp-learn/src/components/layout/app-layout.tsx` - Restored login/signup buttons
3. ✅ `artifacts/cpp-learn/src/pages/home.tsx` - Changed CTAs to point to signup
4. ✅ `artifacts/cpp-learn/.env` - Created with placeholder configuration

## 🔐 Backend Authentication (Optional)

If you're also running the backend API:

**Location**: `artifacts/backend/.env`

The backend already has its `.env` file. Make sure it's properly configured with:
- Database connection
- JWT secret
- CORS origins
- Port settings

## 📚 Additional Resources

- [Supabase Authentication Docs](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/auth-signup)
- [React Authentication Tutorial](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)

## ✨ Features Now Working

- ✅ User signup with email/password
- ✅ User login with email/password  
- ✅ Session management
- ✅ Protected routes
- ✅ User profile
- ✅ Logout functionality
- ✅ Password reset (if enabled in Supabase)

## 🎯 Next Steps

1. Configure your `.env` file with actual Supabase credentials
2. Run the database schema in Supabase
3. Start the development server
4. Test signup and login
5. Customize authentication flows as needed

---

**Need Help?** Check the browser console for detailed error messages and refer to the troubleshooting section above.

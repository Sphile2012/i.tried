# OAuth Configuration Guide

Complete guide for setting up GitHub and Google OAuth authentication.

---

## 📋 Prerequisites

Before starting, you need:
- ✅ Supabase project created
- ✅ Supabase credentials in `.env` file
- ✅ GitHub account
- ✅ Google account

---

## 🔑 GitHub OAuth Setup

### Step 1: Create GitHub OAuth Application

1. **Go to GitHub Developer Settings**
   - Visit: https://github.com/settings/developers
   - Or: GitHub Profile → Settings → Developer settings → OAuth Apps

2. **Create New OAuth App**
   - Click **"New OAuth App"** button
   
3. **Fill in Application Details**:
   ```
   Application name: Infinity Code
   Homepage URL: http://localhost:5173
   Application description: Learn programming with interactive lessons
   Authorization callback URL: https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback
   ```
   
   ⚠️ **Important**: Replace `YOUR-PROJECT-ID` with your actual Supabase project ID
   
   Example:
   ```
   https://abcdefghijklmnop.supabase.co/auth/v1/callback
   ```

4. **Register Application**
   - Click **"Register application"**

5. **Get Credentials**
   - Copy **Client ID** (save this)
   - Click **"Generate a new client secret"**
   - Copy **Client Secret** (save this immediately - you can't see it again)

### Step 2: Configure GitHub OAuth in Supabase

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project

2. **Navigate to Authentication Settings**
   - Click **Authentication** in sidebar
   - Click **Providers** tab

3. **Enable GitHub Provider**
   - Find **GitHub** in the list
   - Toggle **"Enable Sign in with GitHub"** to ON

4. **Enter GitHub Credentials**:
   ```
   Client ID: [paste your GitHub Client ID]
   Client Secret: [paste your GitHub Client Secret]
   ```

5. **Save Configuration**
   - Click **"Save"** button

### Step 3: Test GitHub Login

1. Start your app: `npm run dev`
2. Go to login page
3. Click "Continue with GitHub"
4. Authorize the application
5. You should be redirected back and logged in

### Production Setup (Later)

When deploying to production:

1. Go back to GitHub OAuth App settings
2. Update **Homepage URL** to your production domain:
   ```
   https://your-domain.com
   ```
3. Add production callback URL (keep localhost for development):
   ```
   Callback URLs:
   - http://localhost:5173/auth/callback  (development)
   - https://your-domain.com/auth/callback  (production)
   ```

---

## 🔐 Google OAuth Setup

### Step 1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com

2. **Create New Project**
   - Click project dropdown (top left)
   - Click **"New Project"**
   - Enter name: **Infinity Code**
   - Click **"Create"**
   - Wait for project to be created (~30 seconds)

### Step 2: Configure OAuth Consent Screen

1. **Navigate to OAuth Consent Screen**
   - In Google Cloud Console
   - Go to: **APIs & Services** → **OAuth consent screen**

2. **Choose User Type**
   - Select **External**
   - Click **"Create"**

3. **Fill in App Information**:
   ```
   App name: Infinity Code
   User support email: your-email@example.com
   App logo: (optional)
   
   Application home page: http://localhost:5173
   Application privacy policy: http://localhost:5173/privacy
   Application terms of service: http://localhost:5173/terms
   
   Developer contact information: your-email@example.com
   ```

4. **Scopes**
   - Click **"Add or Remove Scopes"**
   - Select:
     - ✅ `.../auth/userinfo.email`
     - ✅ `.../auth/userinfo.profile`
   - Click **"Update"**

5. **Test Users** (for development)
   - Add your email address
   - Add any other test user emails
   - Click **"Save and Continue"**

6. **Summary**
   - Review your settings
   - Click **"Back to Dashboard"**

### Step 3: Create OAuth Credentials

1. **Navigate to Credentials**
   - Go to: **APIs & Services** → **Credentials**

2. **Create OAuth Client ID**
   - Click **"Create Credentials"** dropdown
   - Select **"OAuth client ID"**

3. **Configure OAuth Client**:
   ```
   Application type: Web application
   Name: Infinity Code Web Client
   ```

4. **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   https://YOUR-PROJECT-ID.supabase.co
   ```
   
5. **Authorized redirect URIs**:
   ```
   https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback
   ```
   
   ⚠️ **Important**: Replace `YOUR-PROJECT-ID` with your Supabase project ID

6. **Create**
   - Click **"Create"**
   - Modal will appear with your credentials

7. **Save Credentials**
   - Copy **Client ID**
   - Copy **Client Secret**
   - Click **"OK"**

### Step 4: Configure Google OAuth in Supabase

1. **Open Supabase Dashboard**
   - Go to your project
   - Click **Authentication** → **Providers**

2. **Enable Google Provider**
   - Find **Google** in the list
   - Toggle **"Enable Sign in with Google"** to ON

3. **Enter Google Credentials**:
   ```
   Client ID: [paste your Google Client ID]
   Client Secret: [paste your Google Client Secret]
   ```

4. **Save Configuration**
   - Click **"Save"** button

### Step 5: Test Google Login

1. Start your app: `npm run dev`
2. Go to login page
3. Click "Continue with Google"
4. Select your Google account
5. Authorize the application
6. You should be redirected back and logged in

### Production Setup (Later)

When deploying to production:

1. **Update OAuth Consent Screen**
   - Add production URLs
   - Submit for verification (if needed)

2. **Update OAuth Client**
   - Add production URLs to:
     - Authorized JavaScript origins
     - Authorized redirect URIs
   ```
   Authorized JavaScript origins:
   - http://localhost:5173  (keep for development)
   - https://your-domain.com  (production)
   
   Authorized redirect URIs:
   - https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback  (same for both)
   ```

---

## 🔧 Frontend Integration

The OAuth buttons should already be in your login/signup pages. If not, here's the code:

### Login Page (`src/pages/login.tsx`)

```tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Github } from 'lucide-react';

export default function LoginPage() {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) console.error('GitHub login error:', error);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) console.error('Google login error:', error);
  };

  return (
    <div className="space-y-4">
      {/* GitHub Button */}
      <button
        onClick={handleGitHubLogin}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition"
      >
        <Github className="h-5 w-5" />
        <span>Continue with GitHub</span>
      </button>

      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-950 text-slate-400">Or continue with email</span>
        </div>
      </div>

      {/* Email/Password form below */}
    </div>
  );
}
```

---

## ✅ Verification Checklist

### GitHub OAuth
- [ ] GitHub OAuth app created
- [ ] Client ID and Secret obtained
- [ ] Callback URL configured correctly
- [ ] Provider enabled in Supabase
- [ ] Credentials entered in Supabase
- [ ] Test login works

### Google OAuth
- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth client ID created
- [ ] Client ID and Secret obtained
- [ ] Authorized origins configured
- [ ] Redirect URIs configured
- [ ] Provider enabled in Supabase
- [ ] Credentials entered in Supabase
- [ ] Test login works

---

## 🐛 Troubleshooting

### GitHub OAuth Issues

**"The redirect_uri MUST match the registered callback URL"**
- Solution: Check callback URL in GitHub app matches Supabase exactly
- Format: `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`

**"Bad credentials"**
- Solution: Regenerate client secret and update in Supabase

**"Application suspended"**
- Solution: Check if your GitHub OAuth app is active

### Google OAuth Issues

**"redirect_uri_mismatch"**
- Solution: Add redirect URI to Google Cloud Console
- Must match: `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`

**"Access blocked: This app's request is invalid"**
- Solution: Add your email as a test user in OAuth consent screen

**"Invalid client"**
- Solution: Check Client ID and Secret are correct in Supabase

### General OAuth Issues

**OAuth popup blocked**
- Solution: Allow popups in browser settings

**"Failed to fetch"**
- Solution: Check internet connection and Supabase status

**User redirected but not logged in**
- Solution: Check browser console for errors
- Verify Supabase URL is correct in `.env`

---

## 📱 Mobile Considerations

For mobile apps (React Native, Flutter, etc.):
- Use deep linking for OAuth callbacks
- Configure custom URL schemes
- Update redirect URIs accordingly

---

## 🔒 Security Best Practices

1. **Never commit secrets to Git**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Use HTTPS in production**
   - HTTP is not allowed for OAuth

3. **Rotate secrets regularly**
   - Update Client Secrets periodically

4. **Restrict authorized domains**
   - Only add domains you control

5. **Monitor OAuth usage**
   - Check for suspicious activity

---

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Google Identity Platform](https://developers.google.com/identity)
- [OAuth 2.0 Specification](https://oauth.net/2/)

---

**Questions?** Check troubleshooting section or contact support.

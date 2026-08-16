# 🚀 Netlify Deployment Guide - Infinity Code

## ✅ Current Deployment Status

**Live Site**: https://we-codee.netlify.app/

---

## 📋 Netlify Configuration

### Build Settings (Set in Netlify Dashboard)

- **Build Command**: `npm run build`
- **Publish Directory**: `artifacts/cpp-learn/dist`
- **Base Directory**: (leave empty)
- **Branch**: `main`

### Environment Variables (Required)

Add these in Netlify Dashboard > Site Settings > Environment Variables:

```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
VITE_ADMIN_EMAIL = poomeigh503@gmail.com
```

⚠️ **Important**: Replace placeholder values with your actual Supabase credentials.

---

## 🛠️ How to Build Locally

### From Root Directory
```bash
npm run build
```

### From Frontend Directory
```bash
cd artifacts/cpp-learn
npm install
npm run build
```

### Build Output
The build creates production files in `artifacts/cpp-learn/dist/`:
- `index.html` - Main entry point
- `assets/*.js` - JavaScript bundles
- `assets/*.css` - CSS styles

---

## 🔄 Deployment Workflow

### Automatic Deployment
Once connected to GitHub, Netlify will automatically deploy when you:
- Push commits to the `main` branch
- Merge pull requests into `main`

### Manual Deployment
If you need to trigger a manual deployment:
1. Go to Netlify Dashboard
2. Select your site: `we-codee`
3. Click "Deploys" tab
4. Click "Trigger deploy" > "Deploy site"

---

## 🧪 Testing Before Deployment

### 1. Local Testing
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Preview the build locally
npm run preview
```

### 2. Check Build Output
After building, verify:
- ✅ `artifacts/cpp-learn/dist` directory exists
- ✅ `index.html` is present
- ✅ JavaScript and CSS assets are generated
- ✅ No build errors in console

### 3. Environment Variables
Make sure your `.env` file in `artifacts/cpp-learn/` has the correct values:
```
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_ANON_KEY=your_actual_anon_key
VITE_ADMIN_EMAIL=poomeigh503@gmail.com
```

---

## 🐛 Troubleshooting

### Build Fails on Netlify

**Common Issues:**

1. **"Command not found: vite"**
   - Solution: Make sure dependencies are installed properly
   - Check that `vite` is in `package.json` dependencies

2. **"Publish directory not found"**
   - Solution: Verify publish directory is set to `artifacts/cpp-learn/dist`

3. **Node version mismatch**
   - Solution: Set Node version to 18+ in Netlify build settings

### Site Loads but Shows Errors

1. **Supabase Connection Errors**
   - Check environment variables are set correctly in Netlify
   - Verify Supabase project is active
   - Check browser console for specific error messages

2. **404 on Routes (e.g., /login, /dashboard)**
   - This is a SPA routing issue
   - Ensure Netlify is configured to redirect all routes to `index.html`
   - Add a `_redirects` file in `artifacts/cpp-learn/public/`:
     ```
     /*    /index.html   200
     ```

3. **Blank Page**
   - Check browser console (F12) for JavaScript errors
   - Verify build completed successfully
   - Clear browser cache and hard refresh (Ctrl+Shift+R)

---

## 📊 Deployment Checklist

Before deploying to production:

- [ ] All code changes committed and pushed to GitHub
- [ ] Local build completes successfully (`npm run build`)
- [ ] Environment variables configured in Netlify
- [ ] Supabase project is set up and active
- [ ] Test deployment on a staging branch first (optional)
- [ ] Review Netlify build logs for any warnings or errors
- [ ] Test the live site after deployment

---

## 🔗 Useful Links

- **Netlify Dashboard**: https://app.netlify.com/
- **Your Site**: https://we-codee.netlify.app/
- **GitHub Repository**: https://github.com/Sphile2012/infinity.git
- **Supabase Dashboard**: https://app.supabase.com/

---

## 📞 Support

If you encounter deployment issues:

1. Check Netlify deploy logs (Deploys > Latest deploy > View logs)
2. Check browser console for errors (F12)
3. Verify all environment variables are set correctly
4. Review this guide for common solutions

---

**Last Updated**: 2026-08-15  
**Current Site**: https://we-codee.netlify.app/ ✅
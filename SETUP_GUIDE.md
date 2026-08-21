# ♾️ Infinite Code - Complete Setup & Deployment Guide

This guide will walk you through setting up the Infinite Code platform with all backend services, database, and deployment configurations.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [PayFast Integration](#payfast-integration)
6. [Email Configuration](#email-configuration)
7. [Local Development](#local-development)
8. [Production Deployment](#production-deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js** v18+ (use the `.nvmrc` file: `nvm use`)
- **npm** or **pnpm** package manager
- **Git** for version control
- **Supabase** account (free tier is sufficient)
- **PayFast** merchant account (for payments)

### Optional Software
- **PostgreSQL** client (for direct database access)
- **Redis** (for caching, optional)
- **Docker** (for containerization)

---

## Database Setup

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Note your **Project URL** and **API keys** from Project Settings > API

### 2. Run Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Copy the entire contents of `artifacts/cpp-learn/supabase-schema.sql`
3. Paste into the SQL Editor and click **Run**

This will create:
- 40+ tables for users, courses, progress, payments, etc.
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers and functions
- Initial seed data (subscription plans, achievements, badges)

### 3. Configure Storage Buckets

In Supabase Dashboard > Storage:

1. Create bucket: `avatars` (public, for profile pictures)
2. Create bucket: `certificates` (private, for generated PDFs)
3. Create bucket: `resources` (public, for downloadable materials)

### 4. Set Environment Variables

In Supabase Dashboard > Project Settings > Environment Variables:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ADMIN_EMAIL=your_admin_email
```

---

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd artifacts/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Server
NODE_ENV=development
PORT=3001

# Supabase (use service_role key for backend)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Frontend URL
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3001

# PayFast (get from PayFast dashboard)
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_PASSPHRASE=your_passphrase
PAYFAST_SANDBOX=true

# Email (Gmail for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 4. Start Development Server

```bash
npm run dev
```

Server should start on `http://localhost:3001`

### 5. Test Backend

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "version": "1.0.0"
}
```

---

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd artifacts/cpp-learn
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp ../backend/.env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ADMIN_EMAIL=your_admin_email
VITE_BACKEND_URL=http://localhost:3001
```

### 4. Start Development Server

```bash
npm run dev
```

Frontend should start on `http://localhost:5173`

---

## PayFast Integration

### 1. Register for PayFast

1. Go to [PayFast](https://www.payfast.co.za)
2. Complete merchant registration
3. Verify your account

### 2. Get Credentials

From PayFast Dashboard:
- **Merchant ID**
- **Merchant Key**
- Set a **Passphrase** in Settings

### 3. Configure Webhook URL

In PayFast Dashboard > Settings > Instant Notification (ITN):

```
https://your-backend-url.com/api/payments/payfast/itn
```

For local development, use a tunnel service like ngrok:

```bash
ngrok http 3001
```

Then update PayFast with: `https://your-subdomain.ngrok.io/api/payments/payfast/itn`

### 4. Test Integration

Use PayFast sandbox mode first:

```env
PAYFAST_SANDBOX=true
```

Test with small amounts (R1.00) to verify everything works.

---

## Email Configuration

### Option 1: Gmail (Development)

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: Google Account > Security > 2FA > App passwords
3. Use this password in `SMTP_PASS`

### Option 2: SendGrid (Production)

1. Create SendGrid account
2. Get API key
3. Update backend to use SendGrid instead of SMTP

### Option 3: AWS SES (Production)

1. Set up AWS SES
2. Verify your domain
3. Use SMTP credentials from AWS

---

## Local Development

### Running Both Frontend and Backend

**Terminal 1 - Backend:**
```bash
cd artifacts/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd artifacts/cpp-learn
npm run dev
```

### Testing Payment Flow

1. Start both servers
2. Set up ngrok for backend: `ngrok http 3001`
3. Update PayFast ITN URL with ngrok URL
4. Register a test user on frontend
5. Start free trial
6. Verify payment webhook is received

---

## Production Deployment

### Frontend (Netlify)

1. **Connect Repository**
   - Push code to GitHub
   - Connect Netlify to your repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables** (set in Netlify dashboard)
   ```
   VITE_SUPABASE_URL=your_production_supabase_url
   VITE_SUPABASE_ANON_KEY=your_production_anon_key
   VITE_BACKEND_URL=https://your-backend-domain.com
   ```

4. **Deploy**
   - Netlify will automatically deploy on push to main branch

### Backend (Railway, Render, or VPS)

#### Option 1: Railway

1. Connect GitHub repository
2. Set root directory to `artifacts/backend`
3. Add environment variables
4. Deploy

#### Option 2: Render

1. Create new Web Service
2. Connect repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables

#### Option 3: VPS (Ubuntu)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo-url
cd artifacts/backend

# Install dependencies
npm install --production

# Build
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start dist/index.js --name infinite-code-backend

# Setup Nginx as reverse proxy
sudo apt-get install nginx
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name api.infinitecode.co.za;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Database (Supabase)

- Use Supabase's production tier for better performance
- Enable daily backups
- Set up connection pooling if needed

---

## Troubleshooting

### Common Issues

#### 1. Supabase Connection Errors

**Problem:** "Supabase is not configured"

**Solution:**
- Check environment variables are set correctly
- Verify Supabase URL and keys
- Ensure service_role key is used in backend (not anon key)

#### 2. PayFast Webhook Not Received

**Problem:** Payments complete but subscription not activated

**Solution:**
- Check PayFast ITN URL is publicly accessible
- Use ngrok for local development
- Check backend logs for webhook processing errors
- Verify PayFast signature validation

#### 3. Email Not Sending

**Problem:** Payment confirmation emails not sent

**Solution:**
- Check SMTP credentials
- For Gmail, ensure App Password is used (not regular password)
- Check spam folder
- Enable debug logging: `LOG_LEVEL=debug`

#### 4. CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:**
- Update `ALLOWED_ORIGINS` in backend .env
- Ensure backend is running
- Check network requests in browser DevTools

#### 5. Database Schema Errors

**Problem:** Tables don't exist or missing columns

**Solution:**
- Re-run the schema SQL in Supabase SQL Editor
- Check for any SQL errors during execution
- Verify all extensions are enabled (`uuid-ossp`, `pgcrypto`)

### Debug Mode

Enable detailed logging:

```env
LOG_LEVEL=debug
NODE_ENV=development
```

Check logs:
```bash
# Backend logs
tail -f artifacts/backend/logs/combined.log

# Supabase logs (in dashboard)
Supabase Dashboard > Logs
```

### Database Debugging

Connect directly to database:
```bash
psql -h db.your-project.supabase.co -U postgres -d postgres
```

Useful queries:
```sql
-- Check users
SELECT id, email, subscription_status FROM profiles LIMIT 10;

-- Check payments
SELECT id, user_id, amount, status, created_at FROM payments ORDER BY created_at DESC LIMIT 10;

-- Check subscriptions
SELECT id, user_id, status, current_period_end FROM subscriptions;
```

---

## 📞 Support

If you encounter issues not covered in this guide:

1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Check the [PayFast Developer Guide](https://developers.payfast.co.za)
3. Review application logs
4. Search GitHub Issues

---

## 🚀 Next Steps

After successful deployment:

1. **Monitor Performance**
   - Set up application monitoring (e.g., Sentry, LogRocket)
   - Track key metrics (user signups, payments, engagement)

2. **SEO Optimization**
   - Add meta tags
   - Submit sitemap to Google
   - Set up Google Analytics

3. **Security Hardening**
   - Enable SSL/TLS
   - Set up DDoS protection (Cloudflare)
   - Regular security audits

4. **Backup Strategy**
   - Automated database backups
   - Code repository backups
   - Asset backups (certificates, uploads)

5. **Scaling**
   - Database connection pooling
   - CDN for static assets
   - Load balancing for backend
   - Redis for caching

---

## 📄 License

This project is proprietary. All rights reserved.

---

**Built with ❤️ using React, TypeScript, Node.js, and Supabase**
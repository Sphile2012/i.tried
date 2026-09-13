# Deployment Guide - Level-Based Progression System

## 📋 Prerequisites

### Required Software
- Node.js 18+ 
- npm or yarn
- PostgreSQL 14+ (production) or SQLite (development)
- Git
- PM2 or Docker (for process management)

### Required Accounts
- Database hosting (e.g., Railway, Supabase, AWS RDS)
- Frontend hosting (e.g., Vercel, Netlify, AWS S3)
- Backend hosting (e.g., Railway, Heroku, AWS EC2)

---

## 🔧 Environment Setup

### Backend Environment Variables

Create `.env` file in `artifacts/backend/`:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"
# For SQLite (dev only):
# DATABASE_URL="file:./prisma/dev.db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRATION="7d"

# Server
NODE_ENV="production"
PORT=3000

# CORS
CORS_ORIGIN="https://your-frontend-domain.com"

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Rate Limiting
RATE_LIMIT_TTL=60000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL="info"
```

### Frontend Environment Variables

Create `.env.production` in `artifacts/cpp-learn/`:

```bash
VITE_API_URL="https://your-backend-domain.com"
VITE_APP_NAME="Infinity Code"
VITE_ENABLE_ANALYTICS="true"
```

---

## 🗄️ Database Migration

### Step 1: Switch to PostgreSQL (Production)

Update `artifacts/backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

### Step 2: Run Migrations

```bash
cd artifacts/backend

# Generate Prisma Client for PostgreSQL
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations (recommended)
npx prisma migrate deploy
```

### Step 3: Seed Quiz Questions

```bash
npx tsx prisma/seed-quiz-questions.ts
```

### Step 4: Migrate Existing Users (if applicable)

```bash
npx tsx scripts/migrate-existing-users.ts
```

---

## 🚀 Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Project**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   ```

2. **Add PostgreSQL Database**
   ```bash
   railway add --plugin postgresql
   ```

3. **Set Environment Variables**
   - Go to Railway dashboard
   - Add all environment variables from `.env`
   - `DATABASE_URL` is auto-configured by Railway

4. **Deploy**
   ```bash
   railway up
   ```

5. **Run Migrations**
   ```bash
   railway run npx prisma migrate deploy
   railway run npx tsx prisma/seed-quiz-questions.ts
   ```

### Option 2: Docker

1. **Create Dockerfile** in `artifacts/backend/`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma Client
RUN npx prisma generate

# Copy app files
COPY . .

# Build
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

2. **Create docker-compose.yml**:

```yaml
version: '3.8'

services:
  backend:
    build: ./artifacts/backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/infinity_code
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    depends_on:
      - db
    command: sh -c "npx prisma migrate deploy && npm run start:prod"

  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: infinity_code
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

3. **Deploy**:

```bash
docker-compose up -d
```

### Option 3: Traditional VPS (EC2, DigitalOcean)

1. **SSH into server**:
   ```bash
   ssh user@your-server-ip
   ```

2. **Install dependencies**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs postgresql
   sudo npm install -g pm2
   ```

3. **Clone and setup**:
   ```bash
   git clone your-repo
   cd artifacts/backend
   npm ci
   npx prisma generate
   npx prisma migrate deploy
   npm run build
   ```

4. **Start with PM2**:
   ```bash
   pm2 start dist/main.js --name infinity-code-api
   pm2 save
   pm2 startup
   ```

5. **Setup Nginx reverse proxy**:
   ```nginx
   server {
       listen 80;
       server_name api.your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd artifacts/cpp-learn
   vercel --prod
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - `VITE_API_URL=https://your-backend-url.com`

### Option 2: Netlify

1. **Create `netlify.toml`** in `artifacts/cpp-learn/`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

2. **Deploy**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### Option 3: Static Hosting (S3, CloudFlare Pages)

1. **Build**:
   ```bash
   cd artifacts/cpp-learn
   npm run build
   ```

2. **Upload `dist/` folder** to your static hosting service

3. **Configure redirects** for SPA routing

---

## ✅ Post-Deployment Checklist

### Backend Verification

- [ ] Database connection working
- [ ] Migrations applied successfully
- [ ] Quiz questions seeded (25 questions)
- [ ] Health check endpoint responding
- [ ] CORS configured for frontend domain
- [ ] JWT secret is secure and unique
- [ ] Rate limiting active
- [ ] Logs are accessible

**Test Commands:**
```bash
# Check health
curl https://api.your-domain.com/api/health

# Test auth
curl -X POST https://api.your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Check database
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"QuizQuestion\";"
```

### Frontend Verification

- [ ] Build completes without errors
- [ ] Environment variables loaded
- [ ] API connection working
- [ ] Login/register flows functional
- [ ] Quiz loads and submits
- [ ] Layouts render correctly
- [ ] Responsive design works
- [ ] Console has no errors

**Test in Browser:**
1. Open https://your-frontend-domain.com
2. Register new account
3. Complete onboarding quiz
4. Verify level assignment
5. Test lesson navigation
6. Check admin dashboard (if admin)

---

## 🔒 Security Hardening

### Backend Security

1. **Update JWT Secret**:
   ```bash
   # Generate secure secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Enable HTTPS**:
   - Use Let's Encrypt for SSL certificates
   - Redirect HTTP to HTTPS

3. **Rate Limiting**:
   - Already configured in code
   - Monitor for abuse

4. **Database Security**:
   ```sql
   -- Create read-only user for analytics
   CREATE USER readonly WITH PASSWORD 'secure_password';
   GRANT CONNECT ON DATABASE infinity_code TO readonly;
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
   ```

5. **Environment Variables**:
   - Never commit `.env` files
   - Use secrets management (AWS Secrets Manager, etc.)

### Frontend Security

1. **Content Security Policy**:
   Add to `index.html`:
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
   ```

2. **Secure Cookies**:
   ```javascript
   // If using cookies
   { httpOnly: true, secure: true, sameSite: 'strict' }
   ```

---

## 📊 Monitoring & Logging

### Setup Logging

**Backend (NestJS)**:
```typescript
// Already configured in main.ts
app.useLogger(['error', 'warn', 'log']);
```

**Add external logging (optional)**:
```bash
npm install winston
```

### Monitor Key Metrics

1. **API Response Times**
   - Target: < 300ms average
   - Alert if > 1s

2. **Error Rates**
   - Target: < 1% of requests
   - Alert on spike

3. **User Progression**
   - Quiz completion rate
   - Level advancement rate
   - Average time per level

4. **Database Performance**
   - Query execution time
   - Connection pool usage
   - Slow query log

### Recommended Tools

- **Backend Monitoring**: New Relic, DataDog, Sentry
- **Database**: Prisma Studio, pgAdmin, CloudWatch
- **Frontend**: Google Analytics, LogRocket, Sentry
- **Uptime**: UptimeRobot, Pingdom

---

## 🔄 Database Backup & Recovery

### Automated Backups

**PostgreSQL (Daily)**:
```bash
#!/bin/bash
# backup-db.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DATABASE_URL="your-connection-string"

pg_dump $DATABASE_URL > $BACKUP_DIR/backup_$DATE.sql
gzip $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

**Schedule with cron**:
```bash
0 2 * * * /path/to/backup-db.sh
```

### Restore from Backup

```bash
# Decompress
gunzip backup_20260913.sql.gz

# Restore
psql $DATABASE_URL < backup_20260913.sql
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```
Error: Can't reach database server
```

**Solution**:
- Check `DATABASE_URL` format
- Verify database is running
- Check firewall rules
- Ensure SSL mode is correct

#### 2. Prisma Client Not Generated
```
Error: @prisma/client did not initialize yet
```

**Solution**:
```bash
npx prisma generate
npm run build
```

#### 3. CORS Errors
```
Access-Control-Allow-Origin header is not present
```

**Solution**:
- Check `CORS_ORIGIN` in backend `.env`
- Verify frontend URL matches exactly
- Include protocol (https://)

#### 4. Quiz Questions Not Loading
```
GET /api/onboarding/quiz returns empty
```

**Solution**:
```bash
# Re-seed questions
npx tsx prisma/seed-quiz-questions.ts

# Verify in database
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"QuizQuestion\";"
```

#### 5. Level Not Updating
```
User level stuck at BEGINNER
```

**Solution**:
- Check XP and completion rate: `GET /api/user/level-status`
- Verify progression criteria met
- Check backend logs for errors
- Try manual advancement: `POST /api/level/advance`

---

## 📈 Scaling Considerations

### Horizontal Scaling (Multiple Instances)

1. **Stateless Backend**:
   - Already implemented (JWT-based auth)
   - No session storage needed

2. **Load Balancer**:
   ```nginx
   upstream backend {
       least_conn;
       server backend1.internal:3000;
       server backend2.internal:3000;
       server backend3.internal:3000;
   }

   server {
       location / {
           proxy_pass http://backend;
       }
   }
   ```

3. **Database Connection Pooling**:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
     connection_limit = 10
   }
   ```

### Caching Strategy

1. **Redis for API Responses** (future enhancement):
   ```typescript
   // Cache curriculum data for 5 minutes
   @CacheTTL(300)
   @Get('curriculum/:level')
   ```

2. **CDN for Static Assets**:
   - Use CloudFlare or AWS CloudFront
   - Cache frontend assets aggressively

---

## 📝 Rollback Procedure

### If Deployment Fails

1. **Backend Rollback**:
   ```bash
   # With Railway
   railway rollback

   # With PM2
   pm2 reload infinity-code-api --update-env
   git checkout previous-version
   npm run build
   pm2 restart infinity-code-api

   # Database migration rollback
   npx prisma migrate resolve --rolled-back [migration-name]
   ```

2. **Frontend Rollback**:
   ```bash
   # Vercel
   vercel rollback

   # Manual
   git checkout previous-version
   npm run build
   # Re-deploy dist folder
   ```

---

## 🎯 Success Metrics

### Monitor These KPIs

1. **User Engagement**
   - Quiz completion rate > 80%
   - Level advancement rate
   - Average session duration

2. **System Performance**
   - API response time < 300ms
   - Uptime > 99.9%
   - Error rate < 0.1%

3. **Progression Health**
   - Time to INTERMEDIATE: 10-20 days average
   - Time to EXPERT: 30-60 days average
   - User distribution across levels

---

## 📞 Support & Maintenance

### Regular Maintenance Tasks

**Daily:**
- Monitor error logs
- Check API response times
- Review user progression stats

**Weekly:**
- Database backup verification
- Security patch updates
- Performance analysis

**Monthly:**
- Database optimization (VACUUM, ANALYZE)
- Log rotation
- Dependency updates

### Emergency Contacts

- **Database Issues**: [DBA Team]
- **Security Issues**: [Security Team]
- **Infrastructure**: [DevOps Team]

---

## ✅ Deployment Completed!

Your Level-Based Progression System is now deployed and running!

**Next Steps:**
1. Monitor initial user feedback
2. Track progression statistics
3. Optimize based on real usage data
4. Plan for future enhancements

**Documentation:**
- API docs: `/API_DOCUMENTATION.md`
- System architecture: `/SYSTEM_ARCHITECTURE.md`
- Implementation summary: `/IMPLEMENTATION_SUMMARY.md`

---

**Last Updated:** September 13, 2026  
**Version:** 1.0.0

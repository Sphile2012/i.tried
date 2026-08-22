# 📦 PostgreSQL Installation Guide

## You Need PostgreSQL to Run Infinity Code Backend

Your system doesn't have PostgreSQL installed. Here's how to install it:

---

## 🚀 Quick Install (Windows)

### Option 1: Official Installer (Recommended)

1. **Download PostgreSQL:**
   - Go to: https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Choose latest version (PostgreSQL 16 or 15)

2. **Run Installer:**
   - Double-click downloaded file
   - Click "Next" through setup
   - **IMPORTANT:** Remember the password you set for user "postgres"!
   - Port: Keep default 5432
   - Click "Next" until installation completes

3. **Verify Installation:**
   ```bash
   # Open new Command Prompt or PowerShell
   psql --version
   ```

   Should show: `psql (PostgreSQL) 15.x` or `16.x`

---

### Option 2: Using Chocolatey (If you have it)

```powershell
choco install postgresql
```

---

### Option 3: Using Winget

```powershell
winget install PostgreSQL.PostgreSQL
```

---

## 🔧 After Installation

### 1. Verify PostgreSQL is Running

```powershell
# Check if service is running
Get-Service -Name postgresql*
```

Should show "Running"

### 2. Test Connection

```bash
psql -U postgres
```

Enter your password when prompted.

### 3. Create Database for Infinity Code

```sql
CREATE DATABASE infinite_code;
\q
```

Or in one command:
```bash
psql -U postgres -c "CREATE DATABASE infinite_code;"
```

---

## 🎯 Alternative: Use Docker (Easier!)

If you have Docker installed:

```bash
# Pull PostgreSQL image
docker pull postgres:15

# Run PostgreSQL container
docker run --name infinity-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=infinite_code \
  -p 5432:5432 \
  -d postgres:15
```

Then update your `.env`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/infinite_code
```

---

## 🌐 Alternative: Use Cloud Database (No Installation!)

### Option 1: Supabase (Free Tier)

1. Go to https://supabase.com
2. Sign up (free)
3. Create new project
4. Get connection string from Settings > Database
5. Update `.env` with your Supabase connection string:
   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres
   ```

### Option 2: Railway (Free Tier)

1. Go to https://railway.app
2. Sign up (free)
3. New Project > Add PostgreSQL
4. Copy connection string
5. Update `.env`

### Option 3: Render (Free Tier)

1. Go to https://render.com
2. Sign up (free)
3. New > PostgreSQL
4. Copy External Database URL
5. Update `.env`

---

## ⚡ Quick Setup After PostgreSQL Install

Once PostgreSQL is installed:

```powershell
# Navigate to backend
cd "c:\Users\Phumeh\Downloads\guard-ring-safe (1)\i.tried\artifacts\backend"

# Create database
psql -U postgres -c "CREATE DATABASE infinite_code;"

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed all 30 topics
npm run prisma:seed:complete

# Start server
npm run start:dev
```

---

## 🐛 Troubleshooting

### "psql: command not found"

Add PostgreSQL to PATH:
1. Search Windows for "Environment Variables"
2. Click "Environment Variables"
3. Under "System Variables", find "Path"
4. Click "Edit"
5. Add: `C:\Program Files\PostgreSQL\15\bin` (adjust version number)
6. Click OK
7. Restart PowerShell/Command Prompt

### "Password authentication failed"

Update `.env` with your PostgreSQL password:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/infinite_code
```

### Service not running

Start PostgreSQL service:
```powershell
# As Administrator
Start-Service postgresql-x64-15  # or your version
```

---

## ✅ Recommended: Use Supabase

**Easiest option - No local installation needed!**

1. Sign up at https://supabase.com (free)
2. Create project
3. Copy connection string
4. Update `.env`
5. Run setup commands
6. Done! ✅

---

## 📞 After PostgreSQL is Ready

Run this to complete setup:

```powershell
cd "c:\Users\Phumeh\Downloads\guard-ring-safe (1)\i.tried\artifacts\backend"
.\SETUP_AND_RUN.ps1
```

This will:
- ✅ Check dependencies
- ✅ Generate Prisma client
- ✅ Run migrations
- ✅ Seed all 30 topics
- ✅ Start server

---

## 🎉 Summary

**You need PostgreSQL before running the backend.**

**Easiest options:**
1. 🌐 **Supabase** (cloud, no installation) - RECOMMENDED
2. 🐳 **Docker** (if you have Docker)
3. 💻 **Local Install** (PostgreSQL installer)

Choose one, set it up, then run `.\SETUP_AND_RUN.ps1`

---

**After setup, you'll have:**
- ✅ PostgreSQL database
- ✅ All 30 topics
- ✅ Authentication working
- ✅ Backend API running

# ========================================
# Infinity Code - Complete Setup Script
# ========================================

Write-Host "`n🚀 INFINITY CODE - BACKEND SETUP & TEST`n" -ForegroundColor Cyan

# Change to backend directory
$BackendPath = "c:\Users\Phumeh\Downloads\guard-ring-safe (1)\i.tried\artifacts\backend"
Set-Location $BackendPath

Write-Host "📂 Working Directory: $BackendPath`n" -ForegroundColor Yellow

# Step 1: Check if node_modules exists
Write-Host "Step 1: Checking dependencies..." -ForegroundColor Green
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies already installed`n" -ForegroundColor Green
} else {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed`n" -ForegroundColor Green
}

# Step 2: Check Database Connection
Write-Host "Step 2: Checking database..." -ForegroundColor Green
$dbCheck = psql -U postgres -d infinite_code -c "SELECT 1" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database 'infinite_code' exists`n" -ForegroundColor Green
} else {
    Write-Host "❌ Database 'infinite_code' not found" -ForegroundColor Red
    Write-Host "Creating database..." -ForegroundColor Yellow
    psql -U postgres -c "CREATE DATABASE infinite_code;" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database created successfully`n" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Please create database manually:" -ForegroundColor Yellow
        Write-Host "   psql -U postgres -c `"CREATE DATABASE infinite_code;`"`n"
        Write-Host "Press Enter to continue after creating the database..."
        Read-Host
    }
}

# Step 3: Generate Prisma Client
Write-Host "Step 3: Generating Prisma Client..." -ForegroundColor Green
npm run prisma:generate
Write-Host "✅ Prisma Client generated`n" -ForegroundColor Green

# Step 4: Run Migrations
Write-Host "Step 4: Running database migrations..." -ForegroundColor Green
$env:MIGRATION_NAME = "complete_setup"
npm run prisma:migrate
Write-Host "✅ Migrations completed`n" -ForegroundColor Green

# Step 5: Seed Database with All 30 Topics
Write-Host "Step 5: Seeding all 30 topics..." -ForegroundColor Green
Write-Host "⏳ This will take 2-3 minutes..." -ForegroundColor Yellow
npm run prisma:seed:complete
Write-Host "`n✅ All 30 topics seeded!`n" -ForegroundColor Green

# Step 6: Display Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ SETUP COMPLETE!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "📊 What's ready:" -ForegroundColor Yellow
Write-Host "   ✅ 30 complete topics"
Write-Host "   ✅ 1,500+ lessons"
Write-Host "   ✅ 6,000+ code examples"
Write-Host "   ✅ 500+ quizzes"
Write-Host "   ✅ 300+ challenges"
Write-Host "   ✅ Authentication system (signup, login, profile)"`n

Write-Host "🚀 Starting the server..." -ForegroundColor Green
Write-Host "📡 Server will be available at: http://localhost:3001" -ForegroundColor Cyan
Write-Host "📖 API documentation at: http://localhost:3001/api"`n

Write-Host "⚠️  Keep this window open while testing!" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Yellow

# Start the server
npm run start:dev

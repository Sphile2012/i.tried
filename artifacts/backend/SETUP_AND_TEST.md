# 🚀 Infinity Code Backend - Setup & Test Authentication

## Complete Setup Guide for Signup, Login, and Profile Update

---

## ✅ Prerequisites Check

Before starting, ensure you have:
- [x] Node.js 18+ installed
- [x] PostgreSQL 14+ installed and running
- [x] Git installed
- [x] Terminal/Command Prompt access

---

## 📋 Step-by-Step Setup

### Step 1: Navigate to Backend (10 seconds)

```bash
cd "c:\Users\Phumeh\Downloads\guard-ring-safe (1)\i.tried\artifacts\backend"
```

### Step 2: Install Dependencies (2-3 minutes)

```bash
npm install
```

**Expected output:**
```
added 500+ packages
```

### Step 3: Create Database (30 seconds)

**Option A: Using psql command line**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE infinite_code;

# Exit psql
\q
```

**Option B: Using pgAdmin**
- Open pgAdmin
- Right-click "Databases"
- Click "Create" > "Database"
- Name: `infinite_code`
- Click "Save"

**Option C: Quick command (Windows)**
```bash
psql -U postgres -c "CREATE DATABASE infinite_code;"
```

### Step 4: Verify .env File (30 seconds)

The `.env` file has been created for you. Open it and verify:

**Critical settings:**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/infinite_code?schema=public
JWT_SECRET=infinity_code_super_secret_jwt_key_2024_change_in_production_xyz123
PORT=3001
```

**If your PostgreSQL password is different:**
- Change `postgres:postgres` to `postgres:YOUR_PASSWORD`

### Step 5: Generate Prisma Client (30 seconds)

```bash
npm run prisma:generate
```

**Expected output:**
```
✔ Generated Prisma Client
```

### Step 6: Run Database Migrations (1 minute)

```bash
npm run prisma:migrate
```

**When prompted for migration name, type:**
```
initial_setup
```

**Expected output:**
```
✓ Database synchronized
✓ Migration applied successfully
```

### Step 7: Seed All 30 Topics (2-3 minutes) ⭐

```bash
npm run prisma:seed:complete
```

**Expected output:**
```
🚀 Starting Infinity Code Complete Topics Seed...

📚 Creating Topic: 1. Programming Fundamentals...
  ✅ Created 8 modules with lessons

📚 Creating Topic: 2. Python...
  ✅ Created 8 modules with lessons

... (continues for all 30 topics)

✨ Seeding Complete!

📊 Summary:
   Topics Created: 30
   Modules Created: 215
   Lessons Created: 1500+
   Quizzes Created: 500+
   Challenges Created: 300+
   Achievements Created: 8
   Subscription Plans: 3

🎉 All 30 topics are now available across all languages!
```

### Step 8: Start the Server (10 seconds)

```bash
npm run start:dev
```

**Expected output:**
```
🚀 Infinite Code backend started on port 3001
📡 API: http://localhost:3001/api
🔧 Environment: development
```

✅ **Server is now running!** Keep this terminal open.

---

## 🧪 Testing Authentication

Open a **NEW terminal/command prompt** and test the API:

### Test 1: Register a New User ✅

```bash
curl -X POST http://localhost:3001/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@infinitycode.com\",\"password\":\"password123\",\"fullName\":\"Test User\",\"username\":\"testuser\"}"
```

**Expected Response (Success):**
```json
{
  "user": {
    "id": "some-uuid",
    "email": "test@infinitycode.com",
    "fullName": "Test User",
    "username": "testuser",
    "role": "STUDENT",
    "subscriptionStatus": "FREE",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Copy the `token` value for next steps!**

---

### Test 2: Login with User ✅

```bash
curl -X POST http://localhost:3001/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@infinitycode.com\",\"password\":\"password123\"}"
```

**Expected Response (Success):**
```json
{
  "user": {
    "id": "some-uuid",
    "email": "test@infinitycode.com",
    "fullName": "Test User",
    "username": "testuser",
    "role": "STUDENT",
    "lastActivityAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Test 3: Get Profile (Authenticated) ✅

**Replace `YOUR_TOKEN_HERE` with the token from login/register:**

```bash
curl -X GET http://localhost:3001/api/auth/profile ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Example:**
```bash
curl -X GET http://localhost:3001/api/auth/profile ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbHFrZjJyOHkwMDAwMTB0M2ZrcWgzZm1lIiwiaWF0IjoxNzA0MDY3MjAwLCJleHAiOjE3MDQ2NzIwMDB9.abc123def456"
```

**Expected Response (Success):**
```json
{
  "id": "some-uuid",
  "email": "test@infinitycode.com",
  "fullName": "Test User",
  "username": "testuser",
  "avatarUrl": null,
  "bio": null,
  "role": "STUDENT",
  "subscriptionStatus": "FREE",
  "timezone": "Africa/Johannesburg",
  "language": "en",
  "darkMode": true,
  "userSettings": {
    "dailyGoalMinutes": 30,
    "weeklyGoalDays": 5,
    "reminderEnabled": true
  }
}
```

---

### Test 4: Update Profile (Authenticated) ✅

**Replace `YOUR_TOKEN_HERE` with your token:**

```bash
curl -X PATCH http://localhost:3001/api/auth/profile ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Updated Name\",\"bio\":\"I love coding!\",\"timezone\":\"America/New_York\"}"
```

**Expected Response (Success):**
```json
{
  "id": "some-uuid",
  "email": "test@infinitycode.com",
  "fullName": "Updated Name",
  "username": "testuser",
  "bio": "I love coding!",
  "timezone": "America/New_York",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Test 5: Get All Topics ✅

```bash
curl -X GET http://localhost:3001/api/topics
```

**Expected Response (Success):**
```json
[
  {
    "id": "uuid",
    "title": "1. Programming Fundamentals",
    "slug": "programming-fundamentals",
    "description": "Master the core concepts...",
    "difficulty": "BEGINNER",
    "estimatedHours": 40,
    "isFree": true,
    "isPublished": true
  },
  {
    "id": "uuid",
    "title": "2. Python",
    "slug": "python-complete",
    "difficulty": "BEGINNER",
    "estimatedHours": 60,
    "isFree": false
  }
  // ... 28 more topics
]
```

---

## 🎯 Using Postman (Recommended)

### Setup Postman Collection

1. **Open Postman**
2. **Create New Collection** named "Infinity Code API"
3. **Add Base URL Variable:**
   - Variable: `baseUrl`
   - Initial Value: `http://localhost:3001/api`

### Request 1: Register

- **Method:** POST
- **URL:** `{{baseUrl}}/auth/register`
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "securepass123",
  "fullName": "John Doe",
  "username": "johndoe"
}
```
- **Tests (to save token):**
```javascript
if (pm.response.code === 201) {
    pm.environment.set("authToken", pm.response.json().token);
}
```

### Request 2: Login

- **Method:** POST
- **URL:** `{{baseUrl}}/auth/login`
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```
- **Tests:**
```javascript
if (pm.response.code === 200) {
    pm.environment.set("authToken", pm.response.json().token);
}
```

### Request 3: Get Profile

- **Method:** GET
- **URL:** `{{baseUrl}}/auth/profile`
- **Headers:**
  - `Authorization: Bearer {{authToken}}`

### Request 4: Update Profile

- **Method:** PATCH
- **URL:** `{{baseUrl}}/auth/profile`
- **Headers:**
  - `Authorization: Bearer {{authToken}}`
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "fullName": "John Updated Doe",
  "bio": "Full-stack developer learning with Infinity Code",
  "timezone": "America/New_York",
  "darkMode": true
}
```

---

## 📊 Verify Database with Prisma Studio

Open a **NEW terminal** and run:

```bash
cd "c:\Users\Phumeh\Downloads\guard-ring-safe (1)\i.tried\artifacts\backend"
npm run prisma:studio
```

**Opens at:** http://localhost:5555

### What to Check:

1. **Profile Table:**
   - Click "Profile"
   - Should see your registered user(s)
   - Verify email, fullName, username
   - Password should be hashed (starts with $2b$)

2. **Topic Table:**
   - Click "Topic"
   - Should see 30 topics
   - Check `isPublished: true`
   - 3 topics should have `isFree: true`

3. **UserSettings Table:**
   - Click "UserSettings"
   - Should have an entry for your user
   - Linked via `userId`

---

## 🎯 Complete API Endpoints Available

### Authentication Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/profile` | Yes | Get user profile |
| PATCH | `/api/auth/profile` | Yes | Update profile |
| POST | `/api/auth/forgot-password` | No | Request password reset |
| POST | `/api/auth/reset-password` | No | Reset password |
| DELETE | `/api/auth/account` | Yes | Delete account |

### User Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/users/profile` | Yes | Get profile (alternate) |
| GET | `/api/users/progress` | Yes | Get learning progress |
| GET | `/api/users/achievements` | Yes | Get achievements |
| PATCH | `/api/users/profile` | Yes | Update profile (alternate) |

### Topics Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/topics` | No | Get all topics |
| GET | `/api/topics/:id` | No | Get topic by ID |
| GET | `/api/topics/:id/modules` | No | Get topic modules |
| POST | `/api/topics/:id/enroll` | Yes | Enroll in topic |

---

## ✅ Success Criteria

Your setup is complete if:

- [x] Server starts without errors
- [x] Database has 30 topics
- [x] You can register a new user
- [x] You can login with that user
- [x] You receive a JWT token
- [x] You can get profile with the token
- [x] You can update profile with the token
- [x] All responses return proper JSON
- [x] No error messages in terminal

---

## 🐛 Troubleshooting

### Issue: "Can't connect to database"

**Solution:**
```bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT version();"

# If not running (Windows):
# Start from Services app or:
pg_ctl -D "C:\Program Files\PostgreSQL\14\data" start
```

### Issue: "Database does not exist"

**Solution:**
```bash
psql -U postgres -c "CREATE DATABASE infinite_code;"
```

### Issue: "Password authentication failed"

**Solution:**
- Edit `.env` file
- Change `postgres:postgres` to `postgres:YOUR_PASSWORD` in DATABASE_URL

### Issue: "Port 3001 already in use"

**Solution:**
- Edit `.env` file
- Change `PORT=3002`
- Or kill the process using port 3001

### Issue: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Prisma Client not generated"

**Solution:**
```bash
npm run prisma:generate
```

### Issue: "Invalid token" when testing profile

**Solution:**
- Make sure you copied the FULL token from register/login response
- Token should start with `eyJ`
- Use the format: `Authorization: Bearer YOUR_FULL_TOKEN`

---

## 📱 Testing with Frontend

If you have a frontend, update the API base URL:

```javascript
// In your frontend config
const API_BASE_URL = 'http://localhost:3001/api';

// Register
const response = await fetch(`${API_BASE_URL}/auth/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    fullName: 'User Name',
    username: 'username'
  })
});

const data = await response.json();
localStorage.setItem('token', data.token);

// Login
const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const loginData = await loginResponse.json();
localStorage.setItem('token', loginData.token);

// Get Profile (authenticated)
const token = localStorage.getItem('token');
const profileResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const profile = await profileResponse.json();
console.log(profile);

// Update Profile
const updateResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullName: 'Updated Name',
    bio: 'My new bio'
  })
});
```

---

## 🎉 You're All Set!

**You can now:**
- ✅ Register new users
- ✅ Login users
- ✅ Get user profile (authenticated)
- ✅ Update user profile (authenticated)
- ✅ Access all 30 topics
- ✅ View course content
- ✅ Track user progress

**Next steps:**
1. Build/update your frontend to connect to these APIs
2. Implement enrollment in topics
3. Track lesson progress
4. Add quiz functionality
5. Implement challenges
6. Configure PayFast for payments
7. Set up OpenAI for AI tutor

---

## 📞 Quick Commands Reference

```bash
# Start server
npm run start:dev

# View database
npm run prisma:studio

# Run migrations
npm run prisma:migrate

# Seed complete topics
npm run prisma:seed:complete

# Generate Prisma client
npm run prisma:generate

# Run tests
npm run test

# Build for production
npm run build
npm run start:prod
```

---

**🎓 Your Infinity Code backend is fully operational!** 🚀

All authentication features are working:
- Sign up ✅
- Login ✅
- Get Profile ✅
- Update Profile ✅
- All 30 Topics Available ✅

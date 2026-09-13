# Level-Based Progression System - API Documentation

## Base URL
```
Development: http://localhost:3000
Production: [Your production URL]
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 📋 Table of Contents

1. [Authentication Endpoints](#authentication-endpoints)
2. [Onboarding Endpoints](#onboarding-endpoints)
3. [Progression Endpoints](#progression-endpoints)
4. [Curriculum Endpoints](#curriculum-endpoints)
5. [Admin Endpoints](#admin-endpoints)
6. [Error Responses](#error-responses)

---

## Authentication Endpoints

### Register New User
Creates a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "STUDENT",
    "proficiencyLevel": null,
    "totalXp": 0,
    "xp": 0
  },
  "token": "jwt.token.here",
  "requiresOnboarding": true
}
```

**Notes:**
- New users have `proficiencyLevel: null`
- `requiresOnboarding: true` indicates they need to take the quiz
- Token is valid for authentication immediately

---

### Login
Authenticates existing user.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "STUDENT",
    "proficiencyLevel": "INTERMEDIATE",
    "totalXp": 1500,
    "xp": 1500
  },
  "token": "jwt.token.here",
  "level": "INTERMEDIATE",
  "requiresOnboarding": false
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid credentials
- `400 Bad Request` - Missing email or password

---

## Onboarding Endpoints

### Get Quiz Questions
Retrieves randomized quiz questions for level assessment.

**Endpoint:** `GET /api/onboarding/quiz`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "questions": [
    {
      "id": "uuid",
      "questionText": "What is a variable in programming?",
      "options": {
        "A": "A container for storing data values",
        "B": "A function that returns values",
        "C": "A loop structure",
        "D": "A conditional statement"
      }
    },
    // ... 6 more questions (7 total)
  ]
}
```

**Notes:**
- Questions are randomly selected from pool of 25
- Correct answers are NOT included in response
- Difficulty varies from 1-10
- Quiz can only be taken once per user (unless admin resets)

---

### Submit Quiz Answers
Submits quiz answers and receives level assignment.

**Endpoint:** `POST /api/onboarding/quiz/submit`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": "uuid-1",
      "selectedAnswer": "A"
    },
    {
      "questionId": "uuid-2",
      "selectedAnswer": "C"
    }
    // ... all 7 answers
  ]
}
```

**Response:** `200 OK`
```json
{
  "score": 65.5,
  "assignedLevel": "INTERMEDIATE",
  "correctAnswers": 5,
  "totalQuestions": 7
}
```

**Level Assignment:**
- `0-39%` → BEGINNER
- `40-74%` → INTERMEDIATE
- `75-100%` → EXPERT

**Notes:**
- Processing time < 500ms
- Score is weighted by question difficulty
- User's `proficiencyLevel` is updated automatically
- `onboardingCompleted` flag is set to `true`

**Error Responses:**
- `400 Bad Request` - Missing or invalid answers
- `401 Unauthorized` - Invalid or missing token

---

## Progression Endpoints

### Get Level Status
Retrieves current level, XP, and progression information.

**Endpoint:** `GET /api/user/level-status`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "currentLevel": "INTERMEDIATE",
  "totalXp": 2500,
  "completionRate": 0.65,
  "progressionEligible": false,
  "nextLevel": {
    "level": "EXPERT",
    "requiredXp": 5000,
    "requiredCompletionRate": 0.70,
    "currentXp": 2500,
    "currentCompletionRate": 0.65
  }
}
```

**For EXPERT level:**
```json
{
  "currentLevel": "EXPERT",
  "totalXp": 8500,
  "completionRate": 0.85,
  "progressionEligible": false,
  "nextLevel": null
}
```

**Notes:**
- `completionRate` is percentage of lessons completed at current level (0-1)
- `progressionEligible` indicates if user can advance immediately
- `nextLevel` is `null` for EXPERT users

---

### Check Progression Eligibility
Checks if user meets criteria to advance to next level.

**Endpoint:** `POST /api/level/check-progression`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "eligible": true,
  "nextLevel": "INTERMEDIATE",
  "criteria": {
    "xpMet": true,
    "completionRateMet": true
  }
}
```

**Progression Criteria:**

| From | To | XP Required | Completion Rate |
|------|-------|-------------|-----------------|
| BEGINNER | INTERMEDIATE | 1,000 | 80% |
| INTERMEDIATE | EXPERT | 5,000 | 70% |

**Notes:**
- Both XP and completion rate must be met
- User's `progressionEligible` flag is updated
- Rate limited to 10 requests per minute

---

### Advance to Next Level
Advances user to next level if eligible.

**Endpoint:** `POST /api/level/advance`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "newLevel": "INTERMEDIATE",
  "unlockedFeatures": [
    "Two-panel workspace with lessons list and code editor",
    "Split view with editor and output console",
    "Access to intermediate-level challenges",
    "Flexible lesson navigation",
    "Standard development tools and autocomplete"
  ],
  "message": "Congratulations! You've advanced to INTERMEDIATE level!"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "User does not meet progression criteria"
}
```

**Notes:**
- Transaction is atomic (all-or-nothing)
- Progression history is logged
- User's JWT should be refreshed after advancement
- Processing time < 1 second

---

## Curriculum Endpoints

### Get Curriculum by Level
Retrieves lessons and challenges filtered by proficiency level.

**Endpoint:** `GET /api/curriculum/:level`

**Path Parameters:**
- `level` - `beginner`, `intermediate`, or `expert`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "lessons": [
    {
      "id": "uuid",
      "title": "Introduction to Variables",
      "description": "Learn about variables and how to use them...",
      "difficulty": "BEGINNER",
      "xpReward": 50,
      "duration": 30,
      "orderIndex": 1,
      "completed": false
    },
    // ... more lessons
  ],
  "challenges": [
    {
      "id": "uuid",
      "title": "Variable Declaration Challenge",
      "difficulty": "BEGINNER",
      "xpReward": 75,
      "completed": false
    },
    // ... more challenges
  ]
}
```

**Access Rules:**
- BEGINNER users: Only BEGINNER content
- INTERMEDIATE users: BEGINNER + INTERMEDIATE content
- EXPERT users: All content

**Error Responses:**
- `403 Forbidden` - User level insufficient for requested content
- `401 Unauthorized` - Invalid or missing token

---

### Get Lesson by ID
Retrieves detailed lesson content.

**Endpoint:** `GET /api/curriculum/lesson/:id`

**Path Parameters:**
- `id` - Lesson UUID

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "title": "Introduction to Variables",
  "content": "<full lesson content in markdown/html>",
  "difficulty": "BEGINNER",
  "xpReward": 50,
  "hints": [
    "Variables are containers for storing data",
    "Use 'let' or 'const' to declare variables"
  ],
  "nextLessonId": "uuid-2",
  "previousLessonId": null
}
```

**Notes:**
- Backend verifies user's level permits access
- `hints` array may be empty for expert content
- `nextLessonId` and `previousLessonId` enable sequential navigation

**Error Responses:**
- `403 Forbidden` - Lesson difficulty exceeds user level
- `404 Not Found` - Lesson doesn't exist

---

### Mark Lesson as Complete
Marks a lesson as completed and awards XP.

**Endpoint:** `POST /api/curriculum/lesson/:id/complete`

**Path Parameters:**
- `id` - Lesson UUID

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "xpEarned": 50,
  "totalXp": 1050
}
```

**If already completed:**
```json
{
  "xpEarned": 0,
  "totalXp": 1050
}
```

**Notes:**
- XP is only awarded once per lesson
- User's `totalXp` is updated automatically
- Completion rate is recalculated
- Progression eligibility is checked automatically

---

## Admin Endpoints

### Get User Level Information
Retrieves detailed level information for a specific user.

**Endpoint:** `GET /api/admin/users/:userId/level`

**Path Parameters:**
- `userId` - User UUID

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "proficiencyLevel": "INTERMEDIATE",
    "totalXp": 2500,
    "completionRate": 0.65,
    "progressionEligible": false,
    "onboardingCompleted": true,
    "createdAt": "2026-09-01T10:00:00Z"
  },
  "progressionHistory": [
    {
      "id": "uuid",
      "previousLevel": "BEGINNER",
      "newLevel": "INTERMEDIATE",
      "xpAtProgression": 1200,
      "completionRateAtProgression": 0.85,
      "progressedAt": "2026-09-10T15:30:00Z"
    }
  ]
}
```

**Error Responses:**
- `403 Forbidden` - Non-admin user
- `404 Not Found` - User doesn't exist

---

### Update User Level (Admin Override)
Manually changes a user's proficiency level.

**Endpoint:** `PUT /api/admin/users/:userId/level`

**Path Parameters:**
- `userId` - User UUID

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "newLevel": "EXPERT",
  "reason": "User demonstrated exceptional skill in external assessment"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "userId": "uuid",
  "previousLevel": "INTERMEDIATE",
  "newLevel": "EXPERT"
}
```

**Notes:**
- Reason is required for audit purposes
- Change is logged to progression history
- Admin action is logged to console with admin ID
- Optional email notification can be sent to user

**Error Responses:**
- `403 Forbidden` - Non-admin user
- `400 Bad Request` - Invalid level or missing reason

---

### Get Level Statistics
Retrieves system-wide statistics about user levels.

**Endpoint:** `GET /api/admin/statistics/levels`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:** `200 OK`
```json
{
  "usersByLevel": {
    "BEGINNER": 1250,
    "INTERMEDIATE": 450,
    "EXPERT": 75
  },
  "averageProgressionTimes": {
    "beginnerToIntermediate": 15.3,
    "intermediateToExpert": 42.7
  },
  "quizScoreDistribution": [
    { "scoreRange": "0-20%", "count": 45 },
    { "scoreRange": "20-40%", "count": 320 },
    { "scoreRange": "40-60%", "count": 580 },
    { "scoreRange": "60-75%", "count": 450 },
    { "scoreRange": "75-100%", "count": 380 }
  ]
}
```

**Notes:**
- Progression times are in days (average)
- Data is cached for 5 minutes
- Statistics updated in real-time

---

### Search Users
Searches for users by email or name.

**Endpoint:** `GET /api/admin/users/search`

**Query Parameters:**
- `q` - Search query (email or name)

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Example:**
```
GET /api/admin/users/search?q=john
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "proficiencyLevel": "INTERMEDIATE",
    "totalXp": 2500,
    "completionRate": 0.65
  },
  {
    "id": "uuid-2",
    "email": "john.smith@example.com",
    "name": "John Smith",
    "proficiencyLevel": "BEGINNER",
    "totalXp": 450,
    "completionRate": 0.35
  }
]
```

**Notes:**
- Returns maximum 20 results
- Case-insensitive search
- Searches both email and name fields

---

### Rollback User Progression
Reverts user to their previous proficiency level.

**Endpoint:** `POST /api/admin/users/:userId/rollback`

**Path Parameters:**
- `userId` - User UUID

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Rolled back to INTERMEDIATE level"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "No progression history found for this user"
}
```

**Notes:**
- Reverts to most recent progression history entry
- Admin action is logged
- User should re-authenticate to get updated token

---

## Error Responses

### Standard Error Format
```json
{
  "statusCode": 400,
  "message": "Descriptive error message",
  "error": "Bad Request"
}
```

### Common Status Codes

#### 400 Bad Request
- Missing required fields
- Invalid data format
- Business logic validation failure

#### 401 Unauthorized
- Missing authentication token
- Invalid or expired token
- User not found

#### 403 Forbidden
- Insufficient level for content
- Admin access required
- Content locked for user level

Example:
```json
{
  "statusCode": 403,
  "error": "Insufficient level",
  "requiredLevel": "INTERMEDIATE",
  "currentLevel": "BEGINNER",
  "message": "This content requires INTERMEDIATE level access"
}
```

#### 404 Not Found
- Resource doesn't exist
- Invalid ID

#### 429 Too Many Requests
- Rate limit exceeded
- Try again later

#### 500 Internal Server Error
- Unexpected server error
- Database connection failure

---

## Rate Limiting

### Global Rate Limits
- 100 requests per minute per IP
- 1000 requests per hour per IP

### Endpoint-Specific Limits
- `/api/level/check-progression`: 10 requests/minute
- `/api/onboarding/quiz`: 3 requests/hour
- Admin endpoints: 200 requests/minute

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Webhooks (Future Feature)

Planned webhook events:
- `user.level.changed` - When user level advances
- `user.completed.lesson` - When lesson is completed
- `user.quiz.completed` - When onboarding quiz is finished

---

## Changelog

### v1.0.0 (2026-09-13)
- Initial release
- 13 endpoints implemented
- Three-tier level system
- Admin dashboard support
- Quiz system with 25 questions

---

## Support

For API issues or questions:
- Check this documentation
- Review error responses
- Contact support team

**API Version:** 1.0.0  
**Last Updated:** September 13, 2026

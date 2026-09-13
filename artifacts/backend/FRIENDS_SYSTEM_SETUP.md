# Friends System - Backend Setup Guide

## 🚀 Quick Start

### 1. Run Database Migration

```bash
cd artifacts/backend

# Generate Prisma client with new models
npx prisma generate

# Run the migration
npx prisma migrate dev --name add_friends_system

# Or apply the migration manually
npx prisma db push
```

### 2. Add Usernames to Existing Users

```bash
# Run the username migration script
npm run ts-node scripts/add-usernames.ts

# Or manually with npx
npx ts-node scripts/add-usernames.ts
```

### 3. Restart the Backend Server

```bash
npm run start:dev
```

## 📁 Files Created

### Controllers & Services
- ✅ `src/friends/friends.module.ts` - Friends module
- ✅ `src/friends/friends.controller.ts` - Friends API endpoints
- ✅ `src/friends/friends.service.ts` - Friends business logic
- ✅ `src/users/users.module.ts` - Users module
- ✅ `src/users/users.controller.ts` - User search & profile endpoints

### Middleware
- ✅ `src/middleware/online-status.middleware.ts` - Updates user online status

### Database
- ✅ `prisma/schema.prisma` - Updated with FriendRequest & Friendship models
- ✅ `prisma/migrations/add_friends_system/migration.sql` - Migration file
- ✅ `scripts/add-usernames.ts` - Script to add usernames to existing users

### Configuration
- ✅ `src/app.module.ts` - Registered FriendsModule and UsersModule

## 🔌 API Endpoints

All endpoints are now available at `http://localhost:3000/api`:

### Friends Management
- `GET /api/friends` - Get friends list, pending requests, and received requests
- `POST /api/friends/request` - Send friend request
- `POST /api/friends/accept/:requestId` - Accept friend request
- `POST /api/friends/reject/:requestId` - Reject friend request
- `DELETE /api/friends/:friendId` - Remove friend

### User Search & Profile
- `GET /api/users/search?q={query}` - Search users by username
- `GET /api/users/profile/:username` - Get user profile (public, no auth required)

### Authentication (Updated)
- `POST /api/auth/register` - Now accepts `username` and `inviteUsername` fields
- `POST /api/auth/login` - Now sets user online status

## 🗄️ Database Schema Changes

### User Model Updates
```prisma
model User {
  // ... existing fields
  
  // New fields for friends system
  username              String          @unique
  displayName           String?
  lastSeenAt            DateTime?
  isOnline              Boolean         @default(false)
  
  // Relations
  sentFriendRequests     FriendRequest[] @relation("SentRequests")
  receivedFriendRequests FriendRequest[] @relation("ReceivedRequests")
  friendshipsAsUser1     Friendship[]    @relation("FriendshipsAsUser1")
  friendshipsAsUser2     Friendship[]    @relation("FriendshipsAsUser2")
}
```

### New Models
```prisma
model FriendRequest {
  id            String   @id @default(uuid())
  senderId      String
  receiverId    String
  status        String   @default("PENDING")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  sender        User     @relation("SentRequests")
  receiver      User     @relation("ReceivedRequests")
}

model Friendship {
  id            String   @id @default(uuid())
  user1Id       String
  user2Id       String
  createdAt     DateTime @default(now())
  
  user1         User     @relation("FriendshipsAsUser1")
  user2         User     @relation("FriendshipsAsUser2")
}
```

## 🧪 Testing the API

### 1. Register with Invite
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "fullName": "Test User",
    "username": "testuser",
    "inviteUsername": "phumeh"
  }'
```

### 2. Get Friends List
```bash
curl -X GET http://localhost:3000/api/friends \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Search Users
```bash
curl -X GET "http://localhost:3000/api/users/search?q=test" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Send Friend Request
```bash
curl -X POST http://localhost:3000/api/friends/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "targetUserId": "user-id-here"
  }'
```

### 5. Accept Friend Request
```bash
curl -X POST http://localhost:3000/api/friends/accept/request-id \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6. Get User Profile
```bash
curl -X GET http://localhost:3000/api/users/profile/phumeh
```

## 🔧 Configuration Notes

### Online Status Logic
- User is considered **online** if `lastSeenAt` is within last 5 minutes
- `lastSeenAt` is updated on every authenticated request
- `isOnline` flag is set to `true` on login, updated via middleware

### Username Generation
- If username not provided during registration, generated from email prefix
- Invalid characters removed (only a-z, 0-9, underscore allowed)
- Random number appended if username already exists
- Must be unique across all users

### Friend Request Rules
- Cannot send request to yourself
- Cannot send duplicate requests
- Cannot send request if already friends
- Receiver must accept request to become friends
- Request can be rejected without blocking future requests

### Friendship Model
- Bidirectional: stored once but accessible from both users
- Deleting friendship removes it for both users
- No "follower" concept - must be mutual friends

## 🐛 Troubleshooting

### "Column 'username' does not exist"
**Solution**: Run the migration
```bash
npx prisma migrate dev
# or
npx prisma db push
```

### "Username already taken"
**Solution**: This is expected - user must choose a different username

### Existing users have no username
**Solution**: Run the username migration script
```bash
npx ts-node scripts/add-usernames.ts
```

### Users not showing as online
**Solution**: Make sure middleware is applied to routes. The online status middleware should update `lastSeenAt` on each request.

### Friend request not created on signup with invite
**Solution**: Check that:
- The `inviteUsername` exists in database
- The username is correct (case-insensitive)
- Database has proper foreign key constraints

## 📊 Database Queries

### Find all friends for a user
```sql
SELECT * FROM Friendship 
WHERE user1Id = 'user-id' OR user2Id = 'user-id';
```

### Find pending friend requests
```sql
SELECT * FROM FriendRequest 
WHERE receiverId = 'user-id' AND status = 'PENDING';
```

### Count friends
```sql
SELECT COUNT(*) FROM Friendship 
WHERE user1Id = 'user-id' OR user2Id = 'user-id';
```

## 🎯 Next Steps

1. ✅ Frontend is already implemented and ready
2. ✅ Backend API is complete
3. ⏳ Run migrations to update database
4. ⏳ Test the endpoints
5. ⏳ Optional: Add WebSocket for real-time online status
6. ⏳ Optional: Add friend activity feed
7. ⏳ Optional: Add notifications for friend requests

## 🚨 Important Notes

- **JWT Token**: Make sure your JWT includes `userId` in the payload
- **Guards**: All friend endpoints require `JwtAuthGuard` authentication
- **Validation**: Input validation handled by DTOs with class-validator
- **Error Handling**: Proper HTTP exceptions thrown for all edge cases
- **Performance**: Indexes added for efficient queries on username, online status

## 📝 Environment Variables

No new environment variables required. The system uses existing:
- `DATABASE_URL` - Your database connection string
- `JWT_SECRET` - For token generation (already configured)

## ✅ Verification Checklist

- [ ] Prisma schema updated with new models
- [ ] Migration applied successfully
- [ ] Existing users have usernames
- [ ] Backend server restarted
- [ ] Can register with invite parameter
- [ ] Can search for users
- [ ] Can send friend requests
- [ ] Can accept/reject requests
- [ ] Can view friends list with online status
- [ ] Can remove friends
- [ ] Frontend `/friends` page works
- [ ] Frontend `/invite/:username` page works

All set! The friends system is ready to use. 🎉

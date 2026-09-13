# Friends System API Documentation

This document outlines the API endpoints needed for the friends system in Infinity Code.

## Required Endpoints

### 1. Get Friends List
```
GET /api/friends
Authorization: Bearer {token}
```

**Response:**
```json
{
  "friends": [
    {
      "id": "user-id",
      "username": "phumeh",
      "displayName": "Phumeh Lehata",
      "level": "INTERMEDIATE",
      "xp": 2500,
      "online": true,
      "lastSeen": "2 minutes ago"
    }
  ],
  "pending": [
    {
      "id": "request-id",
      "username": "alice",
      "displayName": "Alice Smith",
      "level": "BEGINNER",
      "xp": 500
    }
  ],
  "received": [
    {
      "id": "request-id",
      "username": "bob",
      "displayName": "Bob Johnson",
      "level": "EXPERT",
      "xp": 8000
    }
  ]
}
```

### 2. Search Users
```
GET /api/users/search?q={searchQuery}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "users": [
    {
      "id": "user-id",
      "username": "searchresult",
      "displayName": "Search Result",
      "level": "BEGINNER",
      "xp": 100
    }
  ]
}
```

### 3. Get User Profile (for invite page)
```
GET /api/users/profile/{username}
```

**Response:**
```json
{
  "id": "user-id",
  "username": "phumeh",
  "displayName": "Phumeh Lehata",
  "level": "INTERMEDIATE",
  "xp": 2500,
  "bio": "Learning to code one project at a time"
}
```

### 4. Send Friend Request
```
POST /api/friends/request
Authorization: Bearer {token}
Content-Type: application/json

{
  "targetUserId": "user-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Friend request sent"
}
```

### 5. Accept Friend Request
```
POST /api/friends/accept/{requestId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Friend request accepted"
}
```

### 6. Reject Friend Request
```
POST /api/friends/reject/{requestId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Friend request rejected"
}
```

### 7. Remove Friend
```
DELETE /api/friends/{friendId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Friend removed"
}
```

## Database Schema

### FriendRequest Table
```prisma
model FriendRequest {
  id            String   @id @default(cuid())
  senderId      String
  receiverId    String
  status        String   // 'pending', 'accepted', 'rejected'
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  sender        User     @relation("SentRequests", fields: [senderId], references: [id])
  receiver      User     @relation("ReceivedRequests", fields: [receiverId], references: [id])
  
  @@unique([senderId, receiverId])
  @@index([receiverId, status])
}
```

### Friendship Table
```prisma
model Friendship {
  id            String   @id @default(cuid())
  user1Id       String
  user2Id       String
  createdAt     DateTime @default(now())
  
  user1         User     @relation("FriendshipsAsUser1", fields: [user1Id], references: [id])
  user2         User     @relation("FriendshipsAsUser2", fields: [user2Id], references: [id])
  
  @@unique([user1Id, user2Id])
  @@index([user1Id])
  @@index([user2Id])
}
```

### User Updates
```prisma
model User {
  // ... existing fields
  
  sentRequests      FriendRequest[] @relation("SentRequests")
  receivedRequests  FriendRequest[] @relation("ReceivedRequests")
  friendshipsAsUser1 Friendship[]   @relation("FriendshipsAsUser1")
  friendshipsAsUser2 Friendship[]   @relation("FriendshipsAsUser2")
  lastSeenAt        DateTime?
  isOnline          Boolean         @default(false)
}
```

## Online Status Implementation

### Update Online Status
When a user logs in or performs any action:
```typescript
await prisma.user.update({
  where: { id: userId },
  data: {
    isOnline: true,
    lastSeenAt: new Date()
  }
});
```

### Check if User is Online
```typescript
const isOnline = (lastSeenAt: Date) => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return lastSeenAt > fiveMinutesAgo;
};
```

### Format Last Seen
```typescript
const formatLastSeen = (lastSeenAt: Date) => {
  const now = Date.now();
  const diff = now - lastSeenAt.getTime();
  
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  return lastSeenAt.toLocaleDateString();
};
```

## Implementation Notes

1. **Deep Linking**: The `/invite/:username` route should:
   - Check if user is authenticated
   - If yes, navigate to `/profile/:username` automatically
   - If no, show the invite landing page with install CTA

2. **Friend Request Logic**:
   - Users cannot send duplicate requests
   - Users cannot send requests to themselves
   - When a request is accepted, create a Friendship record and delete the FriendRequest

3. **Friends List**: When fetching friends, combine both:
   - Friendships where the user is user1
   - Friendships where the user is user2

4. **Search**: Search should:
   - Match username (exact or partial)
   - Exclude the current user from results
   - Show if users are already friends or have pending requests

5. **Online Status**: 
   - Update `lastSeenAt` on every API request via middleware
   - Set `isOnline = true` on login
   - Set `isOnline = false` on logout
   - Consider user online if `lastSeenAt` is within last 5 minutes

-- Add friends system fields to User table
ALTER TABLE User ADD COLUMN username TEXT NOT NULL DEFAULT '';
ALTER TABLE User ADD COLUMN displayName TEXT;
ALTER TABLE User ADD COLUMN lastSeenAt DATETIME;
ALTER TABLE User ADD COLUMN isOnline INTEGER NOT NULL DEFAULT 0;

-- Create unique index on username
CREATE UNIQUE INDEX User_username_key ON User(username);
CREATE INDEX User_isOnline_idx ON User(isOnline);

-- Update existing users to have usernames (from email prefix)
UPDATE User SET username = LOWER(SUBSTR(email, 1, INSTR(email, '@') - 1)) WHERE username = '';

-- Create FriendRequest table
CREATE TABLE "FriendRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FriendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FriendRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create unique constraint and indexes for FriendRequest
CREATE UNIQUE INDEX "FriendRequest_senderId_receiverId_key" ON "FriendRequest"("senderId", "receiverId");
CREATE INDEX "FriendRequest_receiverId_status_idx" ON "FriendRequest"("receiverId", "status");
CREATE INDEX "FriendRequest_senderId_idx" ON "FriendRequest"("senderId");

-- Create Friendship table
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Friendship_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Friendship_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create unique constraint and indexes for Friendship
CREATE UNIQUE INDEX "Friendship_user1Id_user2Id_key" ON "Friendship"("user1Id", "user2Id");
CREATE INDEX "Friendship_user1Id_idx" ON "Friendship"("user1Id");
CREATE INDEX "Friendship_user2Id_idx" ON "Friendship"("user2Id");

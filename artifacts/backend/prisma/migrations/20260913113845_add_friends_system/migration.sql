/*
  Warnings:

  - You are about to alter the column `isOnline` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "avatar" TEXT,
    "bio" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "proficiencyLevel" TEXT,
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "completionRate" REAL NOT NULL DEFAULT 0.0,
    "progressionEligible" BOOLEAN NOT NULL DEFAULT false,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "levelSystemMigrated" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "displayName" TEXT,
    "lastSeenAt" DATETIME,
    "isOnline" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("avatar", "bio", "completionRate", "createdAt", "displayName", "email", "id", "isActive", "isEmailVerified", "isOnline", "lastActiveAt", "lastSeenAt", "level", "levelSystemMigrated", "name", "onboardingCompleted", "password", "proficiencyLevel", "progressionEligible", "role", "streak", "totalXp", "updatedAt", "username", "xp") SELECT "avatar", "bio", "completionRate", "createdAt", "displayName", "email", "id", "isActive", "isEmailVerified", "isOnline", "lastActiveAt", "lastSeenAt", "level", "levelSystemMigrated", "name", "onboardingCompleted", "password", "proficiencyLevel", "progressionEligible", "role", "streak", "totalXp", "updatedAt", "username", "xp" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE INDEX "User_proficiencyLevel_idx" ON "User"("proficiencyLevel");
CREATE INDEX "User_username_idx" ON "User"("username");
CREATE INDEX "User_isOnline_idx" ON "User"("isOnline");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

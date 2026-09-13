/**
 * Script to add usernames to existing users
 * Run: npm run ts-node scripts/add-usernames.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addUsernames() {
  console.log('Adding usernames to existing users...');

  const users = await prisma.user.findMany();

  console.log(`Found ${users.length} total users`);

  let updated = 0;

  for (const user of users) {
    try {
      // Skip if user already has username
      if (user.username && user.username !== '') {
        continue;
      }

      // Generate username from email
      const emailPrefix = user.email!.split('@')[0]!.toLowerCase().replace(/[^a-z0-9]/g, '');
      let username = emailPrefix;

      // Check if username exists
      const existing = await prisma.user.findUnique({
        where: { username },
      });

      if (existing && existing.id !== user.id) {
        // Add random number if username exists
        username = `${emailPrefix}${Math.floor(Math.random() * 10000)}`;
      }

      // Update user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          username,
          displayName: user.name,
        },
      });

      updated++;
      console.log(`✓ Updated user ${user.email} with username: ${username}`);
    } catch (error) {
      console.error(`✗ Failed to update user ${user.email}:`, error);
    }
  }

  console.log(`Done! Updated ${updated} users.`);
}

addUsernames()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

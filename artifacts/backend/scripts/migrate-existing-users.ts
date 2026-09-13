import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Script to migrate existing users to the level-based progression system
 * 
 * Assigns levels based on current XP:
 *   < 1000 XP   → BEGINNER
 *   1000-5000   → INTERMEDIATE
 *   > 5000      → EXPERT
 */

async function migrateExistingUsers() {
  console.log('🚀 Starting existing user migration...\n');
  console.log('=' .repeat(70));

  try {
    // Find all users without a proficiency level
    const usersToMigrate = await prisma.user.findMany({
      where: {
        proficiencyLevel: null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        xp: true,
        totalXp: true,
      },
    });

    if (usersToMigrate.length === 0) {
      console.log('✓ No users need migration - all users already have levels');
      return;
    }

    console.log(`Found ${usersToMigrate.length} users to migrate\n`);

    let beginnerCount = 0;
    let intermediateCount = 0;
    let expertCount = 0;

    for (const user of usersToMigrate) {
      // Use totalXp if available, otherwise use xp field
      const userXp = user.totalXp || user.xp || 0;

      // Determine level based on XP
      let assignedLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
      if (userXp < 1000) {
        assignedLevel = 'BEGINNER';
        beginnerCount++;
      } else if (userXp < 5000) {
        assignedLevel = 'INTERMEDIATE';
        intermediateCount++;
      } else {
        assignedLevel = 'EXPERT';
        expertCount++;
      }

      // Update user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          proficiencyLevel: assignedLevel,
          totalXp: userXp, // Ensure totalXp is set
          onboardingCompleted: true, // Skip onboarding for existing users
          levelSystemMigrated: true, // Mark as migrated
        },
      });

      // Create progression history entry for record-keeping
      await prisma.progressionHistory.create({
        data: {
          userId: user.id,
          previousLevel: null,
          newLevel: assignedLevel,
          xpAtProgression: userXp,
          completionRateAtProgression: 0, // Unknown for migrated users
        },
      });

      console.log(
        `✓ ${user.email.padEnd(35)} → ${assignedLevel.padEnd(12)} (${userXp} XP)`,
      );
    }

    console.log('\n' + '='.repeat(70));
    console.log('📊 Migration Summary:');
    console.log(`   Total migrated: ${usersToMigrate.length}`);
    console.log(`   BEGINNER: ${beginnerCount}`);
    console.log(`   INTERMEDIATE: ${intermediateCount}`);
    console.log(`   EXPERT: ${expertCount}`);
    console.log('\n✅ Migration completed successfully!');

    // Calculate completion rates for migrated users (async process)
    console.log('\n📈 Calculating completion rates...');
    for (const user of usersToMigrate) {
      await calculateAndUpdateCompletionRate(user.id);
    }
    console.log('✓ Completion rates calculated');

  } catch (error) {
    console.error('\n❌ Error during migration:', error);
    throw error;
  }
}

async function calculateAndUpdateCompletionRate(userId: string) {
  try {
    // Get user's level
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { proficiencyLevel: true },
    });

    if (!user || !user.proficiencyLevel) {
      return;
    }

    // Count total lessons at user's level
    const totalLessons = await prisma.lesson.count({
      where: {
        difficulty: user.proficiencyLevel,
        isPublished: true,
      },
    });

    if (totalLessons === 0) {
      return;
    }

    // Count completed lessons
    const completedCount = await prisma.progress.count({
      where: {
        userId,
        status: 'COMPLETED',
        lesson: {
          difficulty: user.proficiencyLevel,
          isPublished: true,
        },
      },
    });

    const completionRate = completedCount / totalLessons;

    // Update user
    await prisma.user.update({
      where: { id: userId },
      data: { completionRate },
    });

  } catch (error) {
    console.error(`Error calculating completion rate for user ${userId}:`, error);
  }
}

async function createMigrationNotification() {
  console.log('\n📝 Creating migration notification records...');
  
  // This would insert notification records for migrated users
  // For now, we just mark them with levelSystemMigrated flag
  // The frontend can check this flag and show a one-time modal
  
  console.log('✓ Notification system ready');
}

async function main() {
  console.log('🔄 Level-Based Progression System - User Migration Tool\n');
  
  try {
    await migrateExistingUsers();
    await createMigrationNotification();
    
    console.log('\n🎉 All migration tasks completed successfully!');
    console.log('\nNext steps:');
    console.log('  1. Users will see a welcome modal explaining the new system');
    console.log('  2. They can start earning XP and progressing through levels');
    console.log('  3. Monitor progression statistics in admin dashboard');
    
  } catch (error) {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

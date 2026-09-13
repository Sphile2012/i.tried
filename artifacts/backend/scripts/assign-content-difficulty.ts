import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Script to assign difficulty levels to existing lessons and challenges
 * 
 * Assigns difficulty based on:
 * - Lesson order index (earlier = easier)
 * - Title keywords
 * - Topic complexity
 */

const BEGINNER_KEYWORDS = [
  'intro',
  'introduction',
  'basic',
  'fundamentals',
  'getting started',
  'hello',
  'first',
  'variables',
  'data types',
  'operators',
  'simple',
];

const INTERMEDIATE_KEYWORDS = [
  'functions',
  'classes',
  'objects',
  'loops',
  'arrays',
  'control flow',
  'conditionals',
  'methods',
  'scope',
];

const EXPERT_KEYWORDS = [
  'advanced',
  'optimization',
  'algorithms',
  'data structures',
  'patterns',
  'architecture',
  'performance',
  'complex',
  'pointers',
  'memory',
  'templates',
  'inheritance',
  'polymorphism',
];

function determineDifficulty(
  title: string,
  content: string,
  orderIndex: number,
): 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT' {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase().substring(0, 500);

  // Check for expert keywords
  const hasExpertKeywords = EXPERT_KEYWORDS.some(
    (keyword) => lowerTitle.includes(keyword) || lowerContent.includes(keyword),
  );
  if (hasExpertKeywords) {
    return 'EXPERT';
  }

  // Check for intermediate keywords
  const hasIntermediateKeywords = INTERMEDIATE_KEYWORDS.some(
    (keyword) => lowerTitle.includes(keyword) || lowerContent.includes(keyword),
  );
  if (hasIntermediateKeywords && orderIndex > 10) {
    return 'INTERMEDIATE';
  }

  // Check for beginner keywords
  const hasBeginnerKeywords = BEGINNER_KEYWORDS.some(
    (keyword) => lowerTitle.includes(keyword) || lowerContent.includes(keyword),
  );
  if (hasBeginnerKeywords || orderIndex <= 10) {
    return 'BEGINNER';
  }

  // Default assignment based on order
  if (orderIndex <= 20) {
    return 'BEGINNER';
  } else if (orderIndex <= 40) {
    return 'INTERMEDIATE';
  } else {
    return 'EXPERT';
  }
}

function assignXpReward(difficulty: string): number {
  switch (difficulty) {
    case 'BEGINNER':
      return 50;
    case 'INTERMEDIATE':
      return 100;
    case 'EXPERT':
      return 200;
    default:
      return 50;
  }
}

async function assignLessonDifficulties() {
  console.log('🎯 Assigning difficulty levels to lessons...\n');

  const lessons = await prisma.lesson.findMany({
    orderBy: { orderIndex: 'asc' },
  });

  console.log(`Found ${lessons.length} lessons to process`);

  let beginnerCount = 0;
  let intermediateCount = 0;
  let expertCount = 0;

  for (const lesson of lessons) {
    const difficulty = determineDifficulty(
      lesson.title,
      lesson.content,
      lesson.orderIndex,
    );

    const xpReward = assignXpReward(difficulty);

    await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        difficulty,
        xpReward,
      },
    });

    if (difficulty === 'BEGINNER') beginnerCount++;
    else if (difficulty === 'INTERMEDIATE') intermediateCount++;
    else expertCount++;

    console.log(
      `✓ ${lesson.title.substring(0, 40).padEnd(42)} → ${difficulty.padEnd(12)} (${xpReward} XP)`,
    );
  }

  console.log('\n📊 Summary:');
  console.log(`   BEGINNER: ${beginnerCount}`);
  console.log(`   INTERMEDIATE: ${intermediateCount}`);
  console.log(`   EXPERT: ${expertCount}`);
}

async function assignChallengeDifficulties() {
  console.log('\n🎯 Assigning difficulty levels to challenges...\n');

  const challenges = await prisma.challenge.findMany({
    orderBy: { orderIndex: 'asc' },
  });

  console.log(`Found ${challenges.length} challenges to process`);

  let easyCount = 0;
  let mediumCount = 0;
  let hardCount = 0;

  for (const challenge of challenges) {
    // Map existing difficulty (EASY/MEDIUM/HARD) to proficiency levels
    let proficiencyDifficulty: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
    let xpReward: number;

    if (challenge.difficulty === 'EASY') {
      proficiencyDifficulty = 'BEGINNER';
      xpReward = 75;
      easyCount++;
    } else if (challenge.difficulty === 'MEDIUM') {
      proficiencyDifficulty = 'INTERMEDIATE';
      xpReward = 150;
      mediumCount++;
    } else {
      proficiencyDifficulty = 'EXPERT';
      xpReward = 300;
      hardCount++;
    }

    await prisma.challenge.update({
      where: { id: challenge.id },
      data: {
        proficiencyDifficulty,
        xpReward,
      },
    });

    console.log(
      `✓ ${challenge.title.substring(0, 40).padEnd(42)} → ${proficiencyDifficulty.padEnd(12)} (${xpReward} XP)`,
    );
  }

  console.log('\n📊 Summary:');
  console.log(`   BEGINNER (Easy): ${easyCount}`);
  console.log(`   INTERMEDIATE (Medium): ${mediumCount}`);
  console.log(`   EXPERT (Hard): ${hardCount}`);
}

async function main() {
  console.log('🚀 Starting content difficulty assignment...\n');
  console.log('=' .repeat(70));

  try {
    await assignLessonDifficulties();
    await assignChallengeDifficulties();

    console.log('\n' + '='.repeat(70));
    console.log('✅ Content difficulty assignment completed successfully!');
  } catch (error) {
    console.error('\n❌ Error assigning difficulties:', error);
    throw error;
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

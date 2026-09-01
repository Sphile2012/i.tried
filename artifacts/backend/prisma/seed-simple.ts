import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding 900 LESSONS (150 per language)...\n');
  console.log('This will take 5-10 minutes. Please wait...\n');

  let totalLessons = 0;

  // Create Python Topic
  const pythonTopic = await prisma.topic.create({
    data: {
      title: 'Python Mastery - Complete Course',
      slug: 'python-mastery',
      description: 'Master Python from absolute beginner to advanced professional with 150 comprehensive lessons',
      shortDescription: 'Complete Python - 150 Lessons',
      difficulty: 'BEGINNER',
      estimatedHours: 200,
      isPublished: true,
      isFree: false,
      orderIndex: 1,
    },
  });

  console.log('Creating Python lessons...');
  
  // Create 10 modules for Python
  for (let m = 1; m <= 10; m++) {
    const module = await prisma.module.create({
      data: {
        topicId: pythonTopic.id,
        title: `Python Module ${m}`,
        slug: `python-module-${m}`,
        description: `Python Module ${m} content`,
        orderIndex: m,
        isPublished: true,
        estimatedMinutes: 225,
      },
    });

    // Create 15 lessons per module
    for (let l = 1; l <= 15; l++) {
      await prisma.lesson.create({
        data: {
          moduleId: module.id,
          title: `Python Lesson ${m}-${l}`,
          slug: `python-lesson-${m}-${l}`,
          content: `# Python Lesson ${m}-${l}\n\nComprehensive Python content covering fundamental to advanced concepts.`,
          estimatedMinutes: 45,
          orderIndex: l,
          isPublished: true,
          isFree: l <= 2,
        },
      });
      totalLessons++;
    }
  }

  console.log(`✅ Python: 150 lessons created`);

  // Create other 5 languages similarly...
  const languages = [
    { name: 'C++', slug: 'cpp', hours: 220, difficulty: 'INTERMEDIATE', order: 2 },
    { name: 'Java', slug: 'java', hours: 210, difficulty: 'INTERMEDIATE', order: 3 },
    { name: 'C#', slug: 'csharp', hours: 210, difficulty: 'INTERMEDIATE', order: 4 },
    { name: 'JavaScript', slug: 'js', hours: 200, difficulty: 'BEGINNER', order: 5 },
    { name: 'TypeScript', slug: 'ts', hours: 190, difficulty: 'INTERMEDIATE', order: 6 },
  ];

  for (const lang of languages) {
    const topic = await prisma.topic.create({
      data: {
        title: `${lang.name} Mastery - Complete Course`,
        slug: `${lang.slug}-mastery`,
        description: `Master ${lang.name} with 150 comprehensive lessons`,
        shortDescription: `Complete ${lang.name} - 150 Lessons`,
        difficulty: lang.difficulty,
        estimatedHours: lang.hours,
        isPublished: true,
        isFree: false,
        orderIndex: lang.order,
      },
    });

    console.log(`Creating ${lang.name} lessons...`);

    for (let m = 1; m <= 10; m++) {
      const module = await prisma.module.create({
        data: {
          topicId: topic.id,
          title: `${lang.name} Module ${m}`,
          slug: `${lang.slug}-module-${m}`,
          description: `${lang.name} Module ${m} content`,
          orderIndex: m,
          isPublished: true,
          estimatedMinutes: 225,
        },
      });

      for (let l = 1; l <= 15; l++) {
        await prisma.lesson.create({
          data: {
            moduleId: module.id,
            title: `${lang.name} Lesson ${m}-${l}`,
            slug: `${lang.slug}-lesson-${m}-${l}`,
            content: `# ${lang.name} Lesson ${m}-${l}\n\nComprehensive ${lang.name} content.`,
            estimatedMinutes: 45,
            orderIndex: l,
            isPublished: true,
            isFree: l <= 2,
          },
        });
        totalLessons++;
      }
    }

    console.log(`✅ ${lang.name}: 150 lessons created`);
  }

  console.log('\n================================================');
  console.log('🎉 MEGA SEED COMPLETE!');
  console.log('================================================');
  console.log(`📝 Total Lessons Created: ${totalLessons}`);
  console.log('📚 Breakdown:');
  console.log('   • Python: 150 lessons');
  console.log('   • C++: 150 lessons');
  console.log('   • Java: 150 lessons');
  console.log('   • C#: 150 lessons');
  console.log('   • JavaScript: 150 lessons');
  console.log('   • TypeScript: 150 lessons');
  console.log('================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

export interface LessonSummary {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  xpReward: number;
  duration: number;
  orderIndex: number;
  completed: boolean;
  language?: string;
}

export interface ChallengeSummary {
  id: string;
  title: string;
  difficulty: string;
  xpReward: number;
  completed: boolean;
  language?: string;
}

@Injectable()
export class CurriculumService {
  async getCurriculumByLevel(
    userId: string | null,
    requestedLevel: ProficiencyLevel,
    language?: string,
    difficulty?: string,
  ): Promise<{
    lessons: LessonSummary[];
    challenges: ChallengeSummary[];
  }> {
    // For guest users, default to BEGINNER level
    let userLevel: ProficiencyLevel = 'BEGINNER';
    
    if (userId) {
      // Get user to verify their level
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { proficiencyLevel: true },
      });

      if (user && user.proficiencyLevel) {
        userLevel = user.proficiencyLevel as ProficiencyLevel;
      }
    }

    // Determine which difficulties to show based on level
    let allowedDifficulties = this.getAllowedDifficulties(
      requestedLevel as ProficiencyLevel,
    );

    // Override with specific difficulty if provided
    if (difficulty && ['BEGINNER', 'INTERMEDIATE', 'EXPERT'].includes(difficulty.toUpperCase())) {
      allowedDifficulties = [difficulty.toUpperCase()];
    }

    // Build lesson query filter
    const lessonFilter: any = {
      isPublished: true,
    };

    // Only filter by difficulty if lessons have difficulty set
    // For now, since lessons don't have difficulty, we'll get all published lessons
    if (allowedDifficulties.length > 0 && allowedDifficulties[0] !== 'BEGINNER') {
      // If filtering beyond BEGINNER, check if difficulty is set
      lessonFilter.OR = [
        { difficulty: { in: allowedDifficulties } },
        { difficulty: null }, // Include lessons without difficulty set
      ];
    }

    // Note: Language filtering will be done post-query since lessons don't have language field
    // We'll identify language from the topic through module relationship

    // Fetch lessons with completion status
    const lessons = await prisma.lesson.findMany({
      where: lessonFilter,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
      include: {
        module: {
          include: {
            topic: true,
          },
        },
      },
    });

    // Get user progress for these lessons (only if userId exists)
    const lessonIds = lessons.map((l) => l.id);
    let progressMap = new Map<string, boolean>();
    
    if (userId) {
      const userProgress = await prisma.userProgress.findMany({
        where: {
          userId,
          contentId: { in: lessonIds },
          contentType: 'LESSON',
        },
      });
      progressMap = new Map(
        userProgress.map((p) => [p.contentId, p.status === 'COMPLETED']),
      );
    }

    const lessonSummaries: LessonSummary[] = lessons
      .map((lesson) => {
        // Extract language from topic slug (e.g., 'python-mastery' -> 'python')
        const topicSlug = lesson.module?.topic?.slug || '';
        let languageCode = 'cpp'; // default
        
        if (topicSlug.includes('python')) languageCode = 'python';
        else if (topicSlug.includes('cpp')) languageCode = 'cpp';
        else if (topicSlug.includes('java')) languageCode = 'java';
        else if (topicSlug.includes('csharp')) languageCode = 'csharp';
        else if (topicSlug.includes('js')) languageCode = 'javascript';
        else if (topicSlug.includes('ts')) languageCode = 'typescript';
        
        return {
          id: lesson.id,
          title: lesson.title,
          description: lesson.content.substring(0, 200) + '...',
          difficulty: lesson.difficulty || lesson.module?.topic?.difficulty || 'BEGINNER',
          xpReward: lesson.xpReward || 50,
          duration: lesson.estimatedMinutes,
          orderIndex: lesson.orderIndex,
          completed: progressMap.get(lesson.id) || false,
          language: languageCode,
        };
      })
      .filter((lesson) => {
        // Filter by language if specified
        if (language && language !== 'all') {
          return lesson.language === language;
        }
        return true;
      });

    // Build challenge query filter
    const challengeFilter: any = {
      proficiencyDifficulty: { in: allowedDifficulties },
      isPublished: true,
    };

    // Note: Language filtering for challenges will be done post-query

    // Fetch challenges with completion status
    const challenges = await prisma.challenge.findMany({
      where: challengeFilter,
      orderBy: [{ orderIndex: 'asc' }],
    });

    const challengeIds = challenges.map((c) => c.id);
    let challengeProgressMap = new Map<string, boolean>();
    
    if (userId) {
      const challengeProgress = await prisma.userProgress.findMany({
        where: {
          userId,
          contentId: { in: challengeIds },
          contentType: 'CHALLENGE',
        },
      });
      challengeProgressMap = new Map(
        challengeProgress.map((p) => [p.contentId, p.status === 'COMPLETED']),
      );
    }

    const challengeSummaries: ChallengeSummary[] = challenges.map(
      (challenge) => ({
        id: challenge.id,
        title: challenge.title,
        difficulty: challenge.proficiencyDifficulty || 'BEGINNER',
        xpReward: challenge.xpReward,
        completed: challengeProgressMap.get(challenge.id) || false,
        language: (challenge as any).language || 'cpp', // Add language field
      }),
    );

    return {
      lessons: lessonSummaries,
      challenges: challengeSummaries,
    };
  }

  async getLessonById(
    userId: string,
    lessonId: string,
  ): Promise<{
    id: string;
    title: string;
    content: string;
    difficulty: string;
    xpReward: number;
    hints: string[];
    nextLessonId: string | null;
    previousLessonId: string | null;
  }> {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            lessons: {
              where: { isPublished: true },
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Find next and previous lessons in the module
    const lessonsInModule = lesson.module.lessons;
    const currentIndex = lessonsInModule.findIndex((l) => l.id === lessonId);
    const nextLesson =
      currentIndex < lessonsInModule.length - 1
        ? lessonsInModule[currentIndex + 1]
        : null;
    const previousLesson =
      currentIndex > 0 ? lessonsInModule[currentIndex - 1] : null;

    // Parse hints if stored as JSON
    let hints: string[] = [];
    try {
      // Assuming hints might be stored in resources as JSON
      if (lesson.resources) {
        const resources = JSON.parse(lesson.resources);
        hints = resources.hints || [];
      }
    } catch (e) {
      hints = [];
    }

    return {
      id: lesson.id,
      title: lesson.title,
      content: lesson.content,
      difficulty: lesson.difficulty || 'BEGINNER',
      xpReward: lesson.xpReward,
      hints,
      nextLessonId: nextLesson?.id || null,
      previousLessonId: previousLesson?.id || null,
    };
  }

  async markLessonComplete(
    userId: string,
    lessonId: string,
  ): Promise<{ xpEarned: number; totalXp: number }> {
    // Get lesson to determine XP reward
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { xpReward: true },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Check if already completed
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_contentId: {
          userId,
          contentId: lessonId,
        },
      },
    });

    if (existingProgress?.status === 'COMPLETED') {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { totalXp: true },
      });
      return {
        xpEarned: 0,
        totalXp: user?.totalXp || 0,
      };
    }

    // Mark as complete and award XP
    await prisma.userProgress.upsert({
      where: {
        userId_contentId: {
          userId,
          contentId: lessonId,
        },
      },
      create: {
        userId,
        contentId: lessonId,
        contentType: 'LESSON',
        status: 'COMPLETED',
        xpEarned: lesson.xpReward,
        completionDate: new Date(),
      },
      update: {
        status: 'COMPLETED',
        xpEarned: lesson.xpReward,
        completionDate: new Date(),
      },
    });

    // Update user's total XP
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: { increment: lesson.xpReward },
      },
      select: { totalXp: true },
    });

    return {
      xpEarned: lesson.xpReward,
      totalXp: updatedUser.totalXp,
    };
  }

  private getAllowedDifficulties(level: ProficiencyLevel): string[] {
    switch (level) {
      case 'BEGINNER':
        return ['BEGINNER'];
      case 'INTERMEDIATE':
        return ['BEGINNER', 'INTERMEDIATE'];
      case 'EXPERT':
        return ['BEGINNER', 'INTERMEDIATE', 'EXPERT'];
      default:
        return ['BEGINNER'];
    }
  }
}

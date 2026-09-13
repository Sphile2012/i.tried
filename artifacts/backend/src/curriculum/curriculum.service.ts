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
    userId: string,
    requestedLevel: ProficiencyLevel,
    language?: string,
    difficulty?: string,
  ): Promise<{
    lessons: LessonSummary[];
    challenges: ChallengeSummary[];
  }> {
    // Get user to verify their level
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { proficiencyLevel: true },
    });

    if (!user || !user.proficiencyLevel) {
      throw new NotFoundException('User level not set');
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
      difficulty: { in: allowedDifficulties },
      isPublished: true,
    };

    // Add language filter if provided
    if (language && language !== 'all') {
      lessonFilter.language = language;
    }

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

    // Get user progress for these lessons
    const lessonIds = lessons.map((l) => l.id);
    const userProgress = await prisma.userProgress.findMany({
      where: {
        userId,
        contentId: { in: lessonIds },
        contentType: 'LESSON',
      },
    });

    const progressMap = new Map(
      userProgress.map((p) => [p.contentId, p.status === 'COMPLETED']),
    );

    const lessonSummaries: LessonSummary[] = lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.content.substring(0, 200) + '...',
      difficulty: lesson.difficulty || 'BEGINNER',
      xpReward: lesson.xpReward,
      duration: lesson.estimatedMinutes,
      orderIndex: lesson.orderIndex,
      completed: progressMap.get(lesson.id) || false,
      language: (lesson as any).language || 'cpp', // Add language field
    }));

    // Build challenge query filter
    const challengeFilter: any = {
      proficiencyDifficulty: { in: allowedDifficulties },
      isPublished: true,
    };

    // Add language filter if provided
    if (language && language !== 'all') {
      challengeFilter.language = language;
    }

    // Fetch challenges with completion status
    const challenges = await prisma.challenge.findMany({
      where: challengeFilter,
      orderBy: [{ orderIndex: 'asc' }],
    });

    const challengeIds = challenges.map((c) => c.id);
    const challengeProgress = await prisma.userProgress.findMany({
      where: {
        userId,
        contentId: { in: challengeIds },
        contentType: 'CHALLENGE',
      },
    });

    const challengeProgressMap = new Map(
      challengeProgress.map((p) => [p.contentId, p.status === 'COMPLETED']),
    );

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

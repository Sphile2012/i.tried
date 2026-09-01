import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all lessons for a module
   */
  async getLessonsByModule(moduleId: string, userId?: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        moduleId,
        isPublished: true,
      },
      include: {
        progresses: userId
          ? {
              where: { userId },
              select: {
                status: true,
                progressPercent: true,
                timeSpentMinutes: true,
              },
            }
          : false,
        challenges: {
          where: { isPublished: true },
          select: {
            id: true,
            title: true,
            difficulty: true,
            points: true,
          },
        },
      },
      orderBy: { orderIndex: 'asc' },
    });

    return lessons;
  }

  /**
   * Get a single lesson by ID
   */
  async getLessonById(lessonId: string, userId?: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            topic: {
              select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
              },
            },
          },
        },
        progresses: userId
          ? {
              where: { userId },
            }
          : false,
        challenges: {
          where: { isPublished: true },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    return lesson;
  }

  /**
   * Get lesson by slug
   */
  async getLessonBySlug(moduleId: string, slug: string, userId?: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: {
        moduleId_slug: {
          moduleId,
          slug,
        },
      },
      include: {
        module: {
          include: {
            topic: true,
          },
        },
        progresses: userId
          ? {
              where: { userId },
            }
          : false,
        challenges: {
          where: { isPublished: true },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with slug ${slug} not found in module ${moduleId}`);
    }

    return lesson;
  }

  /**
   * Start a lesson (track progress)
   */
  async startLesson(userId: string, lessonId: string) {
    // Check if lesson exists
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Check or create lesson progress
    const existingProgress = await this.prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });

    if (existingProgress) {
      // Update to in progress if not completed
      if (existingProgress.status !== 'COMPLETED') {
        return await this.prisma.progress.update({
          where: { id: existingProgress.id },
          data: {
            status: 'IN_PROGRESS',
            lastAccessedAt: new Date(),
          },
        });
      }
      return existingProgress;
    }

    // Create new progress record
    return await this.prisma.progress.create({
      data: {
        userId,
        lessonId,
        status: 'IN_PROGRESS',
      },
    });
  }

  /**
   * Update lesson progress
   */
  async updateLessonProgress(
    userId: string,
    lessonId: string,
    data: {
      progressPercent?: number;
      timeSpentMinutes?: number;
      status?: string;
    },
  ) {
    const progress = await this.prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });

    if (!progress) {
      throw new NotFoundException('Lesson progress not found. Start the lesson first.');
    }

    return await this.prisma.progress.update({
      where: { id: progress.id },
      data: {
        ...data,
        lastAccessedAt: new Date(),
      },
    });
  }

  /**
   * Complete a lesson
   */
  async completeLesson(userId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            topic: true,
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Check if progress exists
    let progress = await this.prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });

    if (!progress) {
      // Create progress if it doesn't exist
      progress = await this.prisma.progress.create({
        data: {
          userId,
          lessonId,
          status: 'NOT_STARTED',
        },
      });
    }

    // Update progress to completed
    const updatedProgress = await this.prisma.progress.update({
      where: { id: progress.id },
      data: {
        status: 'COMPLETED',
        progressPercent: 100,
        completedAt: new Date(),
        xpEarned: 50,
      },
    });

    // Award XP for lesson completion
    const xpAmount = 50;
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpAmount },
        lastActiveAt: new Date(),
      },
    });

    // Update enrollment progress for the topic
    await this.updateEnrollmentProgress(userId, lesson.module.topicId);

    return updatedProgress;
  }

  /**
   * Update enrollment progress percentage
   */
  private async updateEnrollmentProgress(userId: string, topicId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_topicId: {
          userId,
          topicId,
        },
      },
    });

    if (!enrollment) {
      return;
    }

    // Get all lessons for this topic
    const allLessons = await this.prisma.lesson.findMany({
      where: {
        module: {
          topicId,
        },
        isPublished: true,
      },
      select: { id: true },
    });

    // Get completed lessons
    const completedLessons = await this.prisma.progress.count({
      where: {
        userId,
        status: 'COMPLETED',
        lesson: {
          module: {
            topicId,
          },
        },
      },
    });

    const totalLessons = allLessons.length;
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const isCompleted = progressPercent === 100;

    await this.prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progressPercent,
        status: isCompleted ? 'COMPLETED' : 'ACTIVE',
        completedAt: isCompleted ? new Date() : null,
      },
    });
  }

  /**
   * Get user's lesson progress
   */
  async getUserLessonProgress(userId: string, lessonId: string) {
    const progress = await this.prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            estimatedMinutes: true,
          },
        },
      },
    });

    return progress;
  }

  /**
   * Get all lesson progress for a user in a topic
   */
  async getUserTopicProgress(userId: string, topicId: string) {
    const progress = await this.prisma.progress.findMany({
      where: {
        userId,
        lesson: {
          module: {
            topicId,
          },
        },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            slug: true,
            estimatedMinutes: true,
            orderIndex: true,
            module: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return progress;
  }

  /**
   * Create a new lesson (admin only)
   */
  async createLesson(data: {
    moduleId: string;
    title: string;
    slug: string;
    content?: string;
    videoUrl?: string;
    estimatedMinutes?: number;
    orderIndex?: number;
    isPublished?: boolean;
    isFree?: boolean;
  }) {
    // Check if module exists
    const module = await this.prisma.module.findUnique({
      where: { id: data.moduleId },
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    // Check if slug already exists in this module
    const existingLesson = await this.prisma.lesson.findUnique({
      where: {
        moduleId_slug: {
          moduleId: data.moduleId,
          slug: data.slug,
        },
      },
    });

    if (existingLesson) {
      throw new BadRequestException('A lesson with this slug already exists in this module');
    }

    return await this.prisma.lesson.create({
      data: {
        moduleId: data.moduleId,
        title: data.title,
        slug: data.slug,
        content: data.content || '',
        videoUrl: data.videoUrl,
        estimatedMinutes: data.estimatedMinutes || 0,
        orderIndex: data.orderIndex || 0,
        isPublished: data.isPublished || false,
        isFree: data.isFree || false,
      },
      include: {
        module: {
          include: {
            topic: true,
          },
        },
      },
    });
  }

  /**
   * Update a lesson (admin only)
   */
  async updateLesson(
    lessonId: string,
    data: {
      title?: string;
      slug?: string;
      content?: string;
      videoUrl?: string;
      estimatedMinutes?: number;
      orderIndex?: number;
      isPublished?: boolean;
      isFree?: boolean;
    },
  ) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return await this.prisma.lesson.update({
      where: { id: lessonId },
      data,
    });
  }

  /**
   * Delete a lesson (admin only)
   */
  async deleteLesson(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return await this.prisma.lesson.delete({
      where: { id: lessonId },
    });
  }

  /**
   * Search lessons
   */
  async searchLessons(query: string, options?: { topicId?: string; difficulty?: string }) {
    const where: any = {
      isPublished: true,
      OR: [
        { title: { contains: query } },
        { content: { contains: query } },
      ],
    };

    if (options?.topicId) {
      where.module = {
        topicId: options.topicId,
      };
    }

    return await this.prisma.lesson.findMany({
      where,
      include: {
        module: {
          include: {
            topic: {
              select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
              },
            },
          },
        },
      },
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get lesson statistics
   */
  async getLessonStats(lessonId: string) {
    const [lesson, progressCount, averageTimeSpent, completedCount] = await Promise.all([
      this.prisma.lesson.findUnique({
        where: { id: lessonId },
      }),
      this.prisma.progress.count({
        where: { lessonId },
      }),
      this.prisma.progress.aggregate({
        where: {
          lessonId,
          status: 'COMPLETED',
        },
        _avg: {
          timeSpentMinutes: true,
        },
      }),
      this.prisma.progress.count({
        where: {
          lessonId,
          status: 'COMPLETED',
        },
      }),
    ]);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return {
      ...lesson,
      progressCount,
      completedCount,
      averageTimeSpent: averageTimeSpent._avg.timeSpentMinutes || 0,
      completionRate: progressCount > 0 ? (completedCount / progressCount) * 100 : 0,
    };
  }

  /**
   * Get next lesson in the module
   */
  async getNextLesson(currentLessonId: string) {
    const currentLesson = await this.prisma.lesson.findUnique({
      where: { id: currentLessonId },
      select: { moduleId: true, orderIndex: true },
    });

    if (!currentLesson) {
      throw new NotFoundException('Current lesson not found');
    }

    const nextLesson = await this.prisma.lesson.findFirst({
      where: {
        moduleId: currentLesson.moduleId,
        orderIndex: { gt: currentLesson.orderIndex },
        isPublished: true,
      },
      orderBy: { orderIndex: 'asc' },
    });

    return nextLesson;
  }

  /**
   * Get previous lesson in the module
   */
  async getPreviousLesson(currentLessonId: string) {
    const currentLesson = await this.prisma.lesson.findUnique({
      where: { id: currentLessonId },
      select: { moduleId: true, orderIndex: true },
    });

    if (!currentLesson) {
      throw new NotFoundException('Current lesson not found');
    }

    const previousLesson = await this.prisma.lesson.findFirst({
      where: {
        moduleId: currentLesson.moduleId,
        orderIndex: { lt: currentLesson.orderIndex },
        isPublished: true,
      },
      orderBy: { orderIndex: 'desc' },
    });

    return previousLesson;
  }
}

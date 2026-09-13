import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

export interface LevelStatistics {
  usersByLevel: {
    BEGINNER: number;
    INTERMEDIATE: number;
    EXPERT: number;
  };
  averageProgressionTimes: {
    beginnerToIntermediate: number | null;
    intermediateToExpert: number | null;
  };
  quizScoreDistribution: Array<{
    scoreRange: string;
    count: number;
  }>;
}

@Injectable()
export class AdminService {
  async updateUserLevel(
    adminId: string,
    userId: string,
    newLevel: ProficiencyLevel,
    reason: string,
  ): Promise<{
    success: boolean;
    userId: string;
    previousLevel: string | null;
    newLevel: string;
  }> {
    // Verify admin has admin role
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: { role: true },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }

    // Get user's current level
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { proficiencyLevel: true },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const previousLevel = user.proficiencyLevel;

    // Update user level
    await prisma.user.update({
      where: { id: userId },
      data: {
        proficiencyLevel: newLevel,
        updatedAt: new Date(),
      },
    });

    // Log the change in progression history
    await prisma.progressionHistory.create({
      data: {
        userId,
        previousLevel: previousLevel || 'NONE',
        newLevel,
        xpAtProgression: 0, // Admin override doesn't consider XP
        completionRateAtProgression: 0,
      },
    });

    // Log the admin action (you could create an AdminAuditLog table for this)
    console.log(
      `Admin ${adminId} changed user ${userId} level from ${previousLevel} to ${newLevel}. Reason: ${reason}`,
    );

    return {
      success: true,
      userId,
      previousLevel,
      newLevel,
    };
  }

  async getUserLevelInfo(adminId: string, userId: string) {
    // Verify admin
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: { role: true },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        proficiencyLevel: true,
        totalXp: true,
        completionRate: true,
        progressionEligible: true,
        onboardingCompleted: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Get progression history
    const progressionHistory = await prisma.progressionHistory.findMany({
      where: { userId },
      orderBy: { progressedAt: 'desc' },
    });

    return {
      user,
      progressionHistory,
    };
  }

  async getLevelStatistics(adminId: string): Promise<LevelStatistics> {
    // Verify admin
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: { role: true },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }

    // Count users by level
    const usersByLevel = {
      BEGINNER: await prisma.user.count({
        where: { proficiencyLevel: 'BEGINNER' },
      }),
      INTERMEDIATE: await prisma.user.count({
        where: { proficiencyLevel: 'INTERMEDIATE' },
      }),
      EXPERT: await prisma.user.count({
        where: { proficiencyLevel: 'EXPERT' },
      }),
    };

    // Calculate average progression times
    const beginnerToIntermediate = await this.calculateAverageProgressionTime(
      'BEGINNER',
      'INTERMEDIATE',
    );
    const intermediateToExpert = await this.calculateAverageProgressionTime(
      'INTERMEDIATE',
      'EXPERT',
    );

    // Get quiz score distribution
    const quizAttempts = await prisma.quizAttempt.findMany({
      select: { score: true },
    });

    const scoreRanges = [
      { min: 0, max: 20, label: '0-20%' },
      { min: 20, max: 40, label: '20-40%' },
      { min: 40, max: 60, label: '40-60%' },
      { min: 60, max: 75, label: '60-75%' },
      { min: 75, max: 100, label: '75-100%' },
    ];

    const quizScoreDistribution = scoreRanges.map((range) => ({
      scoreRange: range.label,
      count: quizAttempts.filter(
        (attempt) => attempt.score >= range.min && attempt.score < range.max,
      ).length,
    }));

    return {
      usersByLevel,
      averageProgressionTimes: {
        beginnerToIntermediate,
        intermediateToExpert,
      },
      quizScoreDistribution,
    };
  }

  private async calculateAverageProgressionTime(
    fromLevel: string,
    toLevel: string,
  ): Promise<number | null> {
    const progressions = await prisma.progressionHistory.findMany({
      where: {
        previousLevel: fromLevel,
        newLevel: toLevel,
      },
      include: {
        user: {
          select: { createdAt: true },
        },
      },
    });

    if (progressions.length === 0) {
      return null;
    }

    // Calculate time from account creation to progression
    const times = progressions.map((progression) => {
      const createdAt = progression.user.createdAt;
      const progressedAt = progression.progressedAt;
      return progressedAt.getTime() - createdAt.getTime();
    });

    const averageMilliseconds =
      times.reduce((sum, time) => sum + time, 0) / times.length;
    const averageDays = averageMilliseconds / (1000 * 60 * 60 * 24);

    return Math.round(averageDays * 10) / 10; // Round to 1 decimal place
  }

  async searchUsers(
    adminId: string,
    query: string,
  ): Promise<
    Array<{
      id: string;
      email: string;
      name: string;
      proficiencyLevel: string | null;
      totalXp: number;
      completionRate: number;
    }>
  > {
    // Verify admin
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: { role: true },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: query } },
          { name: { contains: query } },
        ],
      },
      select: {
        id: true,
        email: true,
        name: true,
        proficiencyLevel: true,
        totalXp: true,
        completionRate: true,
      },
      take: 20,
    });

    return users;
  }

  async rollbackProgression(
    adminId: string,
    userId: string,
  ): Promise<{ success: boolean; message: string }> {
    // Verify admin
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: { role: true },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }

    // Get most recent progression
    const latestProgression = await prisma.progressionHistory.findFirst({
      where: { userId },
      orderBy: { progressedAt: 'desc' },
    });

    if (!latestProgression) {
      return {
        success: false,
        message: 'No progression history found for this user',
      };
    }

    // Revert to previous level
    await prisma.user.update({
      where: { id: userId },
      data: {
        proficiencyLevel: latestProgression.previousLevel,
        updatedAt: new Date(),
      },
    });

    console.log(
      `Admin ${adminId} rolled back user ${userId} from ${latestProgression.newLevel} to ${latestProgression.previousLevel}`,
    );

    return {
      success: true,
      message: `Rolled back to ${latestProgression.previousLevel} level`,
    };
  }
}

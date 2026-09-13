import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

interface ProgressionCriteria {
  xpThreshold: number;
  completionRate: number;
}

export interface EligibilityResult {
  eligible: boolean;
  nextLevel: ProficiencyLevel | null;
  criteria: {
    xpMet: boolean;
    completionRateMet: boolean;
  };
}

export interface LevelStatus {
  currentLevel: ProficiencyLevel;
  totalXp: number;
  completionRate: number;
  progressionEligible: boolean;
  nextLevel: {
    level: ProficiencyLevel | null;
    requiredXp: number;
    requiredCompletionRate: number;
    currentXp: number;
    currentCompletionRate: number;
  } | null;
}

const PROGRESSION_THRESHOLDS: Record<string, ProgressionCriteria> = {
  'BEGINNER->INTERMEDIATE': {
    xpThreshold: 1000,
    completionRate: 0.8, // 80%
  },
  'INTERMEDIATE->EXPERT': {
    xpThreshold: 5000,
    completionRate: 0.7, // 70%
  },
};

@Injectable()
export class ProgressionService {
  async calculateCompletionRate(
    userId: string,
    difficulty: ProficiencyLevel,
  ): Promise<number> {
    // Get total lessons at the user's difficulty level
    const totalLessons = await prisma.lesson.count({
      where: {
        difficulty,
        isPublished: true,
      },
    });

    if (totalLessons === 0) {
      return 0;
    }

    // Get completed lessons at the user's difficulty level
    const completedLessons = await prisma.userProgress.count({
      where: {
        userId,
        status: 'COMPLETED',
        contentType: 'LESSON',
        lesson: {
          difficulty,
        },
      },
    });

    const rate = completedLessons / totalLessons;
    return Math.round(rate * 100) / 100; // Round to 2 decimal places
  }

  async updateCompletionRate(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { proficiencyLevel: true },
    });

    if (!user || !user.proficiencyLevel) {
      return;
    }

    const completionRate = await this.calculateCompletionRate(
      userId,
      user.proficiencyLevel as ProficiencyLevel,
    );

    await prisma.user.update({
      where: { id: userId },
      data: { completionRate },
    });
  }

  async checkProgressionEligibility(
    userId: string,
  ): Promise<EligibilityResult> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        proficiencyLevel: true,
        totalXp: true,
        completionRate: true,
      },
    });

    if (!user || !user.proficiencyLevel) {
      return {
        eligible: false,
        nextLevel: null,
        criteria: { xpMet: false, completionRateMet: false },
      };
    }

    const currentLevel = user.proficiencyLevel as ProficiencyLevel;

    // Already at max level
    if (currentLevel === 'EXPERT') {
      return {
        eligible: false,
        nextLevel: null,
        criteria: { xpMet: true, completionRateMet: true },
      };
    }

    const transitionKey =
      currentLevel === 'BEGINNER'
        ? 'BEGINNER->INTERMEDIATE'
        : 'INTERMEDIATE->EXPERT';
    const criteria = PROGRESSION_THRESHOLDS[transitionKey];
    
    if (!criteria) {
      return {
        eligible: false,
        nextLevel: null,
        criteria: { xpMet: false, completionRateMet: false },
      };
    }
    
    const nextLevel: ProficiencyLevel =
      currentLevel === 'BEGINNER' ? 'INTERMEDIATE' : 'EXPERT';

    const xpMet = user.totalXp >= criteria.xpThreshold;
    const completionRateMet = user.completionRate >= criteria.completionRate;

    const eligible = xpMet && completionRateMet;

    // Update user's progression eligibility flag
    await prisma.user.update({
      where: { id: userId },
      data: { progressionEligible: eligible },
    });

    return {
      eligible,
      nextLevel: eligible ? nextLevel : null,
      criteria: { xpMet, completionRateMet },
    };
  }

  async getLevelStatus(userId: string): Promise<LevelStatus> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        proficiencyLevel: true,
        totalXp: true,
        completionRate: true,
        progressionEligible: true,
      },
    });

    if (!user || !user.proficiencyLevel) {
      throw new Error('User not found or level not set');
    }

    const currentLevel = user.proficiencyLevel as ProficiencyLevel;

    // Get next level requirements
    let nextLevelInfo = null;
    if (currentLevel !== 'EXPERT') {
      const transitionKey =
        currentLevel === 'BEGINNER'
          ? 'BEGINNER->INTERMEDIATE'
          : 'INTERMEDIATE->EXPERT';
      const criteria = PROGRESSION_THRESHOLDS[transitionKey];
      
      if (criteria) {
        const nextLevelName: ProficiencyLevel =
          currentLevel === 'BEGINNER' ? 'INTERMEDIATE' : 'EXPERT';

        nextLevelInfo = {
          level: nextLevelName,
          requiredXp: criteria.xpThreshold,
          requiredCompletionRate: criteria.completionRate,
          currentXp: user.totalXp,
          currentCompletionRate: user.completionRate,
        };
      }
    }

    return {
      currentLevel,
      totalXp: user.totalXp,
      completionRate: user.completionRate,
      progressionEligible: user.progressionEligible,
      nextLevel: nextLevelInfo,
    };
  }

  async advanceLevel(userId: string): Promise<{
    success: boolean;
    newLevel?: ProficiencyLevel;
    unlockedFeatures?: string[];
    message: string;
  }> {
    // Check eligibility
    const eligibility = await this.checkProgressionEligibility(userId);

    if (!eligibility.eligible || !eligibility.nextLevel) {
      return {
        success: false,
        message: 'User does not meet progression criteria',
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        proficiencyLevel: true,
        totalXp: true,
        completionRate: true,
      },
    });

    if (!user || !user.proficiencyLevel) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const previousLevel = user.proficiencyLevel;
    const newLevel = eligibility.nextLevel;

    try {
      // Use transaction for atomic progression
      await prisma.$transaction(async (tx) => {
        // Record progression history
        await tx.progressionHistory.create({
          data: {
            userId,
            previousLevel,
            newLevel,
            xpAtProgression: user.totalXp,
            completionRateAtProgression: user.completionRate,
          },
        });

        // Update user level
        await tx.user.update({
          where: { id: userId },
          data: {
            proficiencyLevel: newLevel,
            progressionEligible: false,
            updatedAt: new Date(),
          },
        });
      });

      // Get unlocked features based on new level
      const unlockedFeatures = this.getUnlockedFeatures(newLevel);

      return {
        success: true,
        newLevel,
        unlockedFeatures,
        message: `Congratulations! You've advanced to ${newLevel} level!`,
      };
    } catch (error) {
      console.error('Error advancing level:', error);
      return {
        success: false,
        message: 'Failed to advance level',
      };
    }
  }

  private getUnlockedFeatures(level: ProficiencyLevel): string[] {
    if (level === 'INTERMEDIATE') {
      return [
        'Two-panel workspace with lessons list and code editor',
        'Split view with editor and output console',
        'Access to intermediate-level challenges',
        'Flexible lesson navigation',
        'Standard development tools and autocomplete',
      ];
    } else if (level === 'EXPERT') {
      return [
        'Full IDE-style workspace with multiple panels',
        'File explorer and multi-file editing',
        'Integrated terminal access',
        'Advanced debugging tools with breakpoints',
        'Command palette with keyboard shortcuts',
        'Access to all expert-level challenges',
        'Leaderboard and community features',
        'Custom themes and editor settings',
      ];
    }
    return [];
  }
}

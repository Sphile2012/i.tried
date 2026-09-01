import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        enrollments: true,
        progresses: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async getProgress(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        topic: true,
      },
    });

    const lessonProgress = await this.prisma.progress.findMany({
      where: { userId, status: 'COMPLETED' },
    });

    return {
      enrollments,
      completedLessons: lessonProgress.length,
    };
  }

  async getAchievements(userId: string) {
    return [];
  }
}

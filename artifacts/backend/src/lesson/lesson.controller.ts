import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  /**
   * Get all lessons for a module
   */
  @Get('module/:moduleId')
  async getLessonsByModule(
    @Param('moduleId') moduleId: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId;
    return this.lessonService.getLessonsByModule(moduleId, userId);
  }

  /**
   * Search lessons
   */
  @Get('search')
  async searchLessons(
    @Query('q') query: string,
    @Query('topicId') topicId?: string,
    @Query('difficulty') difficulty?: string,
  ) {
    return this.lessonService.searchLessons(query, { topicId, difficulty });
  }

  /**
   * Get lesson by ID
   */
  @Get(':id')
  async getLessonById(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const userId = req.user?.userId;
    return this.lessonService.getLessonById(id, userId);
  }

  /**
   * Get lesson statistics
   */
  @Get(':id/stats')
  async getLessonStats(@Param('id') id: string) {
    return this.lessonService.getLessonStats(id);
  }

  /**
   * Get next lesson
   */
  @Get(':id/next')
  async getNextLesson(@Param('id') id: string) {
    return this.lessonService.getNextLesson(id);
  }

  /**
   * Get previous lesson
   */
  @Get(':id/previous')
  async getPreviousLesson(@Param('id') id: string) {
    return this.lessonService.getPreviousLesson(id);
  }

  /**
   * Start a lesson (requires authentication)
   */
  @Post(':id/start')
  @UseGuards(JwtAuthGuard)
  async startLesson(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.lessonService.startLesson(req.user.userId, id);
  }

  /**
   * Update lesson progress (requires authentication)
   */
  @Patch(':id/progress')
  @UseGuards(JwtAuthGuard)
  async updateLessonProgress(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
    @Body()
    body: {
      progressPercent?: number;
      timeSpentMinutes?: number;
      status?: string;
    },
  ) {
    return this.lessonService.updateLessonProgress(req.user.userId, id, body);
  }

  /**
   * Complete a lesson (requires authentication)
   */
  @Post(':id/complete')
  @UseGuards(JwtAuthGuard)
  async completeLesson(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.lessonService.completeLesson(req.user.userId, id);
  }

  /**
   * Get user's lesson progress (requires authentication)
   */
  @Get(':id/my-progress')
  @UseGuards(JwtAuthGuard)
  async getUserLessonProgress(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.lessonService.getUserLessonProgress(req.user.userId, id);
  }

  /**
   * Get all user's progress for a topic (requires authentication)
   */
  @Get('topic/:topicId/my-progress')
  @UseGuards(JwtAuthGuard)
  async getUserTopicProgress(@Param('topicId') topicId: string, @Request() req: AuthenticatedRequest) {
    return this.lessonService.getUserTopicProgress(req.user.userId, topicId);
  }

  /**
   * Create a new lesson (admin only - add admin guard)
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async createLesson(
    @Body()
    body: {
      moduleId: string;
      title: string;
      slug: string;
      content?: string;
      videoUrl?: string;
      estimatedMinutes?: number;
      orderIndex?: number;
      isPublished?: boolean;
      isFree?: boolean;
    },
  ) {
    return this.lessonService.createLesson(body);
  }

  /**
   * Update a lesson (admin only - add admin guard)
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateLesson(
    @Param('id') id: string,
    @Body()
    body: {
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
    return this.lessonService.updateLesson(id, body);
  }

  /**
   * Delete a lesson (admin only - add admin guard)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteLesson(@Param('id') id: string) {
    return this.lessonService.deleteLesson(id);
  }
}

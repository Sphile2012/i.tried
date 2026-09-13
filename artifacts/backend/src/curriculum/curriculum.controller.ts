import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LevelGuard } from '../auth/guards/level.guard';
import { RequireLevel } from '../auth/decorators/require-level.decorator';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get(':level')
  async getCurriculum(
    @Request() req: any,
    @Param('level') level: string,
    @Query('language') language?: string,
    @Query('difficulty') difficulty?: string,
  ) {
    // Allow both authenticated and guest users
    const userId = req.user?.id || null;
    return await this.curriculumService.getCurriculumByLevel(
      userId,
      level.toUpperCase() as any,
      language,
      difficulty,
    );
  }

  @Get('lesson/:id')
  @UseGuards(JwtAuthGuard)
  async getLesson(@Request() req: any, @Param('id') lessonId: string) {
    const userId = req.user.id;
    return await this.curriculumService.getLessonById(userId, lessonId);
  }

  @Post('lesson/:id/complete')
  @UseGuards(JwtAuthGuard)
  async completeLesson(@Request() req: any, @Param('id') lessonId: string) {
    const userId = req.user.id;
    return await this.curriculumService.markLessonComplete(userId, lessonId);
  }
}

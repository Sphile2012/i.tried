import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LevelGuard } from '../auth/guards/level.guard';
import { RequireLevel } from '../auth/decorators/require-level.decorator';

@Controller('api/curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get(':level')
  @UseGuards(JwtAuthGuard, LevelGuard)
  @RequireLevel('BEGINNER') // Will be dynamically checked based on requested level
  async getCurriculum(@Request() req: any, @Param('level') level: string) {
    const userId = req.user.id;
    return await this.curriculumService.getCurriculumByLevel(
      userId,
      level.toUpperCase() as any,
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

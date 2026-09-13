import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProgressionService } from './progression.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('')
export class ProgressionController {
  constructor(private readonly progressionService: ProgressionService) {}

  @Get('user/level-status')
  @UseGuards(JwtAuthGuard)
  async getLevelStatus(@Request() req: any) {
    const userId = req.user.id;
    return await this.progressionService.getLevelStatus(userId);
  }

  @Post('level/check-progression')
  @UseGuards(JwtAuthGuard)
  async checkProgression(@Request() req: any) {
    const userId = req.user.id;
    return await this.progressionService.checkProgressionEligibility(userId);
  }

  @Post('level/advance')
  @UseGuards(JwtAuthGuard)
  async advanceLevel(@Request() req: any) {
    const userId = req.user.id;
    return await this.progressionService.advanceLevel(userId);
  }
}

import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AIService, HintRequest } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('hint')
  @HttpCode(HttpStatus.OK)
  async getHint(@Request() req: any, @Body() body: Omit<HintRequest, 'userId'>) {
    const hintRequest: HintRequest = {
      ...body,
      userId: req.user.userId,
    };
    return this.aiService.generateHint(hintRequest);
  }
}

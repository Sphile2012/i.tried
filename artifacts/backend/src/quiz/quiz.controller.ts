import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface QuizAnswerDto {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
}

interface SubmitQuizDto {
  answers: QuizAnswerDto[];
}

@Controller('onboarding')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('quiz')
  @UseGuards(JwtAuthGuard)
  async getQuiz(@Request() req: any) {
    return {
      questions: await this.quizService.getQuizQuestions(),
    };
  }

  @Post('quiz/submit')
  @UseGuards(JwtAuthGuard)
  async submitQuiz(@Request() req: any, @Body() submitQuizDto: SubmitQuizDto) {
    const userId = req.user.id;
    return await this.quizService.submitQuiz(userId, submitQuizDto.answers);
  }
}

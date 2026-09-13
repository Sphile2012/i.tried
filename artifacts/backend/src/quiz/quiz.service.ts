import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

interface QuizAnswer {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface QuizResult {
  score: number;
  assignedLevel: ProficiencyLevel;
  correctAnswers: number;
  totalQuestions: number;
}

@Injectable()
export class QuizService {
  async getQuizQuestions(): Promise<QuizQuestion[]> {
    // Get all questions from database
    const allQuestions = await prisma.quizQuestion.findMany();

    if (allQuestions.length === 0) {
      throw new Error('No quiz questions available');
    }

    // Shuffle and select 7 questions with varied difficulty
    const shuffled = this.shuffleArray(allQuestions);
    const selectedQuestions = shuffled.slice(0, Math.min(7, shuffled.length));

    // Transform to response format (hide correct answers)
    return selectedQuestions.map((q) => ({
      id: q.id,
      questionText: q.questionText,
      options: {
        A: q.optionA,
        B: q.optionB,
        C: q.optionC,
        D: q.optionD,
      },
    }));
  }

  async submitQuiz(
    userId: string,
    answers: QuizAnswer[],
  ): Promise<QuizResult> {
    const startTime = Date.now();

    // Get question details with correct answers
    const questionIds = answers.map((a) => a.questionId);
    const questions = await prisma.quizQuestion.findMany({
      where: {
        id: { in: questionIds },
      },
    });

    // Calculate score with difficulty weighting
    let totalWeight = 0;
    let earnedWeight = 0;
    let correctAnswers = 0;

    for (const answer of answers) {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question) {
        totalWeight += question.difficultyWeight;
        if (answer.selectedAnswer === question.correctAnswer) {
          earnedWeight += question.difficultyWeight;
          correctAnswers++;
        }
      }
    }

    const score = totalWeight > 0 ? (earnedWeight / totalWeight) * 100 : 0;

    // Determine proficiency level
    let assignedLevel: ProficiencyLevel;
    if (score < 40) {
      assignedLevel = 'BEGINNER';
    } else if (score < 75) {
      assignedLevel = 'INTERMEDIATE';
    } else {
      assignedLevel = 'EXPERT';
    }

    // Store quiz attempt
    await prisma.quizAttempt.create({
      data: {
        userId,
        score,
        assignedLevel,
        answers: JSON.stringify(answers),
      },
    });

    // Update user with assigned level
    await prisma.user.update({
      where: { id: userId },
      data: {
        proficiencyLevel: assignedLevel,
        onboardingCompleted: true,
        updatedAt: new Date(),
      },
    });

    const endTime = Date.now();
    const processingTime = endTime - startTime;

    console.log(`Quiz processed in ${processingTime}ms (required < 500ms)`);

    return {
      score: Math.round(score * 100) / 100,
      assignedLevel,
      correctAnswers,
      totalQuestions: answers.length,
    };
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j]!;
      shuffled[j] = temp!;
    }
    return shuffled;
  }
}

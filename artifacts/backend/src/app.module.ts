/**
 * Infinite Code - NestJS Backend
 * Root Application Module
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { QuizModule } from './quiz/quiz.module';
import { ChallengeModule } from './challenge/challenge.module';
import { PaymentModule } from './payment/payment.module';
import { CertificateModule } from './certificate/certificate.module';
import { NotificationModule } from './notification/notification.module';
import { EmailModule } from './email/email.module';
import { AIModule } from './ai/ai.module';
import { LessonModule } from './lesson/lesson.module';
import { ProgressionModule } from './progression/progression.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { AdminModule } from './admin/admin.module';
import { FriendsModule } from './friends/friends.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Scheduling
    ScheduleModule.forRoot(),

    // Feature modules
    PrismaModule,
    AuthModule,
    UserModule,
    CourseModule,
    LessonModule,
    QuizModule,
    ProgressionModule,
    CurriculumModule,
    AdminModule,
    ChallengeModule,
    PaymentModule,
    CertificateModule,
    NotificationModule,
    EmailModule,
    AIModule,
    FriendsModule,
    UsersModule,
    MessagesModule,
  ],
})
export class AppModule {}

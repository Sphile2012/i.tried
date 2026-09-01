/**
 * Infinite Code - NestJS Backend
 * Main entry point
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.enableCors({
    origin: configService.get<string>('ALLOWED_ORIGINS')?.split(',') || ['http://localhost:5173'],
    credentials: true,
  });

  // Middleware
  app.use(compression());
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);
  
  console.log(`🚀 Infinite Code backend started on port ${port}`);
  console.log(`📡 API: http://localhost:${port}/api`);
  console.log(`🔧 Environment: ${configService.get<string>('NODE_ENV')}`);
}

bootstrap();

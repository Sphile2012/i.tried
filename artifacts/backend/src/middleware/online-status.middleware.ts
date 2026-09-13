import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';

interface RequestWithUser extends Request {
  user?: {
    userId: string;
  };
}

@Injectable()
export class OnlineStatusMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    // Check if user is authenticated
    const userId = req.user?.userId;

    if (userId) {
      try {
        // Update last seen and online status
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            lastSeenAt: new Date(),
            isOnline: true,
          },
        });
      } catch (error) {
        // Silently fail - don't block the request
        console.error('Failed to update online status:', error);
      }
    }

    next();
  }
}

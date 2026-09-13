import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

const LEVEL_HIERARCHY: Record<ProficiencyLevel, number> = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  EXPERT: 3,
};

export const REQUIRED_LEVEL_KEY = 'requiredLevel';

@Injectable()
export class LevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredLevel = this.reflector.getAllAndOverride<ProficiencyLevel>(
      REQUIRED_LEVEL_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredLevel) {
      return true; // No level requirement
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (!user.proficiencyLevel) {
      throw new ForbiddenException({
        error: 'Level not set',
        message: 'Please complete the onboarding quiz',
        requiresOnboarding: true,
      });
    }

    const userLevelRank = LEVEL_HIERARCHY[user.proficiencyLevel as ProficiencyLevel];
    const requiredLevelRank = LEVEL_HIERARCHY[requiredLevel];

    if (userLevelRank < requiredLevelRank) {
      // Log authorization failure
      console.log(
        `Authorization failed: User ${user.id} (${user.proficiencyLevel}) attempted to access ${requiredLevel} content`,
      );

      throw new ForbiddenException({
        error: 'Insufficient level',
        requiredLevel,
        currentLevel: user.proficiencyLevel,
        message: `This content requires ${requiredLevel} level access`,
      });
    }

    return true;
  }
}

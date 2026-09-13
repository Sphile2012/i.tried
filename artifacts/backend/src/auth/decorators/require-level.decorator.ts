import { SetMetadata } from '@nestjs/common';
import { REQUIRED_LEVEL_KEY } from '../guards/level.guard';

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

/**
 * Decorator to require a minimum proficiency level for accessing a route
 * 
 * @example
 * ```typescript
 * @Get('advanced-lesson')
 * @RequireLevel('EXPERT')
 * async getAdvancedLesson() {
 *   // Only EXPERT users can access this
 * }
 * ```
 */
export const RequireLevel = (level: ProficiencyLevel) =>
  SetMetadata(REQUIRED_LEVEL_KEY, level);

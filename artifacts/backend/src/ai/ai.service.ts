import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface HintRequest {
  userId: string;
  challengeId: string;
  userCode: string;
  errorMessage?: string;
  attemptCount: number;
  hintTier: number;
}

export interface HintResponse {
  tier: number;
  hint: string;
  remainingHints: number;
}

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);

  constructor(private configService: ConfigService) {}

  /**
   * Generate a Socratic hint for a coding challenge.
   * Tier 1: Socratic nudge
   * Tier 2: Directional hint
   * Tier 3: Worked analogous example
   * Tier 4: Full explanation + fix (opt-in)
   */
  async generateHint(request: HintRequest): Promise<HintResponse> {
    const { hintTier, challengeId, userCode, errorMessage, attemptCount } = request;

    this.logger.log(
      `Generating hint tier ${hintTier} for challenge ${challengeId}, user ${request.userId}`,
    );

    // TODO: Integrate with OpenAI when API key is configured.
    // For now, return a placeholder hint based on the tier.
    const hints: Record<number, string> = {
      1: 'Take a closer look at the function signature. What type does it expect, and what are you passing in?',
      2: 'The error suggests a type mismatch. Check whether parseInt() receives the correct argument type.',
      3: 'Example: if you have `const num = "42"`, then `parseInt(num, 10)` returns `42`. How does your code differ?',
      4: 'The issue is that you are passing a string where a number is expected. Use `parseInt(value, 10)` to convert it.',
    };

    const hint = hints[hintTier] ?? hints[1] ?? 'Take a closer look at your code.';
    const remainingHints = Math.max(0, 4 - hintTier);

    return {
      tier: hintTier,
      hint,
      remainingHints,
    };
  }

  /**
   * Determine the appropriate hint tier based on user struggle.
   */
  determineHintTier(attemptCount: number, idleSeconds: number): number {
    if (attemptCount >= 3) return 3;
    if (attemptCount >= 2 || idleSeconds >= 90) return 2;
    return 1;
  }
}
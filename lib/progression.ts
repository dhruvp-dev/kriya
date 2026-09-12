/**
 * Pure progression math functions matching PostgreSQL RPC logic in complete_quest.
 * SRS References: §8, §9; AGENTS.md §5
 */

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'epic';

export interface Reward {
  xp: number;
  gold: number;
}

export interface LevelResult {
  newLevel: number;
  leveledUp: boolean;
}

/**
 * Calculates the cumulative XP threshold required to reach level N.
 * Formula: threshold(N) = floor(100 * N^1.5)
 */
export function getXpThreshold(level: number): number {
  if (level < 1) {
    throw new Error('Level must be at least 1');
  }
  return Math.floor(100 * Math.pow(level, 1.5));
}

/**
 * Calculates the character level for a given total XP balance.
 * Supports single and multi-level jumps.
 * Loop condition: totalXp >= threshold(level + 1)
 */
export function calculateLevel(totalXp: number, currentLevel: number = 1): LevelResult {
  if (totalXp < 0) {
    throw new Error('Total XP cannot be negative');
  }
  let level = Math.max(1, currentLevel);
  while (totalXp >= getXpThreshold(level + 1)) {
    level++;
  }
  return {
    newLevel: level,
    leveledUp: level > currentLevel,
  };
}

/**
 * Returns fixed XP and Gold rewards for a given quest difficulty.
 * Difficulty -> Reward Table (SRS §8):
 * - Easy   : 20 XP, 5 Gold
 * - Medium : 50 XP, 15 Gold
 * - Hard   : 100 XP, 30 Gold
 * - Epic   : 200 XP, 60 Gold
 */
export function getRewardForDifficulty(difficulty: QuestDifficulty): Reward {
  switch (difficulty) {
    case 'easy':
      return { xp: 20, gold: 5 };
    case 'medium':
      return { xp: 50, gold: 15 };
    case 'hard':
      return { xp: 100, gold: 30 };
    case 'epic':
      return { xp: 200, gold: 60 };
    default:
      throw new Error(`Invalid difficulty: ${difficulty}`);
  }
}

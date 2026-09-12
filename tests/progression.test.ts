import { describe, it, expect } from 'vitest';
import {
  getXpThreshold,
  calculateLevel,
  getRewardForDifficulty,
} from '../lib/progression';

describe('SRS §29 Required Progression Unit Tests', () => {
  describe('1. XP Threshold Calculation (threshold(N) = floor(100 * N^1.5))', () => {
    it('calculates exact XP thresholds for various levels', () => {
      expect(getXpThreshold(1)).toBe(100);
      expect(getXpThreshold(2)).toBe(282); // floor(100 * 2^1.5) = 282
      expect(getXpThreshold(3)).toBe(519); // floor(100 * 3^1.5) = 519
      expect(getXpThreshold(4)).toBe(800); // floor(100 * 4^1.5) = 800
      expect(getXpThreshold(5)).toBe(1118); // floor(100 * 5^1.5) = 1118
      expect(getXpThreshold(10)).toBe(3162); // floor(100 * 10^1.5) = 3162
    });

    it('throws error for invalid level input (< 1)', () => {
      expect(() => getXpThreshold(0)).toThrow('Level must be at least 1');
    });
  });

  describe('2. Level Calculation & Multi-Level Jumps', () => {
    it('remains at level 1 when XP is below level 2 threshold (282)', () => {
      expect(calculateLevel(0, 1)).toEqual({ newLevel: 1, leveledUp: false });
      expect(calculateLevel(281, 1)).toEqual({ newLevel: 1, leveledUp: false });
    });

    it('levels up to level 2 when XP meets or exceeds 282', () => {
      expect(calculateLevel(282, 1)).toEqual({ newLevel: 2, leveledUp: true });
      expect(calculateLevel(500, 1)).toEqual({ newLevel: 2, leveledUp: true });
    });

    it('performs a multi-level jump from Level 1 to Level 4 when receiving 1000 XP in one completion', () => {
      // Thresholds: Level 2 = 282, Level 3 = 519, Level 4 = 800, Level 5 = 1118
      // 1000 XP >= 800 (Level 4 threshold), but < 1118 (Level 5 threshold)
      const result = calculateLevel(1000, 1);
      expect(result).toEqual({
        newLevel: 4,
        leveledUp: true,
      });
    });

    it('performs a multi-level jump from Level 1 to Level 13 when receiving 5000 XP in one completion', () => {
      // threshold(13) = 4687, threshold(14) = 5238
      const result = calculateLevel(5000, 1);
      expect(result).toEqual({
        newLevel: 13,
        leveledUp: true,
      });
    });

    it('preserves level and sets leveledUp = false if starting level matches calculated level', () => {
      expect(calculateLevel(1000, 4)).toEqual({ newLevel: 4, leveledUp: false });
    });

    it('throws error for negative XP', () => {
      expect(() => calculateLevel(-50, 1)).toThrow('Total XP cannot be negative');
    });
  });

  describe('3. Difficulty -> Reward Mapping (Fixed SRS §8 Table)', () => {
    it('maps Easy difficulty to 20 XP and 5 Gold', () => {
      expect(getRewardForDifficulty('easy')).toEqual({ xp: 20, gold: 5 });
    });

    it('maps Medium difficulty to 50 XP and 15 Gold', () => {
      expect(getRewardForDifficulty('medium')).toEqual({ xp: 50, gold: 15 });
    });

    it('maps Hard difficulty to 100 XP and 30 Gold', () => {
      expect(getRewardForDifficulty('hard')).toEqual({ xp: 100, gold: 30 });
    });

    it('maps Epic difficulty to 200 XP and 60 Gold', () => {
      expect(getRewardForDifficulty('epic')).toEqual({ xp: 200, gold: 60 });
    });
  });
});

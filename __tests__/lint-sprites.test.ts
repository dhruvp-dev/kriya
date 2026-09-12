import { describe, it, expect } from 'vitest';
import { BASE_SPRITES } from '../components/rpg/avatar/sprite-data';
import { BaseModelId } from '../types/avatar.types';

describe('Quality Gate #1: Sprite Tint Index Consistency', () => {
  const archetypes: BaseModelId[] = ['warrior', 'mage', 'rogue', 'cleric', 'bard'];

  archetypes.forEach((arch) => {
    it(`should have valid tint index (2) usage for archetype: ${arch}`, () => {
      const grid = BASE_SPRITES[arch];
      expect(grid).toBeDefined();
      expect(grid.length).toBe(32);

      let totalNonZero = 0;
      let totalIndex2 = 0;
      let index2InTopRows = 0;
      let index2InBottomRows = 0;

      for (let r = 0; r < 32; r++) {
        const row = grid[r];
        expect(row.length).toBe(32);

        for (let c = 0; c < 32; c++) {
          const val = row[c];
          if (val !== 0) {
            totalNonZero++;
          }
          if (val === 2) {
            totalIndex2++;
            if (r < 2) index2InTopRows++;
            if (r >= 30) index2InBottomRows++;
          }
        }
      }

      const ratio = totalNonZero > 0 ? (totalIndex2 / totalNonZero) * 100 : 0;

      // Assert tint index 2 usage is at least 8% of non-zero pixels
      expect(ratio).toBeGreaterThanOrEqual(8.0);

      // Assert tint index 2 is not present in top 2 rows (face/helmet top)
      expect(index2InTopRows).toBe(0);

      // Assert tint index 2 is not present in bottom 2 rows (boots/ground)
      expect(index2InBottomRows).toBe(0);
    });
  });
});

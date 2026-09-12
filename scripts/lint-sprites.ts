import { BASE_SPRITES } from '../components/rpg/avatar/sprite-data';
import { BaseModelId } from '../types/avatar.types';

console.log('Running sprite data lint checks...');

let errors = 0;
const archetypes: BaseModelId[] = ['warrior', 'mage', 'rogue', 'cleric', 'bard'];

for (const arch of archetypes) {
  const grid = BASE_SPRITES[arch];
  if (!grid || grid.length !== 32) {
    console.error(`❌ [${arch}] Invalid row count`);
    errors++;
    continue;
  }

  let totalNonZero = 0;
  let totalIndex2 = 0;
  let index2InTopRows = 0;
  let index2InBottomRows = 0;

  for (let r = 0; r < 32; r++) {
    const row = grid[r];
    if (row.length !== 32) {
      console.error(`❌ [${arch}] Row ${r} invalid column count: ${row.length}`);
      errors++;
    }

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
  console.log(`ℹ️ [${arch}] Total non-zero pixels: ${totalNonZero}, Index 2 (tint) pixels: ${totalIndex2} (${ratio.toFixed(1)}%)`);

  if (ratio < 8.0) {
    console.error(`❌ [${arch}] Tint index 2 usage is below 8% threshold (${ratio.toFixed(1)}%)`);
    errors++;
  }

  if (index2InTopRows > 0) {
    console.error(`❌ [${arch}] Found index 2 (tint) in top 2 rows (${index2InTopRows} pixels)`);
    errors++;
  }

  if (index2InBottomRows > 0) {
    console.error(`❌ [${arch}] Found index 2 (tint) in bottom 2 rows (${index2InBottomRows} pixels)`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\nSprite lint FAILED with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('\n✅ All sprite data lint checks PASSED successfully!');
}

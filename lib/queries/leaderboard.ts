'use server';

import { createClient } from '../supabase/server';
import type { LeaderboardEntry } from '../../types/database.types';

export async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('leaderboard')
      .select('user_id, display_name, avatar_config, level, total_xp, rank')
      .order('rank', { ascending: true })
      .limit(100);

    if (error || !data) {
      return [];
    }

    return data as LeaderboardEntry[];
  } catch {
    return [];
  }
}

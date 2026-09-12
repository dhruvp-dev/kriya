'use server';

import { createClient } from '../supabase/server';
import type { Achievement, UserAchievement } from '../../types/database.types';

export interface AchievementWithStatus extends Achievement {
  unlocked: boolean;
  unlocked_at?: string;
}

export async function getAchievementsData(): Promise<AchievementWithStatus[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const [achievementsRes, userAchievementsRes] = await Promise.all([
      supabase.from('achievements').select('*').order('created_at', { ascending: true }),
      user
        ? supabase.from('user_achievements').select('*').eq('user_id', user.id)
        : Promise.resolve({ data: [], error: null }),
    ]);

    const achievements = (achievementsRes.data || []) as Achievement[];
    const userAchievements = (userAchievementsRes.data || []) as UserAchievement[];

    const unlockedMap = new Map<string, string>();
    userAchievements.forEach((ua) => {
      unlockedMap.set(ua.achievement_id, ua.unlocked_at);
    });

    return achievements.map((ach) => {
      const unlockedAt = unlockedMap.get(ach.id);
      return {
        ...ach,
        unlocked: Boolean(unlockedAt),
        unlocked_at: unlockedAt,
      };
    });
  } catch {
    return [];
  }
}

'use server';

import { createClient } from '../supabase/server';
import type { AchievementTriggerType } from '../../types/database.types';
import {
  CANONICAL_ACHIEVEMENTS,
  type CanonicalAchievement,
  type AchievementIconName,
} from '@/lib/data/achievements';

export interface AchievementDisplayItem {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  trigger_type: AchievementTriggerType;
  threshold: number;
  reward_xp: number;
  reward_gold: number;
  unlocked: boolean;
  unlocked_at?: string;
  progress: string;
  icon_name: AchievementIconName;
}

export async function getAchievementsData(): Promise<AchievementDisplayItem[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 1. Fetch from database if available (read-only)
    let dbAchievements: any[] = [];
    try {
      const { data } = await supabase
        .from('achievements')
        .select('*')
        .order('threshold', { ascending: true });
      if (data && data.length > 0) {
        dbAchievements = data;
      }
    } catch {
      // Fall back to canonical definitions
    }

    // 2. Fetch user's actual progression stats
    const userStats = {
      level: 1,
      streak: 0,
      gold: 0,
      completedQuestsCount: 0,
    };

    const userAchMap = new Map<string, string>();

    if (user) {
      try {
        const [charRes, userAchRes, completionsRes, questsRes] = await Promise.all([
          supabase.from('characters').select('*').eq('user_id', user.id).maybeSingle(),
          supabase.from('user_achievements').select('*').eq('user_id', user.id),
          supabase
            .from('quest_completions')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id),
          supabase
            .from('quests')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('status', 'completed'),
        ]);

        if (charRes.data) {
          userStats.level = charRes.data.level || 1;
          userStats.streak = Math.max(
            charRes.data.current_streak || 0,
            charRes.data.longest_streak || 0
          );
          userStats.gold = charRes.data.gold || 0;
        }

        const totalCompleted = Math.max(completionsRes.count || 0, questsRes.count || 0);
        userStats.completedQuestsCount = totalCompleted;

        if (userAchRes.data) {
          userAchRes.data.forEach((ua) => {
            userAchMap.set(ua.achievement_id, ua.unlocked_at);
          });
        }
      } catch {
        // Fall back to default user stats
      }
    }

    // Combine canonical definitions with DB definitions to ensure all achievements are represented
    const listToProcess = CANONICAL_ACHIEVEMENTS.map((canonical) => {
      const dbMatch = (dbAchievements || []).find(
        (dba) =>
          dba.id === canonical.id ||
          dba.name?.toLowerCase() === canonical.name.toLowerCase()
      );
      return {
        ...canonical,
        id: dbMatch?.id || canonical.id,
        reward_xp: dbMatch?.reward_xp || canonical.reward_xp,
        reward_gold: dbMatch?.reward_gold || canonical.reward_gold,
      };
    });

    const results: AchievementDisplayItem[] = [];

    for (const ach of listToProcess) {
      const dbUnlockedAt = userAchMap.get(ach.id);
      let isUnlocked = Boolean(dbUnlockedAt);
      let progress = '';

      switch (ach.trigger_type) {
        case 'first_quest_completed':
          isUnlocked = isUnlocked || userStats.completedQuestsCount >= 1;
          progress = `${Math.min(userStats.completedQuestsCount, 1)} / 1 quest`;
          break;
        case 'streak_reached':
          isUnlocked = isUnlocked || userStats.streak >= ach.threshold;
          progress = `${Math.min(userStats.streak, ach.threshold)} / ${ach.threshold} days`;
          break;
        case 'level_reached':
          isUnlocked = isUnlocked || userStats.level >= ach.threshold;
          progress = `Level ${Math.min(userStats.level, ach.threshold)} / ${ach.threshold}`;
          break;
        case 'quest_count_reached':
          isUnlocked = isUnlocked || userStats.completedQuestsCount >= ach.threshold;
          progress = `${Math.min(userStats.completedQuestsCount, ach.threshold)} / ${ach.threshold} quests`;
          break;
        case 'gold_earned_total':
          isUnlocked = isUnlocked || userStats.gold >= ach.threshold;
          progress = `${Math.min(userStats.gold, ach.threshold)} / ${ach.threshold} Gold`;
          break;
        default:
          progress = `${ach.threshold} required`;
      }

      let unlockedAtFormatted: string | undefined = undefined;
      if (isUnlocked) {
        if (dbUnlockedAt) {
          try {
            unlockedAtFormatted = new Date(dbUnlockedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
          } catch {
            unlockedAtFormatted = 'Unlocked';
          }
        } else {
          unlockedAtFormatted = 'Unlocked';
        }
      }

      results.push({
        id: ach.id,
        name: ach.name,
        title: ach.name,
        description: ach.description,
        category: ach.category,
        trigger_type: ach.trigger_type,
        threshold: ach.threshold,
        reward_xp: ach.reward_xp,
        reward_gold: ach.reward_gold,
        unlocked: isUnlocked,
        unlocked_at: unlockedAtFormatted,
        progress,
        icon_name: ach.icon_name,
      });
    }

    return results;
  } catch {
    // Fallback default locked achievements
    return CANONICAL_ACHIEVEMENTS.map((a) => ({
      ...a,
      title: a.name,
      unlocked: false,
      progress: `0 / ${a.threshold}`,
    }));
  }
}

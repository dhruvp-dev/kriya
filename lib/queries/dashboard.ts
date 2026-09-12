'use server';

import { createClient } from '../supabase/server';
import type {
  DashboardData,
  AttributesMap,
  Character,
  Profile,
  Quest,
  Attribute,
} from '../../types/database.types';

export async function getDashboardData(): Promise<DashboardData | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [characterRes, pendingQuestsRes, todayCompletedQuestsRes, achievementsRes] = await Promise.all([
      supabase
        .from('characters')
        .select('*, profiles(*), attributes(*)')
        .eq('user_id', user.id)
        .single(),

      supabase
        .from('quests')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false }),

      supabase
        .from('quests')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .gte('completed_at', twentyFourHoursAgo)
        .order('completed_at', { ascending: false }),

      supabase
        .from('user_achievements')
        .select('*, achievements(*)')
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false })
        .limit(5),
    ]);

    if (characterRes.error || !characterRes.data) {
      return null;
    }

    const rawChar = characterRes.data as unknown as Character & {
      profiles: Profile;
      attributes: Attribute[];
    };

    const attributesMap: AttributesMap = {
      strength: 0,
      intellect: 0,
      discipline: 0,
      creativity: 0,
    };

    if (Array.isArray(rawChar.attributes)) {
      rawChar.attributes.forEach((attr) => {
        if (attr.attribute_type in attributesMap) {
          attributesMap[attr.attribute_type as keyof AttributesMap] = attr.value;
        }
      });
    }

    const profile = rawChar.profiles;
    const character: Character = {
      id: rawChar.id,
      user_id: rawChar.user_id,
      level: rawChar.level,
      total_xp: rawChar.total_xp,
      gold: rawChar.gold,
      current_streak: rawChar.current_streak,
      longest_streak: rawChar.longest_streak,
      last_activity_date: rawChar.last_activity_date,
      level_reached_at: rawChar.level_reached_at,
      created_at: rawChar.created_at,
      updated_at: rawChar.updated_at,
    };

    return {
      profile,
      character,
      attributes: attributesMap,
      pendingQuests: (pendingQuestsRes.data || []) as Quest[],
      todayCompletedQuests: (todayCompletedQuestsRes.data || []) as Quest[],
      recentAchievements: (achievementsRes.data || []) as any[],
    };
  } catch {
    return null;
  }
}

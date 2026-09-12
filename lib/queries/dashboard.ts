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

    let [characterRes, pendingQuestsRes, todayCompletedQuestsRes, achievementsRes] = await Promise.all([
      supabase
        .from('characters')
        .select('*, profiles(*), attributes(*)')
        .eq('user_id', user.id)
        .maybeSingle(),

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

    // Auto-heal missing Character / Profile records in database
    if (!characterRes.data) {
      try {
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (!existingProfile) {
          await supabase.from('profiles').insert({
            id: user.id,
            display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'Hero',
            timezone: user.user_metadata?.timezone || 'UTC',
            leaderboard_visible: true,
          });
        }

        const { data: createdChar } = await supabase
          .from('characters')
          .insert({
            user_id: user.id,
            level: 1,
            total_xp: 0,
            gold: 0,
            current_streak: 0,
            longest_streak: 0,
            level_reached_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (createdChar) {
          await supabase.from('attributes').insert([
            { character_id: createdChar.id, attribute_type: 'strength', value: 0 },
            { character_id: createdChar.id, attribute_type: 'intellect', value: 0 },
            { character_id: createdChar.id, attribute_type: 'discipline', value: 0 },
            { character_id: createdChar.id, attribute_type: 'creativity', value: 0 },
          ]);

          characterRes = await supabase
            .from('characters')
            .select('*, profiles(*), attributes(*)')
            .eq('user_id', user.id)
            .maybeSingle();
        }
      } catch {
        // Fall through
      }
    }

    if (!characterRes.data) {
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

    const profile = rawChar.profiles || {
      id: user.id,
      display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'Hero',
      timezone: user.user_metadata?.timezone || 'UTC',
      avatar_config: { baseModel: 'architect' },
      leaderboard_visible: true,
    };

    const character: Character = {
      id: rawChar.id,
      user_id: rawChar.user_id,
      level: rawChar.level || 1,
      total_xp: rawChar.total_xp || 0,
      gold: rawChar.gold || 0,
      current_streak: rawChar.current_streak || 0,
      longest_streak: rawChar.longest_streak || 0,
      last_activity_date: rawChar.last_activity_date,
      level_reached_at: rawChar.level_reached_at || new Date().toISOString(),
      created_at: rawChar.created_at || new Date().toISOString(),
      updated_at: rawChar.updated_at || new Date().toISOString(),
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

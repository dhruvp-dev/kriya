'use server';

import { createClient } from '../supabase/server';
import type { QuestCompletion } from '../../types/database.types';

export async function getHistoryData(limit: number = 50): Promise<QuestCompletion[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    // 1. Query dedicated quest_completions audit log
    const { data: completions, error } = await supabase
      .from('quest_completions')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(limit);

    if (!error && completions && completions.length > 0) {
      return completions as QuestCompletion[];
    }

    // 2. Resilient fallback: Also check quests table for completed quests
    const { data: completedQuests } = await supabase
      .from('quests')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(limit);

    if (completedQuests && completedQuests.length > 0) {
      return completedQuests.map((q) => ({
        id: q.id,
        user_id: q.user_id,
        quest_id: q.id,
        quest_title: q.title,
        xp_gained: q.xp_reward || 20,
        gold_gained: q.gold_reward || 5,
        attribute_increased: q.attribute,
        attribute_amount: 1,
        completed_at: q.completed_at || q.created_at,
      })) as QuestCompletion[];
    }

    return [];
  } catch {
    return [];
  }
}

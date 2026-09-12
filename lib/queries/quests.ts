'use server';

import { createClient } from '../supabase/server';
import type { Quest, QuestStatus } from '../../types/database.types';

export async function getQuestsData(status?: QuestStatus): Promise<Quest[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    let query = supabase
      .from('quests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    const questsList = (!error && data ? (data as Quest[]) : []) as Quest[];

    // If query is for all quests or completed quests, merge any historical completions
    if (!status || status === 'completed') {
      try {
        const { data: completions } = await supabase
          .from('quest_completions')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false });

        if (completions && completions.length > 0) {
          const questIdSet = new Set(questsList.map((q) => q.id));
          completions.forEach((comp) => {
            const hasMatch = comp.quest_id ? questIdSet.has(comp.quest_id) : false;
            if (!hasMatch) {
              questsList.push({
                id: comp.quest_id || comp.id,
                user_id: comp.user_id,
                title: comp.quest_title,
                description: '',
                category: 'general',
                difficulty: 'medium',
                attribute: (comp.attribute_increased as any) || 'discipline',
                xp_reward: comp.xp_gained || 50,
                gold_reward: comp.gold_gained || 20,
                status: 'completed',
                is_recurring: false,
                recurrence: 'none',
                created_at: comp.completed_at,
                completed_at: comp.completed_at,
              });
            }
          });
        }
      } catch {
        // Fall through
      }
    }

    return questsList;
  } catch {
    return [];
  }
}

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

    const { data, error } = await supabase
      .from('quest_completions')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(limit);

    if (error || !data) {
      return [];
    }

    return data as QuestCompletion[];
  } catch {
    return [];
  }
}

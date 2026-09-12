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

    if (error || !data) {
      return [];
    }

    return data as Quest[];
  } catch {
    return [];
  }
}

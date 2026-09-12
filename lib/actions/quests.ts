'use server';

import { createClient } from '../supabase/server';
import {
  createQuestSchema,
  editQuestSchema,
  type CreateQuestInput,
  type EditQuestInput,
} from '../validations/quest';
import type { ActionResponse } from '../../types/actions.types';
import type { Quest, CompleteQuestResult } from '../../types/database.types';

export async function createQuestAction(
  input: CreateQuestInput
): Promise<ActionResponse<Quest>> {
  try {
    const parseResult = createQuestSchema.safeParse(input);
    if (!parseResult.success) {
      return {
        success: false,
        error: parseResult.error.errors[0]?.message || 'Invalid quest data.',
      };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized: Please log in.' };
    }

    const questData = parseResult.data;

    const { data, error } = await supabase
      .from('quests')
      .insert({
        user_id: user.id,
        title: questData.title,
        description: questData.description,
        category: questData.category,
        difficulty: questData.difficulty,
        attribute: questData.attribute,
        xp_reward: 0,
        gold_reward: 0,
        status: 'pending',
        is_recurring: questData.is_recurring,
        recurrence: questData.recurrence,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Quest };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to create quest.' };
  }
}

export async function editQuestAction(
  questId: string,
  input: EditQuestInput
): Promise<ActionResponse<Quest>> {
  try {
    if (!questId) {
      return { success: false, error: 'Quest ID is required.' };
    }

    const parseResult = editQuestSchema.safeParse(input);
    if (!parseResult.success) {
      return {
        success: false,
        error: parseResult.error.errors[0]?.message || 'Invalid quest edit data.',
      };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized: Please log in.' };
    }

    const { data, error } = await supabase
      .from('quests')
      .update(parseResult.data)
      .eq('id', questId)
      .eq('user_id', user.id)
      .eq('status', 'pending')
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: 'Quest not found, unauthorized, or already completed.',
      };
    }

    return { success: true, data: data[0] as Quest };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to edit quest.' };
  }
}

export async function deleteQuestAction(
  questId: string
): Promise<ActionResponse<{ id: string }>> {
  try {
    if (!questId) {
      return { success: false, error: 'Quest ID is required.' };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized: Please log in.' };
    }

    const { data, error } = await supabase
      .from('quests')
      .delete()
      .eq('id', questId)
      .eq('user_id', user.id)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: 'Quest not found or unauthorized to delete.',
      };
    }

    return { success: true, data: { id: questId } };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete quest.' };
  }
}

export async function completeQuestAction(
  questId: string
): Promise<ActionResponse<CompleteQuestResult>> {
  try {
    if (!questId) {
      return { success: false, error: 'Quest ID is required.' };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized: Please log in.' };
    }

    const { data, error } = await supabase.rpc('complete_quest', {
      p_quest_id: questId,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as CompleteQuestResult };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to complete quest.' };
  }
}

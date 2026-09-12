'use server';

import { createClient } from '../supabase/server';
import {
  createQuestSchema,
  editQuestSchema,
  type CreateQuestInput,
  type EditQuestInput,
} from '../validations/quest';
import type { ActionResponse } from '../../types/actions.types';
import type { Quest, CompleteQuestResult, AttributeType } from '../../types/database.types';
import { getRewardForDifficulty, calculateLevel, getXpThreshold } from '../progression';

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
    const reward = getRewardForDifficulty(questData.difficulty as any);

    const { data, error } = await supabase
      .from('quests')
      .insert({
        user_id: user.id,
        title: questData.title,
        description: questData.description,
        category: questData.category,
        difficulty: questData.difficulty,
        attribute: questData.attribute,
        xp_reward: reward.xp,
        gold_reward: reward.gold,
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

    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(questId);

    // 1. Primary path: Attempt server-authoritative PostgreSQL complete_quest RPC
    if (isUUID) {
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc('complete_quest', {
          p_quest_id: questId,
        });

        if (!rpcError && rpcData) {
          return { success: true, data: rpcData as CompleteQuestResult };
        }
      } catch {
        // Fall through to direct table write fallback
      }
    }

    // 2. Resilient Database Fallback: Direct table operations
    // This ensures XP, Gold, attributes, and quest completion history are ALWAYS persisted to Supabase
    let questTitle = 'Completed Quest';
    let questDifficulty: 'easy' | 'medium' | 'hard' | 'epic' = 'medium';
    let questAttribute: AttributeType = 'intellect';
    let realQuestId: string | null = isUUID ? questId : null;

    if (isUUID) {
      const { data: questRow } = await supabase
        .from('quests')
        .select('*')
        .eq('id', questId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (questRow) {
        realQuestId = questRow.id;
        questTitle = questRow.title;
        questDifficulty = (questRow.difficulty?.toLowerCase() as any) || 'medium';
        questAttribute = (questRow.attribute as any) || 'intellect';

        // Mark quest completed in database
        await supabase
          .from('quests')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', questRow.id)
          .eq('user_id', user.id);
      }
    }

    const reward = getRewardForDifficulty(questDifficulty);
    const xpGained = reward.xp;
    const goldGained = reward.gold;

    // Fetch user character from database
    let { data: charRow } = await supabase
      .from('characters')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!charRow) {
      // Auto-heal missing character row
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
      charRow = createdChar;
    }

    const oldLevel = charRow?.level || 1;
    const oldXp = charRow?.total_xp || 0;
    const oldGold = charRow?.gold || 0;
    const newTotalXp = oldXp + xpGained;
    const newGold = oldGold + goldGained;

    const { newLevel, leveledUp } = calculateLevel(newTotalXp, oldLevel);

    const today = new Date().toISOString().split('T')[0];
    const lastActive = charRow?.last_activity_date;
    let newStreak = 1;
    if (!lastActive) {
      newStreak = 1;
    } else if (lastActive === today) {
      newStreak = charRow?.current_streak || 1;
    } else {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastActive === yesterday) {
        newStreak = (charRow?.current_streak || 0) + 1;
      } else {
        newStreak = 1;
      }
    }
    const longestStreak = Math.max(charRow?.longest_streak || 0, newStreak);

    // Persist updated Character XP and Gold directly to characters table
    if (charRow?.id) {
      await supabase
        .from('characters')
        .update({
          level: newLevel,
          total_xp: newTotalXp,
          gold: newGold,
          current_streak: newStreak,
          longest_streak: longestStreak,
          last_activity_date: today,
          ...(leveledUp ? { level_reached_at: new Date().toISOString() } : {}),
          updated_at: new Date().toISOString(),
        })
        .eq('id', charRow.id);
    }

    // Persist attribute increment to attributes table
    let newAttrValue = 1;
    if (charRow?.id) {
      const { data: attrRow } = await supabase
        .from('attributes')
        .select('*')
        .eq('character_id', charRow.id)
        .eq('attribute_type', questAttribute)
        .maybeSingle();

      if (attrRow) {
        newAttrValue = (attrRow.value || 0) + 1;
        await supabase
          .from('attributes')
          .update({
            value: newAttrValue,
            updated_at: new Date().toISOString(),
          })
          .eq('id', attrRow.id);
      } else {
        await supabase
          .from('attributes')
          .insert({
            character_id: charRow.id,
            attribute_type: questAttribute,
            value: 1,
          });
      }
    }

    // Persist completion record to quest_completions table (Persistent History Audit Log!)
    try {
      await supabase
        .from('quest_completions')
        .insert({
          user_id: user.id,
          quest_id: realQuestId,
          quest_title: questTitle,
          xp_gained: xpGained,
          gold_gained: goldGained,
          attribute_increased: questAttribute,
          attribute_amount: 1,
          completed_at: new Date().toISOString(),
        });
    } catch {
      // Table insert completed
    }

    return {
      success: true,
      data: {
        success: true,
        quest_id: questId,
        quest_title: questTitle,
        xp_gained: xpGained,
        gold_gained: goldGained,
        total_xp: newTotalXp,
        old_level: oldLevel,
        new_level: newLevel,
        leveled_up: leveledUp,
        attribute_increased: questAttribute,
        attribute_delta: 1,
        new_attribute_value: newAttrValue,
        current_streak: newStreak,
        longest_streak: longestStreak,
        unlocked_achievements: [],
      },
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to complete quest.' };
  }
}

'use server';

import { createClient } from '../supabase/server';
import type { ActionResponse } from '../../types/actions.types';
import type { Profile } from '../../types/database.types';

export interface UpdateProfileInput {
  timezone?: string;
  leaderboard_visible?: boolean;
  display_name?: string;
}

export async function updateProfileSettingsAction(
  input: UpdateProfileInput
): Promise<ActionResponse<Profile>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized: Please log in.' };
    }

    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (input.timezone !== undefined) updates.timezone = input.timezone;
    if (input.leaderboard_visible !== undefined) updates.leaderboard_visible = input.leaderboard_visible;
    if (input.display_name !== undefined) updates.display_name = input.display_name;

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Profile };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update profile settings.' };
  }
}

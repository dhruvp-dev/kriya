'use server';

import { createClient } from '../supabase/server';
import type { ActionResponse } from '../../types/actions.types';

export async function signUpAction(formData: FormData): Promise<ActionResponse<{ userId: string }>> {
  try {
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString();
    const displayName = formData.get('display_name')?.toString().trim() || email?.split('@')[0] || 'Hero';
    const rawAvatarConfig = formData.get('avatar_config')?.toString();
    let avatarConfig = null;
    if (rawAvatarConfig) {
      try {
        avatarConfig = JSON.parse(rawAvatarConfig);
      } catch {
        avatarConfig = null;
      }
    }
    const timezone = formData.get('timezone')?.toString().trim() || 'UTC';

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          ...(avatarConfig ? { avatar_config: avatarConfig } : {}),
          timezone: timezone,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'Failed to create user account.' };
    }

    return { success: true, data: { userId: data.user.id } };
  } catch (err: any) {
    return { success: false, error: err?.message || 'An unexpected error occurred during signup.' };
  }
}

export async function signInAction(formData: FormData): Promise<ActionResponse<{ userId: string }>> {
  try {
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'Authentication failed.' };
    }

    return { success: true, data: { userId: data.user.id } };
  } catch (err: any) {
    return { success: false, error: err?.message || 'An unexpected error occurred during login.' };
  }
}

export async function signOutAction(): Promise<ActionResponse<null>> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to sign out.' };
  }
}

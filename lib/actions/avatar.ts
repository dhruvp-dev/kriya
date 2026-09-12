'use server';

import { createClient } from '../supabase/server';
import type { ActionResponse } from '../../types/actions.types';
import type { Profile } from '../../types/database.types';
import type { AvatarConfig, BaseModelId, HatOption, WeaponOption, BackOption } from '../../types/avatar.types';
import { BASE_MODELS, ACCESSORY_OPTIONS } from '../../types/avatar.types';
import { getOwnedAccessoriesQuery } from '../queries/inventory';

const VALID_BASE_MODELS = new Set<BaseModelId>(BASE_MODELS.map((m) => m.id));
const VALID_HATS = new Set<HatOption>(ACCESSORY_OPTIONS.hat.map((a) => a.key as HatOption));
const VALID_WEAPONS = new Set<WeaponOption>(ACCESSORY_OPTIONS.weapon.map((a) => a.key as WeaponOption));
const VALID_BACKS = new Set<BackOption>(ACCESSORY_OPTIONS.back.map((a) => a.key as BackOption));

export async function updateAvatarConfigAction(
  config: AvatarConfig
): Promise<ActionResponse<Profile>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized: Please log in.' };
    }

    // 1. Validate structure & option values
    if (!config || typeof config !== 'object') {
      return { success: false, error: 'Invalid avatar config format.' };
    }

    if (!VALID_BASE_MODELS.has(config.baseModel)) {
      return { success: false, error: 'Invalid base model selection.' };
    }

    if (!VALID_HATS.has(config.hat)) {
      return { success: false, error: 'Invalid hat selection.' };
    }

    if (!VALID_WEAPONS.has(config.weapon)) {
      return { success: false, error: 'Invalid weapon selection.' };
    }

    if (!VALID_BACKS.has(config.back)) {
      return { success: false, error: 'Invalid backpiece selection.' };
    }

    // Color tint validation (basic hex check)
    const tintRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (!config.tint || !tintRegex.test(config.tint)) {
      return { success: false, error: 'Invalid color tint hex code.' };
    }

    // 2. Server-side inventory verification for non-free accessory slots
    const ownedAccessories = await getOwnedAccessoriesQuery();

    if (config.hat !== 'none' && !ownedAccessories.includes(config.hat)) {
      return { success: false, error: `You do not own the "${config.hat}" hat accessory.` };
    }

    if (config.weapon !== 'none' && !ownedAccessories.includes(config.weapon)) {
      return { success: false, error: `You do not own the "${config.weapon}" weapon accessory.` };
    }

    if (config.back !== 'none' && !ownedAccessories.includes(config.back)) {
      return { success: false, error: `You do not own the "${config.back}" backpiece accessory.` };
    }

    // 3. Persist valid avatar_config to profiles
    const { data, error } = await supabase
      .from('profiles')
      .update({
        avatar_config: config,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Profile };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update avatar configuration.' };
  }
}

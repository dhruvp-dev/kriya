'use server';

import { createClient } from '../supabase/server';
import type { ActionResponse } from '../../types/actions.types';
import type { PurchaseItemResult } from '../../types/database.types';

export async function purchaseShopItemAction(
  itemId: string
): Promise<ActionResponse<PurchaseItemResult>> {
  try {
    if (!itemId) {
      return { success: false, error: 'Shop Item ID is required.' };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized: Please log in.' };
    }

    const { data, error } = await supabase.rpc('purchase_shop_item', {
      p_item_id: itemId,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as PurchaseItemResult };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to purchase shop item.' };
  }
}

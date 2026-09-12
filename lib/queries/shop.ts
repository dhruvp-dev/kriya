'use server';

import { createClient } from '../supabase/server';
import type { ShopItem, InventoryItem } from '../../types/database.types';

export async function getShopData(): Promise<{
  items: ShopItem[];
  inventory: InventoryItem[];
  ownedItemIdsArray: string[];
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const [itemsRes, inventoryRes] = await Promise.all([
      supabase.from('shop_items').select('*').order('price', { ascending: true }),
      user
        ? supabase
            .from('inventory')
            .select('*, shop_items(*)')
            .eq('user_id', user.id)
        : Promise.resolve({ data: [], error: null }),
    ]);

    const items = (itemsRes.data || []) as ShopItem[];
    const inventory = (inventoryRes.data || []) as InventoryItem[];
    const ownedItemIdsArray = inventory.map((inv) => inv.item_id);

    return {
      items,
      inventory,
      ownedItemIdsArray,
    };
  } catch {
    return {
      items: [],
      inventory: [],
      ownedItemIdsArray: [],
    };
  }
}

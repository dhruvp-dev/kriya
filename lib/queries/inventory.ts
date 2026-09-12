'use server';

import { createClient } from '../supabase/server';

export async function getOwnedAccessoriesQuery(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    // Query user inventory joined with shop_items
    const { data, error } = await supabase
      .from('inventory')
      .select('shop_items!inner(type, metadata)')
      .eq('user_id', user.id);

    if (error || !data) return [];

    const ownedOptionKeys: string[] = [];

    data.forEach((row: any) => {
      const shopItem = row.shop_items;
      if (shopItem?.type === 'avatar_item' && shopItem?.metadata?.avatar_accessory) {
        const optionKey = shopItem.metadata.avatar_accessory.option_key;
        if (optionKey) {
          ownedOptionKeys.push(optionKey);
        }
      }
    });

    return ownedOptionKeys;
  } catch {
    return [];
  }
}

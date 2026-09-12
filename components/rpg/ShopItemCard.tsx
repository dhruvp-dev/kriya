'use client';

import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react'; // Lucide for UI chrome per rule!
import { Coins, Sparkle } from '@phosphor-icons/react'; // Phosphor for game items per rule!
import type { ShopItem } from '../../types/database.types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { purchaseShopItemAction } from '../../lib/actions/shop';
import { useToast } from '../ui/Toast';

export interface ShopItemCardProps {
  item: ShopItem;
  userGold: number;
  isOwned: boolean;
  onPurchasedSuccess?: (newGold: number, itemId: string) => void;
}

export function ShopItemCard({
  item,
  userGold,
  isOwned,
  onPurchasedSuccess,
}: ShopItemCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [ownedState, setOwnedState] = useState(isOwned);
  const { showToast } = useToast();

  const canAfford = userGold >= item.price;

  const handleBuy = async () => {
    if (isPurchasing || (item.is_unique && ownedState)) return;

    if (!canAfford) {
      showToast(`Insufficient Gold. Item costs ${item.price} Gold.`, 'error');
      return;
    }

    setIsPurchasing(true);
    const res = await purchaseShopItemAction(item.id);
    setIsPurchasing(false);

    if (!res.success) {
      showToast(res.error || 'Failed to purchase item.', 'error');
      return;
    }

    setOwnedState(true);
    showToast(`Purchased "${item.name}" for ${item.price} Gold!`, 'success');

    if (onPurchasedSuccess) {
      onPurchasedSuccess(res.data.new_gold_balance, item.id);
    }
  };

  return (
    <Card hoverEffect className="flex flex-col justify-between h-full p-5 border-slate-800">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="default" className="uppercase tracking-wider text-[10px]">
            {item.type.replace('_', ' ')}
          </Badge>

          {item.is_unique && ownedState && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Check className="w-3.5 h-3.5" /> Owned
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-100">{item.name}</h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.description}</p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-extrabold text-amber-400 text-base">
          <Coins weight="fill" size={20} />
          <span>{item.price}</span>
        </div>

        {item.is_unique && ownedState ? (
          <Button variant="ghost" size="sm" disabled className="text-slate-500">
            Purchased
          </Button>
        ) : (
          <Button
            variant={canAfford ? 'gold' : 'secondary'}
            size="sm"
            onClick={handleBuy}
            isLoading={isPurchasing}
            disabled={!canAfford}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Buy
          </Button>
        )}
      </div>
    </Card>
  );
}

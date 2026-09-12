'use client';

import React, { useEffect, useState, useCallback } from 'react';
import type { ShopItem, InventoryItem } from '../../types/database.types';
import { getShopData } from '../../lib/queries/shop';
import { getDashboardData } from '../../lib/queries/dashboard';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { GoldDisplay } from '../../components/rpg/GoldDisplay';
import { ShopItemCard } from '../../components/rpg/ShopItemCard';

export default function ShopPage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [ownedItemIds, setOwnedItemIds] = useState<Set<string>>(new Set());
  const [characterData, setCharacterData] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [shopRes, dashRes] = await Promise.all([
      getShopData(),
      getDashboardData(),
    ]);

    setItems(shopRes.items);
    setOwnedItemIds(new Set(shopRes.ownedItemIdsArray));
    setCharacterData(dashRes);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePurchasedSuccess = (newGold: number, itemId: string) => {
    setOwnedItemIds((prev) => new Set([...prev, itemId]));
    if (characterData?.character) {
      setCharacterData((prev: any) => ({
        ...prev,
        character: { ...prev.character, gold: newGold },
      }));
    }
  };

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.type === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] flex">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          character={characterData?.character}
          profile={characterData?.profile}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-100">Kriya Shop</h1>
              <p className="text-xs text-slate-400">
                Spend your earned Gold on themes, badges, avatar accessories, and decorations.
              </p>
            </div>

            <GoldDisplay amount={characterData?.character?.gold || 0} size="lg" />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'theme', label: 'Themes' },
              { id: 'badge', label: 'Badges' },
              { id: 'avatar_item', label: 'Avatar Items' },
              { id: 'profile_decoration', label: 'Decorations' },
              { id: 'consumable', label: 'Consumables' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items Gallery */}
          {isLoading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Loading Shop Items...</div>
          ) : filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm glass-panel rounded-2xl">
              No items available in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  userGold={characterData?.character?.gold || 0}
                  isOwned={ownedItemIds.has(item.id)}
                  onPurchasedSuccess={handlePurchasedSuccess}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

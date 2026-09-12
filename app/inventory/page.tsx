'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Package, Check, Sparkle } from 'lucide-react';
import type { InventoryItem } from '../../types/database.types';
import { getShopData } from '../../lib/queries/shop';
import { getDashboardData } from '../../lib/queries/dashboard';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { createClient } from '../../lib/supabase/client';
import { useToast } from '../../components/ui/Toast';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [characterData, setCharacterData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showToast } = useToast();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [shopRes, dashRes] = await Promise.all([
      getShopData(),
      getDashboardData(),
    ]);

    setInventory(shopRes.inventory);
    setCharacterData(dashRes);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleEquip = async (item: InventoryItem) => {
    const supabase = createClient();
    const newEquipped = !item.equipped;

    const { error } = await supabase
      .from('inventory')
      .update({ equipped: newEquipped })
      .eq('id', item.id);

    if (error) {
      showToast('Failed to update equipment state.', 'error');
      return;
    }

    setInventory((prev) =>
      prev.map((inv) => (inv.id === item.id ? { ...inv, equipped: newEquipped } : inv))
    );

    showToast(
      `${newEquipped ? 'Equipped' : 'Unequipped'} ${item.shop_item?.name || 'Item'}.`,
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-[#161310] flex">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          character={characterData?.character}
          profile={characterData?.profile}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          <div>
            <h1 className="text-2xl font-black text-slate-100">Hero Inventory</h1>
            <p className="text-xs text-slate-400">
              View and manage your unlocked themes, badges, avatar items, and decorations.
            </p>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Loading Inventory...</div>
          ) : inventory.length === 0 ? (
            <Card className="p-12 text-center border-dashed border-slate-800 space-y-3">
              <Package className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">Your inventory is empty.</p>
              <p className="text-xs text-slate-500">Visit the Shop to acquire items with Gold!</p>
              <Button variant="primary" size="sm" onClick={() => (window.location.href = '/shop')}>
                Visit Shop
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {inventory.map((inv) => {
                const shopItem = inv.shop_item;
                if (!shopItem) return null;

                return (
                  <Card key={inv.id} className="p-5 flex flex-col justify-between border-slate-800 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="default" className="uppercase text-[10px]">
                          {shopItem.type.replace('_', ' ')}
                        </Badge>

                        {inv.equipped && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/30">
                            <Sparkle className="w-3 h-3" /> Equipped
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-100">{shopItem.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{shopItem.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        Qty: {inv.quantity}
                      </span>

                      <Button
                        variant={inv.equipped ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => toggleEquip(inv)}
                      >
                        {inv.equipped ? 'Unequip' : 'Equip'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

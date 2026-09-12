'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { ShoppingBag, Coins, Check, Sparkles } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export default function ShopPage() {
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userStats, setUserStats] = useState({
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    gold: 680,
    streak: 14,
    displayName: 'Dhruv',
  });

  const [shopItems, setShopItems] = useState([
    {
      id: 'shop-1',
      name: 'Coral Glow Frame',
      description: 'Warm coral accent border for your pixel avatar.',
      price: 250,
      type: 'Avatar Frame',
      owned: false,
    },
    {
      id: 'shop-[#2]',
      name: 'Architect of Habits',
      description: 'Exclusive status title displayed on your profile.',
      price: 400,
      type: 'Title',
      owned: true,
    },
    {
      id: 'shop-3',
      name: 'Cozy Desk Bonsai',
      description: 'Quiet desk companion for your character overview.',
      price: 300,
      type: 'Desk Companion',
      owned: false,
    },
    {
      id: 'shop-4',
      name: 'Gold Foil Border',
      description: 'Shimmering metallic gold card accent border.',
      price: 500,
      type: 'Avatar Frame',
      owned: false,
    },
  ]);

  const handlePurchase = (item: any) => {
    if (userStats.gold < item.price) {
      showToast('error', 'Insufficient Gold', `You need ${item.price - userStats.gold} more Gold.`);
      return;
    }

    setUserStats((prev) => ({ ...prev, gold: prev.gold - item.price }));
    setShopItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, owned: true } : i))
    );
    showToast('success', 'Item Purchased!', `You acquired "${item.name}".`);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#171A21] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="shop"
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          userStats={userStats}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A21] tracking-tight">
                Cosmetic Shop
              </h1>
              <p className="text-sm text-[#686C73] mt-1 font-medium">
                Spend earned Gold on avatar frames, status titles, and desk companions.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E1D9] rounded-xl shadow-2xs text-xs font-bold text-[#171A21]">
              <Coins className="w-4 h-4 text-[#FFB547]" />
              <span className="font-technical font-extrabold">{userStats.gold} Gold</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E5E1D9] rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold tracking-wider text-[#686C73] uppercase">
                      {item.type}
                    </span>
                    <h3 className="text-base font-extrabold text-[#171A21] mt-0.5">{item.name}</h3>
                    <p className="text-xs text-[#686C73] mt-1">{item.description}</p>
                  </div>

                  <div className="px-3 py-1.5 bg-[#FFF8EC] border border-[#FFB547]/30 rounded-xl flex items-center gap-1.5 text-xs font-bold text-[#FFB547] font-technical shrink-0">
                    <Coins className="w-3.5 h-3.5" />
                    <span>{item.price}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E1D9] flex justify-end">
                  {item.owned ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-[#F7F5F0] text-[#686C73] text-xs font-bold rounded-xl border border-[#E5E1D9] flex items-center gap-1.5 cursor-not-allowed"
                    >
                      <Check className="w-3.5 h-3.5 text-[#2E9B72]" />
                      <span>Owned</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchase(item)}
                      className="px-4 py-2 bg-[#F05A3C] hover:bg-[#D9482B] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Purchase</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

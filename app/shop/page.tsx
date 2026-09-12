'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Coins, Check, Sparkles } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { Avatar, AvatarFrameVariant } from '../../components/avatars';

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
      id: 'shop-frame-coral',
      name: 'Coral Notch Frame',
      description: 'Energetic terracotta corner notches cosmetic avatar frame.',
      price: 150,
      type: 'Avatar Frame',
      frameVariant: 'coral' as AvatarFrameVariant,
      owned: false,
    },
    {
      id: 'shop-frame-navy',
      name: 'Navy Tech Frame',
      description: 'Deep slate technical grid border cosmetic avatar frame.',
      price: 200,
      type: 'Avatar Frame',
      frameVariant: 'navy' as AvatarFrameVariant,
      owned: false,
    },
    {
      id: 'shop-frame-seasonal',
      name: 'Seasonal Star Frame',
      description: 'Refined corner star cosmetic avatar frame.',
      price: 250,
      type: 'Avatar Frame',
      frameVariant: 'seasonal' as AvatarFrameVariant,
      owned: false,
    },
    {
      id: 'shop-frame-gold',
      name: 'Gold Tier Frame',
      description: 'Shimmering metallic gold border with studs cosmetic avatar frame.',
      price: 300,
      type: 'Avatar Frame',
      frameVariant: 'gold' as AvatarFrameVariant,
      owned: true,
    },
    {
      id: 'shop-frame-achievement',
      name: 'Prestige Frame',
      description: 'Emerald and gold achievement cosmetic avatar frame.',
      price: 400,
      type: 'Avatar Frame',
      frameVariant: 'achievement' as AvatarFrameVariant,
      owned: false,
    },
    {
      id: 'shop-title-architect',
      name: 'Architect of Habits Title',
      description: 'Exclusive status title displayed on your profile.',
      price: 250,
      type: 'Title',
      owned: true,
    },
  ]);

  const handlePurchase = (item: typeof shopItems[0]) => {
    if (userStats.gold < item.price) {
      showToast('error', 'Insufficient Gold', `You need ${item.price - userStats.gold} more Gold.`);
      return;
    }

    setUserStats((prev) => ({ ...prev, gold: prev.gold - item.price }));
    setShopItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, owned: true } : i))
    );
    showToast('success', 'Item Purchased!', `You acquired "${item.name}". It is now available in your Avatar settings.`);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
                Cosmetics Shop
              </h1>
              <p className="text-sm text-[#60606C] mt-1 font-medium">
                Spend earned Gold on premium avatar frames and profile titles.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E6E6E8] rounded-xl shadow-xs text-xs font-semibold text-[#070709]">
              <Coins className="w-4 h-4 text-[#D9A441]" />
              <span className="tabular-nums font-bold">{userStats.gold} Gold Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E6E6E8] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                {/* Item Preview */}
                <div className="flex flex-col items-center justify-center p-6 bg-[#F7F7F8] rounded-xl border border-[#E6E6E8] relative">
                  {item.frameVariant ? (
                    <Avatar variant="architect" size={72} frame={item.frameVariant} system="blob" />
                  ) : (
                    <div className="h-[72px] px-4 rounded-xl bg-white border border-[#E6E6E8] flex items-center justify-center text-[#070709] font-bold text-xs shadow-2xs">
                      TITLE BADGE
                    </div>
                  )}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white border border-[#E6E6E8] text-[#60606C] text-[9px] font-bold uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#070709]">{item.name}</h3>
                    <div className="px-2 py-0.5 bg-[#FDF8EC] border border-[#D9A441]/20 rounded-md flex items-center gap-1 text-xs font-bold text-[#D9A441] tabular-nums shrink-0">
                      <Coins className="w-3 h-3" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#60606C] leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-[#E6E6E8] flex justify-end">
                  {item.owned ? (
                    <button
                      disabled
                      className="w-full py-2 bg-[#F7F7F8] text-[#8B8B8B] text-xs font-semibold rounded-xl border border-[#E6E6E8] flex items-center justify-center gap-1.5 cursor-not-allowed"
                    >
                      <Check className="w-3.5 h-3.5 text-[#668F72]" />
                      <span>Owned</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchase(item)}
                      className="w-full py-2 bg-[#070709] hover:bg-[#202025] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Unlock for {item.price} Gold</span>
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

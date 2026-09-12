'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Package, Check } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export default function InventoryPage() {
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userStats] = useState({
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    gold: 680,
    streak: 14,
    displayName: 'Dhruv',
  });

  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 'inv-1',
      name: 'Architect of Habits',
      type: 'Title',
      description: 'Exclusive status title displayed on your profile.',
      equipped: true,
    },
    {
      id: 'inv-2',
      name: 'Gold Tier Frame',
      type: 'Avatar Frame',
      description: 'Metallic gold border with studs cosmetic avatar frame.',
      equipped: true,
    },
    {
      id: 'inv-3',
      name: 'Default Frame',
      type: 'Avatar Frame',
      description: 'Clean minimalist border.',
      equipped: false,
    },
  ]);

  const handleToggleEquip = (id: string) => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.equipped;
          showToast(
            'success',
            nextState ? 'Item Equipped' : 'Item Unequipped',
            `"${item.name}" updated.`
          );
          return { ...item, equipped: nextState };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="inventory"
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
                Inventory
              </h1>
              <p className="text-sm text-[#60606C] mt-1 font-medium">
                Manage and equip your acquired titles, avatar frames, and accessories.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E6E6E8] rounded-xl shadow-xs text-xs font-semibold text-[#070709]">
              <Package className="w-4 h-4 text-[#60606C]" />
              <span className="tabular-nums">{inventoryItems.length} Items Collected</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventoryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E6E6E8] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-[#8B8B8B] uppercase">
                    {item.type}
                  </span>
                  <h3 className="text-base font-bold text-[#070709] mt-1">{item.name}</h3>
                  <p className="text-xs text-[#60606C] mt-1 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-[#E6E6E8] flex justify-end">
                  <button
                    onClick={() => handleToggleEquip(item.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      item.equipped
                        ? 'bg-[#F2F7F4] text-[#668F72] border border-[#668F72]/30'
                        : 'bg-[#070709] hover:bg-[#202025] text-white shadow-xs'
                    }`}
                  >
                    {item.equipped && <Check className="w-3.5 h-3.5" />}
                    <span>{item.equipped ? 'Equipped' : 'Equip'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

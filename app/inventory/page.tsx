'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Package, Check, Sparkles } from 'lucide-react';
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
      name: 'Standard Oak Frame',
      type: 'Avatar Frame',
      description: 'Default warm wood avatar frame border.',
      equipped: true,
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
    <div className="min-h-screen bg-[#F3F1E8] text-[#20231F] flex flex-col lg:flex-row font-sans">
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
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20231F] tracking-tight">
              Inventory
            </h1>
            <p className="text-sm text-[#70736B] mt-1 font-medium">
              Manage and equip your acquired titles, avatar frames, and accessories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventoryItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-extrabold tracking-wider text-[#70736B] uppercase">
                    {item.type}
                  </span>
                  <h3 className="text-base font-extrabold text-[#20231F] mt-0.5">{item.name}</h3>
                  <p className="text-xs text-[#70736B] mt-1">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-[#DFDDD2] flex justify-end">
                  <button
                    onClick={() => handleToggleEquip(item.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      item.equipped
                        ? 'bg-[#668F72] text-white shadow-xs'
                        : 'bg-[#20231F] hover:bg-[#344653] text-white shadow-xs'
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

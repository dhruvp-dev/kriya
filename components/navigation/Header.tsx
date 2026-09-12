'use client';

import React from 'react';
import { Menu, Plus, Flame, Sparkles } from 'lucide-react';

export interface HeaderProps {
  displayName?: string;
  gold?: number;
  streak?: number;
  level?: number;
  character?: any;
  profile?: any;
  userStats?: {
    level?: number;
    gold?: number;
    streak?: number;
    displayName?: string;
  };
  onToggleMobileMenu?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateQuest?: () => void;
  onOpenCreateModal?: () => void;
}

export function Header({
  displayName,
  gold,
  streak,
  level,
  character,
  profile,
  userStats,
  onToggleMobileMenu,
  onOpenMobileMenu,
  onOpenCreateQuest,
  onOpenCreateModal,
}: HeaderProps) {
  const activeName = displayName || userStats?.displayName || profile?.display_name || 'Dhruv';
  const activeGold = gold ?? userStats?.gold ?? character?.gold ?? 680;
  const activeStreak = streak ?? userStats?.streak ?? character?.current_streak ?? 14;
  const activeLevel = level ?? userStats?.level ?? character?.level ?? 12;

  const handleMobileMenu = onOpenMobileMenu || onToggleMobileMenu;
  const handleCreateQuest = onOpenCreateModal || onOpenCreateQuest;

  // Contextual greeting
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
  else if (hour >= 18) greeting = 'Good evening';

  // Formatted date
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E6E6E8] px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 select-none font-sans">
      {/* Left Greeting & Contextual Date */}
      <div className="flex items-center gap-3 min-w-0">
        {handleMobileMenu && (
          <button
            onClick={handleMobileMenu}
            className="lg:hidden p-1.5 text-[#60606C] hover:text-[#070709] hover:bg-[#F3F4F5] rounded-lg transition-colors border border-[#E6E6E8]"
            aria-label="Toggle menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-[#151515] tracking-tight truncate">
            {greeting}, {activeName}
          </h1>

          <div className="text-xs text-[#8B8B8B] font-normal">
            Today · {todayDate}
          </div>
        </div>
      </div>

      {/* Right Stats & Create Quest Action */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Compact Stats Strip */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-medium text-[#60606C]">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F7F7F8] border border-[#E6E6E8]">
            <Flame className="w-3.5 h-3.5 text-[#C85A3D] fill-[#C85A3D]" />
            <span className="tabular-nums font-semibold text-[#070709]">{activeStreak}</span>
            <span className="text-[#8B8B8B]">day streak</span>
          </div>

          {/* Gold */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F7F7F8] border border-[#E6E6E8]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#D9A441] flex items-center justify-center text-[9px] font-bold text-white leading-none">
              $
            </span>
            <span className="tabular-nums font-semibold text-[#070709]">{activeGold.toLocaleString()}</span>
            <span className="text-[#8B8B8B]">Gold</span>
          </div>

          {/* Level */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F7F7F8] border border-[#E6E6E8]">
            <span className="text-[#8B8B8B]">Level</span>
            <span className="tabular-nums font-semibold text-[#070709]">{activeLevel}</span>
          </div>
        </div>

        {/* Primary CTA Button: Near-black #070709 */}
        {handleCreateQuest && (
          <button
            onClick={handleCreateQuest}
            className="flex items-center gap-1.5 bg-[#070709] hover:bg-[#1B1C1F] text-[#FFFFFF] px-3.5 py-2 rounded-lg font-semibold text-xs transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Quest</span>
          </button>
        )}
      </div>
    </header>
  );
}

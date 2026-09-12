'use client';

import React from 'react';
import { Menu, Plus, Flame, Coins, Zap } from 'lucide-react';

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

  // Greeting
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
  else if (hour >= 18) greeting = 'Good evening';

  return (
    <header className="sticky top-0 z-30 w-full bg-[#051F20]/90 backdrop-blur-xs border-b border-[#1D5254] px-4 lg:px-8 py-4 flex items-center justify-between gap-4 select-none font-sans">
      {/* Left Greeting & Human Metadata */}
      <div className="flex items-center gap-3 min-w-0">
        {handleMobileMenu && (
          <button
            onClick={handleMobileMenu}
            className="lg:hidden p-2 text-[#80A79D] hover:text-[#E2F1ED] hover:bg-[#164648] rounded-lg transition-colors border border-[#1D5254]"
            aria-label="Toggle menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <h1 className="text-lg lg:text-xl font-extrabold text-[#E2F1ED] tracking-tight">
            {greeting}, {activeName}
          </h1>

          <div className="text-xs text-[#80A79D] mt-0.5 font-medium">
            Sun, Sep 13, 2026
          </div>
        </div>
      </div>

      {/* Right Stats & Action Button */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Stats Readout */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-[#E2F1ED]">
          {/* Gold Balance */}
          <div className="flex items-center gap-1.5 text-[#F59E0B]">
            <Coins className="w-4 h-4 text-[#F59E0B]" />
            <span className="font-technical font-bold">{activeGold.toLocaleString()} Gold</span>
          </div>

          <span className="text-[#1D5254]">|</span>

          {/* Streak */}
          <div className="flex items-center gap-1.5 text-[#34D399]">
            <Flame className="w-4 h-4 fill-[#34D399]" />
            <span>{activeStreak} day streak</span>
          </div>

          <span className="text-[#1D5254]">|</span>

          {/* Level */}
          <div className="flex items-center gap-1.5 text-[#38BDF8]">
            <Zap className="w-4 h-4 text-[#38BDF8]" />
            <span>Level {activeLevel}</span>
          </div>
        </div>

        {/* Primary Action Button (Emerald Mint) */}
        {handleCreateQuest && (
          <button
            onClick={handleCreateQuest}
            className="flex items-center gap-1.5 bg-[#34D399] hover:bg-[#059669] text-[#051F20] px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-2xs active:translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Create Quest</span>
          </button>
        )}
      </div>
    </header>
  );
}

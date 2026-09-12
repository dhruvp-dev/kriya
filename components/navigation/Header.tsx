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
    <header className="sticky top-0 z-30 w-full bg-[#F7F5F0]/90 backdrop-blur-xs border-b border-[#E5E1D9] px-4 lg:px-8 py-4 flex items-center justify-between gap-4 select-none font-sans">
      {/* Left Greeting & Human Metadata */}
      <div className="flex items-center gap-3 min-w-0">
        {handleMobileMenu && (
          <button
            onClick={handleMobileMenu}
            className="lg:hidden p-2 text-[#686C73] hover:text-[#171A21] hover:bg-[#EFECE6] rounded-lg transition-colors border border-[#E5E1D9]"
            aria-label="Toggle menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <h1 className="text-lg lg:text-xl font-bold text-[#171A21] tracking-tight">
            {greeting}, {activeName}
          </h1>

          <div className="flex items-center gap-2 text-xs text-[#686C73] mt-0.5 font-medium">
            <span className="font-technical text-[11px]">Sun, Sep 13, 2026</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-[#2E9B72] font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B72]" />
              System Status: Normal
            </span>
          </div>
        </div>
      </div>

      {/* Right Stats & Action Button */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Stats Readout */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-[#171A21]">
          {/* Gold Balance */}
          <div className="flex items-center gap-1.5 text-[#D97706]">
            <Coins className="w-4 h-4 text-[#FFB547]" />
            <span className="font-technical font-bold">{activeGold.toLocaleString()} Gold</span>
          </div>

          <span className="text-[#E5E1D9]">|</span>

          {/* Streak */}
          <div className="flex items-center gap-1.5 text-[#F05A3C]">
            <Flame className="w-4 h-4 fill-[#F05A3C]" />
            <span>{activeStreak} day streak</span>
          </div>

          <span className="text-[#E5E1D9]">|</span>

          {/* Level */}
          <div className="flex items-center gap-1.5 text-[#202B3C]">
            <Zap className="w-4 h-4 text-[#202B3C]" />
            <span>Level {activeLevel}</span>
          </div>
        </div>

        {/* Primary Action Button (Electric Coral #F05A3C) */}
        {handleCreateQuest && (
          <button
            onClick={handleCreateQuest}
            className="flex items-center gap-1.5 bg-[#F05A3C] hover:bg-[#D9482D] text-white px-4 py-2 rounded-lg font-semibold text-xs transition-colors shadow-2xs active:translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Create Quest</span>
          </button>
        )}
      </div>
    </header>
  );
}

'use client';

import React from 'react';
import { Flame, Coins } from 'lucide-react';

export interface CharacterProgressionCardProps {
  level?: number;
  currentXp?: number;
  nextLevelXp?: number;
  gold?: number;
  streak?: number;
  userStats?: {
    level: number;
    currentXp: number;
    nextLevelXp: number;
    gold: number;
    streak: number;
    displayName?: string;
  };
}

export function CharacterProgressionCard({
  level,
  currentXp,
  nextLevelXp,
  gold,
  streak,
  userStats,
}: CharacterProgressionCardProps) {
  const activeLevel = level ?? userStats?.level ?? 12;
  const activeCurrentXp = currentXp ?? userStats?.currentXp ?? 2480;
  const activeNextLevelXp = nextLevelXp ?? userStats?.nextLevelXp ?? 3200;
  const activeGold = gold ?? userStats?.gold ?? 680;
  const activeStreak = streak ?? userStats?.streak ?? 14;

  const xpPercent = Math.min(100, Math.round((activeCurrentXp / activeNextLevelXp) * 100));

  return (
    <div className="relative bg-[#FFFFFF] border border-[#E5E1D9] rounded-xl p-6 sm:p-7 shadow-2xs overflow-hidden chamfer-panel font-sans">
      {/* Visual Header: Human Title, Level & XP Counter */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
        <div>
          <span className="text-xs font-semibold text-[#686C73]">
            Your progress
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171A21] tracking-tight mt-0.5">
            LEVEL {activeLevel}
          </h2>
        </div>

        <div className="text-left sm:text-right">
          <span className="font-technical text-xl sm:text-2xl font-bold text-[#171A21]">
            <span className="text-[#D97706]">{activeCurrentXp.toLocaleString()}</span>
            <span className="text-[#686C73] font-normal"> / {activeNextLevelXp.toLocaleString()} XP</span>
          </span>
        </div>
      </div>

      {/* Segmented XP Progress Bar (Warm Amber #FFB547 with Retro Ticks) */}
      <div className="relative mb-5">
        <div className="h-5 w-full bg-[#F7F5F0] border border-[#E5E1D9] rounded-lg p-0.5 overflow-hidden relative shadow-inner">
          {/* Segmented Grid Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none segmented-bg-grid opacity-60" />

          {/* Warm Amber Progress Fill (#FFB547) */}
          <div
            className="h-full bg-gradient-to-r from-[#FFB547] to-[#FCD34D] rounded-md transition-all duration-700 ease-out segmented-ticks relative"
            style={{ width: `${xpPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs font-technical text-[#686C73] mt-1.5 font-medium">
          <span>{xpPercent}% COMPLETE TO LEVEL {activeLevel + 1}</span>
          <span>{Math.max(0, activeNextLevelXp - activeCurrentXp).toLocaleString()} XP REMAINING</span>
        </div>
      </div>

      {/* Below Bar Readout: 14 DAY STREAK & 680 GOLD */}
      <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E5E1D9]">
        {/* Streak */}
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#F05A3C] fill-[#F05A3C]" />
          <span className="text-sm font-bold text-[#171A21]">
            {activeStreak} DAY STREAK
          </span>
        </div>

        {/* Gold */}
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-[#FFB547]" />
          <span className="text-sm font-bold text-[#171A21]">
            {activeGold} GOLD
          </span>
        </div>
      </div>
    </div>
  );
}

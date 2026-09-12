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
    <div className="relative bg-[#FFFDF7] border border-[#DFDDD2] rounded-2xl p-6 sm:p-7 shadow-2xs overflow-hidden font-sans">
      {/* Visual Header: YOUR PROGRESS, LEVEL & XP Counter */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
        <div>
          <span className="text-xs font-bold tracking-wider text-[#70736B] uppercase">
            YOUR PROGRESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#20231F] tracking-tight mt-1">
            LEVEL {activeLevel}
          </h2>
        </div>

        <div className="text-left sm:text-right">
          <span className="font-technical text-xl sm:text-2xl font-bold text-[#20231F]">
            <span className="text-[#D9A441]">{activeCurrentXp.toLocaleString()}</span>
            <span className="text-[#70736B] font-normal"> / {activeNextLevelXp.toLocaleString()} XP</span>
          </span>
        </div>
      </div>

      {/* Segmented XP Progress Bar (Muted Ochre #D9A441 with Retro Ticks) */}
      <div className="relative mb-5">
        <div className="h-4 w-full bg-[#F3F1E8] border border-[#DFDDD2] rounded-lg p-0.5 overflow-hidden relative shadow-inner">
          {/* Subtle Segmented Grid Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none segmented-bg-grid opacity-50" />

          {/* Muted Ochre Progress Fill (#D9A441) */}
          <div
            className="h-full bg-[#D9A441] rounded-md transition-all duration-700 ease-out segmented-ticks relative"
            style={{ width: `${xpPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs text-[#70736B] mt-2 font-medium">
          <span>
            <span className="font-technical font-bold text-[#20231F]">{xpPercent}%</span> complete to Level {activeLevel + 1}
          </span>
          <span>
            <span className="font-technical font-bold text-[#20231F]">{Math.max(0, activeNextLevelXp - activeCurrentXp).toLocaleString()}</span> XP remaining
          </span>
        </div>
      </div>

      {/* Below Bar Readout: STREAK & GOLD */}
      <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#DFDDD2]">
        {/* Streak */}
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#C85A3D] fill-[#C85A3D]" />
          <span className="text-xs font-bold text-[#20231F] uppercase tracking-wider">
            <span className="font-technical font-bold text-sm text-[#C85A3D]">{activeStreak}</span> DAY STREAK
          </span>
        </div>

        {/* Gold */}
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-[#D9A441]" />
          <span className="text-xs font-bold text-[#20231F] uppercase tracking-wider">
            <span className="font-technical font-bold text-sm text-[#D9A441]">{activeGold}</span> GOLD
          </span>
        </div>
      </div>
    </div>
  );
}

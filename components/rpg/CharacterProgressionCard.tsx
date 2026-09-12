'use client';

import React from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';

export interface CharacterProgressionCardProps {
  level?: number;
  currentXp?: number;
  nextLevelXp?: number;
  gold?: number;
  streak?: number;
  completedQuestsCount?: number;
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
  completedQuestsCount = 42,
  userStats,
}: CharacterProgressionCardProps) {
  const activeLevel = level ?? userStats?.level ?? 12;
  const activeCurrentXp = currentXp ?? userStats?.currentXp ?? 2430;
  const activeNextLevelXp = nextLevelXp ?? userStats?.nextLevelXp ?? 3162;
  const activeGold = gold ?? userStats?.gold ?? 680;
  const activeStreak = streak ?? userStats?.streak ?? 14;

  const xpPercent = Math.min(100, Math.round((activeCurrentXp / activeNextLevelXp) * 100));
  const remainingXp = Math.max(0, activeNextLevelXp - activeCurrentXp);

  return (
    <div className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-2xl p-6 sm:p-7 shadow-2xs font-sans">
      {/* Top Header: Level & Current XP */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#8B8B8B] uppercase">
            PROGRESSION
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#151515] tracking-tight mt-0.5">
            Level {activeLevel}
          </h2>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-xl sm:text-2xl font-bold text-[#070709] tabular-nums">
            {activeCurrentXp.toLocaleString()} <span className="text-xs font-medium text-[#8B8B8B]">XP</span>
          </div>
          <div className="text-xs text-[#8B8B8B] tabular-nums">
            {activeNextLevelXp.toLocaleString()} XP next level
          </div>
        </div>
      </div>

      {/* Modern Minimal Progress Bar */}
      <div className="space-y-2 mb-6">
        <div className="h-2 w-full bg-[#F3F4F5] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#070709] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${xpPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs text-[#8B8B8B] font-medium tabular-nums">
          <span>{xpPercent}% completed</span>
          <span>{remainingXp.toLocaleString()} XP to Level {activeLevel + 1}</span>
        </div>
      </div>

      {/* Supporting Metrics Strip */}
      <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-[#E6E6E8] text-xs">
        {/* Streak */}
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#C85A3D] fill-[#C85A3D]" />
          <span className="font-semibold text-[#070709] tabular-nums">{activeStreak}</span>
          <span className="text-[#60606C]">day streak</span>
        </div>

        <span className="text-[#E6E6E8] hidden sm:inline">|</span>

        {/* Gold */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#D9A441] flex items-center justify-center text-[10px] font-bold text-white">
            $
          </span>
          <span className="font-semibold text-[#070709] tabular-nums">{activeGold.toLocaleString()}</span>
          <span className="text-[#60606C]">Gold</span>
        </div>

        <span className="text-[#E6E6E8] hidden sm:inline">|</span>

        {/* Quests Completed */}
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#668F72]" />
          <span className="font-semibold text-[#070709] tabular-nums">{completedQuestsCount}</span>
          <span className="text-[#60606C]">quests completed</span>
        </div>
      </div>
    </div>
  );
}

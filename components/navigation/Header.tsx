'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import type { Character, Profile } from '../../types/database.types';
import { LevelBadge } from '../rpg/LevelBadge';
import { GoldDisplay } from '../rpg/GoldDisplay';
import { StreakBadge } from '../rpg/StreakBadge';
import { Avatar } from '../rpg/avatar';
import { getXpThreshold } from '../../lib/progression';
import { ProgressBar } from '../ui/ProgressBar';

export interface HeaderProps {
  character: Character | null;
  profile: Profile | null;
  onToggleMobileMenu?: () => void;
}

export function Header({ character, profile, onToggleMobileMenu }: HeaderProps) {
  if (!character || !profile) return null;

  const currentLevelXpThreshold = getXpThreshold(character.level);
  const nextLevelXpThreshold = getXpThreshold(character.level + 1);
  const currentLevelProgress = Math.max(0, character.total_xp - currentLevelXpThreshold);
  const xpSpanForLevel = Math.max(1, nextLevelXpThreshold - currentLevelXpThreshold);

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-[#332D26] bg-[#161310]/90 backdrop-blur-md px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-[#A89F8F] hover:text-[#F5F2ED] hover:bg-[#26221D] rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3">
          <Avatar config={profile.avatar_config} size="sm" />
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-[#F5F2ED]">{profile.display_name}</h1>
            <p className="text-xs text-[#A89F8F]">Hero</p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-xs mx-4 hidden md:block">
        <ProgressBar
          value={currentLevelProgress}
          max={xpSpanForLevel}
          label={`Level ${character.level} Progress`}
          subLabel={`${character.total_xp} Total XP`}
          colorClass="bg-[#EA580C]"
        />
      </div>

      <div className="flex items-center gap-2.5">
        <LevelBadge level={character.level} size="sm" />
        <GoldDisplay amount={character.gold} size="sm" />
        <StreakBadge currentStreak={character.current_streak} longestStreak={character.longest_streak} size="sm" />
      </div>
    </header>
  );
}

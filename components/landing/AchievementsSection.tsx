'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Lightning,
  Medal,
  CheckSquareOffset,
  Question,
  Eye,
  Sparkle,
  ArrowClockwise,
} from '@phosphor-icons/react';

interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  xp: string;
  icon: any;
  color: string;
  revealed: boolean;
}

const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'first',
    title: 'FIRST QUEST',
    subtitle: 'Initiation Milestone',
    description: 'Complete your first real-world quest and log your inaugural XP.',
    category: 'Initiation',
    xp: '+50 XP',
    icon: CheckSquareOffset,
    color: 'text-[#668F72]',
    revealed: true, // Already discovered to anchor the user
  },
  {
    id: 'streak7',
    title: '7 DAY STREAK',
    subtitle: 'Habit Consistency',
    description: 'Show up for seven consecutive days without breaking your daily rhythm.',
    category: 'Consistency',
    xp: '+150 XP',
    icon: Lightning,
    color: 'text-[#C85A3D]',
    revealed: false,
  },
  {
    id: 'lvl10',
    title: 'LEVEL 10',
    subtitle: 'Core Mastery',
    description: 'Reach level ten. Unlocks the permanent Polished Gold avatar border.',
    category: 'Mastery',
    xp: '+300 XP',
    icon: Trophy,
    color: 'text-[#D9A441]',
    revealed: false,
  },
  {
    id: 'quests100',
    title: '100 QUESTS',
    subtitle: 'Endurance Legend',
    description: 'Complete one hundred real-world actions forged permanently into character.',
    category: 'Endurance',
    xp: '+500 XP',
    icon: Medal,
    color: 'text-[#070709]',
    revealed: false,
  },
];

export function AchievementsSection() {
  const [achievements, setAchievements] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);

  const toggleReveal = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, revealed: !a.revealed } : a))
    );
  };

  const handleRevealAll = () => {
    setAchievements((prev) => prev.map((a) => ({ ...a, revealed: true })));
  };

  const handleReset = () => {
    setAchievements(INITIAL_ACHIEVEMENTS);
  };

  const discoveredCount = achievements.filter((a) => a.revealed).length;

  return (
    <section className="py-24 md:py-36 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C85A3D]">
              <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>DISCOVERY & ARCHIVE</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
              PROGRESS SHOULD <br />
              LEAVE A TRACE.
            </h2>

            <p className="text-base sm:text-lg text-[#60606C] leading-relaxed">
              Click the mystery stamps below to uncover permanent milestones unlocked through real consistency.
            </p>
          </div>

          {/* Discovery Tracker Badge */}
          <div className="flex items-center gap-3 bg-[#F7F7F8] border border-[#E6E6E8] px-4 py-2.5 rounded-2xl text-xs font-bold text-[#070709] self-start lg:self-auto">
            <span>Discovered:</span>
            <span className="text-[#C85A3D] tabular-nums font-black">
              {discoveredCount} of {achievements.length} Badges
            </span>
          </div>
        </div>

        {/* Collectible Grid with Mystery Reveal State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item) => {
            const IconComp = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleReveal(item.id)}
                className={`text-left rounded-3xl border p-6 flex flex-col justify-between space-y-6 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] active:scale-[0.98] ${
                  item.revealed
                    ? 'bg-white border-[#070709] shadow-md ring-1 ring-[#070709] scale-[1.02]'
                    : 'bg-[#F7F7F8] border-[#E6E6E8] hover:border-[#D0D1D4] hover:bg-white/80'
                }`}
                aria-label={item.revealed ? `Hide ${item.title}` : `Reveal ${item.title}`}
              >
                <div className="space-y-4 w-full">
                  {/* Category Pill & XP */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-white border border-[#E6E6E8] text-[#60606C]">
                      {item.category}
                    </span>
                    <span className="text-xs font-extrabold text-[#070709] tabular-nums">
                      {item.xp}
                    </span>
                  </div>

                  {/* Icon Area: Revealed vs Mystery Stamp */}
                  <div className="pt-2 flex items-center gap-4">
                    {item.revealed ? (
                      <div className="w-14 h-14 rounded-2xl bg-[#FFFFFF] border-2 border-[#E6E6E8] flex items-center justify-center shadow-xs shrink-0 animate-fadeIn">
                        <IconComp weight="fill" className={`w-7 h-7 ${item.color}`} />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-[#E6E6E8]/70 border-2 border-dashed border-[#D0D1D4] flex items-center justify-center text-[#8B8B8B] shrink-0 hover:scale-105 transition-transform">
                        <Question weight="bold" className="w-6 h-6 text-[#8B8B8B]" />
                      </div>
                    )}

                    <div>
                      <h3 className="text-base font-extrabold text-[#070709] tracking-tight">
                        {item.revealed ? item.title : 'Secret Milestone'}
                      </h3>
                      <div className="text-xs font-medium text-[#8B8B8B]">
                        {item.revealed ? item.subtitle : 'Click to discover'}
                      </div>
                    </div>
                  </div>

                  {/* Body Copy */}
                  <p className="text-xs text-[#60606C] leading-relaxed">
                    {item.revealed
                      ? item.description
                      : 'Achieved through consistent real-world habit execution. Tap to preview requirements.'}
                  </p>
                </div>

                {/* Footer Status */}
                <div className="pt-4 border-t border-[#E6E6E8] flex items-center justify-between text-xs w-full">
                  <span className="text-[11px] text-[#8B8B8B]">
                    {item.revealed ? 'Permanent Badge' : 'Collectible'}
                  </span>
                  <span className="font-extrabold text-[#070709] text-xs">
                    {item.revealed ? 'Unlocked ✓' : 'Reveal &rarr;'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Sandbox Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E6E6E8] text-xs text-[#8B8B8B]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleRevealAll}
              className="inline-flex items-center gap-1.5 font-bold text-[#070709] hover:text-[#C85A3D] transition-colors cursor-pointer"
            >
              <Eye weight="bold" className="w-3.5 h-3.5" />
              <span>Reveal all achievements</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 font-bold text-[#60606C] hover:text-[#070709] transition-colors cursor-pointer"
            >
              <ArrowClockwise weight="bold" className="w-3.5 h-3.5" />
              <span>Reset seals</span>
            </button>
          </div>

          <span className="hidden sm:inline font-medium">
            Stored permanently on your public profile once unlocked
          </span>
        </div>
      </div>
    </section>
  );
}

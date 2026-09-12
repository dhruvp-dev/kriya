'use client';

import React, { useState } from 'react';
import { TrendUp, Trophy, Sparkle, ShieldCheck, ArrowRight, Lightning } from '@phosphor-icons/react';

export function ProgressionShowcase() {
  const [activeLevelIdx, setActiveLevelIdx] = useState<number>(2); // Level 10 default

  const milestones = [
    {
      idx: 0,
      level: 'LEVEL 01',
      xp: '0 XP',
      title: 'The Foundation',
      subtitle: 'First intentional action',
      description: 'Your baseline is set. The daily capture mechanism begins with your first completed habit.',
      unlock: 'Starter Blob Avatar',
      icon: Sparkle,
      accentColor: 'text-[#FFFFFF]',
      badgeBg: 'bg-white/10 text-white border-white/20',
      dotBorder: 'border-white/40',
      linePercent: '0%',
    },
    {
      idx: 1,
      level: 'LEVEL 05',
      xp: '1,118 XP',
      title: 'Habit Momentum',
      subtitle: 'Rhythm established',
      description: 'The routine takes root. Daily actions shift from deliberate effort to an automatic lifestyle rhythm.',
      unlock: 'First Title & Palette',
      icon: TrendUp,
      accentColor: 'text-[#668F72]',
      badgeBg: 'bg-[#668F72]/20 text-[#668F72] border-[#668F72]/40',
      dotBorder: 'border-[#668F72]',
      linePercent: '33%',
    },
    {
      idx: 2,
      level: 'LEVEL 10',
      xp: '3,162 XP',
      title: 'Core Mastery',
      subtitle: 'Substantial compound effort',
      description: 'Dozens of deep work hours and workouts. Your attribute bars reflect unmistakable personal growth.',
      unlock: 'Gold Avatar Frame',
      icon: Trophy,
      accentColor: 'text-[#D9A441]',
      badgeBg: 'bg-[#D9A441]/20 text-[#D9A441] border-[#D9A441]/40',
      dotBorder: 'border-[#D9A441]',
      linePercent: '66%',
    },
    {
      idx: 3,
      level: 'LEVEL 20',
      xp: '8,944 XP',
      title: 'Enduring Discipline',
      subtitle: 'Permanent personal transformation',
      description: 'Hundreds of completed quests forged into character. A testament to long-term consistency over fleeting intensity.',
      unlock: 'Mastery Relic & Custom Title',
      icon: ShieldCheck,
      accentColor: 'text-[#C85A3D]',
      badgeBg: 'bg-[#C85A3D]/20 text-[#C85A3D] border-[#C85A3D]/40',
      dotBorder: 'border-[#C85A3D]',
      linePercent: '100%',
    },
  ];

  const currentMilestone = milestones[activeLevelIdx];

  return (
    <section id="progression" className="py-28 md:py-36 bg-[#070709] text-white relative overflow-hidden">
      {/* Ambient Vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-[#C85A3D]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#D9A441]">
              <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
              <span>PROGRESSION ARCHITECTURE</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight text-white">
              SEE YOUR PROGRESS.
            </h2>

            <p className="text-base sm:text-lg text-[#8B8B8B] leading-relaxed">
              Click any milestone to travel through the progression path. Small daily actions accumulate into permanent character milestones.
            </p>
          </div>

          {/* Interactive Milestone Indicator */}
          <div className="flex items-center gap-2 text-xs font-bold text-white/70 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl self-start lg:self-auto">
            <span>Currently Inspecting:</span>
            <span className="text-[#D9A441]">{currentMilestone.level}</span>
          </div>
        </div>

        {/* Large Horizontal Progression Path with Dynamic Connecting Track */}
        <div className="space-y-8">
          {/* Dynamic Horizontal Line on Desktop */}
          <div className="hidden lg:block relative mx-8 h-1 bg-white/10 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-white via-[#668F72] via-[#D9A441] to-[#C85A3D] rounded-full transition-all duration-700 ease-out"
              style={{ width: currentMilestone.linePercent }}
            />
          </div>

          {/* 4 Large Interactive Milestone Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((ms) => {
              const IconComp = ms.icon;
              const isSelected = activeLevelIdx === ms.idx;
              return (
                <button
                  key={ms.level}
                  type="button"
                  onClick={() => setActiveLevelIdx(ms.idx)}
                  className={`text-left rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-8 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isSelected
                      ? 'bg-[#181B22] border-2 border-white shadow-2xl scale-[1.02]'
                      : 'bg-[#121418] border border-white/10 hover:border-white/25'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="space-y-5">
                    {/* Top Marker & Number */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-[#1A1D24] border-2 ${
                          isSelected ? 'border-white scale-110' : ms.dotBorder
                        } flex items-center justify-center shadow-lg transition-transform`}
                      >
                        <IconComp weight="bold" className={`w-5 h-5 ${ms.accentColor}`} />
                      </div>

                      <span
                        className={`text-xs font-bold tabular-nums px-2.5 py-1 rounded-full border ${
                          isSelected
                            ? 'bg-white text-[#070709] border-white font-extrabold'
                            : 'text-white/50 bg-white/5 border-white/10'
                        }`}
                      >
                        {ms.xp}
                      </span>
                    </div>

                    {/* Level Title & Subtitle */}
                    <div className="space-y-1 pt-1">
                      <div className="text-xs font-extrabold uppercase tracking-widest text-[#8B8B8B]">
                        {ms.level}
                      </div>
                      <h3 className="text-xl font-extrabold text-white tracking-tight">
                        {ms.title}
                      </h3>
                      <div className="text-xs font-medium text-[#8B8B8B]">
                        {ms.subtitle}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#8B8B8B] leading-relaxed">
                      {ms.description}
                    </p>
                  </div>

                  {/* Unlock Tag at Bottom */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between w-full">
                    <span className="text-[11px] text-white/50">Unlocks:</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${ms.badgeBg}`}
                    >
                      {ms.unlock}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Detail Banner */}
        <div className="bg-[#121418] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#D9A441]">
              Inspecting {currentMilestone.level}: {currentMilestone.title}
            </div>
            <div className="text-sm text-white font-medium">
              Threshold: <span className="text-white font-bold">{currentMilestone.xp}</span> · Reward: <span className="text-[#668F72] font-bold">{currentMilestone.unlock}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveLevelIdx((prev) => (prev + 1) % 4)}
              className="inline-flex items-center gap-2 bg-white text-[#070709] px-5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-white/90 transition-all cursor-pointer"
            >
              <span>Next Milestone</span>
              <ArrowRight weight="bold" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

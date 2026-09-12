import React from 'react';
import { TrendUp, Trophy, Sparkle, ShieldCheck, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function ProgressionShowcase() {
  const milestones = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  return (
    <section id="progression" className="py-28 md:py-36 bg-[#070709] text-white relative overflow-hidden">
      {/* Subtle Ambient Vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-[#C85A3D]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#D9A441]">
            <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
            <span>PROGRESSION ARCHITECTURE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight text-white">
            SEE YOUR PROGRESS.
          </h2>

          <p className="text-base sm:text-lg text-[#8B8B8B] leading-relaxed max-w-xl font-normal">
            Every completed action contributes to long-term progression. Small daily habits compound into permanent character mastery.
          </p>
        </div>

        {/* Large Horizontal Progression Path with Continuous Track */}
        <div className="relative">
          {/* Subtle Horizontal Glowing Path on Desktop */}
          <div className="hidden lg:block absolute top-[2.25rem] left-8 right-8 h-[2px] bg-gradient-to-r from-white/30 via-[#668F72] via-[#D9A441] to-[#C85A3D] z-0 opacity-60" />

          {/* 4 Large Milestone Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {milestones.map((ms, idx) => {
              const IconComp = ms.icon;
              return (
                <div
                  key={ms.level}
                  className="bg-[#121418] border border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-8 hover:border-white/25 transition-all shadow-2xl group"
                >
                  <div className="space-y-5">
                    {/* Top Marker & Number */}
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl bg-[#1A1D24] border-2 ${ms.dotBorder} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                        <IconComp weight="bold" className={`w-5 h-5 ${ms.accentColor}`} />
                      </div>

                      <span className="text-xs font-bold tabular-nums text-white/50 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
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
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-white/50">Unlocks:</span>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${ms.badgeBg}`}>
                      {ms.unlock}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formula & Compounding Reassurance */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B8B8B] gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#668F72]" />
            <span>Deterministic progression: XP formulas ensure early momentum while respecting long-term discipline.</span>
          </div>
          <div className="text-white font-semibold">
            No seasonal wipes · Zero arbitrary resets
          </div>
        </div>
      </div>
    </section>
  );
}

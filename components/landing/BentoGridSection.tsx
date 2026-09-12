'use client';

import React from 'react';
import {
  Sparkle,
  CheckCircle,
  TrendUp,
  Star,
  ShieldCheck,
  TreeStructure,
  Coins,
  CaretDown,
} from '@phosphor-icons/react';

export function BentoGridSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#070709] tracking-normal leading-tight">
            How Kriya turns daily actions into lifelong momentum
          </h2>
          <p className="text-base sm:text-lg text-[#60606C] leading-relaxed font-normal tracking-normal">
            Empower your daily routine with real-time feedback, frictionless logging, and compounding character progression.
          </p>
        </div>

        {/* 6 Bento Cards Grid (3 cols x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CARD 1: Reflective Habit Logs */}
          <div className="bg-[#F9FAFB] border border-[#EEF0F2] rounded-3xl p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all group">
            {/* Top Visual: User Feedback / Reflection Card */}
            <div className="h-44 flex items-center justify-center">
              <div className="w-full max-w-[260px] bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-sm space-y-2.5 transform group-hover:scale-105 transition-transform">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#1D64EC] text-white flex items-center justify-center text-xs font-bold">
                    DM
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#070709]">Daniel Michel</div>
                    <div className="text-[10px] text-[#8B8B8B]">2 days ago • Deep Work</div>
                  </div>
                </div>
                <p className="text-[11px] text-[#4B5563] leading-relaxed italic line-clamp-2">
                  "Completed a 90m coding sprint without checking notifications once. Visceral momentum."
                </p>
                <div className="flex items-center gap-1 text-[#D9A441]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} weight="fill" className="w-3 h-3" />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="pt-4 border-t border-[#EEF0F2] space-y-1.5">
              <h3 className="text-base font-semibold text-[#070709] tracking-normal">
                Reflective Habit Logs
              </h3>
              <p className="text-xs text-[#60606C] leading-relaxed">
                Attach mindful reflections to completed quests to document your daily mental shifts and breakthroughs.
              </p>
            </div>
          </div>

          {/* CARD 2: Visible Compounding Growth */}
          <div className="bg-[#F9FAFB] border border-[#EEF0F2] rounded-3xl p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all group">
            {/* Top Visual: Line Chart Upward Curve */}
            <div className="h-44 relative flex items-center justify-center">
              <div className="w-full h-full pt-4">
                {/* Floating Tooltip Pill */}
                <div className="absolute top-2 right-6 bg-white border border-[#E5E7EB] rounded-full px-3 py-1 shadow-sm flex items-center gap-1 text-[11px] font-bold text-[#070709] tabular-nums animate-pulse">
                  <TrendUp weight="bold" className="w-3.5 h-3.5 text-[#1D64EC]" />
                  <span>Growth: 16,000 XP</span>
                </div>

                <svg viewBox="0 0 300 120" className="w-full h-28 overflow-visible">
                  <defs>
                    <linearGradient id="bentoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1D64EC" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#1D64EC" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,110 C 60,105 100,90 140,85 C 180,80 210,40 260,30 L 300,10 L 300,120 L 0,120 Z"
                    fill="url(#bentoGradient)"
                  />
                  <path
                    d="M 0,110 C 60,105 100,90 140,85 C 180,80 210,40 260,30 L 300,10"
                    fill="none"
                    stroke="#1D64EC"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="300" cy="10" r="4" fill="#1D64EC" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="pt-4 border-t border-[#EEF0F2] space-y-1.5">
              <h3 className="text-base font-semibold text-[#070709] tracking-normal">
                Visible Compounding Growth
              </h3>
              <p className="text-xs text-[#60606C] leading-relaxed">
                Watch daily micro-efforts snowball into exponential attribute mastery across strength, craft, and focus.
              </p>
            </div>
          </div>

          {/* CARD 3: Tamper-Proof Streak Engine */}
          <div className="bg-[#F9FAFB] border border-[#EEF0F2] rounded-3xl p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all group">
            {/* Top Visual: Verification Pill & Code Input */}
            <div className="h-44 flex items-center justify-center">
              <div className="w-full max-w-[240px] bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-sm space-y-3 transform group-hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-bold">
                  <CheckCircle weight="fill" className="w-4 h-4" />
                  <span>Quest Verified</span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#070709]">Confirmation Code</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {['5', '0', 'X', 'P'].map((char, i) => (
                      <div
                        key={i}
                        className="w-8 h-9 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-xs font-extrabold text-[#070709]"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="pt-4 border-t border-[#EEF0F2] space-y-1.5">
              <h3 className="text-base font-semibold text-[#070709] tracking-normal">
                Tamper-Proof Streak Engine
              </h3>
              <p className="text-xs text-[#60606C] leading-relaxed">
                Built-in freeze tokens and verified accountability check-ins keep your consistency intact during busy days.
              </p>
            </div>
          </div>

          {/* CARD 4: Adaptive Character Archetypes */}
          <div className="bg-[#F9FAFB] border border-[#EEF0F2] rounded-3xl p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all group">
            {/* Top Visual: Center Character with Orbiting Archetype Satellites */}
            <div className="h-44 flex items-center justify-center relative">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Center Hero Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1D64EC] to-[#60A5FA] flex items-center justify-center text-white font-extrabold text-base shadow-lg z-10">
                  <Sparkle weight="fill" className="w-7 h-7" />
                </div>

                {/* Orbiting Satellites */}
                <div className="absolute top-1 left-2 w-7 h-7 rounded-full bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[10px] font-bold text-[#D9A441]">
                  ✦
                </div>
                <div className="absolute top-1 right-2 w-7 h-7 rounded-full bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[10px] font-bold text-[#10B981]">
                  ⚡
                </div>
                <div className="absolute bottom-1 left-3 w-7 h-7 rounded-full bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[10px] font-bold text-[#8B5CF6]">
                  🛡
                </div>
                <div className="absolute bottom-1 right-3 w-7 h-7 rounded-full bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[10px] font-bold text-[#1D64EC]">
                  ⚔
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="pt-4 border-t border-[#EEF0F2] space-y-1.5">
              <h3 className="text-base font-semibold text-[#070709] tracking-normal">
                Adaptive Archetype Shifts
              </h3>
              <p className="text-xs text-[#60606C] leading-relaxed">
                Your digital character visually transforms based on your dominant real-world actions—Scholar, Builder, or Monk.
              </p>
            </div>
          </div>

          {/* CARD 5: Multi-Disciplinary Skill Trees */}
          <div className="bg-[#F9FAFB] border border-[#EEF0F2] rounded-3xl p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all group">
            {/* Top Visual: Tree Flowchart Diagram */}
            <div className="h-44 flex items-center justify-center">
              <div className="w-full max-w-[240px] space-y-2">
                <div className="bg-white rounded-xl p-2.5 border border-[#E5E7EB] shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#1D64EC] flex items-center justify-center text-[10px] font-bold">
                      F
                    </div>
                    <span className="text-xs font-bold text-[#070709]">Deep Work (Lvl 8)</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#059669]">+40 XP</span>
                </div>

                <div className="pl-6 border-l-2 border-[#E5E7EB] ml-4 space-y-2">
                  <div className="bg-white rounded-xl p-2 border border-[#E5E7EB] shadow-xs flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#4B5563]">Reading (Lvl 5)</span>
                    <span className="text-[10px] text-[#8B8B8B]">Active</span>
                  </div>
                  <div className="bg-white rounded-xl p-2 border border-[#E5E7EB] shadow-xs flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#4B5563]">Meditation (Lvl 4)</span>
                    <span className="text-[10px] text-[#8B8B8B]">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="pt-4 border-t border-[#EEF0F2] space-y-1.5">
              <h3 className="text-base font-semibold text-[#070709] tracking-normal">
                Multi-Disciplinary Skill Trees
              </h3>
              <p className="text-xs text-[#60606C] leading-relaxed">
                Branch out across fitness, creative work, and mindfulness without feeling confined to a single rigid path.
              </p>
            </div>
          </div>

          {/* CARD 6: Earned Milestone Relics */}
          <div className="bg-[#F9FAFB] border border-[#EEF0F2] rounded-3xl p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all group">
            {/* Top Visual: Relic Details Form */}
            <div className="h-44 flex items-center justify-center">
              <div className="w-full max-w-[240px] bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-sm space-y-3 transform group-hover:scale-105 transition-transform">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0F1F3]">
                  <span className="text-xs font-bold text-[#070709]">Keepsake Vault</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#D9A441] tabular-nums">
                    <Coins weight="fill" className="w-3.5 h-3.5" />
                    <span>1,420</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#F9FAFB]">
                    <span className="font-semibold text-[#070709]">Amulet of Focus</span>
                    <span className="text-[9px] font-extrabold text-[#D9A441] uppercase">Legendary</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#F9FAFB]">
                    <span className="font-semibold text-[#070709]">Chronos Hourglass</span>
                    <span className="text-[9px] font-extrabold text-[#8B5CF6] uppercase">Epic</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="pt-4 border-t border-[#EEF0F2] space-y-1.5">
              <h3 className="text-base font-semibold text-[#070709] tracking-normal">
                Earned Milestone Relics
              </h3>
              <p className="text-xs text-[#60606C] leading-relaxed">
                Unlock aesthetic relics, custom title cards, and interface themes strictly through honest, verified work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

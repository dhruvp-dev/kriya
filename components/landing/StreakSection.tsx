'use client';

import React, { useState } from 'react';
import { Flame, Check, Zap } from 'lucide-react';
import { Avatar } from '../avatars';

export function StreakSection() {
  const [activeDay, setActiveDay] = useState<number>(6); // Day 7 active

  const days = [
    { label: 'Day 01', note: 'First action taken', completed: true },
    { label: 'Day 02', note: 'Showing up twice', completed: true },
    { label: 'Day 03', note: 'Habit taking root', completed: true },
    { label: 'Day 04', note: 'Rhythm established', completed: true },
    { label: 'Day 05', note: 'Effort feels natural', completed: true },
    { label: 'Day 06', note: 'Quiet confidence', completed: true },
    { label: 'Day 07', note: 'Full week completed', completed: true },
  ];

  return (
    <section className="py-20 bg-[#F7F7F8] border-t border-[#E6E6E8] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C85A3D] px-2.5 py-1 bg-[#FDF4F2] rounded-md border border-[#C85A3D]/20">
            <Flame className="w-3.5 h-3.5 text-[#C85A3D]" />
            <span>Consistency Builds Momentum</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-tight">
            Keep the daily momentum.
          </h2>

          <p className="text-base text-[#60606C] leading-relaxed">
            A streak is not about punishing perfectionism. It is about showing up consistently and seeing the compound effect.
          </p>
        </div>

        {/* 7-Day Calendar Streak Track */}
        <div className="bg-white border border-[#E6E6E8] rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-[#E6E6E8] gap-4">
            <div className="flex items-center gap-3.5">
              <Avatar variant="runner" size={44} frame="gold" system="blob" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-[#070709]">7-Day Active Momentum</span>
                  <span className="text-[11px] font-bold text-[#C85A3D] px-2 py-0.5 bg-[#FDF4F2] rounded-md border border-[#C85A3D]/20">
                    Warm Flame
                  </span>
                </div>
                <p className="text-xs text-[#60606C] mt-0.5">
                  Consistent effort across both intellect and strength quests
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#F7F7F8] border border-[#E6E6E8] rounded-xl">
              <Flame className="w-4 h-4 text-[#C85A3D]" />
              <span className="tabular-nums text-xs font-bold text-[#070709]">
                Active Streak: 7 Days
              </span>
            </div>
          </div>

          {/* 7 Interactive Day Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {days.map((day, idx) => {
              const isSelected = activeDay === idx;
              return (
                <button
                  key={day.label}
                  type="button"
                  onClick={() => setActiveDay(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[110px] cursor-pointer ${
                    isSelected
                      ? 'bg-[#F7F7F8] border-[#070709] shadow-xs ring-1 ring-[#070709]'
                      : 'bg-white hover:bg-[#F7F7F8] border-[#E6E6E8]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="tabular-nums text-xs font-semibold text-[#8B8B8B]">
                      {day.label}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#070709] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-1 text-[#C85A3D] mb-1">
                      {Array.from({ length: Math.min(3, Math.floor(idx / 2) + 1) }).map((_, i) => (
                        <Flame key={i} className="w-3 h-3 fill-[#C85A3D]" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-[#070709] block leading-tight">
                      {day.note}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reassurance Footnote */}
          <div className="mt-6 pt-4 border-t border-[#E6E6E8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#60606C] gap-2">
            <span>Life happens. Occasional missed days do not erase your character's earned experience.</span>
            <span className="font-semibold text-[#070709]">Streak freeze built in</span>
          </div>
        </div>
      </div>
    </section>
  );
}

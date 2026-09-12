'use client';

import React, { useState } from 'react';
import { Flame, Check, Sparkle } from '@phosphor-icons/react';
import { Avatar } from '../avatars';

export function StreakSection() {
  const [activeDay, setActiveDay] = useState<number>(6); // Day 7 active

  const days = [
    { label: 'DAY 01', note: 'First step taken', completed: true },
    { label: 'DAY 02', note: 'Showing up twice', completed: true },
    { label: 'DAY 03', note: 'Habit taking root', completed: true },
    { label: 'DAY 04', note: 'Rhythm established', completed: true },
    { label: 'DAY 05', note: 'Effort feels natural', completed: true },
    { label: 'DAY 06', note: 'Quiet confidence', completed: true },
    { label: 'DAY 07', note: 'Full week completed', completed: true },
  ];

  return (
    <section className="py-20 bg-[#F5F1E8] border-t border-[#E8E1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D97706] px-2.5 py-1 bg-[#FEF3C7] rounded-md">
            <Flame weight="fill" className="w-3.5 h-3.5 text-[#D97706]" />
            <span>CONSISTENCY BUILDS MOMENTUM</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#192420] tracking-tight">
            KEEP THE MOMENTUM.
          </h2>
          
          <p className="text-base sm:text-lg text-[#667770] leading-relaxed">
            A streak isn&apos;t about perfection. It&apos;s about showing up again.
          </p>
        </div>

        {/* 7-Day Calendar Streak Track */}
        <div className="bg-[#FFFFFF] border border-[#E8E1D3] rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Top Status Bar with Moving Character */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-[#E8E1D3]/80 gap-4">
            <div className="flex items-center gap-3">
              <Avatar variant="runner" size={44} showFrame={true} frame="gold" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-[#192420]">7 DAY MOMENTUM</span>
                  <span className="text-xs font-technical font-bold text-[#D97706] px-2 py-0.5 bg-[#FEF3C7] rounded">
                    WARM FLAME
                  </span>
                </div>
                <p className="text-xs text-[#667770] mt-0.5">
                  Consistent effort unlocked weekly reflection badge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#FAF8F5] border border-[#E8E1D3] rounded-lg">
              <Flame weight="fill" className="w-5 h-5 text-[#D97706] animate-pulse" />
              <span className="font-technical text-sm font-extrabold text-[#192420]">
                ACTIVE STREAK: 7 DAYS
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
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[110px] ${
                    isSelected
                      ? 'bg-[#FAF8F5] border-[#1B4332] shadow-sm ring-1 ring-[#1B4332]/20'
                      : 'bg-[#FFFFFF] hover:bg-[#FAF8F5] border-[#E8E1D3]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-technical text-xs font-bold text-[#667770]">
                      {day.label}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#1B4332] text-[#FAF8F5] flex items-center justify-center">
                      <Check weight="bold" className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-1 text-[#D97706] mb-1">
                      {Array.from({ length: Math.min(3, Math.floor(idx / 2) + 1) }).map((_, i) => (
                        <Flame key={i} weight="fill" className="w-3 h-3 text-[#D97706]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-[#192420] block leading-tight">
                      {day.note}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Warm Reassurance Footnote */}
          <div className="mt-6 pt-4 border-t border-[#E8E1D3]/70 flex flex-col sm:flex-row items-center justify-between text-xs text-[#667770] gap-2">
            <span>Life happens. Missed days do not erase your character&apos;s earned experience.</span>
            <span className="font-technical font-semibold text-[#1B4332]">STREAK FREEZE BUILT IN</span>
          </div>

        </div>

      </div>
    </section>
  );
}

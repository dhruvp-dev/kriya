'use client';

import React, { useState } from 'react';
import { Flame, Check, ArrowClockwise, Sparkle } from '@phosphor-icons/react';

interface DayState {
  id: string;
  name: string;
  completed: boolean;
}

const DEFAULT_DAYS: DayState[] = [
  { id: 'mon', name: 'MON', completed: true },
  { id: 'tue', name: 'TUE', completed: true },
  { id: 'wed', name: 'WED', completed: true },
  { id: 'thu', name: 'THU', completed: true },
  { id: 'fri', name: 'FRI', completed: true },
  { id: 'sat', name: 'SAT', completed: true },
  { id: 'sun', name: 'SUN', completed: false },
];

export function StreakSection() {
  const [days, setDays] = useState<DayState[]>(DEFAULT_DAYS);

  const toggleDay = (id: string) => {
    setDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, completed: !d.completed } : d))
    );
  };

  const handleFillAll = () => {
    setDays((prev) => prev.map((d) => ({ ...d, completed: true })));
  };

  const handleReset = () => {
    setDays(DEFAULT_DAYS);
  };

  // Calculate consecutive streak count
  const completedCount = days.filter((d) => d.completed).length;
  const isPerfectWeek = completedCount === 7;

  return (
    <section className="py-24 md:py-36 bg-[#F7F7F8] border-t border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl space-y-12">
          {/* Top Editorial Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between border-b border-[#E6E6E8] pb-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#668F72]">
                <Flame weight="fill" className="w-4 h-4 text-[#C85A3D]" />
                <span>INTERACTIVE STREAK SANDBOX</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
                KEEP THE MOMENTUM.
              </h2>

              <p className="text-lg sm:text-xl text-[#60606C] leading-relaxed max-w-xl font-normal">
                A streak isn't about perfection. It's about showing up again. Click days below to test how momentum compounds.
              </p>
            </div>

            {/* Live Interactive Streak Counter */}
            <div className="lg:col-span-5 flex flex-col lg:items-end">
              <div className="text-7xl sm:text-8xl lg:text-9xl font-black text-[#070709] tracking-[-0.05em] leading-none tabular-nums transition-all">
                {completedCount >= 6 ? completedCount + 8 : completedCount}
              </div>
              <div className="text-sm font-extrabold uppercase tracking-widest text-[#C85A3D] mt-1 flex items-center gap-1.5">
                <Flame weight="fill" className="w-4 h-4" />
                <span>DAY MOMENTUM STREAK</span>
              </div>
            </div>
          </div>

          {/* Interactive Week Calendar Track */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[#8B8B8B] uppercase tracking-wider">
              <span>Click any day to toggle completion</span>
              <span className="text-[#668F72] tabular-nums font-bold">
                {completedCount} of 7 Days Validated
              </span>
            </div>

            {/* Continuous Progress Line */}
            <div className="relative">
              <div className="hidden sm:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-[#E6E6E8] z-0">
                <div
                  className="h-full bg-[#668F72] rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((completedCount / 7) * 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 relative z-10">
                {days.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleDay(item.id)}
                    className={`rounded-2xl border p-4 sm:p-5 flex flex-col items-center justify-between min-h-[110px] sm:min-h-[130px] transition-all shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] active:scale-[0.97] ${
                      item.completed
                        ? 'bg-[#F1F6F3] border-[#668F72]/50 scale-[1.02]'
                        : 'bg-[#FFFFFF] border-[#E6E6E8] hover:border-[#D0D1D4]'
                    }`}
                    aria-label={`Toggle ${item.name}`}
                  >
                    <span
                      className={`text-xs font-extrabold tracking-wider ${
                        item.completed ? 'text-[#668F72]' : 'text-[#8B8B8B]'
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Node Checkmark */}
                    {item.completed ? (
                      <div className="w-9 h-9 rounded-full bg-[#668F72] text-white flex items-center justify-center shadow-xs">
                        <Check weight="bold" className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full border-2 border-dashed border-[#D0D1D4] bg-white flex items-center justify-center text-[#8B8B8B]">
                        <span className="text-xs font-bold">○</span>
                      </div>
                    )}

                    <span className="text-[10px] font-bold text-[#8B8B8B]">
                      {item.completed ? 'Validated' : 'Click to Log'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sandbox Controls & Reassurance */}
          <div className="pt-4 border-t border-[#E6E6E8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B8B8B] gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleFillAll}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#070709] hover:text-[#C85A3D] transition-colors cursor-pointer"
              >
                <Sparkle weight="bold" className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>Test full week</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60606C] hover:text-[#070709] transition-colors cursor-pointer"
              >
                <ArrowClockwise weight="bold" className="w-3.5 h-3.5" />
                <span>Reset days</span>
              </button>
            </div>

            <div className="font-semibold text-[#070709]">
              {isPerfectWeek ? '★ Full 7-day week achieved!' : 'Built-in streak freeze protects against missed days'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

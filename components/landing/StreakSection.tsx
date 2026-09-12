import React from 'react';
import { Flame, Check } from '@phosphor-icons/react/dist/ssr';

export function StreakSection() {
  const days = [
    { name: 'MON', status: 'done', check: true },
    { name: 'TUE', status: 'done', check: true },
    { name: 'WED', status: 'done', check: true },
    { name: 'THU', status: 'done', check: true },
    { name: 'FRI', status: 'done', check: true },
    { name: 'SAT', status: 'done', check: true },
    { name: 'SUN', status: 'pending', check: false },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#F7F7F8] border-t border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl space-y-12">
          {/* Top Editorial Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between border-b border-[#E6E6E8] pb-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#668F72]">
                <Flame weight="fill" className="w-3.5 h-3.5 text-[#C85A3D]" />
                <span>MOMENTUM ENGINE</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
                KEEP THE MOMENTUM.
              </h2>

              <p className="text-lg sm:text-xl text-[#60606C] leading-relaxed max-w-xl font-normal">
                A streak isn't about perfection. It's about showing up again.
              </p>
            </div>

            {/* Oversized 14-Day Streak Stat */}
            <div className="lg:col-span-5 flex flex-col lg:items-end">
              <div className="text-7xl sm:text-8xl lg:text-9xl font-black text-[#070709] tracking-[-0.05em] leading-none tabular-nums">
                14
              </div>
              <div className="text-sm font-extrabold uppercase tracking-widest text-[#C85A3D] mt-1">
                DAY ACTIVE STREAK
              </div>
            </div>
          </div>

          {/* Large Clean Editorial Calendar Track (Mon-Sun) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[#8B8B8B] uppercase tracking-wider">
              <span>Weekly Consistency Track</span>
              <span className="text-[#668F72] tabular-nums">6 of 7 Days Validated</span>
            </div>

            {/* Continuous Progress Line behind the Day Nodes */}
            <div className="relative">
              {/* Horizontal Connecting Path */}
              <div className="hidden sm:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-[#E6E6E8] z-0">
                <div className="h-full w-[85%] bg-[#668F72] rounded-full" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 relative z-10">
                {days.map((item) => (
                  <div
                    key={item.name}
                    className={`rounded-2xl border p-4 sm:p-5 flex flex-col items-center justify-between min-h-[110px] sm:min-h-[130px] transition-all shadow-2xs ${
                      item.check
                        ? 'bg-[#F1F6F3] border-[#668F72]/40'
                        : 'bg-[#FFFFFF] border-[#E6E6E8] ring-2 ring-[#070709]/10'
                    }`}
                  >
                    <span
                      className={`text-xs font-extrabold tracking-wider ${
                        item.check ? 'text-[#668F72]' : 'text-[#8B8B8B]'
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Node Checkmark */}
                    {item.check ? (
                      <div className="w-9 h-9 rounded-full bg-[#668F72] text-white flex items-center justify-center shadow-xs">
                        <Check weight="bold" className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full border-2 border-dashed border-[#D0D1D4] bg-white flex items-center justify-center text-[#8B8B8B]">
                        <span className="text-xs font-bold">○</span>
                      </div>
                    )}

                    <span className="text-[10px] font-semibold text-[#8B8B8B]">
                      {item.check ? 'Validated' : 'Today'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reassurance Footer */}
          <div className="pt-4 border-t border-[#E6E6E8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B8B8B] gap-2">
            <span>Life happens. Built-in streak freezes protect your streak so temporary travel or rest never erases your discipline.</span>
            <span className="font-bold text-[#070709] shrink-0">Automatic freeze included</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Trophy, Lightning, Medal, CheckSquareOffset, Sparkle } from '@phosphor-icons/react/dist/ssr';

export function AchievementsSection() {
  return (
    <section className="py-24 md:py-36 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
            PROGRESS SHOULD <br />
            LEAVE A TRACE.
          </h2>
          <p className="text-base sm:text-lg text-[#60606C] leading-relaxed max-w-xl">
            Permanent milestones unlocked through genuine real-world consistency. Tangible badges you earn through repeated action.
          </p>
        </div>

        {/* Asymmetric Visual Collection with Scale Contrast */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* FEATURED MAJOR ACHIEVEMENT (Large Scale) */}
          <div className="lg:col-span-7 bg-[#F7F7F8] border border-[#E6E6E8] rounded-3xl p-8 sm:p-12 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FBF5EA] text-[#D9A441] border border-[#D9A441]/30">
                  Mastery Milestone
                </span>
                <span className="text-sm font-extrabold text-[#070709] tabular-nums">
                  +300 XP · Gold Frame
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-6 pt-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#FFFFFF] border-2 border-[#D9A441]/40 flex items-center justify-center text-[#D9A441] shadow-md shrink-0">
                  <Trophy weight="fill" className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8B8B8B]">
                    Milestone 03
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#070709] tracking-tight">
                    LEVEL 10
                  </h3>
                  <p className="text-sm text-[#60606C] mt-1 font-medium">
                    Reach level ten through continuous action.
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#60606C] leading-relaxed max-w-lg">
                Unlocked at 3,162 XP. Represents dozens of completed workouts, reading sessions, and focus blocks permanently recorded in your profile.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E6E6E8] flex items-center justify-between text-xs text-[#8B8B8B]">
              <span>Permanent collectible badge</span>
              <span className="font-bold text-[#070709]">Tier 1 Core Unlock</span>
            </div>
          </div>

          {/* SUPPORTING ACHIEVEMENTS (Compact Stacks) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Achievement 1: FIRST QUEST */}
            <div className="bg-white border border-[#E6E6E8] rounded-2xl p-5 hover:border-[#D0D1D4] transition-all flex items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F1F6F3] border border-[#668F72]/30 flex items-center justify-center text-[#668F72] shrink-0">
                  <CheckSquareOffset weight="bold" className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B8B8B]">
                    Initiation
                  </div>
                  <h4 className="text-base font-extrabold text-[#070709]">
                    FIRST QUEST
                  </h4>
                  <p className="text-xs text-[#60606C]">Complete your first quest.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#668F72] tabular-nums shrink-0">
                +50 XP
              </span>
            </div>

            {/* Achievement 2: 7 DAY STREAK */}
            <div className="bg-white border border-[#E6E6E8] rounded-2xl p-5 hover:border-[#D0D1D4] transition-all flex items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FDF4F2] border border-[#C85A3D]/30 flex items-center justify-center text-[#C85A3D] shrink-0">
                  <Lightning weight="fill" className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B8B8B]">
                    Consistency
                  </div>
                  <h4 className="text-base font-extrabold text-[#070709]">
                    7 DAY STREAK
                  </h4>
                  <p className="text-xs text-[#60606C]">Show up for seven days.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#C85A3D] tabular-nums shrink-0">
                +150 XP
              </span>
            </div>

            {/* Achievement 3: 100 QUESTS */}
            <div className="bg-white border border-[#E6E6E8] rounded-2xl p-5 hover:border-[#D0D1D4] transition-all flex items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F3F4F5] border border-[#E6E6E8] flex items-center justify-center text-[#070709] shrink-0">
                  <Medal weight="bold" className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B8B8B]">
                    Endurance
                  </div>
                  <h4 className="text-base font-extrabold text-[#070709]">
                    100 QUESTS
                  </h4>
                  <p className="text-xs text-[#60606C]">Complete one hundred quests.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#070709] tabular-nums shrink-0">
                +500 XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

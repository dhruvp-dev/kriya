'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle,
  Sparkle,
  BookOpen,
  PersonSimpleRun,
  Broom,
  Code,
  ArrowClockwise,
  Coins,
  Lightning,
} from '@phosphor-icons/react';

export function QuestShowcase() {
  const [completedQuest, setCompletedQuest] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [xpTotal, setXpTotal] = useState(2430);
  const [goldTotal, setGoldTotal] = useState(680);

  const handleToggle = () => {
    if (!completedQuest) {
      setCompletedQuest(true);
      setXpTotal((prev) => prev + 50);
      setGoldTotal((prev) => prev + 15);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2400);
    } else {
      setCompletedQuest(false);
      setXpTotal(2430);
      setGoldTotal(680);
      setShowToast(false);
    }
  };

  const progressPercent = Math.min(100, Math.round((xpTotal / 3162) * 100));

  const supportingQuests = [
    {
      title: 'Interval run or strength session',
      domain: 'Strength',
      difficulty: 'High',
      xp: '+100 XP',
      gold: '+30 Gold',
      desc: '5km aerobic pacing or 45-minute gym routine',
      icon: PersonSimpleRun,
      domainTag: 'bg-[#FDF4F2] text-[#C85A3D] border-[#C85A3D]/20',
    },
    {
      title: 'Clean workspace & reset desk',
      domain: 'Discipline',
      difficulty: 'Quick',
      xp: '+20 XP',
      gold: '+5 Gold',
      desc: 'Physical environment reset and zero desktop clutter',
      icon: Broom,
      domainTag: 'bg-[#F1F6F3] text-[#668F72] border-[#668F72]/20',
    },
    {
      title: 'Ship feature module & write specs',
      domain: 'Creativity',
      difficulty: 'High',
      xp: '+200 XP',
      gold: '+60 Gold',
      desc: 'Uninterrupted deep work sprint pushing production code',
      icon: Code,
      domainTag: 'bg-[#FBF5EA] text-[#D9A441] border-[#D9A441]/20',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#F7F7F8] border-t border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
              MAKE THE THINGS <br />
              YOU ALREADY DO <br />
              COUNT.
            </h2>
            <p className="text-base sm:text-lg text-[#60606C] leading-relaxed">
              No artificial gaming chores or fantasy distractions. Your real daily commitments become structured quests with visible rewards.
            </p>
          </div>

          {/* Conceptual Relationship Strip */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E6E6E8] rounded-2xl text-xs font-bold text-[#070709] shadow-xs self-start lg:self-auto">
            <span>REAL ACTION</span>
            <ArrowRight weight="bold" className="w-3.5 h-3.5 text-[#8B8B8B]" />
            <span className="text-[#C85A3D]">QUEST</span>
            <ArrowRight weight="bold" className="w-3.5 h-3.5 text-[#8B8B8B]" />
            <span className="text-[#D9A441]">REWARD</span>
          </div>
        </div>

        {/* Large Centered Product UI Window (500–700px Desktop) */}
        <div className="max-w-[680px] mx-auto">
          <div className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-3xl shadow-xl overflow-hidden">
            {/* Window Title Bar */}
            <div className="px-6 py-3.5 bg-[#F7F7F8] border-b border-[#E6E6E8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E6E6E8]" />
                <span className="w-3 h-3 rounded-full bg-[#E6E6E8]" />
                <span className="w-3 h-3 rounded-full bg-[#E6E6E8]" />
                <span className="ml-2 text-xs font-medium text-[#8B8B8B]">Today's Action Board</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#070709] tabular-nums">
                <span className="flex items-center gap-1 text-[#D9A441]">
                  <Coins weight="fill" className="w-3.5 h-3.5" />
                  {goldTotal} Gold
                </span>
              </div>
            </div>

            {/* Live Progress Bar Inside Window */}
            <div className="px-6 py-4 bg-white border-b border-[#E6E6E8] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#070709]">Level 12 Progress</span>
                <span className="font-bold text-[#60606C] tabular-nums">
                  {xpTotal.toLocaleString()} / 3,162 XP ({progressPercent}%)
                </span>
              </div>
              <div className="h-2 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#070709] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Product Interior List */}
            <div className="p-6 space-y-4">
              {/* PRIMARY INTERACTIVE QUEST */}
              <div
                className={`relative rounded-2xl border p-5 transition-all duration-300 ${
                  completedQuest
                    ? 'bg-[#F1F6F3] border-[#668F72]/40 shadow-xs'
                    : 'bg-[#FFFFFF] border-[#E6E6E8] hover:border-[#D0D1D4] shadow-xs'
                }`}
              >
                {/* Floating Reward Toast */}
                {showToast && (
                  <div className="absolute -top-3.5 right-4 z-30 flex items-center gap-2 px-3 py-1 bg-[#070709] text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                    <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span className="text-[#668F72] tabular-nums">+50 XP</span>
                    <span className="text-[#D9A441] tabular-nums">+15 Gold</span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Interactive Button */}
                  <button
                    type="button"
                    onClick={handleToggle}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                      completedQuest
                        ? 'bg-[#668F72] border-[#668F72] text-white'
                        : 'bg-[#F7F7F8] border-[#D0D1D4] hover:border-[#070709]'
                    }`}
                    aria-label={completedQuest ? 'Reset quest' : 'Complete quest'}
                  >
                    {completedQuest && <Check weight="bold" className="w-4 h-4" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className={`text-base font-bold transition-colors ${
                          completedQuest ? 'line-through text-[#8B8B8B]' : 'text-[#070709]'
                        }`}
                      >
                        Read 20 pages
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F3F4F5] border border-[#E6E6E8] text-[#070709]">
                        Intellect
                      </span>
                      <span className="text-[11px] font-medium text-[#8B8B8B]">
                        Medium
                      </span>
                    </div>
                    <p className="text-xs text-[#60606C] mt-1 leading-relaxed">
                      Daily non-fiction focus block & deep concept capture.
                    </p>
                  </div>

                  <div className="text-right shrink-0 text-xs font-bold tabular-nums">
                    <div className="text-[#C85A3D]">+50 XP</div>
                    <div className="text-[#D9A441]">+15 Gold</div>
                  </div>
                </div>

                {/* Micro Action Button */}
                <div className="mt-4 pt-3 border-t border-[#E6E6E8]/70 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#8B8B8B]">
                    {completedQuest ? 'Completed today' : 'Interactive demonstration'}
                  </span>

                  <button
                    type="button"
                    onClick={handleToggle}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      completedQuest
                        ? 'text-[#60606C] hover:text-[#070709] bg-white border border-[#E6E6E8]'
                        : 'bg-[#070709] hover:bg-[#202025] text-white shadow-xs'
                    }`}
                  >
                    {completedQuest ? (
                      <>
                        <ArrowClockwise weight="bold" className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </>
                    ) : (
                      <>
                        <Lightning weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
                        <span>Complete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* SECONDARY REALISTIC QUESTS */}
              {supportingQuests.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-2xl border border-[#E6E6E8] bg-white hover:border-[#D0D1D4] transition-all flex items-start gap-4"
                  >
                    <div className="w-6 h-6 rounded-lg border border-[#D0D1D4] bg-[#F7F7F8] shrink-0 mt-0.5" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-[#070709]">
                          {item.title}
                        </h4>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.domainTag}`}>
                          {item.domain}
                        </span>
                        <span className="text-[11px] font-medium text-[#8B8B8B]">
                          {item.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-[#60606C] mt-0.5">
                        {item.desc}
                      </p>
                    </div>

                    <div className="text-right shrink-0 text-xs font-bold tabular-nums">
                      <div className="text-[#C85A3D]">{item.xp}</div>
                      <div className="text-[#D9A441]">{item.gold}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

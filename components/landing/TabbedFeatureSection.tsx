'use client';

import React, { useState } from 'react';
import {
  Compass,
  Brain,
  Fire,
  Trophy,
  Check,
  Sparkle,
  ShieldCheck,
  Coins,
  ArrowsClockwise,
  User,
  Gear,
  ChartLineUp,
} from '@phosphor-icons/react';

export function TabbedFeatureSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: 'Morning Deep Work Sprint (90m)',
      category: 'Focus',
      attribute: '+40 Focus',
      xp: 60,
      gold: 30,
      completed: false,
    },
    {
      id: 2,
      title: '5km Aerobic Pace Run',
      category: 'Vitality',
      attribute: '+35 Vitality',
      xp: 50,
      gold: 25,
      completed: true,
    },
    {
      id: 3,
      title: 'Mindful Cold Immersion & Breathwork',
      category: 'Discipline',
      attribute: '+30 Discipline',
      xp: 40,
      gold: 20,
      completed: false,
    },
  ]);

  const toggleQuest = (id: number) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q))
    );
  };

  const tabs = [
    { id: 0, label: 'Engage daily quests', icon: Compass },
    { label: 'Compound attributes', icon: Brain },
    { label: 'Maintain unbroken streaks', icon: Fire },
    { label: 'Unlock keepsake relics', icon: Trophy },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#FBFBFC] border-y border-[#EBEBEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium text-[#070709] tracking-normal leading-tight">
            Eliminate manual tracking.
          </h2>
          <p className="text-base sm:text-lg text-[#60606C] leading-relaxed font-normal tracking-normal">
            Accelerate your personal growth by converting raw tasks into structured quests, live attribute compounding, and streak milestones. Focus on doing the work while we handle the momentum.
          </p>
        </div>

        {/* Tab Pills Row */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-xs cursor-pointer ${
                  isActive
                    ? 'bg-[#1D64EC] text-white shadow-md shadow-[#1D64EC]/20 scale-[1.02]'
                    : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-white/80 hover:text-[#070709]'
                }`}
              >
                <Icon weight={isActive ? 'fill' : 'bold'} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* High-Fidelity Desktop Mockup Window */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Top Window Bar */}
          <div className="px-6 py-4 border-b border-[#F0F1F3] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40 inline-block" />
              </div>
              <span className="text-xs font-medium text-[#8B8B8B] pl-2 border-l border-[#E5E7EB]">
                kriya.app / dashboard / {['quests', 'attributes', 'streaks', 'vault'][activeTab]}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#8B8B8B]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] font-medium text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live Syncing
              </span>
            </div>
          </div>

          {/* Main Interior Layout (Sidebar + Main Pane) */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px]">
            {/* Left Sidebar */}
            <div className="md:col-span-3 border-r border-[#F0F1F3] p-5 space-y-6 bg-[#FAFAFC] hidden md:block">
              {/* Sidebar Header 1: General */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] px-2 mb-2">
                  General
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab(0)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeTab === 0
                      ? 'bg-white border border-[#E5E7EB] text-[#1D64EC] shadow-xs'
                      : 'text-[#60606C] hover:bg-white/60'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Compass weight={activeTab === 0 ? 'fill' : 'bold'} className="w-3.5 h-3.5" />
                    Daily Quests
                  </span>
                  <span className="text-[10px] font-medium bg-[#EFF6FF] text-[#1D64EC] px-1.5 py-0.5 rounded">
                    3
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab(1)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeTab === 1
                      ? 'bg-white border border-[#E5E7EB] text-[#1D64EC] shadow-xs'
                      : 'text-[#60606C] hover:bg-white/60'
                  }`}
                >
                  <Brain weight={activeTab === 1 ? 'fill' : 'bold'} className="w-3.5 h-3.5" />
                  <span>Attributes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab(2)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeTab === 2
                      ? 'bg-white border border-[#E5E7EB] text-[#1D64EC] shadow-xs'
                      : 'text-[#60606C] hover:bg-white/60'
                  }`}
                >
                  <Fire weight={activeTab === 2 ? 'fill' : 'bold'} className="w-3.5 h-3.5" />
                  <span>Streak Chain</span>
                </button>
              </div>

              {/* Sidebar Header 2: Rewards */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] px-2 mb-2">
                  Rewards
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab(3)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeTab === 3
                      ? 'bg-white border border-[#E5E7EB] text-[#1D64EC] shadow-xs'
                      : 'text-[#60606C] hover:bg-white/60'
                  }`}
                >
                  <Trophy weight={activeTab === 3 ? 'fill' : 'bold'} className="w-3.5 h-3.5" />
                  <span>Keepsake Vault</span>
                </button>
              </div>
            </div>

            {/* Main Content Pane */}
            <div className="md:col-span-9 p-6 sm:p-8 bg-white">
              {/* TAB 0: DAILY QUESTS */}
              {activeTab === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F0F1F3]">
                    <div>
                      <h3 className="text-lg font-medium text-[#070709] tracking-normal">
                        Today's Quest Objectives
                      </h3>
                      <p className="text-xs text-[#60606C] mt-0.5 tracking-normal font-normal">
                        Click checkboxes to test live XP and Gold reward calculation.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F5F7] text-xs font-medium text-[#070709] tabular-nums">
                      <Coins weight="fill" className="w-4 h-4 text-[#D9A441]" />
                      <span>720 Gold</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {quests.map((q) => (
                      <div
                        key={q.id}
                        onClick={() => toggleQuest(q.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          q.completed
                            ? 'bg-[#F1F6F3] border-[#668F72]/30 shadow-xs'
                            : 'bg-white border-[#E5E7EB] hover:border-[#D0D1D4] hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                              q.completed
                                ? 'bg-[#10B981] border-[#10B981] text-white'
                                : 'border-[#D1D5DB] bg-white'
                            }`}
                          >
                            {q.completed && <Check weight="bold" className="w-3.5 h-3.5" />}
                          </div>

                          <div className="min-w-0">
                            <div
                              className={`text-sm font-medium truncate transition-colors ${
                                q.completed ? 'line-through text-[#8B8B8B]' : 'text-[#070709]'
                              }`}
                            >
                              {q.title}
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-[11px]">
                              <span className="font-medium text-[#1D64EC] bg-[#EFF6FF] px-2 py-0.5 rounded">
                                {q.attribute}
                              </span>
                              <span className="text-[#8B8B8B]">• {q.category}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0 text-xs font-medium tabular-nums">
                          <div className="text-[#1D64EC]">+{q.xp} XP</div>
                          <div className="text-[#D9A441]">+{q.gold} Gold</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-[#8B8B8B]">
                    <span>Interactive sandbox demo</span>
                    <span className="text-[#059669] font-medium">
                      {quests.filter((q) => q.completed).length} of 3 completed today
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 1: ATTRIBUTES */}
              {activeTab === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F0F1F3]">
                    <div>
                      <h3 className="text-lg font-medium text-[#070709] tracking-normal">
                        Core Attribute Compounding
                      </h3>
                      <p className="text-xs text-[#60606C] mt-0.5 tracking-normal font-normal">
                        Your real-world accomplishments mapped to 4 foundational RPG attributes.
                      </p>
                    </div>
                    <div className="text-xs font-medium text-[#1D64EC] bg-[#EFF6FF] px-3 py-1.5 rounded-xl tracking-normal">
                      Total XP: 3,162
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'Focus', level: 8, xp: 420, max: 500, color: '#1D64EC', bg: 'bg-[#1D64EC]' },
                      { name: 'Discipline', level: 9, xp: 680, max: 750, color: '#D9A441', bg: 'bg-[#D9A441]' },
                      { name: 'Vitality', level: 6, xp: 310, max: 400, color: '#10B981', bg: 'bg-[#10B981]' },
                      { name: 'Craft & Logic', level: 5, xp: 190, max: 300, color: '#8B5CF6', bg: 'bg-[#8B5CF6]' },
                    ].map((attr) => (
                      <div key={attr.name} className="p-4 rounded-xl border border-[#EEF0F2] bg-[#FAFAFC] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#070709] tracking-normal">{attr.name}</span>
                          <span className="font-medium text-[#60606C] tabular-nums tracking-normal">Level {attr.level}</span>
                        </div>
                        <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${attr.bg} rounded-full transition-all duration-500`}
                            style={{ width: `${(attr.xp / attr.max) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-[#8B8B8B] tabular-nums tracking-normal">
                          <span>{attr.xp} XP</span>
                          <span>{attr.max} XP Next Level</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: STREAKS */}
              {activeTab === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F0F1F3]">
                    <div>
                      <h3 className="text-lg font-medium text-[#070709] tracking-normal">
                        14-Day Unbroken Momentum
                      </h3>
                      <p className="text-xs text-[#60606C] mt-0.5 tracking-normal font-normal">
                        Keep momentum alive with built-in freeze shields and progressive multipliers.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5]/40 text-[#DC2626] text-xs font-medium tracking-normal">
                      <Fire weight="fill" className="w-4 h-4" />
                      <span>1.5x Multiplier Active</span>
                    </div>
                  </div>

                  {/* 14 Day Mini Calendar Chain */}
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-[#EEF0F2] bg-[#FAFAFC] text-center space-y-1"
                      >
                        <div className="text-[10px] font-normal text-[#8B8B8B] tracking-normal">Day {i + 1}</div>
                        <div className="w-6 h-6 mx-auto rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">
                          <Check weight="bold" className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#1D64EC] font-medium tracking-normal">
                      <ShieldCheck weight="fill" className="w-4 h-4" />
                      <span>Streak Freeze Shield: 2 available for emergencies</span>
                    </div>
                    <span className="font-medium text-[#1D64EC] tracking-normal">Protected</span>
                  </div>
                </div>
              )}

              {/* TAB 3: KEEPSAKES */}
              {activeTab === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F0F1F3]">
                    <div>
                      <h3 className="text-lg font-medium text-[#070709] tracking-normal">
                        Unlocked Keepsakes & Relics
                      </h3>
                      <p className="text-xs text-[#60606C] mt-0.5 tracking-normal font-normal">
                        Aesthetic relics earned strictly through verified personal consistency.
                      </p>
                    </div>
                    <div className="text-xs font-medium text-[#D9A441] bg-[#FFFBEB] border border-[#FDE68A] px-3 py-1.5 rounded-xl">
                      3 Relics Unlocked
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { title: 'Amulet of Focus', tier: 'Legendary', desc: 'Unlocked after 30 consecutive focus hours', color: '#D9A441' },
                      { title: 'Chronos Hourglass', tier: 'Epic', desc: 'Awarded for completing 50 timed sprint quests', color: '#8B5CF6' },
                      { title: "Wayfarer's Cloak", tier: 'Rare', desc: 'Granted for maintaining a 14-day streak', color: '#1D64EC' },
                    ].map((relic) => (
                      <div key={relic.title} className="p-4 rounded-xl border border-[#EEF0F2] bg-[#FAFAFC] space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center shadow-xs">
                          <Trophy weight="fill" className="w-4 h-4" style={{ color: relic.color }} />
                        </div>
                        <div className="text-xs font-medium text-[#070709]">{relic.title}</div>
                        <span className="inline-block text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#60606C]">
                          {relic.tier}
                        </span>
                        <p className="text-[11px] text-[#8B8B8B] leading-tight">{relic.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

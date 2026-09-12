'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles, Zap, Trophy, Shield, Brain, Palette, CheckCircle2 } from 'lucide-react';
import { Avatar } from '../avatars';

export function HeroSection() {
  const [completedDemoQuest, setCompletedDemoQuest] = useState(false);
  const [demoXp, setDemoXp] = useState(2480);
  const [demoGold, setDemoGold] = useState(680);

  const handleToggleDemo = () => {
    if (!completedDemoQuest) {
      setCompletedDemoQuest(true);
      setDemoXp((prev) => prev + 50);
      setDemoGold((prev) => prev + 15);
    } else {
      setCompletedDemoQuest(false);
      setDemoXp(2480);
      setDemoGold(680);
    }
  };

  const progressPercent = Math.min(100, Math.round((demoXp / 3200) * 100));

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Copy */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F8] border border-[#E6E6E8] text-xs font-semibold text-[#070709] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#C85A3D]" />
            <span>Modern Productivity Meets Subtle RPG Progression</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#070709] tracking-tight leading-[1.08]">
            Turn everyday actions into <span className="text-[#C85A3D]">visible momentum.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#60606C] max-w-2xl mx-auto leading-relaxed">
            KRIYA pairs high-craft SaaS design with subtle RPG progression and distinctive vector blob avatars. No noisy gamification gimmicks, just calm, disciplined progress.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-[#070709] hover:bg-[#202025] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#archetypes"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F7F7F8] text-[#070709] border border-[#E6E6E8] font-semibold text-sm px-6 py-3 rounded-xl transition-all"
            >
              <span>Explore Blob Archetypes</span>
            </a>
          </div>

          {/* Social Proof / Trust Line */}
          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-[#8B8B8B] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#668F72]" />
              Pure Plus Jakarta Sans
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#668F72]" />
              8 Unique Blob Archetypes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#668F72]" />
              Zero Gamification Noise
            </span>
          </div>
        </div>

        {/* Realistic Product Mockup Window (Interactive) */}
        <div id="preview" className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-[#E6E6E8] bg-white shadow-xl overflow-hidden">
            {/* Top Browser Bar */}
            <div className="px-4 py-3 bg-[#F7F7F8] border-b border-[#E6E6E8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E6E6E8]" />
                <span className="w-3 h-3 rounded-full bg-[#E6E6E8]" />
                <span className="w-3 h-3 rounded-full bg-[#E6E6E8]" />
              </div>
              <div className="px-4 py-1 rounded-md bg-white border border-[#E6E6E8] text-[11px] text-[#60606C] font-mono tracking-tight text-center max-w-xs w-full shadow-2xs">
                kriya.app/dashboard
              </div>
              <div className="w-12 text-right">
                <span className="inline-block w-2 h-2 rounded-full bg-[#668F72]" />
              </div>
            </div>

            {/* Product Interior Simulation */}
            <div className="p-4 sm:p-6 lg:p-8 bg-white grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left & Center Main Work Area */}
              <div className="lg:col-span-8 space-y-6">
                {/* Greeting & Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E6E8] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#070709]">Good morning, Dhruv</h3>
                    <p className="text-xs text-[#60606C]">Sunday, September 13 · 3 quests scheduled</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#070709] self-start sm:self-auto">
                    <span className="px-2.5 py-1 rounded-lg bg-[#F7F7F8] border border-[#E6E6E8] flex items-center gap-1.5 tabular-nums">
                      <Zap className="w-3.5 h-3.5 text-[#C85A3D]" />
                      14 days
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F7F7F8] border border-[#E6E6E8] flex items-center gap-1.5 tabular-nums">
                      <Trophy className="w-3.5 h-3.5 text-[#D9A441]" />
                      {demoGold} Gold
                    </span>
                  </div>
                </div>

                {/* Level Progress Card */}
                <div className="bg-[#F7F7F8] border border-[#E6E6E8] rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#070709]">Level 12 Progression</span>
                    <span className="tabular-nums font-medium text-[#60606C]">
                      {demoXp.toLocaleString()} / 3,200 XP ({progressPercent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white border border-[#E6E6E8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#070709] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Demo Quest Row */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#070709] uppercase tracking-wider">
                      Today's Quests (Click checkbox to test live)
                    </span>
                    <span className="text-[11px] text-[#60606C]">Interactive Demo</span>
                  </div>

                  {/* Quest 1 (Clickable) */}
                  <div
                    onClick={handleToggleDemo}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      completedDemoQuest
                        ? 'bg-[#F2F7F4] border-[#668F72]/30'
                        : 'bg-white border-[#E6E6E8] hover:border-[#D0D1D4] hover:shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        completedDemoQuest
                          ? 'bg-[#668F72] border-[#668F72] text-white'
                          : 'border-[#D0D1D4] bg-white hover:border-[#070709]'
                      }`}
                    >
                      {completedDemoQuest && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`text-sm font-semibold transition-all ${
                            completedDemoQuest ? 'line-through text-[#8B8B8B]' : 'text-[#070709]'
                          }`}
                        >
                          Deep work sprint (90 mins)
                        </h4>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-[#E6E6E8] text-[10px] font-bold uppercase text-[#344653] shrink-0">
                          Intellect
                        </span>
                      </div>
                      <p className="text-xs text-[#60606C] mt-0.5">
                        Refine API architectural contract and write test specs.
                      </p>
                    </div>

                    <div className="text-right shrink-0 tabular-nums text-xs font-bold">
                      <span className="text-[#C85A3D] block">+50 XP</span>
                      <span className="text-[#D9A441] text-[11px] block">+15 Gold</span>
                    </div>
                  </div>

                  {/* Quest 2 (Static) */}
                  <div className="p-4 rounded-xl border border-[#E6E6E8] bg-white flex items-start gap-3.5 opacity-90">
                    <div className="w-5 h-5 rounded-md border border-[#D0D1D4] bg-white shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#070709]">
                          Morning 5km interval run
                        </h4>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-[#E6E6E8] text-[10px] font-bold uppercase text-[#C85A3D] shrink-0">
                          Strength
                        </span>
                      </div>
                      <p className="text-xs text-[#60606C] mt-0.5">Maintain pace and aerobic endurance threshold.</p>
                    </div>
                    <div className="text-right shrink-0 tabular-nums text-xs font-bold">
                      <span className="text-[#C85A3D] block">+20 XP</span>
                      <span className="text-[#D9A441] text-[11px] block">+5 Gold</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Profile & Blob Avatar Panel */}
              <div className="lg:col-span-4 bg-[#F7F7F8] border border-[#E6E6E8] rounded-xl p-5 space-y-5">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative">
                    <Avatar variant="architect" size={72} frame="gold" system="blob" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#070709] text-white text-[9px] font-bold uppercase tracking-wider shadow-xs">
                      LV. 12
                    </div>
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-bold text-[#070709]">The Architect</div>
                    <div className="text-[11px] text-[#60606C]">Dhruv · Architect of Habits</div>
                  </div>
                </div>

                {/* Attribute Bars */}
                <div className="space-y-3 pt-2 border-t border-[#E6E6E8]">
                  <div className="text-[11px] font-bold text-[#60606C] uppercase tracking-wider">
                    Core Attributes
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <div className="flex justify-between items-center text-[#60606C] mb-1">
                        <span className="flex items-center gap-1 font-semibold text-[#070709]">
                          <Shield className="w-3 h-3 text-[#C85A3D]" /> Strength
                        </span>
                        <span className="tabular-nums font-semibold">8 / 12</span>
                      </div>
                      <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#C85A3D] rounded-full" style={{ width: '66%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[#60606C] mb-1">
                        <span className="flex items-center gap-1 font-semibold text-[#070709]">
                          <Brain className="w-3 h-3 text-[#344653]" /> Intellect
                        </span>
                        <span className="tabular-nums font-semibold">12 / 15</span>
                      </div>
                      <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#344653] rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[#60606C] mb-1">
                        <span className="flex items-center gap-1 font-semibold text-[#070709]">
                          <Zap className="w-3 h-3 text-[#668F72]" /> Discipline
                        </span>
                        <span className="tabular-nums font-semibold">15 / 20</span>
                      </div>
                      <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#668F72] rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[#60606C] mb-1">
                        <span className="flex items-center gap-1 font-semibold text-[#070709]">
                          <Palette className="w-3 h-3 text-[#D9A441]" /> Creativity
                        </span>
                        <span className="tabular-nums font-semibold">10 / 15</span>
                      </div>
                      <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#D9A441] rounded-full" style={{ width: '66%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

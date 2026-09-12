'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Lightning,
  TrendUp,
  Compass,
  ArrowClockwise,
} from '@phosphor-icons/react';
import { Avatar } from '../avatars';

export function CoreLoopSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      idx: 0,
      num: '01',
      verb: 'DO',
      headline: 'Take a real action.',
      body: 'Read 20 pages, go for a 5km run, or ship production code. Real-world physical or mental effort is the single input.',
      accent: 'text-[#070709]',
      previewTitle: 'Real Input Triggered',
      previewDesc: 'Commitment made: 20 pages of intentional reading.',
      badgeText: 'Stage 01 · Execution',
      badgeColor: 'bg-[#F3F4F5] text-[#070709] border-[#E6E6E8]',
    },
    {
      idx: 1,
      num: '02',
      verb: 'COMPLETE',
      headline: 'Mark your quest done.',
      body: 'A single crisp confirmation converts finished effort into a validated milestone with zero roleplay fluff.',
      accent: 'text-[#668F72]',
      previewTitle: 'Instant Validation',
      previewDesc: 'Checkmark confirmed with deterministic server verification.',
      badgeText: 'Stage 02 · Closure',
      badgeColor: 'bg-[#F1F6F3] text-[#668F72] border-[#668F72]/30',
    },
    {
      idx: 2,
      num: '03',
      verb: 'EARN',
      headline: 'Get XP and Gold.',
      body: 'Receive calibrated experience points mapped directly to difficulty, plus Gold to unlock distinctive keepsakes.',
      accent: 'text-[#D9A441]',
      previewTitle: '+50 XP & +15 Gold Yielded',
      previewDesc: 'Directly calculated and credited to your permanent wallet.',
      badgeText: 'Stage 03 · Yield',
      badgeColor: 'bg-[#FBF5EA] text-[#D9A441] border-[#D9A441]/30',
    },
    {
      idx: 3,
      num: '04',
      verb: 'GROW',
      headline: 'Level up your character.',
      body: 'Watch your stats climb and your streak build. Your personal avatar evolves alongside your authentic daily habits.',
      accent: 'text-[#C85A3D]',
      previewTitle: 'Character Compounded',
      previewDesc: 'Level 12 progressed · Intellect attribute +1.',
      badgeText: 'Stage 04 · Transformation',
      badgeColor: 'bg-[#FDF4F2] text-[#C85A3D] border-[#C85A3D]/30',
    },
  ];

  const current = steps[activeStep];

  return (
    <section className="py-24 md:py-36 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
              TURN ACTION <br />
              INTO PROGRESS.
            </h2>
            <p className="text-base sm:text-lg text-[#60606C] leading-relaxed">
              Step through the 4 phases below. See how real-world action transforms into permanent character growth.
            </p>
          </div>

          <div className="text-xs text-[#8B8B8B] font-semibold self-start lg:self-auto">
            Click any phase to see the system reaction
          </div>
        </div>

        {/* Interactive Story Progression Track */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 4 Interactive Stage Selectors */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step) => {
              const isActive = activeStep === step.idx;
              return (
                <button
                  key={step.verb}
                  type="button"
                  onClick={() => setActiveStep(step.idx)}
                  className={`p-6 rounded-3xl border text-left transition-all flex flex-col justify-between space-y-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] ${
                    isActive
                      ? 'bg-[#F7F7F8] border-[#070709] shadow-md ring-1 ring-[#070709] scale-[1.02]'
                      : 'bg-white hover:bg-[#F7F7F8] border-[#E6E6E8] hover:border-[#D0D1D4]'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-wider text-[#8B8B8B] tabular-nums">
                        PHASE {step.num}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${step.badgeColor}`}>
                        {isActive ? 'Active' : 'Preview'}
                      </span>
                    </div>

                    <div className={`text-3xl font-black tracking-tight ${step.accent}`}>
                      {step.verb}
                    </div>

                    <div className="text-sm font-bold text-[#070709]">
                      {step.headline}
                    </div>

                    <p className="text-xs text-[#60606C] leading-relaxed">
                      {step.body}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6E6E8] flex items-center justify-between text-xs font-bold text-[#8B8B8B]">
                    <span>Inspect Phase</span>
                    <ArrowRight weight="bold" className={`w-3.5 h-3.5 ${isActive ? 'text-[#070709]' : 'text-[#8B8B8B]'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Live Simulation Theater: Visualizing the Selected Step */}
          <div className="lg:col-span-5 bg-[#070709] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D9A441]">
                  Live Loop Simulation
                </span>
                <span className="text-xs font-bold text-white/60 tabular-nums">
                  Step {activeStep + 1} of 4
                </span>
              </div>

              {/* Dynamic Interactive Stage Demonstration Canvas */}
              <div className="p-6 rounded-2xl bg-[#15171C] border border-white/10 space-y-5">
                {/* Visual Demonstration by Step */}
                {activeStep === 0 && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D9A441]">
                      <Compass weight="bold" className="w-4 h-4" />
                      <span>Action Input</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white">
                      Read 20 pages (Deep Work Focus)
                    </div>
                    <div className="text-xs text-[#8B8B8B]">
                      Effort is initiated in reality. No roleplay or fake games.
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#668F72]">
                      <CheckCircle weight="fill" className="w-4 h-4" />
                      <span>Instant Closure</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#668F72]/20 border border-[#668F72]/40 text-sm font-bold text-white flex items-center justify-between">
                      <span className="line-through text-white/70">Read 20 pages</span>
                      <span className="text-xs font-extrabold text-[#668F72]">✓ DONE</span>
                    </div>
                    <div className="text-xs text-[#8B8B8B]">
                      Single satisfying click seals the completed commitment.
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D9A441]">
                      <Lightning weight="fill" className="w-4 h-4" />
                      <span>Calibrated Yield</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#D9A441]/20 border border-[#D9A441]/40 flex items-center justify-between text-sm font-extrabold text-white">
                      <span className="text-[#668F72]">+50 XP CREDITED</span>
                      <span className="text-[#D9A441]">+15 GOLD</span>
                    </div>
                    <div className="text-xs text-[#8B8B8B]">
                      Deterministic math computes yield mapped to difficulty.
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#C85A3D]">
                      <TrendUp weight="bold" className="w-4 h-4" />
                      <span>Character Compounded</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#C85A3D]/20 border border-[#C85A3D]/40 flex items-center gap-3">
                      <Avatar variant="architect" size={42} system="blob" />
                      <div>
                        <div className="text-xs font-bold text-white">Level 12 Architect</div>
                        <div className="text-[11px] text-[#D9A441]">Intellect bar filled 78% &rarr; 80%</div>
                      </div>
                    </div>
                    <div className="text-xs text-[#8B8B8B]">
                      Every action permanently enriches your personal avatar.
                    </div>
                  </div>
                )}
              </div>

              {/* Explanatory Narrative */}
              <div>
                <h4 className="text-lg font-bold text-white">
                  {current.previewTitle}
                </h4>
                <p className="text-xs text-[#8B8B8B] mt-1 leading-relaxed">
                  {current.previewDesc}
                </p>
              </div>
            </div>

            {/* Advance Loop Button */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#D9A441] hover:text-white transition-colors cursor-pointer"
              >
                <span>Advance Loop ({activeStep + 1}/4)</span>
                <ArrowRight weight="bold" className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveStep(0)}
                className="inline-flex items-center gap-1 text-[11px] text-[#8B8B8B] hover:text-white transition-colors cursor-pointer"
              >
                <ArrowClockwise weight="bold" className="w-3 h-3" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

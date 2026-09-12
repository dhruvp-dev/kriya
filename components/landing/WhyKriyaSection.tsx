'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Sparkle,
  TrendUp,
  Brain,
  ArrowClockwise,
  Play,
} from '@phosphor-icons/react';
import { Avatar } from '../avatars';

export function WhyKriyaSection() {
  const [chainStage, setChainStage] = useState<number>(0);
  // 0: Task
  // 1: Action (Completed)
  // 2: Progress (+50 XP, bar advances)
  // 3: Character (Intellect attribute gained)

  const nextStage = () => {
    setChainStage((prev) => (prev < 3 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setChainStage(0);
  };

  return (
    <section className="py-28 md:py-36 bg-[#FFFFFF] border-t border-[#E6E6E8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Thesis Statement */}
        <div className="space-y-6 max-w-4xl">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#8B8B8B] tracking-[-0.03em] leading-tight">
            MOST PRODUCTIVITY APPS <br />
            HELP YOU MANAGE TASKS.
          </div>

          <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#070709] tracking-[-0.035em] leading-[1.04]">
            <span className="text-[#C85A3D]">KRIYA</span> HELPS YOU SEE <br />
            WHAT THOSE TASKS <br />
            ARE <span className="underline decoration-[#C85A3D] decoration-wavy decoration-2 underline-offset-8">BUILDING TOWARD.</span>
          </div>
        </div>

        {/* Live Transformation Sandbox: TASK -> ACTION -> PROGRESS -> CHARACTER */}
        <div className="bg-[#F7F7F8] border border-[#E6E6E8] rounded-3xl p-8 sm:p-12 shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E8] pb-6">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#C85A3D]">
                Interactive Transformation Demo
              </div>
              <h3 className="text-xl font-black text-[#070709] mt-0.5">
                The Compounding Chain
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={nextStage}
                className="inline-flex items-center gap-2 bg-[#070709] hover:bg-[#202025] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>{chainStage === 3 ? 'Reset Loop' : 'Trigger Next Stage'}</span>
                <ArrowRight weight="bold" className="w-3.5 h-3.5" />
              </button>

              {chainStage > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl border border-[#E6E6E8] bg-white text-[#60606C] hover:text-[#070709] transition-colors cursor-pointer"
                  title="Reset chain"
                >
                  <ArrowClockwise weight="bold" className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 4 Interactive Connected Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* STAGE 1: TASK */}
            <div
              className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all duration-300 ${
                chainStage >= 0
                  ? 'bg-white border-[#070709] shadow-sm ring-1 ring-[#070709]'
                  : 'bg-white/60 border-[#E6E6E8]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F7F7F8] text-[#60606C]">
                    01 · Task
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#070709]" />
                </div>
                <div className="text-xl font-black text-[#070709]">
                  Commitment
                </div>
                <div className="p-3 bg-[#F7F7F8] rounded-xl border border-[#E6E6E8] text-xs font-semibold text-[#070709]">
                  &ldquo;Read 20 pages&rdquo;
                </div>
                <p className="text-xs text-[#60606C]">
                  A planned priority on your schedule waiting for execution.
                </p>
              </div>

              <div className="text-[11px] font-bold text-[#8B8B8B]">
                Status: {chainStage > 0 ? 'Executed ✓' : 'Pending'}
              </div>
            </div>

            {/* STAGE 2: ACTION */}
            <div
              className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all duration-300 ${
                chainStage >= 1
                  ? 'bg-white border-[#668F72] shadow-sm ring-1 ring-[#668F72]'
                  : 'bg-white/60 border-[#E6E6E8] opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F1F6F3] text-[#668F72]">
                    02 · Action
                  </span>
                  <span className={`w-2 h-2 rounded-full ${chainStage >= 1 ? 'bg-[#668F72]' : 'bg-[#E6E6E8]'}`} />
                </div>
                <div className="text-xl font-black text-[#070709]">
                  Execution
                </div>
                <div className="p-3 bg-[#F1F6F3] rounded-xl border border-[#668F72]/30 text-xs font-bold text-[#668F72] flex items-center justify-between">
                  <span>Effort Expended</span>
                  <Check weight="bold" className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#60606C]">
                  Real mental energy invested. Marked completed with crisp validation.
                </p>
              </div>

              <div className="text-[11px] font-bold text-[#8B8B8B]">
                Status: {chainStage >= 1 ? 'Validated' : 'Awaiting Action'}
              </div>
            </div>

            {/* STAGE 3: PROGRESS */}
            <div
              className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all duration-300 ${
                chainStage >= 2
                  ? 'bg-white border-[#D9A441] shadow-sm ring-1 ring-[#D9A441]'
                  : 'bg-white/60 border-[#E6E6E8] opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FBF5EA] text-[#D9A441]">
                    03 · Progress
                  </span>
                  <span className={`w-2 h-2 rounded-full ${chainStage >= 2 ? 'bg-[#D9A441]' : 'bg-[#E6E6E8]'}`} />
                </div>
                <div className="text-xl font-black text-[#070709]">
                  Accumulation
                </div>
                <div className="p-3 bg-[#FBF5EA] rounded-xl border border-[#D9A441]/30 text-xs font-extrabold text-[#D9A441] flex items-center justify-between">
                  <span>+50 XP Yielded</span>
                  <Sparkle weight="fill" className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#60606C]">
                  Calibrated XP fills the level track and increments wallet Gold.
                </p>
              </div>

              <div className="text-[11px] font-bold text-[#8B8B8B]">
                Status: {chainStage >= 2 ? 'XP Credited' : 'Uncredited'}
              </div>
            </div>

            {/* STAGE 4: CHARACTER */}
            <div
              className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all duration-300 ${
                chainStage >= 3
                  ? 'bg-white border-[#C85A3D] shadow-sm ring-1 ring-[#C85A3D]'
                  : 'bg-white/60 border-[#E6E6E8] opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FDF4F2] text-[#C85A3D]">
                    04 · Character
                  </span>
                  <span className={`w-2 h-2 rounded-full ${chainStage >= 3 ? 'bg-[#C85A3D]' : 'bg-[#E6E6E8]'}`} />
                </div>
                <div className="text-xl font-black text-[#070709]">
                  Identity
                </div>
                <div className="p-3 bg-[#FDF4F2] rounded-xl border border-[#C85A3D]/30 text-xs font-extrabold text-[#C85A3D] flex items-center justify-between">
                  <span>Intellect +1 Gained</span>
                  <Brain weight="bold" className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#60606C]">
                  Your avatar reflects the discipline you embody in the physical world.
                </p>
              </div>

              <div className="text-[11px] font-bold text-[#8B8B8B]">
                Status: {chainStage >= 3 ? 'Character Evolved' : 'Pending Growth'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

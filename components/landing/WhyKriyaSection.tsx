import React from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function WhyKriyaSection() {
  const steps = [
    {
      step: 'ACTION',
      role: 'Real Effort',
      desc: 'The genuine physical, mental, or creative energy you commit every single day.',
      accent: 'text-[#070709]',
    },
    {
      step: 'PROGRESS',
      role: 'Visible Compounding',
      desc: 'XP, streaks, and levels that accumulate without disappearing into completed checklists.',
      accent: 'text-[#D9A441]',
    },
    {
      step: 'CHARACTER',
      role: 'Lasting Identity',
      desc: 'The person you are actively becoming through repeated discipline and focus.',
      accent: 'text-[#C85A3D]',
    },
  ];

  return (
    <section className="py-28 md:py-36 bg-[#FFFFFF] border-t border-[#E6E6E8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Large Statement as Visual Moment */}
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

        {/* Clean Triad Flow: ACTION -> PROGRESS -> CHARACTER */}
        <div className="pt-8 border-t border-[#E6E6E8]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((node, idx) => (
              <div
                key={node.step}
                className="bg-[#F7F7F8] border border-[#E6E6E8] rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#8B8B8B]">
                      Phase 0{idx + 1}
                    </span>
                    {idx < 2 && (
                      <span className="hidden md:inline-block text-[#8B8B8B]">
                        <ArrowRight weight="bold" className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div className={`text-3xl font-black tracking-tight ${node.accent}`}>
                    {node.step}
                  </div>
                  <div className="text-xs font-extrabold text-[#070709]">
                    {node.role}
                  </div>
                  <p className="text-xs sm:text-sm text-[#60606C] leading-relaxed">
                    {node.desc}
                  </p>
                </div>

                <div className="text-[11px] font-bold text-[#8B8B8B]">
                  Core Mechanism
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

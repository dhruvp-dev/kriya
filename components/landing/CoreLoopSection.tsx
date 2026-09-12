'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';

interface LoopStage {
  id: string;
  stage: string;
  title: string;
  image: string;
  alt: string;
  desc: string;
  rewardText: string;
}

const LOOP_STAGES: LoopStage[] = [
  {
    id: 'do',
    stage: 'DO',
    title: 'Real Action',
    image: '/illustrations/loop_do.jpg',
    alt: 'Pixel art hands tying blue running sneakers',
    desc: 'Take on any real-life task, from physical exercise to quiet study.',
    rewardText: 'Initiative taken',
  },
  {
    id: 'complete',
    stage: 'COMPLETE',
    title: 'Quest Stamp',
    image: '/illustrations/loop_complete.jpg',
    alt: 'Pixel art quest card on wooden desk with green stamped checkmark',
    desc: 'Mark the task finished with a single satisfying click.',
    rewardText: 'Instant validation',
  },
  {
    id: 'earn',
    stage: 'EARN',
    title: 'XP & Gold',
    image: '/illustrations/loop_earn.jpg',
    alt: 'Pixel art gold coins with an emerald glowing XP crystal',
    desc: 'Receive transparent rewards proportional to your chosen effort.',
    rewardText: '+50 XP, +15 Gold',
  },
  {
    id: 'grow',
    stage: 'GROW',
    title: 'Level & Space',
    image: '/illustrations/loop_grow.jpg',
    alt: 'Pixel art flourishing potted plant with glowing golden level star',
    desc: 'Watch your stats climb and your study room visibly evolve over time.',
    rewardText: 'Visible momentum',
  },
];

export function CoreLoopSection() {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <section id="loop" className="py-20 bg-[#F5F1E8] border-t border-[#E8E1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#192420] tracking-tight">
            THE KRIYA LOOP
          </h2>
          <p className="text-base sm:text-lg text-[#667770]">
            Four connected stages that transform daily habits into lasting momentum.
          </p>
        </div>

        {/* Narrative Flow Track */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {LOOP_STAGES.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#FFFFFF] border-[#1B4332] shadow-md ring-1 ring-[#1B4332]/20'
                    : 'bg-[#FFFFFF]/70 hover:bg-[#FFFFFF] border-[#E8E1D3]'
                }`}
              >
                <div>
                  {/* Stage Label & Micro-Indicator */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E1D3]/60">
                    <span className="font-technical font-bold text-sm tracking-wider text-[#1B4332]">
                      STAGE 0{idx + 1}
                    </span>
                    <span className="font-extrabold text-xs px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8E1D3] text-[#192420]">
                      {stage.stage}
                    </span>
                  </div>

                  {/* Pixel Art Vignette */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#E8E1D3] mb-4 bg-[#FAF8F5]">
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text Details */}
                  <h3 className="text-lg font-bold text-[#192420] mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#667770] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                {/* Bottom Reward Pill */}
                <div className="mt-4 pt-3 border-t border-[#E8E1D3]/50 flex items-center justify-between">
                  <span className="text-[11px] font-technical font-semibold text-[#1B4332]">
                    {stage.rewardText}
                  </span>
                  {idx < LOOP_STAGES.length - 1 && (
                    <ArrowRight weight="bold" className="w-4 h-4 text-[#667770] hidden lg:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

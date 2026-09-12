'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Compass } from 'lucide-react';

interface LoopStage {
  id: string;
  stage: string;
  title: string;
  image: string;
  alt: string;
  desc: string;
  rewardText: string;
  icon: any;
}

const LOOP_STAGES: LoopStage[] = [
  {
    id: 'do',
    stage: 'DO',
    title: 'Real Action',
    image: '/illustrations/loop_do.jpg',
    alt: 'Pixel art hands tying blue running sneakers',
    desc: 'Execute your real-world tasks, focus sessions, and exercise routines.',
    rewardText: 'Daily action executed',
    icon: Compass,
  },
  {
    id: 'complete',
    stage: 'COMPLETE',
    title: 'Instant Confirmation',
    image: '/illustrations/loop_complete.jpg',
    alt: 'Pixel art quest card with checkmark',
    desc: 'Mark the task finished with a single satisfying checkmark.',
    rewardText: 'Action validated',
    icon: CheckCircle2,
  },
  {
    id: 'earn',
    stage: 'EARN',
    title: 'XP & Gold Yield',
    image: '/illustrations/loop_earn.jpg',
    alt: 'Pixel art gold coins with XP crystal',
    desc: 'Receive calibrated progression rewards mapped directly to effort.',
    rewardText: '+50 XP, +15 Gold',
    icon: Sparkles,
  },
  {
    id: 'grow',
    stage: 'GROW',
    title: 'Level & Evolution',
    image: '/illustrations/loop_grow.jpg',
    alt: 'Pixel art plant with golden level star',
    desc: 'Watch your stats climb and your archetype profile level up visibly.',
    rewardText: 'Visible momentum',
    icon: TrendingUp,
  },
];

export function CoreLoopSection() {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <section id="loop" className="py-20 bg-white border-t border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C85A3D]">
            Progression Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-tight">
            The KRIYA Progression Loop
          </h2>
          <p className="text-base text-[#60606C]">
            Four connected stages that transform daily habits into lasting momentum.
          </p>
        </div>

        {/* Flow Track */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {LOOP_STAGES.map((stage, idx) => {
            const isActive = activeStage === idx;
            const IconComp = stage.icon;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-[#070709] shadow-md ring-1 ring-[#070709]'
                    : 'bg-[#F7F7F8] hover:bg-white border-[#E6E6E8] hover:border-[#D0D1D4]'
                }`}
              >
                <div>
                  {/* Stage Label */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E6E6E8]">
                    <span className="tabular-nums font-bold text-xs tracking-wider text-[#070709] flex items-center gap-1.5">
                      <IconComp className="w-3.5 h-3.5 text-[#C85A3D]" />
                      STAGE 0{idx + 1}
                    </span>
                    <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E6E6E8] text-[#60606C]">
                      {stage.stage}
                    </span>
                  </div>

                  {/* Artwork Vignette */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#E6E6E8] mb-4 bg-white">
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text Details */}
                  <h3 className="text-base font-bold text-[#070709] mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#60606C] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                {/* Bottom Reward Pill */}
                <div className="mt-4 pt-3 border-t border-[#E6E6E8] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#070709] tabular-nums">
                    {stage.rewardText}
                  </span>
                  {idx < LOOP_STAGES.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-[#8B8B8B] hidden lg:block" />
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

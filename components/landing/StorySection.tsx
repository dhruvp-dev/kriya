'use client';

import React from 'react';
import Image from 'next/image';

interface StoryStep {
  number: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  description: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    number: '01',
    title: 'Real-world Action',
    subtitle: 'Begin with reality',
    image: '/illustrations/story_do_action.jpg',
    alt: 'Character tying running shoes on a sunny morning porch getting ready for a run',
    description: 'Go for a morning workout, study twenty pages, or write documentation. Tangible daily effort is the foundation.',
  },
  {
    number: '02',
    title: 'Structure Into Quests',
    subtitle: 'Add clarity',
    image: '/illustrations/story_turn_quest.jpg',
    alt: 'Hand-bound quest journal on a wooden desk with compass and glowing reward notes',
    description: 'Log your task in seconds. Choose your target attribute, assign calibrated difficulty, and define clear completion criteria.',
  },
  {
    number: '03',
    title: 'Visible Momentum',
    subtitle: 'See consistency compound',
    image: '/illustrations/story_watch_grow.jpg',
    alt: 'Character reading peacefully on a balcony at dusk surrounded by blooming plants and lanterns',
    description: 'Celebrate small wins every day. Your stats rise, your streak extends, and your character momentum becomes visible.',
  },
];

export function StorySection() {
  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-[#E6E6E8] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C85A3D]">
            The Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-tight">
            How KRIYA Works
          </h2>
          <p className="text-base text-[#60606C]">
            A quiet, disciplined rhythm connecting your daily reality to tangible personal growth.
          </p>
        </div>

        {/* Horizontal Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {STORY_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8] p-6 shadow-xs flex flex-col justify-between group hover:border-[#D0D1D4] transition-all"
            >
              {/* Top Step Number and Subtitle */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E6E8] mb-4">
                <span className="tabular-nums font-extrabold text-xl text-[#070709]">
                  {step.number}
                </span>
                <span className="text-xs font-semibold text-[#8B8B8B]">
                  {step.subtitle}
                </span>
              </div>

              {/* Illustration Canvas */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#E6E6E8] mb-5 bg-white">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Text Description */}
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-[#070709]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#60606C] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    title: 'DO SOMETHING REAL',
    subtitle: 'Begin with real action',
    image: '/illustrations/story_do_action.jpg',
    alt: 'Character tying running shoes on a sunny morning porch getting ready for a run',
    description: 'Go for a morning run, read twenty pages, or clean your desk. Real-life action is the foundation.',
  },
  {
    number: '02',
    title: 'TURN IT INTO A QUEST',
    subtitle: 'Give effort a structure',
    image: '/illustrations/story_turn_quest.jpg',
    alt: 'Hand-bound quest journal on a wooden desk with compass and glowing reward notes',
    description: 'Log your task in seconds. Choose your focus, assign simple XP, and define what completion looks like.',
  },
  {
    number: '03',
    title: 'WATCH YOURSELF GROW',
    subtitle: 'See consistency flourish',
    image: '/illustrations/story_watch_grow.jpg',
    alt: 'Character reading peacefully on a balcony at dusk surrounded by blooming plants and lanterns',
    description: 'Celebrate small wins every day. Your stats rise, your space blooms, and your momentum becomes real.',
  },
];

export function StorySection() {
  return (
    <section id="how-it-works" className="py-20 bg-[#FAF8F5] border-t border-[#E8E1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Vertical Stack, no split header, no em-dash) */}
        <div className="max-w-2xl mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#192420] tracking-tight">
            HOW KRIYA WORKS
          </h2>
          <p className="text-base sm:text-lg text-[#667770]">
            A quiet, visual rhythm connecting your daily reality to tangible personal growth.
          </p>
        </div>

        {/* Horizontal Editorial Composition on Desktop / Stack on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {STORY_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E8E1D3] p-6 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              {/* Top Step Number and Subtitle */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D3]/70 mb-4">
                <span className="font-technical font-black text-2xl text-[#1B4332]">
                  {step.number}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#667770]">
                  {step.subtitle}
                </span>
              </div>

              {/* Illustration Canvas */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#E8E1D3] mb-5 bg-[#F6F2EA]">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Text Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#192420]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#667770] leading-relaxed">
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

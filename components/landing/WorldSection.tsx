'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkle, Plant, BookmarkSimple, Trophy } from '@phosphor-icons/react';

export function WorldSection() {
  const [levelView, setLevelView] = useState<'lvl1' | 'lvl10'>('lvl10');

  const highlights = levelView === 'lvl1' ? [
    { label: 'Starter Desk', desc: 'A clean wooden table with a single open notebook and pencil.', icon: BookmarkSimple },
    { label: 'Single Sprout', desc: 'A modest green seedling waiting for consistency to nurture it.', icon: Plant },
    { label: 'Blank Frame', desc: 'An empty wooden wall frame ready to celebrate your first milestone.', icon: Trophy },
  ] : [
    { label: 'Creative Studio', desc: 'Laptop, stacked project books, and an amber brass reading lamp.', icon: BookmarkSimple },
    { label: 'Flourishing Flora', desc: 'A thriving monstera and ivy vines framing the sunny window.', icon: Plant },
    { label: 'Honored Diploma', desc: 'A gold-sealed achievement diploma and celebratory ribbons.', icon: Trophy },
  ];

  return (
    <section id="world" className="py-20 bg-[#F5F1E8] border-t border-[#E8E1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#192420] tracking-tight leading-tight">
            PROGRESS SHOULD <br />
            FEEL VISIBLE.
          </h2>
          <p className="text-base sm:text-lg text-[#667770]">
            Every day you show up, your personal environment subtly evolves. Your effort leaves an enduring mark.
          </p>
        </div>

        {/* Level Toggle Control */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setLevelView('lvl1')}
            className={`px-4 py-2 text-xs font-technical font-bold rounded-lg border transition-all ${
              levelView === 'lvl1'
                ? 'bg-[#FFFFFF] border-[#1B4332] text-[#1B4332] shadow-sm'
                : 'bg-[#FFFFFF]/60 border-[#E8E1D3] text-[#667770] hover:bg-[#FFFFFF]'
            }`}
          >
            STAGE 1: CLEAN SLATE
          </button>

          <button
            type="button"
            onClick={() => setLevelView('lvl10')}
            className={`px-4 py-2 text-xs font-technical font-bold rounded-lg border transition-all ${
              levelView === 'lvl10'
                ? 'bg-[#FFFFFF] border-[#1B4332] text-[#1B4332] shadow-sm ring-1 ring-[#1B4332]/20'
                : 'bg-[#FFFFFF]/60 border-[#E8E1D3] text-[#667770] hover:bg-[#FFFFFF]'
            }`}
          >
            STAGE 10: FLOURISHING SANCTUARY
          </button>
        </div>

        {/* Illustrated Environment Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#E8E1D3] bg-[#FFFFFF] shadow-md group">
              <Image
                src={levelView === 'lvl1' ? '/illustrations/room_level_one.jpg' : '/illustrations/room_level_ten.jpg'}
                alt={levelView === 'lvl1' ? 'Starter study room with simple desk and sprout' : 'Evolved study room with lush plants and achievements'}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />

              {/* In-Canvas Level Stamp */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E8E1D3] rounded-md shadow-xs">
                <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="font-technical text-xs font-bold text-[#192420]">
                  {levelView === 'lvl1' ? 'LEVEL 01 ROOM' : 'LEVEL 10 SANCTUARY'}
                </span>
              </div>
            </div>
          </div>

          {/* Environmental Story Notes */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#667770]">
              ENVIRONMENT EVOLUTION
            </div>
            
            <div className="space-y-3">
              {highlights.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-[#FFFFFF] rounded-xl border border-[#E8E1D3] p-4 shadow-2xs space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#FAF8F5] border border-[#E8E1D3] flex items-center justify-center text-[#1B4332]">
                        <IconComponent weight="bold" className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-sm text-[#192420]">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#667770] leading-relaxed pl-8">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D3] text-xs text-[#667770] leading-relaxed">
              You do not need to play a fantasy game. Kriya simply gives your everyday real-life discipline a warm, peaceful visual world to grow inside.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

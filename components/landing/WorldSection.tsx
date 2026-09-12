'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Sprout, BookOpen, Trophy } from 'lucide-react';

export function WorldSection() {
  const [levelView, setLevelView] = useState<'lvl1' | 'lvl10'>('lvl10');

  const highlights = levelView === 'lvl1' ? [
    { label: 'Starter Desk', desc: 'A clean wooden table with a single open notebook and pencil.', icon: BookOpen },
    { label: 'Single Sprout', desc: 'A modest green seedling waiting for consistency to nurture it.', icon: Sprout },
    { label: 'Blank Frame', desc: 'An empty wooden wall frame ready to celebrate your first milestone.', icon: Trophy },
  ] : [
    { label: 'Creative Studio', desc: 'Laptop, stacked project books, and an amber brass reading lamp.', icon: BookOpen },
    { label: 'Flourishing Flora', desc: 'A thriving monstera and ivy vines framing the sunny window.', icon: Sprout },
    { label: 'Honored Diploma', desc: 'A gold-sealed achievement diploma and celebratory ribbons.', icon: Trophy },
  ];

  return (
    <section id="world" className="py-20 bg-white border-t border-[#E6E6E8] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C85A3D]">
            Progression Environment
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-tight">
            Progress should feel visible.
          </h2>
          <p className="text-base text-[#60606C]">
            Every day you show up, your personal environment subtly evolves. Your effort leaves an enduring mark.
          </p>
        </div>

        {/* Level Toggle Control */}
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setLevelView('lvl1')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              levelView === 'lvl1'
                ? 'bg-[#070709] border-[#070709] text-white shadow-xs'
                : 'bg-[#F7F7F8] border-[#E6E6E8] text-[#60606C] hover:bg-white'
            }`}
          >
            Stage 1: Clean Slate
          </button>

          <button
            type="button"
            onClick={() => setLevelView('lvl10')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              levelView === 'lvl10'
                ? 'bg-[#070709] border-[#070709] text-white shadow-xs'
                : 'bg-[#F7F7F8] border-[#E6E6E8] text-[#60606C] hover:bg-white'
            }`}
          >
            Stage 10: Flourishing Studio
          </button>
        </div>

        {/* Illustrated Environment Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#E6E6E8] bg-[#F7F7F8] shadow-sm">
              <Image
                src={levelView === 'lvl1' ? '/illustrations/room_level_one.jpg' : '/illustrations/room_level_ten.jpg'}
                alt={levelView === 'lvl1' ? 'Starter study room with simple desk and sprout' : 'Evolved study room with lush plants and achievements'}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />

              {/* In-Canvas Level Stamp */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm border border-[#E6E6E8] rounded-xl shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                <span className="text-xs font-bold text-[#070709]">
                  {levelView === 'lvl1' ? 'Level 01 Workspace' : 'Level 10 Studio'}
                </span>
              </div>
            </div>
          </div>

          {/* Environmental Story Notes */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#60606C]">
              Environment Evolution
            </div>

            <div className="space-y-3">
              {highlights.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8] p-4 space-y-1"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white border border-[#E6E6E8] flex items-center justify-center text-[#070709] shrink-0">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-sm text-[#070709]">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#60606C] leading-relaxed pl-9">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E6E6E8] text-xs text-[#60606C] leading-relaxed">
              You do not need to play a fantasy roleplay game. KRIYA gives your real-life discipline a calm, beautifully illustrated space to evolve alongside your habits.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

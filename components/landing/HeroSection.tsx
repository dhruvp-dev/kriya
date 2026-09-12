'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Sparkle, TrendUp, Coin } from '@phosphor-icons/react';

export function HeroSection() {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  return (
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT: Copy Stack (Max 4 text elements: Eyebrow, Headline, Subtext, CTAs) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Eyebrow */}
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B4332]">
              MAKE TODAY COUNT.
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#192420] leading-[1.08] tracking-tight">
              YOUR LIFE <br />
              IS ALREADY FULL <br />
              <span className="text-[#1B4332]">OF QUESTS.</span>
            </h1>

            {/* Supporting Text (19 words) */}
            <p className="text-base sm:text-lg text-[#667770] leading-relaxed max-w-md">
              Turn the things you already do into quests. Earn XP, build your character, and make your progress visible.
            </p>

            {/* Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#133226] text-[#FAF8F5] font-semibold text-base px-6 py-3.5 rounded-lg shadow-sm transition-all active:scale-[0.98]"
              >
                <span>START YOUR JOURNEY</span>
                <ArrowRight weight="bold" className="w-4 h-4" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F5F1E8] text-[#192420] border border-[#E8E1D3] font-semibold text-base px-6 py-3.5 rounded-lg transition-all"
              >
                <span>SEE HOW IT WORKS</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Large Original Pixel-Art Room Scene with Diegetic Floating UI */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E8E1D3] bg-[#FFFFFF] shadow-lg group">
              {/* Main 16-bit Cozy Desk Illustration */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/illustrations/hero_cozy_desk.jpg"
                  alt="Cozy sunlit study room with a character working at a wooden desk with plants, books, and morning sunlight"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Integrated Diegetic Floating Chips (Integrated into the illustration world) */}
              {/* +50 XP Chip */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF]/95 backdrop-blur-sm border border-[#E8E1D3] rounded-md shadow-sm transition-transform hover:-translate-y-0.5">
                <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#1B4332]" />
                <span className="font-technical text-xs font-bold text-[#1B4332]">+50 XP</span>
              </div>

              {/* +15 GOLD Chip */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF]/95 backdrop-blur-sm border border-[#E8E1D3] rounded-md shadow-sm transition-transform hover:-translate-y-0.5">
                <Coin weight="fill" className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="font-technical text-xs font-bold text-[#D97706]">+15 GOLD</span>
              </div>

              {/* QUEST COMPLETE Pill */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 px-3.5 py-2 bg-[#FAF8F5]/95 backdrop-blur-sm border border-[#E8E1D3] rounded-lg shadow-md transition-transform hover:-translate-y-0.5">
                <CheckCircle weight="fill" className="w-4 h-4 text-[#1B4332]" />
                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#667770]">STATUS</div>
                  <div className="text-xs font-extrabold text-[#192420]">QUEST COMPLETE</div>
                </div>
              </div>

              {/* LEVEL UP Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 px-3.5 py-2 bg-[#FAF8F5]/95 backdrop-blur-sm border border-[#D97706]/40 rounded-lg shadow-md transition-transform hover:-translate-y-0.5">
                <div className="w-7 h-7 rounded-md bg-[#FEF3C7] flex items-center justify-center text-[#D97706]">
                  <TrendUp weight="bold" className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">LEVEL 12</div>
                  <div className="text-xs font-extrabold text-[#192420]">LEVEL UP</div>
                </div>
              </div>

              {/* Subtle Environmental Discovery Hotspots */}
              <button
                type="button"
                onClick={() => setActiveNote('Monstera: Plant Growth Stage 3 (Deep Focus streak unlocked)')}
                className="absolute bottom-[28%] left-[8%] w-5 h-5 rounded-full bg-[#1B4332]/80 text-[#FAF8F5] text-[10px] flex items-center justify-center font-bold hover:scale-110 transition-transform shadow-sm focus:outline-none"
                aria-label="Discover Plant"
                title="Inspect plant"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => setActiveNote('Open Notebook: Daily real-world quests written and tracked')}
                className="absolute bottom-[26%] right-[28%] w-5 h-5 rounded-full bg-[#D97706]/80 text-[#FAF8F5] text-[10px] flex items-center justify-center font-bold hover:scale-110 transition-transform shadow-sm focus:outline-none"
                aria-label="Discover Notebook"
                title="Inspect notebook"
              >
                +
              </button>

              {/* Discovery Toast */}
              {activeNote && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-[#192420]/95 text-[#FAF8F5] text-xs font-medium rounded-lg shadow-xl backdrop-blur-sm flex items-center gap-2.5 animate-fadeIn">
                  <span>{activeNote}</span>
                  <button
                    type="button"
                    onClick={() => setActiveNote(null)}
                    className="text-[#FAF8F5]/70 hover:text-[#FAF8F5] text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

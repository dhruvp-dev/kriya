import React from 'react';
import Link from 'next/link';
import { HeroQuestPreview } from './HeroQuestPreview';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function HeroSection() {
  return (
    <section className="relative min-h-[82vh] lg:min-h-[86vh] flex items-center pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT: 45% Text - Bold Editorial Statement */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C85A3D]">
              <span className="w-2 h-2 rounded-full bg-[#C85A3D]" />
              <span>MAKE TODAY COUNT.</span>
            </div>

            {/* Dramatic Headline: 64-84px on Desktop */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[80px] font-extrabold text-[#070709] tracking-[-0.035em] leading-[0.96]">
              YOUR LIFE <br />
              IS ALREADY FULL <br />
              OF QUESTS.
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg lg:text-xl text-[#60606C] leading-relaxed max-w-[460px] font-normal">
              Turn the things you already do into quests, earn XP, build your character, and make your progress visible.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#070709] hover:bg-[#202025] text-white font-semibold text-base px-8 py-4 rounded-2xl transition-all shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] focus-visible:ring-offset-2"
              >
                <span>Start your journey</span>
                <ArrowRight weight="bold" className="w-4 h-4" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-[#F7F7F8] hover:bg-[#F3F4F5] text-[#070709] border border-[#E6E6E8] font-semibold text-base px-7 py-4 rounded-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709]"
              >
                <span>See how it works</span>
              </a>
            </div>

            {/* Quiet Product Truth Line */}
            <div className="pt-1 flex items-center gap-6 text-xs text-[#8B8B8B] font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#668F72]" />
                Zero gaming noise
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#668F72]" />
                Distinctive blob avatars
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#668F72]" />
                Permanent progress
              </span>
            </div>
          </div>

          {/* RIGHT: 55% Visual - Anchoring Product Composition */}
          <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
            <HeroQuestPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

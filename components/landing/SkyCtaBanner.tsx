'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';

export function SkyCtaBanner() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* High-Fidelity Sky Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/sky_clouds_bg.webp"
          alt="Sky and Clouds"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Soft bottom blend to black for Footer transition */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#070709] to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Bold White Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-medium text-white tracking-normal leading-tight">
          Transform your daily habits with visible progression.
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-normal tracking-normal">
          Stop juggling forgotten to-do lists and fragmented habit trackers. Kriya unifies every action into an evolving character, compound attributes, and lifelong momentum.
        </p>

        {/* Dark Primary Button */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#070709] hover:bg-black text-white font-medium text-sm rounded-xl transition-all shadow-xl active:scale-[0.98] group tracking-normal"
          >
            <span>Get Started Now</span>
            <ArrowRight weight="bold" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';
import { HeroQuestPreview } from './HeroQuestPreview';

export function HeroSection() {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-[#FFFFFF]">
      {/* Background Soft Atmospheric Clouds in Hero */}
      <div className="absolute top-0 right-0 w-full sm:w-2/3 lg:w-1/2 h-full pointer-events-none opacity-40 z-0">
        <Image
          src="/sky_clouds_bg.webp"
          alt="Atmospheric Clouds"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Copy & CTA (Approx 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#1D64EC] text-xs font-medium tracking-normal">
              <Sparkle weight="fill" className="w-3.5 h-3.5" />
              <span>Turn Action Into Progress</span>
            </div>

            {/* Bold Headline with reduced weight and normal tracking */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold text-[#070709] tracking-normal leading-[1.14]">
              Handle personal progression without the habit app chaos.
            </h1>

            {/* Concise Supporting Copy */}
            <p className="text-base sm:text-lg text-[#60606C] leading-relaxed max-w-lg font-normal tracking-normal">
              Finally—a progression system that lets you build momentum exactly how your mind works. Complete daily quests, compound your attributes, and free your life from abandoned to-do lists.
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#070709] hover:bg-[#1E1E24] text-white font-medium text-sm rounded-xl transition-all shadow-md active:scale-[0.98] group tracking-normal"
              >
                <span>Get Started Now</span>
                <ArrowRight weight="bold" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trusted by brands / builders row */}
            <div className="pt-8 border-t border-[#F0F1F3] space-y-3">
              <p className="text-xs font-medium text-[#8B8B8B] tracking-normal">
                Trusted by mindful builders at
              </p>
              <div className="flex items-center gap-6 sm:gap-8 text-[#9CA3AF] opacity-80 flex-wrap">
                <span className="font-semibold tracking-normal text-sm text-[#4B5563]">
                  ARCHETYPE
                </span>
                <span className="font-semibold tracking-normal text-sm text-[#4B5563]">
                  CHRONOS
                </span>
                <span className="font-semibold tracking-normal text-sm text-[#4B5563]">
                  STUDIO
                </span>
                <span className="font-semibold tracking-normal text-sm text-[#4B5563]">
                  SYNAPSE
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Real Kriya Hero Quest Preview with Clouds Framing (Approx 7 cols) */}
          <div className="lg:col-span-7 w-full relative">
            {/* Dedicated Sky Clouds Card behind Product Window */}
            <div className="absolute -top-6 -right-6 sm:-right-8 w-72 sm:w-96 h-72 sm:h-96 rounded-3xl overflow-hidden shadow-md pointer-events-none z-0">
              <Image
                src="/sky_clouds_bg.webp"
                alt="Blue Sky Clouds"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
            </div>

            <div className="relative z-10">
              <HeroQuestPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

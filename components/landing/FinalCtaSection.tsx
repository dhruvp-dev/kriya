import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Avatar } from '../avatars';

export function FinalCtaSection() {
  return (
    <section className="py-28 md:py-40 bg-[#F7F7F8] border-t border-[#E6E6E8] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        {/* Subtle Signature Avatar Presence */}
        <div className="flex justify-center -mb-2">
          <div className="relative p-2 bg-white rounded-3xl border border-[#E6E6E8] shadow-md hover:scale-105 transition-transform">
            <Avatar
              variant="architect"
              size={72}
              system="blob"
              frame="gold"
              showFrame={true}
            />
          </div>
        </div>

        {/* Large Confident Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#070709] tracking-[-0.035em] leading-[0.98] max-w-3xl mx-auto">
          YOUR NEXT LEVEL <br />
          STARTS WITH ONE ACTION.
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#60606C] max-w-xl mx-auto leading-relaxed font-normal">
          Turn the things you already do into quests, build your character, and make your progress visible.
        </p>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-[#070709] hover:bg-[#202025] text-white font-semibold text-base px-8 py-4 rounded-2xl transition-all shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] focus-visible:ring-offset-2"
          >
            <span>Start your journey</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F3F4F5] text-[#070709] border border-[#E6E6E8] font-semibold text-base px-8 py-4 rounded-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709]"
          >
            <span>Log in to your account</span>
          </Link>
        </div>

        <div className="pt-2 text-xs text-[#8B8B8B] font-medium">
          Free to start · Instant onboarding · Zero payment required
        </div>
      </div>
    </section>
  );
}

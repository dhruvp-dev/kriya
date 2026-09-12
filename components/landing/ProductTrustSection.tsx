import React from 'react';
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr';

export function ProductTrustSection() {
  return (
    <section className="py-16 md:py-20 bg-[#FFFFFF] border-t border-[#E6E6E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#668F72]">
          <ShieldCheck weight="fill" className="w-4 h-4" />
          <span>PROGRESS INTEGRITY</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#070709] tracking-tight">
          YOUR PROGRESS IS REAL.
        </h2>

        <p className="text-base text-[#60606C] max-w-lg mx-auto leading-relaxed">
          XP, Gold, levels, attributes and streaks are securely calculated by KRIYA. Your effort is preserved with deterministic precision.
        </p>
      </div>
    </section>
  );
}

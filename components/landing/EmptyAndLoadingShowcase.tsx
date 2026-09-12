'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Coffee } from 'lucide-react';

export function EmptyAndLoadingShowcase() {
  return (
    <section className="py-20 bg-[#FFFFFF] border-t border-[#E6E6E8] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#60606C]">
            Mindful Rest
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-tight">
            Calm empty moments.
          </h2>
          <p className="text-base text-[#60606C]">
            When there is nothing left to do, KRIYA welcomes quiet rest rather than inducing anxiety.
          </p>
        </div>

        {/* Empty State Card Showcase */}
        <div className="bg-[#F7F7F8] border border-[#E6E6E8] rounded-2xl p-6 sm:p-10 shadow-xs max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* LEFT: Illustrated Empty Board with Sleeping Cat */}
            <div className="md:col-span-6">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#E6E6E8] bg-white">
                <Image
                  src="/illustrations/empty_board.jpg"
                  alt="Character resting peacefully on a wooden bench beside an empty quest board with a sleeping orange cat"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* RIGHT: Warm Friendly Empty State Copy */}
            <div className="md:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E6E6E8] rounded-full text-xs font-semibold text-[#60606C]">
                <Coffee className="w-3.5 h-3.5 text-[#C85A3D]" />
                <span>Zero active quests remaining</span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#070709] tracking-tight">
                All caught up today.
              </h3>

              <p className="text-sm text-[#60606C] leading-relaxed">
                Nothing waiting for you right now. Take a breath, step away from the screen, or define your next meaningful priority.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-[#070709] hover:bg-[#202025] text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Quest</span>
                </Link>

                <div className="text-xs text-[#8B8B8B] italic">
                  Rest is part of sustainable progress.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

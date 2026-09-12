'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Coffee, Sparkle } from '@phosphor-icons/react';

export function EmptyAndLoadingShowcase() {
  return (
    <section className="py-20 bg-[#F5F1E8] border-t border-[#E8E1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-[#192420] tracking-tight">
            CALM EMPTY MOMENTS
          </h2>
          <p className="text-base sm:text-lg text-[#667770]">
            When there is nothing left to do, Kriya welcomes quiet rest instead of anxiety.
          </p>
        </div>

        {/* Empty State Card Showcase */}
        <div className="bg-[#FFFFFF] border border-[#E8E1D3] rounded-2xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: Illustrated Empty Board with Sleeping Cat */}
            <div className="md:col-span-6">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#E8E1D3] bg-[#FAF8F5]">
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[#E8E1D3] rounded-md text-xs font-technical font-bold text-[#667770]">
                <Coffee weight="bold" className="w-4 h-4 text-[#D97706]" />
                <span>STATE // ZERO ACTIVE QUESTS</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#192420] tracking-tight">
                NO QUESTS TODAY
              </h3>

              <p className="text-base text-[#667770] leading-relaxed">
                Nothing waiting for you. <br />
                Take a breath, rest your eyes, or create something worth completing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#133226] text-[#FAF8F5] font-semibold text-sm px-5 py-3 rounded-lg shadow-sm transition-all active:scale-[0.98]"
                >
                  <Plus weight="bold" className="w-4 h-4" />
                  <span>CREATE QUEST</span>
                </Link>

                <div className="text-xs text-[#667770] italic">
                  Rest is part of the rhythm.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

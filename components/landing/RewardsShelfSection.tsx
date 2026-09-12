'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, Bookmarks, Trophy, Sparkle, SealCheck } from '@phosphor-icons/react';

interface KeepsakeItem {
  id: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  icon: React.ElementType;
}

const KEEPSAKES: KeepsakeItem[] = [
  {
    id: 'badge',
    name: 'Mastery Achievement Badge',
    category: 'BADGE',
    origin: 'Completed 50 consecutive quests',
    description: 'A framed miniature badge honoring persistent daily focus.',
    icon: SealCheck,
  },
  {
    id: 'compass',
    name: 'Polished Brass Compass',
    category: 'COLLECTIBLE',
    origin: 'Explored 5 new skill domains',
    description: 'A tactile reminder to stay aligned with your true north.',
    icon: Compass,
  },
  {
    id: 'hourglass',
    name: 'Sand Timer Hourglass',
    category: 'COSMETIC',
    origin: 'Logged 100 hours of deep work',
    description: 'Measures intentional moments of undisturbed creative flow.',
    icon: Trophy,
  },
  {
    id: 'quill',
    name: 'Scholar Quill & Inkwell',
    category: 'TITLE ITEM',
    origin: 'Read 1,000 pages of books',
    description: 'Earned by those who write, reflect, and document their journey.',
    icon: Bookmarks,
  },
];

export function RewardsShelfSection() {
  const [selectedItem, setSelectedItem] = useState<string>('badge');
  const activeKeepsake = KEEPSAKES.find((k) => k.id === selectedItem) || KEEPSAKES[0];

  return (
    <section id="shelf" className="py-20 bg-[#FAF8F5] border-t border-[#E8E1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#1B4332]">
            PERSONAL COLLECTION
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#192420] tracking-tight leading-tight">
            PROGRESS LEAVES <br />
            SOMETHING BEHIND.
          </h2>
          <p className="text-base sm:text-lg text-[#667770]">
            Not virtual clutter or an ecommerce storefront. A personal shelf of keepsakes, badges, and honors reflecting seasons of focused effort.
          </p>
        </div>

        {/* Illustrated Shelf + Keepsake Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Illustrated Keepsake Shelf */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#E8E1D3] bg-[#FFFFFF] shadow-md group">
              <Image
                src="/illustrations/shelf_collectibles.jpg"
                alt="Cozy wooden wall shelf with personal collectibles including an achievement frame, brass compass, succulent, hourglass, and quill"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E8E1D3] rounded-md text-[11px] font-technical font-bold text-[#192420]">
                STUDY DISPLAY SHELF
              </div>
            </div>
          </div>

          {/* RIGHT: Keepsake Details List */}
          <div className="lg:col-span-5 space-y-3">
            {KEEPSAKES.map((item) => {
              const isSelected = selectedItem === item.id;
              const IconComponent = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#1B4332] shadow-sm ring-1 ring-[#1B4332]/20'
                      : 'bg-[#FFFFFF]/60 hover:bg-[#FFFFFF] border-[#E8E1D3]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8E1D3] flex items-center justify-center text-[#1B4332] shrink-0 mt-0.5">
                      <IconComponent weight="bold" className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#192420] leading-snug">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-technical uppercase px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#E8E1D3] text-[#667770]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#667770] leading-relaxed">
                        {item.description}
                      </p>
                      <div className="text-[11px] font-medium text-[#1B4332] pt-0.5">
                        Unlocked by: {item.origin}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

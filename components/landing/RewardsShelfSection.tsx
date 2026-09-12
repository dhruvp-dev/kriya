'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, Bookmark, Trophy, Award, Sparkles } from 'lucide-react';

interface KeepsakeItem {
  id: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  icon: any;
}

const KEEPSAKES: KeepsakeItem[] = [
  {
    id: 'badge',
    name: 'Mastery Achievement Badge',
    category: 'Badge',
    origin: 'Completed 50 consecutive quests',
    description: 'A framed miniature badge honoring persistent daily focus.',
    icon: Award,
  },
  {
    id: 'compass',
    name: 'Polished Brass Compass',
    category: 'Collectible',
    origin: 'Explored 5 new skill domains',
    description: 'A tactile reminder to stay aligned with your true north.',
    icon: Compass,
  },
  {
    id: 'hourglass',
    name: 'Sand Timer Hourglass',
    category: 'Cosmetic',
    origin: 'Logged 100 hours of deep work',
    description: 'Measures intentional moments of undisturbed creative flow.',
    icon: Trophy,
  },
  {
    id: 'quill',
    name: 'Scholar Quill & Bookmark',
    category: 'Title Item',
    origin: 'Read 1,000 pages of books',
    description: 'Earned by those who write, reflect, and document their journey.',
    icon: Bookmark,
  },
];

export function RewardsShelfSection() {
  const [selectedItem, setSelectedItem] = useState<string>('badge');

  return (
    <section id="shelf" className="py-20 bg-[#F7F7F8] border-t border-[#E6E6E8] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C85A3D]">
            Personal Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-tight">
            Progress leaves something behind.
          </h2>
          <p className="text-base text-[#60606C]">
            Not ecommerce storefront clutter. A personal collection of keepsakes and badges reflecting seasons of focused effort.
          </p>
        </div>

        {/* Illustrated Shelf + Keepsake Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: Illustrated Keepsake Shelf */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#E6E6E8] bg-white shadow-sm">
              <Image
                src="/illustrations/shelf_collectibles.jpg"
                alt="Cozy wooden wall shelf with personal collectibles including an achievement frame, brass compass, succulent, hourglass, and quill"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm border border-[#E6E6E8] rounded-xl text-xs font-bold text-[#070709]">
                Study Display Shelf
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
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#070709] shadow-sm ring-1 ring-[#070709]'
                      : 'bg-white/80 hover:bg-white border-[#E6E6E8]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center justify-center text-[#070709] shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#070709] leading-snug">
                          {item.name}
                        </span>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#F7F7F8] border border-[#E6E6E8] text-[#60606C]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#60606C] leading-relaxed">
                        {item.description}
                      </p>
                      <div className="text-xs font-semibold text-[#070709] pt-0.5">
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

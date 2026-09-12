'use client';

import React, { useState } from 'react';
import { Crown, Feather, Compass, Shield, Sparkle, Check } from '@phosphor-icons/react';
import { Avatar } from '../avatars';
import { AvatarFrameVariant } from '../avatars/avatarTypes';

interface RewardItem {
  id: string;
  type: 'frame' | 'title' | 'keepsake';
  name: string;
  cost: string;
  desc: string;
  frameValue?: AvatarFrameVariant;
  titleValue?: string;
  icon: any;
  accent: string;
}

const REWARDS: RewardItem[] = [
  {
    id: 'frame-gold',
    type: 'frame',
    name: 'Polished Gold Frame',
    cost: '500 Gold (Level 10)',
    desc: 'Lustrous warm metallic border celebrating double-digit mastery.',
    frameValue: 'gold',
    icon: Crown,
    accent: 'text-[#D9A441]',
  },
  {
    id: 'frame-coral',
    type: 'frame',
    name: 'Terracotta Sigil Frame',
    cost: '350 Gold (Streak 14)',
    desc: 'Deep warm clay trim honoring uninterrupted momentum.',
    frameValue: 'coral',
    icon: Shield,
    accent: 'text-[#C85A3D]',
  },
  {
    id: 'title-architect',
    type: 'title',
    name: '"The Architect" Moniker',
    cost: '300 Gold (50 Quests)',
    desc: 'Awarded to users who dedicate deep focus to system design and reading.',
    titleValue: 'The Architect',
    icon: Feather,
    accent: 'text-[#070709]',
  },
  {
    id: 'title-deepwork',
    type: 'title',
    name: '"Deep Worker" Moniker',
    cost: '400 Gold (100 Deep Hours)',
    desc: 'Recognizes sustained uninterrupted flow state sprints.',
    titleValue: 'Deep Worker',
    icon: Feather,
    accent: 'text-[#668F72]',
  },
  {
    id: 'keepsake-compass',
    type: 'keepsake',
    name: 'Brass Compass Artifact',
    cost: '250 Gold (4 Domains)',
    desc: 'Tactile desktop relic acknowledging curiosity across all 4 attributes.',
    icon: Compass,
    accent: 'text-[#D9A441]',
  },
];

export function RewardsSection() {
  const [equippedFrame, setEquippedFrame] = useState<AvatarFrameVariant>('gold');
  const [equippedTitle, setEquippedTitle] = useState<string>('The Architect');
  const [activeItem, setActiveItem] = useState<string>('frame-gold');

  const handleEquip = (item: RewardItem) => {
    setActiveItem(item.id);
    if (item.type === 'frame' && item.frameValue) {
      setEquippedFrame(item.frameValue);
    } else if (item.type === 'title' && item.titleValue) {
      setEquippedTitle(item.titleValue);
    }
  };

  return (
    <section id="rewards" className="py-24 md:py-36 bg-[#F7F7F8] border-t border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#D9A441]">
              <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>COLLECTIBLE REWARDS</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
              EARN THINGS <br />
              THAT FEEL LIKE YOURS.
            </h2>

            <p className="text-base sm:text-lg text-[#60606C] leading-relaxed">
              Click any cosmetic below to preview it live on your avatar. A personal inventory earned with in-game Gold—zero microtransactions.
            </p>
          </div>

          <div className="text-xs text-[#8B8B8B] font-semibold self-start lg:self-auto">
            Click any item to test live equip preview
          </div>
        </div>

        {/* Live Fitting Stage + Curated Shelf Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Live Avatar Fitting Room (Equip Preview Stage) */}
          <div className="lg:col-span-5 bg-white border border-[#E6E6E8] rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-between text-center space-y-8 shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B8B8B]">
                Live Preview Stage
              </span>
              <h3 className="text-xl font-black text-[#070709]">
                Character Customization
              </h3>
            </div>

            {/* Dynamic Avatar with Currently Equipped Frame */}
            <div className="relative p-6">
              <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] flex items-center justify-center transition-all duration-300">
                <Avatar
                  variant="architect"
                  size={190}
                  system="blob"
                  frame={equippedFrame}
                  showFrame={true}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Equipped Title & Perks Card */}
            <div className="w-full bg-[#F7F7F8] border border-[#E6E6E8] rounded-2xl p-4 space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B8B8B]">
                Equipped Moniker
              </div>
              <div className="text-base font-black text-[#070709]">
                &ldquo;{equippedTitle}&rdquo;
              </div>
              <div className="text-xs text-[#668F72] font-semibold">
                Active cosmetic loadout synced
              </div>
            </div>
          </div>

          {/* RIGHT: Curated Rewards Shelf (Interactive List) */}
          <div className="lg:col-span-7 space-y-3.5">
            {REWARDS.map((item) => {
              const ItemIcon = item.icon;
              const isEquipped =
                activeItem === item.id ||
                (item.type === 'frame' && equippedFrame === item.frameValue) ||
                (item.type === 'title' && equippedTitle === item.titleValue);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleEquip(item)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] ${
                    isEquipped
                      ? 'bg-white border-[#070709] shadow-md ring-1 ring-[#070709] scale-[1.01]'
                      : 'bg-white/80 hover:bg-white border-[#E6E6E8] hover:border-[#D0D1D4]'
                  }`}
                  aria-pressed={isEquipped}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-12 h-12 rounded-xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center justify-center shrink-0 ${item.accent}`}>
                      <ItemIcon weight="bold" className="w-6 h-6" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-extrabold text-[#070709] truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F7F7F8] border border-[#E6E6E8] text-[#60606C]">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#60606C] mt-0.5 truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-[#D9A441] tabular-nums hidden sm:inline">
                      {item.cost}
                    </span>

                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                        isEquipped
                          ? 'bg-[#070709] text-white border-[#070709]'
                          : 'bg-white text-[#070709] border-[#E6E6E8] hover:border-[#070709]'
                      }`}
                    >
                      {isEquipped ? 'Equipped ✓' : 'Equip'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

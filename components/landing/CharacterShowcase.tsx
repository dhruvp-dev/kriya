'use client';

import React, { useState } from 'react';
import { Avatar } from '../avatars';
import { AvatarVariant, AVATAR_ARCHETYPES } from '../avatars/avatarTypes';
import { Sparkle, Shield, Brain, Lightning, Palette } from '@phosphor-icons/react';

interface ArchetypeStats {
  strength: number;
  intellect: number;
  discipline: number;
  creativity: number;
}

const ARCHETYPE_STATS: Record<AvatarVariant, ArchetypeStats> = {
  architect: { strength: 7, intellect: 10, discipline: 8, creativity: 5 },
  scholar: { strength: 4, intellect: 10, discipline: 9, creativity: 6 },
  maker: { strength: 8, intellect: 6, discipline: 7, creativity: 9 },
  runner: { strength: 10, intellect: 5, discipline: 9, creativity: 4 },
  creator: { strength: 4, intellect: 7, discipline: 6, creativity: 10 },
  builder: { strength: 9, intellect: 6, discipline: 10, creativity: 5 },
  explorer: { strength: 7, intellect: 8, discipline: 7, creativity: 8 },
  strategist: { strength: 5, intellect: 10, discipline: 9, creativity: 6 },
};

const ARCHETYPE_IDS: AvatarVariant[] = [
  'architect',
  'scholar',
  'maker',
  'runner',
  'creator',
  'builder',
  'explorer',
  'strategist',
];

export function CharacterShowcase() {
  const [selectedVariant, setSelectedVariant] = useState<AvatarVariant>('architect');
  const activeMeta = AVATAR_ARCHETYPES[selectedVariant];
  const activeStats = ARCHETYPE_STATS[selectedVariant];

  const renderAttributeBar = (label: string, val: number, max: number, Icon: any, colorHex: string) => {
    const percent = Math.round((val / max) * 100);
    return (
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="font-bold text-[#070709] flex items-center gap-2">
            <Icon weight="bold" className="w-4 h-4" style={{ color: colorHex }} />
            {label}
          </span>
          <span className="tabular-nums font-bold text-[#60606C]">
            {val} / {max}
          </span>
        </div>
        <div className="h-2.5 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percent}%`, backgroundColor: colorHex }}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="character" className="py-24 md:py-36 bg-[#FFFFFF] border-t border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
            BUILD THE PERSON <br />
            YOU'RE BECOMING.
          </h2>
          <p className="text-base sm:text-lg text-[#60606C] leading-relaxed max-w-xl">
            Your character reflects what you choose to work on. This is where the RPG layer becomes personal: an organic identity that evolves with your daily focus.
          </p>
        </div>

        {/* Major Showcase Stage: Large Avatar (240px+) & Live Character Sheet */}
        <div className="bg-[#F7F7F8] border border-[#E6E6E8] rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT: Massive Prominent Blob Avatar (Brand Character) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-5">
              <div className="relative">
                {/* Decorative Halo Ring */}
                <div className="absolute inset-0 bg-[#FFFFFF] rounded-full scale-110 shadow-md border border-[#E6E6E8] -z-0" />

                {/* 240px Large Vector Blob Avatar */}
                <div className="relative z-10 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] flex items-center justify-center p-3 transition-transform duration-300 hover:scale-105">
                  <Avatar
                    variant={selectedVariant}
                    size={240}
                    system="blob"
                    frame="gold"
                    showFrame={true}
                    className="w-full h-full"
                  />
                </div>

                {/* Level 12 Tag Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-[#070709] text-white text-xs font-extrabold tracking-wider uppercase shadow-md tabular-nums">
                  LEVEL 12
                </div>
              </div>

              {/* Character Identity Footnote */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8B8B8B]">
                  Active Archetype
                </div>
                <div className="text-xl font-extrabold text-[#070709]">
                  {activeMeta.name}
                </div>
              </div>
            </div>

            {/* RIGHT: Character Stats & Story Sheet */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E6E6E8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6E6E8] pb-5">
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] uppercase font-extrabold text-[#C85A3D] px-2.5 py-0.5 bg-[#FDF4F2] rounded-md mb-1.5 border border-[#C85A3D]/20">
                    <Sparkle weight="fill" className="w-3.5 h-3.5" />
                    <span>{activeMeta.trait}</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#070709] tracking-tight">
                    {activeMeta.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#60606C] font-medium">
                    {activeMeta.subtitle}
                  </p>
                </div>

                <div className="text-xs text-[#8B8B8B] font-semibold sm:text-right">
                  <span>Core Affinity</span> <br />
                  <span className="text-[#070709] font-bold">{activeMeta.trait}</span>
                </div>
              </div>

              <p className="text-sm text-[#60606C] leading-relaxed">
                {activeMeta.description}
              </p>

              {/* Attribute Bars */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#8B8B8B]">
                  Attribute Weighting
                </div>
                {renderAttributeBar('Strength', activeStats.strength, 10, Shield, '#C85A3D')}
                {renderAttributeBar('Intellect', activeStats.intellect, 10, Brain, '#070709')}
                {renderAttributeBar('Discipline', activeStats.discipline, 10, Lightning, '#668F72')}
                {renderAttributeBar('Creativity', activeStats.creativity, 10, Palette, '#D9A441')}
              </div>
            </div>
          </div>

          {/* Archetype Quick Switcher Tabs (8 Archetypes) */}
          <div className="mt-10 pt-8 border-t border-[#E6E6E8]">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#8B8B8B] mb-4 text-center sm:text-left">
              Explore 8 Distinctive Archetypes
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {ARCHETYPE_IDS.map((variant) => {
                const meta = AVATAR_ARCHETYPES[variant];
                const isSelected = selectedVariant === variant;

                return (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] ${
                      isSelected
                        ? 'bg-white border-[#070709] shadow-md ring-1 ring-[#070709] scale-105'
                        : 'bg-white/70 hover:bg-white border-[#E6E6E8] hover:border-[#D0D1D4]'
                    }`}
                    aria-label={`Select ${meta.name}`}
                  >
                    <Avatar
                      variant={variant}
                      size={44}
                      system="blob"
                      frame={isSelected ? 'gold' : 'default'}
                      showFrame={isSelected}
                    />
                    <div className="w-full">
                      <div className="font-bold text-xs text-[#070709] truncate">
                        {meta.name.replace('The ', '')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

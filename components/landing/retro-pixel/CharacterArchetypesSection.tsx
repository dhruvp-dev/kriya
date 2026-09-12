'use client';

import React, { useState } from 'react';
import { Avatar } from '../../avatars';
import { AvatarVariant, AVATAR_ARCHETYPES } from '../../avatars/avatarTypes';
import { Sparkle, UserFocus } from '@phosphor-icons/react';

interface ArchetypeStats {
  strength: number;
  intellect: number;
  discipline: number;
  creativity: number;
}

const ARCHETYPE_STATS: Record<AvatarVariant, ArchetypeStats> = {
  architect: { strength: 7, intellect: 9, discipline: 8, creativity: 6 },
  scholar: { strength: 4, intellect: 10, discipline: 9, creativity: 7 },
  maker: { strength: 8, intellect: 7, discipline: 7, creativity: 9 },
  runner: { strength: 10, intellect: 6, discipline: 9, creativity: 5 },
  creator: { strength: 5, intellect: 7, discipline: 6, creativity: 10 },
  builder: { strength: 9, intellect: 6, discipline: 10, creativity: 6 },
  explorer: { strength: 8, intellect: 8, discipline: 7, creativity: 8 },
  strategist: { strength: 6, intellect: 10, discipline: 8, creativity: 7 },
};

export function CharacterArchetypesSection() {
  const [selectedVariant, setSelectedVariant] = useState<AvatarVariant>('architect');
  const activeMeta = AVATAR_ARCHETYPES[selectedVariant];
  const activeStats = ARCHETYPE_STATS[selectedVariant];

  const variants: AvatarVariant[] = [
    'architect',
    'scholar',
    'maker',
    'runner',
    'creator',
    'builder',
    'explorer',
    'strategist',
  ];

  const renderStatBar = (label: string, value: number, colorClass: string) => {
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-technical">
          <span className="font-semibold text-[#192420]">{label}</span>
          <span className="font-bold text-[#667770]">{value} / 10</span>
        </div>
        <div className="h-2.5 w-full bg-[#EFEBE1] rounded-sm overflow-hidden flex gap-0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 rounded-xs transition-all duration-300 ${
                i < value ? colorClass : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="archetypes" className="py-20 bg-[#FAF8F5] border-t border-[#E8E1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#1B4332]">
            CHARACTER SYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#192420] tracking-tight leading-tight">
            BUILD THE PERSON <br />
            YOU ARE BECOMING.
          </h2>
          <p className="text-base sm:text-lg text-[#667770]">
            Your character is an honest mirror of your daily actions, not an arbitrary gaming avatar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Archetypes Grid Selector */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {variants.map((variant) => {
              const meta = AVATAR_ARCHETYPES[variant];
              const isSelected = selectedVariant === variant;

              return (
                <button
                  key={variant}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3.5 text-left rounded-xl border transition-all flex flex-col items-center gap-2.5 ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#1B4332] shadow-md ring-2 ring-[#1B4332]/30 scale-[1.02]'
                      : 'bg-[#FFFFFF]/70 hover:bg-[#FFFFFF] border-[#E8E1D3] hover:border-[#D8CEBC]'
                  }`}
                >
                  <Avatar variant={variant} size={54} showFrame={true} frame={isSelected ? 'gold' : 'default'} />
                  <div className="text-center w-full">
                    <div className="font-bold text-xs text-[#192420] truncate">
                      {meta.name.replace('The ', '')}
                    </div>
                    <div className="text-[10px] text-[#667770] font-technical truncate mt-0.5">
                      {meta.trait}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Featured Large Character Card with Stats */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E8E1D3] rounded-2xl p-7 shadow-sm space-y-6">
            <div className="flex items-center gap-5">
              <Avatar variant={selectedVariant} size={88} showFrame={true} frame="gold" />
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-technical uppercase font-bold text-[#1B4332] px-2.5 py-0.5 bg-[#E8F1EC] rounded mb-1">
                  <Sparkle weight="bold" className="w-3.5 h-3.5" />
                  <span>{activeMeta.trait}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#192420] leading-tight">
                  {activeMeta.name}
                </h3>
                <p className="text-xs text-[#667770] font-medium">
                  {activeMeta.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#667770] leading-relaxed border-t border-b border-[#E8E1D3]/70 py-4">
              {activeMeta.description}
            </p>

            {/* Stat Bars */}
            <div className="space-y-3 pt-1">
              {renderStatBar('Strength', activeStats.strength, 'bg-[#C85A3D]')}
              {renderStatBar('Intellect', activeStats.intellect, 'bg-[#2A7A78]')}
              {renderStatBar('Discipline', activeStats.discipline, 'bg-[#1B4332]')}
              {renderStatBar('Creativity', activeStats.creativity, 'bg-[#D97706]')}
            </div>

            {/* Archetype Real-Life Focus */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#667770] border-t border-[#E8E1D3]/70">
              <span>Archetype Focus:</span>
              <span className="font-technical font-bold text-[#192420] uppercase">
                {activeMeta.trait}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

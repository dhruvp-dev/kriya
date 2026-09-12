'use client';

import React, { useState } from 'react';
import { Avatar } from '../avatars';
import { AvatarVariant, AVATAR_ARCHETYPES } from '../avatars/avatarTypes';
import { Sparkles, Shield, Brain, Zap, Palette, Layers } from 'lucide-react';

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
  const [avatarSystem, setAvatarSystem] = useState<'blob' | 'pixel'>('blob');
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

  const renderStatBar = (label: string, value: number, icon: any, colorHex: string) => {
    const Icon = icon;
    return (
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="font-semibold text-[#070709] flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" style={{ color: colorHex }} />
            {label}
          </span>
          <span className="tabular-nums font-semibold text-[#60606C]">{value} / 10</span>
        </div>
        <div className="h-1.5 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${value * 10}%`, backgroundColor: colorHex }}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="archetypes" className="py-20 bg-[#F7F7F8] border-t border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C85A3D]">
              Character System
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-tight">
              Eight Distinctive Archetypes
            </h2>
            <p className="text-base text-[#60606C]">
              Your archetype reflects your real daily habits and work style. Handcrafted vector blobs with subtle RPG attribute weighting.
            </p>
          </div>

          {/* System Toggle (Blob vs Pixel) */}
          <div className="flex items-center p-1 bg-white border border-[#E6E6E8] rounded-xl shadow-2xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setAvatarSystem('blob')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                avatarSystem === 'blob'
                  ? 'bg-[#070709] text-white shadow-xs'
                  : 'text-[#60606C] hover:text-[#070709]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Blob (Primary)</span>
            </button>
            <button
              type="button"
              onClick={() => setAvatarSystem('pixel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                avatarSystem === 'pixel'
                  ? 'bg-[#070709] text-white shadow-xs'
                  : 'text-[#60606C] hover:text-[#070709]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Pixel (Classic)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Archetypes Grid Selector */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {variants.map((variant) => {
              const meta = AVATAR_ARCHETYPES[variant];
              const isSelected = selectedVariant === variant;

              return (
                <button
                  key={variant}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-4 text-center rounded-2xl border transition-all flex flex-col items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#070709] shadow-sm ring-1 ring-[#070709]'
                      : 'bg-white/80 hover:bg-white border-[#E6E6E8] hover:border-[#D0D1D4]'
                  }`}
                >
                  <Avatar
                    variant={variant}
                    size={52}
                    frame={isSelected ? 'gold' : 'default'}
                    system={avatarSystem}
                  />
                  <div className="w-full">
                    <div className="font-bold text-xs text-[#070709] truncate">
                      {meta.name.replace('The ', '')}
                    </div>
                    <div className="text-[10px] text-[#60606C] font-medium truncate mt-0.5">
                      {meta.trait}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Featured Character Card with Stats */}
          <div className="lg:col-span-5 bg-white border border-[#E6E6E8] rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center gap-5">
              <Avatar
                variant={selectedVariant}
                size={84}
                frame="gold"
                system={avatarSystem}
              />
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#C85A3D] px-2 py-0.5 bg-[#FDF4F2] rounded-md mb-1 border border-[#C85A3D]/20">
                  <Sparkles className="w-3 h-3" />
                  <span>{activeMeta.trait}</span>
                </div>
                <h3 className="text-xl font-bold text-[#070709] truncate">
                  {activeMeta.name}
                </h3>
                <p className="text-xs text-[#60606C] font-medium">
                  {activeMeta.subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#60606C] leading-relaxed border-t border-b border-[#E6E6E8] py-3.5">
              {activeMeta.description}
            </p>

            {/* Stat Bars */}
            <div className="space-y-3.5">
              {renderStatBar('Strength', activeStats.strength, Shield, '#C85A3D')}
              {renderStatBar('Intellect', activeStats.intellect, Brain, '#344653')}
              {renderStatBar('Discipline', activeStats.discipline, Zap, '#668F72')}
              {renderStatBar('Creativity', activeStats.creativity, Palette, '#D9A441')}
            </div>

            {/* Archetype Real-Life Focus */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#60606C] border-t border-[#E6E6E8]">
              <span>Primary Affinity:</span>
              <span className="font-bold text-[#070709]">
                {activeMeta.trait}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

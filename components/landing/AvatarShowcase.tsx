'use client';

import React, { useState } from 'react';
import { AVATAR_ARCHETYPES, AvatarVariant } from '../avatars/avatarTypes';
import { Avatar } from '../avatars';
import { Sparkles, Shield, Compass, BookOpen, Hammer, Zap, Feather, Wrench } from 'lucide-react';

const ARCHETYPE_ICONS: Record<AvatarVariant, React.ElementType> = {
  architect: Wrench,
  scholar: BookOpen,
  maker: Hammer,
  runner: Zap,
  creator: Feather,
  builder: Shield,
  explorer: Compass,
  strategist: Sparkles,
};

export function AvatarShowcase() {
  const [selectedVariant, setSelectedVariant] = useState<AvatarVariant>('architect');
  const activeMeta = AVATAR_ARCHETYPES[selectedVariant];
  const IconComponent = ARCHETYPE_ICONS[selectedVariant] || Sparkles;

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

  return (
    <section id="character" className="py-20 bg-[#051F20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="text-xs font-technical uppercase tracking-widest text-[#34D399] font-bold">
            ORIGINAL PIXEL ARCHETYPES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E2F1ED] tracking-tight">
            PICK YOUR ARCHETYPE.
          </h2>
          <p className="text-base sm:text-lg text-[#80A79D]">
            Eight custom SVG pixel avatars engineered for distinct focus styles. Choose the archetype that reflects how you build momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: Archetype Selection Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {variants.map((variant) => {
              const meta = AVATAR_ARCHETYPES[variant];
              const isSelected = selectedVariant === variant;

              return (
                <button
                  key={variant}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3 text-left border transition-all chamfer-panel flex flex-col items-center gap-2.5 ${
                    isSelected
                      ? 'bg-[#0F3132] border-[#34D399] shadow-md ring-1 ring-[#34D399]'
                      : 'bg-[#0F3132]/60 hover:bg-[#0F3132] border-[#1D5254] opacity-80 hover:opacity-100'
                  }`}
                >
                  <Avatar variant={variant} size={48} showFrame={true} frame={isSelected ? 'coral' : 'default'} />
                  <div className="text-center w-full">
                    <div className="font-bold text-xs text-[#E2F1ED] truncate">{meta.name.replace('The ', '')}</div>
                    <div className="text-[10px] text-[#80A79D] font-technical truncate">{meta.trait}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Featured Active Archetype Detail Card */}
          <div className="lg:col-span-5 bg-[#0F3132] border border-[#1D5254] p-8 chamfer-panel shadow-lg space-y-6">
            <div className="flex items-center gap-5">
              <Avatar variant={selectedVariant} size={80} showFrame={true} frame="gold" />
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-technical uppercase font-bold text-[#34D399] px-2.5 py-0.5 bg-[#083B37] border border-[#34D399]/30 rounded-2xs mb-1">
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{activeMeta.trait}</span>
                </div>
                <h3 className="text-2xl font-black text-[#E2F1ED] leading-tight">{activeMeta.name}</h3>
                <p className="text-xs text-[#80A79D] font-semibold">{activeMeta.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-[#80A79D] leading-relaxed border-t border-b border-[#1D5254] py-4">
              {activeMeta.description}
            </p>

            {/* Archetype Trait Focus Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs font-technical">
              <div className="bg-[#051F20] p-3 border border-[#1D5254] rounded-xs">
                <div className="text-[10px] text-[#80A79D] uppercase font-semibold">PRIMARY FOCUS</div>
                <div className="font-bold text-[#E2F1ED] mt-0.5">{activeMeta.trait}</div>
              </div>
              <div className="bg-[#051F20] p-3 border border-[#1D5254] rounded-xs">
                <div className="text-[10px] text-[#80A79D] uppercase font-semibold">ARCHETYPE ID</div>
                <div className="font-bold text-[#34D399] mt-0.5 uppercase">KRIYA.{activeMeta.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { Avatar } from './Avatar';
import {
  AVATAR_ARCHETYPES,
  AvatarFrameVariant,
  AvatarVariant,
} from './avatarTypes';

const SIZES = [32, 48, 64, 96, 128, 256];
const FRAMES: { id: AvatarFrameVariant; label: string; price: string }[] = [
  { id: 'default', label: 'Default', price: 'Free' },
  { id: 'coral', label: 'Coral Notch', price: '150 Gold' },
  { id: 'navy', label: 'Navy Tech', price: '200 Gold' },
  { id: 'seasonal', label: 'Seasonal Star', price: '250 Gold' },
  { id: 'gold', label: 'Gold Tier', price: '300 Gold' },
  { id: 'achievement', label: 'Achievement', price: '400 Gold' },
];

export function AvatarGallery() {
  const [selectedVariant, setSelectedVariant] = useState<AvatarVariant>('architect');
  const [selectedFrame, setSelectedFrame] = useState<AvatarFrameVariant>('gold');
  const [previewSize, setPreviewSize] = useState<number>(128);

  const currentArchetype = AVATAR_ARCHETYPES[selectedVariant];

  return (
    <div className="w-full space-y-8 bg-[#F3F1E8] p-6 sm:p-8 rounded-2xl border border-[#DFDDD2] text-[#20231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFDDD2] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#20231F] text-white text-[10px] font-extrabold uppercase tracking-wider">
              KRIYA AVATAR SYSTEM
            </span>
            <span className="text-xs text-[#70736B] font-technical font-semibold">
              64×64 INLINE SVG PIXEL ART
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1 text-[#20231F]">
            Character Archetype Gallery
          </h2>
        </div>
      </div>

      {/* Grid of 8 Archetypes */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-[#70736B] uppercase tracking-wider">
          Select Personality Archetype (8 Original Characters)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {(Object.keys(AVATAR_ARCHETYPES) as AvatarVariant[]).map((variant) => {
            const meta = AVATAR_ARCHETYPES[variant];
            const isSelected = selectedVariant === variant;
            return (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all text-center ${
                  isSelected
                    ? 'bg-[#FFFDF7] border-[#20231F] shadow-md scale-105 ring-2 ring-[#D9A441]/50'
                    : 'bg-[#F3F1E8] border-[#DFDDD2] hover:bg-[#FFFDF7] hover:border-[#C5C3B8]'
                }`}
              >
                <Avatar variant={variant} size={48} frame={selectedFrame} />
                <span className="mt-2 text-xs font-extrabold text-[#20231F]">
                  {meta.name.replace('The ', '')}
                </span>
                <span className="text-[10px] text-[#70736B] font-medium truncate w-full">
                  {meta.trait}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Area: Large Preview & Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#FFFDF7] p-6 rounded-2xl border border-[#DFDDD2] shadow-2xs">
        {/* Left Col: Hero Showcase */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#F3F1E8] rounded-xl border border-[#DFDDD2] space-y-4">
          <div className="relative">
            <Avatar variant={selectedVariant} size={previewSize} frame={selectedFrame} />
          </div>

          <div className="text-center space-y-1">
            <h4 className="text-xl font-extrabold text-[#20231F]">{currentArchetype.name}</h4>
            <p className="text-xs font-semibold text-[#C85A3D]">{currentArchetype.subtitle}</p>
            <p className="text-xs text-[#70736B] max-w-xs mt-2">{currentArchetype.description}</p>
          </div>
        </div>

        {/* Right Col: Controls (Frame Selector & Size Scaler) */}
        <div className="md:col-span-7 space-y-6 flex flex-col justify-center">
          {/* Frame Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-[#70736B] uppercase tracking-wider block">
              Cosmetic Frame Overlay
            </label>
            <div className="flex flex-wrap gap-2">
              {FRAMES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFrame(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all border flex items-center gap-1.5 ${
                    selectedFrame === f.id
                      ? 'bg-[#20231F] text-white border-[#20231F]'
                      : 'bg-[#F3F1E8] text-[#20231F] border-[#DFDDD2] hover:bg-[#DFDDD2]'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-technical font-bold ${
                    selectedFrame === f.id ? 'bg-white/20 text-white' : 'bg-[#DFDDD2] text-[#70736B]'
                  }`}>
                    {f.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Scaler */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-[#70736B] uppercase tracking-wider block">
              Crisp Scaling Test ({previewSize}px × {previewSize}px)
            </label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setPreviewSize(s)}
                  className={`px-3 py-1 text-xs font-technical font-extrabold rounded-lg border transition-all ${
                    previewSize === s
                      ? 'bg-[#C85A3D] text-white border-[#C85A3D]'
                      : 'bg-[#F3F1E8] text-[#70736B] border-[#DFDDD2] hover:bg-[#DFDDD2]'
                  }`}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Size Render Strip */}
          <div className="space-y-2 pt-2 border-t border-[#DFDDD2]">
            <label className="text-xs font-extrabold text-[#70736B] uppercase tracking-wider block">
              Fidelity Check Across Standard Sizes
            </label>
            <div className="flex items-end gap-4 p-3 bg-[#F3F1E8] rounded-xl border border-[#DFDDD2] overflow-x-auto">
              {[32, 48, 64, 96].map((sz) => (
                <div key={sz} className="flex flex-col items-center gap-1 shrink-0">
                  <Avatar variant={selectedVariant} size={sz} frame={selectedFrame} />
                  <span className="text-[10px] font-technical font-bold text-[#70736B]">
                    {sz}px
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

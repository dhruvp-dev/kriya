'use client';

import React, { useState } from 'react';
import { Avatar } from './Avatar';
import {
  AVATAR_ARCHETYPES,
  AvatarFrameVariant,
  AvatarVariant,
} from './avatarTypes';
import { Sparkles, Layers } from 'lucide-react';

const SIZES = [32, 48, 64, 96, 128];
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
  const [previewSize, setPreviewSize] = useState<number>(112);
  const [avatarSystem, setAvatarSystem] = useState<'blob' | 'pixel'>('blob');

  const currentArchetype = AVATAR_ARCHETYPES[selectedVariant];

  return (
    <div className="w-full space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E6E6E8] text-[#070709] shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E8] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#070709] text-white text-[10px] font-bold uppercase tracking-wider">
              Avatar System
            </span>
            <span className="text-xs text-[#60606C] font-medium">
              {avatarSystem === 'blob' ? 'Distinctive Vector Blob Avatars' : '64x64 Classic Inline Pixel Art'}
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight mt-1.5 text-[#070709]">
            Character Archetypes
          </h2>
        </div>

        {/* System Switcher (Blob / Pixel) */}
        <div className="flex items-center p-1 bg-[#F7F7F8] border border-[#E6E6E8] rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setAvatarSystem('blob')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              avatarSystem === 'blob'
                ? 'bg-white text-[#070709] shadow-xs border border-[#E6E6E8]'
                : 'text-[#60606C] hover:text-[#070709]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C85A3D]" />
            <span>Blob Avatars</span>
          </button>
          <button
            type="button"
            onClick={() => setAvatarSystem('pixel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              avatarSystem === 'pixel'
                ? 'bg-white text-[#070709] shadow-xs border border-[#E6E6E8]'
                : 'text-[#60606C] hover:text-[#070709]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#60606C]" />
            <span>Pixel (Classic)</span>
          </button>
        </div>
      </div>

      {/* Grid of 8 Archetypes */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#60606C] uppercase tracking-wider">
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
                className={`flex flex-col items-center p-3 rounded-xl border transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#F7F7F8] border-[#070709] shadow-xs ring-1 ring-[#070709]'
                    : 'bg-white border-[#E6E6E8] hover:bg-[#F7F7F8] hover:border-[#D0D1D4]'
                }`}
              >
                <Avatar
                  variant={variant}
                  size={44}
                  frame={selectedFrame}
                  system={avatarSystem}
                />
                <span className="mt-2.5 text-xs font-bold text-[#070709]">
                  {meta.name.replace('The ', '')}
                </span>
                <span className="text-[10px] text-[#60606C] font-medium truncate w-full mt-0.5">
                  {meta.trait}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Area: Large Preview & Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F7F7F8] p-6 rounded-2xl border border-[#E6E6E8]">
        {/* Left Col: Hero Showcase */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-[#E6E6E8] space-y-4">
          <div className="relative">
            <Avatar
              variant={selectedVariant}
              size={previewSize}
              frame={selectedFrame}
              system={avatarSystem}
            />
          </div>

          <div className="text-center space-y-1">
            <h4 className="text-lg font-bold text-[#070709]">{currentArchetype.name}</h4>
            <p className="text-xs font-semibold text-[#C85A3D]">{currentArchetype.subtitle}</p>
            <p className="text-xs text-[#60606C] max-w-xs mt-2 leading-relaxed">
              {currentArchetype.description}
            </p>
          </div>
        </div>

        {/* Right Col: Controls (Frame Selector & Size Scaler) */}
        <div className="md:col-span-7 space-y-5 flex flex-col justify-center">
          {/* Frame Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#60606C] uppercase tracking-wider block">
              Cosmetic Frame Overlay
            </label>
            <div className="flex flex-wrap gap-2">
              {FRAMES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFrame(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
                    selectedFrame === f.id
                      ? 'bg-[#070709] text-white border-[#070709]'
                      : 'bg-white text-[#070709] border-[#E6E6E8] hover:bg-[#F3F4F5]'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md tabular-nums font-semibold ${
                    selectedFrame === f.id ? 'bg-white/20 text-white' : 'bg-[#F7F7F8] text-[#60606C]'
                  }`}>
                    {f.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Scaler */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#60606C] uppercase tracking-wider block">
              Scale Preview ({previewSize}px)
            </label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setPreviewSize(s)}
                  className={`px-3 py-1 text-xs tabular-nums font-semibold rounded-lg border transition-all cursor-pointer ${
                    previewSize === s
                      ? 'bg-[#C85A3D] text-white border-[#C85A3D]'
                      : 'bg-white text-[#60606C] border-[#E6E6E8] hover:bg-[#F3F4F5]'
                  }`}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Size Render Strip */}
          <div className="space-y-2 pt-2 border-t border-[#E6E6E8]">
            <label className="text-xs font-bold text-[#60606C] uppercase tracking-wider block">
              Responsive Scale Test
            </label>
            <div className="flex items-end gap-5 p-3.5 bg-white rounded-xl border border-[#E6E6E8] overflow-x-auto">
              {[32, 48, 64, 96].map((sz) => (
                <div key={sz} className="flex flex-col items-center gap-1.5 shrink-0">
                  <Avatar
                    variant={selectedVariant}
                    size={sz}
                    frame={selectedFrame}
                    system={avatarSystem}
                  />
                  <span className="text-[10px] tabular-nums font-semibold text-[#60606C]">
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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Award, Lock, ShoppingBag, Layers } from 'lucide-react';
import {
  AVATAR_ARCHETYPES,
  AvatarFrameVariant,
  AvatarVariant,
  Avatar,
} from '../../avatars';
import { AvatarConfig } from '../../../types/avatar.types';

export interface AvatarCustomizerProps {
  config?: AvatarConfig;
  variant?: AvatarVariant;
  frame?: AvatarFrameVariant;
  ownedFrames?: string[];
  onChange?: ((newConfig: AvatarConfig) => void) | ((newVariant: AvatarVariant, newFrame: AvatarFrameVariant) => void);
  ownedAccessories?: string[];
  showPreview?: boolean;
  hideFrames?: boolean;
}

const FRAMES: { id: AvatarFrameVariant; name: string; price: number; description: string }[] = [
  { id: 'default', name: 'Default Frame', price: 0, description: 'Clean minimalist border (Free)' },
  { id: 'coral', name: 'Coral Notch', price: 150, description: 'Energetic terracotta corner notches' },
  { id: 'navy', name: 'Navy Tech', price: 200, description: 'Deep slate technical border' },
  { id: 'seasonal', name: 'Seasonal Star', price: 250, description: 'Refined corner star accents' },
  { id: 'gold', name: 'Gold Tier', price: 300, description: 'Metallic gold border with studs' },
  { id: 'achievement', name: 'Achievement', price: 400, description: 'Emerald and gold prestige border' },
];

export function AvatarCustomizer({
  config,
  variant: propVariant,
  frame: propFrame,
  ownedFrames = ['default', 'gold'],
  onChange,
  showPreview = true,
  hideFrames = false,
}: AvatarCustomizerProps) {
  const [system, setSystem] = useState<'blob' | 'pixel'>('blob');

  const activeVariant: AvatarVariant =
    propVariant ||
    (config?.baseModel && (config.baseModel in AVATAR_ARCHETYPES ? (config.baseModel as AvatarVariant) : 'architect')) ||
    'architect';

  const activeFrame: AvatarFrameVariant = propFrame || 'gold';

  const currentArchetype = AVATAR_ARCHETYPES[activeVariant] || AVATAR_ARCHETYPES.architect;

  const handleVariantSelect = (v: AvatarVariant) => {
    if (onChange) {
      if (config) {
        (onChange as (c: AvatarConfig) => void)({ ...config, baseModel: v as any });
      } else {
        (onChange as (v: AvatarVariant, f: AvatarFrameVariant) => void)(v, activeFrame);
      }
    }
  };

  const handleFrameSelect = (f: AvatarFrameVariant) => {
    if (onChange) {
      if (config) {
        (onChange as (c: AvatarConfig) => void)({ ...config });
      } else {
        (onChange as (v: AvatarVariant, f: AvatarFrameVariant) => void)(activeVariant, f);
      }
    }
  };

  return (
    <div className="space-y-6 text-[#070709] font-sans">
      {/* Top Preview Card */}
      {showPreview && (
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#F7F7F8] rounded-2xl border border-[#E6E6E8]">
          <div className="relative shrink-0">
            <Avatar variant={activeVariant} size={96} frame={activeFrame} system={system} />
          </div>
          <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white border border-[#E6E6E8] rounded-full text-[#C85A3D] text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" /> {currentArchetype.name}
              </span>
              {/* Style selector */}
              <div className="inline-flex items-center p-0.5 bg-white border border-[#E6E6E8] rounded-lg">
                <button
                  type="button"
                  onClick={() => setSystem('blob')}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                    system === 'blob' ? 'bg-[#070709] text-white' : 'text-[#60606C]'
                  }`}
                >
                  Blob
                </button>
                <button
                  type="button"
                  onClick={() => setSystem('pixel')}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                    system === 'pixel' ? 'bg-[#070709] text-white' : 'text-[#60606C]'
                  }`}
                >
                  Pixel
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#070709]">
              {currentArchetype.subtitle}
            </h3>
            <p className="text-xs text-[#60606C] max-w-md font-medium leading-relaxed">
              {currentArchetype.description}
            </p>
          </div>
        </div>
      )}

      {/* 1. Base Archetype Selection (All 8 Original Characters) */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-[#60606C] uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#C85A3D]" /> Choose Personality Archetype
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.keys(AVATAR_ARCHETYPES) as AvatarVariant[]).map((v) => {
            const meta = AVATAR_ARCHETYPES[v];
            const isSelected = activeVariant === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => handleVariantSelect(v)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col items-center justify-between text-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#F7F7F8] border-[#070709] shadow-xs ring-1 ring-[#070709]'
                    : 'bg-white border-[#E6E6E8] hover:bg-[#F7F7F8] hover:border-[#D0D1D4]'
                }`}
              >
                <Avatar variant={v} size={44} frame={activeFrame} system={system} />
                <span className="font-bold text-xs text-[#070709] mt-2">
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

      {/* 2. Cosmetic Frame Selection */}
      {!hideFrames && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#60606C] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#D9A441]" /> Cosmetic Frame Overlay
            </label>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#070709] hover:text-[#C85A3D] transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cosmetics Shop</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FRAMES.map((f) => {
              const isSelected = activeFrame === f.id;
              const isUnlocked = f.id === 'default' || ownedFrames.includes(f.id);

              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleFrameSelect(f.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                    isSelected
                      ? 'bg-[#070709] text-white border-[#070709]'
                      : isUnlocked
                      ? 'bg-white text-[#070709] border-[#E6E6E8] hover:bg-[#F7F7F8]'
                      : 'bg-[#F7F7F8] text-[#8B8B8B] border-[#E6E6E8] opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs">{f.name}</div>
                    {!isUnlocked && (
                      <span className="px-1.5 py-0.5 bg-[#C85A3D] text-white text-[9px] font-bold rounded uppercase flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> Locked
                      </span>
                    )}
                  </div>
                  <div className={`text-[10px] mt-1 ${isSelected ? 'text-[#D0D1D4]' : 'text-[#60606C]'}`}>
                    {isUnlocked ? f.description : `Unlock in Shop for ${f.price} Gold`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

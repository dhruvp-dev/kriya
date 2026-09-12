'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Award, Lock, ShoppingBag } from 'lucide-react';
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
}

const FRAMES: { id: AvatarFrameVariant; name: string; price: number; description: string }[] = [
  { id: 'default', name: 'Default Frame', price: 0, description: 'Clean minimalist pixel border (Free)' },
  { id: 'coral', name: 'Coral Notch', price: 150, description: 'Energetic KRIYA coral corner notches' },
  { id: 'navy', name: 'Navy Tech', price: 200, description: 'Deep navy technical frame' },
  { id: 'seasonal', name: 'Retro Seasonal', price: 250, description: 'Cozy pixel stars corner frame' },
  { id: 'gold', name: 'Gold Tier', price: 300, description: 'Metallic gold border with studs' },
  { id: 'achievement', name: 'Legendary Achievement', price: 400, description: 'Emerald & gold achievement border' },
];

export function AvatarCustomizer({
  config,
  variant: propVariant,
  frame: propFrame,
  ownedFrames = ['default', 'gold'], // Default owned frames for demo
  onChange,
  showPreview = true,
}: AvatarCustomizerProps) {
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
    <div className="space-y-6 text-[#20231F]">
      {/* Top Preview Card */}
      {showPreview && (
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#FFFDF7] rounded-2xl border border-[#DFDDD2] shadow-2xs">
          <Avatar variant={activeVariant} size={112} frame={activeFrame} />
          <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#F3F1E8] border border-[#DFDDD2] rounded-full text-[#C85A3D] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> {currentArchetype.name}
            </div>
            <h3 className="text-xl font-extrabold text-[#20231F]">
              {currentArchetype.subtitle}
            </h3>
            <p className="text-xs text-[#70736B] max-w-sm font-medium">
              {currentArchetype.description}
            </p>
          </div>
        </div>
      )}

      {/* 1. Base Archetype Selection (All 8 Original Characters) */}
      <div className="space-y-3">
        <label className="block text-xs font-extrabold text-[#70736B] uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#C85A3D]" /> 1. Choose Personality Archetype (8 Characters)
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
                className={`p-3 rounded-xl border text-left transition-all flex flex-col items-center justify-between text-center ${
                  isSelected
                    ? 'bg-[#FFFDF7] border-[#20231F] shadow-md ring-2 ring-[#D9A441]/50 scale-102'
                    : 'bg-[#F3F1E8] border-[#DFDDD2] hover:bg-[#FFFDF7] hover:border-[#C5C3B8]'
                }`}
              >
                <Avatar variant={v} size={48} frame={activeFrame} />
                <span className="font-extrabold text-xs text-[#20231F] mt-2">
                  {meta.name.replace('The ', '')}
                </span>
                <span className="text-[10px] text-[#70736B] font-medium truncate w-full mt-0.5">
                  {meta.trait}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Cosmetic Frame Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-[#70736B] uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#D9A441]" /> 2. Cosmetic Frame Overlay (Store Unlocks)
          </label>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#C85A3D] hover:underline"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Visit Shop</span>
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
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-[#20231F] text-white border-[#20231F]'
                    : isUnlocked
                    ? 'bg-[#FFFDF7] text-[#20231F] border-[#DFDDD2] hover:bg-[#F3F1E8]'
                    : 'bg-[#F3F1E8] text-[#70736B] border-[#DFDDD2]/70 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-xs">{f.name}</div>
                  {!isUnlocked && (
                    <span className="px-1.5 py-0.5 bg-[#C85A3D] text-white text-[9px] font-extrabold rounded uppercase flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </span>
                  )}
                </div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#DFDDD2]' : 'text-[#70736B]'}`}>
                  {isUnlocked ? f.description : `Unlock in Shop for ${f.price} Gold`}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

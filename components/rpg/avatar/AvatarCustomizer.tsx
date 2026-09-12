'use client';

import React from 'react';
import { Palette, Shield, Sparkles } from 'lucide-react';
import {
  AvatarConfig,
  BASE_MODELS,
  ACCESSORY_OPTIONS,
  BaseModelId,
} from '../../../types/avatar.types';
import { Avatar } from './Avatar';

export interface AvatarCustomizerProps {
  config: AvatarConfig;
  onChange: (newConfig: AvatarConfig) => void;
  ownedAccessories?: string[]; // Array of option_keys owned by user
  showPreview?: boolean;
}

const PRESET_TINTS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#ef4444', // Red
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#64748b', // Slate
];

export function AvatarCustomizer({
  config,
  onChange,
  ownedAccessories = [],
  showPreview = true,
}: AvatarCustomizerProps) {
  const handleModelChange = (modelId: BaseModelId) => {
    const selectedModel = BASE_MODELS.find((m) => m.id === modelId);
    onChange({
      ...config,
      baseModel: modelId,
      tint: config.tint || selectedModel?.defaultTint || '#6366f1',
    });
  };

  const handleTintChange = (tintHex: string) => {
    onChange({ ...config, tint: tintHex });
  };

  const handleAccessoryChange = (
    slot: 'hat' | 'weapon' | 'back',
    value: string
  ) => {
    onChange({ ...config, [slot]: value as any });
  };

  const isAccessoryUnlocked = (optionKey: string) => {
    if (optionKey === 'none') return true;
    return ownedAccessories.includes(optionKey);
  };

  return (
    <div className="space-y-6">
      {/* Top Preview Section */}
      {showPreview && (
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-950/80 rounded-3xl border border-slate-800">
          <Avatar config={config} size="xl" className="border-2 border-indigo-500/40 shadow-2xl" />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Pixel Avatar Preview
            </div>
            <h3 className="text-lg font-black text-slate-100 capitalize">
              {config.baseModel} Character
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Retro 2D pixel art avatar with customizable color tint & swappable gear slots.
            </p>
          </div>
        </div>
      )}

      {/* 1. Base Model Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          1. Choose Base Archetype
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {BASE_MODELS.map((model) => {
            const isSelected = config.baseModel === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => handleModelChange(model.id)}
                className={`p-3 rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-sm">{model.name}</span>
                  <div
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: model.defaultTint }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight">
                  {model.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Color / Tint Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-indigo-400" /> 2. Primary Color Tint
        </label>
        <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
          {PRESET_TINTS.map((tintHex) => (
            <button
              key={tintHex}
              type="button"
              onClick={() => handleTintChange(tintHex)}
              aria-label={`Select color ${tintHex}`}
              className={`w-8 h-8 rounded-xl border transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                config.tint === tintHex
                  ? 'scale-110 border-white ring-2 ring-indigo-500 shadow-md'
                  : 'border-slate-700 hover:scale-105'
              }`}
              style={{ backgroundColor: tintHex }}
            />
          ))}

          <div className="h-6 w-px bg-slate-800 mx-1" />

          {/* Custom Color Input */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              id="avatar-custom-color"
              value={config.tint || '#6366f1'}
              onChange={(e) => handleTintChange(e.target.value)}
              className="w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-slate-700"
            />
            <label htmlFor="avatar-custom-color" className="text-xs text-slate-400 font-semibold cursor-pointer">
              Custom Hex
            </label>
          </div>
        </div>
      </div>

      {/* 3. Accessory Slot Pickers */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-indigo-400" /> 3. Gear & Accessories
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hat Slot */}
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-200">Headgear</label>
            <select
              value={config.hat}
              onChange={(e) => handleAccessoryChange('hat', e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              {ACCESSORY_OPTIONS.hat.map((opt) => {
                const unlocked = isAccessoryUnlocked(opt.key);
                return (
                  <option key={opt.key} value={opt.key} disabled={!unlocked}>
                    {opt.name} {!unlocked ? '(Locked — Purchase in Shop)' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Weapon Slot */}
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-200">Weapon / Tool</label>
            <select
              value={config.weapon}
              onChange={(e) => handleAccessoryChange('weapon', e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              {ACCESSORY_OPTIONS.weapon.map((opt) => {
                const unlocked = isAccessoryUnlocked(opt.key);
                return (
                  <option key={opt.key} value={opt.key} disabled={!unlocked}>
                    {opt.name} {!unlocked ? '(Locked — Purchase in Shop)' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Back Slot */}
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-200">Backpiece</label>
            <select
              value={config.back}
              onChange={(e) => handleAccessoryChange('back', e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              {ACCESSORY_OPTIONS.back.map((opt) => {
                const unlocked = isAccessoryUnlocked(opt.key);
                return (
                  <option key={opt.key} value={opt.key} disabled={!unlocked}>
                    {opt.name} {!unlocked ? '(Locked — Purchase in Shop)' : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

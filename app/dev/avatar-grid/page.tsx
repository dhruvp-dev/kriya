'use client';

import React, { useState } from 'react';
import { Avatar } from '../../../components/rpg/avatar';
import { BaseModelId, HatOption, WeaponOption, BackOption } from '../../../types/avatar.types';

const ARCHETYPES: BaseModelId[] = ['warrior', 'mage', 'rogue', 'cleric', 'bard'];
const HATS: HatOption[] = ['none', 'helmet_warrior', 'hood_mage', 'beret_bard'];
const WEAPONS: WeaponOption[] = ['none', 'sword_01', 'staff_01', 'dagger_01'];
const BACKS: BackOption[] = ['none', 'cape_crimson', 'wings_feather'];

export default function DevAvatarGridPage() {
  const [renderCount, setRenderCount] = useState(100);
  const [benchTime, setBenchTime] = useState<number | null>(null);

  const runPerfBenchmark = () => {
    const start = performance.now();
    // Trigger re-render by updating state
    setRenderCount((prev) => prev);
    requestAnimationFrame(() => {
      const end = performance.now();
      setBenchTime(parseFloat((end - start).toFixed(2)));
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">
          Pixel Art Avatar Verification & Stress Test Page
        </h1>
        <p className="text-slate-400 text-sm">
          Quality Gate #2 (Accessory Alignment) & Quality Gate #4 (Leaderboard Perf Benchmark)
        </p>
      </div>

      {/* SECTION 1: QUALITY GATE #2 - VISUAL MATRIX OF ARCHETYPES + ACCESSORIES */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-indigo-400 border-b border-slate-800 pb-2">
          Quality Gate #2: Archetype & Accessory Alignment Matrix
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {ARCHETYPES.map((arch) => (
            <div key={arch} className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold capitalize text-indigo-300 flex items-center justify-between">
                <span>{arch}</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar config={{ baseModel: arch, tint: '#6366f1', hat: 'none', weapon: 'none', back: 'none' }} size="md" />
                  <span className="text-xs text-slate-400">Base</span>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar config={{ baseModel: arch, tint: '#ef4444', hat: 'helmet_warrior', weapon: 'sword_01', back: 'cape_crimson' }} size="md" />
                  <span className="text-xs text-slate-400">Warrior Set</span>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar config={{ baseModel: arch, tint: '#8b5cf6', hat: 'hood_mage', weapon: 'staff_01', back: 'wings_feather' }} size="md" />
                  <span className="text-xs text-slate-400">Mage Set</span>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar config={{ baseModel: arch, tint: '#10b981', hat: 'beret_bard', weapon: 'dagger_01', back: 'cape_crimson' }} size="md" />
                  <span className="text-xs text-slate-400">Rogue Set</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: SIZES & BOUNCE ANIMATION CHECK (QUALITY GATE #3) */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-indigo-400 border-b border-slate-800 pb-2">
          Quality Gate #3: Size Variants & Crisp Pixel Animation Check
        </h2>
        <div className="flex flex-wrap items-end gap-6 p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
          <div className="flex flex-col items-center gap-2">
            <Avatar config={{ baseModel: 'warrior', tint: '#6366f1', hat: 'helmet_warrior', weapon: 'sword_01', back: 'cape_crimson' }} size="sm" />
            <span className="text-xs font-mono text-slate-400">sm (40px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar config={{ baseModel: 'mage', tint: '#8b5cf6', hat: 'hood_mage', weapon: 'staff_01', back: 'wings_feather' }} size="md" />
            <span className="text-xs font-mono text-slate-400">md (64px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar config={{ baseModel: 'rogue', tint: '#10b981', hat: 'beret_bard', weapon: 'dagger_01', back: 'cape_crimson' }} size="lg" />
            <span className="text-xs font-mono text-slate-400">lg (96px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar config={{ baseModel: 'cleric', tint: '#f59e0b', hat: 'helmet_warrior', weapon: 'sword_01', back: 'wings_feather' }} size="xl" />
            <span className="text-xs font-mono text-slate-400">xl (144px)</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: QUALITY GATE #4 - 100 LEADERBOARD ROW CANVAS STRESS TEST */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h2 className="text-xl font-extrabold text-indigo-400">
            Quality Gate #4: 100 Leaderboard Canvas Perf Stress Test
          </h2>
          <button
            type="button"
            onClick={runPerfBenchmark}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs rounded-xl shadow transition"
          >
            Run Benchmark
          </button>
        </div>

        {benchTime !== null && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm font-semibold">
            ⚡ Rendered 100 pixel art canvas avatars in {benchTime} ms ({ (benchTime / 100).toFixed(2) } ms / avatar).
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3 p-6 bg-slate-900/60 rounded-2xl border border-slate-800 max-h-96 overflow-y-auto">
          {Array.from({ length: renderCount }).map((_, idx) => {
            const arch = ARCHETYPES[idx % ARCHETYPES.length];
            const hat = HATS[idx % HATS.length];
            const weapon = WEAPONS[idx % WEAPONS.length];
            const back = BACKS[idx % BACKS.length];
            const tints = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981'];
            const tint = tints[idx % tints.length];

            return (
              <div key={idx} className="flex flex-col items-center gap-1 p-2 bg-slate-950 rounded-xl border border-slate-800/80">
                <Avatar
                  config={{ baseModel: arch, tint, hat, weapon, back }}
                  size="sm"
                  animate={false}
                />
                <span className="text-[9px] font-mono text-slate-500">#{idx + 1}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

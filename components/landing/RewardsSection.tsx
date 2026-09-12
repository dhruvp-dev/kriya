import React from 'react';
import { Crown, Feather, Compass, HourglassHigh, Shield, Sparkle } from '@phosphor-icons/react/dist/ssr';

export function RewardsSection() {
  return (
    <section id="rewards" className="py-24 md:py-36 bg-[#F7F7F8] border-t border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
            EARN THINGS <br />
            THAT FEEL LIKE YOURS.
          </h2>
          <p className="text-base sm:text-lg text-[#60606C] leading-relaxed max-w-xl">
            A personal collection earned through discipline, not an ecommerce storefront. Collect frames, titles, and keepsakes with in-game Gold.
          </p>
        </div>

        {/* Curated Collection Showcase (Varied Visual Objects) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Object 1: Avatar Frame Showcase */}
          <div className="bg-white border border-[#E6E6E8] rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#FBF5EA] text-[#D9A441] border border-[#D9A441]/30">
                Avatar Frame
              </span>

              {/* Physical Frame Visual Object */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center justify-center relative overflow-hidden">
                <div className="w-24 h-24 rounded-full border-4 border-[#D9A441] flex items-center justify-center bg-white shadow-md">
                  <Crown weight="fill" className="w-8 h-8 text-[#D9A441]" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#070709]">
                  Polished Gold Frame
                </h3>
                <p className="text-xs text-[#60606C] mt-1 leading-relaxed">
                  Unlocked upon reaching Level 10. Highlights your avatar across leaderboards and profile cards.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E6E8] flex items-center justify-between text-xs font-bold">
              <span className="text-[#8B8B8B]">Cosmetic Perk</span>
              <span className="text-[#D9A441] tabular-nums">Earned with 500 Gold</span>
            </div>
          </div>

          {/* Object 2: Title Typography Plaque */}
          <div className="bg-[#070709] text-white border border-[#070709] rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-xl">
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/20">
                Earned Title
              </span>

              {/* Physical Plaque Object */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#15171C] border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-2">
                <Feather weight="bold" className="w-6 h-6 text-[#D9A441]" />
                <div className="text-2xl font-black tracking-tight text-white">
                  &ldquo;The Architect&rdquo;
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#8B8B8B]">
                  Deep Focus & Habits
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white">
                  Archetype Moniker
                </h3>
                <p className="text-xs text-[#8B8B8B] mt-1 leading-relaxed">
                  Earned by logging 50 consecutive intellect and craft quests without breaking rhythm.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold">
              <span className="text-white/50">Profile Title</span>
              <span className="text-[#668F72] tabular-nums">Streak Milestone</span>
            </div>
          </div>

          {/* Object 3: Tactile Keepsake Artifact */}
          <div className="bg-white border border-[#E6E6E8] rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#FDF4F2] text-[#C85A3D] border border-[#C85A3D]/30">
                Desktop Keepsake
              </span>

              {/* Physical Keepsake Artifact Object */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center justify-center relative overflow-hidden">
                <div className="w-20 h-20 rounded-2xl bg-white border border-[#E6E6E8] flex items-center justify-center shadow-md text-[#C85A3D]">
                  <Compass weight="fill" className="w-10 h-10" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#070709]">
                  Brass Compass Relic
                </h3>
                <p className="text-xs text-[#60606C] mt-1 leading-relaxed">
                  Awarded for branching into 4 diverse attribute categories. A tactile token of balanced curiosity.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E6E8] flex items-center justify-between text-xs font-bold">
              <span className="text-[#8B8B8B]">Artifact</span>
              <span className="text-[#070709] tabular-nums">In-game Gold Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

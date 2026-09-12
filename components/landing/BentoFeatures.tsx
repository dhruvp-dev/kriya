import React from 'react';
import { Target, Shield, Flame, CheckCircle, ArrowRight, Lock } from 'lucide-react';

export function BentoFeatures() {
  return (
    <section id="how-it-works" className="py-20 bg-[#051F20] border-y border-[#1D5254]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="text-xs font-technical uppercase tracking-widest text-[#34D399] font-bold">
            PROGRESSION SYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E2F1ED] tracking-tight">
            COZY PROGRESSION ENGINE.
          </h2>
          <p className="text-base sm:text-lg text-[#80A79D]">
            Four interconnected mechanics engineered to make everyday productivity feel rewarding, tactile, and clear.
          </p>
        </div>

        {/* Asymmetric 4-Cell Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cell 1: QUESTS BECOME PROGRESS (Span 7) */}
          <div className="md:col-span-7 bg-[#0F3132] border border-[#1D5254] p-8 chamfer-panel flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#051F20] border border-[#1D5254] rounded-xs flex items-center justify-center text-[#34D399]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#E2F1ED]">Quests Become Progress</h3>
              <p className="text-sm text-[#80A79D] leading-relaxed max-w-lg">
                Turn everyday actions into structured quests with defined difficulty, attributes, XP, and Gold rewards. Every completed task builds real character momentum.
              </p>
            </div>

            {/* Visual Transformation Box */}
            <div className="bg-[#051F20] border border-[#1D5254] p-4 rounded-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#34D399]" />
                <div>
                  <span className="font-semibold text-xs text-[#E2F1ED]">Deep Work Session (45m)</span>
                  <div className="text-[11px] text-[#80A79D]">Intellect & Discipline</div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-technical text-xs font-bold shrink-0">
                <span className="text-[#34D399] px-2 py-1 bg-[#083B37] border border-[#34D399]/30 rounded-2xs">
                  +50 XP
                </span>
                <span className="text-[#F59E0B] px-2 py-1 bg-[#2D2714] border border-[#F59E0B]/30 rounded-2xs">
                  +15 GOLD
                </span>
              </div>
            </div>
          </div>

          {/* Cell 2: BUILD YOUR CHARACTER (Span 5) */}
          <div className="md:col-span-5 bg-[#0F3132] border border-[#1D5254] p-8 chamfer-panel flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#051F20] border border-[#1D5254] rounded-xs flex items-center justify-center text-[#38BDF8]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#E2F1ED]">Build Your Character</h3>
              <p className="text-sm text-[#80A79D] leading-relaxed">
                Develop 4 core attributes: Strength, Intellect, Discipline, and Creativity with every quest you finish.
              </p>
            </div>

            {/* 4 Core Attributes Progress Meters */}
            <div className="space-y-2.5 bg-[#051F20] border border-[#1D5254] p-4 rounded-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-technical">
                  <span className="font-semibold text-[#34D399]">STRENGTH</span>
                  <span className="text-[#80A79D]">LV. 14</span>
                </div>
                <div className="h-2 bg-[#0F3132] rounded-2xs overflow-hidden">
                  <div className="h-full bg-[#34D399] w-[75%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-technical">
                  <span className="font-semibold text-[#38BDF8]">INTELLECT</span>
                  <span className="text-[#80A79D]">LV. 18</span>
                </div>
                <div className="h-2 bg-[#0F3132] rounded-2xs overflow-hidden">
                  <div className="h-full bg-[#38BDF8] w-[90%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-technical">
                  <span className="font-semibold text-[#A7F3D0]">DISCIPLINE</span>
                  <span className="text-[#80A79D]">LV. 12</span>
                </div>
                <div className="h-2 bg-[#0F3132] rounded-2xs overflow-hidden">
                  <div className="h-full bg-[#A7F3D0] w-[60%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-technical">
                  <span className="font-semibold text-[#FACC15]">CREATIVITY</span>
                  <span className="text-[#80A79D]">LV. 15</span>
                </div>
                <div className="h-2 bg-[#0F3132] rounded-2xs overflow-hidden">
                  <div className="h-full bg-[#FACC15] w-[80%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Cell 3: KEEP YOUR MOMENTUM (Span 5) */}
          <div className="md:col-span-5 bg-[#0F3132] border border-[#1D5254] p-8 chamfer-panel flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#051F20] border border-[#1D5254] rounded-xs flex items-center justify-center text-[#34D399]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#E2F1ED]">Keep Your Momentum</h3>
              <p className="text-sm text-[#80A79D] leading-relaxed">
                Daily streaks reward consistency without turning productivity into punishment. Complete at least one quest per day to keep your streak flame burning.
              </p>
            </div>

            {/* Streak Calendar Tracker Component */}
            <div className="bg-[#051F20] border border-[#1D5254] p-4 rounded-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#34D399] fill-[#34D399]" />
                <span className="font-technical font-bold text-sm text-[#E2F1ED]">7 DAY STREAK</span>
              </div>

              <div className="flex items-center gap-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-2xs flex items-center justify-center text-[10px] font-technical font-bold ${
                      i < 6
                        ? 'bg-[#34D399] text-[#051F20]'
                        : 'bg-[#0F3132] text-[#80A79D] border border-[#1D5254]'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cell 4: YOUR PROGRESS IS REAL (Span 7) */}
          <div className="md:col-span-7 bg-[#0F3132] border border-[#1D5254] p-8 chamfer-panel flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#051F20] border border-[#1D5254] rounded-xs flex items-center justify-center text-[#A7F3D0]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#E2F1ED]">Your Progress Is Real</h3>
              <p className="text-sm text-[#80A79D] leading-relaxed max-w-lg">
                Every reward is validated server-side. XP, Gold, attributes, streaks, and level ups are calculated securely on PostgreSQL backend RPC functions — never client-trusted.
              </p>
            </div>

            {/* Conceptual Sequence Diagram */}
            <div className="bg-[#051F20] border border-[#1D5254] p-4 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3 font-technical text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0F3132] border border-[#1D5254] rounded-2xs text-[#E2F1ED]">
                <CheckCircle className="w-4 h-4 text-[#34D399]" />
                <span>ACTION INTENT</span>
              </div>

              <ArrowRight className="w-4 h-4 text-[#80A79D] hidden sm:block" />

              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#164648] text-[#E2F1ED] rounded-2xs">
                <Lock className="w-4 h-4 text-[#F59E0B]" />
                <span>SERVER RPC VALIDATION</span>
              </div>

              <ArrowRight className="w-4 h-4 text-[#80A79D] hidden sm:block" />

              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#083B37] border border-[#34D399]/30 text-[#34D399] rounded-2xs font-bold">
                <span>VERIFIED REWARD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

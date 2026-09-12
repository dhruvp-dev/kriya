'use client';

import React, { useState } from 'react';
import { Check, Flame, Sparkles, RefreshCw, Zap, BookOpen } from 'lucide-react';

export function InteractiveDemo() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleComplete = () => {
    if (isCompleted) return;
    setIsCompleted(true);
    setShowReward(true);

    setTimeout(() => {
      setShowReward(false);
    }, 2500);
  };

  const handleReset = () => {
    setIsCompleted(false);
    setShowReward(false);
  };

  const startXp = 450;
  const xpAward = 50;
  const currentXp = isCompleted ? startXp + xpAward : startXp;
  const targetXp = 600;
  const xpPercent = Math.min(100, Math.round((currentXp / targetXp) * 100));

  const startStreak = 4;
  const currentStreak = isCompleted ? startStreak + 1 : startStreak;

  return (
    <section id="demo" className="py-20 bg-[#051F20] border-y border-[#1D5254] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#083B37] border border-[#34D399]/30 text-[#34D399] text-xs font-technical font-bold rounded-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE PREVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E2F1ED] tracking-tight">
            TRY KRIYA RIGHT NOW.
          </h2>
          <p className="text-base text-[#80A79D]">
            Interactive preview — no account required. Click complete below to experience Kriya&apos;s tactile reward feedback loop.
          </p>
        </div>

        {/* Demo Quest Card Container */}
        <div className="max-w-xl mx-auto bg-[#0F3132] border-2 border-[#1D5254] p-6 sm:p-8 chamfer-panel shadow-xl relative">
          {/* Pixel Stepped Accent Decorators */}
          <div className="absolute top-0 right-8 w-12 h-1 bg-[#34D399]" />
          <div className="absolute bottom-0 left-8 w-12 h-1 bg-[#F59E0B]" />

          {/* Header Stats */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1D5254]">
            <div>
              <span className="text-[10px] font-technical uppercase font-bold tracking-widest text-[#80A79D]">
                CHARACTER STATUS
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-bold text-[#E2F1ED] text-base">SCHOLAR</span>
                <span className="font-technical text-xs font-bold text-[#F59E0B] px-2 py-0.5 bg-[#2D2714] border border-[#F59E0B]/30 rounded-2xs">
                  LV. 5
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#083B37] text-[#34D399] border border-[#34D399]/20 rounded-2xs">
              <Flame className="w-4 h-4 fill-[#34D399] animate-pulse" />
              <span className="font-technical font-bold text-xs">{currentStreak} DAY STREAK</span>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="mb-6 space-y-1.5">
            <div className="flex justify-between text-xs font-technical">
              <span className="text-[#80A79D] uppercase font-semibold">LEVEL 5 XP</span>
              <span className="font-bold text-[#E2F1ED]">
                {currentXp} / {targetXp} XP ({xpPercent}%)
              </span>
            </div>
            <div className="h-3.5 w-full bg-[#051F20] border border-[#1D5254] rounded-2xs overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#34D399] via-[#F59E0B] to-[#38BDF8] transition-all duration-700 ease-out segmented-ticks"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Quest Action Card */}
          <div className="relative bg-[#051F20] border border-[#1D5254] p-5 chamfer-panel mb-4">
            {showReward && (
              <div className="absolute -top-5 right-6 z-30 animate-bounce flex items-center gap-2 bg-[#0F3132] border-2 border-[#F59E0B] text-[#E2F1ED] px-3.5 py-1.5 text-xs font-bold font-technical shadow-xl rounded-2xs">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-[#34D399]">+50 XP</span>
                <span className="text-[#F59E0B]">+15 GOLD</span>
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-technical uppercase font-bold px-2 py-0.5 bg-[#164648] text-[#38BDF8] border border-[#38BDF8]/30 rounded-2xs">
                    INTELLECT
                  </span>
                  <span className="text-[10px] font-technical uppercase text-[#80A79D]">
                    EASY QUEST
                  </span>
                </div>
                <h3 className="font-bold text-[#E2F1ED] text-lg flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#38BDF8]" />
                  <span>Read 20 pages</span>
                </h3>
                <p className="text-xs text-[#80A79D]">
                  Daily learning & focus practice
                </p>
              </div>

              <div className="flex flex-col items-end text-xs font-technical shrink-0">
                <span className="font-bold text-[#34D399]">+50 XP</span>
                <span className="font-semibold text-[#F59E0B]">+15 GOLD</span>
              </div>
            </div>

            {/* Complete Quest Button */}
            <div className="mt-5 pt-4 border-t border-[#1D5254] flex items-center justify-between">
              <span className="text-xs text-[#80A79D]">
                {isCompleted ? 'Reward awarded' : 'Click button to complete'}
              </span>

              <button
                type="button"
                onClick={handleComplete}
                disabled={isCompleted}
                className={`inline-flex items-center gap-2 px-5 py-2.5 font-bold text-xs transition-all chamfer-button ${
                  isCompleted
                    ? 'bg-[#34D399] text-[#051F20] cursor-default'
                    : 'bg-[#34D399] hover:bg-[#059669] text-[#051F20] shadow-sm active:scale-[0.98]'
                }`}
              >
                {isCompleted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>QUEST COMPLETED</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>COMPLETE QUEST</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reset Preview Link */}
          {isCompleted && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#80A79D] hover:text-[#34D399] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replay interactive quest</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

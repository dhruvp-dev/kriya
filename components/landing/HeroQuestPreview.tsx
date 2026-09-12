'use client';

import React, { useState } from 'react';
import { Check, Flame, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { Avatar } from '../avatars';

export function HeroQuestPreview() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const handleComplete = () => {
    if (isCompleted) return;
    setIsCompleted(true);
    setShowRewardAnimation(true);

    setTimeout(() => {
      setShowRewardAnimation(false);
    }, 2400);
  };

  const handleReset = () => {
    setIsCompleted(false);
    setShowRewardAnimation(false);
  };

  // Progression math simulation
  const startXp = 1200;
  const xpReward = 50;
  const currentXp = isCompleted ? startXp + xpReward : startXp;
  const targetXp = 1500;
  const xpPercent = Math.min(100, Math.round((currentXp / targetXp) * 100));

  const startStreak = 1;
  const currentStreak = isCompleted ? startStreak + 1 : startStreak;

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Pixel Art Accent Corner Sparkle Badges */}
      <div className="absolute -top-2 -left-2 z-10 w-4 h-4 bg-[#34D399] rounded-2xs flex items-center justify-center text-[#051F20] font-technical text-[9px] font-bold shadow-sm">
        +
      </div>
      <div className="absolute -bottom-2 -right-2 z-10 w-4 h-4 bg-[#F59E0B] rounded-2xs flex items-center justify-center text-[#051F20] font-technical text-[9px] font-bold shadow-sm">
        ★
      </div>

      {/* Outer Editorial Container with Subtle 8px Chamfer */}
      <div className="relative bg-[#0F3132] border-2 border-[#1D5254] p-6 shadow-xl chamfer-panel transition-all">
        {/* Top Instrumentation Bar */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#1D5254]">
          <div className="flex items-center gap-3">
            <Avatar variant="architect" size={40} showFrame={true} frame="gold" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#E2F1ED] text-sm">DHRUV</span>
                <span className="font-technical text-[11px] font-semibold px-2 py-0.5 bg-[#2D2714] text-[#F59E0B] border border-[#F59E0B]/30 rounded-2xs">
                  LV. 12
                </span>
              </div>
              <span className="text-xs text-[#80A79D]">Architect Archetype</span>
            </div>
          </div>

          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#083B37] text-[#34D399] border border-[#34D399]/20 rounded-2xs transition-transform duration-300">
            <Flame className="w-4 h-4 fill-[#34D399] animate-bounce" />
            <span className="font-technical font-bold text-xs">{currentStreak} STREAK</span>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mb-6 space-y-1.5">
          <div className="flex justify-between text-xs font-technical">
            <span className="text-[#80A79D] uppercase tracking-wider font-medium">LEVEL PROGRESS</span>
            <span className="font-bold text-[#E2F1ED]">
              {currentXp} / {targetXp} XP ({xpPercent}%)
            </span>
          </div>
          <div className="h-3.5 w-full bg-[#051F20] border border-[#1D5254] rounded-2xs overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#34D399] to-[#F59E0B] transition-all duration-700 ease-out segmented-ticks"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Quest Card */}
        <div className="relative bg-[#051F20] border border-[#1D5254] p-4 chamfer-panel mb-4 transition-all">
          {/* Floating Reward Toast Overlay */}
          {showRewardAnimation && (
            <div className="absolute -top-4 right-4 z-30 animate-bounce flex items-center gap-2 bg-[#0F3132] border-2 border-[#F59E0B] text-[#E2F1ED] px-3.5 py-1.5 text-xs font-bold font-technical shadow-xl rounded-2xs transition-all">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-[#34D399]">+50 XP</span>
              <span className="text-[#F59E0B]">+15 GOLD</span>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-technical uppercase font-bold tracking-widest px-2 py-0.5 bg-[#083B37] text-[#34D399] border border-[#34D399]/30 rounded-2xs">
                  STRENGTH
                </span>
                <span className="text-[10px] font-technical uppercase text-[#80A79D]">
                  MEDIUM DIFFICULTY
                </span>
              </div>
              <h3 className="font-bold text-[#E2F1ED] text-base leading-snug">
                Finish today&apos;s workout session
              </h3>
              <p className="text-xs text-[#80A79D]">
                Physical vitality & momentum builder
              </p>
            </div>

            {/* Fixed Reward Indicator */}
            <div className="flex flex-col items-end text-xs font-technical shrink-0">
              <span className="font-bold text-[#34D399]">+50 XP</span>
              <span className="font-semibold text-[#F59E0B]">+15 GOLD</span>
            </div>
          </div>

          {/* Interactive Complete CTA Button */}
          <div className="mt-4 pt-3 border-t border-[#1D5254] flex items-center justify-between">
            <span className="text-xs text-[#80A79D]">
              {isCompleted ? 'Quest validated & completed' : 'Click to complete quest'}
            </span>

            <button
              type="button"
              onClick={handleComplete}
              disabled={isCompleted}
              className={`inline-flex items-center gap-2 px-4 py-2 font-semibold text-xs transition-all chamfer-button ${
                isCompleted
                  ? 'bg-[#34D399] text-[#051F20] cursor-default'
                  : 'bg-[#34D399] hover:bg-[#059669] text-[#051F20] shadow-sm active:scale-[0.98]'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>COMPLETED</span>
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
              <RefreshCw className="w-3 h-3" />
              <span>Reset interactive demo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Check, Flame, Sparkle, ArrowClockwise, Coins, Lightning, Trophy } from '@phosphor-icons/react';
import { Avatar } from '../avatars';

export function HeroQuestPreview() {
  const [completed, setCompleted] = useState(false);
  const [showRewardNotification, setShowRewardNotification] = useState(false);

  const baseXP = 2430;
  const rewardXP = 50;
  const currentXP = completed ? baseXP + rewardXP : baseXP;
  const nextLevelXP = 3162;
  const progressPercent = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));

  const baseGold = 680;
  const rewardGold = 15;
  const currentGold = completed ? baseGold + rewardGold : baseGold;

  const handleComplete = () => {
    if (completed) return;
    setCompleted(true);
    setShowRewardNotification(true);
    setTimeout(() => {
      setShowRewardNotification(false);
    }, 2800);
  };

  const handleReset = () => {
    setCompleted(false);
    setShowRewardNotification(false);
  };

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      {/* Background Decorative Layer (Creates subtle layered depth) */}
      <div className="absolute inset-0 bg-[#F3F4F5] rounded-3xl -rotate-1.5 translate-y-2.5 scale-[0.98] border border-[#E6E6E8] pointer-events-none" />

      {/* Floating Accent Badge Top-Right (Foreground Layer) */}
      <div className="absolute -top-3.5 -right-2 sm:-right-4 z-30 flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E6E6E8] rounded-full shadow-md text-xs font-bold text-[#070709] rotate-2">
        <Trophy weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
        <span>Level 12 Architect</span>
      </div>

      {/* Floating Streak Pill Bottom-Left (Foreground Layer) */}
      <div className="absolute -bottom-3 -left-2 sm:-left-4 z-30 flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E6E6E8] rounded-full shadow-md text-xs font-semibold text-[#070709] -rotate-2">
        <Flame weight="fill" className={`w-3.5 h-3.5 ${completed ? 'text-[#668F72]' : 'text-[#C85A3D]'}`} />
        <span className="tabular-nums">{completed ? '15 Day Streak' : '14 Day Streak'}</span>
        {completed && <span className="text-[10px] text-[#668F72] font-bold">✓ TODAY</span>}
      </div>

      {/* Main Elevated Product Surface (Middle Layer) */}
      <div className="relative z-10 bg-[#FFFFFF] border border-[#E6E6E8] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl">
        {/* Subtle Browser / App Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6E6E8]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
            <span className="ml-2 text-[11px] font-medium text-[#8B8B8B]">kriya.app/today</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#668F72] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#668F72] animate-pulse" />
            <span>Synced</span>
          </div>
        </div>

        {/* User Identity & Live XP Bar */}
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#E6E6E8]">
          <div className="flex items-center gap-3.5">
            {/* Blob Avatar with interactive reaction */}
            <div
              className={`relative transition-all duration-500 shrink-0 ${
                completed ? 'scale-110 -rotate-2' : ''
              }`}
            >
              <Avatar
                variant="architect"
                size={54}
                system="blob"
                frame="gold"
                showFrame={true}
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-[#070709] text-white text-[9px] font-extrabold tabular-nums shadow-xs">
                LV.12
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-[#070709]">The Architect</span>
                <span className="text-[10px] font-bold text-[#C85A3D] px-2 py-0.5 rounded bg-[#FDF4F2] border border-[#C85A3D]/20">
                  Intellect Core
                </span>
              </div>
              <p className="text-xs text-[#60606C] mt-0.5">Focus, structure & deep craft</p>
            </div>
          </div>

          {/* Gold & Streak Counter */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FBF5EA] border border-[#D9A441]/30 text-xs font-bold text-[#070709] tabular-nums">
              <Coins weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{currentGold}</span>
            </div>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="py-4 space-y-2 border-b border-[#E6E6E8]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-[#070709] tracking-tight">
              LEVEL 12
            </span>
            <div className="text-right text-xs">
              <span className="font-bold text-[#070709] tabular-nums">
                {currentXP.toLocaleString()} XP
              </span>
              <span className="text-[#8B8B8B] font-medium ml-1.5 tabular-nums">
                / {nextLevelXP.toLocaleString()} XP NEXT LEVEL
              </span>
            </div>
          </div>

          {/* Segmented Track */}
          <div className="h-2.5 w-full bg-[#F3F4F5] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#070709] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#8B8B8B] pt-0.5">
            <span className="tabular-nums">{progressPercent}% to Level 13</span>
            <span className="tabular-nums">{nextLevelXP - currentXP} XP remaining</span>
          </div>
        </div>

        {/* TODAY'S QUEST (Primary Interactive Moment) */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#8B8B8B] uppercase tracking-[0.14em]">
              TODAY'S QUEST
            </span>
            <span className="text-[11px] text-[#C85A3D] font-semibold">
              {completed ? '✓ Action logged' : 'Click complete to test'}
            </span>
          </div>

          {/* Interactive Quest Box */}
          <div
            className={`relative rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
              completed
                ? 'bg-[#F1F6F3] border-[#668F72]/40 shadow-xs'
                : 'bg-[#F7F7F8] hover:bg-white border-[#E6E6E8] hover:border-[#D0D1D4] shadow-xs'
            }`}
          >
            {/* Floating Reward Toast */}
            {showRewardNotification && (
              <div className="absolute -top-4 right-4 z-40 flex items-center gap-2 px-3.5 py-1.5 bg-[#070709] text-white text-xs font-bold rounded-full shadow-xl transition-all animate-bounce">
                <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
                <span className="text-[#668F72] tabular-nums">+{rewardXP} XP</span>
                <span className="text-[#D9A441] tabular-nums">+{rewardGold} Gold</span>
              </div>
            )}

            <div className="flex items-start justify-between gap-3.5">
              {/* Checkbox */}
              <button
                type="button"
                onClick={handleComplete}
                disabled={completed}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#070709] ${
                  completed
                    ? 'bg-[#668F72] border-[#668F72] text-white cursor-default scale-105'
                    : 'bg-white border-[#D0D1D4] hover:border-[#070709] cursor-pointer hover:scale-105'
                }`}
                aria-label={completed ? 'Quest completed' : 'Complete quest: Read 20 pages'}
              >
                {completed && <Check weight="bold" className="w-4 h-4" />}
              </button>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={`text-base font-bold transition-colors ${
                      completed ? 'line-through text-[#8B8B8B]' : 'text-[#070709]'
                    }`}
                  >
                    Read 20 pages
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-[#E6E6E8] text-[#070709]">
                    Intellect
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold text-[#8B8B8B]">
                    Medium
                  </span>
                </div>
                <p className="text-xs text-[#60606C] mt-1 leading-relaxed">
                  Morning intentional study block and core idea reflection.
                </p>
              </div>

              {/* Reward Pills */}
              <div className="text-right shrink-0 text-xs font-extrabold tabular-nums space-y-0.5">
                <div className="text-[#C85A3D]">+{rewardXP} XP</div>
                <div className="text-[#D9A441]">+{rewardGold} Gold</div>
              </div>
            </div>

            {/* Bottom Action Strip */}
            <div className="mt-4 pt-3 border-t border-[#E6E6E8]/70 flex items-center justify-between text-xs">
              <span className="text-[#8B8B8B] text-[11px]">
                {completed ? 'Progress recorded in character stats' : 'One click validates completion'}
              </span>

              {completed ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60606C] hover:text-[#070709] transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-white"
                >
                  <ArrowClockwise weight="bold" className="w-3.5 h-3.5" />
                  <span>Reset demo</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="inline-flex items-center gap-1.5 bg-[#070709] hover:bg-[#202025] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                >
                  <Lightning weight="fill" className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>Complete</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

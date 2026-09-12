'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, ShieldStar, Sparkle, X, ArrowRight } from '@phosphor-icons/react';
import type { CompleteQuestResult } from '../../types/database.types';

export interface CelebrationOverlayProps {
  result?: CompleteQuestResult | null;
  isOpen?: boolean;
  newLevel?: number;
  rewardGold?: number;
  onClose: () => void;
}

export function CelebrationOverlay({
  result,
  isOpen = false,
  newLevel = 13,
  rewardGold = 100,
  onClose,
}: CelebrationOverlayProps) {
  const activeIsOpen = Boolean(isOpen || (result && (result.leveled_up || (result.unlocked_achievements && result.unlocked_achievements.length > 0))));
  const displayLevel = result?.new_level ?? newLevel;
  const oldLevel = result?.old_level ?? (displayLevel - 1);
  const displayGold = result?.gold_gained ?? rewardGold;
  const displayXp = result?.xp_gained ?? 50;

  useEffect(() => {
    if (!activeIsOpen) return;

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#070709', '#1D64EC', '#F59E0B', '#10B981'],
      });
    } catch {
      // Fallback
    }
  }, [activeIsOpen]);

  if (!activeIsOpen) return null;

  const isLeveledUp = result?.leveled_up ?? (newLevel > 12);
  const unlockedAch = result?.unlocked_achievements || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans selection:bg-[#070709] selection:text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#070709]/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-md bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#9CA3AF] hover:text-[#070709] hover:bg-[#F9FAFB] rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Level Up Section */}
          {isLeveledUp && (
            <div className="py-2 space-y-3">
              <motion.div
                initial={{ rotate: -15, scale: 0.6 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 240, delay: 0.1 }}
                className="inline-flex p-4 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#1D64EC] shadow-xs"
              >
                <ShieldStar weight="fill" size={56} />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
                Level Up!
              </h2>

              <p className="text-sm font-medium text-[#60606C]">
                You progressed from Level <span className="font-bold text-[#070709]">{oldLevel}</span> to{' '}
                <span className="font-bold text-[#1D64EC]">Level {displayLevel}</span>!
              </p>
            </div>
          )}

          {/* Unlocked Achievements Section */}
          {unlockedAch.length > 0 && (
            <div className="py-3 space-y-3 border-t border-[#E5E7EB] mt-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#070709]">
                <Trophy weight="fill" size={16} className="text-[#F59E0B]" /> Achievement Unlocked!
              </div>

              <div className="space-y-2">
                {unlockedAch.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl flex items-center justify-between text-left"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[#070709]">{ach.name}</h4>
                      <p className="text-xs text-[#60606C] line-clamp-1">{ach.description}</p>
                    </div>
                    <div className="text-right text-xs font-semibold shrink-0">
                      {ach.reward_xp > 0 && <div className="text-[#1D64EC]">+{ach.reward_xp} XP</div>}
                      {ach.reward_gold > 0 && <div className="text-[#D97706]">+{ach.reward_gold} Gold</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reward Summary */}
          <div className="mt-4 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl flex items-center justify-around text-xs font-semibold">
            <span className="text-[#1D64EC] flex items-center gap-1.5">
              <Sparkle weight="fill" size={14} /> +{displayXp} XP
            </span>
            <span className="text-[#D97706] flex items-center gap-1.5">
              +{displayGold} Gold
            </span>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#070709] hover:bg-[#1E1E24] text-white font-medium text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
              onClick={onClose}
            >
              <span>Claim Rewards & Continue</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

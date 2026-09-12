'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, ShieldStar, Sparkle, X } from '@phosphor-icons/react'; // Phosphor for game celebration icons!
import type { CompleteQuestResult } from '../../types/database.types';
import { Button } from '../ui/Button';

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
        colors: ['#8B5CF6', '#FFB547', '#2E9B72', '#F05A3C'],
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#171A21]/80 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="relative z-10 w-full max-w-md bg-white border border-[#E5E1D9] rounded-3xl p-6 shadow-2xl text-center overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#686C73] hover:text-[#171A21] hover:bg-[#F7F5F0] rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {/* Level Up Section */}
          {isLeveledUp && (
            <div className="py-4 space-y-3">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="inline-flex p-4 rounded-3xl bg-[#FFF8EC] border border-[#FFB547]/30 text-[#FFB547]"
              >
                <ShieldStar weight="fill" size={64} />
              </motion.div>

              <h2 className="text-3xl font-extrabold text-[#171A21] uppercase tracking-wide">
                Level Up!
              </h2>

              <p className="text-sm font-medium text-[#686C73]">
                You progressed from Level <span className="font-bold text-[#171A21]">{oldLevel}</span> to{' '}
                <span className="font-bold text-[#F05A3C] text-base">Level {displayLevel}</span>!
              </p>
            </div>
          )}

          {/* Unlocked Achievements Section */}
          {unlockedAch.length > 0 && (
            <div className="py-3 space-y-3 border-t border-[#E5E1D9]">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#202B3C]">
                <Trophy weight="fill" size={18} /> Achievement Unlocked!
              </div>

              <div className="space-y-2">
                {unlockedAch.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-3 bg-[#F7F5F0] border border-[#E5E1D9] rounded-2xl flex items-center justify-between text-left"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[#171A21]">{ach.name}</h4>
                      <p className="text-xs text-[#686C73] line-clamp-1">{ach.description}</p>
                    </div>
                    <div className="text-right text-xs font-semibold shrink-0 font-technical">
                      {ach.reward_xp > 0 && <div className="text-[#3B82F6]">+{ach.reward_xp} XP</div>}
                      {ach.reward_gold > 0 && <div className="text-[#FFB547]">+{ach.reward_gold} Gold</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reward Summary */}
          <div className="mt-4 p-3 bg-[#F7F5F0] border border-[#E5E1D9] rounded-2xl flex items-center justify-around text-xs font-bold font-technical">
            <span className="text-[#3B82F6] flex items-center gap-1">
              <Sparkle weight="fill" size={14} /> +{displayXp} XP
            </span>
            <span className="text-[#FFB547] flex items-center gap-1">
              +{displayGold} Gold
            </span>
          </div>

          <div className="mt-6">
            <Button variant="primary" size="lg" className="w-full font-bold cursor-pointer text-white bg-[#F05A3C] hover:bg-[#D9482B]" onClick={onClose}>
              Claim Rewards & Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

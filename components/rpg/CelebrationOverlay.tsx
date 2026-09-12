'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, ShieldStar, Sparkle, X } from '@phosphor-icons/react'; // Phosphor for game celebration icons!
import type { CompleteQuestResult } from '../../types/database.types';
import { Button } from '../ui/Button';

export interface CelebrationOverlayProps {
  result: CompleteQuestResult | null;
  onClose: () => void;
}

export function CelebrationOverlay({ result, onClose }: CelebrationOverlayProps) {
  useEffect(() => {
    if (!result) return;

    // Fire confetti ONLY when server confirms level up or achievement unlocks! (SRS §23)
    if (result.leveled_up || (result.unlocked_achievements && result.unlocked_achievements.length > 0)) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#F59E0B', '#10B981', '#EC4899'],
        });
      } catch {
        // Fallback if canvas-confetti is not loaded
      }
    }
  }, [result]);

  if (!result) return null;

  const hasContent = result.leveled_up || (result.unlocked_achievements && result.unlocked_achievements.length > 0);
  if (!hasContent) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="relative z-10 w-full max-w-md glass-panel bg-slate-900/95 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl text-center overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {/* Level Up Section */}
          {result.leveled_up && (
            <div className="py-4 space-y-3">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 glow-gold"
              >
                <ShieldStar weight="fill" size={64} />
              </motion.div>

              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-400 to-indigo-400 uppercase tracking-wide">
                Level Up!
              </h2>

              <p className="text-sm font-medium text-slate-300">
                You progressed from Level <span className="font-bold text-slate-100">{result.old_level}</span> to{' '}
                <span className="font-bold text-amber-400 text-base">Level {result.new_level}</span>!
              </p>
            </div>
          )}

          {/* Unlocked Achievements Section */}
          {result.unlocked_achievements && result.unlocked_achievements.length > 0 && (
            <div className="py-3 space-y-3 border-t border-slate-800/80">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Trophy weight="fill" size={18} /> Achievement Unlocked!
              </div>

              <div className="space-y-2">
                {result.unlocked_achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-between text-left"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-purple-300">{ach.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{ach.description}</p>
                    </div>
                    <div className="text-right text-xs font-semibold shrink-0">
                      {ach.reward_xp > 0 && <div className="text-purple-400">+{ach.reward_xp} XP</div>}
                      {ach.reward_gold > 0 && <div className="text-amber-400">+{ach.reward_gold} Gold</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reward Summary */}
          <div className="mt-4 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-around text-xs font-bold">
            <span className="text-purple-400 flex items-center gap-1">
              <Sparkle weight="fill" size={14} /> +{result.xp_gained} XP
            </span>
            <span className="text-amber-400 flex items-center gap-1">
              +{result.gold_gained} Gold
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              +1 {result.attribute_increased}
            </span>
          </div>

          <div className="mt-6">
            <Button variant="gold" size="lg" className="w-full" onClick={onClose}>
              Claim Rewards & Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

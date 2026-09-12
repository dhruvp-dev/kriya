'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, ArrowRight, X, RotateCcw, CheckCircle2, Award } from 'lucide-react';

export interface SubmissionCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  xpGained?: number;
  goldGained?: number;
  attributeGained?: string;
  delayMs?: number;
}

export function SubmissionCelebrationModal({
  isOpen,
  onClose,
  title = 'Congrats on completing your submission!',
  subtitle = "Your quest submission has been recorded and your attributes have compounded.",
  xpGained = 50,
  goldGained = 20,
  attributeGained,
  delayMs = 400,
}: SubmissionCelebrationModalProps) {
  const [isDelayedVisible, setIsDelayedVisible] = useState(false);

  const fireGraffitiConfetti = () => {
    try {
      // Stage 1: Central explosion with vibrant colors
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#070709', '#1D64EC', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'],
      });

      // Stage 2: Left cannon burst after 200ms
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#1D64EC', '#3B82F6', '#60A5FA', '#93C5FD'],
        });
      }, 200);

      // Stage 3: Right cannon burst after 400ms
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#10B981'],
        });
      }, 400);

      // Stage 4: Gentle shower after 600ms
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 100,
          origin: { y: 0.3 },
          gravity: 0.8,
          ticks: 200,
          colors: ['#070709', '#1D64EC', '#F59E0B', '#10B981'],
        });
      }, 600);
    } catch {
      // Fallback in non-browser environments
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsDelayedVisible(true);
        fireGraffitiConfetti();
      }, delayMs);
    } else {
      setIsDelayedVisible(false);
    }
    return () => clearTimeout(timer);
  }, [isOpen, delayMs]);

  const handleReplay = () => {
    fireGraffitiConfetti();
  };

  if (!isOpen && !isDelayedVisible) return null;

  return (
    <AnimatePresence>
      {isDelayedVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans selection:bg-[#070709] selection:text-white">
          {/* Backdrop with soft blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070709]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden"
          >
            {/* Ambient Background Gradient Accent */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#9CA3AF] hover:text-[#070709] hover:bg-[#F9FAFB] rounded-full transition-colors cursor-pointer"
              aria-label="Close celebration"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Icon Badge */}
            <div className="relative mb-5 inline-block">
              <motion.div
                initial={{ rotate: -15, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                className="w-16 h-16 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#1D64EC] flex items-center justify-center mx-auto shadow-xs"
              >
                <Trophy className="w-8 h-8 text-[#1D64EC]" />
              </motion.div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center text-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Pill Tag */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-semibold tracking-normal">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Submission Verified</span>
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight mt-3 font-sans">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-[#60606C] mt-2 max-w-sm mx-auto leading-relaxed">
              {subtitle}
            </p>

            {/* Rewards Summary Box */}
            <div className="mt-6 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl grid grid-cols-3 gap-3 text-center">
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-[#60606C]">XP Earned</div>
                <div className="text-base font-bold text-[#070709]">+{xpGained} XP</div>
              </div>
              <div className="space-y-0.5 border-x border-[#E5E7EB]">
                <div className="text-xs font-medium text-[#60606C]">Gold Bounty</div>
                <div className="text-base font-bold text-[#D97706]">+{goldGained} Gold</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-[#60606C]">Attribute</div>
                <div className="text-xs font-bold text-[#1D64EC] flex items-center justify-center gap-1 mt-1 capitalize">
                  <Award className="w-3.5 h-3.5" />
                  <span>{attributeGained || 'Discipline'}</span>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#070709] hover:bg-[#1E1E24] text-white font-medium text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
              >
                <span>Continue Progress</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#60606C] hover:text-[#070709] transition-colors cursor-pointer py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay confetti celebration</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

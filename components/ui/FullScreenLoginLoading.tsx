'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KriyaIcon } from './KriyaIcon';

export interface FullScreenLoginLoadingProps {
  displayName?: string;
  email?: string;
  title?: string;
  subtitle?: string;
  steps?: string[];
}

export function FullScreenLoginLoading({
  displayName,
  email,
  title,
  subtitle,
  steps = [
    'Verifying credentials...',
    'Synchronizing character progression...',
    'Loading quest board...',
    'Entering KRIYA...',
  ],
}: FullScreenLoginLoadingProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Cycle through subtle status phases
  useEffect(() => {
    if (!steps || steps.length <= 1) return;

    const intervalTime = Math.max(240, Math.floor(900 / steps.length));
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [steps]);

  // Derive friendly name if available
  const friendlyName = displayName
    ? displayName
    : email
    ? email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  const resolvedTitle = title || (friendlyName ? `Welcome back, ${friendlyName}` : 'Logging you in...');
  const resolvedSubtitle = subtitle || 'Synchronizing your daily quests, XP, and streak momentum...';

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        aria-label={resolvedTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFCF7] text-[#070709] select-none p-4"
      >
        {/* Ambient Subtle Warm Backdrop Glow */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 45%, rgba(200, 90, 61, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 50% 55%, rgba(7, 7, 9, 0.04) 0%, transparent 70%)
            `,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-sm w-full mx-auto"
        >
          {/* Animated Icon Container with Ambient Halo */}
          <div className="relative flex items-center justify-center mb-5">
            {/* Pulsing Breathing Halo */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.45, 0.15, 0.45],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-24 h-24 rounded-3xl bg-[#C85A3D]/15 blur-md pointer-events-none"
            />

            {/* Rotating Subtle Dash Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-22 h-22 rounded-3xl border border-dashed border-[#070709]/15 pointer-events-none"
            />

            {/* Icon Card */}
            <div className="relative w-18 h-18 rounded-2xl bg-white border border-[#E6E6E8] shadow-sm flex items-center justify-center">
              <KriyaIcon size={34} variant="default" />
            </div>
          </div>

          {/* Brand Wordmark */}
          <span className="font-satoshi font-bold text-sm tracking-normal text-[#60606C] lowercase mb-1">
            kriya
          </span>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#070709] font-sans">
            {resolvedTitle}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#60606C] max-w-xs mt-1 leading-relaxed">
            {resolvedSubtitle}
          </p>

          {/* Progress Indicator Container */}
          <div className="mt-7 w-60 sm:w-64 space-y-2.5">
            {/* Progress Track */}
            <div className="h-1.5 w-full bg-[#EBEBEF] rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full bg-gradient-to-r from-[#070709] via-[#C85A3D] to-[#070709] rounded-full"
              />
            </div>

            {/* Dynamic Status Step */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C85A3D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C85A3D]" />
              </span>
              <span className="text-[11px] font-medium text-[#7E7E8A] transition-all duration-200">
                {steps[currentStepIndex]}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

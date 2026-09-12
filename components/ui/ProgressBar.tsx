'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils/cn';

export interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  subLabel?: string;
  colorClass?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  subLabel,
  colorClass = 'bg-indigo-500',
  showPercentage = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));

  return (
    <div className={cn('w-full', className)}>
      {(label || subLabel || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium mb-1.5 text-slate-300">
          {label && <span>{label}</span>}
          {subLabel && <span>{subLabel}</span>}
          {!subLabel && showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}

      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={cn('h-full rounded-full relative overflow-hidden', colorClass)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}

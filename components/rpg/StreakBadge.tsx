'use client';

import React from 'react';
import { Flame } from '@phosphor-icons/react'; // Phosphor Icon for streak flame per rule!
import { cn } from '../../lib/utils/cn';

export interface StreakBadgeProps {
  currentStreak: number;
  longestStreak?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StreakBadge({
  currentStreak,
  longestStreak,
  size = 'md',
  className,
}: StreakBadgeProps) {
  const sizes = {
    sm: 'text-xs gap-1 py-0.5 px-2',
    md: 'text-sm gap-1.5 py-1 px-3',
    lg: 'text-base gap-2 py-1.5 px-4 font-bold',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const isHot = currentStreak > 0;

  return (
    <div
      title={longestStreak !== undefined ? `Current: ${currentStreak} days | Best: ${longestStreak} days` : `Streak: ${currentStreak} days`}
      className={cn(
        'inline-flex items-center font-semibold rounded-full border select-none transition-colors',
        isHot
          ? 'text-rose-400 bg-rose-500/10 border-rose-500/30 glow-streak'
          : 'text-slate-400 bg-slate-800/50 border-slate-700/50',
        sizes[size],
        className
      )}
    >
      <Flame
        weight={isHot ? 'fill' : 'regular'}
        size={iconSizes[size]}
        className={cn(isHot ? 'text-rose-500 animate-bounce' : 'text-slate-500')}
      />
      <span>{currentStreak}d</span>
    </div>
  );
}

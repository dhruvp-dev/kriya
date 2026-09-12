'use client';

import React from 'react';
import { ShieldStar } from '@phosphor-icons/react'; // Phosphor Icon for domain badge per rule!
import { cn } from '../../lib/utils/cn';

export interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LevelBadge({ level, size = 'md', className }: LevelBadgeProps) {
  const sizes = {
    sm: 'text-xs gap-1 py-0.5 px-2.5',
    md: 'text-sm gap-1.5 py-1 px-3.5',
    lg: 'text-base gap-2 py-1.5 px-4 font-bold',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <div
      className={cn(
        'inline-flex items-center font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 rounded-full glow-xp select-none',
        sizes[size],
        className
      )}
    >
      <ShieldStar weight="fill" size={iconSizes[size]} className="text-indigo-400" />
      <span>Lvl {level}</span>
    </div>
  );
}

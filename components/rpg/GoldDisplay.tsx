'use client';

import React from 'react';
import { Coins } from '@phosphor-icons/react'; // Phosphor Icon for domain/game element per rule!
import { cn } from '../../lib/utils/cn';

export interface GoldDisplayProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GoldDisplay({ amount, size = 'md', className }: GoldDisplayProps) {
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

  return (
    <div
      className={cn(
        'inline-flex items-center font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full glow-gold select-none',
        sizes[size],
        className
      )}
    >
      <Coins weight="fill" size={iconSizes[size]} className="text-amber-400 animate-pulse" />
      <span>{amount.toLocaleString()}</span>
    </div>
  );
}

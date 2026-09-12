'use client';

import React from 'react';
import { cn } from '../../../lib/utils/cn';
import { AvatarConfig, DEFAULT_AVATAR_CONFIG } from '../../../types/avatar.types';

export interface AvatarChipProps {
  config?: AvatarConfig;
  displayName?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function AvatarChip({
  config = DEFAULT_AVATAR_CONFIG,
  displayName,
  size = 'sm',
  className,
}: AvatarChipProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
  };

  const initial = (displayName || config.baseModel || 'W').charAt(0).toUpperCase();

  return (
    <div
      role="img"
      aria-label={`Avatar chip: ${config.baseModel}`}
      className={cn(
        'relative flex items-center justify-center font-extrabold text-white rounded-full border border-white/20 shadow-md shrink-0 select-none overflow-hidden',
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: config.tint || '#6366f1',
        backgroundImage: `linear-gradient(135deg, ${config.tint}dd, ${config.tint}77)`,
      }}
    >
      <span className="drop-shadow-md">{initial}</span>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}

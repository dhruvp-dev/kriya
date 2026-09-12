'use client';

import React from 'react';
import { KriyaIcon } from './KriyaIcon';

export interface KriyaLogoProps {
  variant?: 'primary' | 'navbar' | 'compact' | 'stacked' | 'dark' | 'mono';
  size?: 'sm' | 'md' | 'lg' | number;
  showTagline?: boolean;
  taglineText?: string;
  className?: string;
  onClick?: () => void;
}

export function KriyaLogo({
  variant = 'primary',
  size = 'md',
  showTagline = true,
  taglineText = 'DAILY PROGRESS ENGINE',
  className = '',
  onClick,
}: KriyaLogoProps) {
  // Determine pixel sizes based on preset or explicit number
  const iconSize = typeof size === 'number' 
    ? size 
    : variant === 'navbar' || variant === 'compact' || size === 'sm'
    ? 28
    : size === 'lg'
    ? 44
    : 36;

  const isDark = variant === 'dark';
  const isMono = variant === 'mono';
  const isCompact = variant === 'navbar' || variant === 'compact';
  const isStacked = variant === 'stacked';

  const textColor = isDark ? 'text-[#FFFDF7]' : isMono ? 'text-[#20231F]' : 'text-[#20231F]';
  const taglineColor = isDark ? 'text-[#DFDDD2]' : 'text-[#70736B]';
  const dotColor = isDark ? 'bg-[#E26A4B]' : isMono ? 'bg-[#20231F]' : 'bg-[#C85A3D]';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        isStacked ? 'flex-col items-start gap-1.5' : ''
      } ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Icon Mark */}
      <KriyaIcon
        size={iconSize}
        variant={isDark ? 'dark' : isMono ? 'mono' : 'default'}
        className={onClick ? 'group-hover:scale-105 transition-transform' : ''}
      />

      {/* Typography Block */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1">
          <span
            className={`font-black tracking-tight ${textColor}`}
            style={{
              fontSize: iconSize * 0.88,
              lineHeight: 1,
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
            }}
          >
            KRIYA
          </span>
          {/* Stepped Accent Micro-Dot on Wordmark */}
          {!isCompact && (
            <span
              className={`w-1.5 h-1.5 rounded-2xs ${dotColor} ${
                onClick ? 'group-hover:scale-125 transition-transform' : ''
              }`}
            />
          )}
        </div>

        {/* Tagline / Sub-label (Excluded in Compact/Navbar mode) */}
        {!isCompact && showTagline && (
          <span
            className={`font-bold tracking-[0.25em] uppercase mt-1 ${taglineColor}`}
            style={{
              fontSize: Math.max(9, Math.round(iconSize * 0.28)),
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
            }}
          >
            {taglineText}
          </span>
        )}
      </div>
    </div>
  );
}

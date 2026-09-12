'use client';

import React from 'react';

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
  showTagline = false,
  taglineText = 'action into progress',
  className = '',
  onClick,
}: KriyaLogoProps) {
  // Determine pixel font size based on preset or explicit number
  const fontSize = typeof size === 'number'
    ? size
    : variant === 'navbar' || variant === 'compact' || size === 'sm'
    ? 22
    : size === 'lg'
    ? 30
    : 24;

  const isDark = variant === 'dark';
  const isMono = variant === 'mono';
  const textColor = isDark ? 'text-white' : isMono ? 'text-current' : 'text-[#070709]';
  const taglineColor = isDark ? 'text-[#8B8B8B]' : 'text-[#60606C]';

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col select-none font-satoshi ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      <span
        className={`font-bold tracking-normal ${textColor}`}
        style={{
          fontSize,
          lineHeight: 1.1,
        }}
      >
        kriya
      </span>

      {showTagline && (
        <span
          className={`font-medium tracking-normal text-[11px] mt-0.5 lowercase ${taglineColor}`}
        >
          {taglineText}
        </span>
      )}
    </div>
  );
}

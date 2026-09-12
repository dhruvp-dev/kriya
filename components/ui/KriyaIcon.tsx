'use client';

import React from 'react';

export interface KriyaIconProps {
  size?: number;
  variant?: 'default' | 'dark' | 'mono' | 'on-terracotta';
  withContainer?: boolean;
  className?: string;
}

export function KriyaIcon({
  size = 32,
  variant = 'default',
  withContainer = false,
  className = '',
}: KriyaIconProps) {
  // Theme color definitions matching the premium aesthetic SaaS system
  const colors = {
    default: {
      pillar: '#070709',
      momentum: '#C85A3D',
      foundation: '#070709',
      spark: '#D9A441',
      bg: '#FFFFFF',
      border: '#E6E6E8',
      shadow: 'rgba(0, 0, 0, 0.04)',
    },
    dark: {
      pillar: '#FFFFFF',
      momentum: '#E26A4B',
      foundation: '#E6E6E8',
      spark: '#F5B731',
      bg: '#070709',
      border: '#202025',
      shadow: 'rgba(0, 0, 0, 0.4)',
    },
    mono: {
      pillar: 'currentColor',
      momentum: 'currentColor',
      foundation: 'currentColor',
      spark: 'currentColor',
      bg: 'transparent',
      border: 'currentColor',
      shadow: 'none',
    },
    'on-terracotta': {
      pillar: '#FFFFFF',
      momentum: '#FFFDF7',
      foundation: '#FFFFFF',
      spark: '#F5B731',
      bg: '#C85A3D',
      border: '#A94730',
      shadow: 'rgba(200, 90, 61, 0.25)',
    },
  }[variant];

  // Minimally abstract kinetic "K" SVG mark:
  // - Vertical Pillar: Stability, habit baseline, unwavering grounding
  // - Ascending Arm: Terracotta momentum vector rising toward the top right
  // - Lower Arm: Foundational return anchoring the base
  // - Golden Spark: Reward, momentum, milestone spark
  const svgContent = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className="shrink-0 transition-transform duration-200"
      aria-label="KRIYA Logo Icon"
    >
      {/* 1. Stability Pillar (Left Column) */}
      <rect
        x="5.5"
        y="4.5"
        width="4.5"
        height="23"
        rx="2.25"
        fill={colors.pillar}
      />

      {/* 2. Ascending Momentum Vector (Upper Action Arm) */}
      <path
        d="M 13.5 14.5 L 23.5 4.5"
        stroke={colors.momentum}
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* 3. Foundation Return (Lower Grounding Arm) */}
      <path
        d="M 13.5 17.5 L 23.5 27.5"
        stroke={colors.foundation}
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* 4. Action / Reward Spark (Subtle Accent Node at upper apex) */}
      <circle
        cx="26.5"
        cy="2.5"
        r="1.5"
        fill={colors.spark}
      />
    </svg>
  );

  if (withContainer) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-2xl border transition-all ${className}`}
        style={{
          width: size * 1.45,
          height: size * 1.45,
          backgroundColor: colors.bg,
          borderColor: colors.border,
          boxShadow: `0 1px 3px ${colors.shadow}`,
        }}
      >
        {svgContent}
      </div>
    );
  }

  return <div className={`inline-flex items-center ${className}`}>{svgContent}</div>;
}

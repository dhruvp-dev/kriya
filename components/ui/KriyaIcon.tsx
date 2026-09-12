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
  // Color presets based on variant
  const colors = {
    default: {
      stem: '#C85A3D',
      stemShadow: '#A94730',
      step1: '#C85A3D',
      step2: '#C85A3D',
      apex: '#D9A441',
      dot: '#668F72',
      lower1: '#A94730',
      lower2: '#A94730',
      bg: '#FFFDF7',
      border: '#DFDDD2',
    },
    dark: {
      stem: '#E26A4B',
      stemShadow: '#C85A3D',
      step1: '#E26A4B',
      step2: '#E26A4B',
      apex: '#F5B731',
      dot: '#85B592',
      lower1: '#C85A3D',
      lower2: '#C85A3D',
      bg: '#20231F',
      border: '#344653',
    },
    mono: {
      stem: '#20231F',
      stemShadow: '#20231F',
      step1: '#20231F',
      step2: '#20231F',
      apex: '#20231F',
      dot: '#20231F',
      lower1: '#20231F',
      lower2: '#20231F',
      bg: '#FFFDF7',
      border: '#DFDDD2',
    },
    'on-terracotta': {
      stem: '#FFFDF7',
      stemShadow: '#FFFDF7',
      step1: '#FFFDF7',
      step2: '#FFFDF7',
      apex: '#F5B731',
      dot: '#FFFDF7',
      lower1: '#EBE8DD',
      lower2: '#EBE8DD',
      bg: '#C85A3D',
      border: '#A94730',
    },
  }[variant];

  const svgContent = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className="shrink-0 transition-transform duration-200"
    >
      {/* Left Vertical Stem Pillar with Chamfer Corner */}
      <path d="M 4 6 L 6 4 L 11 4 L 11 28 L 4 28 Z" fill={colors.stem} />
      {variant !== 'mono' && (
        <path d="M 9.5 4 L 11 4 L 11 28 L 9.5 28 Z" fill={colors.stemShadow} opacity="0.4" />
      )}

      {/* Ascending Upper Arm (Progress Stair) */}
      <rect x="12" y="15" width="5" height="4" rx="0.5" fill={colors.step1} />
      <rect x="17" y="10" width="5" height="5" rx="0.5" fill={colors.step2} />
      <rect x="22" y="4" width="6" height="6" rx="0.5" fill={colors.apex} />
      <rect x="26" y="2" width="2" height="2" fill={colors.dot} />

      {/* Descending Lower Arm (Foundation Base) */}
      <rect x="12" y="19" width="6" height="4" rx="0.5" fill={colors.lower1} />
      <rect x="18" y="23" width="7" height="5" rx="0.5" fill={colors.lower2} />
    </svg>
  );

  if (withContainer) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl border shadow-2xs transition-all ${className}`}
        style={{
          width: size * 1.5,
          height: size * 1.5,
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
      >
        {svgContent}
      </div>
    );
  }

  return <div className={`inline-flex items-center ${className}`}>{svgContent}</div>;
}

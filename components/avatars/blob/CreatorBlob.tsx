import React from 'react';

export function CreatorBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="creator-grad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E2A63B" />
          <stop offset="0.6" stopColor="#D97724" />
          <stop offset="1" stopColor="#C85A3D" />
        </linearGradient>
        <filter id="creator-shadow" x="10" y="10" width="80" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Minimalist Artist Beret on Top */}
      <g transform="rotate(-15 45 16)">
        <ellipse cx="44" cy="18" rx="16" ry="6" fill="#151515" />
        <circle cx="44" cy="12" r="1.5" fill="#151515" />
      </g>

      {/* Flowing Organic Creator Blob */}
      <path
        d="M28 40C24 24 38 18 52 20C66 22 76 32 76 46C76 60 80 74 68 84C56 92 38 88 28 80C18 72 32 54 28 40Z"
        fill="url(#creator-grad)"
        filter="url(#creator-shadow)"
      />

      {/* Subtle Flow Swirl Highlight */}
      <path
        d="M36 34C44 32 60 35 66 42"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.25"
      />

      {/* Sparkling Imaginative Eyes */}
      <circle cx="42" cy="48" r="3.5" fill="#FFFFFF" />
      <circle cx="60" cy="48" r="3.5" fill="#FFFFFF" />
      <circle cx="43.5" cy="47" r="1.5" fill="#151515" />
      <circle cx="61.5" cy="47" r="1.5" fill="#151515" />
      <circle cx="40.5" cy="46.5" r="1" fill="#FFFFFF" />
      <circle cx="58.5" cy="46.5" r="1" fill="#FFFFFF" />

      {/* Subtle Creative Paint-dab Cheek Accent */}
      <circle cx="34" cy="54" r="2.5" fill="#FFFFFF" fillOpacity="0.3" />
      <circle cx="68" cy="54" r="2.5" fill="#FFFFFF" fillOpacity="0.3" />

      {/* Warm Expressive Smile */}
      <path d="M47 59C49 62 53 62 55 59" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

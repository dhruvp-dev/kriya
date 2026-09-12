import React from 'react';

export function ArchitectBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="arch-grad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D3B42" />
          <stop offset="1" stopColor="#1E272C" />
        </linearGradient>
        <filter id="arch-shadow" x="10" y="10" width="80" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Structured Organic Blob Silhouette */}
      <path
        d="M24 38C24 24 36 16 50 16C64 16 76 24 76 38C76 54 82 70 70 80C58 90 42 90 30 80C18 70 24 54 24 38Z"
        fill="url(#arch-grad)"
        filter="url(#arch-shadow)"
      />

      {/* Subtle Specular Highlight */}
      <ellipse cx="38" cy="26" rx="10" ry="4" transform="rotate(-15 38 26)" fill="#FFFFFF" fillOpacity="0.12" />

      {/* Architectural Gold Wire Glasses */}
      {/* Left Rim */}
      <circle cx="41" cy="45" r="9" stroke="#D9A441" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.08" />
      {/* Right Rim */}
      <circle cx="59" cy="45" r="9" stroke="#D9A441" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.08" />
      {/* Bridge */}
      <path d="M50 44C50 42.5 50 42.5 50 44" stroke="#D9A441" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="44" x2="50" y2="44" stroke="#D9A441" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 43C49 42 51 42 52 43" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" />
      {/* Temples */}
      <line x1="32" y1="45" x2="25" y2="43" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="45" x2="75" y2="43" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" />

      {/* Lens Glint */}
      <path d="M37 41L42 39" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M55 41L60 39" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* Eyes behind lenses */}
      <circle cx="41" cy="45" r="2.5" fill="#FFFFFF" />
      <circle cx="59" cy="45" r="2.5" fill="#FFFFFF" />

      {/* Composed Smile */}
      <path d="M46 59C48 61 52 61 54 59" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
    </svg>
  );
}

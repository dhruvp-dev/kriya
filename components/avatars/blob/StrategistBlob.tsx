import React from 'react';

export function StrategistBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="strat-grad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22252A" />
          <stop offset="1" stopColor="#101214" />
        </linearGradient>
        <filter id="strat-shadow" x="10" y="10" width="80" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Poised Symmetrical Strategist Silhouette */}
      <path
        d="M26 38C26 22 36 16 50 16C64 16 74 22 74 38C74 54 80 72 68 82C56 90 44 90 32 82C20 72 26 54 26 38Z"
        fill="url(#strat-grad)"
        filter="url(#strat-shadow)"
      />

      {/* Subtle Rim Light Edge */}
      <path
        d="M30 32C34 20 44 18 50 18"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.2"
      />

      {/* Tactical Eyes */}
      <circle cx="41" cy="45" r="3" fill="#FFFFFF" />
      <circle cx="42" cy="45" r="1.5" fill="#151515" />

      {/* Right Eye with Polished Gold Monocle */}
      <circle cx="59" cy="45" r="3" fill="#FFFFFF" />
      <circle cx="60" cy="45" r="1.5" fill="#151515" />
      <circle cx="59" cy="45" r="8" stroke="#D9A441" strokeWidth="2.2" fill="#FFFFFF" fillOpacity="0.08" />
      {/* Monocle Glint */}
      <path d="M56 41L59 39" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Monocle Delicate Gold Chain */}
      <path d="M67 45C72 52 70 66 66 70" stroke="#D9A441" strokeWidth="1.2" strokeDasharray="1.5 1.5" strokeLinecap="round" />

      {/* Calm Analytical Expression */}
      <path d="M46 58C48 59 52 59 54 58" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.75" />
    </svg>
  );
}

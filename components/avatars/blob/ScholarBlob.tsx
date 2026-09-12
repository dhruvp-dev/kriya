import React from 'react';

export function ScholarBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="schol-grad" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2E5C56" />
          <stop offset="1" stopColor="#1E3E3A" />
        </linearGradient>
        <filter id="schol-shadow" x="10" y="10" width="80" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Rounded Organic Egg/Teardrop Blob */}
      <path
        d="M26 44C26 26 38 18 50 18C62 18 74 26 74 44C74 62 76 78 66 84C56 90 44 90 34 84C24 78 26 62 26 44Z"
        fill="url(#schol-grad)"
        filter="url(#schol-shadow)"
      />

      {/* Soft Top Highlight */}
      <ellipse cx="44" cy="27" rx="12" ry="5" transform="rotate(-10 44 27)" fill="#FFFFFF" fillOpacity="0.12" />

      {/* Thoughtful Eyes */}
      <circle cx="42" cy="46" r="3" fill="#FFFFFF" />
      <circle cx="58" cy="46" r="3" fill="#FFFFFF" />
      <circle cx="43" cy="45" r="1" fill="#1E3E3A" />
      <circle cx="59" cy="45" r="1" fill="#1E3E3A" />

      {/* Little Reading Specs (Resting lower on nose) */}
      <path d="M36 49C36 47 47 47 47 49" stroke="#E6E6E8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M53 49C53 47 64 47 64 49" stroke="#E6E6E8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M47 48C49 47 51 47 53 48" stroke="#E6E6E8" strokeWidth="1.8" strokeLinecap="round" />

      {/* Tiny Sage Book Ribbon Bookmark tucked at bottom edge */}
      <path d="M50 78V88L47 85L44 88V78H50Z" fill="#D9A441" />

      {/* Calm Content Expression */}
      <path d="M47 58C49 59.5 51 59.5 53 58" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.75" />
    </svg>
  );
}

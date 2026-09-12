import React from 'react';

export function BuilderBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="builder-grad" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3A4349" />
          <stop offset="1" stopColor="#22292E" />
        </linearGradient>
        <filter id="builder-shadow" x="10" y="10" width="80" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Sturdy Geometric Foundation Blob */}
      <path
        d="M26 40C26 24 38 18 50 18C62 18 74 24 74 40C74 56 80 72 70 82C60 90 40 90 30 82C20 72 26 56 26 40Z"
        fill="url(#builder-grad)"
        filter="url(#builder-shadow)"
      />

      {/* Sleek Minimalist Builder Visor Band */}
      <path
        d="M28 32C36 28 64 28 72 32"
        stroke="#668F72"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Foundation Gold Keystone Badge */}
      <rect x="47" y="27" width="6" height="5" rx="1" fill="#D9A441" />

      {/* Solid Reliable Eyes */}
      <circle cx="41" cy="47" r="3.2" fill="#FFFFFF" />
      <circle cx="59" cy="47" r="3.2" fill="#FFFFFF" />
      <circle cx="42.5" cy="47" r="1.5" fill="#151515" />
      <circle cx="60.5" cy="47" r="1.5" fill="#151515" />

      {/* Steady Reassuring Smile */}
      <path d="M46 59H54" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.8" />
    </svg>
  );
}

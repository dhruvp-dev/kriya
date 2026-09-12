import React from 'react';

export function MakerBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="maker-grad" x1="25" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D46447" />
          <stop offset="1" stopColor="#B0482E" />
        </linearGradient>
        <filter id="maker-shadow" x="10" y="10" width="80" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Tucked Craft Pencil (Accompanying the blob) */}
      <g transform="rotate(35 72 28)">
        <rect x="68" y="12" width="6" height="24" rx="1.5" fill="#D9A441" />
        <path d="M68 36L71 42L74 36H68Z" fill="#F3F4F5" />
        <path d="M70 40L71 42L72 40H70Z" fill="#151515" />
        <rect x="68" y="12" width="6" height="4" fill="#C85A3D" />
      </g>

      {/* Asymmetrical Dynamic Maker Blob */}
      <path
        d="M26 38C22 22 40 16 54 18C68 20 74 32 74 46C74 62 82 74 68 84C54 92 36 88 28 78C20 68 30 52 26 38Z"
        fill="url(#maker-grad)"
        filter="url(#maker-shadow)"
      />

      {/* Specular Highlight */}
      <ellipse cx="42" cy="28" rx="10" ry="4" transform="rotate(-15 42 28)" fill="#FFFFFF" fillOpacity="0.15" />

      {/* Determined Maker Eyes */}
      <circle cx="40" cy="46" r="3.5" fill="#FFFFFF" />
      <circle cx="58" cy="46" r="3.5" fill="#FFFFFF" />
      <circle cx="42" cy="46" r="1.5" fill="#20231F" />
      <circle cx="60" cy="46" r="1.5" fill="#20231F" />

      {/* Confident Smirk */}
      <path d="M46 58C48 61 54 60 56 57" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

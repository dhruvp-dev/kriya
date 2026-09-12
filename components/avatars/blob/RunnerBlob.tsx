import React from 'react';

export function RunnerBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="runner-grad" x1="20" y1="20" x2="85" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E26544" />
          <stop offset="1" stopColor="#C04A2B" />
        </linearGradient>
        <filter id="runner-shadow" x="10" y="10" width="80" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Aerodynamic Forward-Leaning Runner Blob */}
      <path
        d="M32 32C24 18 42 14 58 18C74 22 80 34 76 50C72 66 76 78 64 84C52 90 38 86 32 76C24 64 38 46 32 32Z"
        fill="url(#runner-grad)"
        filter="url(#runner-shadow)"
      />

      {/* Minimalist Athletic Headband Band */}
      <path
        d="M28 34C38 31 62 31 77 37"
        stroke="#070709"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Accent Stripe on Headband */}
      <path
        d="M48 32C52 32 56 32 60 33"
        stroke="#D9A441"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Energetic High-Spirit Eyes */}
      <circle cx="44" cy="48" r="3.5" fill="#FFFFFF" />
      <circle cx="62" cy="49" r="3.5" fill="#FFFFFF" />
      <circle cx="46" cy="48" r="1.5" fill="#151515" />
      <circle cx="64" cy="49" r="1.5" fill="#151515" />

      {/* Dynamic Cheerful Breath Smile */}
      <path d="M50 59C53 62 58 61 60 59" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

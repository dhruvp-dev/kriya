import React from 'react';

export function ExplorerBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="expl-grad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#446A55" />
          <stop offset="1" stopColor="#2B4637" />
        </linearGradient>
        <filter id="expl-shadow" x="10" y="10" width="80" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Upward Looking Adventurous Droplet Blob */}
      <path
        d="M30 42C30 22 42 16 54 18C66 20 74 30 74 44C74 58 78 74 66 84C54 92 38 88 30 80C22 72 30 58 30 42Z"
        fill="url(#expl-grad)"
        filter="url(#expl-shadow)"
      />

      {/* Minimalist Trail Camp Cap Brim */}
      <path
        d="M26 30C36 22 66 22 76 31C70 33 50 33 26 30Z"
        fill="#1E2B23"
      />
      {/* Tiny Gold Compass Badge on Cap */}
      <circle cx="51" cy="24" r="3" fill="#D9A441" />
      <circle cx="51" cy="24" r="1.5" fill="#1E2B23" />

      {/* Wide Wondering Eyes */}
      <circle cx="43" cy="47" r="4" fill="#FFFFFF" />
      <circle cx="61" cy="48" r="4" fill="#FFFFFF" />
      <circle cx="45" cy="46" r="1.8" fill="#151515" />
      <circle cx="63" cy="47" r="1.8" fill="#151515" />

      {/* Curious Smile */}
      <path d="M48 60C51 63 56 63 58 60" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

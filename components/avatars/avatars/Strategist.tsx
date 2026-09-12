import React from 'react';

export function StrategistSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
    >
      {/* Background Soft Shadow */}
      <path
        d="M20 9h24v4h4v6h4v14h-2v12h-4v14H14V45h-4V33H8V19h4v-6h4v-4z"
        fill="#0F1115"
        fillOpacity="0.15"
      />

      {/* --- CLOTHING --- */}
      {/* Tailored Charcoal Suit Blazer (#171A21) */}
      <rect x="14" y="44" width="36" height="16" fill="#171A21" />
      <rect x="12" y="48" width="40" height="12" fill="#171A21" />
      <rect x="10" y="52" width="44" height="8" fill="#171A21" />

      {/* Blazer Lapel Structure & Folds */}
      <rect x="14" y="46" width="6" height="18" fill="#202B3C" />
      <rect x="44" y="46" width="6" height="18" fill="#202B3C" />
      <rect x="18" y="48" width="4" height="16" fill="#171A21" />
      <rect x="42" y="48" width="4" height="16" fill="#171A21" />

      {/* Crisp White Collared Shirt Insert (#F7F5F0 Ivory) */}
      <polygon points="26,42 38,42 36,54 28,54" fill="#F7F5F0" />
      <rect x="28" y="40" width="8" height="4" fill="#F7F5F0" />

      {/* Slate Tie Accent (#202B3C) */}
      <rect x="31" y="44" width="2" height="12" fill="#202B3C" />
      <rect x="30" y="45" width="4" height="3" fill="#202B3C" />

      {/* Emerald Strategist Lapel Pin (#2E9B72 Green & Gold #FFB547) */}
      <rect x="44" y="49" width="3" height="3" fill="#2E9B72" />
      <rect x="45" y="50" width="1" height="1" fill="#FFB547" />

      {/* --- NECK & JAW --- */}
      <rect x="26" y="34" width="12" height="8" fill="#5C341F" />
      <rect x="28" y="34" width="8" height="6" fill="#8D5338" />

      {/* --- FACE BASE --- */}
      {/* Rich Warm Dark Skin (#8D5338) */}
      <rect x="20" y="16" width="24" height="20" fill="#8D5338" />
      <rect x="18" y="20" width="28" height="12" fill="#8D5338" />

      {/* Chiseled Jawline */}
      <rect x="22" y="34" width="20" height="3" fill="#8D5338" />
      <rect x="24" y="36" width="16" height="2" fill="#8D5338" />
      <rect x="26" y="37" width="12" height="1" fill="#5C341F" />

      {/* Cheek & Jaw Shadows */}
      <rect x="18" y="26" width="2" height="6" fill="#5C341F" />
      <rect x="44" y="22" width="2" height="10" fill="#5C341F" />
      <rect x="42" y="30" width="2" height="4" fill="#5C341F" />

      {/* Ears */}
      <rect x="16" y="24" width="2" height="5" fill="#5C341F" />
      <rect x="17" y="25" width="1" height="3" fill="#8D5338" />
      <rect x="46" y="24" width="2" height="5" fill="#5C341F" />

      {/* Nose */}
      <rect x="31" y="26" width="2" height="5" fill="#5C341F" />
      <rect x="31" y="30" width="3" height="1" fill="#422414" />

      {/* Serene Confident Lips */}
      <rect x="28" y="33" width="8" height="1" fill="#5C341F" />
      <rect x="29" y="32" width="6" height="1" fill="#8D5338" />

      {/* Eyes */}
      {/* Left Eye */}
      <rect x="23" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="24" y="24" width="2" height="3" fill="#171A21" />
      <rect x="25" y="24" width="1" height="1" fill="#FFFFFF" />
      {/* Right Eye */}
      <rect x="36" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="37" y="24" width="2" height="3" fill="#171A21" />
      <rect x="38" y="24" width="1" height="1" fill="#FFFFFF" />

      {/* Sleek Refined Eyebrows */}
      <rect x="22" y="21" width="6" height="2" fill="#5A6072" />
      <rect x="36" y="21" width="6" height="2" fill="#5A6072" />

      {/* --- SLEEK SILVER/GREY HAIR (#8E95A5) --- */}
      {/* Main Hair Mass */}
      <rect x="18" y="9" width="28" height="9" fill="#8E95A5" />
      <rect x="16" y="11" width="32" height="7" fill="#8E95A5" />
      <rect x="14" y="13" width="36" height="5" fill="#8E95A5" />

      {/* Hair Crown & Slicked Top */}
      <rect x="20" y="7" width="22" height="3" fill="#8E95A5" />
      <rect x="24" y="6" width="14" height="2" fill="#8E95A5" />

      {/* Sideburns */}
      <rect x="16" y="18" width="4" height="5" fill="#8E95A5" />
      <rect x="44" y="18" width="4" height="5" fill="#8E95A5" />

      {/* Silver Hair Highlights (#D1D5DB) */}
      <rect x="22" y="7" width="10" height="2" fill="#D1D5DB" />
      <rect x="18" y="9" width="12" height="3" fill="#D1D5DB" />
      <rect x="20" y="13" width="8" height="2" fill="#D1D5DB" />

      {/* Hair Shadows (#5A6072 & #374151) */}
      <rect x="38" y="11" width="8" height="5" fill="#5A6072" />
      <rect x="42" y="14" width="5" height="5" fill="#374151" />
    </svg>
  );
}

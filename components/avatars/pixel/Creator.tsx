import React from 'react';

export function CreatorSvg({ className }: { className?: string }) {
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
        d="M16 6h32v4h4v6h4v16h-2v12h-4v14H10V45h-4V33H6V17h4v-6h4v-5z"
        fill="#0F1115"
        fillOpacity="0.15"
      />

      {/* --- CLOTHING --- */}
      {/* Gold Sweater (#FFB547 Body) */}
      <rect x="14" y="44" width="36" height="16" fill="#FFB547" />
      <rect x="12" y="48" width="40" height="12" fill="#FFB547" />
      <rect x="10" y="52" width="44" height="8" fill="#FFB547" />

      {/* Sweater Knit Texture Lines (#D98A1B) */}
      <rect x="16" y="48" width="2" height="12" fill="#D98A1B" />
      <rect x="24" y="50" width="2" height="10" fill="#D98A1B" />
      <rect x="38" y="50" width="2" height="10" fill="#D98A1B" />
      <rect x="46" y="48" width="2" height="12" fill="#D98A1B" />

      {/* Coral Scarf Wrap (#F05A3C) */}
      <rect x="20" y="38" width="24" height="8" fill="#F05A3C" />
      <rect x="18" y="41" width="28" height="5" fill="#F05A3C" />
      <rect x="22" y="44" width="8" height="10" fill="#F05A3C" opacity="0.9" stroke="#C44127" strokeWidth="1" />
      <rect x="24" y="52" width="4" height="2" fill="#F7F5F0" /> {/* Scarf fringe */}

      {/* Scarf Folds & Highlights */}
      <rect x="22" y="40" width="10" height="2" fill="#FF8269" />
      <rect x="34" y="42" width="8" height="2" fill="#C44127" />

      {/* --- NECK & JAW --- */}
      <rect x="26" y="34" width="12" height="6" fill="#E5B89C" />
      <rect x="28" y="34" width="8" height="4" fill="#FCE4D6" />

      {/* --- FACE BASE --- */}
      {/* Fair Warm Skin (#FCE4D6) */}
      <rect x="20" y="16" width="24" height="20" fill="#FCE4D6" />
      <rect x="18" y="20" width="28" height="12" fill="#FCE4D6" />

      {/* Soft Jawline */}
      <rect x="22" y="34" width="20" height="3" fill="#FCE4D6" />
      <rect x="24" y="36" width="16" height="2" fill="#FCE4D6" />
      <rect x="26" y="37" width="12" height="1" fill="#E5B89C" />

      {/* Cheek Shadows & Warm Blush */}
      <rect x="18" y="26" width="2" height="6" fill="#E5B89C" />
      <rect x="44" y="22" width="2" height="10" fill="#E5B89C" />
      {/* Coral Blush Pixels (#F05A3C low opacity look) */}
      <rect x="21" y="28" width="3" height="2" fill="#F7B2A3" />
      <rect x="40" y="28" width="3" height="2" fill="#F7B2A3" />

      {/* Ears */}
      <rect x="16" y="24" width="2" height="5" fill="#E5B89C" />
      <rect x="17" y="25" width="1" height="3" fill="#FCE4D6" />
      <rect x="46" y="24" width="2" height="5" fill="#E5B89C" />

      {/* Nose */}
      <rect x="31" y="26" width="2" height="5" fill="#E5B89C" />
      <rect x="31" y="30" width="3" height="1" fill="#D49A75" />

      {/* Warm Expressive Smile */}
      <rect x="28" y="32" width="8" height="2" fill="#171A21" />
      <rect x="29" y="32" width="6" height="1" fill="#FFFFFF" />
      <rect x="30" y="33" width="4" height="1" fill="#F05A3C" />

      {/* Eyes - Warm & Bright */}
      {/* Left Eye */}
      <rect x="23" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="25" y="24" width="2" height="3" fill="#2C1E16" />
      <rect x="26" y="24" width="1" height="1" fill="#FFFFFF" />
      {/* Right Eye */}
      <rect x="36" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="37" y="24" width="2" height="3" fill="#2C1E16" />
      <rect x="38" y="24" width="1" height="1" fill="#FFFFFF" />

      {/* Soft Eyebrows */}
      <rect x="22" y="21" width="6" height="2" fill="#2C1E16" />
      <rect x="36" y="21" width="6" height="2" fill="#2C1E16" />

      {/* --- TEXTURED CURLY HAIR (#2C1E16) --- */}
      {/* Hair curls framing face */}
      <rect x="15" y="16" width="5" height="10" fill="#2C1E16" />
      <rect x="44" y="16" width="5" height="10" fill="#2C1E16" />
      <rect x="14" y="20" width="4" height="6" fill="#2C1E16" />
      <rect x="46" y="20" width="4" height="6" fill="#2C1E16" />
      <rect x="18" y="14" width="28" height="6" fill="#2C1E16" />

      {/* Golden Curly Highlights (#E5B869) */}
      <rect x="15" y="18" width="2" height="2" fill="#E5B869" />
      <rect x="47" y="18" width="2" height="2" fill="#E5B869" />
      <rect x="14" y="22" width="2" height="2" fill="#E5B869" />

      {/* --- ARTIST NAVY BERET (#202B3C) --- */}
      {/* Main Beret Flap (Tilted Right) */}
      <rect x="14" y="9" width="36" height="7" fill="#202B3C" />
      <rect x="12" y="11" width="40" height="4" fill="#202B3C" />
      <rect x="18" y="6" width="30" height="5" fill="#202B3C" />
      <rect x="24" y="4" width="20" height="4" fill="#202B3C" />

      {/* Beret Stalk / Stem on Top */}
      <rect x="33" y="2" width="2" height="3" fill="#202B3C" />

      {/* Beret Highlight (#3B4E6B) & Shadow (#121924) */}
      <rect x="18" y="6" width="12" height="2" fill="#3B4E6B" />
      <rect x="14" y="10" width="10" height="2" fill="#3B4E6B" />
      <rect x="42" y="10" width="8" height="4" fill="#121924" />

      {/* Gold Artist Pin on Beret (#FFB547) */}
      <rect x="22" y="11" width="3" height="3" fill="#FFB547" />
      <rect x="23" y="12" width="1" height="1" fill="#FFFFFF" />
    </svg>
  );
}

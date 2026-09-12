import React from 'react';

export function BuilderSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
    >
      {/* Background Shadow */}
      <path
        d="M18 8h28v4h4v6h4v16h-2v12h-4v14H12V45h-4V33H6V17h4v-6h4v-4z"
        fill="#0F1115"
        fillOpacity="0.15"
      />

      {/* --- CLOTHING --- */}
      {/* Canvas Heavy Work Jacket (#2E9B72 Green) */}
      <rect x="14" y="44" width="36" height="16" fill="#2E9B72" />
      <rect x="12" y="48" width="40" height="12" fill="#2E9B72" />
      <rect x="10" y="52" width="44" height="8" fill="#2E9B72" />

      {/* Jacket Seams & Heavy Folds */}
      <rect x="14" y="48" width="2" height="12" fill="#1E6B4E" />
      <rect x="48" y="48" width="2" height="12" fill="#1E6B4E" />
      <rect x="20" y="50" width="2" height="10" fill="#1E6B4E" />
      <rect x="42" y="50" width="2" height="10" fill="#1E6B4E" />

      {/* Inner Charcoal Shirt (#171A21) */}
      <polygon points="26,42 38,42 36,52 28,52" fill="#171A21" />

      {/* Brass Buttons & Rivets (#FFB547 Gold) */}
      <rect x="23" y="48" width="2" height="2" fill="#FFB547" />
      <rect x="23" y="54" width="2" height="2" fill="#FFB547" />
      <rect x="39" y="48" width="2" height="2" fill="#FFB547" />
      <rect x="39" y="54" width="2" height="2" fill="#FFB547" />

      {/* --- NECK & JAW --- */}
      <rect x="25" y="34" width="14" height="8" fill="#D49A70" />
      <rect x="27" y="34" width="10" height="6" fill="#F3C5A8" />

      {/* --- FACE BASE --- */}
      {/* Medium Warm Skin (#F3C5A8) */}
      <rect x="20" y="16" width="24" height="20" fill="#F3C5A8" />
      <rect x="18" y="20" width="28" height="12" fill="#F3C5A8" />

      {/* Strong Broad Chin & Jaw */}
      <rect x="21" y="34" width="22" height="3" fill="#F3C5A8" />
      <rect x="23" y="36" width="18" height="3" fill="#F3C5A8" />
      <rect x="25" y="38" width="14" height="1" fill="#D49A70" />

      {/* Jawline & Cheek Shadow */}
      <rect x="18" y="26" width="2" height="6" fill="#D49A70" />
      <rect x="44" y="22" width="2" height="10" fill="#D49A70" />
      <rect x="42" y="30" width="2" height="5" fill="#D49A70" />

      {/* Ears */}
      <rect x="16" y="24" width="2" height="5" fill="#D49A70" />
      <rect x="17" y="25" width="1" height="3" fill="#F3C5A8" />
      <rect x="46" y="24" width="2" height="5" fill="#D49A70" />

      {/* Nose - Solid Broad Nose */}
      <rect x="31" y="25" width="2" height="5" fill="#D49A70" />
      <rect x="30" y="29" width="4" height="2" fill="#C4885E" />

      {/* Cheerful Confident Grin */}
      <rect x="26" y="33" width="12" height="2" fill="#171A21" />
      <rect x="27" y="33" width="10" height="1" fill="#FFFFFF" /> {/* Bright Teeth */}
      <rect x="28" y="34" width="8" height="1" fill="#F05A3C" />

      {/* Eyes */}
      {/* Left Eye */}
      <rect x="23" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="24" y="24" width="2" height="3" fill="#171A21" />
      <rect x="25" y="24" width="1" height="1" fill="#FFFFFF" />
      {/* Right Eye */}
      <rect x="36" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="37" y="24" width="2" height="3" fill="#171A21" />
      <rect x="38" y="24" width="1" height="1" fill="#FFFFFF" />

      {/* Thick Friendly Eyebrows */}
      <rect x="21" y="21" width="7" height="2" fill="#523629" />
      <rect x="36" y="21" width="7" height="2" fill="#523629" />

      {/* Brown Hair Locks Peeking Below Cap */}
      <rect x="17" y="19" width="4" height="3" fill="#523629" />
      <rect x="43" y="19" width="4" height="3" fill="#523629" />

      {/* --- BUILDER PROTECTIVE CAP (#2E9B72) --- */}
      {/* Cap Visor / Brim */}
      <rect x="14" y="17" width="36" height="3" fill="#2E9B72" />
      <rect x="16" y="16" width="32" height="2" fill="#FFB547" /> {/* Gold Brim Piping */}

      {/* Cap Main Crown */}
      <rect x="18" y="9" width="28" height="8" fill="#2E9B72" />
      <rect x="22" y="7" width="20" height="3" fill="#2E9B72" />
      <rect x="26" y="6" width="12" height="2" fill="#2E9B72" />

      {/* Cap Highlight (#41BF8E) & Shadow (#1E6B4E) */}
      <rect x="22" y="8" width="8" height="2" fill="#41BF8E" />
      <rect x="36" y="9" width="8" height="6" fill="#1E6B4E" />

      {/* Kriva Emblem Badge on Cap (#F05A3C Coral) */}
      <rect x="30" y="10" width="4" height="4" fill="#F05A3C" />
      <rect x="31" y="11" width="2" height="2" fill="#F7F5F0" />
    </svg>
  );
}

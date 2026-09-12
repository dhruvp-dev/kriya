import React from 'react';

export function ScholarSvg({ className }: { className?: string }) {
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
        d="M20 9h24v4h4v6h4v14h-2v12h-4v14H14V45h-4V33H8V19h4v-6h4v-4z"
        fill="#0F1115"
        fillOpacity="0.15"
      />

      {/* --- CLOTHING --- */}
      {/* Navy Knit Sweater (#202B3C) */}
      <rect x="14" y="44" width="36" height="16" fill="#202B3C" />
      <rect x="12" y="48" width="40" height="12" fill="#202B3C" />
      <rect x="10" y="52" width="44" height="8" fill="#202B3C" />

      {/* Sweater Folds & Texture */}
      <rect x="14" y="48" width="2" height="12" fill="#171A21" />
      <rect x="48" y="48" width="2" height="12" fill="#171A21" />
      <rect x="22" y="52" width="2" height="8" fill="#171A21" />
      <rect x="40" y="52" width="2" height="8" fill="#171A21" />

      {/* Shirt Collar V-neck Insert (#F7F5F0 Ivory) */}
      <polygon points="26,42 38,42 38,48 32,54 26,48" fill="#F7F5F0" />
      <rect x="28" y="40" width="8" height="4" fill="#F7F5F0" />

      {/* Coral Tie Accent (#F05A3C) */}
      <rect x="31" y="44" width="2" height="10" fill="#F05A3C" />
      <rect x="30" y="45" width="4" height="2" fill="#F05A3C" />
      <rect x="31" y="51" width="2" height="3" fill="#C44127" />

      {/* Collar Fold Shadows */}
      <rect x="25" y="42" width="2" height="5" fill="#E5E1D9" />
      <rect x="37" y="42" width="2" height="5" fill="#E5E1D9" />

      {/* --- NECK & JAW --- */}
      <rect x="26" y="34" width="12" height="8" fill="#E5B89C" />
      <rect x="28" y="34" width="8" height="6" fill="#FCE4D6" />

      {/* --- FACE BASE --- */}
      {/* Skin Fair (#FCE4D6) */}
      <rect x="20" y="16" width="24" height="20" fill="#FCE4D6" />
      <rect x="18" y="20" width="28" height="12" fill="#FCE4D6" />

      {/* Jawline & Chin */}
      <rect x="22" y="34" width="20" height="3" fill="#FCE4D6" />
      <rect x="24" y="36" width="16" height="2" fill="#FCE4D6" />
      <rect x="26" y="37" width="12" height="1" fill="#E5B89C" />

      {/* Cheek & Jaw Shadows */}
      <rect x="18" y="26" width="2" height="6" fill="#E5B89C" />
      <rect x="44" y="22" width="2" height="10" fill="#E5B89C" />
      <rect x="42" y="30" width="2" height="4" fill="#E5B89C" />

      {/* Ears */}
      <rect x="16" y="24" width="2" height="5" fill="#E5B89C" />
      <rect x="17" y="25" width="1" height="3" fill="#FCE4D6" />
      <rect x="46" y="24" width="2" height="5" fill="#E5B89C" />

      {/* Nose */}
      <rect x="31" y="26" width="2" height="5" fill="#E5B89C" />
      <rect x="31" y="30" width="3" height="1" fill="#D49A75" />

      {/* Soft Knowledgeable Smile */}
      <rect x="28" y="33" width="8" height="1" fill="#C4885E" />
      <rect x="29" y="32" width="6" height="1" fill="#FCE4D6" />

      {/* Eyes */}
      {/* Left Eye */}
      <rect x="23" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="24" y="24" width="2" height="3" fill="#202B3C" />
      <rect x="25" y="24" width="1" height="1" fill="#FFFFFF" />
      {/* Right Eye */}
      <rect x="36" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="37" y="24" width="2" height="3" fill="#202B3C" />
      <rect x="38" y="24" width="1" height="1" fill="#FFFFFF" />

      {/* Eyebrows */}
      <rect x="22" y="21" width="6" height="2" fill="#7C361D" />
      <rect x="36" y="21" width="6" height="2" fill="#7C361D" />

      {/* --- ROUND SCHOLAR SPECTACLES (#171A21) --- */}
      {/* Left Circle Rim */}
      <rect x="21" y="22" width="8" height="1" fill="#171A21" />
      <rect x="21" y="27" width="8" height="1" fill="#171A21" />
      <rect x="20" y="23" width="1" height="4" fill="#171A21" />
      <rect x="29" y="23" width="1" height="4" fill="#171A21" />
      {/* Right Circle Rim */}
      <rect x="35" y="22" width="8" height="1" fill="#171A21" />
      <rect x="35" y="27" width="8" height="1" fill="#171A21" />
      <rect x="34" y="23" width="1" height="4" fill="#171A21" />
      <rect x="43" y="23" width="1" height="4" fill="#171A21" />
      {/* Bridge */}
      <rect x="30" y="24" width="4" height="1" fill="#171A21" />
      {/* Glint */}
      <rect x="22" y="23" width="2" height="1" fill="#FFFFFF" opacity="0.7" />
      <rect x="36" y="23" width="2" height="1" fill="#FFFFFF" opacity="0.7" />

      {/* --- HAIR (Auburn Side-Swept #7C361D) --- */}
      {/* Main Auburn Hair Mass */}
      <rect x="18" y="9" width="28" height="9" fill="#7C361D" />
      <rect x="16" y="11" width="32" height="7" fill="#7C361D" />
      <rect x="14" y="13" width="36" height="5" fill="#7C361D" />

      {/* Hair Top Swept Crown */}
      <rect x="20" y="7" width="22" height="3" fill="#7C361D" />
      <rect x="24" y="6" width="14" height="2" fill="#7C361D" />

      {/* Side-Swept Bangs over Left Brow */}
      <rect x="16" y="16" width="12" height="5" fill="#7C361D" />
      <rect x="18" y="18" width="12" height="3" fill="#7C361D" />
      <rect x="44" y="16" width="4" height="5" fill="#7C361D" />

      {/* Highlights (#A44B2B & #C25E39) */}
      <rect x="22" y="7" width="10" height="2" fill="#C25E39" />
      <rect x="18" y="9" width="12" height="3" fill="#A44B2B" />
      <rect x="20" y="14" width="8" height="2" fill="#A44B2B" />

      {/* Hair Shadows (#562311) */}
      <rect x="38" y="11" width="8" height="5" fill="#562311" />
      <rect x="42" y="14" width="5" height="5" fill="#562311" />

      {/* Individual Hair Locks */}
      <rect x="26" y="19" width="2" height="2" fill="#7C361D" />
      <rect x="15" y="19" width="2" height="3" fill="#7C361D" />
    </svg>
  );
}

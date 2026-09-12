import React from 'react';

export function ArchitectSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
    >
      {/* Background outline glow/soft shadow */}
      <path
        d="M20 10h24v4h4v6h4v14h-2v12h-4v14H14V46h-4V34H8V20h4v-6h4v-4z"
        fill="#0F1115"
        fillOpacity="0.15"
      />

      {/* --- SHOULDERS & CLOTHING --- */}
      {/* Base Jacket / Turtleneck Body (Charcoal #171A21 & Navy #202B3C) */}
      <rect x="14" y="44" width="36" height="16" fill="#171A21" />
      <rect x="12" y="48" width="40" height="12" fill="#171A21" />
      <rect x="10" y="52" width="44" height="8" fill="#171A21" />

      {/* Jacket Outer Folds & Shadows */}
      <rect x="10" y="54" width="4" height="6" fill="#0D0F13" />
      <rect x="50" y="54" width="4" height="6" fill="#0D0F13" />
      <rect x="14" y="50" width="4" height="10" fill="#0D0F13" />
      <rect x="46" y="50" width="4" height="10" fill="#0D0F13" />

      {/* Turtleneck Collar Structure */}
      <rect x="22" y="38" width="20" height="10" fill="#202B3C" />
      <rect x="20" y="40" width="24" height="8" fill="#202B3C" />
      <rect x="22" y="42" width="20" height="6" fill="#171A21" />
      <rect x="24" y="40" width="16" height="2" fill="#2A374E" />

      {/* Architect Gold Lapel Pin / Badge (#FFB547) */}
      <rect x="42" y="48" width="3" height="3" fill="#FFB547" />
      <rect x="43" y="47" width="1" height="5" fill="#FFE5A3" />
      <rect x="41" y="49" width="5" height="1" fill="#D98A1B" />

      {/* --- NECK & JAW --- */}
      {/* Neck (Skin #F3C5A8 with Neck Shadow #D49A70) */}
      <rect x="26" y="34" width="12" height="6" fill="#D49A70" />
      <rect x="28" y="34" width="8" height="4" fill="#F3C5A8" />
      <rect x="34" y="36" width="4" height="4" fill="#C4885E" />

      {/* --- FACE BASE --- */}
      {/* Skin Base */}
      <rect x="20" y="16" width="24" height="20" fill="#F3C5A8" />
      <rect x="18" y="20" width="28" height="12" fill="#F3C5A8" />

      {/* Chin & Jaw Structure */}
      <rect x="22" y="34" width="20" height="3" fill="#F3C5A8" />
      <rect x="24" y="36" width="16" height="2" fill="#F3C5A8" />
      <rect x="26" y="37" width="12" height="1" fill="#D49A70" />

      {/* Shading - Jawline & Right Cheek Shadow */}
      <rect x="18" y="26" width="2" height="6" fill="#D49A70" />
      <rect x="44" y="22" width="2" height="10" fill="#D49A70" />
      <rect x="42" y="30" width="2" height="4" fill="#D49A70" />
      <rect x="20" y="32" width="4" height="2" fill="#D49A70" />
      <rect x="40" y="32" width="4" height="2" fill="#D49A70" />

      {/* Ears */}
      <rect x="16" y="24" width="2" height="5" fill="#D49A70" />
      <rect x="17" y="25" width="1" height="3" fill="#F3C5A8" />
      <rect x="46" y="24" width="2" height="5" fill="#D49A70" />

      {/* Nose */}
      <rect x="31" y="27" width="2" height="4" fill="#D49A70" />
      <rect x="31" y="30" width="4" height="1" fill="#C4885E" />

      {/* Mouth */}
      <rect x="29" y="33" width="6" height="1" fill="#B87B52" />
      <rect x="30" y="32" width="4" height="1" fill="#E2A682" />

      {/* Eyes */}
      {/* Left Eye */}
      <rect x="23" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="25" y="24" width="2" height="3" fill="#171A21" />
      <rect x="26" y="24" width="1" height="1" fill="#FFFFFF" />
      {/* Right Eye */}
      <rect x="36" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="37" y="24" width="2" height="3" fill="#171A21" />
      <rect x="38" y="24" width="1" height="1" fill="#FFFFFF" />

      {/* Eyebrows */}
      <rect x="22" y="22" width="7" height="1" fill="#1C2026" />
      <rect x="35" y="22" width="7" height="1" fill="#1C2026" />

      {/* --- GLASSES (Minimalist Gold Specs #FFB547) --- */}
      {/* Left Frame */}
      <rect x="21" y="23" width="9" height="5" fill="none" />
      <rect x="21" y="22" width="9" height="1" fill="#FFB547" />
      <rect x="21" y="27" width="9" height="1" fill="#FFB547" />
      <rect x="20" y="23" width="1" height="4" fill="#FFB547" />
      <rect x="30" y="23" width="1" height="4" fill="#FFB547" />
      {/* Right Frame */}
      <rect x="34" y="22" width="9" height="1" fill="#FFB547" />
      <rect x="34" y="27" width="9" height="1" fill="#FFB547" />
      <rect x="33" y="23" width="1" height="4" fill="#FFB547" />
      <rect x="43" y="23" width="1" height="4" fill="#FFB547" />
      {/* Bridge */}
      <rect x="31" y="23" width="2" height="1" fill="#FFB547" />
      {/* Temples */}
      <rect x="17" y="24" width="3" height="1" fill="#FFB547" />
      <rect x="44" y="24" width="3" height="1" fill="#FFB547" />
      {/* Lens Glint */}
      <rect x="22" y="23" width="2" height="1" fill="#FFF8E7" opacity="0.8" />
      <rect x="35" y="23" width="2" height="1" fill="#FFF8E7" opacity="0.8" />

      {/* --- HAIR (Structured Dark Charcoal #1C2026) --- */}
      {/* Main Hair Mass */}
      <rect x="18" y="10" width="28" height="8" fill="#1C2026" />
      <rect x="16" y="12" width="32" height="7" fill="#1C2026" />
      <rect x="14" y="14" width="36" height="5" fill="#1C2026" />

      {/* Hair Volume & Top Curve */}
      <rect x="22" y="8" width="20" height="3" fill="#1C2026" />
      <rect x="26" y="7" width="12" height="2" fill="#1C2026" />

      {/* Sideburns & Bangs */}
      <rect x="16" y="19" width="5" height="5" fill="#1C2026" />
      <rect x="43" y="19" width="5" height="4" fill="#1C2026" />

      {/* Hair Highlights (Top-Left Light Source #374151 & #4B5563) */}
      <rect x="24" y="8" width="8" height="2" fill="#4B5563" />
      <rect x="20" y="10" width="10" height="2" fill="#374151" />
      <rect x="18" y="12" width="6" height="2" fill="#374151" />
      <rect x="32" y="9" width="4" height="1" fill="#374151" />

      {/* Hair Shadows (Right/Bottom Shadow #0D0F13) */}
      <rect x="40" y="12" width="6" height="4" fill="#0D0F13" />
      <rect x="44" y="15" width="4" height="4" fill="#0D0F13" />

      {/* Crisp Hair Strand Pixels */}
      <rect x="18" y="17" width="2" height="2" fill="#1C2026" />
      <rect x="44" y="18" width="2" height="2" fill="#1C2026" />
    </svg>
  );
}

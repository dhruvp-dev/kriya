import React from 'react';

export function ExplorerSvg({ className }: { className?: string }) {
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
        d="M18 7h28v4h4v6h4v16h-2v12h-4v14H12V45h-4V33H6V17h4v-6h4v-4z"
        fill="#0F1115"
        fillOpacity="0.15"
      />

      {/* --- CLOTHING --- */}
      {/* High-Collar Outdoor Trail Jacket (Navy #202B3C) */}
      <rect x="14" y="44" width="36" height="16" fill="#202B3C" />
      <rect x="12" y="48" width="40" height="12" fill="#202B3C" />
      <rect x="10" y="52" width="44" height="8" fill="#202B3C" />

      {/* High Weather Collar */}
      <rect x="22" y="36" width="20" height="10" fill="#202B3C" />
      <rect x="20" y="38" width="24" height="8" fill="#202B3C" />
      <rect x="24" y="36" width="16" height="3" fill="#171A21" />

      {/* Weatherproof Zipper & Coral Accent (#F05A3C) */}
      <rect x="31" y="37" width="2" height="19" fill="#F05A3C" />
      <rect x="30" y="41" width="4" height="2" fill="#FFB547" /> {/* Zip Pull Tab */}

      {/* Brass Compass Badge on Chest (#FFB547) */}
      <rect x="41" y="46" width="5" height="5" fill="#FFB547" />
      <rect x="42" y="47" width="3" height="3" fill="#171A21" />
      <rect x="43" y="47" width="1" height="3" fill="#F05A3C" /> {/* Compass Needle */}

      {/* --- NECK & JAW --- */}
      <rect x="26" y="34" width="12" height="4" fill="#E5B89C" />
      <rect x="28" y="34" width="8" height="2" fill="#FCE4D6" />

      {/* --- FACE BASE --- */}
      {/* Sun-kissed Fair Skin (#FCE4D6) */}
      <rect x="20" y="16" width="24" height="20" fill="#FCE4D6" />
      <rect x="18" y="20" width="28" height="12" fill="#FCE4D6" />

      {/* Jawline & Chin */}
      <rect x="22" y="34" width="20" height="3" fill="#FCE4D6" />
      <rect x="24" y="36" width="16" height="2" fill="#FCE4D6" />
      <rect x="26" y="37" width="12" height="1" fill="#E5B89C" />

      {/* Cheek Shadows & Subtle Freckle Cluster */}
      <rect x="18" y="26" width="2" height="6" fill="#E5B89C" />
      <rect x="44" y="22" width="2" height="10" fill="#E5B89C" />
      {/* Cute Freckle Pixels */}
      <rect x="23" y="28" width="1" height="1" fill="#C4885E" />
      <rect x="25" y="29" width="1" height="1" fill="#C4885E" />
      <rect x="38" y="28" width="1" height="1" fill="#C4885E" />
      <rect x="40" y="29" width="1" height="1" fill="#C4885E" />

      {/* Ears */}
      <rect x="16" y="24" width="2" height="5" fill="#E5B89C" />
      <rect x="17" y="25" width="1" height="3" fill="#FCE4D6" />
      <rect x="46" y="24" width="2" height="5" fill="#E5B89C" />

      {/* Nose */}
      <rect x="31" y="26" width="2" height="5" fill="#E5B89C" />
      <rect x="31" y="30" width="3" height="1" fill="#D49A75" />

      {/* Curious Adventurous Expression */}
      <rect x="28" y="32" width="8" height="1" fill="#171A21" />
      <rect x="29" y="33" width="6" height="1" fill="#C4885E" />

      {/* Eyes */}
      {/* Left Eye */}
      <rect x="23" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="24" y="24" width="2" height="3" fill="#2E9B72" /> {/* Emerald Explorer Iris */}
      <rect x="25" y="24" width="1" height="1" fill="#FFFFFF" />
      {/* Right Eye */}
      <rect x="36" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="37" y="24" width="2" height="3" fill="#2E9B72" />
      <rect x="38" y="24" width="1" height="1" fill="#FFFFFF" />

      {/* Eyebrows */}
      <rect x="22" y="21" width="6" height="2" fill="#B88E3E" />
      <rect x="36" y="21" width="6" height="2" fill="#B88E3E" />

      {/* --- WINDSWEPT GOLDEN HAIR (#E5B869) --- */}
      {/* Main Hair Mass */}
      <rect x="18" y="9" width="28" height="9" fill="#E5B869" />
      <rect x="16" y="11" width="32" height="7" fill="#E5B869" />
      <rect x="14" y="13" width="36" height="6" fill="#E5B869" />

      {/* Windswept Bangs Tilted Left to Right */}
      <rect x="14" y="16" width="16" height="5" fill="#E5B869" />
      <rect x="16" y="19" width="12" height="3" fill="#E5B869" />
      <rect x="42" y="15" width="6" height="6" fill="#E5B869" />

      {/* Hair Crown & Spikes */}
      <rect x="20" y="7" width="22" height="3" fill="#E5B869" />
      <rect x="24" y="5" width="14" height="3" fill="#E5B869" />
      <rect x="17" y="7" width="4" height="3" fill="#E5B869" />
      <rect x="38" y="6" width="5" height="3" fill="#E5B869" />

      {/* Hair Highlights (#F7D99B) */}
      <rect x="22" y="7" width="10" height="2" fill="#F7D99B" />
      <rect x="18" y="9" width="12" height="3" fill="#F7D99B" />
      <rect x="16" y="16" width="6" height="2" fill="#F7D99B" />

      {/* Hair Shadow (#B88E3E & #8E6822) */}
      <rect x="38" y="11" width="8" height="5" fill="#B88E3E" />
      <rect x="42" y="14" width="5" height="5" fill="#8E6822" />
    </svg>
  );
}

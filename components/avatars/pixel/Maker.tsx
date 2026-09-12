import React from 'react';

export function MakerSvg({ className }: { className?: string }) {
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
      {/* Workwear Apron / Jacket (Denim #30435E) */}
      <rect x="14" y="44" width="36" height="16" fill="#30435E" />
      <rect x="12" y="48" width="40" height="12" fill="#30435E" />
      <rect x="10" y="52" width="44" height="8" fill="#30435E" />

      {/* Workwear Canvas Straps / Trim (Forest Green #2E9B72) */}
      <rect x="18" y="44" width="5" height="16" fill="#2E9B72" />
      <rect x="41" y="44" width="5" height="16" fill="#2E9B72" />
      <rect x="18" y="44" width="1" height="16" fill="#1E6B4E" />
      <rect x="45" y="44" width="1" height="16" fill="#1E6B4E" />

      {/* Pocket & Maker Pencil Slot Accent (#FFB547 Pencil) */}
      <rect x="19" y="50" width="3" height="8" fill="#1E6B4E" />
      <rect x="20" y="46" width="2" height="7" fill="#FFB547" />
      <rect x="20" y="45" width="2" height="1" fill="#F05A3C" /> {/* Pencil eraser */}
      <rect x="20" y="53" width="2" height="1" fill="#171A21" /> {/* Lead tip */}

      {/* Brass Rivets (#FFB547) */}
      <rect x="19" y="44" width="1" height="1" fill="#FFB547" />
      <rect x="44" y="44" width="1" height="1" fill="#FFB547" />

      {/* Inner T-shirt (#F7F5F0 Warm Ivory) */}
      <rect x="25" y="42" width="14" height="6" fill="#F7F5F0" />
      <rect x="27" y="40" width="10" height="4" fill="#F7F5F0" />

      {/* --- NECK & JAW --- */}
      <rect x="26" y="34" width="12" height="8" fill="#B87B52" />
      <rect x="28" y="34" width="8" height="6" fill="#D49A70" />

      {/* --- FACE BASE --- */}
      {/* Warm Tan Skin (#D49A70) */}
      <rect x="20" y="16" width="24" height="20" fill="#D49A70" />
      <rect x="18" y="20" width="28" height="12" fill="#D49A70" />

      {/* Jawline & Chin */}
      <rect x="22" y="34" width="20" height="3" fill="#D49A70" />
      <rect x="24" y="36" width="16" height="2" fill="#D49A70" />
      <rect x="26" y="37" width="12" height="1" fill="#B87B52" />

      {/* Cheek & Jaw Shadows */}
      <rect x="18" y="26" width="2" height="6" fill="#B87B52" />
      <rect x="44" y="22" width="2" height="10" fill="#B87B52" />
      <rect x="42" y="30" width="2" height="4" fill="#B87B52" />

      {/* Smudge / Maker Character Detail (Cheek Grease/Dirt Cluster) */}
      <rect x="21" y="29" width="3" height="1" fill="#8D5338" opacity="0.6" />
      <rect x="22" y="30" width="2" height="1" fill="#8D5338" opacity="0.6" />

      {/* Ears */}
      <rect x="16" y="24" width="2" height="5" fill="#B87B52" />
      <rect x="17" y="25" width="1" height="3" fill="#D49A70" />
      <rect x="46" y="24" width="2" height="5" fill="#B87B52" />

      {/* Nose */}
      <rect x="31" y="26" width="2" height="5" fill="#B87B52" />
      <rect x="31" y="30" width="4" height="1" fill="#9E613B" />

      {/* Energetic Smile */}
      <rect x="27" y="32" width="10" height="2" fill="#171A21" />
      <rect x="28" y="32" width="8" height="1" fill="#FFFFFF" /> {/* Teeth */}
      <rect x="29" y="33" width="6" height="1" fill="#F05A3C" /> {/* Tongue */}

      {/* Eyes */}
      {/* Left Eye */}
      <rect x="23" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="24" y="24" width="2" height="3" fill="#171A21" />
      <rect x="25" y="24" width="1" height="1" fill="#FFFFFF" />
      {/* Right Eye */}
      <rect x="36" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="37" y="24" width="2" height="3" fill="#171A21" />
      <rect x="38" y="24" width="1" height="1" fill="#FFFFFF" />

      {/* Expressive Eyebrows */}
      <rect x="22" y="21" width="6" height="2" fill="#2C1E16" />
      <rect x="36" y="20" width="6" height="2" fill="#2C1E16" />

      {/* Espresso Hair peeking out under beanie */}
      <rect x="18" y="19" width="4" height="3" fill="#2C1E16" />
      <rect x="42" y="19" width="4" height="3" fill="#2C1E16" />
      <rect x="26" y="19" width="3" height="2" fill="#2C1E16" />

      {/* --- CORAL KNIT BEANIE (#F05A3C) --- */}
      {/* Folded Brim */}
      <rect x="16" y="14" width="32" height="6" fill="#F05A3C" />
      <rect x="18" y="13" width="28" height="2" fill="#F05A3C" />

      {/* Ribbed Knit Texture Lines */}
      <rect x="18" y="14" width="1" height="6" fill="#C44127" />
      <rect x="22" y="14" width="1" height="6" fill="#C44127" />
      <rect x="26" y="14" width="1" height="6" fill="#C44127" />
      <rect x="30" y="14" width="1" height="6" fill="#C44127" />
      <rect x="34" y="14" width="1" height="6" fill="#C44127" />
      <rect x="38" y="14" width="1" height="6" fill="#C44127" />
      <rect x="42" y="14" width="1" height="6" fill="#C44127" />
      <rect x="46" y="14" width="1" height="6" fill="#C44127" />

      {/* Beanie Crown Dome */}
      <rect x="20" y="8" width="24" height="6" fill="#F05A3C" />
      <rect x="24" y="5" width="16" height="4" fill="#F05A3C" />
      <rect x="28" y="4" width="8" height="2" fill="#F05A3C" />

      {/* Beanie Top Highlights (#FF8269) */}
      <rect x="22" y="8" width="8" height="2" fill="#FF8269" />
      <rect x="26" y="5" width="6" height="2" fill="#FF8269" />

      {/* Beanie Shadow (#C44127) */}
      <rect x="38" y="8" width="6" height="5" fill="#C44127" />
      <rect x="42" y="11" width="4" height="3" fill="#C44127" />
    </svg>
  );
}

import React from 'react';

export function RunnerSvg({ className }: { className?: string }) {
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
      {/* Athletic Track Jacket Body (Navy #202B3C) */}
      <rect x="14" y="44" width="36" height="16" fill="#202B3C" />
      <rect x="12" y="48" width="40" height="12" fill="#202B3C" />
      <rect x="10" y="52" width="44" height="8" fill="#202B3C" />

      {/* White Sport Shoulder Stripes (#F7F5F0) */}
      <rect x="12" y="46" width="3" height="18" fill="#F7F5F0" />
      <rect x="49" y="46" width="3" height="18" fill="#F7F5F0" />
      <rect x="16" y="48" width="2" height="16" fill="#F7F5F0" />
      <rect x="46" y="48" width="2" height="16" fill="#F7F5F0" />

      {/* High Athletic Zip Collar */}
      <rect x="24" y="38" width="16" height="10" fill="#202B3C" />
      <rect x="22" y="40" width="20" height="8" fill="#202B3C" />

      {/* Coral Center Zipper & Ring (#F05A3C & Gold #FFB547) */}
      <rect x="31" y="38" width="2" height="18" fill="#F05A3C" />
      <rect x="30" y="40" width="4" height="2" fill="#FFB547" /> {/* Zip Pull Tab */}
      <rect x="31" y="42" width="2" height="2" fill="#171A21" />

      {/* Collar Inner Trim */}
      <rect x="26" y="38" width="4" height="4" fill="#F05A3C" />
      <rect x="34" y="38" width="4" height="4" fill="#F05A3C" />

      {/* --- NECK & JAW --- */}
      <rect x="26" y="34" width="12" height="6" fill="#8D5338" />
      <rect x="28" y="34" width="8" height="4" fill="#B87B52" />

      {/* --- FACE BASE --- */}
      {/* Golden Rich Skin (#B87B52) */}
      <rect x="20" y="16" width="24" height="20" fill="#B87B52" />
      <rect x="18" y="20" width="28" height="12" fill="#B87B52" />

      {/* Chiseled Jawline */}
      <rect x="22" y="34" width="20" height="3" fill="#B87B52" />
      <rect x="24" y="36" width="16" height="2" fill="#B87B52" />
      <rect x="26" y="37" width="12" height="1" fill="#8D5338" />

      {/* Jaw & Cheek Shadows */}
      <rect x="18" y="26" width="2" height="6" fill="#8D5338" />
      <rect x="44" y="22" width="2" height="10" fill="#8D5338" />
      <rect x="42" y="30" width="2" height="4" fill="#8D5338" />

      {/* Sweat Drop / Athletic Detail (Tiny 1px pixel highlight on temple) */}
      <rect x="20" y="22" width="1" height="2" fill="#A5F3FC" opacity="0.8" />

      {/* Ears */}
      <rect x="16" y="24" width="2" height="5" fill="#8D5338" />
      <rect x="17" y="25" width="1" height="3" fill="#B87B52" />
      <rect x="46" y="24" width="2" height="5" fill="#8D5338" />

      {/* Nose */}
      <rect x="31" y="26" width="2" height="5" fill="#8D5338" />
      <rect x="31" y="30" width="4" height="1" fill="#703C26" />

      {/* Focused Determined Mouth */}
      <rect x="28" y="33" width="8" height="1" fill="#171A21" />
      <rect x="29" y="32" width="6" height="1" fill="#B87B52" />

      {/* Eyes */}
      {/* Left Eye */}
      <rect x="23" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="25" y="24" width="2" height="3" fill="#171A21" />
      <rect x="26" y="24" width="1" height="1" fill="#FFFFFF" />
      {/* Right Eye */}
      <rect x="36" y="24" width="5" height="3" fill="#FFFFFF" />
      <rect x="37" y="24" width="2" height="3" fill="#171A21" />
      <rect x="38" y="24" width="1" height="1" fill="#FFFFFF" />

      {/* Sharp Athletic Eyebrows */}
      <rect x="22" y="21" width="6" height="2" fill="#171A21" />
      <rect x="36" y="21" width="6" height="2" fill="#171A21" />

      {/* --- ATHLETIC GOLD HEADBAND (#FFB547) --- */}
      <rect x="17" y="17" width="30" height="4" fill="#FFB547" />
      <rect x="19" y="18" width="26" height="2" fill="#F05A3C" /> {/* Coral Center Stripe */}
      <rect x="28" y="18" width="8" height="2" fill="#FFB547" /> {/* Kriya Emblem Notch */}

      {/* --- SHORT SLEEK HAIR (#171A21 Jet Black) --- */}
      <rect x="18" y="9" width="28" height="8" fill="#171A21" />
      <rect x="16" y="11" width="32" height="6" fill="#171A21" />
      <rect x="22" y="7" width="20" height="3" fill="#171A21" />

      {/* Hair Highlights (#374151) */}
      <rect x="24" y="8" width="8" height="2" fill="#374151" />
      <rect x="20" y="10" width="10" height="2" fill="#374151" />

      {/* Hair peeking below headband */}
      <rect x="17" y="21" width="3" height="3" fill="#171A21" />
      <rect x="44" y="21" width="3" height="3" fill="#171A21" />
    </svg>
  );
}

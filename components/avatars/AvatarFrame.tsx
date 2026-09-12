import React from 'react';
import { cn } from '../../lib/utils/cn';
import { AvatarFrameProps, AvatarFrameVariant } from './avatarTypes';

export function AvatarFrame({
  variant = 'default',
  size = 64,
  className,
  children,
}: AvatarFrameProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center shrink-0 select-none group',
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Frame Graphic Overlay SVG */}
      <svg
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      >
        {variant === 'default' && (
          <g>
            {/* Chamfered Pixel Border */}
            <rect x="4" y="8" width="64" height="56" fill="none" stroke="#DFDDD2" strokeWidth="2" />
            <rect x="8" y="4" width="56" height="64" fill="none" stroke="#DFDDD2" strokeWidth="2" />
            {/* Corner Accent Pixels */}
            <rect x="4" y="4" width="4" height="4" fill="#20231F" />
            <rect x="64" y="4" width="4" height="4" fill="#20231F" />
            <rect x="4" y="64" width="4" height="4" fill="#20231F" />
            <rect x="64" y="64" width="4" height="4" fill="#20231F" />
            <rect x="8" y="8" width="2" height="2" fill="#DFDDD2" />
            <rect x="62" y="8" width="2" height="2" fill="#DFDDD2" />
            <rect x="8" y="62" width="2" height="2" fill="#DFDDD2" />
            <rect x="62" y="62" width="2" height="2" fill="#DFDDD2" />
          </g>
        )}

        {variant === 'coral' && (
          <g>
            {/* Outer Terracotta Pixel Border */}
            <rect x="4" y="8" width="64" height="56" fill="none" stroke="#C85A3D" strokeWidth="2" />
            <rect x="8" y="4" width="56" height="64" fill="none" stroke="#C85A3D" strokeWidth="2" />
            {/* Corner Notch Blocks */}
            <rect x="2" y="2" width="8" height="8" fill="#C85A3D" />
            <rect x="62" y="2" width="8" height="8" fill="#C85A3D" />
            <rect x="2" y="62" width="8" height="8" fill="#C85A3D" />
            <rect x="62" y="62" width="8" height="8" fill="#C85A3D" />
            {/* Inner Highlights */}
            <rect x="4" y="4" width="4" height="4" fill="#E87A5F" />
            <rect x="64" y="4" width="4" height="4" fill="#E87A5F" />
            <rect x="4" y="64" width="4" height="4" fill="#E87A5F" />
            <rect x="64" y="64" width="4" height="4" fill="#E87A5F" />
            {/* Mid Edge Studs */}
            <rect x="34" y="2" width="4" height="2" fill="#C85A3D" />
            <rect x="34" y="68" width="4" height="2" fill="#C85A3D" />
          </g>
        )}

        {variant === 'gold' && (
          <g>
            {/* Gold Tier Double Border */}
            <rect x="4" y="8" width="64" height="56" fill="none" stroke="#D9A441" strokeWidth="2" />
            <rect x="8" y="4" width="56" height="64" fill="none" stroke="#D9A441" strokeWidth="2" />
            {/* Inner Gold Inset */}
            <rect x="10" y="10" width="52" height="52" fill="none" stroke="#F2DEB6" strokeWidth="1" opacity="0.6" />
            {/* Corner Jewels / Studs */}
            <rect x="4" y="4" width="6" height="6" fill="#D9A441" />
            <rect x="62" y="4" width="6" height="6" fill="#D9A441" />
            <rect x="4" y="62" width="6" height="6" fill="#D9A441" />
            <rect x="62" y="62" width="6" height="6" fill="#D9A441" />
            <rect x="5" y="5" width="2" height="2" fill="#FFFDF7" />
            <rect x="63" y="5" width="2" height="2" fill="#FFFDF7" />
            <rect x="5" y="63" width="2" height="2" fill="#FFFDF7" />
            <rect x="63" y="63" width="2" height="2" fill="#FFFDF7" />
          </g>
        )}

        {variant === 'navy' && (
          <g>
            {/* Dusty Blue-Gray Tech Frame */}
            <rect x="4" y="8" width="64" height="56" fill="none" stroke="#344653" strokeWidth="3" />
            <rect x="8" y="4" width="56" height="64" fill="none" stroke="#344653" strokeWidth="3" />
            {/* Tech Corner Crosses */}
            <path d="M4 12V4H12M60 4H68V12M68 60V68H60M12 68H4V60" stroke="#4C6275" strokeWidth="2" />
            <rect x="34" y="4" width="4" height="4" fill="#344653" />
            <rect x="34" y="64" width="4" height="4" fill="#344653" />
            <rect x="4" y="34" width="4" height="4" fill="#344653" />
            <rect x="64" y="34" width="4" height="4" fill="#344653" />
          </g>
        )}

        {variant === 'achievement' && (
          <g>
            {/* Legendary Sage & Gold Frame */}
            <rect x="4" y="8" width="64" height="56" fill="none" stroke="#668F72" strokeWidth="3" />
            <rect x="8" y="4" width="56" height="64" fill="none" stroke="#668F72" strokeWidth="3" />
            {/* Corner Gold Trophies */}
            <rect x="2" y="2" width="8" height="8" fill="#D9A441" />
            <rect x="62" y="2" width="8" height="8" fill="#D9A441" />
            <rect x="2" y="62" width="8" height="8" fill="#D9A441" />
            <rect x="62" y="62" width="8" height="8" fill="#D9A441" />
            <rect x="4" y="4" width="4" height="4" fill="#668F72" />
            <rect x="64" y="4" width="4" height="4" fill="#668F72" />
            <rect x="4" y="64" width="4" height="4" fill="#668F72" />
            <rect x="64" y="64" width="4" height="4" fill="#668F72" />
          </g>
        )}

        {variant === 'seasonal' && (
          <g>
            {/* Cozy Retro Seasonal Frame */}
            <rect x="4" y="8" width="64" height="56" fill="none" stroke="#D9A441" strokeWidth="2" />
            <rect x="8" y="4" width="56" height="64" fill="none" stroke="#D9A441" strokeWidth="2" />
            {/* Pixel Corner Stars */}
            {/* Top Left Star */}
            <rect x="4" y="2" width="2" height="6" fill="#C85A3D" />
            <rect x="2" y="4" width="6" height="2" fill="#C85A3D" />
            {/* Top Right Star */}
            <rect x="66" y="2" width="2" height="6" fill="#C85A3D" />
            <rect x="64" y="4" width="6" height="2" fill="#C85A3D" />
            {/* Bottom Left Star */}
            <rect x="4" y="64" width="2" height="6" fill="#C85A3D" />
            <rect x="2" y="66" width="6" height="2" fill="#C85A3D" />
            {/* Bottom Right Star */}
            <rect x="66" y="64" width="2" height="6" fill="#C85A3D" />
            <rect x="64" y="66" width="6" height="2" fill="#C85A3D" />
          </g>
        )}
      </svg>

      {/* Content Container (Character SVG) */}
      <div className="relative w-full h-full p-[6%] overflow-hidden flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

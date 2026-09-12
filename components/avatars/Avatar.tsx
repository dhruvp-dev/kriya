import React from 'react';
import { cn } from '../../lib/utils/cn';
import { AvatarProps } from './avatarTypes';
import { AVATAR_COMPONENTS } from './avatars';
import { AvatarFrame } from './AvatarFrame';

export function Avatar({
  variant = 'architect',
  size = 64,
  frame = 'default',
  showFrame = true,
  className,
}: AvatarProps) {
  const AvatarSvgComponent = AVATAR_COMPONENTS[variant] || AVATAR_COMPONENTS.architect;

  const content = (
    <div
      role="img"
      aria-label={`KRIYA Avatar: ${variant}`}
      className={cn(
        'relative flex items-center justify-center bg-[#171A21] overflow-hidden select-none shrink-0 rounded-lg shadow-sm',
        className
      )}
      style={{ width: size, height: size }}
    >
      <AvatarSvgComponent className="w-full h-full [image-rendering:pixelated] [image-rendering:crisp-edges]" />
    </div>
  );

  if (showFrame && frame) {
    return (
      <AvatarFrame variant={frame} size={size} className={className}>
        <AvatarSvgComponent className="w-full h-full [image-rendering:pixelated] [image-rendering:crisp-edges]" />
      </AvatarFrame>
    );
  }

  return content;
}

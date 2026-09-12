import React from 'react';
import { cn } from '../../lib/utils/cn';
import { AvatarProps } from './avatarTypes';
import { BLOB_AVATAR_COMPONENTS } from './blob';
import { AVATAR_COMPONENTS } from './avatars';
import { AvatarFrame } from './AvatarFrame';

export function Avatar({
  variant = 'architect',
  size = 64,
  system = 'blob',
  frame = 'default',
  showFrame = false,
  className,
}: AvatarProps) {
  const isBlob = system === 'blob';
  const SvgComponent = isBlob
    ? BLOB_AVATAR_COMPONENTS[variant] || BLOB_AVATAR_COMPONENTS.architect
    : AVATAR_COMPONENTS[variant] || AVATAR_COMPONENTS.architect;

  const content = (
    <div
      role="img"
      aria-label={`KRIYA Avatar: ${variant} (${system})`}
      className={cn(
        'relative flex items-center justify-center overflow-hidden select-none shrink-0 transition-transform',
        isBlob
          ? 'rounded-2xl bg-[#F7F7F8] border border-[#E6E6E8]/80 shadow-2xs hover:scale-[1.02]'
          : 'rounded-lg bg-[#171A21] border border-[#2D3748] shadow-sm',
        className
      )}
      style={{ width: size, height: size }}
    >
      <SvgComponent
        className={cn(
          'w-full h-full p-1',
          !isBlob && '[image-rendering:pixelated] [image-rendering:crisp-edges]'
        )}
      />
    </div>
  );

  if (showFrame && frame && frame !== 'default') {
    return (
      <AvatarFrame variant={frame} size={size} className={className}>
        <SvgComponent
          className={cn(
            'w-full h-full',
            !isBlob && '[image-rendering:pixelated] [image-rendering:crisp-edges]'
          )}
        />
      </AvatarFrame>
    );
  }

  return content;
}

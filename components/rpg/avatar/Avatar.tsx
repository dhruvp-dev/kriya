'use client';

import React from 'react';
import { Avatar as SvgAvatar, AvatarVariant, AvatarFrameVariant } from '../../avatars';
import { AvatarConfig } from '../../../types/avatar.types';

export interface AvatarProps {
  config?: AvatarConfig;
  variant?: AvatarVariant;
  frame?: AvatarFrameVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  animate?: boolean;
}

const SIZE_MAP: Record<string, number> = {
  sm: 40,
  md: 64,
  lg: 96,
  xl: 128,
};

const BASE_MODEL_MAP: Record<string, AvatarVariant> = {
  warrior: 'architect',
  mage: 'scholar',
  rogue: 'maker',
  cleric: 'builder',
  bard: 'creator',
  architect: 'architect',
  scholar: 'scholar',
  maker: 'maker',
  runner: 'runner',
  creator: 'creator',
  builder: 'builder',
  explorer: 'explorer',
  strategist: 'strategist',
};

export function Avatar({
  config,
  variant,
  frame = 'gold',
  size = 'md',
  className,
}: AvatarProps) {
  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || 64;
  
  const activeVariant: AvatarVariant =
    variant ||
    (config?.baseModel && BASE_MODEL_MAP[config.baseModel]) ||
    'architect';

  return (
    <SvgAvatar
      variant={activeVariant}
      size={pixelSize}
      frame={frame}
      className={className}
    />
  );
}

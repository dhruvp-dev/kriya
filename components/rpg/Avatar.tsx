'use client';

import React from 'react';
import { AvatarConfig } from '../../types/avatar.types';
import { Avatar3D } from './avatar3d/Avatar3D';

export interface AvatarProps {
  config?: AvatarConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  autoRotate?: boolean;
}

export function Avatar({ config, size = 'md', className, autoRotate }: AvatarProps) {
  return <Avatar3D config={config} size={size} className={className} autoRotate={autoRotate} />;
}

export { Avatar3D } from './avatar3d/Avatar3D';
export { AvatarChip } from './avatar3d/AvatarChip';
export { AvatarCustomizer } from './avatar3d/AvatarCustomizer';

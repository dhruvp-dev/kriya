'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '../../../lib/utils/cn';
import { AvatarConfig, DEFAULT_AVATAR_CONFIG } from '../../../types/avatar.types';

// Dynamically import Canvas and Scene to ensure zero Three.js bundle cost on non-3D pages (SRS §24)
const CanvasComponent = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

const Avatar3DScene = dynamic(
  () => import('./Avatar3DScene'),
  { ssr: false }
);

export interface Avatar3DProps {
  config?: AvatarConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  autoRotate?: boolean;
}

export function Avatar3D({
  config = DEFAULT_AVATAR_CONFIG,
  size = 'md',
  className,
  autoRotate = true,
}: Avatar3DProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-16 h-16 rounded-2xl',
    lg: 'w-24 h-24 rounded-3xl',
    xl: 'w-36 h-36 rounded-3xl',
  };

  const cameraFov = {
    sm: 45,
    md: 40,
    lg: 38,
    xl: 35,
  };

  return (
    <div
      role="img"
      aria-label={`3D Avatar model: ${config.baseModel || 'warrior'}`}
      className={cn(
        'relative flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-700/60 overflow-hidden shadow-xl shrink-0 select-none',
        sizeClasses[size],
        className
      )}
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-slate-900 animate-pulse">
            <div
              className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: config.tint || '#6366f1', borderTopColor: 'transparent' }}
            />
          </div>
        }
      >
        <CanvasComponent
          camera={{ position: [0, 0.5, 3.2], fov: cameraFov[size] }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true }}
        >
          <Avatar3DScene config={config} autoRotate={autoRotate} />
        </CanvasComponent>
      </Suspense>
    </div>
  );
}

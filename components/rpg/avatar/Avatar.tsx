'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils/cn';
import { AvatarConfig, DEFAULT_AVATAR_CONFIG } from '../../../types/avatar.types';
import {
  BASE_SPRITES,
  HAT_SPRITES,
  WEAPON_SPRITES,
  BACK_SPRITES,
  DEFAULT_PALETTES,
} from './sprite-data';

export interface AvatarProps {
  config?: AvatarConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

// Convert hex color to slightly darker hex for shadow pixels (index 3)
function getDarkenedTint(hex: string): string {
  if (!hex || !hex.startsWith('#')) return '#4338ca';
  const cleanHex = hex.replace('#', '');
  let r = 0, g = 0, b = 0;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }
  // Darken RGB by 30%
  r = Math.max(0, Math.floor(r * 0.7));
  g = Math.max(0, Math.floor(g * 0.7));
  b = Math.max(0, Math.floor(b * 0.7));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function Avatar({
  config = DEFAULT_AVATAR_CONFIG,
  size = 'md',
  className,
  animate = true,
}: AvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-16 h-16 rounded-2xl',
    lg: 'w-24 h-24 rounded-3xl',
    xl: 'w-36 h-36 rounded-3xl',
  };

  const activeConfig = {
    baseModel: config?.baseModel || 'warrior',
    tint: config?.tint || '#6366f1',
    hat: config?.hat || 'none',
    weapon: config?.weapon || 'none',
    back: config?.back || 'none',
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear 32x32 canvas
    ctx.clearRect(0, 0, 32, 32);

    const primaryTint = activeConfig.tint;
    const darkTint = getDarkenedTint(primaryTint);

    const palette: Record<number, string> = {
      ...DEFAULT_PALETTES,
      2: primaryTint,
      3: darkTint,
    };

    // Helper to draw a 32x32 matrix onto canvas
    const drawGrid = (grid: number[][], offsetX = 0, offsetY = 0) => {
      for (let r = 0; r < 32; r++) {
        for (let c = 0; c < 32; c++) {
          const val = grid[r][c];
          if (val === 0) continue;
          const color = palette[val] || DEFAULT_PALETTES[val];
          if (color && color !== 'transparent') {
            const targetX = c + offsetX;
            const targetY = r + offsetY;
            if (targetX >= 0 && targetX < 32 && targetY >= 0 && targetY < 32) {
              ctx.fillStyle = color;
              ctx.fillRect(targetX, targetY, 1, 1);
            }
          }
        }
      }
    };

    // 1. Render Backpiece Layer (behind character)
    if (activeConfig.back !== 'none' && BACK_SPRITES[activeConfig.back]) {
      const backOverlay = BACK_SPRITES[activeConfig.back];
      drawGrid(backOverlay.grid, backOverlay.offsetX, backOverlay.offsetY);
    }

    // 2. Render Base Archetype Sprite
    const baseGrid = BASE_SPRITES[activeConfig.baseModel] || BASE_SPRITES.warrior;
    drawGrid(baseGrid);

    // 3. Render Headgear Overlay
    if (activeConfig.hat !== 'none' && HAT_SPRITES[activeConfig.hat]) {
      const hatOverlay = HAT_SPRITES[activeConfig.hat];
      drawGrid(hatOverlay.grid, hatOverlay.offsetX, hatOverlay.offsetY);
    }

    // 4. Render Weapon Overlay
    if (activeConfig.weapon !== 'none' && WEAPON_SPRITES[activeConfig.weapon]) {
      const weaponOverlay = WEAPON_SPRITES[activeConfig.weapon];
      drawGrid(weaponOverlay.grid, weaponOverlay.offsetX, weaponOverlay.offsetY);
    }
  }, [activeConfig.baseModel, activeConfig.tint, activeConfig.hat, activeConfig.weapon, activeConfig.back]);

  return (
    <div
      role="img"
      aria-label={`Pixel Art Avatar: ${activeConfig.baseModel}`}
      className={cn(
        'relative flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-700/60 overflow-hidden shadow-xl shrink-0 select-none',
        sizeClasses[size],
        animate && 'animate-pixel-bounce',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        width={32}
        height={32}
        className="w-full h-full [image-rendering:pixelated] [image-rendering:crisp-edges]"
      />
    </div>
  );
}

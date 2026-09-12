'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { AvatarConfig } from '../../../types/avatar.types';
import { MODEL_REGISTRY } from './models';
import { attachAccessories } from './accessories';

export interface Avatar3DSceneProps {
  config: AvatarConfig;
  autoRotate?: boolean;
}

export default function Avatar3DScene({ config, autoRotate = true }: Avatar3DSceneProps) {
  const avatarGroup = useMemo(() => {
    const builder = MODEL_REGISTRY[config.baseModel] || MODEL_REGISTRY.warrior;
    const group = builder(config.tint || '#6366f1');
    attachAccessories(group, config);
    // Center avatar vertically
    group.position.y = -0.7;
    return group;
  }, [config]);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-3, -2, -2]} intensity={0.4} />

      <primitive object={avatarGroup} />

      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

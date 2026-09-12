import * as THREE from 'three';
import { AvatarConfig } from '../../../../types/avatar.types';
import { createHatMesh } from './hats';
import { createWeaponMesh } from './weapons';
import { createBackMesh } from './backs';

export function attachAccessories(group: THREE.Group, config: AvatarConfig) {
  const hatMesh = createHatMesh(config.hat);
  if (hatMesh) group.add(hatMesh);

  const weaponMesh = createWeaponMesh(config.weapon);
  if (weaponMesh) group.add(weaponMesh);

  const backMesh = createBackMesh(config.back);
  if (backMesh) group.add(backMesh);
}

import * as THREE from 'three';
import { BackOption } from '../../../../types/avatar.types';

export function createBackMesh(back: BackOption): THREE.Group | null {
  if (back === 'none') return null;

  const group = new THREE.Group();

  if (back === 'cape_crimson') {
    const capeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#dc2626'), // Crimson red
      roughness: 0.7,
      side: THREE.DoubleSide,
    });

    const capeGeo = new THREE.BoxGeometry(0.85, 1.3, 0.05);
    const capeMesh = new THREE.Mesh(capeGeo, capeMat);
    capeMesh.position.set(0, 0.85, -0.42);
    capeMesh.rotation.x = 0.15; // Flowing back angle
    group.add(capeMesh);
  } else if (back === 'wings_feather') {
    const wingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'), // Golden wings
      metalness: 0.5,
      roughness: 0.3,
    });

    // Left Wing
    const leftWingGeo = new THREE.BoxGeometry(0.8, 0.6, 0.06);
    const leftWing = new THREE.Mesh(leftWingGeo, wingMat);
    leftWing.position.set(-0.6, 1.25, -0.38);
    leftWing.rotation.z = 0.35;
    leftWing.rotation.y = -0.2;
    group.add(leftWing);

    // Right Wing
    const rightWingGeo = new THREE.BoxGeometry(0.8, 0.6, 0.06);
    const rightWing = new THREE.Mesh(rightWingGeo, wingMat);
    rightWing.position.set(0.6, 1.25, -0.38);
    rightWing.rotation.z = -0.35;
    rightWing.rotation.y = 0.2;
    group.add(rightWing);
  }

  return group;
}

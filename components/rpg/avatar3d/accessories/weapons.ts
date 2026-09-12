import * as THREE from 'three';
import { WeaponOption } from '../../../../types/avatar.types';

export function createWeaponMesh(weapon: WeaponOption): THREE.Group | null {
  if (weapon === 'none') return null;

  const group = new THREE.Group();

  if (weapon === 'sword_01') {
    const bladeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e2e8f0'),
      metalness: 0.9,
      roughness: 0.1,
    });
    const hiltMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#b45309'),
      metalness: 0.5,
    });

    // Blade
    const bladeGeo = new THREE.BoxGeometry(0.1, 1.2, 0.04);
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.position.set(0.85, 1.0, 0.2);
    group.add(bladeMesh);

    // Crossguard
    const guardGeo = new THREE.BoxGeometry(0.35, 0.08, 0.08);
    const guardMesh = new THREE.Mesh(guardGeo, hiltMat);
    guardMesh.position.set(0.85, 0.45, 0.2);
    group.add(guardMesh);

    // Handle
    const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3);
    const handleMesh = new THREE.Mesh(handleGeo, hiltMat);
    handleMesh.position.set(0.85, 0.28, 0.2);
    group.add(handleMesh);
  } else if (weapon === 'staff_01') {
    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#78350f'),
      roughness: 0.8,
    });
    const orbMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38bdf8'),
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.6,
      roughness: 0.1,
    });

    // Staff Pole
    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.8);
    const poleMesh = new THREE.Mesh(poleGeo, woodMat);
    poleMesh.position.set(-0.8, 0.9, 0.1);
    group.add(poleMesh);

    // Crystal Orb Top
    const orbGeo = new THREE.OctahedronGeometry(0.22);
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    orbMesh.position.set(-0.8, 1.85, 0.1);
    group.add(orbMesh);
  } else if (weapon === 'dagger_01') {
    const bladeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#475569'),
      metalness: 0.8,
      roughness: 0.2,
    });
    const hiltMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0f172a'),
    });

    // Blade
    const bladeGeo = new THREE.BoxGeometry(0.08, 0.6, 0.03);
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.position.set(0.72, 0.65, 0.25);
    bladeMesh.rotation.z = -0.2;
    group.add(bladeMesh);

    // Guard
    const guardGeo = new THREE.BoxGeometry(0.25, 0.06, 0.06);
    const guardMesh = new THREE.Mesh(guardGeo, hiltMat);
    guardMesh.position.set(0.72, 0.38, 0.25);
    group.add(guardMesh);
  }

  return group;
}

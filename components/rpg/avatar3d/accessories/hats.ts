import * as THREE from 'three';
import { HatOption } from '../../../../types/avatar.types';

export function createHatMesh(hat: HatOption): THREE.Group | null {
  if (hat === 'none') return null;

  const group = new THREE.Group();

  if (hat === 'helmet_warrior') {
    const steelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#94a3b8'),
      metalness: 0.8,
      roughness: 0.2,
    });
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'),
      metalness: 0.9,
      roughness: 0.1,
    });

    const helmGeo = new THREE.BoxGeometry(0.78, 0.5, 0.78);
    const helmMesh = new THREE.Mesh(helmGeo, steelMat);
    helmMesh.position.y = 1.88;
    group.add(helmMesh);

    // Horn / Crest on top
    const crestGeo = new THREE.BoxGeometry(0.12, 0.35, 0.6);
    const crestMesh = new THREE.Mesh(crestGeo, goldTrimMat);
    crestMesh.position.set(0, 2.2, 0);
    group.add(crestMesh);
  } else if (hat === 'hood_mage') {
    const hatMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1e1b4b'), // Deep navy blue
      roughness: 0.7,
    });
    const starMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fde047'), // Yellow stars
      emissive: new THREE.Color('#ca8a04'),
      emissiveIntensity: 0.3,
    });

    // Pointed Hat Cone
    const coneGeo = new THREE.ConeGeometry(0.55, 1.1, 10);
    const coneMesh = new THREE.Mesh(coneGeo, hatMat);
    coneMesh.position.set(0, 2.35, -0.05);
    coneMesh.rotation.x = -0.15; // Tilted back slightly
    group.add(coneMesh);

    // Brim
    const brimGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.08, 12);
    const brimMesh = new THREE.Mesh(brimGeo, hatMat);
    brimMesh.position.set(0, 1.85, 0);
    group.add(brimMesh);

    // Tip star
    const starGeo = new THREE.OctahedronGeometry(0.12);
    const starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.position.set(0, 2.9, -0.15);
    group.add(starMesh);
  } else if (hat === 'beret_bard') {
    const beretMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#be123c'), // Ruby red
      roughness: 0.6,
    });
    const featherMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f8fafc'), // White feather
      roughness: 0.4,
    });

    // Cap Body
    const capGeo = new THREE.CylinderGeometry(0.65, 0.5, 0.25, 10);
    const capMesh = new THREE.Mesh(capGeo, beretMat);
    capMesh.position.set(0.1, 1.92, 0);
    capMesh.rotation.z = -0.25; // Tilted sideways
    group.add(capMesh);

    // Feather
    const featherGeo = new THREE.ConeGeometry(0.1, 0.7, 5);
    const featherMesh = new THREE.Mesh(featherGeo, featherMat);
    featherMesh.position.set(-0.35, 2.2, 0.1);
    featherMesh.rotation.z = 0.6;
    group.add(featherMesh);
  }

  return group;
}

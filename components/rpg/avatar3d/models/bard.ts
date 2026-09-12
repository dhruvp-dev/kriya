import * as THREE from 'three';

export function createBardModel(tintHex: string): THREE.Group {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tintHex),
    roughness: 0.5,
  });
  const sashMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#a855f7'), // Purple sash
    roughness: 0.6,
  });
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#fbbf24'),
    metalness: 0.6,
    roughness: 0.3,
  });

  // Head
  const headGeo = new THREE.SphereGeometry(0.35, 12, 12);
  const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
  headMesh.position.y = 1.68;
  group.add(headMesh);

  // Torso (Slender jacket)
  const torsoGeo = new THREE.CylinderGeometry(0.4, 0.35, 0.9, 8);
  const torsoMesh = new THREE.Mesh(torsoGeo, bodyMaterial);
  torsoMesh.position.y = 0.95;
  group.add(torsoMesh);

  // Sash across torso
  const sashGeo = new THREE.BoxGeometry(0.48, 0.25, 0.48);
  const sashMesh = new THREE.Mesh(sashGeo, sashMaterial);
  sashMesh.position.y = 1.0;
  sashMesh.rotation.z = -0.3;
  group.add(sashMesh);

  // Fancy Cuff Arms
  const armGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.75, 8);
  const leftArm = new THREE.Mesh(armGeo, bodyMaterial);
  leftArm.position.set(-0.55, 0.85, 0);
  leftArm.rotation.z = 0.4;
  group.add(leftArm);

  const rightArm = new THREE.Mesh(armGeo, bodyMaterial);
  rightArm.position.set(0.55, 0.85, 0.1);
  rightArm.rotation.z = -0.4;
  group.add(rightArm);

  // Gold Cuffs
  const cuffGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.12, 8);
  const leftCuff = new THREE.Mesh(cuffGeo, goldMaterial);
  leftCuff.position.set(-0.7, 0.6, 0);
  group.add(leftCuff);

  const rightCuff = new THREE.Mesh(cuffGeo, goldMaterial);
  rightCuff.position.set(0.7, 0.6, 0.1);
  group.add(rightCuff);

  // Legs
  const legGeo = new THREE.CylinderGeometry(0.16, 0.14, 0.85, 8);
  const leftLeg = new THREE.Mesh(legGeo, sashMaterial);
  leftLeg.position.set(-0.2, -0.05, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, sashMaterial);
  rightLeg.position.set(0.2, -0.05, 0);
  group.add(rightLeg);

  return group;
}

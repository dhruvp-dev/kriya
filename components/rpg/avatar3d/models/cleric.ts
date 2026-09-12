import * as THREE from 'three';

export function createClericModel(tintHex: string): THREE.Group {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tintHex),
    roughness: 0.4,
    metalness: 0.2,
  });
  const silverMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cbd5e1'),
    metalness: 0.7,
    roughness: 0.3,
  });
  const clothMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f8fafc'),
    roughness: 0.8,
  });

  // Head
  const headGeo = new THREE.SphereGeometry(0.38, 12, 12);
  const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
  headMesh.position.y = 1.7;
  group.add(headMesh);

  // Halo / Crest
  const haloGeo = new THREE.TorusGeometry(0.42, 0.05, 8, 24);
  const haloMesh = new THREE.Mesh(haloGeo, silverMaterial);
  haloMesh.position.set(0, 2.15, -0.05);
  haloMesh.rotation.x = Math.PI / 2;
  group.add(haloMesh);

  // Torso
  const torsoGeo = new THREE.BoxGeometry(0.95, 1.0, 0.65);
  const torsoMesh = new THREE.Mesh(torsoGeo, bodyMaterial);
  torsoMesh.position.y = 0.95;
  group.add(torsoMesh);

  // Front Tabard
  const tabardGeo = new THREE.BoxGeometry(0.5, 1.3, 0.1);
  const tabardMesh = new THREE.Mesh(tabardGeo, clothMaterial);
  tabardMesh.position.set(0, 0.7, 0.33);
  group.add(tabardMesh);

  // Arms
  const armGeo = new THREE.BoxGeometry(0.32, 0.8, 0.32);
  const leftArm = new THREE.Mesh(armGeo, silverMaterial);
  leftArm.position.set(-0.68, 0.75, 0);
  group.add(leftArm);

  const rightArm = new THREE.Mesh(armGeo, silverMaterial);
  rightArm.position.set(0.68, 0.75, 0);
  group.add(rightArm);

  // Legs
  const legGeo = new THREE.BoxGeometry(0.38, 0.8, 0.4);
  const leftLeg = new THREE.Mesh(legGeo, bodyMaterial);
  leftLeg.position.set(-0.26, -0.15, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, bodyMaterial);
  rightLeg.position.set(0.26, -0.15, 0);
  group.add(rightLeg);

  return group;
}

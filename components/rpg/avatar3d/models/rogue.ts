import * as THREE from 'three';

export function createRogueModel(tintHex: string): THREE.Group {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tintHex),
    roughness: 0.5,
  });
  const leatherMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#334155'),
    roughness: 0.7,
  });
  const maskMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#090d16'),
    roughness: 0.9,
  });

  // Head
  const headGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
  const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
  headMesh.position.y = 1.65;
  group.add(headMesh);

  // Mask
  const maskGeo = new THREE.BoxGeometry(0.57, 0.25, 0.35);
  const maskMesh = new THREE.Mesh(maskGeo, maskMaterial);
  maskMesh.position.set(0, 1.58, 0.12);
  group.add(maskMesh);

  // Torso (Slim, tapered vest)
  const torsoGeo = new THREE.CylinderGeometry(0.42, 0.35, 0.95, 6);
  const torsoMesh = new THREE.Mesh(torsoGeo, bodyMaterial);
  torsoMesh.position.y = 0.9;
  group.add(torsoMesh);

  // Leather Harness / Vest
  const vestGeo = new THREE.BoxGeometry(0.88, 0.5, 0.55);
  const vestMesh = new THREE.Mesh(vestGeo, leatherMaterial);
  vestMesh.position.y = 1.05;
  group.add(vestMesh);

  // Arms (Slim, asymmetric)
  const armGeo = new THREE.BoxGeometry(0.25, 0.75, 0.25);
  const leftArm = new THREE.Mesh(armGeo, leatherMaterial);
  leftArm.position.set(-0.55, 0.8, 0);
  group.add(leftArm);

  const rightArm = new THREE.Mesh(armGeo, bodyMaterial);
  rightArm.position.set(0.55, 0.8, 0.1);
  rightArm.rotation.x = -0.3; // Ready stance
  group.add(rightArm);

  // Legs (Slim agile)
  const legGeo = new THREE.BoxGeometry(0.3, 0.85, 0.3);
  const leftLeg = new THREE.Mesh(legGeo, leatherMaterial);
  leftLeg.position.set(-0.22, -0.1, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, leatherMaterial);
  rightLeg.position.set(0.22, -0.1, 0.05);
  group.add(rightLeg);

  return group;
}

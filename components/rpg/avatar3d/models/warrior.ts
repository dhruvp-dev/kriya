import * as THREE from 'three';

export function createWarriorModel(tintHex: string): THREE.Group {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tintHex),
    roughness: 0.4,
    metalness: 0.3,
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1e293b'),
    roughness: 0.7,
  });
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f59e0b'),
    metalness: 0.8,
    roughness: 0.2,
  });

  // Head
  const headGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
  const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
  headMesh.position.y = 1.65;
  group.add(headMesh);

  // Visor / Eyes
  const visorGeo = new THREE.BoxGeometry(0.5, 0.15, 0.1);
  const visorMesh = new THREE.Mesh(visorGeo, goldMaterial);
  visorMesh.position.set(0, 1.7, 0.32);
  group.add(visorMesh);

  // Torso (Heavy armored, wide)
  const torsoGeo = new THREE.BoxGeometry(1.1, 1.1, 0.7);
  const torsoMesh = new THREE.Mesh(torsoGeo, bodyMaterial);
  torsoMesh.position.y = 0.85;
  group.add(torsoMesh);

  // Belt / Plate
  const beltGeo = new THREE.BoxGeometry(1.15, 0.2, 0.75);
  const beltMesh = new THREE.Mesh(beltGeo, darkMaterial);
  beltMesh.position.y = 0.35;
  group.add(beltMesh);

  // Pauldrons (Shoulders)
  const pauldronGeo = new THREE.BoxGeometry(0.45, 0.45, 0.55);
  const leftPauldron = new THREE.Mesh(pauldronGeo, goldMaterial);
  leftPauldron.position.set(-0.75, 1.25, 0);
  group.add(leftPauldron);

  const rightPauldron = new THREE.Mesh(pauldronGeo, goldMaterial);
  rightPauldron.position.set(0.75, 1.25, 0);
  group.add(rightPauldron);

  // Arms
  const armGeo = new THREE.BoxGeometry(0.35, 0.8, 0.35);
  const leftArm = new THREE.Mesh(armGeo, bodyMaterial);
  leftArm.position.set(-0.75, 0.65, 0);
  group.add(leftArm);

  const rightArm = new THREE.Mesh(armGeo, bodyMaterial);
  rightArm.position.set(0.75, 0.65, 0);
  group.add(rightArm);

  // Legs
  const legGeo = new THREE.BoxGeometry(0.42, 0.8, 0.45);
  const leftLeg = new THREE.Mesh(legGeo, darkMaterial);
  leftLeg.position.set(-0.3, -0.15, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, darkMaterial);
  rightLeg.position.set(0.3, -0.15, 0);
  group.add(rightLeg);

  return group;
}

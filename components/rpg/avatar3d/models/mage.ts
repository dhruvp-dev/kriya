import * as THREE from 'three';

export function createMageModel(tintHex: string): THREE.Group {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tintHex),
    roughness: 0.6,
  });
  const accentMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#38bdf8'), // Sky blue glow accent
    roughness: 0.3,
    metalness: 0.2,
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0f172a'),
    roughness: 0.8,
  });

  // Head
  const headGeo = new THREE.SphereGeometry(0.35, 12, 12);
  const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
  headMesh.position.y = 1.75;
  group.add(headMesh);

  // Glow eyes
  const eyeGeo = new THREE.BoxGeometry(0.12, 0.08, 0.08);
  const leftEye = new THREE.Mesh(eyeGeo, accentMaterial);
  leftEye.position.set(-0.12, 1.78, 0.3);
  group.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, accentMaterial);
  rightEye.position.set(0.12, 1.78, 0.3);
  group.add(rightEye);

  // Upper Robe / Torso
  const torsoGeo = new THREE.CylinderGeometry(0.4, 0.55, 0.9, 8);
  const torsoMesh = new THREE.Mesh(torsoGeo, bodyMaterial);
  torsoMesh.position.y = 1.05;
  group.add(torsoMesh);

  // Lower Robe Skirt (Tall and flared)
  const skirtGeo = new THREE.CylinderGeometry(0.55, 0.85, 1.2, 8);
  const skirtMesh = new THREE.Mesh(skirtGeo, darkMaterial);
  skirtMesh.position.y = 0.1;
  group.add(skirtMesh);

  // Mantle / Collar
  const collarGeo = new THREE.CylinderGeometry(0.55, 0.45, 0.25, 8);
  const collarMesh = new THREE.Mesh(collarGeo, accentMaterial);
  collarMesh.position.y = 1.45;
  group.add(collarMesh);

  // Sleeves (Slightly flared)
  const sleeveGeo = new THREE.CylinderGeometry(0.18, 0.28, 0.8, 8);
  const leftSleeve = new THREE.Mesh(sleeveGeo, bodyMaterial);
  leftSleeve.position.set(-0.6, 0.95, 0);
  leftSleeve.rotation.z = 0.25;
  group.add(leftSleeve);

  const rightSleeve = new THREE.Mesh(sleeveGeo, bodyMaterial);
  rightSleeve.position.set(0.6, 0.95, 0);
  rightSleeve.rotation.z = -0.25;
  group.add(rightSleeve);

  return group;
}

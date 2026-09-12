import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface DigitalSculptureProps {
  isLowEnd?: boolean;
}

export const DigitalSculpture: React.FC<DigitalSculptureProps> = ({ isLowEnd = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const { pointer } = useThree();

  // Mathematical Torus Knot: Monolithic, continuous, organic silhouette
  const knotGeometry = useMemo(() => {
    // Tubular radius, p, q, radial segments
    // On mobile / low-end, 80 tubular / 18 radial segments preserves smooth curvature with ~60% fewer vertices
    const tubularSegments = isLowEnd ? 80 : 220;
    const radialSegments = isLowEnd ? 18 : 40;
    return new THREE.TorusKnotGeometry(2.1, 0.48, tubularSegments, radialSegments, 2, 3);
  }, [isLowEnd]);

  // Secondary orbital halo with delicate hairline wireframe
  const haloGeometry = useMemo(() => {
    return new THREE.TorusGeometry(3.5, 0.02, 16, isLowEnd ? 48 : 128);
  }, [isLowEnd]);

  // Inner monolithic core
  const coreGeometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(0.8, isLowEnd ? 1 : 2);
  }, [isLowEnd]);

  // Authored Materials: Premium Satin Ceramic / Porcelain in warm off-white (#F4F1EA)
  const sculptureMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F4F1EA'),
      roughness: 0.36,
      metalness: 0.14,
      flatShading: false,
    });
  }, []);

  const haloMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FF0000'),
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
  }, []);

  const coreMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D9D7D0'),
      roughness: 0.32,
      metalness: 0.22,
      wireframe: true,
    });
  }, []);

  // Smooth pointer target tracking
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.033);

    // Only do interactive pointer lerp on non-low-end or when pointer active
    if (!isLowEnd) {
      targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, pointer.y * 0.4, 0.05);
      targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, pointer.x * 0.5, 0.05);

      if (groupRef.current) {
        groupRef.current.rotation.x = targetRotation.current.x;
        groupRef.current.rotation.y = targetRotation.current.y;
      }

      if (lightRef.current) {
        lightRef.current.position.x = pointer.x * 4;
        lightRef.current.position.y = pointer.y * 4;
      }
    }

    if (groupRef.current) {
      // Floating ambient breathing motion
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.15;
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += safeDelta * 0.12;
      meshRef.current.rotation.y += safeDelta * 0.18;
      meshRef.current.rotation.z += safeDelta * 0.06;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x -= safeDelta * 0.08;
      outerRingRef.current.rotation.y += safeDelta * 0.1;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= safeDelta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      {/* Key Light: Soft warm-white light revealing dimensional curvature */}
      <pointLight
        ref={lightRef}
        position={[3, 3, 5]}
        intensity={1.5}
        color="#F4F1EA"
        distance={15}
      />
      {/* Studio Rim Light: Very restrained low-intensity RED grazing edges */}
      <spotLight
        position={[-6, 5, -2]}
        intensity={1.2}
        color="#FF0000"
        angle={0.65}
        penumbra={1}
      />
      {/* Fill Light: Soft neutral gray to preserve shadow gradients and topology */}
      <directionalLight
        position={[4, -4, 3]}
        intensity={0.45}
        color="#858C87"
      />

      {/* Main Digital Sculpture */}
      <mesh
        ref={meshRef}
        geometry={knotGeometry}
        material={sculptureMaterial}
        castShadow
        receiveShadow
      />

      {/* Outer Gyroscopic Halo */}
      <mesh
        ref={outerRingRef}
        geometry={haloGeometry}
        material={haloMaterial}
        rotation={[Math.PI / 4, 0, 0]}
      />

      {/* Inner Monolith Core */}
      <mesh
        ref={coreRef}
        geometry={coreGeometry}
        material={coreMaterial}
      />
    </group>
  );
};

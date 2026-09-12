import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AINetworkProps {
  particleCount?: number;
  isLowEnd?: boolean;
}

export const AINetworkSystem: React.FC<AINetworkProps> = ({ particleCount = 250, isLowEnd = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Reusable vector for camera target math (avoids frame allocations)
  const targetPos = useMemo(() => new THREE.Vector3(), []);

  // Generate particle positions
  const [positions, colors] = useMemo(() => {
    const actualCount = isLowEnd ? 100 : Math.min(particleCount, 300);
    const pos = new Float32Array(actualCount * 3);
    const col = new Float32Array(actualCount * 3);
    const colorCyan = new THREE.Color('#00F0FF');
    const colorPurple = new THREE.Color('#8A2BE2');

    for (let i = 0; i < actualCount; i++) {
      const radius = 3 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, [particleCount, isLowEnd]);

  // Orbiting Agent Nodes
  const agentCount = isLowEnd ? 4 : 8;
  const agentPositions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let i = 0; i < agentCount; i++) {
      const angle = (i / agentCount) * Math.PI * 2;
      const radius = 3.0;
      pos.push([Math.cos(angle) * radius, Math.sin(i) * 0.6, Math.sin(angle) * radius]);
    }
    return pos;
  }, [agentCount]);

  useFrame((state, delta) => {
    // Limit frame delta to prevent giant jumps
    const safeDelta = Math.min(delta, 0.033);

    if (groupRef.current) {
      groupRef.current.rotation.y += safeDelta * 0.15;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += safeDelta * 0.25;
      coreRef.current.rotation.z += safeDelta * 0.15;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= safeDelta * 0.04;
    }

    // Lightweight pointer lerp without allocating new Vector3
    const pointer = state.pointer;
    targetPos.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * 0.8, 0.05);
    targetPos.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.y * 0.8 + 0.4, 0.05);
    state.camera.position.x = targetPos.x;
    state.camera.position.y = targetPos.y;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      {/* Central AI Core */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.7} />
      </mesh>

      {/* Inner Glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 12, 12]} />
        <meshBasicMaterial color="#8A2BE2" transparent opacity={0.35} />
      </mesh>

      {/* Orbiting Agent Nodes */}
      {agentPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#00F0FF' : '#10B981'} />
          </mesh>
        </group>
      ))}

      {/* Particle Field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.5} sizeAttenuation />
      </points>
    </group>
  );
};

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingShapes() {
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octahedronRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = time * 0.2;
      icosahedronRef.current.rotation.y = time * 0.3;
      icosahedronRef.current.position.y = Math.sin(time * 0.5) * 0.5;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.15;
      torusRef.current.rotation.z = time * 0.25;
      torusRef.current.position.y = Math.cos(time * 0.6) * 0.4;
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.y = time * 0.25;
      octahedronRef.current.rotation.z = time * 0.15;
      octahedronRef.current.position.y = Math.sin(time * 0.4) * 0.6;
    }
  });

  return (
    <group>
      {/* Icosahedron */}
      <mesh ref={icosahedronRef} position={[-3, 0, -2]}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#4fa8d8"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Torus */}
      <mesh ref={torusRef} position={[3, 0, -1]}>
        <torusGeometry args={[0.6, 0.25, 16, 100]} />
        <meshStandardMaterial
          color="#1a8a6e"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Octahedron */}
      <mesh ref={octahedronRef} position={[0, -2, -3]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#5fb8e8"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#4fa8d8" />
      <pointLight position={[-5, -5, 5]} intensity={0.6} color="#1a8a6e" />
    </group>
  );
}


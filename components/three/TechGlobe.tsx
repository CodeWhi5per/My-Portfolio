'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skills } from '@/data/skills';

export default function TechGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const [HtmlComponent, setHtmlComponent] = useState<any>(null);

  useEffect(() => {
    // Load Html component only on client side
    import('@react-three/drei').then((mod) => {
      setHtmlComponent(() => mod.Html);
    });
  }, []);

  useFrame(() => {
    if (groupRef.current && !isDragging.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Calculate spherical positions for skills
  const radius = 3;
  const skillPositions = skills.map((_, index) => {
    const phi = Math.acos(-1 + (2 * index) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;

    return {
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
    };
  });

  if (!HtmlComponent) {
    return null; // Don't render until Html is loaded
  }

  return (
    <group
      ref={groupRef}
      onPointerDown={() => (isDragging.current = true)}
      onPointerUp={() => (isDragging.current = false)}
      onPointerLeave={() => (isDragging.current = false)}
    >
      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#0a1a2a"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Skill labels */}
      {skills.map((skill, index) => (
        <HtmlComponent
          key={skill.name}
          position={[
            skillPositions[index].x,
            skillPositions[index].y,
            skillPositions[index].z,
          ]}
          center
          distanceFactor={6}
        >
          <div
            className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{
              background: 'rgba(10, 26, 42, 0.9)',
              border: `1px solid ${skill.color}`,
              color: skill.color,
              boxShadow: `0 0 10px ${skill.color}40`,
            }}
          >
            {skill.name}
          </div>
        </HtmlComponent>
      ))}

      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}


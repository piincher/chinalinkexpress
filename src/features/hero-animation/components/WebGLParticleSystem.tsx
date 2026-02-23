/**
 * WebGL Particle System
 * 
 * Tier 3: High-performance WebGL particle animation using Three.js.
 * For high-end devices with GPU acceleration.
 * Part of the hero-animation feature.
 */

'use client';

import React, { useRef, useMemo, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsAnimationPlaying } from '../store/useAnimationStore';
import { usePageVisibility } from '../hooks';
import { TIER_CONFIG } from '../types';
import type { PerformanceTier } from '../types';

interface ParticleSystemProps {
  count: number;
  colors: string[];
}

function ParticleSystem({ count, colors }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport, size } = useThree();
  const isPlaying = useIsAnimationPlaying();

  // Create particle geometry and material
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random position in viewport
      pos[i3] = (Math.random() - 0.5) * viewport.width * 2;
      pos[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      pos[i3 + 2] = (Math.random() - 0.5) * 2;

      // Random velocity
      vel[i3] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 2] = 0;
    }

    return [pos, vel];
  }, [count, viewport]);

  // Create color attribute
  const colorArray = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const colorObj = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const colorHex = colors[Math.floor(Math.random() * colors.length)];
      colorObj.set(colorHex);
      cols[i3] = colorObj.r;
      cols[i3 + 1] = colorObj.g;
      cols[i3 + 2] = colorObj.b;
    }

    return cols;
  }, [count, colors]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / size.width) * 2 - 1,
        y: -(e.clientY / size.height) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current || !isPlaying) return;

    const geometry = meshRef.current.geometry;
    const posAttr = geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update position with velocity
      posAttr[i3] += velocities[i3];
      posAttr[i3 + 1] += velocities[i3 + 1];

      // Add subtle wave motion
      posAttr[i3 + 1] += Math.sin(time * 0.5 + posAttr[i3] * 0.5) * 0.002;

      // Mouse interaction
      const dx = mouseRef.current.x * viewport.width - posAttr[i3];
      const dy = mouseRef.current.y * viewport.height - posAttr[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3 && dist > 0) {
        const force = (3 - dist) / 3;
        posAttr[i3] -= (dx / dist) * force * 0.05;
        posAttr[i3 + 1] -= (dy / dist) * force * 0.05;
      }

      // Wrap around edges
      const margin = 0.5;
      if (posAttr[i3] < -viewport.width - margin) posAttr[i3] = viewport.width + margin;
      if (posAttr[i3] > viewport.width + margin) posAttr[i3] = -viewport.width - margin;
      if (posAttr[i3 + 1] < -viewport.height - margin) posAttr[i3 + 1] = viewport.height + margin;
      if (posAttr[i3 + 1] > viewport.height + margin) posAttr[i3 + 1] = -viewport.height - margin;
    }

    geometry.attributes.position.needsUpdate = true;

    // Rotate entire system slowly
    meshRef.current.rotation.z = time * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Route visualization as glowing curves
function RouteCurves() {
  const groupRef = useRef<THREE.Group>(null);
  const isPlaying = useIsAnimationPlaying();

  const curves = useMemo(() => {
    const curveData: { geometry: THREE.BufferGeometry; color: string }[] = [];
    
    // China to Africa routes
    const routes = [
      { start: new THREE.Vector3(8, 2, 0), end: new THREE.Vector3(-8, -2, 0), color: '#3fb0ff' },
      { start: new THREE.Vector3(7, 3, 0), end: new THREE.Vector3(-6, -3, 0), color: '#7fd0ff' },
      { start: new THREE.Vector3(8, 1, 0), end: new THREE.Vector3(-7, -1, 0), color: '#9fd3ff' },
      { start: new THREE.Vector3(8, 2, 0), end: new THREE.Vector3(-5, 0, 0), color: '#ff6b6b' },
    ];

    for (const route of routes) {
      const midPoint = new THREE.Vector3().lerpVectors(route.start, route.end, 0.5);
      midPoint.y += 2; // Arc height

      const curve = new THREE.QuadraticBezierCurve3(route.start, midPoint, route.end);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      curveData.push({ geometry, color: route.color });
    }

    return curveData;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || !isPlaying) return;

    // Animate opacity
    const time = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line;
      const material = line.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 2 + i) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {curves.map((curve, i) => (
        <primitive key={i} object={new THREE.Line(
          curve.geometry,
          new THREE.LineBasicMaterial({
            color: curve.color,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
          })
        )} />
      ))}
    </group>
  );
}

interface WebGLParticleSystemProps {
  tier: PerformanceTier;
  className?: string;
}

// Loading fallback for Suspense
function WebGLFallback() {
  return null;
}

export function WebGLParticleSystem({ tier, className = '' }: WebGLParticleSystemProps) {
  const config = TIER_CONFIG[tier];
  const isPageVisible = usePageVisibility();
  const [dpr, setDpr] = useState(1); // Default to 1 for SSR

  // Set DPR on client side only
  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 2));
  }, []);

  if (tier !== 'high' || !config.enableGlow) {
    return null;
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={dpr}
        frameloop={isPageVisible ? 'always' : 'never'}
      >
        <Suspense fallback={<WebGLFallback />}>
          <ambientLight intensity={0.5} />
          <ParticleSystem count={Math.min(config.particleCount, 2000)} colors={config.particleColors} />
          <RouteCurves />
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * Morphing Constellations
 * 
 * Mind-blowing particle system that morphs between different shapes:
 * globe → ship → plane → truck → package → globe
 * Creates an endlessly evolving visual narrative.
 * Part of the hero-animation feature.
 */

'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsAnimationPlaying } from '../store/useAnimationStore';
import { usePageVisibility } from '../hooks';
import type { PerformanceTier } from '../types';

interface MorphingConstellationsProps {
  tier: PerformanceTier;
  className?: string;
}

type ShapeType = 'globe' | 'ship' | 'plane' | 'truck' | 'package';

// Generate target positions for each shape
function generateShapePositions(shape: ShapeType, count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  
  switch (shape) {
    case 'globe':
      // Sphere distribution
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const r = 2;
        positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
        positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      break;
      
    case 'ship':
      // Ship silhouette
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 2;
        
        // Hull
        if (i < count * 0.6) {
          const x = (t * 2 - 1) * 3;
          const y = Math.abs(Math.sin(angle * 3)) * 0.5 - 0.5;
          const z = (Math.random() - 0.5) * 0.5;
          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        }
        // Container stacks
        else if (i < count * 0.85) {
          const stackIdx = Math.floor((i - count * 0.6) / (count * 0.25 * 0.33));
          const x = -1 + stackIdx * 1;
          const y = 0.5 + ((i % 10) / 10) * 1.5;
          const z = (Math.random() - 0.5) * 0.8;
          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        }
        // Smoke particles
        else {
          positions[i * 3] = 2 + Math.random() * 0.5;
          positions[i * 3 + 1] = 1.5 + Math.random() * 1;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }
      break;
      
    case 'plane':
      // Airplane silhouette
      for (let i = 0; i < count; i++) {
        const t = i / count;
        
        // Fuselage
        if (i < count * 0.4) {
          positions[i * 3] = (t * 2.5 - 1.25) * 2;
          positions[i * 3 + 1] = Math.sin(t * Math.PI) * 0.2;
          positions[i * 3 + 2] = 0;
        }
        // Wings
        else if (i < count * 0.7) {
          const wingT = (i - count * 0.4) / (count * 0.3);
          const side = wingT < 0.5 ? -1 : 1;
          positions[i * 3] = wingT < 0.5 ? -0.3 : 0.3;
          positions[i * 3 + 1] = -0.2 + Math.abs(wingT - 0.5) * 2 * side * -0.5;
          positions[i * 3 + 2] = 0;
        }
        // Tail
        else if (i < count * 0.9) {
          const tailT = (i - count * 0.7) / (count * 0.2);
          positions[i * 3] = -1.8;
          positions[i * 3 + 1] = tailT * 1 - 0.3;
          positions[i * 3 + 2] = 0;
        }
        // Trail particles
        else {
          positions[i * 3] = -2 - Math.random() * 2;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }
      break;
      
    case 'truck':
      // Truck silhouette
      for (let i = 0; i < count; i++) {
        const t = i / count;
        
        // Cargo container
        if (i < count * 0.5) {
          const x = (t * 2 - 1) * 1.5;
          const y = ((i % 20) / 20) * 1.5 - 0.5;
          const z = (Math.random() - 0.5) * 1;
          positions[i * 3] = x - 0.5;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        }
        // Cab
        else if (i < count * 0.75) {
          const cabT = (i - count * 0.5) / (count * 0.25);
          positions[i * 3] = 1 + cabT * 0.8;
          positions[i * 3 + 1] = cabT * 1.2 - 0.5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
        }
        // Wheels
        else {
          const wheelIdx = Math.floor((i - count * 0.75) / (count * 0.25 * 0.5));
          const angle = Math.random() * Math.PI * 2;
          const r = 0.4;
          const wheelX = wheelIdx === 0 ? -0.5 : 1.2;
          positions[i * 3] = wheelX + Math.cos(angle) * r;
          positions[i * 3 + 1] = -0.8 + Math.sin(angle) * r;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        }
      }
      break;
      
    case 'package':
      // Box/Package
      for (let i = 0; i < count; i++) {
        const face = Math.floor(Math.random() * 6);
        const u = Math.random() * 2 - 1;
        const v = Math.random() * 2 - 1;
        
        switch (face) {
          case 0: // Front
            positions[i * 3] = u;
            positions[i * 3 + 1] = v;
            positions[i * 3 + 2] = 1;
            break;
          case 1: // Back
            positions[i * 3] = u;
            positions[i * 3 + 1] = v;
            positions[i * 3 + 2] = -1;
            break;
          case 2: // Left
            positions[i * 3] = -1;
            positions[i * 3 + 1] = u;
            positions[i * 3 + 2] = v;
            break;
          case 3: // Right
            positions[i * 3] = 1;
            positions[i * 3 + 1] = u;
            positions[i * 3 + 2] = v;
            break;
          case 4: // Top
            positions[i * 3] = u;
            positions[i * 3 + 1] = 1;
            positions[i * 3 + 2] = v;
            break;
          case 5: // Bottom
            positions[i * 3] = u;
            positions[i * 3 + 1] = -1;
            positions[i * 3 + 2] = v;
            break;
        }
      }
      break;
  }
  
  return positions;
}

function MorphingParticles({ tier }: { tier: PerformanceTier }) {
  const pointsRef = useRef<THREE.Points>(null);
  const isPlaying = useIsAnimationPlaying();
  
  const particleCount = tier === 'high' ? 1500 : tier === 'medium' ? 800 : 400;
  
  // Define shape sequence
  const shapes: ShapeType[] = ['globe', 'ship', 'plane', 'truck', 'package', 'globe'];
  
  // Generate target positions for all shapes
  const shapeTargets = useMemo(() => {
    return shapes.map(shape => generateShapePositions(shape, particleCount));
  }, [particleCount]);
  
  // Current positions and velocities
  const currentPositions = useMemo(() => {
    return new Float32Array(shapeTargets[0]);
  }, [shapeTargets]);
  
  const velocities = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  
  // Colors - gradient from blue to red
  const colors = useMemo(() => {
    const cols = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      cols[i * 3] = 0.2 + t * 0.8;     // R: 0.2 -> 1.0
      cols[i * 3 + 1] = 0.7 - t * 0.3; // G: 0.7 -> 0.4
      cols[i * 3 + 2] = 1.0;           // B: 1.0
    }
    return cols;
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current || !isPlaying) return;
    
    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Determine current morph phase (6 seconds per shape)
    const phaseDuration = 6;
    const totalDuration = phaseDuration * (shapes.length - 1);
    const loopTime = time % totalDuration;
    const currentPhase = Math.floor(loopTime / phaseDuration);
    const phaseProgress = (loopTime % phaseDuration) / phaseDuration;
    
    // Smooth easing
    const easedProgress = phaseProgress < 0.5 
      ? 4 * phaseProgress * phaseProgress * phaseProgress 
      : 1 - Math.pow(-2 * phaseProgress + 2, 3) / 2;
    
    const fromTarget = shapeTargets[currentPhase];
    const toTarget = shapeTargets[(currentPhase + 1) % shapes.length];
    
    // Morph positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Interpolate between shapes
      const targetX = fromTarget[i3] * (1 - easedProgress) + toTarget[i3] * easedProgress;
      const targetY = fromTarget[i3 + 1] * (1 - easedProgress) + toTarget[i3 + 1] * easedProgress;
      const targetZ = fromTarget[i3 + 2] * (1 - easedProgress) + toTarget[i3 + 2] * easedProgress;
      
      // Spring physics
      const dx = targetX - positions[i3];
      const dy = targetY - positions[i3 + 1];
      const dz = targetZ - positions[i3 + 2];
      
      velocities[i3] += dx * 0.05;
      velocities[i3 + 1] += dy * 0.05;
      velocities[i3 + 2] += dz * 0.05;
      
      velocities[i3] *= 0.85;
      velocities[i3 + 1] *= 0.85;
      velocities[i3 + 2] *= 0.85;
      
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Add subtle noise
      positions[i3] += Math.sin(time * 2 + i * 0.1) * 0.005;
      positions[i3 + 1] += Math.cos(time * 2 + i * 0.1) * 0.005;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate entire system slowly
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function MorphingConstellations({ tier, className = '' }: MorphingConstellationsProps) {
  const isPageVisible = usePageVisibility();

  if (tier === 'minimal' || tier === 'low') {
    return null;
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(window.devicePixelRatio, tier === 'high' ? 2 : 1)}
        frameloop={isPageVisible ? 'always' : 'never'}
      >
        <ambientLight intensity={0.5} />
        <MorphingParticles tier={tier} />
      </Canvas>
    </div>
  );
}

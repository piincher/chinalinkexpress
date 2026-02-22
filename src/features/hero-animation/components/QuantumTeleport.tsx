/**
 * Quantum Teleport Effect
 * 
 * Mind-bending visualization of packages "teleporting" from China to Africa.
 * Objects dissolve into particles, travel through a quantum tunnel,
 * and reassemble at the destination. Never seen in logistics websites!
 * Part of the hero-animation feature.
 */

'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsAnimationPlaying } from '../store/useAnimationStore';
import { usePageVisibility } from '../hooks';
import type { PerformanceTier } from '../types';

interface QuantumTeleportProps {
  tier: PerformanceTier;
  className?: string;
}

// Package box geometry
function createPackageGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // Add some bevel-like detail by using multiple segments
  return geometry;
}

// Particle system for dissolution effect
function DissolutionEffect({ 
  active, 
  position, 
  reverse = false,
  tier,
}: { 
  active: boolean; 
  position: THREE.Vector3; 
  reverse?: boolean;
  tier: PerformanceTier;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = tier === 'high' ? 500 : tier === 'medium' ? 250 : 100;
  
  const { positions, velocities, originalPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    
    // Create particles in a box formation
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Box distribution
      const face = Math.floor(Math.random() * 6);
      const u = (Math.random() - 0.5) * 1;
      const v = (Math.random() - 0.5) * 1;
      
      let x, y, z;
      switch (face) {
        case 0: x = u; y = v; z = 0.5; break;
        case 1: x = u; y = v; z = -0.5; break;
        case 2: x = -0.5; y = u; z = v; break;
        case 3: x = 0.5; y = u; z = v; break;
        case 4: x = u; y = 0.5; z = v; break;
        case 5: x = u; y = -0.5; z = v; break;
        default: x = u; y = v; z = 0.5;
      }
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;
      
      // Random explosion velocity
      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    
    return { positions, velocities, originalPositions };
  }, [particleCount]);
  
  const colors = useMemo(() => {
    const cols = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Gradient from blue (China) to red (Africa)
      const t = i / particleCount;
      cols[i * 3] = 0.2 + t * 0.8;     // R
      cols[i * 3 + 1] = 0.7 - t * 0.3; // G
      cols[i * 3 + 2] = 1.0;           // B
    }
    return cols;
  }, [particleCount]);

  useFrame(() => {
    if (!pointsRef.current || !active) return;
    
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      if (reverse) {
        // Reassemble: move towards original position
        const dx = originalPositions[i3] - posArray[i3];
        const dy = originalPositions[i3 + 1] - posArray[i3 + 1];
        const dz = originalPositions[i3 + 2] - posArray[i3 + 2];
        
        velocities[i3] += dx * 0.02;
        velocities[i3 + 1] += dy * 0.02;
        velocities[i3 + 2] += dz * 0.02;
      } else {
        // Dissolve: explode outward
        velocities[i3] *= 0.98;
        velocities[i3 + 1] *= 0.98;
        velocities[i3 + 2] *= 0.98;
      }
      
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Quantum tunnel effect
function QuantumTunnel({ tier }: { tier: PerformanceTier }) {
  const tunnelRef = useRef<THREE.Group>(null);
  const isPlaying = useIsAnimationPlaying();
  
  const rings = useMemo(() => {
    const count = tier === 'high' ? 20 : tier === 'medium' ? 12 : 6;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      z: (i / count) * 10 - 5,
      scale: 1 + Math.sin((i / count) * Math.PI) * 0.5,
      rotationSpeed: (i % 2 === 0 ? 1 : -1) * (0.5 + Math.random() * 0.5),
    }));
  }, [tier]);

  useFrame((state) => {
    if (!tunnelRef.current || !isPlaying) return;
    
    const time = state.clock.elapsedTime;
    
    tunnelRef.current.children.forEach((child, i) => {
      const ring = child as THREE.Mesh;
      ring.rotation.z = time * rings[i].rotationSpeed;
      
      // Pulse effect
      const scale = rings[i].scale * (1 + Math.sin(time * 2 + i * 0.5) * 0.1);
      ring.scale.setScalar(scale);
    });
  });

  return (
    <group ref={tunnelRef}>
      {rings.map((ring) => (
        <mesh key={ring.id} position={[0, 0, ring.z]}>
          <ringGeometry args={[1, 1.1, 32]} />
          <meshBasicMaterial
            color="#3fb0ff"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main teleport scene
function TeleportScene({ tier }: { tier: PerformanceTier }) {
  const [phase, setPhase] = useState<'idle' | 'dissolving' | 'tunnel' | 'reassembling' | 'complete'>('idle');
  const isPlaying = useIsAnimationPlaying();
  const packageRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    // Teleportation sequence
    const sequence = async () => {
      // Wait before starting
      await new Promise(r => setTimeout(r, 2000));
      
      // Phase 1: Dissolve at origin
      setPhase('dissolving');
      await new Promise(r => setTimeout(r, 1500));
      
      // Phase 2: Travel through tunnel
      setPhase('tunnel');
      await new Promise(r => setTimeout(r, 2000));
      
      // Phase 3: Reassemble at destination
      setPhase('reassembling');
      await new Promise(r => setTimeout(r, 1500));
      
      // Phase 4: Complete, show package
      setPhase('complete');
      await new Promise(r => setTimeout(r, 3000));
      
      // Loop
      setPhase('idle');
      sequence();
    };
    
    sequence();
  }, [isPlaying]);

  useFrame((state) => {
    if (!packageRef.current || !isPlaying) return;
    
    const time = state.clock.elapsedTime;
    
    // Floating animation
    packageRef.current.position.y = Math.sin(time * 2) * 0.1;
    packageRef.current.rotation.y = time * 0.5;
    packageRef.current.rotation.x = Math.sin(time) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#3fb0ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ff6b6b" />
      
      {/* Origin marker (China) */}
      <mesh position={[-4, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#ff6b6b" />
      </mesh>
      
      {/* Destination marker (Africa) */}
      <mesh position={[4, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#3fb0ff" />
      </mesh>
      
      {/* Connection line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-4, 0, 0, 4, 0, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </line>
      
      {/* Package at origin */}
      {(phase === 'idle' || phase === 'dissolving') && (
        <mesh ref={packageRef} position={[-4, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#3fb0ff"
            emissiveIntensity={0.3}
          />
          {/* Package edges */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.8, 0.8)]} />
            <lineBasicMaterial color="#3fb0ff" linewidth={2} />
          </lineSegments>
        </mesh>
      )}
      
      {/* Package at destination */}
      {(phase === 'complete') && (
        <mesh ref={packageRef} position={[4, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#ff6b6b"
            emissiveIntensity={0.3}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.8, 0.8)]} />
            <lineBasicMaterial color="#ff6b6b" linewidth={2} />
          </lineSegments>
        </mesh>
      )}
      
      {/* Dissolution particles at origin */}
      <DissolutionEffect 
        active={phase === 'dissolving'} 
        position={new THREE.Vector3(-4, 0, 0)}
        tier={tier}
      />
      
      {/* Reassembly particles at destination */}
      <DissolutionEffect 
        active={phase === 'reassembling'} 
        position={new THREE.Vector3(4, 0, 0)}
        reverse
        tier={tier}
      />
      
      {/* Quantum tunnel in the middle */}
      {phase === 'tunnel' && <QuantumTunnel tier={tier} />}
      
      {/* Traveling particle during tunnel phase */}
      {phase === 'tunnel' && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial 
            color="#ffd700"
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </>
  );
}

export function QuantumTeleport({ tier, className = '' }: QuantumTeleportProps) {
  const isPageVisible = usePageVisibility();

  if (tier === 'minimal' || tier === 'low') {
    return null;
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 3, 8], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(window.devicePixelRatio, tier === 'high' ? 2 : 1)}
        frameloop={isPageVisible ? 'always' : 'never'}
      >
        <TeleportScene tier={tier} />
      </Canvas>
      
      {/* Labels */}
      <div className="absolute bottom-10 left-10 text-white/60 text-sm font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span>ORIGINE: SHANGHAI, CN</span>
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 text-white/60 text-sm font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>DESTINATION: BAMAKO, ML</span>
        </div>
      </div>
    </div>
  );
}

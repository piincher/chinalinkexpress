/**
 * Holographic Globe
 * 
 * A mind-blowing 3D holographic Earth with real-time data streams,
 * cyberpunk aesthetics, and futuristic effects.
 * Part of the hero-animation feature.
 */

'use client';

import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useIsAnimationPlaying } from '../store/useAnimationStore';
import { usePageVisibility } from '../hooks';
import type { PerformanceTier } from '../types';

interface GlobeProps {
  tier: PerformanceTier;
}

// Wireframe sphere with glow
function WireframeSphere({ tier }: GlobeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const isPlaying = useIsAnimationPlaying();
  
  // Create wireframe geometry
  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(2, 3);
    return new THREE.WireframeGeometry(geometry);
  }, []);

  // Create points on sphere surface
  const points = useMemo(() => {
    const particleCount = tier === 'high' ? 2000 : tier === 'medium' ? 800 : 400;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      positions[i * 3] = 2.1 * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = 2.1 * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = 2.1 * Math.cos(phi);
    }
    
    return positions;
  }, [tier]);

  useFrame((state) => {
    if (!meshRef.current || !isPlaying) return;
    
    const time = state.clock.elapsedTime;
    
    // Rotate globe
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    
    // Pulse scale effect
    const scale = 1 + Math.sin(time * 2) * 0.02;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={meshRef}>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial
          color="#0b4168"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Wireframe */}
      <lineSegments geometry={wireframeGeometry}>
        <lineBasicMaterial color="#3fb0ff" transparent opacity={0.3} />
      </lineSegments>
      
      {/* Surface points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#7fd0ff"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Outer atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#3fb0ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Data streams flowing between points
function DataStreams({ tier }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isPlaying = useIsAnimationPlaying();
  
  const streams = useMemo(() => {
    const streamCount = tier === 'high' ? 15 : tier === 'medium' ? 8 : 4;
    const streamData = [];
    
    for (let i = 0; i < streamCount; i++) {
      // Start point (China region)
      const startPhi = Math.random() * Math.PI * 0.3 + Math.PI * 0.1;
      const startTheta = Math.random() * Math.PI * 0.3 + Math.PI * 0.1;
      const start = new THREE.Vector3(
        2.2 * Math.sin(startPhi) * Math.cos(startTheta),
        2.2 * Math.cos(startPhi),
        2.2 * Math.sin(startPhi) * Math.sin(startTheta)
      );
      
      // End point (Africa region)
      const endPhi = Math.random() * Math.PI * 0.3 + Math.PI * 0.6;
      const endTheta = Math.random() * Math.PI * 0.3 + Math.PI * 1.2;
      const end = new THREE.Vector3(
        2.2 * Math.sin(endPhi) * Math.cos(endTheta),
        2.2 * Math.cos(endPhi),
        2.2 * Math.sin(endPhi) * Math.sin(endTheta)
      );
      
      // Control point for arc
      const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
      mid.multiplyScalar(1.5);
      
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      
      streamData.push({
        points,
        color: i % 3 === 0 ? '#ff6b6b' : '#3fb0ff',
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * 100,
      });
    }
    
    return streamData;
  }, [tier]);

  useFrame((state) => {
    if (!groupRef.current || !isPlaying) return;
    
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line;
      const material = line.material as THREE.LineBasicMaterial;
      const stream = streams[i];
      
      // Animate opacity for flowing effect
      const flow = (time * stream.speed + stream.offset) % 2;
      material.opacity = flow < 1 ? flow : 2 - flow;
    });
  });

  return (
    <group ref={groupRef}>
      {streams.map((stream, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(stream.points.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={stream.color}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}

// Floating holographic rings
function HolographicRings({ tier }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isPlaying = useIsAnimationPlaying();
  
  const rings = useMemo(() => {
    const ringCount = tier === 'high' ? 5 : 3;
    return Array.from({ length: ringCount }, (_, i) => ({
      radius: 3 + i * 0.5,
      speed: 0.2 + i * 0.1,
      tilt: Math.random() * Math.PI,
      color: i % 2 === 0 ? '#3fb0ff' : '#ff6b6b',
    }));
  }, [tier]);

  useFrame((state) => {
    if (!groupRef.current || !isPlaying) return;
    
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      const ring = child as THREE.Mesh;
      ring.rotation.x = Math.sin(time * rings[i].speed) * 0.3;
      ring.rotation.y = time * rings[i].speed;
      ring.rotation.z = rings[i].tilt;
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[0, 0, ring.tilt]}>
          <ringGeometry args={[ring.radius - 0.02, ring.radius, 64]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Scanning line effect
function ScannerEffect({ tier }: GlobeProps) {
  const lineRef = useRef<THREE.Mesh>(null);
  const isPlaying = useIsAnimationPlaying();

  useFrame((state) => {
    if (!lineRef.current || !isPlaying) return;
    
    const time = state.clock.elapsedTime;
    const y = Math.sin(time * 0.5) * 2.5;
    lineRef.current.position.y = y;
  });

  if (tier === 'low') return null;

  return (
    <mesh ref={lineRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[8, 0.05]} />
      <meshBasicMaterial
        color="#00ff88"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();
  const isPlaying = useIsAnimationPlaying();
  const mouseRef = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!isPlaying) return;
    
    // Subtle camera movement following mouse
    camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseRef.current.y * 0.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface HolographicGlobeProps {
  tier: PerformanceTier;
  className?: string;
}

function GlobeScene({ tier }: { tier: PerformanceTier }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#3fb0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff6b6b" />
      
      <CameraController />
      <WireframeSphere tier={tier} />
      <DataStreams tier={tier} />
      <HolographicRings tier={tier} />
      <ScannerEffect tier={tier} />
      
      {tier === 'high' && (
        <EffectComposer>
          <Bloom
            intensity={0.8}
            width={300}
            height={300}
            kernelSize={5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      )}
    </>
  );
}

export function HolographicGlobe({ tier, className = '' }: HolographicGlobeProps) {
  const isPageVisible = usePageVisibility();
  const [dpr, setDpr] = useState(1); // Default to 1 for SSR

  // Set DPR on client side only
  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, tier === 'high' ? 2 : 1));
  }, [tier]);

  if (tier === 'minimal' || tier === 'low') {
    return null;
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={dpr}
        frameloop={isPageVisible ? 'always' : 'never'}
      >
        <Suspense fallback={null}>
          <GlobeScene tier={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
}

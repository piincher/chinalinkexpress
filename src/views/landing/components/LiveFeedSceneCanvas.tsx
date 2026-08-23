'use client';

/**
 * LiveFeedSceneCanvas — the WebGL layer itself (dynamically imported, never
 * in the initial bundle; see LiveFeedBackdrop).
 *
 * The board shows parcels one at a time; the backdrop shows the network they
 * move through. Three arcing lanes sweep the width of the board — the same
 * gesture as the hero globe's routes, translated to the light band — with
 * packet lights travelling along them and a slow dust of accent motes
 * underneath. On paper the lines must stay quiet: low opacity, normal
 * blending (additive would wash to white on the light band), edge-faded by
 * the wrapper's mask.
 *
 * Colours are read from the live CSS tokens at mount, so a theme change or
 * dark mode needs no code change here. Everything ambient; the only pointer
 * response is a barely-there parallax lean of the whole field.
 */

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Convert CSS lab()/oklch() to `rgb(r, g, b)`. Chromium computes custom-property
 * colours in their original wide-gamut space (and even canvas echoes them back),
 * which THREE.Color cannot parse — so we do the math. Lab D50 → XYZ D50 →
 * Bradford-adapted linear sRGB (the CSS Color 4 matrix) → gamma → 8-bit.
 */
function wideGamutToRgb(color: string): string | null {
  let l: number, a: number, b: number;
  const lab = color.match(/^lab\(\s*([\d.]+)%?\s+(-?[\d.]+)\s+(-?[\d.]+)/);
  const oklch = color.match(/^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/);
  if (lab) {
    [l, a, b] = [parseFloat(lab[1]), parseFloat(lab[2]), parseFloat(lab[3])];
  } else if (oklch) {
    const hue = (parseFloat(oklch[3]) * Math.PI) / 180;
    l = parseFloat(oklch[1]) * 100;
    a = parseFloat(oklch[2]) * Math.cos(hue) * 100;
    b = parseFloat(oklch[2]) * Math.sin(hue) * 100;
  } else {
    return null;
  }

  const fy = (l + 16) / 116;
  const delta = 6 / 29;
  const toXyz = (f: number) => (f > delta ? f ** 3 : 3 * delta * delta * (f - 4 / 29));
  const x = toXyz(fy + a / 500) * 0.96422; // D50 white point
  const y = toXyz(fy);
  const z = toXyz(fy - b / 200) * 0.82521;

  const r = 3.1338561 * x - 1.6168667 * y - 0.4906146 * z;
  const g = -0.9787684 * x + 1.9161415 * y + 0.033454 * z;
  const bl = 0.0719453 * x - 0.2289914 * y + 1.4052427 * z;
  const gamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
  const byte = (c: number) => Math.min(255, Math.max(0, Math.round(gamma(c) * 255)));
  return `rgb(${byte(r)}, ${byte(g)}, ${byte(bl)})`;
}

/** Resolve a CSS custom property to a string three.js can parse. */
function readTokenColor(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const probe = document.createElement('span');
  probe.style.color = `var(${name})`;
  probe.style.display = 'none';
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();
  if (!computed) return fallback;
  return wideGamutToRgb(computed) ?? computed;
}

/** The three lanes. Wide sweeps, shallow lifts — the board is wide and short. */
const ARCS = [
  { from: new THREE.Vector3(-12, -2.4, -1), to: new THREE.Vector3(12, 1.6, -1), lift: 2.6, speed: 0.055 },
  { from: new THREE.Vector3(-12, 0.8, -2.5), to: new THREE.Vector3(12, -1.6, -2.5), lift: -2.2, speed: 0.042 },
  { from: new THREE.Vector3(-12, 2.6, -4), to: new THREE.Vector3(12, -2.8, -4), lift: 3.0, speed: 0.034 },
] as const;

const PACKETS_PER_ARC = 3;
const PACKET_OFFSETS = [0, 0.36, 0.71];

interface ScenePalette {
  accent: string;
  ink: string;
}

/** Arcing lanes + the packet lights travelling them. */
function RouteArcs({ palette }: { palette: ScenePalette }) {
  const groupRef = useRef<THREE.Group>(null);

  const arcs = useMemo(
    () =>
      ARCS.map(({ from, to, lift, speed }) => {
        const mid = new THREE.Vector3().lerpVectors(from, to, 0.5);
        mid.y += lift;
        const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)),
          new THREE.LineBasicMaterial({
            color: new THREE.Color(palette.accent),
            transparent: true,
            opacity: 0.3,
            depthWrite: false,
          })
        );
        return { curve, line, speed };
      }),
    [palette.accent]
  );

  const packets = useMemo(
    () =>
      arcs.flatMap(({ curve, speed }, arcIndex) =>
        PACKET_OFFSETS.map((offset, i) => ({
          curve,
          speed,
          phase: (offset + arcIndex * 0.19) % 1,
          key: `${arcIndex}-${i}`,
        }))
      ),
    [arcs]
  );

  const packetRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (groupRef.current) {
      // Lane opacity breathes slowly; the group itself never moves.
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line) {
          (child.material as THREE.LineBasicMaterial).opacity =
            0.26 + Math.sin(time * 0.5 + i * 1.7) * 0.08;
        }
      });
    }
    packets.forEach((packet, i) => {
      const mesh = packetRefs.current[i];
      if (!mesh) return;
      const t = (time * packet.speed + packet.phase) % 1;
      mesh.position.copy(packet.curve.getPoint(t));
      // Fade at both ends of the run; brighten as the packet "arrives".
      const envelope = Math.sin(Math.PI * t);
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = envelope * 0.85;
      const scale = 1 + Math.max(0, t - 0.94) * 8; // arrival bloom
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <group>
      <group ref={groupRef}>
        {arcs.map((arc, i) => (
          <primitive key={i} object={arc.line} />
        ))}
      </group>
      {packets.map((packet, i) => (
        <mesh
          key={packet.key}
          ref={(el) => {
            packetRefs.current[i] = el;
          }}
        >
          <circleGeometry args={[0.13, 20]} />
          <meshBasicMaterial color={palette.accent} transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Slow accent-tinted motes drifting through the field. */
function DustField({ palette, count }: { palette: ScenePalette; count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const accent = new THREE.Color(palette.accent);
    const ink = new THREE.Color(palette.ink);
    const mixed = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 26;
      pos[i3 + 1] = (Math.random() - 0.5) * 9;
      pos[i3 + 2] = (Math.random() - 0.5) * 6 - 2;
      vel[i3] = 0.0012 + Math.random() * 0.002;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.0008;
      vel[i3 + 2] = 0;
      // Mostly accent, a quarter near-ink for depth against the paper.
      mixed.copy(Math.random() < 0.75 ? accent : ink);
      col[i3] = mixed.r;
      col[i3 + 1] = mixed.g;
      col[i3 + 2] = mixed.b;
    }
    return [pos, vel, col];
  }, [count, palette.accent, palette.ink]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;
    const attr = points.geometry.attributes.position;
    const arr = attr.array as Float32Array;
    const time = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1] + Math.sin(time * 0.4 + i) * 0.0006;
      if (arr[i3] > 13.5) arr[i3] = -13.5;
      if (arr[i3 + 1] > 5) arr[i3 + 1] = -5;
      if (arr[i3 + 1] < -5) arr[i3 + 1] = 5;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Barely-there lean of the whole field toward the pointer. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (event: MouseEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    group.position.x += (pointer.current.x * 0.5 - group.position.x) * 0.03;
    group.position.y += (pointer.current.y * 0.3 - group.position.y) * 0.03;
  });

  return <group ref={groupRef}>{children}</group>;
}

interface LiveFeedSceneCanvasProps {
  /** Frameloop runs only while this is true — off-screen costs zero GPU. */
  active: boolean;
}

export default function LiveFeedSceneCanvas({ active }: LiveFeedSceneCanvasProps) {
  // Token colours + particle budget resolve once, at mount, on the client.
  const palette = useMemo<ScenePalette>(
    () => ({
      accent: readTokenColor('--color-accent', '#2563eb'),
      ink: readTokenColor('--color-ink', '#1c2430'),
    }),
    []
  );
  const particleCount = useMemo(
    () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 300),
    []
  );
  const dpr = useMemo(
    () => (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.75) : 1),
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      dpr={dpr}
      frameloop={active ? 'always' : 'never'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ParallaxRig>
        <RouteArcs palette={palette} />
        <DustField palette={palette} count={particleCount} />
      </ParallaxRig>
    </Canvas>
  );
}

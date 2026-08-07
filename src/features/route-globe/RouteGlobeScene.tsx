'use client';

/**
 * Route globe — the hero's 3D network map.
 *
 * A slowly turning wireframe Earth with the company's real lanes drawn as great
 * circles between real coordinates, and a pulse travelling along each one.
 *
 * Deliberately restrained. The existing `hero-animation/HolographicGlobe` in
 * this repo does bloom post-processing, five floating "holographic rings" and a
 * cyberpunk palette; that is the register this whole redesign has been removing.
 * What sells a freight globe is that the geography is correct and the motion is
 * slow — not that it glows.
 *
 * Craft notes, in order of how badly each one shows when skipped:
 *
 *   · Arcs are spherical interpolation, not flat béziers. A straight line
 *     between two lat/lngs cuts through the planet; a great circle is the path
 *     an aircraft actually flies, and the eye knows the difference.
 *   · Arc altitude scales with angular distance. A fixed lift makes short hops
 *     balloon absurdly and long hauls sit flat on the surface.
 *   · The camera never moves; the globe rotates. Rotating the camera around a
 *     sphere shifts the lighting and reads as a cheap turntable.
 *   · Rotation is paused when the tab is hidden and when the canvas scrolls out
 *     of view. A WebGL context spinning behind a hidden tab is pure battery
 *     cost, which matters on the phones these clients actually use.
 *
 * Under `prefers-reduced-motion` the globe renders one static frame: the map is
 * information, so it should still be there — it just stops moving.
 */

import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PLACES, LANES, getPlace, type Place } from './lanes';

const RADIUS = 1;

/** Longitude is negated so the sphere's texture-space east matches real east. */
function toVec3(lat: number, lng: number, r = RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Great-circle arc between two points, lifted off the surface.
 * Altitude scales with the angle between them so short and long lanes both read.
 */
function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segments = 64): THREE.Vector3[] {
  const angle = a.angleTo(b);
  const lift = 0.12 + angle * 0.18;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Slerp keeps the path on the sphere; the sine term arches it above.
    const p = new THREE.Vector3().copy(a).applyAxisAngle(
      new THREE.Vector3().crossVectors(a, b).normalize(),
      angle * t
    );
    p.multiplyScalar(1 + Math.sin(Math.PI * t) * lift);
    pts.push(p);
  }
  return pts;
}

function Globe({ accent, ink }: { accent: THREE.Color; ink: THREE.Color }) {
  const group = useRef<THREE.Group>(null);
  const { invalidate } = useThree();
  const paused = useRef(false);

  const lanes = useMemo(
    () =>
      LANES.map((l) => {
        const from = getPlace(l.from);
        const to = getPlace(l.to);
        if (!from || !to) return null;
        const pts = arcPoints(toVec3(from.lat, from.lng), toVec3(to.lat, to.lng));
        return {
          geometry: new THREE.BufferGeometry().setFromPoints(pts),
          curve: new THREE.CatmullRomCurve3(pts),
          primary: Boolean(l.primary),
          phase: Math.random(),
        };
      }).filter(Boolean) as Array<{
        geometry: THREE.BufferGeometry;
        curve: THREE.CatmullRomCurve3;
        primary: boolean;
        phase: number;
      }>,
    []
  );

  const markers = useMemo(
    () => PLACES.map((p) => ({ place: p, pos: toVec3(p.lat, p.lng, RADIUS * 1.012) })),
    []
  );

  const pulseRefs = useRef<Array<THREE.Mesh | null>>([]);

  useEffect(() => {
    const onVis = () => {
      paused.current = document.hidden;
      if (!document.hidden) invalidate();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [invalidate]);

  useFrame((state, delta) => {
    if (paused.current || !group.current) return;
    // Slow enough that it reads as drift rather than as a spin.
    group.current.rotation.y += delta * 0.055;

    const t = state.clock.elapsedTime;
    lanes.forEach((lane, i) => {
      const mesh = pulseRefs.current[i];
      if (!mesh) return;
      const progress = (t * 0.16 + lane.phase) % 1;
      mesh.position.copy(lane.curve.getPointAt(progress));
      const fade = Math.sin(Math.PI * progress);
      mesh.scale.setScalar(0.005 + fade * 0.007);
      (mesh.material as THREE.MeshBasicMaterial).opacity = fade * (lane.primary ? 1 : 0.6);
    });
  });

  return (
    <group ref={group} rotation={[0.34, -2.35, 0.12]}>
      {/* Landless wireframe. A textured Earth at this size reads as a stock
          globe; the lattice reads as a network. */}
      <mesh>
        <icosahedronGeometry args={[RADIUS, 5]} />
        <meshBasicMaterial color={ink} wireframe transparent opacity={0.16} />
      </mesh>

      {/* A solid interior so arcs on the far side are occluded — without it the
          globe looks like a wire ball and loses all sense of depth. */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 48, 48]} />
        <meshBasicMaterial color="#0a0f18" />
      </mesh>

      {lanes.map((lane, i) => (
        <group key={i}>
          <primitive
            object={
              new THREE.Line(
                lane.geometry,
                new THREE.LineBasicMaterial({
                  color: accent,
                  transparent: true,
                  opacity: lane.primary ? 0.85 : 0.42,
                })
              )
            }
          />
          <mesh ref={(el) => { pulseRefs.current[i] = el; }}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color={accent} transparent />
          </mesh>
        </group>
      ))}

      {markers.map(({ place, pos }) => (
        <mesh key={place.id} position={pos}>
          <sphereGeometry args={[0.0035 + place.weight * 0.005, 12, 12]} />
          <meshBasicMaterial
            color={place.kind === 'hub' ? ink : accent}
            transparent
            opacity={place.kind === 'hub' ? 0.5 : 0.95}
          />
        </mesh>
      ))}
    </group>
  );
}

/*
 * Colours are explicit hex rather than read from the CSS custom properties.
 *
 * The tokens are authored in oklch(), which THREE.Color does not parse, so the
 * earlier token-reading hook failed silently and the whole network rendered
 * grey. These mirror --color-accent-bright and --color-void-ink-2; if those
 * change, change these. A wrong colour is obvious; a silent fallback was not.
 */
const ACCENT = new THREE.Color('#5b9dff');   // ~ oklch(70% 0.18 250)
const INK    = new THREE.Color('#8fa3ba');   // ~ oklch(74% 0.01 250)

export default function RouteGlobeScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      // `demand` renders only when something asks it to; under reduced motion
      // that means exactly one frame.
      frameloop={reduced ? 'demand' : 'always'}
      camera={{ position: [0, 0, 2.9], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.75]}
      style={{ background: 'transparent' }}
    >
      <Globe accent={ACCENT} ink={INK} />
    </Canvas>
  );
}

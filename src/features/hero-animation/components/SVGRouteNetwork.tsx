/**
 * SVG Route Network
 * 
 * Tier 1: SVG-based route visualization with CSS animations.
 * Shows China-Africa trade routes with animated paths.
 * Part of the hero-animation feature.
 */

'use client';

import React, { useMemo, useRef, useEffect, useState } from 'react';
import { CITIES, TRANSPORT_NODES } from '../constants';
import type { Route, TransportNode, CityNode, PerformanceTier } from '../types';
import { calculateRoutes, getPointAtProgress, getRouteAngle } from '../lib/pathCalculator';

interface SVGRouteNetworkProps {
  tier: PerformanceTier;
  className?: string;
}

// Transport icons as SVG components
const ShipIcon = ({ angle }: { angle: number }) => (
  <g transform={`rotate(${angle})`}>
    <path
      d="M-12 -4 L12 -4 L10 6 L-10 6 Z"
      fill="#062033"
      stroke="#3fb0ff"
      strokeWidth="0.5"
    />
    <rect x="-8" y="-10" width="16" height="6" rx="1" fill="#ff6b6b" opacity="0.9" />
    <rect x="-8" y="-10" width="16" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="0.3" />
  </g>
);

const PlaneIcon = ({ angle }: { angle: number }) => (
  <g transform={`rotate(${angle})`}>
    <path
      d="M-8 0 L8 0 L6 3 L-6 3 Z"
      fill="#fff"
    />
    <path
      d="M-2 -6 L2 -6 L1 0 L-1 0 Z"
      fill="#ff6b6b"
    />
    <path
      d="M-4 2 L4 2 L3 5 L-3 5 Z"
      fill="#ff6b6b"
    />
  </g>
);

const TruckIcon = ({ angle }: { angle: number }) => (
  <g transform={`rotate(${angle})`}>
    <rect x="-10" y="-5" width="20" height="10" rx="2" fill="#1b3a57" />
    <rect x="2" y="-3" width="6" height="6" rx="1" fill="#dff4ff" opacity="0.8" />
    <circle cx="-5" cy="6" r="3" fill="#fff" />
    <circle cx="5" cy="6" r="3" fill="#fff" />
  </g>
);

export function SVGRouteNetwork({ tier, className = '' }: SVGRouteNetworkProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1600, height: 700 });
  const [transportPositions, setTransportPositions] = useState<Map<string, { x: number; y: number; angle: number }>>(new Map());
  const animationRef = useRef<number | undefined>(undefined);
  
  // Calculate routes based on container size
  const routes = useMemo<Route[]>(() => {
    return calculateRoutes(dimensions.width, dimensions.height, 60);
  }, [dimensions]);

  // Update dimensions on resize
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animate transport nodes
  useEffect(() => {
    if (tier === 'minimal') return;

    let lastTime = performance.now();
    const speeds = new Map<string, number>();
    const progresses = new Map<string, number>();

    // Initialize
    TRANSPORT_NODES.forEach(node => {
      speeds.set(node.id, node.speed);
      progresses.set(node.id, node.progress);
    });

    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const newPositions = new Map<string, { x: number; y: number; angle: number }>();

      TRANSPORT_NODES.forEach(node => {
        const route = routes.find(r => r.id === node.routeId);
        if (!route || route.points.length === 0) return;

        let progress = progresses.get(node.id) || 0;
        const speed = speeds.get(node.id) || 0.0003;

        // Update progress
        progress += speed * deltaTime;
        if (progress >= 1) {
          progress = 0;
        }
        progresses.set(node.id, progress);

        // Get position
        const point = getPointAtProgress(route.points, progress);
        const angle = getRouteAngle(route.points, progress);

        newPositions.set(node.id, { x: point.x, y: point.y, angle });
      });

      setTransportPositions(newPositions);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [routes, tier]);

  // Calculate city positions
  const cityPositions = useMemo(() => {
    return CITIES.map(city => ({
      ...city,
      x: city.x * (dimensions.width - 120) + 60,
      y: city.y * (dimensions.height - 120) + 60,
    }));
  }, [dimensions]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter */}
          <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for routes */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3fb0ff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#7fd0ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#3fb0ff" stopOpacity="0.2" />
          </linearGradient>

          {/* Pulse gradient */}
          <radialGradient id="pulseGradient">
            <stop offset="0%" stopColor="#3fb0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3fb0ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow areas */}
        <ellipse cx={dimensions.width * 0.8} cy={dimensions.height * 0.35} rx="150" ry="100" fill="url(#pulseGradient)" opacity="0.1" />
        <ellipse cx={dimensions.width * 0.38} cy={dimensions.height * 0.48} rx="120" ry="80" fill="url(#pulseGradient)" opacity="0.08" />

        {/* Route paths */}
        {routes.map((route, index) => (
          <g key={route.id}>
            {/* Background route line */}
            <path
              d={`M ${route.points.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`}
              fill="none"
              stroke={route.color}
              strokeWidth={route.width}
              strokeOpacity="0.2"
              strokeLinecap="round"
            />
            
            {/* Animated route line */}
            <path
              d={`M ${route.points.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`}
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth={route.width}
              strokeLinecap="round"
              filter={tier !== 'low' ? 'url(#routeGlow)' : undefined}
              strokeDasharray={route.dashArray}
              className="animate-route-dash"
              style={{
                animationDuration: `${12 + index * 4}s`,
                animationDelay: `${index * 0.5}s`,
              }}
            />

            {/* Data pulses */}
            {tier !== 'low' && tier !== 'minimal' && (
              <>
                <circle r="4" fill="#3fb0ff" opacity="0.8">
                  <animateMotion
                    dur={`${8 + index * 2}s`}
                    repeatCount="indefinite"
                    path={`M ${route.points.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`}
                  />
                </circle>
                <circle r="8" fill="none" stroke="#3fb0ff" strokeWidth="1" opacity="0.4">
                  <animateMotion
                    dur={`${8 + index * 2}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.3}s`}
                    path={`M ${route.points.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`}
                  />
                </circle>
              </>
            )}
          </g>
        ))}

        {/* City nodes */}
        {cityPositions.map((city) => (
          <g key={city.id}>
            {/* Glow */}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.importance * 15}
              fill={city.region === 'china' ? '#ff6b6b' : city.region === 'africa' ? '#3fb0ff' : '#ffd700'}
              opacity="0.15"
              className="animate-city-pulse"
              style={{ animationDuration: `${2 + city.importance}s` }}
            />
            
            {/* Core */}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.importance * 5}
              fill={city.region === 'china' ? '#ff6b6b' : city.region === 'africa' ? '#3fb0ff' : '#ffd700'}
              opacity="0.9"
            />
            
            {/* Border */}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.importance * 5 + 2}
              fill="none"
              stroke={city.region === 'china' ? '#ff6b6b' : city.region === 'africa' ? '#3fb0ff' : '#ffd700'}
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Label (only for high tier) */}
            {tier === 'high' && (
              <text
                x={city.x}
                y={city.y + city.importance * 8 + 12}
                textAnchor="middle"
                fill="#fff"
                fontSize="10"
                fontWeight="500"
                opacity="0.8"
              >
                {city.name}
              </text>
            )}
          </g>
        ))}

        {/* Transport nodes */}
        {tier !== 'minimal' && TRANSPORT_NODES.map((node) => {
          const position = transportPositions.get(node.id);
          if (!position) return null;

          return (
            <g
              key={node.id}
              transform={`translate(${position.x}, ${position.y})`}
            >
              {node.type === 'ship' && <ShipIcon angle={position.angle} />}
              {node.type === 'plane' && <PlaneIcon angle={position.angle} />}
              {node.type === 'truck' && <TruckIcon angle={position.angle} />}
            </g>
          );
        })}
      </svg>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes route-dash {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes city-pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.1);
          }
        }
        
        .animate-route-dash {
          animation-name: route-dash;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
        .animate-city-pulse {
          animation-name: city-pulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}

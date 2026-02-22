/**
 * Fallback Component
 * 
 * Static fallback for minimal tier or when animations are disabled.
 * Shows a high-quality static image of the logistics network.
 * Part of the hero-animation feature.
 */

'use client';

import React from 'react';
import { CITIES } from '../constants';

interface FallbackProps {
  className?: string;
}

export function Fallback({ className = '' }: FallbackProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #062033 0%, #0b4168 50%, #02202c 100%)',
        }}
      />

      {/* Static network visualization */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="staticRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3fb0ff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7fd0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3fb0ff" stopOpacity="0.3" />
          </linearGradient>
          
          <radialGradient id="chinaGlow">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="africaGlow">
            <stop offset="0%" stopColor="#3fb0ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3fb0ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background continents hint */}
        <g opacity="0.05">
          {/* Asia hint */}
          <ellipse cx="1300" cy="250" rx="200" ry="150" fill="#fff" />
          {/* Africa hint */}
          <ellipse cx="600" cy="350" rx="180" ry="220" fill="#fff" />
        </g>

        {/* Static route lines */}
        <g opacity="0.4">
          {/* Shanghai to Bamako */}
          <path
            d="M 1312 245 Q 900 100 608 336"
            fill="none"
            stroke="url(#staticRouteGrad)"
            strokeWidth="2"
          />
          
          {/* Shenzhen to Lagos */}
          <path
            d="M 1248 336 Q 950 400 720 364"
            fill="none"
            stroke="#7fd0ff"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          {/* Guangzhou to Dakar */}
          <path
            d="M 1216 322 Q 900 250 512 322"
            fill="none"
            stroke="#9fd3ff"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Air route - Shanghai to Bamako via Addis */}
          <path
            d="M 1312 245 Q 850 385 608 336"
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            opacity="0.6"
          />
        </g>

        {/* City markers */}
        {CITIES.filter(c => c.importance >= 0.8).map((city) => {
          const x = city.x * 1520 + 40;
          const y = city.y * 580 + 40;
          const isChina = city.region === 'china';
          const isAfrica = city.region === 'africa';
          
          return (
            <g key={city.id}>
              {/* Glow */}
              <circle
                cx={x}
                cy={y}
                r={city.importance * 20}
                fill={isChina ? 'url(#chinaGlow)' : isAfrica ? 'url(#africaGlow)' : 'rgba(255, 215, 0, 0.2)'}
              />
              
              {/* Core */}
              <circle
                cx={x}
                cy={y}
                r={city.importance * 6}
                fill={isChina ? '#ff6b6b' : isAfrica ? '#3fb0ff' : '#ffd700'}
                opacity="0.9"
              />
              
              {/* Label */}
              <text
                x={x}
                y={y + city.importance * 8 + 15}
                textAnchor="middle"
                fill="#fff"
                fontSize="12"
                fontWeight="500"
                opacity="0.9"
              >
                {city.name}
              </text>
            </g>
          );
        })}

        {/* Transport icons - static positions */}
        <g opacity="0.8">
          {/* Ship icon on route */}
          <g transform="translate(1000, 180) rotate(15)">
            <path d="M-15 -5 L15 -5 L12 8 L-12 8 Z" fill="#062033" stroke="#3fb0ff" strokeWidth="1" />
            <rect x="-10" y="-12" width="20" height="7" rx="1" fill="#ff6b6b" />
          </g>
          
          {/* Plane icon on air route */}
          <g transform="translate(900, 280) rotate(-10)">
            <path d="M-10 0 L10 0 L7 3 L-7 3 Z" fill="#fff" />
            <path d="M-2 -5 L2 -5 L1 0 L-1 0 Z" fill="#ff6b6b" />
          </g>
        </g>
      </svg>

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(6, 32, 51, 0.4) 100%)',
        }}
      />
    </div>
  );
}

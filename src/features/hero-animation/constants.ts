/**
 * Hero Animation Constants
 * 
 * Feature-specific constants for the hero animation.
 * Part of the hero-animation feature.
 */

import type { Route, CityNode, TransportNode } from './types';

// China-Africa logistics corridor key cities (normalized coordinates 0-1)
export const CITIES: CityNode[] = [
  // China - Origin
  { id: 'shanghai', name: 'Shanghai', nameCN: '上海', x: 0.82, y: 0.35, region: 'china', importance: 1 },
  { id: 'shenzhen', name: 'Shenzhen', nameCN: '深圳', x: 0.78, y: 0.48, region: 'china', importance: 0.9 },
  { id: 'guangzhou', name: 'Guangzhou', nameCN: '广州', x: 0.76, y: 0.46, region: 'china', importance: 0.85 },
  { id: 'ningbo', name: 'Ningbo', nameCN: '宁波', x: 0.81, y: 0.38, region: 'china', importance: 0.7 },
  { id: 'qingdao', name: 'Qingdao', nameCN: '青岛', x: 0.80, y: 0.32, region: 'china', importance: 0.65 },
  
  // Hubs
  { id: 'dubai', name: 'Dubai', x: 0.58, y: 0.42, region: 'hub', importance: 0.8 },
  { id: 'istanbul', name: 'Istanbul', x: 0.52, y: 0.32, region: 'hub', importance: 0.75 },
  { id: 'addis', name: 'Addis Ababa', x: 0.53, y: 0.55, region: 'hub', importance: 0.7 },
  
  // Africa - Destination (Mali focus)
  { id: 'bamako', name: 'Bamako', x: 0.38, y: 0.48, region: 'africa', importance: 1 },
  { id: 'dakar', name: 'Dakar', x: 0.32, y: 0.46, region: 'africa', importance: 0.7 },
  { id: 'lagos', name: 'Lagos', x: 0.45, y: 0.52, region: 'africa', importance: 0.8 },
  { id: 'casablanca', name: 'Casablanca', x: 0.40, y: 0.35, region: 'africa', importance: 0.6 },
  { id: 'cairo', name: 'Cairo', x: 0.54, y: 0.38, region: 'africa', importance: 0.75 },
];

// Trade routes (China ↔ Africa)
export const ROUTES: Route[] = [
  // Maritime routes
  {
    id: 'sea-shanghai-bamako',
    from: 'shanghai',
    to: 'bamako',
    points: [], // Calculated at runtime
    color: '#3fb0ff',
    width: 3,
    dashArray: '8 6',
    trafficIntensity: 'high',
  },
  {
    id: 'sea-shenzhen-lagos',
    from: 'shenzhen',
    to: 'lagos',
    points: [],
    color: '#7fd0ff',
    width: 2.5,
    dashArray: '6 8',
    trafficIntensity: 'high',
  },
  {
    id: 'sea-guangzhou-dakar',
    from: 'guangzhou',
    to: 'dakar',
    points: [],
    color: '#9fd3ff',
    width: 2,
    dashArray: '4 10',
    trafficIntensity: 'medium',
  },
  
  // Air routes
  {
    id: 'air-shanghai-addis-bamako',
    from: 'shanghai',
    to: 'bamako',
    points: [],
    color: '#ff6b6b',
    width: 2,
    dashArray: '15 5',
    trafficIntensity: 'high',
  },
  {
    id: 'air-shenzhen-dubai-bamako',
    from: 'shenzhen',
    to: 'bamako',
    points: [],
    color: '#ff8585',
    width: 1.5,
    dashArray: '10 8',
    trafficIntensity: 'medium',
  },
  {
    id: 'air-guangzhou-istanbul-bamako',
    from: 'guangzhou',
    to: 'bamako',
    points: [],
    color: '#ffa0a0',
    width: 1.5,
    dashArray: '8 10',
    trafficIntensity: 'low',
  },
];

// Transport nodes moving along routes
export const TRANSPORT_NODES: TransportNode[] = [
  { id: 'ship1', type: 'ship', routeId: 'sea-shanghai-bamako', progress: 0, speed: 0.0003, icon: '🚢' },
  { id: 'ship2', type: 'ship', routeId: 'sea-shenzhen-lagos', progress: 0.3, speed: 0.00025, icon: '🚢' },
  { id: 'ship3', type: 'ship', routeId: 'sea-guangzhou-dakar', progress: 0.6, speed: 0.0002, icon: '🚢' },
  { id: 'plane1', type: 'plane', routeId: 'air-shanghai-addis-bamako', progress: 0.1, speed: 0.001, icon: '✈️' },
  { id: 'plane2', type: 'plane', routeId: 'air-shenzhen-dubai-bamako', progress: 0.5, speed: 0.0008, icon: '✈️' },
  { id: 'plane3', type: 'plane', routeId: 'air-guangzhou-istanbul-bamako', progress: 0.8, speed: 0.0009, icon: '✈️' },
];

// Animation timing constants
export const ANIMATION_TIMING = {
  routeDashSpeed: 50, // pixels per second
  particleLife: 300, // frames
  pulseInterval: 2000, // ms
  transportLoop: true,
  fadeInDuration: 1.2, // seconds
} as const;

// Visual constants
export const VISUAL = {
  backgroundGradient: ['#062033', '#0b4168', '#02202c'],
  glowColor: '#3fb0ff',
  particleBaseSize: 2,
  cityNodeSize: 6,
  connectionGlow: 0.3,
} as const;

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  // FPS thresholds for tier detection
  highTierMinFPS: 55,
  mediumTierMinFPS: 30,
  
  // Memory thresholds (MB)
  highTierMaxMemory: 500,
  mediumTierMaxMemory: 1000,
  
  // Screen resolution thresholds
  highTierMaxPixels: 2560 * 1440, // 1440p
  mediumTierMaxPixels: 1920 * 1080, // 1080p
} as const;

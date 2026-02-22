/**
 * Path Calculator
 * 
 * Utilities for calculating Bézier curves and route paths.
 * Part of the hero-animation feature.
 */

import type { RoutePoint, Route, CityNode } from '../types';
import { CITIES } from '../constants';

/**
 * Calculate cubic Bézier curve points
 */
export function calculateBezierCurve(
  start: RoutePoint,
  end: RoutePoint,
  controlPoint1: RoutePoint,
  controlPoint2: RoutePoint,
  segments: number = 100
): RoutePoint[] {
  const points: RoutePoint[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const invT = 1 - t;

    // Cubic Bézier formula
    const x = 
      Math.pow(invT, 3) * start.x +
      3 * Math.pow(invT, 2) * t * controlPoint1.x +
      3 * invT * Math.pow(t, 2) * controlPoint2.x +
      Math.pow(t, 3) * end.x;

    const y = 
      Math.pow(invT, 3) * start.y +
      3 * Math.pow(invT, 2) * t * controlPoint1.y +
      3 * invT * Math.pow(t, 2) * controlPoint2.y +
      Math.pow(t, 3) * end.y;

    points.push({ x, y });
  }

  return points;
}

/**
 * Generate control points for a smooth curved route
 * Creates an arc that suggests the curvature of the Earth
 */
export function generateRouteControlPoints(
  start: RoutePoint,
  end: RoutePoint,
  curvature: number = 0.3
): { cp1: RoutePoint; cp2: RoutePoint } {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  
  // Calculate perpendicular direction for arc
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Arc height based on distance and curvature
  const arcHeight = distance * curvature;
  
  // Perpendicular vector (normalized)
  const perpX = -dy / distance;
  const perpY = dx / distance;
  
  // Control points offset perpendicular to the route
  const cp1 = {
    x: start.x + dx * 0.25 + perpX * arcHeight,
    y: start.y + dy * 0.25 + perpY * arcHeight,
  };
  
  const cp2 = {
    x: start.x + dx * 0.75 + perpX * arcHeight,
    y: start.y + dy * 0.75 + perpY * arcHeight,
  };

  return { cp1, cp2 };
}

/**
 * Calculate route points for all defined routes
 */
export function calculateRoutes(
  containerWidth: number,
  containerHeight: number,
  padding: number = 40
): Route[] {
  const routes: Route[] = [];

  // Import routes from constants and calculate actual pixel coordinates
  const { ROUTES } = require('../constants');

  for (const route of ROUTES) {
    const fromCity = CITIES.find(c => c.id === route.from);
    const toCity = CITIES.find(c => c.id === route.to);

    if (!fromCity || !toCity) continue;

    // Convert normalized coordinates to pixel coordinates
    const start: RoutePoint = {
      x: fromCity.x * (containerWidth - 2 * padding) + padding,
      y: fromCity.y * (containerHeight - 2 * padding) + padding,
    };

    const end: RoutePoint = {
      x: toCity.x * (containerWidth - 2 * padding) + padding,
      y: toCity.y * (containerHeight - 2 * padding) + padding,
    };

    // Generate control points for curved route
    const { cp1, cp2 } = generateRouteControlPoints(start, end, 0.25);

    // Calculate Bézier curve points
    const points = calculateBezierCurve(start, end, cp1, cp2, 150);

    routes.push({
      ...route,
      points,
    });
  }

  return routes;
}

/**
 * Get point at a specific progress along a route
 */
export function getPointAtProgress(
  routePoints: RoutePoint[],
  progress: number
): RoutePoint {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const index = clampedProgress * (routePoints.length - 1);
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);
  const t = index - lowerIndex;

  if (lowerIndex === upperIndex) {
    return routePoints[lowerIndex];
  }

  const p1 = routePoints[lowerIndex];
  const p2 = routePoints[upperIndex];

  return {
    x: p1.x + (p2.x - p1.x) * t,
    y: p1.y + (p2.y - p1.y) * t,
  };
}

/**
 * Calculate angle at a point on the route for orienting transport icons
 */
export function getRouteAngle(
  routePoints: RoutePoint[],
  progress: number
): number {
  const delta = 0.01;
  const p1 = getPointAtProgress(routePoints, Math.max(0, progress - delta));
  const p2 = getPointAtProgress(routePoints, Math.min(1, progress + delta));

  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
}

/**
 * Convert SVG path commands to points
 */
export function svgPathToPoints(pathData: string, segments: number = 100): RoutePoint[] {
  // Simple SVG path parser for M (move) and C (cubic bezier) commands
  const points: RoutePoint[] = [];
  const commands = pathData.match(/[MmCc][\d\s.,-]+/g) || [];
  
  let currentPos: RoutePoint = { x: 0, y: 0 };

  for (const cmd of commands) {
    const type = cmd[0];
    const numbers = cmd.slice(1).trim().split(/[\s,]+/).map(Number);

    if (type === 'M' && numbers.length >= 2) {
      currentPos = { x: numbers[0], y: numbers[1] };
      points.push(currentPos);
    } else if (type === 'C' && numbers.length >= 6) {
      const cp1 = { x: numbers[0], y: numbers[1] };
      const cp2 = { x: numbers[2], y: numbers[3] };
      const end = { x: numbers[4], y: numbers[5] };
      
      const curvePoints = calculateBezierCurve(currentPos, end, cp1, cp2, segments);
      points.push(...curvePoints.slice(1)); // Avoid duplicate
      
      currentPos = end;
    }
  }

  return points;
}

/**
 * Create a smooth path string from points
 */
export function pointsToSvgPath(points: RoutePoint[]): string {
  if (points.length === 0) return '';
  
  let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}`;
  }
  
  return path;
}

/**
 * Sourcing Constellation
 *
 * One picture that explains the whole business: the Chinese marketplaces a
 * client buys from, wired through ChinaLink, out to their door in Bamako.
 *
 * Built as inline SVG rather than an image so it stays crisp at any width, needs
 * no asset pipeline, respects the theme tokens, and can animate: the connector
 * lines draw themselves once the graphic scrolls into view, which is motion that
 * carries meaning — goods moving along a route — rather than decoration.
 */

'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface SourceNode {
  /** Marketplace name, drawn as a text label — no third-party logos. */
  label: string;
  /** Grid position in the 0-100 viewBox space. */
  x: number;
  y: number;
  /** Which side of the hub it feeds into. */
  side: 'left' | 'right';
}

const SOURCES: SourceNode[] = [
  { label: '1688', x: 12, y: 14, side: 'left' },
  { label: 'Taobao', x: 8, y: 38, side: 'left' },
  { label: 'Alibaba', x: 13, y: 62, side: 'left' },
  { label: 'Pinduoduo', x: 10, y: 86, side: 'left' },
  { label: 'Guangzhou', x: 86, y: 18, side: 'right' },
  { label: 'Yiwu', x: 90, y: 42, side: 'right' },
  { label: 'Shenzhen', x: 87, y: 66, side: 'right' },
  { label: 'Foshan', x: 89, y: 88, side: 'right' },
];

const HUB = { x: 50, y: 50 };

/**
 * An orthogonal elbow rather than a straight diagonal: freight moves in legs,
 * and the right-angle reads as a route map instead of a starburst.
 */
const elbowPath = ({ x, y, side }: SourceNode): string => {
  const midX = side === 'left' ? x + (HUB.x - x) * 0.45 : x - (x - HUB.x) * 0.45;
  return `M ${x} ${y} H ${midX} V ${HUB.y} H ${HUB.x}`;
};

export function SourcingConstellation({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();

  // With reduced motion the routes are simply present — no drawing.
  const draw = prefersReduced
    ? { pathLength: 1, opacity: 1 }
    : { pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 };

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        role="img"
        aria-label="Vos achats sur les marketplaces chinoises transitent par ChinaLink Express jusqu'à votre porte à Bamako."
      >
        {/* Routes, drawn first so the nodes sit on top of them. */}
        {SOURCES.map((node, i) => (
          <motion.path
            key={node.label}
            d={elbowPath(node)}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={0.5}
            strokeLinecap="round"
            strokeOpacity={0.55}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw}
            transition={{
              duration: prefersReduced ? 0 : 0.9,
              delay: prefersReduced ? 0 : 0.15 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Source nodes */}
        {SOURCES.map((node, i) => (
          <motion.g
            key={`${node.label}-node`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            transition={{
              duration: prefersReduced ? 0.15 : 0.4,
              delay: prefersReduced ? 0 : i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <rect
              x={node.x - 9}
              y={node.y - 4}
              width={18}
              height={8}
              rx={2}
              fill="var(--color-paper)"
              stroke="var(--color-rule)"
              strokeWidth={0.4}
            />
            <text
              x={node.x}
              y={node.y + 1.4}
              textAnchor="middle"
              fontSize={3.2}
              fontFamily="var(--font-display)"
              fontWeight={600}
              fill="var(--color-ink-2)"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* The hub — deliberately the heaviest element on the canvas. */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
          transition={{ duration: prefersReduced ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect
            x={HUB.x - 17}
            y={HUB.y - 9}
            width={34}
            height={18}
            rx={3}
            fill="var(--color-accent)"
          />
          <text
            x={HUB.x}
            y={HUB.y - 1}
            textAnchor="middle"
            fontSize={4.4}
            fontFamily="var(--font-display)"
            fontWeight={800}
            fill="var(--color-accent-ink)"
          >
            ChinaLink
          </text>
          <text
            x={HUB.x}
            y={HUB.y + 5}
            textAnchor="middle"
            fontSize={3}
            fontFamily="var(--font-display)"
            fontWeight={500}
            fill="var(--color-accent-ink)"
            opacity={0.85}
          >
            Bamako
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

export default SourcingConstellation;

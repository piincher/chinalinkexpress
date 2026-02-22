/**
 * Holographic Cards
 * 
 * Stunning 3D glassmorphism cards with holographic borders,
 * floating animation, and mouse parallax effects.
 * Displays shipping options in a futuristic UI.
 * Part of the hero-animation feature.
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsAnimationPlaying } from '../store/useAnimationStore';
import type { PerformanceTier } from '../types';

interface HolographicCardsProps {
  tier: PerformanceTier;
  className?: string;
}

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  features: string[];
  price: string;
  duration: string;
}

const cards: CardData[] = [
  {
    id: 'air',
    title: 'EXPÉDITION AÉRIENNE',
    subtitle: 'Livraison Express',
    icon: '✈️',
    color: '#ff6b6b',
    features: ['14-21 jours', 'Suivi GPS', 'Assurance incluse'],
    price: 'à partir 15$/kg',
    duration: 'Rapide',
  },
  {
    id: 'sea',
    title: 'EXPÉDITION MARITIME',
    subtitle: 'Solution Économique',
    icon: '🚢',
    color: '#3fb0ff',
    features: ['60-75 jours', 'Gros volumes', 'Prix compétitif'],
    price: 'à partir 350$/m³',
    duration: 'Économique',
  },
  {
    id: 'purchase',
    title: 'ACHAT & PAIEMENT',
    subtitle: 'Service Complet',
    icon: '🛒',
    color: '#10b981',
    features: ['Fournisseurs vérifiés', 'Paiement sécurisé', 'Contrôle qualité'],
    price: 'Commission 5%',
    duration: 'Sur mesure',
  },
];

function HolographicCard({ 
  card, 
  index, 
  mouseX, 
  mouseY,
  tier,
}: { 
  card: CardData; 
  index: number; 
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  tier: PerformanceTier;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isPlaying = useIsAnimationPlaying();
  
  // Spring physics for smooth animation
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  
  // Glow position follows mouse
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      style={{
        rotateX: tier !== 'low' ? rotateX : 0,
        rotateY: tier !== 'low' ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isPlaying ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ scale: 1.05, z: 50 }}
    >
      {/* Holographic border glow */}
      <div 
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${card.color}40, transparent, ${card.color}60)`,
          filter: 'blur(8px)',
        }}
      />
      
      {/* Card container */}
      <div 
        className="relative p-6 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(11, 65, 104, 0.4)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `0 8px 32px ${card.color}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, ${card.color}30 0%, transparent 60%)`,
          }}
        />
        
        {/* Scanning line effect */}
        <motion.div
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-60"
          animate={isPlaying ? { 
            top: ['0%', '100%', '0%'],
            opacity: [0, 0.6, 0],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div 
            className="text-5xl mb-4"
            animate={isPlaying ? { 
              y: [0, -5, 0],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
          >
            {card.icon}
          </motion.div>
          
          {/* Title */}
          <h3 
            className="text-lg font-bold mb-1 tracking-wider"
            style={{ color: card.color }}
          >
            {card.title}
          </h3>
          
          <p className="text-blue-200 text-sm mb-4">{card.subtitle}</p>
          
          {/* Features */}
          <ul className="space-y-2 mb-4">
            {card.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-blue-100">
                <span style={{ color: card.color }}>▸</span>
                {feature}
              </li>
            ))}
          </ul>
          
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />
          
          {/* Price & Duration */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-blue-300 uppercase tracking-wider">Tarif</p>
              <p className="text-white font-bold">{card.price}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-300 uppercase tracking-wider">Délai</p>
              <p className="text-white font-semibold">{card.duration}</p>
            </div>
          </div>
        </div>
        
        {/* Corner accents */}
        <div 
          className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg opacity-50"
          style={{ borderColor: card.color }}
        />
        <div 
          className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 rounded-br-lg opacity-50"
          style={{ borderColor: card.color }}
        />
      </div>
    </motion.div>
  );
}

export function HolographicCards({ tier, className = '' }: HolographicCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (tier === 'low' || tier === 'minimal') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, tier]);

  if (tier === 'minimal') {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
      style={{ perspective: 1000 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto max-w-5xl px-4">
        {cards.map((card, index) => (
          <HolographicCard
            key={card.id}
            card={card}
            index={index}
            mouseX={mouseX}
            mouseY={mouseY}
            tier={tier}
          />
        ))}
      </div>
    </div>
  );
}

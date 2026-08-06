/**
 * Services Section — Clean Redesign
 *
 * No bento grid, no spotlight borders, no gradient text.
 * Clean typographic cards with a single Lucide icon each.
 */

'use client';

import React, { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Plane,
  Ship,
  CreditCard,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations';
import { SECTION_IDS } from '../constants';

const SERVICE_HREFS: Record<string, string> = {
  sourcing: '/services/sourcing',
  airFreight: '/services/air-freight',
  seaFreight: '/services/sea-freight',
  payment: '/services/paiement-fournisseur-chine',
  recharge: '/tarifs',
};

const SERVICE_ICONS = [
  Search,
  Plane,
  Ship,
  CreditCard,
  Smartphone,
];

const SERVICE_KEYS = ['sourcing', 'airFreight', 'seaFreight', 'payment', 'recharge'] as const;

function ServiceCard({
  serviceKey,
  index,
}: {
  serviceKey: string;
  index: number;
}) {
  const t = useTranslations('services');
  const ctaT = useTranslations('cta');
  const locale = useLocale();

  const title = t(`items.${serviceKey}.title`);
  const description = t(`items.${serviceKey}.description`);
  const href = SERVICE_HREFS[serviceKey] || '/services/sourcing';
  const targetLocale = locale;
  const Icon = SERVICE_ICONS[index];

  // Pointer-tracked tilt + spotlight. The raw pointer position drives both, so
  // the highlight and the tilt share one origin and the card reads as a single
  // physical surface rather than two effects layered on top of each other.
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  // Hooks must stay at the top level — the glare gradient is built here and
  // only its rendering is conditional further down.
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);
  const glare = useMotionTemplate`radial-gradient(420px circle at calc(${smoothX} * 100%) calc(${smoothY} * 100%), color-mix(in oklch, var(--color-accent) 14%, transparent), transparent 60%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    pointerX.set(px);
    pointerY.set(py);
    // Small angles only — past ~7° the text edges start to shimmer.
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 8);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative flex flex-col h-full rounded-lg p-6 overflow-hidden"
      style={{
        backgroundColor: 'var(--color-paper)',
        border: '1px solid var(--color-rule)',
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      whileHover={prefersReduced ? undefined : { y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cursor-following glare. Sits under the content, clipped by the card. */}
      {!prefersReduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
      )}

      {/* Icon */}
      <div
        className="relative w-10 h-10 rounded-lg flex items-center justify-center mb-5"
        style={{ backgroundColor: 'var(--color-paper-2)' }}
      >
        <Icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
      </div>

      {/* Content */}
      <h3
        className="relative text-lg font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
      >
        {title}
      </h3>
      <p
        className="relative text-sm leading-relaxed mb-6 flex-1"
        style={{ color: 'var(--color-ink-2)' }}
      >
        {description}
      </p>

      {/* CTA */}
      <Link
        href={`/${targetLocale}${href}`}
        className="relative inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2"
        style={{ color: 'var(--color-accent)' }}
      >
        {ctaT('learnMore')}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section
      id={SECTION_IDS.SERVICES}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-paper-2)' }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection animation="blurIn" className="max-w-2xl mb-16" threshold={0.4}>
          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--color-ink-2)' }}
          >
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* Cards — asymmetric grid. They hinge in one after another, then each
            responds independently to the pointer. */}
        <StaggerContainer
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
          staggerDelay={0.08}
          threshold={0.15}
        >
          {SERVICE_KEYS.map((key, index) => (
            <StaggerItem key={key} animation="unfold" className="h-full">
              <ServiceCard serviceKey={key} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default ServicesSection;

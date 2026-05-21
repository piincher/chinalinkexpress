/**
 * Hero Section — Marquee Hero Redesign
 *
 * A single bold statement fills the fold.
 * No gradients, no glassmorphism, no floating orbs.
 * Solid typography, solid colours, confident spacing.
 */

'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollTo } from '@/hooks/useScrollTo';
import { ChevronDown, Star, ArrowRight, MessageCircle } from 'lucide-react';
import { SECTION_IDS } from '../constants';

/* ── reduced-motion hook ─────────────────────────────────────────────── */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ── scroll indicator ────────────────────────────────────────────────── */
function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const reduced = useReducedMotion();

  const handleClick = () => {
    const el = document.getElementById(SECTION_IDS.STATS);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      ref={ref}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
        Scroll
      </span>
      <motion.div
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5" style={{ color: 'var(--color-muted)' }} />
      </motion.div>
    </motion.div>
  );
}

/* ── hero section ────────────────────────────────────────────────────── */
export function HeroSection() {
  const t = useTranslations();
  const { scrollToElement } = useScrollTo();
  const reduced = useReducedMotion();

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  const steps = (t.raw('hero.journeySteps') as Array<{ icon: string; label: string }>) || [];

  return (
    <section
      id={SECTION_IDS.HERO}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        backgroundColor: 'var(--color-paper)',
        color: 'var(--color-ink)',
      }}
    >
      {/* ── main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{
              backgroundColor: 'var(--color-paper-2)',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-rule)',
            }}
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
            </span>
            <span>{t('hero.badge') || 'Opérationnel 24/7 · Livraison garantie'}</span>
          </motion.div>

          {/* Marquee headline */}
          <motion.h1
            className="font-bold leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-display)',
              letterSpacing: '-0.03em',
            }}
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.headline')}
          </motion.h1>
        </div>
      </div>

      {/* ── thick rule divider ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="h-1 w-24"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      {/* ── below-fold content ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* Left: subtitle + steps */}
          <div className="space-y-8">
            <motion.p
              className="leading-relaxed max-w-xl"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'var(--color-ink-2)',
                lineHeight: 1.6,
              }}
              initial={reduced ? {} : 'hidden'}
              animate="visible"
              custom={0.4}
              variants={fadeIn}
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Journey steps — text only, no emoji */}
            {steps.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-3"
                initial={reduced ? {} : 'hidden'}
                animate="visible"
                custom={0.55}
                variants={fadeIn}
              >
                {steps.map((step, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: 'var(--color-paper-2)',
                      color: 'var(--color-ink-2)',
                      border: '1px solid var(--color-rule)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                    {step.label}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={reduced ? {} : 'hidden'}
              animate="visible"
              custom={0.7}
              variants={fadeIn}
            >
              <a
                href="https://wa.me/8618851725957"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg font-semibold text-base transition-colors"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-ink)',
                }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t('cta.getQuote')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <button
                onClick={() => scrollToElement(SECTION_IDS.SERVICES)}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg font-semibold text-base transition-colors"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-ink)',
                  border: '1.5px solid var(--color-rule)',
                }}
              >
                <span>{t('cta.discoverServices')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>

          {/* Right: stats */}
          <motion.div
            className="grid grid-cols-3 gap-6"
            initial={reduced ? {} : 'hidden'}
            animate="visible"
            custom={0.6}
            variants={fadeIn}
          >
            <div className="text-left">
              <div
                className="font-bold tracking-tight"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-3xl)',
                  color: 'var(--color-ink)',
                }}
              >
                7+
              </div>
              <div
                className="text-sm font-medium uppercase tracking-wider mt-1"
                style={{ color: 'var(--color-neutral)' }}
              >
                {t('stats.experienceYears') || "Années d'expérience"}
              </div>
            </div>
            <div className="text-left">
              <div
                className="font-bold tracking-tight"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-3xl)',
                  color: 'var(--color-ink)',
                }}
              >
                {t('stats.activeClientsCount', { defaultValue: '1,247' })}
              </div>
              <div
                className="text-sm font-medium uppercase tracking-wider mt-1"
                style={{ color: 'var(--color-neutral)' }}
              >
                {t('stats.satisfiedClients', { defaultValue: 'Clients satisfaits' })}
              </div>
            </div>
            <div className="text-left">
              <div
                className="font-bold tracking-tight inline-flex items-center gap-1"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-3xl)',
                  color: 'var(--color-ink)',
                }}
              >
                <span>{t('stats.ratingValue', { defaultValue: '4.8' })}</span>
                <Star className="w-6 h-6 fill-current" style={{ color: 'var(--color-accent)' }} />
              </div>
              <div
                className="text-sm font-medium uppercase tracking-wider mt-1"
                style={{ color: 'var(--color-neutral)' }}
              >
                {t('stats.rating', { defaultValue: 'Note moyenne' })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}

export default HeroSection;

/**
 * Why Us Section — Clean Redesign
 *
 * Four value cards with Lucide icons.
 * No gradient borders, no hover glows, no emoji.
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  Gem,
  Target,
} from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations';
import { SECTION_IDS } from '../constants';

const WHY_US_KEYS = ['speed', 'reliability', 'price', 'expertise'] as const;

const WHY_US_ICONS = [Zap, Shield, Gem, Target];

function WhyUsCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <motion.div
      className="group flex flex-col h-full rounded-lg p-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        border: '1px solid var(--color-rule)',
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Icon — settles back level as the card lifts, so the two read as one move. */}
      <motion.div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
        style={{ backgroundColor: 'var(--color-paper-2)' }}
        whileHover={{ rotate: -6, scale: 1.08 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
      </motion.div>

      {/* Content */}
      <h3
        className="text-lg font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--color-ink-2)' }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export function WhyUsSection() {
  const t = useTranslations('whyUs');

  return (
    <section
      id={SECTION_IDS.WHY_US}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-paper-2)' }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection animation="blurIn" className="max-w-2xl mb-16" threshold={0.5}>
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
        </AnimatedSection>

        {/* Cards */}
        <StaggerContainer
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
          staggerDelay={0.08}
          threshold={0.15}
        >
          {WHY_US_KEYS.map((key, index) => (
            <StaggerItem key={key} animation="unfold" className="h-full">
              <WhyUsCard
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
                icon={WHY_US_ICONS[index]}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default WhyUsSection;

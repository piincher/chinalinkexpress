/**
 * Sourcing Section
 *
 * Sits directly under the hero and answers "what is this company?" in one
 * picture, before the visitor has to read a word of the services list. The
 * graphic carries the section — the copy stays short on purpose.
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AnimatedSection, SourcingConstellation } from '@/components/animations';

export function SourcingSection() {
  const t = useTranslations('sourcing');

  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        backgroundColor: 'var(--color-paper)',
        borderBottom: '1px solid var(--color-rule)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="blurIn" className="max-w-2xl mb-12" threshold={0.4}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--color-ink)',
              lineHeight: 1.05,
              overflowWrap: 'anywhere',
            }}
          >
            {t('title')}
          </h2>
          <p
            className="text-lg leading-relaxed mt-4"
            style={{ color: 'var(--color-ink-2)' }}
          >
            {t('subtitle')}
          </p>
        </AnimatedSection>

        <SourcingConstellation className="mx-auto max-w-3xl" />
      </div>
    </section>
  );
}

export default SourcingSection;

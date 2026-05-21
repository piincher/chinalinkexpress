/**
 * About Section — Clean Redesign
 *
 * Two-column layout with image gallery and text.
 * No gradients, no decorative patterns, no emoji.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { SECTION_IDS } from '../constants';

const TAGS = ['Fiable', 'Rapide', 'Sécurisé', 'Compétitif'];

export function AboutSection() {
  const t = useTranslations();

  return (
    <section
      id={SECTION_IDS.ABOUT}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-paper)' }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('about.title')}
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image gallery */}
          <div className="order-2 lg:order-1 space-y-4">
            <div
              className="relative rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--color-rule)' }}
            >
              <Image
                src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse%20view.jpg"
                alt="ChinaLink Express Warehouse"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{
                  background:
                    'linear-gradient(to top, oklch(14% 0.01 250 / 0.8), transparent)',
                }}
              >
                <div className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  Notre Entrepôt
                </div>
                <div className="text-base font-semibold text-white">
                  Foshan lishui, Chine
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--color-rule)' }}
              >
                <Image
                  src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/view1.jpg"
                  alt="Professional Team"
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              </div>
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--color-rule)' }}
              >
                <Image
                  src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/view2.jpg"
                  alt="Advanced Technology"
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2 space-y-6">
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-ink-2)' }}
            >
              {t('about.description1')}
            </p>

            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-ink-2)' }}
            >
              {t('about.description2')}
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--color-paper-2)',
                    color: 'var(--color-ink-2)',
                    border: '1px solid var(--color-rule)',
                  }}
                >
                  <Check className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

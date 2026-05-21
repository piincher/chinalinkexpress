/**
 * App Preview Section
 *
 * Two real app screenshots, no fake frames, no chrome.
 * Screenshots speak for themselves.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, Smartphone } from 'lucide-react';
import { SECTION_IDS } from '../constants';

const SCREENSHOTS = [
  {
    src: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/app-screen%20(1).jpg',
    alt: 'ChinaLink Express App — Tracking',
  },
  {
    src: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/app-screen%20(2).jpg',
    alt: 'ChinaLink Express App — Notifications',
  },
];

export function AppPreviewSection() {
  const t = useTranslations();

  return (
    <section
      id={SECTION_IDS.ABOUT + '-app'}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-paper)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'var(--color-paper-2)',
                color: 'var(--color-accent)',
                border: '1px solid var(--color-rule)',
              }}
            >
              <Smartphone className="w-4 h-4" />
              Application Mobile
            </div>

            <h2
              className="font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                color: 'var(--color-ink)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {t('appSection.title') || 'Votre fret, dans votre poche'}
            </h2>

            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-ink-2)' }}
            >
              {t('appSection.previewDescription') ||
                'Suivez vos expéditions en temps réel, recevez des notifications à chaque étape et contactez votre agent directement depuis l\'application.'}
            </p>

            <a
              href="https://wa.me/8618851725957"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: 'var(--color-accent)' }}
            >
              {t('cta.downloadApp') || "Télécharger l'application"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Right: screenshots */}
          <div className="grid grid-cols-2 gap-4">
            {SCREENSHOTS.map((shot, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden"
                style={{
                  border: '1px solid var(--color-rule)',
                  backgroundColor: 'var(--color-paper-2)',
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={400}
                  height={850}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppPreviewSection;

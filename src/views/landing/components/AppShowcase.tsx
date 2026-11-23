'use client';

/**
 * App showcase in the style of the owner's "application" flyer (2026-11-23):
 * yellow band, short headline, two real app screens (demo data), four
 * numbered benefits, black download bar. Screens: public/media/app/*.webp,
 * exported from video-projects app-presentation/assets/screens.
 */

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AppStoreButtons } from '@/components/shared/AppStoreButtons';

const FEATURES = [
  { key: 'photos', src: '/media/app/colis.webp' },
  { key: 'steps', src: '/media/app/statut.webp' },
  { key: 'eta', src: '/media/app/conteneur.webp' },
  { key: 'address', src: '/media/app/adresse.webp' },
] as const;

export function AppShowcase({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const t = useTranslations('appPage');
  const Heading = headingLevel;

  return (
    <section className="app-show">
      <div className="app-show-in">
        <span className="app-show-chip">iPhone · Android</span>
        <Heading className="app-show-title">{t('title')}</Heading>
        <p className="app-show-line">{t('line')}</p>

        {/* Owner 2026-11-23: one phone mockup per core feature (real screens, demo data). */}
        <ol className="app-show-mocks">
          {FEATURES.map(({ key, src }, i) => (
            <li key={key}>
              <div className="app-show-phone">
                <Image src={src} alt={t(`features.${key}.title`)} fill sizes="(max-width: 760px) 45vw, 22vw" />
              </div>
              <b>{i + 1}</b>
              <strong>{t(`features.${key}.title`)}</strong>
              <span>{t(`features.${key}.text`)}</span>
            </li>
          ))}
        </ol>

        <div className="app-show-bar">
          <div>
            <p className="app-show-bar-title">
              {t('downloadLead')} <span>ChinaLink Express</span>
            </p>
            <p className="app-show-bar-note">{t('note')}</p>
          </div>
          <AppStoreButtons />
        </div>
      </div>
    </section>
  );
}

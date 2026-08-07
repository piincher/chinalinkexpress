'use client';

/**
 * Pricing hero.
 *
 * What was here: a blue→indigo diagonal gradient, a tiled SVG cross pattern at
 * 10% over it, two 384px blurred colour orbs, an amber pill with a coloured
 * drop shadow, centred type, and four frosted-glass chips whose icons were
 * amber, blue and green. Seven decorative devices and four hues on a page whose
 * whole job is to look like the prices can be trusted.
 *
 * It now uses the shared PageHero, so it opens the same way as the route pages,
 * the service pages and the guides. The four transit-time facts survive as a
 * plain rule-separated line — they are the most useful thing on the screen and
 * they read better without the glass.
 */

import { useTranslations } from 'next-intl';
import { Zap, Clock, TrendingUp, Star } from 'lucide-react';
import { PageHero, PHOTOS } from '@/components/site';

export function PricingHero() {
  const t = useTranslations('pricing');

  const facts = [
    { Icon: Zap, label: t('hero.stats.express') },
    { Icon: Clock, label: t('hero.stats.standard') },
    { Icon: TrendingUp, label: t('hero.stats.sea') },
    { Icon: Star, label: t('hero.stats.reviews', { defaultValue: '4.8 ★ — 312 avis' }) },
  ];

  return (
    <PageHero
      eyebrow={t('hero.speedBadge')}
      title={t('hero.title')}
      lede={t('hero.subtitle')}
      photo={{
        src: PHOTOS.readyToLoad,
        alt: 'Marchandises emballées et étiquetées, prêtes à l’expédition',
      }}
      actions={
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(1rem, 3vw, 2.25rem)',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {facts.map(({ Icon, label }) => (
            <li
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-void-ink-2)',
              }}
            >
              <Icon size={15} aria-hidden style={{ color: 'var(--color-accent-bright)' }} />
              {label}
            </li>
          ))}
        </ul>
      }
    />
  );
}

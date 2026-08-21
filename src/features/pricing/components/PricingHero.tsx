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
import { Zap, Clock, TrendingUp, Package } from 'lucide-react';
import { PageHero, PHOTOS } from '@/components/site';
import { SHIPMENTS_HANDLED } from '@/constants/companyFacts';

export function PricingHero() {
  const t = useTranslations('pricing');

  /*
   * The fourth fact was `4.8 ★ — 312 avis`, hard-coded as a default value so it
   * rendered even with the message key missing. There are two reviews. It is
   * replaced by the number of shipments actually handled, which comes from
   * companyFacts.ts and is the kind of figure a pricing page should carry
   * anyway — a rating says people liked it, a shipment count says it runs.
   */
  const facts = [
    { Icon: Zap, label: t('hero.stats.express') },
    { Icon: Clock, label: t('hero.stats.standard') },
    { Icon: TrendingUp, label: t('hero.stats.sea') },
    { Icon: Package, label: t('hero.stats.shipments', { count: SHIPMENTS_HANDLED }) },
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

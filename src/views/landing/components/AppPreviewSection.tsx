'use client';

/**
 * App preview — the product, on the dark band.
 *
 * Two fixes and one design change.
 *
 * The images were broken in production. They carried `unoptimized`, which makes
 * Next emit the URL as-is; the `%20` in `app-screen%20(1).jpg` was then
 * normalised back into a literal space and the request 404'd. Both screenshots
 * rendered as empty grey boxes with alt text showing. Dropping `unoptimized`
 * routes them through the image optimiser, which handles the encoding — and
 * incidentally stops shipping two 477 KB JPEGs at full size.
 *
 * The design change: this sits on the void band now. Phone screenshots are
 * bright rectangles, and on white paper they float as two pale slabs with
 * nothing holding them. On the dark band they read as lit screens, which is
 * what they are.
 */

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Smartphone } from 'lucide-react';
import { Band, Shell, Cta, APP_SCREENS } from '@/components/site';
import { Reveal, RevealGroup } from '@/components/motion';
import { AppStoreButtons } from '@/components/shared/AppStoreButtons';

const SHOTS = [
  { key: 'tracking', src: APP_SCREENS.tracking, alt: 'ChinaLink Express — suivi de colis en temps réel' },
  { key: 'shipments', src: APP_SCREENS.shipments, alt: 'ChinaLink Express — liste des expéditions et statuts' },
];

export function AppPreviewSection() {
  const t = useTranslations();

  return (
    <Band id="app" tone="void">
      <Shell>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 21rem), 1fr))',
            gap: 'clamp(2.5rem, 6vw, 5rem)',
            alignItems: 'center',
          }}
        >
          {/* ── the pitch ─────────────────────────────────────────────────── */}
          <Reveal style={{ minWidth: 0 }}>
            <p
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--color-accent-bright)',
                margin: '0 0 var(--space-lg)',
              }}
            >
              <Smartphone size={14} aria-hidden />
              {t('services.appSection.title')}
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-display)',
                lineHeight: 'var(--leading-heading)',
                color: 'var(--color-void-ink)',
                margin: '0 0 var(--space-lg)',
                maxWidth: '15ch',
              }}
            >
              {t('services.appSection.previewTitle')}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-void-ink-2)',
                margin: '0 0 var(--space-xl)',
                maxWidth: '44ch',
              }}
            >
              {t('services.appSection.previewDescription')}
            </p>

            <AppStoreButtons />

            {/* Registered clients only — worth saying here rather than letting
                someone download it and hit a wall. */}
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-void-ink-2)',
                marginTop: 'var(--space-lg)',
                marginBottom: 0,
                maxWidth: '40ch',
              }}
            >
              {t('services.appSection.note')}
            </p>
          </Reveal>

          {/* ── the screens ──────────────────────────────────────────────── */}
          <RevealGroup
            stagger={0.12}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 'clamp(0.75rem, 2vw, 1.5rem)',
              minWidth: 0,
            }}
          >
            {SHOTS.map((shot, i) => (
              <div
                key={shot.key}
                style={{
                  position: 'relative',
                  aspectRatio: '9 / 19.5',
                  minWidth: 0,
                  borderRadius: 'var(--radius-panel)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-void-2)',
                  border: '1px solid var(--color-void-rule)',
                  // A slight vertical offset between the two so they read as a
                  // pair of objects rather than a two-column grid.
                  transform: i === 1 ? 'translateY(clamp(1rem, 3vw, 2.5rem))' : undefined,
                  boxShadow: 'var(--shadow-void)',
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 700px) 45vw, 22vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
            ))}
          </RevealGroup>
        </div>
      </Shell>
    </Band>
  );
}

export default AppPreviewSection;

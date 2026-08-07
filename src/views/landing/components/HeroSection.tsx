/**
 * Hero — dark industrial, photo-led.
 *
 * The previous hero was typography on white with a badge, a bouncing scroll
 * chevron, a pinging dot and three self-reported statistics. It read as a
 * template because everything in it was assertion: the page claimed to be a
 * freight company without showing one.
 *
 * This one shows the warehouse. The photograph is the company's own — real
 * forklifts, real containers, real cargo — under a two-stop scrim with the
 * headline sitting in the dark half. Below the fold line sits the carrier bar:
 * Maersk, MSC, CMA CGM, Hapag-Lloyd, Evergreen, Ethiopian, Turkish. Those seven
 * marks answer "is this a real operation" faster than any headline can.
 *
 * Motion is three gestures, in sequence: the photograph settles (scale-down),
 * the headline uncovers line by line, the supporting column rises. Then it
 * stops. The scroll chevron and the ping are gone — a hero that fidgets reads
 * as anxious, and the fold already implies scrolling.
 *
 * Server component. Only the three motion primitives are client-side, which
 * keeps the LCP element (the H1 and the photo) in the server-rendered HTML.
 */

import React from 'react';
import { getTranslations } from 'next-intl/server';
import { MessageCircle } from 'lucide-react';
import { Band, Shell, Cta, Figure, CarrierBar, PHOTOS } from '@/components/site';
import { LineReveal, Reveal } from '@/components/motion';
import { SECTION_IDS } from '../constants';
import { WHATSAPP_URL } from '../constants';

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <Band
      id={SECTION_IDS.HERO}
      tone="void"
      flush
      // Tells the fixed navbar to switch to its light-on-dark treatment while
      // it overlaps this band.
      data-nav-overlay="void"
      style={{
        position: 'relative',
        // svh, not vh: on mobile Safari `100vh` is the height *without* the URL
        // bar, so a 100vh hero is cropped on load and only fits once the bar
        // retracts. svh measures the smallest viewport and always fits.
        minHeight: 'min(100svh, 62rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* ── the warehouse ─────────────────────────────────────────────────── */}
      <Figure
        src={PHOTOS.warehouseWide}
        alt="Entrepôt de consolidation ChinaLink Express à Guangzhou : chariots élévateurs, conteneurs et marchandises palettisées"
        focal="42%"
        scrim={1}
        tint
        parallax
        rounded={false}
        priority
        sizes="100vw"
        style={{ position: 'absolute', inset: 0, borderRadius: 0 }}
      />

      {/* ── statement ─────────────────────────────────────────────────────── */}
      <Shell
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: 'calc(var(--band-y) + 3rem)',
          paddingBottom: 'var(--space-2xl)',
        }}
      >
        <Reveal delay={0.1} distance={12}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--color-accent-bright)',
              margin: '0 0 var(--space-lg)',
            }}
          >
            {t('hero.badge')}
          </p>
        </Reveal>

        <LineReveal
          as="h1"
          immediate
          delay={0.18}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-display)',
            fontWeight: 'var(--weight-display)',
            letterSpacing: 'var(--tracking-display)',
            lineHeight: 'var(--leading-display)',
            color: 'var(--color-void-ink)',
            // Held short so the headline breaks into two or three deliberate
            // lines rather than one long ribbon on a wide monitor.
            maxWidth: '17ch',
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {t('hero.headline')}
        </LineReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'end',
            marginTop: 'var(--space-xl)',
          }}
        >
          <Reveal delay={0.5}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-void-ink-2)',
                maxWidth: '46ch',
                margin: 0,
              }}
            >
              {t('hero.subheadline')}
            </p>
          </Reveal>

          <Reveal
            delay={0.62}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              justifyContent: 'flex-start',
            }}
          >
            <Cta
              href={WHATSAPP_URL}
              external
              variant="solid"
              tone="void"
              size="lg"
              magnetic
              icon={<MessageCircle size={18} aria-hidden />}
            >
              {t('cta.getQuote')}
            </Cta>
            <Cta href={`#${SECTION_IDS.SERVICES}`} variant="outline" tone="void" size="lg">
              {t('cta.discoverServices')}
            </Cta>
          </Reveal>
        </div>
      </Shell>

      {/* ── proof ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          borderTop: '1px solid color-mix(in oklch, var(--color-void-ink) 14%, transparent)',
          backgroundColor: 'color-mix(in oklch, var(--color-void) 55%, transparent)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Shell style={{ paddingBlock: 'var(--space-lg)' }}>
          <Reveal delay={0.8} distance={10}>
            <CarrierBar tone="void" label={t('landing.carriersLabel')} />
          </Reveal>
        </Shell>
      </div>
    </Band>
  );
}

export default HeroSection;

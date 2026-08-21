/**
 * Hero — statement left, live route network right.
 *
 * The previous version filled the fold with a single warehouse photograph. That
 * was the right call at the time — it was the fastest way to prove the company
 * physically exists — but a photograph says "we have a warehouse" and stops
 * there. The globe says "we run these eleven lanes", which is the thing a
 * prospective importer in Bamako is actually trying to find out, and it says it
 * with the company's real coordinates.
 *
 * The photography has not been dropped, only moved to where it argues best:
 * the About section, the Journey sequence, and every inner-page PageHero. The
 * fold now carries the network; the rest of the page carries the evidence.
 *
 * Layout is a two-column split above 900px and stacks below it, with the globe
 * bleeding off the right edge so it reads as a fragment of something larger
 * rather than a contained illustration.
 *
 * Server component. The globe is client-only, dynamically imported and mounted
 * on intersection, so none of Three.js sits in front of the LCP text.
 */

import React from 'react';
import { getTranslations } from 'next-intl/server';
import { MessageCircle } from 'lucide-react';
import { Band, Shell, Cta, CarrierBar } from '@/components/site';
import { LineReveal, Reveal } from '@/components/motion';
import { RouteGlobe } from '@/features/route-globe';
import { LaneTicker } from './LaneTicker';
import { SECTION_IDS, HERO_WHATSAPP_URL } from '../constants';

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <Band
      id={SECTION_IDS.HERO}
      tone="void"
      flush
      data-nav-overlay="void"
      style={{
        position: 'relative',
        minHeight: 'min(100svh, 60rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── the network ───────────────────────────────────────────────────
          Absolutely placed and bled off the right edge. Sits behind the text
          on narrow screens, beside it on wide ones — the column below is what
          keeps the headline clear of it. */}
      <div className="hero-globe" aria-hidden>
        <RouteGlobe />
      </div>

      <Shell
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: 'calc(4rem + var(--space-2xl))',
          paddingBottom: 'var(--space-2xl)',
        }}
      >
        <div className="hero-grid">
          <div style={{ minWidth: 0 }}>
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

            {/*
              Set at --text-display-s (max 4rem) rather than --text-display
              (max 6.5rem). The headline is two sentences now, and at the larger
              step it filled the entire fold on a laptop — the visitor would have
              had to scroll before learning anything beyond the slogan, which is
              the specific failure a hero is supposed to avoid. Two sentences at
              4rem still dominate the screen and leave room for the sub-line and
              both buttons above the fold.
            */}
            <LineReveal
              as="h1"
              immediate
              delay={0.18}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-display-s)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-display)',
                lineHeight: 'var(--leading-display)',
                color: 'var(--color-void-ink)',
                maxWidth: '19ch',
                margin: 0,
                textWrap: 'balance',
              }}
            >
              {t('hero.headline')}
            </LineReveal>

            <Reveal delay={0.5}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-md)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--color-void-ink-2)',
                  maxWidth: '44ch',
                  margin: 'var(--space-xl) 0 0',
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
                marginTop: 'var(--space-xl)',
              }}
            >
              {/*
                Two actions, not four. "Obtenir un devis gratuit" is what every
                forwarder's hero says and it asks the visitor to commit to a
                transaction they cannot yet price; "Expédier avec ChinaLink"
                names the company and the act.
                The message is pre-filled so the conversation starts with
                context instead of "Bonjour" — see HERO_WHATSAPP_URL.
              */}
              <Cta
                href={HERO_WHATSAPP_URL}
                external
                variant="solid"
                tone="void"
                size="lg"
                magnetic
                data-cta="hero-whatsapp"
                icon={<MessageCircle size={18} aria-hidden />}
              >
                {t('cta.startShipping')}
              </Cta>
              {/*
                The secondary path used to point at #services — a list of what
                we sell, to a visitor who does not yet know how any of it works.
                It points at the journey instead, which is the section that
                answers the question the headline just raised. It is also a real
                anchor on this page: there is no public tracking page on the
                web, so a "track my parcel" button here would lead nowhere.
              */}
              <Cta href="#parcours" variant="outline" tone="void" size="lg" data-cta="hero-journey">
                {t('cta.seeHowItWorks')}
              </Cta>
            </Reveal>
          </div>

          {/* Right column is empty on purpose: it reserves the grid space the
              globe occupies so the headline never runs under it. */}
          <div aria-hidden />
        </div>
      </Shell>

      {/* ── lanes + carriers ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          borderTop: '1px solid color-mix(in oklch, var(--color-void-ink) 14%, transparent)',
          backgroundColor: 'color-mix(in oklch, var(--color-void) 62%, transparent)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <LaneTicker />
        <Shell style={{ paddingBottom: 'var(--space-lg)' }}>
          <Reveal delay={0.8} distance={10}>
            <CarrierBar tone="void" label={t('landing.carriersLabel')} />
          </Reveal>
        </Shell>
      </div>
    </Band>
  );
}

export default HeroSection;

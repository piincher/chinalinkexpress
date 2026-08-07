'use client';

/**
 * PageHero — the opening screen for every page that isn't the home page.
 *
 * Thirty of this site's sixty routes render through three shells: RoutePage
 * (11 country routes), SeoServicePage (10 service and industry pages) and
 * SeoGuidePage (9 guides and blog posts). Each had invented its own hero.
 * RoutePage opened on a three-hue diagonal gradient — blue through indigo to
 * purple — with a centred pill, a white button and a green button. The two SEO
 * shells opened on `bg-slate-950` with a blue-tinted pill and a green WhatsApp
 * button. Same job, three answers, none of them the home page's.
 *
 * One component now covers all three, so a visitor arriving from Google on a
 * route page meets the same voice as one arriving on the home page: the void
 * band, Archivo at display size, the mono eyebrow, the single accent.
 *
 * `photo` is optional and mostly unused — the guides are text, and a decorative
 * photograph behind an article title is filler. Route and service pages take
 * one because for them the warehouse is the argument.
 */

import React from 'react';
import { Band, Shell } from './Band';
import { Figure } from './Figure';

interface PageHeroProps {
  /** Small line above the title. Mono, uppercase, accent. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Buttons — pass `Cta` elements with tone="void". */
  actions?: React.ReactNode;
  /** Byline-style facts under the lede: updated date, read time, reviewer. */
  meta?: React.ReactNode[];
  /** Optional background photograph, run through the house scrim. */
  photo?: { src: string; alt: string };
  /** Breadcrumbs or any other slot rendered above the eyebrow. */
  above?: React.ReactNode;
  /** Constrain the measure — guides read better narrow. */
  width?: 'default' | 'narrow';
}

export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  meta,
  photo,
  above,
  width = 'default',
}: PageHeroProps) {
  return (
    <Band
      tone="void"
      flush
      data-nav-overlay="void"
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Clears the fixed navbar, then gives the title room without pretending
        // to be a full-height hero — that belongs to the home page alone.
        paddingTop: 'calc(4rem + clamp(3rem, 7vw, 6rem))',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
      }}
    >
      {photo && (
        <Figure
          src={photo.src}
          alt={photo.alt}
          focal="40%"
          scrim={1}
          tint
          rounded={false}
          priority
          sizes="100vw"
          style={{ position: 'absolute', inset: 0, borderRadius: 0 }}
        />
      )}

      <Shell
        width={width === 'narrow' ? 'narrow' : 'default'}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {above}

        {eyebrow && (
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
            {eyebrow}
          </p>
        )}

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--weight-display)',
            letterSpacing: 'var(--tracking-display)',
            lineHeight: 'var(--leading-heading)',
            color: 'var(--color-void-ink)',
            margin: 0,
            // Route titles interpolate two country names and can run long.
            maxWidth: '22ch',
            overflowWrap: 'anywhere',
          }}
        >
          {title}
        </h1>

        {lede && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-md)',
              lineHeight: 'var(--leading-body)',
              color: 'var(--color-void-ink-2)',
              margin: 'var(--space-lg) 0 0',
              maxWidth: '58ch',
            }}
          >
            {lede}
          </p>
        )}

        {meta && meta.length > 0 && (
          <p
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.06em',
              color: 'var(--color-muted)',
              margin: 'var(--space-xl) 0 0',
            }}
          >
            {meta.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </p>
        )}

        {actions && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              marginTop: 'var(--space-xl)',
            }}
          >
            {actions}
          </div>
        )}
      </Shell>
    </Band>
  );
}

export default PageHero;

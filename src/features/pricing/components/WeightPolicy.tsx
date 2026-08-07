'use client';

/**
 * Weight policy disclosure.
 *
 * Two rules govern the invoiced weight of every air shipment — rounding up to
 * the next 0.1 kg, and a flat 0.05 kg per kg (5%) handling coefficient. Both
 * are published in CGV article 3.1, and neither appeared anywhere on the
 * pricing page or the calculator: a client could read a rate, run an estimate,
 * and first meet the coefficient on their invoice.
 *
 * This states them where the prices are. It is disclosure only — deliberately
 * NOT wired into `pricingEngine.ts`. The calculator keeps showing the
 * chargeable weight before the coefficient, and the lede says so explicitly, so
 * the figure on screen and the figure in the estimate agree with each other.
 *
 * The copy tracks the legal text: the numbers and the list of what the
 * coefficient covers are verbatim from article 3.1.3, and every locale links to
 * the full article rather than paraphrasing away the client's right to read it.
 */

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Scale, Package, ArrowRight } from 'lucide-react';
import { Band, Shell } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { Reveal } from '@/components/motion';

export function WeightPolicy() {
  const t = useTranslations('pricing.weightPolicy');
  const locale = useLocale();

  const covers = (t.raw('covers') as string[]) ?? [];
  const order = (t.raw('order') as string[]) ?? [];
  const example = (t.raw('example') as string[]) ?? [];

  return (
    <Band id="politique-poids" tone="paper-2" ruled>
      <Shell>
        <SectionHead title={t('title')} lede={t('lede')} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'start',
          }}
        >
          {/* ── the two rules ────────────────────────────────────────────── */}
          <Reveal style={{ minWidth: 0 }}>
            {[
              { Icon: Scale, title: t('roundingTitle'), body: t('rounding') },
              { Icon: Package, title: t('coefficientTitle'), body: t('coefficient') },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                style={{
                  paddingBlock: 'var(--space-lg)',
                  borderTop: '1px solid var(--color-rule)',
                }}
              >
                <h3
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--weight-heading)',
                    letterSpacing: 'var(--tracking-heading)',
                    color: 'var(--color-ink)',
                    margin: '0 0 var(--space-sm)',
                  }}
                >
                  <Icon size={18} aria-hidden style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    lineHeight: 'var(--leading-body)',
                    color: 'var(--color-ink-2)',
                    margin: 0,
                    maxWidth: 'var(--measure)',
                  }}
                >
                  {body}
                </p>
              </div>
            ))}

            {/* What the coefficient buys. Worth listing: it is the difference
                between a surcharge and a service. */}
            <div style={{ paddingBlock: 'var(--space-lg)', borderTop: '1px solid var(--color-rule)' }}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral)',
                  margin: '0 0 var(--space-sm)',
                }}
              >
                {t('coversLabel')}
              </p>
              <ul
                style={{
                  margin: '0 0 var(--space-md)',
                  paddingInlineStart: '1.1rem',
                  color: 'var(--color-ink-2)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.65,
                  maxWidth: 'var(--measure)',
                }}
              >
                {covers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--color-neutral)',
                  margin: 0,
                  maxWidth: 'var(--measure)',
                }}
              >
                {t('noExtra')}
              </p>
            </div>
          </Reveal>

          {/* ── order of application + worked example ────────────────────── */}
          <Reveal delay={0.1} style={{ minWidth: 0 }}>
            <div
              style={{
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                borderRadius: 'var(--radius-panel)',
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-rule)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  margin: '0 0 var(--space-md)',
                }}
              >
                {t('orderTitle')}
              </p>

              <ol
                style={{
                  listStyle: 'none',
                  margin: '0 0 var(--space-xl)',
                  padding: 0,
                  counterReset: 'step',
                }}
              >
                {order.map((step) => (
                  <li
                    key={step}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto minmax(0, 1fr)',
                      gap: 'var(--space-sm)',
                      paddingBlock: '0.4rem',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-ink-2)',
                      counterIncrement: 'step',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-muted)',
                      }}
                    >
                      {String(order.indexOf(step) + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral)',
                  margin: '0 0 var(--space-sm)',
                }}
              >
                {t('exampleTitle')}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  margin: '0 0 var(--space-lg)',
                  padding: 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.85,
                  color: 'var(--color-ink)',
                }}
              >
                {example.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              <Link href={`/${locale}/terms#pricing`} className="cta cta--quiet">
                <span>{t('termsLink')}</span>
                <ArrowRight className="cta-arrow" size={15} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </Shell>
    </Band>
  );
}

export default WeightPolicy;

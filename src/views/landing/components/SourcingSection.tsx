'use client';

/**
 * Sourcing — the one-line answer to "what is this company?".
 *
 * It sits directly under the hero, so it has about four seconds. What was here
 * was a 1,273px-tall node diagram: eight rounded pills — 1688, Taobao, Alibaba,
 * Pinduoduo on the left, Guangzhou, Yiwu, Shenzhen, Foshan on the right — wired
 * to a blue box in the middle, floating in roughly 700px of empty white. It
 * took a full screen to say something the subtitle already says in one line,
 * and the emptiness read as an unfinished page rather than as breathing room.
 *
 * It is now a single horizontal statement: where you buy → what we do → where
 * it lands. Three columns, two arrows, hairline rules. The marketplace names
 * are set as a plain wrapped list, which is also more honest — they are names
 * we accept orders from, not network nodes.
 *
 * Roughly a fifth of the height, and it actually reads.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Store, Warehouse, MapPin } from 'lucide-react';
import { Band, Shell } from '@/components/site';
import { Reveal, RevealGroup } from '@/components/motion';

/** Marketplaces and factory cities ChinaLink already receives orders from. */
const MARKETPLACES = ['1688', 'Taobao', 'Alibaba', 'Pinduoduo'];
const CITIES = ['Guangzhou', 'Yiwu', 'Shenzhen', 'Foshan'];

export function SourcingSection() {
  const t = useTranslations('sourcing');

  const steps = [
    { Icon: Store, label: 'Vous achetez', items: MARKETPLACES },
    { Icon: Warehouse, label: 'Nous consolidons', items: CITIES },
    { Icon: MapPin, label: 'Vous recevez', items: ['Bamako'] },
  ];

  return (
    <Band tone="paper" ruled>
      <Shell>
        <Reveal style={{ marginBottom: 'var(--space-2xl)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-display)',
              letterSpacing: 'var(--tracking-display)',
              lineHeight: 'var(--leading-heading)',
              color: 'var(--color-ink)',
              margin: '0 0 var(--space-lg)',
              maxWidth: '18ch',
            }}
          >
            {t('title')}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-md)',
              lineHeight: 'var(--leading-body)',
              color: 'var(--color-ink-2)',
              margin: 0,
              maxWidth: 'var(--measure)',
            }}
          >
            {t('subtitle')}
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.1}
          selector="[data-flow-step]"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            gap: 'clamp(1rem, 3vw, 2.5rem)',
          }}
        >
          {steps.map(({ Icon, label, items }, i) => (
            <React.Fragment key={label}>
              <div
                data-flow-step
                style={{
                  flex: '1 1 14rem',
                  minWidth: 0,
                  paddingTop: 'var(--space-lg)',
                  borderTop: '2px solid var(--color-ink)',
                }}
              >
                <Icon
                  size={20}
                  aria-hidden
                  style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-md)' }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--weight-heading)',
                    letterSpacing: 'var(--tracking-heading)',
                    color: 'var(--color-ink)',
                    margin: '0 0 var(--space-sm)',
                  }}
                >
                  {label}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.7,
                    color: 'var(--color-ink-2)',
                    margin: 0,
                  }}
                >
                  {items.join(' · ')}
                </p>
              </div>

              {i < steps.length - 1 && (
                <ArrowRight
                  size={18}
                  aria-hidden
                  style={{
                    flex: '0 0 auto',
                    alignSelf: 'center',
                    color: 'var(--color-muted)',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </RevealGroup>
      </Shell>
    </Band>
  );
}

export default SourcingSection;

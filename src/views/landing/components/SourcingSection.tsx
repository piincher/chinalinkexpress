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
import { WAREHOUSES } from '@/constants/companyFacts';

/** Marketplaces ChinaLink already receives orders from. */
const MARKETPLACES = ['1688', 'Taobao', 'Alibaba', 'Pinduoduo'];

/*
 * The two cities where goods are actually received, from the warehouse records
 * — not a list of Chinese trading hubs. This read `Guangzhou · Yiwu · Shenzhen
 * · Foshan`, which implied four receiving points; there are two, and naming
 * them precisely is the more useful and more checkable claim. Suffixed with the
 * mode because that is the thing a supplier needs to get right.
 */
// Mode kept as the bare AIR / SEA code: it is set in the mono face, it is the
// vocabulary used on the warehouse instructions clients already receive, and it
// needs no translation across the four locales this line renders in.
const WAREHOUSE_CITIES = WAREHOUSES.map((w) => `${w.city} ${w.mode}`);

export function SourcingSection() {
  const t = useTranslations('sourcing');

  /*
   * These three labels were hard-coded French inside the component, so the
   * English, Chinese and Arabic homepages rendered "Vous achetez / Nous
   * consolidons / Vous recevez" in the middle of their own copy. They now come
   * from the message catalogue like everything else.
   *
   * "Nous consolidons" also became "Nous réceptionnons": receiving is the step
   * that actually happens here and the word a supplier and a client both use.
   * Consolidation is one thing we do afterwards, and it has its own row in the
   * services index.
   */
  const steps = [
    { Icon: Store, label: t('steps.buy'), items: MARKETPLACES },
    { Icon: Warehouse, label: t('steps.consolidate'), items: WAREHOUSE_CITIES },
    { Icon: MapPin, label: t('steps.receive'), items: ['Bamako'] },
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

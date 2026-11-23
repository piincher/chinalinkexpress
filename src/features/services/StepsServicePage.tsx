'use client';

/**
 * Simple service page (owner 2026-11-24): a title, one line, a few steps on the
 * scroll-filling flow line, one action. Used by /services/sourcing, supplier
 * payment and supplier verification. Copy lives in one i18n namespace per page
 * (title, line, steps.<key>.title/line). Never name a buying platform; delivery
 * names Bamako (Mali, West Africa) and Kampala (Uganda, East Africa).
 */

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { PageHero, Band, Shell, Cta } from '@/components/site';
import { useFlowLine } from '@/components/motion/useFlowLine';
import { HERO_WHATSAPP_URL } from '@/views/landing/constants';

interface Props {
  /** i18n namespace holding title, line and steps.<key>.{title,line}. */
  ns: string;
  steps: readonly string[];
  /** data-cta value for the WhatsApp click analytics. */
  cta: string;
}

export function StepsServicePage({ ns, steps, cta }: Props) {
  const t = useTranslations(ns);
  const tHome = useTranslations('home');
  const ref = useRef<HTMLOListElement>(null);
  useFlowLine(ref);

  return (
    <main style={{ backgroundColor: 'var(--color-paper)' }}>
      <PageHero title={t('title')} lede={t('line')} />
      <Band tone="paper">
        <Shell>
          <ol ref={ref} className="src-flow flow-line">
            {steps.map((key, i) => (
              <li key={key} className="src-row">
                <span className="flow-node">{String(i + 1).padStart(2, '0')}</span>
                <div className="how-text">
                  <strong>{t(`steps.${key}.title`)}</strong>
                  <span>{t(`steps.${key}.line`)}</span>
                </div>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 'var(--space-2xl)' }}>
            <Cta
              href={HERO_WHATSAPP_URL}
              external
              variant="solid"
              size="lg"
              arrow={false}
              data-cta={cta}
              icon={<MessageCircle size={18} aria-hidden />}
            >
              {tHome('getQuote')}
            </Cta>
          </div>
        </Shell>
      </Band>
    </main>
  );
}

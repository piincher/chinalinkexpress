'use client';

/**
 * FAQ — a rule-separated list, not a stack of cards.
 *
 * Each question was a bordered, rounded, shadowed card with a circular chevron
 * chip that filled solid blue when open. Six of those in a column is six boxes
 * competing with each other; the reader is scanning for one question, and the
 * chrome is louder than the questions are.
 *
 * Now: hairline rules, the question in the display face, a thin chevron that
 * rotates. The whole affordance is that the row is clickable and the divider
 * tells you where one ends.
 *
 * Still native `<details>`/`<summary>` — it is keyboard-accessible, it works
 * without JavaScript, and crawlers read the answers. Nothing about a premium
 * look required replacing that with state.
 *
 * The support panel above sits on the dark band rather than being a saturated
 * blue slab with a white radial bloom, and the phone number is the call to
 * action rather than a 📞 emoji on a white pill.
 */

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Phone, ChevronDown } from 'lucide-react';
import { Band, Shell } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { Reveal, RevealGroup } from '@/components/motion';
import { SECTION_IDS } from '../constants';
import { CONTACT_CONFIG } from '@/config/app';
import { PHOTOS } from '@/components/site/assets';

const FAQ_KEYS = ['0', '1', '2', '3', '4', '5'] as const;

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="faq-item">
      <summary className="faq-q">
        <span>{question}</span>
        <ChevronDown size={18} aria-hidden className="faq-chevron" />
      </summary>
      <div className="faq-a">{answer}</div>
    </details>
  );
}

export function FAQSection() {
  const t = useTranslations('faq');

  return (
    <Band id={SECTION_IDS.FAQ} tone="paper-2">
      <Shell width="narrow">
        <SectionHead label={t('sectionLabel')} title={t('title')} />

        {/* ── support panel ────────────────────────────────────────────── */}
        <Reveal
          className="band-void"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2.5rem)',
            alignItems: 'center',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: 'var(--space-2xl)',
            borderRadius: 'var(--radius-panel)',
            backgroundColor: 'var(--color-void)',
            color: 'var(--color-void-ink)',
          }}
        >
          <div
            style={{
              position: 'relative',
              aspectRatio: '4 / 3',
              minWidth: 0,
              borderRadius: 'var(--radius-card)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-void-2)',
            }}
          >
            <Image
              src={PHOTOS.support}
              alt="Équipe support client ChinaLink Express"
              fill
              sizes="(max-width: 700px) 100vw, 22vw"
              style={{ objectFit: 'cover', filter: 'saturate(0.8) contrast(1.03)' }}
            />
          </div>

          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-heading)',
                color: 'var(--color-void-ink)',
                margin: '0 0 var(--space-sm)',
              }}
            >
              {t('helpTitle')}
            </h3>
            <p
              style={{
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-void-ink-2)',
                margin: '0 0 var(--space-lg)',
              }}
            >
              {t('helpDescription')}
            </p>

            <a href={`tel:${CONTACT_CONFIG.PHONE.CHINA}`} className="faq-phone">
              <Phone size={18} aria-hidden style={{ color: 'var(--color-accent-bright)' }} />
              <span>
                <span className="faq-phone-label">{t('supportLabel')}</span>
                <span className="faq-phone-number">{CONTACT_CONFIG.PHONE.CHINA}</span>
              </span>
            </a>
          </div>
        </Reveal>

        {/* ── questions ────────────────────────────────────────────────── */}
        <RevealGroup stagger={0.05} selector=".faq-item">
          <div style={{ borderTop: '1px solid var(--color-rule)' }}>
            {FAQ_KEYS.map((key) => (
              <FAQItem
                key={key}
                question={t(`items.${key}.question`)}
                answer={t(`items.${key}.answer`)}
              />
            ))}
          </div>
        </RevealGroup>
      </Shell>
    </Band>
  );
}

export default FAQSection;

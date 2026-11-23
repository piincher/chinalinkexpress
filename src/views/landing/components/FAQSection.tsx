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
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Band, Shell } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { SECTION_IDS } from '../constants';

// Owner 2026-11-23: four questions on the home page; the rest are on /faq.
const FAQ_KEYS = ['0', '1', '2', '3'] as const;

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

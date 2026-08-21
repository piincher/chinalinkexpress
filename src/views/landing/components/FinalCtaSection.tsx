'use client';

/**
 * The close.
 *
 * The page previously ended on the contact form, which is a form and not an
 * argument — a reader who has scrolled the whole way arrives at a text field
 * rather than at a reason. This band goes before it: one question, one line
 * telling the visitor exactly what to send, and the two actions that already
 * exist elsewhere on the page.
 *
 * Deliberately the third and last `void` band, after the hero and the journey.
 * Three dark bands are the page's structure — opening statement, centre of
 * gravity, close — and a fourth would stop any of them meaning anything.
 *
 * No new CTA is introduced. The primary is the same WhatsApp line with the same
 * pre-filled message as the hero, and the secondary points at the contact
 * section immediately below, which is where someone who wants to compose a
 * longer message goes.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { Band, Shell, Cta } from '@/components/site';
import { Reveal } from '@/components/motion';
import { SECTION_IDS, HERO_WHATSAPP_URL } from '../constants';

export function FinalCtaSection() {
  const t = useTranslations();

  return (
    <Band tone="void">
      <Shell>
        <Reveal>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-display)',
              letterSpacing: 'var(--tracking-display)',
              lineHeight: 'var(--leading-heading)',
              color: 'var(--color-void-ink)',
              margin: 0,
              maxWidth: '18ch',
            }}
          >
            {t('landing.finalCta.title')}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-md)',
              lineHeight: 'var(--leading-body)',
              color: 'var(--color-void-ink-2)',
              maxWidth: '48ch',
              margin: 'var(--space-lg) 0 0',
            }}
          >
            {t('landing.finalCta.lede')}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              marginTop: 'var(--space-xl)',
            }}
          >
            <Cta
              href={HERO_WHATSAPP_URL}
              external
              variant="solid"
              tone="void"
              size="lg"
              data-cta="final-whatsapp"
              icon={<MessageCircle size={18} aria-hidden />}
            >
              {t('cta.startShipping')}
            </Cta>
            <Cta
              href={`#${SECTION_IDS.CONTACT}`}
              variant="outline"
              tone="void"
              size="lg"
              data-cta="final-contact"
            >
              {t('cta.contactUs')}
            </Cta>
          </div>
        </Reveal>
      </Shell>
    </Band>
  );
}

export default FinalCtaSection;

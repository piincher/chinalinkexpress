'use client';

/**
 * The readiness quiz — brought onto the site's design system.
 *
 * This was the last section on the home page still speaking the old visual
 * vocabulary, and it showed: a `bg-gradient-to-b from-blue-50` band, a pill
 * eyebrow on a tinted chip, a centred `text-6xl font-extrabold` heading with a
 * blue accent span, three green dots as a benefits row, a hardcoded
 * `bg-green-500` WhatsApp button, and two inline check SVGs. Every one of those
 * is a pattern that was deliberately swept out of the other forty-odd sections
 * of this site; leaving one behind is worse than never having done the sweep,
 * because the reader registers the inconsistency without being able to name it.
 *
 * It now composes Band / Shell / SectionHead / Cta like everything else. The
 * quiz itself — `QuizContainer`, the submission flow, the WhatsApp guide
 * delivery — is untouched; only its frame changed.
 *
 * Two content fixes while here:
 *
 *   · "500+ importateurs accompagnés" contradicted the real client count three
 *     sections above it on the same page. It reads 253 now, from the same
 *     verified source as the figures band.
 *   · "Réponse en 10 min" promised a response time nobody measures. It now
 *     says where the answer arrives, which is true and is the useful part.
 *
 *   · The English-locale fallback CTA had the sales number hardcoded into a
 *     wa.me URL — the fifth copy of that number in the codebase before the
 *     numbers were consolidated. It goes through `whatsappUrl` now.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Check } from 'lucide-react';
import { QuizContainer } from '@/features/import-quiz';
import { Band, Shell, Cta } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { Reveal } from '@/components/motion';
import { whatsappUrl, WHATSAPP_SALES } from '@/constants/contact';
import type { Locale } from '@/i18n/config';

interface QuizSectionProps {
  locale?: Locale;
}

const EN_QUIZ_WHATSAPP = whatsappUrl(
  WHATSAPP_SALES,
  'Hello ChinaLink, I would like advice before importing from China.'
);

export function QuizSection({ locale = 'fr' }: QuizSectionProps) {
  const t = useTranslations('quizSection');
  // The quiz content itself only exists in French.
  const isFrenchQuizAvailable = locale === 'fr';

  const benefits = (t.raw('benefits') as string[]) ?? [];

  return (
    <Band id="quiz" tone="paper" ruled>
      <Shell>
        <SectionHead
          label={t('badge')}
          title={
            <>
              {t('title')} {t('titleAccent')}
            </>
          }
          lede={
            <>
              {t('descriptionBefore')}{' '}
              <strong style={{ color: 'var(--color-ink)', fontWeight: 'var(--weight-heading)' }}>
                {t('descriptionStrong')}
              </strong>{' '}
              {t('descriptionAfter')}
            </>
          }
        />

        {/* ── what you get, as a plain rule-separated line ────────────────── */}
        <Reveal
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          {benefits.map((benefit) => (
            <span
              key={benefit}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-ink-2)',
              }}
            >
              <Check size={15} aria-hidden style={{ color: 'var(--color-accent)' }} />
              {benefit}
            </span>
          ))}
        </Reveal>

        {/* ── the quiz ────────────────────────────────────────────────────── */}
        <Reveal
          style={{
            maxWidth: '44rem',
            borderRadius: 'var(--radius-panel)',
            border: '1px solid var(--color-rule)',
            backgroundColor: 'var(--color-paper)',
            overflow: 'hidden',
          }}
        >
          {isFrenchQuizAvailable ? (
            <QuizContainer />
          ) : (
            <div style={{ padding: 'var(--space-2xl)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--weight-heading)',
                  letterSpacing: 'var(--tracking-heading)',
                  color: 'var(--color-ink)',
                  margin: 0,
                }}
              >
                {t('englishCtaTitle')}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--color-ink-2)',
                  margin: 'var(--space-md) 0 var(--space-xl)',
                  maxWidth: 'var(--measure)',
                }}
              >
                {t('englishCtaText')}
              </p>
              <Cta
                href={EN_QUIZ_WHATSAPP}
                external
                variant="solid"
                arrow={false}
                data-cta="quiz-whatsapp"
                icon={<MessageCircle size={18} aria-hidden />}
              >
                {t('englishCtaButton')}
              </Cta>
            </div>
          )}
        </Reveal>

        {/* ── the two facts underneath ────────────────────────────────────── */}
        <Reveal>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--color-neutral)',
              marginTop: 'var(--space-xl)',
              marginBottom: 0,
            }}
          >
            {t('trustImporters')} · {t('trustResponse')}
          </p>
        </Reveal>
      </Shell>
    </Band>
  );
}

export default QuizSection;

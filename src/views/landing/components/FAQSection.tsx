/**
 * FAQ Section Component
 * 
 * Clean, accessible accordion using native HTML details/summary elements.
 * Lightweight implementation with basic CSS transitions.
 * Part of the landing page feature.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';
import { AnimatedSection } from '@/components/animations';
import { SECTION_IDS } from '../constants';
import { CONTACT_CONFIG } from '@/config/app';

interface FAQItemProps {
  question: string;
  answer: string;
}

// Clean FAQ item using native details/summary
function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <summary className="w-full px-6 py-5 text-left flex justify-between items-center cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]">
        <span className="font-bold text-lg text-[var(--text-primary)] group-open:text-[var(--color-primary)] transition-colors pr-4">
          {question}
        </span>
        
        <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 bg-[var(--surface-lowered)] text-[var(--text-secondary)] group-hover:bg-[var(--color-primary-50)] group-hover:text-[var(--color-primary)] group-open:bg-[var(--color-primary)] group-open:text-white">
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-open:rotate-180" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      
      <div className="px-6 pb-5 text-[var(--text-secondary)] leading-relaxed">
        <div className="pt-2 border-t border-[var(--border)]">
          {answer}
        </div>
      </div>
      
      {/* Active indicator line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-light)] opacity-0 group-open:opacity-100 transition-opacity duration-300" />
    </details>
  );
}

const FAQ_KEYS = ['0', '1', '2', '3', '4', '5'] as const;

export function FAQSection() {
  const t = useTranslations('faq');

  return (
    <section id={SECTION_IDS.FAQ} className="relative py-24 md:py-32 overflow-hidden bg-[var(--surface)]">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] via-[var(--surface-elevated)] to-[var(--surface)]" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection animation="blurIn" className="text-center mb-16" threshold={0.4}>
          <span className="inline-block font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)] mb-4">
            {t('sectionLabel') || 'FAQ'}
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            {t('title')}
          </h2>
          
        </AnimatedSection>

        {/* Support panel.
            Was a fully saturated blue slab with a white radial bloom washed
            across it — the loudest object on the page, and shouting from a
            support panel is the wrong register entirely. It now sits on the
            page's dark band, which is where emphasis lives everywhere else on
            this site, so it reads as considered rather than as an advert. */}
        <div
          className="band-void grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 rounded-xl p-8 overflow-hidden relative"
          style={{
            backgroundColor: 'var(--color-void)',
            color: 'var(--color-void-ink)',
          }}
        >
          
          <div className="relative z-10">
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/customer-support.png"
                alt="Customer Support"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center">
            <h3
              className="mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-heading)',
                color: 'var(--color-void-ink)',
              }}
            >
              {t('helpTitle')}
            </h3>
            <p
              className="mb-6"
              style={{
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-void-ink-2)',
              }}
            >
              {t('helpDescription')}
            </p>

            {/* The number itself is the call to action, so it is set in the mono
                face at size rather than buried under a 📞 emoji on a white pill. */}
            <a
              href={`tel:${CONTACT_CONFIG.PHONE.CHINA}`}
              className="inline-flex items-center gap-3 self-start px-5 py-4 rounded-lg transition-colors"
              style={{
                backgroundColor: 'color-mix(in oklch, var(--color-void-ink) 8%, transparent)',
                border: '1px solid var(--color-void-rule)',
                textDecoration: 'none',
              }}
            >
              <Phone size={20} aria-hidden style={{ color: 'var(--color-accent-bright)', flexShrink: 0 }} />
              <span>
                <span
                  className="block"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-label)',
                    textTransform: 'uppercase',
                    color: 'var(--color-void-ink-2)',
                  }}
                >
                  {t('supportLabel')}
                </span>
                <span
                  className="block"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-md)',
                    color: 'var(--color-void-ink)',
                    marginTop: '0.15rem',
                  }}
                >
                  {CONTACT_CONFIG.PHONE.CHINA}
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 relative">
          {FAQ_KEYS.map((key) => (
            <FAQItem
              key={key}
              question={t(`items.${key}.question`)}
              answer={t(`items.${key}.answer`)}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[var(--text-secondary)] mb-4">{t('noAnswer') || 'Vous ne trouvez pas votre réponse ?'}</p>
          <a
            href="https://wa.me/8618851725957"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-dark] transition-colors duration-300 hover:gap-3"
          >
            {t('contactWhatsApp') || 'Contactez-nous sur WhatsApp'}
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;

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
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-full text-sm font-semibold mb-4">
            {t('sectionLabel') || 'FAQ'}
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            {t('title')}
          </h2>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full" />
        </div>

        {/* Support Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-dark)] rounded-3xl p-8 text-white overflow-hidden relative">
          {/* Background decoration */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            }}
          />
          
          <div className="relative z-10">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
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
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{t('helpTitle')}</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              {t('helpDescription')}
            </p>
            
            {/* CTA button */}
            <a
              href={`tel:${CONTACT_CONFIG.PHONE.CHINA}`}
              className="inline-flex items-center gap-3 bg-white text-[var(--color-primary-700)] px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <span className="text-2xl">📞</span>
              <div>
                <div className="text-xs text-[var(--color-primary)] font-medium uppercase tracking-wider">{t('supportLabel')}</div>
                <div className="text-lg text-[var(--text-primary)]">{CONTACT_CONFIG.PHONE.CHINA}</div>
              </div>
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

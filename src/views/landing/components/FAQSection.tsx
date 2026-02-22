/**
 * FAQ Section Component
 * 
 * Smooth animated accordion with spring physics,
 * gradient backgrounds, and hover effects.
 * Part of the landing page feature.
 * 
 * READABILITY FIXES:
 * - Fixed background for dark mode support
 * - WCAG AA compliant text contrast
 * - Improved accordion item backgrounds
 * - Better hover and active states
 * - Consistent use of CSS variables
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useUIStore } from '@/store/useUIStore';
import { AnimatedSection, SplitText } from '@/components/animations';
import { SECTION_IDS } from '../constants';
import { CONTACT_CONFIG } from '@/config/app';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}

// FIXED: Improved FAQ item with proper dark mode support
function FAQItem({ question, answer, index, isActive, onToggle }: FAQItemProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className={`relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm transition-shadow duration-300 ${
          isActive ? 'shadow-lg ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[var(--background)]' : 'hover:shadow-md'
        }`}
        layout
      >
        <motion.button
          className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none group"
          onClick={onToggle}
          aria-expanded={isActive}
          whileTap={{ scale: 0.99 }}
        >
          {/* FIXED: High contrast question text */}
          <span className={`font-bold text-lg transition-colors ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--text-primary)] group-hover:text-[var(--color-primary)]'}`}>
            {question}
          </span>
          
          {/* FIXED: Improved toggle button with CSS variables */}
          <motion.span
            className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isActive 
                ? 'bg-[var(--color-primary)] text-white' 
                : 'bg-[var(--surface-lowered)] text-[var(--text-secondary)] group-hover:bg-[var(--color-primary-50)] group-hover:text-[var(--color-primary)]'
            }`}
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3, type: 'spring' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </motion.button>
        
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* FIXED: Answer text uses CSS variables for contrast */}
              <motion.div
                className="px-6 pb-5 text-[var(--text-secondary)] leading-relaxed"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
              >
                <div className="pt-2 border-t border-[var(--border)]">
                  {answer}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Active indicator line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-light)]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </motion.div>
  );
}

const FAQ_KEYS = ['0', '1', '2', '3', '4', '5'] as const;

export function FAQSection() {
  const t = useTranslations('faq');
  const { activeFaq, toggleFaq } = useUIStore();

  return (
    <section id={SECTION_IDS.FAQ} className="relative py-24 md:py-32 overflow-hidden bg-[var(--surface)]">
      {/* FIXED: Subtle gradient background using CSS variables */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] via-[var(--surface-elevated)] to-[var(--surface)]" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-full text-sm font-semibold mb-4">
              {t('faq.sectionLabel') || 'FAQ'}
            </span>
          </AnimatedSection>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            <SplitText animation="fadeUp">
              {t('title')}
            </SplitText>
          </h2>
          
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Support Info Card */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-dark)] rounded-3xl p-8 text-white overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            }}
            animate={{
              x: [0, 50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/customer-support.png"
                alt="Customer Support"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </motion.div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{t('helpTitle')}</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              {t('helpDescription')}
            </p>
            
            {/* FIXED: Improved CTA button with better contrast */}
            <motion.a
              href={`tel:${CONTACT_CONFIG.PHONE.CHINA}`}
              className="inline-flex items-center gap-3 bg-white text-[var(--color-primary-700)] px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                📞
              </motion.span>
              <div>
                <div className="text-xs text-[var(--color-primary)] font-medium uppercase tracking-wider">{t('supportLabel')}</div>
                <div className="text-lg text-[var(--text-primary)]">{CONTACT_CONFIG.PHONE.CHINA}</div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQ_KEYS.map((key, index) => (
            <FAQItem
              key={key}
              question={t(`items.${key}.question`)}
              answer={t(`items.${key}.answer`)}
              index={index}
              isActive={activeFaq === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[var(--text-secondary)] mb-4">{t('faq.noAnswer') || 'Vous ne trouvez pas votre réponse ?'}</p>
          <motion.a
            href="https://wa.me/8618851725957"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-dark)]"
            whileHover={{ x: 5 }}
          >
            {t('faq.contactWhatsApp') || 'Contactez-nous sur WhatsApp'}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQSection;

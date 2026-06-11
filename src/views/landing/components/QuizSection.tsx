/**
 * Quiz Section
 * 
 * Import Readiness Quiz section for the landing page.
 * Helps visitors assess if they're ready to import from China.
 */

'use client';

import React from 'react';
import { QuizContainer } from '@/features/import-quiz';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/config';

interface QuizSectionProps {
  locale?: Locale;
}

export function QuizSection({ locale = 'fr' }: QuizSectionProps) {
  const t = useTranslations('quizSection');
  const isFrenchQuizAvailable = locale === 'fr';

  return (
    <section 
      id="quiz"
      className="py-20 lg:py-28 bg-gradient-to-b from-blue-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>{t('badge')}</span>
          </div>

          {/* Title */}
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mt-2 mb-6">
            {t('title')}
            <span className="text-blue-600 dark:text-blue-400"> {t('titleAccent')}</span>
          </span>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('descriptionBefore')}{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {t('descriptionStrong')}
            </span>{' '}
            {t('descriptionAfter')}
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-slate-600 dark:text-slate-400">
            {(t.raw('benefits') as string[]).map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Container */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-blue-500/10 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
            {isFrenchQuizAvailable ? (
              <QuizContainer />
            ) : (
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t('englishCtaTitle')}</h3>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{t('englishCtaText')}</p>
                <a
                  href="https://wa.me/8618851725957?text=Hello%20ChinaLink%2C%20I%20want%20advice%20before%20importing%20from%20China%20to%20Africa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-400"
                >
                  {t('englishCtaButton')}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t('trustImporters')}
            </span>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t('trustResponse')}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

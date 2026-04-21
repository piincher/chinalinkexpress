/**
 * Full Service vs Simple Transit Comparison Page
 *
 * SEO-optimized dedicated page explaining the value of a full-service
 * import partner over a basic freight forwarder.
 */

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  ShieldAlert,
  PackageCheck,
  Wallet,
  Boxes,
  ClipboardCheck,
  Phone,
  ArrowRight,
  X,
  Check,
  HeartHandshake,
  BadgeCheck,
  PiggyBank,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/animations';

interface Props {
  locale: string;
}

export function FullServicePage({ locale }: Props) {
  const t = useTranslations('comparison');

  const problemItems = [
    {
      key: 'scam',
      icon: ShieldAlert,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    {
      key: 'quality',
      icon: PackageCheck,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
    },
    {
      key: 'payment',
      icon: Wallet,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      key: 'consolidation',
      icon: Boxes,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
    },
    {
      key: 'customs',
      icon: ClipboardCheck,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
    },
  ];

  const comparisonRows = [
    'supplierFinding',
    'qualityCheck',
    'payment',
    'consolidation',
    'customs',
    'tracking',
    'support',
  ];

  const resultItems = [
    {
      key: 'peaceOfMind',
      icon: HeartHandshake,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      key: 'qualityGoods',
      icon: BadgeCheck,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      key: 'costSavings',
      icon: PiggyBank,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
    },
    {
      key: 'timeSavings',
      icon: Clock,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 mb-6 backdrop-blur-sm">
              <HeartHandshake className="w-5 h-5" />
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/8618851725957"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('hero.ctaWhatsApp')}
              </a>
              <Link
                href={`/${locale}/tarifs`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                {t('hero.ctaRates')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold mb-4">
              <ShieldAlert className="w-4 h-4" />
              {t('problem.sectionLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {t('problem.title')}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {t('problem.subtitle')}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {problemItems.map((item) => (
              <StaggerItem key={item.key}>
                <div
                  className={`bg-[var(--surface-elevated)] border ${item.border} rounded-2xl p-6 h-full`}
                >
                  <div
                    className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {t(`problem.items.${item.key}.title`)}
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    {t(`problem.items.${item.key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold mb-4">
              <ClipboardCheck className="w-4 h-4" />
              {t('comparisonTable.sectionLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {t('comparisonTable.title')}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {t('comparisonTable.subtitle')}
            </p>
          </AnimatedSection>

          {/* Desktop Comparison Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            {/* Header */}
            <div className="grid grid-cols-3 gap-0">
              <div className="p-5 bg-[var(--surface-elevated)] border-b border-[var(--border)]">
                <span className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  {t('comparisonTable.sectionLabel')}
                </span>
              </div>
              <div className="p-5 bg-red-50 dark:bg-red-900/10 border-b border-[var(--border)] text-center">
                <span className="text-lg font-bold text-red-700 dark:text-red-400">
                  {t('comparisonTable.simpleTransit')}
                </span>
              </div>
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/10 border-b border-[var(--border)] text-center">
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  {t('comparisonTable.fullService')}
                </span>
              </div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, index) => (
              <motion.div
                key={row}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-3 gap-0 border-b border-[var(--border)] last:border-b-0"
              >
                <div className="p-5 flex items-center">
                  <span className="font-medium text-[var(--text-primary)]">
                    {t(`comparisonTable.rows.${row}.label`)}
                  </span>
                </div>
                <div className="p-5 bg-red-50/30 dark:bg-red-900/5 flex items-center justify-center gap-2 text-red-700 dark:text-red-400">
                  <X className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{t(`comparisonTable.rows.${row}.simple`)}</span>
                </div>
                <div className="p-5 bg-emerald-50/30 dark:bg-emerald-900/5 flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{t(`comparisonTable.rows.${row}.full`)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Comparison Cards */}
          <div className="md:hidden space-y-4">
            {comparisonRows.map((row, index) => (
              <motion.div
                key={row}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden"
              >
                <div className="p-4 bg-[var(--surface-elevated)] border-b border-[var(--border)]">
                  <span className="font-semibold text-[var(--text-primary)]">
                    {t(`comparisonTable.rows.${row}.label`)}
                  </span>
                </div>
                <div className="p-4 border-b border-[var(--border)] flex items-start gap-3 bg-red-50/30 dark:bg-red-900/5">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase">
                      {t('comparisonTable.simpleTransit')}
                    </span>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-0.5">
                      {t(`comparisonTable.rows.${row}.simple`)}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex items-start gap-3 bg-emerald-50/30 dark:bg-emerald-900/5">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                      {t('comparisonTable.fullService')}
                    </span>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-0.5 font-medium">
                      {t(`comparisonTable.rows.${row}.full`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Result Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              <BadgeCheck className="w-4 h-4" />
              {t('result.sectionLabel')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {t('result.title')}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {t('result.subtitle')}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {resultItems.map((item) => (
              <StaggerItem key={item.key}>
                <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6 flex items-start gap-5 h-full">
                  <div
                    className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                      {t(`result.items.${item.key}.title`)}
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      {t(`result.items.${item.key}.description`)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                {t('cta.subtitle')}
              </p>
              <a
                href="https://wa.me/8618851725957"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('cta.button')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

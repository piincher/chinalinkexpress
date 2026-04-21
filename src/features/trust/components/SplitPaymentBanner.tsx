/**
 * Split Payment Banner Component
 *
 * Prominent messaging about the "Pay on Delivery" split payment model.
 * Green/emerald color scheme for trust and money association.
 * Compact banner that can be used as a section or inline banner.
 *
 * Features:
 * - 3-step mini flow (Order → Delivery → Payment)
 * - Trust badge with shield/lock icon
 * - WhatsApp CTA
 * - Framer Motion subtle animations
 * - Dark mode support
 * - Responsive
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Truck,
  CreditCard,
  ShieldCheck,
  Lock,
  MessageCircle,
  ChevronRight,
  ArrowDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    icon: ShoppingCart,
    key: 'order',
    color: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    highlight: false,
  },
  {
    icon: Truck,
    key: 'delivery',
    color: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    highlight: false,
  },
  {
    icon: CreditCard,
    key: 'payment',
    color: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-800',
    highlight: true,
  },
] as const;

function StepConnector({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <ChevronRight className="hidden sm:block w-5 h-5 text-emerald-300 dark:text-emerald-700" />
      <ArrowDown className="sm:hidden w-5 h-5 text-emerald-300 dark:text-emerald-700" />
    </div>
  );
}

interface SplitPaymentBannerProps {
  className?: string;
  variant?: 'banner' | 'section';
}

export function SplitPaymentBanner({
  className,
  variant = 'section',
}: SplitPaymentBannerProps) {
  const t = useTranslations('splitPayment');

  const isBanner = variant === 'banner';

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        isBanner
          ? 'py-6 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600'
          : 'py-12 md:py-16 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30',
        className
      )}
    >
      {/* Subtle pattern overlay for section variant */}
      {!isBanner && (
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content container */}
        <div
          className={cn(
            'rounded-2xl overflow-hidden',
            isBanner
              ? 'bg-white/10 backdrop-blur-sm border border-white/20'
              : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-100 dark:border-emerald-900/30 shadow-xl shadow-emerald-100/50 dark:shadow-emerald-900/20'
          )}
        >
          <div className="p-6 md:p-8 lg:p-10">
            {/* Top row: Headline + Badge + CTA */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              {/* Left: Text */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Badge */}
                <div
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3',
                    isBanner
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                  )}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('badge') || '100% sécurisé'}
                </div>

                {/* Headline */}
                <h3
                  className={cn(
                    'text-2xl md:text-3xl font-black mb-2',
                    isBanner ? 'text-white' : 'text-gray-900 dark:text-white'
                  )}
                >
                  {t('headline') || 'Payez à la livraison — Zéro risque'}
                </h3>

                {/* Subheadline */}
                <p
                  className={cn(
                    'text-base md:text-lg max-w-xl',
                    isBanner
                      ? 'text-emerald-100'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {t('subheadline') ||
                    'Vous ne réglez qu\'après avoir inspecté et confirmé la réception de vos marchandises.'}
                </p>
              </motion.div>

              {/* Right: WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a
                  href="https://wa.me/8618851725957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-bold text-base transition-all hover:scale-105 shadow-lg',
                    isBanner
                      ? 'bg-white text-emerald-700 hover:shadow-white/25'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-500/25'
                  )}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t('cta') || 'Discutez de votre commande'}</span>
                  <span
                    className={cn(
                      'text-xs font-medium opacity-80 hidden sm:inline-block',
                      isBanner ? 'text-emerald-600' : 'text-emerald-100'
                    )}
                  >
                    {t('ctaSubtitle') || 'Sur WhatsApp'}
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Steps Flow */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const title = t(`steps.${index}.title`);
                const description = t(`steps.${index}.description`);

                return (
                  <React.Fragment key={step.key}>
                    <div
                      className={cn(
                        'relative flex items-center gap-4 w-full sm:w-auto sm:flex-1 max-w-xs sm:max-w-none p-4 rounded-xl border transition-all duration-300',
                        step.borderColor,
                        step.color,
                        step.highlight && !isBanner
                          ? 'ring-2 ring-green-400/30 dark:ring-green-500/20 shadow-lg shadow-green-100 dark:shadow-green-900/20'
                          : ''
                      )}
                    >
                      {/* Icon */}
                      <div
                        className={cn(
                          'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
                          isBanner
                            ? 'bg-white/20'
                            : 'bg-white dark:bg-slate-800 shadow-sm'
                        )}
                      >
                        <Icon
                          className={cn(
                            'w-6 h-6',
                            isBanner ? 'text-white' : step.iconColor
                          )}
                          strokeWidth={2}
                        />
                        {step.key === 'payment' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Lock className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <div
                          className={cn(
                            'font-bold text-sm',
                            isBanner
                              ? 'text-white'
                              : 'text-gray-900 dark:text-white'
                          )}
                        >
                          {title}
                        </div>
                        <div
                          className={cn(
                            'text-xs mt-0.5 leading-relaxed',
                            isBanner
                              ? 'text-emerald-100'
                              : 'text-gray-600 dark:text-gray-400'
                          )}
                        >
                          {description}
                        </div>
                      </div>
                    </div>

                    {index < STEPS.length - 1 && (
                      <StepConnector
                        className={cn(
                          'flex-shrink-0',
                          isBanner ? 'text-white/40' : ''
                        )}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>

            {/* Bottom trust bar */}
            <motion.div
              className={cn(
                'mt-6 pt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm',
                isBanner
                  ? 'border-t border-white/20 text-emerald-100'
                  : 'border-t border-emerald-100 dark:border-emerald-900/30 text-gray-500 dark:text-gray-400'
              )}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" />
                <span className="font-medium">
                  {t('badgeSubtitle') || 'Paiement après confirmation'}
                </span>
              </div>
              <span className="hidden sm:block opacity-30">•</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>{t('badge') || '100% sécurisé'}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitPaymentBanner;

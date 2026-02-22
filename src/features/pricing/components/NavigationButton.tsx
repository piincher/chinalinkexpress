/**
 * Navigation Button
 * 
 * CTA button to navigate between pricing page and calculator page.
 * Part of the pricing feature.
 */

'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calculator, ArrowRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationButtonProps {
  variant: 'pricing-to-calculator' | 'calculator-to-pricing';
  className?: string;
}

export function NavigationButton({ variant, className }: NavigationButtonProps) {
  const locale = useLocale();
  const t = useTranslations('pricing');

  const config = {
    'pricing-to-calculator': {
      href: `/${locale}/calculateur`,
      icon: <Calculator className="w-5 h-5" />,
      text: t('navigation.goToCalculator'),
      bgColor: 'bg-blue-600 hover:bg-blue-700',
    },
    'calculator-to-pricing': {
      href: `/${locale}/pricing`,
      icon: <FileText className="w-5 h-5" />,
      text: t('navigation.viewPricing'),
      bgColor: 'bg-indigo-600 hover:bg-indigo-700',
    },
  };

  const { href, icon, text, bgColor } = config[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('flex justify-center', className)}
    >
      <Link
        href={href}
        className={cn(
          'group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105',
          bgColor
        )}
      >
        {icon}
        <span>{text}</span>
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}

/**
 * Calculator Page
 *
 * Main calculator page with interactive freight calculators.
 * Part of the pricing feature.
 */

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CalculatorCard } from './components/CalculatorCard';
import { NavigationButton } from './components/NavigationButton';
import { ProhibitedItems } from './components/ProhibitedItems';
import { PricingFAQ } from './components/PricingFAQ';
import { SplitPaymentBanner } from '@/features/trust/components/SplitPaymentBanner';
import { DamageGuaranteeSection } from '@/features/trust/components';
import { TrustFlowSection } from '@/features/trust/components/TrustFlowSection';
import { WhatsAppPhotoUpdates } from '@/features/trust/components/WhatsAppPhotoUpdates';
import { VerifiedReviewsSection } from '@/features/reviews/components/VerifiedReviewsSection';
import { VideoTestimonialsSection } from '@/features/reviews/components/VideoTestimonialsSection';

export function CalculatorPage() {
  const t = useTranslations('pricing');

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('calculatorPage.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('calculatorPage.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <TrustFlowSection />

      <WhatsAppPhotoUpdates />

      {/* Calculator Card */}
      <CalculatorCard />

      {/* Split Payment Banner */}
      <SplitPaymentBanner />

      <VerifiedReviewsSection />
      <VideoTestimonialsSection />

      {/* Navigation to Pricing */}
      <div className="py-8">
        <NavigationButton variant="calculator-to-pricing" />
      </div>

      {/* Additional Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProhibitedItems />
        <DamageGuaranteeSection />
        <PricingFAQ />
      </div>
    </main>
  );
}

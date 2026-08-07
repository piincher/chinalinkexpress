/**
 * Calculator Page
 *
 * Main calculator page with interactive freight calculators.
 * Part of the pricing feature.
 */

'use client';

import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/site';
import { CalculatorCard } from './components/CalculatorCard';
import { NavigationButton } from './components/NavigationButton';
import { ProhibitedItems } from './components/ProhibitedItems';
import { PricingFAQ } from './components/PricingFAQ';
import { WeightPolicy } from './components/WeightPolicy';
import { SplitPaymentBanner } from '@/features/trust/components/SplitPaymentBanner';
import { DamageGuaranteeSection } from '@/features/trust/components';
import { TrustFlowSection } from '@/features/trust/components/TrustFlowSection';
import { WhatsAppPhotoUpdates } from '@/features/trust/components/WhatsAppPhotoUpdates';
import { VerifiedReviewsSection } from '@/features/reviews/components/VerifiedReviewsSection';
import { VideoTestimonialsSection } from '@/features/reviews/components/VideoTestimonialsSection';

export function CalculatorPage() {
  const t = useTranslations('pricing');

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <PageHero title={t('calculatorPage.title')} lede={t('calculatorPage.subtitle')} />

      <TrustFlowSection />

      <WhatsAppPhotoUpdates />

      {/* Calculator Card */}
      <CalculatorCard />

      {/* Rounding + the 5% handling coefficient, stated right under the
          estimate. Disclosure only — the estimate itself is unchanged. */}
      <WeightPolicy />

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

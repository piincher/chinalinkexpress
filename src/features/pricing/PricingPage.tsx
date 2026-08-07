/**
 * Pricing Page
 * 
 * Main pricing display page component.
 * Displays all freight rates with navigation to calculator.
 * Part of the pricing feature.
 */

'use client';

import { PricingHero } from './components/PricingHero';
import { PriceTable } from './components/PriceTable';
import { NavigationButton } from './components/NavigationButton';
import { ProhibitedItems } from './components/ProhibitedItems';
import { PricingFAQ } from './components/PricingFAQ';

export function PricingPage() {
  return (
    /* `pt-20` cleared the fixed navbar; PageHero owns that spacing now, and the
       surface follows --color-paper instead of a hard-coded white/gray-900. */
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <PricingHero />
      
      {/* Navigation to Calculator */}
      <div className="relative z-10">
        <NavigationButton variant="pricing-to-calculator" />
      </div>
      
      <PriceTable />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProhibitedItems />
        <PricingFAQ />
      </div>
    </main>
  );
}

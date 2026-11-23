/**
 * Pricing Page
 *
 * Minimal text (owner 2026-11-23): hero, calculator, the rate cards, one line
 * for the weight rules, prohibited items, one action. The full weight policy
 * and the FAQ live on /calculateur and /faq.
 */

'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Band, Shell, Cta } from '@/components/site';
import { HERO_WHATSAPP_URL } from '@/views/landing/constants';
import { PricingHero } from './components/PricingHero';
import { PriceTable } from './components/PriceTable';
import { NavigationButton } from './components/NavigationButton';
import { ProhibitedItems } from './components/ProhibitedItems';
import { UgandaSoon } from './components/UgandaSoon';

/** `shipmentsHandled` is read live by the route (lib/publicStatsApi). */
export function PricingPage({ shipmentsHandled }: { shipmentsHandled: number }) {
  const t = useTranslations('pricing');
  const tHome = useTranslations('home');
  const locale = useLocale();
  const link = { color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' } as const;

  return (
    /* `pt-20` cleared the fixed navbar; PageHero owns that spacing now, and the
       surface follows --color-paper instead of a hard-coded white/gray-900. */
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <PricingHero shipmentsHandled={shipmentsHandled} />

      <div className="relative z-10">
        <NavigationButton variant="pricing-to-calculator" />
      </div>

      <PriceTable />

      {/* The two invoice rules (CGV 3.1) must sit next to the prices — a client
          must not first meet the 5% coefficient on the invoice. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ marginTop: 'var(--space-lg)' }}>
        <p style={{ margin: 0, color: 'var(--color-ink-2)' }}>
          {t('weightNote')}{' '}
          <Link href={`/${locale}/calculateur#politique-poids`} style={link}>
            {t('details')}
          </Link>
        </p>
      </div>

      {/* Uganda: air and sea prices coming soon (owner 2026-11-24). */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ marginTop: 'var(--space-xl)' }}>
        <UgandaSoon />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProhibitedItems />
      </div>

      <Band tone="paper">
        <Shell>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-lg)' }}>
            <Cta
              href={HERO_WHATSAPP_URL}
              external
              variant="solid"
              size="lg"
              arrow={false}
              data-cta="pricing-whatsapp"
              icon={<MessageCircle size={18} aria-hidden />}
            >
              {tHome('getQuote')}
            </Cta>
            <Link href={`/${locale}/faq`} className="inline-flex items-center gap-2" style={link}>
              {tHome('faqLink')}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Shell>
      </Band>
    </main>
  );
}

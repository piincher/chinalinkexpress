/**
 * L'application — owner decisions 2026-11-23: the app-related proof that left
 * the home page lives here (download, track a parcel, photo + code, live
 * network). Minimum text; existing sections reused as they are.
 * 2026-11-28: AppGuideLine walks through every core screen, in order.
 */

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Search } from 'lucide-react';
import { generatePageMetadata } from '@/config/seo-advanced';
import type { Locale } from '@/i18n/config';
import { Band, Shell } from '@/components/site';
import { Reveal } from '@/components/motion';
import { AppShowcase } from '@/views/landing/components/AppShowcase';
import { ProofSection } from '@/views/landing/components/ProofSection';
import { LiveNetworkBand } from '@/views/landing/components/LiveNetworkBand';
import { AppGuideLine } from '@/views/landing/components/AppGuideLine';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'appPage' });
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: 'application chinalink express, suivi colis chine mali, suivi colis chine ouganda',
    path: '/application',
    locale: locale as Locale,
  });
}

export default async function ApplicationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'appPage' });

  return (
    <>
      <AppShowcase headingLevel="h1" />
      <AppGuideLine locale={locale as Locale} />

      {/* Tracking works without the app: /suivi reads ?code= and pre-fills it. */}
      <Band tone="paper">
        <Shell>
          <Reveal>
            <form action={`/${locale}/suivi`} method="get" className="app-page-track" style={{ marginTop: 0, borderTop: 0, paddingTop: 0 }}>
              <label htmlFor="track-code">{t('trackLabel')}</label>
              <div>
                <input id="track-code" name="code" required placeholder={t('trackPlaceholder')} autoComplete="off" />
                <button type="submit">
                  <Search size={16} aria-hidden />
                  {t('trackButton')}
                </button>
              </div>
            </form>
          </Reveal>
        </Shell>
      </Band>

      <ProofSection />
      <Reveal distance={0}>
        <LiveNetworkBand />
      </Reveal>
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const revalidate = 3600;

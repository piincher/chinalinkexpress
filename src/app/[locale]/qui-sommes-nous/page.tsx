/**
 * Qui sommes-nous — owner decisions 2026-11-23: a real face (the owner, unnamed,
 * in our warehouse in China), minimum text, facts instead of paragraphs, one
 * action. Bamako AND Kampala named (Uganda rule).
 */

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MessageCircle } from 'lucide-react';
import { generatePageMetadata } from '@/config/seo-advanced';
import type { Locale } from '@/i18n/config';
import { Band, Shell, Figure, Cta, PHOTOS } from '@/components/site';
import { HERO_WHATSAPP_URL } from '@/views/landing/constants';
import { fetchCompanyStats } from '@/lib/publicStatsApi';

interface Props {
  params: Promise<{ locale: string }>;
}

const FACTS = ['office', 'warehouses', 'delivery', 'since'] as const;
const GALLERY = [
  { key: 'warehouse', src: PHOTOS.warehouseWide },
  { key: 'loading', src: '/media/steps/expedition.webp' },
  // Owner 2026-11-23: this footage is unloading at the Bamako warehouse.
  { key: 'unloading', src: '/media/steps/livraison.webp' },
  { key: 'team', src: '/media/steps/achat.webp' },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: 'transitaire chine mali, chinalink express, cargo chine mali, cargo chine ouganda',
    path: '/qui-sommes-nous',
    locale: locale as Locale,
  });
}

export default async function QuiSommesNous({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const stats = await fetchCompanyStats();
  const num = (n: number) => n.toLocaleString(locale === 'en' ? 'en-US' : 'fr-FR').replace(/\s/g, ' ');

  return (
    <>
      <Band tone="paper">
        <Shell>
          <div className="about-hero">
            <Figure
              src="/media/team/china-warehouse.webp"
              alt={tHome('aboutPhotoAlt')}
              focal="40%"
              priority
              sizes="(max-width: 760px) 100vw, 55vw"
              style={{ aspectRatio: '4 / 3' }}
            />
            <div>
              <h1 className="about-title">{t('title')}</h1>
              <p className="about-line">{t('line')}</p>
              <p className="about-stats">
                {t('stats', { clients: num(stats.clientsServed), shipments: num(stats.shipmentsHandled) })}
              </p>
            </div>
          </div>

          <dl className="about-facts">
            {FACTS.map((k) => (
              <div key={k}>
                <dt>{t(`facts.${k}.label`)}</dt>
                <dd>{t(`facts.${k}.value`)}</dd>
              </div>
            ))}
          </dl>

          <ul className="about-gallery">
            {GALLERY.map(({ key, src }) => (
              <li key={key}>
                <Figure src={src} alt={t(`gallery.${key}`)} focal="45%" scrim={0.5} sizes="(max-width: 760px) 50vw, 25vw" style={{ aspectRatio: '4 / 3' }}>
                  <span className="about-gallery-cap">{t(`gallery.${key}`)}</span>
                </Figure>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 'var(--space-2xl)' }}>
            <Cta
              href={HERO_WHATSAPP_URL}
              external
              variant="solid"
              size="lg"
              arrow={false}
              data-cta="about-whatsapp"
              icon={<MessageCircle size={18} aria-hidden />}
            >
              {tHome('getQuote')}
            </Cta>
          </div>
        </Shell>
      </Band>
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const revalidate = 3600;

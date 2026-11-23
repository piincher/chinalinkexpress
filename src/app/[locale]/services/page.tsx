import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MessageCircle } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { PageHero, Band, Shell, Cta } from '@/components/site';
import { ServicesSection } from '@/views/landing/components/ServicesSection';
import { HERO_WHATSAPP_URL } from '@/views/landing/constants';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isEn
      ? 'China-Mali Business Services | Sourcing, Payments, Freight'
      : isZh ? '中国—马里服务 | 采购、付款、货运' : isAr ? 'خدمات الصين-مالي | التوريد والدفع والشحن' : 'Services Chine-Mali | Sourcing, Paiement, Fret',
    description: isEn
      ? 'ChinaLink Express services for doing business with China from Mali, Uganda and across West and East Africa: sourcing, supplier payment, verification, air freight and sea freight.'
      : isZh ? 'ChinaLink Express 从中国进口到马里和乌干达的所有服务：采购、供应商付款、核验、空运和海运。' : isAr ? 'كل خدمات ChinaLink Express للاستيراد من الصين إلى مالي وأوغندا: التوريد والدفع للموردين والتحقق والشحن الجوي والبحري.' : 'Tous les services ChinaLink Express pour importer de Chine au Mali et en Ouganda : sourcing, paiement fournisseur, vérification, fret aérien et fret maritime.',
    keywords: isEn
      ? 'China Mali business services, China sourcing Africa, supplier payment China, China supplier verification, freight China Mali, China Africa logistics'
      : isZh ? '中国马里服务, 中国马里采购, 中国供应商付款, 中国马里货运, 中国马里货代, 中国供应商核验' : isAr ? 'خدمات الصين-مالي، التوريد من الصين إلى مالي، الدفع لمورد صيني، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي، التحقق من الموردين في الصين' : 'services Chine Mali, sourcing Chine Mali, paiement fournisseur chinois, fret Chine Mali, transitaire Chine Mali, vérification fournisseur Chine',
    path: '/services',
    locale: locale as Locale,
  });
}

// Minimal text (owner 2026-11-23): one line, the nine services by title in
// journey order, one action. Shipping-mark example removed (owner 2026-11-24).
export default async function ServicesHub({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'servicesPage' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  return (
    <>
      <StructuredData type="organization" />
      <PageHero title={t('title')} lede={t('line')} />
      <ServicesSection bare />
      <Band tone="paper">
        <Shell>
          <Cta
            href={HERO_WHATSAPP_URL}
            external
            variant="solid"
            size="lg"
            arrow={false}
            data-cta="services-whatsapp"
            icon={<MessageCircle size={18} aria-hidden />}
          >
            {tHome('getQuote')}
          </Cta>
        </Shell>
      </Band>
    </>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ar' },
  ];
}

export const dynamic = 'force-static';
export const revalidate = 3600;

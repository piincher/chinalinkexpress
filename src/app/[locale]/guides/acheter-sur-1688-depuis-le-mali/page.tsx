import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { BUSINESS_INFO, generateBreadcrumbSchema, generateFAQPageSchema, generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoGuidePage } from '@/features/seo-content/SeoGuidePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const title = 'Acheter sur 1688 depuis le Mali';
const description = 'Comment acheter sur 1688 depuis le Mali avec un agent en Chine : recherche produit, paiement, vérification fournisseur, consolidation et livraison à Bamako.';
const faqs = [
  { question: 'Pourquoi 1688 est-il souvent moins cher qu’Alibaba ?', answer: '1688 cible surtout le marché domestique chinois. Les prix peuvent être plus bas, mais la plateforme est en chinois et les vendeurs acceptent souvent des paiements locaux.' },
  { question: 'Peut-on payer 1688 depuis le Mali ?', answer: 'C’est difficile directement. ChinaLink peut faciliter le paiement lorsque le fournisseur et la commande sont validés.' },
  { question: '1688 est-il plus risqué ?', answer: 'Il demande plus de vérification : langue, paiement, qualité, retours et logistique. Un agent local réduit ces risques.' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Acheter sur 1688 depuis le Mali | Paiement et livraison',
    description,
    keywords: 'acheter sur 1688 depuis Mali, achat 1688 Mali, agent 1688 Mali, paiement 1688 Chine Mali, livraison 1688 Bamako',
    path: '/guides/acheter-sur-1688-depuis-le-mali',
    locale: locale as Locale,
    ogType: 'article',
  });
}

export default async function Guide1688Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: BUSINESS_INFO.name },
    publisher: { '@type': 'Organization', name: BUSINESS_INFO.name },
    datePublished: '2026-04-21',
    dateModified: '2026-04-21',
    inLanguage: 'fr-FR',
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/guides/acheter-sur-1688-depuis-le-mali`,
  };

  return (
    <>
      <StructuredData
        schemas={[
          articleSchema,
          generateBreadcrumbSchema([
            { name: 'Accueil', url: '/fr/' },
            { name: 'Guides', url: '/fr/guides/importer-de-chine-au-mali' },
            { name: 'Acheter sur 1688 depuis le Mali', url: '/fr/guides/acheter-sur-1688-depuis-le-mali' },
          ], locale as Locale),
          generateFAQPageSchema(faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={title}
        description={description}
        updatedAt="21 avril 2026"
        readTime="Lecture : 7 minutes"
        sections={[
          { title: 'Ce qu’il faut comprendre sur 1688', body: '1688 est une plateforme chinoise orientée prix usine et grossistes locaux. Elle peut être très intéressante pour les importateurs maliens, mais elle demande traduction, négociation et paiement local.', items: ['Interface en chinois', 'Paiements souvent locaux', 'Vendeurs moins habitués à l’export', 'Contrôle qualité indispensable'] },
          { title: 'Comment trouver un bon produit', body: 'Travaillez avec des mots-clés chinois, comparez plusieurs vendeurs, vérifiez les volumes de vente et demandez des photos réelles. Évitez de commander un gros lot sans test.' },
          { title: 'Paiement et réception en Chine', body: 'Beaucoup de vendeurs 1688 préfèrent Alipay ou virement chinois. ChinaLink peut régler la commande validée, recevoir les colis dans son réseau en Chine et préparer la consolidation.' },
          { title: 'Expédition vers Bamako', body: 'Après réception et contrôle, les produits peuvent partir par fret aérien pour les petits volumes urgents ou par maritime pour les gros volumes.' },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/services/sourcing', label: 'Agent 1688 pour le Mali' },
          { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement 1688 depuis le Mali' },
          { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification fournisseur 1688' },
          { href: '/fr/routes/china-to-mali', label: 'Expédition vers Bamako' },
        ]}
      />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;

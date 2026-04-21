import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { BUSINESS_INFO, generateBreadcrumbSchema, generateFAQPageSchema, generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoGuidePage } from '@/features/seo-content/SeoGuidePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const title = 'Acheter sur Alibaba depuis le Mali';
const description = 'Guide pour acheter sur Alibaba depuis le Mali : choisir un fournisseur, éviter les arnaques, payer, inspecter et expédier vers Bamako.';
const faqs = [
  { question: 'Alibaba livre-t-il directement au Mali ?', answer: 'Certains fournisseurs proposent une livraison internationale, mais il est souvent plus sûr de passer par un partenaire qui vérifie, consolide et organise le fret vers Bamako.' },
  { question: 'Comment éviter une arnaque sur Alibaba ?', answer: 'Vérifiez la société, demandez des preuves réelles, commencez par un échantillon ou petit lot, et évitez les paiements hors plateforme sans contrôle.' },
  { question: 'ChinaLink peut-il acheter sur Alibaba pour moi ?', answer: 'Oui. Nous pouvons contacter le fournisseur, négocier, payer, contrôler et expédier la marchandise vers le Mali.' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Acheter sur Alibaba depuis le Mali | Guide import Chine',
    description,
    keywords: 'acheter sur Alibaba depuis le Mali, Alibaba Mali, achat Alibaba Bamako, fournisseur Alibaba Chine Mali',
    path: '/guides/acheter-sur-alibaba-depuis-le-mali',
    locale: locale as Locale,
    ogType: 'article',
  });
}

export default async function AlibabaGuidePage({ params }: Props) {
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
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/guides/acheter-sur-alibaba-depuis-le-mali`,
  };

  return (
    <>
      <StructuredData
        schemas={[
          articleSchema,
          generateBreadcrumbSchema([
            { name: 'Accueil', url: '/fr/' },
            { name: 'Guides', url: '/fr/guides/importer-de-chine-au-mali' },
            { name: 'Acheter sur Alibaba depuis le Mali', url: '/fr/guides/acheter-sur-alibaba-depuis-le-mali' },
          ], locale as Locale),
          generateFAQPageSchema(faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={title}
        description={description}
        updatedAt="21 avril 2026"
        readTime="Lecture : 6 minutes"
        sections={[
          { title: 'Créer une demande claire', body: 'Avant de contacter un fournisseur Alibaba, préparez le produit exact, la quantité, les dimensions, la matière, le budget et le délai souhaité. Plus votre demande est claire, plus le devis sera exploitable.', items: ['Lien produit ou photo', 'Quantité minimum', 'Destination Bamako', 'Mode de fret souhaité'] },
          { title: 'Comparer plusieurs fournisseurs', body: 'Ne choisissez pas le premier prix. Comparez la société, les délais, les avis, les certificats, la communication et la cohérence des prix. Un prix trop bas peut cacher une qualité faible.' },
          { title: 'Vérifier avant de payer', body: 'Demandez des photos réelles, une vidéo courte, un devis écrit et les conditions de paiement. Pour les grosses commandes, faites vérifier le fournisseur ou commandez un échantillon.' },
          { title: 'Organiser le paiement et le fret', body: 'Après validation, ChinaLink peut faciliter le paiement, suivre la préparation, recevoir la marchandise en Chine, la contrôler et l’expédier vers Bamako.' },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/services/sourcing', label: 'Service achat Alibaba' },
          { href: '/fr/services/verification-fournisseur-chine', label: 'Vérifier un fournisseur Alibaba' },
          { href: '/fr/services/paiement-fournisseur-chine', label: 'Payer un fournisseur chinois' },
          { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Comparer avec 1688' },
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

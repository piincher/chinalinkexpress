import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { BUSINESS_INFO, generateBreadcrumbSchema, generateFAQPageSchema, generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoGuidePage } from '@/features/seo-content/SeoGuidePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const title = 'Douane Mali : documents pour importer de Chine';
const description = 'Documents et précautions pour importer de Chine au Mali : facture, packing list, description produit, restrictions, dédouanement et livraison à Bamako.';
const faqs = [
  { question: 'Quels documents demander au fournisseur chinois ?', answer: 'Demandez au minimum une facture commerciale claire, une liste de colisage, les références produit, la quantité, la valeur et les informations d’emballage.' },
  { question: 'Tous les produits passent-ils en douane au Mali ?', answer: 'Non. Certains produits sont interdits, réglementés ou demandent des autorisations. Il faut valider avant achat.' },
  { question: 'ChinaLink accompagne-t-il le dédouanement ?', answer: 'Oui, ChinaLink accompagne les expéditions standards et signale les cas particuliers qui demandent des documents ou procédures supplémentaires.' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Douane Mali import Chine | Documents et conseils',
    description,
    keywords: 'douane Mali import Chine, documents douane Mali, dédouanement Mali Chine, importer Chine Mali documents',
    path: '/guides/douane-mali-import-chine',
    locale: locale as Locale,
    ogType: 'article',
  });
}

export default async function CustomsGuidePage({ params }: Props) {
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
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/guides/douane-mali-import-chine`,
  };

  return (
    <>
      <StructuredData
        schemas={[
          articleSchema,
          generateBreadcrumbSchema([
            { name: 'Accueil', url: '/fr/' },
            { name: 'Guides', url: '/fr/guides/importer-de-chine-au-mali' },
            { name: 'Douane Mali import Chine', url: '/fr/guides/douane-mali-import-chine' },
          ], locale as Locale),
          generateFAQPageSchema(faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={title}
        description={description}
        updatedAt="21 avril 2026"
        readTime="Lecture : 5 minutes"
        sections={[
          { title: 'Les documents à préparer', body: 'Une expédition claire commence par une documentation claire. Les informations doivent correspondre à la marchandise réelle pour éviter blocages, frais supplémentaires ou retards.', items: ['Facture commerciale', 'Packing list', 'Description produit détaillée', 'Valeur déclarée cohérente'] },
          { title: 'Produits sensibles ou interdits', body: 'Batteries, liquides, drones, produits chimiques, armes, produits inflammables et certains compléments peuvent être interdits ou soumis à autorisation. Validez avant de payer le fournisseur.' },
          { title: 'Pourquoi la description produit compte', body: 'Une description vague comme "accessoires" ou "pièces" peut créer des problèmes. Indiquez la matière, l’usage, la quantité, les références et l’emballage.' },
          { title: 'Comment ChinaLink réduit les risques', body: 'Nous demandons les informations utiles avant expédition, contrôlons les marchandises sensibles et vous orientons vers le mode de fret le plus adapté.' },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/services/verification-fournisseur-chine', label: 'Vérifier avant achat' },
          { href: '/fr/services/air-freight', label: 'Articles sensibles en aérien' },
          { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali' },
          { href: '/fr/contact', label: 'Demander un avis douane' },
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

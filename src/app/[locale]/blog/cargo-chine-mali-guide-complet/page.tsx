import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  BUSINESS_INFO,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generatePageMetadata,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoGuidePage } from '@/features/seo-content/SeoGuidePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const title = 'Cargo Chine Mali : Le Guide Complet du Fret Aérien et Maritime';
const description =
  'Tout savoir sur le cargo Chine-Mali. Fret aérien vs maritime, tarifs 2026, délais, douanes et conseils pour choisir le bon mode de transport.';
const faqs = [
  {
    question: 'Combien coûte le cargo Chine-Mali en 2026 ?',
    answer:
      'Le fret aérien coûte entre 8 et 15 USD/kg selon le poids et la catégorie. Le fret maritime en groupage LCL est à partir de 80 USD/CBM. Un conteneur FCL 20ft coûte entre 2 000 et 3 500 USD. Demandez un devis personnalisé pour un prix exact.',
  },
  {
    question: 'Quel est le délais de livraison cargo Chine Bamako ?',
    answer:
      'Le fret aérien met entre 14 et 21 jours porte-à-porte. Le fret maritime met entre 60 et 75 jours depuis le port de Foshan jusqu’au port de Dakar, puis par transit terrestre vers Bamako.',
  },
  {
    question: 'ChinaLink propose-t-il du cargo porte-à-porte ?',
    answer:
      'Oui, ChinaLink propose un service porte-à-porte complet : réception en Chine, consolidation, fret, dédouanement au Mali et livraison à Bamako.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Cargo Chine Mali | Guide Complet Fret Aérien & Maritime 2026',
    description,
    keywords:
      'cargo Chine Mali, fret aérien Chine Mali, fret maritime Chine Mali, tarifs cargo Chine Mali, délais cargo Bamako, conteneur Chine Mali',
    path: '/blog/cargo-chine-mali-guide-complet',
    locale: locale as Locale,
    ogType: 'article',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: BUSINESS_INFO.name },
    publisher: { '@type': 'Organization', name: BUSINESS_INFO.name },
    datePublished: '2026-04-18',
    dateModified: '2026-04-18',
    inLanguage: 'fr-FR',
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/blog/cargo-chine-mali-guide-complet`,
  };

  return (
    <>
      <StructuredData
        schemas={[
          articleSchema,
          generateBreadcrumbSchema(
            [
              { name: 'Accueil', url: '/fr/' },
              { name: 'Blog', url: '/fr/blog' },
              { name: title, url: '/fr/blog/cargo-chine-mali-guide-complet' },
            ],
            locale as Locale
          ),
          generateFAQPageSchema(faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={title}
        description={description}
        updatedAt="18 avril 2026"
        readTime="Lecture : 6 minutes"
        sections={[
          {
            title: '1. Fret aérien Chine-Mali : quand l\'utiliser ?',
            body: 'Le fret aérien est la meilleure option pour les produits urgents, légers ou à forte valeur. Téléphones, électronique, vêtements et documents passent par voie aérienne. ChinaLink propose des vols réguliers avec livraison à Bamako en 14–21 jours.',
            items: [
              'Idéal pour les colis de 1 à 500 kg',
              'Livraison express en 14–21 jours',
              'Suivi en temps réel',
              'Tarifs à partir de 8 USD/kg',
            ],
          },
          {
            title: '2. Fret maritime Chine-Mali : le choix économique',
            body: 'Le fret maritime est parfait pour les gros volumes, les meubles, l\'électroménager et les marchandises lourdes. Vos colis partent du port de Foshan, arrivent au port de Dakar, puis sont transportés par route jusqu’à Bamako.',
            items: [
              'Conteneur FCL 20ft ou 40ft',
              'Groupage LCL pour les petits volumes',
              'Délai 60–75 jours',
              'Économies importantes sur les gros volumes',
            ],
          },
          {
            title: '3. Tarifs cargo Chine-Mali en 2026',
            body: 'Les tarifs dépendent du mode de transport, du poids, du volume et de la catégorie de marchandise. Utilisez notre calculateur en ligne pour obtenir une estimation précise en quelques secondes.',
          },
          {
            title: '4. Les ports et routes utilisés pour le Mali',
            body: 'Le Mali étant enclavé, les marchandises maritimes transitent par le port de Dakar (Sénégal), puis continuent par route jusqu’à Bamako. ChinaLink coordonne la route Foshan → Dakar → Bamako selon votre volume et vos délais.',
          },
          {
            title: '5. Comment réserver votre cargo avec ChinaLink',
            body: 'Contactez-nous sur WhatsApp avec les détails de votre marchandise. Nous vous envoyons un devis gratuit, organisons la réception en Chine, la consolidation si besoin, le fret et la livraison finale à Bamako.',
          },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/cargo-chine-mali', label: 'Cargo Chine Mali — Tarifs & Délais' },
          { href: '/fr/services/air-freight', label: 'Fret Aérien Chine-Mali' },
          { href: '/fr/services/sea-freight', label: 'Fret Maritime Chine-Mali' },
          { href: '/fr/routes/china-to-mali', label: 'Routes & Ports Chine-Mali' },
          { href: '/fr/calculateur', label: 'Calculateur de Frais d\'Expédition' },
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

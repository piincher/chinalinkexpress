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

const title = 'Conteneur Chine Mali : Prix, Délais et Démarches en 2026';
const description =
  'FCL 20ft, FCL 40ft, LCL groupage. Tarifs indicatifs 2026, délais, ports de départ et arrivée. Tout savoir pour expédier votre conteneur de Chine vers le Mali.';
const faqs = [
  {
    question: 'Combien coûte un conteneur Chine-Mali en 2026 ?',
    answer:
      'Un conteneur FCL 20ft coûte entre 2 000 et 3 500 USD. Un FCL 40ft coûte entre 3 500 et 5 500 USD. Le groupage LCL est à partir de 80 USD/CBM. Les tarifs varient selon le port de départ et la saison.',
  },
  {
    question: 'Quel conteneur choisir pour le Mali ?',
    answer:
      'Choisissez le FCL 20ft pour 10–15 CBM, le FCL 40ft pour 25–30 CBM, et le LCL groupage pour les volumes inférieurs à 10 CBM. ChinaLink vous conseille selon votre marchandise et votre budget.',
  },
  {
    question: 'Quels sont les délais d\'un conteneur Chine-Bamako ?',
    answer:
      'Le transport maritime dure 45–60 jours jusqu\'au port côtier (Lomé, Dakar, Abidjan), plus 7–15 jours de transit routier jusqu\'à Bamako. Soit un total de 60–75 jours porte-à-porte.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Conteneur Chine Mali | Prix, Délais & Démarches 2026',
    description,
    keywords:
      'conteneur Chine Mali, prix conteneur Chine Mali, FCL 20ft Mali, FCL 40ft Mali, groupage LCL Chine Mali, délais conteneur Bamako',
    path: '/blog/conteneur-chine-mali-prix-2026',
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
    datePublished: '2026-04-01',
    dateModified: '2026-04-01',
    inLanguage: 'fr-FR',
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/blog/conteneur-chine-mali-prix-2026`,
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
              { name: title, url: '/fr/blog/conteneur-chine-mali-prix-2026' },
            ],
            locale as Locale
          ),
          generateFAQPageSchema(faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={title}
        description={description}
        updatedAt="1 avril 2026"
        readTime="Lecture : 5 minutes"
        sections={[
          {
            title: '1. Conteneur FCL 20ft : le standard pour les PME',
            body: 'Le conteneur 20 pieds est idéal pour les petites et moyennes entreprises. Il peut accueillir environ 10–15 CBM de marchandises. C\'est le choix économique pour les volumes moyens avec un prix fixe indépendant du poids.',
            items: [
              'Capacité : ~33 m³, charge utile ~21 tonnes',
              'Tarif indicatif : 2 000 – 3 500 USD',
              'Délai : 60–75 jours porte-à-porte',
              'Idéal pour meubles, électroménager, marchandises diverses',
            ],
          },
          {
            title: '2. Conteneur FCL 40ft : pour les gros volumes',
            body: 'Le conteneur 40 pieds double la capacité du 20ft pour un coût unitaire par CBM bien plus bas. C\'est le choix des importateurs réguliers et des grossistes qui commandent en très grande quantité.',
            items: [
              'Capacité : ~67 m³, charge utile ~26 tonnes',
              'Tarif indicatif : 3 500 – 5 500 USD',
              'Meilleur rapport coût/volume',
              'Parfait pour les grossistes et industriels',
            ],
          },
          {
            title: '3. Groupage LCL : pour les petits volumes',
            body: 'Si vous n\'avez pas assez de marchandises pour remplir un conteneur, le groupage LCL vous permet de partager l\'espace avec d\'autres clients. Vous payez uniquement au CBM utilisé.',
          },
          {
            title: '4. Les ports de départ et d\'arrivée pour le Mali',
            body: 'Les principaux ports de départ en Chine sont Shanghai, Shenzhen, Guangzhou et Ningbo. Au Mali, les marchandises arrivent par voie routière depuis Lomé, Dakar ou Abidjan après débarquement maritime.',
          },
          {
            title: '5. Comment réserver votre conteneur avec ChinaLink',
            body: 'Contactez-nous sur WhatsApp avec la liste de vos produits, les dimensions estimées et votre deadline. Nous calculons le meilleur option FCL ou LCL, organisons la collecte en Chine, le fret maritime, le dédouanement et la livraison à Bamako.',
          },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/cargo-chine-mali', label: 'Cargo Chine Mali — Tarifs & Délais' },
          { href: '/fr/services/sea-freight', label: 'Fret Maritime Chine-Mali' },
          { href: '/fr/routes/china-to-mali', label: 'Routes & Ports Chine-Mali' },
          { href: '/fr/services/sourcing', label: 'Agent Sourcing Chine pour le Mali' },
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

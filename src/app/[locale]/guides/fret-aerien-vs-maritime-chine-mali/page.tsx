import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { BUSINESS_INFO, generateBreadcrumbSchema, generateFAQPageSchema, generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoGuidePage } from '@/features/seo-content/SeoGuidePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const title = 'Fret aérien ou maritime Chine-Mali : prix, délais et choix';
const description = 'Comparez fret aérien et fret maritime de Chine vers le Mali : délais, coûts, produits adaptés, risques, calcul du poids et décision pour Bamako.';
const faqs = [
  { question: 'Quel est le plus rapide entre aérien et maritime ?', answer: 'Le fret aérien est le plus rapide, généralement 14 à 21 jours vers Bamako. Le maritime prend plutôt 60 à 75 jours.' },
  { question: 'Quel est le moins cher ?', answer: 'Le maritime est généralement moins cher pour les gros volumes. L’aérien reste intéressant pour les petits colis, produits urgents ou marges élevées.' },
  { question: 'Puis-je mélanger aérien et maritime ?', answer: 'Oui. Beaucoup d’importateurs envoient les échantillons ou produits urgents par avion, puis les gros volumes par bateau.' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Fret aérien vs maritime Chine-Mali | Prix et délais',
    description,
    keywords: 'fret aérien vs maritime Chine Mali, fret Chine Mali prix, délai fret Chine Mali, cargo aérien Chine Mali, fret maritime Chine Mali',
    path: '/guides/fret-aerien-vs-maritime-chine-mali',
    locale: locale as Locale,
    ogType: 'article',
  });
}

export default async function FreightComparisonGuide({ params }: Props) {
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
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/guides/fret-aerien-vs-maritime-chine-mali`,
  };

  return (
    <>
      <StructuredData
        schemas={[
          articleSchema,
          generateBreadcrumbSchema([
            { name: 'Accueil', url: '/fr/' },
            { name: 'Guides', url: '/fr/guides/importer-de-chine-au-mali' },
            { name: 'Fret aérien ou maritime Chine-Mali', url: '/fr/guides/fret-aerien-vs-maritime-chine-mali' },
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
          { title: 'Quand choisir le fret aérien', body: 'Choisissez l’aérien si la marchandise est urgente, légère, à forte marge ou nécessaire pour tester rapidement un produit sur le marché malien.', items: ['Délais 14-21 jours', 'Petits colis ou échantillons', 'Produits à rotation rapide', 'Budget plus élevé au kg'] },
          { title: 'Quand choisir le fret maritime', body: 'Choisissez le maritime pour les gros volumes, meubles, machines, cartons lourds ou commandes qui supportent un délai long. Le prix au volume devient plus compétitif.', items: ['Délais 60-75 jours', 'FCL ou LCL', 'Transport via ports côtiers', 'Meilleur pour gros volumes'] },
          { title: 'Attention au poids volumétrique', body: 'Un colis léger mais volumineux peut coûter cher en aérien. Mesurez longueur, largeur, hauteur et poids réel avant de décider.' },
          { title: 'Notre recommandation pratique', body: 'Testez en aérien quand vous découvrez un produit, puis passez en maritime quand la demande est validée et que les volumes augmentent.' },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/services/air-freight', label: 'Fret aérien Chine-Mali' },
          { href: '/fr/services/sea-freight', label: 'Fret maritime Chine-Mali' },
          { href: '/fr/calculateur', label: 'Calculer le prix du fret' },
          { href: '/fr/routes/china-to-mali', label: 'Route Chine vers Bamako' },
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

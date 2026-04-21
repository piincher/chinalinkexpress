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

const title = 'Comment Importer de la Chine vers le Mali en 2026';
const description =
  'Guide complet 2026 pour importer de la Chine vers le Mali. Documents, douanes, tarifs fret aérien et maritime, paiement fournisseur et conseils pratiques.';
const faqs = [
  {
    question: 'Quel est le budget minimum pour importer de Chine au Mali ?',
    answer:
      'Le budget minimum dépend du produit et du mode de transport. En fret aérien, prévoyez au moins le coût du produit + 8–15 USD/kg de fret. En maritime, comptez 80–150 USD/CBM en groupage. ChinaLink peut vous aider à estimer votre budget exact avec notre calculateur.',
  },
  {
    question: 'Quels documents sont obligatoires pour importer au Mali ?',
    answer:
      'Vous avez besoin d\'une facture commerciale, d\'une liste de colisage (packing list), d\'un certificat de conformité si nécessaire, et parfois d\'autorisation DGD pour certains produits. ChinaLink vous guide étape par étape dans la préparation de ces documents.',
  },
  {
    question: 'Fret aérien ou maritime pour le Mali ?',
    answer:
      'Le fret aérien est idéal pour les produits urgents ou légers (14–21 jours). Le fret maritime est plus économique pour les gros volumes (60–75 jours). Le choix dépend de votre marge, de l\'urgence et du type de marchandise.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Comment Importer de la Chine vers le Mali en 2026 | Guide Complet',
    description,
    keywords:
      'importer de la Chine vers le Mali, import Chine Mali 2026, guide import Chine Mali, comment importer Chine Mali, démarches import Chine Mali',
    path: '/blog/comment-importer-chine-mali-2026',
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
    datePublished: '2026-04-21',
    dateModified: '2026-04-21',
    inLanguage: 'fr-FR',
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/blog/comment-importer-chine-mali-2026`,
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
              { name: title, url: '/fr/blog/comment-importer-chine-mali-2026' },
            ],
            locale as Locale
          ),
          generateFAQPageSchema(faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={title}
        description={description}
        updatedAt="21 avril 2026"
        readTime="Lecture : 8 minutes"
        sections={[
          {
            title: '1. Choisir le bon produit à importer depuis la Chine',
            body: 'Avant de contacter un fournisseur, analysez le marché malin. Quels produits se vendent bien à Bamako ? Quelle marge pouvez-vous réaliser ? Poids, fragilité et réglementation douanière doivent être pris en compte dès le départ.',
            items: [
              'Comparez le prix local et le prix fournisseur chinois',
              'Calculez le coût total incluant le fret et la douane',
              'Évitez les produits fragiles ou interdits en avion',
              'Vérifiez la demande sur le marché malien',
            ],
          },
          {
            title: '2. Trouver et vérifier un fournisseur chinois fiable',
            body: 'Alibaba offre des millions de fournisseurs, mais tous ne sont pas fiables. Demandez des preuves de production, vérifiez les avis et commencez par un échantillon avant toute grosse commande.',
            items: [
              'Demandez des photos et vidéos récentes de l\'usine',
              'Vérifiez la licence commerciale et les avis clients',
              'Commandez un échantillon avant la production en série',
              'Utilisez un agent sourcing pour plus de sécurité',
            ],
          },
          {
            title: '3. Sécuriser le paiement de votre fournisseur',
            body: 'Les fournisseurs chinois demandent souvent Alipay ou virement bancaire. Ces méthodes peuvent être risquées si vous ne connaissez pas le fournisseur. ChinaLink facilite le paiement sécurisé et vous protège contre les arnaques.',
          },
          {
            title: '4. Choisir entre fret aérien et fret maritime',
            body: 'Le fret aérien est rapide (14–21 jours) mais plus cher. Le fret maritime est économique (60–75 jours) et adapté aux gros volumes. Pour les téléphones, vêtements et articles légers, l\'aérien est souvent préférable. Pour les meubles et machines, choisissez le maritime.',
          },
          {
            title: '5. Préparer la douane malienne et la réception à Bamako',
            body: 'La douane malienne exige des documents précis et une déclaration exacte de la valeur. Une erreur peut entraîner des retards ou des frais supplémentaires. ChinaLink accompagne vos démarches de dédouanement pour une livraison sans stress.',
          },
          {
            title: '6. Suivre votre colis jusqu\'à la livraison finale',
            body: 'Avec ChinaLink, suivez votre expédition en temps réel depuis la Chine jusqu\'à Bamako. Notre support WhatsApp 24/7 vous tient informé à chaque étape : départ, transit, arrivée et livraison.',
          },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/cargo-chine-mali', label: 'Cargo Chine Mali — Tarifs & Délais' },
          { href: '/fr/services/sourcing', label: 'Agent Sourcing Chine pour le Mali' },
          { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement Fournisseur Chinois' },
          { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali — Routes &Infos' },
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

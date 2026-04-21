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

const title = 'Paiement Fournisseur Chinois : Alipay, Virement — Guide Mali';
const description =
  'Comparez les méthodes de paiement fournisseur en Chine. Sécurité, frais, délais. Guide complet pour les importateurs au Mali avec conseils pratiques.';
const faqs = [
  {
    question: 'Quelle est la méthode de paiement la plus sûre pour un fournisseur chinois ?',
    answer:
      'La Trade Assurance d\'Alibaba est sécurisée mais limitée à la plateforme. Pour les achats hors Alibaba, un agent de confiance comme ChinaLink qui paie le fournisseur pour vous et vous protège en cas de litige est la solution la plus sûre.',
  },
  {
    question: 'Puis-je payer un fournisseur chinois depuis le Mali ?',
    answer:
      'Directement, c\'est difficile. Alipay nécessite un compte chinois. Le virement international est possible mais cher et lent. ChinaLink vous permet de payer en FCFA, Orange Money ou Wave, et nous réglons le fournisseur en Chine.',
  },
  {
    question: 'Combien de temps prend un paiement fournisseur Chine ?',
    answer:
      'Alipay est instantané. Un virement bancaire international prend 3 à 7 jours ouvrés. Avec ChinaLink, le paiement est traité en 24h une fois vos fonds crédités.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Paiement Fournisseur Chinois | Alipay, Virement — Guide Mali',
    description,
    keywords:
      'paiement fournisseur chinois, Alipay Mali, virement fournisseur Chine, payer fournisseur depuis le Mali, paiement sécurisé Chine',
    path: '/blog/paiement-fournisseur-chine-guide',
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
    datePublished: '2026-04-10',
    dateModified: '2026-04-10',
    inLanguage: 'fr-FR',
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/blog/paiement-fournisseur-chine-guide`,
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
              { name: title, url: '/fr/blog/paiement-fournisseur-chine-guide' },
            ],
            locale as Locale
          ),
          generateFAQPageSchema(faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={title}
        description={description}
        updatedAt="10 avril 2026"
        readTime="Lecture : 5 minutes"
        sections={[
          {
            title: '1. Les méthodes de paiement acceptées en Chine',
            body: 'Les fournisseurs chinois acceptent principalement Alipay, virement bancaire local et parfois Western Union. Chaque méthode a ses avantages, ses frais et ses risques.',
            items: [
              'Alipay : rapide, populaire, nécessite un compte chinois',
              'Virement local : rapide en Chine, limité aux comptes locaux',
              'Virement bancaire : sécurisé mais lent et coûteux',
              'Trade Assurance Alibaba : protection limitée à la plateforme',
            ],
          },
          {
            title: '2. Pourquoi payer un fournisseur depuis le Mali est difficile',
            body: 'Les restrictions bancaires, les frais de change élevés et l\'absence de compte chinois rendent le paiement direct compliqué. De plus, en cas de litige, il est quasi impossible de récupérer ses fonds seul.',
          },
          {
            title: '3. Comment ChinaLink facilite le paiement fournisseur',
            body: 'Avec ChinaLink, vous payez en FCFA via Orange Money, Wave ou en espèces à Bamako. Nous convertissons, payons le fournisseur en CNY en Chine et vous envoyons la preuve de paiement. Sécurité, rapidité et traçabilité garanties.',
          },
          {
            title: '4. Comparer les frais et délais de chaque méthode',
            body: 'Alipay est gratuit en interne mais inaccessible depuis le Mali. Le virement SWIFT coûte 30–80 USD de frais et prend 3 à 7 jours. ChinaLink propose des frais réduits et un traitement en 24h.',
          },
          {
            title: '5. Conseils pour sécuriser votre paiement',
            body: 'Ne payez jamais un compte personnel sans vérification. Demandez toujours une facture officielle. Gardez une trace de tous les échanges. Pour les grosses commandes, envisagez un paiement échelonné avec inspection intermédiaire.',
          },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement Fournisseur Chinois' },
          { href: '/fr/services/sourcing', label: 'Agent Sourcing Chine pour le Mali' },
          { href: '/fr/cargo-chine-mali', label: 'Cargo Chine Mali — Tarifs & Délais' },
          { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali — Routes & Infos' },
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

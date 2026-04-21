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

const title = 'Comment Acheter sur Alibaba depuis le Mali Sans Se Faire Arnaquer';
const description =
  'Guide pratique pour acheter sur Alibaba depuis le Mali. Vérification fournisseurs, paiement sécurisé, inspection qualité et expédition vers Bamako.';
const faqs = [
  {
    question: 'Comment repérer une arnaque sur Alibaba ?',
    answer:
      'Méfiez-vous des prix trop bas, des comptes récents sans avis, des demandes de paiement hors plateforme et des fournisseurs qui refusent la visite vidéo. Un agent de confiance comme ChinaLink peut vérifier le fournisseur avant tout paiement.',
  },
  {
    question: 'Alibaba livre-t-il directement au Mali ?',
    answer:
      'Certains fournisseurs proposent la livraison internationale, mais elle est souvent chère et sans suivi fiable. Il est préférable de passer par un transitaire qui consolide, contrôle et expédie vos colis vers Bamako.',
  },
  {
    question: 'ChinaLink peut-il acheter sur Alibaba à ma place ?',
    answer:
      'Oui. ChinaLink agit comme votre agent sourcing en Chine. Nous contactons le fournisseur, négocions les prix, vérifions la qualité, payons en toute sécurité et expédions vers le Mali.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Acheter sur Alibaba depuis le Mali Sans Arnaque | Guide 2026',
    description,
    keywords:
      'acheter sur Alibaba depuis le Mali, Alibaba Mali sans arnaque, guide Alibaba Mali, fournisseur Alibaba vérification, agent achat Alibaba Mali',
    path: '/blog/acheter-alibaba-mali-sans-arnaque',
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
    datePublished: '2026-04-15',
    dateModified: '2026-04-15',
    inLanguage: 'fr-FR',
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/blog/acheter-alibaba-mali-sans-arnaque`,
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
              { name: title, url: '/fr/blog/acheter-alibaba-mali-sans-arnaque' },
            ],
            locale as Locale
          ),
          generateFAQPageSchema(faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={title}
        description={description}
        updatedAt="15 avril 2026"
        readTime="Lecture : 7 minutes"
        sections={[
          {
            title: '1. Créer un compte et préparer votre recherche',
            body: 'Avant de chercher un produit, définissez exactement ce dont vous avez besoin : spécifications, quantité, budget et délai. Une recherche précise vous évite de perdre du temps avec des fournisseurs inadaptés.',
            items: [
              'Utilisez des mots-clés précis en anglais',
              'Filtrez par Gold Supplier et Trade Assurance',
              'Vérifiez les années d\'ancienneté du fournisseur',
              'Lisez les avis et les transactions passées',
            ],
          },
          {
            title: '2. Vérifier la fiabilité du fournisseur Alibaba',
            body: 'Un bon fournisseur a des avis vérifiés, des photos réelles, une communication claire et accepte la visite ou la vidéo d\'usine. Méfiez-vous des profils récents avec des prix irréalistes.',
          },
          {
            title: '3. Négocier et demander un échantillon',
            body: 'Ne payez jamais une grosse commande sans avoir vu un échantillon. Le échantillon vous permet de vérifier la qualité réelle, l\'emballage et la conformité avant d\'investir davantage.',
          },
          {
            title: '4. Payer en toute sécurité depuis le Mali',
            body: 'Le paiement direct au fournisseur depuis le Mali peut être compliqué. ChinaLink facilite le paiement sécurisé via Alipay, WeChat Pay ou virement bancaire, et agit comme intermédiaire de confiance.',
          },
          {
            title: '5. Inspection qualité avant expédition',
            body: 'Avant que vos marchandises ne quittent la Chine, ChinaLink effectue une inspection photo et vidéo pour vérifier la quantité, la qualité et l\'emballage. Si quelque chose ne va pas, nous résolvons le problème avant l\'expédition.',
          },
          {
            title: '6. Expédier vers Bamako avec suivi',
            body: 'Une fois la marchandise validée, nous organisons le fret aérien ou maritime, le dédouanement au Mali et la livraison à votre adresse à Bamako. Suivi en temps réel et support WhatsApp inclus.',
          },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/services/sourcing', label: 'Agent Sourcing Chine pour le Mali' },
          { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification Fournisseur Chine' },
          { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement Fournisseur Chinois' },
          { href: '/fr/cargo-chine-mali', label: 'Cargo Chine Mali — Tarifs & Délais' },
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

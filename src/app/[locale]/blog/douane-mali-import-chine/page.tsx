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

const title = 'Douane Mali : Tout Ce Qu\'il Faut Savoir pour Importer de Chine';
const description =
  'Documents requis, droits de douane, TVA, procédures DGD Mali. Guide complet pour un dédouanement sans encombre lors de vos importations depuis la Chine.';
const faqs = [
  {
    question: 'Quels documents sont obligatoires pour dédouaner au Mali ?',
    answer:
      'La facture commerciale, la liste de colisage (packing list), le connaissement ou lettre de transport aérien, et parfois le certificat de conformité ou l\'autorisation DGD sont nécessaires. ChinaLink vous aide à préparer ces documents.',
  },
  {
    question: 'Quels sont les droits de douane au Mali pour les produits chinois ?',
    answer:
      'Les droits de douane varient selon la nature du produit (code SH). La TVA est généralement de 18 %. ChinaLink fournit une estimation des frais douaniers avant expédition pour éviter les surprises.',
  },
  {
    question: 'ChinaLink gère-t-il le dédouanement au Mali ?',
    answer:
      'Oui, ChinaLink accompagne le dédouanement de vos marchandises dans le cadre de nos services porte-à-porte. Nous préparons les documents, suivons la procédure et vous livrons à Bamako.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Douane Mali Import Chine | Documents, Droits & Procédures 2026',
    description,
    keywords:
      'douane Mali import Chine, documents douane Mali, droits de douane Mali, dédouanement Mali Chine, TVA import Mali, procédure DGD Mali',
    path: '/blog/douane-mali-import-chine',
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
    datePublished: '2026-04-05',
    dateModified: '2026-04-05',
    inLanguage: 'fr-FR',
    mainEntityOfPage: `${BUSINESS_INFO.url}/fr/blog/douane-mali-import-chine`,
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
              { name: title, url: '/fr/blog/douane-mali-import-chine' },
            ],
            locale as Locale
          ),
          generateFAQPageSchema(faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={title}
        description={description}
        updatedAt="5 avril 2026"
        readTime="Lecture : 6 minutes"
        sections={[
          {
            title: '1. Les documents indispensables pour la douane malienne',
            body: 'Un dossier douanier complet évite les retards, les pénalités et les saisies. Assurez-vous que tous les documents sont cohérents et correspondent exactement à la marchandise réelle.',
            items: [
              'Facture commerciale détaillée et signée',
              'Packing list avec poids et dimensions',
              'Connaissement (B/L) ou lettre de transport aérien (AWB)',
              'Certificat de conformité ou autorisation DGD si requis',
            ],
          },
          {
            title: '2. Calculer les droits de douane et la TVA',
            body: 'Les droits de douane sont calculés sur la valeur CIF (coût + assurance + fret) selon le tarif douanier malien. La TVA à l\'importation est de 18 %. ChinaLink vous fournit une estimation transparente avant expédition.',
          },
          {
            title: '3. Produits réglementés ou interdits au Mali',
            body: 'Certains produits nécessitent une autorisation préalable : médicaments, produits chimiques, aliments, cosmétiques, armes, etc. Vérifiez la réglementation avant d\'acheter en Chine pour éviter la saisie en douane.',
          },
          {
            title: '4. La procédure de dédouanement étape par étape',
            body: 'Déclaration en douane, inspection physique, paiement des droits, validation du dossier et enlèvement. Avec ChinaLink, cette procédure est gérée par nos agents pour vous faire gagner du temps et éviter les erreurs.',
          },
          {
            title: '5. Comment éviter les surprises en douane',
            body: 'Déclarez la valeur réelle, décrivez précisément les produits, évitez les termes vagues comme "accessoires" et faites vérifier votre dossier avant expédition. ChinaLink contrôle chaque dossier pour minimiser les risques.',
          },
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification Fournisseur Chine' },
          { href: '/fr/cargo-chine-mali', label: 'Cargo Chine Mali — Tarifs & Délais' },
          { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali — Routes & Infos' },
          { href: '/fr/services/air-freight', label: 'Fret Aérien Chine-Mali' },
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

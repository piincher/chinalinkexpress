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

const content = {
  fr: {
    metaTitle: 'Douane Mali import Chine | Documents et conseils',
    metaDescription:
      'Documents et précautions pour importer de Chine au Mali : facture, packing list, description produit, restrictions, dédouanement et livraison à Bamako.',
    keywords:
      'douane Mali import Chine, documents douane Mali, dedouanement Mali Chine, importer Chine Mali documents',
    title: 'Douane Mali : documents pour importer de Chine',
    description:
      'Documents et précautions pour importer de Chine au Mali : facture, packing list, description produit, restrictions, dédouanement et livraison à Bamako.',
    updatedAt: '21 avril 2026',
    readTime: 'Lecture : 5 minutes',
    kicker: 'Guide import Chine-Mali',
    updatedLabel: 'Mis a jour',
    reviewedBy: "Relu par l'equipe operations Chine/Bamako",
    faqTitle: 'FAQ',
    continueTitle: 'Continuer',
    advisorCtaLabel: 'Parler a un conseiller',
    breadcrumbHome: 'Accueil',
    breadcrumbCurrent: 'Douane Mali import Chine',
    sections: [
      {
        title: 'Les documents à préparer',
        body: 'Une expédition claire commence par une documentation claire. Les informations doivent correspondre à la marchandise réelle pour éviter blocages, frais supplémentaires ou retards.',
        items: ['Facture commerciale', 'Packing list', 'Description produit détaillée', 'Valeur déclarée cohérente'],
      },
      {
        title: 'Produits sensibles ou interdits',
        body: 'Batteries, liquides, drones, produits chimiques, armes, produits inflammables et certains compléments peuvent être interdits ou soumis à autorisation. Validez avant de payer le fournisseur.',
      },
      {
        title: 'Pourquoi la description produit compte',
        body: 'Une description vague comme "accessoires" ou "pièces" peut créer des problèmes. Indiquez la matière, l’usage, la quantité, les références et l’emballage.',
      },
      {
        title: 'Comment ChinaLink réduit les risques',
        body: 'Nous demandons les informations utiles avant expédition, contrôlons les marchandises sensibles et vous orientons vers le mode de fret le plus adapté.',
      },
    ],
    faqs: [
      {
        question: 'Quels documents demander au fournisseur chinois ?',
        answer:
          'Demandez au minimum une facture commerciale claire, une liste de colisage, les références produit, la quantité, la valeur et les informations d’emballage.',
      },
      {
        question: 'Tous les produits passent-ils en douane au Mali ?',
        answer:
          'Non. Certains produits sont interdits, réglementés ou demandent des autorisations. Il faut valider avant achat.',
      },
      {
        question: 'ChinaLink accompagne-t-il le dédouanement ?',
        answer:
          'Oui, ChinaLink accompagne les expéditions standards et signale les cas particuliers qui demandent des documents ou procédures supplémentaires.',
      },
    ],
    links: [
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérifier avant achat' },
      { href: '/fr/services/air-freight', label: 'Articles sensibles en aérien' },
      { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali' },
      { href: '/fr/contact', label: 'Demander un avis douane' },
    ],
  },
  en: {
    metaTitle: 'Mali Customs for Imports from China | Documents and Checks',
    metaDescription:
      'Documents and precautions for importing from China to Mali and West Africa: commercial invoice, packing list, product description, restrictions, customs and Bamako delivery.',
    keywords:
      'Mali customs China import, China to Mali customs documents, import from China to Mali, West Africa customs clearance, Bamako freight documents',
    title: 'Mali customs: documents for importing from China',
    description:
      'Prepare the documents and product details needed before shipping from China to Mali or onward into West Africa, with Bamako as the main operational hub.',
    updatedAt: 'April 21, 2026',
    readTime: '5 min read',
    kicker: 'China to Mali Import Guide',
    updatedLabel: 'Updated',
    reviewedBy: 'Reviewed by the China/Bamako operations team',
    faqTitle: 'Frequently asked questions',
    continueTitle: 'Continue',
    advisorCtaLabel: 'Talk to an advisor',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Mali customs for China imports',
    sections: [
      {
        title: 'Documents to prepare',
        body: 'A reliable shipment starts with clear documentation. The declared details should match the actual goods to reduce customs blocks, extra charges and delays.',
        items: ['Commercial invoice', 'Packing list', 'Detailed product description', 'Consistent declared value'],
      },
      {
        title: 'Sensitive or restricted products',
        body: 'Batteries, liquids, drones, chemicals, weapons, flammable goods and some supplements may be restricted or require special authorization. Validate the category before paying the supplier.',
      },
      {
        title: 'Why product descriptions matter',
        body: 'Vague descriptions such as "accessories" or "parts" can create customs issues. Include the material, use, quantity, references and packaging details.',
      },
      {
        title: 'How ChinaLink reduces risk',
        body: 'We request the useful information before shipping, flag sensitive goods and guide you toward the freight mode that fits your cargo and destination.',
      },
    ],
    faqs: [
      {
        question: 'What documents should I request from a Chinese supplier?',
        answer:
          'Ask for a clear commercial invoice, packing list, product references, quantity, value and packaging details at minimum.',
      },
      {
        question: 'Can every product pass customs in Mali?',
        answer:
          'No. Some products are prohibited, regulated or require authorization. Validate the product category before purchase.',
      },
      {
        question: 'Does ChinaLink support customs coordination?',
        answer:
          'Yes. ChinaLink supports standard shipments and flags special cases that need additional documents or procedures.',
      },
    ],
    links: [
      { href: '/en/services/verification-fournisseur-chine', label: 'Verify before buying' },
      { href: '/en/services/air-freight', label: 'Sensitive items by air' },
      { href: '/en/routes/china-to-mali', label: 'China to Mali freight' },
      { href: '/en/contact', label: 'Ask for customs advice' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  return generatePageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    path: '/guides/douane-mali-import-chine',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
    ogType: 'article',
  });
}

export default async function CustomsGuidePage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;
  setRequestLocale(locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    author: { '@type': 'Organization', name: BUSINESS_INFO.name },
    publisher: { '@type': 'Organization', name: BUSINESS_INFO.name },
    datePublished: '2026-04-21',
    dateModified: '2026-04-21',
    inLanguage: isEn ? 'en-US' : 'fr-FR',
    mainEntityOfPage: `${BUSINESS_INFO.url}/${locale}/guides/douane-mali-import-chine`,
  };

  return (
    <>
      <StructuredData
        schemas={[
          articleSchema,
          generateBreadcrumbSchema(
            [
              { name: page.breadcrumbHome, url: `/${locale}/` },
              { name: 'Guides', url: isEn ? '/en/blog' : '/fr/guides/importer-de-chine-au-mali' },
              { name: page.breadcrumbCurrent, url: `/${locale}/guides/douane-mali-import-chine` },
            ],
            locale as Locale
          ),
          generateFAQPageSchema(page.faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={page.title}
        description={page.description}
        updatedAt={page.updatedAt}
        readTime={page.readTime}
        sections={page.sections}
        faqs={page.faqs}
        links={page.links}
        kicker={page.kicker}
        updatedLabel={page.updatedLabel}
        reviewedBy={page.reviewedBy}
        faqTitle={page.faqTitle}
        continueTitle={page.continueTitle}
        advisorCtaLabel={page.advisorCtaLabel}
      />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;

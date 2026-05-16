import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
  generatePageMetadata,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    metaTitle: 'Vérification fournisseur Chine | Inspection avant achat',
    metaDescription:
      'Vérifiez un fournisseur chinois avant de payer. ChinaLink Express contrôle les informations Alibaba, 1688, usine, certificats, échantillons et marchandises pour les importateurs maliens.',
    keywords:
      'vérification fournisseur Chine, inspection qualité Chine, fournisseur Alibaba fiable, contrôler fournisseur chinois Mali, verification fournisseur 1688, supplier verification China Africa',
    badge: 'Supplier verification',
    title: 'Vérifier un fournisseur chinois avant de payer',
    intro:
      'Avant de transférer de l’argent à un fournisseur en Chine, ChinaLink Express vous aide à vérifier les signaux essentiels : identité, capacité réelle, cohérence des prix, qualité annoncée, risques de fraude et options d’inspection avant expédition vers le Mali.',
    highlights: [
      'Contrôle Alibaba, 1688 et fournisseurs directs',
      'Vérification d’usine et de société selon les données disponibles',
      'Inspection photo avant expédition',
      'Conseils avant paiement fournisseur',
    ],
    sections: [
      {
        title: 'Ce que nous vérifions',
        body: 'Un fournisseur peut avoir de belles photos et un bon discours, mais cela ne suffit pas. Nous regardons les informations concrètes qui permettent de décider s’il faut avancer, demander un échantillon ou refuser.',
        items: ['Nom de société et coordonnées', 'Cohérence entre prix, quantité et qualité', 'Photos ou vidéos réelles', 'Capacité à préparer la commande et documents'],
      },
      {
        title: 'Alibaba, 1688 et fournisseurs directs',
        body: 'Alibaba est la plateforme internationale la plus utilisée, tandis que 1688 cible surtout le marché chinois. Chaque canal a ses risques. Nous adaptons la vérification selon la plateforme et le montant à engager.',
        items: ['Analyse de fiche fournisseur', 'Questions ciblées au vendeur', 'Contrôle du mode de paiement demandé', 'Signalement des prix irréalistes'],
      },
      {
        title: 'Inspection avant expédition',
        body: 'Quand la marchandise est prête, un contrôle photo ou vidéo permet de confirmer la quantité, l’emballage, l’apparence du produit et les erreurs visibles avant le départ vers Bamako.',
        items: ['Photos de cartons et références', 'Contrôle visuel de la qualité', 'Vérification emballage', 'Validation avant fret aérien ou maritime'],
      },
    ],
    tableHeaders: ['Point de contrôle', 'Risque si ignoré', 'Action ChinaLink'],
    tableRows: [
      ['Société fournisseur', 'Intermédiaire ou faux vendeur', 'Vérification de cohérence'],
      ['Prix trop bas', 'Qualité inférieure ou arnaque', 'Alerte avant paiement'],
      ['Photos produit', 'Produit non conforme', 'Demande de preuves réelles'],
      ['Commande prête', 'Erreur découverte trop tard', 'Inspection avant expédition'],
    ],
    process: [
      'Vous envoyez le lien fournisseur, les captures, le devis et les conditions de paiement.',
      'Nous analysons les signaux de risque et les informations disponibles.',
      'Nous contactons le fournisseur si nécessaire pour confirmer les détails.',
      'Vous recevez une recommandation claire : continuer, demander plus de preuves ou éviter.',
      'Si vous commandez, nous pouvons suivre le paiement, le contrôle qualité et le fret vers Bamako.',
    ],
    faqs: [
      {
        question: 'Comment savoir si un fournisseur chinois est fiable ?',
        answer: 'Il faut vérifier l’identité de l’entreprise, la cohérence des informations, les preuves de production, les avis, les photos réelles, les conditions de paiement et la capacité à fournir les documents demandés.',
      },
      {
        question: 'Pouvez-vous vérifier un fournisseur Alibaba ou 1688 ?',
        answer: 'Oui. Nous pouvons analyser les informations disponibles, contacter le fournisseur, demander des preuves, organiser un contrôle photo ou recommander une inspection plus poussée selon le montant.',
      },
      {
        question: 'La vérification garantit-elle qu’il n’y aura aucun problème ?',
        answer: 'Non, aucune vérification ne supprime tous les risques. Elle réduit fortement les erreurs évidentes et les arnaques fréquentes avant paiement.',
      },
      {
        question: 'Faut-il vérifier avant de commander un échantillon ?',
        answer: 'Oui, surtout si le fournisseur est nouveau. Un échantillon est utile, mais il doit être commandé auprès d’un fournisseur qui semble déjà crédible.',
      },
    ],
    links: [
      { href: '/fr/services/paiement-fournisseur-chine', label: 'Payer un fournisseur chinois' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Acheter sur Alibaba depuis le Mali' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Acheter sur 1688 depuis le Mali' },
      { href: '/fr/services/sourcing', label: 'Service sourcing Chine' },
    ],
  },
  en: {
    metaTitle: 'China Supplier Verification | Alibaba & 1688 Inspection',
    metaDescription:
      'Verify Chinese suppliers before payment. ChinaLink Express checks Alibaba, 1688, company details, factory evidence, samples and goods for Mali and Africa importers.',
    keywords:
      'China supplier verification, verify Alibaba supplier, 1688 supplier check, China factory inspection, supplier verification Africa, quality inspection China Mali',
    badge: 'Supplier verification',
    title: 'Verify a Chinese supplier before you pay',
    intro:
      'Before sending money to a supplier in China, ChinaLink Express helps importers check the essential signals: company identity, real capacity, price consistency, stated quality, fraud risks and inspection options before shipping to Mali or Africa.',
    highlights: [
      'Alibaba, 1688 and direct supplier checks',
      'Company and factory verification where data is available',
      'Photo inspection before shipment',
      'Payment-risk advice before supplier transfer',
    ],
    sections: [
      {
        title: 'What we check',
        body: 'A supplier can have strong photos and convincing messages, but that is not enough. We review concrete signals that help you decide whether to proceed, ask for a sample, request more proof or walk away.',
        items: ['Company name and contact details', 'Price, quantity and quality consistency', 'Real photos or videos', 'Ability to prepare goods and documents'],
      },
      {
        title: 'Alibaba, 1688 and direct factories',
        body: 'Alibaba is common for international trade, while 1688 mainly serves the domestic Chinese market. Each channel has different risks, so the verification changes by platform and order value.',
        items: ['Supplier profile review', 'Targeted questions to the seller', 'Payment method risk check', 'Warning on unrealistic prices'],
      },
      {
        title: 'Inspection before shipping',
        body: 'When the goods are ready, a photo or video check can confirm quantity, packaging, product appearance and visible mistakes before the shipment leaves China.',
        items: ['Carton and reference photos', 'Visual quality control', 'Packaging check', 'Approval before air or sea freight'],
      },
    ],
    tableHeaders: ['Check point', 'Risk if ignored', 'ChinaLink action'],
    tableRows: [
      ['Supplier company', 'Middleman or fake seller', 'Consistency check'],
      ['Too-low price', 'Lower quality or scam', 'Warning before payment'],
      ['Product photos', 'Non-conforming product', 'Request real proof'],
      ['Goods ready', 'Mistake found too late', 'Inspection before shipment'],
    ],
    process: [
      'Send the supplier link, screenshots, quote and payment terms.',
      'We analyze risk signals and available information.',
      'We contact the supplier when needed to confirm key details.',
      'You receive a clear recommendation: continue, ask for more proof or avoid.',
      'If you order, we can follow payment, quality control and freight to Bamako.',
    ],
    faqs: [
      {
        question: 'How do I know if a Chinese supplier is reliable?',
        answer: 'You should check the company identity, consistency of information, production proof, reviews, real photos, payment terms and ability to provide requested documents.',
      },
      {
        question: 'Can you verify an Alibaba or 1688 supplier?',
        answer: 'Yes. We can analyze available information, contact the supplier, request proof, arrange photo checks or recommend deeper inspection based on the order value.',
      },
      {
        question: 'Does verification guarantee there will be no problem?',
        answer: 'No verification removes every risk. It strongly reduces obvious mistakes and common fraud signals before payment.',
      },
      {
        question: 'Should I verify before ordering a sample?',
        answer: 'Yes, especially for a new supplier. A sample helps, but it should come from a supplier that already looks credible.',
      },
    ],
    links: [
      { href: '/en/services/paiement-fournisseur-chine', label: 'Pay a Chinese supplier' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Alibaba buying guide' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: '1688 buying guide' },
      { href: '/en/services/sourcing', label: 'China sourcing service' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = locale === 'en' ? content.en : content.fr;

  return generatePageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    path: '/services/verification-fournisseur-chine',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function SupplierVerificationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const schemas = [
    generateOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.metaTitle,
      serviceType: 'Supplier Verification Service',
      provider: { '@id': 'https://www.chinalinkexpress.com/#organization' },
      areaServed: [
        { '@type': 'Country', name: 'Mali' },
        { '@type': 'Country', name: 'China' },
      ],
      description:
        page.metaDescription,
    },
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: 'Services', url: `/${locale}/services` },
      { name: isEn ? 'China supplier verification' : 'Vérification fournisseur Chine', url: `/${locale}/services/verification-fournisseur-chine` },
    ], locale as Locale),
    generateFAQPageSchema([...page.faqs], locale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <SeoServicePage
        badge={page.badge}
        title={page.title}
        intro={page.intro}
        highlights={[...page.highlights]}
        sections={[...page.sections]}
        table={{
          headers: [...page.tableHeaders],
          rows: [...page.tableRows],
        }}
        process={[...page.process]}
        faqs={[...page.faqs]}
        links={[...page.links]}
        ctaLabel={isEn ? 'Request a supplier check on WhatsApp' : undefined}
        routeCtaHref={`/${locale}/routes/china-to-mali`}
        routeCtaLabel={isEn ? 'See China to Mali freight' : undefined}
        comparisonTitle={isEn ? 'Quick comparison' : undefined}
        processTitle={isEn ? 'Our process' : undefined}
        faqTitle={isEn ? 'Frequently asked questions' : undefined}
        usefulLinksTitle={isEn ? 'Useful links' : undefined}
        asideTitle={isEn ? 'Need advice before paying?' : undefined}
        asideText={isEn ? 'Send the supplier link, quantities and destination. Our team will reply on WhatsApp.' : undefined}
        asideCtaLabel={isEn ? 'Contact ChinaLink' : undefined}
        stepLabel={isEn ? 'Step' : undefined}
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

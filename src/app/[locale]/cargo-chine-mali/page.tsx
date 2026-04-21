import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const faqs = [
  {
    question: 'Combien de temps prend le cargo de la Chine vers le Mali ?',
    answer:
      "Le fret aérien prend entre 14 et 21 jours jusqu'à Bamako. Le conteneur maritime prend entre 60 et 75 jours selon le port de départ et les dédouanements.",
  },
  {
    question: "Quel est le prix du cargo Chine-Mali ?",
    answer:
      "Le tarif dépend du mode (aérien ou maritime), du poids, du volume et du type de marchandise. Envoyez-nous votre devis ou lien produit sur WhatsApp pour une estimation précise.",
  },
  {
    question: "Qui s'occupe du dédouanement à Bamako ?",
    answer:
      "ChinaLink Express gère le dédouanement au Mali en coordination avec nos partenaires locaux. Vous n'avez pas à vous déplacer : nous livrons directement à votre adresse.",
  },
  {
    question: "Puis-je suivre mon cargo pendant le transport ?",
    answer:
      "Oui. Vous recevez un suivi WhatsApp avec des photos à chaque étape : réception en entrepôt, emballage, expédition et livraison finale au Mali.",
  },
  {
    question: "Quels produits sont interdits ou réglementés ?",
    answer:
      "Les produits dangereux, les armes, les stupéfiants et certaines substances chimiques sont interdits. Les batteries lithium-ion, cosmétiques et aliments nécessitent des autorisations spécifiques que nous pouvons vérifier pour vous.",
  },
  {
    question: "Comment payer l'expédition depuis le Mali ?",
    answer:
      "Vous pouvez payer par virement bancaire, Mobile Money, ou selon les modalités convenues. Nous vous indiquons le montant total avant départ avec toutes les taxes incluses.",
  },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment expédier un cargo de la Chine vers le Mali',
  description:
    'Guide étape par étape pour envoyer un cargo de la Chine vers Bamako, Mali avec ChinaLink Express.',
  totalTime: 'P14D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Demander un devis',
      text: 'Envoyez le lien produit, les quantités et les dimensions sur WhatsApp pour recevoir un devis gratuit.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Valider le mode de fret',
      text: 'Choisissez entre fret aérien (14-21 jours) et conteneur maritime (60-75 jours) selon votre budget et urgence.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Envoyer ou faire acheter la marchandise',
      text: 'Faites livrer vos colis à notre entrepôt en Chine ou demandez notre service sourcing et paiement fournisseur.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: "Suivre l'expédition",
      text: "Recevez des photos et mises à jour WhatsApp à chaque étape : réception, emballage, départ et arrivée.",
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Livraison au Mali',
      text: 'Nous gérons le dédouanement et livrons votre cargo à votre adresse à Bamako ou dans une autre ville du Mali.',
    },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    title: 'Cargo Chine Mali | Fret Aérien & Maritime',
    description:
      "Transitaire spécialisé pour l'envoi de cargo de la Chine vers le Mali. Fret aérien 14-21 jours, conteneur maritime 60-75 jours vers Bamako. Devis gratuit WhatsApp !",
    keywords:
      'cargo chine mali, fret chine mali, envoi colis chine mali, transitaire bamako, fret chine bamako, conteneur chine mali, expedition chine bamako, cargo aerien bamako, import chine mali',
    path: '/cargo-chine-mali',
    locale: locale as Locale,
  });
}

export default async function CargoChineMaliPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Cargo Chine Mali - Fret Aérien et Maritime',
      serviceType: 'FreightForwardingService',
      provider: { '@id': 'https://www.chinalinkexpress.com/#organization' },
      areaServed: [
        { '@type': 'Country', name: 'Mali' },
        { '@type': 'Country', name: 'China' },
      ],
      description:
        'Service de fret aérien et maritime de la Chine vers le Mali. Livraison porte à porte à Bamako avec suivi WhatsApp, dédouanement et consolidation.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services de Cargo Chine-Mali',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fret Aérien Chine-Mali',
              description: 'Cargo aérien vers Bamako en 14-21 jours',
            },
            price: '10.00',
            priceCurrency: 'USD',
            priceUnit: 'kilogram',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fret Maritime Chine-Mali FCL',
              description: 'Conteneur complet de la Chine vers le Mali',
            },
            price: '3200.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fret Maritime Chine-Mali LCL',
              description: 'Groupage maritime vers le Mali',
            },
            price: '120.00',
            priceCurrency: 'USD',
            priceUnit: 'cubic meter',
          },
        ],
      },
    },
    generateBreadcrumbSchema(
      [
        { name: 'Accueil', url: '/fr/' },
        { name: 'Cargo Chine Mali', url: '/fr/cargo-chine-mali' },
      ],
      locale as Locale
    ),
    generateFAQPageSchema(faqs, locale as Locale),
    howToSchema,
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <SeoServicePage
        badge="Cargo Chine-Mali"
        title="Envoyez votre cargo de la Chine vers le Mali"
        intro="ChinaLink Express est le transitaire de référence pour l'envoi de cargo de la Chine vers le Mali. Que vous importiez pour votre entreprise, votre boutique ou un projet personnel, nous gérons l'ensemble du transport de porte à porte jusqu'à Bamako : sourcing, paiement fournisseur, fret aérien ou maritime, dédouanement et livraison. Depuis plus de 7 ans, nous accompagnons des centaines d'importateurs maliens avec un suivi WhatsApp en temps réel et des photos à chaque étape. Demandez votre devis gratuit dès maintenant."
        highlights={[
          'Fret aérien 14-21 jours vers Bamako',
          'Conteneur maritime 60-75 jours FCL/LCL',
          'Sourcing, paiement et vérification fournisseur',
          'Suivi WhatsApp avec photos à chaque étape',
          'Livraison porte à porte au Mali',
        ]}
        sections={[
          {
            title: 'Options de fret : aérien vs maritime',
            body: "Le choix entre fret aérien et maritime dépend de votre budget, de votre délai et du type de marchandise. Le fret aérien est idéal pour les colis urgents, les échantillons ou les produits de valeur. Le conteneur maritime est préférable pour les volumes importants, le mobilier, les machines ou les marchandises lourdes. Nous proposons aussi le groupage LCL pour les envois plus modestes qui ne remplissent pas un conteneur entier.",
            items: [
              'Fret aérien : 14-21 jours, idéal pour colis et marchandises urgentes',
              'Conteneur FCL : 60-75 jours, meilleur tarif au volume pour gros envois',
              'Groupage LCL : 60-75 jours, partagez un conteneur et réduisez les coûts',
              'Conseil personnalisé selon votre type de produit et budget',
            ],
          },
          {
            title: "Ce qui est inclus dans chaque envoi",
            body: "Chaque cargo expédié avec ChinaLink Express bénéficie d'un service complet et transparent. Nous ne nous contentons pas de transporter : nous vérifions, consolidons, photographions, assurons le suivi et livrons directement chez vous au Mali.",
            items: [
              "Réception et inspection en entrepôt en Chine",
              'Consolidation de plusieurs fournisseurs dans un seul envoi',
              'Photos de contrôle qualité et emballage renforcé',
              "Dédouanement complet à l'arrivée au Mali",
            ],
          },
          {
            title: 'Comment expédier votre premier cargo',
            body: "Expédier un cargo depuis la Chine vers le Mali est simple avec ChinaLink. Envoyez-nous les informations de base sur WhatsApp, nous vous guidons à chaque étape et vous informons de la progression en temps réel.",
            items: [
              'Envoyez le lien produit ou le devis sur WhatsApp',
              'Recevez une estimation tarifaire aérienne et maritime',
              'Validez le mode de fret et faites livrer à notre entrepôt',
              'Suivez votre cargo et recevez-le à votre adresse au Mali',
            ],
          },
        ]}
        table={{
          headers: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink'],
          rows: [
            ['Trouver un transitaire fiable', 'Recherche longue et risquée', 'Transitaire spécialisé Chine-Mali depuis 7 ans'],
            ['Payer un fournisseur chinois', 'Difficultés avec Alipay et virements', 'Paiement assisté et vérification fournisseur'],
            ['Consolider plusieurs achats', 'Colis éparpillés et frais doublés', 'Entrepôt en Chine + regroupement avant envoi'],
            ['Suivre la livraison', 'Aucune visibilité sur le transport', 'Photos et updates WhatsApp à chaque étape'],
          ],
        }}
        process={[
          'Vous nous envoyez le lien produit, les quantités ou le devis fournisseur sur WhatsApp.',
          'Nous vous proposons un devis clair avec fret aérien et maritime, délais et taxes incluses.',
          'Vous validez le mode de transport et nous faisons livrer la marchandise à notre entrepôt en Chine.',
          'Nous inspectons, consolidons, emballons et expédions votre cargo vers le Mali.',
          'Nous gérons le dédouanement et livrons votre cargo à votre adresse à Bamako ou ailleurs au Mali.',
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/routes/china-to-mali', label: 'Route fret Chine-Mali' },
          { href: '/fr/services/air-freight', label: 'Fret aérien Chine-Afrique' },
          { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
          { href: '/fr/calculateur', label: 'Calculer le coût de fret' },
        ]}
      />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export const dynamic = 'force-static';

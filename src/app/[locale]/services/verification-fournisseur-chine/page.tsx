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

const faqs = [
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
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    title: 'Vérification fournisseur Chine | Inspection avant achat',
    description:
      'Vérifiez un fournisseur chinois avant de payer. ChinaLink Express contrôle les informations Alibaba, 1688, usine, certificats, échantillons et marchandises pour les importateurs maliens.',
    keywords:
      'vérification fournisseur Chine, inspection qualité Chine, fournisseur Alibaba fiable, fournisseur 1688 fiable, contrôler fournisseur chinois Mali',
    path: '/services/verification-fournisseur-chine',
    locale: locale as Locale,
  });
}

export default async function SupplierVerificationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemas = [
    generateOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Vérification fournisseur Chine',
      serviceType: 'Supplier Verification Service',
      provider: { '@id': 'https://www.chinalinkexpress.com/#organization' },
      areaServed: [
        { '@type': 'Country', name: 'Mali' },
        { '@type': 'Country', name: 'China' },
      ],
      description:
        'Service de vérification de fournisseurs chinois, contrôle qualité et inspection avant achat pour importateurs maliens.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Comment vérifier un fournisseur chinois avant de payer',
      step: [
        { '@type': 'HowToStep', name: 'Collecter les informations du fournisseur' },
        { '@type': 'HowToStep', name: 'Contrôler la cohérence de l’entreprise et du contact' },
        { '@type': 'HowToStep', name: 'Demander preuves, photos, vidéos ou échantillon' },
        { '@type': 'HowToStep', name: 'Valider le paiement et l’expédition seulement après contrôle' },
      ],
    },
    generateBreadcrumbSchema([
      { name: 'Accueil', url: '/fr/' },
      { name: 'Services', url: '/fr/services' },
      { name: 'Vérification fournisseur Chine', url: '/fr/services/verification-fournisseur-chine' },
    ], locale as Locale),
    generateFAQPageSchema(faqs, locale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <SeoServicePage
        badge="Supplier verification"
        title="Vérifier un fournisseur chinois avant de payer"
        intro="Avant de transférer de l’argent à un fournisseur en Chine, ChinaLink Express vous aide à vérifier les signaux essentiels : identité, capacité réelle, cohérence des prix, qualité annoncée, risques de fraude et options d’inspection avant expédition vers le Mali."
        highlights={[
          'Contrôle Alibaba, 1688, Taobao ou WeChat',
          'Vérification d’usine et de société selon les données disponibles',
          'Inspection photo avant expédition',
          'Conseils avant paiement fournisseur',
        ]}
        sections={[
          {
            title: 'Ce que nous vérifions',
            body: 'Un fournisseur peut avoir de belles photos et un bon discours, mais cela ne suffit pas. Nous regardons les informations concrètes qui permettent de décider s’il faut avancer, demander un échantillon ou refuser.',
            items: ['Nom de société et coordonnées', 'Cohérence entre prix, quantité et qualité', 'Photos ou vidéos réelles', 'Capacité à préparer la commande et documents'],
          },
          {
            title: 'Alibaba, 1688 et fournisseurs WeChat',
            body: 'Alibaba est plus international, 1688 vise le marché chinois, et beaucoup de fournisseurs travaillent sur WeChat. Chaque canal a ses risques. Nous adaptons la vérification selon la plateforme et le montant à engager.',
            items: ['Analyse de fiche fournisseur', 'Questions ciblées au vendeur', 'Contrôle du mode de paiement demandé', 'Signalement des prix irréalistes'],
          },
          {
            title: 'Inspection avant expédition',
            body: 'Quand la marchandise est prête, un contrôle photo ou vidéo permet de confirmer la quantité, l’emballage, l’apparence du produit et les erreurs visibles avant le départ vers Bamako.',
            items: ['Photos de cartons et références', 'Contrôle visuel de la qualité', 'Vérification emballage', 'Validation avant fret aérien ou maritime'],
          },
        ]}
        table={{
          headers: ['Point de contrôle', 'Risque si ignoré', 'Action ChinaLink'],
          rows: [
            ['Société fournisseur', 'Intermédiaire ou faux vendeur', 'Vérification de cohérence'],
            ['Prix trop bas', 'Qualité inférieure ou arnaque', 'Alerte avant paiement'],
            ['Photos produit', 'Produit non conforme', 'Demande de preuves réelles'],
            ['Commande prête', 'Erreur découverte trop tard', 'Inspection avant expédition'],
          ],
        }}
        process={[
          'Vous envoyez le lien fournisseur, les captures, le devis et les conditions de paiement.',
          'Nous analysons les signaux de risque et les informations disponibles.',
          'Nous contactons le fournisseur si nécessaire pour confirmer les détails.',
          'Vous recevez une recommandation claire : continuer, demander plus de preuves ou éviter.',
          'Si vous commandez, nous pouvons suivre le paiement, le contrôle qualité et le fret vers Bamako.',
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/services/paiement-fournisseur-chine', label: 'Payer un fournisseur chinois' },
          { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Acheter sur 1688 depuis le Mali' },
          { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Acheter sur Alibaba depuis le Mali' },
          { href: '/fr/services/sourcing', label: 'Service sourcing Chine' },
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

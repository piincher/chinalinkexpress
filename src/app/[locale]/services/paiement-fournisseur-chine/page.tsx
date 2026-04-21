import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const faqs = [
  {
    question: 'Puis-je payer un fournisseur chinois depuis le Mali ?',
    answer: 'Oui. ChinaLink Express peut faciliter le paiement de fournisseurs en Chine pour les importateurs maliens, notamment lorsque le fournisseur demande Alipay, WeChat Pay ou un virement local chinois.',
  },
  {
    question: 'Recevrai-je une preuve de paiement ?',
    answer: 'Oui. Nous partageons une confirmation de paiement et les détails utiles pour suivre la commande avec le fournisseur.',
  },
  {
    question: 'Vérifiez-vous le fournisseur avant paiement ?',
    answer: 'Nous recommandons toujours une vérification avant paiement, surtout pour un nouveau fournisseur, un gros montant ou une commande sur 1688.',
  },
  {
    question: 'Pouvez-vous payer plusieurs fournisseurs puis regrouper les colis ?',
    answer: 'Oui. Nous pouvons gérer plusieurs paiements, suivre les commandes et consolider les marchandises avant expédition vers Bamako.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    title: 'Paiement fournisseur chinois depuis le Mali | Alipay, WeChat, Virement',
    description:
      'Payez un fournisseur en Chine depuis le Mali avec ChinaLink Express. Paiement Alipay, WeChat Pay, virement, preuve de paiement, vérification fournisseur et expédition vers Bamako.',
    keywords:
      'paiement fournisseur chinois Mali, payer fournisseur Chine depuis Mali, Alipay Mali Chine, WeChat Pay fournisseur Chine, paiement 1688 Mali',
    path: '/services/paiement-fournisseur-chine',
    locale: locale as Locale,
  });
}

export default async function SupplierPaymentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemas = [
    generateOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Paiement fournisseur chinois depuis le Mali',
      serviceType: 'Supplier Payment Service',
      provider: { '@id': 'https://www.chinalinkexpress.com/#organization' },
      areaServed: [
        { '@type': 'Country', name: 'Mali' },
        { '@type': 'Country', name: 'China' },
      ],
      description:
        'Service de paiement fournisseur en Chine pour importateurs maliens avec Alipay, WeChat Pay, virement, vérification et preuve de paiement.',
    },
    generateBreadcrumbSchema([
      { name: 'Accueil', url: '/fr/' },
      { name: 'Services', url: '/fr/services' },
      { name: 'Paiement fournisseur Chine', url: '/fr/services/paiement-fournisseur-chine' },
    ], locale as Locale),
    generateFAQPageSchema(faqs, locale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <SeoServicePage
        badge="Paiement fournisseur Chine-Mali"
        title="Payer un fournisseur en Chine depuis le Mali"
        intro="Vous avez trouvé un fournisseur sur Alibaba, 1688, Taobao ou WeChat, mais il demande un paiement en Chine ? ChinaLink Express vous aide à sécuriser le paiement, vérifier les informations essentielles et organiser la suite : contrôle, consolidation et expédition vers Bamako."
        highlights={[
          'Paiement Alipay, WeChat Pay ou virement selon le cas',
          'Preuve de paiement partagée avec le client',
          'Vérification recommandée avant tout gros montant',
          'Suivi fournisseur puis expédition Chine-Mali',
        ]}
        sections={[
          {
            title: 'Plateformes et paiements acceptés',
            body: 'Les fournisseurs chinois travaillent souvent avec des moyens de paiement difficiles à utiliser depuis le Mali. Nous aidons à payer les commandes lorsque le fournisseur accepte Alipay, WeChat Pay, virement bancaire chinois ou paiement via plateforme.',
            items: ['Alibaba et fournisseurs B2B', '1688 et vendeurs domestiques chinois', 'Taobao et Tmall pour certains achats', 'Fournisseurs contactés sur WeChat'],
          },
          {
            title: 'Les risques à éviter avant de payer',
            body: 'Le paiement est l’étape où beaucoup d’importateurs perdent de l’argent : faux fournisseurs, compte personnel suspect, prix trop bas, changement de qualité ou absence de preuve. ChinaLink demande les informations clés avant paiement pour réduire ces risques.',
            items: ['Nom de société cohérent', 'Historique et preuves de production', 'Adresse et contact fournisseur', 'Photos, vidéos ou échantillon si nécessaire'],
          },
          {
            title: 'Ce que vous recevez après paiement',
            body: 'Après validation, vous recevez une confirmation claire. Le fournisseur est ensuite suivi jusqu’à la préparation de la marchandise, avec possibilité de contrôle photo avant l’expédition vers le Mali.',
            items: ['Confirmation du montant payé', 'Capture ou reçu disponible selon le canal', 'Suivi de la commande fournisseur', 'Coordination avec le service sourcing ou fret'],
          },
        ]}
        table={{
          headers: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink'],
          rows: [
            ['Payer via Alipay/WeChat', 'Souvent impossible depuis le Mali', 'Paiement assisté en Chine'],
            ['Limiter les arnaques', 'Vérification difficile à distance', 'Contrôles avant paiement'],
            ['Regrouper les achats', 'Chaque fournisseur expédie séparément', 'Consolidation avant fret'],
            ['Suivre la commande', 'Messages éparpillés', 'Coordination WhatsApp'],
          ],
        }}
        process={[
          'Vous envoyez le lien produit, le devis fournisseur, le montant et les coordonnées du vendeur.',
          'Nous vérifions les informations de base et signalons les risques visibles avant paiement.',
          'Vous validez le montant, le taux et les frais applicables.',
          'ChinaLink règle le fournisseur par le canal accepté lorsque tout est clair.',
          'Nous suivons la préparation de la commande et pouvons organiser inspection, consolidation et expédition.',
        ]}
        faqs={faqs}
        links={[
          { href: '/fr/services/verification-fournisseur-chine', label: 'Vérifier un fournisseur chinois' },
          { href: '/fr/services/sourcing', label: 'Agent sourcing Chine pour le Mali' },
          { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali' },
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
export const dynamicParams = false;
export const revalidate = 3600;

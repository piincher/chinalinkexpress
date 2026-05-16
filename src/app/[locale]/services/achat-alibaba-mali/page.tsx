import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
  generateServiceSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    badge: 'Achat Alibaba Mali',
    title: 'Acheter sur Alibaba depuis le Mali sans arnaque',
    intro: 'Vous voulez acheter sur Alibaba depuis le Mali mais vous craignez les arnaques, la barrière de la langue et les problèmes de paiement ? ChinaLink Express est votre agent achat Alibaba de confiance. Nous trouvons les meilleurs fournisseurs, négocions les prix, vérifions la qualité, payons en toute sécurité et livrons à Bamako. Plus de 500 importateurs maliens nous font déjà confiance.',
    highlights: [
      'Achat sécurisé sur Alibaba avec vérification fournisseur',
      'Négociation des prix en mandarin pour économiser 20-40%',
      'Paiement sécurisé via notre bureau chinois',
      'Inspection qualité avec photos avant expédition',
      'Livraison porte à porte au Mali en 14-21 jours (aérien)',
    ],
    sections: [
      {
        title: 'Pourquoi utiliser un agent pour acheter sur Alibaba ?',
        body: 'Acheter sur Alibaba depuis le Mali présente plusieurs défis : les fournisseurs préfèrent les paiements chinois (Alipay, virement), la négociation en anglais donne des prix export plus élevés, et il est impossible de vérifier la qualité à distance. Un agent local en Chine résout tous ces problèmes.',
        items: [
          'Paiement : nous payons les fournisseurs via Alipay et virement chinois',
          'Négociation : discussion en mandarin pour des tarifs usine réels',
          'Vérification : audit fournisseur, licence, historique, avis clients',
          'Qualité : inspection photos et vidéos avant expédition',
          'Logistique : consolidation et fret aérien/maritime vers le Mali',
        ],
      },
      {
        title: 'Comment éviter les arnaques sur Alibaba',
        body: 'Les arnaques sur Alibaba sont fréquentes pour les acheteurs africains : faux fournisseurs, produits de qualité inférieure, changement de spécifications après paiement, ou disparition du vendeur. ChinaLink Express protège votre investissement avec des contrôles systématiques.',
        items: [
          'Vérification de la licence commerciale et de l\'historique du vendeur',
          'Analyse des avis clients et des transactions passées',
          'Visite usine physique pour les commandes importantes',
          'Contrôle qualité avec photos détaillées avant expédition',
          'Paiement sécurisé avec preuve et suivi fournisseur',
        ],
      },
      {
        title: 'Processus d\'achat Alibaba simplifié',
        body: 'Avec ChinaLink Express, acheter sur Alibaba depuis le Mali devient simple et sécurisé. Voici comment nous travaillons pour vous :',
        items: [
          'Envoyez-nous le lien Alibaba ou la description du produit sur WhatsApp',
          'Nous recherchons 3 fournisseurs qualifiés et comparons les offres',
          'Vous validez le fournisseur et le prix négocié',
          'Nous vérifions, payons et suivons la production',
          'Nous inspectons, consolidons et expédions vers le Mali',
        ],
      },
    ],
    tableHeaders: ['Problème', 'Acheter seul sur Alibaba', 'Avec ChinaLink Express'],
    tableRows: [
      ['Paiement fournisseur', 'Alipay impossible depuis le Mali', 'Paiement via notre bureau chinois'],
      ['Négociation prix', 'Prix export élevés en anglais', 'Négociation mandarin, économies réelles'],
      ['Risque arnaque', 'Aucune vérification possible', 'Audit complet + inspection qualité'],
      ['Suivi commande', 'Messages sans réponse', 'Suivi WhatsApp en temps réel'],
      ['Expédition', 'Chaque fournisseur envoie séparément', 'Consolidation + fret groupé'],
    ],
    process: [
      'Envoyez le lien Alibaba ou la description du produit sur WhatsApp.',
      'Nous recherchons et comparons 3 fournisseurs qualifiés.',
      'Vous choisissez le meilleur rapport qualité-prix négocié.',
      'Nous vérifions le fournisseur, payons et suivons la production.',
      'Inspection qualité, consolidation et expédition fret vers le Mali.',
    ],
    faqs: [
      {
        question: 'Puis-je acheter sur Alibaba depuis le Mali ?',
        answer: 'Oui, mais avec des difficultés : paiement Alipay souvent bloqué, négociation en anglais avec prix export, et risque d\'arnaque sans vérification. ChinaLink Express résout tous ces problèmes en tant qu\'agent achat basé en Chine.',
      },
      {
        question: 'Combien coûte un agent achat Alibaba ?',
        answer: 'Nos frais d\'agent achat commencent à 50 USD par commande (recherche + négociation). L\'inspection qualité est à 100 USD. Le paiement fournisseur et le fret sont facturés séparément avec des tarifs transparents.',
      },
      {
        question: 'Comment savoir si un fournisseur Alibaba est fiable ?',
        answer: 'Nous vérifions la licence commerciale, l\'historique des transactions, les avis clients vérifiés, et réalisons une visite usine pour les grosses commandes. Nous ne payons jamais un fournisseur non audité.',
      },
      {
        question: 'Quel délai pour recevoir une commande Alibaba au Mali ?',
        answer: 'La recherche fournisseur prend 2-3 jours, la production 7-30 jours selon le produit, puis le fret aérien 14-21 jours ou maritime 60-75 jours. Nous vous donnons un calendrier précis à chaque étape.',
      },
      {
        question: 'Pouvez-vous acheter sur 1688 aussi ?',
        answer: 'Oui, 1688 est le marché chinois domestique avec des prix 30-50% moins chers qu\'Alibaba. Notre équipe bilingue achète pour vous sur 1688 avec les mêmes garanties de vérification et qualité.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine complet' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification fournisseur' },
      { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement fournisseur Chine' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Guide complet acheter sur Alibaba' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide acheter sur 1688' },
    ],
  },
  en: {
    badge: 'Alibaba Buying Agent Mali',
    title: 'Buy from Alibaba from Mali Without Getting Scammed',
    intro: 'Want to buy on Alibaba from Mali but worried about scams, language barriers, and payment issues? ChinaLink Express is your trusted Alibaba buying agent. We find the best suppliers, negotiate prices, verify quality, pay securely, and deliver to Bamako. Over 500 Malian importers already trust us.',
    highlights: [
      'Secure Alibaba purchasing with supplier verification',
      'Mandarin price negotiation to save 20-40%',
      'Secure payment via our China office',
      'Quality inspection with photos before shipping',
      'Door-to-door delivery to Mali in 14-21 days (air)',
    ],
    sections: [
      {
        title: 'Why use an agent to buy on Alibaba?',
        body: 'Buying on Alibaba from Mali presents several challenges: suppliers prefer Chinese payments (Alipay, bank transfer), English negotiation gives higher export prices, and quality verification is impossible remotely. A local agent in China solves all these problems.',
        items: [
          'Payment: we pay suppliers via Alipay and Chinese bank transfer',
          'Negotiation: Mandarin discussion for real factory prices',
          'Verification: supplier audit, license, history, customer reviews',
          'Quality: photo and video inspection before shipping',
          'Logistics: consolidation and air/sea freight to Mali',
        ],
      },
      {
        title: 'How to avoid scams on Alibaba',
        body: 'Alibaba scams are common for African buyers: fake suppliers, inferior quality products, specification changes after payment, or disappearing sellers. ChinaLink Express protects your investment with systematic controls.',
        items: [
          'Verification of business license and seller history',
          'Analysis of customer reviews and past transactions',
          'Physical factory visit for important orders',
          'Quality control with detailed photos before shipping',
          'Secure payment with proof and supplier follow-up',
        ],
      },
      {
        title: 'Simplified Alibaba buying process',
        body: 'With ChinaLink Express, buying on Alibaba from Mali becomes simple and secure. Here is how we work for you:',
        items: [
          'Send us the Alibaba link or product description on WhatsApp',
          'We research 3 qualified suppliers and compare offers',
          'You validate the supplier and negotiated price',
          'We verify, pay and follow production',
          'We inspect, consolidate and ship to Mali',
        ],
      },
    ],
    tableHeaders: ['Problem', 'Buying alone on Alibaba', 'With ChinaLink Express'],
    tableRows: [
      ['Supplier payment', 'Alipay impossible from Mali', 'Payment via our China office'],
      ['Price negotiation', 'High export prices in English', 'Mandarin negotiation, real savings'],
      ['Scam risk', 'No verification possible', 'Complete audit + quality inspection'],
      ['Order tracking', 'Unanswered messages', 'Real-time WhatsApp tracking'],
      ['Shipping', 'Each supplier ships separately', 'Consolidation + group freight'],
    ],
    process: [
      'Send the Alibaba link or product description on WhatsApp.',
      'We research and compare 3 qualified suppliers.',
      'You choose the best value-for-money negotiated offer.',
      'We verify the supplier, pay and follow production.',
      'Quality inspection, consolidation and freight shipping to Mali.',
    ],
    faqs: [
      {
        question: 'Can I buy on Alibaba from Mali?',
        answer: 'Yes, but with difficulties: Alipay often blocked, English negotiation with export prices, and scam risk without verification. ChinaLink Express solves all these issues as your buying agent based in China.',
      },
      {
        question: 'How much does an Alibaba buying agent cost?',
        answer: 'Our buying agent fees start at $50 per order (search + negotiation). Quality inspection is $100. Supplier payment and freight are charged separately with transparent rates.',
      },
      {
        question: 'How to know if an Alibaba supplier is reliable?',
        answer: 'We verify the business license, transaction history, verified customer reviews, and conduct factory visits for large orders. We never pay an unaudited supplier.',
      },
      {
        question: 'What is the delivery timeline for Alibaba orders to Mali?',
        answer: 'Supplier research takes 2-3 days, production 7-30 days depending on the product, then air freight 14-21 days or sea freight 60-75 days. We provide a precise timeline at every step.',
      },
      {
        question: 'Can you buy on 1688 too?',
        answer: 'Yes, 1688 is the Chinese domestic market with 30-50% lower prices than Alibaba. Our bilingual team buys for you on 1688 with the same verification and quality guarantees.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'Complete China sourcing agent' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Supplier verification' },
      { href: '/en/services/paiement-fournisseur-chine', label: 'Supplier payment China' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Complete guide to buying on Alibaba' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide to buying on 1688' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Buy from Alibaba Mali | Alibaba Agent West Africa | ChinaLink'
      : 'Acheter sur Alibaba Mali | Agent Achat Alibaba Afrique | ChinaLink',
    description: isEn
      ? 'Trusted Alibaba buying agent for Mali & West Africa. Buy safely from Alibaba with supplier verification, price negotiation, secure payment & shipping to Bamako. Avoid scams. WhatsApp: +86 188 5172 5957'
      : 'Agent achat Alibaba de confiance pour le Mali et l\'Afrique de l\'Ouest. Achetez en sécurité sur Alibaba avec vérification fournisseur, négociation, paiement sécurisé et livraison à Bamako. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'buy from Alibaba Mali, Alibaba agent Mali, Alibaba buying agent Africa, Alibaba sourcing agent West Africa, purchase from Alibaba Africa, Alibaba procurement Mali, avoid Alibaba scam, Alibaba payment agent, Alibaba shipping agent Mali, freight forwarder China Mali'
      : 'acheter sur Alibaba Mali, agent Alibaba Mali, agent achat Alibaba Afrique, agent sourcing Alibaba Afrique de l\'Ouest, acheter sur Alibaba Afrique, approvisionnement Alibaba Mali, éviter arnaque Alibaba, agent paiement Alibaba, agent maritime Alibaba Mali, cargo chine mali, transitaire chine mali',
    path: '/services/achat-alibaba-mali',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function AchatAlibabaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const schemas = [
    generateOrganizationSchema(),
    generateServiceSchema('alibaba', locale as Locale),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: 'Services', url: `/${locale}/services` },
      { name: isEn ? 'Alibaba Buying Agent' : 'Achat Alibaba Mali', url: `/${locale}/services/achat-alibaba-mali` },
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
        ctaLabel={isEn ? 'Request an Alibaba quote on WhatsApp' : undefined}
        routeCtaHref={`/${locale}/routes/china-to-mali`}
        routeCtaLabel={isEn ? 'See China to Mali freight' : undefined}
        comparisonTitle={isEn ? 'Quick comparison' : undefined}
        processTitle={isEn ? 'Our process' : undefined}
        faqTitle={isEn ? 'Frequently asked questions' : undefined}
        usefulLinksTitle={isEn ? 'Useful links' : undefined}
        asideTitle={isEn ? 'Need help buying on Alibaba?' : undefined}
        asideText={isEn ? 'Send the Alibaba link, quantity and destination. Our team will reply on WhatsApp.' : undefined}
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

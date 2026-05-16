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
    badge: 'Agent Sourcing Chine',
    title: 'Votre agent sourcing en Chine pour l\'Afrique de l\'Ouest',
    intro: 'Vous cherchez un agent sourcing fiable en Chine pour acheter sur Alibaba, 1688 ou directement en usine ? ChinaLink Express est votre intermédiaire de confiance basé à Yiwu et Guangzhou. Nous trouvons vos fournisseurs, négocions les prix, vérifions la qualité, payons en votre nom et expédions vers le Mali, le Sénégal, la Côte d\'Ivoire et toute l\'Afrique de l\'Ouest. Plus de 500 entreprises africaines nous font confiance depuis 2019.',
    highlights: [
      'Recherche de fournisseurs sur Alibaba, 1688 et usines',
      'Négociation des prix en mandarin pour de meilleurs tarifs',
      'Vérification qualité et inspection avant expédition',
      'Paiement fournisseur sécurisé via notre bureau en Chine',
      'Consolidation et expédition fret aérien ou maritime',
    ],
    sections: [
      {
        title: 'Pourquoi utiliser un agent sourcing en Chine ?',
        body: 'Acheter directement en Chine sans intermédiaire expose à de nombreux risques : arnaques sur Alibaba, mauvaise qualité, incompréhension linguistique, difficultés de paiement, et problèmes logistiques. Un agent sourcing local comme ChinaLink Express élimine ces risques en gérant chaque étape depuis la Chine.',
        items: [
          'Évitez les arnaques Alibaba et les faux fournisseurs',
          'Obtenez des prix 20-40% moins chers grâce à la négociation locale',
          'Assurez la qualité avec inspection sur place avant expédition',
          'Simplifiez le paiement via notre bureau chinois',
          'Consolidez plusieurs achats dans un seul envoi économique',
        ],
      },
      {
        title: 'Nos services de sourcing complet',
        body: 'ChinaLink Express propose un service de sourcing clé en main depuis la Chine. De la recherche du fournisseur à la livraison à votre adresse en Afrique, nous gérons tout pour vous.',
        items: [
          'Recherche fournisseur : Alibaba, 1688, foires, usines directes',
          'Négociation prix : discussion en mandarin pour obtenir les meilleurs tarifs',
          'Vérification fournisseur : audit usine, licence, historique',
          'Inspection qualité : contrôle produit avant expédition avec photos',
          'Paiement sécurisé : via notre bureau chinois (Alipay, virement, WeChat)',
          'Consolidation : regroupement de plusieurs fournisseurs avant envoi',
          'Expédition : fret aérien 14-21j ou maritime 60-75j vers l\'Afrique',
        ],
      },
      {
        title: 'Alibaba vs 1688 : quelle plateforme choisir ?',
        body: 'Alibaba est la plateforme internationale en anglais avec des prix plus élevés. 1688 est le site chinois réservé au marché domestique avec des prix 30-50% moins chers mais en chinois uniquement. Notre équipe bilingue achète sur les deux plateformes pour vous trouver les meilleures opportunités.',
        items: [
          'Alibaba : fournisseurs certifiés, Trade Assurance, prix internationaux',
          '1688 : prix usine direct, marché domestique chinois, 30-50% moins cher',
          'Nous sourçons sur les deux plateformes selon vos besoins et budget',
          'Vérification systématique avant tout paiement sur 1688',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans agent sourcing', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver un fournisseur', 'Des heures de recherche, risque d\'arnaque', 'Recherche experte + vérification incluse'],
      ['Négocier les prix', 'Prix export élevés, barrière de langue', 'Négociation mandarin, économies 20-40%'],
      ['Payer en Chine', 'Impossible depuis l\'Afrique (Alipay, 1688)', 'Paiement via notre bureau chinois'],
      ['Vérifier la qualité', 'Surprise à la réception, pas de recours', 'Inspection photos avant expédition'],
      ['Expédier vers l\'Afrique', 'Chaque fournisseur envoie séparément', 'Consolidation + fret groupé économique'],
    ],
    process: [
      'Vous nous envoyez votre besoin (produit, quantité, budget) sur WhatsApp.',
      'Nous recherchons 3-5 fournisseurs qualifiés sur Alibaba et/ou 1688.',
      'Vous choisissez le fournisseur, nous négocions les prix et conditions.',
      'Nous vérifions le fournisseur, payons et suivons la production.',
      'Nous inspectons la qualité, consolidons et expédions vers votre pays.',
    ],
    faqs: [
      {
        question: 'Combien coûte un agent sourcing en Chine ?',
        answer: 'Nos honoraires de sourcing commencent à 50 USD par commande (recherche + négociation). L\'inspection qualité est à 100 USD. Le paiement fournisseur et la consolidation ont des tarifs transparents selon le montant et le volume. Contactez-nous sur WhatsApp pour un devis personnalisé.',
      },
      {
        question: 'Pouvez-vous acheter sur 1688 pour moi ?',
        answer: 'Oui, c\'est l\'un de nos services les plus demandés. 1688 propose des prix 30-50% moins chers qu\'Alibaba mais est en chinois uniquement. Notre équipe achète pour vous, vérifie la qualité et gère l\'expédition.',
      },
      {
        question: 'Comment éviter les arnaques sur Alibaba ?',
        answer: 'Nous vérifions systématiquement chaque fournisseur : licence commerciale, historique, avis clients, visite usine si nécessaire. Nous ne payons jamais un fournisseur non vérifié et utilisons les mécanismes de protection quand disponibles.',
      },
      {
        question: 'Quel délai pour recevoir mes marchandises ?',
        answer: 'La recherche fournisseur prend 2-5 jours. La production varie de 7 à 30 jours selon le produit. Le fret aérien ajoute 14-21 jours, le maritime 60-75 jours. Nous vous donnons un calendrier précis dès le devis.',
      },
      {
        question: 'Livrez-vous dans tous les pays d\'Afrique de l\'Ouest ?',
        answer: 'Oui, nous livrons au Mali, Sénégal, Côte d\'Ivoire, Ghana, Nigeria, Burkina Faso, Niger, Bénin, Togo, Guinée, Cameroun et RDC. Le fret aérien arrive généralement à Bamako ou Dakar avec transit local.',
      },
    ],
    links: [
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification fournisseur chinois' },
      { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement fournisseur Chine' },
      { href: '/fr/services/sourcing', label: 'Service sourcing complet' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Guide acheter sur Alibaba' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide acheter sur 1688' },
    ],
  },
  en: {
    badge: 'China Sourcing Agent',
    title: 'Your China Sourcing Agent for West Africa',
    intro: 'Looking for a reliable sourcing agent in China to buy from Alibaba, 1688, or directly from factories? ChinaLink Express is your trusted intermediary based in Yiwu and Guangzhou. We find your suppliers, negotiate prices, verify quality, pay on your behalf, and ship to Mali, Senegal, Ivory Coast, and all of West Africa. Over 500 African businesses trust us since 2019.',
    highlights: [
      'Supplier search on Alibaba, 1688, and direct factories',
      'Price negotiation in Mandarin for better rates',
      'Quality verification and pre-shipment inspection',
      'Secure supplier payment via our China office',
      'Consolidation and air/sea freight shipping',
    ],
    sections: [
      {
        title: 'Why use a China sourcing agent?',
        body: 'Buying directly from China without an intermediary exposes you to many risks: Alibaba scams, poor quality, language barriers, payment difficulties, and logistics problems. A local sourcing agent like ChinaLink Express eliminates these risks by managing every step from China.',
        items: [
          'Avoid Alibaba scams and fake suppliers',
          'Get 20-40% cheaper prices through local negotiation',
          'Ensure quality with on-site inspection before shipping',
          'Simplify payment through our China office',
          'Consolidate multiple purchases into one economical shipment',
        ],
      },
      {
        title: 'Our complete sourcing services',
        body: 'ChinaLink Express offers a turnkey sourcing service from China. From supplier research to delivery at your African address, we handle everything for you.',
        items: [
          'Supplier search: Alibaba, 1688, trade fairs, direct factories',
          'Price negotiation: Mandarin discussion for best rates',
          'Supplier verification: factory audit, license, history',
          'Quality inspection: product check before shipping with photos',
          'Secure payment: via our China office (Alipay, bank, WeChat)',
          'Consolidation: grouping multiple suppliers before shipping',
          'Shipping: air freight 14-21 days or sea freight 60-75 days to Africa',
        ],
      },
      {
        title: 'Alibaba vs 1688: which platform to choose?',
        body: 'Alibaba is the international English platform with higher prices. 1688 is the Chinese domestic market site with 30-50% lower prices but Chinese only. Our bilingual team buys on both platforms to find you the best opportunities.',
        items: [
          'Alibaba: certified suppliers, Trade Assurance, international prices',
          '1688: direct factory prices, Chinese domestic market, 30-50% cheaper',
          'We source on both platforms according to your needs and budget',
          'Systematic verification before any payment on 1688',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without sourcing agent', 'With ChinaLink Express'],
    tableRows: [
      ['Find a supplier', 'Hours of research, scam risk', 'Expert search + verification included'],
      ['Negotiate prices', 'High export prices, language barrier', 'Mandarin negotiation, 20-40% savings'],
      ['Pay in China', 'Impossible from Africa (Alipay, 1688)', 'Payment via our China office'],
      ['Check quality', 'Surprise on receipt, no recourse', 'Photo inspection before shipping'],
      ['Ship to Africa', 'Each supplier ships separately', 'Consolidation + economical group freight'],
    ],
    process: [
      'Send us your need (product, quantity, budget) on WhatsApp.',
      'We research 3-5 qualified suppliers on Alibaba and/or 1688.',
      'You choose the supplier, we negotiate prices and terms.',
      'We verify the supplier, pay and follow production.',
      'We inspect quality, consolidate and ship to your country.',
    ],
    faqs: [
      {
        question: 'How much does a China sourcing agent cost?',
        answer: 'Our sourcing fees start at $50 per order (search + negotiation). Quality inspection is $100. Supplier payment and consolidation have transparent rates based on amount and volume. Contact us on WhatsApp for a personalized quote.',
      },
      {
        question: 'Can you buy on 1688 for me?',
        answer: 'Yes, this is one of our most requested services. 1688 offers 30-50% lower prices than Alibaba but is Chinese only. Our team buys for you, verifies quality, and manages shipping.',
      },
      {
        question: 'How to avoid scams on Alibaba?',
        answer: 'We systematically verify every supplier: business license, history, customer reviews, factory visit when needed. We never pay an unverified supplier and use protection mechanisms when available.',
      },
      {
        question: 'What is the delivery timeline?',
        answer: 'Supplier research takes 2-5 days. Production varies from 7 to 30 days depending on the product. Air freight adds 14-21 days, sea freight 60-75 days. We provide a precise timeline with your quote.',
      },
      {
        question: 'Do you deliver to all West African countries?',
        answer: 'Yes, we deliver to Mali, Senegal, Ivory Coast, Ghana, Nigeria, Burkina Faso, Niger, Benin, Togo, Guinea, Cameroon, and DRC. Air freight usually arrives in Bamako or Dakar with local transit.',
      },
    ],
    links: [
      { href: '/en/services/verification-fournisseur-chine', label: 'Verify Chinese supplier' },
      { href: '/en/services/paiement-fournisseur-chine', label: 'Supplier payment China' },
      { href: '/en/services/sourcing', label: 'Complete sourcing service' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Guide to buying on Alibaba' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide to buying on 1688' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'China Sourcing Agent for Africa | Alibaba & 1688 Buying Agent | ChinaLink'
      : 'Agent Sourcing Chine Afrique | Achat Alibaba 1688 | ChinaLink Express',
    description: isEn
      ? 'Trusted China sourcing agent for West Africa. Buy from Alibaba, 1688 & Chinese factories with price negotiation, quality inspection, secure payment & shipping to Mali, Senegal, Ivory Coast. WhatsApp: +86 188 5172 5957'
      : 'Agent sourcing de confiance en Chine pour l\'Afrique de l\'Ouest. Achat sur Alibaba, 1688 et usines chinoises avec négociation, inspection qualité, paiement sécurisé et expédition vers le Mali, Sénégal, Côte d\'Ivoire. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'China sourcing agent, Alibaba sourcing agent, 1688 sourcing agent, buy from Alibaba Africa, China buying agent Mali, Alibaba agent West Africa, sourcing agent Yiwu, factory direct sourcing China, wholesale from China Africa, China procurement services, import from China Mali, freight forwarder China Mali'
      : 'agent sourcing Chine, agent sourcing Alibaba, agent sourcing 1688, acheter sur Alibaba Afrique, agent achat Chine Mali, agent Alibaba Afrique de l\'Ouest, sourcing Yiwu, sourcing direct usine Chine, grossiste Chine Afrique, service approvisionnement Chine, importer de Chine Mali, cargo chine mali, transitaire chine mali',
    path: '/services/agent-sourcing-chine',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function AgentSourcingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const schemas = [
    generateOrganizationSchema(),
    generateServiceSchema('sourcing', locale as Locale),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: 'Services', url: `/${locale}/services` },
      { name: isEn ? 'China Sourcing Agent' : 'Agent Sourcing Chine', url: `/${locale}/services/agent-sourcing-chine` },
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
        ctaLabel={isEn ? 'Request a sourcing quote on WhatsApp' : undefined}
        routeCtaHref={`/${locale}/routes/china-to-mali`}
        routeCtaLabel={isEn ? 'See China to Mali freight' : undefined}
        comparisonTitle={isEn ? 'Quick comparison' : undefined}
        processTitle={isEn ? 'Our process' : undefined}
        faqTitle={isEn ? 'Frequently asked questions' : undefined}
        usefulLinksTitle={isEn ? 'Useful links' : undefined}
        asideTitle={isEn ? 'Need a sourcing quote?' : undefined}
        asideText={isEn ? 'Send the product, quantity, target price and destination. Our team will reply on WhatsApp.' : undefined}
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

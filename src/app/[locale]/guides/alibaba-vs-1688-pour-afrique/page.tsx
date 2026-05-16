import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
  generateHowToSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    badge: 'Guide Alibaba vs 1688',
    title: 'Alibaba vs 1688 : quelle plateforme choisir pour importer en Afrique ?',
    intro: 'Vous hésitez entre Alibaba et 1688 pour acheter en Chine depuis l\'Afrique ? C\'est la question que se posent tous les importateurs africains. Alibaba est la plateforme internationale en anglais mais avec des prix export plus élevés. 1688 est le marché domestique chinois avec des prix 30-50% moins chers, mais en chinois uniquement et sans protection acheteur internationale. Dans ce guide complet, ChinaLink Express vous explique les différences clés, les avantages de chaque plateforme, et comment notre agent sourcing vous permet d\'acheter sur les deux en toute sécurité.',
    highlights: [
      'Comparaison détaillée prix, qualité, sécurité et accessibilité',
      '1688 : prix 30-50% moins chers mais risque plus élevé',
      'Alibaba : plus sûr mais prix export majorés',
      'Notre agent achat vous permet d\'acheter sur les deux plateformes',
      'Stratégie recommandée selon votre budget et expérience',
    ],
    sections: [
      {
        title: 'Quelle est la différence entre Alibaba et 1688 ?',
        body: 'Alibaba.com et 1688.com sont tous deux des plateformes du groupe Alibaba, mais destinées à des marchés complètement différents. Comprendre cette différence est essentiel pour choisir la bonne plateforme selon votre profil d\'importateur.',
        items: [
          'Alibaba : plateforme B2B internationale, en anglais, pour export vers le monde entier',
          '1688 : plateforme B2B domestique chinoise, en mandarin, pour le marché intérieur chinois',
          'Prix : 1688 est systématiquement 30-50% moins cher qu\'Alibaba pour le même produit',
          'MOQ (quantité minimum) : souvent plus basse sur 1688 car destiné aux petits commerçants chinois',
          'Protection acheteur : Trade Assurance sur Alibaba, aucune protection internationale sur 1688',
        ],
      },
      {
        title: 'Avantages et inconvénients de chaque plateforme',
        body: 'Chaque plateforme a ses forces et faiblesses. Voici un tableau comparatif pour vous aider à choisir selon votre situation.',
        items: [
          'Alibaba avantages : interface anglais, fournisseurs vérifiés, Trade Assurance, paiement sécurisé, support client',
          'Alibaba inconvénients : prix export élevés, MOQ élevées, communication lente avec vendeurs',
          '1688 avantages : prix usine réels, MOQ flexibles, nouveautés en avant-première, énorme choix',
          '1688 inconvénients : chinois uniquement, aucune protection internationale, risque arnaque élevé sans vérification, paiement difficile depuis l\'Afrique',
        ],
      },
      {
        title: 'Notre stratégie recommandée pour les importateurs africains',
        body: 'Après 7 ans d\'expérience avec des centaines d\'importateurs africains, nous recommandons une stratégie hybride qui combine les avantages des deux plateformes tout en minimisant les risques.',
        items: [
          'Débutants : commencez sur Alibaba avec Trade Assurance pour sécuriser vos premières commandes',
          'Intermédiaires : utilisez Alibaba pour les produits complexes, 1688 pour les produits simples et standards',
          'Importateurs confirmés : achetez principalement sur 1688 via un agent vérifié pour maximiser vos marges',
          'Tous niveaux : utilisez toujours un agent sourcing local en Chine pour vérifier les fournisseurs avant paiement',
        ],
      },
    ],
    tableHeaders: ['Critère', 'Alibaba.com', '1688.com'],
    tableRows: [
      ['Langue', 'Anglais (multilingue)', 'Chinois uniquement'],
      ['Prix', 'Prix export (majorés 30-50%)', 'Prix usine domestique (30-50% moins cher)'],
      ['MOQ minimum', 'Élevé (100-1000+ pièces)', 'Flexible (10-100 pièces)'],
      ['Protection acheteur', 'Trade Assurance Alibaba', 'Aucune protection internationale'],
      ['Vérification fournisseur', 'Gold Supplier, vérifié', 'Niveau d\'entrée bas, vérification difficile'],
      ['Paiement depuis Afrique', 'Carte bancaire, T/T (difficile)', 'Alipay, WeChat Pay (impossible depuis Afrique)'],
      ['Nouveautés', 'Produits testés et validés', 'Nouveautés en avant-première'],
      ['Support client', 'En anglais par email', 'En chinois uniquement'],
    ],
    process: [
      'Définissez votre produit, budget et quantité sur WhatsApp.',
      'Nous recherchons le même produit sur Alibaba ET 1688 pour comparer.',
      'Vous recevez une comparaison prix, qualité, délai et risque.',
      'Vous choisissez la meilleure option, nous vérifions le fournisseur.',
      'Nous payons, inspectons et expédions vers votre pays en Afrique.',
    ],
    faqs: [
      {
        question: '1688 est-il vraiment 50% moins cher qu\'Alibaba ?',
        answer: 'Oui, pour de nombreux produits standards (textiles, accessoires, électronique, jouets), 1688 affiche des prix 30 à 50% inférieurs à Alibaba. Cela s\'explique car 1688 est destiné au marché domestique chinois, sans les surcoûts export, marketing international et commissions intermédiaires.',
      },
      {
        question: 'Puis-je acheter sur 1688 depuis le Mali sans agent ?',
        answer: 'Théoriquement non pratique : le site est en chinois, le paiement nécessite Alipay ou compte bancaire chinois, et il n\'y a aucune protection internationale. Sans agent local en Chine, vous exposez votre argent à un risque très élevé d\'arnaque.',
      },
      {
        question: 'Comment ChinaLink achète-t-il sur 1688 pour moi ?',
        answer: 'Notre équipe bilingue basée à Yiwu navigue sur 1688, identifie les fournisseurs fiables, négocie en mandarin, paie via notre compte Alipay chinois, inspecte la qualité sur place, et expédie vers l\'Afrique. Vous bénéficiez des prix 1688 avec la sécurité d\'un agent local.',
      },
      {
        question: 'Quels produits sont meilleurs sur 1688 ?',
        answer: 'Les produits standards et non complexes sont idéaux sur 1688 : textiles, accessoires mode, articles de maison, jouets, petits électroniques, outils. Pour les produits techniques complexes (machines, médical, électronique avancée), Alibaba reste plus sûr.',
      },
      {
        question: 'Quel est le coût de l\'agent pour acheter sur 1688 ?',
        answer: 'Nos honoraires pour l\'achat sur 1688 commencent à 80 USD par commande (recherche + négociation + paiement). L\'inspection qualité est à 100 USD. Ces frais sont rapidement amortis par les économies de 30-50% sur les prix 1688.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine complet' },
      { href: '/fr/services/achat-alibaba-mali', label: 'Acheter sur Alibaba depuis le Mali' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide complet acheter sur 1688' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification fournisseur' },
    ],
  },
  en: {
    badge: 'Alibaba vs 1688 Guide',
    title: 'Alibaba vs 1688: Which Platform to Choose for Importing to Africa?',
    intro: 'Torn between Alibaba and 1688 for buying from China to Africa? This is the question every African importer asks. Alibaba is the international English platform but with higher export prices. 1688 is the Chinese domestic market with 30-50% lower prices, but Chinese only and without international buyer protection. In this complete guide, ChinaLink Express explains the key differences, advantages of each platform, and how our sourcing agent lets you buy safely on both.',
    highlights: [
      'Detailed comparison of price, quality, security, and accessibility',
      '1688: 30-50% cheaper but higher risk',
      'Alibaba: safer but marked-up export prices',
      'Our buying agent lets you purchase on both platforms',
      'Recommended strategy based on your budget and experience',
    ],
    sections: [
      {
        title: 'What is the difference between Alibaba and 1688?',
        body: 'Alibaba.com and 1688.com are both platforms of the Alibaba group, but aimed at completely different markets. Understanding this difference is essential to choose the right platform for your importer profile.',
        items: [
          'Alibaba: international B2B platform, in English, for export worldwide',
          '1688: Chinese domestic B2B platform, in Mandarin, for the Chinese domestic market',
          'Price: 1688 is systematically 30-50% cheaper than Alibaba for the same product',
          'MOQ (minimum quantity): often lower on 1688 as it targets small Chinese traders',
          'Buyer protection: Trade Assurance on Alibaba, no international protection on 1688',
        ],
      },
      {
        title: 'Pros and cons of each platform',
        body: 'Each platform has its strengths and weaknesses. Here is a comparative table to help you choose based on your situation.',
        items: [
          'Alibaba advantages: English interface, verified suppliers, Trade Assurance, secure payment, customer support',
          'Alibaba disadvantages: high export prices, high MOQs, slow communication with sellers',
          '1688 advantages: real factory prices, flexible MOQs, early access to new products, huge selection',
          '1688 disadvantages: Chinese only, no international protection, high scam risk without verification, difficult payment from Africa',
        ],
      },
      {
        title: 'Our recommended strategy for African importers',
        body: 'After 7 years of experience with hundreds of African importers, we recommend a hybrid strategy that combines the advantages of both platforms while minimizing risks.',
        items: [
          'Beginners: start on Alibaba with Trade Assurance to secure your first orders',
          'Intermediate: use Alibaba for complex products, 1688 for simple and standard products',
          'Experienced importers: buy mainly on 1688 via a verified agent to maximize margins',
          'All levels: always use a local sourcing agent in China to verify suppliers before payment',
        ],
      },
    ],
    tableHeaders: ['Criteria', 'Alibaba.com', '1688.com'],
    tableRows: [
      ['Language', 'English (multilingual)', 'Chinese only'],
      ['Price', 'Export prices (marked up 30-50%)', 'Domestic factory prices (30-50% cheaper)'],
      ['Minimum MOQ', 'High (100-1000+ pieces)', 'Flexible (10-100 pieces)'],
      ['Buyer protection', 'Alibaba Trade Assurance', 'No international protection'],
      ['Supplier verification', 'Gold Supplier, verified', 'Low entry level, difficult verification'],
      ['Payment from Africa', 'Credit card, T/T (difficult)', 'Alipay, WeChat Pay (impossible from Africa)'],
      ['New products', 'Tested and validated products', 'Early access to new products'],
      ['Customer support', 'In English by email', 'In Chinese only'],
    ],
    process: [
      'Define your product, budget, and quantity on WhatsApp.',
      'We search for the same product on Alibaba AND 1688 to compare.',
      'You receive a comparison of price, quality, timeline, and risk.',
      'You choose the best option, we verify the supplier.',
      'We pay, inspect, and ship to your African country.',
    ],
    faqs: [
      {
        question: 'Is 1688 really 50% cheaper than Alibaba?',
        answer: 'Yes, for many standard products (textiles, accessories, electronics, toys), 1688 shows prices 30-50% lower than Alibaba. This is because 1688 targets the Chinese domestic market, without export markups, international marketing costs, and intermediary commissions.',
      },
      {
        question: 'Can I buy on 1688 from Mali without an agent?',
        answer: 'Theoretically not practical: the site is in Chinese, payment requires Alipay or Chinese bank account, and there is no international protection. Without a local agent in China, you expose your money to a very high scam risk.',
      },
      {
        question: 'How does ChinaLink buy on 1688 for me?',
        answer: 'Our bilingual team based in Yiwu navigates 1688, identifies reliable suppliers, negotiates in Mandarin, pays via our Chinese Alipay account, inspects quality on-site, and ships to Africa. You benefit from 1688 prices with the security of a local agent.',
      },
      {
        question: 'What products are better on 1688?',
        answer: 'Standard and non-complex products are ideal on 1688: textiles, fashion accessories, homeware, toys, small electronics, tools. For complex technical products (machinery, medical, advanced electronics), Alibaba remains safer.',
      },
      {
        question: 'What is the agent cost for buying on 1688?',
        answer: 'Our fees for buying on 1688 start at $80 per order (search + negotiation + payment). Quality inspection is $100. These fees are quickly offset by 30-50% savings on 1688 prices.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'Complete China sourcing agent' },
      { href: '/en/services/achat-alibaba-mali', label: 'Buy on Alibaba from Mali' },
      { href: '/en/guides/acheter-sur-1688-depuis-le-mali', label: 'Complete guide to buying on 1688' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Supplier verification' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Alibaba vs 1688 for African Importers | Which is Better? | ChinaLink'
      : 'Alibaba vs 1688 pour Importateurs Africains | Lequel Choisir? | ChinaLink',
    description: isEn
      ? 'Alibaba (international, English, higher prices) vs 1688 (Chinese-only, factory direct, 30-50% cheaper). Which platform should African importers use? Complete guide with pros, cons, and our recommendation. WhatsApp: +86 188 5172 5957'
      : 'Alibaba (international, anglais, prix plus élevés) vs 1688 (chinois uniquement, direct usine, 30-50% moins cher). Quelle plateforme pour les importateurs africains ? Guide complet avec avantages et inconvénients. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'Alibaba vs 1688 for Africa, difference Alibaba 1688, buy from 1688 Africa, 1688 sourcing agent, Alibaba agent Africa, cheaper than Alibaba, Chinese factory direct, 1688 vs Alibaba price comparison, freight forwarder China Mali'
      : 'Alibaba vs 1688 pour Afrique, différence Alibaba 1688, acheter sur 1688 Afrique, agent sourcing 1688, agent Alibaba Afrique, moins cher qu Alibaba, direct usine chinoise, comparaison prix 1688 Alibaba, cargo chine mali, transitaire chine mali',
    path: '/guides/alibaba-vs-1688-pour-afrique',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function AlibabaVs1688Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const howToSteps = [
    { name: 'Définir votre besoin', text: 'Identifiez le produit, la quantité et votre budget avant de choisir une plateforme.' },
    { name: 'Comparer les deux plateformes', text: 'Recherchez le même produit sur Alibaba et 1688 pour comparer prix et conditions.' },
    { name: 'Vérifier le fournisseur', text: 'Audit de la licence, historique et avis clients avant tout paiement.' },
    { name: 'Choisir le mode de paiement', text: 'Alipay pour 1688, Trade Assurance pour Alibaba, ou agent local pour sécuriser.' },
    { name: 'Inspecter et expédier', text: 'Contrôle qualité sur place, consolidation et fret vers l\'Afrique.' },
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Guides' : 'Guides', url: `/${locale}/guides` },
      { name: isEn ? 'Alibaba vs 1688' : 'Alibaba vs 1688', url: `/${locale}/guides/alibaba-vs-1688-pour-afrique` },
    ], locale as Locale),
    generateFAQPageSchema([...page.faqs], locale as Locale),
    generateHowToSchema(
      isEn ? 'How to Choose Between Alibaba and 1688 for African Importing' : 'Comment choisir entre Alibaba et 1688 pour importer en Afrique',
      isEn ? 'Step-by-step guide to select the right Chinese platform for your business' : 'Guide étape par étape pour choisir la bonne plateforme chinoise pour votre business',
      howToSteps,
      locale as Locale
    ),
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

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    badge: 'Import Cosmétiques Chine',
    title: 'Importer des cosmétiques et produits beauté de Chine',
    intro: 'Vous souhaitez importer des cosmétiques, produits de soin, produits capillaires ou matériel esthétique de Chine vers le Mali et l\'Afrique de l\'Ouest ? ChinaLink Express est votre agent sourcing spécialisé beauté basé à Guangzhou, le centre cosmétique de la Chine. Nous sourçons depuis les usines certifiées ISO et les marchés de gros de Baiyun, avec contrôle qualité, étiquetage conforme et expédition sécurisée.',
    highlights: [
      'Sourcing cosmétiques depuis Guangzhou Baiyun et usines certifiées ISO',
      'Soins visage, cheveux, maquillage, parfums et matériel esthétique',
      'Vérification certification et contrôle qualité produit',
      'Étiquetage conforme pour importation Afrique de l\'Ouest',
      'Fret aérien et maritime avec emballage sécurisé',
    ],
    sections: [
      {
        title: 'Quels cosmétiques importer de Chine ?',
        body: 'Guangzhou est le plus grand centre de production cosmétique de Chine. Nous sourçons tous types de produits beauté adaptés au marché africain, avec formulation et packaging personnalisables.',
        items: [
          'Soins visage : crèmes, sérums, masques, lotions',
          'Produits capillaires : shampoings, conditioners, huiles, traitements',
          'Maquillage : fonds de teint, rouges à lèvres, mascaras, palettes',
          'Parfums et eaux de toilette (reproductions de grandes marques autorisées)',
          'Matériel esthétique : appareils soin, brosses, accessoires salon',
          'Savons artisanaux et produits naturels',
        ],
      },
      {
        title: 'Certification et conformité des cosmétiques',
        body: 'L\'importation de cosmétiques nécessite des précautions réglementaires. Nous sélectionnons des usines avec certification ISO, GMP et vérifions la conformité des ingrédients pour le marché africain.',
        items: [
          'Usines certifiées ISO 22716 (GMP cosmétique)',
          'Vérification ingrédients et formules conformes normes OAPI',
          'Étiquetage en français avec composition INCI',
          'Tests dermatologiques et stabilité produit',
          'Documentation pour dédouanement produits cosmétiques au Mali',
        ],
      },
      {
        title: 'Packaging personnalisé et marque blanche',
        body: 'De nombreuses usines chinoises proposent du packaging personnalisé et de la marque blanche (private label). Nous pouvons développer votre propre ligne de cosmétiques avec votre logo et votre design.',
        items: [
          'Création de marque blanche avec votre logo et packaging',
          'Formulations personnalisées pour peaux africaines',
          'Design flacons, pots et étiquettes sur mesure',
          'Production à partir de 500 unités selon le produit',
          'Conseil réglementaire pour l\'enregistrement de marque en Afrique',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver usine cosmétique', 'Fournisseurs non certifiés', 'Usines ISO/GMP vérifiées Guangzhou'],
      ['Qualité produit', 'Produits non testés, risques santé', 'Contrôle qualité + tests stabilité'],
      ['Étiquetage conforme', 'Étiquettes incompliantes rejetées', 'Étiquetage français conforme OAPI'],
      ['Marque blanche', 'Impossible seul', 'Développement packaging + logo inclus'],
      ['Expédition sécurisée', 'Fuites et casses fréquentes', 'Emballage double + protection thermique'],
    ],
    process: [
      'Décrivez vos besoins cosmétiques (type, quantité, budget) sur WhatsApp.',
      'Nous recherchons 3-5 usines certifiées et comparons formulations.',
      'Vous validez après réception des échantillons et certifications.',
      'Nous supervisons la production, contrôlons qualité et étiquetage.',
      'Expédition sécurisée + dédouanement cosmétique + livraison.',
    ],
    faqs: [
      {
        question: 'Les cosmétiques chinois sont-ils autorisés au Mali ?',
        answer: 'Oui, avec une documentation adéquate : facture détaillée, liste des ingrédients, et certification de l\'usine. Nous préparons tous les documents nécessaires pour le dédouanement des produits cosmétiques à Bamako.',
      },
      {
        question: 'Puis-je créer ma propre marque de cosmétiques ?',
        answer: 'Oui, nous travaillons avec des usines proposant du private label à partir de 500-1000 unités selon le produit. Nous gérons le design du packaging, le logo, et la formulation adaptée au marché africain.',
      },
      {
        question: 'Quelle certification faut-il pour importer des cosmétiques ?',
        answer: 'Nous recommandons des usines certifiées ISO 22716 (GMP cosmétique). Pour certains produits, des tests dermatologiques sont nécessaires. Nous vérifions la conformité des ingrédients avec les réglementations africaines.',
      },
      {
        question: 'Quel délai pour produire des cosmétiques sur mesure ?',
        answer: 'La production standard prend 15-25 jours. Pour du private label avec packaging personnalisé, comptez 30-45 jours. Le fret aérien ajoute 14-21 jours, le maritime 60-75 jours.',
      },
      {
        question: 'Proposez-vous des formulations pour peaux africaines ?',
        answer: 'Oui, nous collaborons avec des laboratoires chinois spécialisés dans les formulations adaptées aux peaux noires et métisses : beurre de karité, huile de ricin, huiles nourrissantes intenses, et protection UV élevée.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/air-freight', label: 'Fret aérien cosmétiques' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification usine' },
      { href: '/fr/calculateur', label: 'Devis import cosmétiques' },
    ],
  },
  en: {
    badge: 'Import Cosmetics China',
    title: 'Import Cosmetics and Beauty Products from China',
    intro: 'Want to import cosmetics, skincare, hair products, or beauty equipment from China to Mali and West Africa? ChinaLink Express is your specialized beauty sourcing agent based in Guangzhou, China\'s cosmetics capital. We source from ISO-certified factories and Baiyun wholesale markets, with quality control, compliant labeling, and secure shipping.',
    highlights: [
      'Cosmetics sourcing from Guangzhou Baiyun and ISO-certified factories',
      'Face care, hair care, makeup, perfumes, and beauty equipment',
      'Certification verification and product quality control',
      'Compliant labeling for West Africa importation',
      'Air and sea freight with secure packaging',
    ],
    sections: [
      {
        title: 'What cosmetics can you import from China?',
        body: 'Guangzhou is China\'s largest cosmetics production center. We source all types of beauty products adapted to the African market, with customizable formulations and packaging.',
        items: [
          'Face care: creams, serums, masks, lotions',
          'Hair products: shampoos, conditioners, oils, treatments',
          'Makeup: foundations, lipsticks, mascaras, palettes',
          'Perfumes and eaux de toilette (authorized brand reproductions)',
          'Beauty equipment: skincare devices, brushes, salon accessories',
          'Artisanal soaps and natural products',
        ],
      },
      {
        title: 'Certification and compliance of cosmetics',
        body: 'Importing cosmetics requires regulatory precautions. We select factories with ISO, GMP certification and verify ingredient compliance for the African market.',
        items: [
          'ISO 22716 certified factories (cosmetic GMP)',
          'Ingredient and formula verification compliant with OAPI standards',
          'French labeling with INCI composition',
          'Dermatological and product stability tests',
          'Documentation for cosmetic customs clearance in Mali',
        ],
      },
      {
        title: 'Custom packaging and white label',
        body: 'Many Chinese factories offer custom packaging and white label (private label). We can develop your own cosmetics line with your logo and design.',
        items: [
          'White label creation with your logo and packaging',
          'Custom formulations for African skin',
          'Custom bottle, jar, and label design',
          'Production from 500 units depending on product',
          'Regulatory advice for trademark registration in Africa',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find cosmetic factory', 'Uncertified suppliers', 'Verified ISO/GMP factories in Guangzhou'],
      ['Product quality', 'Untested products, health risks', 'Quality control + stability tests'],
      ['Compliant labeling', 'Non-compliant labels rejected', 'French labeling OAPI compliant'],
      ['White label', 'Impossible alone', 'Packaging + logo development included'],
      ['Secure shipping', 'Frequent leaks and breakage', 'Double packaging + thermal protection'],
    ],
    process: [
      'Describe your cosmetic needs (type, quantity, budget) on WhatsApp.',
      'We research 3-5 certified factories and compare formulations.',
      'You validate after receiving samples and certifications.',
      'We supervise production, control quality and labeling.',
      'Secure shipping + cosmetic customs clearance + delivery.',
    ],
    faqs: [
      {
        question: 'Are Chinese cosmetics allowed in Mali?',
        answer: 'Yes, with adequate documentation: detailed invoice, ingredient list, and factory certification. We prepare all necessary documents for customs clearance of cosmetic products in Bamako.',
      },
      {
        question: 'Can I create my own cosmetics brand?',
        answer: 'Yes, we work with factories offering private label from 500-1000 units depending on the product. We manage packaging design, logo, and formulation adapted to the African market.',
      },
      {
        question: 'What certification is needed to import cosmetics?',
        answer: 'We recommend ISO 22716 certified factories (cosmetic GMP). For some products, dermatological tests are required. We verify ingredient compliance with African regulations.',
      },
      {
        question: 'What is the timeline for custom cosmetics production?',
        answer: 'Standard production takes 15-25 days. For private label with custom packaging, allow 30-45 days. Air freight adds 14-21 days, sea freight 60-75 days.',
      },
      {
        question: 'Do you offer formulations for African skin?',
        answer: 'Yes, we collaborate with Chinese laboratories specialized in formulations adapted to black and mixed skin: shea butter, castor oil, intense nourishing oils, and high UV protection.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/air-freight', label: 'Air freight cosmetics' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Factory verification' },
      { href: '/en/calculateur', label: 'Cosmetics import quote' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Import Cosmetics from China to Africa | Beauty Products Wholesale | ChinaLink'
      : 'Importer Cosmétiques Chine Afrique | Produits Beauté Gros | ChinaLink',
    description: isEn
      ? 'Import beauty products, skincare, hair products & cosmetics from China to Africa. Guangzhou cosmetics market sourcing with FDA-compliant labeling. Air & sea freight available. WhatsApp: +86 188 5172 5957'
      : 'Importez produits beauté, soins visage, cheveux et cosmétiques de Chine vers l\'Afrique. Sourcing marché cosmétiques Guangzhou avec étiquetage conforme. Fret aérien et maritime disponible. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import cosmetics from China, wholesale beauty products China, buy skincare from China, cosmetics sourcing agent, Guangzhou cosmetics market, import hair products China Africa, beauty supplier China, cosmetics wholesale Africa, private label cosmetics China, freight forwarder China Mali'
      : 'importer cosmétiques Chine, gros produits beauté Chine, acheter soins visage Chine, agent sourcing cosmétiques, marché cosmétiques Guangzhou, importer produits cheveux Chine Afrique, fournisseur beauté Chine, marque blanche cosmétiques Chine, cargo chine mali, transitaire chine mali',
    path: '/industries/cosmetiques-chine-afrique',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function CosmeticsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Industries' : 'Industries', url: `/${locale}/industries` },
      { name: isEn ? 'Cosmetics China Africa' : 'Cosmétiques Chine Afrique', url: `/${locale}/industries/cosmetiques-chine-afrique` },
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

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
    badge: 'Import Électronique Chine',
    title: 'Importer de l\'électronique de Chine vers l\'Afrique',
    intro: 'Vous souhaitez importer des téléphones, ordinateurs, accessoires électroniques ou gadgets de Chine vers le Mali, le Sénégal ou l\'Afrique de l\'Ouest ? ChinaLink Express est votre agent sourcing spécialisé électronique basé à Shenzhen, la capitale mondiale de la tech. Nous sourçons directement depuis le marché électronique de Huaqiangbei, vérifions la qualité et les spécifications techniques, et expédions avec emballage anti-choc et assurance.',
    highlights: [
      'Sourcing direct depuis Shenzhen Huaqiangbei et marchés tech',
      'Téléphones, ordinateurs, accessoires, gadgets et composants',
      'Vérification technique : fonctionnalité, batterie, écran, connectique',
      'Garantie et support technique inclus sur certains produits',
      'Fret aérien sécurisé 14-21 jours ou conteneur maritime 60-75 jours',
    ],
    sections: [
      {
        title: 'Quels produits électroniques importer de Chine ?',
        body: 'Shenzhen est le plus grand marché électronique du monde. Nous sourçons tous types de produits tech pour le marché africain, avec une attention particulière aux spécifications compatibles (tension, langue, réseau).',
        items: [
          'Smartphones et téléphones mobiles (Android, feature phones)',
          'Ordinateurs portables, tablettes et accessoires informatiques',
          'Accessoires téléphone : coques, écouteurs, chargeurs, câbles',
          'Électronique grand public : enceintes, montres connectées, drones',
          'Composants électroniques et pièces de rechange',
          'Appareils électroménagers et équipements solaires',
        ],
      },
      {
        title: 'Pourquoi Shenzhen pour l\'électronique ?',
        body: 'Shenzhen concentre 90% de la production électronique mondiale. Notre bureau local nous donne un accès direct aux usines, aux nouveautés et aux meilleurs prix. Nous connaissons les fournisseurs fiables et les produits adaptés au marché africain.',
        items: [
          'Marché Huaqiangbei : le plus grand marché électronique au monde',
          'Accès direct aux usines de fabrication de téléphones et accessoires',
          'Connaissance des spécifications réseau et tension pour l\'Afrique',
          'Tests fonctionnels sur place avant expédition',
          'Emballage renforcé anti-choc pour le transport aérien et maritime',
        ],
      },
      {
        title: 'Sécurité et conformité des produits électroniques',
        body: 'L\'importation d\'électronique nécessite des précautions particulières : batteries lithium-ion réglementées, certification CE pour certains appareils, et vérification de la compatibilité réseau. Nous gérons ces contraintes pour vous.',
        items: [
          'Vérification compatibilité réseau 2G/3G/4G pour votre pays',
          'Tests batteries lithium-ion et certification de transport',
          'Contrôle qualité fonctionnel : écran, tactile, caméra, connectique',
          'Emballage spécialisé pour produits fragiles et électroniques',
          'Conseil sur les produits interdits ou réglementés au Mali',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver fournisseur tech', 'Risque de copies et contrefaçons', 'Fournisseurs vérifiés à Shenzhen'],
      ['Vérifier qualité électronique', 'Produits défectueux à la réception', 'Tests fonctionnels complets sur place'],
      ['Compatibilité Afrique', 'Téléphones incompatibles réseau', 'Vérification 2G/3G/4G et tension'],
      ['Expédition sécurisée', 'Batteries lithium refusées', 'Emballage certifié + documents IATA'],
      ['Garantie produit', 'Aucun recours possible', 'Support technique et garantie sélectionnée'],
    ],
    process: [
      'Décrivez vos besoins électroniques (modèle, quantité, budget) sur WhatsApp.',
      'Nous sourçons 3-5 fournisseurs qualifiés à Shenzhen et comparons.',
      'Vous validez après réception des spécifications techniques et photos.',
      'Nous testons la fonctionnalité, emballons sécurisé et payons.',
      'Expédition fret aérien ou maritime + dédouanement + livraison.',
    ],
    faqs: [
      {
        question: 'Puis-je importer des téléphones chinois au Mali ?',
        answer: 'Oui, mais il faut vérifier la compatibilité réseau 2G/3G/4G avec les opérateurs maliens. Nous testons chaque modèle et recommandons les téléphones adaptés au marché malien.',
      },
      {
        question: 'Les batteries lithium sont-elles autorisées en fret aérien ?',
        answer: 'Oui, avec des conditions précises : emballage spécialisé, déclaration IATA, et quantités limitées par colis. Nous gérons toute la documentation pour un transport sécurisé.',
      },
      {
        question: 'Quelle garantie sur les produits électroniques importés ?',
        answer: 'Nous sélectionnons des fournisseurs offrant une garantie fabricant de 6 à 12 mois. Nous testons chaque produit avant expédition et documentons les numéros de série pour tout suivi.',
      },
      {
        question: 'Puis-je importer des copies de marques connues ?',
        answer: 'Non, nous ne sourçons pas de contrefaçons. Nous proposons des marques chinoises originales de qualité (Xiaomi, Tecno, Infinix, Oppo) ou des produits sans marque avec spécifications équivalentes.',
      },
      {
        question: 'Quel délai pour recevoir de l\'électronique de Chine ?',
        answer: 'Le fret aérien électronique livre en 14-21 jours à Bamako. Le conteneur maritime prend 60-75 jours. Les batteries lithium peuvent allonger le délai aérien de 2-3 jours pour la documentation.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/air-freight', label: 'Fret aérien sécurisé' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification fournisseur' },
      { href: '/fr/calculateur', label: 'Calculer coût fret électronique' },
    ],
  },
  en: {
    badge: 'Import Electronics China',
    title: 'Import Electronics from China to Africa',
    intro: 'Want to import phones, computers, electronic accessories, or gadgets from China to Mali, Senegal, or West Africa? ChinaLink Express is your specialized electronics sourcing agent based in Shenzhen, the world tech capital. We source directly from Huaqiangbei electronic market, verify quality and technical specifications, and ship with anti-shock packaging and insurance.',
    highlights: [
      'Direct sourcing from Shenzhen Huaqiangbei and tech markets',
      'Phones, computers, accessories, gadgets, and components',
      'Technical verification: functionality, battery, screen, connectivity',
      'Warranty and technical support included on selected products',
      'Secure air freight 14-21 days or sea container 60-75 days',
    ],
    sections: [
      {
        title: 'What electronics can you import from China?',
        body: 'Shenzhen is the world\'s largest electronics market. We source all types of tech products for the African market, with particular attention to compatible specifications (voltage, language, network).',
        items: [
          'Smartphones and mobile phones (Android, feature phones)',
          'Laptops, tablets, and computer accessories',
          'Phone accessories: cases, earphones, chargers, cables',
          'Consumer electronics: speakers, smartwatches, drones',
          'Electronic components and spare parts',
          'Home appliances and solar equipment',
        ],
      },
      {
        title: 'Why Shenzhen for electronics?',
        body: 'Shenzhen concentrates 90% of global electronics production. Our local office gives us direct access to factories, new products, and the best prices. We know reliable suppliers and products adapted to the African market.',
        items: [
          'Huaqiangbei Market: the world\'s largest electronics market',
          'Direct access to phone and accessory manufacturing factories',
          'Knowledge of network and voltage specifications for Africa',
          'Functional testing on-site before shipping',
          'Reinforced anti-shock packaging for air and sea transport',
        ],
      },
      {
        title: 'Safety and compliance of electronic products',
        body: 'Importing electronics requires special precautions: regulated lithium-ion batteries, CE certification for certain devices, and network compatibility verification. We manage these constraints for you.',
        items: [
          'Network 2G/3G/4G compatibility verification for your country',
          'Lithium-ion battery testing and transport certification',
          'Functional quality control: screen, touch, camera, connectivity',
          'Specialized packaging for fragile and electronic products',
          'Advice on prohibited or regulated products in Mali',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find tech supplier', 'Risk of copies and counterfeits', 'Verified suppliers in Shenzhen'],
      ['Verify electronics quality', 'Defective products on receipt', 'Complete functional testing on-site'],
      ['Africa compatibility', 'Incompatible network phones', '2G/3G/4G and voltage verification'],
      ['Secure shipping', 'Lithium batteries refused', 'Certified packaging + IATA documents'],
      ['Product warranty', 'No recourse possible', 'Technical support and selected warranty'],
    ],
    process: [
      'Describe your electronic needs (model, quantity, budget) on WhatsApp.',
      'We source 3-5 qualified suppliers in Shenzhen and compare.',
      'You validate after receiving technical specifications and photos.',
      'We test functionality, package securely, and pay.',
      'Air or sea freight shipping + customs clearance + delivery.',
    ],
    faqs: [
      {
        question: 'Can I import Chinese phones to Mali?',
        answer: 'Yes, but network 2G/3G/4G compatibility with Malian operators must be verified. We test each model and recommend phones adapted to the Malian market.',
      },
      {
        question: 'Are lithium batteries allowed in air freight?',
        answer: 'Yes, with specific conditions: specialized packaging, IATA declaration, and limited quantities per package. We manage all documentation for secure transport.',
      },
      {
        question: 'What warranty on imported electronic products?',
        answer: 'We select suppliers offering a 6-12 month manufacturer warranty. We test each product before shipping and document serial numbers for any follow-up.',
      },
      {
        question: 'Can I import copies of known brands?',
        answer: 'No, we do not source counterfeits. We offer original Chinese quality brands (Xiaomi, Tecno, Infinix, Oppo) or unbranded products with equivalent specifications.',
      },
      {
        question: 'What is the timeline to receive electronics from China?',
        answer: 'Air freight electronics delivers in 14-21 days to Bamako. Sea container takes 60-75 days. Lithium batteries may extend air freight by 2-3 days for documentation.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/air-freight', label: 'Secure air freight' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Supplier verification' },
      { href: '/en/calculateur', label: 'Calculate electronics freight cost' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Import Electronics from China to Africa | Phones, Laptops, Gadgets | ChinaLink'
      : 'Importer Électronique Chine Afrique | Téléphones, Ordinateurs | ChinaLink',
    description: isEn
      ? 'Import phones, laptops, accessories & electronics from China to Africa. Shenzhen sourcing agent with quality control and warranty support. Air freight 14-21 days to Bamako. WhatsApp: +86 188 5172 5957'
      : 'Importez téléphones, ordinateurs, accessoires et électronique de Chine vers l\'Afrique. Agent sourcing Shenzhen avec contrôle qualité et support garantie. Fret aérien 14-21 jours à Bamako. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import electronics from China, wholesale phones China, buy laptops from China, electronics sourcing agent, Shenzhen electronics market, import gadgets China Africa, phone supplier China, electronics wholesale Africa, import smartphones China Mali, Huaqiangbei agent, freight forwarder China Mali'
      : 'importer électronique Chine, gros téléphones Chine, acheter ordinateurs Chine, agent sourcing électronique, marché électronique Shenzhen, importer gadgets Chine Afrique, fournisseur téléphones Chine, cargo chine mali, transitaire chine mali, importer smartphones Chine Mali, agent Huaqiangbei',
    path: '/industries/electronique-chine-afrique',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function ElectronicsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Industries' : 'Industries', url: `/${locale}/industries` },
      { name: isEn ? 'Electronics China Africa' : 'Électronique Chine Afrique', url: `/${locale}/industries/electronique-chine-afrique` },
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

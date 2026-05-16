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
};

const content = {
  fr: {
    badge: 'Import Matériaux Construction',
    title: 'Importer des matériaux de construction de Chine vers l\'Afrique',
    intro: 'Vous êtes constructeur, promoteur immobilier ou négociant en matériaux de construction et vous cherchez à importer carreaux, sanitaire, quincaillerie, outils ou équipement BTP de Chine vers le Mali et l\'Afrique de l\'Ouest ? ChinaLink Express est votre partenaire spécialisé dans le sourcing de matériaux de construction depuis Foshan, la capitale mondiale de la céramique. Nous négocions les prix conteneur, vérifions la qualité des carreaux et sanitaire, et organisons le transport maritime FCL avec assurance et suivi complet.',
    highlights: [
      'Sourcing matériaux construction depuis Foshan et usines chinoises',
      'Carreaux céramique, sanitaire, robinetterie, quincaillerie et outils',
      'Négociation prix conteneur FCL 20ft/40ft avec économies 30-50%',
      'Contrôle qualité carreaux (épaisseur, planéité, couleur) avant chargement',
      'Conteneur maritime 60-75 jours + dédouanement + livraison chantier',
    ],
    sections: [
      {
        title: 'Quels matériaux de construction importer de Chine ?',
        body: 'La Chine est le premier producteur mondial de matériaux de construction. Nous sourçons directement depuis les usines de Foshan, Guangzhou et Shenzhen pour tous types de matériaux avec certification qualité.',
        items: [
          'Carreaux céramique : sol, mur, extérieur, imitation marbre et bois',
          'Sanitaire : lavabos, WC, baignoires, receveurs, robinetterie',
          'Quincaillerie bâtiment : charnières, serrures, rails, visserie',
          'Équipement BTP : échafaudages, bétonnières, compresseurs',
          'Tuyauterie et raccords PVC, PPR et métalliques',
          'Éclairage LED, câbles électriques et tableau électrique',
          'Portes, fenêtres aluminium et accessoires menuiserie',
        ],
      },
      {
        title: 'Foshan : la capitale mondiale des carreaux',
        body: 'Foshan produit 60% des carreaux céramiques mondiaux. Notre bureau partenaire nous donne un accès direct aux usines avec les meilleurs prix et la plus grande variété de modèles pour le marché africain.',
        items: [
          'Plus de 500 usines de carreaux dans la seule ville de Foshan',
          'Carreaux 30x30, 40x40, 60x60, 80x80 et grands formats',
          'Imitation marbre, imitation bois, aspect ciment, motifs africains',
          'Qualité premium (gros épaisseur) et qualité standard selon budget',
          'Possibilité de personnalisation couleur et motif à partir de 1000 m²',
        ],
      },
      {
        title: 'Transport conteneur pour matériaux de construction',
        body: 'Les matériaux de construction sont lourds, encombrants et fragiles. Le conteneur FCL est le mode de transport idéal avec un calage professionnel pour éviter les casses pendant le maritime.',
        items: [
          'Conteneur FCL 20ft : idéal pour 500-800 m² carreaux + sanitaire',
          'Conteneur FCL 40ft HC : jusqu\'à 2000 m² carreaux + matériel',
          'Calage professionnel avec bois, mousse et sangles',
          'Assurance tous risques pour matériaux de valeur',
          'Consolidation possible : carreaux + sanitaire + quincaillerie même conteneur',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Prix carreaux', 'Prix importation européenne/turque', 'Prix direct usine Foshan, -30 à 50%'],
      ['Qualité carreaux', 'Carreaux fins qui cassent', 'Contrôle épaisseur, planéité, résistance'],
      ['Variété modèles', 'Catalogue limité', 'Accès 500+ usines Foshan'],
      ['Sanitaire', 'Prix très élevés', 'Prix usine robinetterie et sanitaire'],
      ['Transport sécurisé', 'Casses fréquentes en conteneur', 'Calage pro + assurance tous risques'],
    ],
    process: [
      'Envoyez votre liste matériaux, quantités et budget sur WhatsApp.',
      'Nous recherchons les usines Foshan/Guangzhou et comparons les devis.',
      'Vous validez après réception des catalogues, échantillons photos et prix.',
      'Nous supervisons la production, contrôlons qualité et emballage.',
      'Chargement conteneur FCL + maritime + dédouanement + livraison chantier.',
    ],
    faqs: [
      {
        question: 'Quel est le prix d\'un conteneur de carreaux Chine-Mali ?',
        answer: 'Un conteneur FCL 20ft de carreaux (500-800 m²) coûte entre 3500 et 5000 USD fret inclus jusqu\'à Bamako. Les carreaux eux-mêmes coûtent 3-8 USD/m² selon la qualité et le format. Un conteneur 40ft HC (1500-2000 m²) est plus économique au m².',
      },
      {
        question: 'Les carreaux chinois résistent-ils au climat africain ?',
        answer: 'Oui, nous sélectionnons des carreaux avec épaisseur ≥ 9mm pour sol, absorption d\'eau < 0,5% pour extérieur, et résistance au gel. Les carreaux céramique pleine masse sont particulièrement adaptés aux climats chauds et humides d\'Afrique de l\'Ouest.',
      },
      {
        question: 'Puis-je mélanger carreaux, sanitaire et quincaillerie dans un conteneur ?',
        answer: 'Absolument, c\'est même recommandé pour optimiser le coût transport. Nous consolidons tous vos matériaux dans un seul conteneur avec calage séparé pour protéger les produits fragiles (sanitaire) des produits lourds (carreaux).',
      },
      {
        question: 'Proposez-vous du sanitaire aussi ?',
        answer: 'Oui, nous sourçons lavabos, WC, baignoires, receveurs de douche et robinetterie depuis les usines de Chaozhou et Foshan. La qualité est comparable aux marques européennes à 40-60% de prix moins cher.',
      },
      {
        question: 'Quel délai pour recevoir un conteneur matériaux construction ?',
        answer: 'La production carreaux prend 15-30 jours selon le modèle. Le fret maritime ajoute 60-75 jours jusqu\'à Bamako. Pour les produits en stock, l\'expédition peut être réalisée en 7-10 jours. Total : 75-105 jours en moyenne.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification usine' },
      { href: '/fr/calculateur', label: 'Devis conteneur matériaux' },
    ],
  },
  en: {
    badge: 'Import Building Materials',
    title: 'Import Building Materials from China to Africa',
    intro: 'Are you a builder, real estate developer, or building materials trader looking to import tiles, sanitary ware, hardware, tools, or construction equipment from China to Mali and West Africa? ChinaLink Express is your specialized partner for construction material sourcing from Foshan, the world capital of ceramics. We negotiate container prices, verify tile and sanitary quality, and organize FCL sea freight with insurance and complete tracking.',
    highlights: [
      'Construction materials sourcing from Foshan and Chinese factories',
      'Ceramic tiles, sanitary ware, faucets, hardware, and tools',
      'FCL 20ft/40ft container price negotiation with 30-50% savings',
      'Tile quality control (thickness, flatness, color) before loading',
      'Sea freight 60-75 days + customs clearance + site delivery',
    ],
    sections: [
      {
        title: 'What building materials can you import from China?',
        body: 'China is the world\'s largest producer of building materials. We source directly from factories in Foshan, Guangzhou, and Shenzhen for all types of materials with quality certification.',
        items: [
          'Ceramic tiles: floor, wall, outdoor, marble and wood imitation',
          'Sanitary ware: washbasins, toilets, bathtubs, shower trays, faucets',
          'Building hardware: hinges, locks, rails, screws',
          'Construction equipment: scaffolding, concrete mixers, compressors',
          'PVC, PPR, and metal piping and fittings',
          'LED lighting, electrical cables, and electrical panels',
          'Aluminum doors, windows, and carpentry accessories',
        ],
      },
      {
        title: 'Foshan: the world capital of tiles',
        body: 'Foshan produces 60% of the world\'s ceramic tiles. Our partner office gives us direct access to factories with the best prices and widest variety of models for the African market.',
        items: [
          'Over 500 tile factories in Foshan city alone',
          'Tiles 30x30, 40x40, 60x60, 80x80 and large formats',
          'Marble imitation, wood imitation, cement look, African patterns',
          'Premium quality (thick) and standard quality according to budget',
          'Customization of color and pattern from 1000 m²',
        ],
      },
      {
        title: 'Container transport for building materials',
        body: 'Construction materials are heavy, bulky, and fragile. FCL container is the ideal transport mode with professional blocking to avoid breakage during sea freight.',
        items: [
          'FCL 20ft container: ideal for 500-800 m² tiles + sanitary',
          'FCL 40ft HC: up to 2000 m² tiles + equipment',
          'Professional blocking with wood, foam, and straps',
          'All-risk insurance for valuable materials',
          'Possible consolidation: tiles + sanitary + hardware in same container',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Tile prices', 'European/Turkish import prices', 'Direct Foshan factory prices, -30 to 50%'],
      ['Tile quality', 'Thin tiles that break', 'Thickness, flatness, resistance control'],
      ['Model variety', 'Limited catalog', 'Access to 500+ Foshan factories'],
      ['Sanitary ware', 'Very high prices', 'Factory prices for faucets and sanitary'],
      ['Secure transport', 'Frequent breakage in container', 'Pro blocking + all-risk insurance'],
    ],
    process: [
      'Send your materials list, quantities, and budget on WhatsApp.',
      'We research Foshan/Guangzhou factories and compare quotes.',
      'You validate after receiving catalogs, sample photos, and prices.',
      'We supervise production, control quality and packaging.',
      'FCL container loading + sea freight + customs + site delivery.',
    ],
    faqs: [
      {
        question: 'What is the price of a tile container China-Mali?',
        answer: 'A 20ft FCL tile container (500-800 m²) costs between $3500 and $5000 freight included to Bamako. The tiles themselves cost $3-8/m² depending on quality and format. A 40ft HC container (1500-2000 m²) is more economical per m².',
      },
      {
        question: 'Do Chinese tiles resist the African climate?',
        answer: 'Yes, we select tiles with thickness ≥ 9mm for floors, water absorption < 0.5% for outdoors, and frost resistance. Full-body ceramic tiles are particularly suitable for the hot and humid climates of West Africa.',
      },
      {
        question: 'Can I mix tiles, sanitary ware, and hardware in one container?',
        answer: 'Absolutely, it is even recommended to optimize transport costs. We consolidate all your materials in one container with separate blocking to protect fragile products (sanitary) from heavy products (tiles).',
      },
      {
        question: 'Do you offer sanitary ware too?',
        answer: 'Yes, we source washbasins, toilets, bathtubs, shower trays, and faucets from factories in Chaozhou and Foshan. The quality is comparable to European brands at 40-60% cheaper prices.',
      },
      {
        question: 'What is the timeline to receive a construction materials container?',
        answer: 'Tile production takes 15-30 days depending on the model. Sea freight adds 60-75 days to Bamako. For stocked products, shipping can be done in 7-10 days. Total: 75-105 days on average.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/sea-freight', label: 'Sea freight container' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Factory verification' },
      { href: '/en/calculateur', label: 'Materials container quote' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Import Building Materials from China to Africa | Construction Supplies | ChinaLink'
      : 'Importer Matériaux Construction Chine Afrique | Fournitures Bâtiment | ChinaLink',
    description: isEn
      ? 'Import tiles, sanitary ware, hardware, tools & building materials from China to Africa. Foshan ceramics market sourcing. FCL container shipping at best rates. Quote in 24h! WhatsApp: +86 188 5172 5957'
      : 'Importez carreaux, sanitaire, quincaillerie, outils et matériaux construction de Chine vers l\'Afrique. Sourcing marché céramique Foshan. Expédition conteneur FCL aux meilleurs tarifs. Devis en 24h ! WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import building materials from China, wholesale tiles China, buy sanitary ware from China, construction materials sourcing agent, Foshan ceramics market, import hardware China Africa, building supplies supplier China, construction equipment China Africa, freight forwarder China Mali'
      : 'importer matériaux construction Chine, gros carreaux Chine, acheter sanitaire Chine, agent sourcing matériaux construction, marché céramique Foshan, importer quincaillerie Chine Afrique, fournisseur matériaux bâtiment Chine, équipement BTP Chine Afrique, cargo chine mali, transitaire chine mali',
    path: '/industries/materiaux-construction-chine-afrique',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function ConstructionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Industries' : 'Industries', url: `/${locale}/industries` },
      { name: isEn ? 'Building Materials China Africa' : 'Matériaux Construction Chine Afrique', url: `/${locale}/industries/materiaux-construction-chine-afrique` },
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

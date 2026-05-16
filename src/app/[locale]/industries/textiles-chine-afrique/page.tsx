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
    badge: 'Import Textiles Chine',
    title: 'Importer des textiles et vêtements de Chine vers l\'Afrique',
    intro: 'Vous cherchez à importer des textiles, tissus, vêtements ou accessoires de mode de Chine vers le Mali, le Sénégal ou l\'Afrique de l\'Ouest ? ChinaLink Express est votre partenaire spécialisé dans le sourcing textile depuis les marchés de gros de Guangzhou, Yiwu et Keqiao. Nous trouvons les meilleures usines textiles, négocions les prix au mètre ou en gros, contrôlons la qualité du tissu et expédions par conteneur FCL, groupage LCL ou fret aérien selon vos besoins.',
    highlights: [
      'Sourcing direct depuis les marchés textiles de Guangzhou et Keqiao',
      'Usines de vêtements, tissus, wax, dentelle et accessoires',
      'Négociation prix au mètre et en gros container',
      'Contrôle qualité tissu, couture et finitions avant expédition',
      'Fret maritime conteneur ou aérien express vers Bamako/Dakar',
    ],
    sections: [
      {
        title: 'Quels textiles pouvez-vous importer de Chine ?',
        body: 'La Chine est le premier producteur mondial de textiles. Que vous cherchiez des tissus wax africains, des dentelles, des vêtements prêt-à-porter, des tissus polyester, coton, soie ou des accessoires de mode, nous sourçons directement auprès des usines et marchés de gros chinois.',
        items: [
          'Tissus wax et imprimés africains (qualité supérieure à prix usine)',
          'Dentelles, broderies et tissus de cérémonie',
          'Vêtements prêt-à-porter femme, homme et enfant',
          'Tissus polyester, coton, soie, satin et voile',
          'Accessoires mode : sacs, chaussures, bijoux fantaisie',
          'Foulards, pagnes et tenues traditionnelles',
        ],
      },
      {
        title: 'Les marchés textiles chinois où nous sourçons',
        body: 'Notre bureau à Guangzhou et nos partenaires à Yiwu nous donnent un accès direct aux plus grands marchés textiles de Chine. Nous connaissons les meilleurs fournisseurs pour chaque type de produit.',
        items: [
          'Marché textile Guangzhou (Zhongda) : le plus grand marché de tissus d\'Asie',
          'Keqiao Textile Market : spécialiste des tissus en rouleau',
          'Yiwu Market : accessoires mode, bijoux et petites quantités',
          'Usines directes à Guangdong pour production sur mesure',
        ],
      },
      {
        title: 'Conteneur textile vs fret aérien : quel mode choisir ?',
        body: 'Le choix du transport dépend de votre volume, de votre budget et de l\'urgence. Pour les textiles, le conteneur maritime est le plus économique pour les gros volumes, tandis que le fret aérien convient aux échantillons et collections urgentes.',
        items: [
          'Conteneur FCL 20ft/40ft : idéal pour 5000-20000 pièces, 60-75 jours',
          'Groupage LCL : parfait pour 500-3000 pièces, tarif au CBM',
          'Fret aérien : pour échantillons, collections urgentes, 14-21 jours',
          'Consolidation textile : regroupez plusieurs fournisseurs dans un seul envoi',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver usine textile', 'Recherche sur internet sans garantie', 'Accès direct marchés Guangzhou/Keqiao'],
      ['Négocier prix tissu', 'Prix export élevés', 'Prix usine négociés en mandarin'],
      ['Vérifier qualité textile', 'Surprise à la réception', 'Inspection tissu, couture, couleur sur place'],
      ['Expédier conteneur textile', 'Chaque usine envoie séparément', 'Consolidation + conteneur optimisé'],
      ['Dédouanement Mali', 'Démarches complexes seul', 'Dédouanement inclus, livraison porte à porte'],
    ],
    process: [
      'Décrivez vos besoins textiles (type, quantité, budget) sur WhatsApp.',
      'Nous recherchons 3-5 usines ou grossistes sur les marchés chinois.',
      'Vous choisissez parmi les échantillons et devis négociés.',
      'Nous inspectons la qualité, payons l\'usine et consolidons.',
      'Expédition conteneur ou aérien + dédouanement + livraison au Mali.',
    ],
    faqs: [
      {
        question: 'Quel est le prix d\'un conteneur de vêtements Chine-Mali ?',
        answer: 'Un conteneur FCL 20ft de textiles coûte entre 3200 et 4500 USD selon la saison et le port de départ. Le groupage LCL est à environ 120 USD par CBM. Le fret aérien textile est entre 8 et 12 USD/kg. Demandez un devis précis sur WhatsApp.',
      },
      {
        question: 'Puis-je importer des wax africains de Chine ?',
        answer: 'Oui, de nombreuses usines chinoises produisent des tissus wax de qualité pour le marché africain. Nous sourçons directement auprès de ces usines à des prix bien inférieurs aux importations européennes.',
      },
      {
        question: 'Comment vérifier la qualité des tissus avant expédition ?',
        answer: 'Nous réalisons une inspection complète : vérification du tissu (composition, poids, toucher), contrôle des coutures et finitions, comparaison couleur avec échantillon, et photos détaillées avant validation de l\'expédition.',
      },
      {
        question: 'Quel délai pour recevoir un conteneur textile au Mali ?',
        answer: 'La production textile prend 15-45 jours selon la complexité. Le fret maritime ajoute 60-75 jours jusqu\'à Bamako. Le fret aérien textile est livré en 14-21 jours.',
      },
      {
        question: 'Livrez-vous dans d\'autres pays d\'Afrique de l\'Ouest ?',
        answer: 'Oui, nous livrons des textiles au Sénégal, Côte d\'Ivoire, Ghana, Nigeria, Burkina Faso, Niger, Bénin, Togo, Guinée et bien d\'autres pays africains.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
      { href: '/fr/services/air-freight', label: 'Fret aérien express' },
      { href: '/fr/calculateur', label: 'Calculer coût conteneur textile' },
    ],
  },
  en: {
    badge: 'Import Textiles China',
    title: 'Import Textiles and Clothing from China to Africa',
    intro: 'Looking to import textiles, fabrics, clothing, or fashion accessories from China to Mali, Senegal, or West Africa? ChinaLink Express is your specialized partner for textile sourcing from the wholesale markets of Guangzhou, Yiwu, and Keqiao. We find the best textile factories, negotiate meter and bulk prices, control fabric quality, and ship by FCL container, LCL consolidation, or air freight according to your needs.',
    highlights: [
      'Direct sourcing from Guangzhou and Keqiao textile markets',
      'Clothing factories, fabrics, wax, lace, and accessories',
      'Price negotiation per meter and bulk container rates',
      'Fabric, stitching, and finishing quality control before shipping',
      'Sea freight container or air express to Bamako/Dakar',
    ],
    sections: [
      {
        title: 'What textiles can you import from China?',
        body: 'China is the world\'s largest textile producer. Whether you\'re looking for African wax prints, lace, ready-to-wear clothing, polyester, cotton, silk fabrics, or fashion accessories, we source directly from Chinese factories and wholesale markets.',
        items: [
          'Wax prints and African fabrics (superior quality at factory prices)',
          'Lace, embroidery, and ceremony fabrics',
          'Ready-to-wear clothing for women, men, and children',
          'Polyester, cotton, silk, satin, and veil fabrics',
          'Fashion accessories: bags, shoes, costume jewelry',
          'Scarves, pagne, and traditional outfits',
        ],
      },
      {
        title: 'Chinese textile markets where we source',
        body: 'Our Guangzhou office and partners in Yiwu give us direct access to China\'s largest textile markets. We know the best suppliers for each product type.',
        items: [
          'Guangzhou Textile Market (Zhongda): Asia\'s largest fabric market',
          'Keqiao Textile Market: specialist in roll fabrics',
          'Yiwu Market: fashion accessories, jewelry, and small quantities',
          'Direct factories in Guangdong for custom production',
        ],
      },
      {
        title: 'Textile container vs air freight: which mode to choose?',
        body: 'The choice of transport depends on your volume, budget, and urgency. For textiles, sea freight container is the most economical for large volumes, while air freight suits samples and urgent collections.',
        items: [
          'FCL 20ft/40ft container: ideal for 5000-20000 pieces, 60-75 days',
          'LCL consolidation: perfect for 500-3000 pieces, per CBM rate',
          'Air freight: for samples, urgent collections, 14-21 days',
          'Textile consolidation: group multiple suppliers in one shipment',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find textile factory', 'Internet research without guarantee', 'Direct access to Guangzhou/Keqiao markets'],
      ['Negotiate fabric prices', 'High export prices', 'Factory prices negotiated in Mandarin'],
      ['Verify textile quality', 'Surprise on receipt', 'On-site fabric, stitching, color inspection'],
      ['Ship textile container', 'Each factory ships separately', 'Consolidation + optimized container'],
      ['Mali customs clearance', 'Complex procedures alone', 'Customs included, door-to-door delivery'],
    ],
    process: [
      'Describe your textile needs (type, quantity, budget) on WhatsApp.',
      'We research 3-5 factories or wholesalers in Chinese markets.',
      'You choose from negotiated samples and quotes.',
      'We inspect quality, pay the factory, and consolidate.',
      'Container or air shipping + customs clearance + delivery to Mali.',
    ],
    faqs: [
      {
        question: 'What is the price of a clothing container China-Mali?',
        answer: 'A 20ft FCL container of textiles costs between $3200 and $4500 depending on the season and departure port. LCL consolidation is about $120 per CBM. Textile air freight is between $8-12/kg. Request a precise quote on WhatsApp.',
      },
      {
        question: 'Can I import African wax prints from China?',
        answer: 'Yes, many Chinese factories produce quality wax fabrics for the African market. We source directly from these factories at prices well below European imports.',
      },
      {
        question: 'How to verify fabric quality before shipping?',
        answer: 'We conduct a complete inspection: fabric check (composition, weight, feel), stitching and finishing control, color comparison with sample, and detailed photos before validating shipment.',
      },
      {
        question: 'What is the timeline to receive a textile container in Mali?',
        answer: 'Textile production takes 15-45 days depending on complexity. Sea freight adds 60-75 days to Bamako. Textile air freight delivers in 14-21 days.',
      },
      {
        question: 'Do you deliver to other West African countries?',
        answer: 'Yes, we deliver textiles to Senegal, Ivory Coast, Ghana, Nigeria, Burkina Faso, Niger, Benin, Togo, Guinea, and many other African countries.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/sea-freight', label: 'Sea freight container' },
      { href: '/en/services/air-freight', label: 'Air freight express' },
      { href: '/en/calculateur', label: 'Calculate textile container cost' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Import Textiles from China to Africa | Clothing Wholesale Agent | ChinaLink'
      : 'Importer Textiles Chine Afrique | Grossiste Vêtements Chine | ChinaLink',
    description: isEn
      ? 'Import clothing, fabrics & textiles from China to Mali, Senegal & West Africa. Source from Guangzhou wholesale markets, inspect quality, ship by air or sea container. Best prices guaranteed! WhatsApp: +86 188 5172 5957'
      : 'Importez vêtements, tissus et textiles de Chine vers le Mali, Sénégal et Afrique de l\'Ouest. Sourcing marchés gros Guangzhou, inspection qualité, expédition air ou mer. Meilleurs tarifs garantis ! WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import textiles from China, wholesale clothing China, buy clothes from China, textile sourcing agent, import fabrics China Africa, garment factory China, wholesale fashion China, clothing supplier China, wax fabric China, lace fabric China, textile container shipping, freight forwarder China Mali'
      : 'importer textiles Chine, grossiste vêtements Chine, acheter vêtements Chine, agent sourcing textile, importer tissus Chine Afrique, usine vêtements Chine, grossiste mode Chine, fournisseur vêtements Chine, tissu wax Chine, dentelle Chine, conteneur textile, cargo chine mali, transitaire chine mali',
    path: '/industries/textiles-chine-afrique',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function TextilesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Industries' : 'Industries', url: `/${locale}/industries` },
      { name: isEn ? 'Textiles China Africa' : 'Textiles Chine Afrique', url: `/${locale}/industries/textiles-chine-afrique` },
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

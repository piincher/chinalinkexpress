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
    badge: 'Import Pièces Auto Chine',
    title: 'Importer des pièces auto et pièces détachées de Chine',
    intro: 'Vous cherchez à importer des pièces automobiles, pièces détachées camion, accessoires auto ou outillage garage de Chine vers le Mali et l\'Afrique de l\'Ouest ? ChinaLink Express est votre agent sourcing spécialisé automobile basé à Guangzhou, près du plus grand marché de pièces auto de Chine. Nous sourçons depuis les usines OEM et les grossistes de Guangzhou Canton Fair, avec vérification compatibilité modèle, contrôle qualité et expédition conteneur ou aérien.',
    highlights: [
      'Sourcing pièces auto depuis Guangzhou et usines OEM chinoises',
      'Pièces détachées camion, Toyota, Nissan, Hyundai et universelles',
      'Vérification compatibilité modèle et année avant commande',
      'Prix direct usine 40-60% moins cher que les importations européennes',
      'Conteneur FCL spécialisé ou fret aérien express pour pièces urgentes',
    ],
    sections: [
      {
        title: 'Quelles pièces auto importer de Chine ?',
        body: 'La Chine est le premier fabricant mondial de pièces automobiles. Nous sourçons tous types de pièces détachées pour le parc automobile africain, avec une attention particulière à la compatibilité modèle et à la qualité OEM.',
        items: [
          'Pièces moteur : pistons, segments, coussinets, joints, pompes',
          'Freinage : plaquettes, disques, tambours, maîtres-cylindres',
          'Suspension : amortisseurs, ressorts, rotules, triangles',
          'Électricité auto : alternateurs, démarreurs, batteries, bougies',
          'Carrosserie : pare-chocs, ailes, phares, rétroviseurs, portes',
          'Filtres : huile, air, carburant, habitacle pour tous modèles',
          'Pneus et jantes pour voitures, 4x4 et camions',
        ],
      },
      {
        title: 'Le marché des pièces auto de Guangzhou',
        body: 'Guangzhou concentre le plus grand marché de pièces automobiles d\'Asie. Notre bureau local nous donne un accès direct aux fournisseurs avec les meilleurs stocks et les meilleurs prix pour le marché africain.',
        items: [
          'Marché auto Guangzhou : plus de 10 000 grossistes sur 5 km²',
          'Spécialistes Toyota, Nissan, Hyundai, Mitsubishi pour Afrique',
          'Usines OEM produisant pour les grandes marques européennes',
          'Pièces de rechange chinoises pour camions Howo, Shacman, Foton',
          'Accessoires auto : GPS, audio, covering, tuning',
        ],
      },
      {
        title: 'Compatibilité et qualité des pièces auto chinoises',
        body: 'L\'importation de pièces auto nécessite une vérification rigoureuse de la compatibilité modèle et de la qualité. Nous contrôlons chaque référence pour éviter les erreurs coûteuses.',
        items: [
          'Vérification compatibilité par numéro OEM et modèle véhicule',
          'Contrôle qualité : matériau, finition, dimensions, marquages',
          'Distinction pièces OEM (origine constructeur) et pièces aftermarket',
          'Tests fonctionnels pour alternateurs, démarreurs, pompes',
          'Garantie fabricant de 6 à 12 mois sur pièces sélectionnées',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver pièce compatible', 'Erreurs fréquentes modèle/année', 'Vérification OEM et compatibilité'],
      ['Prix pièces auto', 'Prix européens majorés', 'Prix direct usine Chine, -40 à 60%'],
      ['Qualité pièces', 'Copies bas de gamme', 'Sélection OEM ou aftermarket qualité'],
      ['Stock pièces camion', 'Rupture fréquente', 'Accès direct stock Guangzhou'],
      ['Expédition pièces', 'Colis éparpillés', 'Consolidation conteneur auto optimisé'],
    ],
    process: [
      'Envoyez la référence pièce, modèle véhicule et année sur WhatsApp.',
      'Nous recherchons la pièce chez 3-4 fournisseurs Guangzhou.',
      'Vous validez après vérification compatibilité, photos et prix.',
      'Nous contrôlons la qualité, consolidons et emballons sécurisé.',
      'Expédition conteneur ou aérien + dédouanement + livraison garage.',
    ],
    faqs: [
      {
        question: 'Les pièces auto chinoises sont-elles de bonne qualité ?',
        answer: 'Oui, à condition de bien choisir. Nous distinguons les pièces OEM (même qualité que l\'origine) des pièces aftermarket bas de gamme. Nous sélectionnons des fournisseurs certifiés ISO avec garantie fabricant.',
      },
      {
        question: 'Puis-je importer des pièces pour Toyota Hilux ou Land Cruiser ?',
        answer: 'Absolument, ce sont les modèles les plus demandés en Afrique. Nous avons des fournisseurs spécialisés Toyota avec catalogue complet : freinage, suspension, moteur, carrosserie et accessoires.',
      },
      {
        question: 'Quel conteneur pour importer des pièces auto ?',
        answer: 'Un conteneur FCL 20ft contient environ 15-20 tonnes de pièces auto. Le groupage LCL est idéal pour 2-5 tonnes. Le fret aérien convient aux pièces urgentes (alternateurs, démarreurs) en 14-21 jours.',
      },
      {
        question: 'Proposez-vous des pièces pour camions chinois ?',
        answer: 'Oui, nous sourçons des pièces pour camions chinois très répandus en Afrique : Howo, Shacman, Foton, Dongfeng. Ces pièces sont 50-70% moins chères que les pièces européennes avec disponibilité immédiate.',
      },
      {
        question: 'Quel délai pour recevoir des pièces auto de Chine ?',
        answer: 'Le fret aérien livre en 14-21 jours. Le conteneur maritime prend 60-75 jours. Pour les pièces en stock à Guangzhou, l\'expédition aérienne peut être réalisée en 10-14 jours.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
      { href: '/fr/services/air-freight', label: 'Fret aérien pièces urgentes' },
      { href: '/fr/calculateur', label: 'Devis conteneur pièces auto' },
    ],
  },
  en: {
    badge: 'Import Auto Parts China',
    title: 'Import Car Parts and Auto Spare Parts from China',
    intro: 'Looking to import car parts, truck spare parts, auto accessories, or garage tools from China to Mali and West Africa? ChinaLink Express is your specialized automotive sourcing agent based in Guangzhou, near China\'s largest auto parts market. We source from OEM factories and Guangzhou Canton Fair wholesalers, with model compatibility verification, quality control, and container or air freight shipping.',
    highlights: [
      'Auto parts sourcing from Guangzhou and Chinese OEM factories',
      'Truck spare parts, Toyota, Nissan, Hyundai, and universal parts',
      'Model and year compatibility verification before ordering',
      'Direct factory prices 40-60% cheaper than European imports',
      'Specialized FCL container or air express for urgent parts',
    ],
    sections: [
      {
        title: 'What auto parts can you import from China?',
        body: 'China is the world\'s largest manufacturer of auto parts. We source all types of spare parts for the African vehicle fleet, with particular attention to model compatibility and OEM quality.',
        items: [
          'Engine parts: pistons, rings, bearings, gaskets, pumps',
          'Braking: pads, discs, drums, master cylinders',
          'Suspension: shock absorbers, springs, ball joints, control arms',
          'Auto electrical: alternators, starters, batteries, spark plugs',
          'Bodywork: bumpers, fenders, headlights, mirrors, doors',
          'Filters: oil, air, fuel, cabin for all models',
          'Tires and rims for cars, 4x4, and trucks',
        ],
      },
      {
        title: 'The Guangzhou auto parts market',
        body: 'Guangzhou concentrates Asia\'s largest auto parts market. Our local office gives us direct access to suppliers with the best stocks and prices for the African market.',
        items: [
          'Guangzhou Auto Market: over 10,000 wholesalers across 5 km²',
          'Toyota, Nissan, Hyundai, Mitsubishi specialists for Africa',
          'OEM factories producing for major European brands',
          'Chinese truck spare parts for Howo, Shacman, Foton',
          'Auto accessories: GPS, audio, wrapping, tuning',
        ],
      },
      {
        title: 'Compatibility and quality of Chinese auto parts',
        body: 'Importing auto parts requires rigorous verification of model compatibility and quality. We control each reference to avoid costly mistakes.',
        items: [
          'Compatibility verification by OEM number and vehicle model',
          'Quality control: material, finish, dimensions, markings',
          'Distinction between OEM parts (original manufacturer) and aftermarket',
          'Functional testing for alternators, starters, pumps',
          'Manufacturer warranty of 6-12 months on selected parts',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find compatible part', 'Frequent model/year errors', 'OEM verification and compatibility'],
      ['Auto parts prices', 'Marked-up European prices', 'Direct China factory prices, -40 to 60%'],
      ['Part quality', 'Low-quality copies', 'OEM or quality aftermarket selection'],
      ['Truck parts stock', 'Frequent stockouts', 'Direct access to Guangzhou stock'],
      ['Parts shipping', 'Scattered packages', 'Optimized auto container consolidation'],
    ],
    process: [
      'Send the part reference, vehicle model, and year on WhatsApp.',
      'We search for the part from 3-4 Guangzhou suppliers.',
      'You validate after compatibility check, photos, and price.',
      'We control quality, consolidate, and securely package.',
      'Container or air shipping + customs clearance + garage delivery.',
    ],
    faqs: [
      {
        question: 'Are Chinese auto parts good quality?',
        answer: 'Yes, if you choose well. We distinguish between OEM parts (same quality as original) and low-grade aftermarket parts. We select ISO-certified suppliers with manufacturer warranty.',
      },
      {
        question: 'Can I import parts for Toyota Hilux or Land Cruiser?',
        answer: 'Absolutely, these are the most requested models in Africa. We have specialized Toyota suppliers with complete catalog: braking, suspension, engine, bodywork, and accessories.',
      },
      {
        question: 'What container for importing auto parts?',
        answer: 'A 20ft FCL container holds approximately 15-20 tons of auto parts. LCL consolidation is ideal for 2-5 tons. Air freight suits urgent parts (alternators, starters) in 14-21 days.',
      },
      {
        question: 'Do you offer parts for Chinese trucks?',
        answer: 'Yes, we source parts for Chinese trucks very common in Africa: Howo, Shacman, Foton, Dongfeng. These parts are 50-70% cheaper than European parts with immediate availability.',
      },
      {
        question: 'What is the timeline to receive auto parts from China?',
        answer: 'Air freight delivers in 14-21 days. Sea container takes 60-75 days. For parts in stock in Guangzhou, air shipping can be done in 10-14 days.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/sea-freight', label: 'Sea freight container' },
      { href: '/en/services/air-freight', label: 'Air freight urgent parts' },
      { href: '/en/calculateur', label: 'Auto parts container quote' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Import Auto Parts from China to Africa | Car Spare Parts Wholesale | ChinaLink'
      : 'Importer Pièces Auto Chine Afrique | Gros Pièces Détachées | ChinaLink',
    description: isEn
      ? 'Import car parts, truck spare parts & auto accessories from China to Africa. Guangzhou auto parts market sourcing with quality guarantee. Container shipping for bulk orders. WhatsApp: +86 188 5172 5957'
      : 'Importez pièces auto, pièces détachées camion et accessoires de Chine vers l\'Afrique. Sourcing marché pièces auto Guangzhou avec garantie qualité. Expédition conteneur pour gros volumes. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import auto parts from China, wholesale car parts China, buy spare parts from China, auto parts sourcing agent, Guangzhou auto parts market, import truck parts China Africa, car accessories supplier China, auto parts wholesale Africa, Toyota parts China, truck spare parts China, freight forwarder China Mali'
      : 'importer pièces auto Chine, gros pièces auto Chine, acheter pièces détachées Chine, agent sourcing pièces auto, marché pièces auto Guangzhou, importer pièces camion Chine Afrique, pièces Toyota Chine, pièces camion chinois, cargo chine mali, transitaire chine mali',
    path: '/industries/pieces-auto-chine-afrique',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function AutoPartsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Industries' : 'Industries', url: `/${locale}/industries` },
      { name: isEn ? 'Auto Parts China Africa' : 'Pièces Auto Chine Afrique', url: `/${locale}/industries/pieces-auto-chine-afrique` },
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

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
    badge: 'Import Machines Chine',
    title: 'Importer des machines et équipements industriels de Chine',
    intro: 'Vous cherchez à importer des machines industrielles, équipements de construction, outils ou matériel agricole de Chine vers le Mali ou l\'Afrique de l\'Ouest ? ChinaLink Express est votre partenaire spécialisé dans le sourcing de machines lourdes depuis les usines chinoises. Nous trouvons les fabricants certifiés, négocions les prix conteneur, vérifions la conformité technique et organisons le transport FCL avec assurance cargo.',
    highlights: [
      'Sourcing machines industrielles, BTP et agriculture depuis les usines chinoises',
      'Négociation prix direct usine pour conteneur FCL 20ft et 40ft',
      'Vérification conformité technique et tests avant expédition',
      'Manutention, calage sécurisé et assurance conteneur',
      'Dédouanement industriel et livraison sur site au Mali',
    ],
    sections: [
      {
        title: 'Quelles machines importer de Chine ?',
        body: 'La Chine est le premier fabricant mondial de machines et équipements industriels. Nous sourçons directement auprès des usines avec certification CE et garantie fabricant pour tous types de matériel.',
        items: [
          'Machines de construction : mini-pelles, compacteurs, bétonnières, échafaudages',
          'Matériel agricole : motoculteurs, broyeurs, presses à huile, systèmes d\'irrigation',
          'Machines industrielles : presses, découpeuses, soudeuses, convoyeurs',
          'Générateurs électriques et groupes électrogènes',
          'Équipements de transformation alimentaire : moulins, embouteillage, séchage',
          'Outillage professionnel et équipements de garage',
        ],
      },
      {
        title: 'Transport de machines : conteneur FCL spécialisé',
        body: 'Les machines nécessitent un transport spécifique : calage dans le conteneur, protection contre l\'humidité, et parfois conteneur open-top ou flat-rack pour les surdimensions. Nous gérons toute la logistique lourde.',
        items: [
          'Conteneur FCL 20ft/40ft standard pour machines jusqu\'à 28 tonnes',
          'Conteneur Open-Top pour machines en hauteur',
          'Flat-Rack pour équipements surdimensionnés',
          'Calage professionnel avec bois et sangles dans le conteneur',
          'Protection anticorrosion et housse étanche pour le maritime',
          'Assurance cargo tous risques pour machines de valeur',
        ],
      },
      {
        title: 'Conformité et documents pour machines importées',
        body: 'L\'importation de machines nécessite des documents spécifiques : facture commerciale détaillée, certificat d\'origine, manuel technique, et parfois certification CE. Nous préparons l\'ensemble de la documentation douanière.',
        items: [
          'Facture commerciale avec détail technique des machines',
          'Certificat d\'origine Chine pour le dédouanement malien',
          'Manuel technique et schémas électriques en français si disponible',
          'Vérification tension électrique 220V/380V compatible Mali',
          'Conseil sur les normes OAPI et homologations nécessaires',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver usine machines', 'Intermédiaires coûteux', 'Direct usine certifiée en Chine'],
      ['Négocier prix conteneur', 'Prix majorés par intermédiaires', 'Négociation directe, économies 15-30%'],
      ['Vérifier conformité', 'Machines incompatibles 380V', 'Tests tension, puissance, sécurité sur place'],
      ['Transport sécurisé', 'Détérioration pendant transport', 'Calage pro + assurance tous risques'],
      ['Dédouanement machines', 'Démarches complexes et longues', 'Documentation complète + dédouanement clé en main'],
    ],
    process: [
      'Envoyez les spécifications techniques et budget machine sur WhatsApp.',
      'Nous recherchons 3 usines certifiées et comparons les offres techniques.',
      'Vous validez après réception du devis, photos et spécifications.',
      'Nous vérifions l\'usine, payons et supervisons l\'emballage conteneur.',
      'Expédition maritime FCL + dédouanement industriel + livraison sur chantier.',
    ],
    faqs: [
      {
        question: 'Quel conteneur pour importer des machines ?',
        answer: 'Pour la plupart des machines, un conteneur FCL 20ft (28 tonnes max) ou 40ft suffit. Pour les machines en hauteur, nous utilisons des conteneurs Open-Top. Pour les surdimensions, des Flat-Rack. Nous conseillons le meilleur format selon vos machines.',
      },
      {
        question: 'Les machines chinoises sont-elles compatibles électricité Mali ?',
        answer: 'Nous vérifions systématiquement la tension (220V/380V) et la fréquence (50Hz) pour compatibilité avec le réseau malien. Nous sélectionnons des machines avec certification CE et manuels en français quand disponible.',
      },
      {
        question: 'Quel est le coût d\'un conteneur machines Chine-Mali ?',
        answer: 'Un conteneur FCL 20ft machines coûte entre 3500 et 5000 USD selon le poids et le port de départ. Le tarif inclut le chargement, calage, maritime jusqu\'à Dakar, et transit terrestre vers Bamako. Demandez un devis précis.',
      },
      {
        question: 'Proposez-vous une garantie sur les machines importées ?',
        answer: 'Oui, nous sélectionnons des usines offrant une garantie fabricant de 12 à 24 mois. Nous documentons les numéros de série et coordonnons le support technique par vidéo si nécessaire.',
      },
      {
        question: 'Pouvez-vous former mes techniciens à l\'utilisation ?',
        answer: 'Pour les commandes importantes, nous pouvons organiser une formation vidéo avec le fabricant chinois. Pour certaines machines complexes, un technicien peut accompagner la livraison sur devis.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification usine' },
      { href: '/fr/calculateur', label: 'Devis conteneur machines' },
    ],
  },
  en: {
    badge: 'Import Machinery China',
    title: 'Import Industrial Machinery and Equipment from China',
    intro: 'Looking to import industrial machinery, construction equipment, tools, or agricultural machinery from China to Mali or West Africa? ChinaLink Express is your specialized partner for heavy machinery sourcing from Chinese factories. We find certified manufacturers, negotiate container prices, verify technical compliance, and organize FCL transport with cargo insurance.',
    highlights: [
      'Sourcing industrial, construction, and agricultural machinery from Chinese factories',
      'Direct factory price negotiation for FCL 20ft and 40ft containers',
      'Technical compliance verification and pre-shipment testing',
      'Professional handling, secure blocking, and container insurance',
      'Industrial customs clearance and on-site delivery in Mali',
    ],
    sections: [
      {
        title: 'What machinery can you import from China?',
        body: 'China is the world\'s largest manufacturer of machinery and industrial equipment. We source directly from factories with CE certification and manufacturer warranty for all types of equipment.',
        items: [
          'Construction machinery: mini-excavators, compactors, concrete mixers, scaffolding',
          'Agricultural equipment: tillers, grinders, oil presses, irrigation systems',
          'Industrial machines: presses, cutters, welders, conveyors',
          'Electric generators and generator sets',
          'Food processing equipment: mills, bottling, drying',
          'Professional tools and garage equipment',
        ],
      },
      {
        title: 'Machinery transport: specialized FCL container',
        body: 'Machinery requires specific transport: blocking in the container, moisture protection, and sometimes open-top or flat-rack containers for oversize loads. We manage all heavy logistics.',
        items: [
          'Standard FCL 20ft/40ft container for machines up to 28 tons',
          'Open-Top container for tall machinery',
          'Flat-Rack for oversize equipment',
          'Professional blocking with wood and straps in container',
          'Anti-corrosion protection and waterproof cover for sea freight',
          'All-risk cargo insurance for valuable machines',
        ],
      },
      {
        title: 'Compliance and documents for imported machinery',
        body: 'Importing machinery requires specific documents: detailed commercial invoice, certificate of origin, technical manual, and sometimes CE certification. We prepare all customs documentation.',
        items: [
          'Commercial invoice with machine technical details',
          'China certificate of origin for Malian customs',
          'Technical manual and electrical diagrams in French when available',
          'Electrical voltage 220V/380V verification for Mali compatibility',
          'Advice on OAPI standards and required approvals',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find machine factory', 'Expensive intermediaries', 'Direct certified factory in China'],
      ['Negotiate container price', 'Marked-up prices by intermediaries', 'Direct negotiation, 15-30% savings'],
      ['Verify compliance', 'Incompatible 380V machines', 'On-site voltage, power, safety tests'],
      ['Secure transport', 'Damage during transport', 'Pro blocking + all-risk insurance'],
      ['Machinery customs clearance', 'Complex and lengthy procedures', 'Complete documentation + turnkey customs'],
    ],
    process: [
      'Send machine technical specifications and budget on WhatsApp.',
      'We research 3 certified factories and compare technical offers.',
      'You validate after receiving quote, photos, and specifications.',
      'We verify the factory, pay, and supervise container packing.',
      'FCL sea shipping + industrial customs clearance + on-site delivery.',
    ],
    faqs: [
      {
        question: 'What container for importing machinery?',
        answer: 'For most machinery, a standard FCL 20ft (28 tons max) or 40ft container is sufficient. For tall machinery, we use Open-Top containers. For oversize loads, Flat-Rack containers. We advise the best format for your machines.',
      },
      {
        question: 'Are Chinese machines compatible with Mali electricity?',
        answer: 'We systematically verify voltage (220V/380V) and frequency (50Hz) for compatibility with the Malian grid. We select machines with CE certification and French manuals when available.',
      },
      {
        question: 'What is the cost of a machinery container China-Mali?',
        answer: 'A 20ft FCL machinery container costs between $3500 and $5000 depending on weight and departure port. The rate includes loading, blocking, sea freight to Dakar, and land transit to Bamako. Request a precise quote.',
      },
      {
        question: 'Do you offer warranty on imported machinery?',
        answer: 'Yes, we select factories offering a 12-24 month manufacturer warranty. We document serial numbers and coordinate video technical support if needed.',
      },
      {
        question: 'Can you train my technicians on usage?',
        answer: 'For large orders, we can organize video training with the Chinese manufacturer. For some complex machines, a technician can accompany delivery by quote.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/sea-freight', label: 'Sea freight container' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Factory verification' },
      { href: '/en/calculateur', label: 'Machinery container quote' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Import Machinery from China to Africa | Industrial Equipment | ChinaLink'
      : 'Importer Machines Chine Afrique | Équipement Industriel | ChinaLink',
    description: isEn
      ? 'Import industrial machinery, construction equipment & tools from China to Africa. FCL container shipping, factory direct pricing, installation support. Get your quote today! WhatsApp: +86 188 5172 5957'
      : 'Importez machines industrielles, équipement construction et outils de Chine vers l\'Afrique. Expédition conteneur FCL, prix direct usine, support installation. Devis gratuit ! WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import machinery from China, industrial equipment China, buy machines from China, machinery sourcing agent, factory equipment China Africa, construction machinery import, machine supplier China, heavy equipment shipping, agricultural machinery China Africa, freight forwarder China Mali'
      : 'importer machines Chine, équipement industriel Chine, acheter machines Chine, agent sourcing machines, équipement usine Chine Afrique, importer matériel construction, fournisseur machines Chine, matériel agricole Chine Afrique, cargo chine mali, transitaire chine mali',
    path: '/industries/machines-chine-afrique',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
  });
}

export default async function MachineryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const page = isEn ? content.en : content.fr;

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Industries' : 'Industries', url: `/${locale}/industries` },
      { name: isEn ? 'Machinery China Africa' : 'Machines Chine Afrique', url: `/${locale}/industries/machines-chine-afrique` },
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

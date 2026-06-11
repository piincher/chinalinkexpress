import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { PAGE_SEO } from '@/config/seo';
import { generateFAQPageSchema, generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { Breadcrumb } from '@/components/Breadcrumb';

interface Props {
  params: Promise<{ locale: string }>;
}

const faqsFr = [
  {
    question: 'Combien de temps prend une expédition de Chine vers le Mali ?',
    answer: 'Le fret aérien prend généralement 14 à 21 jours vers Bamako. Le fret maritime prend généralement 60 à 75 jours via un port d\u2019Afrique de l\u2019Ouest puis transport terrestre.',
  },
  {
    question: 'ChinaLink peut-il acheter auprès d\u2019un fournisseur chinois pour moi ?',
    answer: 'Oui. Nous pouvons gérer le sourcing, l\u2019achat, la négociation, le paiement fournisseur, la vérification et la consolidation avant expédition.',
  },
  {
    question: 'Comment payer un fournisseur chinois depuis le Mali ?',
    answer: 'Vous pouvez passer par ChinaLink pour faciliter le paiement via les canaux utilisés en Chine, selon le fournisseur et le niveau de vérification nécessaire.',
  },
  {
    question: 'Quels produits sont interdits ou sensibles ?',
    answer: 'Les batteries, liquides, produits dangereux, drones, armes, produits inflammables et certaines marchandises réglementées nécessitent une validation préalable ou sont interdits selon le mode de transport.',
  },
  {
    question: 'Le dédouanement au Mali est-il inclus ?',
    answer: 'L\u2019accompagnement au dédouanement standard est inclus dans les offres courantes, mais certains produits peuvent demander des documents, frais ou procédures supplémentaires.',
  },
  {
    question: 'Puis-je suivre mes colis ?',
    answer: 'Oui. ChinaLink communique les étapes importantes et peut partager des mises à jour WhatsApp, photos et informations de suivi selon le service choisi.',
  },
  {
    question: 'Quel est le délai d\u2019expédition cargo Chine Mali ?',
    answer: 'Le fret aérien prend 14 à 21 jours de la Chine vers Bamako. Le fret maritime prend 60 à 75 jours via les ports d\u2019Afrique de l\u2019Ouest. Le délai exact dépend du mode choisi, de la saison et des procédures douanières.',
  },
  {
    question: 'Combien coûte un conteneur de la Chine vers le Mali ?',
    answer: 'Un conteneur 20ft coûte entre 2 000 et 3 500 USD, et un 40ft entre 3 500 et 5 500 USD selon la saison, le port de départ et les frais de destination. Contactez-nous pour un devis précis.',
  },
  {
    question: 'Comment acheter sur Alibaba depuis le Mali ?',
    answer: 'Créez un compte Alibaba, choisissez vos produits, puis contactez ChinaLink pour la vérification du fournisseur, le paiement sécurisé et l\u2019expédition vers Bamako. Nous gérons toute la chaîne pour vous.',
  },
  {
    question: 'Quels documents faut-il pour importer au Mali ?',
    answer: 'Il faut une facture commerciale, un connaissement (BL), un certificat d\u2019origine, une déclaration en douane DGD, et parfois un certificat de conformité. Notre équipe vous aide à préparer les documents.',
  },
  {
    question: 'Puis-je suivre mon cargo en temps réel ?',
    answer: 'Oui. Nous fournissons un numéro de suivi pour tous les envois et partageons des mises à jour WhatsApp avec photos à chaque étape : entrepôt, emballage, douane et livraison.',
  },
  {
    question: 'Quels produits sont interdits à l\u2019importation au Mali ?',
    answer: 'Les armes, stupéfiants, produits contrefaits, matériels pornographiques et produits chimiques dangereux sans permis sont interdits. Contactez-nous pour vérifier si votre produit est autorisé.',
  },
  {
    question: 'Quelle est la différence entre FCL et LCL ?',
    answer: 'FCL (Full Container Load) = vous louez un conteneur entier. LCL (Less than Container Load) = votre marchandise partage un conteneur avec d\u2019autres clients. Le LCL est idéal pour les petits volumes.',
  },
  {
    question: 'Livrez-vous à domicile à Bamako ?',
    answer: 'Oui, nous proposons la livraison porte à porte à Bamako et dans d\u2019autres villes du Mali selon la destination finale et le mode de transport choisi.',
  },
  {
    question: 'Comment éviter les arnaques sur Alibaba ?',
    answer: 'Vérifiez l\u2019identité du fournisseur, demandez des preuves réelles, évitez les prix trop bas, utilisez un paiement traçable et faites appel à ChinaLink pour la vérification et le paiement sécurisé.',
  },
  {
    question: 'Pouvez-vous payer mon fournisseur chinois ?',
    answer: 'Oui. Nous facilitons le paiement de fournisseurs en Chine via Alipay ou virement bancaire, avec preuve de paiement et suivi de la commande.',
  },
  {
    question: 'Expédiez-vous vers d\u2019autres pays d\u2019Afrique ?',
    answer: 'Oui, nous desservons le Sénégal, la Côte d\u2019Ivoire, le Burkina Faso, le Nigeria, le Ghana, le Niger, le Bénin et le Togo.',
  },
  {
    question: 'Faites-vous l\u2019inspection qualité en Chine ?',
    answer: 'Oui, nous inspectons vos produits avant expédition et vous envoyons des photos. Cela évite les mauvaises surprises à l\u2019arrivée au Mali.',
  },
];

const faqsEn = [
  {
    question: 'How long does shipping from China to Mali take?',
    answer: 'Air freight usually takes 14 to 21 days to Bamako. Sea freight usually takes 60 to 75 days through a West African port followed by inland transport.',
  },
  {
    question: 'Can ChinaLink buy from a Chinese supplier for me?',
    answer: 'Yes. We can manage sourcing, purchasing, negotiation, supplier payment, verification and consolidation before shipping.',
  },
  {
    question: 'How can I pay a Chinese supplier from Africa?',
    answer: 'You can use ChinaLink to facilitate payment through China-side channels, depending on the supplier and the verification level required.',
  },
  {
    question: 'Which products are prohibited or sensitive?',
    answer: 'Batteries, liquids, dangerous goods, drones, weapons, flammable products and some regulated goods need validation before shipping or may be prohibited by mode.',
  },
  {
    question: 'Is customs coordination in Mali included?',
    answer: 'Standard customs coordination is included in current offers, but some products may require additional documents, fees or procedures.',
  },
  {
    question: 'Can I track my parcels?',
    answer: 'Yes. ChinaLink shares key milestones and can provide WhatsApp updates, photos and tracking information depending on the selected service.',
  },
  {
    question: 'What is the China to Mali cargo timeline?',
    answer: 'Air freight takes 14 to 21 days from China to Bamako. Sea freight takes 60 to 75 days through West African ports. Exact timing depends on mode, season and customs procedures.',
  },
  {
    question: 'How much does a container from China to Mali cost?',
    answer: 'A 20ft container often ranges from 2,000 to 3,500 USD, and a 40ft from 3,500 to 5,500 USD depending on season, departure port and destination charges. Contact us for a precise quote.',
  },
  {
    question: 'How do I buy on Alibaba from Mali or West Africa?',
    answer: 'Create an Alibaba account, choose your products, then contact ChinaLink for supplier verification, secure payment and shipping coordination. We can manage the full chain for you.',
  },
  {
    question: 'Which documents are needed for importing to Mali?',
    answer: 'You usually need a commercial invoice, bill of lading, certificate of origin, customs declaration and sometimes a certificate of conformity. Our team helps prepare the documents.',
  },
  {
    question: 'Can I track my cargo in real time?',
    answer: 'Yes. We provide tracking references where available and WhatsApp updates with photos at key stages such as warehouse receiving, packing, customs and delivery.',
  },
  {
    question: 'Which products are prohibited for Mali imports?',
    answer: 'Weapons, narcotics, counterfeit products, pornographic material and dangerous chemicals without authorization are prohibited. Contact us to verify your product category.',
  },
  {
    question: 'What is the difference between FCL and LCL?',
    answer: 'FCL means Full Container Load: you use the whole container. LCL means Less than Container Load: your goods share container space with other shipments. LCL is useful for smaller volumes.',
  },
  {
    question: 'Do you deliver to homes or businesses in Bamako?',
    answer: 'Yes, we offer door-to-door support in Bamako and other Malian cities depending on the final destination and transport mode.',
  },
  {
    question: 'How do I avoid Alibaba scams?',
    answer: 'Verify supplier identity, request real proof, avoid prices that look too low, use traceable payment and involve ChinaLink for supplier verification and secure payment support.',
  },
  {
    question: 'Can you pay my Chinese supplier?',
    answer: 'Yes. We can facilitate payment to Chinese suppliers through Alipay or bank transfer, with proof of payment and order follow-up.',
  },
  {
    question: 'Do you ship to other African countries?',
    answer: 'Yes. We support routes to Senegal, Ivory Coast, Burkina Faso, Nigeria, Ghana, Niger, Benin, Togo and other African destinations, with Mali as our strongest hub.',
  },
  {
    question: 'Do you inspect product quality in China?',
    answer: 'Yes. We inspect products before shipping and send photos so importers can avoid surprises before goods leave China.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const pageFaqs = isEn ? faqsEn : faqsFr;
  const seo = isEn ? PAGE_SEO.faq.en : PAGE_SEO.faq.fr;

  return generatePageMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: '/faq',
    locale: locale as Locale,
  });
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const pageFaqs = isEn ? faqsEn : faqsFr;

  const breadcrumbItems = [
    { label: isEn ? 'Home' : 'Accueil', href: `/${locale}/` },
    { label: 'FAQ' },
  ];

  return (
    <>
      <StructuredData schemas={[generateFAQPageSchema(pageFaqs, locale as Locale)]} />
      <main className="min-h-screen bg-white pt-28 text-slate-950 dark:bg-slate-950 dark:text-white">
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} locale={locale as Locale} />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
            {isEn ? 'China to Africa FAQ' : 'FAQ Chine-Mali'}
          </p>
          <h1 className="text-4xl font-black md:text-6xl">
            {isEn ? 'Frequently Asked Questions — China to Africa Cargo' : 'Questions Fréquentes — Cargo Chine Mali'}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
            {isEn
              ? 'Essential answers before sourcing, paying suppliers or shipping goods from China to Mali, West Africa and beyond.'
              : 'Les réponses essentielles avant de sourcer, payer un fournisseur ou expédier vos marchandises de Chine vers Bamako. Tout sur le cargo Chine Mali.'}
          </p>

          <div className="mt-10 space-y-4">
            {pageFaqs.map((faq) => (
              <section key={faq.question} className="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
                <h2 className="text-xl font-bold">{faq.question}</h2>
                <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-lg bg-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold">{isEn ? 'Have a specific case?' : 'Vous avez un cas précis ?'}</h2>
            <p className="mt-2 text-blue-50">
              {isEn
                ? 'Send your supplier links, weight, volume and destination to our team.'
                : 'Envoyez vos liens fournisseur, poids, volume et destination à notre équipe.'}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/8618851725957"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-5 py-3 text-center font-bold text-blue-700"
              >
                {isEn ? 'WhatsApp China team' : 'WhatsApp Chine'}
              </a>
              <Link href={`/${locale}/calculateur`} className="rounded-lg border border-white/30 px-5 py-3 text-center font-bold">
                {isEn ? 'Calculate freight' : 'Calculer un fret'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ar' },
  ];
}

export const dynamic = 'force-static';
export const revalidate = 3600;

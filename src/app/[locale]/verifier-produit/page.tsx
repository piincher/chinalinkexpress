import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQPageSchema, generateOrganizationSchema } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { ItemSearch, StatusLegend } from '@/features/dangerous-goods';

interface Props {
  params: Promise<{ locale: string }>;
}

const getFaqs = (isEn: boolean) => [
  {
    question: isEn
      ? 'Can I ship lithium batteries from China to Africa?'
      : 'Puis-je expédier des batteries lithium de Chine vers l\'Afrique ?',
    answer: isEn
      ? 'Yes, but with restrictions. Smartphones, laptops, and power banks can be shipped with proper declaration. The battery must remain inside the device, and capacity limits apply for air freight (max 20,000mAh for power banks). Large lithium batteries for electric vehicles or solar systems may require sea freight and MSDS documentation.'
      : 'Oui, mais avec des restrictions. Les smartphones, ordinateurs portables et batteries externes peuvent être expédiés avec une déclaration appropriée. La batterie doit rester à l\'intérieur de l\'appareil, et des limites de capacité s\'appliquent pour le fret aérien (max 20 000mAh pour les batteries externes). Les grandes batteries lithium pour véhicules électriques ou systèmes solaires peuvent nécessiter le fret maritime et une documentation MSDS.',
  },
  {
    question: isEn
      ? 'What happens if I try to ship a prohibited item?'
      : 'Que se passe-t-il si j\'essaie d\'expédier un article interdit ?',
    answer: isEn
      ? 'Prohibited items will be seized by customs at departure or arrival. You may face fines, and the shipping carrier may blacklist you. Common prohibited items include weapons, explosives, narcotics, pesticides, and cash. Always check our product verifier before ordering.'
      : 'Les articles interdits seront saisis par les douanes au départ ou à l\'arrivée. Vous risquez des amendes, et le transporteur peut vous mettre sur liste noire. Les articles interdits courants incluent les armes, explosifs, stupéfiants, pesticides et espèces. Vérifiez toujours notre vérificateur de produits avant de commander.',
  },
  {
    question: isEn
      ? 'Do cosmetics need special permits to import to Mali?'
      : 'Les cosmétiques nécessitent-ils des permis spéciaux pour importer au Mali ?',
    answer: isEn
      ? 'Most cosmetics (creams, makeup, shampoo) do not need permits. However, products with high alcohol content like perfumes and nail polish are classified as flammable liquids and have quantity restrictions. Hair dyes with ammonia may need a Safety Data Sheet. Always ensure cosmetics have proper ingredient labeling in French.'
      : 'La plupart des cosmétiques (crèmes, maquillage, shampooing) ne nécessitent pas de permis. Cependant, les produits avec forte teneur en alcool comme les parfums et vernis à ongles sont classés comme liquides inflammables et ont des restrictions de quantité. Les colorations avec ammoniac peuvent nécessiter une fiche de données de sécurité. Assurez-vous toujours que les cosmétiques ont un étiquetage des ingrédients en français.',
  },
  {
    question: isEn
      ? 'Can I ship food products like spices and canned goods?'
      : 'Puis-je expédier des produits alimentaires comme des épices et des conserves ?',
    answer: isEn
      ? 'Yes. Dried spices, canned foods, instant noodles, and cooking oil are generally allowed. Ensure commercial packaging with ingredient lists and best-before dates visible. Frozen and fresh foods are prohibited as we do not offer cold chain logistics. Baby formula and honey may require health ministry permits depending on the destination country.'
      : 'Oui. Les épices séchées, aliments en conserve, nouilles instantanées et huile de cuisson sont généralement autorisés. Assurez-vous d\'un emballage commercial avec liste des ingrédients et dates de péremption visibles. Les aliments surgelés et frais sont interdits car nous n\'offrons pas de logistique de chaîne du froid. Le lait infantile et le miel peuvent nécessiter des permis du ministère de la santé selon le pays de destination.',
  },
  {
    question: isEn
      ? 'What does "restricted" mean vs "prohibited"?'
      : 'Que signifie "restreint" par rapport à "interdit" ?',
    answer: isEn
      ? 'Restricted items CAN be shipped but require special handling, packaging, or documentation. Examples: lithium batteries, paint, aerosols. Prohibited items CANNOT be shipped under any circumstances through standard freight. Examples: weapons, explosives, cash, pesticides. If you are unsure about an item, contact us on WhatsApp for verification.'
      : 'Les articles restreints PEUVENT être expédiés mais nécessitent une manipulation, un emballage ou une documentation spéciale. Exemples : batteries lithium, peinture, aérosols. Les articles interdits NE PEUVENT PAS être expédiés en aucune circonstance par fret standard. Exemples : armes, explosifs, espèces, pesticides. Si vous n\'êtes pas sûr d\'un article, contactez-nous sur WhatsApp pour vérification.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Can I Ship This? | Dangerous Goods Checker | ChinaLink Express'
      : 'Puis-je Expédier Ceci ? | Vérificateur de Produits | ChinaLink Express',
    description: isEn
      ? 'Check if your product can be shipped from China to Africa. Search 90+ items: electronics, cosmetics, food, machinery, medical supplies. Instantly see if allowed, restricted, prohibited, or needs a permit.'
      : 'Vérifiez si votre produit peut être expédié de Chine vers l\'Afrique. Recherchez 90+ articles : électronique, cosmétiques, alimentation, machines, fournitures médicales. Voyez instantanément si autorisé, restreint, interdit ou permis requis.',
    keywords: isEn
      ? 'dangerous goods checker, prohibited items shipping, can i ship batteries, restricted items china africa, customs prohibited items mali, shipping restrictions china, what can i import from china, hazardous goods freight, cargo restrictions west africa, product verifier chinalink'
      : 'produits interdits importation, verifier produit chine mali, marchandises dangereuses fret, restrictions expédition chine afrique, articles interdits douane mali, puis-je expédier batteries, produits restreints chine, vérificateur produits chinalink, cargo chine mali restrictions',
    path: '/verifier-produit',
    locale: locale as Locale,
    ogType: 'website',
  });
}

export default async function VerifierProduitPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const faqs = getFaqs(isEn);

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Product Checker' : 'Vérificateur Produit', url: `/${locale}/verifier-produit` },
    ], locale as Locale),
    generateFAQPageSchema(faqs, locale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <main className="min-h-screen bg-slate-950 text-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 pt-28 pb-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full bg-blue-500/15 px-4 py-1.5 text-sm font-semibold text-blue-300 ring-1 ring-blue-400/20">
                {isEn ? 'Free Product Checker' : 'Vérificateur Gratuit'}
              </span>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {isEn ? (
                  <>
                    Can I Ship{' '}
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      This Item?
                    </span>
                  </>
                ) : (
                  <>
                    Puis-je Expédier{' '}
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Ce Produit ?
                    </span>
                  </>
                )}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                {isEn
                  ? 'Check if your product can be shipped from China to West Africa. Search 90+ items across electronics, cosmetics, food, machinery, and more. Instantly see shipping rules.'
                  : 'Vérifiez si votre produit peut être expédié de Chine vers l\'Afrique de l\'Ouest. Recherchez 90+ articles : électronique, cosmétiques, alimentation, machines et plus. Voyez instantanément les règles d\'expédition.'}
              </p>
            </div>
          </div>
        </section>

        {/* Status Legend */}
        <section className="border-y border-white/5 bg-white/[0.02] py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <StatusLegend locale={locale} />
          </div>
        </section>

        {/* Search */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-10">
              <h2 className="text-2xl font-bold md:text-3xl">
                {isEn ? 'Search a Product' : 'Rechercher un Produit'}
              </h2>
              <p className="mt-2 text-slate-400">
                {isEn
                  ? 'Type a product name or browse by category and status.'
                  : 'Tapez un nom de produit ou parcourez par catégorie et statut.'}
              </p>
            </div>
            <ItemSearch locale={isEn ? 'en' : 'fr'} />
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5 bg-white/[0.02] py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold md:text-3xl text-center mb-10">
              {isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-white/10 bg-white/5 p-5 open:bg-white/[0.07] transition"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-white list-none">
                    {faq.question}
                    <span className="ml-4 text-slate-400 transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-slate-300 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 bg-white/[0.02] py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isEn ? 'Not sure about your product?' : 'Pas sûr de votre produit ?'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              {isEn
                ? 'Our team can verify any product for you. Send us a photo or description on WhatsApp and we will confirm shipping eligibility within minutes.'
                : 'Notre équipe peut vérifier n\'importe quel produit pour vous. Envoyez-nous une photo ou description sur WhatsApp et nous confirmerons l\'éligibilité en quelques minutes.'}
            </p>
            <a
              href="https://wa.me/8618851725957?text=Bonjour%20ChinaLink%2C%20j'ai%20une%20question%20sur%20un%20produit%20%C3%A0%20exp%C3%A9dier."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-400"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {isEn ? 'Ask on WhatsApp' : 'Demander sur WhatsApp'}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;

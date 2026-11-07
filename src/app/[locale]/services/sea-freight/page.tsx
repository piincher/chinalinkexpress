/**
 * Sea Freight Service Page
 *
 * SEO-optimized page for FCL/LCL shipping from China to Mali.
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generateServiceMetadata } from '@/lib/metadata';
import { FAQStructuredData, ServiceStructuredData } from '@/components/seo';
import { SeaFreightPage } from '@/features/services/SeaFreightPage';

interface Props {
  params: Promise<{ locale: string }>;
}

const seaFreightFaqs = {
  fr: [
    {
      question: 'Combien de temps prend le fret maritime Chine-Mali ?',
      answer: 'Le fret maritime vers Bamako prend généralement 60 à 75 jours depuis le port de Foshan jusqu’au port de Dakar, puis par transit terrestre vers le Mali.',
    },
    {
      question: 'Quelle est la différence entre FCL et LCL ?',
      answer: 'FCL signifie conteneur complet pour un seul client. LCL signifie groupage maritime, où vos marchandises partagent un conteneur avec d’autres envois.',
    },
    {
      question: 'Par quels ports passent les conteneurs vers Bamako ?',
      answer: 'La route maritime part du port de Foshan, arrive au port de Dakar, puis continue par transport terrestre jusqu’à Bamako.',
    },
    {
      question: 'Le fret maritime convient-il aux petits colis ?',
      answer: 'Le maritime est surtout intéressant pour les gros volumes, meubles, machines, cartons en quantité ou marchandises lourdes. Pour les urgences, le fret aérien est plus adapté.',
    },
  ],
  en: [
    {
      question: 'How long does China to Mali sea freight take?',
      answer: 'Sea freight to Bamako usually takes 60 to 75 days from Foshan or another China port to a West African port, followed by inland transit.',
    },
    {
      question: 'What is the difference between FCL and LCL?',
      answer: 'FCL is a full container for one customer. LCL is sea consolidation, where your goods share container space with other shipments.',
    },
    {
      question: 'Which ports are used for Bamako-bound containers?',
      answer: 'Many shipments move through Dakar or another West African port before road transit to Bamako, depending on capacity and routing.',
    },
    {
      question: 'Is sea freight suitable for small parcels?',
      answer: 'Sea freight is best for larger volumes, furniture, machinery, many cartons or heavy goods. For urgent shipments, air freight is usually better.',
    },
  ],
  zh: [
    {
      question: '中国到马里的海运需要多长时间？',
      answer: '海运到巴马科通常需要 60 到 75 天，从佛山港到达喀尔港，再经陆路转运到马里。',
    },
    {
      question: 'FCL 和 LCL 有什么区别？',
      answer: 'FCL 指一位客户独享整个集装箱。LCL 指海运拼箱，您的货物与其他货物共用一个集装箱。',
    },
    {
      question: '到巴马科的集装箱经过哪些港口？',
      answer: '海运线路从佛山港出发，到达达喀尔港，然后经陆路运到巴马科。',
    },
    {
      question: '海运适合小包裹吗？',
      answer: '海运主要适合大批量、家具、机器、大量纸箱或重型货物。紧急货物更适合空运。',
    },
  ],
  ar: [
    {
      question: 'كم يستغرق الشحن البحري من الصين إلى مالي؟',
      answer: 'يستغرق الشحن البحري إلى باماكو عادة من 60 إلى 75 يومًا من ميناء فوشان إلى ميناء داكار، ثم عبورًا بريًا إلى مالي.',
    },
    {
      question: 'ما الفرق بين FCL وLCL؟',
      answer: 'FCL تعني حاوية كاملة لعميل واحد. وLCL تعني الشحن البحري المجمّع، حيث تشارك بضائعك حاوية مع شحنات أخرى.',
    },
    {
      question: 'عبر أي موانئ تمر الحاويات إلى باماكو؟',
      answer: 'ينطلق الخط البحري من ميناء فوشان، ويصل إلى ميناء داكار، ثم يكمل برًا حتى باماكو.',
    },
    {
      question: 'هل يناسب الشحن البحري الطرود الصغيرة؟',
      answer: 'الشحن البحري مفيد أساسًا للكميات الكبيرة والأثاث والآلات والكراتين الكثيرة والبضائع الثقيلة. أما الحالات العاجلة فالشحن الجوي أنسب لها.',
    },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateServiceMetadata(locale as Locale, 'sea');
}

export default async function SeaFreight({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const faqs = seaFreightFaqs[locale as Locale];
  const breadcrumbs = [
    { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Services' : 'Services', url: `/${locale}/services` },
    { name: isEn ? 'Sea Freight' : isZh ? '海运' : isAr ? 'الشحن البحري' : 'Fret Maritime', url: `/${locale}/services/sea-freight` },
  ];

  return (
    <>
      <ServiceStructuredData
        serviceType="sea"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <FAQStructuredData faqs={faqs} locale={locale as Locale} />
      <SeaFreightPage locale={locale} />
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

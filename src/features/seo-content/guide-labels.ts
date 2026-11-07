import type { Locale } from '@/i18n/config';

const whatsapp = (text: string) => `https://wa.me/8618851725957?text=${encodeURIComponent(text)}`;

/** UI strings around a guide's body. SeoGuidePage's own defaults are French. */
export const GUIDE_LABELS: Record<Locale, {
  kicker: string;
  updatedLabel: string;
  reviewedBy: string;
  faqTitle: string;
  continueTitle: string;
  advisorCtaLabel: string;
  whatsappHref: string;
}> = {
  fr: {
    kicker: 'Guide import Chine-Mali',
    updatedLabel: 'Mis a jour',
    reviewedBy: "Relu par l'equipe operations Chine/Bamako",
    faqTitle: 'FAQ',
    continueTitle: 'Continuer',
    advisorCtaLabel: 'Parler a un conseiller',
    whatsappHref: whatsapp("Bonjour ChinaLink, j'ai lu votre guide et je veux importer de Chine au Mali."),
  },
  en: {
    kicker: 'China to Mali import guide',
    updatedLabel: 'Updated',
    reviewedBy: 'Reviewed by the China/Bamako operations team',
    faqTitle: 'FAQ',
    continueTitle: 'Continue',
    advisorCtaLabel: 'Talk to an advisor',
    whatsappHref: whatsapp('Hello ChinaLink, I read your guide and I want to import from China to Mali.'),
  },
  zh: {
    kicker: '中国—马里进口指南',
    updatedLabel: '更新于',
    reviewedBy: '由中国/巴马科运营团队审核',
    faqTitle: '常见问题',
    continueTitle: '继续阅读',
    advisorCtaLabel: '咨询顾问',
    whatsappHref: whatsapp('您好 ChinaLink，我读了你们的指南，想从中国进口到马里。'),
  },
  ar: {
    kicker: 'دليل الاستيراد من الصين إلى مالي',
    updatedLabel: 'آخر تحديث',
    reviewedBy: 'راجعه فريق العمليات في الصين وباماكو',
    faqTitle: 'الأسئلة الشائعة',
    continueTitle: 'تابع القراءة',
    advisorCtaLabel: 'تحدث إلى مستشار',
    whatsappHref: whatsapp('مرحبًا ChinaLink، قرأت دليلكم وأرغب في الاستيراد من الصين إلى مالي.'),
  },
};

export interface GuideContent {
  metaTitle: string;
  breadcrumb: string;
  title: string;
  description: string;
  keywords: string;
  updatedAt: string;
  readTime: string;
  sections: Array<{ title: string; body: string; items?: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
  /** Paths without a locale prefix; the page adds it. */
  links: Array<{ href: string; label: string }>;
}

export const GUIDE_CRUMBS: Record<Locale, { home: string; guides: string }> = {
  fr: { home: 'Accueil', guides: 'Guides' },
  en: { home: 'Home', guides: 'Guides' },
  zh: { home: '首页', guides: '指南' },
  ar: { home: 'الرئيسية', guides: 'الأدلة' },
};

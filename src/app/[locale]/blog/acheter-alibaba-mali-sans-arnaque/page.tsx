import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { BUSINESS_INFO, generateBreadcrumbSchema, generateFAQPageSchema, generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoGuidePage } from '@/features/seo-content/SeoGuidePage';
import { getBlogPost } from '@/features/seo-content/blog-content';

const slug = 'acheter-alibaba-mali-sans-arnaque';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getBlogPost(slug, locale as Locale);
  return generatePageMetadata({ title: content.title, description: content.description, keywords: content.keywords, path: `/blog/${slug}`, locale: locale as Locale, supportedLocales: ['fr', 'en'], ogType: 'article' });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const content = getBlogPost(slug, locale as Locale);
  setRequestLocale(locale);
  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: content.title, description: content.description, author: { '@type': 'Organization', name: BUSINESS_INFO.name }, publisher: { '@type': 'Organization', name: BUSINESS_INFO.name }, datePublished: content.date, dateModified: content.date, inLanguage: isEn ? 'en-US' : 'fr-FR', mainEntityOfPage: `${BUSINESS_INFO.url}/${locale}/blog/${slug}` };

  return (
    <>
      <StructuredData schemas={[articleSchema, generateBreadcrumbSchema([{ name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` }, { name: 'Blog', url: `/${locale}/blog` }, { name: content.title, url: `/${locale}/blog/${slug}` }], locale as Locale), generateFAQPageSchema(content.faqs, locale as Locale)]} />
      <SeoGuidePage title={content.title} description={content.description} updatedAt={content.updatedAt} readTime={content.readTime} sections={content.sections} faqs={content.faqs} links={content.links} kicker={isEn ? 'China-Africa import guide' : 'Guide import Chine-Mali'} updatedLabel={isEn ? 'Updated' : 'Mis a jour'} reviewedBy={isEn ? 'Reviewed by the China/Bamako operations team' : "Relu par l'equipe operations Chine/Bamako"} continueTitle={isEn ? 'Continue' : 'Continuer'} advisorCtaLabel={isEn ? 'Talk to an advisor' : 'Parler a un conseiller'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;

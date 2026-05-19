/**
 * Share Shipment Fallback Page
 *
 * Server-rendered page for shared shipment links (/s/:token).
 * Fetches data from the public API and generates dynamic OG metadata.
 */

import { Metadata } from 'next';
import { headers } from 'next/headers';
import { fetchSharedShipment } from '@/lib/shareApi';
import { SharePageClient } from './SharePageClient';
import { SharedShipmentResult, getStatusConfig, TYPE_LABELS } from './types';

export const dynamic = 'force-dynamic';

// ============================================================================
// Config
// ============================================================================

const WEB_BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://chinalinkexpress.com';
const OG_IMAGE_URL = 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/og-image.jpg';
const SUPPORTED_LOCALES = ['fr', 'en', 'zh', 'ar'];

// ============================================================================
// Locale Detection
// ============================================================================

function detectLocale(headersList: Headers, searchParams: Record<string, string | string[] | undefined>): string {
  const langParam = typeof searchParams.lang === 'string' ? searchParams.lang : undefined;
  if (langParam && SUPPORTED_LOCALES.includes(langParam)) {
    return langParam;
  }

  const acceptLang = headersList.get('accept-language') || '';
  const preferred = acceptLang
    .split(',')[0]
    ?.trim()
    .split('-')[0]
    .toLowerCase();

  if (preferred && SUPPORTED_LOCALES.includes(preferred)) {
    return preferred;
  }

  return 'fr';
}

// ============================================================================
// Metadata
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const result = await fetchSharedShipment(token);

  // Default metadata for invalid/expired links (still needs OG tags for WhatsApp previews)
  if (result.error || !result.data) {
    return {
      title: 'Suivi ChinaLink Express — Lien invalide',
      description: 'Ce lien de suivi est invalide ou a expiré. Contactez l\'expéditeur pour un nouveau lien.',
      metadataBase: new URL(WEB_BASE_URL),
      openGraph: {
        title: 'Suivi ChinaLink Express — Lien invalide',
        description: 'Ce lien de suivi est invalide ou a expiré. Contactez l\'expéditeur pour un nouveau lien.',
        url: `${WEB_BASE_URL}/s/${encodeURIComponent(token)}`,
        siteName: 'ChinaLink Express',
        type: 'website',
        images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'ChinaLink Express' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Suivi ChinaLink Express — Lien invalide',
        description: 'Ce lien de suivi est invalide ou a expiré.',
        images: [OG_IMAGE_URL],
      },
      robots: { index: false, follow: false },
    };
  }

  const data = result.data;
  const statusConfig = getStatusConfig(data.currentStatus);
  const typeLabel = TYPE_LABELS[data.type] || data.type;

  let reference = '';
  if (data.type === 'goods') {
    reference = (data.data as any).goodsId || '';
  } else if (data.type === 'container') {
    reference = (data.data as any).containerNumber || '';
  } else if (data.type === 'order') {
    reference = (data.data as any).orderId || '';
  }

  const title = `Suivi ChinaLink Express — ${statusConfig.label}`;
  const description = `${typeLabel} ${reference} — Statut: ${statusConfig.label}. Cliquez pour suivre en temps réel.`;

  return {
    title,
    description,
    metadataBase: new URL(WEB_BASE_URL),
    openGraph: {
      title,
      description,
      url: `${WEB_BASE_URL}/s/${encodeURIComponent(token)}`,
      siteName: 'ChinaLink Express',
      type: 'website',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE_URL],
    },
    robots: { index: false, follow: false },
    // Smart App Banner for iOS
    other: {
      'apple-itunes-app': `app-id=6503253700, app-argument=${WEB_BASE_URL}/s/${encodeURIComponent(token)}`,
    },
  };
}

// ============================================================================
// Page Component
// ============================================================================

export default async function SharePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { token } = await params;
  const result = await fetchSharedShipment(token);

  // Detect platform from user-agent server-side
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isDesktop = !isIOS && !isAndroid;

  const platform = { isIOS, isAndroid, isDesktop };

  // Detect locale
  const sp = (await searchParams) || {};
  const locale = detectLocale(headersList, sp);

  // Load i18n messages
  const messages = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return (
    <SharePageClient
      token={token}
      data={result.data}
      error={result.error}
      locale={locale}
      messages={messages}
      platform={platform}
    />
  );
}

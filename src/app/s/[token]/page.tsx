/**
 * Share Shipment Fallback Page
 *
 * Server-rendered page for shared shipment links (/s/:token).
 * Fetches data from the public API and generates dynamic OG metadata.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { SharePageClient } from './SharePageClient';
import { SharedShipmentResult, getStatusConfig, TYPE_LABELS } from './types';

// ============================================================================
// Config
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.chinalinkexpress.com';
const WEB_BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://chinalinkexpress.com';
const OG_IMAGE_URL = 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/og-image.jpg';

// ============================================================================
// Data Fetching
// ============================================================================

async function fetchSharedShipment(token: string): Promise<SharedShipmentResult | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${API_BASE_URL}/api/v2/public/share/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.status === 404 || res.status === 410) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const json = await res.json();
    return json.data as SharedShipmentResult;
  } catch {
    return null;
  }
}

// ============================================================================
// Metadata
// ============================================================================

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  const data = await fetchSharedShipment(token);

  // Default metadata for invalid/expired links (still needs OG tags for WhatsApp previews)
  if (!data) {
    return {
      title: 'Suivi ChinaLink Express — Lien invalide',
      description: 'Ce lien de suivi est invalide ou a expiré. Contactez l\'expéditeur pour un nouveau lien.',
      metadataBase: new URL(WEB_BASE_URL),
      openGraph: {
        title: 'Suivi ChinaLink Express — Lien invalide',
        description: 'Ce lien de suivi est invalide ou a expiré. Contactez l\'expéditeur pour un nouveau lien.',
        url: `${WEB_BASE_URL}/s/${token}`,
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
      url: `${WEB_BASE_URL}/s/${token}`,
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
      'apple-itunes-app': 'app-id=6503253700, app-argument=https://chinalinkexpress.com/s/' + token,
    },
  };
}

// ============================================================================
// Page Component
// ============================================================================

export default async function SharePage({ params }: { params: Promise<{ token: string }> })
 {
  const { token } = await params;
  const data = await fetchSharedShipment(token);

  // Detect platform from user-agent server-side
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isDesktop = !isIOS && !isAndroid;

  const platform = { isIOS, isAndroid, isDesktop };

  return (
    <SharePageClient
      token={token}
      initialData={data}
      platform={platform}
    />
  );
}

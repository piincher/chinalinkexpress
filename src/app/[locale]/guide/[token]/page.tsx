/**
 * Personalized Guide Page
 * 
 * Dynamic route that displays personalized import guides based on quiz results.
 * - Validates token from URL
 * - Fetches guide data from API
 * - Shows loading, error, or guide content states
 * - Tracks access for analytics
 * 
 * Route: /guide/[token]
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Guide feature components (to be implemented)
import {
  GuideLayout,
  CoverSection,
  IntroSection,
  StepsSection,
  PricingSection,
  ChecklistSection,
  WhatsAppSection,
} from '@/features/import-quiz/components/guide';

import { WhatsAppButton } from '@/features/import-quiz/components/guide/WhatsAppButton';
import { GuideData, LeadCategory } from '@/features/import-quiz/types';
import { QUIZ_CONFIG } from '@/features/import-quiz/lib/constants';

// ============================================================================
// Types
// ============================================================================

interface GuidePageProps {
  params: Promise<{ locale: string; token: string }>;
}

interface GuideApiResponse {
  valid: boolean;
  data?: GuideData;
  error?: string;
}

// ============================================================================
// Metadata
// ============================================================================

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { locale, token } = await params;
  
  return {
    title: 'Votre Guide Import - ChinaLink Express',
    description: 'Guide personnalisé pour importer de Chine. Découvrez les étapes, tarifs et conseils adaptés à votre projet.',
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    // Prevent search engines from indexing personal guides
    alternates: {
      canonical: `/${locale}/guide/${token}`,
    },
  };
}

// ============================================================================
// Data Fetching
// ============================================================================

/**
 * Fetch guide data from API
 */
async function fetchGuideData(token: string): Promise<GuideData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/guide/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 5 minutes to reduce load
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch guide: ${response.status}`);
    }

    const result: GuideApiResponse = await response.json();
    
    if (!result.valid || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching guide data:', error);
    return null;
  }
}

/**
 * Track guide access for analytics
 * Note: Access is already tracked by the GET /api/guide/[token] endpoint
 */
async function trackGuideAccess(_token: string): Promise<void> {
  // No-op - tracking is handled by the API route itself
  // The GET request logs access and marks guide as opened
}

// ============================================================================
// Components
// ============================================================================

/**
 * Loading state component
 */
function GuideLoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Chargement de votre guide...
        </h2>
        <p className="text-slate-600">
          Préparation de votre guide personnalisé
        </p>
      </div>
    </div>
  );
}

/**
 * Error state component - Invalid or expired token
 */
function GuideErrorState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Lien expiré ou invalide
        </h1>

        {/* Message */}
        <p className="text-slate-600 mb-8">
          Ce guide n&apos;est plus accessible. Les liens de guide sont valables pendant 30 jours
          ou ont peut-être été désactivés.
        </p>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <a
            href="/quiz"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Reprendre le quiz
          </a>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-b from-slate-50 to-white text-slate-500">
                ou
              </span>
            </div>
          </div>

          <a
            href={`https://wa.me/${QUIZ_CONFIG.whatsappBusinessNumber}?text=${encodeURIComponent("Bonjour, mon lien de guide a expiré. Pouvez-vous m'aider ?")}`}
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-green-700 bg-white border-2 border-green-600 rounded-xl hover:bg-green-50 transition-colors"
          >
            Contacter sur WhatsApp
          </a>
        </div>

        {/* Help text */}
        <p className="mt-8 text-sm text-slate-500">
          Besoin d&apos;aide ? Contactez-nous directement sur WhatsApp
        </p>
      </div>
    </div>
  );
}

/**
 * Guide content component
 */
interface GuideContentProps {
  guideData: GuideData;
}

function GuideContent({ guideData }: GuideContentProps) {
  const { token, whatsappNumber, score, category, answers } = guideData;

  // Determine guide customization based on category
  const getGuideVariant = (cat: LeadCategory) => {
    switch (cat) {
      case 'hot':
        return {
          urgency: 'high',
          tone: 'professional-urgent',
          ctaPriority: 'immediate',
        };
      case 'warm':
        return {
          urgency: 'medium',
          tone: 'professional-friendly',
          ctaPriority: 'standard',
        };
      case 'cold':
        return {
          urgency: 'low',
          tone: 'educational',
          ctaPriority: 'soft',
        };
      default:
        return {
          urgency: 'medium',
          tone: 'professional-friendly',
          ctaPriority: 'standard',
        };
    }
  };

  const variant = getGuideVariant(category);

  return (
    <GuideLayout
      userPhone={whatsappNumber}
      category={category}
      score={score}
    >
      {/* Cover Section - Hero with personalized greeting */}
      <CoverSection
        score={score}
        category={category}
        generatedAt={new Date().toISOString()}
      />

      {/* Introduction Section - Welcome and context */}
      <IntroSection />

      {/* Steps Section - 5-step import process */}
      <StepsSection />

      {/* Pricing Section - Dynamic pricing */}
      <PricingSection />

      {/* Checklist Section - Actionable checklist */}
      <ChecklistSection
        score={score}
        category={category}
        answers={answers}
        whatsappNumber={whatsappNumber}
      />

      {/* WhatsApp CTA Section - Final conversion push */}
      <WhatsAppSection />
    </GuideLayout>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default async function GuidePage({ params }: GuidePageProps) {
  const { locale, token } = await params;

  // Validate token format (basic validation)
  if (!token || token.length < 10) {
    return <GuideErrorState />;
  }

  // Fetch guide data
  const guideData = await fetchGuideData(token);

  // If no data, show error state
  if (!guideData) {
    return <GuideErrorState />;
  }

  // Check if guide is expired
  const now = new Date();
  const expiresAt = new Date(guideData.expiresAt);
  
  if (now > expiresAt) {
    return <GuideErrorState />;
  }

  // Track access (non-blocking)
  trackGuideAccess(token);

  return (
    <Suspense fallback={<GuideLoadingState />}>
      <GuideContent guideData={guideData} />
    </Suspense>
  );
}

// ============================================================================
// Configuration
// ============================================================================

// Use dynamic rendering for personalized guides
export const dynamic = 'force-dynamic';

// Disable static generation for personalized content
export const revalidate = 0;

// Use Node.js runtime for full API access
export const runtime = 'nodejs';

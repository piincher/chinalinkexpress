/**
 * ProviderCard Component
 *
 * Individual provider card displaying price, duration, features,
 * color-coded border, and recommendation badges.
 */

'use client';

import { useMemo } from 'react';

interface ProviderCardProps {
  provider: string;
  providerFr: string;
  mode: 'sea' | 'air' | 'express';
  calculatedPrice: number;
  pricePerKg: number;
  durationDisplay: string;
  durationDisplayFr: string;
  durationDays: { min: number; max: number };
  features: string[];
  featuresFr: string[];
  color: string;
  isCompetitor: boolean;
  isBestValue?: boolean;
  isFastest?: boolean;
  isCheapest?: boolean;
  savingsVsThis?: number;
  locale?: string;
  index?: number;
}

const colorMap: Record<string, { border: string; bg: string; badge: string; badgeBg: string; accent: string }> = {
  blue: {
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/10',
    badge: 'text-blue-100',
    badgeBg: 'bg-blue-600',
    accent: 'text-blue-400',
  },
  cyan: {
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-500/10',
    badge: 'text-cyan-950',
    badgeBg: 'bg-cyan-400',
    accent: 'text-cyan-400',
  },
  red: {
    border: 'border-red-500/40',
    bg: 'bg-red-500/10',
    badge: 'text-red-100',
    badgeBg: 'bg-red-600',
    accent: 'text-red-400',
  },
  orange: {
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
    badge: 'text-orange-950',
    badgeBg: 'bg-orange-400',
    accent: 'text-orange-400',
  },
  purple: {
    border: 'border-purple-500/40',
    bg: 'bg-purple-500/10',
    badge: 'text-purple-100',
    badgeBg: 'bg-purple-600',
    accent: 'text-purple-400',
  },
  emerald: {
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/10',
    badge: 'text-emerald-950',
    badgeBg: 'bg-emerald-400',
    accent: 'text-emerald-400',
  },
};

export function ProviderCard({
  provider,
  providerFr,
  mode,
  calculatedPrice,
  pricePerKg,
  durationDisplay,
  durationDisplayFr,
  durationDays,
  features,
  featuresFr,
  color,
  isCompetitor,
  isBestValue,
  isFastest,
  isCheapest,
  savingsVsThis,
  locale = 'fr',
  index = 0,
}: ProviderCardProps) {
  const colors = colorMap[color] || colorMap.blue;
  const isEn = locale === 'en';

  const displayName = isEn ? provider : providerFr;
  const displayDuration = isEn ? durationDisplay : durationDisplayFr;
  const displayFeatures = isEn ? features : featuresFr;

  const modeLabel = useMemo(() => {
    if (mode === 'sea') return isEn ? 'Sea Freight' : 'Fret Maritime';
    if (mode === 'air') return isEn ? 'Air Freight' : 'Fret Aérien';
    return isEn ? 'Express' : 'Express';
  }, [mode, isEn]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(isEn ? 'en-US' : 'fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);

  const badges = [];
  if (isBestValue)
    badges.push({
      label: isEn ? 'Best Value' : 'Meilleur Rapport',
      className: 'bg-emerald-500 text-emerald-950',
    });
  if (isFastest)
    badges.push({
      label: isEn ? 'Fastest' : 'Plus Rapide',
      className: 'bg-purple-500 text-white',
    });
  if (isCheapest)
    badges.push({
      label: isEn ? 'Cheapest' : 'Moins Cher',
      className: 'bg-cyan-400 text-cyan-950',
    });

  return (
    <div
      className={`relative rounded-2xl border ${colors.border} bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01] ${
        isBestValue ? 'ring-2 ring-emerald-500/30' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Badges */}
      <div className="absolute -top-3 left-4 flex gap-2">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className={`rounded-full px-3 py-1 text-xs font-bold shadow-lg ${badge.className}`}
          >
            {badge.label}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="mb-5 mt-2 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{displayName}</h3>
          <span className="text-sm text-slate-400">{modeLabel}</span>
        </div>
        {!isCompetitor && (
          <span className="rounded-full bg-blue-600/20 px-2.5 py-1 text-xs font-semibold text-blue-300">
            {isEn ? 'ChinaLink' : 'ChinaLink'}
          </span>
        )}
        {isCompetitor && (
          <span className="rounded-full bg-slate-700/50 px-2.5 py-1 text-xs font-semibold text-slate-400">
            {isEn ? 'Competitor' : 'Concurrent'}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-black ${colors.accent}`}>
            {formatPrice(calculatedPrice)}
          </span>
          <span className="text-sm text-slate-500">
            {isEn ? 'total' : 'total'}
          </span>
        </div>
        <div className="mt-1 text-sm text-slate-400">
          {formatPrice(pricePerKg)}{' '}
          <span className="text-slate-500">/ kg</span>
        </div>
      </div>

      {/* Duration */}
      <div className={`mb-5 rounded-lg ${colors.bg} p-3`}>
        <div className="flex items-center gap-2">
          <svg
            className={`h-5 w-5 ${colors.accent}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-semibold text-white">{displayDuration}</span>
        </div>
        {/* Timeline bar */}
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full ${colors.badgeBg}`}
            style={{
              width: `${Math.max(10, 100 - (durationDays.max / 80) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5">
        {displayFeatures.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
            <svg
              className={`mt-0.5 h-4 w-4 shrink-0 ${colors.accent}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Savings indicator */}
      {savingsVsThis !== undefined && savingsVsThis > 0 && (
        <div className="mt-5 rounded-lg bg-emerald-500/10 p-3 text-center">
          <span className="text-sm font-semibold text-emerald-400">
            {isEn ? 'Save' : 'Économisez'}{' '}
            {formatPrice(savingsVsThis)}{' '}
            {isEn ? 'with ChinaLink' : 'avec ChinaLink'}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * ComparisonResults Component
 *
 * Results display with side-by-side cards, bar chart,
 * timeline visualization, badges, savings, and CTA.
 */

'use client';

import { useMemo } from 'react';
import { ProviderCard } from './ProviderCard';
import { ComparisonResult } from '../types';

interface ComparisonResultsProps {
  result: ComparisonResult | null;
  bestValue: ComparisonResult['rates'][number] | null;
  fastest: ComparisonResult['rates'][number] | null;
  cheapest: ComparisonResult['rates'][number] | null;
  savingsVsExpress: number;
  savingsPercentage: number;
  locale?: string;
}

export function ComparisonResults({
  result,
  bestValue,
  fastest,
  cheapest,
  savingsVsExpress,
  savingsPercentage,
  locale = 'fr',
}: ComparisonResultsProps) {
  const isEn = locale === 'en';

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(isEn ? 'en-US' : 'fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);

  const maxPrice = useMemo(() => {
    if (!result) return 0;
    return Math.max(...result.rates.map((r) => r.calculatedPrice));
  }, [result]);

  if (!result) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
          <svg
            className="h-8 w-8 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">
          {isEn ? 'Enter your shipment details' : 'Renseignez les détails de votre envoi'}
        </h3>
        <p className="mt-2 text-slate-400">
          {isEn
            ? 'Fill in the form above to compare shipping rates from China to West Africa.'
            : 'Remplissez le formulaire ci-dessus pour comparer les tarifs de Chine vers Afrique de l\'Ouest.'}
        </p>
      </div>
    );
  }

  const whatsappText = isEn
    ? `Hello ChinaLink, I compared shipping rates for ${result.weight}kg to ${result.destination.name} and I'm interested in a quote.`
    : `Bonjour ChinaLink, j'ai comparé les tarifs pour ${result.weight}kg vers ${result.destination.nameFr} et je suis intéressé par un devis.`;

  const whatsappHref = `https://wa.me/8618851725957?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="space-y-8">
      {/* Savings Banner */}
      {savingsVsExpress > 0 && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-center shadow-lg shadow-emerald-500/20">
          <div className="relative z-10">
            <p className="text-sm font-medium text-emerald-100">
              {isEn ? 'Compared to DHL Express' : 'Par rapport à DHL Express'}
            </p>
            <p className="mt-1 text-3xl font-black text-white">
              {isEn ? 'Save ' : 'Économisez '}{' '}
              {formatPrice(savingsVsExpress)}
            </p>
            <p className="mt-1 text-lg font-semibold text-emerald-100">
              ({savingsPercentage}% {isEn ? 'cheaper with ChinaLink' : 'moins cher avec ChinaLink'})
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10" />
        </div>
      )}

      {/* Bar Chart */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h3 className="mb-5 text-lg font-bold text-white">
          {isEn ? 'Price Comparison' : 'Comparaison des prix'}
        </h3>
        <div className="space-y-4">
          {result.rates.map((rate) => {
            const percentage =
              maxPrice > 0 ? (rate.calculatedPrice / maxPrice) * 100 : 0;
            const isBest = rate.provider === bestValue?.provider;

            return (
              <div key={rate.provider} className="group">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span
                    className={`font-semibold ${
                      isBest ? 'text-emerald-400' : 'text-white'
                    }`}
                  >
                    {isEn ? rate.provider : rate.providerFr}
                  </span>
                  <span className="text-slate-400">
                    {formatPrice(rate.calculatedPrice)}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      rate.isCompetitor
                        ? 'bg-slate-500'
                        : isBest
                          ? 'bg-emerald-500'
                          : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Provider Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {result.rates.map((rate, index) => (
          <ProviderCard
            key={rate.provider}
            {...rate}
            isBestValue={rate.provider === bestValue?.provider}
            isFastest={rate.provider === fastest?.provider}
            isCheapest={rate.provider === cheapest?.provider}
            savingsVsThis={
              rate.isCompetitor
                ? result.rates
                    .filter((r) => !r.isCompetitor)
                    .reduce(
                      (min, r) =>
                        r.calculatedPrice < min ? r.calculatedPrice : min,
                      Infinity
                    ) < rate.calculatedPrice
                  ? rate.calculatedPrice -
                    result.rates
                      .filter((r) => !r.isCompetitor)
                      .reduce(
                        (min, r) =>
                          r.calculatedPrice < min ? r.calculatedPrice : min,
                        Infinity
                      )
                  : undefined
                : undefined
            }
            locale={locale}
            index={index}
          />
        ))}
      </div>

      {/* Timeline comparison */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h3 className="mb-5 text-lg font-bold text-white">
          {isEn ? 'Delivery Timeline' : 'Délai de livraison'}
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-800" />
          <div className="relative flex justify-between">
            {result.rates.map((rate) => {
              const leftPercent =
                100 - (rate.durationDays.max / 80) * 100;
              return (
                <div
                  key={rate.provider}
                  className="flex flex-col items-center"
                  style={{ minWidth: '80px' }}
                >
                  <span className="mb-2 text-xs font-semibold text-white">
                    {isEn ? rate.provider : rate.providerFr}
                  </span>
                  <div
                    className={`relative z-10 h-4 w-4 rounded-full border-2 ${
                      rate.isCompetitor
                        ? 'border-slate-500 bg-slate-700'
                        : 'border-blue-500 bg-blue-600'
                    }`}
                  />
                  <span className="mt-2 text-xs text-slate-400">
                    {isEn ? rate.durationDisplay : rate.durationDisplayFr}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
        <h3 className="text-xl font-bold text-white">
          {isEn
            ? 'Ready to ship with ChinaLink?'
            : 'Prêt à expédier avec ChinaLink ?'}
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-slate-400">
          {isEn
            ? 'Get a personalized quote in minutes via WhatsApp. Our team will confirm availability and guide you through the process.'
            : 'Obtenez un devis personnalisé en quelques minutes via WhatsApp. Notre équipe confirmera la disponibilité et vous guidera.'}
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-400 hover:shadow-green-400/30"
        >
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {isEn ? 'Get Quote on WhatsApp' : 'Devis sur WhatsApp'}
        </a>
      </div>
    </div>
  );
}

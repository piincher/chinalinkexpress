/**
 * ComparisonPage Component
 *
 * Full page layout for the shipping cost comparison tool.
 * Includes hero, form, results, trust signals, and internal links.
 */

'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ComparisonForm } from './components/ComparisonForm';
import { ComparisonResults } from './components/ComparisonResults';
import { useComparison } from './hooks/useComparison';

interface ComparisonPageProps {
  locale?: string;
}

export function ComparisonPage({ locale = 'fr' }: ComparisonPageProps) {
  const isEn = locale === 'en';

  const [params, setParams] = useState<{
    weight: number;
    destinationCode: string;
    dimensions?: { length: number; width: number; height: number };
  } | null>(null);

  const handleCompare = useCallback(
    (newParams: {
      weight: number;
      destinationCode: string;
      dimensions?: { length: number; width: number; height: number };
    }) => {
      setParams(newParams);
    },
    []
  );

  const { result, bestValue, fastest, cheapest, savingsVsExpress, savingsPercentage } =
    useComparison({
      weight: params?.weight ?? 0,
      destinationCode: params?.destinationCode ?? '',
      dimensions: params?.dimensions,
    });

  const trustSignals = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: isEn ? 'Transparent Pricing' : 'Tarifs Transparents',
      desc: isEn ? 'No hidden fees. What you see is what you pay.' : 'Pas de frais cachés. Ce que vous voyez est ce que vous payez.',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: isEn ? 'Real 2026 Rates' : 'Tarifs 2026 Réels',
      desc: isEn ? 'Based on actual contracts with carriers and partners.' : 'Basés sur des contrats réels avec transporteurs et partenaires.',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      title: isEn ? 'WhatsApp Support' : 'Support WhatsApp',
      desc: isEn ? 'Get your confirmed quote in minutes, not days.' : 'Obtenez votre devis confirmé en minutes, pas en jours.',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      title: isEn ? '500+ Businesses' : '500+ Entreprises',
      desc: isEn ? 'Trusted by importers across West Africa since 2019.' : 'De confiance pour les importateurs d\'Afrique de l\'Ouest depuis 2019.',
    },
  ];

  const internalLinks = [
    { href: `/${locale}/services/air-freight`, label: isEn ? 'Air Freight Service' : 'Service Fret Aérien' },
    { href: `/${locale}/services/sea-freight`, label: isEn ? 'Sea Freight Service' : 'Service Fret Maritime' },
    { href: `/${locale}/calculateur`, label: isEn ? 'Shipping Calculator' : 'Calculateur de Fret' },
    { href: `/${locale}/services/sourcing`, label: isEn ? 'China Sourcing Agent' : 'Agent Sourcing Chine' },
    { href: `/${locale}/contact`, label: isEn ? 'Contact Us' : 'Contactez-nous' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 pt-28 pb-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-500/15 px-4 py-1.5 text-sm font-semibold text-blue-300 ring-1 ring-blue-400/20">
              {isEn ? 'Free Comparison Tool' : 'Outil de Comparaison Gratuit'}
            </span>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {isEn ? (
                <>
                  Compare Shipping Costs{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    China to Africa
                  </span>
                </>
              ) : (
                <>
                  Comparez les Coûts de{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Fret Chine-Afrique
                  </span>
                </>
              )}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              {isEn
                ? 'See ChinaLink\'s rates side-by-side with DHL and Aramex. Transparent pricing for sea freight, air cargo, and express delivery to Mali, Senegal, Ivory Coast, and all West Africa.'
                : 'Comparez les tarifs ChinaLink avec DHL et Aramex. Tarifs transparents pour le fret maritime, cargo aérien et livraison express vers le Mali, Sénégal, Côte d\'Ivoire et toute l\'Afrique de l\'Ouest.'}
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map((signal) => (
              <div
                key={signal.title}
                className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition hover:bg-white/[0.07]"
              >
                <div className="shrink-0 text-blue-400">{signal.icon}</div>
                <div>
                  <p className="font-semibold text-white">{signal.title}</p>
                  <p className="mt-0.5 text-sm text-slate-400">{signal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Tool */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isEn ? 'Compare Your Shipment' : 'Comparez Votre Envoi'}
            </h2>
            <p className="mt-2 text-slate-400">
              {isEn
                ? 'Enter weight and destination to see instant price comparison.'
                : 'Entrez le poids et la destination pour voir la comparaison instantanée.'}
            </p>
          </div>

          <ComparisonForm locale={locale} onCompare={handleCompare} />

          <div className="mt-10">
            <ComparisonResults
              result={result}
              bestValue={bestValue}
              fastest={fastest}
              cheapest={cheapest}
              savingsVsExpress={savingsVsExpress}
              savingsPercentage={savingsPercentage}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-white/5 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isEn ? 'How the Comparison Works' : 'Comment Fonctionne la Comparaison'}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: isEn ? 'Enter Details' : 'Renseignez les Détails',
                desc: isEn
                  ? 'Input your package weight, destination country, and optional dimensions.'
                  : 'Saisissez le poids de votre colis, le pays de destination et les dimensions optionnelles.',
              },
              {
                step: '02',
                title: isEn ? 'Compare Instantly' : 'Comparez Instantanément',
                desc: isEn
                  ? 'See rates for ChinaLink Sea, ChinaLink Air, DHL, and Aramex side-by-side.'
                  : 'Visualisez les tarifs ChinaLink Maritime, ChinaLink Aérien, DHL et Aramex côte à côte.',
              },
              {
                step: '03',
                title: isEn ? 'Book via WhatsApp' : 'Réservez sur WhatsApp',
                desc: isEn
                  ? 'Click to get a confirmed quote and start your shipment in minutes.'
                  : 'Cliquez pour obtenir un devis confirmé et lancer votre expédition en quelques minutes.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
              >
                <span className="text-3xl font-black text-blue-500/30">{item.step}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isEn ? 'Explore Our Services' : 'Découvrez Nos Services'}
            </h2>
            <p className="mt-2 text-slate-400">
              {isEn
                ? 'Learn more about how ChinaLink can help your business import from China.'
                : 'En savoir plus sur la façon dont ChinaLink peut aider votre entreprise à importer de Chine.'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/20"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-white/5 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            {isEn ? 'Still have questions?' : 'Encore des questions ?'}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            {isEn
              ? 'Our team is available on WhatsApp to help you choose the best shipping option for your business.'
              : 'Notre équipe est disponible sur WhatsApp pour vous aider à choisir la meilleure option d\'expédition pour votre entreprise.'}
          </p>
          <a
            href="https://wa.me/8618851725957?text=Bonjour%20ChinaLink%2C%20j'ai%20une%20question%20sur%20le%20comparateur%20de%20fret."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-400"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {isEn ? 'Chat on WhatsApp' : 'Discuter sur WhatsApp'}
          </a>
        </div>
      </section>
    </main>
  );
}

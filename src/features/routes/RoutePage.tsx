/**
 * Route Page Component
 * 
 * Reusable route page component for shipping routes from China to African destinations.
 */

'use client';

import { motion } from 'framer-motion';
import { Plane, Ship, Clock, MapPin, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getRouteData } from './route-data';

interface Props {
  locale: string;
  routeKey: string;
  country: string;
  capital: string;
}

export function RoutePage({ locale, routeKey, country, capital }: Props) {
  const isEn = locale === 'en';
  const route = getRouteData(routeKey);
  
  if (!route) {
    return <div>Route not found</div>;
  }

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 mb-6">
              <MapPin className="w-5 h-5" />
              <span>{isEn ? 'Shipping Route' : 'Route Maritime/Aérienne'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {isEn 
                ? `Shipping from ${route.origin.country} to ${route.destination.country}`
                : `Expédition de ${route.origin.country} vers ${route.destination.country}`}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {isEn 
                ? `Reliable freight forwarding from ${route.origin.city} to ${route.destination.city}. Air and sea shipping options available.`
                : `Transitaire fiable de ${route.origin.city} vers ${route.destination.city}. Options fret aérien et maritime disponibles.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/calculateur`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {isEn ? 'Calculate Shipping Cost' : 'Calculer les Frais'}
              </Link>
              <a
                href="https://wa.me/8618851725957"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-400 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                {isEn ? 'Get Quote on WhatsApp' : 'Devis sur WhatsApp'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Route Overview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="text-sm text-[var(--text-tertiary)] mb-1">{isEn ? 'Origin' : 'Origine'}</div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">{route.origin.city}</div>
                <div className="text-[var(--text-secondary)]">{route.origin.country}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <div className="w-32 md:w-48 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                <ArrowRight className="w-6 h-6 text-purple-500" />
                <div className="w-32 md:w-48 h-0.5 bg-gradient-to-r from-purple-500 to-green-500" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="text-center md:text-right">
                <div className="text-sm text-[var(--text-tertiary)] mb-1">{isEn ? 'Destination' : 'Destination'}</div>
                <div className="text-2xl font-bold text-[var(--text-primary)]">{route.destination.city}</div>
                <div className="text-[var(--text-secondary)]">{route.destination.country}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16 md:py-24 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Air Freight */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                    {isEn ? 'Air Freight' : 'Fret Aérien'}
                  </h2>
                  <p className="text-[var(--text-tertiary)]">{isEn ? 'Fast delivery' : 'Livraison rapide'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  {route.airFreight.duration}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {isEn ? 'Available Routes' : 'Routes Disponibles'}
                </h3>
                {route.airFreight.routes.map((r, i) => (
                  <div key={i} className="p-4 bg-[var(--surface-elevated)] rounded-lg">
                    <div className="text-sm text-[var(--text-tertiary)]">{r.via}</div>
                    <div className="text-[var(--text-primary)]">{r.path}</div>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/services/air-freight`}
                className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                {isEn ? 'Learn more about air freight' : 'En savoir plus sur le fret aérien'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>

            {/* Sea Freight */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Ship className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                    {isEn ? 'Sea Freight' : 'Fret Maritime'}
                  </h2>
                  <p className="text-[var(--text-tertiary)]">{isEn ? 'Economical option' : 'Option économique'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-cyan-500" />
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  {route.seaFreight.duration}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {isEn ? 'Available Routes' : 'Routes Disponibles'}
                </h3>
                {route.seaFreight.routes.map((r, i) => (
                  <div key={i} className="p-4 bg-[var(--surface-elevated)] rounded-lg">
                    <div className="text-sm text-[var(--text-tertiary)]">{r.via}</div>
                    <div className="text-[var(--text-primary)]">{r.path}</div>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/services/sea-freight`}
                className="mt-6 inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
              >
                {isEn ? 'Learn more about sea freight' : 'En savoir plus sur le fret maritime'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn 
                ? `Ship from ${route.origin.country} to ${route.destination.country}`
                : `Expédiez de ${route.origin.country} vers ${route.destination.country}`}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? 'Get your free quote today. Professional freight forwarding services.'
                : 'Obtenez votre devis gratuit aujourd\'hui. Services de transitaire professionnels.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/calculateur`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {isEn ? 'Calculate Cost' : 'Calculer le Coût'}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors"
              >
                {isEn ? 'Contact Us' : 'Contactez-nous'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

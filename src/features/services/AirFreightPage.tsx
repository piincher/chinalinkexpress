/**
 * Air Freight Page Component
 * 
 * Comprehensive air freight service page with SEO-optimized content.
 */

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Plane, Clock, Shield, Globe, Package, Phone } from 'lucide-react';
import Link from 'next/link';

interface Props {
  locale: string;
}

export function AirFreightPage({ locale }: Props) {
  const t = useTranslations();
  const isEn = locale === 'en';

  const features = [
    {
      icon: Clock,
      title: isEn ? 'Fast Delivery' : 'Livraison Rapide',
      desc: isEn ? '14-21 business days to Bamako, Mali' : '14-21 jours ouvrables vers Bamako, Mali',
    },
    {
      icon: Shield,
      title: isEn ? 'Secure Handling' : 'Manipulation Sécurisée',
      desc: isEn ? 'Professional packaging and handling for fragile items' : 'Emballage et manipulation professionnels pour articles fragiles',
    },
    {
      icon: Globe,
      title: isEn ? 'Partner Network' : 'Réseau de Partenaires',
      desc: isEn ? 'We work with trusted airlines and freight partners to ensure safe delivery' : 'Nous collaborons avec des compagnies aériennes et des partenaires fret de confiance pour assurer une livraison sécurisée',
    },
    {
      icon: Package,
      title: isEn ? 'All Cargo Types' : 'Tous Types de Marchandises',
      desc: isEn ? 'Electronics, textiles, machinery, and general cargo' : 'Électronique, textiles, machines et marchandises générales',
    },
  ];

  const destinations = [
    { city: 'Bamako', country: 'Mali', time: '14-21 days' },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 mb-6">
              <Plane className="w-5 h-5" />
              <span>{isEn ? 'Express Air Freight' : 'Fret Aérien Express'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {isEn 
                ? 'Air Freight from China to Mali' 
                : 'Fret Aérien de la Chine vers le Mali'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {isEn 
                ? 'Fast, reliable air cargo services to Bamako through our trusted partner network. Delivery in 14-21 days. We handle sourcing, consolidation, and shipping so you receive your goods safely.'
                : 'Services de cargo aérien rapides et fiables vers Bamako via notre réseau de partenaires de confiance. Livraison en 14-21 jours. Nous gérons le sourcing, la consolidation et l\'expédition pour que vous receviez vos marchandises en toute sécurité.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/calculateur`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {isEn ? 'Calculate Shipping Cost' : 'Calculer les Frais'}
              </Link>
              <a
                href="https://wa.me/+8618851725957"
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

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'Why Choose Our Air Freight?' : 'Pourquoi Choisir Notre Fret Aérien?'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {isEn 
                ? 'Professional air cargo services with competitive rates and reliable delivery to Mali'
                : 'Services de cargo aérien professionnels avec tarifs compétitifs et livraison fiable vers le Mali'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'Air Freight Destination' : 'Destination Fret Aérien'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {isEn 
                ? 'Direct and connecting flights to Bamako, Mali through our partner airlines'
                : 'Vols directs et avec correspondance vers Bamako, Mali via nos compagnies aériennes partenaires'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {dest.city}, {dest.country}
                  </h3>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {isEn ? 'Delivery time' : 'Délai de livraison'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {dest.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn ? 'Ready to Ship by Air?' : 'Prêt à Expédier par Avion?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? 'Get your air freight quote in seconds. Fast, reliable delivery to Bamako through our trusted partners.'
                : 'Obtenez votre devis fret aérien en quelques secondes. Livraison rapide et fiable à Bamako via nos partenaires de confiance.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/calculateur`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {isEn ? 'Calculate Cost' : 'Calculer le Coût'}
              </Link>
              <Link
                href={`/${locale}/tarifs`}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors"
              >
                {isEn ? 'View Pricing' : 'Voir les Tarifs'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

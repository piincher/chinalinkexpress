/**
 * Sea Freight Page Component
 * 
 * Comprehensive sea freight service page with SEO-optimized content.
 */

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Ship, Clock, Package, DollarSign, Container, Phone } from 'lucide-react';
import Link from 'next/link';

interface Props {
  locale: string;
}

export function SeaFreightPage({ locale }: Props) {
  const isEn = locale === 'en';

  const features = [
    {
      icon: DollarSign,
      title: isEn ? 'Economical Rates' : 'Tarifs Économiques',
      desc: isEn ? 'Up to 70% cheaper than air freight for large volumes' : 'Jusqu\'à 70% moins cher que le fret aérien pour gros volumes',
    },
    {
      icon: Container,
      title: isEn ? 'FCL & LCL Options' : 'Options FCL & LCL',
      desc: isEn ? 'Full container load or less than container load consolidation' : 'Conteneur complet ou groupage partiel',
    },
    {
      icon: Package,
      title: isEn ? 'All Cargo Types' : 'Tous Types de Cargo',
      desc: isEn ? 'Furniture, machinery, vehicles, and bulk goods' : 'Meubles, machines, véhicules et marchandises en vrac',
    },
    {
      icon: Clock,
      title: isEn ? 'Regular Departures' : 'Départs Réguliers',
      desc: isEn ? 'Weekly sailings from Shanghai, Shenzhen, Guangzhou' : 'Départs hebdomadaires de Shanghai, Shenzhen, Guangzhou',
    },
  ];

  const routes = [
    { origin: 'Shanghai', destination: 'Lagos', duration: '45-60 days', carrier: 'MSC' },
    { origin: 'Shenzhen', destination: 'Dakar', duration: '45-60 days', carrier: 'CMA CGM' },
    { origin: 'Guangzhou', destination: 'Abidjan', duration: '45-60 days', carrier: 'Maersk' },
    { origin: 'Ningbo', destination: 'Tema', duration: '50-65 days', carrier: 'Evergreen' },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 mb-6">
              <Ship className="w-5 h-5" />
              <span>{isEn ? 'Economical Sea Freight' : 'Fret Maritime Économique'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {isEn 
                ? 'Sea Freight from China to Africa' 
                : 'Fret Maritime de la Chine vers l\'Afrique'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {isEn 
                ? 'Cost-effective ocean shipping for large volumes. FCL and LCL options available. Delivery in 45-75 days.'
                : 'Transport maritime économique pour gros volumes. Options FCL et LCL disponibles. Livraison en 45-75 jours.'}
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

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'Why Choose Sea Freight?' : 'Pourquoi Choisir le Fret Maritime?'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {isEn 
                ? 'The most economical solution for shipping large volumes from China to Africa'
                : 'La solution la plus économique pour expédier de gros volumes de la Chine vers l\'Afrique'}
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
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-cyan-600" />
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

      {/* Routes Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'Popular Shipping Routes' : 'Routes Maritimes Populaires'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {isEn 
                ? 'Direct and transshipment services to major African ports'
                : 'Services directs et avec transbordement vers les grands ports africains'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-6 py-4 text-left text-[var(--text-primary)] font-semibold">
                    {isEn ? 'Origin' : 'Origine'}
                  </th>
                  <th className="px-6 py-4 text-left text-[var(--text-primary)] font-semibold">
                    {isEn ? 'Destination' : 'Destination'}
                  </th>
                  <th className="px-6 py-4 text-left text-[var(--text-primary)] font-semibold">
                    {isEn ? 'Carrier' : 'Compagnie'}
                  </th>
                  <th className="px-6 py-4 text-left text-[var(--text-primary)] font-semibold">
                    {isEn ? 'Duration' : 'Durée'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route, index) => (
                  <tr key={index} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{route.origin}</td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{route.destination}</td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{route.carrier}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                        {route.duration}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn ? 'Ship by Sea, Save Big' : 'Expédiez par Mer, Économisez'}
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? 'Perfect for furniture, machinery, and large shipments. Get your quote today!'
                : 'Parfait pour meubles, machines et gros envois. Obtenez votre devis aujourd\'hui!'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/calculateur`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {isEn ? 'Calculate CBM Cost' : 'Calculer Coût CBM'}
              </Link>
              <Link
                href={`/${locale}/tarifs`}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors"
              >
                {isEn ? 'View Sea Freight Rates' : 'Voir Tarifs Maritime'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

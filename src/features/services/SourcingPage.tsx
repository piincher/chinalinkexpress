/**
 * Sourcing Page Component
 * 
 * Comprehensive sourcing service page with SEO-optimized content.
 */

'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Search, CheckCircle, CreditCard, Truck, Phone, Shield } from 'lucide-react';
import Link from 'next/link';

interface Props {
  locale: string;
}

export function SourcingPage({ locale }: Props) {
  const isEn = locale === 'en';
  const frenchContentLocale = 'fr';

  const platforms = [
    { name: 'Alibaba', desc: isEn ? 'B2B wholesale platform' : 'Plateforme B2B en gros', color: 'bg-orange-500' },
    { name: '1688', desc: isEn ? 'Chinese domestic market' : 'Marché domestique chinois', color: 'bg-blue-500' },
    { name: 'Taobao', desc: isEn ? 'Retail marketplace' : 'Marché de détail', color: 'bg-red-500' },
    { name: 'Tmall', desc: isEn ? 'Brand products' : 'Produits de marque', color: 'bg-red-600' },
  ];

  const services = [
    {
      icon: Search,
      title: isEn ? 'Supplier Search' : 'Recherche Fournisseurs',
      desc: isEn 
        ? 'We find reliable suppliers on Alibaba, 1688, Taobao based on your requirements'
        : 'Nous trouvons des fournisseurs fiables sur Alibaba, 1688, Taobao selon vos besoins',
    },
    {
      icon: CheckCircle,
      title: isEn ? 'Verification' : 'Vérification',
      desc: isEn 
        ? 'Supplier background checks, factory audits, and certification verification'
        : 'Vérification des antécédents, audits d\'usine et vérification des certifications',
    },
    {
      icon: ShoppingCart,
      title: isEn ? 'Purchase Management' : 'Gestion des Achats',
      desc: isEn 
        ? 'Negotiation, order placement, and coordination with suppliers'
        : 'Négociation, passation de commandes et coordination avec les fournisseurs',
    },
    {
      icon: Shield,
      title: isEn ? 'Quality Control' : 'Contrôle Qualité',
      desc: isEn 
        ? 'Pre-shipment inspection, product testing, and photo documentation'
        : 'Inspection avant expédition, tests produits et documentation photo',
    },
    {
      icon: CreditCard,
      title: isEn ? 'Payment Processing' : 'Traitement Paiement',
      desc: isEn 
        ? 'Secure payments via Alipay, WeChat Pay, bank transfer on your behalf'
        : 'Paiements sécurisés via Alipay, WeChat Pay, virement bancaire pour vous',
    },
    {
      icon: Truck,
      title: isEn ? 'Shipping Integration' : 'Intégration Expédition',
      desc: isEn 
        ? 'Consolidation with your other shipments for cost-effective delivery'
        : 'Consolidation avec vos autres envois pour une livraison économique',
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 mb-6">
              <ShoppingCart className="w-5 h-5" />
              <span>{isEn ? 'China Sourcing Agent' : 'Agent Sourcing Chine'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {isEn 
                ? 'China Sourcing Agent for Mali Importers' 
                : 'Agent sourcing Chine pour le Mali'}
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              {isEn 
                ? 'Your China sourcing agent for Mali and Bamako. We buy from Alibaba, 1688 and Taobao, verify suppliers, process payments, inspect goods, consolidate parcels, and ship by air or sea.'
                : 'Votre agent sourcing en Chine pour le Mali et Bamako. Nous achetons sur Alibaba, 1688 et Taobao, vérifions les fournisseurs, gérons le paiement, inspectons les marchandises, consolidons les colis et expédions par avion ou par mer.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/8618851725957"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-400 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                {isEn ? 'Start Sourcing Now' : 'Commencer à Sourcer'}
              </a>
              <Link
                href={`/${frenchContentLocale}/services/verification-fournisseur-chine`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                {isEn ? 'Verify a Supplier' : 'Vérifier un Fournisseur'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mali Importers Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                {isEn ? 'Built for Mali importers buying in China' : 'Pensé pour les importateurs maliens qui achètent en Chine'}
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                {isEn
                  ? 'Most Mali importers do not only need a shipper. They need someone who can understand a supplier quote, pay in China, check the goods, combine multiple purchases, and choose the right freight route to Bamako.'
                  : 'La plupart des importateurs maliens n’ont pas seulement besoin d’un transporteur. Ils ont besoin d’un partenaire qui comprend le devis fournisseur, paie en Chine, contrôle la marchandise, regroupe plusieurs achats et choisit la bonne route de fret vers Bamako.'}
              </p>
            </div>
            <div className="grid gap-4">
              {[
                isEn ? 'Alibaba supplier search and negotiation' : 'Recherche et négociation fournisseur Alibaba',
                isEn ? '1688 purchasing with China-side payment support' : 'Achat 1688 avec paiement côté Chine',
                isEn ? 'Pre-shipment photos and quality control' : 'Photos et contrôle qualité avant expédition',
                isEn ? 'Air or sea freight to Bamako based on margin' : 'Fret aérien ou maritime vers Bamako selon votre marge',
              ].map((item) => (
                <div key={item} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-[var(--text-secondary)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'We Source From' : 'Nous Sourçons Sur'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {isEn 
                ? 'All major Chinese e-commerce platforms'
                : 'Toutes les grandes plateformes e-commerce chinoises'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6 text-center"
              >
                <div className={`w-16 h-16 ${platform.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-xl">{platform.name[0]}</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {platform.name}
                </h3>
                <p className="text-[var(--text-secondary)]">{platform.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'Complete Sourcing Services' : 'Services de Sourcing Complets'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {isEn 
                ? 'From supplier search to delivery at your door, we handle everything'
                : 'De la recherche de fournisseurs à la livraison chez vous, nous gérons tout'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {service.title}
                </h3>
                <p className="text-[var(--text-secondary)]">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
            {isEn ? 'Secure the full import chain' : 'Sécurisez toute la chaîne d’import'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { href: `/${frenchContentLocale}/services/paiement-fournisseur-chine`, label: isEn ? 'Supplier payment' : 'Paiement fournisseur chinois' },
              { href: `/${frenchContentLocale}/services/verification-fournisseur-chine`, label: isEn ? 'Supplier verification' : 'Vérification fournisseur Chine' },
              { href: `/${locale}/routes/china-to-mali`, label: isEn ? 'China to Mali freight' : 'Fret Chine-Mali' },
              { href: `/${frenchContentLocale}/guides/importer-de-chine-au-mali`, label: isEn ? 'Import guide' : 'Guide importer de Chine au Mali' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 font-semibold text-purple-600 hover:bg-purple-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'How It Works' : 'Comment Ça Marche'}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: isEn ? 'Send Request' : 'Envoyez Votre Demande', desc: isEn ? 'Share product links or descriptions' : 'Partagez les liens ou descriptions' },
              { step: '2', title: isEn ? 'We Source' : 'Nous Sourçons', desc: isEn ? 'We find best suppliers and prices' : 'Nous trouvons les meilleurs fournisseurs' },
              { step: '3', title: isEn ? 'You Confirm' : 'Vous Confirmez', desc: isEn ? 'Review and approve the order' : 'Examinez et approuvez la commande' },
              { step: '4', title: isEn ? 'We Deliver' : 'Nous Livrons', desc: isEn ? 'Quality check and ship to you' : 'Contrôle qualité et expédition' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn ? 'Ready to Source from China?' : 'Prêt à Sourcer en Chine?'}
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? 'Join hundreds of African businesses buying from China with our help'
                : 'Rejoignez des centaines d\'entreprises africaines qui achètent en Chine avec notre aide'}
            </p>
            <a
              href="https://wa.me/8618851725957"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              {isEn ? 'Get Your Free Quote' : 'Obtenez Votre Devis Gratuit'}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

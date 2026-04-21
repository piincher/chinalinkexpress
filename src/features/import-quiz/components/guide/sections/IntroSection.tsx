/**
 * IntroSection Component
 * 
 * Introduction section explaining why import from China,
 * common pitfalls, and building trust with ChinaLink.
 */

'use client';

import { motion } from 'framer-motion';
import {
  TrendingDown,
  Package,
  Globe,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Building2,
  HeadphonesIcon,
  Clock,
} from 'lucide-react';

interface IntroSectionProps {
  className?: string;
}

const benefits = [
  {
    icon: TrendingDown,
    title: 'Prix compétitifs',
    description: 'Économisez 30-50% sur vos achats en important directement des fabricants chinois.',
  },
  {
    icon: Package,
    title: 'Large choix de produits',
    description: 'Accédez à des millions de produits dans toutes les catégories : mode, électronique, maison, etc.',
  },
  {
    icon: Globe,
    title: 'Marché mondial',
    description: 'La Chine est l\'usine du monde. Trouvez des produits introuvables localement.',
  },
];

const pitfalls = [
  {
    title: 'Faux fournisseurs',
    description: 'De nombreux intermédiaires se font passer pour des fabricants.',
  },
  {
    title: 'Qualité incertaine',
    description: 'Les photos ne reflètent pas toujours la réalité du produit.',
  },
  {
    title: 'Arnaques au paiement',
    description: 'Payer à l\'étranger comporte des risques si le fournisseur n\'est pas vérifié.',
  },
  {
    title: 'Problèmes douaniers',
    description: 'Une documentation incomplète peut bloquer votre marchandise.',
  },
];

const trustFactors = [
  {
    icon: Building2,
    title: 'Bureau local à Bamako',
    description: 'Un interlocuteur présent au Mali pour vous accompagner.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support en français',
    description: 'Communication claire, sans barrière de la langue.',
  },
  {
    icon: ShieldCheck,
    title: 'Fournisseurs vérifiés',
    description: 'Nous inspectons et validons vos fournisseurs avant expédition.',
  },
  {
    icon: Clock,
    title: 'Suivi en temps réel',
    description: 'Suivez vos colis de la Chine jusqu\'à Bamako.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function IntroSection({ className }: IntroSectionProps) {
  return (
    <section className={`py-16 px-8 ${className || ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Pourquoi Importer de Chine ?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            L\'importation de Chine offre d\'énormes opportunités pour les entrepreneurs maliens.
            Découvrez les avantages et comment éviter les pièges.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pitfalls Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Attention aux Pièges
            </h3>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
            <p className="text-slate-700 mb-6">
              L\'importation comporte des risques. Voici les erreurs les plus courantes :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {pitfalls.map((pitfall) => (
                <div
                  key={pitfall.title}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">
                      {pitfall.title}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {pitfall.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Building */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              ChinaLink Express, Votre Partenaire de Confiance
            </h3>
            <p className="text-slate-600">
              Nous vous accompagnons à chaque étape pour importer en toute sécurité.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {trustFactors.map((factor) => (
              <motion.div
                key={factor.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <factor.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    {factor.title}
                  </h4>
                  <p className="text-slate-600 text-sm">
                    {factor.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-semibold">Notre Engagement</span>
            </div>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Plus de 500 entrepreneurs maliens nous font confiance pour leurs imports.
              Rejoignez-les et développez votre business avec sérénité.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default IntroSection;

/**
 * StepsSection Component
 * 
 * The 5 steps of importing from China as expandable/collapsible cards.
 * Each step has title, description, and action items with icons.
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Factory,
  ClipboardCheck,
  Handshake,
  Plane,
  ChevronDown,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Star,
  Shield,
  MessageSquare,
  FileText,
  Truck,
} from 'lucide-react';

interface StepsSectionProps {
  className?: string;
}

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  tips: string[];
  actions: {
    icon: React.ElementType;
    text: string;
  }[];
  warning?: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Choisir son produit',
    subtitle: 'La fondation de votre succès',
    icon: Search,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Le choix du produit est la décision la plus importante. Un bon produit se vend tout seul, un mauvais reste en stock.',
    tips: [
      'Analysez la demande locale avant de commander',
      'Commencez par des produits légers et peu volumineux',
      'Évitez les produits fragiles pour vos premiers imports',
      'Vérifiez les réglementations douanières du Mali',
    ],
    actions: [
      { icon: Lightbulb, text: 'Faites une étude de marché simple' },
      { icon: Search, text: 'Observez ce qui se vend bien chez vos concurrents' },
      { icon: CheckCircle2, text: 'Choisissez 2-3 produits maximum pour commencer' },
    ],
    warning: 'Ne commandez jamais un produit que vous n\'avez pas testé sur le marché.',
  },
  {
    id: 2,
    title: 'Trouver un fournisseur',
    subtitle: 'La clé de la qualité',
    icon: Factory,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    description: 'Un bon fournisseur est un partenaire de long terme. Prenez le temps de bien choisir.',
    tips: [
      'Utilisez Alibaba, Made-in-China, ou Global Sources',
      'Privilégiez les fournisseurs "Gold Supplier" depuis 3+ ans',
      'Vérifiez les certifications du fabricant',
      'Demandez des références de clients africains',
    ],
    actions: [
      { icon: Search, text: 'Contactez au moins 5 fournisseurs différents' },
      { icon: FileText, text: 'Demandez des échantillons avant toute commande' },
      { icon: Shield, text: 'Vérifiez l\'existence réelle de l\'usine' },
    ],
    warning: 'Méfiez-vous des prix trop bas : c\'est souvent de la mauvaise qualité ou une arnaque.',
  },
  {
    id: 3,
    title: 'Vérifier et tester',
    subtitle: 'Ne sautez pas cette étape !',
    icon: ClipboardCheck,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    description: 'La vérification est cruciale. Un échantillon défectueux = commande défectueuse.',
    tips: [
      'Commandez toujours un échantillon avant la production en masse',
      'Testez l\'échantillon dans des conditions réelles d\'utilisation',
      'Vérifiez l\'emballage et l\'étiquetage',
      'Prenez des photos/vidéos de l\'échantillon reçu',
    ],
    actions: [
      { icon: Star, text: 'Évaluez la qualité de fabrication' },
      { icon: Shield, text: 'Vérifiez les matériaux utilisés' },
      { icon: CheckCircle2, text: 'Confirmez que le produit correspond à vos attentes' },
    ],
    warning: 'Ne payez JAMAIS 100% avant la livraison. 30% à la commande, 70% à la livraison.',
  },
  {
    id: 4,
    title: 'Négocier et commander',
    subtitle: 'Sécurisez votre transaction',
    icon: Handshake,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'La négociation est un art. Soyez respectueux mais fermes sur vos exigences.',
    tips: [
      'Négociez le prix, mais aussi la qualité et les délais',
      'Demandez toujours un contrat écrit en anglais',
      'Utilisez Alibaba Trade Assurance ou un paiement sécurisé',
      'Précisez TOUJOURS les Incoterms (FOB, CIF, etc.)',
    ],
    actions: [
      { icon: FileText, text: 'Rédigez un contrat clair avec toutes les spécifications' },
      { icon: Shield, text: 'Utilisez un paiement sécurisé (pas de Western Union!)' },
      { icon: MessageSquare, text: 'Confirmez chaque détail par écrit' },
    ],
    warning: 'Ne faites pas confiance aux promesses verbales. Tout doit être écrit.',
  },
  {
    id: 5,
    title: 'Expédier avec ChinaLink',
    subtitle: 'La partie facile !',
    icon: Plane,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Une fois votre commande prête, nous nous occupons de tout. Fret aérien ou maritime, c\'est vous qui choisissez.',
    tips: [
      'Fret aérien : 10-14 jours, idéal pour les petites quantités',
      'Fret maritime : 45-60 jours, plus économique pour les volumes',
      'Nous gérons la douane chinoise et maliennes',
      'Suivi en temps réel de votre marchandise',
    ],
    actions: [
      { icon: FileText, text: 'Fournissez-nous la facture commerciale' },
      { icon: Truck, text: 'Choisissez votre mode de transport' },
      { icon: CheckCircle2, text: 'Récupérez votre colis à notre bureau de Bamako' },
    ],
  },
];

function StepCard({ step, isOpen, onToggle }: {
  step: Step;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: step.id * 0.1 }}
      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
    >
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"
      >
        {/* Step Number */}
        <div className={`w-12 h-12 rounded-xl ${step.bgColor} ${step.color} flex items-center justify-center flex-shrink-0`}>
          {/* @ts-ignore */}
          <step.icon className="w-6 h-6" />
        </div>

        {/* Title & Subtitle */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${step.color} uppercase tracking-wider`}>
              Étape {step.id}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {step.title}
          </h3>
          <p className="text-sm text-slate-500">
            {step.subtitle}
          </p>
        </div>

        {/* Toggle Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-slate-100">
              {/* Description */}
              <p className="text-slate-600 mb-6 leading-relaxed">
                {step.description}
              </p>

              {/* Tips */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Conseils clés
                </h4>
                <ul className="space-y-2">
                  {step.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className={`w-1.5 h-1.5 rounded-full ${step.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Actions à entreprendre
                </h4>
                <div className="space-y-2">
                  {step.actions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50"
                    >
                      {/* @ts-ignore */}
                      <action.icon className={`w-5 h-5 ${step.color}`} />
                      <span className="text-sm text-slate-700">{action.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning */}
              {step.warning && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-100">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Attention : </span>
                    {step.warning}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function StepsSection({ className }: StepsSectionProps) {
  const [openStep, setOpenStep] = useState<number | null>(1);

  const handleToggle = (stepId: number) => {
    setOpenStep(openStep === stepId ? null : stepId);
  };

  return (
    <section className={`py-16 px-8 ${className || ''}`}>
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Les 5 Étapes pour Importer avec Succès
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Suivez ces étapes méthodiquement pour importer en toute sécurité.
            Cliquez sur chaque étape pour voir les détails.
          </p>
        </motion.div>

        {/* Steps List */}
        <div className="space-y-4">
          {steps.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              isOpen={openStep === step.id}
              onToggle={() => handleToggle(step.id)}
            />
          ))}
        </div>

        {/* Summary Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl text-white text-center"
        >
          <p className="text-lg font-medium mb-2">
            Besoin d\'aide pour l\'une de ces étapes ?
          </p>
          <p className="text-slate-300 text-sm">
            Notre équipe est là pour vous accompagner. Contactez-nous sur WhatsApp
            pour une consultation gratuite.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default StepsSection;

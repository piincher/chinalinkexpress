/**
 * ChecklistSection Component
 * 
 * Personalized readiness checklist based on quiz answers.
 * Shows completed items, score-based message, and WhatsApp CTA.
 */

'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  MessageCircle,
  Award,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';
import { LeadCategory } from '@/features/import-quiz/types';
import { Button } from '@/components/common/button/Button';

interface ChecklistSectionProps {
  score: number;
  category: LeadCategory;
  answers: Record<number, string>;
  whatsappNumber: string;
  className?: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  condition: (answers: Record<number, string>) => boolean;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 'supplier',
    text: 'Fournisseur identifié en Chine',
    condition: (answers) => answers[1] === 'yes' || answers[1] === 'several',
  },
  {
    id: 'budget',
    text: 'Budget défini pour l\'importation',
    condition: (answers) => ['>5m', '2m-5m', '500k-2m', '<500k'].includes(answers[2]),
  },
  {
    id: 'product',
    text: 'Catégorie de produits choisie',
    condition: (answers) => !!answers[3],
  },
  {
    id: 'experience',
    text: 'Expérience en importation',
    condition: (answers) => ['expert', 'some', 'other_countries'].includes(answers[4]),
  },
  {
    id: 'timeline',
    text: 'Échéance définie',
    condition: (answers) => ['2weeks', 'month'].includes(answers[5]),
  },
  {
    id: 'verification',
    text: 'Compte rendu de vérification fournisseur',
    condition: (answers) => answers[1] === 'yes',
  },
  {
    id: 'samples',
    text: 'Commande d\'échantillons planifiée',
    condition: (answers) => answers[1] === 'yes' || answers[1] === 'several',
  },
  {
    id: 'logistics',
    text: 'Mode de transport choisi',
    condition: (answers) => answers[2] === '>5m' || answers[2] === '2m-5m',
  },
];

const categoryMessages = {
  hot: {
    title: '🎉 Vous êtes prêt !',
    message: 'Votre score indique que vous avez fait le plus gros du travail de préparation. Il est temps de passer à l\'action !',
    ctaText: 'Obtenir mon devis maintenant',
    ctaVariant: 'primary' as const,
    tip: 'Avec votre niveau de préparation, vous pouvez envisager une première commande dans les 2 semaines.',
  },
  warm: {
    title: '⚡ Vous êtes presque prêt !',
    message: 'Vous avez une bonne base, mais quelques points méritent encore votre attention avant de commander.',
    ctaText: 'Discuter de mes prochaines étapes',
    ctaVariant: 'secondary' as const,
    tip: 'Concentrez-vous sur les cases non cochées ci-dessous. Une fois ces points réglés, vous serez prêt !',
  },
  cold: {
    title: '📚 Continuez votre préparation',
    message: 'Pas d\'inquiétude ! Chaque expert a commencé un jour. Suivez ce guide étape par étape.',
    ctaText: 'Parler à un conseiller',
    ctaVariant: 'outline' as const,
    tip: 'Commencez par identifier un fournisseur fiable. C\'est la base de tout import réussi.',
  },
};

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const percentage = (completed / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">
          Progression de votre préparation
        </span>
        <span className="text-sm font-bold text-slate-900">
          {completed}/{total}
        </span>
      </div>
      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            percentage >= 70
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
              : percentage >= 40
              ? 'bg-gradient-to-r from-amber-500 to-orange-500'
              : 'bg-gradient-to-r from-blue-500 to-sky-500'
          }`}
        />
      </div>
    </div>
  );
}

export function ChecklistSection({
  score,
  category,
  answers,
  whatsappNumber,
  className,
}: ChecklistSectionProps) {
  const message = categoryMessages[category];
  
  // Calculate completed items
  const completedItems = checklistItems.filter((item) =>
    item.condition(answers)
  );
  const completedCount = completedItems.length;
  const totalCount = checklistItems.length;

  // Generate WhatsApp message based on category
  const getWhatsAppMessage = () => {
    const baseMessage = `Bonjour ChinaLink! J'ai terminé le quiz d'import et j'ai obtenu ${score}/100. `;
    switch (category) {
      case 'hot':
        return `${baseMessage}Je suis prêt à importer. Pouvez-vous me faire un devis ?`;
      case 'warm':
        return `${baseMessage}J'ai encore quelques questions avant de commander. Pouvez-vous m'aider ?`;
      case 'cold':
        return `${baseMessage}Je débute dans l'import. Auriez-vous des conseils pour commencer ?`;
      default:
        return baseMessage;
    }
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    getWhatsAppMessage()
  )}`;

  return (
    <section className={`py-16 px-8 ${className || ''}`}>
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Votre Checklist Personnalisée
          </h2>
          <p className="text-lg text-slate-600">
            Basée sur vos réponses au quiz, voici ce que vous avez déjà accompli
            et ce qu\'il reste à faire.
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`p-8 rounded-2xl mb-8 ${
            category === 'hot'
              ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100'
              : category === 'warm'
              ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100'
              : 'bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100'
          }`}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl ${
              category === 'hot'
                ? 'bg-emerald-500'
                : category === 'warm'
                ? 'bg-amber-500'
                : 'bg-blue-500'
            }`}>
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {message.title}
              </h3>
              <p className="text-slate-600">{message.message}</p>
            </div>
          </div>

          <ProgressBar completed={completedCount} total={totalCount} />

          {/* Tip Box */}
          <div className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">{message.tip}</p>
          </div>
        </motion.div>

        {/* Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Points de préparation
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {checklistItems.map((item, index) => {
              const isCompleted = item.condition(answers);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className={`flex-shrink-0 ${isCompleted ? 'text-emerald-500' : 'text-slate-300'}`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`flex-1 ${isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                    {item.text}
                  </span>
                  {isCompleted && (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      Fait
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl text-white"
        >
          <h3 className="text-xl font-bold mb-3">
            Prêt à passer à l\'action ?
          </h3>
          <p className="text-slate-300 mb-6 max-w-md mx-auto">
            Notre équipe est disponible sur WhatsApp pour répondre à vos questions
            et vous accompagner dans votre premier import.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <Button
              variant={message.ctaVariant}
              size="lg"
              leftIcon={<MessageCircle className="w-5 h-5" />}
              className={category === 'hot' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              {message.ctaText}
            </Button>
          </a>

          <p className="text-slate-400 text-sm mt-4">
            Réponse garantie sous 2 heures ouvrables
          </p>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          Ce guide a été généré automatiquement basé sur vos réponses au quiz.
          Les recommandations sont personnalisées pour votre situation.
        </motion.p>
      </div>
    </section>
  );
}

export default ChecklistSection;

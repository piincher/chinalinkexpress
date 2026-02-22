/**
 * Pricing FAQ
 * 
 * Frequently asked questions specific to pricing and shipping.
 * Part of the pricing feature.
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  hasList?: boolean;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Les tarifs peuvent-ils être revus à la baisse ?",
    answer: "Non, nos tarifs sont fixes dans la majorité des cas. Néanmoins dans certains cas, nous pouvons appliquer des réductions à notre discrétion."
  },
  {
    question: "Les tarifs peuvent-ils être revus à la hausse ?",
    answer: "Oui lorsque certains articles requièrent un dédouanement particulier. Dans ce cas, le propriétaire du colis peut être amené à faire un complément pour supporter la procédure de dédouanement additionnelle."
  },
  {
    question: "Le prix du fret doit-il être payé à l'avance ?",
    answer: "Généralement, le prix du fret doit être payé à l'arrivée du colis. Néanmoins dans certains cas, une avance ou même un règlement entier peut être requis en fonction du profil du propriétaire ou des caractéristiques du colis à transporter."
  },
  {
    question: "A l'arrivée de mes marchandises dois je encore dédouaner ?",
    answer: "Non, nos tarifs incluent déjà les frais de douane. Néanmoins dans certains cas particuliers, un dédouanement peut nécessiter des étapes supplémentaires de la part du propriétaire du colis transporté."
  },
  {
    question: "Quelles garanties offrez-vous en cas de perte ou de dommage ?",
    answer: "Nous avons une assurance couvrant à 100% les cas de dommages et de perte. Par contre, l'emballage et le conditionnement des articles fragiles sont de la responsabilité du fournisseur ou du propriétaire du colis. En cas de dommages dû à un conditionnement inadéquat, nous excluons notre responsabilité."
  },
  {
    question: "Il y a t il des articles interdits ?",
    hasList: true,
    answer: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Les marchandises suivantes ne sont en aucun cas acceptées:
        </p>
        <ul className="space-y-2">
          {[
            "Animaux",
            "Antiquités (cassables et/ou fragiles)",
            "Amiante",
            "Lingots",
            "Monnaie",
            "Armes à feu, leurs parties et munitions",
            "Fourrures",
            "Matières dangereuses et combustibles (telles que définies dans les règlements de l'IATA)",
            "Restes humains, y compris les cendres",
            "Métaux précieux et pierres précieuses",
            "Stupéfiants (illégaux)",
            "Biens dont le transport est interdit par toute loi, réglementation et statut d'un gouvernement fédéral, étatique ou local d'un pays vers ou par lequel l'envoi peut être transporté",
            "Dans certains pays telles que la Chine, les batteries lithium, les powerbanks, les drones, les cigarettes électroniques, briquet avec gaz, briquet électronique,les produits dangereux, de la contrebande,les produits sous forme spray (insecticides) allume feu ou gaz et autres sont interdits de vol à cause des risques d'incendie et autres risques de sécurité."
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-red-500" />
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
        <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Cette liste n'est pas exhaustive. Contactez-nous pour vérifier si votre article peut être expédié.
          </p>
        </div>
      </div>
    )
  }
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 mb-4">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Questions fréquentes
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Nous répondons à vos questions
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={cn(
                  'border rounded-xl overflow-hidden transition-all duration-300',
                  openIndex === index
                    ? 'border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        {item.hasList ? (
                          item.answer
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {item.answer as string}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

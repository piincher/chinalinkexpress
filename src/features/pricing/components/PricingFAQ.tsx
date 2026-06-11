/**
 * Pricing FAQ
 * 
 * Frequently asked questions specific to pricing and shipping.
 * Part of the pricing feature.
 */

'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  hasList?: boolean;
}

type FAQSourceItem = {
  question: string;
  answer?: string;
  hasList?: boolean;
};

const FAQ_ITEMS_FR: FAQSourceItem[] = [
  {
    question: "Les tarifs peuvent-ils être revus à la baisse ?",
    answer: "Pour les importateurs réguliers avec des volumes mensuels supérieurs à 100 kg, contactez-nous pour un tarif entreprise dédié. Nous proposons des conditions préférentielles pour les clients fidèles et les entreprises avec des expéditions fréquentes.",
  },
  {
    question: "Les tarifs peuvent-ils être revus à la hausse ?",
    answer: "Oui lorsque certains articles requièrent un dédouanement particulier. Dans ce cas, le propriétaire du colis peut être amené à faire un complément pour supporter la procédure de dédouanement additionnelle.",
  },
  {
    question: "Le prix du fret doit-il être payé à l'avance ?",
    answer: "Généralement, le prix du fret doit être payé à l'arrivée du colis. Néanmoins dans certains cas, une avance ou même un règlement entier peut être requis en fonction du profil du propriétaire ou des caractéristiques du colis à transporter.",
  },
  {
    question: "A l'arrivée de mes marchandises dois je encore dédouaner ?",
    answer: "Non, nos tarifs incluent déjà les frais de douane. Néanmoins dans certains cas particuliers, un dédouanement peut nécessiter des étapes supplémentaires de la part du propriétaire du colis transporté.",
  },
  {
    question: "Quelles garanties offrez-vous en cas de perte ou de dommage ?",
    answer: "Nous avons une assurance couvrant à 100% les cas de dommages et de perte. Par contre, l'emballage et le conditionnement des articles fragiles sont de la responsabilité du fournisseur ou du propriétaire du colis. En cas de dommages dû à un conditionnement inadéquat, nous excluons notre responsabilité.",
  },
  {
    question: "Il y a t il des articles interdits ?",
    hasList: true,
  },
  {
    question: "Quand dois-je payer ?",
    answer: "Vous payez uniquement après avoir reçu et inspecté vos marchandises. Aucun acompte requis.",
  },
];

const FAQ_ITEMS_EN: FAQSourceItem[] = [
  {
    question: 'Can freight rates be reduced?',
    answer: 'For regular importers with monthly volume above 100 kg, contact us for a dedicated business rate. We offer preferential conditions for loyal customers and frequent shipments.',
  },
  {
    question: 'Can freight rates increase?',
    answer: 'Yes, when some items require special customs or handling procedures. In that case, the shipment owner may need to cover the additional procedure.',
  },
  {
    question: 'Does freight have to be paid in advance?',
    answer: 'In many cases, freight is paid on arrival. Some profiles, products or shipment values may require an advance or full payment before transport.',
  },
  {
    question: 'Do I still handle customs when my goods arrive?',
    answer: 'Standard customs coordination is included in our current rates. Special products may require additional steps, documents or fees from the shipment owner.',
  },
  {
    question: 'What guarantee do you offer for loss or damage?',
    answer: 'We provide coverage for proven loss or damage cases. Fragile-item packaging remains the supplier or shipment owner responsibility; damage caused by inadequate packaging may be excluded.',
  },
  {
    question: 'Are some items prohibited?',
    hasList: true,
  },
  {
    question: 'When do I pay?',
    answer: 'You usually pay after receiving and inspecting your goods. Some shipments may require an advance depending on risk, value or product category.',
  },
];

const prohibitedItems = {
  fr: [
    "Animaux",
    "Antiquités (cassables et/ou fragiles)",
    "Amiante",
    "Lingots",
    "Monnaie",
    "Armes à feu, leurs parties et munitions",
    "Fourrures",
    "Matières dangereuses et combustibles",
    "Restes humains, y compris les cendres",
    "Métaux précieux et pierres précieuses",
    "Stupéfiants illégaux",
    "Biens dont le transport est interdit par la loi",
    "Batteries lithium, powerbanks, drones, cigarettes électroniques, briquets, sprays et articles dangereux selon les règles aériennes",
  ],
  en: [
    'Animals',
    'Antiques that are fragile or breakable',
    'Asbestos',
    'Bullion',
    'Currency',
    'Firearms, parts and ammunition',
    'Furs',
    'Dangerous or combustible goods',
    'Human remains, including ashes',
    'Precious metals and gemstones',
    'Illegal narcotics',
    'Goods prohibited by law in any transit or destination country',
    'Lithium batteries, power banks, drones, e-cigarettes, lighters, sprays and other risky items when airline rules prohibit them',
  ],
};

export function PricingFAQ() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = (isEn ? FAQ_ITEMS_EN : FAQ_ITEMS_FR).map((item) => ({
    ...item,
    answer:
      item.answer ??
      (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {isEn ? 'The following goods are not accepted:' : 'Les marchandises suivantes ne sont en aucun cas acceptées:'}
          </p>
          <ul className="space-y-2">
            {prohibitedItems[isEn ? 'en' : 'fr'].map((prohibitedItem, index) => (
              <motion.li
                key={prohibitedItem}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-red-500" />
                <span className="leading-relaxed">{prohibitedItem}</span>
              </motion.li>
            ))}
          </ul>
          <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              {isEn
                ? 'This list is not exhaustive. Contact us to verify whether your item can be shipped.'
                : "Cette liste n'est pas exhaustive. Contactez-nous pour vérifier si votre article peut être expédié."}
            </p>
          </div>
        </div>
      ),
  }));

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
            {isEn ? 'Frequently asked questions' : 'Questions fréquentes'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isEn ? 'Clear answers before you ship' : 'Nous répondons à vos questions'}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
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

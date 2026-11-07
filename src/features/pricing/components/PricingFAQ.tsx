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
import type { Locale } from '@/i18n/config';

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

const FAQ_ITEMS_ZH: FAQSourceItem[] = [
  {
    question: '价格可以下调吗？',
    answer: '对于每月货量超过 100 公斤的常客进口商，请联系我们获取专门的企业价格。我们为忠实客户和经常发货的企业提供优惠条件。',
  },
  {
    question: '价格可能上调吗？',
    answer: '可能，当某些物品需要特殊清关时。在这种情况下，包裹所有人可能需要补付费用，以承担额外的清关手续。',
  },
  {
    question: '运费必须预付吗？',
    answer: '一般来说，运费在包裹到达时支付。但在某些情况下，根据所有人的情况或货物的特点，可能需要预付部分或全部费用。',
  },
  {
    question: '货物到达时我还需要清关吗？',
    answer: '不需要，我们的价格已包含海关费用。但在某些特殊情况下，清关可能需要包裹所有人办理额外手续。',
  },
  {
    question: '发生丢失或损坏时你们提供什么保障？',
    answer: '我们有保险，100% 覆盖损坏和丢失的情况。但易碎物品的包装由供应商或包裹所有人负责。因包装不当造成的损坏，我们不承担责任。',
  },
  {
    question: '有禁运物品吗？',
    hasList: true,
  },
  {
    question: '我什么时候付款？',
    answer: '您只需在收到并检查货物后付款。无需定金。',
  },
];

const FAQ_ITEMS_AR: FAQSourceItem[] = [
  {
    question: 'هل يمكن خفض الأسعار؟',
    answer: 'للمستوردين المنتظمين بكميات شهرية تزيد على 100 كغ، تواصل معنا للحصول على سعر مخصص للشركات. نقدم شروطًا تفضيلية للعملاء الأوفياء والشركات ذات الشحنات المتكررة.',
  },
  {
    question: 'هل يمكن رفع الأسعار؟',
    answer: 'نعم، عندما تتطلب بعض السلع تخليصًا جمركيًا خاصًا. وفي هذه الحالة قد يُطلب من صاحب الطرد دفع مبلغ إضافي لتغطية الإجراء الجمركي الإضافي.',
  },
  {
    question: 'هل يجب دفع سعر الشحن مقدمًا؟',
    answer: 'يُدفع سعر الشحن عمومًا عند وصول الطرد. لكن في بعض الحالات قد يُطلب دفع مقدم أو المبلغ كاملًا حسب ملف صاحب الطرد أو خصائص البضاعة المنقولة.',
  },
  {
    question: 'هل يجب أن أخلّص جمركيًا عند وصول بضائعي؟',
    answer: 'لا، تشمل أسعارنا الرسوم الجمركية بالفعل. لكن في بعض الحالات الخاصة قد يتطلب التخليص خطوات إضافية من صاحب الطرد.',
  },
  {
    question: 'ما الضمانات التي تقدمونها في حالة الفقدان أو التلف؟',
    answer: 'لدينا تأمين يغطي بنسبة 100% حالات التلف والفقدان. لكن تغليف السلع الهشة وتعبئتها من مسؤولية المورد أو صاحب الطرد. وفي حالة التلف بسبب تغليف غير مناسب، لا نتحمل المسؤولية.',
  },
  {
    question: 'هل توجد سلع محظورة؟',
    hasList: true,
  },
  {
    question: 'متى أدفع؟',
    answer: 'تدفع فقط بعد استلام بضائعك وفحصها. لا حاجة إلى دفعة مقدمة.',
  },
];

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
  zh: [
    '动物',
    '古董（易碎和/或脆弱）',
    '石棉',
    '金银条',
    '货币',
    '枪支、枪支部件和弹药',
    '皮草',
    '危险和可燃物质',
    '人体遗骸，包括骨灰',
    '贵金属和宝石',
    '非法毒品',
    '法律禁止运输的物品',
    '根据航空规定的锂电池、移动电源、无人机、电子烟、打火机、喷雾和危险物品',
  ],
  ar: [
    'الحيوانات',
    'التحف (القابلة للكسر و/أو الهشة)',
    'الأسبستوس',
    'السبائك',
    'العملات',
    'الأسلحة النارية وأجزاؤها والذخيرة',
    'الفراء',
    'المواد الخطرة والقابلة للاشتعال',
    'الرفات البشرية، بما في ذلك الرماد',
    'المعادن الثمينة والأحجار الكريمة',
    'المخدرات غير القانونية',
    'السلع التي يحظر القانون نقلها',
    'بطاريات الليثيوم والبطاريات المتنقلة والطائرات المسيّرة والسجائر الإلكترونية والولاعات والبخاخات والمواد الخطرة حسب قواعد الطيران',
  ],
};

export function PricingFAQ() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = (isEn ? FAQ_ITEMS_EN : isZh ? FAQ_ITEMS_ZH : isAr ? FAQ_ITEMS_AR : FAQ_ITEMS_FR).map((item) => ({
    ...item,
    answer:
      item.answer ??
      (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {isEn ? 'The following goods are not accepted:' : isZh ? '以下货物在任何情况下都不接受：' : isAr ? 'لا تُقبل البضائع التالية في أي حال:' : 'Les marchandises suivantes ne sont en aucun cas acceptées:'}
          </p>
          <ul className="space-y-2">
            {prohibitedItems[(locale as Locale)].map((prohibitedItem, index) => (
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
                : isZh ? '此列表并不详尽。请联系我们核实您的物品能否运输。' : isAr ? 'هذه القائمة ليست شاملة. تواصل معنا للتحقق من إمكانية شحن سلعتك.' : "Cette liste n'est pas exhaustive. Contactez-nous pour vérifier si votre article peut être expédié."}
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
            {isEn ? 'Frequently asked questions' : isZh ? '常见问题' : isAr ? 'الأسئلة الشائعة' : 'Questions fréquentes'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isEn ? 'Clear answers before you ship' : isZh ? '我们解答您的问题' : isAr ? 'نجيب عن أسئلتك' : 'Nous répondons à vos questions'}
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

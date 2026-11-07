/**
 * Community Data
 *
 * Realistic discussion topics, stats, and categories for the ChinaLink
 * Community Hub. Data is static for now; can be replaced with API calls later.
 */

export interface CommunityTopic {
  id: string;
  title: string;
  titleFr: string;
  titleZh: string;
  titleAr: string;
  content: string;
  contentFr: string;
  contentZh: string;
  contentAr: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  category: string;
  categoryFr: string;
  categoryZh: string;
  categoryAr: string;
  replies: number;
  likes: number;
  createdAt: string;
  isPinned: boolean;
}

export interface CommunityStats {
  memberCount: number;
  activeTopics: number;
  dailyMessages: number;
  countriesRepresented: number;
}

export const communityStats: CommunityStats = {
  memberCount: 2400,
  activeTopics: 156,
  dailyMessages: 340,
  countriesRepresented: 18,
};

export const categories = [
  { id: 'all', label: 'All', labelFr: 'Tout', labelZh: '全部', labelAr: 'الكل' },
  { id: 'sourcing', label: 'Sourcing', labelFr: 'Sourcing', labelZh: '采购', labelAr: 'التوريد' },
  { id: 'shipping', label: 'Shipping', labelFr: 'Expédition', labelZh: '发货', labelAr: 'الشحن' },
  { id: 'customs', label: 'Customs', labelFr: 'Douane', labelZh: '海关', labelAr: 'الجمارك' },
  { id: 'scam-alert', label: 'Scam Alert', labelFr: 'Alerte Arnaque', labelZh: '诈骗提醒', labelAr: 'تنبيه احتيال' },
  { id: 'group-buy', label: 'Group Buy', labelFr: 'Achat Groupé', labelZh: '团购', labelAr: 'شراء جماعي' },
  { id: 'general', label: 'General', labelFr: 'Général', labelZh: '综合', labelAr: 'عام' },
];

export const categoryColors: Record<string, string> = {
  sourcing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  shipping: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  customs: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'scam-alert': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'group-buy': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  general: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

export const authorColors = [
  'bg-amber-500 text-white',
  'bg-emerald-500 text-white',
  'bg-blue-500 text-white',
  'bg-rose-500 text-white',
  'bg-violet-500 text-white',
  'bg-cyan-500 text-white',
  'bg-orange-500 text-white',
  'bg-teal-500 text-white',
  'bg-indigo-500 text-white',
  'bg-pink-500 text-white',
];

export const communityTopics: CommunityTopic[] = [
  {
    id: '1',
    title: 'Best suppliers for phone accessories on 1688',
    titleFr: 'Meilleurs fournisseurs accessoires téléphone sur 1688', titleZh: '1688 上最好的手机配件供应商', titleAr: 'أفضل موردي إكسسوارات الهاتف في 1688',
    content:
      'I have been sourcing phone cases, chargers, and screen protectors from 1688 for 6 months. Here is my verified list of 3 reliable suppliers with MOQs under 100pcs. Happy to share contact details via DM.',
    contentFr:
      "Je sors des accessoires téléphone (coques, chargeurs, protections écran) sur 1688 depuis 6 mois. Voici ma liste vérifiée de 3 fournisseurs fiables avec des MOQ sous 100 pièces. Je partage les contacts en privé.",
    contentZh: '我在 1688 采购手机配件（手机壳、充电器、屏幕保护膜）已有 6 个月。这是我核实过的 3 家可靠供应商，起订量都低于 100 件。联系方式私下分享。',
    contentAr: 'أورّد إكسسوارات الهاتف (الأغطية والشواحن وواقيات الشاشة) من 1688 منذ 6 أشهر. إليكم قائمتي الموثقة من 3 موردين موثوقين بحد أدنى للطلب أقل من 100 قطعة. أشارك جهات الاتصال على الخاص.',
    author: 'Ibrahim K.',
    authorInitials: 'IK',
    authorColor: authorColors[0],
    category: 'sourcing',
    categoryFr: 'Sourcing', categoryZh: '采购', categoryAr: 'التوريد',
    replies: 34,
    likes: 127,
    createdAt: '2026-05-16T10:30:00Z',
    isPinned: true,
  },
  {
    id: '2',
    title: 'How to avoid scams when paying suppliers',
    titleFr: 'Comment éviter les arnaques lors du paiement fournisseurs', titleZh: '如何在向供应商付款时避免诈骗', titleAr: 'كيف تتجنب الاحتيال عند الدفع للموردين',
    content:
      'Three red flags every African importer should know: 1) Supplier refuses video call, 2) Price is 40%+ below market, 3) Asks for Western Union to personal account. Always use escrow or a trusted agent.',
    contentFr:
      "Trois signaux d'alerte que tout importateur africain doit connaître : 1) Le fournisseur refuse l'appel vidéo, 2) Le prix est 40%+ sous le marché, 3) Il demande un transfert Western Union sur un compte personnel. Utilisez toujours un escrow ou un agent de confiance.",
    contentZh: '每位非洲进口商都应了解的三个危险信号：1）供应商拒绝视频通话，2）价格低于市场 40% 以上，3）要求通过 Western Union 转账到个人账户。请始终使用托管或可信赖的代理。',
    contentAr: 'ثلاث إشارات خطر يجب أن يعرفها كل مستورد أفريقي: 1) يرفض المورد مكالمة الفيديو، 2) السعر أقل من السوق بنسبة 40% فأكثر، 3) يطلب تحويلًا عبر Western Union إلى حساب شخصي. استخدم دائمًا الضمان (Escrow) أو وكيلًا موثوقًا.',
    author: 'Amina D.',
    authorInitials: 'AD',
    authorColor: authorColors[1],
    category: 'scam-alert',
    categoryFr: 'Alerte Arnaque', categoryZh: '诈骗提醒', categoryAr: 'تنبيه احتيال',
    replies: 56,
    likes: 243,
    createdAt: '2026-05-14T08:15:00Z',
    isPinned: true,
  },
  {
    id: '3',
    title: 'Container sharing: Bamako departure June 15',
    titleFr: "Partage de conteneur : départ Bamako 15 juin", titleZh: '拼柜：6 月 15 日巴马科出发', titleAr: 'مشاركة حاوية: مغادرة باماكو 15 يونيو',
    content:
      'I have 6 CBM booked on a 20ft container leaving Foshan on May 25, arriving Dakar June 15, then truck to Bamako. Looking for 2-3 people to share remaining 8 CBM. Rate: $115/CBM all-inclusive.',
    contentFr:
      "J'ai réservé 6 CBM dans un conteneur 20ft partant de Foshan le 25 mai, arrivée Dakar le 15 juin, puis camion vers Bamako. Je cherche 2-3 personnes pour partager les 8 CBM restants. Tarif : 115$/CBM tout compris.",
    contentZh: '我在 5 月 25 日从佛山出发的 20 尺集装箱中订了 6 CBM，6 月 15 日到达喀尔，然后卡车运到巴马科。寻找 2-3 人分享剩余的 8 CBM。价格：每 CBM 115 美元，全包。',
    contentAr: 'حجزت 6 CBM في حاوية 20 قدمًا تغادر فوشان في 25 مايو وتصل إلى داكار في 15 يونيو، ثم بالشاحنة إلى باماكو. أبحث عن 2-3 أشخاص لمشاركة 8 CBM المتبقية. السعر: 115 دولارًا/CBM شامل كل شيء.',
    author: 'Ousmane T.',
    authorInitials: 'OT',
    authorColor: authorColors[2],
    category: 'group-buy',
    categoryFr: 'Achat Groupé', categoryZh: '团购', categoryAr: 'شراء جماعي',
    replies: 18,
    likes: 89,
    createdAt: '2026-05-15T14:20:00Z',
    isPinned: true,
  },
  {
    id: '4',
    title: 'Customs fees experience at Bamako port',
    titleFr: "Expérience des frais de douane au port de Bamako", titleZh: '巴马科海关费用经验', titleAr: 'تجربة الرسوم الجمركية في باماكو',
    content:
      'Just cleared a 12 CBM LCL shipment at Bamako port. Total customs + handling + local transport came to ~$1,850. Breakdown attached. Key tip: have your HS codes correct and use a local customs broker.',
    contentFr:
      "Je viens de dédouaner une expédition LCL de 12 CBM au port de Bamako. Total douane + manutention + transport local : environ 1 850$. Détails ci-joints. Conseil clé : ayez vos codes HS corrects et utilisez un courtier en douane local.",
    contentZh: '我刚在巴马科清关了一票 12 CBM 的 LCL 货物。海关 + 装卸 + 本地运输总计约 1 850 美元。详情见附件。关键建议：准备好正确的 HS 编码，并使用本地报关行。',
    contentAr: 'انتهيت للتو من تخليص شحنة LCL حجمها 12 CBM في باماكو. مجموع الجمارك والمناولة والنقل المحلي: نحو 1 850 دولارًا. التفاصيل مرفقة. نصيحة أساسية: جهز رموز HS الصحيحة واستعن بمخلص جمركي محلي.',
    author: 'Fatou S.',
    authorInitials: 'FS',
    authorColor: authorColors[3],
    category: 'customs',
    categoryFr: 'Douane', categoryZh: '海关', categoryAr: 'الجمارك',
    replies: 42,
    likes: 156,
    createdAt: '2026-05-13T09:45:00Z',
    isPinned: false,
  },
  {
    id: '5',
    title: 'Quality inspection tips before shipping',
    titleFr: "Conseils d'inspection qualité avant expédition", titleZh: '发货前质量检验建议', titleAr: 'نصائح لفحص الجودة قبل الشحن',
    content:
      'Never skip pre-shipment inspection. Here is my 10-point checklist: packaging, labeling, quantity, color accuracy, functionality test, weight check, carton markings, accessories included, manual/language, and random sampling.',
    contentFr:
      "Ne sautez jamais l'inspection pré-expédition. Voici ma checklist 10 points : emballage, étiquetage, quantité, exactitude des couleurs, test fonctionnel, vérification du poids, marquage cartons, accessoires inclus, manuel/langue, et échantillonnage aléatoire.",
    contentZh: '千万不要跳过发货前检验。这是我的 10 点清单：包装、标签、数量、颜色准确性、功能测试、重量核对、纸箱标记、附带配件、说明书/语言和随机抽样。',
    contentAr: 'لا تتخطَّ أبدًا الفحص قبل الشحن. إليك قائمتي من 10 نقاط: التغليف، والملصقات، والكمية، ودقة الألوان، واختبار الأداء، والتحقق من الوزن، وعلامات الكراتين، والملحقات المشمولة، والدليل واللغة، والعينات العشوائية.',
    author: 'Kofi M.',
    authorInitials: 'KM',
    authorColor: authorColors[4],
    category: 'sourcing',
    categoryFr: 'Sourcing', categoryZh: '采购', categoryAr: 'التوريد',
    replies: 29,
    likes: 112,
    createdAt: '2026-05-12T16:00:00Z',
    isPinned: false,
  },
  {
    id: '6',
    title: 'Cheapest way to ship textiles from Guangzhou',
    titleFr: "Moyen le moins cher d'expédier des textiles de Guangzhou", titleZh: '从广州发运纺织品最便宜的方式', titleAr: 'أرخص طريقة لشحن المنسوجات من قوانغتشو',
    content:
      'For textiles under 100kg, air freight via consolidated cargo is best at $8.50/kg. For 200kg+, sea LCL from Guangzhou to Dakar then truck is $95/CBM. I saved 35% switching to LCL last month.',
    contentFr:
      "Pour les textiles sous 100kg, le fret aérien en cargo consolidé est le meilleur à 8,50$/kg. Pour 200kg+, le groupage maritime Guangzhou-Dakar puis camion est à 95$/CBM. J'ai économisé 35% en passant au LCL le mois dernier.",
    contentZh: '100 公斤以下的纺织品，集运空运最好，每公斤 8.50 美元。200 公斤以上，广州—达喀尔海运拼箱再转卡车，每 CBM 95 美元。上个月我改用 LCL 节省了 35%。',
    contentAr: 'للمنسوجات دون 100 كغ، أفضل خيار هو الشحن الجوي المجمّع بسعر 8.50 دولارات/كغ. ولأكثر من 200 كغ، الشحن البحري المجمّع من قوانغتشو إلى داكار ثم بالشاحنة بسعر 95 دولارًا/CBM. وفرت 35% بالانتقال إلى LCL الشهر الماضي.',
    author: 'Mariam C.',
    authorInitials: 'MC',
    authorColor: authorColors[5],
    category: 'shipping',
    categoryFr: 'Expédition', categoryZh: '发货', categoryAr: 'الشحن',
    replies: 21,
    likes: 98,
    createdAt: '2026-05-11T11:30:00Z',
    isPinned: false,
  },
  {
    id: '7',
    title: 'New import regulations in Mali 2026',
    titleFr: 'Nouvelles réglementations importation Mali 2026', titleZh: '2026 年马里进口新规', titleAr: 'اللوائح الجديدة للاستيراد إلى مالي 2026',
    content:
      'Mali customs updated the prohibited items list effective April 2026. Drones now require DGAC permit. Used clothing restrictions tightened. New electronic invoice requirement for all imports above $2,000.',
    contentFr:
      "La douane malienne a mis à jour la liste des articles interdits en avril 2026. Les drones nécessitent désormais une autorisation DGAC. Les restrictions sur les vêtements d'occasion se sont renforcées. Nouvelle exigence de facture électronique pour toutes importations > 2 000$.",
    contentZh: '马里海关于 2026 年 4 月更新了禁运物品清单。无人机现在需要民航局（DGAC）许可。二手服装限制收紧。所有超过 2 000 美元的进口新增电子发票要求。',
    contentAr: 'حدّثت جمارك مالي قائمة السلع المحظورة في أبريل 2026. أصبحت الطائرات المسيّرة تتطلب ترخيصًا من هيئة الطيران المدني (DGAC). وتشددت القيود على الملابس المستعملة. ويوجد شرط جديد لفاتورة إلكترونية لكل الواردات فوق 2 000 دولار.',
    author: 'Drissa B.',
    authorInitials: 'DB',
    authorColor: authorColors[6],
    category: 'customs',
    categoryFr: 'Douane', categoryZh: '海关', categoryAr: 'الجمارك',
    replies: 38,
    likes: 201,
    createdAt: '2026-05-10T07:20:00Z',
    isPinned: false,
  },
  {
    id: '8',
    title: 'Group buy: LED lighting from Shenzhen',
    titleFr: "Achat groupé : éclairage LED de Shenzhen", titleZh: '团购：深圳 LED 照明', titleAr: 'شراء جماعي: إضاءة LED من شنتشن',
    content:
      'Organizing a group buy for LED strips, panels, and flood lights from a verified Shenzhen factory. MOQ is 500pcs but we can hit it with 4-5 buyers. Prices 30% below Alibaba. Deadline: May 25.',
    contentFr:
      "J'organise un achat groupé de rubans LED, panneaux et projecteurs auprès d'une usine vérifiée à Shenzhen. Le MOQ est de 500 pièces mais on peut l'atteindre avec 4-5 acheteurs. Prix 30% sous Alibaba. Date limite : 25 mai.",
    contentZh: '我正在组织向深圳一家已核验工厂团购 LED 灯带、面板和投光灯。起订量 500 件，4-5 位买家可以达到。价格比 Alibaba 低 30%。截止日期：5 月 25 日。',
    contentAr: 'أنظم شراءً جماعيًا لشرائط وألواح وكشافات LED من مصنع موثق في شنتشن. الحد الأدنى للطلب 500 قطعة ويمكن بلوغه مع 4-5 مشترين. السعر أقل بنسبة 30% من Alibaba. آخر موعد: 25 مايو.',
    author: 'Youssef N.',
    authorInitials: 'YN',
    authorColor: authorColors[7],
    category: 'group-buy',
    categoryFr: 'Achat Groupé', categoryZh: '团购', categoryAr: 'شراء جماعي',
    replies: 15,
    likes: 76,
    createdAt: '2026-05-09T13:10:00Z',
    isPinned: false,
  },
  {
    id: '9',
    title: 'Bank transfer vs Alipay for large orders',
    titleFr: 'Virement bancaire vs Alipay pour grosses commandes', titleZh: '大额订单选银行转账还是支付宝', titleAr: 'التحويل المصرفي أم Alipay للطلبات الكبيرة',
    content:
      'For orders above $5,000, I prefer bank transfer with a verified contract. For smaller orders, Alipay escrow is safer. Here is a fee comparison and risk analysis for both methods.',
    contentFr:
      "Pour les commandes > 5 000$, je préfère le virement bancaire avec un contrat vérifié. Pour les petites commandes, l'escrow Alipay est plus sûr. Voici une comparaison des frais et une analyse des risques pour les deux méthodes.",
    contentZh: '超过 5 000 美元的订单，我更喜欢使用经核验合同的银行转账。小额订单，支付宝担保更安全。这里是两种方式的费用比较和风险分析。',
    contentAr: 'للطلبات فوق 5 000 دولار، أفضّل التحويل المصرفي مع عقد موثق. وللطلبات الصغيرة، ضمان Alipay أكثر أمانًا. إليكم مقارنة الرسوم وتحليل المخاطر للطريقتين.',
    author: 'Nadia K.',
    authorInitials: 'NK',
    authorColor: authorColors[8],
    category: 'general',
    categoryFr: 'Général', categoryZh: '综合', categoryAr: 'عام',
    replies: 27,
    likes: 94,
    createdAt: '2026-05-08T10:00:00Z',
    isPinned: false,
  },
  {
    id: '10',
    title: 'Air freight rate trends: May 2026 update',
    titleFr: "Tendances tarifs fret aérien : mise à jour mai 2026", titleZh: '空运价格趋势：2026 年 5 月更新', titleAr: 'اتجاهات أسعار الشحن الجوي: تحديث مايو 2026',
    content:
      'Air freight rates from Guangzhou to Bamako dropped slightly this month. Current range $9.50-$13.50/kg depending on volume. Fuel surcharge down 4%. Book early for Ramadan season rush.',
    contentFr:
      "Les tarifs fret aérien Guangzhou-Bamako ont légèrement baissé ce mois-ci. Fourchette actuelle : 9,50-13,50$/kg selon volume. Surcharge carburant en baisse de 4%. Réservez tôt pour la ruée du Ramadan.",
    contentZh: '本月广州—巴马科空运价格略有下降。当前区间：根据货量每公斤 9.50-13.50 美元。燃油附加费下降 4%。斋月高峰请提早预订。',
    contentAr: 'انخفضت أسعار الشحن الجوي من قوانغتشو إلى باماكو قليلًا هذا الشهر. النطاق الحالي: 9.50-13.50 دولارًا/كغ حسب الحجم. انخفضت رسوم الوقود بنسبة 4%. احجز مبكرًا قبل ازدحام رمضان.',
    author: 'Issa F.',
    authorInitials: 'IF',
    authorColor: authorColors[9],
    category: 'shipping',
    categoryFr: 'Expédition', categoryZh: '发货', categoryAr: 'الشحن',
    replies: 31,
    likes: 118,
    createdAt: '2026-05-07T15:45:00Z',
    isPinned: false,
  },
];

export const successStories = [
  {
    id: '1',
    quote:
      'I found 3 reliable suppliers thanks to this group. My import costs dropped by 25% and I no longer worry about scams.',
    quoteFr:
      "J'ai trouvé 3 fournisseurs fiables grâce à ce groupe. Mes coûts d'importation ont baissé de 25% et je ne m'inquiète plus des arnaques.",
    quoteZh: '我通过这个群找到了 3 家可靠供应商。我的进口成本下降了 25%，也不再担心诈骗了。',
    quoteAr: 'وجدت 3 موردين موثوقين بفضل هذه المجموعة. انخفضت تكاليف استيرادي بنسبة 25% ولم أعد أقلق من الاحتيال.',
    author: 'Amadou',
    location: 'Bamako',
    countryFlag: '🇲🇱',
  },
  {
    id: '2',
    quote:
      'Saved $800 on my last shipment by sharing a container. The community made it easy to find trustworthy partners.',
    quoteFr:
      "J'ai économisé 800$ sur ma dernière expédition en partageant un conteneur. La communauté m'a facilité la recherche de partenaires de confiance.",
    quoteZh: '我通过拼柜在上一票货中节省了 800 美元。社区让我很容易找到可信赖的伙伴。',
    quoteAr: 'وفرت 800 دولار في شحنتي الأخيرة بمشاركة حاوية. سهّل لي المجتمع العثور على شركاء موثوقين.',
    author: 'Fatou',
    location: 'Dakar',
    countryFlag: '🇸🇳',
  },
  {
    id: '3',
    quote:
      'Avoided a scam because someone warned me about that supplier. This group is worth its weight in gold.',
    quoteFr:
      "J'ai évité une arnaque car quelqu'un m'a prévenu à propos de ce fournisseur. Ce groupe vaut de l'or.",
    quoteZh: '有人提醒我注意那家供应商，我因此避开了一场诈骗。这个群价值千金。',
    quoteAr: 'تجنبت عملية احتيال لأن أحدهم حذرني من ذلك المورد. هذه المجموعة تساوي ذهبًا.',
    author: 'Moussa',
    location: 'Abidjan',
    countryFlag: '🇨🇮',
  },
];

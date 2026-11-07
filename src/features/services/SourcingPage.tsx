/**
 * Sourcing Page Component
 * 
 * Comprehensive sourcing service page with SEO-optimized content.
 */

'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Search, CheckCircle, CreditCard, Truck, Phone, Shield } from 'lucide-react';
import Link from 'next/link';
import { SupplierPayment } from '@/components/moments/SupplierPayment';
import { PageHero, Cta } from '@/components/site';

interface Props {
  locale: string;
}

export function SourcingPage({ locale }: Props) {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const frenchContentLocale = 'fr';

  const platforms = [
    { name: 'Alibaba', desc: isEn ? 'B2B wholesale platform' : isZh ? 'B2B 批发平台' : isAr ? 'منصة B2B للجملة' : 'Plateforme B2B en gros', color: 'bg-orange-500' },
    { name: 'Tmall', desc: isEn ? 'Brand products' : isZh ? '品牌产品' : isAr ? 'منتجات العلامات التجارية' : 'Produits de marque', color: 'bg-red-600' },
  ];

  const services = [
    {
      icon: Search,
      title: isEn ? 'Supplier Search' : isZh ? '寻找供应商' : isAr ? 'البحث عن موردين' : 'Recherche Fournisseurs',
      desc: isEn 
        ? 'We find reliable suppliers on Alibaba based on your requirements'
        : isZh ? '我们根据您的需求在 Alibaba 上寻找可靠供应商' : isAr ? 'نجد موردين موثوقين في Alibaba حسب احتياجاتك' : 'Nous trouvons des fournisseurs fiables sur Alibaba selon vos besoins',
    },
    {
      icon: CheckCircle,
      title: isEn ? 'Verification' : isZh ? '核验' : isAr ? 'التحقق' : 'Vérification',
      desc: isEn 
        ? 'Supplier background checks, factory audits, and certification verification'
        : isZh ? '背景调查、工厂审核和认证核验' : isAr ? 'فحص الخلفية وتدقيق المصانع والتحقق من الشهادات' : 'Vérification des antécédents, audits d\'usine et vérification des certifications',
    },
    {
      icon: ShoppingCart,
      title: isEn ? 'Purchase Management' : isZh ? '采购管理' : isAr ? 'إدارة المشتريات' : 'Gestion des Achats',
      desc: isEn 
        ? 'Negotiation, order placement, and coordination with suppliers'
        : isZh ? '谈判、下单和与供应商协调' : isAr ? 'التفاوض ووضع الطلبات والتنسيق مع الموردين' : 'Négociation, passation de commandes et coordination avec les fournisseurs',
    },
    {
      icon: Shield,
      title: isEn ? 'Quality Control' : isZh ? '质量检查' : isAr ? 'فحص الجودة' : 'Contrôle Qualité',
      desc: isEn 
        ? 'Pre-shipment inspection, product testing, and photo documentation'
        : isZh ? '发货前检验、产品测试和照片记录' : isAr ? 'فحص قبل الشحن واختبار المنتجات وتوثيق بالصور' : 'Inspection avant expédition, tests produits et documentation photo',
    },
    {
      icon: CreditCard,
      title: isEn ? 'Payment Processing' : isZh ? '付款处理' : isAr ? 'معالجة الدفع' : 'Traitement Paiement',
      desc: isEn 
        ? 'Secure payments via Alipay, bank transfer on your behalf'
        : isZh ? '为您通过支付宝、银行转账安全付款' : isAr ? 'دفع آمن عبر Alipay والتحويل المصرفي نيابة عنك' : 'Paiements sécurisés via Alipay, virement bancaire pour vous',
    },
    {
      icon: Truck,
      title: isEn ? 'Shipping Integration' : isZh ? '发运整合' : isAr ? 'تكامل الشحن' : 'Intégration Expédition',
      desc: isEn 
        ? 'Consolidation with your other shipments for cost-effective delivery'
        : isZh ? '与您的其他货物合并，实现经济交付' : isAr ? 'التجميع مع شحناتك الأخرى لتسليم اقتصادي' : 'Consolidation avec vos autres envois pour une livraison économique',
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      {/* Hero Section */}
      <PageHero
        eyebrow={isEn ? 'China Sourcing Agent' : isZh ? '中国采购代理' : isAr ? 'وكيل التوريد في الصين' : 'Agent Sourcing Chine'}
        title={isEn ? 'China Sourcing Agent for Mali Importers' : isZh ? '面向马里的中国采购代理' : isAr ? 'وكيل توريد في الصين لمالي' : 'Agent sourcing Chine pour le Mali'}
        lede={isEn
          ? 'Your China sourcing agent for Mali and Bamako. We buy from Alibaba, verify suppliers, process payments, inspect goods, consolidate parcels, and ship by air or sea.'
          : isZh ? '您在中国面向马里和巴马科的采购代理。我们在 Alibaba 购买、核验供应商、处理付款、检查货物、合并包裹，并通过空运或海运发货。' : isAr ? 'وكيل التوريد لديك في الصين لمالي وباماكو. نشتري من Alibaba ونتحقق من الموردين وندير الدفع ونفحص البضائع ونجمع الطرود ونشحن جوًا أو بحرًا.' : 'Votre agent sourcing en Chine pour le Mali et Bamako. Nous achetons sur Alibaba, vérifions les fournisseurs, gérons le paiement, inspectons les marchandises, consolidons les colis et expédions par avion ou par mer.'}
        actions={<>
          <Cta href="https://wa.me/8618851725957" external arrow={false} tone="void" size="lg" icon={<Phone size={18} aria-hidden />}>{isEn ? 'Start Sourcing Now' : isZh ? '开始采购' : isAr ? 'ابدأ التوريد' : 'Commencer à Sourcer'}</Cta>
          <Cta href={`/${frenchContentLocale}/services/verification-fournisseur-chine`} variant="outline" tone="void" size="lg">{isEn ? 'Verify a Supplier' : isZh ? '核验供应商' : isAr ? 'تحقق من مورد' : 'Vérifier un Fournisseur'}</Cta>
        </>}
      />

      {/* Mali Importers Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                {isEn ? 'Built for Mali importers buying in China' : isZh ? '专为在中国采购的马里进口商设计' : isAr ? 'مصمم للمستوردين الماليين الذين يشترون من الصين' : 'Pensé pour les importateurs maliens qui achètent en Chine'}
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                {isEn
                  ? 'Most Mali importers do not only need a shipper. They need someone who can understand a supplier quote, pay in China, check the goods, combine multiple purchases, and choose the right freight route to Bamako.'
                  : isZh ? '大多数马里进口商需要的不只是承运人。他们需要一个能看懂供应商报价、在中国付款、检查货物、合并多笔采购并选择正确运输路线到巴马科的伙伴。' : isAr ? 'لا يحتاج معظم المستوردين الماليين إلى ناقل فقط، بل إلى شريك يفهم عرض سعر المورد ويدفع في الصين ويفحص البضاعة ويجمع عدة مشتريات ويختار طريق الشحن المناسب إلى باماكو.' : 'La plupart des importateurs maliens n’ont pas seulement besoin d’un transporteur. Ils ont besoin d’un partenaire qui comprend le devis fournisseur, paie en Chine, contrôle la marchandise, regroupe plusieurs achats et choisit la bonne route de fret vers Bamako.'}
              </p>
            </div>
            <div className="grid gap-4">
              {[
                isEn ? 'Alibaba supplier search and negotiation' : isZh ? 'Alibaba 供应商寻找和谈判' : isAr ? 'البحث عن موردي Alibaba والتفاوض معهم' : 'Recherche et négociation fournisseur Alibaba',
                isEn ? 'Alibaba purchasing with China-side payment support' : isZh ? 'Alibaba 采购，在中国付款' : isAr ? 'الشراء من Alibaba مع الدفع من جهة الصين' : 'Achat Alibaba avec paiement côté Chine',
                isEn ? 'Pre-shipment photos and quality control' : isZh ? '发货前照片和质量检查' : isAr ? 'صور وفحص جودة قبل الشحن' : 'Photos et contrôle qualité avant expédition',
                isEn ? 'Air or sea freight to Bamako based on margin' : isZh ? '根据您的利润选择空运或海运到巴马科' : isAr ? 'شحن جوي أو بحري إلى باماكو حسب هامشك' : 'Fret aérien ou maritime vers Bamako selon votre marge',
              ].map((item) => (
                <div key={item} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-[var(--text-secondary)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Paying a supplier in China, shown rather than described. */}
      <SupplierPayment />

      {/* Platforms Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'We Source From' : isZh ? '我们的采购平台' : isAr ? 'نورّد من' : 'Nous Sourçons Sur'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {isEn 
                ? 'All major Chinese e-commerce platforms'
                : isZh ? '所有中国主要电商平台' : isAr ? 'كل منصات التجارة الإلكترونية الصينية الكبرى' : 'Toutes les grandes plateformes e-commerce chinoises'}
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
              {isEn ? 'Complete Sourcing Services' : isZh ? '全程采购服务' : isAr ? 'خدمات التوريد المتكاملة' : 'Services de Sourcing Complets'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {isEn 
                ? 'From supplier search to delivery at your door, we handle everything'
                : isZh ? '从寻找供应商到送货上门，我们管理一切' : isAr ? 'من البحث عن موردين إلى التسليم عندك، نتولى كل شيء' : 'De la recherche de fournisseurs à la livraison chez vous, nous gérons tout'}
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
            {isEn ? 'Secure the full import chain' : isZh ? '保障整个进口链' : isAr ? 'أمّن سلسلة الاستيراد كلها' : 'Sécurisez toute la chaîne d’import'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { href: `/${frenchContentLocale}/services/paiement-fournisseur-chine`, label: isEn ? 'Supplier payment' : isZh ? '中国供应商付款' : isAr ? 'الدفع لمورد صيني' : 'Paiement fournisseur chinois' },
              { href: `/${frenchContentLocale}/services/verification-fournisseur-chine`, label: isEn ? 'Supplier verification' : isZh ? '中国供应商核验' : isAr ? 'التحقق من الموردين في الصين' : 'Vérification fournisseur Chine' },
              { href: `/${locale}/routes/china-to-mali`, label: isEn ? 'China to Mali freight' : isZh ? '中国—马里货运线路' : isAr ? 'خط الشحن من الصين إلى مالي' : 'Fret Chine-Mali' },
              { href: `/${frenchContentLocale}/guides/importer-de-chine-au-mali`, label: isEn ? 'Import guide' : isZh ? '从中国进口到马里指南' : isAr ? 'دليل الاستيراد من الصين إلى مالي' : 'Guide importer de Chine au Mali' },
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
              {isEn ? 'How It Works' : isZh ? '如何运作' : isAr ? 'كيف تعمل الخدمة' : 'Comment Ça Marche'}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: isEn ? 'Send Request' : isZh ? '发送您的需求' : isAr ? 'أرسل طلبك' : 'Envoyez Votre Demande', desc: isEn ? 'Share product links or descriptions' : isZh ? '分享链接或描述' : isAr ? 'شارك الروابط أو الأوصاف' : 'Partagez les liens ou descriptions' },
              { step: '2', title: isEn ? 'We Source' : isZh ? '我们采购' : isAr ? 'نحن نورّد' : 'Nous Sourçons', desc: isEn ? 'We find best suppliers and prices' : isZh ? '我们寻找最佳供应商' : isAr ? 'نجد أفضل الموردين' : 'Nous trouvons les meilleurs fournisseurs' },
              { step: '3', title: isEn ? 'You Confirm' : isZh ? '您确认' : isAr ? 'أنت تؤكد' : 'Vous Confirmez', desc: isEn ? 'Review and approve the order' : isZh ? '审核并批准订单' : isAr ? 'راجع الطلب ووافق عليه' : 'Examinez et approuvez la commande' },
              { step: '4', title: isEn ? 'We Deliver' : isZh ? '我们交付' : isAr ? 'نحن نسلم' : 'Nous Livrons', desc: isEn ? 'Quality check and ship to you' : isZh ? '质量检查和发运' : isAr ? 'فحص الجودة والشحن' : 'Contrôle qualité et expédition' },
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
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn ? 'Ready to Source from China?' : isZh ? '准备好在中国采购了吗？' : isAr ? 'هل أنت مستعد للتوريد من الصين؟' : 'Prêt à Sourcer en Chine?'}
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? 'Join hundreds of African businesses buying from China with our help'
                : isZh ? '加入数百家在我们帮助下从中国采购的非洲企业' : isAr ? 'انضم إلى مئات الشركات الأفريقية التي تشتري من الصين بمساعدتنا' : 'Rejoignez des centaines d\'entreprises africaines qui achètent en Chine avec notre aide'}
            </p>
            <a
              href="https://wa.me/8618851725957"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              {isEn ? 'Get Your Free Quote' : isZh ? '获取免费报价' : isAr ? 'احصل على عرض سعرك المجاني' : 'Obtenez Votre Devis Gratuit'}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

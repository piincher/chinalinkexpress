/**
 * Air Freight Page Component
 * 
 * Comprehensive air freight service page with SEO-optimized content.
 */

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Clock, Shield, Globe, Package, Phone } from 'lucide-react';
import Link from 'next/link';
import { PageHero, Cta } from '@/components/site';

interface Props {
  locale: string;
}

export function AirFreightPage({ locale }: Props) {
  const t = useTranslations();
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  const features = [
    {
      icon: Clock,
      title: isEn ? 'Fast Delivery' : isZh ? '快速交付' : isAr ? 'تسليم سريع' : 'Livraison Rapide',
      desc: isEn ? '14-21 business days to Bamako, Mali' : '14-21 jours ouvrables vers Bamako, Mali',
    },
    {
      icon: Shield,
      title: isEn ? 'Secure Handling' : isZh ? '安全搬运' : isAr ? 'مناولة آمنة' : 'Manipulation Sécurisée',
      desc: isEn ? 'Professional packaging and handling for fragile items' : isZh ? '易碎物品的专业包装和搬运' : isAr ? 'تغليف ومناولة احترافيان للسلع الهشة' : 'Emballage et manipulation professionnels pour articles fragiles',
    },
    {
      icon: Globe,
      title: isEn ? 'Partner Network' : isZh ? '合作伙伴网络' : isAr ? 'شبكة الشركاء' : 'Réseau de Partenaires',
      desc: isEn ? 'We work with trusted airlines and freight partners to ensure safe delivery' : isZh ? '我们与值得信赖的航空公司和货运伙伴合作，确保安全交付' : isAr ? 'نتعاون مع شركات طيران وشركاء شحن موثوقين لضمان تسليم آمن' : 'Nous collaborons avec des compagnies aériennes et des partenaires fret de confiance pour assurer une livraison sécurisée',
    },
    {
      icon: Package,
      title: isEn ? 'All Cargo Types' : isZh ? '所有货物类型' : isAr ? 'جميع أنواع البضائع' : 'Tous Types de Marchandises',
      desc: isEn ? 'Electronics, textiles, machinery, and general cargo' : isZh ? '电子产品、纺织品、机器和普通货物' : isAr ? 'الإلكترونيات والمنسوجات والآلات والبضائع العامة' : 'Électronique, textiles, machines et marchandises générales',
    },
  ];

  const destinations = [
    { city: 'Bamako', country: 'Mali', time: '14-21 days' },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      {/* Hero Section */}
      <PageHero
        eyebrow={isEn ? 'Express Air Freight' : isZh ? '快速空运' : isAr ? 'الشحن الجوي السريع' : 'Fret Aérien Express'}
        title={isEn ? 'Air Freight from China to Mali' : isZh ? '从中国到马里的空运' : isAr ? 'الشحن الجوي من الصين إلى مالي' : 'Fret Aérien de la Chine vers le Mali'}
        lede={isEn
          ? 'Fast, reliable air cargo services to Bamako through our trusted partner network. Delivery in 14-21 days. We handle sourcing, consolidation, and shipping so you receive your goods safely.'
          : isZh ? '通过我们值得信赖的伙伴网络，提供到巴马科的快速可靠空运服务。14-21 天交付。我们负责采购、集运和发运，让您安全收到货物。' : isAr ? 'خدمات شحن جوي سريعة وموثوقة إلى باماكو عبر شبكة شركائنا الموثوقين. تسليم خلال 14-21 يومًا. نتولى التوريد والتجميع والشحن لتستلم بضائعك بأمان.' : "Services de cargo aérien rapides et fiables vers Bamako via notre réseau de partenaires de confiance. Livraison en 14-21 jours. Nous gérons le sourcing, la consolidation et l'expédition pour que vous receviez vos marchandises en toute sécurité."}
        actions={<>
          <Cta href="https://wa.me/8618851725957" external arrow={false} tone="void" size="lg" icon={<Phone size={18} aria-hidden />}>{isEn ? 'Get Quote on WhatsApp' : isZh ? '在 WhatsApp 上询价' : isAr ? 'عرض سعر عبر WhatsApp' : 'Devis sur WhatsApp'}</Cta>
          <Cta href={`/${locale}/calculateur`} variant="outline" tone="void" size="lg">{isEn ? 'Calculate Shipping Cost' : isZh ? '计算费用' : isAr ? 'احسب الرسوم' : 'Calculer les Frais'}</Cta>
        </>}
      />

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'Why Choose Our Air Freight?' : isZh ? '为什么选择我们的空运？' : isAr ? 'لماذا تختار شحننا الجوي؟' : 'Pourquoi Choisir Notre Fret Aérien?'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {isEn 
                ? 'Professional air cargo services with competitive rates and reliable delivery to Mali'
                : isZh ? '专业空运服务，价格有竞争力，可靠送达马里' : isAr ? 'خدمات شحن جوي احترافية بأسعار تنافسية وتسليم موثوق إلى مالي' : 'Services de cargo aérien professionnels avec tarifs compétitifs et livraison fiable vers le Mali'}
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
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
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

      {/* Destinations Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isEn ? 'Air Freight Destination' : isZh ? '空运目的地' : isAr ? 'وجهة الشحن الجوي' : 'Destination Fret Aérien'}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {isEn 
                ? 'Direct and connecting flights to Bamako, Mali through our partner airlines'
                : isZh ? '通过我们的合作航空公司，直飞和转机到马里巴马科' : isAr ? 'رحلات مباشرة وبتوقف إلى باماكو في مالي عبر شركات الطيران الشريكة' : 'Vols directs et avec correspondance vers Bamako, Mali via nos compagnies aériennes partenaires'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {dest.city}, {dest.country}
                  </h3>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {isEn ? 'Delivery time' : isZh ? '交付时效' : isAr ? 'مدة التسليم' : 'Délai de livraison'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {dest.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn ? 'Ready to Ship by Air?' : isZh ? '准备好空运了吗？' : isAr ? 'هل أنت مستعد للشحن جوًا؟' : 'Prêt à Expédier par Avion?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? 'Get your air freight quote in seconds. Fast, reliable delivery to Bamako through our trusted partners.'
                : isZh ? '几秒钟内获取空运报价。通过我们值得信赖的伙伴快速可靠地送达巴马科。' : isAr ? 'احصل على عرض سعر للشحن الجوي خلال ثوانٍ. تسليم سريع وموثوق في باماكو عبر شركائنا الموثوقين.' : 'Obtenez votre devis fret aérien en quelques secondes. Livraison rapide et fiable à Bamako via nos partenaires de confiance.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/calculateur`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {isEn ? 'Calculate Cost' : isZh ? '计算费用' : isAr ? 'احسب الكلفة' : 'Calculer le Coût'}
              </Link>
              <Link
                href={`/${locale}/tarifs`}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors"
              >
                {isEn ? 'View Pricing' : isZh ? '查看价格' : isAr ? 'عرض الأسعار' : 'Voir les Tarifs'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

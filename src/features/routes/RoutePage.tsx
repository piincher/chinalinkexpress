/**
 * Route Page Component
 * 
 * Reusable route page component for shipping routes from China to African destinations.
 */

'use client';

import { motion } from 'framer-motion';
import { Plane, Ship, Clock, Phone, ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { PageHero, Band, Shell, Cta, PHOTOS } from '@/components/site';
import { WHATSAPP_URL } from '@/constants/contact';
import { getRouteData } from './route-data';
import type { Locale } from '@/i18n/config';

interface Props {
  locale: string;
  routeKey: string;
  country: string;
  capital: string;
}

export function RoutePage({ locale, routeKey, country, capital }: Props) {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const route = getRouteData(routeKey, (locale as Locale));
  
  if (!route) {
    return <div>Route not found</div>;
  }

  const routeLabel = isEn ? `${route.origin.country} to ${route.destination.country}` : isZh ? `${route.origin.country} 到 ${route.destination.country}` : isAr ? `${route.origin.country} إلى ${route.destination.country}` : `${route.origin.country} vers ${route.destination.country}`;
  const isMaliRoute = routeKey === 'china-to-mali';

  const importProof = [
    isEn
      ? 'Bamako office support anchors our West Africa network'
      : isZh ? '巴马科办公室是我们西非网络的支柱' : isAr ? 'يشكل مكتب باماكو ركيزة شبكتنا في غرب أفريقيا' : 'Le bureau de Bamako ancre notre réseau Afrique de l’Ouest',
    isEn ? 'China-side supplier payment and consolidation' : isZh ? '中国端供应商付款和集运' : isAr ? 'الدفع للموردين والتجميع من جهة الصين' : 'Paiement fournisseur et consolidation côté Chine',
    isEn ? 'WhatsApp updates with shipment milestones' : isZh ? '关键阶段 WhatsApp 跟踪' : isAr ? 'متابعة عبر WhatsApp في المراحل الأساسية' : 'Suivi WhatsApp aux étapes clés',
    isEn ? 'Air and sea options based on destination, margin, and urgency' : isZh ? '根据目的地、利润和紧急程度选择空运或海运' : isAr ? 'جوي أو بحري حسب الوجهة والهامش والاستعجال' : 'Aérien ou maritime selon destination, marge et urgence',
  ];

  const customsPoints = [
    isEn ? 'Commercial invoice with clear product description' : isZh ? '产品描述清晰的商业发票' : isAr ? 'فاتورة تجارية بوصف واضح للمنتج' : 'Facture commerciale avec description produit claire',
    isEn ? 'Packing list with carton count, weight, and volume' : isZh ? '包含件数、重量和体积的装箱单' : isAr ? 'قائمة تعبئة بعدد الطرود والوزن والحجم' : 'Packing list avec nombre de colis, poids et volume',
    isEn ? 'Validation of restricted products before departure' : isZh ? '出发前确认敏感产品' : isAr ? 'الموافقة على المنتجات الحساسة قبل المغادرة' : 'Validation des produits sensibles avant départ',
    isEn
      ? `Recipient details for ${route.destination.city} delivery or pickup`
      : isZh ? `在 ${route.destination.city} 交付或提货的收货联系方式` : isAr ? `بيانات الاستلام للتسليم أو الأخذ في ${route.destination.city}` : `Coordonnées de réception pour livraison ou retrait à ${route.destination.city}`,
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      {/* Hero. Was a blue→indigo→purple diagonal gradient with centred type, a
          white button and a green button — three hues and two button voices on
          the first screen of eleven country routes. */}
      <PageHero
        eyebrow={isEn ? 'Shipping route' : isZh ? '海运 / 空运线路' : isAr ? 'خط بحري / جوي' : 'Route maritime / aérienne'}
        title={
          isEn
            ? `Shipping from ${route.origin.country} to ${route.destination.country}`
            : isZh ? `从 ${route.origin.country} 发货到 ${route.destination.country}` : isAr ? `الشحن من ${route.origin.country} إلى ${route.destination.country}` : `Expédition de ${route.origin.country} vers ${route.destination.country}`
        }
        lede={
          isEn
            ? `Reliable freight forwarding from ${route.origin.city} to ${route.destination.city}. Air and sea shipping options available.`
            : isZh ? `从 ${route.origin.city} 到 ${route.destination.city} 的可靠货代。可选空运和海运。` : isAr ? `وكيل شحن موثوق من ${route.origin.city} إلى ${route.destination.city}. خيارات شحن جوي وبحري متاحة.` : `Transitaire fiable de ${route.origin.city} vers ${route.destination.city}. Options fret aérien et maritime disponibles.`
        }
        photo={{
          src: PHOTOS.warehouseWide,
          alt: isEn
            ? 'ChinaLink Express consolidation warehouse in China'
            : isZh ? 'ChinaLink Express 在中国的集运仓库' : isAr ? 'مستودع التجميع التابع لـChinaLink Express في الصين' : 'Entrepôt de consolidation ChinaLink Express en Chine',
        }}
        actions={
          <>
            <Cta
              href={WHATSAPP_URL}
              external
              variant="solid"
              tone="void"
              size="lg"
              magnetic
              icon={<Phone size={17} aria-hidden />}
            >
              {isEn ? 'Get quote on WhatsApp' : isZh ? '在 WhatsApp 上询价' : isAr ? 'عرض سعر عبر WhatsApp' : 'Devis sur WhatsApp'}
            </Cta>
            <Cta href={`/${locale}/calculateur`} variant="outline" tone="void" size="lg">
              {isEn ? 'Calculate shipping cost' : isZh ? '计算费用' : isAr ? 'احسب الرسوم' : 'Calculer les frais'}
            </Cta>
          </>
        }
      />

      {/* Origin → destination. The connector was two gradients running
          blue→purple→green through a purple arrow between a blue dot and a
          green dot: five colours to draw one line. It is now a hairline and the
          two ends are type, which is what the reader is actually here for. */}
      <Band tone="paper" ruled>
        <Shell>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-xl)',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral)',
                  marginBottom: 'var(--space-xs)',
                }}
              >
                {isEn ? 'Origin' : isZh ? '始发地' : isAr ? 'المنشأ' : 'Origine'}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--weight-display)',
                  letterSpacing: 'var(--tracking-heading)',
                  color: 'var(--color-ink)',
                }}
              >
                {route.origin.city}
              </div>
              <div style={{ color: 'var(--color-ink-2)', fontSize: 'var(--text-sm)' }}>
                {route.origin.country}
              </div>
            </div>

            <div
              aria-hidden
              style={{
                flex: '1 1 8rem',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                minWidth: '4rem',
              }}
            >
              <span style={{ flex: 1, height: 1, backgroundColor: 'var(--color-rule-2)' }} />
              <ArrowRight size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
              <span style={{ flex: 1, height: 1, backgroundColor: 'var(--color-rule-2)' }} />
            </div>

            <div style={{ minWidth: 0, textAlign: 'end' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral)',
                  marginBottom: 'var(--space-xs)',
                }}
              >
                {isEn ? 'Destination' : 'Destination'}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--weight-display)',
                  letterSpacing: 'var(--tracking-heading)',
                  color: 'var(--color-ink)',
                }}
              >
                {route.destination.city}
              </div>
              <div style={{ color: 'var(--color-ink-2)', fontSize: 'var(--text-sm)' }}>
                {route.destination.country}
              </div>
            </div>
          </div>
        </Shell>
      </Band>

      {/* Shipping Options */}
      <section className="py-16 md:py-24 bg-[var(--surface-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Air Freight */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                    {isEn ? 'Air Freight' : isZh ? '空运' : isAr ? 'الشحن الجوي' : 'Fret Aérien'}
                  </h2>
                  <p className="text-[var(--text-tertiary)]">{isEn ? 'Fast delivery' : isZh ? '快速交付' : isAr ? 'تسليم سريع' : 'Livraison rapide'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  {route.airFreight.duration}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {isEn ? 'Available Routes' : isZh ? '可用线路' : isAr ? 'الخطوط المتاحة' : 'Routes Disponibles'}
                </h3>
                {route.airFreight.routes.map((r, i) => (
                  <div key={i} className="p-4 bg-[var(--surface-elevated)] rounded-lg">
                    <div className="text-sm text-[var(--text-tertiary)]">{r.via}</div>
                    <div className="text-[var(--text-primary)]">{r.path}</div>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/services/air-freight`}
                className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                {isEn ? 'Learn more about air freight' : isZh ? '了解更多空运信息' : isAr ? 'اعرف المزيد عن الشحن الجوي' : 'En savoir plus sur le fret aérien'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>

            {/* Sea Freight */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Ship className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                    {isEn ? 'Sea Freight' : isZh ? '海运' : isAr ? 'الشحن البحري' : 'Fret Maritime'}
                  </h2>
                  <p className="text-[var(--text-tertiary)]">{isEn ? 'Economical option' : isZh ? '经济选项' : isAr ? 'خيار اقتصادي' : 'Option économique'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-cyan-500" />
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  {route.seaFreight.duration}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {isEn ? 'Available Routes' : isZh ? '可用线路' : isAr ? 'الخطوط المتاحة' : 'Routes Disponibles'}
                </h3>
                {route.seaFreight.routes.map((r, i) => (
                  <div key={i} className="p-4 bg-[var(--surface-elevated)] rounded-lg">
                    <div className="text-sm text-[var(--text-tertiary)]">{r.via}</div>
                    <div className="text-[var(--text-primary)]">{r.path}</div>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/services/sea-freight`}
                className="mt-6 inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
              >
                {isEn ? 'Learn more about sea freight' : isZh ? '了解更多海运信息' : isAr ? 'اعرف المزيد عن الشحن البحري' : 'En savoir plus sur le fret maritime'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mali SEO Detail Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                  {isEn
                    ? isMaliRoute
                      ? 'Complete China to Mali Import Support'
                      : `Complete ${routeLabel} Import Support`
                    : isZh ? isMaliRoute
                      ? '从中国进口到马里的全程支持'
                      : `${routeLabel} 全程支持` : isAr ? isMaliRoute
                      ? 'دعم كامل للاستيراد من الصين إلى مالي'
                      : `دعم كامل ${routeLabel}` : isMaliRoute
                      ? 'Support complet pour importer de Chine au Mali'
                      : `Support complet ${routeLabel}`}
                </h2>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {isEn
                  ? 'ChinaLink Express is not only a freight contact. We help African importers source products, verify suppliers, pay in China, inspect goods, consolidate parcels, and choose the right freight mode, with Mali as our strongest operating hub.'
                  : isZh ? 'ChinaLink Express 不只是运输联系人。我们帮助非洲进口商采购产品、核验供应商、在中国付款、检查货物、合并包裹并选择合适的运输方式，马里是我们的主要运营枢纽。' : isAr ? 'ليست ChinaLink Express مجرد جهة اتصال للنقل. نساعد المستوردين الأفارقة على توريد المنتجات والتحقق من الموردين والدفع في الصين وفحص البضائع وتجميع الطرود واختيار طريقة الشحن المناسبة، ومالي هي مركز عملياتنا الرئيسي.' : 'ChinaLink Express n’est pas seulement un contact transport. Nous aidons les importateurs africains à sourcer les produits, vérifier les fournisseurs, payer en Chine, contrôler la marchandise, consolider les colis et choisir le bon mode de fret, avec le Mali comme hub opérationnel principal.'}
              </p>
              <ul className="grid gap-3">
                {importProof.map((item) => (
                  <li key={item} className="rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-[var(--text-secondary)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <FileText className="w-7 h-7 text-cyan-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                  {isEn ? 'Documents and Customs Preparation' : isZh ? '文件和清关准备' : isAr ? 'المستندات والتحضير الجمركي' : 'Documents et préparation douane'}
                </h2>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {isEn
                  ? 'Before shipment, confirm the documents and product category. Clear information reduces customs delays and avoids surprises at arrival.'
                  : isZh ? '发货前需要确认文件和产品类别。清晰的信息可减少海关延误和到货时的意外。' : isAr ? 'قبل الشحن يجب تأكيد المستندات وفئة المنتج. فالمعلومات الواضحة تقلل التأخير الجمركي والمفاجآت عند الوصول.' : 'Avant l’expédition, il faut confirmer les documents et la catégorie produit. Des informations claires réduisent les retards de douane et les mauvaises surprises à l’arrivée.'}
              </p>
              <ul className="grid gap-3">
                {customsPoints.map((item) => (
                  <li key={item} className="rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-[var(--text-secondary)]">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/guides/douane-mali-import-chine`}
                className="mt-6 inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
              >
                {isEn ? 'Read customs guide' : isZh ? '阅读海关指南' : isAr ? 'اقرأ الدليل الجمركي' : 'Lire le guide douane'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn 
                ? `Ship from ${route.origin.country} to ${route.destination.country}`
                : isZh ? `从 ${route.origin.country} 发货到 ${route.destination.country}` : isAr ? `اشحن من ${route.origin.country} إلى ${route.destination.country}` : `Expédiez de ${route.origin.country} vers ${route.destination.country}`}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? 'Get your free quote today. Professional freight forwarding services.'
                : isZh ? '今天就获取免费报价。专业货代服务。' : isAr ? 'احصل على عرض سعرك المجاني اليوم. خدمات وكيل شحن احترافية.' : 'Obtenez votre devis gratuit aujourd\'hui. Services de transitaire professionnels.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/calculateur`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {isEn ? 'Calculate Cost' : isZh ? '计算费用' : isAr ? 'احسب الكلفة' : 'Calculer le Coût'}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors"
              >
                {isEn ? 'Contact Us' : isZh ? '联系我们' : isAr ? 'تواصل معنا' : 'Contactez-nous'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

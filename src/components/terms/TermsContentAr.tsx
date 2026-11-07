/**
 * Terms & Conditions Content Component
 *
 * Main content for the Terms & Conditions page with all legal information.
 * Covers services, pricing, CBM calculations, prohibited items, and responsibilities.
 */

"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
   Ship,
   Plane,
   Package,
   Ruler,
   Shield,
   FileText,
   Phone,
   CheckCircle,
   XCircle,
   Info,
   DollarSign,
   Clock,
   MapPin,
   Scale,
   Globe,
   Ban,
   Gavel,
   HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";


interface SectionProps {
   icon: LucideIcon;
   title: string;
   children: React.ReactNode;
   id?: string;
}

function Section({ icon: IconComponent, title, children, id }: SectionProps) {
   return (
      <motion.section
         id={id}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="mb-12 scroll-mt-24"
      >
         <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
               <IconComponent className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h2>
         </div>
         <div className="pl-0 md:pl-14">{children}</div>
      </motion.section>
   );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
   return (
      <div className="mb-6">
         <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{title}</h3>
         {children}
      </div>
   );
}

function List({ items }: { items: string[] }) {
   return (
      <ul className="space-y-2">
         {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)]">
               <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
               <span>{item}</span>
            </li>
         ))}
      </ul>
   );
}

function ProhibitedList({ items }: { items: string[] }) {
   return (
      <ul className="space-y-2">
         {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)]">
               <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
               <span>{item}</span>
            </li>
         ))}
      </ul>
   );
}

function CalculationExample({
   title,
   steps,
   result,
}: {
   title: string;
   steps: string[];
   result: string;
}) {
   return (
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4 my-4">
         <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            {title}
         </h4>
         <div className="space-y-2 text-sm text-[var(--text-secondary)] mb-3">
            {steps.map((step, i) => (
               <div key={i} className="font-mono bg-[var(--surface)] p-2 rounded">
                  {step}
               </div>
            ))}
         </div>
         <div className="border-t border-[var(--border)] pt-3">
            <span className="font-semibold text-green-600">{result}</span>
         </div>
      </div>
   );
}

/**
 * A numbered contractual clause (3.1.1, 3.1.2, …). Pricing rules that a client
 * can be billed on are written as articles rather than bullets so each one can
 * be cited on its own in case of a dispute.
 */
function Clause({ number, title, children }: { number: string; title?: string; children: React.ReactNode }) {
   return (
      <div className="mb-4 pl-4 border-l-2 border-[var(--border)]">
         <p className="text-[var(--text-primary)] font-semibold mb-1">
            {number}
            {title ? ` — ${title}` : ""}
         </p>
         <div className="text-[var(--text-secondary)] text-sm leading-relaxed space-y-2">{children}</div>
      </div>
   );
}

function InfoBox({
   type,
   title,
   children,
}: {
   type: "info" | "warning" | "danger";
   title: string;
   children: React.ReactNode;
}) {
   const styles = {
      info: "bg-blue-50 border-blue-200 text-blue-800",
      warning: "bg-amber-50 border-amber-200 text-amber-800",
      danger: "bg-red-50 border-red-200 text-red-800",
   };

   return (
      <div className={`border rounded-lg p-4 my-4 ${styles[type]}`}>
         <h4 className="font-semibold mb-2">{title}</h4>
         <div className="text-sm opacity-90">{children}</div>
      </div>
   );
}

export function TermsContentAr({ locale }: { locale: string }) {
   return (
      <main className="min-h-screen bg-[var(--surface)]">
         {/* Hero Section */}
         <section className="bg-[var(--color-void)] pt-36 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
               >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 mb-6">
                     <FileText className="w-5 h-5" />
                     <span>الشروط والأحكام</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                     الشروط والأحكام العامة للبيع والنقل
                  </h1>
                  <p className="text-lg md:text-xl text-[var(--color-void-ink-2)] max-w-3xl mx-auto">
                     القواعد والأسعار وحسابات CBM والسلع المحظورة والمسؤوليات
                  </p>
                  <p className="text-sm text-[var(--color-void-ink-2)] mt-4">
                     آخر تحديث:{" "}
                     {new Date().toLocaleDateString('ar', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                     })}
                  </p>
               </motion.div>
            </div>
         </section>

         {/* Quick Navigation */}
         <div className="sticky top-16 z-40 bg-[var(--surface)] border-b border-[var(--border)] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
               <nav className="flex gap-4 text-sm whitespace-nowrap">
                  <a
                     href="#services"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     الخدمات
                  </a>
                  <a
                     href="#pricing"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     الأسعار
                  </a>
                  <a
                     href="#cbm"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     CBM
                  </a>
                  <a
                     href="#air"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     الشحن الجوي
                  </a>
                  <a
                     href="#sea"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     الشحن البحري
                  </a>
                  <a
                     href="#prohibited"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     المحظورات
                  </a>
                  <a
                     href="#responsibilities"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     المسؤوليات
                  </a>
                  <a
                     href="#insurance"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     التأمين
                  </a>
                  <a
                     href="#legal"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     قانوني
                  </a>
               </nav>
            </div>
         </div>

         {/* Main Content */}
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Introduction */}
            <Section icon={Info} title="1. المقدمة والتعريفات" id="intro">
               <p className="text-[var(--text-secondary)] mb-4">
                  تنظم هذه الشروط والأحكام العامة العلاقة بين ChinaLink Express (ويشار إليها فيما يلي بـ"نحن") وعملائها (ويشار إليهم فيما يلي بـ"أنت") في جميع خدمات التوريد والشراء والنقل والخدمات اللوجستية بين الصين وأفريقيا.
               </p>
               <p className="text-[var(--text-secondary)] mb-4">
                  باستخدام خدماتنا، فإنك تقبل دون تحفظ جميع الشروط الموضحة أدناه. ويجوز تعديل هذه الشروط في أي وقت، والنسخة السارية هي المنشورة على موقعنا.
               </p>
               <InfoBox type="info" title="للتواصل بشأن الأسئلة">
                  WhatsApp: ‎+86 188 5172 5957 (الصين) / ‎+223 76 69 61 77 (مالي)
               </InfoBox>
            </Section>

            {/* Services */}
            <Section icon={Package} title="2. خدماتنا" id="services">
               <SubSection title="2.1 التوريد والشراء">
                  <List
                     items={[
                        'التحقق من الموردين (الخلفية والمصنع والشهادات)',
                        'التفاوض على الأسعار وشروط الدفع',
                        'إدارة الطلبات والدفع للموردين',
                        'فحص الجودة قبل الشحن (فحص بصري)',
                        'العمولة: 5-10% من قيمة الطلب حسب الحجم والتعقيد',
                     ]}
                  />
               </SubSection>

               <SubSection title="2.2 الشحن الجوي">
                  <List
                     items={[
                        'نقل سريع بالطائرة من الصين إلى أفريقيا',
                        'المدة المتوسطة: 14-21 يوم عمل (حسب الوجهة)',
                        'التسعير حسب الوزن الفعلي أو الحجمي (الأعلى بينهما)',
                        'التتبع الفوري متاح',
                        'التسليم في المطار أو من الباب إلى الباب حسب الخيار المحدد',
                        'مثالي لـ: الهواتف والإلكترونيات والبضائع العاجلة',
                     ]}
                  />
               </SubSection>

               <SubSection title="2.3 الشحن البحري">
                  <List
                     items={[
                        'نقل اقتصادي بحاوية كاملة (FCL) أو شحن مجمّع (LCL)',
                        'المدة المتوسطة: 60-75 يوم عمل (من الصين إلى غرب أفريقيا)',
                        'التسعير بالـCBM (المتر المكعب) دون حد أدنى للحجم',
                        'الشركات الشريكة: COSCO وMAERSK وCMA CGM',
                        'الشحن المجمّع متاح للكميات الصغيرة (التجميع)',
                        'مثالي لـ: الأثاث والبضائع الثقيلة والكميات الكبيرة',
                     ]}
                  />
               </SubSection>

               <SubSection title="2.4 خدمة الدفع للموردين">
                  <List
                     items={[
                        'الدفع عبر Alipay والتحويل المصرفي (T/T)',

                        'ضمان دفع آمن وقابل للتتبع',
                        'توفير إثباتات الدفع (إيصالات وفواتير)',
                        'الحماية من احتيال الموردين',
                     ]}
                  />
               </SubSection>

               <SubSection title="2.5 الخدمة السريعة (الشحن الجوي فقط)">
                  <List
                     items={[
                        'نقل فائق السرعة خلال 3-7 أيام عمل',
                        'التسعير حسب الوزن الفعلي أو الحجمي',
                        'مثالي للمستندات والعينات والطرود العاجلة',
                        'الأسعار حسب عرض سعر وفق الوجهة والوزن',
                     ]}
                  />
               </SubSection>
            </Section>

            {/* Pricing */}
            <Section icon={DollarSign} title="3. الأسعار وحساب التكلفة" id="pricing">
               <SubSection title="3.1 الشحن الجوي - التسعير">
                  <p className="text-[var(--text-secondary)] mb-4">
                     يُحتسب الشحن الجوي على أساس <strong>الوزن الخاضع للرسوم</strong>، الذي يُحدَّد ويُقرَّب وفق المواد التالية.
                  </p>

                  <Clause number="3.1.1" title="تحديد الوزن الخاضع للرسوم">
                     <p>
                        الوزن الخاضع للرسوم هو الأعلى بين القيمتين التاليتين:
                     </p>
                     <p>
                        أ) <strong>الوزن الإجمالي</strong> للطرد، ويشمل البضاعة وتغليفها وحشوها وموادها الواقية؛
                     </p>
                     <p>
                        ب) <strong>الوزن الحجمي</strong>، ويُحسب بالمعادلة (الطول × العرض × الارتفاع، بالسنتيمتر) ÷ 5000.
                     </p>
                     <p>
                        تتوافق هذه القاعدة مع أعراف النقل الجوي الدولي، التي يحتسب الناقل بموجبها المساحة المشغولة عندما تتجاوز الكتلة المنقولة. والقاسم 5000 سم³/كغ هو المطبق لدى كبار مشغلي الشحن الجوي السريع، بينما يعتمد قرار IATA قاسم 6000 سم³/كغ للشحن الجوي العام.
                     </p>
                  </Clause>

                  <Clause number="3.1.2" title="التقريب">
                     <p>
                        يُقرَّب كل وزن إلى <strong>أعلى عُشر كيلوغرام (0.1 كغ)</strong>. فعلى سبيل المثال، يُقرَّب الوزن 1.21 كغ أو 1.23 كغ أو 1.24 كغ إلى 1.3 كغ.
                     </p>
                     <p>
                        وهذا التقريب أفضل للعميل من التقريب إلى أعلى نصف كيلوغرام (0.5 كغ) المعتاد في الشحن الجوي الدولي.
                     </p>
                  </Clause>

                  <Clause number="3.1.3" title="معامل المناولة والتغليف والتحويل">
                     <p>
                        يُطبق على الوزن الخاضع للرسوم معامل جزافي قدره{" "}
                        <strong>0.075 كغ لكل كيلوغرام، أي سبعة ونصف في المئة (7.5%)</strong>.
                     </p>
                     <p>يغطي هذا المعامل حصرًا:</p>
                     <p>
                        أ) توفير وتركيب التغليف والكراتين والحشو وأغشية الحماية؛ ب) عمالة التعبئة والتجميع والوزن والوسم والمناولة في المستودع؛ ج) رسوم تحويل الأموال وتحصيلها.
                     </p>
                     <p>
                        لا تُحتسب رسوم تغليف قياسي إضافية على هذا المعامل. وتبقى أنواع التغليف الخاصة التي يطلبها العميل (التحميل على منصات والصندوق المزدوج والصندوق الخشبي) خاضعة لعرض سعر مسبق.
                     </p>
                  </Clause>

                  <Clause number="3.1.4" title="ترتيب العمليات">
                     <p>
                        يُحدَّد الوزن المحتسب بالترتيب التالي: 1° وزن الطرد المغلف وقياسه؛ 2° تحديد الوزن الخاضع للرسوم (المادة 3.1.1)؛ 3° التقريب (المادة 3.1.2)؛ 4° تطبيق المعامل (المادة 3.1.3)؛ 5° التقريب النهائي (المادة 3.1.2)؛ 6° الضرب في سعر الفئة المطبقة.
                     </p>
                  </Clause>

                  <Clause number="3.1.5" title="الإلزام">
                     <p>
                        لأن هذه القواعد منشورة ومتاحة في أي وقت، فإنها تُعد معروفة ومقبولة من العميل منذ تسليم البضاعة إلى المستودع. ويجب تقديم أي اعتراض على الوزن أو الأبعاد <strong>قبل الشحن</strong> ، وبعد هذه المهلة يُعتد بالقياسات التي سجلتها ChinaLink Express.
                     </p>
                  </Clause>

                  <CalculationExample
                     title="المثال 1 — طرد كبير الحجم"
                     steps={[
                        'الطرد: الطول=50 سم × العرض=40 سم × الارتفاع=30 سم، الوزن الإجمالي = 8 كغ',
                        'الوزن الحجمي = (50 × 40 × 30) ÷ 5000 = 12 كغ',
                        'الوزن الخاضع للرسوم = max(8 كغ ; 12 كغ) = 12 كغ',
                        'المعامل: 12 × 1.075 = 12.9 كغ',
                        'التقريب إلى أعلى 0.1 كغ = 12.9 كغ',
                        'سعر فئة الإلكترونيات: 12 000 FCFA/كغ',
                        '12.9 كغ × 12 000 FCFA = 154 800 FCFA',
                     ]}
                     result="إجمالي الشحن الجوي: 154 800 FCFA"
                  />

                  <CalculationExample
                     title="المثال 2 — طرد صغير (تطبيق التقريب)"
                     steps={[
                        'الوزن الإجمالي المقيس = 1.23 كغ — الحجم غير مؤثر',
                        'التقريب إلى أعلى 0.1 كغ = 1.3 كغ',
                        'المعامل: 1.3 × 1.075 = 1.3975 كغ',
                        'التقريب النهائي إلى أعلى 0.1 كغ = 1.4 كغ',
                        'سعر الفئة القياسية: 10 500 FCFA/كغ',
                        '1.4 كغ × 10 500 FCFA = 14 700 FCFA',
                     ]}
                     result="إجمالي الشحن الجوي: 14 700 FCFA"
                  />

                  <div className="overflow-x-auto mt-4">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 الفئة
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 الوصف
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 السعر الاسترشادي
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">قياسي</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 بضائع عامة
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 10 500 FCFA/كغ
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 الإلكترونيات
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 الأجهزة الإلكترونية والطرود الحساسة (الحواسيب والتلفزيونات وغيرها)
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 12 000 FCFA/كغ
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">الهواتف</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 الهواتف الذكية (السعر للوحدة)
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">حسب عرض سعر</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>

               <SubSection title="3.2 الشحن البحري - التسعير بالـCBM">
                  <p className="text-[var(--text-secondary)] mb-3">
                     يُحسب الشحن البحري بالـCBM (المتر المكعب) وفق القواعد التالية:
                  </p>
                  <List
                     items={[
                        'CBM = الطول (م) × العرض (م) × الارتفاع (م)',
                        'لا حد أدنى للحجم: الحجم المسجل هو الحجم المحتسب',
                        'إذا كانت الكثافة > 200 كغ/م³: تعديل وفق قاعدة 1:200',
                        'إذا كانت الكثافة > 250 كغ/م³: قاعدة COSCO/MAERSK (1:250)',
                        'معادلة تعديل الكثافة العالية: الوزن (كغ) × 0.005 = CBM المعدل',
                     ]}
                  />

                  <CalculationExample
                     title="المثال 1 - CBM قياسي (كثافة عادية)"
                     steps={[
                        'أثاث: الطول=1.2 م × العرض=0.8 م × الارتفاع=1.0 م، الوزن = 80 كغ',
                        'CBM = 1.2 × 0.8 × 1.0 = 0.96 CBM',
                        'الكثافة = 80 ÷ 0.96 = 83 كغ/م³ (< 200، دون تعديل)',
                        'CBM النهائي = 0.96 (دون تقريب)',
                        'السعر الاسترشادي: 0.96 CBM × 350 000 FCFA = 336 000 FCFA',
                     ]}
                     result="إجمالي الشحن البحري: 336 000 FCFA"
                  />

                  <CalculationExample
                     title="المثال 2 - CBM عالي الكثافة (قاعدة COSCO/MAERSK)"
                     steps={[
                        'محركات: الطول=0.8 م × العرض=0.6 م × الارتفاع=0.5 م، الوزن = 350 كغ',
                        'CBM الأصلي = 0.8 × 0.6 × 0.5 = 0.24 CBM',
                        'الكثافة = 350 ÷ 0.24 = 1458 كغ/م³ (> 250)',
                        'التعديل: 350 كغ × 0.005 = 1.75 CBM',
                        'CBM النهائي = max(0.24, 1.75) = 1.75 CBM',
                        '1.75 CBM × 350 000 FCFA = 612 500 FCFA',
                     ]}
                     result="إجمالي الشحن البحري: 612 500 FCFA"
                  />
               </SubSection>

               <SubSection title="3.3 أسعار الهواتف (الشحن الجوي فقط)">
                  <InfoBox
                     type="warning"
                     title="مهم: لا يمكن شحن الهواتف بحرًا"
                  >
                     الهواتف والمعدات الإلكترونية الحساسة محظورة تمامًا في الشحن البحري لأسباب تتعلق بالسلامة واللوائح الجمركية.
                  </InfoBox>
                  <List
                     items={[
                        'الهواتف الذكية: سعر الوحدة حسب الوجهة والطراز',
                        'الهواتف العادية: سعر مخفض متاح',
                        'إكسسوارات الهاتف: السعر القياسي بالكيلوغرام',
                        '10 هواتف كحد أدنى لكل شحنة للحصول على سعر تفضيلي',
                        'التغليف الخاص إلزامي (برسوم إضافية إذا وفرناه)',
                     ]}
                  />
               </SubSection>

               <SubSection title="3.4 رسوم الخدمة">
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 الخدمة
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 الرسوم
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 ملاحظات
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 عمولة التوريد
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">5-10%</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 حسب حجم الطلب
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 الدفع للموردين
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">-</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 رسوم المعاملة
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 فحص الجودة
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">50-100$</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">اختياري</td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 التغليف والمناولة (الشحن الجوي)
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 مشمول — معامل 7.5%
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 انظر المادة 3.1.3
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 تغليف خاص
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">حسب عرض سعر</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 منصات وصندوق خشبي وصندوق مزدوج
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 التخزين في الصين
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 ما لم يوجد استثناء
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">--</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>
            </Section>

            {/* CBM Detailed */}
            <Section icon={Ruler} title="4. قواعد CBM التفصيلية (الشحن البحري)" id="cbm">
               <SubSection title="4.1 حساب CBM">
                  <p className="text-[var(--text-secondary)] mb-3">
                     CBM (المتر المكعب) هو وحدة الحجم المستخدمة في الشحن البحري.
                  </p>
                  <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm">
                     <p className="text-[var(--text-primary)] font-semibold mb-2">المعادلة:</p>
                     <p className="text-blue-600">CBM = الطول (م) × العرض (م) × الارتفاع (م)</p>
                     <p className="text-[var(--text-secondary)] mt-2 text-xs">
                        مثال: طرد 1.2 م × 0.8 م × 0.9 م = 0.864 CBM
                     </p>
                  </div>
               </SubSection>

               <SubSection title="4.2 لا حد أدنى للحجم">
                  <p className="text-[var(--text-secondary)] mb-3">
                     تدفع الحجم الدقيق المسجل في مستودعنا. ولا يوجد{" "}
                     <strong>تقريب ولا حد أدنى للحجم المحتسب</strong> : فالطرد المقيس بـ0.075 م³ يُحتسب بـ0.075 × سعر المتر المكعب.
                  </p>
                  <CalculationExample
                     title="مثال - طرد صغير"
                     steps={[
                        'طرد صغير: الطول=0.3 م × العرض=0.2 م × الارتفاع=0.15 م',
                        'CBM المحسوب = 0.3 × 0.2 × 0.15 = 0.009 CBM',
                        'CBM المحتسب = 0.009 CBM (الحجم المقيس)',
                        '0.009 CBM × 350 000 FCFA = 3 150 FCFA',
                     ]}
                     result="الإجمالي: 3 150 FCFA"
                  />
               </SubSection>

               <SubSection title="4.3 قواعد الكثافة">
                  <p className="text-[var(--text-secondary)] mb-3">
                     بالنسبة إلى البضائع عالية الكثافة، يُطبق تحويل الوزن/الحجم:
                  </p>
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 الكثافة
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 القاعدة المطبقة
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 حساب CBM
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 ≤ 200 كغ/م³
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">قياسي</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 CBM = الحجم الفعلي
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 200 - 250 كغ/م³
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">1:200</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 CBM = الوزن × 0.005
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 {`> 250`} كغ/م³
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 COSCO/MAERSK 1:250
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 CBM = الوزن × 0.005
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>
            </Section>

            {/* Air Freight Rules */}
            <Section icon={Plane} title="5. قواعد الشحن الجوي" id="air">
               <SubSection title="5.1 حساب الوزن الخاضع للرسوم">
                  <p className="text-[var(--text-secondary)] mb-3">
                     يستخدم الشحن الجوي الوزن الخاضع للرسوم، ويُحسب كما يلي:
                  </p>
                  <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                     <p className="font-mono text-sm text-blue-600 mb-2">
                        الوزن الحجمي = (الطول × العرض × الارتفاع بالسنتيمتر) ÷ 5000
                     </p>
                     <p className="font-mono text-sm text-green-600">
                        الوزن الخاضع للرسوم = MAX(الوزن الفعلي، الوزن الحجمي)
                     </p>
                  </div>
               </SubSection>

               <SubSection title="5.2 القيود">
                  <List
                     items={[
                        'الحد الأقصى لوزن الطرد: 70-100 كغ (حسب شركة الطيران)',
                        'الحد الأقصى للأبعاد: 120 سم × 80 سم × 80 سم (الأحجام الأكبر حسب عرض سعر)',
                        'البضائع الخطرة تخضع للتصريح',
                        'بطاريات الليثيوم: قيود وملصقات خاصة إلزامية',
                     ]}
                  />
               </SubSection>

               <SubSection title="5.3 إجراءات الشحن">
                  <List
                     items={[
                        'تصريح مفصل بالبضائع (الاسم والقيمة والكمية)',
                        'تقديم الفاتورة التجارية وقائمة التعبئة',
                        'فحص أمني إلزامي',
                        'التخليص الجمركي عند الوصول (نتولاه نحن أو أنت)',
                        'التسليم في المطار أو العنوان النهائي',
                     ]}
                  />
               </SubSection>
            </Section>

            {/* Sea Freight Rules */}
            <Section icon={Ship} title="6. قواعد الشحن البحري" id="sea">
               <SubSection title="6.1 أنواع النقل البحري">
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           FCL (حاوية كاملة)
                        </h4>
                        <List
                           items={[
                              'حاوية كاملة محجوزة لك',
                              '20 قدمًا (33 CBM) أو 40 قدمًا (67 CBM)',
                              'اقتصادي للكميات الكبيرة',
                              'أقصى درجات الأمان',
                           ]}
                        />
                     </div>
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           LCL (أقل من حاوية)
                        </h4>
                        <List
                           items={[
                              'شحن مجمّع مع عملاء آخرين',
                              'ادفع فقط مقابل CBM الخاص بك',
                              'مثالي للكميات الصغيرة',
                              'مدة أطول قليلًا',
                           ]}
                        />
                     </div>
                  </div>
               </SubSection>

               <SubSection title="6.2 المستندات المطلوبة">
                  <List
                     items={[
                        'الفاتورة التجارية (Commercial Invoice)',
                        'قائمة التعبئة (Packing List)',
                        'بوليصة الشحن (Bill of Lading / B/L)',
                        'شهادة المنشأ (إن وجدت)',
                        'رخص الاستيراد (حسب المنتجات)',
                     ]}
                  />
               </SubSection>

               <SubSection title="6.3 المدد والمسارات">
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 الوجهة
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 الميناء
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 المدة المقدرة
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">مالي (باماكو)</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 لومي / داكار / أبيدجان (عبور بري)
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 60-75 يومًا
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>
            </Section>

            {/* Prohibited Items */}
            <Section icon={Ban} title="7. السلع المحظورة والمقيدة" id="prohibited">
               <InfoBox type="danger" title="حظر مطلق - الشحن البحري">
                  الهواتف والحواسيب محظورة تمامًا في الشحن البحري.
               </InfoBox>

               <SubSection title="7.1 الفئة أ - محظور في الشحن البحري">
                  <ProhibitedList
                     items={[
                        'الهواتف المحمولة والهواتف الذكية',
                        'الحواسيب المحمولة والأجهزة اللوحية',
                        'بطاريات الليثيوم أيون (غير المركبة)',
                        'الطائرات المسيّرة ومعدات المراقبة',
                        'الأجهزة الإلكترونية ذات البطاريات القابلة للفصل',
                     ]}
                  />
               </SubSection>

               <SubSection title="7.2 الفئة ب - محظور في الشحن الجوي والبحري">
                  <ProhibitedList
                     items={[
                        'الأسلحة النارية والذخيرة والمتفجرات',
                        'المواد الكيميائية الخطرة (الأكالة والسامة)',
                        'المواد القابلة للاشتعال (البنزين والغاز والبخاخات)',
                        'المخدرات والمواد المخدرة',
                        'العلامات التجارية المقلدة (دون ترخيص)',
                        'المعدات العسكرية ومنتجات الحرب',
                        'المواد غير القانونية',
                     ]}
                  />
               </SubSection>

               <SubSection title="7.3 الفئة ج - مقيد (تراخيص مطلوبة)">
                  <List
                     items={[
                        'الأدوية (وصفة طبية ورخص)',
                        'المنتجات الغذائية (شهادات صحية)',
                        'مستحضرات التجميل (شهادات مطابقة)',
                        'قطع السيارات (شهادات منشأ)',
                        'السوائل والمواد الكيميائية الصناعية (MSDS مطلوب)',
                     ]}
                  />
               </SubSection>

               <SubSection title="7.4 العواقب">
                  <InfoBox type="warning" title="مسؤولية العميل">
                     تقع أي مصادرة أو غرامة أو إتلاف للبضائع المحظورة على عاتق العميل. وتخلي ChinaLink Express مسؤوليتها في حال عدم احترام المحظورات.
                  </InfoBox>
               </SubSection>
            </Section>

            {/* Customer Responsibilities */}
            <Section icon={Shield} title="8. مسؤوليات العميل" id="responsibilities">
               <SubSection title="8.1 التصريح بالبضائع">
                  <List
                     items={[
                        'تقديم وصف دقيق وكامل للمنتجات',
                        'التصريح بالقيمة الحقيقية للتأمين والجمارك',
                        'تحديد الأبعاد والوزن بدقة',
                        'الإبلاغ عن أي سلعة هشة أو تتطلب معاملة خاصة',
                        'عدم إخفاء أي بضائع محظورة',
                     ]}
                  />
               </SubSection>

               <SubSection title="8.2 التغليف والملصقات">
                  <List
                     items={[
                        'تغليف مناسب لطريقة النقل المختارة',
                        'حماية كافية للسلع الهشة',
                        'ملصقات واضحة: المستلم والمرسل والمحتوى',
                        'وضع علامة "قابل للكسر" عند الحاجة',
                        'أرقام هواتف ظاهرة على كل طرد',
                     ]}
                  />
               </SubSection>

               <SubSection title="8.3 المستندات والدفع">
                  <List
                     items={[
                        'تقديم كل المستندات المطلوبة في الوقت المناسب',
                        'الدفع الكامل قبل الشحن',
                        'الرسوم الجمركية عند الوصول حسب الاتفاق',
                        'تراخيص استيراد سارية',
                        'وثيقة هوية عند الاستلام',
                     ]}
                  />
               </SubSection>
            </Section>

            {/* Customs and Insurance */}
            <Section icon={Globe} title="9. الجمارك والتأمين" id="insurance">
               <SubSection title="9.1 التخليص الجمركي">
                  <p className="text-[var(--text-secondary)] mb-3">
                     أمامك خياران للتخليص الجمركي:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           الخيار 1: التخليص الجمركي مشمول
                        </h4>
                        <List
                           items={[
                              'نتولى العملية كلها',
                              'الرسوم الجمركية مشمولة في عرض السعر',
                              'تسليم مباشر إلى عنوانك',
                              'أغلى لكن دون مفاجآت',
                           ]}
                        />
                     </div>
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           الخيار 2: تخليص جمركي منفصل
                        </h4>
                        <List
                           items={[
                              'تدفع أنت الرسوم الجمركية',
                              'أرخص في البداية',
                              'تتولى أنت الإجراءات',
                              'تكاليف إضافية محتملة إذا كان التقدير خاطئًا',
                           ]}
                        />
                     </div>
                  </div>
               </SubSection>

               <SubSection title="9.2 تأمين النقل">
                  <InfoBox type="info" title="التغطية التأمينية">
                     يتوفر تأمين شامل اختياريًا. ويغطي: الفقدان الكلي والأضرار أثناء النقل والسرقة المثبتة. النسبة: 2-3% من القيمة المصرّح بها.
                  </InfoBox>
                  <List
                     items={[
                        'الاستثناءات: السلع سيئة التغليف والسلع المحظورة',
                        'مهلة المطالبة: 7 أيام بعد التسليم',
                        'المستندات المطلوبة: صور ومحضر معاينة وفاتورة الشراء',
                     ]}
                  />
               </SubSection>

               <SubSection title="9.3 الرسوم الجمركية">
                  <p className="text-[var(--text-secondary)] mb-3">
                     تختلف الرسوم الجمركية حسب بلد الوصول وطبيعة البضائع:
                  </p>
                  <ul className="space-y-2 text-[var(--text-secondary)]">
                     <li>• مالي: ضريبة القيمة المضافة 18% + رسوم جمركية (0-20% حسب المنتج)</li>
                  </ul>
               </SubSection>
            </Section>

            {/* Payment Terms */}
            <Section icon={DollarSign} title="10. شروط الدفع" id="payment">
               <SubSection title="10.1 الطرق">
                  <List
                     items={[
                        'الدفع الكامل قبل دفع ثمن البضاعة',
                        'الدفع عبر التحويل المصرفي وWestern Union وMoneyGram',
                        'Mobile Money متاح لبعض الدول (Wave وOrange Money)',
                     ]}
                  />
               </SubSection>

               <SubSection title="10.2 المبالغ المستردة">
                  <InfoBox type="warning" title="سياسة الاسترداد">
                     لا يمكن استرداد أي مبلغ بعد شحن البضاعة. وعند الإلغاء قبل الشحن، قد تُطبق رسوم 10-20% حسب تقدم المعالجة.
                  </InfoBox>
               </SubSection>
            </Section>

            {/* Liability and Legal */}
            <Section icon={Gavel} title="11. المسؤولية والقوة القاهرة" id="legal">
               <SubSection title="11.1 تحديد المسؤولية">
                  <List
                     items={[
                        'تقتصر مسؤوليتنا على القيمة المصرّح بها للبضائع',
                        'لسنا مسؤولين عن التأخير الناتج عن شركات النقل',
                        'لا مسؤولية في حالة المصادرة الجمركية بسبب مستندات غير صحيحة',
                        'الأضرار الناتجة عن تغليف غير مناسب: مسؤولية العميل',
                        'خسارة الأرباح أو المكاسب الفائتة: غير مشمولة',
                     ]}
                  />
               </SubSection>

               <SubSection title="11.2 القوة القاهرة">
                  <p className="text-[var(--text-secondary)] mb-3">
                     لا يمكن اعتبارنا مسؤولين عن التأخير أو الأضرار الناتجة عن:
                  </p>
                  <List
                     items={[
                        'الإضرابات وأعمال الشغب والاضطرابات المدنية',
                        'الكوارث الطبيعية (الفيضانات والزلازل)',
                        'الحرب والإرهاب وأعمال القرصنة',
                        'الأوبئة والجوائح والقيود الصحية',
                        'إغلاق الموانئ والحدود',
                        'تعطل أنظمة الحاسوب',
                     ]}
                  />
               </SubSection>

               <SubSection title="11.3 المطالبات والنزاعات">
                  <List
                     items={[
                        'يجب تقديم أي مطالبة كتابيًا خلال 7 أيام من التسليم',
                        'مع إرفاق الأدلة (صور ومستندات ومحضر معاينة)',
                        'نبدأ تحقيقًا خلال 14 يوم عمل',
                        'عند الخلاف، تُفضَّل الوساطة الودية',
                        'المحكمة المختصة: باماكو، مالي',
                     ]}
                  />
               </SubSection>

               <SubSection title="11.4 حماية البيانات">
                  <p className="text-[var(--text-secondary)] mb-3">
                     تُجمع بياناتك الشخصية لمعالجة طلباتك فقط، ولا تُباع أبدًا لأطراف ثالثة. ومطابقة لـGDPR للعملاء الأوروبيين.
                  </p>
                  <p className="text-[var(--text-secondary)]">
                     لمزيد من المعلومات، راجع{" "}
                     <Link href="/privacy" className="text-blue-600 hover:underline">
                        سياسة الخصوصية
                     </Link>
                     .
                  </p>
               </SubSection>
            </Section>

            {/* Contact Section */}
            <Section icon={HeadphonesIcon} title="12. التواصل والمساعدة" id="contact">
               <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-6">
                  <h4 className="font-semibold text-[var(--text-primary)] mb-4">
                     ChinaLink Express - دعم العملاء
                  </h4>
                  <div className="space-y-3 text-[var(--text-secondary)]">
                     <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Kalaban Coura, près du lycée Birgo, Bamako, Mali (باماكو، مالي)
                     </p>
                     <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        WhatsApp الصين: ‎+86 188 5172 5957
                     </p>
                     <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        WhatsApp مالي: ‎+223 76 69 61 77 / ‎+223 51 00 50 42
                     </p>
                     <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        الاثنين-الجمعة: 08:00-20:00 | السبت: 09:00-17:00 | الأحد: 10:00-15:00
                     </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--border)]">
                     <a
                        href="https://wa.me/8618851725957"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-3 px-6 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                     >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        تواصل معنا عبر WhatsApp
                     </a>
                  </div>
               </div>
            </Section>

            {/* Final Provisions */}
            <Section icon={Scale} title="13. أحكام ختامية" id="final">
               <p className="text-[var(--text-secondary)] mb-4">
                  تشكل هذه الشروط والأحكام العامة الاتفاق الكامل بين ChinaLink Express والعميل، وتلغي وتحل محل جميع الشروط السابقة.
               </p>
               <List
                  items={[
                     'التعديلات: يجوز تعديل الشروط في أي وقت دون إشعار مسبق',
                     'الإخطار: يُبلَّغ العملاء بالتعديلات المهمة',
                     'القانون الواجب التطبيق: القانون المالي',
                     'الاختصاص القضائي: محاكم باماكو، مالي',
                     'قابلية الفصل: إذا بطل بند، تبقى البنود الأخرى سارية',
                     'اللغة: عند الاختلاف، تكون النسخة الفرنسية هي المعتمدة',
                  ]}
               />
            </Section>

            {/* Back to Home */}
            <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
               <Link
                  href="/"
                  className="inline-flex items-center gap-2 py-3 px-6 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
               >
                  العودة إلى الصفحة الرئيسية
               </Link>
            </div>
         </div>
      </main>
   );
}

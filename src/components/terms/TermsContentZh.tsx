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

export function TermsContentZh({ locale }: { locale: string }) {
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
                     <span>条款和条件</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                     销售和运输条款和条件
                  </h1>
                  <p className="text-lg md:text-xl text-[var(--color-void-ink-2)] max-w-3xl mx-auto">
                     规则、价格、CBM 计算、禁运物品和责任
                  </p>
                  <p className="text-sm text-[var(--color-void-ink-2)] mt-4">
                     最后更新：{" "}
                     {new Date().toLocaleDateString('zh-CN', {
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
                     服务
                  </a>
                  <a
                     href="#pricing"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     价格
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
                     空运
                  </a>
                  <a
                     href="#sea"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     海运
                  </a>
                  <a
                     href="#prohibited"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     禁运
                  </a>
                  <a
                     href="#responsibilities"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     责任
                  </a>
                  <a
                     href="#insurance"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     保险
                  </a>
                  <a
                     href="#legal"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     法律
                  </a>
               </nav>
            </div>
         </div>

         {/* Main Content */}
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Introduction */}
            <Section icon={Info} title="1. 介绍和定义" id="intro">
               <p className="text-[var(--text-secondary)] mb-4">
                  本条款和条件规范 ChinaLink Express（以下简称"我们"）与其客户（以下简称"您"）之间，就中国与非洲之间所有采购、购买、运输和物流服务的关系。
               </p>
               <p className="text-[var(--text-secondary)] mb-4">
                  使用我们的服务，即表示您无保留地接受以下所有条款。这些条款可随时修改；有效版本以我们网站上公布的为准。
               </p>
               <InfoBox type="info" title="咨询联系方式">
                  WhatsApp：+86 188 5172 5957（中国）/ +223 76 69 61 77（马里）
               </InfoBox>
            </Section>

            {/* Services */}
            <Section icon={Package} title="2. 我们的服务" id="services">
               <SubSection title="2.1 采购和购买">
                  <List
                     items={[
                        '核验供应商（背景、工厂、认证）',
                        '谈判价格和付款条件',
                        '管理订单和向供应商付款',
                        '发货前质量检查（目视检查）',
                        '佣金：根据货量和复杂程度，为订单金额的 5-10%',
                     ]}
                  />
               </SubSection>

               <SubSection title="2.2 空运">
                  <List
                     items={[
                        '中国 → 非洲快速空运',
                        '平均时效：14-21 个工作日（视目的地而定）',
                        '按实际重量或体积重量计费（取较高者）',
                        '提供实时跟踪',
                        '根据所选方案交付到机场或门到门',
                        '适合：手机、电子产品、紧急货物',
                     ]}
                  />
               </SubSection>

               <SubSection title="2.3 海运">
                  <List
                     items={[
                        '经济的整箱（FCL）或拼箱（LCL）运输',
                        '平均时效：60-75 个工作日（中国 → 西非）',
                        '按 CBM（立方米）计费，无最低体积',
                        '合作公司：COSCO、MAERSK、CMA CGM',
                        '小批量可拼箱（集运）',
                        '适合：家具、重型货物、大批量货物',
                     ]}
                  />
               </SubSection>

               <SubSection title="2.4 供应商付款服务">
                  <List
                     items={[
                        '通过支付宝、银行转账（T/T）付款',

                        '保证付款安全且可追溯',
                        '提供付款凭证（收据、发票）',
                        '防范供应商欺诈',
                     ]}
                  />
               </SubSection>

               <SubSection title="2.5 快递服务（仅限空运）">
                  <List
                     items={[
                        '超快运输，3-7 个工作日',
                        '按实际重量或体积重量计费',
                        '适合文件、样品、紧急包裹',
                        '根据目的地和重量报价',
                     ]}
                  />
               </SubSection>
            </Section>

            {/* Pricing */}
            <Section icon={DollarSign} title="3. 价格和计价" id="pricing">
               <SubSection title="3.1 空运 - 计价">
                  <p className="text-[var(--text-secondary)] mb-4">
                     空运按 <strong>计费重量</strong>计费，按以下条款确定并进位。
                  </p>

                  <Clause number="3.1.1" title="确定计费重量">
                     <p>
                        计费重量是以下两个数值中的较高者：
                     </p>
                     <p>
                        a) <strong>毛重</strong> ：包裹的重量，包括货物及其包装、填充物和保护材料；
                     </p>
                     <p>
                        b) <strong>体积重量</strong>，按公式（长 × 宽 × 高，单位厘米）÷ 5000 计算。
                     </p>
                     <p>
                        此规则符合国际航空运输惯例，即当货物占用的空间超过其质量时，承运人按占用空间收费。5000 cm³/kg 的除数由主要航空快运运营商采用；IATA 决议对普通航空货运采用 6000 cm³/kg 的除数。
                     </p>
                  </Clause>

                  <Clause number="3.1.2" title="进位">
                     <p>
                        所有重量均进位至 <strong>上一个十分之一公斤（0.1 公斤）</strong>。例如，1.21 公斤、1.23 公斤或 1.24 公斤均进位至 1.3 公斤。
                     </p>
                     <p>
                        这种进位方式比国际航空货运通常采用的进位至上一个半公斤（0.5 公斤）对客户更有利。
                     </p>
                  </Clause>

                  <Clause number="3.1.3" title="搬运、包装和转账系数">
                     <p>
                        对计费重量适用固定系数：{" "}
                        <strong>每公斤 0.075 公斤，即百分之七点五（7.5%）</strong>.
                     </p>
                     <p>该系数仅涵盖：</p>
                     <p>
                        a) 提供并安装包装、纸箱、填充物和保护膜；b) 仓库内的包装、合并、称重、标记和搬运人工；c) 资金转账和收款费用。
                     </p>
                     <p>
                        除此系数外，不另收标准包装费。客户要求的特殊包装（托盘、双层箱、木箱）须事先报价。
                     </p>
                  </Clause>

                  <Clause number="3.1.4" title="操作顺序">
                     <p>
                        计费重量按以下顺序确定：1° 称量和测量已包装的包裹；2° 确定计费重量（第 3.1.1 条）；3° 进位（第 3.1.2 条）；4° 应用系数（第 3.1.3 条）；5° 最终进位（第 3.1.2 条）；6° 乘以适用类别的价格。
                     </p>
                  </Clause>

                  <Clause number="3.1.5" title="可对抗性">
                     <p>
                        本规则已公布且随时可查阅，自货物交付仓库起即视为客户已知悉并接受。任何关于重量或尺寸的异议必须在 <strong>发货前</strong> 提出；逾期以 ChinaLink Express 记录的测量结果为准。
                     </p>
                  </Clause>

                  <CalculationExample
                     title="示例 1 — 大体积包裹"
                     steps={[
                        '包裹：长=50cm × 宽=40cm × 高=30cm，毛重 = 8 kg',
                        '体积重量 = (50 × 40 × 30) ÷ 5000 = 12 kg',
                        '计费重量 = max(8 kg ; 12 kg) = 12 kg',
                        '系数：12 × 1.075 = 12.9 kg',
                        '进位至上一个 0.1 kg = 12.9 kg',
                        '电子产品类别价格：12 000 FCFA/kg',
                        '12.9 kg × 12 000 FCFA = 154 800 FCFA',
                     ]}
                     result="空运总计：154 800 FCFA"
                  />

                  <CalculationExample
                     title="示例 2 — 小包裹（应用进位）"
                     steps={[
                        '测得毛重 = 1.23 kg — 体积不起决定作用',
                        '进位至上一个 0.1 kg = 1.3 kg',
                        '系数：1.3 × 1.075 = 1.3975 kg',
                        '最终进位至上一个 0.1 kg = 1.4 kg',
                        '标准类别价格：10 500 FCFA/kg',
                        '1.4 kg × 10 500 FCFA = 14 700 FCFA',
                     ]}
                     result="空运总计：14 700 FCFA"
                  />

                  <div className="overflow-x-auto mt-4">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 类别
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 描述
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 参考价格
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">标准</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 普通货物
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 10 500 FCFA/kg
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 电子产品
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 电子设备和敏感包裹（电脑、电视等）
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 12 000 FCFA/kg
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">手机</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 智能手机（按台计价）
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">需报价</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>

               <SubSection title="3.2 海运 - CBM 计价">
                  <p className="text-[var(--text-secondary)] mb-3">
                     海运按 CBM（立方米）计算，规则如下：
                  </p>
                  <List
                     items={[
                        'CBM = 长(m) × 宽(m) × 高(m)',
                        '无最低体积：记录的体积即计费体积',
                        '如果密度 > 200 kg/m³：按 1:200 规则调整',
                        '如果密度 > 250 kg/m³：COSCO/MAERSK 规则（1:250）',
                        '高密度调整公式：重量(kg) × 0.005 = 调整后 CBM',
                     ]}
                  />

                  <CalculationExample
                     title="示例 1 - 标准 CBM（正常密度）"
                     steps={[
                        '家具：长=1.2m × 宽=0.8m × 高=1.0m，重量 = 80kg',
                        'CBM = 1.2 × 0.8 × 1.0 = 0.96 CBM',
                        '密度 = 80 ÷ 0.96 = 83 kg/m³（< 200，不调整）',
                        '最终 CBM = 0.96（不进位）',
                        '参考价格：0.96 CBM × 350 000 FCFA = 336 000 FCFA',
                     ]}
                     result="海运总计：336 000 FCFA"
                  />

                  <CalculationExample
                     title="示例 2 - 高密度 CBM（COSCO/MAERSK 规则）"
                     steps={[
                        '发动机：长=0.8m × 宽=0.6m × 高=0.5m，重量 = 350kg',
                        '原始 CBM = 0.8 × 0.6 × 0.5 = 0.24 CBM',
                        '密度 = 350 ÷ 0.24 = 1458 kg/m³（> 250）',
                        '调整：350 kg × 0.005 = 1.75 CBM',
                        '最终 CBM = max(0.24, 1.75) = 1.75 CBM',
                        '1.75 CBM × 350 000 FCFA = 612 500 FCFA',
                     ]}
                     result="海运总计：612 500 FCFA"
                  />
               </SubSection>

               <SubSection title="3.3 手机价格（仅限空运）">
                  <InfoBox
                     type="warning"
                     title="重要：手机不能通过海运发运"
                  >
                     出于安全和海关法规的原因，手机和敏感电子设备严禁海运。
                  </InfoBox>
                  <List
                     items={[
                        '智能手机：根据目的地和型号按台计价',
                        '功能手机：提供优惠价格',
                        '手机配件：按标准公斤价格',
                        '每票至少 10 部手机可享优惠价格',
                        '必须使用特殊包装（如由我们提供则额外收费）',
                     ]}
                  />
               </SubSection>

               <SubSection title="3.4 服务费">
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 服务
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 费用
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 备注
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 采购佣金
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">5-10%</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 根据订单量
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 供应商付款
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">-</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 交易费用
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 质量检查
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">50-100$</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">可选</td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 包装和搬运（空运）
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 已包含 — 系数 7.5%
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 见第 3.1.3 条
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 特殊包装
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">需报价</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 托盘、木箱、双层箱
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 中国仓储
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 例外情况除外
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">--</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>
            </Section>

            {/* CBM Detailed */}
            <Section icon={Ruler} title="4. CBM 详细规则（海运）" id="cbm">
               <SubSection title="4.1 CBM 计算">
                  <p className="text-[var(--text-secondary)] mb-3">
                     CBM（立方米）是海运使用的体积单位。
                  </p>
                  <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm">
                     <p className="text-[var(--text-primary)] font-semibold mb-2">公式：</p>
                     <p className="text-blue-600">CBM = 长(m) × 宽(m) × 高(m)</p>
                     <p className="text-[var(--text-secondary)] mt-2 text-xs">
                        示例：1.2m × 0.8m × 0.9m 的包裹 = 0.864 CBM
                     </p>
                  </div>
               </SubSection>

               <SubSection title="4.2 无最低体积">
                  <p className="text-[var(--text-secondary)] mb-3">
                     您按我们仓库记录的准确体积付款。{" "}
                     <strong>不进位，也没有最低计费体积</strong> ：测得 0.075 m³ 的包裹按 0.075 × 每立方米价格计费。
                  </p>
                  <CalculationExample
                     title="示例 - 小包裹"
                     steps={[
                        '小包裹：长=0.3m × 宽=0.2m × 高=0.15m',
                        '计算 CBM = 0.3 × 0.2 × 0.15 = 0.009 CBM',
                        '计费 CBM = 0.009 CBM（测得的体积）',
                        '0.009 CBM × 350 000 FCFA = 3 150 FCFA',
                     ]}
                     result="总计：3 150 FCFA"
                  />
               </SubSection>

               <SubSection title="4.3 密度规则">
                  <p className="text-[var(--text-secondary)] mb-3">
                     对于密度很高的货物，适用重量/体积换算：
                  </p>
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 密度
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 适用规则
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 CBM 计算
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 ≤ 200 kg/m³
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">标准</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 CBM = 实际体积
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 200 - 250 kg/m³
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">1:200</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 CBM = 重量 × 0.005
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 {`> 250`} kg/m³
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 COSCO/MAERSK 1:250
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 CBM = 重量 × 0.005
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>
            </Section>

            {/* Air Freight Rules */}
            <Section icon={Plane} title="5. 空运规则" id="air">
               <SubSection title="5.1 计费重量计算">
                  <p className="text-[var(--text-secondary)] mb-3">
                     空运使用计费重量，计算如下：
                  </p>
                  <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                     <p className="font-mono text-sm text-blue-600 mb-2">
                        体积重量 = (长 × 宽 × 高，单位 cm) ÷ 5000
                     </p>
                     <p className="font-mono text-sm text-green-600">
                        计费重量 = MAX(实际重量, 体积重量)
                     </p>
                  </div>
               </SubSection>

               <SubSection title="5.2 限制">
                  <List
                     items={[
                        '每件最大重量：70-100kg（视航空公司而定）',
                        '最大尺寸：120cm × 80cm × 80cm（超出需报价）',
                        '危险品须申报',
                        '锂电池：有限制，必须贴特殊标签',
                     ]}
                  />
               </SubSection>

               <SubSection title="5.3 发运程序">
                  <List
                     items={[
                        '详细申报货物（名称、价值、数量）',
                        '提供商业发票和装箱单',
                        '强制安全检查',
                        '到达时清关（由我们或您办理）',
                        '交付到机场或最终地址',
                     ]}
                  />
               </SubSection>
            </Section>

            {/* Sea Freight Rules */}
            <Section icon={Ship} title="6. 海运规则" id="sea">
               <SubSection title="6.1 海运类型">
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           FCL（整箱）
                        </h4>
                        <List
                           items={[
                              '为您预留的整个集装箱',
                              '20 尺（33 CBM）或 40 尺（67 CBM）',
                              '大批量经济实惠',
                              '最高安全性',
                           ]}
                        />
                     </div>
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           LCL（拼箱）
                        </h4>
                        <List
                           items={[
                              '与其他客户拼箱',
                              '只需支付您的 CBM',
                              '适合小批量',
                              '时效略长',
                           ]}
                        />
                     </div>
                  </div>
               </SubSection>

               <SubSection title="6.2 所需文件">
                  <List
                     items={[
                        '商业发票（Commercial Invoice）',
                        '装箱单（Packing List）',
                        '提单（Bill of Lading / B/L）',
                        '原产地证书（如适用）',
                        '进口许可证（视产品而定）',
                     ]}
                  />
               </SubSection>

               <SubSection title="6.3 时效和路线">
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 目的地
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 港口
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 预计时效
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">马里（巴马科）</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 洛美 / 达喀尔 / 阿比让（陆路转运）
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 60-75 天
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>
            </Section>

            {/* Prohibited Items */}
            <Section icon={Ban} title="7. 禁运和限制物品" id="prohibited">
               <InfoBox type="danger" title="绝对禁止 - 海运">
                  手机和电脑严禁海运。
               </InfoBox>

               <SubSection title="7.1 A 类 - 禁止海运">
                  <ProhibitedList
                     items={[
                        '手机和智能手机',
                        '笔记本电脑和平板电脑',
                        '锂离子电池（未安装）',
                        '无人机和监控设备',
                        '带可拆卸电池的电子设备',
                     ]}
                  />
               </SubSection>

               <SubSection title="7.2 B 类 - 禁止空运和海运">
                  <ProhibitedList
                     items={[
                        '枪支、弹药、爆炸物',
                        '危险化学品（腐蚀性、有毒）',
                        '易燃物质（汽油、气体、气雾剂）',
                        '毒品和麻醉品',
                        '假冒品牌（未经授权）',
                        '军用物资和战争用品',
                        '非法物品',
                     ]}
                  />
               </SubSection>

               <SubSection title="7.3 C 类 - 限制（需要许可）">
                  <List
                     items={[
                        '药品（处方和许可证）',
                        '食品（卫生证书）',
                        '化妆品（合格证书）',
                        '汽车配件（原产地证书）',
                        '液体和工业化学品（需要 MSDS）',
                     ]}
                  />
               </SubSection>

               <SubSection title="7.4 后果">
                  <InfoBox type="warning" title="客户责任">
                     禁运货物的任何没收、罚款或销毁均由客户承担。如未遵守禁令，ChinaLink Express 不承担任何责任。
                  </InfoBox>
               </SubSection>
            </Section>

            {/* Customer Responsibilities */}
            <Section icon={Shield} title="8. 客户责任" id="responsibilities">
               <SubSection title="8.1 货物申报">
                  <List
                     items={[
                        '提供准确完整的产品描述',
                        '为保险和海关申报真实价值',
                        '准确说明尺寸和重量',
                        '告知任何易碎或需要特殊处理的物品',
                        '不得隐瞒禁运货物',
                     ]}
                  />
               </SubSection>

               <SubSection title="8.2 包装和标签">
                  <List
                     items={[
                        '包装适合所选运输方式',
                        '对易碎物品提供足够保护',
                        '标签清晰：收件人、发件人、内容物',
                        '必要时标记"易碎"',
                        '每个包裹上有清晰可见的电话号码',
                     ]}
                  />
               </SubSection>

               <SubSection title="8.3 文件和付款">
                  <List
                     items={[
                        '及时提供所有所需文件',
                        '发货前全额付款',
                        '到达时的海关费用按约定',
                        '有效的进口许可',
                        '提货需身份证件',
                     ]}
                  />
               </SubSection>
            </Section>

            {/* Customs and Insurance */}
            <Section icon={Globe} title="9. 海关和保险" id="insurance">
               <SubSection title="9.1 清关">
                  <p className="text-[var(--text-secondary)] mb-3">
                     清关有两种选择：
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           选项 1：含清关
                        </h4>
                        <List
                           items={[
                              '我们管理整个流程',
                              '海关费用包含在报价中',
                              '直接交付到您的地址',
                              '价格更高，但没有意外',
                           ]}
                        />
                     </div>
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           选项 2：单独清关
                        </h4>
                        <List
                           items={[
                              '您支付海关费用',
                              '初始价格更低',
                              '您办理手续',
                              '估算有误时可能产生额外费用',
                           ]}
                        />
                     </div>
                  </div>
               </SubSection>

               <SubSection title="9.2 运输保险">
                  <InfoBox type="info" title="保险范围">
                     可选择一切险。承保范围：全损、运输途中的损坏、经证实的盗窃。费率：申报价值的 2-3%。
                  </InfoBox>
                  <List
                     items={[
                        '除外责任：包装不当的物品、禁运物品',
                        '索赔期限：交付后 7 天',
                        '所需文件：照片、查验报告、购买发票',
                     ]}
                  />
               </SubSection>

               <SubSection title="9.3 关税">
                  <p className="text-[var(--text-secondary)] mb-3">
                     关税根据目的国和货物性质而不同：
                  </p>
                  <ul className="space-y-2 text-[var(--text-secondary)]">
                     <li>• 马里：18% 增值税 + 关税（根据产品 0-20%）</li>
                  </ul>
               </SubSection>
            </Section>

            {/* Payment Terms */}
            <Section icon={DollarSign} title="10. 付款条件" id="payment">
               <SubSection title="10.1 方式">
                  <List
                     items={[
                        '在支付货款前全额付款',
                        '通过银行转账、Western Union、MoneyGram 付款',
                        '部分国家可使用移动支付（Wave、Orange Money）',
                     ]}
                  />
               </SubSection>

               <SubSection title="10.2 退款">
                  <InfoBox type="warning" title="退款政策">
                     货物发运后不可退款。发货前取消，根据处理进度可能收取 10-20% 的费用。
                  </InfoBox>
               </SubSection>
            </Section>

            {/* Liability and Legal */}
            <Section icon={Gavel} title="11. 责任和不可抗力" id="legal">
               <SubSection title="11.1 责任限制">
                  <List
                     items={[
                        '我们的责任限于货物的申报价值',
                        '我们不对运输公司造成的延误负责',
                        '因文件不正确被海关没收，我们不承担责任',
                        '因包装不当造成的损坏：由客户负责',
                        '利润损失或收益损失：不予承保',
                     ]}
                  />
               </SubSection>

               <SubSection title="11.2 不可抗力">
                  <p className="text-[var(--text-secondary)] mb-3">
                     对于以下原因造成的延误或损坏，我们不承担责任：
                  </p>
                  <List
                     items={[
                        '罢工、暴乱、内乱',
                        '自然灾害（洪水、地震）',
                        '战争、恐怖主义、海盗行为',
                        '流行病、大流行、卫生限制',
                        '港口封锁、边境关闭',
                        '计算机系统故障',
                     ]}
                  />
               </SubSection>

               <SubSection title="11.3 索赔和争议">
                  <List
                     items={[
                        '任何索赔必须在交付后 7 天内以书面形式提出',
                        '附证据（照片、文件、查验报告）',
                        '我们在 14 个工作日内展开调查',
                        '如有分歧，优先友好调解',
                        '管辖法院：马里巴马科',
                     ]}
                  />
               </SubSection>

               <SubSection title="11.4 数据保护">
                  <p className="text-[var(--text-secondary)] mb-3">
                     您的个人数据仅为处理订单而收集，绝不会出售给第三方。对欧洲客户符合 GDPR。
                  </p>
                  <p className="text-[var(--text-secondary)]">
                     更多信息，请查看我们的{" "}
                     <Link href="/privacy" className="text-blue-600 hover:underline">
                        隐私政策
                     </Link>
                     .
                  </p>
               </SubSection>
            </Section>

            {/* Contact Section */}
            <Section icon={HeadphonesIcon} title="12. 联系和帮助" id="contact">
               <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-6">
                  <h4 className="font-semibold text-[var(--text-primary)] mb-4">
                     ChinaLink Express - 客户支持
                  </h4>
                  <div className="space-y-3 text-[var(--text-secondary)]">
                     <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Kalaban Coura, près du lycée Birgo, Bamako, Mali（马里巴马科）
                     </p>
                     <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        WhatsApp 中国：+86 188 5172 5957
                     </p>
                     <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        WhatsApp 马里：+223 76 69 61 77 / +223 51 00 50 42
                     </p>
                     <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        周一至周五：08:00-20:00 | 周六：09:00-17:00 | 周日：10:00-15:00
                     </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--border)]">
                     <a
                        href="https://wa.me/8618851725957"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-3 px-6 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                     >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        通过 WhatsApp 联系我们
                     </a>
                  </div>
               </div>
            </Section>

            {/* Final Provisions */}
            <Section icon={Scale} title="13. 最终条款" id="final">
               <p className="text-[var(--text-secondary)] mb-4">
                  本条款和条件构成 ChinaLink Express 与客户之间的完整协议，并取代之前的所有条款。
               </p>
               <List
                  items={[
                     '修改：条款可随时修改，恕不另行通知',
                     '通知：重要修改将通知客户',
                     '适用法律：马里法律',
                     '管辖：马里巴马科法院',
                     '可分割性：如某条款无效，其他条款继续有效',
                     '语言：如有分歧，以法语版本为准',
                  ]}
               />
            </Section>

            {/* Back to Home */}
            <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
               <Link
                  href="/"
                  className="inline-flex items-center gap-2 py-3 px-6 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
               >
                  返回首页
               </Link>
            </div>
         </div>
      </main>
   );
}

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

export function TermsContent({ locale = "fr" }: { locale?: string }) {
   const isEn = locale === "en";

   if (isEn) {
      return (
         <main className="min-h-screen bg-[var(--surface)]">
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 md:py-24">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-center"
                  >
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 mb-6">
                        <FileText className="w-5 h-5" />
                        <span>Terms and Conditions</span>
                     </div>
                     <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Terms and Conditions of Sale and Transport
                     </h1>
                     <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                        Service scope, rates, CBM rules, restricted items, insurance, and customer responsibilities for China to Africa logistics.
                     </p>
                     <p className="text-sm text-blue-200 mt-4">
                        Last updated:{" "}
                        {new Date().toLocaleDateString("en-US", {
                           year: "numeric",
                           month: "long",
                           day: "numeric",
                        })}
                     </p>
                  </motion.div>
               </div>
            </section>

            <div className="sticky top-16 z-40 bg-[var(--surface)] border-b border-[var(--border)] shadow-sm">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
                  <nav className="flex gap-4 text-sm whitespace-nowrap">
                     {[
                        ["services", "Services"],
                        ["pricing", "Rates"],
                        ["cbm", "CBM"],
                        ["air", "Air"],
                        ["sea", "Sea"],
                        ["prohibited", "Restrictions"],
                        ["responsibilities", "Responsibilities"],
                        ["insurance", "Insurance"],
                        ["legal", "Legal"],
                     ].map(([href, label]) => (
                        <a
                           key={href}
                           href={`#${href}`}
                           className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                        >
                           {label}
                        </a>
                     ))}
                  </nav>
               </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <Section icon={Info} title="1. Introduction and Definitions" id="intro">
                  <p className="text-[var(--text-secondary)] mb-4">
                     These terms govern the relationship between ChinaLink Express ("we", "our")
                     and each customer ("you", "your") for sourcing, purchasing, forwarding,
                     warehousing, transport, and related logistics services between China and
                     Africa. Mali and Bamako are our primary operational hub, with service
                     coverage extending across West Africa and selected African destinations.
                  </p>
                  <p className="text-[var(--text-secondary)] mb-4">
                     By using our services, requesting a quote, delivering goods to our warehouse,
                     or asking us to pay or coordinate with a supplier, you accept these terms.
                     The version published on this website is the current version.
                  </p>
                  <InfoBox type="info" title="Support contacts">
                     WhatsApp: +86 188 5172 5957 (China desk) / +223 76 69 61 77 (Mali desk)
                  </InfoBox>
               </Section>

               <Section icon={Package} title="2. Services" id="services">
                  <SubSection title="2.1 Sourcing and Purchasing">
                     <List
                        items={[
                           "Supplier verification, order coordination, and purchase follow-up",
                           "Price and payment-term negotiation when requested",
                           "Payment coordination through available China payment channels",
                           "Basic pre-shipment visual checks for selected orders",
                           "Service fee generally ranges from 5% to 10% depending on volume and complexity",
                        ]}
                     />
                  </SubSection>

                  <SubSection title="2.2 Air Freight">
                     <List
                        items={[
                           "Fast air cargo from China to Mali and other African destinations",
                           "Typical transit estimate: 14-21 working days depending on route and destination",
                           "Charged by actual or volumetric weight, whichever is higher",
                           "Tracking and status updates through WhatsApp when available",
                           "Best for electronics, samples, fashion items, and urgent goods",
                        ]}
                     />
                  </SubSection>

                  <SubSection title="2.3 Sea Freight">
                     <List
                        items={[
                           "Economical container and consolidated shipping for bulk goods",
                           "Typical transit estimate: 60-75 working days from China to West Africa",
                           "Charged by CBM with minimum billable volume rules",
                           "Consolidation is available for smaller shipments",
                           "Best for furniture, machines, household goods, and heavy stock",
                        ]}
                     />
                  </SubSection>

                  <SubSection title="2.4 Supplier Payment Service">
                     <List
                        items={[
                           "Payment support for approved suppliers through available payment channels",
                           "Payment proof can be shared when the transaction is completed",
                           "Fraud-risk review is available, but no supplier can be guaranteed without due diligence",
                           "You remain responsible for product selection, technical specifications, and final order approval",
                        ]}
                     />
                  </SubSection>

                  <SubSection title="2.5 Express Handling">
                     <List
                        items={[
                           "Priority handling for documents, samples, and urgent packages",
                           "Transit and pricing depend on destination, weight, airline rules, and product category",
                           "Some urgent or sensitive shipments may require a custom quote",
                        ]}
                     />
                  </SubSection>
               </Section>

               <Section icon={DollarSign} title="3. Rates and Chargeable Weight" id="pricing">
                  <SubSection title="3.1 Air Freight Calculation">
                     <p className="text-[var(--text-secondary)] mb-4">
                        Air freight is charged on the <strong>chargeable weight</strong>, determined
                        and rounded in accordance with the articles below.
                     </p>

                     <Clause number="3.1.1" title="Determination of chargeable weight">
                        <p>Chargeable weight is the higher of the following two values:</p>
                        <p>
                           a) the <strong>gross weight</strong> of the package, including the goods
                           together with their packaging, filling and protective materials;
                        </p>
                        <p>
                           b) the <strong>volumetric weight</strong>, calculated as
                           (Length × Width × Height, in centimetres) ÷ 5000.
                        </p>
                        <p>
                           This rule follows international air freight practice, under which the
                           carrier charges for the space occupied where that space exceeds the mass
                           carried. The 5000 cm³/kg divisor is the one applied by the main express
                           air freight operators; the IATA resolution uses a 6000 cm³/kg divisor for
                           general air cargo.
                        </p>
                     </Clause>

                     <Clause number="3.1.2" title="Rounding">
                        <p>
                           All weights are rounded <strong>up to the next tenth of a kilogram
                           (0.1 kg)</strong>. By way of illustration, a weight of 1.21 kg, 1.23 kg or
                           1.24 kg is rounded to 1.3 kg.
                        </p>
                        <p>
                           This rounding is more favourable to the Client than the rounding up to the
                           next half-kilogram (0.5 kg) customarily applied in international air
                           freight.
                        </p>
                     </Clause>

                     <Clause number="3.1.3" title="Handling, packing and transfer coefficient">
                        <p>
                           A flat coefficient of <strong>0.075 kg per kilogram, being seven point
                           five per cent (7.5%)</strong>, is applied to the chargeable weight.
                        </p>
                        <p>This coefficient covers exclusively:</p>
                        <p>
                           a) the supply and application of packaging, cartons, filling and
                           protective film; b) the labour of packing, consolidation, weighing,
                           marking and warehouse handling; c) funds transfer and collection charges.
                        </p>
                        <p>
                           No standard packing charge is invoiced in addition to this coefficient.
                           Specific packaging requested by the Client (palletising, double-casing,
                           wooden crating) remains subject to a prior quotation.
                        </p>
                     </Clause>

                     <Clause number="3.1.4" title="Order of operations">
                        <p>
                           The invoiced weight is established in the following order: 1° weighing and
                           measurement of the packed parcel; 2° determination of chargeable weight
                           (art. 3.1.1); 3° rounding (art. 3.1.2); 4° application of the coefficient
                           (art. 3.1.3); 5° final rounding (art. 3.1.2); 6° multiplication by the
                           rate of the applicable category.
                        </p>
                     </Clause>

                     <Clause number="3.1.5" title="Enforceability">
                        <p>
                           These rules being published and accessible at all times, they are deemed
                           known to and accepted by the Client upon delivery of the goods to the
                           warehouse. Any dispute as to weight or dimensions must be raised{" "}
                           <strong>before shipment</strong>; after that point the measurements
                           recorded by ChinaLink Express shall prevail.
                        </p>
                     </Clause>

                     <CalculationExample
                        title="Example 1 — Bulky package"
                        steps={[
                           "Package: L=50cm x W=40cm x H=30cm, gross weight = 8 kg",
                           "Volumetric weight = (50 x 40 x 30) / 5000 = 12 kg",
                           "Chargeable weight = max(8 kg; 12 kg) = 12 kg",
                           "Coefficient: 12 x 1.075 = 12.9 kg",
                           "Rounded up to the next 0.1 kg = 12.9 kg",
                           "Electronics category rate: 12,000 XOF/kg",
                           "12.9 kg x 12,000 XOF = 154,800 XOF",
                        ]}
                        result="Estimated air freight: 154,800 XOF"
                     />

                     <CalculationExample
                        title="Example 2 — Small parcel (rounding applied)"
                        steps={[
                           "Measured gross weight = 1.23 kg — volume not determinant",
                           "Rounded up to the next 0.1 kg = 1.3 kg",
                           "Coefficient: 1.3 x 1.075 = 1.3975 kg",
                           "Final rounding up to the next 0.1 kg = 1.4 kg",
                           "General goods rate: 10,000 XOF/kg",
                           "1.4 kg x 10,000 XOF = 14,000 XOF",
                        ]}
                        result="Estimated air freight: 14,000 XOF"
                     />
                  </SubSection>

                  <SubSection title="3.2 Indicative Air Categories">
                     <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                           <thead className="bg-[var(--surface-elevated)]">
                              <tr>
                                 <th className="px-4 py-3 text-left text-[var(--text-primary)]">Category</th>
                                 <th className="px-4 py-3 text-left text-[var(--text-primary)]">Description</th>
                                 <th className="px-4 py-3 text-left text-[var(--text-primary)]">Indicative rate</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-[var(--border)]">
                              <tr>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">General goods</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Standard merchandise</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">From 10,000 XOF/kg</td>
                              </tr>
                              <tr>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Sensitive electronics</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Computers, screens, and fragile electronics</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">From 12,000 XOF/kg</td>
                              </tr>
                              <tr>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Phones</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Unit pricing may apply</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Custom quote</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </SubSection>
               </Section>

               <Section icon={Ruler} title="4. Sea Freight and CBM" id="cbm">
                  <SubSection title="4.1 CBM Formula">
                     <p className="text-[var(--text-secondary)] mb-3">
                        Sea freight is generally calculated by cubic meter. Very dense cargo may
                        be adjusted under carrier weight-to-volume rules.
                     </p>
                     <List
                        items={[
                           "CBM = length x width x height in meters",
                           "Minimum billable volume may apply even when volume is lower",
                           "Dense cargo may be converted using carrier density rules",
                           "Final cost depends on route, volume, product category, and destination handling",
                        ]}
                     />
                     <CalculationExample
                        title="Standard CBM example"
                        steps={[
                           "Furniture: L=1.2m x W=0.8m x H=1.0m, weight = 80kg",
                           "CBM = 1.2 x 0.8 x 1.0 = 0.96 CBM",
                           "Density = 80 / 0.96 = 83 kg/m3",
                           "Final volume may be rounded to 1.0 CBM",
                           "Example: 1.0 CBM x 350,000 XOF = 350,000 XOF",
                        ]}
                        result="Estimated sea freight: 350,000 XOF"
                     />
                  </SubSection>

                  <SubSection title="4.2 High-Density Cargo">
                     <CalculationExample
                        title="High-density example"
                        steps={[
                           "Motors: L=0.8m x W=0.6m x H=0.5m, weight = 350kg",
                           "Original CBM = 0.8 x 0.6 x 0.5 = 0.24 CBM",
                           "Density = 350 / 0.24 = 1458 kg/m3",
                           "Adjusted CBM may be required under carrier rules",
                           "Example adjusted CBM = 1.75 CBM",
                        ]}
                        result="High-density shipments require route confirmation"
                     />
                  </SubSection>
               </Section>

               <Section icon={Plane} title="5. Phones and Sensitive Electronics" id="air">
                  <InfoBox type="warning" title="Air-only handling for many electronics">
                     Phones, laptops, batteries, and sensitive electronics are often restricted by
                     sea carriers or require special documentation. We review these items before
                     accepting them.
                  </InfoBox>
                  <List
                     items={[
                        "Smartphones may be billed per unit or by special category",
                        "Accessories can often move under standard air cargo rates",
                        "Battery rules depend on airline acceptance and packaging",
                        "Incorrect declaration may cause delay, seizure, fines, or shipment rejection",
                     ]}
                  />
               </Section>

               <Section icon={Ship} title="6. Sea Operations, Documents, and Routes" id="sea">
                  <SubSection title="6.1 FCL and LCL">
                     <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                           <h4 className="font-semibold text-[var(--text-primary)] mb-2">FCL</h4>
                           <List
                              items={[
                                 "Dedicated container for high-volume shipments",
                                 "20ft and 40ft containers depending on availability",
                                 "Better economics for larger volumes",
                                 "Stronger control over container handling",
                              ]}
                           />
                        </div>
                        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                           <h4 className="font-semibold text-[var(--text-primary)] mb-2">LCL</h4>
                           <List
                              items={[
                                 "Shared container consolidation",
                                 "Pay only for your billable volume",
                                 "Useful for smaller commercial shipments",
                                 "May require additional consolidation time",
                              ]}
                           />
                        </div>
                     </div>
                  </SubSection>

                  <SubSection title="6.2 Required Documents">
                     <List
                        items={[
                           "Commercial invoice",
                           "Packing list",
                           "Bill of lading or airway bill",
                           "Certificate of origin when required",
                           "Import permits, conformity certificates, or product-specific documents when applicable",
                        ]}
                     />
                  </SubSection>

                  <SubSection title="6.3 Common Route Estimates">
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                           <thead className="bg-[var(--surface-elevated)]">
                              <tr>
                                 <th className="px-4 py-3 text-left text-[var(--text-primary)]">Destination</th>
                                 <th className="px-4 py-3 text-left text-[var(--text-primary)]">Main gateways</th>
                                 <th className="px-4 py-3 text-left text-[var(--text-primary)]">Estimate</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-[var(--border)]">
                              <tr>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Mali and Bamako</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Lome, Dakar, or Abidjan plus inland transit</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">60-75 days</td>
                              </tr>
                              <tr>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Senegal, Ivory Coast, Ghana, Nigeria</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Regional sea and inland gateways</td>
                                 <td className="px-4 py-3 text-[var(--text-secondary)]">Route-specific estimate</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </SubSection>
               </Section>

               <Section icon={Ban} title="7. Prohibited and Restricted Items" id="prohibited">
                  <InfoBox type="danger" title="Do not ship restricted goods without approval">
                     If an item is restricted, sensitive, branded, battery-powered, liquid,
                     chemical, medical, military, or food-related, contact us before sending it.
                  </InfoBox>
                  <SubSection title="7.1 Commonly Restricted for Sea Freight">
                     <ProhibitedList
                        items={[
                           "Phones, laptops, tablets, and battery-powered devices when sea rules prohibit them",
                           "Loose lithium batteries and power banks",
                           "Drones and surveillance equipment",
                           "Sensitive electronics with removable batteries",
                        ]}
                     />
                  </SubSection>
                  <SubSection title="7.2 Prohibited Across Modes">
                     <ProhibitedList
                        items={[
                           "Weapons, ammunition, explosives, and military goods",
                           "Dangerous chemicals, corrosive products, toxic products, and flammables",
                           "Illegal narcotics and controlled substances",
                           "Counterfeit branded goods without authorization",
                           "Goods forbidden by origin, transit, or destination law",
                        ]}
                     />
                  </SubSection>
                  <SubSection title="7.3 Restricted with Documentation">
                     <List
                        items={[
                           "Medicines and medical items",
                           "Food, cosmetics, and health-related products",
                           "Automotive parts and regulated spare parts",
                           "Liquids, chemicals, and industrial products requiring MSDS documents",
                        ]}
                     />
                  </SubSection>
               </Section>

               <Section icon={Shield} title="8. Customer Responsibilities" id="responsibilities">
                  <SubSection title="8.1 Product Declaration">
                     <List
                        items={[
                           "Provide complete product names, quantity, value, dimensions, and weight",
                           "Declare fragile, sensitive, battery-powered, branded, or regulated goods",
                           "Provide truthful values for insurance, customs, and compliance checks",
                           "Do not hide restricted goods inside another shipment",
                        ]}
                     />
                  </SubSection>
                  <SubSection title="8.2 Packaging and Labeling">
                     <List
                        items={[
                           "Use packaging suitable for the transport mode selected",
                           "Protect fragile goods before handing them to the supplier or warehouse",
                           "Add clear receiver details, phone numbers, package marks, and handling notes",
                           "Mark fragile or upright-only packages when required",
                        ]}
                     />
                  </SubSection>
                  <SubSection title="8.3 Documents and Payment">
                     <List
                        items={[
                           "Provide required documents before departure or customs processing",
                           "Pay confirmed service charges according to the agreed payment schedule",
                           "Maintain valid import authorizations when required by destination law",
                           "Present identification when collecting goods if requested",
                        ]}
                     />
                  </SubSection>
               </Section>

               <Section icon={Globe} title="9. Customs and Insurance" id="insurance">
                  <SubSection title="9.1 Customs Handling">
                     <p className="text-[var(--text-secondary)] mb-3">
                        Customs treatment depends on destination country, product type, declared
                        value, documentation, and current border requirements.
                     </p>
                     <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                           <h4 className="font-semibold text-[var(--text-primary)] mb-2">Included handling</h4>
                           <List
                              items={[
                                 "We coordinate standard clearance when it is part of the confirmed offer",
                                 "We provide status updates as documents move through the process",
                                 "Additional steps may apply for regulated goods",
                              ]}
                           />
                        </div>
                        <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                           <h4 className="font-semibold text-[var(--text-primary)] mb-2">Separate handling</h4>
                           <List
                              items={[
                                 "You may handle destination duties directly when agreed",
                                 "Unexpected taxes or compliance checks can change final timing",
                                 "Incorrect paperwork may create extra cost or delay",
                              ]}
                           />
                        </div>
                     </div>
                  </SubSection>
                  <SubSection title="9.2 Insurance">
                     <InfoBox type="info" title="Optional coverage">
                        Insurance may be available for declared value, proven loss, theft, or
                        transport damage. Coverage does not apply to poor packaging, hidden
                        restricted goods, false declaration, or excluded categories.
                     </InfoBox>
                     <List
                        items={[
                           "Claims should be submitted promptly after delivery or loss confirmation",
                           "Photos, invoice, packing details, and tracking references may be required",
                           "Coverage terms depend on product category and declared value",
                        ]}
                     />
                  </SubSection>
               </Section>

               <Section icon={DollarSign} title="10. Payment Terms" id="payment">
                  <SubSection title="10.1 Payment Methods">
                     <List
                        items={[
                           "Payment may be accepted by bank transfer, available money-transfer services, or approved mobile money channels",
                           "Supplier payments generally require funds before purchase execution",
                           "Freight payment timing depends on customer profile, shipment value, and product category",
                        ]}
                     />
                  </SubSection>
                  <SubSection title="10.2 Refunds and Cancellation">
                     <InfoBox type="warning" title="Refund policy">
                        Once goods are purchased, collected, booked, or shipped, cancellation may
                        be limited. Supplier charges, warehouse costs, carrier charges, and
                        processing fees may be deducted when cancellation is possible.
                     </InfoBox>
                  </SubSection>
               </Section>

               <Section icon={Gavel} title="11. Liability, Disputes, and Data" id="legal">
                  <SubSection title="11.1 Limitation of Liability">
                     <List
                        items={[
                           "Our liability is limited to the declared value and the confirmed service terms",
                           "We are not liable for delays caused by carriers, ports, airlines, weather, strikes, inspections, or public authorities",
                           "We are not liable for seizure or penalties caused by incorrect documents, false declaration, or restricted goods",
                           "Damage caused by insufficient packaging remains the responsibility of the sender or shipment owner",
                           "Lost profit, indirect loss, and business interruption are excluded",
                        ]}
                     />
                  </SubSection>
                  <SubSection title="11.2 Force Majeure">
                     <p className="text-[var(--text-secondary)] mb-3">
                        We are not responsible for delay or damage caused by events beyond our
                        reasonable control, including:
                     </p>
                     <List
                        items={[
                           "Strikes, riots, civil unrest, war, terrorism, and piracy",
                           "Natural disasters, floods, earthquakes, and severe weather",
                           "Health restrictions, epidemics, border closures, and port congestion",
                           "Carrier failure, customs holds, system outages, and government action",
                        ]}
                     />
                  </SubSection>
                  <SubSection title="11.3 Claims and Disputes">
                     <List
                        items={[
                           "Claims should be submitted in writing within 7 days after delivery or issue confirmation",
                           "Photos, invoices, inspection notes, and tracking references should support each claim",
                           "We aim to investigate valid claims within 14 working days",
                           "Friendly mediation is preferred before formal legal action",
                           "Competent jurisdiction: Bamako, Mali, unless mandatory law requires otherwise",
                        ]}
                     />
                  </SubSection>
                  <SubSection title="11.4 Data Protection">
                     <p className="text-[var(--text-secondary)] mb-3">
                        We collect personal and shipment data only to process orders, communicate
                        with customers, coordinate suppliers, arrange transport, and meet legal
                        requirements. We do not sell customer data.
                     </p>
                     <p className="text-[var(--text-secondary)]">
                        For more information, review our{" "}
                        <Link href={`/${locale}/privacy`} className="text-blue-600 hover:underline">
                           Privacy Policy
                        </Link>
                        .
                     </p>
                  </SubSection>
               </Section>

               <Section icon={HeadphonesIcon} title="12. Contact and Assistance" id="contact">
                  <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-6">
                     <h4 className="font-semibold text-[var(--text-primary)] mb-4">
                        ChinaLink Express - Customer Support
                     </h4>
                     <div className="space-y-3 text-[var(--text-secondary)]">
                        <p className="flex items-center gap-2">
                           <MapPin className="w-4 h-4 text-blue-500" />
                           Kalaban Coura, near Birgo high school, Bamako, Mali
                        </p>
                        <p className="flex items-center gap-2">
                           <Phone className="w-4 h-4 text-green-500" />
                           China desk WhatsApp: +86 188 5172 5957
                        </p>
                        <p className="flex items-center gap-2">
                           <Phone className="w-4 h-4 text-green-500" />
                           Mali desk WhatsApp: +223 76 69 61 77 / +223 51 00 50 42
                        </p>
                        <p className="flex items-center gap-2">
                           <Clock className="w-4 h-4 text-amber-500" />
                           Monday-Friday: 08:00-20:00 | Saturday: 09:00-17:00 | Sunday: 10:00-15:00
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
                           Contact us on WhatsApp
                        </a>
                     </div>
                  </div>
               </Section>

               <Section icon={Scale} title="13. Final Provisions" id="final">
                  <p className="text-[var(--text-secondary)] mb-4">
                     These terms form the entire agreement between ChinaLink Express and the
                     customer for the services described here. They replace prior informal
                     statements unless a signed written agreement states otherwise.
                  </p>
                  <List
                     items={[
                        "Changes: these terms may be updated when services, routes, laws, or operating conditions change",
                        "Notice: important changes may be communicated through the website or direct customer channels",
                        "Applicable law: Mali law where legally permitted",
                        "Jurisdiction: courts of Bamako, Mali, unless mandatory law requires otherwise",
                        "Severability: if one clause is invalid, the remaining clauses continue to apply",
                        "Language: when legally permitted, the French version remains the reference legal version",
                     ]}
                  />
               </Section>

               <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
                  <Link
                     href={`/${locale}`}
                     className="inline-flex items-center gap-2 py-3 px-6 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
                  >
                     Back to home
                  </Link>
               </div>
            </div>
         </main>
      );
   }

   return (
      <main className="min-h-screen bg-[var(--surface)]">
         {/* Hero Section */}
         <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
               >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 mb-6">
                     <FileText className="w-5 h-5" />
                     <span>Conditions Générales</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                     Conditions Générales de Vente et Transport
                  </h1>
                  <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                     Règles, tarifs, calculs CBM, articles interdits et responsabilités
                  </p>
                  <p className="text-sm text-blue-200 mt-4">
                     Dernière mise à jour :{" "}
                     {new Date().toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
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
                     Services
                  </a>
                  <a
                     href="#pricing"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     Tarifs
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
                     Fret Aérien
                  </a>
                  <a
                     href="#sea"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     Fret Maritime
                  </a>
                  <a
                     href="#prohibited"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     Interdictions
                  </a>
                  <a
                     href="#responsibilities"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     Responsabilités
                  </a>
                  <a
                     href="#insurance"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     Assurance
                  </a>
                  <a
                     href="#legal"
                     className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                     Légal
                  </a>
               </nav>
            </div>
         </div>

         {/* Main Content */}
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Introduction */}
            <Section icon={Info} title="1. Introduction et Définitions" id="intro">
               <p className="text-[var(--text-secondary)] mb-4">
                  Les présentes Conditions Générales régissent les relations entre ChinaLink Express
                  (ci-après &quot;nous&quot;, &quot;notre&quot;) et ses clients (ci-après
                  &quot;vous&quot;, &quot;votre&quot;) pour tous services de sourcing, achat,
                  transport et logistique entre la Chine et l&apos;Afrique.
               </p>
               <p className="text-[var(--text-secondary)] mb-4">
                  En utilisant nos services, vous acceptez sans réserve l&apos;ensemble des
                  conditions décrites ci-dessous. Ces conditions peuvent être modifiées à tout
                  moment ; la version en vigueur est celle publiée sur notre site.
               </p>
               <InfoBox type="info" title="Contact pour questions">
                  WhatsApp : +86 188 5172 5957 (Chine) / +223 76 69 61 77 (Mali)
               </InfoBox>
            </Section>

            {/* Services */}
            <Section icon={Package} title="2. Nos Services" id="services">
               <SubSection title="2.1 Sourcing et Achat">
                  <List
                     items={[
                        "Vérification des fournisseurs (antécédents, usine, certifications)",
                        "Négociation des prix et conditions de paiement",
                        "Gestion des commandes et paiements aux fournisseurs",
                        "Contrôle qualité avant expédition (inspection visuelle)",
                        "Commission : 5-10% du montant de la commande selon volume et complexité",
                     ]}
                  />
               </SubSection>

               <SubSection title="2.2 Fret Aérien">
                  <List
                     items={[
                        "Transport rapide par avion Chine → Afrique",
                        "Délai moyen : 14-21 jours ouvrables (selon destination)",
                        "Tarification au poids réel ou volumétrique (le plus élevé)",
                        "Tracking en temps réel disponible",
                        "Livraison à l'aéroport ou porte-à-porte selon option choisie",
                        "Idéal pour : téléphones, électronique, marchandises urgentes",
                     ]}
                  />
               </SubSection>

               <SubSection title="2.3 Fret Maritime">
                  <List
                     items={[
                        "Transport économique par conteneur (FCL) ou groupage (LCL)",
                        "Délai moyen : 60-75 jours ouvrables (Chine → Afrique de l'Ouest)",
                        "Tarification au CBM (mètre cube) avec minimum 0.1 CBM",
                        "Compagnies partenaires : COSCO, MAERSK, CMA CGM",
                        "Groupage disponible pour petits volumes (consolidation)",
                        "Idéal pour : meubles, marchandises lourdes, volumes importants",
                     ]}
                  />
               </SubSection>

               <SubSection title="2.4 Service Paiement Fournisseurs">
                  <List
                     items={[
                        "Paiement via Alipay, virement bancaire (T/T)",

                        "Garantie de paiement sécurisé et traçable",
                        "Justificatifs de paiement fournis (reçus, factures)",
                        "Protection contre fraude fournisseur",
                     ]}
                  />
               </SubSection>

               <SubSection title="2.5 Service Express (Fret Aérien uniquement)">
                  <List
                     items={[
                        "Transport ultra-rapide 3-7 jours ouvrables",
                        "Tarification au poids réel ou volumétrique",
                        "Idéal pour documents, échantillons, colis urgents",
                        "Tarifs sur devis selon destination et poids",
                     ]}
                  />
               </SubSection>
            </Section>

            {/* Pricing */}
            <Section icon={DollarSign} title="3. Tarifs et Calculs de Prix" id="pricing">
               <SubSection title="3.1 Fret Aérien - Tarification">
                  <p className="text-[var(--text-secondary)] mb-4">
                     Le fret aérien est facturé au <strong>poids taxable</strong>, déterminé et
                     arrondi selon les articles ci-après.
                  </p>

                  <Clause number="3.1.1" title="Détermination du poids taxable">
                     <p>
                        Le poids taxable est la plus élevée des deux valeurs suivantes :
                     </p>
                     <p>
                        a) le <strong>poids brut</strong> du colis, comprenant la marchandise ainsi
                        que son emballage, son calage et ses protections ;
                     </p>
                     <p>
                        b) le <strong>poids volumétrique</strong>, obtenu par la formule
                        (Longueur × Largeur × Hauteur, en centimètres) ÷ 5000.
                     </p>
                     <p>
                        Cette règle est conforme aux usages du transport aérien international, selon
                        lesquels le transporteur facture l&apos;espace occupé lorsque celui-ci excède
                        la masse transportée. Le diviseur de 5000 cm³/kg est celui appliqué par les
                        principaux opérateurs de fret aérien express ; la résolution IATA retient un
                        diviseur de 6000 cm³/kg pour le fret aérien général.
                     </p>
                  </Clause>

                  <Clause number="3.1.2" title="Arrondi">
                     <p>
                        Tout poids est arrondi au <strong>dixième de kilogramme (0,1 kg)
                        supérieur</strong>. À titre d&apos;illustration, un poids de 1,21 kg,
                        1,23 kg ou 1,24 kg est arrondi à 1,3 kg.
                     </p>
                     <p>
                        Cet arrondi est plus favorable au Client que l&apos;arrondi au
                        demi-kilogramme (0,5 kg) supérieur usuellement pratiqué en fret aérien
                        international.
                     </p>
                  </Clause>

                  <Clause number="3.1.3" title="Coefficient de manutention, d'emballage et de transfert">
                     <p>
                        Il est appliqué au poids taxable un coefficient forfaitaire de{" "}
                        <strong>0,075 kg par kilogramme, soit sept virgule cinq pour cent (7,5 %)</strong>.
                     </p>
                     <p>Ce coefficient couvre exclusivement :</p>
                     <p>
                        a) la fourniture et la pose des emballages, cartons, calages et films de
                        protection ; b) la main-d&apos;œuvre de conditionnement, de regroupement, de
                        pesée, de marquage et de manutention en entrepôt ; c) les frais de transfert
                        et d&apos;encaissement des fonds.
                     </p>
                     <p>
                        Aucun frais d&apos;emballage standard n&apos;est facturé en sus de ce
                        coefficient. Les emballages spécifiques demandés par le Client (palettisation,
                        double caisse, caisse bois) demeurent soumis à devis préalable.
                     </p>
                  </Clause>

                  <Clause number="3.1.4" title="Ordre des opérations">
                     <p>
                        Le poids facturé est établi dans l&apos;ordre suivant : 1° pesée et mesure du
                        colis emballé ; 2° détermination du poids taxable (art. 3.1.1) ; 3° arrondi
                        (art. 3.1.2) ; 4° application du coefficient (art. 3.1.3) ; 5° arrondi final
                        (art. 3.1.2) ; 6° multiplication par le tarif de la catégorie applicable.
                     </p>
                  </Clause>

                  <Clause number="3.1.5" title="Opposabilité">
                     <p>
                        Les présentes règles étant publiées et accessibles à tout moment, elles sont
                        réputées connues et acceptées du Client dès la remise de la marchandise à
                        l&apos;entrepôt. Toute contestation relative au poids ou aux dimensions doit
                        être formulée <strong>avant expédition</strong> ; passé ce délai, les
                        mesures relevées par ChinaLink Express font foi.
                     </p>
                  </Clause>

                  <CalculationExample
                     title="Exemple 1 — Colis volumineux"
                     steps={[
                        "Colis : L=50cm × l=40cm × H=30cm, poids brut = 8 kg",
                        "Poids volumétrique = (50 × 40 × 30) ÷ 5000 = 12 kg",
                        "Poids taxable = max(8 kg ; 12 kg) = 12 kg",
                        "Coefficient : 12 × 1,075 = 12,9 kg",
                        "Arrondi au 0,1 kg supérieur = 12,9 kg",
                        "Tarif catégorie Électronique : 12 000 FCFA/kg",
                        "12,9 kg × 12 000 FCFA = 154 800 FCFA",
                     ]}
                     result="Total fret aérien : 154 800 FCFA"
                  />

                  <CalculationExample
                     title="Exemple 2 — Petit colis (application de l'arrondi)"
                     steps={[
                        "Poids brut mesuré = 1,23 kg — volume non déterminant",
                        "Arrondi au 0,1 kg supérieur = 1,3 kg",
                        "Coefficient : 1,3 × 1,075 = 1,3975 kg",
                        "Arrondi final au 0,1 kg supérieur = 1,4 kg",
                        "Tarif catégorie Standard : 10 000 FCFA/kg",
                        "1,4 kg × 10 000 FCFA = 14 000 FCFA",
                     ]}
                     result="Total fret aérien : 14 000 FCFA"
                  />

                  <div className="overflow-x-auto mt-4">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Catégorie
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Description
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Tarif indicatif
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Standard</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Marchandises générales
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 10 000 FCFA/kg
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Électronique
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Appareils électroniques et colis sensibles (ordinateurs, TV, etc.)
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 12 000 FCFA/kg
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Téléphones</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Smartphones (tarif/unité)
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Sur devis</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>

               <SubSection title="3.2 Fret Maritime - Tarification CBM">
                  <p className="text-[var(--text-secondary)] mb-3">
                     Le fret maritime est calculé au CBM (Cubic Meter / mètre cube) avec les règles
                     suivantes :
                  </p>
                  <List
                     items={[
                        "CBM = Longueur(m) × Largeur(m) × Hauteur(m)",
                        "Minimum facturable : 0.1 CBM (même si volume inférieur)",
                        "Si densité {`> 200`} kg/m³ : ajustement selon règle 1:200",
                        "Si densité {`> 250`} kg/m³ : règle COSCO/MAERSK (1:250)",
                        "Formule ajustement haute densité : Poids(kg) × 0.005 = CBM ajusté",
                     ]}
                  />

                  <CalculationExample
                     title="Exemple 1 - CBM Standard (densité normale)"
                     steps={[
                        "Meubles : L=1.2m × l=0.8m × H=1.0m, Poids = 80kg",
                        "CBM = 1.2 × 0.8 × 1.0 = 0.96 CBM",
                        "Densité = 80 ÷ 0.96 = 83 kg/m³ (< 200, pas d'ajustement)",
                        "CBM final = 0.96 (arrondi à 1.0 CBM)",
                        "Tarif indicatif : 1.0 CBM × 350 000 FCFA = 350 000 FCFA",
                     ]}
                     result="Total fret maritime : 350 000 FCFA"
                  />

                  <CalculationExample
                     title="Exemple 2 - CBM Haute Densité (règle COSCO/MAERSK)"
                     steps={[
                        "Moteurs : L=0.8m × l=0.6m × H=0.5m, Poids = 350kg",
                        "CBM original = 0.8 × 0.6 × 0.5 = 0.24 CBM",
                        "Densité = 350 ÷ 0.24 = 1458 kg/m³ (> 250)",
                        "Ajustement : 350 kg × 0.005 = 1.75 CBM",
                        "CBM final = max(0.24, 1.75) = 1.75 CBM",
                        "1.75 CBM × 350 000 FCFA = 612 500 FCFA",
                     ]}
                     result="Total fret maritime : 612 500 FCFA"
                  />
               </SubSection>

               <SubSection title="3.3 Tarifs Téléphones (Fret Aérien uniquement)">
                  <InfoBox
                     type="warning"
                     title="Important : Les téléphones ne peuvent pas être expédiés par fret maritime"
                  >
                     Les téléphones et équipements électroniques sensibles sont strictement
                     interdits en fret maritime pour des raisons de sécurité et de réglementation
                     douanière.
                  </InfoBox>
                  <List
                     items={[
                        "Smartphones : tarif unitaire selon destination et modèle",
                        "Téléphones classiques : tarif réduit disponible",
                        "Accessoires téléphone : tarif au kg standard",
                        "Minimum 10 téléphones par envoi pour tarif préférentiel",
                        "Emballage spécial obligatoire (frais supplémentaires si fourni par nous)",
                     ]}
                  />
               </SubSection>

               <SubSection title="3.4 Frais de Service">
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Service
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Frais
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Notes
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Commission sourcing
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">5-10%</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Selon volume commande
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Paiement fournisseur
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">-</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Frais transaction
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Contrôle qualité
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">50-100$</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Optionnel</td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Emballage et manutention (aérien)
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Inclus — coefficient 7,5 %
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Voir art. 3.1.3
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Emballage spécial
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Sur devis</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Palettes, caisse bois, double caisse
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Stockage Chine
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 sauf exception
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">--</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>
            </Section>

            {/* CBM Detailed */}
            <Section icon={Ruler} title="4. Règles CBM Détaillées (Fret Maritime)" id="cbm">
               <SubSection title="4.1 Calcul du CBM">
                  <p className="text-[var(--text-secondary)] mb-3">
                     Le CBM (Cubic Meter) est l'unité de volume utilisée pour le fret maritime.
                  </p>
                  <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm">
                     <p className="text-[var(--text-primary)] font-semibold mb-2">Formule :</p>
                     <p className="text-blue-600">CBM = Longueur(m) × Largeur(m) × Hauteur(m)</p>
                     <p className="text-[var(--text-secondary)] mt-2 text-xs">
                        Exemple : Un colis de 1.2m × 0.8m × 0.9m = 0.864 CBM
                     </p>
                  </div>
               </SubSection>

               <SubSection title="4.2 Minimum CBM">
                  <p className="text-[var(--text-secondary)] mb-3">
                     Quel que soit le volume réel de votre marchandise, un minimum de{" "}
                     <strong>0.1 CBM</strong> est facturé.
                  </p>
                  <CalculationExample
                     title="Exemple - Minimum CBM"
                     steps={[
                        "Petit colis : L=0.3m × l=0.2m × H=0.15m",
                        "CBM calculé = 0.3 × 0.2 × 0.15 = 0.009 CBM",
                        "CBM facturable = max(0.009, 0.1) = 0.1 CBM",
                        "0.1 CBM × 350 000 FCFA = 35 000 FCFA minimum",
                     ]}
                     result="Total minimum : 35 000 FCFA"
                  />
               </SubSection>

               <SubSection title="4.3 Règles de Densité">
                  <p className="text-[var(--text-secondary)] mb-3">
                     Pour les marchandises très denses, une conversion poids/volume s'applique :
                  </p>
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Densité
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Règle appliquée
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Calcul CBM
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 ≤ 200 kg/m³
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Standard</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 CBM = Volume réel
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 200 - 250 kg/m³
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">1:200</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 CBM = Poids × 0.005
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
                                 CBM = Poids × 0.005
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>
            </Section>

            {/* Air Freight Rules */}
            <Section icon={Plane} title="5. Règles Fret Aérien" id="air">
               <SubSection title="5.1 Calcul du Poids Taxable">
                  <p className="text-[var(--text-secondary)] mb-3">
                     Le fret aérien utilise le poids taxable, calculé comme suit :
                  </p>
                  <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                     <p className="font-mono text-sm text-blue-600 mb-2">
                        Poids volumétrique = (L × l × H en cm) ÷ 5000
                     </p>
                     <p className="font-mono text-sm text-green-600">
                        Poids taxable = MAX(Poids réel, Poids volumétrique)
                     </p>
                  </div>
               </SubSection>

               <SubSection title="5.2 Limitations">
                  <List
                     items={[
                        "Poids maximum par colis : 70-100kg (selon compagnie aérienne)",
                        "Dimensions max : 120cm × 80cm × 80cm (volumes supérieurs sur devis)",
                        "Marchandises dangereuses soumises à déclaration",
                        "Batteries lithium : restrictions et étiquetage spécial obligatoire",
                     ]}
                  />
               </SubSection>

               <SubSection title="5.3 Procédure d'Expédition">
                  <List
                     items={[
                        "Déclaration détaillée des marchandises (nom, valeur, quantité)",
                        "Fourniture facture commerciale et packing list",
                        "Inspection de sécurité obligatoire",
                        "Dédouanement à l'arrivée (nous gérons ou vous gérez)",
                        "Livraison à l'aéroport ou à l'adresse finale",
                     ]}
                  />
               </SubSection>
            </Section>

            {/* Sea Freight Rules */}
            <Section icon={Ship} title="6. Règles Fret Maritime" id="sea">
               <SubSection title="6.1 Types de Transport Maritime">
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           FCL (Full Container Load)
                        </h4>
                        <List
                           items={[
                              "Conteneur complet réservé pour vous",
                              "20ft (33 CBM) ou 40ft (67 CBM)",
                              "Économique pour gros volumes",
                              "Sécurité maximale",
                           ]}
                        />
                     </div>
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           LCL (Less Container Load)
                        </h4>
                        <List
                           items={[
                              "Groupage avec d'autres clients",
                              "Payez seulement votre CBM",
                              "Idéal pour petits volumes",
                              "Délai légèrement plus long",
                           ]}
                        />
                     </div>
                  </div>
               </SubSection>

               <SubSection title="6.2 Documents Requis">
                  <List
                     items={[
                        "Facture commerciale (Commercial Invoice)",
                        "Liste de colisage (Packing List)",
                        "Connaissement (Bill of Lading / B/L)",
                        "Certificat d'origine (si applicable)",
                        "Licences d'importation (selon produits)",
                     ]}
                  />
               </SubSection>

               <SubSection title="6.3 Délais et Trajets">
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm border border-[var(--border)] rounded-lg">
                        <thead className="bg-[var(--surface-elevated)]">
                           <tr>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Destination
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Port
                              </th>
                              <th className="px-4 py-3 text-left text-[var(--text-primary)]">
                                 Délai estimé
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Mali (Bamako)</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Lomé / Dakar / Abidjan (transit terrestre)
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 60-75 jours
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </SubSection>
            </Section>

            {/* Prohibited Items */}
            <Section icon={Ban} title="7. Articles Interdits et Restreints" id="prohibited">
               <InfoBox type="danger" title="Interdiction absolue - Fret Maritime">
                  Les téléphones et ordinateurs sont STRICTEMENT INTERDITS en fret maritime.
               </InfoBox>

               <SubSection title="7.1 Catégorie A - Interdit Maritime">
                  <ProhibitedList
                     items={[
                        "Téléphones mobiles et smartphones",
                        "Ordinateurs portables et tablettes",
                        "Batteries lithium-ion (non installées)",
                        "Drones et équipements de surveillance",
                        "Appareils électroniques avec batteries amovibles",
                     ]}
                  />
               </SubSection>

               <SubSection title="7.2 Catégorie B - Interdit Aérien et Maritime">
                  <ProhibitedList
                     items={[
                        "Armes à feu, munitions, explosifs",
                        "Produits chimiques dangereux (corrosifs, toxiques)",
                        "Matières inflammables (essence, gaz, aérosols)",
                        "Drogues et stupéfiants",
                        "Contrefaçons de marques (sans autorisation)",
                        "Matériel militaire et produits de guerre",
                        "Matériel illégal",
                     ]}
                  />
               </SubSection>

               <SubSection title="7.3 Catégorie C - Restreint (Autorisations requises)">
                  <List
                     items={[
                        "Médicaments (ordonnance et licences)",
                        "Produits alimentaires (certificats sanitaires)",
                        "Cosmétiques (certificats de conformité)",
                        "Pièces d'automobile (certificats d'origine)",
                        "Liquides et produits chimiques industriels (MSDS requis)",
                     ]}
                  />
               </SubSection>

               <SubSection title="7.4 Conséquences">
                  <InfoBox type="warning" title="Responsabilité du client">
                     Toute saisie, amende ou destruction de marchandises interdites est à la charge
                     du client. ChinaLink Express décline toute responsabilité en cas de non-respect
                     des interdictions.
                  </InfoBox>
               </SubSection>
            </Section>

            {/* Customer Responsibilities */}
            <Section icon={Shield} title="8. Responsabilités du Client" id="responsibilities">
               <SubSection title="8.1 Déclaration des Marchandises">
                  <List
                     items={[
                        "Fournir une description exacte et complète des produits",
                        "Déclarer la valeur réelle pour l'assurance et la douane",
                        "Indiquer précisément les dimensions et poids",
                        "Signaler tout article fragile ou nécessitant un traitement spécial",
                        "Ne pas dissimuler de marchandises interdites",
                     ]}
                  />
               </SubSection>

               <SubSection title="8.2 Emballage et Étiquetage">
                  <List
                     items={[
                        "Emballage adapté au mode de transport choisi",
                        "Protection suffisante pour les articles fragiles",
                        "Étiquettes claires : destinataire, expéditeur, contenu",
                        "Marquage 'FRAGILE' si nécessaire",
                        "Numéros de téléphone visibles sur chaque colis",
                     ]}
                  />
               </SubSection>

               <SubSection title="8.3 Documents et Paiement">
                  <List
                     items={[
                        "Fournir tous les documents requis en temps utile",
                        "Paiement intégral avant expédition",
                        "Frais de douane à l'arrivée selon accord",
                        "Autorisations d'importation valides",
                        "Pièce d'identité pour retrait",
                     ]}
                  />
               </SubSection>
            </Section>

            {/* Customs and Insurance */}
            <Section icon={Globe} title="9. Douanes et Assurance" id="insurance">
               <SubSection title="9.1 Dédouanement">
                  <p className="text-[var(--text-secondary)] mb-3">
                     Deux options s'offrent à vous pour le dédouanement :
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           Option 1 : Dédouanement inclus
                        </h4>
                        <List
                           items={[
                              "Nous gérons tout le processus",
                              "Frais de douane inclus dans le devis",
                              "Livraison directe à votre adresse",
                              "Plus cher mais sans surprises",
                           ]}
                        />
                     </div>
                     <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                           Option 2 : Dédouanement séparé
                        </h4>
                        <List
                           items={[
                              "Vous réglez les frais de douane",
                              "Moins cher initialement",
                              "Vous gérez les formalités",
                              "Surcoûts possibles si estimation erronée",
                           ]}
                        />
                     </div>
                  </div>
               </SubSection>

               <SubSection title="9.2 Assurance Transport">
                  <InfoBox type="info" title="Couverture d'assurance">
                     Une assurance tous risques est disponible en option. Elle couvre : perte
                     totale, dommages durant le transport, vol avéré. Taux : 2-3% de la valeur
                     déclarée.
                  </InfoBox>
                  <List
                     items={[
                        "Exclusions : articles mal emballés, articles interdits",
                        "Délai de réclamation : 7 jours après livraison",
                        "Documents requis : photos, constat, facture d'achat",
                     ]}
                  />
               </SubSection>

               <SubSection title="9.3 Droits de Douane">
                  <p className="text-[var(--text-secondary)] mb-3">
                     Les droits de douane varient selon le pays de destination et la nature des
                     marchandises :
                  </p>
                  <ul className="space-y-2 text-[var(--text-secondary)]">
                     <li>• Mali : TVA 18% + droits de douane (0-20% selon produit)</li>
                  </ul>
               </SubSection>
            </Section>

            {/* Payment Terms */}
            <Section icon={DollarSign} title="10. Conditions de Paiement" id="payment">
               <SubSection title="10.1 Modalités">
                  <List
                     items={[
                        "Paiement intégral avant le paiement de la marchandise",
                        "Paiement par virement bancaire, Western Union, MoneyGram",
                        "Mobile Money disponible pour certains pays (Wave, Orange Money)",
                     ]}
                  />
               </SubSection>

               <SubSection title="10.2 Remboursements">
                  <InfoBox type="warning" title="Politique de remboursement">
                     Aucun remboursement n'est possible une fois la marchandise expédiée. En cas
                     d'annulation avant expédition, des frais de 10-20% peuvent s'appliquer selon
                     les avancées du traitement.
                  </InfoBox>
               </SubSection>
            </Section>

            {/* Liability and Legal */}
            <Section icon={Gavel} title="11. Responsabilité et Force Majeure" id="legal">
               <SubSection title="11.1 Limitation de Responsabilité">
                  <List
                     items={[
                        "Notre responsabilité est limitée à la valeur déclarée des marchandises",
                        "Nous ne sommes pas responsables des retards dus aux compagnies de transport",
                        "Aucune responsabilité en cas de saisie douanière pour documents incorrects",
                        "Dommages dus à un emballage inadéquat : responsabilité du client",
                        "Perte de profits ou gains manqués : non couverts",
                     ]}
                  />
               </SubSection>

               <SubSection title="11.2 Force Majeure">
                  <p className="text-[var(--text-secondary)] mb-3">
                     Nous ne pouvons être tenus responsables des retards ou dommages causés par :
                  </p>
                  <List
                     items={[
                        "Grèves, émeutes, troubles civils",
                        "Catastrophes naturelles (inondations, tremblements de terre)",
                        "Guerre, terrorisme, actes de piraterie",
                        "Épidémies, pandémies, restrictions sanitaires",
                        "Blocages portuaires, fermetures de frontières",
                        "Défaillance des systèmes informatiques",
                     ]}
                  />
               </SubSection>

               <SubSection title="11.3 Réclamations et Litiges">
                  <List
                     items={[
                        "Toute réclamation doit être faite par écrit dans les 7 jours suivant la livraison",
                        "Preuve à l'appui (photos, documents, constat)",
                        "Nous engageons une enquête sous 14 jours ouvrables",
                        "En cas de désaccord, médiation amiable privilégiée",
                        "Tribunal compétent : Bamako, Mali",
                     ]}
                  />
               </SubSection>

               <SubSection title="11.4 Protection des Données">
                  <p className="text-[var(--text-secondary)] mb-3">
                     Vos données personnelles sont collectées uniquement pour le traitement de vos
                     commandes. Elles ne sont jamais vendues à des tiers. Conformité RGPD pour les
                     clients européens.
                  </p>
                  <p className="text-[var(--text-secondary)]">
                     Pour plus d'informations, consultez notre{" "}
                     <Link href="/privacy" className="text-blue-600 hover:underline">
                        Politique de Confidentialité
                     </Link>
                     .
                  </p>
               </SubSection>
            </Section>

            {/* Contact Section */}
            <Section icon={HeadphonesIcon} title="12. Contact et Assistance" id="contact">
               <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-6">
                  <h4 className="font-semibold text-[var(--text-primary)] mb-4">
                     ChinaLink Express - Support Client
                  </h4>
                  <div className="space-y-3 text-[var(--text-secondary)]">
                     <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Kalaban Coura, près du lycée Birgo, Bamako, Mali
                     </p>
                     <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        WhatsApp Chine : +86 188 5172 5957
                     </p>
                     <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        WhatsApp Mali : +223 76 69 61 77 / +223 51 00 50 42
                     </p>
                     <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        Lun-Ven : 08h-20h | Sam : 09h-17h | Dim : 10h-15h
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
                        Contactez-nous sur WhatsApp
                     </a>
                  </div>
               </div>
            </Section>

            {/* Final Provisions */}
            <Section icon={Scale} title="13. Dispositions Finales" id="final">
               <p className="text-[var(--text-secondary)] mb-4">
                  Les présentes Conditions Générales constituent l'intégralité de l'accord entre
                  ChinaLink Express et le client. Elles annulent et remplacent toutes conditions
                  antérieures.
               </p>
               <List
                  items={[
                     "Modifications : Les CGV peuvent être modifiées à tout moment sans préavis",
                     "Notification : Les clients seront informés des modifications importantes",
                     "Droit applicable : Droit malien",
                     "Juridiction : Tribunaux de Bamako, Mali",
                     "Divisibilité : Si une clause est invalide, les autres restent en vigueur",
                     "Langue : En cas de divergence, la version française fait foi",
                  ]}
               />
            </Section>

            {/* Back to Home */}
            <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
               <Link
                  href="/"
                  className="inline-flex items-center gap-2 py-3 px-6 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
               >
                  Retour à l'accueil
               </Link>
            </div>
         </div>
      </main>
   );
}

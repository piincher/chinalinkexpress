/**
 * Terms & Conditions Content Component
 *
 * Main content for the Terms & Conditions page with all legal information.
 * Covers services, pricing, CBM calculations, prohibited items, and responsibilities.
 */

"use client";

import { motion } from "framer-motion";
import {
   Ship,
   Plane,
   Package,
   Ruler,
   AlertTriangle,
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
   Truck,
   Globe,
   Ban,
   Lock,
   Gavel,
   HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

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

export function TermsContent() {
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
                        "Paiement via Alipay, WeChat Pay, virement bancaire (T/T)",

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
                  <p className="text-[var(--text-secondary)] mb-3">
                     Le fret aérien est facturé selon le <strong>poids taxable</strong>, qui est le
                     plus élevé entre :
                  </p>
                  <List
                     items={[
                        "Poids réel de la marchandise (en kg)",
                        "Poids volumétrique = (Longueur × Largeur × Hauteur en cm) ÷ 5000",
                     ]}
                  />

                  <CalculationExample
                     title="Exemple de calcul - Fret Aérien"
                     steps={[
                        "Colis : L=50cm × l=40cm × H=30cm, Poids réel = 8kg",
                        "Poids volumétrique = (50 × 40 × 30) ÷ 5000 = 12kg",
                        "Poids taxable = max(8kg, 12kg) = 12kg",
                        "Tarif catégorie Standard : 12 000 FCFA/kg",
                        "12kg × 12 000 FCFA = 144 000 FCFA",
                     ]}
                     result="Total fret aérien : 144 000 FCFA"
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
                                 Emballage spécial
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Sur devis</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Cartons, palettes
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
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Mali</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Bamako / Abidjan
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 60-75 jours
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 Côte d'Ivoire
                              </td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Abidjan</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 50-65 jours
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Sénégal</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">Dakar</td>
                              <td className="px-4 py-3 text-[var(--text-secondary)]">
                                 55-70 jours
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
                     <li>• Côte d'Ivoire : TVA 18% + droits de douane</li>
                     <li>• Sénégal : TVA 18% + droits de douane</li>
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

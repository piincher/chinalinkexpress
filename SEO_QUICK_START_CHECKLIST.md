# ChinaLink Express — SEO Quick-Start Checklist
## First 14 Days: From Zero to Rankable

> Use this alongside `CHINALINK_SEO_MASTER_PLAN_2026.md`. This checklist has the exact changes to make.

---

## Day 1: Fix Homepage Metadata (30 minutes)

### File: `src/lib/metadata.ts`

Change the `generateHomeMetadata` function:

```typescript
export async function generateHomeMetadata(locale: Locale): Promise<Metadata> {
  const isEn = locale === 'en';
  
  return generatePageMetadata({
    title: isEn 
      ? 'Cargo China Mali | Air & Sea Freight | ChinaLink Express'
      : 'Cargo Chine Mali | Fret Aérien & Maritime | ChinaLink Express',
    description: isEn
      ? 'Ship cargo from China to Mali & West Africa. Air freight 14-21 days, sea freight 60-75 days. Get your free WhatsApp quote today!'
      : 'Envoi de cargo et colis de la Chine vers le Mali et l\'Afrique. Fret aérien 14-21 jours, maritime 60-75 jours. Devis gratuit par WhatsApp !',
    keywords: isEn
      ? 'cargo china mali, shipping from china to mali, freight forwarder china mali, air freight bamako, sea freight mali, alibaba shipping agent, china to africa shipping, chinalink express'
      : 'cargo chine mali, transitaire chine mali, fret chine bamako, envoi colis chine mali, fret aerien chine afrique, conteneur chine mali, expedition chine mali, achat alibaba mali, agent sourcing chine, chinalink express',
    path: '/',
    locale,
    ogType: 'website',
  });
}
```

### File: Homepage component (wherever H1 is rendered)

Change H1 to:
- **FR:** `Votre Expert Cargo Chine Mali — Fret Aérien & Maritime`
- **EN:** `Your China to Mali Cargo Expert — Air & Sea Freight`

Add subtitle paragraph with exact match keyword:
- **FR:** `Transitaire de référence pour l'envoi de cargo, colis et conteneurs de la Chine vers le Mali, le Sénégal, la Côte d'Ivoire et toute l'Afrique de l'Ouest.`
- **EN:** `Trusted freight forwarder for cargo, parcels, and containers from China to Mali, Senegal, Ivory Coast, and all of West Africa.`

---

## Day 1: Fix Route Page Metadata (`/routes/china-to-mali`)

### File: `src/lib/metadata.ts`

Change `generateRouteMetadata`:

```typescript
mali: {
  title: isEn
    ? 'Shipping from China to Mali | Cargo Air & Sea | ChinaLink Express'
    : 'Cargo Chine Mali | Fret Aérien & Maritime | ChinaLink Express',
  description: isEn
    ? 'Reliable cargo shipping from China to Mali. Air freight 14-21 days, sea containers 60-75 days to Bamako. Door-to-door delivery. Free WhatsApp quote!'
    : 'Envoi de cargo fiable de la Chine vers le Mali. Fret aérien 14-21 jours, conteneurs maritimes 60-75 jours vers Bamako. Livraison porte à porte. Devis WhatsApp gratuit !',
  keywords: isEn
    ? 'shipping china mali, cargo china mali, freight forwarder bamako, china to bamako shipping, mali logistics, import china mali, container china mali, air freight bamako'
    : 'cargo chine mali, fret chine mali, envoi colis chine mali, transitaire bamako, fret chine bamako, logistique mali, import chine mali, conteneur chine mali, expedition chine bamako, cargo aerien bamako',
  path: '/routes/china-to-mali',
}
```

### File: `src/features/routes/RoutePage.tsx`

In the H1 section (around line 44), change to:

```tsx
<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
  {isEn 
    ? `Cargo Shipping from ${route.origin.country} to ${route.destination.country} — Air & Sea`
    : `Cargo ${route.origin.country}-${route.destination.country} — Fret Aérien & Maritime`}
</h1>
```

Add new paragraph below the subtitle (around line 49) for keyword-rich content:

```tsx
<p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
  {isEn 
    ? `Professional freight forwarding for cargo, containers, and parcels. Door-to-door delivery to ${route.destination.city} with real-time tracking.`
    : `Transitaire professionnel pour cargo, conteneurs et colis. Livraison porte à porte à ${route.destination.city} avec suivi en temps réel.`}
</p>
<p className="text-lg text-blue-200 max-w-3xl mx-auto mb-8">
  {isEn
    ? `Customs clearance assistance, competitive rates, and secure payment handling. Serving importers and businesses across West Africa since 2019.`
    : `Assistance dédouanement, tarifs compétitifs et gestion de paiement sécurisée. Au service des importateurs et entreprises en Afrique de l'Ouest depuis 2019.`}
</p>
```

---

## Day 2: Add China Office Address & Contact Info

### File: `src/config/seo-advanced.ts`

Add China address to `BUSINESS_INFO`:

```typescript
export const BUSINESS_INFO = {
  // ... existing properties ...
  
  addressChina: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Room XXX, Building XXX, XXX Road, Baiyun District',
    addressLocality: 'Guangzhou',
    addressRegion: 'Guangdong Province',
    postalCode: '510000',
    addressCountry: 'CN',
  },
  
  geoChina: {
    '@type': 'GeoCoordinates' as const,
    latitude: 23.1291,
    longitude: 113.2644,
  },
  
  // Add to contact
  contact: {
    // ... existing phones ...
    phones: {
      china: '+86 188 5172 5957',
      chinaOffice: '+86 20 XXXX XXXX', // Add real office number
      mali: '+223 7669 61 77',
      maliAlt: '+223 5100 50 42',
    },
    // ... rest unchanged
  },
} as const;
```

### Action: Update footer and contact page

Add visible China office block:

```tsx
<div className="china-office">
  <h3>Bureau Chine / China Office</h3>
  <p>广州市白云区 XXX路 XXX号 XXX室</p>
  <p>Room XXX, XXX Road, Baiyun District, Guangzhou, 510000, China</p>
  <p>Tel: +86 188 5172 5957</p>
  <p>Hours: 09:00–18:00 (China Time, GMT+8)</p>
</div>
```

---

## Day 3: Add Stats Counters & Testimonials to Homepage

Add a stats bar section below the hero:

```tsx
<section className="py-8 bg-white border-y border-gray-100">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    <div>
      <div className="text-3xl font-bold text-blue-600">15,000+</div>
      <div className="text-sm text-gray-600">Colis Expédiés</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-blue-600">3,500+</div>
      <div className="text-sm text-gray-600">Clients Satisfaits</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-blue-600">7+</div>
      <div className="text-sm text-gray-600">Ans d'Expérience</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-blue-600">9</div>
      <div className="text-sm text-gray-600">Pays Desservis</div>
    </div>
  </div>
</section>
```

> **Note:** Replace numbers with your real numbers. If you don't have exact numbers, use approximate ranges or start counting now.

Add 3 testimonial cards below services section:

```tsx
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Ce Que Disent Nos Clients</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { name: 'Amadou T.', business: 'Importateur Textiles', text: 'ChinaLink m\'a aidé à importer 3 conteneurs de textiles depuis Guangzhou. Service professionnel et délais respectés.' },
        { name: 'Fatima K.', business: 'Boutique Électronique', text: 'Je commande sur Alibaba et ChinaLink gère tout. Le paiement et l\'expédition sont simplifiés. Je recommande !' },
        { name: 'Ibrahim D.', business: 'Commerce Général', text: 'Le fret aérien est rapide et fiable. Mes clients au Mali reçoivent leurs colis en moins de 3 semaines.' },
      ].map((t, i) => (
        <div key={i} className="bg-gray-50 p-6 rounded-xl">
          <p className="text-gray-700 mb-4">"{t.text}"</p>
          <div className="font-semibold">{t.name}</div>
          <div className="text-sm text-gray-500">{t.business}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Day 3: Add WhatsApp Sticky Button

Create a new component `src/components/WhatsAppButton.tsx`:

```tsx
'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8618851725957?text=Bonjour%20ChinaLink%2C%20je%20voudrais%20un%20devis%20pour%20expédier%20de%20Chine%20vers%20le%20Mali"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-colors"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden md:inline font-medium">Devis WhatsApp</span>
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
        Réponse &lt; 5 min
      </span>
    </a>
  );
}
```

Add to root layout so it appears on every page.

---

## Day 4: Create the FAQ Page

### File: `src/app/[locale]/faq/page.tsx` (create if not exists)

```tsx
import { generateLocalizedMetadata } from '@/lib/metadata';
import { FAQStructuredData } from '@/components/seo/StructuredData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as any,
    pageName: 'faq',
    path: '/faq',
    customTitle: locale === 'en' 
      ? 'Shipping FAQ | China to Mali Cargo Questions | ChinaLink'
      : 'FAQ Expédition | Questions Cargo Chine Mali | ChinaLink',
    customDescription: locale === 'en'
      ? 'Find answers about shipping from China to Mali. Delivery times, customs, documents, pricing. Everything you need to know about China-Mali cargo.'
      : 'Réponses à vos questions sur l\'expédition de la Chine vers le Mali. Délais, douanes, documents, tarifs. Tout savoir sur le cargo Chine-Mali.',
  });
}

const faqs = {
  fr: [
    { q: 'Combien de temps prend le cargo Chine Mali ?', a: 'Le fret aérier prend 14 à 21 jours et le fret maritime prend 60 à 75 jours de la Chine vers Bamako, Mali.' },
    { q: 'Quel est le prix d\'un conteneur Chine Mali ?', a: 'Un conteneur 20ft coûte entre 2 000 et 3 500 USD, et un 40ft entre 3 500 et 5 500 USD selon la saison et le port de départ.' },
    { q: 'Comment acheter sur Alibaba depuis le Mali ?', a: 'Vous pouvez créer un compte Alibaba, choisir vos produits, puis nous contacter pour la vérification du fournisseur, le paiement sécurisé et l\'expédition.' },
    { q: 'Quels documents sont nécessaires pour importer au Mali ?', a: 'Il faut une facture commerciale, un connaissement (BL), un certificat d\'origine, une déclaration en douane DGD, et parfois un certificat de conformité.' },
    { q: 'Comment payer un fournisseur chinois en toute sécurité ?', a: 'Nous recommandons notre service de paiement sécurisé via Alipay ou virement bancaire. Évitez Western Union avec des inconnus.' },
    { q: 'Quels articles sont interdits à l\'importation au Mali ?', a: 'Les armes, drogues, produits contrefaits, et certaines denrées alimentaires non conformes sont interdits. Contactez-nous pour la liste complète.' },
    { q: 'Proposez-vous le suivi de colis ?', a: 'Oui, nous fournissons un numéro de suivi pour tous les envois. Vous pouvez suivre votre cargo en temps réel sur notre site.' },
    { q: 'Quelle est la différence entre FCL et LCL ?', a: 'FCL (Full Container Load) = vous louez un conteneur entier. LCL (Less than Container Load) = votre marchandise partage un conteneur avec d\'autres clients.' },
    { q: 'Livrez-vous à domicile à Bamako ?', a: 'Oui, nous proposons la livraison porte à porte à Bamako et dans d\'autres villes du Mali selon la destination.' },
    { q: 'Comment obtenir un devis gratuit ?', a: 'Cliquez sur le bouton WhatsApp ou remplissez notre formulaire de contact. Nous vous répondons en moins de 2 heures.' },
    { q: 'Expédiez-vous vers d\'autres pays d\'Afrique ?', a: 'Oui, nous desservons le Sénégal, la Côte d\'Ivoire, le Burkina Faso, le Nigeria, le Ghana, le Niger, le Bénin, et le Togo.' },
    { q: 'Faites-vous l\'inspection qualité en Chine ?', a: 'Oui, dans le cadre de notre service sourcing, nous inspectons vos produits avant expédition et vous envoyons des photos.' },
    { q: 'Quels sont les délais de douane au Mali ?', a: 'Le dédouanement à Bamako prend généralement 3 à 7 jours ouvrés si les documents sont complets.' },
    { q: 'Puis-je expédier des produits alimentaires ?', a: 'Oui, mais ils doivent respecter les normes sanitaires maliennes et avoir les certifications requises.' },
    { q: 'Y a-t-il une assurance pour mon cargo ?', a: 'Nous proposons une assurance transport en option pour couvrir les risques de perte ou dommage pendant le transit.' },
  ],
  en: [
    { q: 'How long does shipping from China to Mali take?', a: 'Air freight takes 14-21 days and sea freight takes 60-75 days from China to Bamako, Mali.' },
    { q: 'How much does a container from China to Mali cost?', a: 'A 20ft container costs between $2,000-$3,500 and a 40ft container $3,500-$5,500 depending on season and departure port.' },
    { q: 'How do I buy from Alibaba from Mali?', a: 'Create an Alibaba account, select your products, then contact us for supplier verification, secure payment, and shipping.' },
    { q: 'What documents are needed to import to Mali?', a: 'You need a commercial invoice, bill of lading, certificate of origin, DGD customs declaration, and sometimes a conformity certificate.' },
    { q: 'Do you offer package tracking?', a: 'Yes, we provide a tracking number for all shipments. You can track your cargo in real time on our website.' },
    { q: 'Do you deliver to home in Bamako?', a: 'Yes, we offer door-to-door delivery in Bamako and other Malian cities depending on the destination.' },
    { q: 'How do I get a free quote?', a: 'Click the WhatsApp button or fill out our contact form. We respond in less than 2 hours.' },
    { q: 'Do you ship to other African countries?', a: 'Yes, we serve Senegal, Ivory Coast, Burkina Faso, Nigeria, Ghana, Niger, Benin, and Togo.' },
    { q: 'Do you do quality inspection in China?', a: 'Yes, as part of our sourcing service, we inspect your products before shipping and send you photos.' },
    { q: 'Is there insurance for my cargo?', a: 'We offer optional transport insurance to cover loss or damage risks during transit.' },
  ],
};

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const items = isEn ? faqs.en : faqs.fr;
  
  return (
    <>
      <FAQStructuredData 
        faqs={items.map(i => ({ question: i.q, answer: i.a }))} 
        locale={locale as any} 
      />
      <main className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {isEn ? 'Shipping from China to Mali — Frequently Asked Questions' : 'Cargo Chine Mali — Questions Fréquentes'}
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            {isEn 
              ? 'Everything you need to know about cargo, customs, and shipping from China to Mali and West Africa.'
              : 'Tout ce qu\'il faut savoir sur le cargo, les douanes et l\'expédition de la Chine vers le Mali et l\'Afrique de l\'Ouest.'}
          </p>
          
          <div className="space-y-6">
            {items.map((item, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl p-6">
                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
```

Also add a route in `src/app/[locale]/faq/`.

---

## Day 5–6: Expand `/routes/china-to-mali` Content

Add these new sections to `RoutePage.tsx` (or create a new dedicated component). Each section should be 200–400 words.

### Section: "Documents Requis pour Importer au Mali"

```tsx
<section className="py-16">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-6">
      {isEn ? 'Required Documents for Importing to Mali' : 'Documents Requis pour Importer au Mali'}
    </h2>
    <div className="prose max-w-none">
      <p>
        {isEn 
          ? 'To clear customs in Mali, you will need the following documents. Our team assists with document preparation to ensure smooth customs clearance.'
          : 'Pour dédouaner au Mali, vous avez besoin des documents suivants. Notre équipe vous aide à préparer les dossiers pour un dédouanement sans encombre.'}
      </p>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        {isEn ? [
          'Commercial Invoice (original)',
          'Bill of Lading (BL) or Air Waybill (AWB)',
          'Certificate of Origin',
          'Customs Declaration (DGD Mali)',
          'Import Authorization (if required)',
          'Packing List',
        ] : [
          'Facture commerciale (originale)',
          'Connaissement (BL) ou lettre de transport aérien (LTA)',
          'Certificat d\'origine',
          'Déclaration en douane (DGD Mali)',
          'Autorisation d\'importation (si requis)',
          'Liste de colisage (Packing List)',
        ].map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  </div>
</section>
```

### Section: "Articles Interdits"

```tsx
<section className="py-16 bg-red-50">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-6">
      {isEn ? 'Prohibited Items for Import to Mali' : 'Articles Interdits à l\'Importation au Mali'}
    </h2>
    <p className="mb-4">
      {isEn
        ? 'The following items are prohibited or restricted for importation into Mali. Attempting to ship these may result in seizure, fines, or legal action.'
        : 'Les articles suivants sont interdits ou réglementés pour l\'importation au Mali. Toute tentative d\'expédition peut entraîner une saisie, des amendes ou des poursuites.'}
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      {(isEn ? [
        'Weapons and ammunition',
        'Narcotics and drugs',
        'Counterfeit goods',
        'Pornographic materials',
        'Hazardous chemicals (without permit)',
        'Expired or unregistered medicines',
      ] : [
        'Armes et munitions',
        'Stupéfiants et drogues',
        'Produits contrefaits',
        'Matériels pornographiques',
        'Produits chimiques dangereux (sans permis)',
        'Médicaments périmés ou non enregistrés',
      ]).map((item, i) => (
        <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-lg">
          <span className="text-red-500">✕</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <p className="mt-6 text-sm text-gray-600">
      {isEn 
        ? 'Contact us for the complete list of restricted items and required certifications for your specific products.'
        : 'Contactez-nous pour la liste complète des articles réglementés et les certifications requises pour vos produits spécifiques.'}
    </p>
  </div>
</section>
```

### Section: "Pourquoi Choisir ChinaLink"

```tsx
<section className="py-16">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-6">
      {isEn ? 'Why Choose ChinaLink for China-Mali Shipping?' : 'Pourquoi Choisir ChinaLink pour le Cargo Chine-Mali ?'}
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {(isEn ? [
        { title: '7+ Years Experience', desc: 'Specialized in China-Africa logistics since 2019.' },
        { title: 'Door-to-Door Delivery', desc: 'From supplier warehouse in China to your address in Bamako.' },
        { title: 'Secure Payment Service', desc: 'We pay your Chinese suppliers safely via Alipay or bank transfer.' },
        { title: 'Real-Time Tracking', desc: 'Track your cargo at every step of the journey.' },
        { title: 'Customs Assistance', desc: 'We help prepare all documents for smooth Mali customs clearance.' },
        { title: 'Competitive Rates', desc: 'Transparent pricing with no hidden fees. Get your free quote today.' },
      ] : [
        { title: '7+ Ans d\'Expérience', desc: 'Spécialisés dans la logistique Chine-Afrique depuis 2019.' },
        { title: 'Livraison Porte à Porte', desc: 'De l\'entrepôt fournisseur en Chine à votre adresse à Bamako.' },
        { title: 'Service de Paiement Sécurisé', desc: 'Nous payons vos fournisseurs chinois via Alipay ou virement.' },
        { title: 'Suivi en Temps Réel', desc: 'Suivez votre cargo à chaque étape du trajet.' },
        { title: 'Assistance Douanière', desc: 'Nous aidons à préparer tous les documents pour le dédouanement.' },
        { title: 'Tarifs Compétitifs', desc: 'Prix transparents sans frais cachés. Demandez votre devis gratuit.' },
      ]).map((item, i) => (
        <div key={i} className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-700">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Day 7: Add FAQ Schema to Existing Pages

For each existing service page, add an FAQ section at the bottom and inject `FAQPage` schema.

Example for `/services/air-freight`:

```tsx
// At bottom of AirFreightPage component
const airFAQ = isEn ? [
  { q: 'How long does air freight from China to Mali take?', a: 'Air freight from China to Bamako, Mali typically takes 14-21 days including customs clearance.' },
  { q: 'What is the cost of air freight to Mali?', a: 'Air freight rates start from $8-15 per kg depending on volume, season, and departure city.' },
  { q: 'What is the maximum weight for air cargo?', a: 'We handle air cargo from 1kg up to several tons. For very heavy shipments, sea freight may be more economical.' },
  { q: 'Can I track my air cargo?', a: 'Yes, we provide tracking numbers for all air shipments. You can track progress from departure to arrival in Bamako.' },
  { q: 'Are there prohibited items for air freight?', a: 'Batteries, liquids, and hazardous materials have restrictions for air freight. Contact us to verify your specific products.' },
] : [
  { q: 'Combien de temps prend le fret aérien Chine Mali ?', a: 'Le fret aérien de la Chine vers Bamako prend généralement 14 à 21 jours incluant le dédouanement.' },
  { q: 'Quel est le coût du fret aérien vers le Mali ?', a: 'Les tarifs fret aérien commencent à 8-15 USD/kg selon le volume, la saison et la ville de départ.' },
  { q: 'Quel est le poids maximum pour le cargo aérien ?', a: 'Nous gérons du cargo aérien de 1kg à plusieurs tonnes. Pour les très lourds volumes, le maritime est plus économique.' },
  { q: 'Puis-je suivre mon cargo aérien ?', a: 'Oui, nous fournissons un numéro de suivi pour tous les envois aériens. Vous pouvez suivre du départ à l\'arrivée à Bamako.' },
  { q: 'Y a-t-il des articles interdits en fret aérien ?', a: 'Les batteries, liquides et matières dangereuses ont des restrictions en aérien. Contactez-nous pour vérifier vos produits.' },
];

// In JSX:
<FAQStructuredData faqs={airFAQ.map(i => ({ question: i.q, answer: i.a }))} locale={locale} />
```

---

## Day 8: Performance — Reduce Animation Weight

In `src/features/hero-animation/components/HeroAnimation.tsx` (or wherever animation is initialized):

```tsx
'use client';

import { useEffect, useState } from 'react';

export function HeroAnimation() {
  const [tier, setTier] = useState<'css' | 'canvas' | 'webgl'>('css');
  
  useEffect(() => {
    // Detect slow connections and low-end devices
    const connection = (navigator as any).connection;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSlow = connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g' || connection.saveData);
    
    if (isSlow || isMobile) {
      setTier('css'); // Use lightweight CSS particles only
    } else if (typeof WebGL2RenderingContext !== 'undefined') {
      setTier('webgl');
    } else {
      setTier('canvas');
    }
  }, []);
  
  if (tier === 'css') return <CSSParticleField />;
  if (tier === 'canvas') return <CanvasParticleSystem />;
  return <WebGLParticleSystem />;
}
```

Also add `prefers-reduced-motion` support:

```tsx
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) return <Fallback />;
```

---

## Day 9: Sitemap & Robots.txt

### File: `src/app/sitemap.xml`

Ensure it includes all locales and key pages:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url><loc>https://www.chinalinkexpress.com/fr</loc><priority>1.0</priority></url>
  <url><loc>https://www.chinalinkexpress.com/en</loc><priority>1.0</priority></url>
  
  <!-- Services -->
  <url><loc>https://www.chinalinkexpress.com/fr/services/air-freight</loc><priority>0.9</priority></url>
  <url><loc>https://www.chinalinkexpress.com/fr/services/sea-freight</loc><priority>0.9</priority></url>
  <url><loc>https://www.chinalinkexpress.com/fr/services/sourcing</loc><priority>0.9</priority></url>
  
  <!-- Routes -->
  <url><loc>https://www.chinalinkexpress.com/fr/routes/china-to-mali</loc><priority>0.9</priority></url>
  
  <!-- Tools -->
  <url><loc>https://www.chinalinkexpress.com/fr/calculateur</loc><priority>0.8</priority></url>
  <url><loc>https://www.chinalinkexpress.com/fr/tarifs</loc><priority>0.8</priority></url>
  
  <!-- Info -->
  <url><loc>https://www.chinalinkexpress.com/fr/contact</loc><priority>0.8</priority></url>
  <url><loc>https://www.chinalinkexpress.com/fr/faq</loc><priority>0.8</priority></url>
  <url><loc>https://www.chinalinkexpress.com/fr/pourquoi-nous</loc><priority>0.7</priority></url>
</urlset>
```

### File: `src/app/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /test-db/
Disallow: /offline/
Disallow: /*?*sort=
Disallow: /*?*filter=

Sitemap: https://www.chinalinkexpress.com/sitemap.xml
```

---

## Day 10: Google Business Profile Tasks

1. Go to [https://business.google.com](https://business.google.com)
2. Claim/verify `ChinaLink Express` listing
3. Set primary category: **Freight Forwarding Service**
4. Add secondary categories: **Shipping Company**, **Logistics Service**
5. Add exact address (same as schema): Kalaban Coura, près du lycée Birgo, Bamako
6. Add phone: +223 7669 61 77
7. Add website: https://www.chinalinkexpress.com/fr
8. Upload 5+ photos: office exterior, interior, team, warehouse, container
9. Write business description (750 characters max):
   > "ChinaLink Express est votre transitaire de référence pour le cargo et le fret de la Chine vers le Mali et l'Afrique de l'Ouest. Fret aérien 14-21 jours, fret maritime 60-75 jours, service sourcing Alibaba 1688, paiement fournisseur, et livraison porte à porte à Bamako. Devis gratuit via WhatsApp."
10. Add services: "Fret Aérien Chine-Mali", "Fret Maritime Chine-Mali", "Agent Sourcing Chine", "Paiement Fournisseur Chinois"
11. Add Q&A: Pre-populate 5 common questions with answers
12. Post weekly updates (Google Posts) with links to blog posts

---

## Day 11–14: Content Creation Sprint

### Create 4 Blog Posts

Use this template for each post. Target 2,000+ words minimum.

**Post 1:** `src/app/[locale]/blog/comment-importer-chine-mali/page.tsx`
- Title: "Comment Importer des Marchandises de la Chine vers le Mali en 2025 (Guide Complet)"
- Meta: "Guide complet pour importer du Mali depuis la Chine. Documents, douanes, tarifs, délais. Tout ce qu'il faut savoir avec checklist gratuite."
- H1: "Comment Importer des Marchandises de la Chine vers le Mali en 2025"
- Include: Table of contents, step-by-step guide, comparison table, downloadable checklist CTA, FAQ section
- Internal links: /cargo-chine-mali, /calculateur, /contact, /services/sourcing, /services/air-freight

**Post 2:** `src/app/[locale]/blog/cargo-chine-mali-guide/page.tsx`
- Title: "Cargo Chine Mali : Le Guide Complet du Fret Aérien et Maritime [2025]"
- Meta: "Tout savoir sur le cargo Chine-Mali. Fret aérien vs maritime, tarifs, délais, douanes. Guide pratique avec devis gratuit."
- H1: "Cargo Chine Mali — Guide Complet du Fret Aérien et Maritime"
- Include: Comparison table (Air vs Sea vs Express), pricing tiers, route map, FAQ

**Post 3:** `src/app/[locale]/blog/acheter-alibaba-mali/page.tsx`
- Title: "Comment Acheter sur Alibaba depuis le Mali Sans Se Faire Arnaquer"
- Meta: "Guide étape par étape pour acheter sur Alibaba depuis le Mali. Vérification, paiement, expédition. Évitez les arnaques !"
- H1: "Comment Acheter sur Alibaba depuis le Mali — Guide Anti-Arnaque"
- Include: Screenshots (or descriptions), red flags checklist, payment methods comparison

**Post 4:** `src/app/[locale]/blog/paiement-fournisseur-chine/page.tsx`
- Title: "Paiement Fournisseur Chinois : Alipay, WeChat Pay, Virement — Guide Mali"
- Meta: "Comparez les méthodes de paiement fournisseur en Chine. Sécurité, frais, délais. Guide pour les importateurs au Mali."
- H1: "Paiement Fournisseur Chinois — Guide Complet pour les Africains"
- Include: Pros/cons table for each method, risk ratings, recommended approach

### Publishing Checklist for Each Post

- [ ] Keyword in title (front-loaded)
- [ ] Keyword in meta description
- [ ] Keyword in H1
- [ ] Keyword in first 100 words
- [ ] Keyword in at least 1 H2
- [ ] 3–5 internal links to money pages
- [ ] 1 lead magnet or CTA (WhatsApp, calculator, contact)
- [ ] FAQ section with 5+ questions
- [ ] Article schema with author, datePublished
- [ ] BreadcrumbList schema
- [ ] Last updated date visible
- [ ] Image with keyword-rich alt text
- [ ] Mobile-friendly formatting (short paragraphs, bullet points)

---

## Verification: How to Know It's Working

### Week 1 Check
- [ ] Search `site:chinalinkexpress.com cargo mali` — homepage should appear
- [ ] Check Google Search Console — impressions may increase within 3–7 days
- [ ] Test mobile speed with PageSpeed Insights — aim for 50+ on mobile

### Month 1 Check
- [ ] Search `cargo chine mali` — you should appear in top 30
- [ ] Search `comment importer chine mali` — blog post should appear page 1–2
- [ ] Google Search Console: blog posts getting impressions
- [ ] New backlinks from directories and citations

### Month 3 Check
- [ ] `cargo chine mali` — top 10 target
- [ ] 5+ blog posts ranking page 1 for long-tail
- [ ] Featured snippets captured for 2+ queries
- [ ] Organic traffic increased 3x from baseline

---

## Daily/Weekly Habits

**Daily:**
- Respond to WhatsApp inquiries within 5 minutes (response time is a competitive advantage)

**Weekly:**
- Check Google Search Console for new queries and click-through rates
- Publish 1 blog post (after initial sprint)
- Post on Facebook Business page (3x per week minimum)
- Request 1–2 Google reviews from satisfied clients

**Monthly:**
- Review ranking positions for top 20 keywords
- Update existing content with fresh data
- Build 2–3 new backlinks
- Add 1 new landing page or expand existing page

---

*Execute this checklist in order. Do not skip Day 1–3. Those are the highest-impact changes.*

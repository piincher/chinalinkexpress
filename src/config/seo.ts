/**
 * SEO Configuration
 * 
 * Enterprise-level SEO configuration with comprehensive keywords
 * targeting China-Africa freight forwarding market.
 */

// ============================================================================
// English Keywords - High Priority
// ============================================================================

export const ENGLISH_KEYWORDS = {
  // Primary Keywords
  primary: [
    'freight forwarding',
    'shipping from China',
    'logistics company',
    'international shipping',
    'sea freight',
    'air freight',
    'freight forwarder',
  ],
  
  // Long-tail Keywords
  longTail: [
    'shipping from China to Africa',
    'China to West Africa shipping',
    'freight forwarding China to Mali',
    'shipping from China to Senegal',
    'China to Ivory Coast freight',
    'Alibaba shipping agent',
    '1688 sourcing agent',
    'China procurement services',
    'door to door shipping China',
    'container shipping China Africa',
  ],
  
  // Location-based Keywords
  location: [
    'shipping from China to Bamako Mali',
    'freight forwarder China Mali',
    'China to Dakar shipping Senegal',
    'shipping China Abidjan Ivory Coast',
    'China to Lome freight Togo',
    'China to Cotonou shipping Benin',
    'China to Lagos freight Nigeria',
    'China to Accra shipping Ghana',
    'China to Conakry freight Guinea',
    'China to Ouagadougou shipping Burkina Faso',
  ],
  
  // Service-specific Keywords
  service: [
    'FCL shipping China Africa',
    'LCL consolidation China',
    'air cargo China to Africa',
    'express shipping China Mali',
    'Alibaba payment agent',
    'WeChat Pay for business',
    'supplier verification China',
    'quality inspection China',
    'warehouse China Africa',
    'customs clearance Africa',
  ],
} as const;

// ============================================================================
// French Keywords - High Priority
// ============================================================================

export const FRENCH_KEYWORDS = {
  // Primary Keywords
  primary: [
    'fret maritime',
    'fret aérien',
    'expédition Chine',
    'transitaire',
    'logistique internationale',
    'transport international',
    'commissionnaire transport',
  ],
  
  // Long-tail Keywords
  longTail: [
    'expédition colis Chine Afrique',
    'fret Chine Mali',
    'envoi marchandises Chine Sénégal',
    'transport maritime Chine Côte d\'Ivoire',
    'achat fournisseur Chine',
    'agent sourcing Chine',
    'paiement fournisseur chinois',
    'dédouanement Mali',
    'livraison porte à porte Chine',
    'conteneur Chine Afrique',
  ],
  
  // Country-specific Keywords
  country: [
    'expédition Chine Bamako Mali',
    'fret Chine Dakar Sénégal',
    'transport Chine Abidjan Côte d\'Ivoire',
    'envoi colis Chine Lomé Togo',
    'fret maritime Chine Cotonou Bénin',
    'expédition Chine Lagos Nigeria',
    'transport Chine Accra Ghana',
    'fret Chine Conakry Guinée',
    'expédition Chine Ouagadougou Burkina Faso',
  ],
  
  // Service-specific Keywords
  service: [
    'conteneur complet FCL',
    'groupage maritime LCL',
    'cargo aérien Chine Afrique',
    'express Chine Mali',
    'agent paiement Alipay',
    'vérification fournisseur',
    'inspection qualité Chine',
    'entrepôt Chine Afrique',
    'formalités douanières',
    'déclaration en douane',
  ],
} as const;

// ============================================================================
// Comprehensive Keyword Strings for Meta Tags
// ============================================================================

export const SEO_KEYWORDS = {
  en: [
    // Primary
    'freight forwarding', 'shipping from China', 'logistics company', 'international shipping',
    'sea freight', 'air freight', 'freight forwarder', 'China Africa shipping',
    // Long-tail
    'shipping from China to Africa', 'China to West Africa shipping', 'freight forwarding China to Mali',
    'shipping from China to Senegal', 'China to Ivory Coast freight', 'Alibaba shipping agent',
    '1688 sourcing agent', 'China procurement services', 'door to door shipping China',
    'container shipping China Africa', 'FCL shipping', 'LCL consolidation',
    // Locations
    'shipping China Bamako', 'freight forwarder China Mali', 'China Dakar shipping',
    'shipping China Abidjan', 'China Lome freight', 'China Cotonou shipping',
    'China Lagos freight', 'China Accra shipping', 'China Conakry freight',
    // Services
    'air cargo China Africa', 'express shipping China', 'Alibaba payment agent',
    'WeChat Pay business', 'supplier verification China', 'quality inspection China',
    'warehouse China Africa', 'customs clearance Africa', 'import export China',
  ].join(', '),
  
  fr: [
    // Primary
    'fret maritime', 'fret aérien', 'expédition Chine', 'transitaire',
    'logistique internationale', 'transport international', 'commissionnaire transport',
    'fret Chine Afrique',
    // Long-tail
    'expédition colis Chine Afrique', 'fret Chine Mali', 'envoi marchandises Chine Sénégal',
    'transport maritime Chine Côte d\'Ivoire', 'achat fournisseur Chine', 'agent sourcing Chine',
    'paiement fournisseur chinois', 'dédouanement Mali', 'livraison porte à porte Chine',
    'conteneur Chine Afrique', 'conteneur complet FCL', 'groupage maritime LCL',
    // Countries
    'expédition Chine Bamako', 'fret Chine Dakar', 'transport Chine Abidjan',
    'envoi colis Chine Lomé', 'fret maritime Chine Cotonou', 'expédition Chine Lagos',
    'transport Chine Accra', 'fret Chine Conakry', 'expédition Chine Ouagadougou',
    // Services
    'cargo aérien Chine Afrique', 'express Chine Mali', 'agent paiement Alipay',
    'vérification fournisseur', 'inspection qualité Chine', 'entrepôt Chine Afrique',
    'formalités douanières', 'déclaration en douane', 'import export Chine',
  ].join(', '),
} as const;

// ============================================================================
// Page-specific SEO Metadata
// ============================================================================

export const PAGE_SEO = {
  home: {
    en: {
      title: 'ChinaLink Express | Freight Forwarding China to Africa | Air & Sea Shipping',
      description: 'Leading freight forwarder from China to Africa. Air freight (14-21 days) & sea freight (60-75 days) to Mali, Senegal, Ivory Coast, Nigeria & more. Get your free quote today!',
      keywords: `${SEO_KEYWORDS.en}, ChinaLink Express, logistics Africa`,
    },
    fr: {
      title: 'ChinaLink Express | Fret Maritime & Aérien Chine-Afrique | Transitaire',
      description: 'Transitaire de référence de la Chine vers l\'Afrique. Fret aérien (14-21 jours) & maritime (60-75 jours) vers le Mali, Sénégal, Côte d\'Ivoire, Nigeria. Devis gratuit!',
      keywords: `${SEO_KEYWORDS.fr}, ChinaLink Express, logistique Afrique`,
    },
  },
  
  services: {
    airFreight: {
      en: {
        title: 'Air Freight China to Africa | Express Shipping | ChinaLink Express',
        description: 'Fast air freight from China to Mali, Senegal, Ivory Coast & West Africa. Delivery in 14-21 days. Real-time tracking. Get a quote for your air cargo!',
        keywords: 'air freight China Africa, air cargo, express shipping China Mali, air freight Bamako, air freight Dakar, China air shipping',
      },
      fr: {
        title: 'Fret Aérien Chine Afrique | Expédition Express | ChinaLink Express',
        description: 'Fret aérien rapide de la Chine vers le Mali, Sénégal, Côte d\'Ivoire & Afrique de l\'Ouest. Livraison en 14-21 jours. Suivi en temps réel. Demandez votre devis!',
        keywords: 'fret aérien Chine Afrique, cargo aérien, express Chine Mali, fret aérien Bamako, fret aérien Dakar',
      },
    },
    
    seaFreight: {
      en: {
        title: 'Sea Freight China to Africa | FCL & LCL Shipping | ChinaLink Express',
        description: 'Economical sea freight from China to Africa. FCL container shipping & LCL consolidation. Delivery in 60-75 days. Best rates for bulk goods. Get a quote!',
        keywords: 'sea freight China Africa, FCL shipping, LCL consolidation, container shipping, maritime freight China Mali, sea freight Bamako',
      },
      fr: {
        title: 'Fret Maritime Chine Afrique | Conteneur FCL & Groupage LCL',
        description: 'Fret maritime économique de la Chine vers l\'Afrique. Conteneurs complets FCL & groupage LCL. Livraison en 60-75 jours. Meilleurs tarifs pour gros volumes. Devis gratuit!',
        keywords: 'fret maritime Chine Afrique, conteneur FCL, groupage LCL, transport maritime, fret maritime Chine Mali',
      },
    },
    
    sourcing: {
      en: {
        title: 'China Sourcing Agent | Alibaba 1688 Procurement | ChinaLink Express',
        description: 'Professional sourcing agent in China. We buy from Alibaba, 1688, Taobao on your behalf. Supplier verification, quality inspection, payment processing. Start sourcing today!',
        keywords: 'China sourcing agent, Alibaba agent, 1688 sourcing, procurement China, supplier verification, quality inspection China',
      },
      fr: {
        title: 'Agent Sourcing Chine | Achat Alibaba 1688 | ChinaLink Express',
        description: 'Agent sourcing professionnel en Chine. Nous achetons sur Alibaba, 1688, Taobao pour vous. Vérification fournisseurs, inspection qualité, paiement. Commencez vos achats!',
        keywords: 'agent sourcing Chine, agent Alibaba, achat 1688, approvisionnement Chine, vérification fournisseur, inspection qualité',
      },
    },
  },
  
  routes: {
    chinaToMali: {
      en: {
        title: 'Shipping from China to Mali | Freight Forwarder Bamako | ChinaLink Express',
        description: 'Reliable freight forwarding from China to Mali. Air & sea shipping to Bamako. Door-to-door delivery. 7+ years experience. Get your free quote now!',
        keywords: 'shipping China Mali, freight forwarder Bamako, China to Bamako shipping, Mali logistics, import China Mali',
      },
      fr: {
        title: 'Expédition Chine vers Mali | Transitaire Bamako | ChinaLink Express',
        description: 'Transitaire fiable de la Chine vers le Mali. Fret aérien et maritime vers Bamako. Livraison porte à porte. 7+ ans d\'expérience. Devis gratuit!',
        keywords: 'expédition Chine Mali, transitaire Bamako, fret Chine Bamako, logistique Mali, import Chine Mali',
      },
    },
    
    chinaToSenegal: {
      en: {
        title: 'Shipping from China to Senegal | Freight Forwarder Dakar | ChinaLink Express',
        description: 'Freight forwarding from China to Senegal. Air & sea shipping to Dakar. Competitive rates, reliable service. Get your quote today!',
        keywords: 'shipping China Senegal, freight forwarder Dakar, China to Dakar shipping, Senegal logistics, import China Senegal',
      },
      fr: {
        title: 'Expédition Chine vers Sénégal | Transitaire Dakar | ChinaLink Express',
        description: 'Transitaire de la Chine vers le Sénégal. Fret aérien et maritime vers Dakar. Tarifs compétitifs, service fiable. Demandez votre devis!',
        keywords: 'expédition Chine Sénégal, transitaire Dakar, fret Chine Dakar, logistique Sénégal, import Chine Sénégal',
      },
    },
    
    chinaToIvoryCoast: {
      en: {
        title: 'Shipping from China to Ivory Coast | Freight Forwarder Abidjan',
        description: 'Freight forwarding from China to Ivory Coast. Air & sea shipping to Abidjan. Professional logistics services. Get your free quote!',
        keywords: 'shipping China Ivory Coast, freight forwarder Abidjan, China to Abidjan shipping, Cote d\'Ivoire logistics',
      },
      fr: {
        title: 'Expédition Chine vers Côte d\'Ivoire | Transitaire Abidjan',
        description: 'Transitaire de la Chine vers la Côte d\'Ivoire. Fret aérien et maritime vers Abidjan. Services logistiques professionnels. Devis gratuit!',
        keywords: 'expédition Chine Côte d\'Ivoire, transitaire Abidjan, fret Chine Abidjan, logistique Côte d\'Ivoire',
      },
    },
  },
  
  calculator: {
    en: {
      title: 'Shipping Cost Calculator | Freight Rates China to Africa | ChinaLink Express',
      description: 'Calculate your shipping costs from China to Africa instantly. Air freight & sea freight rates to Mali, Senegal, Ivory Coast. Get an accurate estimate in seconds!',
      keywords: 'shipping calculator, freight rates China Africa, shipping cost estimator, air freight calculator, sea freight calculator',
    },
    fr: {
      title: 'Calculateur de Frais d\'Expédition | Tarifs Fret Chine-Afrique',
      description: 'Calculez vos frais d\'expédition de la Chine vers l\'Afrique instantanément. Tarifs fret aérien et maritime vers Mali, Sénégal, Côte d\'Ivoire. Estimation précise!',
      keywords: 'calculateur frais expédition, tarifs fret Chine Afrique, estimateur coût transport, calculateur fret aérien',
    },
  },
  
  pricing: {
    en: {
      title: 'Shipping Rates China to Africa | Air & Sea Freight Prices | ChinaLink Express',
      description: 'Competitive shipping rates from China to Africa. Air freight from $X/kg, sea freight from $X/CBM. Transparent pricing, no hidden fees. View our price list!',
      keywords: 'shipping rates China Africa, freight prices, air freight rates, sea freight rates, shipping costs',
    },
    fr: {
      title: 'Tarifs d\'Expédition Chine-Afrique | Prix Fret Aérien & Maritime',
      description: 'Tarifs compétitifs pour expédier de la Chine vers l\'Afrique. Fret aérien à partir de X FCFA/kg, maritime à partir de X FCFA/CBM. Prix transparents. Consultez nos tarifs!',
      keywords: 'tarifs expédition Chine Afrique, prix fret, tarifs fret aérien, tarifs fret maritime, coûts transport',
    },
  },
  
  contact: {
    en: {
      title: 'Contact ChinaLink Express | Freight Quote | China to Africa Shipping',
      description: 'Contact ChinaLink Express for a free freight quote. WhatsApp: +86 188 5172 5957. Air & sea shipping from China to Mali, Senegal & West Africa. 24/7 support!',
      keywords: 'contact freight forwarder, shipping quote China Africa, ChinaLink Express contact, freight inquiry',
    },
    fr: {
      title: 'Contact ChinaLink Express | Devis Fret | Expédition Chine-Afrique',
      description: 'Contactez ChinaLink Express pour un devis fret gratuit. WhatsApp: +86 188 5172 5957. Fret aérien et maritime de la Chine vers le Mali, Sénégal & Afrique. Support 24/7!',
      keywords: 'contact transitaire, devis fret Chine Afrique, ChinaLink Express contact, demande expédition',
    },
  },
  
  faq: {
    en: {
      title: 'Shipping FAQ | China to Africa Freight Questions | ChinaLink Express',
      description: 'Find answers to all your shipping questions. Delivery times, rates, customs, prohibited items. Everything you need to know about shipping from China to Africa.',
      keywords: 'shipping FAQ, freight questions, China Africa shipping FAQ, customs clearance FAQ, shipping times',
    },
    fr: {
      title: 'FAQ Expédition | Questions Fret Chine-Afrique | ChinaLink Express',
      description: 'Trouvez les réponses à toutes vos questions sur l\'expédition. Délais, tarifs, douanes, articles interdits. Tout savoir sur l\'expédition de la Chine vers l\'Afrique.',
      keywords: 'FAQ expédition, questions fret, FAQ fret Chine Afrique, FAQ dédouanement, délais livraison',
    },
  },
} as const;

// ============================================================================
// Structured Data Configuration
// ============================================================================

export const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ChinaLink Express',
    alternateName: 'CLE',
    url: 'https://www.chinalinkexpress.com',
    logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png',
    sameAs: [
      'https://facebook.com/chinalinkexpress',
      'https://instagram.com/chinalinkexpress',
      'https://linkedin.com/company/chinalinkexpress',
      'https://twitter.com/chinalinkexpress',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-188-5172-5957',
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'Chinese', 'Arabic'],
    },
  },
  
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ChinaLink Express',
    image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png',
    '@id': 'https://www.chinalinkexpress.com',
    url: 'https://www.chinalinkexpress.com',
    telephone: '+86 188 5172 5957',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kalaban Coura, près du lycée Birgo',
      addressLocality: 'Bamako',
      addressCountry: 'ML',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.6392,
      longitude: -8.0029,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '15:00',
      },
    ],
  },
  
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Freight Forwarding',
    provider: {
      '@type': 'Organization',
      name: 'ChinaLink Express',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Mali',
      },
      {
        '@type': 'Country',
        name: 'Senegal',
      },
      {
        '@type': 'Country',
        name: 'Ivory Coast',
      },
      {
        '@type': 'Country',
        name: 'Nigeria',
      },
      {
        '@type': 'Country',
        name: 'Ghana',
      },
      {
        '@type': 'Country',
        name: 'Guinea',
      },
      {
        '@type': 'Country',
        name: 'Burkina Faso',
      },
      {
        '@type': 'Country',
        name: 'Benin',
      },
      {
        '@type': 'Country',
        name: 'Togo',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Shipping Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Air Freight',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sea Freight',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sourcing & Procurement',
          },
        },
      ],
    },
  },
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

export function getPageSeo(page: keyof typeof PAGE_SEO, locale: 'en' | 'fr' = 'en') {
  const pageData = PAGE_SEO[page];
  
  if ('en' in pageData && 'fr' in pageData) {
    return pageData[locale as keyof typeof pageData];
  }
  
  return pageData;
}

export function generateKeywords(lang: 'en' | 'fr'): string {
  return SEO_KEYWORDS[lang];
}

/**
 * SEO Configuration
 * 
 * Enterprise-level SEO configuration with comprehensive keywords
 * targeting China-Africa freight forwarding market.
 */

// ============================================================================
// Comprehensive Keyword Strings for Meta Tags
// ============================================================================

export const SEO_KEYWORDS = {
  en: [
    // Primary
    'freight forwarding', 'shipping from China', 'logistics company', 'international shipping',
    'sea freight', 'air freight', 'freight forwarder', 'China Mali shipping',
    // Long-tail
    'shipping from China to Mali', 'freight forwarding China to Bamako', 'Alibaba shipping agent',
    'China procurement services', 'door to door shipping China Mali',
    'container shipping China Mali', 'FCL shipping', 'LCL consolidation',
    // Locations
    'shipping China Bamako', 'freight forwarder China Mali', 'import China Mali',
    'Bamako logistics', 'China to Bamako shipping',
    // Services
    'air cargo China Mali', 'express shipping China Mali', 'Alibaba payment agent',
    'supplier verification China', 'quality inspection China',
    'customs clearance Mali', 'import export China Mali', 'sourcing agent Mali',
  ].join(', '),
  
  fr: [
    // Primary
    'fret maritime', 'fret aérien', 'expédition Chine', 'transitaire',
    'logistique internationale', 'transport international', 'commissionnaire transport',
    'fret Chine Mali', 'cargo chine mali', 'transitaire chine mali', 'envoi colis chine mali',
    // Long-tail
    'expédition colis Chine Mali', 'fret Chine Mali', 'envoi marchandises Chine Bamako',
    'achat fournisseur Chine', 'agent sourcing Chine',
    'paiement fournisseur chinois', 'dédouanement Mali', 'livraison porte à porte Chine Mali',
    'conteneur Chine Mali', 'conteneur complet FCL', 'groupage maritime LCL',
    'cargo chine mali', 'fret chine bamako', 'conteneur chine mali',
    // Locations
    'expédition Chine Bamako', 'fret Chine Bamako', 'transitaire Bamako',
    'envoi colis Chine Bamako', 'fret maritime Chine Mali', 'expédition Chine Mali',
    // Services
    'cargo aérien Chine Mali', 'express Chine Mali', 'agent paiement Alipay',
    'vérification fournisseur', 'inspection qualité Chine', 'entrepôt Chine Mali',
    'formalités douanières', 'déclaration en douane', 'import export Chine Mali',
  ].join(', '),
} as const;

// ============================================================================
// Page-specific SEO Metadata
// ============================================================================

export const PAGE_SEO = {
  home: {
    en: {
      title: 'ChinaLink Express | Sourcing & Shipping China to Mali | Air & Sea Freight',
      description: 'Your trusted partner for sourcing products from China and shipping to Mali. Air freight (14-21 days) & sea freight (60-75 days) to Bamako via our partner network. Get your free quote today!',
      keywords: `${SEO_KEYWORDS.en}, ChinaLink Express, logistics Mali`,
    },
    fr: {
      title: 'Cargo Chine Mali | Fret Aérien & Maritime | ChinaLink Express',
      description: 'cargo chine mali — Votre partenaire de confiance pour le sourcing de produits en Chine et l\'expédition vers le Mali. Fret aérien (14-21 jours) & maritime (60-75 jours) vers Bamako via notre réseau de partenaires. Devis gratuit!',
      keywords: `${SEO_KEYWORDS.fr}, ChinaLink Express, logistique Mali`,
    },
  },
  
  services: {
    airFreight: {
    en: {
      title: 'Air Freight China to Mali | Express Shipping',
        description: 'Fast air freight from China to Bamako, Mali through trusted partner carriers. Delivery in 14-21 days. Real-time tracking. Get a quote for your air cargo!',
        keywords: 'air freight China Mali, air cargo, express shipping China Mali, air freight Bamako, China air shipping',
      },
    fr: {
      title: 'Fret Aérien Chine Mali | Expédition Express',
        description: 'Fret aérien rapide de la Chine vers Bamako, Mali via des transporteurs partenaires de confiance. Livraison en 14-21 jours. Suivi en temps réel. Demandez votre devis!',
        keywords: 'fret aérien Chine Mali, cargo aérien, express Chine Mali, fret aérien Bamako',
      },
    },
    
    seaFreight: {
      en: {
        title: 'Sea Freight China to Mali | FCL & LCL Shipping | ChinaLink Express',
        description: 'Economical sea freight from Foshan port to Dakar port, then land transit to Bamako. FCL container shipping & LCL consolidation in 60-75 days. Get a quote!',
        keywords: 'sea freight China Mali, FCL shipping, LCL consolidation, container shipping, maritime freight China Mali, sea freight Bamako',
      },
      fr: {
        title: 'Fret Maritime Chine Mali | Conteneur FCL & Groupage LCL',
        description: 'Fret maritime économique du port de Foshan au port de Dakar, puis transit terrestre vers Bamako. Conteneurs FCL & groupage LCL en 60-75 jours. Devis gratuit!',
        keywords: 'fret maritime Chine Mali, conteneur FCL, groupage LCL, transport maritime, fret maritime Chine Bamako',
      },
    },
    
    sourcing: {
    en: {
      title: 'China Sourcing Agent for Mali | Alibaba Procurement',
        description: 'Professional sourcing agent in China. We buy from Alibaba on your behalf. Supplier verification, quality inspection, payment processing. Start sourcing today!',
        keywords: 'China sourcing agent, Alibaba agent, procurement China, supplier verification, quality inspection China',
      },
    fr: {
      title: 'Agent Sourcing Chine pour le Mali | Achat Alibaba',
      description: 'Agent sourcing en Chine pour les importateurs maliens. Achat Alibaba, vérification fournisseur, inspection qualité, paiement et expédition vers Bamako.',
      keywords: 'agent sourcing Chine Mali, agent Alibaba Mali, approvisionnement Chine Mali, vérification fournisseur Chine, inspection qualité Chine',
      },
    },
  },
  
  routes: {
    chinaToMali: {
    en: {
        title: 'Shipping from China to Mali | Freight Forwarder Bamako',
        description: 'Reliable freight forwarding from China to Mali. Air & sea shipping to Bamako. Door-to-door delivery. 7+ years experience. Get your free quote now!',
        keywords: 'shipping China Mali, freight forwarder Bamako, China to Bamako shipping, Mali logistics, import China Mali',
      },
    fr: {
        title: 'Cargo Chine Mali | Fret Aérien & Maritime | ChinaLink Express',
        description: 'Fret Chine-Mali fiable pour importer vers Bamako. Fret aérien 14-21 jours, fret maritime 60-75 jours, sourcing, paiement fournisseur et suivi WhatsApp.',
        keywords: 'fret Chine Mali, expédition Chine Mali, transitaire Chine Mali, fret Chine Bamako, cargo Chine Mali, import Chine Mali',
      },
    },
    

  },
  
  calculator: {
    en: {
      title: 'Shipping Cost Calculator | Freight Rates China to Mali',
      description: 'Calculate your shipping costs from China to Mali instantly. Air freight & sea freight rates to Bamako via our partner network. Get an accurate estimate in seconds!',
      keywords: 'shipping calculator, freight rates China Mali, shipping cost estimator, air freight calculator, sea freight calculator',
    },
    fr: {
      title: 'Calculateur de Frais d\'Expédition | Tarifs Fret Chine-Mali',
      description: 'Calculez vos frais d\'expédition de la Chine vers le Mali instantanément. Tarifs fret aérien et maritime vers Bamako via notre réseau de partenaires. Estimation précise!',
      keywords: 'calculateur frais expédition, tarifs fret Chine Mali, estimateur coût transport, calculateur fret aérien',
    },
  },
  
  pricing: {
    en: {
      title: 'Shipping Rates China to Mali | Air & Sea Freight Prices',
      description: 'Competitive shipping rates from China to Mali. Air freight & sea freight to Bamako via partner carriers. Transparent pricing, no hidden fees. View our price list!',
      keywords: 'shipping rates China Mali, freight prices, air freight rates, sea freight rates, shipping costs',
    },
    fr: {
      title: 'Tarifs d\'Expédition Chine-Mali | Prix Fret Aérien & Maritime',
      description: 'Tarifs compétitifs pour expédier de la Chine vers le Mali. Fret aérien et maritime vers Bamako via des partenaires. Prix transparents. Consultez nos tarifs!',
      keywords: 'tarifs expédition Chine Mali, prix fret, tarifs fret aérien, tarifs fret maritime, coûts transport',
    },
  },
  
  contact: {
    en: {
      title: 'Contact ChinaLink Express | Freight Quote China to Mali',
      description: 'Contact ChinaLink Express for a free freight quote. WhatsApp: +86 188 5172 5957. Air & sea shipping from China to Bamako, Mali through trusted partners. 24/7 support!',
      keywords: 'contact freight forwarder, shipping quote China Mali, ChinaLink Express contact, freight inquiry',
    },
    fr: {
      title: 'Contact ChinaLink Express | Devis Fret Chine-Mali',
      description: 'Contactez ChinaLink Express pour un devis fret gratuit. WhatsApp: +86 188 5172 5957. Fret aérien et maritime de la Chine vers Bamako, Mali via des partenaires de confiance. Support 24/7!',
      keywords: 'contact transitaire, devis fret Chine Mali, ChinaLink Express contact, demande expédition',
    },
  },
  
  faq: {
    en: {
      title: 'Shipping FAQ | China to Mali Freight Questions',
      description: 'Find answers to all your shipping questions. Delivery times, rates, customs, prohibited items. Everything you need to know about shipping from China to Mali.',
      keywords: 'shipping FAQ, freight questions, China Mali shipping FAQ, customs clearance FAQ, shipping times',
    },
    fr: {
      title: 'FAQ Expédition | Questions Fret Chine-Mali',
      description: 'Trouvez les réponses à toutes vos questions sur l\'expédition. Délais, tarifs, douanes, articles interdits. Tout savoir sur l\'expédition de la Chine vers le Mali.',
      keywords: 'FAQ expédition, questions fret, FAQ fret Chine Mali, FAQ dédouanement, délais livraison',
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

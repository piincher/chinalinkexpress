"use client";

import Script from "next/script";

export default function StructuredData() {
   // LocalBusiness Schema
   const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "ChinaLink Express",
      description:
         "Solutions logistiques complètes pour le sourcing, l'achat et l'expédition de marchandises de la Chine vers le Mali et l'Afrique.",
      url: "https://www.chinalinkexpress.com",
      logo: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png",
      image: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png",
      telephone: ["+86 188 5172 5957", "+223 5100 50 42", "+223 7669 61 77"],
      email: "contact@chinalinkexpress.com",
      address: {
         "@type": "PostalAddress",
         streetAddress: "Kalaban Coura, près du lycée Birgo",
         addressLocality: "Bamako",
         addressCountry: "ML",
      },
      geo: {
         "@type": "GeoCoordinates",
         // Approximate coordinates for Bamako, Mali
         latitude: "12.6392",
         longitude: "-8.0029",
      },
      openingHoursSpecification: [
         {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "20:00",
         },
         {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "17:00",
         },
         {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "10:00",
            closes: "15:00",
         },
      ],
      priceRange: "$$",
      currenciesAccepted: "CNY, XOF, USD",
      paymentAccepted: "Cash, Credit Card, Orange Money, Wave, Alipay, WeChat Pay",
      areaServed: {
         "@type": "GeoCircle",
         geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: "12.6392",
            longitude: "-8.0029",
         },
         geoRadius: "5000",
      },
      hasOfferCatalog: {
         "@type": "OfferCatalog",
         name: "Services logistiques",
         itemListElement: [
            {
               "@type": "Offer",
               itemOffered: {
                  "@type": "Service",
                  name: "Sourcing et Achat en Chine",
                  description:
                     "Nous gérons vos achats auprès des fournisseurs chinois avec professionnalisme et transparence.",
               },
            },
            {
               "@type": "Offer",
               itemOffered: {
                  "@type": "Service",
                  name: "Expédition Aérienne",
                  description:
                     "Livraison rapide par voie aérienne pour vos marchandises urgentes entre la Chine et l'Afrique.",
               },
            },
            {
               "@type": "Offer",
               itemOffered: {
                  "@type": "Service",
                  name: "Expédition Maritime",
                  description:
                     "Solution économique pour le transport de gros volumes par voie maritime.",
               },
            },
            {
               "@type": "Offer",
               itemOffered: {
                  "@type": "Service",
                  name: "Paiement Fournisseurs",
                  description:
                     "Facilitation du paiement sécurisé à vos fournisseurs en Chine via Alipay, WeChat Pay et autres méthodes.",
               },
            },
         ],
      },
      aggregateRating: {
         "@type": "AggregateRating",
         ratingValue: "4.9",
         reviewCount: "1000",
      },
      sameAs: [
         // Add social media links when available
         // "https://www.facebook.com/chinalinkexpress",
         // "https://www.linkedin.com/company/chinalinkexpress",
      ],
   };

   // Organization Schema
   const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ChinaLink Express",
      alternateName: "ChinaLink",
      url: "https://www.chinalinkexpress.com",
      logo: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png",
      description:
         "Acteur majeur de la logistique internationale depuis 2019, spécialisé dans les échanges entre la Chine, le Mali et l'Afrique.",
      foundingDate: "2019",
      contactPoint: [
         {
            "@type": "ContactPoint",
            telephone: "+86-188-5172-5957",
            contactType: "customer service",
            availableLanguage: ["French", "English", "Chinese"],
         },
      ],
   };

   // WebSite Schema with SearchAction
   const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ChinaLink Express",
      url: "https://www.chinalinkexpress.com",
      potentialAction: {
         "@type": "SearchAction",
         target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.chinalinkexpress.com/search?q={search_term_string}",
         },
         "query-input": "required name=search_term_string",
      },
   };

   // FAQPage Schema
   const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
         {
            "@type": "Question",
            name: "Quels types de marchandises pouvez-vous expédier ?",
            acceptedAnswer: {
               "@type": "Answer",
               text: "Nous expédions presque tous les types de marchandises, à l'exception des articles dangereux ou interdits par la loi. Contactez-nous pour plus de détails sur vos articles spécifiques au +8618851725957.",
            },
         },
         {
            "@type": "Question",
            name: "Combien de temps prend une expédition aérienne ?",
            acceptedAnswer: {
               "@type": "Answer",
               text: "L'expédition aérienne prend généralement entre 14 à 21 jours ouvrables de Chine vers Bamako. Nous offrons également des options express pour des livraisons en 2-5 jours.",
            },
         },
         {
            "@type": "Question",
            name: "Combien de temps prend une expédition maritime ?",
            acceptedAnswer: {
               "@type": "Answer",
               text: "L'expédition maritime prend généralement entre 60 à 75 jours ouvrables de Chine vers Bamako. C'est l'option la plus économique pour les gros volumes.",
            },
         },
         {
            "@type": "Question",
            name: "Comment fonctionne le paiement des fournisseurs ?",
            acceptedAnswer: {
               "@type": "Answer",
               text: "Nous facilitons le paiement sécurisé à vos fournisseurs en Chine via Alipay, WeChat Pay, cartes bancaires et autres méthodes. Vous payez le montant chez nous en fonction du taux du jour et nous réglons vos fournisseurs.",
            },
         },
         {
            "@type": "Question",
            name: "Comment recharger mon compte ChinaLink Express ?",
            acceptedAnswer: {
               "@type": "Answer",
               text: "Vous pouvez recharger votre compte client via Orange Money, Wave et Cash. Les fonds sont crédités instantanément et vous permettent de régler vos expéditions plus rapidement.",
            },
         },
         {
            "@type": "Question",
            name: "Proposez-vous un suivi en temps réel ?",
            acceptedAnswer: {
               "@type": "Answer",
               text: "Oui, tous nos envois sont équipés d'un système de suivi en temps réel accessible depuis votre tableau de bord client dans notre application mobile 24/7.",
            },
         },
      ],
   };

   // TransportService Schema
   const transportServiceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Logistics and Freight Forwarding",
      provider: {
         "@type": "LocalBusiness",
         name: "ChinaLink Express",
      },
      areaServed: {
         "@type": "GeoCircle",
         geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: "12.6392",
            longitude: "-8.0029",
         },
         geoRadius: "5000",
      },
      hasOfferCatalog: {
         "@type": "OfferCatalog",
         name: "Services de transport",
         itemListElement: [
            {
               "@type": "Offer",
               itemOffered: {
                  "@type": "Service",
                  name: "Fret Aérien Chine-Afrique",
                  description: "Transport aérien rapide et sécurisé",
               },
            },
            {
               "@type": "Offer",
               itemOffered: {
                  "@type": "Service",
                  name: "Fret Maritime Chine-Afrique",
                  description: "Transport maritime économique pour gros volumes",
               },
            },
         ],
      },
   };

   return (
      <>
         <Script
            id="local-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(localBusinessSchema),
            }}
         />
         <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(organizationSchema),
            }}
         />
         <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(websiteSchema),
            }}
         />
         <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(faqSchema),
            }}
         />
         <Script
            id="transport-service-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(transportServiceSchema),
            }}
         />
      </>
   );
}

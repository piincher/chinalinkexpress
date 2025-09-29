import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "ChinaLink Express – Sourcing et expédition de la Chine vers l’Afrique",
   description:
      "Fondée en 2019, ChinaLink Express est spécialisée dans le sourcing, l’achat et l’expédition de marchandises de la Chine vers le Mali et l’Afrique. Suivez vos colis en temps réel grâce à notre application mobile.",
   keywords: [
      "ChinaLink Express",
      "logistique internationale",
      "sourcing Chine",
      "expédition Afrique",
      "transport Mali",
      "achat et expédition",
      "commerce international",
      "suivi de colis",
      "application mobile logistique",
      "services logistiques Chine-Afrique",
      "import-export",
      "fret aérien et maritime",
      "logistique e-commerce",
      "solutions logistiques personnalisées",
      "logistique de la chaîne d'approvisionnement",
      "logistique de fret",
      "logistique de transport",
      "Cargo Chine-Afrique",
      "Cargo Mali",
      "Cargo Chine Mali",
      "Cargo Afrique",
      "Expédition Chine Afrique",
      "Expédition Chine Mali",
      "Expédition Afrique",
      "Sourcing Chine Afrique",
      "Sourcing Chine Mali",
      "Sourcing Afrique",
      "Transport Chine Afrique",
      "Transport Chine Mali",
      "Transport Afrique",
      "Logistique Chine Afrique",
      "Logistique Chine Mali",
      "Logistique Afrique",
      "Fret Chine Afrique",
      "Fret Chine Mali",
      "Fret Afrique",
      "Import Chine Afrique",
      "Import Chine Mali",
      "Import Afrique",
      "Export Chine Afrique",
      "Export Chine Mali",
      "Export Afrique",
      "Acheter en Chine Afrique",
   ],
   openGraph: {
      title: "ChinaLink Express - Votre partenaire logistique Chine-Afrique",
      description:
         "Sourcing, achat et expédition sécurisée de vos marchandises de la Chine vers le Mali et l’Afrique. Téléchargez notre application pour suivre vos colis en direct.",
      url: "https://chinalinkexpress.com",
      siteName: "ChinaLink Express",
      images: [
         {
            url: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png",
            width: 1200,
            height: 630,
            alt: "ChinaLink Express – logistique Chine Afrique",
         },
      ],
      locale: "fr_FR",
      type: "website",
   },
   alternates: {
      canonical: "https://chinalinkexpress.com",
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="fr">
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}

            <SpeedInsights />
            <Analytics />
         </body>
      </html>
   );
}

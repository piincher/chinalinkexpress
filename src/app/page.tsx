"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
   const [currentText, setCurrentText] = useState("");
   const [isDeleting, setIsDeleting] = useState(false);
   const [textIndex, setTextIndex] = useState(0);
   const [typingSpeed, setTypingSpeed] = useState(150);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [activeFaq, setActiveFaq] = useState<number | null>(null);

   // Scroll animation refs
   const aboutRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
   const servicesRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
   const whyUsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
   const testimonialsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
   const partnersRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
   const faqRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
   const contactRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

   const year = new Date().getFullYear();

   // Smooth scroll function
   const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
         window.scrollTo({
            top: ref.current.offsetTop - 80,
            behavior: "smooth",
         });
      }
      setMobileMenuOpen(false); // Close mobile menu after clicking
   };

   const texts = [
      "Solutions Logistiques Complètes",
      "Expéditions Internationales",
      "Votre Partenaire de Confiance",
   ];

   useEffect(() => {
      const handleTyping = () => {
         const currentFullText = texts[textIndex];

         if (isDeleting) {
            setCurrentText(currentFullText.substring(0, currentText.length - 1));
            setTypingSpeed(50);
         } else {
            setCurrentText(currentFullText.substring(0, currentText.length + 1));
            setTypingSpeed(150);
         }

         if (!isDeleting && currentText === currentFullText) {
            setTimeout(() => setIsDeleting(true), 1000);
         } else if (isDeleting && currentText === "") {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
         }
      };

      const timer = setTimeout(handleTyping, typingSpeed);
      return () => clearTimeout(timer);
   }, [currentText, isDeleting, textIndex, typingSpeed, texts]);

   const services = [
      {
         title: "ACHAT",
         description:
            "Nous gérons vos achats auprès des fournisseurs chinois avec professionnalisme et transparence.",
         icon: "🛒",
         image: "https://placehold.co/400x300/3B82F6/FFFFFF?text=Achat+en+Chine",
      },
      {
         title: "EXPÉDITION AÉRIENNE",
         description:
            "Livraison rapide par voie aérienne pour vos marchandises urgentes à travers le monde.",
         icon: "✈️",
         image: "https://placehold.co/400x300/10B981/FFFFFF?text=Avion+Cargo",
      },
      {
         title: "EXPÉDITION MARITIME",
         description: "Solution économique pour le transport de gros volumes par voie maritime.",
         icon: "🚢",
         image: "https://placehold.co/400x300/8B5CF6/FFFFFF?text=Navire+Marchand",
      },
      {
         title: "PAIEMENT FOURNISSEURS",
         description:
            "Nous facilitons le paiement sécurisé à vos fournisseurs en Chine via Alipay, WeChat Pay et autres méthodes.",
         icon: "💳",
         image: "https://placehold.co/400x300/F59E0B/FFFFFF?text=Paiement+Sécurisé",
      },
      {
         title: "RECHARGE COMPTE",
         description:
            "Rechargez votre compte ChinaLink Express facilement via Orange Money, Wave ou cash pour des transactions plus rapides.",
         icon: "📱",
         image: "https://placehold.co/400x300/07C160/FFFFFF?text=Alipay+WeChat+Pay",
      },
   ];

   const whyUs = [
      {
         title: "Rapidité",
         description: "Livraison express dans les délais les plus courts du marché.",
         image: "https://placehold.co/200x200/3B82F6/FFFFFF?text=Livraison+Rapide",
      },
      {
         title: "Fiabilité",
         description: "Suivi en temps réel et service client disponible 24/7.",
         image: "https://placehold.co/200x200/10B981/FFFFFF?text=Suivi+en+Temps+Réel",
      },
      {
         title: "Prix Compétitifs",
         description: "Les meilleurs tarifs du marché avec aucune surprise de frais cachés.",
         image: "https://placehold.co/200x200/F59E0B/FFFFFF?text=Prix+Compétitifs",
      },
      {
         title: "Expertise",
         description: "Plus de 7ans d'expérience dans la logistique internationale.",
         image: "https://placehold.co/200x200/8B5CF6/FFFFFF?text=Expertise+Logistique",
      },
   ];

   const testimonials = [
      {
         name: "Dr Touré",
         company: "Docteur",
         text: "Ça me fais plus de deux ans dans le système j’ai jamais travaillé avec une agence aussi organisée que la vôtre ! Continue dans ce sens tout le Mali viendra vers vous ou tout les autres vont vous imité !",
         rating: 5,
         image: "https://placehold.co/100x100/6366F1/FFFFFF?text=DT",
      },
      {
         name: "Ousmane Diallo",
         company: "AfricaDecor",
         text: "l'achat et l'expédition des colis de la Chine vers le Mali. Le suivi du colis, le temps de l'expédition, l'information. tout est professionnel. Merci",
         rating: 5,
         image: "https://placehold.co/100x100/EC4899/FFFFFF?text=OD",
      },
      {
         name: "Maimouna Matel N'Diaye",
         company: "Société Générale",
         text: "Ils sont impeccables. Les délais communiqués sont respectes. Bon.courage",
         rating: 5,
         image: "https://placehold.co/100x100/10B981/FFFFFF?text=MN",
      },
   ];

   const partners = [
      {
         name: "MAERSK",
         logo: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png",
      },
      {
         name: "CMA-CGM",
         logo: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png",
      },
      {
         name: "HAPAG-LLOYD",
         logo: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png",
      },
      {
         name: "EVERGREEN",
         logo: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/evergreen.png",
      },
      {
         name: "MSC",
         logo: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/msc.png",
      },
      {
         name: "ETHIOPIAN",
         logo: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png",
      },
      {
         name: "TURKISH AIRLINES",
         logo: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png",
      },
   ];

   const faqs = [
      {
         question: "Quels types de marchandises pouvez-vous expédier ?",
         answer:
            "Nous expédions presque tous les types de marchandises, à l'exception des articles dangereux ou interdits par la loi. Contactez-nous pour plus de détails sur vos articles spécifiques +8618851725957.",
      },
      {
         question: "Combien de temps prend une expédition aérienne ?",
         answer:
            "L'expédition aérienne prend généralement entre 14 à 21 jours ouvrables Chine Bamako. Nous offrons également des options express pour des livraisons en 2-5 jours.",
      },
      {
         question: "Combien de temps prend une expédition maritime ?",
         answer:
            "L'expédition maritime prend généralement entre 60 à 75 jours ouvrables Chine Bamako. C'est l'option la plus économique pour les gros volumes.",
      },
      {
         question: "Comment fonctionne le paiement des fournisseurs ?",
         answer:
            "Nous facilitons le paiement sécurisé à vos fournisseurs en Chine via Alipay, WeChat Pay, cartes bancaires et autres méthodes. Vous payez le montant chez nous en fonction du taux du jour et nous réglons vos fournisseurs.",
      },
      {
         question: "Comment recharger mon compte ChinaLink Express ?",
         answer:
            "Vous pouvez recharger votre compte client via Orange Money,Wave et Cash. Les fonds sont crédités instantanément et vous permettent de régler vos expéditions plus rapidement.",
      },
      {
         question: "Proposez-vous un suivi en temps réel ?",
         answer:
            "Oui, tous nos envois sont équipés d'un système de suivi en temps réel accessible depuis votre tableau de bord client dans notre application mobile 24/7 .",
      },
   ];

   return (
      <div className="min-h-screen bg-white">
         {/* Header */}
         <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center py-4">
                  <div className="flex items-center">
                     <Image
                        src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png"
                        alt="ChinaLink Express Logo"
                        className="h-15 w-15 rounded-lg"
                        width={1024}
                        height={1024}
                     />
                     <h1 className="ml-3 text-xl font-bold text-gray-900">CHINALINK EXPRESS</h1>
                  </div>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex space-x-8">
                     <button
                        onClick={() => scrollToSection(aboutRef)}
                        className="text-gray-700 hover:text-blue-600 transition font-medium"
                     >
                        À Propos
                     </button>
                     <button
                        onClick={() => scrollToSection(servicesRef)}
                        className="text-gray-700 hover:text-blue-600 transition font-medium"
                     >
                        Services
                     </button>
                     <button
                        onClick={() => scrollToSection(whyUsRef)}
                        className="text-gray-700 hover:text-blue-600 transition font-medium"
                     >
                        Pourquoi Nous
                     </button>
                     <button
                        onClick={() => scrollToSection(contactRef)}
                        className="text-gray-700 hover:text-blue-600 transition font-medium"
                     >
                        Contact
                     </button>
                  </nav>

                  <a
                     href="https://wa.me/8618851725957"
                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center md:px-6 md:py-2.5"
                  >
                     <span className="mr-2 text-lg">💬</span>
                     <span className="hidden sm:inline">WhatsApp</span>
                  </a>

                  {/* Mobile menu button */}
                  <button
                     className="md:hidden ml-4"
                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                     <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M4 6h16M4 12h16M4 18h16"
                        />
                     </svg>
                  </button>
               </div>

               {/* Mobile Navigation */}
               {mobileMenuOpen && (
                  <div className="md:hidden py-4 border-t border-gray-200">
                     <div className="flex flex-col space-y-3">
                        <button
                           onClick={() => scrollToSection(aboutRef)}
                           className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                        >
                           À Propos
                        </button>
                        <button
                           onClick={() => scrollToSection(servicesRef)}
                           className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                        >
                           Services
                        </button>
                        <button
                           onClick={() => scrollToSection(whyUsRef)}
                           className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                        >
                           Pourquoi Nous
                        </button>
                        <button
                           onClick={() => scrollToSection(testimonialsRef)}
                           className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                        >
                           Témoignages
                        </button>
                        <button
                           onClick={() => scrollToSection(faqRef)}
                           className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                        >
                           FAQ
                        </button>
                        <button
                           onClick={() => scrollToSection(contactRef)}
                           className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                        >
                           Contact
                        </button>
                        <a
                           href="https://wa.me/8618851725957"
                           className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center mt-2"
                        >
                           <span className="mr-2">💬</span> WhatsApp
                        </a>
                     </div>
                  </div>
               )}
            </div>
         </header>

         {/* Hero Banner */}
         <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div>
                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                        Votre Partenaire Logistique <br />
                        <span className="text-yellow-400">{currentText}</span>
                     </h2>
                     <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100">
                        Solutions complètes d'achat, d'expédition et de paiement pour votre business
                        avec la Chine. Rapidité, fiabilité et transparence garanties.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <a
                           href="https://wa.me/8618851725957"
                           target="_blank"
                           className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg transition transform hover:scale-105 flex items-center justify-center"
                        >
                           <span className="mr-2 text-lg">📱</span> Obtenir un Devis Gratuit
                        </a>
                        <button
                           onClick={() => scrollToSection(servicesRef)}
                           className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg transition transform hover:scale-105 text-center"
                        >
                           Découvrir Nos Services
                        </button>
                     </div>
                  </div>
                  <div className="relative">
                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8">
                        <Image
                           width={600}
                           height={400}
                           src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/flyer1.png"
                           alt="ChinaLink Express Warehouse"
                           className="rounded-xl w-full shadow-2xl h-auto"
                        />
                     </div>
                     <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-yellow-400 rounded-xl p-4 md:p-6 shadow-2xl">
                        <div className="text-center">
                           <div className="text-2xl md:text-3xl font-bold text-blue-900">7+</div>
                           <div className="text-blue-900 font-medium text-sm md:text-base">
                              Ans d'expérience
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
         </section>

         {/* About Us */}
         <section ref={aboutRef} id="about" className="py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-10 md:mb-16">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                     À Propos de ChinaLink Express
                  </h2>
                  <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto"></div>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                     <div className="grid grid-cols-1 gap-4">
                        <Image
                           src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse%20view.jpg"
                           alt="Notre Entrepôt Moderne"
                           className="rounded-2xl shadow-xl w-full h-auto"
                           width={600}
                           height={400}
                        />
                        <div className="grid grid-cols-2 gap-4">
                           <Image
                              width={300}
                              height={200}
                              src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/view1.jpg"
                              alt="Équipe Professionnelle"
                              className="rounded-xl shadow-lg w-full h-auto"
                           />
                           <Image
                              width={300}
                              height={200}
                              src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/view2.jpg"
                              alt="Technologie de Pointe"
                              className="rounded-xl shadow-lg w-full h-auto"
                           />
                        </div>
                     </div>
                  </div>
                  <div className="order-1 lg:order-2">
                     <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                        Fondée en 2019, ChinaLink Express est devenue un acteur majeur de la
                        logistique internationale, spécialisée dans les échanges entre la Chine, le
                        Mali et l’Afrique. Nous offrons des solutions complètes pour l’achat,
                        l’expédition et la livraison de marchandises, avec un suivi sécurisé et des
                        experts sur le terrain forts de plusieurs années d’expérience.
                     </p>
                     <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8">
                        Notre mission est de simplifier le commerce international en offrant des
                        solutions complètes d'achat, d'expédition et de paiement, permettant à nos
                        clients de se concentrer sur leur cœur de métier.
                     </p>
                     <div className="grid grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
                        <div className="text-center p-3 md:p-4 bg-white rounded-xl shadow">
                           <div className="text-2xl md:text-3xl font-bold text-blue-600">1000+</div>
                           <div className="text-gray-600 text-sm md:text-base">
                              Clients satisfaits
                           </div>
                        </div>
                        <div className="text-center p-3 md:p-4 bg-white rounded-xl shadow">
                           <div className="text-2xl md:text-3xl font-bold text-blue-600">5+</div>
                           <div className="text-gray-600 text-sm md:text-base">Pays desservis</div>
                        </div>
                        <div className="text-center p-3 md:p-4 bg-white rounded-xl shadow">
                           <div className="text-2xl md:text-3xl font-bold text-blue-600">99.8%</div>
                           <div className="text-gray-600 text-sm md:text-base">
                              Taux de réussite
                           </div>
                        </div>
                        <div className="text-center p-3 md:p-4 bg-white rounded-xl shadow">
                           <div className="text-2xl md:text-3xl font-bold text-blue-600">24/7</div>
                           <div className="text-gray-600 text-sm md:text-base">Support client</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Services - Bento Grid */}
         <section ref={servicesRef} id="services" className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-10 md:mb-16">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                     Nos Services
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                     Des solutions complètes pour simplifier votre commerce avec la Chine
                  </p>
                  <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto mt-3 md:mt-4"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {services.map((service, index) => (
                     <div
                        key={index}
                        className={`rounded-xl md:rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                           index === 0
                              ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white md:col-span-2"
                              : index === 1
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900"
                              : index === 2
                              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                              : index === 3
                              ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
                              : "bg-gradient-to-br from-blue-700 to-blue-800 text-white"
                        }`}
                     >
                        <div className="text-3xl md:text-4xl mb-3 md:mb-4">{service.icon}</div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                           {service.title}
                        </h3>
                        <p className="text-sm md:text-base opacity-90">{service.description}</p>
                     </div>
                  ))}
               </div>

               <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-r from-blue-600 to-yellow-400 rounded-2xl p-6 md:p-8 text-white overflow-hidden relative">
                     <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full"></div>
                     <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Telecharge l'application</h3>
                        <p className="opacity-90 mb-6"></p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                           <div className="bg-white text-blue-600 rounded-lg p-3 flex items-center">
                              <Image
                                 src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/app%20store%20qr%20code.png"
                                 alt="app store"
                                 className="rounded-2xl shadow-xl w-full h-auto"
                                 width={600}
                                 height={400}
                              />
                           </div>
                           <div className="bg-white text-green-600 rounded-lg p-3 flex items-center">
                              <img
                                 src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/play%20store.png"
                                 alt="Play store"
                                 className="rounded-2xl shadow-xl w-full h-auto"
                                 width={600}
                                 height={400}
                              />
                           </div>
                           {/* <div className="bg-white text-gray-800 rounded-lg p-3 flex items-center">
                              <span className="text-2xl mr-2">💳</span>
                              <span>Cartes Bancaires</span>
                           </div> */}
                           <div className="mt-4 text-2xl opacity-100">
                              Note: L'application est disponible uniquement pour les clients
                              enregistrés.
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white">
                     <h3 className="text-2xl font-bold mb-4">Découvrez notre application mobile</h3>
                     <p className="opacity-90 mb-6">
                        Suivez vos marchandises à chaque étape de leur voyage.
                     </p>
                     <Image
                        src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/app-flyer.png"
                        alt="Entrepôt ChinaLink Express"
                        className="rounded-lg w-full h-auto shadow-lg"
                        width={600}
                        height={400}
                     />
                     <div className="mt-4 text-sm opacity-75">
                        Votre partenaire de poche est là : suivez vos colis, gérez vos commandes et
                        expédiez en toute sécurité, le tout depuis notre application mobile !
                        📦📲💳🌍
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Why Us */}
         <section ref={whyUsRef} id="why-us" className="py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-10 md:mb-16">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                     Pourquoi Choisir ChinaLink Express ?
                  </h2>
                  <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {whyUs.map((item, index) => (
                     <div
                        key={index}
                        className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-blue-600"
                     >
                        <div className="mb-4">
                           <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-32 md:h-40 object-cover rounded-lg"
                           />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                           {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">{item.description}</p>
                     </div>
                  ))}
               </div>

               {/* <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                     <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                           Notre Centre Logistique
                        </h3>
                        <p className="text-gray-700 mb-6">
                           Situé stratégiquement à Shanghai, notre centre logistique de pointe
                           couvre plus de 10,000 m² et est équipé des dernières technologies pour
                           assurer un traitement rapide et sécurisé de vos marchandises.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-blue-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">24/7</div>
                              <div className="text-sm text-gray-600">Opérations continues</div>
                           </div>
                           <div className="bg-yellow-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-yellow-600">10K+</div>
                              <div className="text-sm text-gray-600">m² d'espace</div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <img
                           src="https://placehold.co/600x400/374151/FFFFFF?text=Centre+Logistique"
                           alt="Centre Logistique ChinaLink Express"
                           className="rounded-xl shadow-lg w-full"
                        />
                     </div>
                  </div>
               </div> */}
            </div>
         </section>

         {/* Testimonials */}
         <section ref={testimonialsRef} className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-10 md:mb-16">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                     Ce Que Disent Nos Clients
                  </h2>
                  <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {testimonials.map((testimonial, index) => (
                     <div
                        key={index}
                        className="bg-gray-50 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                     >
                        <div className="flex items-center mb-4">
                           <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full mr-4"
                           />
                           <div>
                              <div className="font-bold text-gray-900 text-sm md:text-base">
                                 {testimonial.name}
                              </div>
                              <div className="text-gray-600 text-xs md:text-sm">
                                 {testimonial.company}
                              </div>
                           </div>
                        </div>
                        <div className="flex mb-4">
                           {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-lg md:text-xl">
                                 ★
                              </span>
                           ))}
                        </div>
                        <p className="text-sm md:text-base text-gray-700 italic">
                           "{testimonial.text}"
                        </p>
                     </div>
                  ))}
               </div>

               <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                     Rejoignez Nos Clients Satisfaits
                  </h3>
                  <p className="text-lg opacity-90 mb-6">
                     Plus de 100 entreprises nous font confiance pour leurs besoins logistiques
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                     <div>
                        <Image
                           src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/retails.jpg"
                           alt="Client Retail"
                           className="rounded-lg mx-auto mb-3"
                           width={200}
                           height={200}
                        />
                        <div className="font-bold">Secteur Retail</div>
                     </div>
                     <div>
                        <Image
                           src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/tech.jpg"
                           alt="Client Tech"
                           className="rounded-lg mx-auto mb-3"
                           width={200}
                           height={200}
                        />
                        <div className="font-bold">Secteur Technologie</div>
                     </div>
                     <div>
                        <Image
                           src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/auto%20part.jpg"
                           alt="Client Automobile"
                           className="rounded-lg mx-auto mb-3"
                           width={200}
                           height={200}
                        />
                        <div className="font-bold">Secteur Automobile</div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Partners */}
         <section ref={partnersRef} className="py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-10 md:mb-16">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                     Nos Partenaires
                  </h2>
                  <p className="text-base md:text-lg text-gray-600">
                     Nous collaborons avec les meilleurs du secteur
                  </p>
                  <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto mt-3 md:mt-4"></div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 md:gap-6">
                  {partners.map((partner, index) => (
                     <div
                        key={index}
                        className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                     >
                        <Image
                           width={120}
                           height={60}
                           src={partner.logo}
                           alt={partner.name}
                           className="max-h-10 md:max-h-12 object-contain"
                        />
                     </div>
                  ))}
               </div>

               {/* <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
                  <div className="text-center mb-8">
                     <h3 className="text-2xl font-bold text-gray-900 mb-2">Notre Réseau Mondial</h3>
                     <p className="text-gray-600">Connecté à travers le monde pour votre succès</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl">🇨🇳</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2">Chine</h4>
                        <p className="text-gray-600">
                           Centres logistiques à Shanghai, Guangzhou et Yiwu
                        </p>
                     </div>
                     <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl">🌍</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2">Europe</h4>
                        <p className="text-gray-600">
                           Hubs logistiques en Allemagne, France et Espagne
                        </p>
                     </div>
                     <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl">🚚</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2">Afrique</h4>
                        <p className="text-gray-600">Partenaires locaux dans 25 pays africains</p>
                     </div>
                  </div>
               </div> */}
            </div>
         </section>

         {/* FAQ */}
         <section ref={faqRef} className="py-16 md:py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-10 md:mb-16">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                     Questions Fréquentes
                  </h2>
                  <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto"></div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  <div>
                     <img
                        src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/customer-support.png"
                        width={400}
                        height={300}
                        alt="Support Client"
                        className="rounded-xl shadow-lg w-full"
                     />
                  </div>
                  <div className="flex flex-col justify-center">
                     <h3 className="text-xl font-bold text-gray-900 mb-4">Besoin d'aide ?</h3>
                     <p className="text-gray-700 mb-6">
                        Notre équipe de support client est disponible 24/7 pour répondre à toutes
                        vos questions et vous assister dans vos démarches logistiques.
                     </p>
                     <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center">
                           <span className="text-2xl mr-3">📞</span>
                           <div>
                              <div className="font-bold">Support via Whatsapp</div>
                              <div className="text-sm text-gray-600">+86 18851725957</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-3 md:space-y-4">
                  {faqs.map((faq, index) => (
                     <div
                        key={index}
                        className="border border-gray-200 rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                     >
                        <button
                           className="w-full px-5 md:px-6 py-4 md:py-5 text-left font-bold text-base md:text-lg text-gray-900 flex justify-between items-center focus:outline-none"
                           onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        >
                           {faq.question}
                           <span
                              className={`transform transition-transform duration-300 ${
                                 activeFaq === index ? "rotate-180" : ""
                              }`}
                           >
                              ▼
                           </span>
                        </button>
                        <div
                           className={`px-5 md:px-6 pb-4 md:pb-5 text-gray-700 text-sm md:text-base transition-all duration-300 ease-in-out ${
                              activeFaq === index
                                 ? "max-h-96 opacity-100 pt-3 md:pt-4"
                                 : "max-h-0 opacity-0 overflow-hidden"
                           }`}
                        >
                           {faq.answer}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Contact */}
         <section
            ref={contactRef}
            id="contact"
            className="py-16 md:py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white"
         >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-10 md:mb-16">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                     Contactez-Nous
                  </h2>
                  <p className="text-base md:text-lg max-w-3xl mx-auto opacity-90">
                     Prêt à simplifier votre logistique internationale ? Notre équipe est là pour
                     vous aider.
                  </p>
                  <div className="w-20 md:w-24 h-1 bg-yellow-400 mx-auto mt-3 md:mt-4"></div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  <div>
                     <h3 className="text-xl md:text-2xl font-bold mb-5 md:mb-6">
                        Envoyez-nous un message
                     </h3>
                     <form className="space-y-4 md:space-y-6">
                        <div>
                           <label className="block text-sm font-medium mb-2">Nom complet</label>
                           <input
                              type="text"
                              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none text-white placeholder-gray-300 text-sm md:text-base"
                              placeholder="Votre nom"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium mb-2">Email</label>
                           <input
                              type="email"
                              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none text-white placeholder-gray-300 text-sm md:text-base"
                              placeholder="votre@email.com"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium mb-2">Message</label>
                           <textarea
                              rows={4}
                              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none text-white placeholder-gray-300 resize-none text-sm md:text-base"
                              placeholder="Décrivez votre besoin..."
                           ></textarea>
                        </div>
                        <button
                           type="submit"
                           className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 text-sm md:text-base"
                        >
                           Envoyer le Message
                        </button>
                     </form>
                  </div>

                  <div>
                     <h3 className="text-xl md:text-2xl font-bold mb-5 md:mb-6">
                        Informations de Contact
                     </h3>
                     <div className="space-y-5 md:space-y-6">
                        <div className="flex items-start">
                           <div className="bg-white/10 rounded-lg p-3 mr-4 flex-shrink-0">
                              <span className="text-xl md:text-2xl">📍</span>
                           </div>
                           <div>
                              <h4 className="font-bold mb-1 text-sm md:text-base">Adresse</h4>
                              <p className="opacity-90 text-sm md:text-base">
                                 Kalaban Coura, près du lycée Birgo
                                 <br />
                                 Bamako, Mali
                              </p>
                           </div>
                        </div>

                        <div className="flex items-start">
                           <div className="bg-white/10 rounded-lg p-3 mr-4 flex-shrink-0">
                              <span className="text-xl md:text-2xl">📞</span>
                           </div>
                           <div>
                              <h4 className="font-bold mb-1 text-sm md:text-base">Téléphone</h4>
                              <p className="opacity-90 text-sm md:text-base">+86 188 5172 5957</p>
                              <p className="opacity-90 text-sm md:text-base">+223 5100 50 42</p>
                              <p className="opacity-90 text-sm md:text-base">+223 7669 61 77</p>
                           </div>
                        </div>

                        <div className="flex items-start">
                           <div className="bg-white/10 rounded-lg p-3 mr-4 flex-shrink-0">
                              <span className="text-xl md:text-2xl">📧</span>
                           </div>
                           <div>
                              <h4 className="font-bold mb-1 text-sm md:text-base">Email</h4>
                              <p className="opacity-90 text-sm md:text-base">
                                 contact@chinalinkexpress.com
                              </p>
                           </div>
                        </div>

                        <div className="flex items-start">
                           <div className="bg-white/10 rounded-lg p-3 mr-4 flex-shrink-0">
                              <span className="text-xl md:text-2xl">💬</span>
                           </div>
                           <div>
                              <h4 className="font-bold mb-1 text-sm md:text-base">WhatsApp</h4>
                              <p className="opacity-90 text-sm md:text-base">
                                 Disponible 24/7 pour vos urgences
                              </p>
                              <a
                                 href="https://wa.me/8618851725957"
                                 className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2 transition text-sm md:text-base"
                              >
                                 WhatsApp +86 188 5172 5957
                              </a>

                              <a
                                 href="https://wa.me/22376696177"
                                 className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2  transition text-sm md:text-base"
                              >
                                 WhatsApp +223 7669 61 77
                              </a>
                           </div>
                        </div>

                        <div className="flex items-start">
                           <div className="bg-white/10 rounded-lg p-3 mr-4 flex-shrink-0">
                              <span className="text-xl md:text-2xl">📱</span>
                           </div>
                           <div>
                              <h4 className="font-bold mb-1 text-sm md:text-base">
                                 Paiements Mobiles
                              </h4>
                              <p className="opacity-90 text-sm md:text-base">
                                 Rechargez votre compte via Alipay ou WeChat Pay
                              </p>
                              <div className="flex mt-2 space-x-2">
                                 <img
                                    src="https://placehold.co/80x40/00A0E9/FFFFFF?text=Alipay"
                                    alt="Alipay"
                                    className="h-8"
                                 />
                                 <img
                                    src="https://placehold.co/80x40/07C160/FFFFFF?text=WeChat"
                                    alt="WeChat Pay"
                                    className="h-8"
                                 />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8 md:mt-12">
                        <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">
                           Heures d'ouverture
                        </h4>
                        <div className="bg-white/10 rounded-lg p-4">
                           <p className="opacity-90 text-sm md:text-base mb-1">
                              Lundi - Vendredi: 8h00 - 20h00
                           </p>
                           <p className="opacity-90 text-sm md:text-base mb-1">
                              Samedi: 9h00 - 17h00
                           </p>
                           <p className="opacity-90 text-sm md:text-base">
                              Dimanche: 10h00 - 15h00
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* <div className="mt-16 bg-white/10 rounded-2xl p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                     <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-4">Visitez Notre Siège</h3>
                        <p className="opacity-90 mb-4">
                           Venez découvrir nos installations modernes à Shanghai. Prenez rendez-vous
                           pour une visite guidée de notre centre logistique de pointe.
                        </p>
                        <a
                           href="#"
                           className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-bold transition"
                        >
                           Planifier une Visite
                        </a>
                     </div>
                     <div>
                        <img
                           src="https://placehold.co/500x300/FFFFFF/1E40AF?text=Bâtiment+ChinaLink"
                           alt="Bâtiment ChinaLink Express"
                           className="rounded-lg w-full shadow-lg"
                        />
                     </div>
                  </div>
               </div> */}
            </div>
         </section>

         {/* Footer */}
         <footer className="bg-gray-900 text-white py-10 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                  <div>
                     <div className="flex items-center mb-6">
                        <Image
                           src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png"
                           alt="ChinaLink Express Logo"
                           className="h-15 w-15 rounded-lg"
                           width={1024}
                           height={1024}
                        />
                        <h3 className="text-sm ml-2 font-bold ">CHINALINK EXPRESS</h3>
                     </div>
                     <p className="text-gray-400 mb-6 text-sm md:text-base">
                        Votre partenaire de confiance pour le commerce international avec la Chine.
                        Des solutions logistiques complètes pour faire grandir votre business.
                     </p>
                     <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition">
                           📱
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                           📘
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                           📸
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                           🐦
                        </a>
                     </div>
                  </div>

                  <div>
                     <h4 className="font-bold mb-4 text-sm md:text-base">Services</h4>
                     <ul className="space-y-2 text-gray-400 text-sm">
                        <li>
                           <a href="#" className="hover:text-white transition">
                              Achat
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:text-white transition">
                              Expédition Aérienne
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:text-white transition">
                              Expédition Maritime
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:text-white transition">
                              Paiement Fournisseurs
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:text-white transition">
                              Recharge Alipay/WeChat
                           </a>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h4 className="font-bold mb-4 text-sm md:text-base">Liens Utiles</h4>
                     <ul className="space-y-2 text-gray-400 text-sm">
                        <li>
                           <button
                              onClick={() => scrollToSection(aboutRef)}
                              className="hover:text-white transition"
                           >
                              À Propos
                           </button>
                        </li>
                        <li>
                           <button
                              onClick={() => scrollToSection(servicesRef)}
                              className="hover:text-white transition"
                           >
                              Services
                           </button>
                        </li>
                        <li>
                           <button
                              onClick={() => scrollToSection(whyUsRef)}
                              className="hover:text-white transition"
                           >
                              Pourquoi Nous
                           </button>
                        </li>
                        <li>
                           <button
                              onClick={() => scrollToSection(contactRef)}
                              className="hover:text-white transition"
                           >
                              Contact
                           </button>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h4 className="font-bold mb-4 text-sm md:text-base">Newsletter</h4>
                     <p className="text-gray-400 mb-4 text-sm">
                        Abonnez-vous pour recevoir nos dernières offres et actualités.
                     </p>
                     <div className="flex">
                        <input
                           type="email"
                           placeholder="Votre email"
                           className="px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none text-sm flex-grow"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition text-sm">
                           →
                        </button>
                     </div>
                     <div className="mt-4">
                        <Image
                           src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/FACEBOOK%20QR.png"
                           alt="Code QR"
                           width={120}
                           height={120}
                           className="w-full rounded-lg"
                        />
                        <p className="text-xs text-gray-400 mt-2 text-center">
                           Scannez pour nous suivre sur facebook
                        </p>
                     </div>
                  </div>
               </div>

               <div className="border-t border-gray-800 mt-8 pt-6 md:mt-10 md:pt-8 text-center text-gray-400 text-sm">
                  <p>&copy; {year} ChinaLink Express. Tous droits réservés.</p>
                  <p>
                     Développé et maintenu par NUVOTECH{" "}
                     <a
                        href="https://nuvotech.tech"
                        target="_blank"
                        className="text-blue-500 hover:underline"
                     >
                        Visitez NUVOTECH
                     </a>
                  </p>
               </div>
            </div>
         </footer>
      </div>
   );
}
// updae

import { Metadata } from "next";

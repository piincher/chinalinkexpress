/**
 * Services Section Component
 * 
 * 3D animated service cards with tilt effects, glowing borders,
 * and immersive hover interactions.
 * Part of the landing page feature.
 */

'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { AnimatedSection, SplitText } from '@/components/animations';
import { SECTION_IDS } from '../constants';

const SERVICE_ICONS = ['🛒', '✈️', '🚢', '💳', '📱'];
const SERVICE_KEYS = ['sourcing', 'airFreight', 'seaFreight', 'payment', 'recharge'] as const;

// 3D Tilt Card Component
function TiltCard({ 
  icon, 
  title, 
  description, 
  index,
  gradient,
}: { 
  icon: string; 
  title: string; 
  description: string; 
  index: number;
  gradient: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17deg', '-17deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17deg', '17deg']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className={`relative h-full rounded-3xl p-6 md:p-8 overflow-hidden ${gradient}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glowing border effect */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />
        
        {/* Content with 3D depth */}
        <div style={{ transform: 'translateZ(50px)' }}>
          <motion.div 
            className="text-5xl md:text-6xl mb-4"
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          >
            {icon}
          </motion.div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
            {title}
          </h3>
          
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/5 rounded-full blur-xl" />
      </motion.div>
    </motion.div>
  );
}

export function ServicesSection() {
  const t = useTranslations('services');

  const services = SERVICE_KEYS.map((key, index) => ({
    key,
    icon: SERVICE_ICONS[index],
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
  }));

  const gradients = [
    'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800',
    'bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500',
    'bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600',
    'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500',
    'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600',
  ];

  return (
    <section id={SECTION_IDS.SERVICES} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-950 via-blue-50/50 dark:via-blue-950/20 to-white dark:to-slate-950" />
      
      {/* Animated shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 dark:bg-blue-500/20 rounded-full blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <motion.span
              className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {t('sectionLabel') || 'Nos Services'}
            </motion.span>
          </AnimatedSection>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <SplitText animation="fadeUp">
              {t('title')}
            </SplitText>
          </h2>
          
          <AnimatedSection delay={0.3}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </AnimatedSection>
          
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>

        {/* Services Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
              style={{ perspective: 1000 }}
            >
              <TiltCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
                gradient={gradients[index]}
              />
            </motion.div>
          ))}
        </div>

        {/* App Download Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Codes Card */}
          <AnimatedSection animation="slideLeft">
            <motion.div 
              className="relative bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white overflow-hidden"
              whileHover={{ y: -5 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{t('appSection.title')}</h3>
                <p className="text-white/80 mb-8">Téléchargez notre application mobile</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <motion.div 
                    className="bg-white rounded-2xl p-4 shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                  >
                    <Image
                      src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/app%20store%20qr%20code.png"
                      alt="App Store QR Code"
                      width={120}
                      height={120}
                      className="rounded-xl"
                    />
                    <p className="text-center text-gray-800 dark:text-gray-200 text-sm mt-2 font-medium">App Store</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white rounded-2xl p-4 shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    <Image
                      src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/play%20store.png"
                      alt="Google Play QR Code"
                      width={120}
                      height={120}
                      className="rounded-xl"
                    />
                    <p className="text-center text-gray-800 dark:text-gray-200 text-sm mt-2 font-medium">Play Store</p>
                  </motion.div>
                </div>
                
                <motion.p 
                  className="mt-6 text-sm text-white/70"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {t('appSection.note')}
                </motion.p>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* App Preview Card */}
          <AnimatedSection animation="slideRight">
            <motion.div 
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 text-white overflow-hidden"
              whileHover={{ y: -5 }}
            >
              {/* Grid pattern overlay */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('appSection.previewTitle')}</h3>
                <p className="text-gray-400 dark:text-gray-500 mb-6">Suivez vos expéditions en temps réel</p>
                
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/app-flyer.png"
                    alt="Mobile App Preview"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                  
                  {/* Feature badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {['📍 Tracking', '🔔 Notifications', '💬 Support'].map((badge) => (
                      <span key={badge} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {badge}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;

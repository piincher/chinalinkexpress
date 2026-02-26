/**
 * Footer Component
 * 
 * Animated footer with gradient background, reveal animations,
 * and interactive social links.
 * Part of the landing page feature.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { AnimatedSection } from '@/components/animations';
import { APP_NAME } from '@/constants/appConstants';
import { getCurrentYear } from '@/lib/utils';
import { SOCIAL_LINKS } from '@/config/app';
import { SECTION_IDS } from '../constants';

const SERVICE_KEYS = ['sourcing', 'airFreight', 'seaFreight', 'payment', 'recharge'] as const;

// Animated link with underline effect
function AnimatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="relative text-gray-400 hover:text-white transition-colors inline-block"
      whileHover={{ x: 5 }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-white"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

// Social icon with hover effect
function SocialIcon({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <motion.a
      href={href}
      className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl hover:bg-blue-600 transition-colors"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, y: -3 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  );
}

export function Footer() {
  const t = useTranslations();
  const year = getCurrentYear();

  const footerLinks = [
    { key: 'about', href: `#${SECTION_IDS.ABOUT}` },
    { key: 'services', href: `#${SECTION_IDS.SERVICES}` },
    { key: 'whyUs', href: `#${SECTION_IDS.WHY_US}` },
    { key: 'contact', href: `#${SECTION_IDS.CONTACT}` },
  ];

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-white overflow-hidden">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-yellow-400" />
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring' }}
              >
                <img
                  src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png"
                  alt="ChinaLink Express Logo"
                  className="h-16 w-16 rounded-xl"
                />
              </motion.div>
              <h3 className="text-xl ml-3 font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {APP_NAME.toUpperCase()}
              </h3>
            </div>
            
            <p className="text-gray-400 dark:text-gray-500 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-3">
              <SocialIcon href="https://wa.me/8618851725957" icon="💬" label="WhatsApp" />
              <SocialIcon href={SOCIAL_LINKS.FACEBOOK} icon="📘" label="Facebook" />
              <SocialIcon href={SOCIAL_LINKS.INSTAGRAM} icon="📸" label="Instagram" />
              <SocialIcon href={SOCIAL_LINKS.TWITTER} icon="🐦" label="Twitter" />
            </div>
          </AnimatedSection>

          {/* Services Column */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <h4 className="font-bold mb-6 text-lg border-b border-gray-700 dark:border-gray-600 pb-2">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {SERVICE_KEYS.map((key, index) => (
                <motion.li 
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AnimatedLink href={`#${SECTION_IDS.SERVICES}`}>
                    {t(`services.items.${key}.title`)}
                  </AnimatedLink>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Links Column */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <h4 className="font-bold mb-6 text-lg border-b border-gray-700 dark:border-gray-600 pb-2">{t('footer.links')}</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AnimatedLink href={link.href}>
                    {t(`navigation.${link.key}`)}
                  </AnimatedLink>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Newsletter Column */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <h4 className="font-bold mb-6 text-lg border-b border-gray-700 dark:border-gray-600 pb-2">{t('footer.newsletter')}</h4>
            <p className="text-gray-400 mb-4">
              Restez informé de nos dernières offres et actualités.
            </p>
            
            <motion.div 
              className="flex"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                className="px-4 py-3 rounded-l-xl bg-gray-800 dark:bg-gray-700 border border-gray-700 dark:border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 flex-grow transition-colors"
              />
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-5 py-3 rounded-r-xl transition-all font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="mt-6 bg-white rounded-2xl p-3"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/FACEBOOK%20QR.png"
                alt="QR Code"
                className="w-full rounded-xl"
              />
              <p className="text-xs text-gray-600 dark:text-gray-500 mt-2 text-center font-medium">
                {t('footer.scanToFollow')}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 dark:text-gray-500">
            &copy; {year} {APP_NAME}. {t('footer.copyright')}
          </p>
          <motion.p 
            className="mt-2 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            {t('footer.developedBy')}{' '}
            <a
              href="https://nuvotech.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-300 hover:to-cyan-300 font-semibold"
            >
              NUVOTECH
            </a>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;

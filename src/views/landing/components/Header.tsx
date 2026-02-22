/**
 * Header Component
 * 
 * Futuristic animated header with glassmorphism, glowing effects,
 * and smooth micro-interactions. Features scroll-aware transparency
 * and magnetic hover effects.
 * Part of the landing page feature.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollTo } from '@/hooks/useScrollTo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
import { MagneticButton } from '@/components/animations';
import { i18nConfig, type Locale } from '@/i18n/config';
import { LanguageSelector } from '@/components/language';
import { SECTION_IDS } from '../constants';

interface HeaderProps {
  locale: Locale;
}

interface NavItem {
  key: string;
  sectionId: string;
  label: string;
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'about', sectionId: SECTION_IDS.ABOUT, label: 'about' },
  { key: 'services', sectionId: SECTION_IDS.SERVICES, label: 'services' },
  { key: 'pricing', sectionId: 'pricing', label: 'pricing', href: '/pricing' },
  { key: 'whyUs', sectionId: SECTION_IDS.WHY_US, label: 'whyUs' },
  { key: 'contact', sectionId: SECTION_IDS.CONTACT, label: 'contact' },
];

// Animated nav link with underline effect
function AnimatedNavLink({
  item,
  onClick,
  isActive,
  tNav,
  locale,
}: {
  item: NavItem;
  onClick: () => void;
  isActive: boolean;
  tNav: (key: string) => string;
  locale: string;
}) {
  const content = (
    <>
      <span className="relative z-10">{tNav(item.label)}</span>
      
      {/* Animated underline */}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
        initial={{ width: 0 }}
        animate={{ width: isActive ? '100%' : 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glow effect on hover */}
      <motion.span
        className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );

  if (item.href) {
    return (
      <Link href={`/${locale}${item.href}`}>
        <motion.span
          className="relative px-3 py-2 text-gray-700 hover:text-blue-600 font-medium group inline-block cursor-pointer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className="relative px-3 py-2 text-gray-700 hover:text-blue-600 font-medium group"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations();
  const tNav = useTranslations('navigation');
  const { scrollToElement } = useScrollTo();
  const pathname = usePathname();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Track scroll position for header styling - only on client
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.1)']
  );

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = NAV_ITEMS.map(item => document.getElementById(item.sectionId));
      const scrollPosition = window.scrollY + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToElement(sectionId);
    closeMobileMenu();
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: isMounted ? headerBg : 'rgba(255, 255, 255, 0)',
        backdropFilter: isMounted ? `blur(${12}px)` : 'none',
        boxShadow: isMounted ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with animation */}
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick(SECTION_IDS.HERO)}
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                  '0 0 20px 5px rgba(59, 130, 246, 0.3)',
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-lg"
            >
              <Image
                src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png"
                alt="ChinaLink Express Logo"
                className="h-12 w-12 rounded-lg"
                width={1024}
                height={1024}
              />
            </motion.div>
            <motion.span
              className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              CHINALINK EXPRESS
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
              >
                <AnimatedNavLink
                  item={item}
                  onClick={() => handleNavClick(item.sectionId)}
                  isActive={activeSection === item.sectionId || (item.href && pathname?.includes(item.href)) ? true : false}
                  tNav={tNav}
                  locale={locale}
                />
              </motion.div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector Dropdown */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="hidden md:block"
            >
              <LanguageSelector
                locale={locale}
                variant="compact"
                align="right"
              />
            </motion.div>

            {/* WhatsApp CTA with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
            >
              <MagneticButton strength={20}>
                <a
                  href="https://wa.me/8618851725957"
                  className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30 overflow-hidden group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Shimmer effect */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <span className="relative flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                    >
                      💬
                    </motion.span>
                    <span className="hidden sm:inline">{t('cta.contactUs')}</span>
                  </span>
                </a>
              </MagneticButton>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-gray-700 rounded-full origin-left"
                  animate={{ 
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 0 : 0,
                  }}
                />
                <motion.span
                  className="w-full h-0.5 bg-gray-700 rounded-full"
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-gray-700 rounded-full origin-left"
                  animate={{ 
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? 0 : 0,
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-x-0 top-[72px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              {/* Language Selector - Mobile */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {t('common.language') || 'Language'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {i18nConfig.locales.map((l) => (
                    <a
                      key={l}
                      href={`/${l}${pathname.replace(new RegExp(`^/${locale}`), '') || '/'}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        l === locale
                          ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => closeMobileMenu()}
                    >
                      <span className="text-lg">{i18nConfig.localeLabels[l].flag}</span>
                      <span>{i18nConfig.localeLabels[l].label}</span>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Nav Links */}
              <div className="flex flex-col space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  item.href ? (
                    <Link key={item.key} href={`/${locale}${item.href}`}>
                      <motion.span
                        className="block text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-3 px-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index + 0.2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {tNav(item.label)}
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.button
                      key={item.key}
                      onClick={() => handleNavClick(item.sectionId)}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-3 px-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all w-full"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tNav(item.label)}
                    </motion.button>
                  )
                ))}
                
                <motion.a
                  href="https://wa.me/8618851725957"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-4 rounded-xl font-semibold flex items-center justify-center mt-4 shadow-lg shadow-green-500/30"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">💬</span> {t('cta.contactUs')}
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;

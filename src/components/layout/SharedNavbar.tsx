/**
 * Shared navbar.
 *
 * Behaviour is unchanged — same links, same tools dropdown, same mobile sheet,
 * same language and theme controls. What changed is that it now reads from the
 * token system instead of hard-coded Tailwind palette values, and that it knows
 * what it is sitting on top of.
 *
 * Two problems this solves:
 *
 * 1. Contrast over the hero. The bar is fixed and transparent at the top of the
 *    page, and the home page's hero is now a dark photograph. The old link
 *    colour (`text-gray-700`) would have been invisible against it. Rather than
 *    hard-code "the home page is dark", the bar observes any band marked
 *    `data-nav-overlay="void"` and flips to its light treatment only while that
 *    band is actually underneath it. Inner pages, which have no such band, keep
 *    the ink treatment automatically.
 *
 * 2. Three competing colours. The wordmark was a blue→cyan gradient, the CTA was
 *    WhatsApp green, the links were grey-blue. That is three accents in a strip
 *    56px tall. The wordmark is now solid, and the CTA takes the one page
 *    accent while keeping the WhatsApp glyph so the affordance survives.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Users, ChevronDown, Calculator, Scale, ShieldCheck, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Cta } from '@/components/site/Cta';
import { WHATSAPP_URL } from '@/constants/contact';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/config';

interface SharedNavbarProps {
  locale: Locale;
}

/**
 * The navbar button pointed at the community group number. It sits beside
 * "get a quote" intent, not "join the group", so it now uses the sales line.
 * See src/constants/contact.ts to reverse this.
 */
const WHATSAPP_HREF = WHATSAPP_URL;

const NAV_LINKS = [
  { key: 'home', href: '/', label: 'navigation.home' },
  { key: 'services', href: '/#services', label: 'navigation.services' },
  { key: 'about', href: '/#about', label: 'navigation.about' },
  { key: 'whyUs', href: '/#why-us', label: 'navigation.whyUs' },
  { key: 'community', href: '/communaute', label: 'navigation.community' },
  { key: 'blog', href: '/blog', label: 'navigation.blog' },
  { key: 'contact', href: '/#contact', label: 'navigation.contact' },
] as const;

const TOOL_LINKS = [
  { key: 'pricing', href: '/tarifs', label: 'navigation.pricing', icon: null },
  { key: 'calculator', href: '/calculateur', label: 'navigation.calculator', icon: Calculator },
  { key: 'compareShipping', href: '/comparateur-transport', label: 'navigation.compareShipping', icon: Scale },
  { key: 'checkProduct', href: '/verifier-produit', label: 'navigation.checkProduct', icon: ShieldCheck },
] as const;

export function SharedNavbar({ locale }: SharedNavbarProps) {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  /** True while a dark band is passing under the bar. */
  const [onVoid, setOnVoid] = useState(false);
  /**
   * Whether this page declares any band for the bar to float over.
   *
   * The bar may only be transparent when it knows what is underneath it.
   * Several inner pages (community, pricing) open with their own dark hero that
   * does not declare itself, and a transparent bar over those rendered its
   * dark-ink links on a dark background — technically legible, practically not.
   * Pages that declare nothing get the solid bar from the first pixel.
   */
  const [hasOverlay, setHasOverlay] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Watch for dark bands passing beneath the bar.
  useEffect(() => {
    const targets = document.querySelectorAll('[data-nav-overlay="void"]');
    setHasOverlay(targets.length > 0);
    if (!targets.length) {
      setOnVoid(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // `some` rather than per-entry state: a page could have more than one
        // dark band, and the bar should be light while any of them is under it.
        setOnVoid((prev) => {
          const anyIntersecting = entries.some((e) => e.isIntersecting);
          return entries.length ? anyIntersecting : prev;
        });
      },
      {
        // A shallow strip just below the bar. Elements crossing it are what the
        // bar is currently overlapping.
        rootMargin: '-64px 0px -80% 0px',
        threshold: 0,
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // The bar is solid once scrolled; while it is transparent it takes its
  // contrast from whatever band is underneath.
  const light = onVoid && !isScrolled;
  const linkColor = light ? 'var(--color-void-ink-2)' : 'var(--color-ink-2)';
  const linkHover = light ? 'var(--color-void-ink)' : 'var(--color-ink)';
  const wordmark = light ? 'var(--color-void-ink)' : 'var(--color-ink)';

  const getNavHref = (link: (typeof NAV_LINKS)[number]) => `/${locale}${link.href}`;
  const getToolHref = (href: string) => `/${locale}${href}`;

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 nav-shell',
        (isScrolled || !hasOverlay) && 'nav-shell--solid'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      data-light={light ? 'true' : undefined}
    >
      <div
        style={{
          maxWidth: 'var(--shell)',
          marginInline: 'auto',
          paddingInline: 'var(--band-x)',
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ── wordmark ─────────────────────────────────────────────────── */}
          <Link href={`/${locale}/`} className="flex items-center gap-2.5 shrink-0">
            <span className="relative w-9 h-9 md:w-10 md:h-10 block">
              <Image
                src="/images/chinalink-logo-square.png"
                alt="ChinaLink Express"
                fill
                sizes="(min-width: 768px) 40px, 36px"
                className="object-contain"
                priority
              />
            </span>
            <span
              className="hidden sm:block"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: '-0.02em',
                color: wordmark,
              }}
            >
              CHINALINK
            </span>
          </Link>

          {/* ── desktop nav ──────────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center" style={{ gap: 'var(--space-2xs)' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={getNavHref(link)}
                className="nav-link"
                style={
                  {
                    '--nav-link': linkColor,
                    '--nav-link-hover': linkHover,
                  } as React.CSSProperties
                }
              >
                {t(link.label)}
              </Link>
            ))}

            <div ref={toolsRef} className="relative">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                onMouseEnter={() => setIsToolsOpen(true)}
                className="nav-link inline-flex items-center gap-1"
                aria-expanded={isToolsOpen}
                aria-haspopup="true"
                style={
                  {
                    '--nav-link': isToolsOpen ? linkHover : linkColor,
                    '--nav-link-hover': linkHover,
                  } as React.CSSProperties
                }
              >
                {t('navigation.tools')}
                <ChevronDown
                  size={15}
                  className={cn('transition-transform duration-200', isToolsOpen && 'rotate-180')}
                />
              </button>

              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    onMouseLeave={() => setIsToolsOpen(false)}
                    className="absolute top-full left-0 mt-2 w-60 py-2"
                    style={{
                      backgroundColor: 'var(--color-paper)',
                      border: '1px solid var(--color-rule)',
                      borderRadius: 'var(--radius-card)',
                      boxShadow: 'var(--shadow-lift)',
                    }}
                  >
                    {TOOL_LINKS.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.key}
                          href={getToolHref(tool.href)}
                          onClick={() => setIsToolsOpen(false)}
                          className="tool-link"
                        >
                          <span className="w-4 h-4 shrink-0 inline-flex items-center justify-center">
                            {Icon && <Icon size={15} />}
                          </span>
                          {t(tool.label)}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* ── right ────────────────────────────────────────────────────── */}
          <div className="flex items-center" style={{ gap: 'var(--space-xs)' }}>
            <ThemeToggle />
            <LanguageSelector locale={locale} variant="minimal" />

            <span className="hidden lg:inline-flex">
              <Cta
                href={WHATSAPP_HREF}
                external
                variant="solid"
                tone={light ? 'void' : 'ink'}
                arrow={false}
                icon={<MessageCircle size={16} aria-hidden />}
              >
                WhatsApp
              </Cta>
            </span>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden nav-icon-button"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
              style={{ color: linkHover }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── mobile sheet ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden"
            style={{
              backgroundColor: 'var(--color-paper)',
              borderTop: '1px solid var(--color-rule)',
            }}
          >
            <nav
              style={{
                paddingInline: 'var(--band-x)',
                paddingBlock: 'var(--space-md)',
                // The sheet can exceed the viewport on a short phone once the
                // tools list is included, so it scrolls rather than clipping.
                maxHeight: 'calc(100svh - 4rem)',
                overflowY: 'auto',
              }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={getNavHref(link)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-link"
                >
                  {link.key === 'community' && <Users size={16} />}
                  {t(link.label)}
                </Link>
              ))}

              <div
                style={{
                  marginTop: 'var(--space-md)',
                  paddingTop: 'var(--space-md)',
                  borderTop: '1px solid var(--color-rule)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-label)',
                    textTransform: 'uppercase',
                    color: 'var(--color-neutral)',
                    padding: '0 0 var(--space-xs)',
                  }}
                >
                  {t('navigation.tools')}
                </div>

                {TOOL_LINKS.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.key}
                      href={getToolHref(tool.href)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="mobile-link"
                    >
                      <span className="w-4 h-4 shrink-0 inline-flex items-center justify-center">
                        {Icon && <Icon size={16} />}
                      </span>
                      {t(tool.label)}
                    </Link>
                  );
                })}

                <div
                  className="flex items-center justify-between"
                  style={{ paddingBlock: 'var(--space-md)' }}
                >
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)' }}>
                    {t('common.language')}
                  </span>
                  <LanguageSelector locale={locale} variant="default" />
                </div>

                <Cta
                  href={WHATSAPP_HREF}
                  external
                  variant="solid"
                  arrow={false}
                  icon={<MessageCircle size={18} aria-hidden />}
                  style={{ width: '100%' }}
                >
                  WhatsApp
                </Cta>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default SharedNavbar;

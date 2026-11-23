/**
 * Shared navbar.
 *
 * A floating pill, identical on every page and every band, which is what lets
 * pages stop declaring what sits under the bar. Same links,
 * same language and theme controls; the mobile menu opens as a full-height panel.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Cta } from '@/components/site/Cta';
import { ScrollProgress } from '@/components/moments/ScrollProgress';
import { WHATSAPP_URL } from '@/constants/contact';
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

// Audit 2026-11-20: prices and parcel tracking are the two most frequent tasks, so
// they are top-level. Home (the logo), why-us, community and contact moved out:
// the WhatsApp button covers contact, the footer lists the rest.
// Owner decision 2026-11-23: five links + WhatsApp. Blog, reviews and the tools
// (calculator, product check) live in the footer.
const NAV_LINKS = [
  { key: 'services', href: '/services', label: 'navigation.services' },
  { key: 'pricing', href: '/tarifs', label: 'navigation.pricing' },
  { key: 'trackParcel', href: '/suivi', label: 'navigation.trackParcel' },
  { key: 'about', href: '/qui-sommes-nous', label: 'navigation.about' },
  { key: 'contact', href: '/contact', label: 'navigation.contact' },
] as const;

export function SharedNavbar({ locale }: SharedNavbarProps) {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkColor = 'var(--color-ink-2)';
  const linkHover = 'var(--color-ink)';
  const wordmark = 'var(--color-ink)';

  const getNavHref = (link: (typeof NAV_LINKS)[number]) => `/${locale}${link.href}`;

  return (
    <header className="nav-shell">
      {/* Reading progress on long pages (Tarifs, FAQ, guides). CSS-driven. */}
      <ScrollProgress />
      <div className="nav-pill">
        <div className="flex items-center" style={{ gap: 'var(--space-xs)' }}>
          {/* ── wordmark ─────────────────────────────────────────────────── */}
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0" style={{ marginInlineEnd: 'var(--space-sm)' }}>
            <span className="relative w-8 h-8 block">
              <Image
                src="/images/chinalink-logo-square.png"
                alt="ChinaLink Express"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </span>
            <span
              className="nav-wordmark"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: '-0.02em',
                color: wordmark,
              }}
            >
              ChinaLink Express
            </span>
          </Link>

          {/* ── desktop nav ──────────────────────────────────────────────── */}
          <nav className="hidden xl:flex items-center">
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
          </nav>

          {/* ── right ────────────────────────────────────────────────────── */}
          <div className="flex items-center" style={{ gap: 'var(--space-2xs)', marginInlineStart: 'var(--space-sm)' }}>
            <ThemeToggle />
            <LanguageSelector locale={locale} variant="minimal" />

            <span className="hidden sm:inline-flex">
              <Cta
                href={WHATSAPP_HREF}
                external
                variant="solid"
                arrow={false}
                icon={<MessageCircle size={16} aria-hidden />}
              >
                WhatsApp
              </Cta>
            </span>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden nav-icon-button"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden fixed inset-0 overflow-hidden"
            style={{
              zIndex: -1,
              pointerEvents: 'auto',
              backgroundColor: 'var(--color-paper)',
            }}
          >
            <nav
              style={{
                paddingInline: 'var(--band-x)',
                paddingBlock: 'calc(5rem + var(--space-md)) var(--space-xl)',
                // The sheet can exceed the viewport on a short phone once the
                // tools list is included, so it scrolls rather than clipping.
                height: '100svh',
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
    </header>
  );
}

export default SharedNavbar;

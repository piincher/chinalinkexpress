'use client';

/**
 * Services — an index, grouped by where you are in the journey.
 *
 * The row layout stays: full-width rows separated by hairlines, the number in
 * mono at the left margin, the name large in the display face, the description
 * held to a readable measure. Rows beat cards here because the list does not
 * divide evenly into columns and because a row is what a printed index looks
 * like. What was replaced before this — five pointer-tilting cards with a
 * radial glare following the cursor — is not coming back.
 *
 * What changed is the ordering. Five unrelated rows (ACHAT, EXPÉDITION
 * AÉRIENNE, EXPÉDITION MARITIME, PAIEMENT FOURNISSEURS, RECHARGE COMPTE) read
 * as a price list: five things this company will sell you, in no particular
 * order, leaving the reader to work out which ones they need. They are now
 * three groups following the customer's own sequence — before the shipment, in
 * China, then on to Bamako — which makes the real argument visible without
 * stating it: this company can pick the job up before the freight starts and
 * put it down after the freight ends.
 *
 * Two rules for the rows:
 *
 *   · A row links only where a page genuinely exists. "Réception à l'entrepôt"
 *     and "Consolidation" are real services with no page behind them, so they
 *     render as plain rows rather than as links to an anchor that would tell
 *     the reader nothing new. A dead-feeling link costs more than a static row.
 *
 *   · "Recharge compte" was dropped. It pointed at /tarifs, which is a price
 *     list and not an account top-up, and account funding is a client
 *     convenience rather than a reason to choose a forwarder. It is still
 *     covered in the FAQ, where someone looking for it will be.
 */

import React, { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  CreditCard,
  Warehouse,
  Boxes,
  ClipboardList,
  Plane,
  Ship,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { Band, Shell, Figure } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { Reveal, RevealGroup } from '@/components/motion';
import { useFlowLine } from '@/components/motion/useFlowLine';
import { SECTION_IDS } from '../constants';

interface ServiceItem {
  key: string;
  Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  /** Omitted where no page exists — the row then renders without a link. */
  href?: string;
}

const GROUPS: { key: string; items: ServiceItem[] }[] = [
  {
    key: 'before',
    items: [
      { key: 'sourcing', Icon: Search, href: '/services/sourcing' },
      { key: 'verification', Icon: ShieldCheck, href: '/services/verification-fournisseur-chine' },
      { key: 'payment', Icon: CreditCard, href: '/services/paiement-fournisseur-chine' },
    ],
  },
  {
    key: 'inChina',
    items: [
      { key: 'reception', Icon: Warehouse },
      { key: 'consolidation', Icon: Boxes },
      { key: 'registration', Icon: ClipboardList },
    ],
  },
  {
    key: 'toBamako',
    items: [
      { key: 'airFreight', Icon: Plane, href: '/services/air-freight' },
      { key: 'seaFreight', Icon: Ship, href: '/services/sea-freight' },
      { key: 'delivery', Icon: MapPin },
    ],
  },
];

// /services: one photo per service (owner 2026-11-24). Our own footage where it
// shows the service; no client names. Verification, payment and air freight have
// no own footage, so they use free Unsplash-License photos (public/media/stock):
// 8iDaJg7TPz4, Q6uqw_Hjye8, miHHRMLDDH8 (airline logo cropped off).
// shortcut: replace the stock ones with our own photos when we have them.
const SERVICE_PHOTOS: Record<string, string> = {
  // Owner's own photo of Yiwu International Trade Market, plate blurred.
  sourcing: '/media/steps/yiwu-market.webp',
  // A Chinese supplier's factory, being checked (owner 2026-11-24).
  verification: '/media/stock/china-factory-check.webp',
  payment: '/media/stock/qr-payment.webp',
  reception: '/media/proof/generator.webp',
  consolidation: '/media/steps/consolidation.webp',
  registration: '/media/app/colis.webp',
  airFreight: '/media/stock/air-cargo.webp',
  seaFreight: '/media/container-loaded.webp',
  // Bamako warehouse unloading (owner 2026-11-23).
  delivery: '/media/steps/livraison.webp',
};

// Home page (owner decision 2026-11-23): the three ways in, nothing else.
const HOME_KEYS = ['sourcing', 'airFreight', 'seaFreight'];
const HOME_GROUPS = [
  { key: 'home', items: GROUPS.flatMap((g) => g.items).filter((i) => HOME_KEYS.includes(i.key)) },
];

/** `bare`: /services page — group labels + titles, no heading (the PageHero is the heading), no descriptions. */
export function ServicesSection({ compact = false, bare = false }: { compact?: boolean; bare?: boolean }) {
  const t = useTranslations('services');
  const tHome = useTranslations('home');
  const locale = useLocale();
  const groups = compact ? HOME_GROUPS : GROUPS;
  const flowRef = useRef<HTMLDivElement>(null);
  useFlowLine(flowRef, bare);

  // Numbering runs across the whole section rather than restarting per group,
  // so the nine rows read as one sequence the reader is moving through.
  let counter = 0;

  return (
    <Band id={SECTION_IDS.SERVICES} tone="paper">
      <Shell>
        {!bare && (
          <SectionHead
            title={compact ? tHome('servicesTitle') : t('title')}
            lede={compact ? undefined : t('subtitle')}
          />
        )}

        <div ref={flowRef} className={bare ? 'svc-flow flow-line' : undefined}>
        {groups.map((group) => (
          <section key={group.key} style={{ marginBottom: 'var(--space-2xl)' }}>
            {!compact && <Reveal>
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 400,
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  margin: '0 0 var(--space-md)',
                }}
              >
                {t(`groups.${group.key}`)}
              </h3>
            </Reveal>}

            <RevealGroup stagger={0.07} selector="[data-service-row]">
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {group.items.map((item, indexInGroup) => {
                  counter += 1;
                  const { Icon } = item;

                  const rowStyle: React.CSSProperties = {
                    display: 'grid',
                    // Number · icon · name · description · arrow. Collapses to
                    // a single column below 860px via the stylesheet.
                    gridTemplateColumns: 'auto auto minmax(0, 15rem) minmax(0, 1fr) auto',
                    alignItems: 'center',
                    gap: 'clamp(1rem, 2.5vw, 2.25rem)',
                    padding: 'var(--space-lg) 0',
                    borderTop: indexInGroup === 0 && !bare ? '1px solid var(--color-rule)' : undefined,
                    borderBottom: bare ? undefined : '1px solid var(--color-rule)',
                    textDecoration: 'none',
                    color: 'inherit',
                  };

                  const content = (
                    <>
                      <span
                        className={bare ? 'flow-node' : undefined}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          letterSpacing: 'var(--tracking-label)',
                          color: 'var(--color-muted)',
                        }}
                      >
                        {String(counter).padStart(2, '0')}
                      </span>

                      {bare ? (
                        <Figure
                          src={SERVICE_PHOTOS[item.key]}
                          alt=""
                          focal="55%"
                          style={{ borderRadius: 10 }}
                          className="svc-photo"
                          sizes="(max-width: 760px) 96px, 176px"
                        />
                      ) : (
                        <Icon
                          size={20}
                          aria-hidden
                          className="service-icon"
                          style={{ color: 'var(--color-accent)', flexShrink: 0 }}
                        />
                      )}

                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--weight-heading)',
                          letterSpacing: 'var(--tracking-heading)',
                          textTransform: 'none',
                          color: 'var(--color-ink)',
                          margin: 0,
                          minWidth: 0,
                        }}
                      >
                        {t(`items.${item.key}.title`)}
                      </h4>

                      {!compact && !bare && <p
                        className="service-desc"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-base)',
                          lineHeight: 'var(--leading-body)',
                          color: 'var(--color-ink-2)',
                          margin: 0,
                          minWidth: 0,
                          maxWidth: '52ch',
                        }}
                      >
                        {t(`items.${item.key}.description`)}
                      </p>}

                      {item.href ? (
                        <ArrowRight
                          size={18}
                          aria-hidden
                          className="service-arrow"
                          style={{ color: 'var(--color-accent)', flexShrink: 0 }}
                        />
                      ) : (
                        // Holds the arrow column open so linked and unlinked
                        // rows share one grid and the names stay aligned.
                        <span aria-hidden style={{ width: 18, flexShrink: 0 }} />
                      )}
                    </>
                  );

                  return (
                    <li key={item.key} data-service-row>
                      {item.href ? (
                        <Link href={`/${locale}${item.href}`} className="service-row" style={rowStyle}>
                          {content}
                        </Link>
                      ) : (
                        // Same `service-row` class so the 860px restack applies
                        // to this row too — without it the five-column grid
                        // survives onto a phone and overflows. The `--static`
                        // modifier removes the hover shift.
                        <div className="service-row service-row--static" style={rowStyle}>
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </RevealGroup>
          </section>
        ))}
        </div>

        {/* Owner 2026-11-23: machines and big volumes, shown with a real crate
            being loaded by forklift at our China warehouse (no client data). */}
        {compact && (
          <Figure
            src="/media/steps/gros-volumes.webp"
            alt={tHome('bigVolumesAlt')}
            focal="50%"
            scrim={0.55}
            sizes="(max-width: 760px) 100vw, 80vw"
            style={{ aspectRatio: '21 / 9', marginBottom: 'var(--space-xl)' }}
          >
            <div className="how-step-text">
              <strong>{tHome('bigVolumesTitle')}</strong>
              <span>{tHome('bigVolumesSub')}</span>
            </div>
          </Figure>
        )}

        {compact && (
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2"
            style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}
          >
            {tHome('allServices')}
            <ArrowRight size={16} aria-hidden />
          </Link>
        )}
      </Shell>
    </Band>
  );
}

export default ServicesSection;

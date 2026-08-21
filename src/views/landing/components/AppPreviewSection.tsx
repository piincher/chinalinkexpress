'use client';

/**
 * The product itself — the page's first piece of proof.
 *
 * This section used to sit tenth, after five sections of argument, and consist
 * of two phone screenshots beside a paragraph. It has moved to third, directly
 * under the hero and the one-line explanation of what the company does, because
 * of what the hero now promises: "vous ne perdez pas leur trace". A claim like
 * that has to be paid for immediately or it reads as the same noise as everyone
 * else's, and the strongest thing this company owns is that the claim is
 * literally true — there is a system, clients are in it, and it can be shown.
 *
 * So the section shows it three ways, in descending order of proof:
 *
 *   1. `TrackingPreview` — the status sequence rendered live in markup, in the
 *      operation's own vocabulary, clearly labelled as an example.
 *   2. The two real app screenshots, which prove the app exists rather than
 *      being a mockup of an app.
 *   3. The store links, which anyone can check in ten seconds.
 *
 * On tone: this used to be a `void` band, on the argument that phone
 * screenshots float as pale slabs on white paper. That argument was right about
 * the screenshots and wrong about the band, and moving the section to third
 * made the cost visible — it would have put a dark band immediately before the
 * Journey's dark band, turning two deliberate moments into one long dark run.
 * The page keeps exactly three `void` bands (hero, journey, close); used more
 * often the device stops being emphasis. So the band is `paper-2` and the
 * darkness moved *into* the objects: the timeline panel and both screenshots
 * carry the void surface and rule tokens, which is truer anyway — a lit screen
 * on a light desk is what these things are.
 *
 * An earlier fix is preserved: the screenshots dropped `unoptimized`, without
 * which Next emitted their URLs raw and the `%20` in `app-screen%20(1).jpg`
 * normalised back to a literal space and 404'd — both rendered as empty grey
 * boxes in production.
 *
 * The layout is three columns on a wide screen, and on a phone it drops the
 * screenshots entirely — the timeline says the same thing in a tenth of the
 * bytes, and two tall 9:19.5 images stacked under it would add most of a
 * screen of scrolling to make a point already made.
 */

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Band, Shell, APP_SCREENS } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { Reveal, RevealGroup } from '@/components/motion';
import { AppStoreButtons } from '@/components/shared/AppStoreButtons';
import { TrackingPreview } from './TrackingPreview';

/*
 * Alt text describes what each screenshot actually shows. The second was
 * labelled "Liste des expéditions et de leurs statuts"; it is the dashboard.
 *
 * ⚠ For the owner: both of these are captures of a real account. The first
 * shows a goods reference, a warehouse bay and the name of the member of staff
 * who received the parcel; the second shows a personal balance
 * ("Reste à payer : 303 000 FCFA"). They were already live on the site before
 * this pass, and they are the owner's own account, so they have not been
 * removed — but a screenshot taken from a demo account with placeholder
 * figures would carry exactly the same proof without publishing either.
 */
const SHOTS = [
  {
    key: 'tracking',
    src: APP_SCREENS.tracking,
    alt: 'Détail d’une marchandise dans l’application ChinaLink Express : photo du colis, volume, poids et suivi du statut',
  },
  {
    key: 'shipments',
    src: APP_SCREENS.shipments,
    alt: 'Tableau de bord de l’application ChinaLink Express : nombre de marchandises, expéditions en transit et accès au suivi',
  },
];

export function AppPreviewSection() {
  const t = useTranslations();

  return (
    <Band id="app" tone="paper-2">
      <Shell>
        <SectionHead
          label={t('appSection.label')}
          title={t('appSection.title')}
          lede={t('appSection.previewDescription')}
        />

        <div className="app-proof">
          {/* ── 1. the sequence, rendered ─────────────────────────────────── */}
          <Reveal style={{ minWidth: 0 }}>
            <TrackingPreview />

            <div style={{ marginTop: 'var(--space-xl)' }}>
              <AppStoreButtons />
              {/* Accounts are opened by staff, not by self-signup. Saying so
                  here costs one line and saves the download that ends at a
                  login wall. */}
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--color-ink-2)',
                  marginTop: 'var(--space-lg)',
                  marginBottom: 0,
                  maxWidth: '44ch',
                }}
              >
                {t('services.appSection.note')}
              </p>
            </div>
          </Reveal>

          {/* ── 2. the app itself ────────────────────────────────────────── */}
          <RevealGroup stagger={0.12} className="app-shots">
            {SHOTS.map((shot, i) => (
              <div
                key={shot.key}
                style={{
                  position: 'relative',
                  aspectRatio: '9 / 19.5',
                  minWidth: 0,
                  borderRadius: 'var(--radius-panel)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-void-2)',
                  border: '1px solid var(--color-void-rule)',
                  // A slight vertical offset between the two so they read as a
                  // pair of objects rather than a two-column grid.
                  transform: i === 1 ? 'translateY(clamp(1rem, 3vw, 2.5rem))' : undefined,
                  boxShadow: 'var(--shadow-void)',
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 900px) 0px, 22vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
            ))}
          </RevealGroup>
        </div>
      </Shell>
    </Band>
  );
}

export default AppPreviewSection;

/**
 * Hero: the container doors swing open on the real operation.
 *
 * The doors are pure CSS over content that is already painted, so they never
 * delay the page. They play once per visit and not at all under reduced motion.
 * Text renders on the server, and the footage is a poster until LazyVideo decides
 * the connection can afford it, so nothing here sits in front of the LCP.
 */

import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { MessageCircle, ShoppingCart, Ship, ShieldCheck, Truck } from 'lucide-react';
import { Cta, CarrierBar } from '@/components/site';
import { LazyVideo } from '@/components/site/LazyVideo';
import { SECTION_IDS, HERO_WHATSAPP_URL } from '../constants';
import { fetchCompanyStats } from '@/lib/publicStatsApi';
import { fetchPublicReviews } from '@/lib/publicReviewsApi';

const HERO_STEPS = [
  { key: 'source', Icon: ShoppingCart },
  { key: 'ship', Icon: Ship },
  { key: 'clear', Icon: ShieldCheck },
  { key: 'deliver', Icon: Truck },
];

const ONCE_PER_VISIT = `try{if(sessionStorage.getItem('cl-doors')){document.documentElement.dataset.doors='seen'}else{sessionStorage.setItem('cl-doors','1')}}catch(e){}`;

export async function HeroSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  // Live figures next to the CTA (audit 2026-11-20). Both fetchers fall back instead of throwing.
  const [stats, { stats: reviewStats }] = await Promise.all([fetchCompanyStats(), fetchPublicReviews(1)]);
  const num = (n: number) =>
    locale === 'en' ? n.toLocaleString('en-US') : n.toLocaleString('fr-FR').replace(/\s/g, '\u00A0');
  const rating = (reviewStats?.averageRating ?? 0).toFixed(1).replace('.', locale === 'en' || locale === 'zh' ? '.' : ',');

  return (
    <>
      <section id={SECTION_IDS.HERO} className="hero band-void">
        <div className="hero-media">
          <LazyVideo src="/media/hero-loop.mp4" poster="/media/hero-poster.webp" />
          <div className="hero-veil" />
        </div>

        <script dangerouslySetInnerHTML={{ __html: ONCE_PER_VISIT }} />
        <div className="doors" dir="ltr" aria-hidden>
          <div className="door door-l">
            <i className="door-rod" />
            <i className="door-rod" />
            <span className="door-stamp">
              <b>CHINA</b>
              <small>GUANGZHOU · FOSHAN</small>
            </span>
          </div>
          <div className="door door-r">
            <i className="door-rod" />
            <i className="door-rod" />
            <span className="door-stamp">
              <b>LINK</b>
              <small>BAMAKO · MALI</small>
            </span>
          </div>
        </div>

        {/* Owner decision 2026-11-23: say who we are first; one action (WhatsApp),
            prices as a quiet link. The estimator lives on /calculateur and /tarifs. */}
        <div className="hero-grid hero-grid--solo">
          <div className="hero-copy">
            {/* Owner reference 2026-11-23: very short headline, one button, four steps. */}
            <h1>
              <span className="sr-only">ChinaLink Express — </span>
              {t('home.headlineLead')} <span className="hero-accent">{t('home.headlineAccent')}</span>
            </h1>
            <p className="hero-route">{t('home.routeLine')}</p>
            <div className="hero-actions">
              <Cta
                href={HERO_WHATSAPP_URL}
                external
                variant="solid"
                tone="void"
                size="lg"
                arrow={false}
                data-cta="hero-whatsapp"
                icon={<MessageCircle size={18} aria-hidden />}
                style={{ '--cta-bg': 'var(--color-sun)', '--cta-bg-hover': 'var(--color-sun-deep)', '--cta-fg': 'var(--color-sun-ink)' } as React.CSSProperties}
              >
                {t('home.getQuote')}
              </Cta>
              <Cta href="#parcours" variant="outline" tone="void" size="lg" data-cta="hero-journey">
                {t('cta.seeHowItWorks')}
              </Cta>
            </div>
            <ul className="hero-steps">
              {HERO_STEPS.map(({ key, Icon }) => (
                <li key={key}>
                  <Icon size={26} aria-hidden />
                  {t(`home.steps.${key}`)}
                </li>
              ))}
            </ul>
            <span className="hero-badge" data-proof>
              {t('home.proofClients', { clients: num(stats.clientsServed) })}
              {reviewStats && reviewStats.totalReviews > 0 && <> · {rating}/5</>}
            </span>
          </div>
        </div>
      </section>

      <div className="carriers">
        <div className="carriers-in">
          <CarrierBar tone="paper" label={t('landing.carriersLabel')} />
        </div>
      </div>
    </>
  );
}

export default HeroSection;

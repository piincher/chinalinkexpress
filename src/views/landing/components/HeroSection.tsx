/**
 * Hero: the container doors swing open on the real operation.
 *
 * The doors are pure CSS over content that is already painted, so they never
 * delay the page. They play once per visit and not at all under reduced motion.
 * Text renders on the server, and the footage is a poster until LazyVideo decides
 * the connection can afford it, so nothing here sits in front of the LCP.
 */

import React from 'react';
import { getTranslations } from 'next-intl/server';
import { MessageCircle } from 'lucide-react';
import { Cta, CarrierBar } from '@/components/site';
import { LazyVideo } from '@/components/site/LazyVideo';
import { HeroEstimator } from './HeroEstimator';
import { LaneTicker } from './LaneTicker';
import { SECTION_IDS, HERO_WHATSAPP_URL } from '../constants';

const ONCE_PER_VISIT = `try{if(sessionStorage.getItem('cl-doors')){document.documentElement.dataset.doors='seen'}else{sessionStorage.setItem('cl-doors','1')}}catch(e){}`;

export async function HeroSection() {
  const t = await getTranslations();

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

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              <span className="hero-kw">{t('hero.keywords')}</span>
              {t('hero.headline')}
            </h1>
            <p>{t('hero.subheadline')}</p>
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
              >
                {t('cta.startShipping')}
              </Cta>
              <Cta href="#parcours" variant="outline" tone="void" size="lg" data-cta="hero-journey">
                {t('cta.seeHowItWorks')}
              </Cta>
            </div>
            <span className="hero-badge">{t('hero.badge')}</span>
          </div>

          <HeroEstimator />
        </div>

        <LaneTicker />
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

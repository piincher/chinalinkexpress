/**
 * Proof: the verifiable photo. Competitors say "we send photos"; here a code on
 * the photo can be checked on /verifier by anyone. Copy promises a code on
 * reception photos and lists the custody stages, but never a photo per stage,
 * because arrival and handover photos are not always taken.
 */

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Band, Shell, Cta } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { LazyVideo } from '@/components/site/LazyVideo';

export function ProofSection() {
  const t = useTranslations('proof');
  const locale = useLocale();
  const stages = t.raw('stages') as string[];

  return (
    <Band tone="void" id="preuve">
      <Shell>
        <div className="proof">
          <figure className="proof-media">
            <div className="proof-video">
              <LazyVideo src="/media/proof-loop.mp4" poster="/media/proof-poster.webp" />
            </div>
            <figcaption className="proof-banner">
              <Image src="/images/chinalink-logo-square.png" alt="" width={48} height={48} style={{ borderRadius: 8, flex: 'none' }} />
              <div>
                <b>CHINALINK EXPRESS · G-•••••</b>
                <span>{t('bannerLine')}</span>
                <em>{t('code')}</em>
                <small>{t('scan')}</small>
              </div>
            </figcaption>
            <span className="proof-note">{t('note')}</span>
          </figure>

          <div>
            <SectionHead tone="void" label={t('label')} title={t('title')} lede={t('lede')} />
            <div className="proof-chain">
              <header>
                {t('chain')}
                <span dir="ltr">{stages.length}/{stages.length}</span>
              </header>
              <ol>
                {stages.map((stage) => (
                  <li key={stage}>{stage}</li>
                ))}
              </ol>
            </div>
            <Cta href={`/${locale}/verifier`} tone="void" style={{ marginTop: 'var(--space-xl)' }}>
              {t('cta')}
            </Cta>
          </div>
        </div>
      </Shell>
    </Band>
  );
}

export default ProofSection;

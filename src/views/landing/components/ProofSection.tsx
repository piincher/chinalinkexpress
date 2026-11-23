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

export function ProofSection() {
  const t = useTranslations('proof');
  const locale = useLocale();
  const stages = t.raw('stages') as string[];

  return (
    <Band tone="void" id="preuve">
      <Shell>
        <div className="proof">
          <figure className="proof-media">
            {/* Owner 2026-11-23: a REAL intake photo (generator, Foshan) with its real
                watermark banner; QR, IMG code and labels blurred in the file. */}
            <div className="proof-video" style={{ position: 'relative', aspectRatio: '1600 / 1061', height: 'auto', borderRadius: 'var(--radius-card)' }}>
              <Image src="/media/proof/generator.webp" alt={t('photoAlt')} fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
            </div>
            <span className="proof-note">{t('note')}</span>
          </figure>

          <div>
            <SectionHead tone="void" label={t('label')} title={t('title')} />
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

/**
 * "Comment utiliser l'application" — every core client screen, in the order a
 * client meets it, on one vertical line. Server component: zero client JS.
 * Screens are real app renders with demo data (public/media/app/guide/*.webp,
 * exported at 640px from chinalink-video-studio/public/generated/<video>/screens).
 */

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Band, SectionHead, Shell } from '@/components/site';
import { BUSINESS_INFO, generateHowToSchema } from '@/config/seo-advanced';
import { AppGuideFlow } from './AppGuideFlow';
import type { Locale } from '@/i18n/config';

// `h`: image height at 640px wide (tall captures scroll inside the phone; default one screen).
// `hint`: centre of the button the step names, as fractions of the image (tap ripple).
// `paper`: the supplier sheet is an A4-like document, not a phone screen.
type GuideStep = { key: string; src: string; h?: number; hint?: { x: number; y: number }; paper?: true };
const GUIDE_STEPS: GuideStep[] = [
  { key: 'account', src: 'compte', hint: { x: 0.66, y: 0.503 } },
  { key: 'address', src: 'adresse-envoi', h: 2957, hint: { x: 0.5372, y: 0.5011 } },
  { key: 'sheet', src: 'fiche', h: 905, paper: true },
  { key: 'home', src: 'accueil', h: 3138, hint: { x: 0.5282, y: 0.2806 } },
  { key: 'goods', src: 'marchandises', hint: { x: 0.6436, y: 0.2844 } },
  { key: 'detail', src: 'detail', hint: { x: 0.2462, y: 0.294 } },
  { key: 'warehouse3d', src: 'entrepot-3d', hint: { x: 0.5, y: 0.45 } },
  { key: 'custody', src: 'chaine', h: 4183, hint: { x: 0.3391, y: 0.6877 } },
  { key: 'shipments', src: 'expeditions', hint: { x: 0.8385, y: 0.4905 } },
  { key: 'container', src: 'carte', hint: { x: 0.755, y: 0.455 } },
  { key: 'orders', src: 'commandes', hint: { x: 0.3632, y: 0.2701 } },
  { key: 'points', src: 'points', h: 3070, hint: { x: 0.7077, y: 0.2453 } },
  { key: 'notifications', src: 'notifications', hint: { x: 0.5, y: 0.23 } },
];

const imgPath = (src: string) => `/media/app/guide/${src}.webp`;

export async function AppGuideLine({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'appPage.guide' });

  const schema = generateHowToSchema(
    t('metaName'),
    t('intro'),
    GUIDE_STEPS.map(({ key, src }) => ({
      name: t(`steps.${key}.title`),
      text: `${t(`steps.${key}.text`)} ${t(`steps.${key}.do`)}`,
      image: `${BUSINESS_INFO.url}${imgPath(src)}`,
    })),
    locale,
  );

  return (
    <Band tone="paper-2" id="mode-emploi">
      <Shell>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <SectionHead label={t('eyebrow')} title={t('title')} lede={t('intro')} />

        <AppGuideFlow>
          {GUIDE_STEPS.map((step, i) => {
            const title = t(`steps.${step.key}.title`);
            return (
              <li key={step.key} id={`app-${step.key}`} className="app-guide-step">
                <span className="flow-node" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                <div className="app-guide-copy">
                  <h3>{title}</h3>
                  <p>{t(`steps.${step.key}.text`)}</p>
                  <p className="app-guide-do">
                    <ArrowRight size={16} aria-hidden />
                    <span>
                      <span className="sr-only">{t('doLabel')} </span>
                      {t(`steps.${step.key}.do`)}
                    </span>
                  </p>
                </div>
                <div
                  className={step.paper ? 'app-guide-paper' : 'app-guide-phone'}
                  data-hint-x={step.hint?.x}
                  data-hint-y={step.hint?.y}
                >
                  <Image
                    src={imgPath(step.src)}
                    alt={title}
                    width={640}
                    height={step.h ?? 1385}
                    sizes="(max-width: 47.5rem) 60vw, 16rem"
                  />
                  {step.hint && <span className="app-guide-tap" aria-hidden />}
                </div>
              </li>
            );
          })}
        </AppGuideFlow>
      </Shell>
    </Band>
  );
}

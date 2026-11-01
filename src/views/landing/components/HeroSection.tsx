import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowUpRight, Plane, Ship, Search, MessageCircle } from 'lucide-react';
import { Band, Shell, Cta, CarrierBar, PHOTOS } from '@/components/site';
import { HERO_WHATSAPP_URL, SECTION_IDS } from '../constants';

export async function HeroSection() {
  const t = await getTranslations('websiteRefresh');
  const common = await getTranslations();
  const locale = await getLocale();
  const services = [
    { key: 'air', text: 'airText', href: 'air-freight', Icon: Plane },
    { key: 'sea', text: 'seaText', href: 'sea-freight', Icon: Ship },
    { key: 'sourcing', text: 'sourcingText', href: 'sourcing', Icon: Search },
  ] as const;
  return <>
    <Band id={SECTION_IDS.HERO} tone="paper" flush className="cargo-hero" style={{ paddingBlock: 'var(--cargo-hero-top, 112px) var(--cargo-hero-bottom, 40px)' }}>
      <Shell><div className="cargo-hero-grid">
        <div className="cargo-hero-copy">
          <p className="cargo-corridor">{common('hero.badge')}</p>
          <h1>{t('headline')}</h1>
          <p className="cargo-intro">{t('intro')}</p>
          <div className="cargo-actions">
            <Cta href={HERO_WHATSAPP_URL} external size="lg" icon={<MessageCircle size={18} aria-hidden />}>{t('quote')}</Cta>
            <Cta href="#app" variant="outline" size="lg">{t('app')}</Cta>
          </div>
        </div>
        <figure className="cargo-hero-photo">
          <div className="cargo-photo-frame"><Image src={PHOTOS.warehouseWide} alt={t('photo')} fill priority sizes="(max-width: 767px) 100vw, 50vw" style={{ objectFit:'cover', objectPosition:'50% 35%' }} /></div>
          <figcaption>{t('photo')}<span>ChinaLink Express</span></figcaption>
        </figure>
      </div></Shell>
    </Band>
    <div className="cargo-service-band"><Shell>
      <nav className="cargo-services" aria-label={common('navigation.services')}>
        {services.map(({key,text,href,Icon}) => <Link key={key} href={`/${locale}/services/${href}`} className="cargo-service">
          <Icon size={25} aria-hidden /><span><strong>{t(key)}</strong><span>{t(text)}</span></span><ArrowUpRight size={19} aria-hidden />
        </Link>)}
      </nav>
    </Shell></div>
    <Shell><div className="cargo-carriers"><CarrierBar tone="paper" label={common('landing.carriersLabel')} /></div></Shell>
  </>;
}
export default HeroSection;

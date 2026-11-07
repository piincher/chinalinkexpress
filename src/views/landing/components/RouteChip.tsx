'use client';

/**
 * The page as a journey: reading it fills the China to Mali route, up to the
 * 12,000 km the About section names. Hidden over the hero, the footer and on
 * phones, where it would cover text. One passive listener, throttled to a frame.
 */

import React, { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';

const ROUTE_KM = 12000;

export function RouteChip() {
  const french = useLocale() === 'fr';
  const chip = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const km = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      if (km.current) km.current.textContent = `${Math.round(progress * ROUTE_KM).toLocaleString('fr-FR')} km`;
      if (chip.current) chip.current.dataset.on = String(window.scrollY > window.innerHeight * 0.6 && progress < 0.975);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={chip} className="route-chip" dir="ltr" aria-hidden>
      <span>{french ? 'CHINE' : 'CHINA'}</span>
      <span className="route-chip-track">
        <i ref={bar} />
      </span>
      <span>MALI</span>
      <em ref={km}>0 km</em>
    </div>
  );
}

export default RouteChip;

'use client';

/**
 * PhotoProof — a verified photo with its stamp and a magnifying loupe.
 *
 * The /verifier reader is comparing small print: the banner's code, date and
 * stage against the photo they were sent. The loupe (2.5×) makes that print
 * legible; the stamp lands once, in a corner, clear of the banner.
 *
 * Loupe input: a mouse or pen hovers. Touch needs the toggle first, because a
 * finger on the photo must otherwise scroll the page. The lens is a second
 * <img> of the same signed URL (same no-referrer policy as the original — a CSS
 * background would send the referrer), moved by one transform per frame.
 */

import React, { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { useMomentInView, momentClass } from './useMomentInView';

const ZOOM = 2.5;
const LENS = 130;

interface PhotoProofProps {
  src: string;
  alt: string;
  stamp: string;
  stampDetail: string;
}

export function PhotoProof({ src, alt, stamp, stampDetail }: PhotoProofProps) {
  const t = useTranslations('moments.proof');
  const [ref, state] = useMomentInView<HTMLDivElement>(0.2);
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLImageElement>(null);
  const [lensOn, setLensOn] = useState(false);
  const [touchMode, setTouchMode] = useState(false);
  const frame = useRef(0);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' && !touchMode) return;
    const box = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (!lensRef.current || !zoomRef.current) return;
      lensRef.current.style.transform = `translate(${x}px, ${y}px)`;
      zoomRef.current.style.width = `${box.width}px`;
      zoomRef.current.style.transform = `translate(${LENS / 2 - x * ZOOM}px, ${LENS / 2 - y * ZOOM}px) scale(${ZOOM})`;
    });
    setLensOn(x >= 0 && y >= 0 && x <= box.width && y <= box.height);
  };

  return (
    <div
      ref={ref}
      className={`${momentClass('mo-proof', state)} mo-loupe-wrap${touchMode ? ' is-on' : ''}`}
      onPointerMove={move}
      onPointerDown={move}
      onPointerLeave={() => setLensOn(false)}
    >
      {/* A signed storage URL that expires in minutes: a plain img, not next/image. */}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 'var(--radius-panel)', border: '1px solid var(--color-rule)' }}
      />
      <div className="mo-stamp" aria-hidden>
        {stamp}
        <small>{stampDetail}</small>
      </div>
      <div ref={lensRef} className="mo-loupe" aria-hidden hidden={!lensOn}>
        <img ref={zoomRef} src={src} alt="" referrerPolicy="no-referrer" />
      </div>
      <button
        type="button"
        className="mo-loupe-toggle"
        aria-pressed={touchMode}
        onClick={() => {
          setTouchMode((v) => !v);
          setLensOn(false);
        }}
      >
        <Search size={14} aria-hidden />
        {touchMode ? t('loupeOff') : t('loupeOn')}
      </button>
    </div>
  );
}

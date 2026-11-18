/**
 * Bilan de l'année (/bilan?c=<clientId>&y=<year>&s=<signature>)
 *
 * The link in each client's year-end WhatsApp message. With the app installed
 * the same URL opens the bilan screen (universal link); this page is for a
 * client WITHOUT the app: it shows their image and asks them to install it.
 *
 * The URL carries only an account id and an HMAC tag, never a name or phone.
 * The image itself is served (and the signature checked) by the API, which
 * 404s on anything wrong, so a tampered link shows the fallback, not an error.
 */

import { Metadata } from 'next';
import { AppStoreButtons } from '@/components/shared/AppStoreButtons';

export const dynamic = 'force-dynamic';

const WEB_BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.chinalinkexpress.com';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.chinalinkexpress.com';

type Search = Promise<{ c?: string; y?: string; s?: string }>;

/** Only well-formed ids reach the API URL: 24-hex account id, 4-digit year, 12-hex tag. */
const parse = async (searchParams: Search) => {
  const { c = '', y = '', s = '' } = await searchParams;
  if (!/^[a-f0-9]{24}$/i.test(c) || !/^\d{4}$/.test(y) || !/^[a-f0-9]{12}$/i.test(s)) return null;
  return {
    year: y,
    imageUrl: `${API_BASE_URL}/api/v2/public/year-review/${c}/${y}.png?s=${s}`,
    pageUrl: `${WEB_BASE_URL}/bilan?c=${c}&y=${y}&s=${s}`,
  };
};

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const link = await parse(searchParams);
  const title = link ? `Mon bilan ${link.year} avec ChinaLink Express` : 'Bilan de l’année · ChinaLink Express';
  const description = 'Vos colis importés de Chine cette année, en une image.';
  return {
    title,
    description,
    metadataBase: new URL(WEB_BASE_URL),
    openGraph: link
      ? { title, description, url: link.pageUrl, siteName: 'ChinaLink Express', images: [{ url: link.imageUrl, width: 1080, height: 1920 }] }
      : { title, description },
    // Personal link: never indexed.
    robots: { index: false, follow: false },
    other: link ? { 'apple-itunes-app': `app-id=6503253700, app-argument=${link.pageUrl}` } : {},
  };
}

export default async function BilanPage({ searchParams }: { searchParams: Search }) {
  const link = await parse(searchParams);

  return (
    <main className="min-h-screen bg-[#052E16] text-white px-5 py-10 flex justify-center">
      <div className="w-full max-w-md flex flex-col gap-7">
        <header className="text-center">
          <p className="text-sm uppercase tracking-widest text-[#F4D03F] font-semibold">
            {link ? `Bilan ${link.year}` : 'Bilan de l’année'}
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-snug">Votre année avec ChinaLink Express</h1>
        </header>

        {link ? (
          <section className="flex flex-col items-center gap-3">
            {/* A plain <img>: the API renders and signs it; Next's optimizer would re-host a personal image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={link.imageUrl}
              alt={`Mon bilan ${link.year}`}
              width={1080}
              height={1920}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <a
              href={link.imageUrl}
              download={`bilan-${link.year}.png`}
              className="w-full rounded-xl bg-emerald-500 px-5 py-4 text-center text-base font-bold text-[#06210f] hover:bg-emerald-400 transition-colors"
            >
              Télécharger l’image
            </a>
            <p className="text-center text-xs text-emerald-100/70">
              Appuyez longuement sur l’image pour l’enregistrer et la partager sur votre statut.
            </p>
          </section>
        ) : (
          <p className="text-center text-sm text-emerald-100/80">
            Ce lien n’est pas complet. Ouvrez l’application ChinaLink Express pour voir votre bilan.
          </p>
        )}

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-bold text-white">Tout votre bilan dans l’application</h2>
          <p className="mt-1 mb-4 text-xs text-slate-300 leading-relaxed">
            Mois par mois, votre plus gros envoi, vos trajets les plus rapides, et le suivi de vos colis en temps réel.
          </p>
          <AppStoreButtons />
        </section>
      </div>
    </main>
  );
}

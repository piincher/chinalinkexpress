/**
 * Referral Invitation Page (/r/:code)
 *
 * The destination of a client's shared invitation link.
 *
 * Its visitor is, by definition, someone who does NOT have the app — so unlike
 * /s/:token this page cannot assume an install, and it is deliberately not a
 * signup form: ChinaLink accounts are opened by staff, there is no self-signup.
 * The page's only job is to carry the referral code intact from the sharer to
 * the moment an account is created, which is why the WhatsApp CTA pre-fills a
 * message containing the code rather than asking the visitor to remember it.
 *
 * It is rendered server-side for the OG preview: these links are pasted into
 * WhatsApp, where the unfurled card is most of the persuasion.
 */

import { Metadata } from 'next';
import { AppStoreButtons } from '@/components/shared/AppStoreButtons';
import { BUSINESS_INFO } from '@/config/seo-advanced';

export const dynamic = 'force-dynamic';

const WEB_BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.chinalinkexpress.com';
const OG_IMAGE_URL =
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse%20view.jpg';

/** Codes are short and staff-typed; anything else is not worth rendering. */
const normalizeCode = (raw: string) => raw.trim().toUpperCase().slice(0, 32);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code: rawCode } = await params;
  const code = normalizeCode(decodeURIComponent(rawCode));

  const title = 'Vous êtes invité sur ChinaLink Express';
  const description = `Utilisez le code de parrainage ${code} à l'ouverture de votre compte — expédition Chine → Mali, suivi en temps réel.`;
  const url = `${WEB_BASE_URL}/r/${encodeURIComponent(code)}`;

  return {
    title,
    description,
    metadataBase: new URL(WEB_BASE_URL),
    openGraph: {
      title,
      description,
      url,
      siteName: 'ChinaLink Express',
      type: 'website',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE_URL],
    },
    // An invitation link is personal, not a page to be indexed.
    robots: { index: false, follow: false },
    other: {
      'apple-itunes-app': `app-id=6503253700, app-argument=${url}`,
    },
  };
}

export default async function ReferralInvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: rawCode } = await params;
  const code = normalizeCode(decodeURIComponent(rawCode));

  const whatsappNumber = BUSINESS_INFO.contact.whatsapp.mali.replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(
    `Bonjour ChinaLink Express, je souhaite ouvrir un compte. Mon code de parrainage est ${code}.`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white px-5 py-10 flex justify-center">
      <div className="w-full max-w-md flex flex-col gap-7">
        <header className="text-center">
          <p className="text-sm uppercase tracking-widest text-emerald-400 font-semibold">
            Invitation
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-snug">
            Vous êtes invité sur ChinaLink Express
          </h1>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Expédition Chine → Mali par air et par mer, avec le suivi de vos colis en temps réel.
          </p>
        </header>

        {/* The code is the payload of this page — it gets the most weight. */}
        <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-emerald-300">Code de parrainage</p>
          <p className="mt-2 text-3xl font-black tracking-[0.2em] text-emerald-300 break-all">
            {code}
          </p>
          <p className="mt-3 text-xs text-slate-300 leading-relaxed">
            Communiquez ce code à l’équipe lors de la création de votre compte pour que votre
            parrain soit crédité.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <a
            href={whatsappUrl}
            className="rounded-xl bg-emerald-500 px-5 py-4 text-center text-base font-bold text-[#06210f] hover:bg-emerald-400 transition-colors"
          >
            Ouvrir mon compte sur WhatsApp
          </a>
          <p className="text-center text-xs text-slate-400">
            Le message est pré-rempli avec votre code — rien à recopier.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-bold text-white">Installer l’application</h2>
          <p className="mt-1 mb-4 text-xs text-slate-300 leading-relaxed">
            Suivez vos colis, vos paiements et vos livraisons depuis votre téléphone.
          </p>
          <AppStoreButtons />
        </section>

        <footer className="text-center text-[11px] text-slate-500 leading-relaxed">
          Ceci est un message automatique du système.
        </footer>
      </div>
    </main>
  );
}

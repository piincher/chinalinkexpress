/**
 * Transfert entre entrepôts (/warehouse-transfers/<id>)
 *
 * The link in each transfer WhatsApp update. With the app installed the same
 * URL opens the transfer screen (universal / app link); this page is for a
 * client WITHOUT the app, or on a build that predates transfers. It shows no
 * transfer data: the id alone must never reveal anything on the web.
 */

import { Metadata } from 'next';
import { AppStoreButtons } from '@/components/shared/AppStoreButtons';

const WEB_BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.chinalinkexpress.com';

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const valid = /^[a-f0-9]{24}$/i.test(id);
  return {
    title: 'Votre transfert · ChinaLink Express',
    description: 'Suivez le transfert de vos colis entre nos entrepôts dans l’application.',
    metadataBase: new URL(WEB_BASE_URL),
    // Personal link: never indexed.
    robots: { index: false, follow: false },
    other: valid ? { 'apple-itunes-app': `app-id=6503253700, app-argument=${WEB_BASE_URL}/warehouse-transfers/${id}` } : {},
  };
}

export default function WarehouseTransferPage() {
  return (
    <main className="min-h-screen bg-[#052E16] text-white px-5 py-10 flex justify-center">
      <div className="w-full max-w-md flex flex-col gap-7">
        <header className="text-center">
          <p className="text-sm uppercase tracking-widest text-[#F4D03F] font-semibold">Transfert entre entrepôts</p>
          <h1 className="mt-2 text-2xl font-bold leading-snug">Suivez votre transfert dans l’application</h1>
          <p className="mt-3 text-sm text-emerald-100/80 leading-relaxed">
            Le statut, les photos et les frais de votre transfert sont visibles dans l’application ChinaLink Express.
          </p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-bold text-white">Vous avez déjà l’application ?</h2>
          <p className="mt-1 mb-4 text-xs text-slate-300 leading-relaxed">
            Mettez-la à jour depuis le Play Store ou l’App Store, puis touchez à nouveau le lien dans WhatsApp.
          </p>
          <AppStoreButtons />
        </section>
      </div>
    </main>
  );
}

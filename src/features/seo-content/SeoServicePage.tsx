import Link from 'next/link';

interface SeoLink {
  href: string;
  label: string;
}

interface SeoSection {
  title: string;
  body: string;
  items?: string[];
}

interface SeoTable {
  headers: string[];
  rows: string[][];
}

interface SeoFaq {
  question: string;
  answer: string;
}

interface SeoServicePageProps {
  badge: string;
  title: string;
  intro: string;
  highlights: string[];
  sections: SeoSection[];
  process: string[];
  table?: SeoTable;
  faqs: SeoFaq[];
  links: SeoLink[];
  ctaLabel?: string;
}

const whatsappHref =
  'https://wa.me/8618851725957?text=Bonjour%20ChinaLink%2C%20je%20veux%20un%20devis%20pour%20importer%20de%20Chine%20au%20Mali.';

export function SeoServicePage({
  badge,
  title,
  intro,
  highlights,
  sections,
  process,
  table,
  faqs,
  links,
  ctaLabel = 'Demander un devis sur WhatsApp',
}: SeoServicePageProps) {
  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="bg-slate-950 pt-28 pb-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex rounded-full bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 ring-1 ring-blue-300/20">
            {badge}
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
            {intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-lg bg-green-500 px-6 py-3 font-bold text-white transition hover:bg-green-400"
            >
              {ctaLabel}
            </a>
            <Link
              href="/fr/routes/china-to-mali"
              className="inline-flex justify-center rounded-lg border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Voir le fret Chine-Mali
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-10 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {highlights.map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <p className="font-semibold text-slate-900 dark:text-white">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold md:text-3xl">{section.title}</h2>
                <p className="mt-4 leading-8 text-slate-700 dark:text-slate-300">{section.body}</p>
                {section.items && (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <li key={item} className="rounded-lg border border-slate-200 p-4 text-slate-700 dark:border-slate-800 dark:text-slate-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {table && (
              <section>
                <h2 className="text-2xl font-bold md:text-3xl">Comparaison rapide</h2>
                <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-900">
                      <tr>
                        {table.headers.map((header) => (
                          <th key={header} className="px-4 py-3 font-semibold">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row) => (
                        <tr key={row.join('-')} className="border-t border-slate-200 dark:border-slate-800">
                          {row.map((cell) => (
                            <td key={cell} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold md:text-3xl">Notre processus</h2>
              <ol className="mt-5 grid gap-4">
                {process.map((step, index) => (
                  <li key={step} className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
                    <span className="text-sm font-bold text-blue-600">Etape {index + 1}</span>
                    <p className="mt-2 text-slate-700 dark:text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold md:text-3xl">Questions fréquentes</h2>
              <div className="mt-5 space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
                    <h3 className="font-bold">{faq.question}</h3>
                    <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <aside className="h-fit rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold">Liens utiles</h2>
            <div className="mt-4 grid gap-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 dark:bg-slate-950 dark:text-blue-300 dark:hover:bg-slate-800">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-blue-600 p-5 text-white">
              <p className="font-bold">Besoin d'un avis avant de payer ?</p>
              <p className="mt-2 text-sm text-blue-50">
                Envoyez le lien du fournisseur, les quantités et la destination. Notre équipe vous répond sur WhatsApp.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-700"
              >
                Contacter ChinaLink
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

import Link from 'next/link';
import { PageHero, Cta, PHOTOS } from '@/components/site';

interface SeoLink {
  href: string;
  label: string;
}

interface SeoSection {
  title: string;
  body: string;
  items?: readonly string[];
}

interface SeoTable {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}

interface SeoFaq {
  question: string;
  answer: string;
}

interface SeoServicePageProps {
  locale?: 'fr' | 'en';
  badge: string;
  title: string;
  intro: string;
  highlights: readonly string[];
  sections: readonly SeoSection[];
  process: readonly string[];
  table?: SeoTable;
  faqs: readonly SeoFaq[];
  links: readonly SeoLink[];
  ctaLabel?: string;
  routeCtaLabel?: string;
  routeCtaHref?: string;
  comparisonTitle?: string;
  processTitle?: string;
  faqTitle?: string;
  usefulLinksTitle?: string;
  asideTitle?: string;
  asideText?: string;
  asideCtaLabel?: string;
  stepLabel?: string;
}

const whatsappHref =
  'https://wa.me/8618851725957?text=Bonjour%20ChinaLink%2C%20je%20veux%20un%20devis%20pour%20importer%20de%20Chine%20au%20Mali.';

export function SeoServicePage({
  locale = 'fr',
  badge,
  title,
  intro,
  highlights,
  sections,
  process,
  table,
  faqs,
  links,
  ctaLabel,
  routeCtaLabel,
  routeCtaHref,
  comparisonTitle,
  processTitle,
  faqTitle,
  usefulLinksTitle,
  asideTitle,
  asideText,
  asideCtaLabel,
  stepLabel,
}: SeoServicePageProps) {
  const isEn = locale === 'en';
  const labels = {
    ctaLabel: ctaLabel ?? (isEn ? 'Request a quote on WhatsApp' : 'Demander un devis sur WhatsApp'),
    routeCtaLabel: routeCtaLabel ?? (isEn ? 'See China to Africa routes' : 'Voir le fret Chine-Mali'),
    routeCtaHref: routeCtaHref ?? (isEn ? '/en/routes/china-to-africa' : '/fr/routes/china-to-mali'),
    comparisonTitle: comparisonTitle ?? (isEn ? 'Quick comparison' : 'Comparaison rapide'),
    processTitle: processTitle ?? (isEn ? 'Our process' : 'Notre processus'),
    faqTitle: faqTitle ?? (isEn ? 'Frequently asked questions' : 'Questions fréquentes'),
    usefulLinksTitle: usefulLinksTitle ?? (isEn ? 'Useful links' : 'Liens utiles'),
    asideTitle: asideTitle ?? (isEn ? 'Need advice before paying?' : "Besoin d'un avis avant de payer ?"),
    asideText:
      asideText ??
      (isEn
        ? 'Send the supplier link, quantities and destination. Our team will reply on WhatsApp.'
        : 'Envoyez le lien du fournisseur, les quantités et la destination. Notre équipe vous répond sur WhatsApp.'),
    asideCtaLabel: asideCtaLabel ?? (isEn ? 'Contact ChinaLink' : 'Contacter ChinaLink'),
    stepLabel: stepLabel ?? (isEn ? 'Step' : 'Etape'),
  };

  return (
    /* The page surface was hard-coded `bg-white … dark:bg-slate-950` rather
       than following --color-paper, and the WhatsApp button was the only green
       object on an otherwise single-accent site. */
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <PageHero
        eyebrow={badge}
        title={title}
        lede={intro}
        photo={{
          src: PHOTOS.warehouseAisle,
          alt: 'Entrepôt de consolidation ChinaLink Express en Chine',
        }}
        actions={
          <>
            <Cta href={whatsappHref} external variant="solid" tone="void" size="lg" magnetic>
              {labels.ctaLabel}
            </Cta>
            <Cta href={labels.routeCtaHref} variant="outline" tone="void" size="lg">
              {labels.routeCtaLabel}
            </Cta>
          </>
        }
      />

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
                <h2 className="text-2xl font-bold md:text-3xl">{labels.comparisonTitle}</h2>
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
              <h2 className="text-2xl font-bold md:text-3xl">{labels.processTitle}</h2>
              <ol className="mt-5 grid gap-4">
                {process.map((step, index) => (
                  <li key={step} className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
                    <span className="text-sm font-bold text-blue-600">{labels.stepLabel} {index + 1}</span>
                    <p className="mt-2 text-slate-700 dark:text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold md:text-3xl">{labels.faqTitle}</h2>
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
            <h2 className="text-lg font-bold">{labels.usefulLinksTitle}</h2>
            <div className="mt-4 grid gap-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 dark:bg-slate-950 dark:text-blue-300 dark:hover:bg-slate-800">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-blue-600 p-5 text-white">
              <p className="font-bold">{labels.asideTitle}</p>
              <p className="mt-2 text-sm text-blue-50">
                {labels.asideText}
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-700"
              >
                {labels.asideCtaLabel}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

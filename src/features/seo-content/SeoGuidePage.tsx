import Link from 'next/link';

interface GuideSection {
  title: string;
  body: string;
  items?: string[];
}

interface GuideFaq {
  question: string;
  answer: string;
}

interface GuideLink {
  href: string;
  label: string;
}

interface SeoGuidePageProps {
  title: string;
  description: string;
  updatedAt: string;
  readTime: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  links: GuideLink[];
}

const whatsappHref =
  'https://wa.me/8618851725957?text=Bonjour%20ChinaLink%2C%20j%27ai%20lu%20votre%20guide%20et%20je%20veux%20importer%20de%20Chine%20au%20Mali.';

export function SeoGuidePage({
  title,
  description,
  updatedAt,
  readTime,
  sections,
  faqs,
  links,
}: SeoGuidePageProps) {
  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <article>
        <header className="bg-slate-950 pt-28 pb-16 text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-200">
              Guide import Chine-Mali
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">{title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-200 md:text-xl">{description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span>Mis à jour : {updatedAt}</span>
              <span>{readTime}</span>
              <span>Relu par l'équipe opérations Chine/Bamako</span>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_300px] lg:px-8">
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold md:text-3xl">{section.title}</h2>
                <p className="mt-4 leading-8 text-slate-700 dark:text-slate-300">{section.body}</p>
                {section.items && (
                  <ul className="mt-5 grid gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="rounded-lg border border-slate-200 p-4 leading-7 text-slate-700 dark:border-slate-800 dark:text-slate-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section>
              <h2 className="text-2xl font-bold md:text-3xl">FAQ</h2>
              <div className="mt-5 space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
                    <h3 className="font-bold">{faq.question}</h3>
                    <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold">Continuer</h2>
            <div className="mt-4 grid gap-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 dark:bg-slate-950 dark:text-blue-300 dark:hover:bg-slate-800">
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full justify-center rounded-lg bg-green-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-400"
            >
              Parler à un conseiller
            </a>
          </aside>
        </div>
      </article>
    </main>
  );
}

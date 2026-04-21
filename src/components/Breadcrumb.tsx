import Link from 'next/link';
import { StructuredData } from '@/components/seo';
import type { Locale } from '@/i18n/config';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale?: Locale;
}

export function Breadcrumb({ items, locale = 'fr' }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href || '',
  }));

  return (
    <>
      <StructuredData type="breadcrumb" breadcrumbs={schemaItems} locale={locale} />
      <nav aria-label="Breadcrumb" className="w-full">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                    &gt;
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    className="font-medium text-slate-700 dark:text-slate-200"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

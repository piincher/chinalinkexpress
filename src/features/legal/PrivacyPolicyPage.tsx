/**
 * Privacy Policy Page
 * 
 * Comprehensive privacy policy page.
 * Part of the legal feature.
 */

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  Shield, 
  Database, 
  Lock, 
  Users, 
  Cookie, 
  Mail,
  ChevronRight
} from 'lucide-react';

const SECTIONS = [
  {
    id: 'introduction',
    icon: Shield,
    titleKey: 'privacy.sections.introduction.title',
    contentKey: 'privacy.sections.introduction.content',
  },
  {
    id: 'data-collection',
    icon: Database,
    titleKey: 'privacy.sections.dataCollection.title',
    contentKey: 'privacy.sections.dataCollection.content',
    itemsKey: 'privacy.sections.dataCollection.items',
  },
  {
    id: 'data-usage',
    icon: Users,
    titleKey: 'privacy.sections.dataUsage.title',
    contentKey: 'privacy.sections.dataUsage.content',
    itemsKey: 'privacy.sections.dataUsage.items',
  },
  {
    id: 'data-protection',
    icon: Lock,
    titleKey: 'privacy.sections.dataProtection.title',
    contentKey: 'privacy.sections.dataProtection.content',
  },
  {
    id: 'cookies',
    icon: Cookie,
    titleKey: 'privacy.sections.cookies.title',
    contentKey: 'privacy.sections.cookies.content',
  },
  {
    id: 'contact',
    icon: Mail,
    titleKey: 'privacy.sections.contact.title',
    contentKey: 'privacy.sections.contact.content',
  },
];

export function PrivacyPolicyPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                {t('privacy.badge')}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('privacy.subtitle')}
            </p>
            <p className="text-sm text-blue-200 mt-4">
              {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {SECTIONS.map((section, index) => {
            const Icon = section.icon;
            const items = section.itemsKey ? t.raw(section.itemsKey) as string[] : null;
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'p-6 md:p-8',
                  index !== SECTIONS.length - 1 && 'border-b border-gray-200 dark:border-gray-700'
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {t(section.titleKey)}
                    </h2>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t(section.contentKey)}
                      </p>
                      
                      {items && Array.isArray(items) && (
                        <ul className="mt-4 space-y-2">
                          {items.map((item, i) => (
                            <li 
                              key={i}
                              className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                            >
                              <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('privacy.questions')}
          </p>
          <a
            href="mailto:contact@chinalinkexpress.com"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            <Mail className="w-5 h-5" />
            contact@chinalinkexpress.com
          </a>
        </motion.div>
      </section>
    </main>
  );
}

// Helper function for class merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

'use client';

/**
 * Contact — and the fix for the most expensive bug on this page.
 *
 * The form here did not work. Its submit handler was:
 *
 *     await new Promise((resolve) => setTimeout(resolve, 1000));
 *     setIsSubmitted(true);
 *
 * A one-second wait, then a green tick and "Message envoyé ! Nous vous
 * répondrons dans les plus brefs délais." Nothing was posted anywhere. Every
 * prospect who filled it in — the ones who wanted to talk badly enough to type
 * their details rather than open WhatsApp — was told they had been heard, and
 * then waited for a reply that could never come. That is worse than having no
 * form: a missing form sends people to WhatsApp, a fake one sends them away
 * believing the company ignored them.
 *
 * Wiring it to the API would not have fixed it either. `POST /api/v2/public/contact`
 * validates its input and returns success with a `// TODO: Store in database or
 * send notification` where the delivery should be — so the lead would have
 * reached the server and stopped there. Changing that is a backend change, and
 * out of scope here.
 *
 * So the form now does what this business actually runs on. WhatsApp is the
 * channel in every other part of this codebase — the notification dispatcher,
 * the campaign engine, the share links, the receipts. The three fields compose
 * a message and hand it to WhatsApp with the text already written; the visitor
 * reads it over and presses send, and the conversation lands on the same line
 * the hero button uses. Nothing is claimed that does not happen.
 *
 * `mailto:` is offered underneath for people who would rather write an email.
 * It also degrades honestly: if WhatsApp is not installed, wa.me opens in a
 * browser rather than failing silently.
 *
 * The layout, the contact details and the opening hours are unchanged.
 */

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { CONTACT_CONFIG } from '@/config/app';
import { Band, Shell, Cta } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { whatsappUrl, WHATSAPP_SALES } from '@/constants/contact';
import { SECTION_IDS } from '../constants';

function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  isTextarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  isTextarea?: boolean;
}) {
  const inputClasses =
    'w-full px-4 py-3 rounded-md text-base transition-colors focus:outline-none focus:ring-2';

  const style = {
    backgroundColor: 'var(--color-paper-2)',
    color: 'var(--color-ink)',
    border: '1.5px solid var(--color-rule)',
    borderRadius: 'var(--radius-input)',
  };

  const focusStyle = {
    outline: 'none',
    boxShadow: '0 0 0 2px var(--color-focus)',
  };

  const id = `contact-${name}`;

  return (
    <div className="space-y-2">
      {/* `htmlFor`/`id` rather than a floating label: the previous version had
          neither, so clicking a label did nothing and a screen reader announced
          the inputs unlabelled. */}
      <label htmlFor={id} className="block text-sm font-medium" style={{ color: 'var(--color-ink-2)' }}>
        {label}
        {required && (
          <span style={{ color: 'var(--color-accent)' }} className="ml-1" aria-hidden>
            *
          </span>
        )}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          style={style}
          placeholder={placeholder}
          required={required}
          rows={4}
          onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
          onBlur={(e) => Object.assign(e.currentTarget.style, style)}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          style={style}
          placeholder={placeholder}
          required={required}
          onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
          onBlur={(e) => Object.assign(e.currentTarget.style, style)}
        />
      )}
    </div>
  );
}

function ContactInfoItem({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="rounded-lg p-2.5 flex-shrink-0"
        style={{ backgroundColor: 'var(--color-paper-2)' }}
      >
        <Icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-ink)' }}>
          {title}
        </h3>
        <div style={{ color: 'var(--color-ink-2)' }}>{children}</div>
      </div>
    </div>
  );
}

export function ContactSection() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({ name: '', phone: '', goods: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * The message the visitor will see in WhatsApp before they send it.
   *
   * Written in the first person and without marketing voice, because it is
   * going to appear as though they typed it. Empty fields are dropped rather
   * than rendered as "Téléphone : " with nothing after the colon.
   */
  const composeMessage = () => {
    const lines = [
      'Bonjour ChinaLink Express,',
      '',
      formData.goods.trim()
        ? `J'aimerais expédier depuis la Chine : ${formData.goods.trim()}`
        : "J'aimerais avoir des informations pour une expédition depuis la Chine.",
    ];
    if (formData.name.trim()) lines.push(`Nom : ${formData.name.trim()}`);
    if (formData.phone.trim()) lines.push(`Téléphone : ${formData.phone.trim()}`);
    return lines.join('\n');
  };

  const message = composeMessage();
  const waHref = whatsappUrl(WHATSAPP_SALES, message);
  const mailHref = `mailto:${CONTACT_CONFIG.EMAIL}?subject=${encodeURIComponent(
    'Demande d’expédition depuis la Chine'
  )}&body=${encodeURIComponent(message)}`;

  return (
    <Band id={SECTION_IDS.CONTACT} tone="paper" ruled>
      <Shell>
        <SectionHead title={t('title')} lede={t('subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ── compose ──────────────────────────────────────────────────── */}
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: 'var(--color-paper)',
              border: '1px solid var(--color-rule)',
            }}
          >
            <h3
              className="text-xl font-semibold mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              {t('form.title')}
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: 'var(--color-ink-2)', lineHeight: 'var(--leading-body)' }}
            >
              {t('form.intro')}
            </p>

            {/*
              Not a <form>. There is nothing to submit — the action is following
              a link — and a form element here would invite a stray Enter key to
              reload the page and clear the fields.
            */}
            <div className="space-y-5">
              <FormInput
                label={t('form.goodsLabel')}
                name="goods"
                value={formData.goods}
                onChange={handleChange}
                placeholder={t('form.goodsPlaceholder')}
                isTextarea
              />
              <FormInput
                label={t('form.name')}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('form.namePlaceholder')}
              />
              <FormInput
                label={t('form.phone')}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('form.phonePlaceholder')}
              />

              <Cta
                href={waHref}
                external
                variant="solid"
                size="lg"
                arrow={false}
                data-cta="contact-whatsapp"
                icon={<MessageCircle size={18} aria-hidden />}
                style={{ width: '100%' }}
              >
                {t('form.openWhatsApp')}
              </Cta>

              <p className="text-sm" style={{ color: 'var(--color-neutral)', margin: 0 }}>
                {t('form.emailInstead')}{' '}
                <a
                  href={mailHref}
                  style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}
                >
                  {CONTACT_CONFIG.EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* ── reach us ─────────────────────────────────────────────────── */}
          <div className="space-y-8">
            <ContactInfoItem icon={MapPin} title={t('info.address')}>
              <p className="text-sm">
                {CONTACT_CONFIG.ADDRESS.STREET}
                <br />
                {CONTACT_CONFIG.ADDRESS.CITY}, {CONTACT_CONFIG.ADDRESS.COUNTRY}
              </p>
            </ContactInfoItem>

            <ContactInfoItem icon={Phone} title={t('info.phone')}>
              {/* Tappable. These were plain text, which on the phone that most
                  of this site's traffic arrives on meant copying a number by
                  hand. */}
              <div className="text-sm space-y-1">
                {[
                  CONTACT_CONFIG.PHONE.CHINA,
                  CONTACT_CONFIG.PHONE.MALI_1,
                  CONTACT_CONFIG.PHONE.MALI_2,
                ].map((number) => (
                  <p key={number}>
                    <a href={`tel:${number.replace(/[^\d+]/g, '')}`} style={{ color: 'inherit' }}>
                      {number}
                    </a>
                  </p>
                ))}
              </div>
            </ContactInfoItem>

            <ContactInfoItem icon={Mail} title={t('info.email')}>
              <p className="text-sm">
                <a href={`mailto:${CONTACT_CONFIG.EMAIL}`} style={{ color: 'inherit' }}>
                  {CONTACT_CONFIG.EMAIL}
                </a>
              </p>
            </ContactInfoItem>

            <ContactInfoItem icon={MessageCircle} title={t('info.whatsapp')}>
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  { label: 'Chine', number: CONTACT_CONFIG.WHATSAPP.CHINA },
                  { label: 'Mali', number: CONTACT_CONFIG.WHATSAPP.MALI },
                ].map((line) => (
                  <a
                    key={line.label}
                    // Through `whatsappUrl` rather than string-concatenated:
                    // CONTACT_CONFIG stores these with a leading '+', and
                    // wa.me expects digits only.
                    href={whatsappUrl(line.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: 'var(--color-paper)',
                      color: 'var(--color-ink)',
                      border: '1.5px solid var(--color-rule)',
                    }}
                  >
                    {line.label}
                  </a>
                ))}
              </div>
              <p className="text-sm mt-2" style={{ color: 'var(--color-neutral)' }}>
                {t('info.responseNote')}
              </p>
            </ContactInfoItem>

            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-rule)',
              }}
            >
              <h3
                className="font-semibold mb-4 flex items-center gap-2"
                style={{ color: 'var(--color-ink)' }}
              >
                <Clock className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                {t('info.hours')}
              </h3>
              {/* Read from the locale files rather than hard-coded here, so the
                  three non-French homepages stop rendering "Lundi - Vendredi"
                  in the middle of their own copy. */}
              <div className="space-y-2 text-sm" style={{ color: 'var(--color-ink-2)' }}>
                <p style={{ margin: 0 }}>{t('info.hoursWeekday')}</p>
                <p style={{ margin: 0 }}>{t('info.hoursSaturday')}</p>
                <p style={{ margin: 0 }}>{t('info.hoursSunday')}</p>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </Band>
  );
}

export default ContactSection;

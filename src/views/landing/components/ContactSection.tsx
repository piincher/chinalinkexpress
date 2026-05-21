/**
 * Contact Section — Clean Redesign
 *
 * Simple form and contact info.
 * No gradient background, no glassmorphism, no emoji.
 */

'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { CONTACT_CONFIG } from '@/config/app';
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

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium" style={{ color: 'var(--color-ink-2)' }}>
        {label}
        {required && <span style={{ color: 'var(--color-accent)' }} className="ml-1">*</span>}
      </label>
      {isTextarea ? (
        <textarea
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
        <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-ink)' }}>
          {title}
        </h4>
        <div style={{ color: 'var(--color-ink-2)' }}>{children}</div>
      </div>
    </div>
  );
}

export function ContactSection() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id={SECTION_IDS.CONTACT}
      className="relative py-24 md:py-32"
      style={{
        backgroundColor: 'var(--color-paper-2)',
        borderTop: '1px solid var(--color-rule)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-ink-2)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: 'var(--color-paper)',
              border: '1px solid var(--color-rule)',
            }}
          >
            <h3
              className="text-xl font-semibold mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              {t('form.title')}
            </h3>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--color-paper-2)' }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: 'var(--color-accent)' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>
                  Message envoyé !
                </h4>
                <p className="text-sm mt-1" style={{ color: 'var(--color-ink-2)' }}>
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                  label={t('form.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('form.namePlaceholder') || 'Votre nom complet'}
                  required
                />
                <FormInput
                  label={t('form.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('form.emailPlaceholder') || 'votre@email.com'}
                  required
                />
                <FormInput
                  label={t('form.message')}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('form.messagePlaceholder') || 'Décrivez votre projet...'}
                  required
                  isTextarea
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-base transition-colors disabled:opacity-60"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-ink)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      {t('form.send') || 'Envoyer'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            <ContactInfoItem icon={MapPin} title={t('info.address')}>
              <p className="text-sm">
                {CONTACT_CONFIG.ADDRESS.STREET}
                <br />
                {CONTACT_CONFIG.ADDRESS.CITY}, {CONTACT_CONFIG.ADDRESS.COUNTRY}
              </p>
            </ContactInfoItem>

            <ContactInfoItem icon={Phone} title={t('info.phone')}>
              <div className="text-sm space-y-1">
                <p>{CONTACT_CONFIG.PHONE.CHINA}</p>
                <p>{CONTACT_CONFIG.PHONE.MALI_1}</p>
                <p>{CONTACT_CONFIG.PHONE.MALI_2}</p>
              </div>
            </ContactInfoItem>

            <ContactInfoItem icon={Mail} title={t('info.email')}>
              <p className="text-sm">{CONTACT_CONFIG.EMAIL}</p>
            </ContactInfoItem>

            <ContactInfoItem icon={MessageCircle} title={t('info.whatsapp')}>
              <div className="flex flex-wrap gap-2 mt-1">
                <a
                  href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP.CHINA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: 'var(--color-paper)',
                    color: 'var(--color-ink)',
                    border: '1.5px solid var(--color-rule)',
                  }}
                >
                  China
                </a>
                <a
                  href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP.MALI}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: 'var(--color-paper)',
                    color: 'var(--color-ink)',
                    border: '1.5px solid var(--color-rule)',
                  }}
                >
                  Mali
                </a>
              </div>
            </ContactInfoItem>

            {/* Hours */}
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-rule)',
              }}
            >
              <h4
                className="font-semibold mb-4 flex items-center gap-2"
                style={{ color: 'var(--color-ink)' }}
              >
                <Clock className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                {t('info.hours')}
              </h4>
              <div className="space-y-2 text-sm" style={{ color: 'var(--color-ink-2)' }}>
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                    08:00 - 20:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                    09:00 - 17:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                    10:00 - 15:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

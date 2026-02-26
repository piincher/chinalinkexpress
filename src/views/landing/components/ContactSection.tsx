/**
 * Contact Section Component
 * 
 * Clean, professional contact form with simple styling.
 * Part of the landing page feature.
 */

'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CONTACT_CONFIG } from '@/config/app';
import { SECTION_IDS } from '../constants';

// Simple input component
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
  const inputClasses = `
    w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl 
    focus:outline-none focus:border-yellow-400 focus:bg-white/20
    text-white placeholder-gray-400 transition-colors
  `;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-yellow-400 ml-1">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
          required={required}
          rows={4}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}

// Contact info item
function ContactInfoItem({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start">
      <div className="bg-white/10 rounded-xl p-3 mr-4 flex-shrink-0 hover:bg-white/20 transition-colors">
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <h4 className="font-semibold mb-1 text-white">{title}</h4>
        {children}
      </div>
    </div>
  );
}

export function ContactSection() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset after 3 seconds
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
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-semibold mb-4">
            {t('sectionLabel') || 'Contactez-nous'}
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            {t('subtitle')}
          </p>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('form.title')}
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✓</div>
                <h4 className="text-2xl font-bold text-white mb-2">Message envoyé !</h4>
                <p className="text-blue-200">Nous vous répondrons dans les plus brefs délais.</p>
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
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-4 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-400/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {t('form.send') || 'Envoyer'}
                      <span>→</span>
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              {t('info.title')}
            </h3>
            
            <div className="space-y-6">
              <ContactInfoItem icon="📍" title={t('info.address')}>
                <p className="text-blue-100">
                  {CONTACT_CONFIG.ADDRESS.STREET}
                  <br />
                  {CONTACT_CONFIG.ADDRESS.CITY}, {CONTACT_CONFIG.ADDRESS.COUNTRY}
                </p>
              </ContactInfoItem>

              <ContactInfoItem icon="📞" title={t('info.phone')}>
                <div className="text-blue-100 space-y-1">
                  <p>{CONTACT_CONFIG.PHONE.CHINA}</p>
                  <p>{CONTACT_CONFIG.PHONE.MALI_1}</p>
                  <p>{CONTACT_CONFIG.PHONE.MALI_2}</p>
                </div>
              </ContactInfoItem>

              <ContactInfoItem icon="📧" title={t('info.email')}>
                <p className="text-blue-100">{CONTACT_CONFIG.EMAIL}</p>
              </ContactInfoItem>

              <ContactInfoItem icon="💬" title={t('info.whatsapp')}>
                <div className="flex flex-wrap gap-2 mt-2">
                  <a
                    href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP.CHINA}`}
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>China</span>
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP.MALI}`}
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Mali</span>
                  </a>
                </div>
              </ContactInfoItem>
            </div>

            {/* Hours */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <span>🕐</span>
                {t('info.hours')}
              </h4>
              <div className="space-y-2 text-blue-100 text-sm">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium">08:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium">09:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-medium">10:00 - 15:00</span>
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

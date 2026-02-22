/**
 * Contact Section Component
 * 
 * Animated contact form with floating labels,
 * gradient background, and smooth interactions.
 * Part of the landing page feature.
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { AnimatedSection, SplitText, MagneticButton } from '@/components/animations';
import { CONTACT_CONFIG } from '@/config/app';
import { SECTION_IDS } from '../constants';

// Animated input with floating label
function AnimatedInput({
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
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  const inputClasses = `
    w-full px-4 py-4 bg-white/10 border-2 rounded-xl 
    focus:outline-none transition-all duration-300
    text-white placeholder-transparent
    ${isActive ? 'border-yellow-400 bg-white/20' : 'border-white/20'}
  `;

  const Component = isTextarea ? 'textarea' : 'input';

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Component
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={inputClasses}
        placeholder={placeholder}
        required={required}
        rows={isTextarea ? 4 : undefined}
      />
      
      {/* Floating label */}
      <motion.label
        className="absolute left-4 text-gray-300 pointer-events-none origin-left"
        animate={{
          y: isActive ? -28 : 16,
          scale: isActive ? 0.85 : 1,
          color: isActive ? '#fbbf24' : '#d1d5db',
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      
      {/* Focus glow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-yellow-400/20 -z-10"
        animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Contact info item with animation
function ContactInfoItem({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className="flex items-start group"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="bg-white/10 rounded-xl p-4 mr-4 flex-shrink-0 group-hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <span className="text-2xl">{icon}</span>
      </motion.div>
      <div>
        <h4 className="font-bold mb-1 text-white">{title}</h4>
        {children}
      </div>
    </motion.div>
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
        {/* Animated orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-semibold mb-4">
              {t('sectionLabel') || 'Contactez-nous'}
            </span>
          </AnimatedSection>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <SplitText animation="fadeUp">
              {t('title')}
            </SplitText>
          </h2>
          
          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
              {t('subtitle')}
            </p>
          </AnimatedSection>
          
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t('form.title')}
              </h3>
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      ✨
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white mb-2">Message envoyé !</h4>
                    <p className="text-blue-200">Nous vous répondrons dans les plus brefs délais.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AnimatedInput
                      label={t('form.name')}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('form.namePlaceholder')}
                      required
                    />
                    
                    <AnimatedInput
                      label={t('form.email')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('form.emailPlaceholder')}
                      required
                    />
                    
                    <AnimatedInput
                      label={t('form.message')}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('form.messagePlaceholder')}
                      required
                      isTextarea
                    />
                    
                    <MagneticButton strength={15}>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-4 px-6 rounded-xl transition-all relative overflow-hidden disabled:opacity-70"
                        whileHover={{ scale: 1.02, boxShadow: '0 10px 30px -10px rgba(251, 191, 36, 0.5)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Shimmer effect */}
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        />
                        
                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <motion.span
                                className="w-5 h-5 border-2 border-blue-900/30 border-t-blue-900 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              {t('form.send') || 'Envoyer'}
                              <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                →
                              </motion.span>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              {t('info.title')}
            </h3>
            
            <div className="space-y-6">
              <ContactInfoItem icon="📍" title={t('info.address')} delay={0.1}>
                <p className="text-blue-100">
                  {CONTACT_CONFIG.ADDRESS.STREET}
                  <br />
                  {CONTACT_CONFIG.ADDRESS.CITY}, {CONTACT_CONFIG.ADDRESS.COUNTRY}
                </p>
              </ContactInfoItem>

              <ContactInfoItem icon="📞" title={t('info.phone')} delay={0.2}>
                <div className="text-blue-100 space-y-1">
                  <p>{CONTACT_CONFIG.PHONE.CHINA}</p>
                  <p>{CONTACT_CONFIG.PHONE.MALI_1}</p>
                  <p>{CONTACT_CONFIG.PHONE.MALI_2}</p>
                </div>
              </ContactInfoItem>

              <ContactInfoItem icon="📧" title={t('info.email')} delay={0.3}>
                <p className="text-blue-100">{CONTACT_CONFIG.EMAIL}</p>
              </ContactInfoItem>

              <ContactInfoItem icon="💬" title={t('info.whatsapp')} delay={0.4}>
                <div className="flex flex-wrap gap-2 mt-2">
                  <motion.a
                    href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP.CHINA}`}
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>China</span>
                  </motion.a>
                  <motion.a
                    href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP.MALI}`}
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Mali</span>
                  </motion.a>
                </div>
              </ContactInfoItem>
            </div>

            {/* Hours */}
            <motion.div
              className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  🕐
                </motion.span>
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Import AnimatePresence
import { AnimatePresence } from 'framer-motion';

export default ContactSection;

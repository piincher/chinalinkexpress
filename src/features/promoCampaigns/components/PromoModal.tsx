'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { PromoCampaign, PromoCampaignEventType, PromoCampaignSlide } from '../types';

interface PromoModalProps {
  campaign: PromoCampaign;
  onClose: () => void;
  onEvent: (campaignId: string, eventType: PromoCampaignEventType, slideIndex?: number) => void;
}

export function PromoModal({ campaign, onClose, onEvent }: PromoModalProps) {
  const t = useTranslations('promoCampaign');
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = campaign.slides[currentIndex];

  const handleClose = () => {
    onEvent(campaign.id, 'dismiss', currentIndex);
    onClose();
  };

  const handleCta = (slideItem?: PromoCampaignSlide) => {
    const action = slideItem?.ctaAction || campaign.primaryCtaAction;
    const target = slideItem?.ctaTarget || campaign.primaryCtaTarget;

    onEvent(campaign.id, 'click', currentIndex);

    if (action === 'DISMISS' || !target) {
      onClose();
      return;
    }

    if (action === 'EXTERNAL_URL') {
      window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }

    if (action === 'DEEP_LINK') {
      if (target.startsWith('http')) {
        window.location.href = target;
      } else {
        // Internal deep link — best effort navigation.
        window.location.href = target;
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: campaign.backgroundColor }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full max-w-md mx-4 flex flex-col">
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={slide.imageUrl}
              alt={slide.title || campaign.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
              priority
            />
          </div>

          <div className="mt-6 px-2 text-center" style={{ color: campaign.textColor }}>
            {slide.title && <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>}
            {slide.body && <p className="text-base opacity-90">{slide.body}</p>}
          </div>

          {campaign.slides.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {campaign.slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: index === currentIndex ? 24 : 8,
                    backgroundColor: campaign.textColor,
                    opacity: index === currentIndex ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
          )}

          <div className="mt-6 px-2 space-y-3">
            {slide.ctaText && (
              <button
                onClick={() => handleCta(slide)}
                className="w-full py-3 px-4 rounded-xl font-semibold bg-white text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {slide.ctaText}
              </button>
            )}
            <button
              onClick={handleClose}
              className="w-full py-2 px-4 text-sm opacity-80 hover:opacity-100 transition-opacity"
              style={{ color: campaign.textColor }}
            >
              {t('close')}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, ExternalLink, MessageCircle } from 'lucide-react';

interface QuizResultProps {
  score: number;
  category: 'hot' | 'warm' | 'cold';
  guideUrl: string;
  whatsappNumber: string;
}

const categoryConfig = {
  hot: {
    label: '🎉 Prêt à importer',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    ringColor: '#10b981',
    message: "Vous avez tout ce qu'il faut pour démarrer!",
  },
  warm: {
    label: '⚡ Presque prêt',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    ringColor: '#f59e0b',
    message: "Quelques ajustements et vous serez prêt!",
  },
  cold: {
    label: '📚 En apprentissage',
    bgColor: 'bg-sky-100',
    textColor: 'text-sky-700',
    ringColor: '#0ea5e9',
    message: "Commençons par les bases de l'import!",
  },
};

function CircularProgress({
  score,
  color,
}: {
  score: number;
  color: string;
}) {
  const radius = 80;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <svg
      className="absolute inset-0 -rotate-90"
      width="200"
      height="200"
      viewBox="0 0 200 200"
    >
      {/* Background ring */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      {/* Progress ring */}
      <motion.circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference - progress }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
      />
    </svg>
  );
}

function useAnimatedCounter(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Delay start to sync with progress ring
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [target, duration]);

  return count;
}

export function QuizResult({
  score,
  category,
  guideUrl,
  whatsappNumber,
}: QuizResultProps) {
  const animatedScore = useAnimatedCounter(score);
  const config = categoryConfig[category];

  const handleShare = async () => {
    const shareText = `J'ai obtenu ${score}/100 au quiz d'import de ChinaLink Express! ${config.label}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon résultat - Quiz Import ChinaLink',
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error - fallback
        fallbackShare(shareText, shareUrl);
      }
    } else {
      fallbackShare(shareText, shareUrl);
    }
  };

  const fallbackShare = (text: string, url: string) => {
    const fullText = `${text}\n${url}`;
    navigator.clipboard.writeText(fullText);
    // Could add toast notification here
    alert('Résultat copié! Partagez-le avec vos contacts.');
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Bonjour! J'ai terminé le quiz d'import et j'ai obtenu ${score}/100 (${config.label}). Je souhaite en savoir plus!`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-full items-center justify-center p-4"
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header with score */}
        <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 px-8 py-10">
          <div className="relative mx-auto flex h-[200px] w-[200px] items-center justify-center">
            <CircularProgress score={score} color={config.ringColor} />
            <div className="text-center">
              <motion.span
                className="block text-6xl font-bold text-slate-800"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {animatedScore}
              </motion.span>
              <span className="text-sm text-slate-500">/ 100</span>
            </div>
          </div>

          {/* Category Badge */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 15,
              delay: 1.2,
            }}
          >
            <span
              className={`inline-flex items-center rounded-full ${config.bgColor} px-4 py-2 text-sm font-semibold ${config.textColor}`}
            >
              {config.label}
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-6 p-8">
          {/* Message */}
          <motion.p
            className="text-center text-lg text-slate-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            {config.message}
          </motion.p>

          {/* CTA Buttons */}
          <div className="space-y-3">
            {/* Guide Button */}
            <motion.a
              href={guideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 font-semibold text-white shadow-lg shadow-red-200 transition-all hover:from-red-700 hover:to-red-600 hover:shadow-xl hover:shadow-red-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Voir mon guide personnalisé</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:from-emerald-700 hover:to-emerald-600 hover:shadow-xl hover:shadow-emerald-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.75 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Discuter sur WhatsApp</span>
            </motion.a>

            {/* Share Button */}
            <motion.button
              onClick={handleShare}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
              <span>Partager ce quiz</span>
            </motion.button>
          </div>

          {/* Footer */}
          <motion.p
            className="text-center text-xs text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
          >
            Powered by{' '}
            <span className="font-medium text-slate-500">ChinaLink Express</span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default QuizResult;

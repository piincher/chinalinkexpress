'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface OptionButtonProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function OptionButton({
  label,
  description,
  selected,
  onClick,
  disabled = false,
}: OptionButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={`
        relative w-full text-left rounded-xl border-2 p-4 min-h-[44px]
        transition-colors duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${
          disabled
            ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
            : selected
            ? 'bg-blue-50 border-blue-500 cursor-pointer'
            : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md cursor-pointer'
        }
      `}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      <div className="flex items-start gap-3">
        {/* Checkmark indicator */}
        <div className="flex-shrink-0 mt-0.5">
          <motion.div
            initial={false}
            animate={{
              scale: selected ? 1 : 0.8,
              opacity: selected ? 1 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            className={`
              w-6 h-6 rounded-full flex items-center justify-center
              ${selected ? 'bg-blue-500' : 'bg-gray-200'}
            `}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <span
            className={`
              block font-medium text-base
              ${disabled ? 'text-gray-400' : selected ? 'text-blue-900' : 'text-gray-900'}
            `}
          >
            {label}
          </span>
          {description && (
            <span
              className={`
                block mt-1 text-sm
                ${disabled ? 'text-gray-400' : selected ? 'text-blue-700' : 'text-gray-500'}
              `}
            >
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Subtle background animation on selection */}
      <motion.div
        initial={false}
        animate={{
          opacity: selected ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 rounded-xl bg-blue-500/5 pointer-events-none"
        aria-hidden="true"
      />
    </motion.button>
  );
}

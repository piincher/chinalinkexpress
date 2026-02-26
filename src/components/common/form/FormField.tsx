/**
 * Form Field Component
 * 
 * A reusable form field wrapper with label, error, and hint support.
 * Part of the common components library.
 */

'use client';


import { cn } from '@/lib/utils';
import type { FormFieldProps } from '@/types';

/**
 * FormField component for consistent form field styling
 */
export function FormField({
  label,
  error,
  hint,
  required = false,
  children,
  className,
}: FormFieldProps & { className?: string }) {
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-gray-500 mt-1">{hint}</p>
      )}
    </div>
  );
}

/**
 * Input component with consistent styling
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'transition-colors duration-200',
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 hover:border-gray-400',
        className
      )}
      {...props}
    />
  );
}

/**
 * TextArea component with consistent styling
 */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function TextArea({ className, error, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'transition-colors duration-200 resize-none',
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 hover:border-gray-400',
        className
      )}
      {...props}
    />
  );
}

/**
 * Select component with consistent styling
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
}

export function Select({ className, error, options, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full px-4 py-3 rounded-lg border bg-white text-gray-900',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'transition-colors duration-200 appearance-none',
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 hover:border-gray-400',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default FormField;

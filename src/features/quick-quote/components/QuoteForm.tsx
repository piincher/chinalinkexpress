/**
 * Quote Form
 * 
 * Multi-step form fields with validation for quick quote.
 * Handles route selection, package details, service selection, and contact info.
 * Part of the quick-quote feature.
 */

'use client';

import { useCallback } from 'react';
import { MapPin, Package, Plane, Ship, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuickQuote } from '../hooks/useQuickQuote';
import { Input, FormField } from '@/components/common/form/FormField';
import type { QuickQuoteService, QuickQuoteFormData } from '../store/useQuickQuoteStore';

// Popular routes data
const POPULAR_ROUTES = [
  { id: '1', origin: 'Shanghai', destination: 'Bamako', popular: true },
  { id: '2', origin: 'Shenzhen', destination: 'Lagos', popular: true },
  { id: '3', origin: 'Guangzhou', destination: 'Dakar', popular: true },
  { id: '4', origin: 'Beijing', destination: 'Abidjan', popular: false },
  { id: '5', origin: 'Yiwu', destination: 'Nairobi', popular: false },
];

// Chinese cities
const CHINA_CITIES = [
  'Shanghai',
  'Shenzhen',
  'Guangzhou',
  'Beijing',
  'Yiwu',
  'Ningbo',
  'Qingdao',
  'Xiamen',
  'Tianjin',
];

// African cities
const AFRICA_CITIES = [
  'Bamako',
  'Lagos',
  'Dakar',
  'Abidjan',
  'Accra',
  'Nairobi',
  'Johannesburg',
  'Casablanca',
  'Tunis',
];

// Service options
const SERVICE_OPTIONS: {
  id: QuickQuoteService;
  label: string;
  description: string;
  icon: typeof Plane;
  priceRange: string;
  deliveryTime: string;
  color: string;
}[] = [
  {
    id: 'air',
    label: 'Fret Aérien',
    description: 'Livraison rapide et sécurisée',
    icon: Plane,
    priceRange: '$8-12/kg',
    deliveryTime: '7-14 jours',
    color: 'blue',
  },
  {
    id: 'sea',
    label: 'Fret Maritime',
    description: 'Solution économique pour gros volumes',
    icon: Ship,
    priceRange: '$3-5/kg',
    deliveryTime: '45-90 jours',
    color: 'cyan',
  },
  {
    id: 'express',
    label: 'Express',
    description: 'Livraison ultra-rapide prioritaire',
    icon: Zap,
    priceRange: '$15-20/kg',
    deliveryTime: '3-7 jours',
    color: 'amber',
  },
];

interface QuoteFormProps {
  step: number;
}

/**
 * Quote Form Component
 */
export function QuoteForm({ step }: QuoteFormProps) {
  const { formData, errors, setFormField } = useQuickQuote();

  // Handle numeric input with validation
  const handleNumericInput = useCallback(
    (field: 'weight' | 'length' | 'width' | 'height', value: string) => {
      // Allow empty string, numbers, and one decimal point
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        const numValue = parseFloat(value);
        // Limit to reasonable values
        if (value === '' || (numValue >= 0 && numValue <= 9999)) {
          setFormField(field, value);
        }
      }
    },
    [setFormField]
  );

  switch (step) {
    case 1:
      return <RouteStep formData={formData} errors={errors} onChange={setFormField} />;
    case 2:
      return (
        <PackageDetailsStep
          formData={formData}
          errors={errors}
          onChange={setFormField}
          onNumericChange={handleNumericInput}
        />
      );
    case 3:
      return <ServiceStep formData={formData} errors={errors} onChange={setFormField} />;
    case 4:
      return <ContactStep formData={formData} errors={errors} onChange={setFormField} />;
    default:
      return null;
  }
}

// Step 1: Route Selection
interface StepProps {
  formData: {
    origin: string;
    destination: string;
    service: QuickQuoteService;
    weight: string;
    weightUnit: 'kg' | 'lb';
    length: string;
    width: string;
    height: string;
    name: string;
    email: string;
    phone: string;
  };
  errors: {
    origin?: string;
    destination?: string;
    weight?: string;
    length?: string;
    width?: string;
    height?: string;
    service?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  onChange: <K extends keyof QuickQuoteFormData>(field: K, value: QuickQuoteFormData[K]) => void;
}

function RouteStep({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Popular Routes Quick Select */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Routes populaires
        </label>
        <div className="grid grid-cols-1 gap-2">
          {POPULAR_ROUTES.filter((r) => r.popular).map((route) => (
            <button
              key={route.id}
              onClick={() => {
                onChange('origin', route.origin);
                onChange('destination', route.destination);
              }}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left',
                formData.origin === route.origin && formData.destination === route.destination
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              <div className="flex items-center gap-2 flex-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {route.origin}
                </span>
                <span className="text-gray-400">→</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {route.destination}
                </span>
              </div>
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                Populaire
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Origin Selection */}
      <FormField label="Origine" error={errors.origin} required>
        <select
          value={formData.origin}
          onChange={(e) => onChange('origin', e.target.value)}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-colors duration-200',
            errors.origin
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          )}
        >
          <option value="">Sélectionnez une ville</option>
          {CHINA_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}, Chine
            </option>
          ))}
        </select>
      </FormField>

      {/* Destination Selection */}
      <FormField label="Destination" error={errors.destination} required>
        <select
          value={formData.destination}
          onChange={(e) => onChange('destination', e.target.value)}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-colors duration-200',
            errors.destination
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          )}
        >
          <option value="">Sélectionnez une ville</option>
          {AFRICA_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  );
}

// Step 2: Package Details
interface PackageStepProps extends StepProps {
  onNumericChange: (field: 'weight' | 'length' | 'width' | 'height', value: string) => void;
}

function PackageDetailsStep({ formData, errors, onChange, onNumericChange }: PackageStepProps) {
  return (
    <div className="space-y-6">
      {/* Weight Input */}
      <FormField label="Poids" error={errors.weight} required>
        <div className="relative">
          <Input
            type="text"
            inputMode="decimal"
            value={formData.weight}
            onChange={(e) => onNumericChange('weight', e.target.value)}
            placeholder="0.00"
            className="pr-24"
            error={!!errors.weight}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(['kg', 'lb'] as const).map((unit) => (
              <button
                key={unit}
                onClick={() => onChange('weightUnit', unit)}
                className={cn(
                  'px-3 py-1 text-sm font-medium rounded-md transition-colors',
                  formData.weightUnit === unit
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                {unit.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </FormField>

      {/* Dimensions Input */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Dimensions (optionnel)
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { field: 'length', label: 'L' },
            { field: 'width', label: 'W' },
            { field: 'height', label: 'H' },
          ].map(({ field, label }) => (
            <div key={field} className="relative">
              <Input
                type="text"
                inputMode="decimal"
                value={formData[field as keyof typeof formData] as string}
                onChange={(e) => onNumericChange(field as 'length' | 'width' | 'height', e.target.value)}
                placeholder={label}
                className="text-center pr-10"
                error={!!errors[field as keyof typeof errors]}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                cm
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Pour un calcul précis du poids volumétrique
        </p>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-start gap-3">
        <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <p className="font-medium mb-1">Poids volumétrique</p>
          <p className="opacity-80">
            Pour les colis légers mais encombrants, nous calculons le poids volumétrique 
            selon la formule : (L × l × H) / 5000
          </p>
        </div>
      </div>

      {/* Error display */}
      {(errors.weight || errors.length || errors.width || errors.height) && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.weight || errors.length || errors.width || errors.height}
          </p>
        </div>
      )}
    </div>
  );
}

// Step 3: Service Selection
function ServiceStep({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      {SERVICE_OPTIONS.map((service) => {
        const Icon = service.icon;
        const isSelected = formData.service === service.id;
        
        return (
          <button
            key={service.id}
            onClick={() => onChange('service', service.id)}
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
              isSelected
                ? `border-${service.color}-500 bg-${service.color}-50 dark:bg-${service.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            )}
          >
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                isSelected
                  ? `bg-${service.color}-500 text-white`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              )}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {service.label}
                </span>
                <span
                  className={cn(
                    'text-sm font-medium',
                    isSelected
                      ? `text-${service.color}-600 dark:text-${service.color}-400`
                      : 'text-gray-500'
                  )}
                >
                  {service.priceRange}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {service.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                  {service.deliveryTime}
                </span>
              </div>
            </div>
            <div
              className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                isSelected
                  ? `border-${service.color}-500 bg-${service.color}-500`
                  : 'border-gray-300 dark:border-gray-600'
              )}
            >
              {isSelected && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </button>
        );
      })}

      {errors.service && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">{errors.service}</p>
        </div>
      )}
    </div>
  );
}

// Step 4: Contact Information
function ContactStep({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-5">
      <FormField label="Nom complet" error={errors.name} required>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Votre nom"
          error={!!errors.name}
        />
      </FormField>

      <FormField label="Email" error={errors.email} required>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="votre@email.com"
          error={!!errors.email}
        />
      </FormField>

      <FormField label="Téléphone" error={errors.phone}>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="+223 XX XX XX XX"
          error={!!errors.phone}
        />
      </FormField>

      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <span className="font-medium">Confidentialité :</span> Vos informations sont 
          sécurisées et ne seront utilisées que pour vous contacter concernant votre devis.
        </p>
      </div>
    </div>
  );
}

export default QuoteForm;

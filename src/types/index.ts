/**
 * Global Type Definitions
 * 
 * Shared TypeScript types used throughout the application.
 */

// ============================================================================
// Common Types
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// ============================================================================
// Domain Types
// ============================================================================

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  address: {
    street: string;
    city: string;
    country: string;
  };
  phones: string[];
  emails: string[];
  whatsapp: string[];
  hours: {
    weekdays: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
}

// ============================================================================
// User Types
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'customer' | 'agent';

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
}

// ============================================================================
// Shipment Types
// ============================================================================

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: Address;
  destination: Address;
  weight: number;
  dimensions: Dimensions;
  service: 'air' | 'sea' | 'express';
  estimatedDelivery: string;
  actualDelivery?: string;
  history: ShipmentEvent[];
}

export type ShipmentStatus = 
  | 'pending'
  | 'picked_up'
  | 'in_transit'
  | 'customs'
  | 'out_for_delivery'
  | 'delivered'
  | 'exception';

export interface Address {
  name: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in';
}

export interface ShipmentEvent {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

// ============================================================================
// Quote Types
// ============================================================================

export interface QuoteRequest {
  id?: string;
  origin: string;
  destination: string;
  weight: number;
  dimensions: Dimensions;
  serviceType: 'air' | 'sea' | 'express';
  description?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Quote {
  id: string;
  requestId: string;
  amount: number;
  currency: string;
  validUntil: string;
  details: QuoteDetail[];
}

export interface QuoteDetail {
  description: string;
  amount: number;
}

// ============================================================================
// Component Prop Types
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'white' | 'inherit';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  children: React.ReactNode;
}

export interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

// ============================================================================
// Language Selector Types
// ============================================================================

export interface LanguageSelectorProps {
  /**
   * Current locale from server
   */
  currentLocale: string;
  
  /**
   * Variant of the selector
   */
  variant?: 'default' | 'compact' | 'minimal';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Alignment of the dropdown
   */
  align?: 'left' | 'right';
  
  /**
   * Whether to show full language names
   */
  showFullNames?: boolean;
}

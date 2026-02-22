/**
 * Contact Service
 * 
 * Business logic for contact form operations.
 * Part of the services layer for complex business logic.
 */

import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse, ApiError } from '@/api/client';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  ticketId?: string;
}

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<ContactResponse>> {
  return apiClient.post<ContactResponse>(API_ENDPOINTS.CONTACT.SEND, data);
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Veuillez entrer une adresse email valide';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  }

  return errors;
}

/**
 * Format contact data for API
 */
export function formatContactData(data: ContactFormData): ContactFormData {
  return {
    ...data,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim(),
    phone: data.phone?.trim() || undefined,
    subject: data.subject?.trim() || 'Nouveau message de contact',
  };
}

export default {
  submitContactForm,
  validateContactForm,
  formatContactData,
};

/**
 * Root Page - Redirect to Default Locale
 * 
 * Redirects root path / to /fr/ (default locale)
 */

import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/fr');
}

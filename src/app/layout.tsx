/**
 * Root Layout
 * 
 * This is a pass-through layout. The actual <html> and <body> tags
 * are defined in [locale]/layout.tsx to support i18n with proper
 * lang and dir attributes.
 * 
 * DO NOT add <html> or <body> tags here - they will cause hydration
 * errors due to nesting with the locale layout.
 */

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  // Return children directly - [locale]/layout.tsx provides html/body
  return children;
}

/**
 * Root Layout
 * 
 * Required <html> and <body> tags for Next.js 15+.
 * The locale-specific layout ([locale]/layout.tsx) wraps the content.
 */

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

import { ReactNode } from 'react';
import '@/app/globals.css';
export default function PublicLayout({ children }: { children: ReactNode }) {
 return <html lang="fr" dir="ltr" suppressHydrationWarning><body>{children}</body></html>;
}

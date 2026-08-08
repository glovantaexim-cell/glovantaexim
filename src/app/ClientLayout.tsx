'use client';

import { usePathname } from 'next/navigation';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import BackToTop from '@/components/shared/BackToTop';
import CookieConsent from '@/components/shared/CookieConsent';

export default function ClientLayout({
  children,
  inter,
}: {
  children: React.ReactNode;
  inter: string;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter}>
        {!isAdminPage && <PremiumHeader />}
        <main className={isAdminPage ? 'min-h-screen' : 'min-h-screen pt-[76px]'}>
          {children}
        </main>
        {!isAdminPage && (
          <>
            <PremiumFooter />
            <WhatsAppButton />
            <BackToTop />
            <CookieConsent />
          </>
        )}
      </body>
    </html>
  );
}

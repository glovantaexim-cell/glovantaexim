import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Glovanta Exim',
  description: 'Admin login page',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

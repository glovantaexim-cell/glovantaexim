import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Glovanta Exim',
  description: 'Admin dashboard for managing inquiries and subscribers',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

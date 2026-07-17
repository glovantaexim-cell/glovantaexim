import PremiumHome from '@/components/home/PremiumHome';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Premium Export Company | ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.description,
  openGraph: {
    title: `Premium Export Company | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default function HomePage() {
  return (
    <PremiumHome />
  );
}

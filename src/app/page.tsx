import PremiumHome from '@/components/home/PremiumHome';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { 
  getOrganizationSchema, 
  getWebsiteSchema, 
  getWebPageSchema,
  getFAQPageSchema 
} from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glovantaexim.com';

export const metadata: Metadata = {
  title: `Premium Export Company | ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `Premium Export Company | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    type: 'website',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 250,
        height: 60,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Premium Export Company | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
  },
};

export default function HomePage() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  const webpageSchema = getWebPageSchema({
    url: SITE_URL,
    name: `Premium Export Company | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
  });

  const faqSchema = getFAQPageSchema([
    {
      question: 'What Products Does Glovanta Exim Export?',
      answer: 'We supply three main categories: Indian spices (turmeric, cumin, coriander, chilli, and more), dehydrated vegetables and ingredients (onion, garlic, tomato, herbal items), and home textiles (bed linens, towels, table linens for hospitality and residential use).',
    },
    {
      question: 'How Can International Buyers Submit an Inquiry?',
      answer: 'International buyers can submit inquiries through our contact form, WhatsApp, or email. We respond within 24 hours with details, pricing, MOQ, packaging options, and shipping information tailored to your requirements.',
    },
    {
      question: 'What Packaging Options Are Available?',
      answer: 'We offer flexible options including bulk bags, retail pouches, custom labeling, and private branding. Specifications can be tailored to meet your market requirements and import regulations.',
    },
    {
      question: 'Which Countries Does Glovanta Exim Ship To?',
      answer: 'We ship to over 50 countries including the USA, UK, EU nations, Middle East, Southeast Asia, and Australia. Our team handles all documentation, customs clearance, and logistics coordination.',
    },
    {
      question: 'What Is the Minimum Order Quantity?',
      answer: 'Minimum order quantities vary by category and packaging type. We work with both small importers and large-scale buyers. Contact us with your specific requirements for accurate MOQ information.',
    },
    {
      question: 'Does Glovanta Provide Product Samples?',
      answer: 'Yes, we provide samples for evaluation before bulk orders. Sample costs and shipping charges apply. This ensures you can verify our quality meets your standards before committing to larger shipments.',
    },
  ]);

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      <PremiumHome />
    </>
  );
}

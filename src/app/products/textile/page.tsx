import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TextileCatalogClient from '@/components/products/TextileCatalogClient';
import { textileCategory, textileCategoryKeywords } from '@/lib/textile-products';
import { 
  getCollectionPageSchema,
  getBreadcrumbSchema,
  getFAQPageSchema 
} from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glovantaexim.com';

export const metadata: Metadata = {
  title: textileCategory.heroTitle,
  description: textileCategory.description,
  keywords: textileCategoryKeywords,
  alternates: {
    canonical: `${SITE_URL}/products/textile`,
  },
  openGraph: {
    title: textileCategory.heroTitle,
    description: textileCategory.description,
    type: 'website',
    url: `${SITE_URL}/products/textile`,
  },
  twitter: {
    card: 'summary_large_image',
    title: textileCategory.heroTitle,
    description: textileCategory.description,
  },
};

export default function TextileProductsPage() {
  const collectionPageSchema = getCollectionPageSchema({
    url: `${SITE_URL}/products/textile`,
    name: textileCategory.heroTitle,
    description: textileCategory.description,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products` },
    { name: 'Textiles', url: `${SITE_URL}/products/textile` },
  ]);

  const faqSchema = getFAQPageSchema([
    {
      question: 'What Textile Products Are Available for Export?',
      answer: 'We supply hospitality and residential textiles including bed linens (flat sheets, fitted sheets, duvet covers, pillow cases), bath textiles (luxury towels, hand towels, face towels, bath mats, bath robes), dining textiles (table cloths, table napkins), and mattress protectors. Available in various sizes, thread counts, and fabric compositions.',
    },
    {
      question: 'What Industries Use These Textile Products?',
      answer: 'Our textiles serve hospitality (hotels, resorts, spas), healthcare (hospitals, clinics), food service (restaurants, catering), residential (home use), and institutional sectors (schools, dormitories). Items meet commercial durability standards while maintaining comfort and aesthetic appeal.',
    },
    {
      question: 'Can Textile Products Be Customized for Branding?',
      answer: 'Yes, we offer customization including embroidered logos, woven labels, custom colors, specific thread counts, fabric blends, and packaging tailored to your brand. Minimum order quantities apply for custom specifications. Our team can guide you through the customization process.',
    },
    {
      question: 'What Fabric Options Are Available for Textile Products?',
      answer: 'We offer multiple fabric options including 100% cotton, cotton blends, microfiber, and terry cloth. Thread counts range from standard to high-end (200-800 TC). Fabric choice depends on intended use, budget, and market preferences. All fabrics meet international standards.',
    },
  ]);

  return (
    <div className="bg-white">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      <div className="border-b bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">Textiles</span>
          </div>
        </div>
      </div>

      <section className="relative flex min-h-[450px] items-center overflow-hidden py-20 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/textile-card.png"
            alt="Textiles"
            width="1920"
            height="1080"
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold drop-shadow-lg md:text-6xl">Textiles</h1>
            <p className="mx-auto max-w-2xl text-xl text-white drop-shadow-md">
              Browse hospitality and residential textiles including bedding, bath, and dining linens with international shipping.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#catalog" className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                Explore catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact#inquiry-form" className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                Request quotation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="container mx-auto px-4 py-12 pb-20">
        <TextileCatalogClient />
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Textile Products Are Available for Export?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We supply hospitality and residential textiles including bed linens (flat sheets, fitted sheets, duvet covers, pillow cases), bath textiles (luxury towels, hand towels, face towels, bath mats, bath robes), dining textiles (table cloths, table napkins), and mattress protectors. Available in various sizes, thread counts, and fabric compositions.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white border-l-4 border-teal-600 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What Industries Use These Textile Products?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our textiles serve hospitality (hotels, resorts, spas), healthcare (hospitals, clinics), food service (restaurants, catering), residential (home use), and institutional sectors (schools, dormitories). Items meet commercial durability standards while maintaining comfort and aesthetic appeal.
                </p>
              </div>

              <div className="bg-white border-l-4 border-teal-600 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Can Textile Products Be Customized for Branding?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we offer customization including embroidered logos, woven labels, custom colors, specific thread counts, fabric blends, and packaging tailored to your brand. Minimum order quantities apply for custom specifications. Our team can guide you through the customization process.
                </p>
              </div>

              <div className="bg-white border-l-4 border-teal-600 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What Fabric Options Are Available for Textile Products?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer multiple fabric options including 100% cotton, cotton blends, microfiber, and terry cloth. Thread counts range from standard to high-end (200-800 TC). Fabric choice depends on intended use, budget, and market preferences. All fabrics meet international standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

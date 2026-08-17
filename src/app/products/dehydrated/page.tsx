import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DehydratedCatalogClient from '@/components/products/DehydratedCatalogClient';
import { dehydratedCategory, dehydratedCategoryKeywords } from '@/lib/dehydrated-products';
import { 
  getCollectionPageSchema,
  getBreadcrumbSchema,
  getFAQPageSchema 
} from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glovantaexim.com';

export const metadata: Metadata = {
  title: dehydratedCategory.heroTitle,
  description: dehydratedCategory.description,
  keywords: dehydratedCategoryKeywords,
  alternates: {
    canonical: `${SITE_URL}/products/dehydrated`,
  },
  openGraph: {
    title: dehydratedCategory.heroTitle,
    description: dehydratedCategory.description,
    type: 'website',
    url: `${SITE_URL}/products/dehydrated`,
  },
  twitter: {
    card: 'summary_large_image',
    title: dehydratedCategory.heroTitle,
    description: dehydratedCategory.description,
  },
};

export default function DehydratedProductsPage() {
  const collectionPageSchema = getCollectionPageSchema({
    url: `${SITE_URL}/products/dehydrated`,
    name: dehydratedCategory.heroTitle,
    description: dehydratedCategory.description,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products` },
    { name: 'Dehydrated Products', url: `${SITE_URL}/products/dehydrated` },
  ]);

  const faqSchema = getFAQPageSchema([
    {
      question: 'What Dehydrated Products Are Available for Export?',
      answer: 'We supply dehydrated onion (white and red flakes, minced, ground), dehydrated garlic (flakes, minced, ground), dehydrated tomato, dehydrated potato, ginger, beetroot, and herbal ingredients including amla, moringa, neem, mint, and tulsi. All items are processed to retain natural flavor and nutritional value.',
    },
    {
      question: 'What Forms Are Dehydrated Vegetables Available In?',
      answer: 'Available in multiple forms: flakes, minced, chopped, granules, and fine ground. The form depends on the intended application - flakes and minced work well for food manufacturing, while ground versions suit seasoning blends and instant mixes.',
    },
    {
      question: 'How Long Do Dehydrated Products Stay Fresh?',
      answer: 'When stored properly in airtight containers away from moisture and direct sunlight, dehydrated items typically maintain their characteristics for 12-24 months. We provide proper packaging with moisture barriers and storage guidelines to ensure maximum shelf life during shipping and distribution.',
    },
    {
      question: 'Are Dehydrated Products Suitable for Food Processing?',
      answer: 'Yes, they are widely used in food processing, instant food mixes, soup bases, seasoning blends, sauces, and ready-to-eat meals. They offer consistent characteristics, extended shelf life, reduced shipping weight, and cost-effective storage compared to fresh vegetables.',
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
            <span className="font-medium text-gray-900">Dehydrated Products</span>
          </div>
        </div>
      </div>

      <section className="relative flex min-h-[450px] items-center overflow-hidden py-20 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/dehydrated-card.png"
            alt="Dehydrated Products"
            width="1920"
            height="1080"
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold drop-shadow-lg md:text-6xl">Dehydrated Products</h1>
            <p className="mx-auto max-w-2xl text-xl text-white drop-shadow-md">
              Browse dehydrated vegetables, ground ingredients, flakes, minced formats, and herbal items with international shipping, OEM options, and inquiry support.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#catalog" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
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
        <DehydratedCatalogClient />
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Dehydrated Products Are Available for Export?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We supply dehydrated onion (white and red flakes, minced, ground), dehydrated garlic (flakes, minced, ground), dehydrated tomato, dehydrated potato, ginger, beetroot, and herbal ingredients including amla, moringa, neem, mint, and tulsi. All items are processed to retain natural flavor and nutritional value.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white border-l-4 border-sky-600 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What Forms Are Dehydrated Vegetables Available In?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Available in multiple forms: flakes, minced, chopped, granules, and fine ground. The form depends on the intended application - flakes and minced work well for food manufacturing, while ground versions suit seasoning blends and instant mixes.
                </p>
              </div>

              <div className="bg-white border-l-4 border-sky-600 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How Long Do Dehydrated Products Stay Fresh?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  When stored properly in airtight containers away from moisture and direct sunlight, dehydrated items typically maintain their characteristics for 12-24 months. We provide proper packaging with moisture barriers and storage guidelines to ensure maximum shelf life during shipping and distribution.
                </p>
              </div>

              <div className="bg-white border-l-4 border-sky-600 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Are Dehydrated Products Suitable for Food Processing?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, they are widely used in food processing, instant food mixes, soup bases, seasoning blends, sauces, and ready-to-eat meals. They offer consistent characteristics, extended shelf life, reduced shipping weight, and cost-effective storage compared to fresh vegetables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

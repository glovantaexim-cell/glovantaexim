import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SpicesCatalogClient from '@/components/products/SpicesCatalogClient';
import { spicesCategory, spicesCategoryKeywords } from '@/lib/spices-products';
import { 
  getCollectionPageSchema,
  getBreadcrumbSchema,
  getFAQPageSchema 
} from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glovantaexim.com';

export const metadata: Metadata = {
  title: spicesCategory.heroTitle,
  description: spicesCategory.description,
  keywords: spicesCategoryKeywords,
  alternates: {
    canonical: `${SITE_URL}/products/spices`,
  },
  openGraph: {
    title: spicesCategory.heroTitle,
    description: spicesCategory.description,
    type: 'website',
    url: `${SITE_URL}/products/spices`,
  },
  twitter: {
    card: 'summary_large_image',
    title: spicesCategory.heroTitle,
    description: spicesCategory.description,
  },
};

export default function SpicesProductsPage() {
  const collectionPageSchema = getCollectionPageSchema({
    url: `${SITE_URL}/products/spices`,
    name: spicesCategory.heroTitle,
    description: spicesCategory.description,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products` },
    { name: 'Spices', url: `${SITE_URL}/products/spices` },
  ]);

  const faqSchema = getFAQPageSchema([
    {
      question: 'What Spice Products Are Available for Export?',
      answer: 'We supply Indian spices including turmeric (whole finger and ground), red chilli, cumin (seeds and ground), coriander (seeds and ground), fennel seeds, fenugreek seeds, ajwain seeds, and mustard seeds (yellow and blue varieties). Available in whole and ground forms.',
    },
    {
      question: 'What Forms Are Indian Spices Available In?',
      answer: 'Available in multiple forms: whole seeds, ground, and custom blends. Forms depend on the specific item - for example, turmeric comes as whole finger or ground, while cumin is offered as seeds or ground.',
    },
    {
      question: 'What Packaging Options Are Available for Bulk Spice Export?',
      answer: 'We offer flexible solutions including PP bags, HDPE bags, kraft paper bags, vacuum-sealed pouches, retail pouches with custom labeling, and large containers. Can be customized for food service, retail, or industrial use.',
    },
    {
      question: 'Are These Spices Suitable for Food Manufacturing?',
      answer: 'Yes, they meet international food safety standards and work well for food manufacturing, seasoning blends, restaurant use, and retail. We provide detailed specifications, microbial reports, and certifications with each shipment.',
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
            <span className="font-medium text-gray-900">Spices</span>
          </div>
        </div>
      </div>

      <section className="relative flex min-h-[450px] items-center overflow-hidden py-20 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/spices-card.png"
            alt="Spices"
            width="1920"
            height="1080"
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold drop-shadow-lg md:text-6xl">Spices</h1>
            <p className="mx-auto max-w-2xl text-xl text-white drop-shadow-md">
              Browse Indian spices in whole and ground forms with international shipping, OEM options, and inquiry support.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#catalog" className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">
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
        <SpicesCatalogClient />
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Spice Products Are Available for Export?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We supply Indian spices including turmeric (whole finger and ground), red chilli, cumin (seeds and ground), coriander (seeds and ground), fennel seeds, fenugreek seeds, ajwain seeds, and mustard seeds (yellow and blue varieties). Available in whole and ground forms.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white border-l-4 border-orange-600 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What Forms Are Indian Spices Available In?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Available in multiple forms: whole seeds, ground, and custom blends. Forms depend on the specific item - for example, turmeric comes as whole finger or ground, while cumin is offered as seeds or ground.
                </p>
              </div>

              <div className="bg-white border-l-4 border-orange-600 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What Packaging Options Are Available for Bulk Spice Export?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer flexible solutions including PP bags, HDPE bags, kraft paper bags, vacuum-sealed pouches, retail pouches with custom labeling, and large containers. Can be customized for food service, retail, or industrial use.
                </p>
              </div>

              <div className="bg-white border-l-4 border-orange-600 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Are These Spices Suitable for Food Manufacturing?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, they meet international food safety standards and work well for food manufacturing, seasoning blends, restaurant use, and retail. We provide detailed specifications, microbial reports, and certifications with each shipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

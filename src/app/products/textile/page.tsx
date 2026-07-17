import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TextileCatalogClient from '@/components/products/TextileCatalogClient';
import { textileCategory, textileCategoryKeywords } from '@/lib/textile-products';

export const metadata: Metadata = {
  title: textileCategory.heroTitle,
  description: textileCategory.description,
  keywords: textileCategoryKeywords,
  alternates: {
    canonical: '/products/textile',
  },
};

export default function TextileProductsPage() {
  return (
    <div className="bg-white">
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
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold drop-shadow-lg md:text-6xl">Textiles</h1>
            <p className="mx-auto max-w-2xl text-xl text-white drop-shadow-md">
              Browse premium hospitality and residential textiles including bedding, bath, and dining linens with export-ready packaging.
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
    </div>
  );
}

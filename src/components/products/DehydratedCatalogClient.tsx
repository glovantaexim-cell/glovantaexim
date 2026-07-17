'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn, truncate } from '@/lib/utils';
import { dehydratedProducts, resolveDehydratedImage, type DehydratedProduct } from '@/lib/dehydrated-products';
import { Grid3X3, List, Search, SlidersHorizontal } from 'lucide-react';

type ViewMode = 'grid' | 'list';

const forms = ['All', 'Powder', 'Flakes', 'Minced'];

function ProductActionLinks({ product }: { product: DehydratedProduct }) {
  const whatsappMessage = `Hello, I am interested in ${product.title}. Please send Price, MOQ, Specifications, Packaging and Delivery Time.`;
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_SITE_WHATSAPP || '919054626928'}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="relative z-20 flex flex-wrap gap-3 mt-4">
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow-emerald-500/25 hover:-translate-y-0.5"
      >
        WhatsApp
      </a>
      <Link 
        href={`/contact?product=${encodeURIComponent(product.title)}#inquiry-form`}
        className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-slate-900/25 hover:-translate-y-0.5"
      >
        Contact Us
      </Link>
    </div>
  );
}

export default function DehydratedCatalogClient() {
  const [query, setQuery] = useState('');
  const [selectedForm, setSelectedForm] = useState('All');
  const [sortMode, setSortMode] = useState<'featured' | 'az'>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const products = useMemo(() => {
    const filtered = dehydratedProducts.filter((product) => {
      const matchesQuery =
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        product.features.some((feature) => feature.toLowerCase().includes(query.toLowerCase()));
      const matchesForm =
        selectedForm === 'All' || product.form.toLowerCase().includes(selectedForm.toLowerCase());
      return matchesQuery && matchesForm;
    });

    return [...filtered].sort((left, right) => {
      if (sortMode === 'az') {
        return left.title.localeCompare(right.title);
      }

      return Number(right.featured) - Number(left.featured) || left.order - right.order;
    });
  }, [query, selectedForm, sortMode]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search dehydrated products"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </label>

        <select
          value={selectedForm}
          onChange={(event) => setSelectedForm(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
        >
          {forms.map((form) => (
            <option key={form} value={form}>
              {form}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <Button variant={sortMode === 'featured' ? 'default' : 'outline'} size="sm" onClick={() => setSortMode('featured')}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Featured
          </Button>
          <Button variant={sortMode === 'az' ? 'default' : 'outline'} size="sm" onClick={() => setSortMode('az')}>
            A-Z
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setViewMode('grid')}>
            <Grid3X3 className={cn('h-4 w-4', viewMode === 'grid' && 'text-primary')} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setViewMode('list')}>
            <List className={cn('h-4 w-4', viewMode === 'list' && 'text-primary')} />
          </Button>
        </div>
      </div>

      <div className={cn(viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3' : 'space-y-4')}>
        {products.map((product, index) => {
          const featuredImage = product.imageGallery.find((image) => image.featured) || product.imageGallery[0];

          return (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.4) }}
            >
              <Card className={cn('group relative h-full cursor-pointer overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:shadow-md', viewMode === 'list' && 'md:flex')}>
                <Link
                  href={`/products/dehydrated/${product.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`View ${product.title} details`}
                />
                <div className={cn('relative overflow-hidden bg-slate-100', viewMode === 'grid' ? 'h-56' : 'md:w-72 md:min-h-[240px]')}>
                  <img
                    src={resolveDehydratedImage(featuredImage)}
                    alt={featuredImage.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">{product.title}</h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-sky-700">{product.productType}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{truncate(product.shortDescription, 140)}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.features.slice(0, 4).map((feature) => (
                      <span key={feature} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <ProductActionLinks product={product} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {products.length === 0 && (
        <Card className="border border-slate-200 bg-white p-10 text-center text-slate-600">
          No dehydrated products match your current filters.
        </Card>
      )}
    </div>
  );
}

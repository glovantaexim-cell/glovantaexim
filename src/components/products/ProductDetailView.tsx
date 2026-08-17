'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface BaseProduct {
  title: string;
  slug: string;
  form: string;
  productType: string;
  shortDescription: string;
  overview: string;
  features: string[];
  benefits: string[];
  applications: string[];
  specifications: Record<string, string>;
  packaging: string[];
  packagingNote: string;
  exportMarkets: string[];
  certifications: string[];
  faq: { question: string; answer: string }[];
  featured?: boolean;
}

interface ProductDetailViewProps {
  product: BaseProduct;
  category: { title: string; href: string };
  resolvedImages: { src: string; alt: string }[];
  relatedProducts?: { title: string; form: string; href: string; imageSrc: string }[];
  whatsappUrl: string;
  imagePresentation?: 'cover' | 'contain';
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ProductDetailView({
  product,
  category,
  resolvedImages,
  relatedProducts,
  whatsappUrl,
  imagePresentation = 'cover',
}: ProductDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredImage = resolvedImages[0];
  const isContainedImage = imagePresentation === 'contain';

  return (
    <div ref={containerRef} className="bg-white selection:bg-sky-100 selection:text-sky-900">
      {/* Breadcrumb Header */}
      <div className="sticky top-[72px] z-30 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 text-xs font-medium text-slate-500 md:text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="transition hover:text-sky-600">Home</Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            <Link href="/products" className="transition hover:text-sky-600">Products</Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            <Link href={category.href} className="transition hover:text-sky-600">{category.title}</Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-slate-900">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <Link href={category.href} className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to {category.title.toLowerCase()}
        </Link>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column - Sticky Image Gallery */}
          <div className="lg:col-span-5 lg:sticky lg:top-[160px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={isContainedImage
                ? 'relative aspect-square w-full overflow-hidden rounded-3xl bg-slate-50 p-8 sm:p-12'
                : 'relative aspect-square w-full overflow-hidden rounded-3xl bg-slate-50'}
            >
              <img
                src={featuredImage.src}
                alt={featuredImage.alt}
                width="800"
                height="800"
                loading="eager"
                className={isContainedImage
                  ? 'h-full w-full object-contain transition-transform duration-700 ease-out hover:scale-105'
                  : 'h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105'}
              />
            </motion.div>

            {/* Thumbnail Navigation (If multiple images exist) */}
            {resolvedImages.length > 1 && (
              <div className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {resolvedImages.map((img, i) => (
                  <button key={i} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-transparent bg-slate-50 transition hover:border-slate-200">
                    <img
                      src={img.src}
                      alt={img.alt}
                      width="80"
                      height="80"
                      loading="lazy"
                      className={isContainedImage ? 'h-full w-full object-contain p-2' : 'h-full w-full object-cover'}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Scrolling Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-12"
          >
            {/* Header Area */}
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-800">
                  {product.productType}
                </span>
                <span className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {product.form}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                {product.title}
              </h1>
              <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
                {product.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-500 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30"
                >
                  <span className="relative z-10">Inquire via WhatsApp</span>
                </a>
                <Link 
                  href="#inquiry-form" 
                  className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 px-8 py-4 font-semibold text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  Contact Sales
                </Link>
              </div>
            </motion.div>

            {/* Quick Stats Bar */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-px bg-slate-100 rounded-3xl overflow-hidden sm:grid-cols-3 border border-slate-100">
              <div className="bg-white p-6">
                <h2 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Markets</h2>
                <p className="mt-1 text-sm font-medium text-slate-900">{product.exportMarkets[0]} & {product.exportMarkets.length - 1} more</p>
              </div>
              <div className="bg-white p-6">
                <h2 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Certified</h2>
                <p className="mt-1 text-sm font-medium text-slate-900 truncate">{product.certifications[0]}</p>
              </div>
              <div className="bg-white p-6 col-span-2 sm:col-span-1">
                <h2 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Packaging</h2>
                <p className="mt-1 text-sm font-medium text-slate-900 truncate">{product.packaging[0]}</p>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Overview & Features */}
            <motion.div variants={fadeUp} className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Product Overview</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{product.overview}</p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Applications</h3>
                  <ul className="space-y-3">
                    {product.applications.map((app, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                        <span className="leading-tight">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Specifications Table */}
            <motion.div variants={fadeUp} className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Technical Specifications</h2>
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(product.specifications).map(([label, value], index) => (
                      <tr key={label} className={index % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                        <th className="px-6 py-4 font-semibold text-slate-900 w-1/3">{label}</th>
                        <td className="px-6 py-4">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Packaging Details */}
            <motion.div variants={fadeUp} className="rounded-3xl bg-slate-50 p-8 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Packaging Options</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.packaging.map((pack) => (
                  <span key={pack} className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
                    {pack}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500 italic">{product.packagingNote}</p>
            </motion.div>

            {/* FAQ */}
            {product.faq && product.faq.length > 0 && (
              <motion.div variants={fadeUp} className="pt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {product.faq.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border-b border-slate-200 py-2">
                      <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-sky-600 transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 leading-relaxed pt-2 pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            )}

            {/* Contact Form Section */}
            <motion.div variants={fadeUp} id="inquiry-form" className="scroll-mt-32 pt-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/20">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Request a Quote</h2>
                  <p className="mt-2 text-slate-500">Provide your requirements below and our export team will contact you shortly.</p>
                </div>
                <ContactForm defaultProductInterest={product.title} />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Related Products - Full Width Bottom Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50 py-16 lg:py-24 mt-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">You May Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link key={item.href} href={item.href} className="group relative rounded-3xl bg-white p-4 transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100 mb-4 mix-blend-multiply flex items-center justify-center p-6">
                    <img 
                      src={item.imageSrc} 
                      alt={item.title} 
                      width="300"
                      height="300"
                      loading="lazy"
                      className="h-full w-full object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div className="px-2 pb-2 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.form}</span>
                    <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

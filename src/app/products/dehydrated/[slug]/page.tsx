import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/constants';
import {
  dehydratedCategory,
  dehydratedProducts,
  getDehydratedProduct,
  getRelatedDehydratedProducts,
  resolveDehydratedImage,
} from '@/lib/dehydrated-products';
import { getWhatsAppLink } from '@/lib/utils';
import ProductDetailView from '@/components/products/ProductDetailView';
import { getBreadcrumbSchema } from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glovantaexim.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return dehydratedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getDehydratedProduct(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: product.keywords,
    alternates: { canonical: product.canonicalUrl },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: product.canonicalUrl,
      type: 'article',
      images: [
        {
          url: resolveDehydratedImage(product.imageGallery.find((image) => image.featured) || product.imageGallery[0]),
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle,
      description: product.seoDescription,
    },
  };
}

export default async function DehydratedProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getDehydratedProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedDehydratedProducts(product);
  const whatsappMessage = `Hello, I am interested in ${product.title}. Please send Price, MOQ, Specifications, Packaging and Delivery Time.`;
  const whatsappUrl = getWhatsAppLink(SITE_CONFIG.whatsapp, whatsappMessage);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    image: product.imageGallery.map((image) => resolveDehydratedImage(image)),
    sku: product.slug,
    category: dehydratedCategory.title,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: product.canonicalUrl,
    },
    additionalProperty: Object.entries(product.specifications).map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value,
    })),
    faq: product.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const resolvedImages = product.imageGallery.map(img => ({
    src: resolveDehydratedImage(img),
    alt: img.alt
  }));

  const mappedRelated = relatedProducts.map(rp => ({
    title: rp.title,
    form: rp.form,
    href: `/products/dehydrated/${rp.slug}`,
    imageSrc: resolveDehydratedImage(rp.imageGallery.find(img => img.featured) || rp.imageGallery[0])
  }));

  // Breadcrumb Schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products` },
    { name: 'Dehydrated Products', url: `${SITE_URL}/products/dehydrated` },
    { name: product.title, url: product.canonicalUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProductDetailView 
        product={product}
        category={{ title: 'Dehydrated Products', href: '/products/dehydrated' }}
        resolvedImages={resolvedImages}
        relatedProducts={mappedRelated}
        whatsappUrl={whatsappUrl}
      />
    </>
  );
}

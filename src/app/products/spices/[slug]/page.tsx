import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/constants';
import {
  spicesCategory,
  spicesProducts,
  getSpiceProduct,
  getRelatedSpiceProducts,
  resolveSpiceImage,
} from '@/lib/spices-products';
import { getWhatsAppLink } from '@/lib/utils';
import ProductDetailView from '@/components/products/ProductDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return spicesProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getSpiceProduct(slug);

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
          url: resolveSpiceImage(product.imageGallery.find((image) => image.featured) || product.imageGallery[0]),
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

export default async function SpicesProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getSpiceProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedSpiceProducts(product);
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
    image: product.imageGallery.map((image) => resolveSpiceImage(image)),
    sku: product.slug,
    category: spicesCategory.title,
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
    src: resolveSpiceImage(img),
    alt: img.alt
  }));

  const mappedRelated = relatedProducts.map(rp => ({
    title: rp.title,
    form: rp.form,
    href: `/products/spices/${rp.slug}`,
    imageSrc: resolveSpiceImage(rp.imageGallery.find(img => img.featured) || rp.imageGallery[0])
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailView 
        product={product}
        category={{ title: 'Spices', href: '/products/spices' }}
        resolvedImages={resolvedImages}
        relatedProducts={mappedRelated}
        whatsappUrl={whatsappUrl}
      />
    </>
  );
}

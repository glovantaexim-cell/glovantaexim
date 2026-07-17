import { SITE_CONFIG } from '@/lib/constants';
import { generateSlug, getCloudinaryUrl } from '@/lib/utils';

export type TextileFormValue = 'Bedding' | 'Bath' | 'Dining' | 'Customized';

export interface ProductImageAsset {
  src: string;
  alt: string;
  cloudinaryPublicId: string;
  order: number;
  featured: boolean;
}

export interface TextileProduct {
  title: string;
  slug: string;
  form: TextileFormValue;
  productType: string;
  shortDescription: string;
  description: string;
  overview: string;
  features: string[];
  benefits: string[];
  applications: string[];
  specifications: Record<string, string>;
  packaging: string[];
  packagingNote: string;
  moq: string;
  leadTime: string;
  exportMarkets: string[];
  certifications: string[];
  faq: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  canonicalUrl: string;
  aiSearchContent: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  order: number;
  imageGallery: ProductImageAsset[];
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const textileImages = (_slug: string, images: Array<{ file: string; alt: string; featured?: boolean }>): ProductImageAsset[] =>
  images.map((image, index) => ({
    src: `/textile/${image.file}`,
    alt: image.alt,
    cloudinaryPublicId: `textile/${image.file.replace(/\.[^.]+$/, '')}`,
    order: index + 1,
    featured: Boolean(image.featured),
  }));

const buildFaq = (productName: string) => [
  {
    question: `What is the MOQ for ${productName}?`,
    answer: `The MOQ for ${productName} depends on packaging, destination market, and order frequency. Share your target volume and we will prepare a tailored export quotation.`,
  },
  {
    question: 'Do you offer samples before bulk orders?',
    answer: 'Yes. Samples can be arranged for quality evaluation, subject to product availability and courier charges.',
  },
  {
    question: 'Can packaging be customized?',
    answer: 'Yes. We support OEM, private label, export cartons, and customized packing structures according to buyer specifications.',
  },
  {
    question: 'What is the usual lead time?',
    answer: 'Lead time varies by volume and packaging requirements, but most bulk export inquiries are quoted with a clear production and dispatch schedule.',
  },
  {
    question: 'Which markets do you serve?',
    answer: `We supply international B2B buyers across ${SITE_CONFIG.exportCountries.slice(0, 6).join(', ')} and other export destinations on request.`,
  },
  {
    question: 'Are your products suitable for OEM and private label supply?',
    answer: 'Yes. We can support OEM and private label supply for hotels, hospitals, retail brands, and distributors.',
  },
];

const buildProduct = (input: Omit<TextileProduct, 'slug' | 'canonicalUrl' | 'faq'> & { slug?: string; faq?: TextileProduct['faq'] }): TextileProduct => {
  const slug = input.slug || generateSlug(input.title);

  return {
    ...input,
    slug,
    faq: input.faq || buildFaq(input.title),
    canonicalUrl: `${baseUrl}/products/textile/${slug}`,
  };
};

export const textileCategory = {
  slug: 'textile',
  title: 'Textiles',
  description:
    'Premium quality textiles including bedding, bath, and dining linens for hotels, hospitals, and retail buyers.',
  heroTitle: 'Enterprise-Grade Textile Export',
  heroDescription:
    'Bulk-ready export textiles with customizable specifications, private label options, and international B2B support.',
};

export const textileCategoryKeywords = [
  'hotel textiles',
  'hospital textiles',
  'bed linens',
  'bath linens',
  'bulk textile export',
  'private label textiles',
];

const files = [
  'bath-mat.png',
  'bath-robe.png',
  'duvet-cover.png',
  'face-towel.png',
  'fitted-bed-sheet.png',
  'flat-bed-sheet.png',
  'hand-towel.png',
  'luxury-bath-towels.png',
  'mattress-protector.png',
  'pillow-case.png',
  'table-cloth.png',
  'table-napkin.png'
];

export const textileProducts: TextileProduct[] = files.map((file, i) => {
  const title = file.replace('.png', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const isBath = title.includes('Towel') || title.includes('Bath') || title.includes('Mat');
  const isDining = title.includes('Table') || title.includes('Napkin');
  const form = isBath ? 'Bath' : isDining ? 'Dining' : 'Bedding';
  const productType = form + ' Linen';
  
  return buildProduct({
    title,
    form: form as TextileFormValue,
    productType,
    shortDescription: `Premium quality ${title.toLowerCase()} for hospitality and residential uses.`,
    description: `${title} is crafted with high-quality materials to ensure durability, comfort, and luxury.`,
    overview: `${title} offers an exceptional blend of softness and strength. Perfect for hotels, hospitals, and luxury homes.`,
    features: ['Premium export quality', 'High durability', 'Soft and comfortable', 'Easy to wash', 'Colorfast'],
    benefits: ['Enhances guest experience', 'Long-lasting quality', 'Supports private label and OEM procurement models'],
    applications: ['Hotels', 'Hospitals', 'Retail', 'Luxury Homes'],
    specifications: { 'Material': '100% Cotton / Poly Cotton', 'Color': 'White / Customized', 'Size': 'Standard / Customized', 'Thread Count': '200TC - 1000TC (as per requirement)' },
    packaging: ['Standard Export Carton', 'Customized Packaging', 'Bale Packing'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 Pieces',
    leadTime: '3-6 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Australia', 'Germany', 'Saudi Arabia'],
    certifications: ['ISO 9001:2015', 'Oeko-Tex Standard 100'],
    seoTitle: `${title} Exporter | Bulk ${title}`,
    seoDescription: `Bulk ${title.toLowerCase()} supplier offering export-quality textiles and private label solutions.`,
    keywords: [`${title.toLowerCase()} exporter`, `bulk ${title.toLowerCase()}`, `hotel ${title.toLowerCase()}`],
    aiSearchContent: `${title} is an export-grade textile for B2B buyers, hotels, and retail brands. It supports bulk packaging, OEM supply, and consistent industrial quality.`,
    status: 'published',
    featured: i < 4,
    order: i + 1,
    imageGallery: textileImages(title.toLowerCase().replace(/ /g, '-'), [{ file, alt: `${title} export product`, featured: true }]),
  });
});

export const textileProductsBySlug = Object.fromEntries(
  textileProducts.map((product) => [product.slug, product])
) as Record<string, TextileProduct>;

export function getTextileProduct(slug: string) {
  return textileProductsBySlug[slug];
}

export function getRelatedTextileProducts(product: TextileProduct, limit = 4) {
  const tokens = product.slug.split('-').filter(Boolean);

  return textileProducts
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => {
      const sharedTokens = candidate.slug.split('-').filter((token) => tokens.includes(token)).length;
      return { candidate, score: sharedTokens };
    })
    .sort((left, right) => right.score - left.score || left.candidate.order - right.candidate.order)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function resolveTextileImage(image: ProductImageAsset) {
  if (image.src.startsWith('/textile/')) {
    return image.src;
  }
  if (image.cloudinaryPublicId) {
    const cloudinaryUrl = getCloudinaryUrl(image.cloudinaryPublicId, {
      format: 'auto',
      quality: 'auto',
    });
    if (cloudinaryUrl) {
      return cloudinaryUrl;
    }
  }
  return image.src;
}

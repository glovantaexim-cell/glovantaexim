import { SITE_CONFIG } from '@/lib/constants';
import { generateSlug, getCloudinaryUrl } from '@/lib/utils';

export type SpiceFormValue = 'Whole' | 'Powder' | 'Blended' | 'Customized';

export interface ProductImageAsset {
  src: string;
  alt: string;
  cloudinaryPublicId: string;
  order: number;
  featured: boolean;
}

export interface SpiceProduct {
  title: string;
  slug: string;
  form: SpiceFormValue;
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

const spiceImages = (_slug: string, images: Array<{ file: string; alt: string; featured?: boolean }>): ProductImageAsset[] =>
  images.map((image, index) => ({
    src: `/spices/${image.file}`,
    alt: image.alt,
    cloudinaryPublicId: `spices/${image.file.replace(/\.[^.]+$/, '')}`,
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
    answer: 'Yes. We can support OEM and private label supply for importers, distributors, food manufacturers, and retail brands.',
  },
];

const buildProduct = (input: Omit<SpiceProduct, 'slug' | 'canonicalUrl' | 'faq'> & { slug?: string; faq?: SpiceProduct['faq'] }): SpiceProduct => {
  const slug = input.slug || generateSlug(input.title);

  return {
    ...input,
    slug,
    faq: input.faq || buildFaq(input.title),
    canonicalUrl: `${baseUrl}/products/spices/${slug}`,
  };
};

export const spicesCategory = {
  slug: 'spices',
  title: 'Spices',
  description:
    'Premium Indian spices in whole and powder forms for food manufacturers, importers, and private label buyers.',
  heroTitle: 'Enterprise-Grade Spices Export',
  heroDescription:
    'Bulk-ready Indian spices with export-quality packaging, customizable specifications, and international B2B support.',
};

export const spicesCategoryKeywords = [
  'indian spices',
  'whole spices',
  'spice powders',
  'bulk spice export',
  'private label spices',
];

const files = [
  'ajwain-seed.png',
  'black-mustard-seed.png',
  'coriander-powder.png',
  'coriander-seed.png',
  'cumin-powder.png',
  'cumin-seed.png',
  'fennel-seed.png',
  'fenugreek-seeds.png',
  'red-chilli-powder.png',
  'turmeric-finger.png',
  'turmeric-powder.png',
  'yellow-mustard-seed.png'
];

export const spicesProducts: SpiceProduct[] = files.map((file, i) => {
  const title = file.replace('.png', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const form = title.includes('Powder') ? 'Powder' : 'Whole';
  const productType = form === 'Powder' ? 'Spice Powder' : 'Whole Spice';
  return buildProduct({
    title,
    form: form as SpiceFormValue,
    productType,
    shortDescription: `Premium quality ${title.toLowerCase()} for culinary and industrial uses.`,
    description: `${title} is highly aromatic and used extensively in global cuisines and food manufacturing.`,
    overview: `${title} offers a unique flavor profile. Perfect for spice blends, ready-to-eat meals, and savory dishes.`,
    features: ['Premium export quality', 'Strong aroma', 'Natural color', 'Bulk supply available', 'Moisture controlled'],
    benefits: ['Improves flavor profile in dishes', 'Long shelf life', 'Supports private label and OEM procurement models'],
    applications: ['Food Industry', 'Spice Blends', 'Sauces', 'Ready To Eat', 'Food Manufacturers'],
    specifications: { 'Origin': 'India', 'Purity': '99%', 'Moisture': 'Max 10%', 'Shelf Life': '24 months', 'Processing Method': 'Cleaning, grading, and packing' },
    packaging: ['10 KG', '25 KG', '50 KG', 'PP Bag', 'Food Grade Bag', 'Customized Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2-4 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Australia', 'Germany', 'Singapore'],
    certifications: ['ISO 9001:2015', 'FSSAI', 'HACCP'],
    seoTitle: `${title} Exporter | Bulk ${title}`,
    seoDescription: `Bulk ${title.toLowerCase()} supplier offering export-quality spices and private label solutions.`,
    keywords: [`${title.toLowerCase()} exporter`, `bulk ${title.toLowerCase()}`, `indian ${title.toLowerCase()}`],
    aiSearchContent: `${title} is an export-grade spice for B2B buyers and food manufacturers. It supports bulk packaging, OEM supply, and consistent industrial quality.`,
    status: 'published',
    featured: i < 4,
    order: i + 1,
    imageGallery: spiceImages(title.toLowerCase().replace(/ /g, '-'), [{ file, alt: `${title} export product`, featured: true }]),
  });
});

export const spicesProductsBySlug = Object.fromEntries(
  spicesProducts.map((product) => [product.slug, product])
) as Record<string, SpiceProduct>;

export function getSpiceProduct(slug: string) {
  return spicesProductsBySlug[slug];
}

export function getRelatedSpiceProducts(product: SpiceProduct, limit = 4) {
  const tokens = product.slug.split('-').filter(Boolean);

  return spicesProducts
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => {
      const sharedTokens = candidate.slug.split('-').filter((token) => tokens.includes(token)).length;
      return { candidate, score: sharedTokens };
    })
    .sort((left, right) => right.score - left.score || left.candidate.order - right.candidate.order)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function resolveSpiceImage(image: ProductImageAsset) {
  if (image.src.startsWith('/spices/')) {
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

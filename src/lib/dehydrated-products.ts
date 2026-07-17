import { SITE_CONFIG } from '@/lib/constants';
import { generateSlug, getCloudinaryUrl } from '@/lib/utils';

export type ProductFormValue =
  | 'Powder'
  | 'Flakes'
  | 'Minced'
  | 'Granules'
  | 'Chopped'
  | 'Sliced'
  | 'Whole'
  | 'Customized';

export interface ProductImageAsset {
  src: string;
  alt: string;
  cloudinaryPublicId: string;
  order: number;
  featured: boolean;
}

export interface DehydratedProduct {
  title: string;
  slug: string;
  form: ProductFormValue;
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

const dehydratedImages = (_slug: string, images: Array<{ file: string; alt: string; featured?: boolean }>): ProductImageAsset[] =>
  images.map((image, index) => ({
    src: `/dehydrated/${image.file}`,
    alt: image.alt,
    cloudinaryPublicId: `dehydrated/${image.file.replace(/\.[^.]+$/, '')}`,
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

const buildProduct = (input: Omit<DehydratedProduct, 'slug' | 'canonicalUrl' | 'faq'> & { slug?: string; faq?: DehydratedProduct['faq'] }): DehydratedProduct => {
  const slug = input.slug || generateSlug(input.title);

  return {
    ...input,
    slug,
    faq: input.faq || buildFaq(input.title),
    canonicalUrl: `${baseUrl}/products/dehydrated/${slug}`,
  };
};

export const dehydratedCategory = {
  slug: 'dehydrated',
  title: 'Dehydrated Products',
  description:
    'Premium dehydrated vegetables, herbs, and powders for food manufacturers, importers, and private label buyers.',
  heroTitle: 'Enterprise-Grade Dehydrated Products',
  heroDescription:
    'Bulk-ready dehydrated products with export-quality packaging, customizable specifications, and international B2B support.',
};

export const dehydratedCategoryKeywords = [
  'dehydrated vegetables',
  'vegetable powders',
  'onion flakes',
  'garlic powder',
  'bulk dehydrated products',
  'private label export',
];

export const dehydratedProducts: DehydratedProduct[] = [
  buildProduct({
    title: 'Garlic Powder',
    form: 'Powder',
    productType: 'Dehydrated Garlic',
    shortDescription: 'Fine export-grade garlic powder for food processing and seasoning blends.',
    description:
      'A clean, aromatic garlic powder developed for global food manufacturers, instant foods, seasoning houses, and bulk ingredient buyers.',
    overview:
      'Garlic powder is processed from carefully selected garlic cloves, dehydrated under controlled conditions, and milled to a consistent fine texture. It is widely used in seasoning systems, ready-to-cook mixes, soups, sauces, snacks, and industrial food applications. The product is designed for export buyers who expect stable aroma, clean color, low moisture, and dependable batch consistency. Each shipment can be customized for powder mesh, packaging style, and documentation requirements.',
    features: [
      'Premium export quality',
      'Hygienically processed',
      'Rich aroma',
      'Natural color',
      'Moisture controlled',
      'Bulk supply available',
    ],
    benefits: [
      'Improves formulation consistency in industrial food production',
      'Reduces handling and preparation time for manufacturers',
      'Offers stable flavor profile for repeated batch production',
      'Supports private label and OEM procurement models',
    ],
    applications: ['Food Industry', 'Sauces', 'Spice Blends', 'Ready To Eat', 'Snacks', 'Food Manufacturers'],
    specifications: {
      'Botanical Name': 'Allium sativum',
      'Product Type': 'Dehydrated Garlic Powder',
      Form: 'Powder',
      Appearance: 'Fine free-flowing powder',
      Color: 'Off-white to pale cream',
      Aroma: 'Strong natural garlic aroma',
      Taste: 'Characteristic garlic flavor',
      Moisture: 'Controlled as per export requirement',
      Purity: 'As per agreed specification',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months depending on packaging',
      Storage: 'Store in a cool, dry place away from sunlight',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', '50 KG', 'PP Bag', 'HDPE Bag', 'Food Grade Bag', 'OEM Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks depending on order volume',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Germany', 'France', 'Australia'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Garlic Powder Exporter | Bulk Dehydrated Garlic Powder',
    seoDescription: 'Bulk garlic powder supplier offering export-quality dehydrated garlic powder, OEM packaging, and private label solutions.',
    keywords: ['garlic powder exporter', 'dehydrated garlic powder', 'bulk garlic powder'],
    aiSearchContent:
      'Garlic Powder is an export-grade dehydrated garlic ingredient for B2B buyers, food manufacturers, seasoning brands, and private label programs. It supports bulk packaging, OEM supply, and consistent industrial quality.',
    status: 'published',
    featured: true,
    order: 1,
    imageGallery: dehydratedImages('garlic-powder', [
      { file: 'garlic-powder.png', alt: 'Garlic powder export product', featured: true },
      { file: 'dehydrated-garlic-flakes-and-minced.png', alt: 'Garlic flakes and minced export product' },
    ]),
  }),
  buildProduct({
    title: 'Garlic Flakes & Minced',
    slug: 'dehydrated-garlic-flakes-and-minced',
    form: 'Flakes & Minced',
    productType: 'Dehydrated Garlic',
    shortDescription: 'Combined garlic flakes and minced cuts for seasoning blends, sauces, instant foods, and bulk food production.',
    description:
      'Garlic flakes and minced cuts are developed for food manufacturers and ingredient buyers who need a versatile dehydrated garlic format with dependable batch consistency.',
    overview:
      'Garlic flakes and minced cuts deliver strong garlic aroma, flexible texture, and dependable storage stability for industrial food production. They are used in seasoning systems, sauces, ready meals, soups, spice blends, and foodservice applications. The product is processed to support export buyers who need clean color, low moisture, and reliable bulk supply.',
    features: [
      'Combined flakes and minced cuts',
      'Strong garlic aroma',
      'Export quality sorting',
      'Bulk packing options',
      'Private label support',
      'Stable shelf life',
    ],
    benefits: [
      'Suitable for recipes requiring garlic flakes or minced pieces',
      'Reduces handling of fresh garlic in production',
      'Improves seasoning consistency across batches',
      'Can be integrated into OEM and private label supply chains',
    ],
    applications: ['Food Industry', 'Sauces', 'Spice Blends', 'Ready To Eat', 'Snacks', 'Food Manufacturers'],
    specifications: {
      'Botanical Name': 'Allium sativum',
      'Product Type': 'Dehydrated Garlic',
      Form: 'Flakes & Minced',
      Appearance: 'Combined garlic flakes and minced profile',
      Color: 'Off-white to pale cream',
      Aroma: 'Strong natural garlic aroma',
      Taste: 'Characteristic garlic flavor',
      Moisture: 'Controlled as per export requirement',
      Purity: 'As per buyer specification',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months depending on packaging',
      Storage: 'Store in a cool, dry place away from sunlight',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, flaking, mincing, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', '50 KG', 'PP Bag', 'HDPE Bag', 'Food Grade Bag', 'OEM Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks depending on order volume',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Germany', 'France', 'Australia'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Garlic Flakes & Minced Exporter | Dehydrated Garlic',
    seoDescription: 'Bulk garlic flakes and minced cuts supplier offering export-quality dehydrated garlic for food manufacturers and seasoning brands.',
    keywords: ['garlic flakes', 'garlic minced', 'dehydrated garlic flakes and minced', 'bulk garlic ingredients'],
    aiSearchContent:
      'Garlic Flakes & Minced is an export-grade dehydrated garlic ingredient for B2B buyers, food manufacturers, seasoning brands, and private label programs. It supports bulk packaging, OEM supply, and consistent industrial quality.',
    status: 'published',
    featured: true,
    order: 1.5,
    imageGallery: dehydratedImages('dehydrated-garlic-flakes-and-minced', [
      { file: 'dehydrated-garlic-flakes-and-minced.png', alt: 'Garlic flakes and minced export product', featured: true },
    ]),
  }),
  buildProduct({
    title: 'Red Onion Flakes & Minced',
    form: 'Flakes & Minced',
    productType: 'Dehydrated Onion',
    shortDescription: 'Combined red onion flakes and minced cuts for soups, sauces, instant foods, and seasoning blends.',
    description:
      'Dehydrated red onion flakes and minced cuts are ideal for food manufacturers and ingredient buyers needing a stable onion profile with minimal preparation time.',
    overview:
      'Red onion flakes and minced cuts deliver dependable flavor, texture, and storage stability for industrial food production. They are used in ready meals, soup bases, sauces, spice blends, and commercial kitchens that require a consistent onion ingredient. The product is processed to preserve natural onion character while meeting export expectations for cleanliness, appearance, and shelf life.',
    features: [
      'Natural onion flavor in flakes and minced cuts',
      'Combined product image for both formats',
      'Controlled moisture',
      'Export quality sorting',
      'Bulk packing options',
      'Private label support',
      'Stable shelf life',
    ],
    benefits: [
      'Suitable for high-volume food production in both flakes and minced formats',
      'Reduces dependency on fresh onion handling',
      'Improves seasoning consistency across batches',
      'Can be integrated into OEM and private label supply chains',
    ],
    applications: ['Food Industry', 'Ready To Eat', 'Frozen Foods', 'Instant Foods', 'Sauces', 'Food Manufacturers'],
    specifications: {
      'Botanical Name': 'Allium cepa',
      'Product Type': 'Dehydrated Onion',
      Form: 'Flakes & Minced',
      Appearance: 'Combined flakes and minced cut profile',
      Color: 'Light cream to pale red',
      Aroma: 'Fresh onion aroma',
      Taste: 'Typical onion flavor',
      Moisture: 'Controlled as per buyer specification',
      Purity: 'As per export requirement',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months depending on packaging',
      Storage: 'Cool, dry, and hygienic storage conditions',
      Origin: 'India',
      'Processing Method': 'Cleaning, slicing, dehydration, flaking, mincing, and grading',
    },
    packaging: ['5 KG', '10 KG', '25 KG', '50 KG', 'Carton Box', 'PP Bag', 'HDPE Bag', 'Customized Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks depending on volume',
    exportMarkets: ['United States', 'Canada', 'United Kingdom', 'UAE', 'Singapore', 'South Africa'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Red Onion Flakes & Minced Exporter | Dehydrated Onion',
    seoDescription: 'Export-quality red onion flakes and minced cuts for bulk buyers, food manufacturers, and private label programs.',
    keywords: ['red onion flakes', 'red onion minced', 'dehydrated onion flakes and minced', 'bulk onion flakes'],
    aiSearchContent:
      'Red Onion Flakes & Minced are dehydrated onion ingredients for industrial food production, export buyers, sauce makers, and ready meal brands that need consistent onion flavor and dependable bulk supply in both cut styles.',
    status: 'published',
    featured: true,
    order: 2,
    imageGallery: dehydratedImages('dehydrated-red-onion-flakes-and-minced', [
      { file: 'dehydrated-red-onion-flakes-and-minced.png', alt: 'Red onion flakes and minced export product', featured: true },
    ]),
  }),
  buildProduct({
    title: 'White Onion Flakes & Minced',
    form: 'Flakes & Minced',
    productType: 'Dehydrated Onion',
    shortDescription: 'Combined white onion flakes and minced cuts for fast hydration, balanced flavor release, and broad application use.',
    description:
      'White onion flakes and minced cuts are suited for sauces, soups, seasonings, and industrial recipes where either a fine onion cut or a flake format is preferred for texture and hydration performance.',
    overview:
      'White onion flakes and minced cuts are processed for buyers who require dependable dehydrated onion formats with the natural onion profile and long shelf stability of dehydrated ingredients. They perform well in instant foods, seasoning mixes, frozen meals, sauces, and foodservice applications. The combined cut options support efficient hydration and uniform distribution through production batches.',
    features: [
      'Available in flakes and minced cuts',
      'Single combined product image',
      'Natural white onion profile',
      'Excellent hydration behavior in both formats',
      'Bulk export packaging',
      'Consistent particle size',
      'Customizable supply',
    ],
    benefits: [
      'Improves ingredient dispersion in processed foods',
      'Suitable for recipes requiring flakes or a finer onion texture',
      'Supports export and OEM procurement programs',
      'Reduces sourcing complexity for industrial buyers',
    ],
    applications: ['Food Industry', 'Sauces', 'Ready To Eat', 'Instant Foods', 'Food Manufacturers', 'Spice Blends'],
    specifications: {
      'Botanical Name': 'Allium cepa',
      'Product Type': 'Dehydrated Onion',
      Form: 'Flakes & Minced',
      Appearance: 'Combined flakes and minced pieces',
      Color: 'Pale cream',
      Aroma: 'Natural onion aroma',
      Taste: 'Mild onion flavor',
      Moisture: 'Controlled as per buyer requirement',
      Purity: 'As per export standard',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months depending on packaging',
      Storage: 'Store in a dry and cool environment',
      Origin: 'India',
      'Processing Method': 'Cleaning, slicing, dehydration, flaking, mincing, and grading',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', '50 KG', 'Food Grade Bag', 'Carton Box', 'Private Label Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks depending on order size',
    exportMarkets: ['United States', 'United Kingdom', 'Germany', 'UAE', 'Australia', 'Japan'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'White Onion Flakes & Minced Supplier | Dehydrated Onion Export',
    seoDescription: 'Bulk white onion flakes and minced cuts for export buyers, seasoning companies, and food manufacturers.',
    keywords: ['white onion flakes', 'white onion minced', 'dehydrated onion flakes and minced', 'bulk onion supply'],
    aiSearchContent:
      'White Onion Flakes & Minced are dehydrated onion ingredients designed for B2B buyers needing export-quality packaging and consistent flavor for food manufacturing in both cut styles.',
    status: 'published',
    featured: true,
    order: 3,
    imageGallery: dehydratedImages('dehydrated-white-onion-flakes-and-minced', [
      { file: 'dehydrated-white-onion-flakes-and-minced.png', alt: 'White onion flakes and minced export product', featured: true },
    ]),
  }),
  buildProduct({
    title: 'Red & White Onion Powder',
    slug: 'onion-red-and-white-powder',
    form: 'Powder',
    productType: 'Dehydrated Onion',
    shortDescription: 'Combined red and white onion powder for seasoning blends, soups, sauces, and industrial food production.',
    description:
      'Red and white onion powder is developed for buyers who need a versatile dehydrated onion ingredient with broad flavor application and export-ready consistency.',
    overview:
      'Red and white onion powder delivers a balanced onion profile for seasoning systems, soup bases, sauces, instant mixes, and bulk food manufacturing. The powder is processed to support stable aroma, clean color, low moisture, and dependable batch consistency. It is suitable for B2B buyers, importers, and food manufacturers that need a single onion powder product with flexible use across formulations.',
    features: [
      'Combined red and white onion profile',
      'Fine powder texture',
      'Export-quality consistency',
      'Bulk supply available',
      'Private label support',
      'Moisture controlled',
    ],
    benefits: [
      'Works across a wide range of seasoning and food applications',
      'Supports consistent flavor release in processed foods',
      'Reduces fresh onion handling for manufacturers',
      'Suitable for OEM and private label supply chains',
    ],
    applications: ['Food Industry', 'Sauces', 'Soup Bases', 'Instant Foods', 'Spice Blends', 'Food Manufacturers'],
    specifications: {
      'Botanical Name': 'Allium cepa',
      'Product Type': 'Dehydrated Onion Powder',
      Form: 'Powder',
      Appearance: 'Fine free-flowing onion powder',
      Color: 'Light cream to pale onion tone',
      Aroma: 'Natural onion aroma',
      Taste: 'Typical onion flavor',
      Moisture: 'Controlled as per buyer requirement',
      Purity: 'As per export standard',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months depending on packaging',
      Storage: 'Store in a cool, dry, and airtight environment',
      Origin: 'India',
      'Processing Method': 'Cleaning, slicing, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', '50 KG', 'PP Bag', 'HDPE Bag', 'Customized Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks depending on order volume',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Germany', 'France', 'Australia'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Red & White Onion Powder Exporter | Dehydrated Onion Powder',
    seoDescription: 'Bulk red and white onion powder supplier offering export-quality dehydrated onion powder for food manufacturers and seasoning brands.',
    keywords: ['red onion powder', 'white onion powder', 'dehydrated onion powder', 'bulk onion powder'],
    aiSearchContent:
      'Red & White Onion Powder is an export-grade dehydrated onion ingredient for B2B buyers, food manufacturers, seasoning brands, and private label programs. It supports bulk packaging, OEM supply, and consistent industrial quality.',
    status: 'published',
    featured: true,
    order: 3.5,
    imageGallery: dehydratedImages('onion-red-and-white-powder', [
      { file: 'onion-red-and-white-powder.png', alt: 'Red and white onion powder export product', featured: true },
    ]),
  }),
  buildProduct({
    title: 'Tomato Powder',
    form: 'Powder',
    productType: 'Dehydrated Tomato',
    shortDescription: 'Bright tomato powder for soup bases, seasoning mixes, sauces, and instant food formulations.',
    description:
      'Tomato powder is produced for food manufacturers, spice houses, and importers seeking a consistent tomato ingredient with strong color and stable shelf life.',
    overview:
      'Tomato powder serves as a versatile ingredient in processed foods, seasoning systems, and ready-to-cook products. It provides color, flavor, and formulation convenience for industrial recipes. The powder is processed to support export requirements including low moisture, stable aroma, and clean packaging for bulk distribution.',
    features: [
      'Natural tomato color',
      'Export-grade consistency',
      'Fine powder texture',
      'Moisture controlled',
      'Suitable for industrial use',
      'Bulk and OEM supply',
    ],
    benefits: [
      'Helps maintain flavor consistency in recipes',
      'Improves formulation efficiency for manufacturers',
      'Supports sauces, soups, and snack seasoning applications',
      'Available for private label and customized export programs',
    ],
    applications: ['Food Industry', 'Sauces', 'Instant Foods', 'Ready To Eat', 'Food Manufacturers', 'Snacks'],
    specifications: {
      'Botanical Name': 'Solanum lycopersicum',
      'Product Type': 'Dehydrated Tomato Powder',
      Form: 'Powder',
      Appearance: 'Fine, free-flowing powder',
      Color: 'Red to deep red',
      Aroma: 'Characteristic tomato aroma',
      Taste: 'Natural tomato taste',
      Moisture: 'Controlled as per export requirement',
      Purity: 'As per buyer specification',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months depending on packaging',
      Storage: 'Store in cool, dry, airtight packaging',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', '50 KG', 'PP Bag', 'Carton Box', 'Private Label Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks depending on quantity',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'France', 'Germany', 'Singapore'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Tomato Powder Exporter | Bulk Dehydrated Tomato Powder',
    seoDescription: 'Bulk tomato powder supplier for export buyers, food manufacturers, and seasoning brands.',
    keywords: ['tomato powder', 'dehydrated tomato powder', 'bulk tomato powder'],
    aiSearchContent:
      'Tomato Powder is an export-ready dehydrated ingredient for sauces, soups, seasoning mixes, and industrial food production with customizable packaging and B2B supply terms.',
    status: 'published',
    featured: true,
    order: 4,
    imageGallery: dehydratedImages('tomato-powder', [
      { file: 'Tomato-powder.png', alt: 'Tomato powder export product', featured: true },
      { file: 'dehydrated-tomato-flakes-and-minced.png', alt: 'Dehydrated tomato flakes and minced product' },
    ]),
  }),
  buildProduct({
    title: 'Tomato Flakes & Minced',
    slug: 'dehydrated-tomato-flakes-and-minced',
    form: 'Flakes & Minced',
    productType: 'Dehydrated Tomato',
    shortDescription: 'Combined tomato flakes and minced cuts for sauces, soups, seasoning blends, and food manufacturing.',
    description:
      'Tomato flakes and minced cuts are designed for buyers who need a versatile dehydrated tomato ingredient with export-ready consistency and flexible applications.',
    overview:
      'Tomato flakes and minced cuts provide strong color, balanced flavor, and dependable storage stability for industrial food production. They are used in soups, sauces, ready meals, seasoning systems, and bulk food manufacturing. The product is processed to support stable moisture, clean appearance, and reliable batch consistency for export buyers.',
    features: [
      'Combined flakes and minced cuts',
      'Natural tomato color',
      'Export-grade consistency',
      'Bulk and OEM supply',
      'Private label support',
      'Moisture controlled',
    ],
    benefits: [
      'Useful across sauces, soups, and seasoning formulations',
      'Improves production efficiency for manufacturers',
      'Supports consistent color and flavor release',
      'Suitable for private label and export procurement programs',
    ],
    applications: ['Food Industry', 'Sauces', 'Instant Foods', 'Ready To Eat', 'Food Manufacturers', 'Snacks'],
    specifications: {
      'Botanical Name': 'Solanum lycopersicum',
      'Product Type': 'Dehydrated Tomato',
      Form: 'Flakes & Minced',
      Appearance: 'Combined tomato flakes and minced profile',
      Color: 'Red to deep red',
      Aroma: 'Characteristic tomato aroma',
      Taste: 'Natural tomato taste',
      Moisture: 'Controlled as per export requirement',
      Purity: 'As per buyer specification',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months depending on packaging',
      Storage: 'Store in cool, dry, airtight packaging',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, flaking, mincing, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', '50 KG', 'PP Bag', 'Carton Box', 'Private Label Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks depending on quantity',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'France', 'Germany', 'Singapore'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Tomato Flakes & Minced Exporter | Dehydrated Tomato',
    seoDescription: 'Bulk tomato flakes and minced cuts supplier offering export-quality dehydrated tomato for food manufacturers and seasoning brands.',
    keywords: ['tomato flakes', 'tomato minced', 'dehydrated tomato flakes and minced', 'bulk tomato ingredients'],
    aiSearchContent:
      'Tomato Flakes & Minced is an export-grade dehydrated tomato ingredient for B2B buyers, food manufacturers, seasoning brands, and private label programs. It supports bulk packaging, OEM supply, and consistent industrial quality.',
    status: 'published',
    featured: true,
    order: 4.5,
    imageGallery: dehydratedImages('dehydrated-tomato-flakes-and-minced', [
      { file: 'dehydrated-tomato-flakes-and-minced.png', alt: 'Dehydrated tomato flakes and minced product', featured: true },
    ]),
  }),
  buildProduct({
    title: 'Ginger Powder',
    form: 'Powder',
    productType: 'Dehydrated Ginger',
    shortDescription: 'Aromatic ginger powder suitable for beverages, seasoning blends, and food formulations.',
    description:
      'Ginger powder is offered for B2B buyers requiring a dependable dehydrated ginger ingredient for beverages, sauces, health foods, and spice blends.',
    overview:
      'This ginger powder is designed for buyers seeking aroma, blend stability, and export-quality consistency. It is used in food manufacturing, wellness formulations, beverage mixes, and seasoning systems. The product is processed to maintain natural ginger characteristics while supporting bulk packaging, export documentation, and private label requirements.',
    features: ['Rich aroma', 'Natural flavor', 'Moisture controlled', 'Bulk supply', 'OEM friendly', 'Export quality'],
    benefits: ['Supports consistent formulation', 'Reduces fresh-ingredient handling', 'Works in beverage and food applications', 'Suitable for private label export'],
    applications: ['Food Industry', 'Instant Foods', 'Sauces', 'Food Manufacturers', 'Beverages', 'Spice Blends'],
    specifications: {
      'Botanical Name': 'Zingiber officinale',
      'Product Type': 'Dehydrated Ginger Powder',
      Form: 'Powder',
      Appearance: 'Fine beige powder',
      Color: 'Light cream to beige',
      Aroma: 'Strong ginger aroma',
      Taste: 'Warm ginger taste',
      Moisture: 'Controlled as per buyer specification',
      Purity: 'As per export requirement',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months',
      Storage: 'Cool, dry, airtight storage',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', '50 KG', 'HDPE Bag', 'Food Grade Bag', 'Customized Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Australia', 'Germany', 'Canada'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Ginger Powder Exporter | Dehydrated Ginger Powder',
    seoDescription: 'Bulk ginger powder for export buyers, food manufacturers, and seasoning companies.',
    keywords: ['ginger powder', 'dehydrated ginger powder', 'bulk ginger powder'],
    aiSearchContent:
      'Ginger Powder is an export-grade dehydrated ingredient used by food manufacturers, beverage makers, and seasoning companies needing dependable aroma and bulk supply.',
    status: 'published',
    featured: false,
    order: 5,
    imageGallery: dehydratedImages('ginger-powder', [{ file: 'ginger-powder.png', alt: 'Ginger powder export product', featured: true }]),
  }),
  buildProduct({
    title: 'Beetroot Powder',
    form: 'Powder',
    productType: 'Dehydrated Vegetable Powder',
    shortDescription: 'Natural beetroot powder for color, nutrition, beverages, and functional food products.',
    description:
      'Beetroot powder supports clean-label beverage, bakery, seasoning, and functional food formulations that need color and ingredient stability.',
    overview:
      'Beetroot powder is dehydrated and milled for B2B buyers seeking a natural ingredient with visual appeal and formulation flexibility. It is used in snacks, bakery products, instant mixes, health foods, and beverage applications. The ingredient is suited to exporters, importers, and food brands looking for dependable color and consistent bulk supply.',
    features: ['Natural color', 'Functional ingredient', 'Clean-label friendly', 'Bulk supply', 'Moisture controlled', 'Export quality'],
    benefits: ['Adds color and ingredient value', 'Supports health-focused product lines', 'Suitable for OEM packaging', 'Easy to store and handle'],
    applications: ['Food Industry', 'Beverages', 'Snacks', 'Ready To Eat', 'Food Manufacturers', 'Bakery'],
    specifications: {
      'Botanical Name': 'Beta vulgaris',
      'Product Type': 'Dehydrated Beetroot Powder',
      Form: 'Powder',
      Appearance: 'Fine powder',
      Color: 'Deep red-purple',
      Aroma: 'Natural beetroot aroma',
      Taste: 'Earthy and naturally sweet',
      Moisture: 'Controlled as per specification',
      Purity: 'As per export requirement',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months',
      Storage: 'Cool, dry, and sealed packaging',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', 'Food Grade Bag', 'Carton Box', 'Private Label Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'Germany', 'UAE', 'Australia', 'Singapore'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Beetroot Powder Supplier | Bulk Dehydrated Beetroot Powder',
    seoDescription: 'Bulk beetroot powder for export buyers, food manufacturers, and clean-label product lines.',
    keywords: ['beetroot powder', 'dehydrated beetroot powder', 'bulk vegetable powder'],
    aiSearchContent:
      'Beetroot Powder is a natural dehydrated vegetable ingredient for beverages, bakery, snacks, and functional foods with export-ready packaging and private label support.',
    status: 'published',
    featured: false,
    order: 6,
    imageGallery: dehydratedImages('beet-root-powder', [{ file: 'beet-root-powder.png', alt: 'Beetroot powder export product', featured: true }]),
  }),
  buildProduct({
    title: 'Amla Powder',
    form: 'Powder',
    productType: 'Dehydrated Herbal Powder',
    shortDescription: 'Tangy amla powder for nutraceutical, wellness, and functional food applications.',
    description:
      'Amla powder is offered for B2B buyers requiring a natural herbal ingredient for beverages, supplements, and clean-label formulations.',
    overview:
      'Amla powder is dehydrated and milled from selected amla fruit for export buyers in wellness, nutraceutical, and food sectors. It supports ingredient programs that require natural acidity, stable bulk handling, and export packaging. The product can be tailored for moisture, mesh, and packaging format depending on buyer requirements.',
    features: ['Natural herbal ingredient', 'Export quality', 'Bulk supply', 'Moisture controlled', 'Custom packaging', 'Private label ready'],
    benefits: ['Supports wellness product lines', 'Adds a natural fruit profile', 'Useful for powder blends', 'Stable for international shipping'],
    applications: ['Food Industry', 'Beverages', 'Health Foods', 'Food Manufacturers', 'Nutraceuticals', 'Instant Foods'],
    specifications: {
      'Botanical Name': 'Phyllanthus emblica',
      'Product Type': 'Dehydrated Amla Powder',
      Form: 'Powder',
      Appearance: 'Fine herbal powder',
      Color: 'Light brown to greenish brown',
      Aroma: 'Natural amla aroma',
      Taste: 'Tangy and astringent',
      Moisture: 'Controlled as per specification',
      Purity: 'As per export requirement',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months',
      Storage: 'Store in cool, dry conditions',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', '50 KG', 'PP Bag', 'HDPE Bag', 'Customized Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Australia', 'Germany', 'Canada'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Amla Powder Exporter | Bulk Dehydrated Amla Powder',
    seoDescription: 'Bulk amla powder supplier for wellness brands, food manufacturers, and export buyers.',
    keywords: ['amla powder', 'dehydrated amla powder', 'bulk herbal powder'],
    aiSearchContent:
      'Amla Powder is an export-ready herbal ingredient for nutraceutical, wellness, and food applications with customizable packaging and B2B supply support.',
    status: 'published',
    featured: false,
    order: 7,
    imageGallery: dehydratedImages('amla-powder', [{ file: 'amla-powder.png', alt: 'Amla powder export product', featured: true }]),
  }),
  buildProduct({
    title: 'Moringa Powder',
    form: 'Powder',
    productType: 'Dehydrated Herbal Powder',
    shortDescription: 'Nutrient-focused moringa powder for wellness, beverages, and functional food formulations.',
    description:
      'Moringa powder is developed for export buyers needing a clean-label herbal ingredient with strong nutritional positioning and stable bulk supply.',
    overview:
      'Moringa powder is suitable for health-focused product lines, supplements, beverage blends, and food applications. It is processed to retain natural character while supporting the handling, packing, and quality needs of international buyers. The product can be customized by mesh, packaging, and order volume for OEM or private label procurement.',
    features: ['Clean-label ingredient', 'Bulk export support', 'Natural herbal profile', 'OEM friendly', 'Moisture controlled', 'Private label ready'],
    benefits: ['Supports wellness marketing claims', 'Works in powder blends and beverages', 'Easy to store and transport', 'Available for custom packaging'],
    applications: ['Food Industry', 'Beverages', 'Health Foods', 'Nutraceuticals', 'Food Manufacturers', 'Instant Foods'],
    specifications: {
      'Botanical Name': 'Moringa oleifera',
      'Product Type': 'Dehydrated Moringa Powder',
      Form: 'Powder',
      Appearance: 'Fine green powder',
      Color: 'Green',
      Aroma: 'Natural leafy aroma',
      Taste: 'Mild herbal taste',
      Moisture: 'Controlled as per buyer requirement',
      Purity: 'As per export requirement',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months',
      Storage: 'Cool and dry sealed storage',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', 'Food Grade Bag', 'Carton Box', 'Private Label Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Germany', 'Singapore', 'Australia'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Moringa Powder Supplier | Bulk Dehydrated Moringa Powder',
    seoDescription: 'Bulk moringa powder for export buyers, wellness brands, and nutraceutical manufacturers.',
    keywords: ['moringa powder', 'dehydrated moringa powder', 'bulk herbal ingredient'],
    aiSearchContent:
      'Moringa Powder is a clean-label dehydrated herbal ingredient for wellness, beverage, and functional food brands that need bulk export packaging and OEM support.',
    status: 'published',
    featured: false,
    order: 8,
    imageGallery: dehydratedImages('moringa-powder', [{ file: 'moringa-powder.png', alt: 'Moringa powder export product', featured: true }]),
  }),
  buildProduct({
    title: 'Neem Powder',
    form: 'Powder',
    productType: 'Dehydrated Herbal Powder',
    shortDescription: 'Neem powder for wellness, herbal formulations, and natural product manufacturers.',
    description:
      'Neem powder is processed for customers seeking a natural herbal ingredient for wellness, cosmetic, and functional food applications.',
    overview:
      'Neem powder is suitable for herbal product manufacturers, private label brands, and exporters seeking natural ingredient sourcing. It is dried and milled under controlled conditions to support consistency, cleanliness, and bulk handling. The product can be customized to meet exact buyer needs for packaging, order size, and export documentation.',
    features: ['Natural herbal ingredient', 'Export quality', 'Bulk packaging', 'Private label ready', 'Moisture controlled', 'OEM friendly'],
    benefits: ['Supports herbal product formulations', 'Useful for bulk procurement', 'Stable for international transport', 'Can be packed for private label lines'],
    applications: ['Health Foods', 'Nutraceuticals', 'Food Manufacturers', 'Herbal Formulations', 'Private Label'],
    specifications: {
      'Botanical Name': 'Azadirachta indica',
      'Product Type': 'Dehydrated Neem Powder',
      Form: 'Powder',
      Appearance: 'Fine herbal powder',
      Color: 'Greenish brown',
      Aroma: 'Characteristic neem aroma',
      Taste: 'Bitter herbal taste',
      Moisture: 'Controlled as per export requirement',
      Purity: 'As per specification',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months',
      Storage: 'Store in cool, dry, sealed packaging',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', 'HDPE Bag', 'Carton Box', 'Private Label Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Germany', 'Australia', 'Canada'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Neem Powder Exporter | Bulk Dehydrated Neem Powder',
    seoDescription: 'Bulk neem powder for export buyers, herbal brands, and private label manufacturers.',
    keywords: ['neem powder', 'dehydrated neem powder', 'bulk herbal powder'],
    aiSearchContent:
      'Neem Powder is a dehydrated herbal ingredient for wellness and natural product manufacturers with export-ready packaging and private label support.',
    status: 'published',
    featured: false,
    order: 9,
    imageGallery: dehydratedImages('neem-powder', [{ file: 'neem-powder.png', alt: 'Neem powder export product', featured: true }]),
  }),
  buildProduct({
    title: 'Mint Powder',
    slug: 'mint-powder',
    form: 'Powder',
    productType: 'Dehydrated Herbal Powder',
    shortDescription: 'Refreshing mint powder for sauces, seasoning blends, snacks, and herbal applications.',
    description:
      'Mint powder is prepared for B2B buyers looking for a clean, aromatic herbal ingredient for export-grade seasoning and food formulations.',
    overview:
      'Mint powder offers a fresh herbal profile for manufacturers building sauces, snacks, seasoning systems, and wellness-oriented blends. It is processed with a focus on aroma retention, hygiene, and export packaging. The ingredient is available in bulk and can be tailored for private label, OEM, and distributor supply chains.',
    features: ['Fresh aroma', 'Bulk supply', 'Export quality', 'Private label friendly', 'Moisture controlled', 'Natural color'],
    benefits: ['Enhances product freshness perception', 'Works across food and herbal applications', 'Easy to pack and ship in bulk', 'Supports OEM export programs'],
    applications: ['Food Industry', 'Sauces', 'Snacks', 'Spice Blends', 'Food Manufacturers', 'Herbal Formulations'],
    specifications: {
      'Botanical Name': 'Mentha spicata',
      'Product Type': 'Dehydrated Mint Powder',
      Form: 'Powder',
      Appearance: 'Fine green powder',
      Color: 'Green',
      Aroma: 'Fresh mint aroma',
      Taste: 'Cooling herbal taste',
      Moisture: 'Controlled as per requirement',
      Purity: 'As per export standard',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months',
      Storage: 'Store in cool and dry conditions',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', 'Food Grade Bag', 'Carton Box', 'Customized Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Germany', 'Australia', 'Singapore'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Mint Powder Exporter | Bulk Dehydrated Mint Powder',
    seoDescription: 'Bulk mint powder for export buyers, seasoning brands, and herbal product developers.',
    keywords: ['mint powder', 'dehydrated mint powder', 'bulk herbal ingredient'],
    aiSearchContent:
      'Mint Powder is a dehydrated herbal ingredient for seasoning, sauces, snacks, and herbal blends with export-ready packaging and OEM support.',
    status: 'published',
    featured: false,
    order: 10,
    imageGallery: dehydratedImages('meant-powder', [{ file: 'meant-powder.png', alt: 'Mint powder export product', featured: true }]),
  }),
  buildProduct({
    title: 'Tulsi Powder',
    form: 'Powder',
    productType: 'Dehydrated Herbal Powder',
    shortDescription: 'Tulsi powder for wellness formulations, herbal blends, and export buyers.',
    description:
      'Tulsi powder is a natural herbal ingredient supplied to wellness brands and food manufacturers seeking stable bulk procurement.',
    overview:
      'Tulsi powder is processed for export buyers in herbal, wellness, and functional food sectors. It offers a natural herbal profile and is suitable for products requiring dependable ingredient sourcing, bulk packaging, and private label flexibility. The ingredient can be aligned with buyer specs for moisture, packaging, and order size.',
    features: ['Herbal ingredient', 'Export quality', 'Bulk supply', 'OEM support', 'Private label friendly', 'Moisture controlled'],
    benefits: ['Works in wellness formulations', 'Suitable for international sourcing', 'Supports private label packaging', 'Stable for long-distance shipping'],
    applications: ['Health Foods', 'Nutraceuticals', 'Food Manufacturers', 'Herbal Formulations'],
    specifications: {
      'Botanical Name': 'Ocimum tenuiflorum',
      'Product Type': 'Dehydrated Tulsi Powder',
      Form: 'Powder',
      Appearance: 'Fine green powder',
      Color: 'Green',
      Aroma: 'Fresh herbal aroma',
      Taste: 'Mild herbal and slightly peppery',
      Moisture: 'Controlled as per specification',
      Purity: 'As per export requirement',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months',
      Storage: 'Store in a cool and dry environment',
      Origin: 'India',
      'Processing Method': 'Cleaning, dehydration, milling, and sieving',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', 'HDPE Bag', 'Carton Box', 'Private Label Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Australia', 'Germany', 'Canada'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Tulsi Powder Exporter | Bulk Dehydrated Tulsi Powder',
    seoDescription: 'Bulk tulsi powder for export buyers, herbal brands, and nutraceutical manufacturers.',
    keywords: ['tulsi powder', 'dehydrated tulsi powder', 'bulk herbal powder'],
    aiSearchContent:
      'Tulsi Powder is an export-ready herbal ingredient for wellness, nutraceutical, and natural product manufacturers with private label and bulk packaging options.',
    status: 'published',
    featured: false,
    order: 11,
    imageGallery: dehydratedImages('tulsi-powder', [{ file: 'tulsi-powder.png', alt: 'Tulsi powder export product', featured: true }]),
  }),
  buildProduct({
    title: 'Dehydrated Potato Flakes & Minced',
    slug: 'dehydrated-potato-flakes',
    form: 'Flakes & Minced',
    productType: 'Dehydrated Vegetable',
    shortDescription: 'Bulk dehydrated potato flakes and minced cuts for instant foods, snack mixes, and food manufacturing.',
    description:
      'Potato flakes and minced cuts are used by food manufacturers and instant food brands to create consistent product formulations with fast hydration and reliable texture.',
    overview:
      'Dehydrated potato flakes and minced cuts are staple ingredients for industrial food production. They support instant mash products, snack bases, soups, and ready-to-cook formulations. The product is processed for uniformity, moisture stability, and export-level handling. Buyers can request custom packaging, bulk ordering, and product documentation for global trade.',
    features: ['Fast hydration', 'Uniform flakes', 'Bulk supply', 'Export quality', 'Private label support', 'Moisture controlled'],
    benefits: ['Ideal for instant food systems', 'Reduces production complexity', 'Works well in snack and soup applications', 'Suitable for OEM procurement'],
    applications: ['Food Industry', 'Instant Foods', 'Snacks', 'Ready To Eat', 'Food Manufacturers'],
    specifications: {
      'Botanical Name': 'Solanum tuberosum',
      'Product Type': 'Dehydrated Potato Flakes',
      Form: 'Flakes & Minced',
      Appearance: 'Combined light flakes and minced cut profile',
      Color: 'Pale cream',
      Aroma: 'Natural potato aroma',
      Taste: 'Mild potato flavor',
      Moisture: 'Controlled as per export requirement',
      Purity: 'As per specification',
      'Foreign Matter': 'Negligible',
      'Shelf Life': '12 to 18 months',
      Storage: 'Store in a cool, dry, airtight pack',
      Origin: 'India',
      'Processing Method': 'Cleaning, cooking, dehydration, flaking, mincing, and grading',
    },
    packaging: ['1 KG', '5 KG', '10 KG', '25 KG', '50 KG', 'PP Bag', 'Food Grade Bag', 'Customized Packaging'],
    packagingNote: 'Packaging can be customized according to customer requirements.',
    moq: '500 KG',
    leadTime: '2 to 4 weeks',
    exportMarkets: ['United States', 'United Kingdom', 'UAE', 'Germany', 'Australia', 'Japan'],
    certifications: ['ISO 9001:2015', 'HACCP', 'FSSAI'],
    seoTitle: 'Dehydrated Potato Flakes & Minced Supplier | Bulk Export',
    seoDescription: 'Bulk dehydrated potato flakes and minced cuts for food manufacturers, instant foods, and snack brands.',
    keywords: ['potato flakes', 'potato minced', 'dehydrated potato flakes and minced', 'bulk potato ingredients'],
    aiSearchContent:
      'Dehydrated Potato Flakes & Minced are industrial food ingredients for instant meals, snack systems, and bulk B2B procurement with export packaging and private label support.',
    status: 'published',
    featured: false,
    order: 12,
    imageGallery: dehydratedImages('dehydrated-potato-flakes-and-minced', [
      { file: 'dehydrated-potato-flakes-and-minced.png', alt: 'Dehydrated potato flakes and minced export product', featured: true },
    ]),
  }),
];

export const dehydratedProductsBySlug = Object.fromEntries(
  dehydratedProducts.map((product) => [product.slug, product])
) as Record<string, DehydratedProduct>;

export function getDehydratedProduct(slug: string) {
  return dehydratedProductsBySlug[slug];
}

export function getRelatedDehydratedProducts(product: DehydratedProduct, limit = 4) {
  const tokens = product.slug.split('-').filter(Boolean);

  return dehydratedProducts
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => {
      const sharedTokens = candidate.slug.split('-').filter((token) => tokens.includes(token)).length;
      return { candidate, score: sharedTokens };
    })
    .sort((left, right) => right.score - left.score || left.candidate.order - right.candidate.order)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function resolveDehydratedImage(image: ProductImageAsset) {
  // Static catalog images live in /public/dehydrated — serve them locally.
  if (image.src.startsWith('/dehydrated/')) {
    return image.src;
  }

  // Admin-uploaded images use Cloudinary CDN.
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

import { pgTable, text, timestamp, integer, boolean, json, varchar, serial, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('editor'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  image: text('image'),
  seoTitle: varchar('seo_title', { length: 255 }),
  metaDescription: text('meta_description'),
  keywords: text('keywords'),
  ogImage: text('og_image'),
  faq: json('faq').$type<{ question: string; answer: string }[]>(),
  featured: boolean('featured').default(false),
  status: varchar('status', { length: 20 }).notNull().default('published'),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  shortDescription: text('short_description'),
  fullDescription: text('full_description'),
  form: varchar('form', { length: 100 }),
  productType: varchar('product_type', { length: 150 }),
  categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  images: json('images').$type<string[]>(),
  benefits: json('benefits').$type<string[]>(),
  applications: json('applications').$type<string[]>(),
  packagingOptions: json('packaging_options').$type<string[]>(),
  aiSearchContent: text('ai_search_content'),
  canonicalUrl: text('canonical_url'),
  metaRobots: varchar('meta_robots', { length: 255 }),
  twitterCard: varchar('twitter_card', { length: 50 }),
  moq: varchar('moq', { length: 100 }),
  leadTime: varchar('lead_time', { length: 100 }),
  seoTitle: varchar('seo_title', { length: 255 }),
  metaDescription: text('meta_description'),
  keywords: text('keywords'),
  ogImage: text('og_image'),
  specifications: json('specifications').$type<Record<string, string>>(),
  packagingDetails: text('packaging_details'),
  exportMarkets: json('export_markets').$type<string[]>(),
  faq: json('faq').$type<{ question: string; answer: string }[]>(),
  relatedProducts: json('related_products').$type<number[]>(),
  featured: boolean('featured').default(false),
  status: varchar('status', { length: 20 }).notNull().default('published'),
  order: integer('order').default(0),
  publishedAt: timestamp('published_at'),
  archivedAt: timestamp('archived_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const productImages = pgTable('product_images', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  url: text('url').notNull(),
  cloudinaryId: varchar('cloudinary_id', { length: 255 }),
  alt: text('alt').notNull(),
  displayOrder: integer('display_order').default(0),
  featured: boolean('featured').default(false),
  width: integer('width'),
  height: integer('height'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  productIdx: index('product_images_product_id_idx').on(table.productId),
  featuredIdx: index('product_images_featured_idx').on(table.featured),
}));

export const productFaqs = pgTable('product_faqs', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  productIdx: index('product_faqs_product_id_idx').on(table.productId),
}));

export const productSpecifications = pgTable('product_specifications', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  label: varchar('label', { length: 255 }).notNull(),
  value: text('value').notNull(),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  productIdx: index('product_specifications_product_id_idx').on(table.productId),
}));

export const productPackaging = pgTable('product_packaging', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  productIdx: index('product_packaging_product_id_idx').on(table.productId),
}));

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  author: varchar('author', { length: 255 }).notNull(),
  authorBio: text('author_bio'),
  category: varchar('category', { length: 100 }),
  tags: json('tags').$type<string[]>(),
  featuredImage: text('featured_image'),
  seoTitle: varchar('seo_title', { length: 255 }),
  metaDescription: text('meta_description'),
  keywords: text('keywords'),
  ogImage: text('og_image'),
  canonicalUrl: text('canonical_url'),
  readingTime: integer('reading_time'),
  faq: json('faq').$type<{ question: string; answer: string }[]>(),
  relatedArticles: json('related_articles').$type<number[]>(),
  publishDate: timestamp('publish_date').defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('published'),
  views: integer('views').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  companyName: varchar('company_name', { length: 255 }),
  country: varchar('country', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  whatsapp: varchar('whatsapp', { length: 50 }),
  productInterest: varchar('product_interest', { length: 255 }),
  quantity: varchar('quantity', { length: 100 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('new'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
});

export const seoSettings = pgTable('seo_settings', {
  id: serial('id').primaryKey(),
  page: varchar('page', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }),
  metaDescription: text('meta_description'),
  keywords: text('keywords'),
  ogImage: text('og_image'),
  canonicalUrl: text('canonical_url'),
  noindex: boolean('noindex').default(false),
  nofollow: boolean('nofollow').default(false),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  value: text('value'),
  type: varchar('type', { length: 50 }).notNull().default('text'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ===== DEHYDRATED PRODUCTS SPECIFIC TABLES =====

export const dehydratedCategories = pgTable('dehydrated_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  image: text('image'),
  cloudinaryId: varchar('cloudinary_id', { length: 255 }),
  order: integer('order').default(0),
  enabled: boolean('enabled').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  enabledIdx: index('dehydrated_categories_enabled_idx').on(table.enabled),
  slugIdx: index('dehydrated_categories_slug_idx').on(table.slug),
}));

export const dehydratedProducts = pgTable('dehydrated_products', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').notNull().references(() => dehydratedCategories.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  form: varchar('form', { length: 100 }).notNull(), // powder, flakes, minced, granules, chopped, sliced, whole, customized
  shortDescription: text('short_description'),
  fullDescription: text('full_description'),
  overview: text('overview'),
  
  // Product specifications
  botanicalName: varchar('botanical_name', { length: 255 }),
  appearance: text('appearance'),
  color: varchar('color', { length: 100 }),
  aroma: text('aroma'),
  taste: text('taste'),
  moisture: varchar('moisture', { length: 50 }),
  purity: varchar('purity', { length: 50 }),
  foreignMatter: varchar('foreign_matter', { length: 50 }),
  shelfLife: varchar('shelf_life', { length: 100 }),
  storage: text('storage'),
  origin: varchar('origin', { length: 100 }),
  processingMethod: text('processing_method'),
  
  // Features and benefits
  features: json('features').$type<string[]>(),
  benefits: json('benefits').$type<string[]>(),
  applications: json('applications').$type<string[]>(),
  
  // Export details
  moq: varchar('moq', { length: 100 }).default('1 KG'),
  leadTime: varchar('lead_time', { length: 100 }).default('15-20 days'),
  exportMarkets: json('export_markets').$type<string[]>(),
  certifications: json('certifications').$type<string[]>(),
  
  // Packaging
  defaultPackaging: varchar('default_packaging', { length: 100 }),
  availablePackaging: json('available_packaging').$type<string[]>(),
  
  // SEO
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  seoKeywords: text('seo_keywords'),
  canonicalUrl: text('canonical_url'),
  ogTitle: varchar('og_title', { length: 255 }),
  ogDescription: text('og_description'),
  ogImage: text('og_image'),
  ogImageCloudinaryId: varchar('og_image_cloudinary_id', { length: 255 }),
  twitterCard: varchar('twitter_card', { length: 50 }).default('summary_large_image'),
  twitterTitle: varchar('twitter_title', { length: 255 }),
  twitterDescription: text('twitter_description'),
  aiSearchContent: text('ai_search_content'),
  metaRobots: varchar('meta_robots', { length: 255 }).default('index, follow'),
  
  // Status
  status: varchar('status', { length: 20 }).notNull().default('draft'), // draft, published, archived
  featured: boolean('featured').default(false),
  order: integer('order').default(0),
  
  // Timestamps
  publishedAt: timestamp('published_at'),
  archivedAt: timestamp('archived_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  categoryIdx: index('dehydrated_products_category_id_idx').on(table.categoryId),
  slugIdx: index('dehydrated_products_slug_idx').on(table.slug),
  statusIdx: index('dehydrated_products_status_idx').on(table.status),
  featuredIdx: index('dehydrated_products_featured_idx').on(table.featured),
}));

export const dehydratedProductImages = pgTable('dehydrated_product_images', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => dehydratedProducts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  url: text('url').notNull(),
  cloudinaryId: varchar('cloudinary_id', { length: 255 }).notNull().unique(),
  cloudinaryPublicId: varchar('cloudinary_public_id', { length: 255 }).notNull(),
  alt: text('alt').notNull(),
  displayOrder: integer('display_order').default(0),
  featured: boolean('featured').default(false),
  width: integer('width'),
  height: integer('height'),
  size: integer('size'), // in bytes
  format: varchar('format', { length: 50 }), // webp, avif, png, jpg
  blurDataUrl: text('blur_data_url'), // base64 blur placeholder
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  productIdx: index('dehydrated_product_images_product_id_idx').on(table.productId),
  featuredIdx: index('dehydrated_product_images_featured_idx').on(table.featured),
}));

export const dehydratedProductPackaging = pgTable('dehydrated_product_packaging', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => dehydratedProducts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  type: varchar('type', { length: 100 }).notNull(), // 1 KG, 5 KG, 10 KG, etc.
  description: text('description'),
  moqPerType: varchar('moq_per_type', { length: 100 }),
  customization: varchar('customization', { length: 50 }), // none, standard, private-label, oem
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  productIdx: index('dehydrated_product_packaging_product_id_idx').on(table.productId),
}));

export const dehydratedProductFaqs = pgTable('dehydrated_product_faqs', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => dehydratedProducts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  productIdx: index('dehydrated_product_faqs_product_id_idx').on(table.productId),
}));

export const dehydratedProductRelations = pgTable('dehydrated_product_relations', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => dehydratedProducts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  relatedProductId: integer('related_product_id').notNull().references(() => dehydratedProducts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  type: varchar('type', { length: 50 }).notNull().default('variant'), // variant, alternative, complementary
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  productIdx: index('dehydrated_product_relations_product_id_idx').on(table.productId),
  relatedIdx: index('dehydrated_product_relations_related_id_idx').on(table.relatedProductId),
}));

export const redirects = pgTable('redirects', {
  id: serial('id').primaryKey(),
  source: varchar('source', { length: 500 }).notNull().unique(),
  destination: varchar('destination', { length: 500 }).notNull(),
  type: integer('type').notNull().default(301),
  enabled: boolean('enabled').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  filename: varchar('filename', { length: 255 }).notNull(),
  url: text('url').notNull(),
  cloudinaryId: varchar('cloudinary_id', { length: 255 }),
  folder: varchar('folder', { length: 255 }),
  type: varchar('type', { length: 50 }).notNull(),
  size: integer('size'),
  width: integer('width'),
  height: integer('height'),
  alt: text('alt'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

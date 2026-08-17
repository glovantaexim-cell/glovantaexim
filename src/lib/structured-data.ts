import { SITE_CONFIG } from './constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glovantaexim.com';

/**
 * Organization Schema - Used consistently across the site
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 250,
      height: 60,
    },
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '415, The Galleria, Yogi Chowk Ground, Chikuwadi, Varachha',
      addressLocality: 'Surat',
      addressRegion: 'Gujarat',
      postalCode: '395011',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phone,
      contactType: 'customer service',
      email: SITE_CONFIG.email,
      areaServed: SITE_CONFIG.exportCountries,
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

/**
 * Website Schema - Homepage
 */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * WebPage Schema - Generic page
 */
export function getWebPageSchema(params: {
  url: string;
  name: string;
  description: string;
  breadcrumbs?: { name: string; url: string }[];
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${params.url}#webpage`,
    url: params.url,
    name: params.name,
    description: params.description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };

  return schema;
}

/**
 * ContactPage Schema
 */
export function getContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact#webpage`,
    url: `${SITE_URL}/contact`,
    name: 'Contact Glovanta Exim',
    description: 'Get in touch with Glovanta Exim for premium export inquiries',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * AboutPage Schema
 */
export function getAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: 'About Glovanta Exim',
    description: 'Learn about Glovanta Exim - leading exporter of premium Indian products',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
    mainEntity: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Product Schema
 */
export function getProductSchema(params: {
  name: string;
  description: string;
  image?: string;
  category?: string;
  sku?: string;
  brand?: string;
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: params.name,
    description: params.description,
    brand: {
      '@type': 'Brand',
      name: params.brand || SITE_CONFIG.name,
    },
  };

  if (params.image) {
    schema.image = params.image;
  }

  if (params.category) {
    schema.category = params.category;
  }

  if (params.sku) {
    schema.sku = params.sku;
  }

  schema.manufacturer = {
    '@id': `${SITE_URL}/#organization`,
  };

  return schema;
}

/**
 * FAQPage Schema
 */
export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * CollectionPage Schema - For category pages
 */
export function getCollectionPageSchema(params: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${params.url}#webpage`,
    url: params.url,
    name: params.name,
    description: params.description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * HowTo Schema - For step-by-step instructional content
 */
export function getHowToSchema(params: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    step: params.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    ...(params.totalTime && { totalTime: params.totalTime }),
  };
}

/**
 * Render JSON-LD script tag
 */
export function renderJsonLd(data: any) {
  return {
    __html: JSON.stringify(data),
  };
}

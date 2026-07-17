import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { 
  dehydratedProducts, 
  dehydratedProductImages,
  dehydratedProductFaqs,
  dehydratedProductPackaging,
  dehydratedProductRelations,
} from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/dehydrated/products/[slug]
 * Fetch a single product with all related data
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    // Fetch product
    const product = await db
      .select()
      .from(dehydratedProducts)
      .where(eq(dehydratedProducts.slug, slug))
      .limit(1);

    if (!product.length || product[0].status !== 'published') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const p = product[0];

    // Fetch images
    const images = await db
      .select()
      .from(dehydratedProductImages)
      .where(eq(dehydratedProductImages.productId, p.id));

    // Fetch FAQs
    const faqs = await db
      .select()
      .from(dehydratedProductFaqs)
      .where(eq(dehydratedProductFaqs.productId, p.id));

    // Fetch packaging
    const packaging = await db
      .select()
      .from(dehydratedProductPackaging)
      .where(eq(dehydratedProductPackaging.productId, p.id));

    // Fetch related products
    const relations = await db
      .select()
      .from(dehydratedProductRelations)
      .where(eq(dehydratedProductRelations.productId, p.id));

    // Fetch related product details
    const relatedProducts = await Promise.all(
      relations.map(async (rel) => {
        const related = await db
          .select()
          .from(dehydratedProducts)
          .where(eq(dehydratedProducts.id, rel.relatedProductId))
          .limit(1);

        if (related.length) {
          const relatedImages = await db
            .select()
            .from(dehydratedProductImages)
            .where(eq(dehydratedProductImages.productId, related[0].id))
            .limit(1);

          return {
            id: related[0].id,
            name: related[0].name,
            slug: related[0].slug,
            form: related[0].form,
            image: relatedImages.length ? relatedImages[0].url : null,
            type: rel.type,
          };
        }
        return null;
      })
    ).then((results) => results.filter(Boolean));

    return NextResponse.json({
      id: p.id,
      name: p.name,
      slug: p.slug,
      form: p.form,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      overview: p.overview,
      
      // Specifications
      specifications: {
        botanicalName: p.botanicalName,
        appearance: p.appearance,
        color: p.color,
        aroma: p.aroma,
        taste: p.taste,
        moisture: p.moisture,
        purity: p.purity,
        foreignMatter: p.foreignMatter,
        shelfLife: p.shelfLife,
        storage: p.storage,
        origin: p.origin,
        processingMethod: p.processingMethod,
      },
      
      // Features and benefits
      features: p.features || [],
      benefits: p.benefits || [],
      applications: p.applications || [],
      
      // Export details
      moq: p.moq,
      leadTime: p.leadTime,
      exportMarkets: p.exportMarkets || [],
      certifications: p.certifications || [],
      
      // Images
      images: images.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        featured: img.featured,
        displayOrder: img.displayOrder,
        width: img.width,
        height: img.height,
        size: img.size,
        format: img.format,
      })),
      
      // Packaging
      packaging: packaging.map((pkg) => ({
        id: pkg.id,
        type: pkg.type,
        description: pkg.description,
        moqPerType: pkg.moqPerType,
        customization: pkg.customization,
        displayOrder: pkg.displayOrder,
      })),
      
      // FAQs
      faqs: faqs.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        displayOrder: faq.displayOrder,
      })),
      
      // Related products
      relatedProducts,
      
      // SEO
      seo: {
        title: p.seoTitle,
        description: p.seoDescription,
        keywords: p.seoKeywords,
        canonicalUrl: p.canonicalUrl,
        ogTitle: p.ogTitle,
        ogDescription: p.ogDescription,
        ogImage: p.ogImage,
        twitterCard: p.twitterCard,
        twitterTitle: p.twitterTitle,
        twitterDescription: p.twitterDescription,
        aiSearchContent: p.aiSearchContent,
        robots: p.metaRobots,
      },
      
      // Status
      featured: p.featured,
      status: p.status,
      publishedAt: p.publishedAt,
    });
  } catch (error) {
    console.error('Fetch product detail error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedProducts, dehydratedProductImages, dehydratedCategories } from '@/db/schema';
import { eq, and, desc, like } from 'drizzle-orm';

/**
 * GET /api/dehydrated/products
 * Public endpoint to fetch dehydrated products with optional filters
 * 
 * Query params:
 * - category: filter by category slug
 * - form: filter by product form (powder, flakes, minced, etc.)
 * - search: search by product name
 * - featured: true/false
 * - limit: results per page (default: 20, max: 100)
 * - offset: pagination offset (default: 0)
 * - sort: 'newest' | 'featured' | 'name-asc' (default: 'newest')
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const categorySlug = searchParams.get('category');
    const form = searchParams.get('form');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort') || 'newest';

    // Build query conditions
    const conditions: any[] = [
      eq(dehydratedProducts.status, 'published'),
    ];

    // Filter by category
    if (categorySlug) {
      const category = await db
        .select({ id: dehydratedCategories.id })
        .from(dehydratedCategories)
        .where(eq(dehydratedCategories.slug, categorySlug))
        .limit(1);

      if (category.length) {
        conditions.push(eq(dehydratedProducts.categoryId, category[0].id));
      } else {
        return NextResponse.json([]);
      }
    }

    // Filter by form
    if (form) {
      conditions.push(like(dehydratedProducts.form, `%${form}%`));
    }

    // Filter by featured
    if (featured) {
      conditions.push(eq(dehydratedProducts.featured, true));
    }

    // Search by name
    // Note: For production, use full-text search with Postgres
    let query = db
      .select()
      .from(dehydratedProducts)
      .where(and(...conditions)) as any;

    // Apply sorting
    switch (sort) {
      case 'name-asc':
        query = query.orderBy(dehydratedProducts.name as any);
        break;
      case 'featured':
        query = query.orderBy(desc(dehydratedProducts.featured as any));
        break;
      case 'newest':
      default:
        query = query.orderBy(desc(dehydratedProducts.createdAt as any));
    }

    // Apply pagination
    query = query.limit(limit).offset(offset);

    const products = await query;

    // If search term provided, filter in-memory (consider implementing full-text search)
    let filtered = products;
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.slug.includes(search.toLowerCase())
      );
    }

    // Fetch images for each product
    const productsWithImages = await Promise.all(
      filtered.map(async (product) => {
        const images = await db
          .select()
          .from(dehydratedProductImages)
          .where(eq(dehydratedProductImages.productId, product.id))
          .orderBy(dehydratedProductImages.displayOrder as any);

        return {
          ...product,
          images: images.map((img) => ({
            id: img.id,
            url: img.url,
            alt: img.alt,
            featured: img.featured,
            displayOrder: img.displayOrder,
            width: img.width,
            height: img.height,
          })),
        };
      })
    );

    return NextResponse.json({
      data: productsWithImages,
      total: filtered.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Fetch dehydrated products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

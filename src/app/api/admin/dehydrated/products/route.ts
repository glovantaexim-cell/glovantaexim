import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedProducts, dehydratedCategories } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { generateSlug } from '@/lib/utils';

function verifyAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token) return false;
  return true;
}

/**
 * GET /api/admin/dehydrated/products
 * Get all products with optional filters
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db.select().from(dehydratedProducts);

    if (categoryId) {
      query = query.where(eq(dehydratedProducts.categoryId, parseInt(categoryId))) as any;
    }

    if (status) {
      query = query.where(eq(dehydratedProducts.status, status)) as any;
    }

    const products = await query
      .orderBy(desc(dehydratedProducts.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/dehydrated/products
 * Create a new product
 */
export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      categoryId,
      name,
      form,
      shortDescription,
      fullDescription,
      overview,
      botanicalName,
      appearance,
      color,
      aroma,
      taste,
      moisture,
      purity,
      foreignMatter,
      shelfLife,
      storage,
      origin,
      processingMethod,
      features = [],
      benefits = [],
      applications = [],
      moq = '1 KG',
      leadTime = '15-20 days',
      exportMarkets = [],
      certifications = [],
      defaultPackaging,
      availablePackaging = [],
      seoTitle,
      seoDescription,
      seoKeywords,
      featured = false,
      status = 'draft',
    } = body;

    if (!categoryId || !name || !form) {
      return NextResponse.json(
        { error: 'Category ID, name, and form are required' },
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await db
      .select()
      .from(dehydratedCategories)
      .where(eq(dehydratedCategories.id, categoryId))
      .limit(1);

    if (!category.length) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Generate slug
    const slug = generateSlug(name);

    const newProduct = await db
      .insert(dehydratedProducts)
      .values({
        categoryId,
        name,
        slug,
        form,
        shortDescription,
        fullDescription,
        overview,
        botanicalName,
        appearance,
        color,
        aroma,
        taste,
        moisture,
        purity,
        foreignMatter,
        shelfLife,
        storage,
        origin,
        processingMethod,
        features: features.length > 0 ? features : null,
        benefits: benefits.length > 0 ? benefits : null,
        applications: applications.length > 0 ? applications : null,
        moq,
        leadTime,
        exportMarkets: exportMarkets.length > 0 ? exportMarkets : null,
        certifications: certifications.length > 0 ? certifications : null,
        defaultPackaging,
        availablePackaging: availablePackaging.length > 0 ? availablePackaging : null,
        seoTitle,
        seoDescription,
        seoKeywords,
        featured,
        status,
        publishedAt: status === 'published' ? new Date() : null,
      })
      .returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/dehydrated/products/[id]
 * Update a product
 */
export async function PUT(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const body = await req.json();

    const product = await db
      .select()
      .from(dehydratedProducts)
      .where(eq(dehydratedProducts.id, parseInt(id)))
      .limit(1);

    if (!product.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Handle status changes
    let publishedAt = product[0].publishedAt;
    let archivedAt = product[0].archivedAt;

    if (body.status === 'published' && product[0].status !== 'published') {
      publishedAt = new Date();
    }

    if (body.status === 'archived' && product[0].status !== 'archived') {
      archivedAt = new Date();
    }

    if (body.status !== 'archived' && product[0].status === 'archived') {
      archivedAt = null;
    }

    const updated = await db
      .update(dehydratedProducts)
      .set({
        ...body,
        publishedAt,
        archivedAt,
        updatedAt: new Date(),
      })
      .where(eq(dehydratedProducts.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/dehydrated/products/[id]
 * Delete a product (and cascade delete images)
 */
export async function DELETE(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = await db
      .select()
      .from(dehydratedProducts)
      .where(eq(dehydratedProducts.id, parseInt(id)))
      .limit(1);

    if (!product.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete OG image from Cloudinary if exists
    if (product[0].ogImageCloudinaryId) {
      try {
        await deleteFromCloudinary(product[0].ogImageCloudinaryId);
      } catch (error) {
        console.error('Failed to delete OG image:', error);
      }
    }

    // Cascade delete will handle product_images, packaging, faqs, etc.
    await db
      .delete(dehydratedProducts)
      .where(eq(dehydratedProducts.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

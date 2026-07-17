import { db } from '@/db';
import { products, categories } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Fetch all products with a simple SQL join
    const allProducts = await db
      .select({
        id: products.id,
        title: products.title,
        slug: products.slug,
        description: products.description,
        categoryId: products.categoryId,
        status: products.status,
        featured: products.featured,
        order: products.order,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        categoryTitle: categories.title,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));

    // Map to the expected format
    const result = allProducts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      categoryId: p.categoryId,
      status: p.status,
      featured: p.featured,
      order: p.order,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      categoryName: p.categoryTitle || 'General',
      categorySlug: p.categorySlug,
      type: 'product',
      name: p.title, // Add alias for compatibility
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newProduct = await db
      .insert(products)
      .values({
        title: data.title,
        slug: data.slug,
        description: data.description,
        categoryId: data.categoryId,
        status: data.status || 'draft',
        featured: data.featured || false,
        order: data.order || 0,
      })
      .returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    );
  }
}

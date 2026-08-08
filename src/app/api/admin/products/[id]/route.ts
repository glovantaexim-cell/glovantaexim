import { db } from '@/db';
import { products } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const product = await db
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
      })
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!product.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product[0]);
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const data = await request.json();

    const updatedProduct = await db
      .update(products)
      .set({
        title: data.title,
        slug: data.slug,
        description: data.description,
        categoryId: data.categoryId,
        status: data.status,
        featured: data.featured,
        order: data.order,
      })
      .where(eq(products.id, id))
      .returning({
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
      });

    if (!updatedProduct.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const deletedProduct = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning({
        id: products.id,
        title: products.title,
      });

    if (!deletedProduct.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
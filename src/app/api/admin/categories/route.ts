import { db } from '@/db';
import { categories } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .orderBy(categories.title);

    return NextResponse.json(allCategories);
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newCategory = await db
      .insert(categories)
      .values({
        title: data.title,
        slug: data.slug,
        description: data.description,
        status: data.status || 'published',
        featured: data.featured || false,
        order: data.order || 0,
      })
      .returning();

    return NextResponse.json(newCategory[0], { status: 201 });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
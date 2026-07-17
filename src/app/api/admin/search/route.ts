import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import {
  dehydratedProducts,
  dehydratedCategories,
  blogs,
  contactMessages,
} from '@/db/schema';
import { like, or, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get('q') || '').trim();
    if (query.length < 2) {
      return NextResponse.json({ products: [], categories: [], blogs: [], inquiries: [] });
    }
    const pattern = `%${query}%`;

    const [products, categories, blogResults, inquiries] = await Promise.all([
      db
        .select({
          id: dehydratedProducts.id,
          name: dehydratedProducts.name,
          slug: dehydratedProducts.slug,
          status: dehydratedProducts.status,
        })
        .from(dehydratedProducts)
        .where(
          or(
            like(dehydratedProducts.name, pattern),
            like(dehydratedProducts.slug, pattern)
          )
        )
        .limit(5),
      db
        .select({
          id: dehydratedCategories.id,
          name: dehydratedCategories.name,
          slug: dehydratedCategories.slug,
        })
        .from(dehydratedCategories)
        .where(
          or(
            like(dehydratedCategories.name, pattern),
            like(dehydratedCategories.slug, pattern)
          )
        )
        .limit(5),
      db
        .select({
          id: blogs.id,
          title: blogs.title,
          slug: blogs.slug,
          status: blogs.status,
        })
        .from(blogs)
        .where(or(like(blogs.title, pattern), like(blogs.slug, pattern)))
        .limit(5),
      db
        .select({
          id: contactMessages.id,
          fullName: contactMessages.fullName,
          email: contactMessages.email,
          country: contactMessages.country,
          status: contactMessages.status,
        })
        .from(contactMessages)
        .where(
          or(
            like(contactMessages.fullName, pattern),
            like(contactMessages.email, pattern),
            like(contactMessages.country, pattern),
            like(contactMessages.message, pattern)
          )
        )
        .limit(5),
    ]);

    return NextResponse.json({ products, categories, blogs: blogResults, inquiries });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

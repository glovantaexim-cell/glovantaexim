import { db } from '@/db';
import { blogs } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allBlogs = await db
      .select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        excerpt: blogs.excerpt,
        author: blogs.author,
        category: blogs.category,
        featuredImage: blogs.featuredImage,
        status: blogs.status,
        views: blogs.views,
        publishDate: blogs.publishDate,
        createdAt: blogs.createdAt,
        updatedAt: blogs.updatedAt,
      })
      .from(blogs)
      .orderBy(blogs.createdAt);

    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error('Blogs API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newBlog = await db
      .insert(blogs)
      .values({
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        authorBio: data.authorBio,
        category: data.category,
        tags: data.tags || [],
        featuredImage: data.featuredImage,
        seoTitle: data.seoTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        status: data.status || 'draft',
        publishDate: data.publishDate || new Date(),
      })
      .returning({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        excerpt: blogs.excerpt,
        author: blogs.author,
        category: blogs.category,
        featuredImage: blogs.featuredImage,
        status: blogs.status,
        createdAt: blogs.createdAt,
      });

    return NextResponse.json(newBlog[0], { status: 201 });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
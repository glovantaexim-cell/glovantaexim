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
  console.log('[Blog Create] Request received');
  
  try {
    // Verify database connection
    if (!process.env.DATABASE_URL) {
      console.error('[Blog Create] DATABASE_URL not configured');
      return NextResponse.json(
        { error: 'Server configuration error: Database not configured' },
        { status: 500 }
      );
    }

    const data = await request.json();
    
    console.log('[Blog Create] Data received:', {
      title: data.title,
      slug: data.slug,
      author: data.author,
      status: data.status,
      hasFeaturedImage: !!data.featuredImage,
      contentLength: data.content?.length,
    });

    // Validate required fields
    if (!data.title || !data.slug || !data.content || !data.author) {
      console.error('[Blog Create] Missing required fields:', {
        title: !!data.title,
        slug: !!data.slug,
        content: !!data.content,
        author: !!data.author,
      });
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content, and author are required' },
        { status: 400 }
      );
    }

    console.log('[Blog Create] Inserting into database...');

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
        publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
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

    console.log('[Blog Create] Success! Blog ID:', newBlog[0]?.id);

    return NextResponse.json(newBlog[0], { status: 201 });
  } catch (error) {
    console.error('[Blog Create] Fatal error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('[Blog Create] Error stack:', errorStack);
    
    return NextResponse.json(
      { error: `Failed to create blog: ${errorMessage}` },
      { status: 500 }
    );
  }
}
import { db } from '@/db';
import { blogs } from '@/db/schema';
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
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id))
      .limit(1);

    if (!blog.length) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog[0]);
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('[Blog Update] Request received');
  
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    console.log('[Blog Update] Blog ID:', id);
    
    if (isNaN(id)) {
      console.error('[Blog Update] Invalid ID:', idParam);
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    const data = await request.json();
    
    console.log('[Blog Update] Data received:', {
      title: data.title,
      slug: data.slug,
      hasContent: !!data.content,
      publishDate: data.publishDate,
    });

    // Convert publishDate string to Date object if provided
    const updateData: any = {
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
      status: data.status,
      updatedAt: new Date(),
    };

    // Only update publishDate if provided
    if (data.publishDate) {
      updateData.publishDate = new Date(data.publishDate);
    }

    console.log('[Blog Update] Updating blog in database...');

    const updatedBlog = await db
      .update(blogs)
      .set(updateData)
      .where(eq(blogs.id, id))
      .returning();

    if (!updatedBlog.length) {
      console.error('[Blog Update] Blog not found:', id);
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    console.log('[Blog Update] Success! Blog ID:', updatedBlog[0].id);

    return NextResponse.json(updatedBlog[0]);
  } catch (error) {
    console.error('[Blog Update] Fatal error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('[Blog Update] Error stack:', errorStack);
    
    return NextResponse.json(
      { error: `Failed to update blog: ${errorMessage}` },
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
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    const deletedBlog = await db
      .delete(blogs)
      .where(eq(blogs.id, id))
      .returning({ id: blogs.id, title: blogs.title });

    if (!deletedBlog.length) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
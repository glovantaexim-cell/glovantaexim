import { db } from '@/db';
import { blogs } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
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
  { params }: { params: { id: string } }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    const data = await request.json();

    const updatedBlog = await db
      .update(blogs)
      .set({
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        authorBio: data.authorBio,
        category: data.category,
        tags: data.tags,
        featuredImage: data.featuredImage,
        seoTitle: data.seoTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        status: data.status,
        publishDate: data.publishDate,
      })
      .where(eq(blogs.id, id))
      .returning();

    if (!updatedBlog.length) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBlog[0]);
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
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
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedCategories } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

// Verify admin authentication
function verifyAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  // In production, verify JWT token
  // For now, just check if token exists
  if (!token) {
    return false;
  }
  return true;
}

/**
 * GET /api/admin/dehydrated/categories
 * Get all dehydrated categories
 */
export async function GET() {
  try {
    const categories = await db
      .select()
      .from(dehydratedCategories)
      .orderBy(asc(dehydratedCategories.order));

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/dehydrated/categories
 * Create a new category
 */
export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const {
      name,
      slug,
      description,
      image,
      order = 0,
      enabled = true,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary if provided
    let imageUrl = image;
    let cloudinaryId = null;

    if (image && image.startsWith('data:')) {
      try {
        const buffer = Buffer.from(image.split(',')[1], 'base64');
        const uploadResponse = await uploadToCloudinary(buffer, {
          folder: 'glovanta/dehydrated/categories',
          publicId: slug,
          tags: ['category', slug],
        });
        imageUrl = uploadResponse.secure_url;
        cloudinaryId = uploadResponse.public_id;
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
      }
    }

    const newCategory = await db
      .insert(dehydratedCategories)
      .values({
        name,
        slug,
        description,
        image: imageUrl,
        cloudinaryId,
        order,
        enabled,
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

/**
 * PUT /api/admin/dehydrated/categories/[id]
 * Update a category
 */
export async function PUT(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      name,
      slug,
      description,
      image,
      order,
      enabled,
    } = body;

    // Get existing category
    const existing = await db
      .select()
      .from(dehydratedCategories)
      .where(eq(dehydratedCategories.id, parseInt(id)))
      .limit(1);

    if (!existing.length) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Handle image update
    let imageUrl = existing[0].image;
    let cloudinaryId = existing[0].cloudinaryId;

    if (image && image.startsWith('data:') && image !== existing[0].image) {
      // Delete old image if exists
      if (existing[0].cloudinaryId) {
        await deleteFromCloudinary(existing[0].cloudinaryId);
      }

      try {
        const buffer = Buffer.from(image.split(',')[1], 'base64');
        const uploadResponse = await uploadToCloudinary(buffer, {
          folder: 'glovanta/dehydrated/categories',
          publicId: slug || existing[0].slug,
          tags: ['category', slug || existing[0].slug],
        });
        imageUrl = uploadResponse.secure_url;
        cloudinaryId = uploadResponse.public_id;
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
      }
    }

    const updated = await db
      .update(dehydratedCategories)
      .set({
        name: name || existing[0].name,
        slug: slug || existing[0].slug,
        description: description ?? existing[0].description,
        image: imageUrl,
        cloudinaryId,
        order: order !== undefined ? order : existing[0].order,
        enabled: enabled !== undefined ? enabled : existing[0].enabled,
        updatedAt: new Date(),
      })
      .where(eq(dehydratedCategories.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/dehydrated/categories/[id]
 * Delete a category
 */
export async function DELETE(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    const category = await db
      .select()
      .from(dehydratedCategories)
      .where(eq(dehydratedCategories.id, parseInt(id)))
      .limit(1);

    if (!category.length) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Delete Cloudinary image if exists
    if (category[0].cloudinaryId) {
      await deleteFromCloudinary(category[0].cloudinaryId);
    }

    // Delete category (cascade delete will handle products and images)
    await db
      .delete(dehydratedCategories)
      .where(eq(dehydratedCategories.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedCategories, dehydratedProducts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { generateSlug } from '@/lib/utils';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const category = await db
      .select()
      .from(dehydratedCategories)
      .where(eq(dehydratedCategories.id, id))
      .limit(1);

    if (!category.length) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category[0]);
  } catch (error) {
    console.error('Category GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = verifyAdminAuth(req);
  if (!auth) return unauthorizedResponse();

  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const body = await req.json();
    const { name, description, image, order, enabled, slug: bodySlug } = body;

    const existing = await db
      .select()
      .from(dehydratedCategories)
      .where(eq(dehydratedCategories.id, id))
      .limit(1);

    if (!existing.length) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    let imageUrl = existing[0].image;
    let cloudinaryId = existing[0].cloudinaryId;

    if (image && image.startsWith('data:') && image !== existing[0].image) {
      if (existing[0].cloudinaryId) {
        try {
          await deleteFromCloudinary(existing[0].cloudinaryId);
        } catch (e) {
          console.error('Failed to delete old image', e);
        }
      }
      try {
        const buffer = Buffer.from(image.split(',')[1], 'base64');
        const uploadResponse = await uploadToCloudinary(buffer, {
          folder: 'glovanta/categories',
          publicId: `${bodySlug || existing[0].slug}-${Date.now()}`,
          tags: ['category', bodySlug || existing[0].slug],
        });
        imageUrl = uploadResponse.secure_url;
        cloudinaryId = uploadResponse.public_id;
      } catch (e) {
        console.error('Image upload failed', e);
      }
    } else if (image && /^https?:\/\//.test(image) && image !== existing[0].image) {
      imageUrl = image;
    }

    const updated = await db
      .update(dehydratedCategories)
      .set({
        name: name || existing[0].name,
        slug: bodySlug || existing[0].slug,
        description: description ?? existing[0].description,
        image: imageUrl,
        cloudinaryId,
        order: order !== undefined ? order : existing[0].order,
        enabled: enabled !== undefined ? enabled : existing[0].enabled,
        updatedAt: new Date(),
      })
      .where(eq(dehydratedCategories.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Category PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = verifyAdminAuth(req);
  if (!auth) return unauthorizedResponse();

  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(dehydratedCategories)
      .where(eq(dehydratedCategories.id, id))
      .limit(1);

    if (!existing.length) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Cascade delete will remove products and their images
    if (existing[0].cloudinaryId) {
      try {
        await deleteFromCloudinary(existing[0].cloudinaryId);
      } catch (e) {
        console.error('Cloudinary delete failed', e);
      }
    }

    await db.delete(dehydratedCategories).where(eq(dehydratedCategories.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Category DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}

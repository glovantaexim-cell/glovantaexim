import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedProductImages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

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
    const [image] = await db
      .select()
      .from(dehydratedProductImages)
      .where(eq(dehydratedProductImages.id, id))
      .limit(1);
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    if (image.cloudinaryId) {
      try {
        await deleteFromCloudinary(image.cloudinaryId);
      } catch (e) {
        console.error('Cloudinary delete failed', e);
      }
    }
    await db
      .delete(dehydratedProductImages)
      .where(eq(dehydratedProductImages.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Image delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

export async function PATCH(
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
    const [image] = await db
      .select()
      .from(dehydratedProductImages)
      .where(eq(dehydratedProductImages.id, id))
      .limit(1);
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    if (body.featured === true && !image.featured) {
      await db
        .update(dehydratedProductImages)
        .set({ featured: false })
        .where(eq(dehydratedProductImages.productId, image.productId));
    }
    const [updated] = await db
      .update(dehydratedProductImages)
      .set({
        alt: body.alt ?? image.alt,
        featured: body.featured ?? image.featured,
        displayOrder: body.displayOrder ?? image.displayOrder,
        updatedAt: new Date(),
      })
      .where(eq(dehydratedProductImages.id, id))
      .returning();
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Image PATCH error:', error);
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}

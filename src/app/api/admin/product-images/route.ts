import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import {
  dehydratedProductImages,
  dehydratedProducts,
} from '@/db/schema';
import { eq, asc, inArray, sql, and } from 'drizzle-orm';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }
    const images = await db
      .select()
      .from(dehydratedProductImages)
      .where(eq(dehydratedProductImages.productId, parseInt(productId)))
      .orderBy(asc(dehydratedProductImages.displayOrder));
    return NextResponse.json({ data: images });
  } catch (error) {
    console.error('Images GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { productId, image, alt, featured = false } = body;

    if (!productId || !image || !alt) {
      return NextResponse.json(
        { error: 'productId, image and alt are required' },
        { status: 400 }
      );
    }

    const [product] = await db
      .select()
      .from(dehydratedProducts)
      .where(eq(dehydratedProducts.id, parseInt(productId)))
      .limit(1);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const orderRows = await db
      .select({ max: sql<number>`COALESCE(MAX(${dehydratedProductImages.displayOrder}), -1)::int` })
      .from(dehydratedProductImages)
      .where(eq(dehydratedProductImages.productId, parseInt(productId)));
    const nextOrder = (orderRows[0]?.max ?? -1) + 1;

    let url = image;
    let cloudinaryId: string | null = null;
    let cloudinaryPublicId: string | null = null;
    let width: number | null = null;
    let height: number | null = null;
    let size: number | null = null;
    let format: string | null = null;

    if (image.startsWith('data:')) {
      // Base64 — upload to Cloudinary
      const buffer = Buffer.from(image.split(',')[1], 'base64');
      const uploadResponse = await uploadToCloudinary(buffer, {
        folder: `glovanta/products/${productId}`,
        publicId: `${product.slug}-${nextOrder}-${Date.now()}`,
        tags: ['product-image', product.slug, `product-${productId}`],
      });
      url = uploadResponse.secure_url;
      cloudinaryId = uploadResponse.public_id;
      cloudinaryPublicId = uploadResponse.public_id;
      width = uploadResponse.width;
      height = uploadResponse.height;
      size = uploadResponse.bytes;
      format = uploadResponse.format;
    } else if (/^https?:\/\//.test(image)) {
      // Direct URL — store as-is
      url = image;
    } else {
      return NextResponse.json(
        { error: 'image must be a base64 data URI or http(s) URL' },
        { status: 400 }
      );
    }

    if (featured) {
      await db
        .update(dehydratedProductImages)
        .set({ featured: false })
        .where(eq(dehydratedProductImages.productId, parseInt(productId)));
    }

    const [newImage] = await db
      .insert(dehydratedProductImages)
      .values({
        productId: parseInt(productId),
        url,
        cloudinaryId,
        cloudinaryPublicId: cloudinaryId,
        alt,
        displayOrder: nextOrder,
        featured,
        width,
        height,
        size,
        format,
      })
      .returning();

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) return unauthorizedResponse();

  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'ids required' }, { status: 400 });
    }
    const images = await db
      .select()
      .from(dehydratedProductImages)
      .where(inArray(dehydratedProductImages.id, ids.map(Number)));

    for (const img of images) {
      if (img.cloudinaryId) {
        try {
          await deleteFromCloudinary(img.cloudinaryId);
        } catch (e) {
          console.error('Cloudinary delete failed', e);
        }
      }
    }
    await db
      .delete(dehydratedProductImages)
      .where(inArray(dehydratedProductImages.id, ids.map(Number)));
    return NextResponse.json({ success: true, count: ids.length });
  } catch (error) {
    console.error('Images bulk delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete images' },
      { status: 500 }
    );
  }
}

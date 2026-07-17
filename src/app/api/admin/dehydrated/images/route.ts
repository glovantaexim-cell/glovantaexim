import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedProductImages, dehydratedProducts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

function verifyAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token) return false;
  return true;
}

/**
 * GET /api/admin/dehydrated/images
 * Get product images with optional product filter
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    let query = db.select().from(dehydratedProductImages);

    if (productId) {
      query = query.where(eq(dehydratedProductImages.productId, parseInt(productId))) as any;
    }

    const images = await query.orderBy(dehydratedProductImages.displayOrder as any);

    return NextResponse.json(images);
  } catch (error) {
    console.error('Fetch images error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/dehydrated/images
 * Upload a new image
 */
export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      productId,
      image,
      alt,
      featured = false,
    } = body;

    if (!productId || !image || !alt) {
      return NextResponse.json(
        { error: 'Product ID, image, and alt text are required' },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = await db
      .select()
      .from(dehydratedProducts)
      .where(eq(dehydratedProducts.id, productId))
      .limit(1);

    if (!product.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get next display order
    const maxOrder = await db
      .select()
      .from(dehydratedProductImages)
      .where(eq(dehydratedProductImages.productId, productId));

    const nextOrder = Math.max(...maxOrder.map(img => img.displayOrder || 0), -1) + 1;

    // Upload to Cloudinary
    let buffer: Buffer;
    if (image.startsWith('data:')) {
      const base64Data = image.split(',')[1];
      buffer = Buffer.from(base64Data, 'base64');
    } else {
      buffer = Buffer.from(image);
    }

    const uploadResponse = await uploadToCloudinary(buffer, {
      folder: `glovanta/dehydrated/products/${productId}`,
      publicId: `${product[0].slug}-${nextOrder}`,
      tags: ['product-image', product[0].slug, `product-${productId}`],
    });

    // If setting as featured, unset other featured images
    if (featured) {
      await db
        .update(dehydratedProductImages)
        .set({ featured: false })
        .where(eq(dehydratedProductImages.productId, productId));
    }

    // Save to database
    const newImage = await db
      .insert(dehydratedProductImages)
      .values({
        productId,
        url: uploadResponse.secure_url,
        cloudinaryId: uploadResponse.public_id,
        cloudinaryPublicId: uploadResponse.public_id,
        alt,
        displayOrder: nextOrder,
        featured,
        width: uploadResponse.width,
        height: uploadResponse.height,
        size: uploadResponse.bytes,
        format: uploadResponse.format,
        blurDataUrl: '', // Will be generated separately
      })
      .returning();

    return NextResponse.json(newImage[0], { status: 201 });
  } catch (error) {
    console.error('Upload image error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/dehydrated/images/[id]
 * Update image details
 */
export async function PUT(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { alt, displayOrder, featured, newImage } = body;

    const image = await db
      .select()
      .from(dehydratedProductImages)
      .where(eq(dehydratedProductImages.id, parseInt(id)))
      .limit(1);

    if (!image.length) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Handle image replacement
    let url = image[0].url;
    let cloudinaryId = image[0].cloudinaryId;
    let cloudinaryPublicId = image[0].cloudinaryPublicId;
    let width = image[0].width;
    let height = image[0].height;
    let size = image[0].size;
    let format = image[0].format;

    if (newImage && newImage !== image[0].url) {
      // Delete old image
      if (image[0].cloudinaryId) {
        try {
          await deleteFromCloudinary(image[0].cloudinaryId);
        } catch (error) {
          console.error('Failed to delete old image:', error);
        }
      }

      // Upload new image
      let buffer: Buffer;
      if (newImage.startsWith('data:')) {
        const base64Data = newImage.split(',')[1];
        buffer = Buffer.from(base64Data, 'base64');
      } else {
        buffer = Buffer.from(newImage);
      }

      const uploadResponse = await uploadToCloudinary(buffer, {
        folder: `glovanta/dehydrated/products/${image[0].productId}`,
      });

      url = uploadResponse.secure_url;
      cloudinaryId = uploadResponse.public_id;
      cloudinaryPublicId = uploadResponse.public_id;
      width = uploadResponse.width;
      height = uploadResponse.height;
      size = uploadResponse.bytes;
      format = uploadResponse.format;
    }

    // If setting as featured, unset other featured images
    if (featured && !image[0].featured) {
      await db
        .update(dehydratedProductImages)
        .set({ featured: false })
        .where(eq(dehydratedProductImages.productId, image[0].productId));
    }

    const updated = await db
      .update(dehydratedProductImages)
      .set({
        url,
        cloudinaryId,
        cloudinaryPublicId,
        alt: alt || image[0].alt,
        displayOrder: displayOrder !== undefined ? displayOrder : image[0].displayOrder,
        featured: featured !== undefined ? featured : image[0].featured,
        width,
        height,
        size,
        format,
        updatedAt: new Date(),
      })
      .where(eq(dehydratedProductImages.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Update image error:', error);
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/dehydrated/images/[id]
 * Delete an image
 */
export async function DELETE(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const image = await db
      .select()
      .from(dehydratedProductImages)
      .where(eq(dehydratedProductImages.id, parseInt(id)))
      .limit(1);

    if (!image.length) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    if (image[0].cloudinaryId) {
      try {
        await deleteFromCloudinary(image[0].cloudinaryId);
      } catch (error) {
        console.error('Failed to delete from Cloudinary:', error);
      }
    }

    // Delete from database
    await db
      .delete(dehydratedProductImages)
      .where(eq(dehydratedProductImages.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete image error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

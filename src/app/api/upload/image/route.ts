import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  console.log('[Image Upload] Request received');
  
  try {
    // Verify Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('[Image Upload] Missing Cloudinary credentials:', {
        cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
        api_key: !!process.env.CLOUDINARY_API_KEY,
        api_secret: !!process.env.CLOUDINARY_API_SECRET,
      });
      return NextResponse.json(
        { error: 'Server configuration error: Cloudinary credentials not configured' },
        { status: 500 }
      );
    }

    console.log('[Image Upload] Cloudinary config verified');

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'blog-images';
    const customName = formData.get('customName') as string || '';

    console.log('[Image Upload] File received:', {
      name: file?.name,
      type: file?.type,
      size: file?.size,
      folder,
      customName,
    });

    if (!file) {
      console.error('[Image Upload] No file in request');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      console.error('[Image Upload] Invalid file type:', file.type);
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('[Image Upload] File too large:', file.size);
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    console.log('[Image Upload] File validation passed, converting to buffer');

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('[Image Upload] Buffer created, uploading to Cloudinary...');

    // Prepare upload options
    const uploadOptions: any = {
      resource_type: 'image',
      folder: folder,
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    };

    // Add custom public_id if customName is provided
    if (customName.trim()) {
      // Sanitize the custom name (remove special characters, replace spaces with dashes)
      const sanitizedName = customName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      uploadOptions.public_id = sanitizedName;
      uploadOptions.use_filename = false;
      uploadOptions.unique_filename = false;
      
      console.log('[Image Upload] Using custom name:', sanitizedName);
    } else {
      uploadOptions.use_filename = true;
      uploadOptions.unique_filename = true;
    }

    // Upload to Cloudinary
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error('[Image Upload] Cloudinary error:', error);
            reject(error);
          } else {
            console.log('[Image Upload] Cloudinary success:', result?.public_id);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    console.log('[Image Upload] Upload complete, returning response');

    return NextResponse.json({
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      width: uploadResponse.width,
      height: uploadResponse.height,
      format: uploadResponse.format,
      bytes: uploadResponse.bytes,
    });

  } catch (error) {
    console.error('[Image Upload] Fatal error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to upload image: ${errorMessage}` },
      { status: 500 }
    );
  }
}
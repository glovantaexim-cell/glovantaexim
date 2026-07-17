import { v2 as cloudinary } from 'cloudinary';

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary environment variables are not configured');
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  error?: {
    message: string;
  };
}

export interface CloudinaryDeleteResponse {
  result: string;
  error?: {
    message: string;
  };
}

/**
 * Upload an image to Cloudinary with automatic transformations
 */
export async function uploadToCloudinary(
  file: Buffer | string,
  options?: {
    folder?: string;
    publicId?: string;
    tags?: string[];
  }
): Promise<CloudinaryUploadResponse> {
  try {
    const folder = options?.folder || 'glovanta/dehydrated';
    
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: options?.publicId,
          tags: options?.tags,
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
          eager: [
            { quality: 'auto', fetch_format: 'auto', flags: 'progressive' },
            { quality: 'auto', fetch_format: 'webp' },
            { quality: 'auto', fetch_format: 'avif' },
          ],
          eager_async: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as CloudinaryUploadResponse);
          }
        }
      );

      if (typeof file === 'string') {
        stream.end(Buffer.from(file));
      } else {
        stream.end(file);
      }
    });
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error}`);
  }
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<CloudinaryDeleteResponse> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result as CloudinaryDeleteResponse;
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error}`);
  }
}

/**
 * Get optimized image URL with responsive transformations
 */
export function getOptimizedImageUrl(publicId: string, options?: {
  width?: number;
  height?: number;
  quality?: string;
  format?: 'webp' | 'avif' | 'auto';
}): string {
  const url = cloudinary.url(publicId, {
    quality: options?.quality || 'auto',
    fetch_format: options?.format || 'auto',
    flags: ['progressive'],
    width: options?.width,
    height: options?.height,
    crop: options?.width && options?.height ? 'fill' : 'scale',
  });

  return url;
}

/**
 * Get blur data URL for lazy loading
 */
export async function generateBlurDataUrl(_publicId: string): Promise<string> {
  try {
    // Generate a blur placeholder URL
    // In a real implementation, you'd fetch and convert this to base64
    // For now, return a placeholder
    return 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3Crect fill=\'%23f3f4f6\' width=\'1\' height=\'1\'/%3E%3C/svg%3E';
  } catch (error) {
    throw new Error(`Failed to generate blur data URL: ${error}`);
  }
}

/**
 * Generate responsive image srcset
 */
export function generateResponsiveSrcset(publicId: string): {
  srcset: string;
  sizes: string;
} {
  const widths = [320, 640, 1024, 1280, 1920];
  
  const srcset = widths
    .map((width) => {
      const url = cloudinary.url(publicId, {
        width,
        quality: 'auto',
        fetch_format: 'auto',
        crop: 'scale',
      });
      return `${url} ${width}w`;
    })
    .join(', ');

  const sizes = '(max-width: 640px) 320px, (max-width: 1024px) 640px, (max-width: 1280px) 1024px, 1280px';

  return { srcset, sizes };
}

export { cloudinary };

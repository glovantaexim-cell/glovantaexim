import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogs } from '@/db/schema';

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlStart: process.env.DATABASE_URL?.substring(0, 20) || 'NOT SET',
      hasCloudinaryName: !!process.env.CLOUDINARY_CLOUD_NAME,
      hasCloudinaryKey: !!process.env.CLOUDINARY_API_KEY,
      hasCloudinarySecret: !!process.env.CLOUDINARY_API_SECRET,
      cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME || 'NOT SET',
    },
    tests: {} as Record<string, any>,
  };

  // Test 1: Database connection
  try {
    const result = await db.select().from(blogs).limit(1);
    diagnostics.tests.databaseConnection = {
      status: 'success',
      message: 'Database connected successfully',
      blogCount: result.length,
    };
  } catch (error) {
    diagnostics.tests.databaseConnection = {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Test 2: Cloudinary config
  try {
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    diagnostics.tests.cloudinaryConfig = {
      status: 'success',
      message: 'Cloudinary configured',
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    };
  } catch (error) {
    diagnostics.tests.cloudinaryConfig = {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}

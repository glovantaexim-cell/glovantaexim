import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedProductPackaging } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    if (!productId) {
      return NextResponse.json({ error: 'productId required' }, { status: 400 });
    }
    const rows = await db
      .select()
      .from(dehydratedProductPackaging)
      .where(eq(dehydratedProductPackaging.productId, parseInt(productId)))
      .orderBy(asc(dehydratedProductPackaging.displayOrder));
    return NextResponse.json({ data: rows });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch packaging' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) return unauthorizedResponse();
  try {
    const body = await req.json();
    const { productId, type, description, moqPerType, customization } = body;
    if (!productId || !type) {
      return NextResponse.json(
        { error: 'productId and type are required' },
        { status: 400 }
      );
    }
    const [row] = await db
      .insert(dehydratedProductPackaging)
      .values({ productId, type, description, moqPerType, customization })
      .returning();
    return NextResponse.json(row, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create packaging' },
      { status: 500 }
    );
  }
}

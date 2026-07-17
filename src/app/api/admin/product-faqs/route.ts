import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedProductFaqs } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    if (!productId) {
      return NextResponse.json({ error: 'productId required' }, { status: 400 });
    }
    const faqs = await db
      .select()
      .from(dehydratedProductFaqs)
      .where(eq(dehydratedProductFaqs.productId, parseInt(productId)))
      .orderBy(asc(dehydratedProductFaqs.displayOrder));
    return NextResponse.json({ data: faqs });
  } catch (error) {
    console.error('FAQs GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) return unauthorizedResponse();
  try {
    const body = await req.json();
    const { productId, question, answer, displayOrder = 0 } = body;
    if (!productId || !question || !answer) {
      return NextResponse.json(
        { error: 'productId, question and answer are required' },
        { status: 400 }
      );
    }
    const [faq] = await db
      .insert(dehydratedProductFaqs)
      .values({ productId, question, answer, displayOrder })
      .returning();
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error('FAQ create error:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}

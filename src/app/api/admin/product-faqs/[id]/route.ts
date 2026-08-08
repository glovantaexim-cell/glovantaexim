import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedProductFaqs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyAdminAuth(req);
  if (!auth) return unauthorizedResponse();
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const [updated] = await db
      .update(dehydratedProductFaqs)
      .set({
        question: body.question,
        answer: body.answer,
        displayOrder: body.displayOrder ?? 0,
        updatedAt: new Date(),
      })
      .where(eq(dehydratedProductFaqs.id, id))
      .returning();
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyAdminAuth(_req);
  if (!auth) return unauthorizedResponse();
  try {
    const id = parseInt(params.id);
    await db.delete(dehydratedProductFaqs).where(eq(dehydratedProductFaqs.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}

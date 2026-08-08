import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dehydratedProductPackaging } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyAdminAuth(req);
  if (!auth) return unauthorizedResponse();
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await req.json();
    const [updated] = await db
      .update(dehydratedProductPackaging)
      .set({
        type: body.type,
        description: body.description,
        moqPerType: body.moqPerType,
        customization: body.customization,
      })
      .where(eq(dehydratedProductPackaging.id, id))
      .returning();
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update packaging' },
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
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    await db
      .delete(dehydratedProductPackaging)
      .where(eq(dehydratedProductPackaging.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete packaging' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(siteSettings)
      .orderBy(asc(siteSettings.key));
    return NextResponse.json({ data: rows });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) return unauthorizedResponse();
  try {
    const body = await req.json();
    const items: { key: string; value: string; type?: string }[] = Array.isArray(body)
      ? body
      : body.items || [];

    for (const item of items) {
      if (!item.key) continue;
      const [existing] = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.key, item.key))
        .limit(1);
      if (existing) {
        await db
          .update(siteSettings)
          .set({
            value: item.value,
            type: item.type || existing.type,
            updatedAt: new Date(),
          })
          .where(eq(siteSettings.key, item.key));
      } else {
        await db.insert(siteSettings).values({
          key: item.key,
          value: item.value,
          type: item.type || 'text',
        });
      }
    }
    return NextResponse.json({ success: true, count: items.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}

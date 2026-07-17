import { db } from '@/db';
import { contactMessages } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq, gte, sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Get overall statistics
    const totalInquiries = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactMessages);

    const newInquiries = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactMessages)
      .where(eq(contactMessages.status, 'new'));

    const inProgressInquiries = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactMessages)
      .where(eq(contactMessages.status, 'in_progress'));

    const closedInquiries = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactMessages)
      .where(eq(contactMessages.status, 'closed'));

    // Get recent inquiries (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentInquiries = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactMessages)
      .where(gte(contactMessages.createdAt, thirtyDaysAgo));

    // Get inquiries by product interest
    const productInterests = await db
      .select({
        product: contactMessages.productInterest,
        count: sql<number>`count(*)`
      })
      .from(contactMessages)
      .where(sql`${contactMessages.productInterest} IS NOT NULL AND ${contactMessages.productInterest} != ''`)
      .groupBy(contactMessages.productInterest)
      .orderBy(sql`count(*) DESC`)
      .limit(5);

    // Get inquiries by country
    const countries = await db
      .select({
        country: contactMessages.country,
        count: sql<number>`count(*)`
      })
      .from(contactMessages)
      .groupBy(contactMessages.country)
      .orderBy(sql`count(*) DESC`)
      .limit(5);

    const stats = {
      total: totalInquiries[0]?.count || 0,
      new: newInquiries[0]?.count || 0,
      inProgress: inProgressInquiries[0]?.count || 0,
      closed: closedInquiries[0]?.count || 0,
      recent: recentInquiries[0]?.count || 0,
      topProducts: productInterests,
      topCountries: countries,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Inquiry stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiry statistics' },
      { status: 500 }
    );
  }
}
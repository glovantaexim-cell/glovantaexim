import { db } from '@/db';
import { contactMessages } from '@/db/schema';
import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allInquiries = await db
      .select({
        id: contactMessages.id,
        fullName: contactMessages.fullName,
        companyName: contactMessages.companyName,
        country: contactMessages.country,
        email: contactMessages.email,
        phone: contactMessages.phone,
        whatsapp: contactMessages.whatsapp,
        productInterest: contactMessages.productInterest,
        quantity: contactMessages.quantity,
        message: contactMessages.message,
        status: contactMessages.status,
        notes: contactMessages.notes,
        createdAt: contactMessages.createdAt,
      })
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));

    return NextResponse.json(allInquiries);
  } catch (error) {
    console.error('Inquiries API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newInquiry = await db
      .insert(contactMessages)
      .values({
        fullName: data.fullName,
        companyName: data.companyName,
        country: data.country,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        productInterest: data.productInterest,
        quantity: data.quantity,
        message: data.message,
        status: data.status || 'new',
        notes: data.notes || '',
      })
      .returning({
        id: contactMessages.id,
        fullName: contactMessages.fullName,
        email: contactMessages.email,
        status: contactMessages.status,
        createdAt: contactMessages.createdAt,
      });

    return NextResponse.json(newInquiry[0], { status: 201 });
  } catch (error) {
    console.error('Create inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    );
  }
}
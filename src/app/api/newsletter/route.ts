import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { newsletterSubscribers } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { message: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    // Subscribe
    await db.insert(newsletterSubscribers).values({
      email,
      name: name || null,
      status: 'active',
    });

    // Send welcome email
    try {
      const { sendNewsletterWelcome } = await import('@/lib/email');
      await sendNewsletterWelcome(email, name);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      // Continue even if email fails
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

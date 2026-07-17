import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactMessages } from '@/db/schema';
import { sanitizeInput } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      companyName,
      country,
      email,
      phone,
      whatsapp,
      productInterest,
      quantity,
      message,
      honeypot,
    } = body;

    // Honeypot spam protection
    if (honeypot) {
      return NextResponse.json(
        { message: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!fullName || !country || !email || !message) {
      return NextResponse.json(
        { message: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      fullName: sanitizeInput(fullName),
      companyName: companyName ? sanitizeInput(companyName) : null,
      country: sanitizeInput(country),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : null,
      whatsapp: whatsapp ? sanitizeInput(whatsapp) : null,
      productInterest: productInterest ? sanitizeInput(productInterest) : null,
      quantity: quantity ? sanitizeInput(quantity) : null,
      message: sanitizeInput(message),
      status: 'new',
    };

    // Save to database
    await db.insert(contactMessages).values(sanitizedData);

    // Send email notification
    try {
      const { sendContactEmail } = await import('@/lib/email');
      await sendContactEmail(sanitizedData);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue even if email fails
    }

    return NextResponse.json(
      {
        message:
          'Thank you for your inquiry! Our team will contact you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}

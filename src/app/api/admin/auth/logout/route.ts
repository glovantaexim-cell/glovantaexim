import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('admin_session');
  cookies().delete('admin_email');
  return NextResponse.json({ success: true });
}

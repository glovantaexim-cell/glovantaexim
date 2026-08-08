import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  (await cookies()).delete('admin_session');
  (await cookies()).delete('admin_email');
  return NextResponse.json({ success: true });
}

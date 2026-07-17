import { NextResponse } from 'next/server';
import { getAdminFromCookies } from '@/lib/admin-auth';

export async function GET() {
  const admin = getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, email: admin.email });
}

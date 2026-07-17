import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Verify admin authentication from cookie.
 * Cookie name: admin_session
 * For simplicity the auth is verified by env-configured admin emails + password
 * (matching the existing /admin/login behavior).
 */
export function getAdminFromCookies(): { email: string } | null {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get('admin_email')?.value;
    const auth = cookieStore.get('admin_session')?.value;
    if (!email || !auth) return null;
    if (auth !== 'authenticated') return null;

    const allowed = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    if (!allowed.includes(email.toLowerCase())) return null;
    return { email };
  } catch {
    return null;
  }
}

export function verifyAdminAuth(req: NextRequest): { email: string } | null {
  // Try header first (Bearer) for client-side fetch helpers
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');
    if (token === process.env.ADMIN_PASSWORD) {
      return { email: 'header-auth' };
    }
  }
  return getAdminFromCookies();
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

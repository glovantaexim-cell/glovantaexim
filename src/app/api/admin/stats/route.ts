import { db } from '@/db';
import { blogs, contactMessages, categories, products } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get all products
    const allProducts = await db.query.products.findMany();
    const publishedProducts = allProducts.filter((p) => p.status === 'published').length;
    const draftProducts = allProducts.filter((p) => p.status === 'draft').length;

    // Get all categories
    const allCategories = await db.query.categories.findMany();

    // Get all blogs
    const allBlogs = await db.query.blogs.findMany();

    // Get all inquiries
    const allInquiries = await db.query.contactMessages.findMany();
    const unreadInquiries = allInquiries.filter((i) => i.status === 'new').length;

    // Get recent items
    const recentProducts = allProducts
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      )
      .slice(0, 5);

    const recentBlogs = allBlogs
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    const recentInquiries = allInquiries
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    return NextResponse.json({
      totalDehydratedProducts: allProducts.length,
      publishedProducts,
      draftProducts,
      totalCategories: allCategories.length,
      totalBlogs: allBlogs.length,
      totalInquiries: allInquiries.length,
      unreadInquiries,
      recentProducts: recentProducts.map((p) => ({
        id: p.id,
        name: p.title,
        form: p.productType,
        status: p.status,
      })),
      recentBlogs: recentBlogs.map((b) => ({
        id: b.id,
        title: b.title,
        status: b.status,
      })),
      recentInquiries: recentInquiries.map((i) => ({
        id: i.id,
        fullName: i.fullName,
        email: i.email,
        status: i.status,
      })),
    });
  } catch (error) {
    console.error('Stats API error:', error);
    // Return default stats if error
    return NextResponse.json({
      totalDehydratedProducts: 0,
      publishedProducts: 0,
      draftProducts: 0,
      totalCategories: 0,
      totalBlogs: 0,
      totalInquiries: 0,
      unreadInquiries: 0,
      recentProducts: [],
      recentBlogs: [],
      recentInquiries: [],
    });
  }
}

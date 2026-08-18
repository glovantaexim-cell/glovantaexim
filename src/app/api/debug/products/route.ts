import { NextResponse } from 'next/server';
import { spicesProducts } from '@/lib/spices-products';
import { textileProducts } from '@/lib/textile-products';
import { dehydratedProducts } from '@/lib/dehydrated-products';

export async function GET() {
  return NextResponse.json({
    spices: {
      count: spicesProducts.length,
      products: spicesProducts.map(p => ({ slug: p.slug, title: p.title }))
    },
    textile: {
      count: textileProducts.length,
      products: textileProducts.map(p => ({ slug: p.slug, title: p.title }))
    },
    dehydrated: {
      count: dehydratedProducts.length,
      products: dehydratedProducts.map(p => ({ slug: p.slug, title: p.title }))
    }
  });
}

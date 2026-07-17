'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const sampleBlogs = [
  {
    title: 'Top 10 Indian Spices Every Importer Should Know',
    excerpt: 'Discover the most sought-after Indian spices in the global market and their unique characteristics.',
    date: '2024-06-20',
    readTime: 5,
    slug: 'top-10-indian-spices',
  },
  {
    title: 'Benefits of Dehydrated Vegetables in Food Industry',
    excerpt: 'Learn why dehydrated vegetables are becoming the preferred choice for food manufacturers worldwide.',
    date: '2024-06-15',
    readTime: 4,
    slug: 'benefits-dehydrated-vegetables',
  },
  {
    title: 'Choosing Quality Hotel Linen: A Buyer\'s Guide',
    excerpt: 'Essential factors to consider when sourcing premium textile products for the hospitality industry.',
    date: '2024-06-10',
    readTime: 6,
    slug: 'hotel-linen-buyers-guide',
  },
];

export default function BlogPreviewSection() {
  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600">
              Industry news, tips, and expert advice
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/blog">
              View All Articles
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleBlogs.map((blog, index) => (
            <Card key={blog.slug} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>{blog.readTime} min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href={`/blog/${blog.slug}`}>
                    Read More
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/blog">
              View All Articles
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

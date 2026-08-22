import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { db } from '@/db';
import { blogs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/structured-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glovantaexim.com';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string) {
  try {
    const post = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1);
    
    return post[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt || `Read about ${post.title}`,
    keywords: post.keywords,
    alternates: {
      canonical: post.canonicalUrl || `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt || '',
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      images: post.ogImage || post.featuredImage ? [post.ogImage || post.featuredImage!] : [],
      publishedTime: post.publishDate?.toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt || '',
      images: post.ogImage || post.featuredImage ? [post.ogImage || post.featuredImage!] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = getArticleSchema({
    url: `${SITE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt || post.metaDescription || '',
    image: post.featuredImage || `${SITE_URL}/logo.png`,
    datePublished: post.publishDate?.toISOString() || post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: post.author,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />

      {/* Hero Section - Featured Image as Background */}
      <section className="relative min-h-[400px] md:min-h-[450px] lg:min-h-[500px] bg-gray-900 text-white overflow-hidden flex items-center">
        {/* Featured Image Background */}
        {post.featuredImage ? (
          <div className="absolute inset-0 z-0">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {/* Dynamic Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
          </div>
        ) : (
          /* Fallback for blogs without featured image */
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-800"></div>
        )}

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              {/* Back to Blog Link */}
              <Button 
                variant="ghost" 
                className="text-white/90 hover:text-white hover:bg-white/10 mb-6 md:mb-8 -ml-3 transition-all backdrop-blur-sm" 
                asChild
              >
                <Link href="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>

              {/* Category Badge */}
              {post.category && (
                <div className="mb-4 md:mb-6">
                  <span className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Blog Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 leading-tight text-white drop-shadow-2xl">
                {post.title}
              </h1>

              {/* Author and Date Metadata */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 backdrop-blur-sm bg-black/20 inline-flex px-4 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/70">Written by</span>
                    <span className="font-semibold text-white text-sm md:text-base">{post.author}</span>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  <div className="flex flex-col">
                    <span className="text-xs text-white/70">Published</span>
                    <span className="font-medium text-white text-sm md:text-base">
                      {new Date(post.publishDate || post.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                {post.readingTime && (
                  <>
                    <div className="w-px h-8 bg-white/20"></div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                      <div className="flex flex-col">
                        <span className="text-xs text-white/70">Reading time</span>
                        <span className="font-medium text-white text-sm md:text-base">{post.readingTime} min</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {post.excerpt && (
              <div className="text-xl text-gray-700 mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
                {post.excerpt}
              </div>
            )}

            <div className="prose prose-lg max-w-none blog-html-content">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: (() => {
                    const content = post.content.trim();
                    
                    // Check if content already contains HTML tags
                    const hasHTMLTags = /<(p|div|h1|h2|h3|table|ul|ol|article|section)/i.test(content);
                    
                    if (hasHTMLTags) {
                      // Content is already HTML, use it directly
                      return content;
                    } else {
                      // Content is plain text, convert to HTML
                      return content
                        .replace(/\n{3,}/g, '\n\n')
                        .replace(/\n\n/g, '</p><p>')
                        .replace(/\n/g, '<br />')
                        .replace(/^/, '<p>')
                        .replace(/$/, '</p>');
                    }
                  })()
                }}
              />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
              .blog-html-content {
                color: #1f2937;
                line-height: 1.75;
              }
              
              .blog-html-content p {
                margin-bottom: 1.25rem;
                line-height: 1.75;
              }
              
              .blog-html-content h1 {
                font-size: 2.5rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1.5rem;
                color: #111827;
                line-height: 1.2;
              }
              
              .blog-html-content h2 {
                font-size: 2rem;
                font-weight: 700;
                margin-top: 2.5rem;
                margin-bottom: 1.25rem;
                color: #111827;
                line-height: 1.3;
              }
              
              .blog-html-content h3 {
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 2rem;
                margin-bottom: 1rem;
                color: #111827;
                line-height: 1.4;
              }
              
              .blog-html-content ul {
                list-style-type: disc;
                padding-left: 1.5rem;
                margin-bottom: 1.5rem;
              }
              
              .blog-html-content ol {
                list-style-type: decimal;
                padding-left: 1.5rem;
                margin-bottom: 1.5rem;
              }
              
              .blog-html-content li {
                margin-bottom: 0.5rem;
                line-height: 1.75;
              }
              
              .blog-html-content table {
                width: 100%;
                border-collapse: collapse;
                margin: 2rem 0;
                background: white;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              }
              
              .blog-html-content thead {
                background: #f3f4f6;
              }
              
              .blog-html-content th {
                border: 1px solid #d1d5db;
                padding: 0.875rem 1rem;
                text-align: left;
                font-weight: 600;
                color: #111827;
              }
              
              .blog-html-content td {
                border: 1px solid #e5e7eb;
                padding: 0.75rem 1rem;
                color: #374151;
              }
              
              .blog-html-content tbody tr:hover {
                background: #f9fafb;
              }
              
              .blog-html-content hr {
                margin: 2.5rem 0;
                border: 0;
                border-top: 2px solid #e5e7eb;
              }
              
              .blog-html-content strong {
                font-weight: 600;
                color: #111827;
              }
              
              .blog-html-content em {
                font-style: italic;
              }
              
              .blog-html-content a {
                color: #2563eb;
                text-decoration: underline;
              }
              
              .blog-html-content a:hover {
                color: #1d4ed8;
              }
              
              .blog-html-content .table-responsive {
                overflow-x: auto;
                margin: 2rem 0;
              }
              
              .blog-html-content .contact-section {
                margin-top: 3rem;
                padding: 2rem;
                background: #f9fafb;
                border-radius: 0.5rem;
                border: 1px solid #e5e7eb;
              }
              
              .blog-html-content .contact-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                margin-top: 1.5rem;
              }
              
              .blog-html-content .contact-item h3 {
                font-size: 1.25rem;
                margin-bottom: 0.5rem;
                margin-top: 0;
              }
              
              .blog-html-content .contact-item p {
                margin-bottom: 0.5rem;
              }
              
              .blog-html-content article {
                display: block;
              }
              
              .blog-html-content .blog-footer {
                margin-top: 3rem;
                padding-top: 2rem;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                color: #6b7280;
              }
              
              .blog-html-content address {
                font-style: normal;
                line-height: 1.75;
              }
            ` }} />

            {/* Author Bio */}
            {post.authorBio && (
              <div className="mt-12 p-6 bg-gray-50 rounded-xl border">
                <h3 className="text-xl font-bold mb-2">About the Author</h3>
                <p className="text-gray-700">{post.authorBio}</p>
                <p className="text-gray-900 font-semibold mt-2">{post.author}</p>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-semibold">Share this article:</span>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ Section */}
      {post.faq && post.faq.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {post.faq.map((item: any, index: number) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-700">
                      {item.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Interested in Our Products?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a competitive quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/products">
                View Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

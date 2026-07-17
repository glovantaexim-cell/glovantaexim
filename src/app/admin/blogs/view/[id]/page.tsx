'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Edit2, ArrowLeft, Eye, Calendar, User, Tag, BarChart3 } from 'lucide-react';

export default function ViewBlogPage() {
  const router = useRouter();
  const params = useParams();
  
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const id = params?.id;
    if (id) {
      fetchBlog(id as string);
    }
  }, [params]);

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blogs/${id}`);
      if (response.ok) {
        const blogData = await response.json();
        setBlog(blogData);
      } else {
        alert('Blog not found');
        router.back();
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      alert('Failed to load blog');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout currentPage="blogs" onPageChange={() => {}}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading blog post...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!blog) {
    return (
      <AdminLayout currentPage="blogs" onPageChange={() => {}}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Blog Post Not Found</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="blogs" onPageChange={() => {}}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center text-slate-600 hover:text-slate-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </button>
            <h1 className="text-3xl font-bold text-slate-900">{blog.title}</h1>
            <p className="text-slate-500 mt-2">Blog Post Details</p>
          </div>
          <button
            onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Blog Post
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {blog.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.publishDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                {blog.category && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {blog.category}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  {blog.views || 0} views
                </div>
              </div>

              {blog.excerpt && (
                <div className="border-l-4 border-blue-500 pl-4 mb-6 bg-blue-50 p-4 rounded">
                  <h3 className="font-semibold text-slate-900 mb-2">Excerpt</h3>
                  <p className="text-slate-700 italic">{blog.excerpt}</p>
                </div>
              )}

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Content</h3>
                <div 
                  className="text-slate-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br>') }}
                />
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {blog.authorBio && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{blog.author}</h4>
                    <p className="text-slate-600">{blog.authorBio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Publication Status</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    blog.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : blog.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {blog.status}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Publish Date</label>
                  <p className="text-slate-900">
                    {new Date(blog.publishDate).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reading Time</label>
                  <p className="text-slate-900">
                    {blog.readingTime || Math.ceil((blog.content?.length || 0) / 1000)} min read
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Views</label>
                  <p className="text-slate-900 flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {blog.views || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">SEO Information</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">SEO Title</label>
                  <p className="text-slate-900 text-sm">{blog.seoTitle || blog.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
                  <p className="text-slate-600 text-sm">{blog.metaDescription || 'Not set'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Keywords</label>
                  <p className="text-slate-600 text-sm">{blog.keywords || 'Not set'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                  <p className="text-slate-900 text-sm font-mono bg-slate-50 px-2 py-1 rounded">
                    {blog.slug}
                  </p>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Timestamps</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Created</label>
                  <p className="text-slate-600">
                    {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Updated</label>
                  <p className="text-slate-600">
                    {new Date(blog.updatedAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
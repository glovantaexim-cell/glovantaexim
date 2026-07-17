'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Copy,
  Download,
  Calendar,
  User,
  Tag,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  author: string;
  category?: string;
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  views?: number;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

export function BlogManager({
  onEdit,
  onViewBlog,
  onAddBlog,
}: {
  onEdit: (id: number) => void;
  onViewBlog: (id: number) => void;
  onAddBlog: () => void;
}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const handleDuplicate = async (blog: Blog) => {
    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blog,
          id: undefined,
          title: `${blog.title} (Copy)`,
          slug: `${blog.slug}-copy-${Date.now()}`,
          status: 'draft',
        }),
      });

      if (response.ok) {
        const newBlog = await response.json();
        setBlogs([newBlog, ...blogs]);
      }
    } catch (error) {
      console.error('Failed to duplicate blog:', error);
    }
  };

  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filterStatus || blog.status === filterStatus;
      const matchesCategory = !filterCategory || blog.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
      return 0;
    });

  const exportCSV = () => {
    const csv = [
      ['Title', 'Author', 'Category', 'Status', 'Views', 'Publish Date', 'Created'],
      ...filteredBlogs.map((blog) => [
        blog.title,
        blog.author,
        blog.category || '-',
        blog.status,
        blog.views || 0,
        new Date(blog.publishDate).toLocaleDateString(),
        new Date(blog.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blogs-${Date.now()}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  // Get unique categories for filter
  const categories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Header with Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Blog Management</h2>
          <p className="text-slate-500 text-sm mt-1">
            {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onAddBlog}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Blog Post
          </button>
          <Button
            onClick={exportCSV}
            variant="outline"
            className="border-slate-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={filterCategory || ''}
              onChange={(e) => setFilterCategory(e.target.value || null)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="views">Most Views</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Blog List */}
      <Card className="shadow-md">
        <div className="overflow-x-auto">
          {filteredBlogs.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-slate-500">No blogs found</div>
              <button
                onClick={onAddBlog}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Your First Blog Post
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Blog Post
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Author
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Views
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Published
                  </th>
                  <th className="text-right px-6 py-4 font-semibold text-slate-700 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog, index) => (
                  <tr
                    key={blog.id}
                    className={`border-b border-slate-200 hover:bg-blue-50/50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {blog.featuredImage && (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <div className="font-medium text-slate-900">{blog.title}</div>
                          {blog.excerpt && (
                            <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                              {blog.excerpt}
                            </div>
                          )}
                          <div className="text-xs text-slate-500 mt-1">{blog.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-700">{blog.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {blog.category ? (
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-700">{blog.category}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          blog.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : blog.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{blog.views || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">
                          {new Date(blog.publishDate).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewBlog(blog.id)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => onEdit(blog.id)}
                          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(blog)}
                          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Summary */}
      {filteredBlogs.length > 0 && (
        <div className="text-sm text-slate-600 p-4 bg-slate-50 rounded-lg">
          Showing {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''} • 
          {filteredBlogs.filter(b => b.status === 'published').length} published • 
          {filteredBlogs.filter(b => b.status === 'draft').length} draft • 
          {filteredBlogs.filter(b => b.status === 'archived').length} archived
        </div>
      )}
    </div>
  );
}
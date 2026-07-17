'use client';

import React, { useEffect, useState } from 'react';
import {
  FolderOpen,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  totalDehydratedProducts: number;
  publishedProducts: number;
  draftProducts: number;
  totalCategories: number;
  totalBlogs: number;
  totalInquiries: number;
  unreadInquiries: number;
  recentProducts: any[];
  recentBlogs: any[];
  recentInquiries: any[];
}

export function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Set default values if API fails
        setStats({
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
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return <div>Error loading dashboard</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl p-6 md:p-8 text-white shadow-lg">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back! 👋</h1>
            <p className="text-blue-100">
              Here's an overview of your admin dashboard and recent activity
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{stats.totalInquiries}</div>
            <p className="text-sm text-blue-100">Total Inquiries</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Products
              </CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderOpen className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {stats.totalDehydratedProducts}
            </div>
            <p className="text-xs text-slate-500 mt-1">All product variants</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Published
              </CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {stats.publishedProducts}
            </div>
            <p className="text-xs text-slate-500 mt-1">Live on public site</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-yellow-600">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Draft
              </CardTitle>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {stats.draftProducts}
            </div>
            <p className="text-xs text-slate-500 mt-1">Ready to publish</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-purple-600">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Inquiries
              </CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {stats.totalInquiries}
            </div>
            <p className="text-xs text-slate-500 mt-1">Customer inquiries</p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.totalCategories}</div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.totalBlogs}</div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-red-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Unread Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.unreadInquiries}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-md">
        <CardHeader className="border-b bg-slate-50">
          <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('dehydrated-products')}
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📦</div>
              <div className="font-semibold text-slate-900 text-sm">Add Product</div>
              <div className="text-xs text-slate-600">Create new product</div>
            </button>

            <button
              onClick={() => onNavigate('blogs')}
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📝</div>
              <div className="font-semibold text-slate-900 text-sm">Write Blog</div>
              <div className="text-xs text-slate-600">Create new blog post</div>
            </button>

            <button
              onClick={() => onNavigate('dehydrated-categories')}
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📁</div>
              <div className="font-semibold text-slate-900 text-sm">Add Category</div>
              <div className="text-xs text-slate-600">Organize products</div>
            </button>

            <button
              onClick={() => onNavigate('inquiries')}
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💬</div>
              <div className="font-semibold text-slate-900 text-sm">View Inquiries</div>
              <div className="text-xs text-slate-600">Customer messages</div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card className="shadow-md">
          <CardHeader className="border-b bg-slate-50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-slate-900">Recent Products</CardTitle>
            <button
              onClick={() => onNavigate('dehydrated-products')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </CardHeader>
          <CardContent className="pt-6">
            {stats.recentProducts.length === 0 ? (
              <p className="text-slate-500 text-sm">No products yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentProducts.slice(0, 5).map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{product.name}</div>
                      <div className="text-xs text-slate-500">{product.form}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card className="shadow-md">
          <CardHeader className="border-b bg-slate-50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-slate-900">Recent Inquiries</CardTitle>
            <button
              onClick={() => onNavigate('inquiries')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </CardHeader>
          <CardContent className="pt-6">
            {stats.recentInquiries.length === 0 ? (
              <p className="text-slate-500 text-sm">No inquiries yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentInquiries.slice(0, 5).map((inquiry: any) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{inquiry.fullName}</div>
                      <div className="text-xs text-slate-500">{inquiry.email}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      inquiry.status === 'new'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Dashboard } from '@/components/admin/Dashboard';
import { UnifiedProductsManager } from '@/components/admin/UnifiedProductsManager';
import { BlogManager } from '@/components/admin/BlogManager';
import { InquiriesManager } from '@/components/admin/InquiriesManager';

export default function AdminDashboard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuth');

    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;

      case 'products-spices':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">🌶️ Spices Products</h1>
              <p className="text-slate-500 text-sm mt-1">Manage spices products, categories, and inventory</p>
            </div>
            <UnifiedProductsManager
              productType="spices"
              onEdit={(id, _type) => {
                window.location.href = `/admin/products/edit/${id}`;
              }}
              onViewProduct={(id, _type) => {
                window.location.href = `/admin/products/view/${id}`;
              }}
            />
          </div>
        );

      case 'products-dehydrated':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">🥬 Dehydrated Products</h1>
              <p className="text-slate-500 text-sm mt-1">Manage dehydrated products, categories, and inventory</p>
            </div>
            <UnifiedProductsManager
              productType="dehydrated"
              onEdit={(id, _type) => {
                window.location.href = `/admin/products/edit/${id}`;
              }}
              onViewProduct={(id, _type) => {
                window.location.href = `/admin/products/view/${id}`;
              }}
            />
          </div>
        );

      case 'products-textile':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">🧣 Textile Products</h1>
              <p className="text-slate-500 text-sm mt-1">Manage textile products, categories, and inventory</p>
            </div>
            <UnifiedProductsManager
              productType="textile"
              onEdit={(id, _type) => {
                window.location.href = `/admin/products/edit/${id}`;
              }}
              onViewProduct={(id, _type) => {
                window.location.href = `/admin/products/view/${id}`;
              }}
            />
          </div>
        );

      case 'blogs':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">📝 Blog Management</h1>
              <p className="text-slate-500 text-sm mt-1">Create, edit, and manage blog posts</p>
            </div>
            <BlogManager
              onEdit={(id) => {
                window.location.href = `/admin/blogs/edit/${id}`;
              }}
              onViewBlog={(id) => {
                window.location.href = `/admin/blogs/view/${id}`;
              }}
              onAddBlog={() => {
                window.location.href = '/admin/blogs/add';
              }}
            />
          </div>
        );

      case 'inquiries':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">📧 Inquiries Management</h1>
              <p className="text-slate-500 text-sm mt-1">Manage customer inquiries and contact messages</p>
            </div>
            <InquiriesManager
              onViewInquiry={(id) => {
                window.location.href = `/admin/inquiries/view/${id}`;
              }}
              onEditInquiry={(id) => {
                window.location.href = `/admin/inquiries/edit/${id}`;
              }}
            />
          </div>
        );

      case 'settings':
        return (
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Settings</h1>
            <p className="text-slate-600">Coming soon...</p>
          </div>
        );

      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </AdminLayout>
  );
}

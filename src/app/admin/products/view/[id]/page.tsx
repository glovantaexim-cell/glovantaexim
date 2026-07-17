'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Edit2, ArrowLeft } from 'lucide-react';

export default function ViewProductPage() {
  const router = useRouter();
  const params = useParams();
  
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    const id = params?.id;
    if (id) {
      fetchProduct(id as string);
    }
  }, [params]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`);
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);
        
        // Fetch category details
        if (productData.categoryId) {
          const categoryResponse = await fetch('/api/admin/categories');
          if (categoryResponse.ok) {
            const categories = await categoryResponse.json();
            const productCategory = categories.find((cat: any) => cat.id === productData.categoryId);
            setCategory(productCategory);
          }
        }
      } else {
        alert('Product not found');
        router.back();
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      alert('Failed to load product');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout currentPage="products" onPageChange={() => {}}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading product...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!product) {
    return (
      <AdminLayout currentPage="products" onPageChange={() => {}}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
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
    <AdminLayout currentPage="products" onPageChange={() => {}}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center text-slate-600 hover:text-slate-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </button>
            <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
            <p className="text-slate-500 mt-2">Product Details</p>
          </div>
          <button
            onClick={() => router.push(`/admin/products/edit/${product.id}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Product
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Product Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <p className="text-slate-900 text-lg font-medium">{product.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                  <p className="text-slate-600 font-mono text-sm bg-slate-50 px-3 py-2 rounded">
                    {product.slug}
                  </p>
                </div>

                {product.description && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <p className="text-slate-900 leading-relaxed">{product.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Status</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Publication Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : product.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {product.status}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Featured</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.featured
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {product.featured ? '⭐ Featured' : 'Not Featured'}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <p className="text-slate-900 font-medium">
                    {category ? category.title : 'Unknown Category'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Timestamps</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Created</label>
                  <p className="text-slate-600">
                    {new Date(product.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Updated</label>
                  <p className="text-slate-600">
                    {new Date(product.updatedAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
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
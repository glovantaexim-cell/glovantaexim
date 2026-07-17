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
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: number;
  title?: string;
  name?: string;
  slug: string;
  productType?: string;
  form?: string;
  categoryId?: number;
  categoryName?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  createdAt: string;
  type: 'dehydrated' | 'product'; // To distinguish between table types
}

interface CategoryGroup {
  categoryName: string;
  categoryId?: number;
  productType?: string;
  products: Product[];
}

export function UnifiedProductsManager({
  productType = 'all',
  onEdit,
  onViewProduct,
}: {
  productType?: 'spices' | 'dehydrated' | 'textile' | 'all';
  onEdit: (id: number, type: 'dehydrated' | 'product') => void;
  onViewProduct: (id: number, type: 'dehydrated' | 'product') => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      let allProducts: Product[] = [];

      // Fetch only regular products (from products table)
      try {
        const productsRes = await fetch('/api/admin/products');
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          if (Array.isArray(productsData)) {
            allProducts = allProducts.concat(
              productsData.map((p: any) => ({
                ...p,
                type: 'product',
                categoryName: p.categoryName || 'General',
                name: p.title,
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }

      setProducts(allProducts);
      // Auto-expand first 3 categories
      const categories = [...new Set(allProducts.map((p) => p.categoryName))];
      setExpandedCategories(categories.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((p) => {
      // Filter by product type (all are 'product' since dehydrated_products table doesn't exist)
      if (productType === 'dehydrated' && p.categoryName !== 'Dehydrated') return false;
      if (productType === 'spices' && p.categoryName !== 'Spices') return false;
      if (productType === 'textile' && p.categoryName !== 'Textile') return false;
      
      return true;
    })
    .filter((p) => {
      const title = p.name || p.title || '';
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .filter((p) => !filterStatus || p.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      const nameA = (a.name || a.title || '').toLowerCase();
      const nameB = (b.name || b.title || '').toLowerCase();
      if (sortBy === 'name') return nameA.localeCompare(nameB);
      return 0;
    });

  // Group by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const categoryName = product.categoryName;
    const existing = acc.find((g) => g.categoryName === categoryName);
    if (existing) {
      existing.products.push(product);
    } else {
      acc.push({
        categoryName,
        categoryId: product.categoryId,
        productType: product.productType,
        products: [product],
      });
    }
    return acc;
  }, [] as CategoryGroup[]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleDelete = async (id: number, type: 'dehydrated' | 'product') => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const endpoint =
        type === 'dehydrated'
          ? `/api/admin/dehydrated/products/${id}`
          : `/api/admin/products/${id}`;

      const response = await fetch(endpoint, { method: 'DELETE' });

      if (response.ok) {
        setProducts(products.filter((p) => !(p.id === id && p.type === type)));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleDuplicate = async (product: Product) => {
    try {
      const endpoint =
        product.type === 'dehydrated'
          ? '/api/admin/dehydrated/products'
          : '/api/admin/products';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          id: undefined,
          title: product.type === 'product' ? `${product.title} (Copy)` : undefined,
          name: product.type === 'dehydrated' ? `${product.name} (Copy)` : undefined,
          slug: `${product.slug}-copy-${Date.now()}`,
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([
          {
            ...newProduct,
            type: product.type,
            categoryName: product.categoryName,
            title: product.type === 'product' ? newProduct.title : undefined,
            name: product.type === 'dehydrated' ? newProduct.name : undefined,
          },
          ...products,
        ]);
      }
    } catch (error) {
      console.error('Failed to duplicate product:', error);
    }
  };

  const exportCSV = () => {
    const csv = [
      ['Category', 'Name', 'Type', 'Slug', 'Status', 'Featured', 'Created'],
      ...filteredProducts.map((p) => [
        p.categoryName,
        p.name || p.title,
        p.type === 'dehydrated' ? 'Dehydrated' : 'Spices/Textile',
        p.slug,
        p.status,
        p.featured ? 'Yes' : 'No',
        new Date(p.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-products-${Date.now()}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading all products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">All Products</h2>
          <p className="text-slate-500 text-sm mt-1">
            {filteredProducts.length} products
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              // Navigate to add product page
              window.location.href = `/admin/products/add?type=${productType}`;
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
          <button
            onClick={() => {
              // Navigate to categories management
              window.location.href = `/admin/categories?type=${productType}`;
            }}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            📁 Manage Categories
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search products..."
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>

            <Button
              onClick={exportCSV}
              variant="outline"
              className="border-slate-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products by Category */}
      <div className="space-y-4">
        {groupedProducts.length === 0 ? (
          <Card className="shadow-md">
            <CardContent className="p-12 text-center">
              <div className="text-slate-500">No products found</div>
            </CardContent>
          </Card>
        ) : (
          groupedProducts.map((group) => (
            <Card key={group.categoryName} className="shadow-md overflow-hidden">
              {/* Category Header */}
              <div
                onClick={() => toggleCategory(group.categoryName)}
                className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-4 cursor-pointer hover:bg-blue-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {expandedCategories.includes(group.categoryName) ? (
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900">{group.categoryName}</h3>
                    <p className="text-sm text-slate-600">{group.products.length} products</p>
                  </div>
                </div>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {group.products.length}
                </div>
              </div>

              {/* Products List */}
              {expandedCategories.includes(group.categoryName) && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                          Name
                        </th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                          Type
                        </th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                          Status
                        </th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                          Featured
                        </th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                          Created
                        </th>
                        <th className="text-right px-6 py-4 font-semibold text-slate-700 text-sm">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.products.map((product, index) => (
                        <tr
                          key={`${product.type}-${product.id}`}
                          className={`border-b border-slate-200 hover:bg-blue-50/50 transition-colors ${
                            index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">
                              {product.name || product.title}
                            </div>
                            <div className="text-xs text-slate-500">{product.slug}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-700 capitalize">
                              {product.form || product.productType || '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                product.status === 'published'
                                  ? 'bg-green-100 text-green-700'
                                  : product.status === 'draft'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {product.featured ? (
                              <span className="text-sm text-slate-700">⭐ Featured</span>
                            ) : (
                              <span className="text-sm text-slate-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {new Date(product.createdAt).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => onViewProduct(product.id, product.type)}
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                title="View"
                              >
                                <Eye className="w-4 h-4 text-blue-600" />
                              </button>
                              <button
                                onClick={() => onEdit(product.id, product.type)}
                                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4 text-slate-600" />
                              </button>
                              <button
                                onClick={() => handleDuplicate(product)}
                                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Duplicate"
                              >
                                <Copy className="w-4 h-4 text-slate-600" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id, product.type)}
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
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredProducts.length > 0 && (
        <div className="text-sm text-slate-600 p-4 bg-slate-50 rounded-lg">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? 's' : ''} across{' '}
          {groupedProducts.length} categor{groupedProducts.length !== 1 ? 'ies' : 'y'}
        </div>
      )}
    </div>
  );
}

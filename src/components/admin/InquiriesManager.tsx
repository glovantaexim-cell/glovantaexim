'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  Mail,
  Phone,
  Globe,
  Building,
  Package,
  MessageSquare,
  Eye,
  Edit2,
  Trash2,
  Download,
  Filter,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Inquiry {
  id: number;
  fullName: string;
  companyName?: string;
  country: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  productInterest?: string;
  quantity?: string;
  message: string;
  status: 'new' | 'in_progress' | 'closed';
  notes?: string;
  createdAt: string;
}

interface InquiryStats {
  total: number;
  new: number;
  inProgress: number;
  closed: number;
  recent: number;
  topProducts: Array<{ product: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
}

export function InquiriesManager({
  onViewInquiry,
  onEditInquiry,
}: {
  onViewInquiry: (id: number) => void;
  onEditInquiry: (id: number) => void;
}) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<InquiryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    fetchInquiries();
    fetchStats();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/inquiries/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
    }
  };

  const handleStatusUpdate = async (id: number, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });

      if (response.ok) {
        const updatedInquiry = await response.json();
        setInquiries(inquiries.map((inquiry) => 
          inquiry.id === id ? { ...inquiry, status: updatedInquiry.status, notes: updatedInquiry.notes } : inquiry
        ));
        setShowStatusModal(false);
        setSelectedInquiry(null);
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Failed to update inquiry status:', error);
    }
  };

  const filteredInquiries = inquiries
    .filter((inquiry) => {
      const matchesSearch = 
        inquiry.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filterStatus || inquiry.status === filterStatus;
      const matchesCountry = !filterCountry || inquiry.country === filterCountry;
      return matchesSearch && matchesStatus && matchesCountry;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'name') return a.fullName.localeCompare(b.fullName);
      return 0;
    });

  const exportCSV = () => {
    const csv = [
      ['Name', 'Company', 'Email', 'Phone', 'Country', 'Product Interest', 'Status', 'Message', 'Date'],
      ...filteredInquiries.map((inquiry) => [
        inquiry.fullName,
        inquiry.companyName || '-',
        inquiry.email,
        inquiry.phone || '-',
        inquiry.country,
        inquiry.productInterest || '-',
        inquiry.status,
        inquiry.message.replace(/"/g, '""'), // Escape quotes
        new Date(inquiry.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${Date.now()}.csv`;
    a.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  // Get unique countries for filter
  const countries = [...new Set(inquiries.map(inquiry => inquiry.country))].sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Dashboard */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-slate-600">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
              <p className="text-xs text-slate-600">Pending response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
              <p className="text-xs text-slate-600">Being handled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.closed}</div>
              <p className="text-xs text-slate-600">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent (30d)</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recent}</div>
              <p className="text-xs text-slate-600">Last 30 days</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Inquiries Management</h2>
          <p className="text-slate-500 text-sm mt-1">
            {filteredInquiries.length} inquir{filteredInquiries.length !== 1 ? 'ies' : 'y'}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
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
                placeholder="Search inquiries..."
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
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={filterCountry || ''}
              onChange={(e) => setFilterCountry(e.target.value || null)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
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
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <Card className="shadow-md">
        <div className="overflow-x-auto">
          {filteredInquiries.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <div className="text-slate-500 mb-2">No inquiries found</div>
              <p className="text-sm text-slate-400">Inquiries will appear here when customers contact you</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Company & Location
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Product Interest
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 font-semibold text-slate-700 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry, index) => (
                  <tr
                    key={inquiry.id}
                    className={`border-b border-slate-200 hover:bg-blue-50/50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">{inquiry.fullName}</div>
                        <div className="flex items-center gap-1 text-sm text-slate-600 mt-1">
                          <Mail className="w-3 h-3" />
                          {inquiry.email}
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Phone className="w-3 h-3" />
                            {inquiry.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        {inquiry.companyName && (
                          <div className="flex items-center gap-1 text-sm text-slate-900 mb-1">
                            <Building className="w-3 h-3" />
                            {inquiry.companyName}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Globe className="w-3 h-3" />
                          {inquiry.country}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {inquiry.productInterest ? (
                        <div>
                          <div className="flex items-center gap-1 text-sm text-slate-900 mb-1">
                            <Package className="w-3 h-3" />
                            {inquiry.productInterest}
                          </div>
                          {inquiry.quantity && (
                            <div className="text-xs text-slate-600">Qty: {inquiry.quantity}</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setShowStatusModal(true);
                        }}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer hover:opacity-80 ${getStatusColor(inquiry.status)}`}
                      >
                        {getStatusIcon(inquiry.status)}
                        {inquiry.status.replace('_', ' ')}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Calendar className="w-3 h-3" />
                        {new Date(inquiry.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewInquiry(inquiry.id)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => onEditInquiry(inquiry.id)}
                          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                          title="Update Status"
                        >
                          <Edit2 className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry.id)}
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

      {/* Top Products & Countries Insights */}
      {stats && (stats.topProducts.length > 0 || stats.topCountries.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.topProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Product Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topProducts.map((product, index) => (
                    <div key={product.product} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-slate-400'}`} />
                        <span className="text-sm text-slate-700">{product.product}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">{product.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {stats.topCountries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topCountries.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-slate-400'}`} />
                        <span className="text-sm text-slate-700">{country.country}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">{country.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Update Status: {selectedInquiry.fullName}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  defaultValue={selectedInquiry.status}
                  onChange={(e) => {
                    const status = e.target.value;
                    const textarea = document.getElementById('notes') as HTMLTextAreaElement;
                    handleStatusUpdate(selectedInquiry.id, status, textarea?.value);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                <textarea
                  id="notes"
                  defaultValue={selectedInquiry.notes || ''}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add internal notes..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedInquiry(null);
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {filteredInquiries.length > 0 && (
        <div className="text-sm text-slate-600 p-4 bg-slate-50 rounded-lg">
          Showing {filteredInquiries.length} inquir{filteredInquiries.length !== 1 ? 'ies' : 'y'} • 
          {filteredInquiries.filter(i => i.status === 'new').length} new • 
          {filteredInquiries.filter(i => i.status === 'in_progress').length} in progress • 
          {filteredInquiries.filter(i => i.status === 'closed').length} closed
        </div>
      )}
    </div>
  );
}
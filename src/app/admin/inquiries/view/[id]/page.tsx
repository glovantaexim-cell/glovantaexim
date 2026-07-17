'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { 
  ArrowLeft, 
  Edit2, 
  Mail, 
  Phone, 
  Globe, 
  Building, 
  Package, 
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Copy
} from 'lucide-react';

export default function ViewInquiryPage() {
  const router = useRouter();
  const params = useParams();
  
  const [loading, setLoading] = useState(true);
  const [inquiry, setInquiry] = useState<any>(null);

  useEffect(() => {
    const id = params?.id;
    if (id) {
      fetchInquiry(id as string);
    }
  }, [params]);

  const fetchInquiry = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`);
      if (response.ok) {
        const inquiryData = await response.json();
        setInquiry(inquiryData);
      } else {
        alert('Inquiry not found');
        router.back();
      }
    } catch (error) {
      console.error('Failed to fetch inquiry:', error);
      alert('Failed to load inquiry');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'closed': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-5 h-5" />;
      case 'in_progress': return <Clock className="w-5 h-5" />;
      case 'closed': return <CheckCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  if (loading) {
    return (
      <AdminLayout currentPage="inquiries" onPageChange={() => {}}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading inquiry...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!inquiry) {
    return (
      <AdminLayout currentPage="inquiries" onPageChange={() => {}}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Inquiry Not Found</h1>
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
    <AdminLayout currentPage="inquiries" onPageChange={() => {}}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center text-slate-600 hover:text-slate-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inquiries
            </button>
            <h1 className="text-3xl font-bold text-slate-900">Inquiry from {inquiry.fullName}</h1>
            <p className="text-slate-500 mt-2">Received on {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</p>
          </div>
          <button
            onClick={() => router.push(`/admin/inquiries/edit/${inquiry.id}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Update Status
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Message */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Message
              </h2>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
              </div>
            </div>

            {/* Product Interest */}
            {inquiry.productInterest && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Interest
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product</label>
                    <p className="text-slate-900 font-medium">{inquiry.productInterest}</p>
                  </div>
                  {inquiry.quantity && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                      <p className="text-slate-900 font-medium">{inquiry.quantity}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Admin Notes */}
            {inquiry.notes && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Internal Notes</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-slate-700 whitespace-pre-wrap">{inquiry.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Status</h3>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(inquiry.status)}`}>
                {getStatusIcon(inquiry.status)}
                <span className="font-medium capitalize">{inquiry.status.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <p className="text-slate-900 font-medium">{inquiry.fullName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      {inquiry.email}
                    </a>
                    <button
                      onClick={() => copyToClipboard(inquiry.email)}
                      className="p-1 hover:bg-slate-100 rounded"
                      title="Copy email"
                    >
                      <Copy className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                </div>

                {inquiry.phone && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        {inquiry.phone}
                      </a>
                      <button
                        onClick={() => copyToClipboard(inquiry.phone)}
                        className="p-1 hover:bg-slate-100 rounded"
                        title="Copy phone"
                      >
                        <Copy className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>
                  </div>
                )}

                {inquiry.whatsapp && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <button
                        onClick={() => openWhatsApp(inquiry.whatsapp)}
                        className="text-green-600 hover:text-green-700 underline flex items-center gap-1"
                      >
                        {inquiry.whatsapp}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-900">{inquiry.country}</span>
                  </div>
                </div>

                {inquiry.companyName && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-900 font-medium">{inquiry.companyName}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Timeline</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Received</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 text-sm">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Inquiry ID</label>
                  <span className="text-slate-600 text-sm font-mono">#{inquiry.id}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <a
                  href={`mailto:${inquiry.email}?subject=Re: Your inquiry about ${inquiry.productInterest || 'our products'}&body=Dear ${inquiry.fullName},%0D%0A%0D%0AThank you for your inquiry. `}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>

                {inquiry.whatsapp && (
                  <button
                    onClick={() => openWhatsApp(inquiry.whatsapp)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Message on WhatsApp
                  </button>
                )}

                {inquiry.phone && (
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Directly
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
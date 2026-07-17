'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ArrowLeft, Save, AlertCircle, Clock, CheckCircle } from 'lucide-react';

export default function EditInquiryPage() {
  const router = useRouter();
  const params = useParams();
  
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [inquiry, setInquiry] = useState<any>(null);
  const [formData, setFormData] = useState({
    status: 'new' as 'new' | 'in_progress' | 'closed',
    notes: '',
  });

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
        setFormData({
          status: inquiryData.status || 'new',
          notes: inquiryData.notes || '',
        });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const id = params?.id;
    if (!id) return;

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Inquiry updated successfully!');
        router.back();
      } else {
        const error = await response.json();
        alert(`Failed to update inquiry: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to update inquiry:', error);
      alert('Failed to update inquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'new':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          color: 'text-blue-600',
          bg: 'bg-blue-50 border-blue-200',
          title: 'New Inquiry',
          description: 'This inquiry has not been reviewed yet and requires attention.',
        };
      case 'in_progress':
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50 border-yellow-200',
          title: 'In Progress',
          description: 'This inquiry is currently being handled and requires follow-up.',
        };
      case 'closed':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          color: 'text-green-600',
          bg: 'bg-green-50 border-green-200',
          title: 'Closed',
          description: 'This inquiry has been resolved and no further action is needed.',
        };
      default:
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          color: 'text-slate-600',
          bg: 'bg-slate-50 border-slate-200',
          title: 'Unknown',
          description: 'Status unknown.',
        };
    }
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

  const currentStatusInfo = getStatusInfo(formData.status);

  return (
    <AdminLayout currentPage="inquiries" onPageChange={() => {}}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Inquiry
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Update Inquiry Status</h1>
          <p className="text-slate-500 mt-2">
            Managing inquiry from <strong>{inquiry.fullName}</strong> ({inquiry.email})
          </p>
        </div>

        {/* Inquiry Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Inquiry Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-slate-700 font-medium mb-1">From</label>
              <p className="text-slate-900">{inquiry.fullName}</p>
              {inquiry.companyName && (
                <p className="text-slate-600">{inquiry.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Contact</label>
              <p className="text-slate-900">{inquiry.email}</p>
              {inquiry.phone && (
                <p className="text-slate-600">{inquiry.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Country</label>
              <p className="text-slate-900">{inquiry.country}</p>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Received</label>
              <p className="text-slate-900">
                {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>

            {inquiry.productInterest && (
              <div className="md:col-span-2">
                <label className="block text-slate-700 font-medium mb-1">Product Interest</label>
                <p className="text-slate-900">{inquiry.productInterest}</p>
                {inquiry.quantity && (
                  <p className="text-slate-600">Quantity: {inquiry.quantity}</p>
                )}
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-medium mb-1">Message</label>
              <p className="text-slate-700 bg-slate-50 p-3 rounded text-sm leading-relaxed">
                {inquiry.message}
              </p>
            </div>
          </div>
        </div>

        {/* Status Update Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Status Management</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Current Status
                </label>
                
                <div className="space-y-3">
                  {['new', 'in_progress', 'closed'].map((status) => {
                    const statusInfo = getStatusInfo(status);
                    return (
                      <label
                        key={status}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.status === status 
                            ? `${statusInfo.bg} ${statusInfo.color} border-current` 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="status"
                            value={status}
                            checked={formData.status === status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                            className="mt-1"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={formData.status === status ? statusInfo.color : 'text-slate-400'}>
                                {statusInfo.icon}
                              </span>
                              <span className="font-medium text-slate-900">
                                {statusInfo.title}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600">
                              {statusInfo.description}
                            </p>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Internal Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Add internal notes about this inquiry (not visible to customer)..."
              />
              <p className="text-xs text-slate-500 mt-1">
                Use this space to track communication, decisions, or next steps.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isLoading ? 'Updating...' : 'Update Status'}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Status Change Preview */}
        {formData.status !== inquiry.status && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h3 className="font-medium text-blue-900 mb-2">Status Change Preview</h3>
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <span className="capitalize">{inquiry.status.replace('_', ' ')}</span>
              <span>→</span>
              <span className="capitalize font-medium">{formData.status.replace('_', ' ')}</span>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
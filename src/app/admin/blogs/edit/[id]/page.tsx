'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { X, Image as ImageIcon, Loader2, Upload, Link2 } from 'lucide-react';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [customImageName, setCustomImageName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: '',
    authorBio: '',
    category: '',
    tags: [] as string[],
    featuredImage: '',
    seoTitle: '',
    metaDescription: '',
    keywords: '',
    status: 'draft' as 'draft' | 'published',
    publishDate: '',
  });

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
        const blog = await response.json();
        setFormData({
          title: blog.title || '',
          slug: blog.slug || '',
          content: blog.content || '',
          excerpt: blog.excerpt || '',
          author: blog.author || '',
          authorBio: blog.authorBio || '',
          category: blog.category || '',
          tags: blog.tags || [],
          featuredImage: blog.featuredImage || '',
          seoTitle: blog.seoTitle || '',
          metaDescription: blog.metaDescription || '',
          keywords: blog.keywords || '',
          status: blog.status || 'draft',
          publishDate: blog.publishDate ? new Date(blog.publishDate).toISOString().split('T')[0] : '',
        });
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

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'blog-images');
      
      // Add custom image name if provided
      if (customImageName.trim()) {
        uploadFormData.append('customName', customImageName.trim());
      }

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: uploadFormData,
      });

      if (response.ok) {
        const result = await response.json();
        setFormData(prev => ({ ...prev, featuredImage: result.url }));
        setCustomImageName(''); // Reset custom name after successful upload
        alert('Image uploaded successfully!');
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleImageUrlSubmit = async () => {
    if (!imageUrl.trim()) {
      alert('Please enter an image URL');
      return;
    }

    setImageUploading(true);
    
    try {
      // Validate if the URL is accessible
      const img = new Image();
      img.onload = () => {
        setFormData(prev => ({ ...prev, featuredImage: imageUrl.trim() }));
        setImageUrl('');
        alert('Image URL added successfully!');
        setImageUploading(false);
      };
      img.onerror = () => {
        alert('Failed to load image from URL. Please check if the URL is valid and accessible.');
        setImageUploading(false);
      };
      img.src = imageUrl.trim();
    } catch (error) {
      console.error('URL validation error:', error);
      alert('Failed to validate image URL');
      setImageUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      // Check if it's an image
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      } else {
        alert('Please drop an image file');
      }
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const tag = target.value.trim();
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag],
        }));
        target.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('[Frontend] Updating blog post:', {
      title: formData.title,
      slug: formData.slug,
      author: formData.author,
      status: formData.status,
      hasFeaturedImage: !!formData.featuredImage,
      hasContent: !!formData.content,
      publishDate: formData.publishDate,
    });
    
    setIsLoading(true);

    const id = params?.id;
    if (!id) return;

    try {
      console.log('[Frontend] Sending PUT request to /api/admin/blogs/' + id);
      
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('[Frontend] Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('[Frontend] Blog updated successfully:', result);
        alert('Blog post updated successfully!');
        router.back();
      } else {
        const error = await response.json();
        console.error('[Frontend] Update blog failed:', error);
        alert(`Failed to update blog: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('[Frontend] Update error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to update blog post: ${errorMessage}. Check the browser console for details.`);
    } finally {
      setIsLoading(false);
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

  return (
    <AdminLayout currentPage="blogs" onPageChange={() => {}}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">✏️ Edit Blog Post</h1>
          <p className="text-slate-500 mt-2">Update blog post information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" suppressHydrationWarning>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="blog-post-slug"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the blog post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={12}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your blog content here..."
                    required
                  />
                </div>
              </div>

              {/* SEO Settings */}
              <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">SEO Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SEO optimized title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Meta description for search engines"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SEO keywords (comma separated)"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Image Upload */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Featured Image</h3>
                
                {/* Toggle between Upload and URL - Always visible */}
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setImageInputMode('upload')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      imageInputMode === 'upload'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Upload className="w-4 h-4 inline-block mr-1" />
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode('url')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      imageInputMode === 'url'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Link2 className="w-4 h-4 inline-block mr-1" />
                    URL
                  </button>
                </div>

                {/* Current Image Preview */}
                {formData.featuredImage && (
                  <div className="relative mb-4">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                      Current Image
                    </div>
                  </div>
                )}

                {/* Upload Mode */}
                {imageInputMode === 'upload' && (
                  <>
                    {/* Custom Name Input */}
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Custom Image Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={customImageName}
                        onChange={(e) => setCustomImageName(e.target.value)}
                        placeholder="e.g., blog-banner-2024"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-slate-400 mt-1">
                        Leave empty to use original filename
                      </p>
                    </div>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      {imageUploading ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                          <span className="text-sm text-slate-600">Uploading...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                          <span className="text-sm text-slate-600">
                            {formData.featuredImage ? 'Click to change image' : 'Click or drag & drop to upload'}
                          </span>
                          <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* URL Mode */}
                {imageInputMode === 'url' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleImageUrlSubmit();
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleImageUrlSubmit}
                      disabled={imageUploading || !imageUrl.trim()}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {imageUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Validating...
                        </>
                      ) : (
                        <>
                          <Link2 className="w-4 h-4" />
                          {formData.featuredImage ? 'Change to URL Image' : 'Add Image URL'}
                        </>
                      )}
                    </button>
                    <p className="text-xs text-slate-400">
                      Enter a direct link to an image hosted online
                    </p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Author & Category */}
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Author & Category</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Author Bio
                  </label>
                  <textarea
                    value={formData.authorBio}
                    onChange={(e) => setFormData(prev => ({ ...prev, authorBio: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief author bio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Blog category"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
                
                <div>
                  <input
                    type="text"
                    onKeyDown={handleTagInput}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type tag and press Enter"
                  />
                  <p className="text-xs text-slate-500 mt-1">Press Enter or comma to add tags</p>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Publishing */}
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Publishing</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Updating...' : 'Update Blog Post'}
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
    </AdminLayout>
  );
}
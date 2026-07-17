'use client';

import React, { useState, useRef } from 'react';
import { Upload, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UploadedImage {
  id: string;
  url: string;
  alt: string;
  cloudinaryId?: string;
  width?: number;
  height?: number;
  featured?: boolean;
  loading?: boolean;
  error?: string;
}

interface ImageUploaderProps {
  onImagesChange: (images: UploadedImage[]) => void;
  existingImages?: UploadedImage[];
  maxImages?: number;
  maxFileSize?: number; // in MB
}

export function ImageUploader({
  onImagesChange,
  existingImages = [],
  maxImages = 10,
  maxFileSize = 5,
}: ImageUploaderProps) {
  const [images, setImages] = useState<UploadedImage[]>(existingImages);
  const [urlInput, setUrlInput] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [method, setMethod] = useState<'drag-drop' | 'url'>('drag-drop');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<UploadedImage | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'glovanta_products');
      formData.append('folder', 'products');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      return {
        id: `img-${Date.now()}`,
        url: data.secure_url,
        alt: file.name,
        cloudinaryId: data.public_id,
        width: data.width,
        height: data.height,
      };
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      return null;
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    );

    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Add loading indicators
    const loadingImages = files.map((file) => ({
      id: `loading-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      alt: file.name,
      loading: true,
    }));

    setImages((prev) => [...prev, ...loadingImages]);

    // Upload all files
    const uploadedImages = await Promise.all(
      files.map((file) => uploadToCloudinary(file))
    );

    // Remove loading indicators and add uploaded images
    setImages((prev) => {
      const filtered = prev.filter((img) => !img.loading);
      const newImages = uploadedImages.filter((img) => img !== null) as UploadedImage[];
      return [...filtered, ...newImages];
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);

    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    const loadingImages = files.map((file) => ({
      id: `loading-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      alt: file.name,
      loading: true,
    }));

    setImages((prev) => [...prev, ...loadingImages]);

    const uploadedImages = await Promise.all(
      files.map((file) => uploadToCloudinary(file))
    );

    setImages((prev) => {
      const filtered = prev.filter((img) => !img.loading);
      const newImages = uploadedImages.filter((img) => img !== null) as UploadedImage[];
      return [...filtered, ...newImages];
    });
  };

  const handleAddUrl = async () => {
    if (!urlInput.trim()) return;

    setUrlLoading(true);
    try {
      // Validate URL
      const urlObj = new URL(urlInput);

      const newImage: UploadedImage = {
        id: `img-${Date.now()}`,
        url: urlInput,
        alt: 'Pasted image',
      };

      setImages((prev) => [...prev, newImage]);
      setUrlInput('');
    } catch (error) {
      alert('Invalid URL');
    } finally {
      setUrlLoading(false);
    }
  };

  const removeImage = (id: string) => {
    const filtered = images.filter((img) => img.id !== id);
    setImages(filtered);
    onImagesChange(filtered);
  };

  const setFeatured = (id: string) => {
    const updated = images.map((img) => ({
      ...img,
      featured: img.id === id,
    }));
    setImages(updated);
    onImagesChange(updated);
  };

  const updateAlt = (id: string, alt: string) => {
    const updated = images.map((img) => (img.id === id ? { ...img, alt } : img));
    setImages(updated);
    onImagesChange(updated);
  };

  // Sync images with parent
  React.useEffect(() => {
    onImagesChange(images.filter((img) => !img.loading));
  }, [images]);

  return (
    <div className="space-y-6">
      {/* Method Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setMethod('drag-drop')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            method === 'drag-drop'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          📁 Upload Files
        </button>
        <button
          onClick={() => setMethod('url')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            method === 'url'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          🔗 Paste URL
        </button>
      </div>

      {/* Drag & Drop Upload */}
      {method === 'drag-drop' && (
        <>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                dragActive ? 'bg-blue-200' : 'bg-slate-200'
              }`}>
                <Upload className={`w-6 h-6 ${dragActive ? 'text-blue-600' : 'text-slate-600'}`} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Drag images here</h3>
                <p className="text-sm text-slate-600">or click to browse</p>
              </div>
              <p className="text-xs text-slate-500">
                PNG, JPG, GIF up to {maxFileSize}MB each • Max {maxImages} images
              </p>
            </div>
          </div>
        </>
      )}

      {/* URL Paste */}
      {method === 'url' && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Paste image URL... https://..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()}
            className="flex-1"
          />
          <Button
            onClick={handleAddUrl}
            disabled={!urlInput.trim() || urlLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {urlLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Add'}
          </Button>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900">
            Uploaded Images ({images.length}/{maxImages})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group rounded-lg overflow-hidden bg-slate-100 aspect-square flex items-center justify-center"
              >
                {image.loading ? (
                  <div className="flex items-center justify-center h-full bg-slate-100">
                    <Loader className="w-6 h-6 text-slate-400 animate-spin" />
                  </div>
                ) : (
                  <>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    {image.featured && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        ⭐ Featured
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <button
                        onClick={() => setFeatured(image.id)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          image.featured
                            ? 'bg-yellow-500 text-white'
                            : 'bg-white/80 text-slate-900 hover:bg-white'
                        }`}
                      >
                        {image.featured ? '⭐' : '☆'} Featured
                      </button>
                      <button
                        onClick={() => removeImage(image.id)}
                        className="px-2 py-1 rounded text-xs font-medium bg-red-500/80 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Alt Text Editor */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-sm text-slate-900">Image Alt Text</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {images
                .filter((img) => !img.loading)
                .map((image) => (
                  <div key={image.id} className="flex gap-2">
                    <input
                      type="text"
                      value={image.alt}
                      onChange={(e) => updateAlt(image.id, e.target.value)}
                      placeholder="Image description (for SEO)"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-sm">
          No images selected yet
        </div>
      )}
    </div>
  );
}

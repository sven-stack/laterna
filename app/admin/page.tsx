'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';

interface Photo {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  date_taken: string | null;
  image_url: string;
  thumbnail_url: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const router = useRouter();

  // Form states
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateTaken, setDateTaken] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    try {
      const response = await fetch('/api/photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    setCompressing(true);

    try {
      // Compress image before upload
      const options = {
        maxSizeMB: 3, // Maximum file size in MB
        maxWidthOrHeight: 2048, // Maximum width or height
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.85, // Good quality
        alwaysKeepResolution: false, // Allow resize
        preserveExif: false, // Don't preserve EXIF (will auto-rotate based on EXIF then remove it)
      };

      console.log('Original file size:', (file.size / 1024 / 1024).toFixed(2), 'MB');

      const compressedFile = await imageCompression(file, options);

      console.log('Compressed file size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');

      setCompressing(false);

      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('title', title);
      if (description) formData.append('description', description);
      if (location) formData.append('location', location);
      if (dateTaken) formData.append('dateTaken', dateTaken);

      const response = await fetch('/api/photos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Reset form
        setFile(null);
        setTitle('');
        setDescription('');
        setLocation('');
        setDateTaken('');
        setPreview(null);
        setShowUploadForm(false);

        // Reload photos
        await loadPhotos();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to upload photo: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Failed to upload photo: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
      setCompressing(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const response = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadPhotos();
      } else {
        alert('Failed to delete photo');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete photo');
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-lantern-dark/80 border-b border-lantern-amber/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-lantern-gold">
                🏮 Admin Dashboard
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Manage your lantern gallery
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="px-4 py-2 text-sm bg-lantern-navy/50 hover:bg-lantern-navy border border-lantern-amber/30 rounded-lg transition-all"
              >
                View Gallery
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-all text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Upload Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="px-6 py-3 bg-lantern-amber hover:bg-lantern-gold text-lantern-dark font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            {showUploadForm ? '✕ Cancel' : '+ Upload New Photo'}
          </button>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="mb-12 bg-lantern-navy/50 border border-lantern-amber/20 rounded-2xl p-8 lantern-glow">
            <h2 className="text-2xl font-bold text-lantern-gold mb-6">Upload New Photo</h2>

            <form onSubmit={handleUpload} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Photo *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 bg-lantern-dark/50 border border-lantern-amber/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-lantern-amber file:text-lantern-dark file:font-semibold hover:file:bg-lantern-gold"
                />
                {preview && (
                  <div className="mt-4 relative aspect-video w-full max-w-md rounded-lg overflow-hidden">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-lantern-dark/50 border border-lantern-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lantern-amber text-white"
                  placeholder="e.g., Sunset Lanterns in Hoi An"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-lantern-dark/50 border border-lantern-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lantern-amber text-white resize-none"
                  placeholder="Tell the story behind this photo..."
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-lantern-dark/50 border border-lantern-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lantern-amber text-white"
                  placeholder="e.g., Hoi An, Vietnam"
                />
              </div>

              {/* Date Taken */}
              <div>
                <label htmlFor="dateTaken" className="block text-sm font-medium text-gray-300 mb-2">
                  Date Taken
                </label>
                <input
                  id="dateTaken"
                  type="date"
                  value={dateTaken}
                  onChange={(e) => setDateTaken(e.target.value)}
                  className="w-full px-4 py-3 bg-lantern-dark/50 border border-lantern-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lantern-amber text-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading || !file || !title}
                className="w-full py-3 bg-lantern-amber hover:bg-lantern-gold text-lantern-dark font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {compressing ? '🔄 Compressing image...' : uploading ? '📤 Uploading...' : 'Upload Photo'}
              </button>
            </form>
          </div>
        )}

        {/* Photos List */}
        <div>
          <h2 className="text-2xl font-bold text-lantern-gold mb-6">
            Your Photos ({photos.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading photos...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12 bg-lantern-navy/50 border border-lantern-amber/20 rounded-2xl">
              <p className="text-xl text-gray-300 mb-2">No photos yet</p>
              <p className="text-sm text-gray-400">Upload your first lantern photo to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-lantern-navy/50 border border-lantern-amber/20 rounded-xl overflow-hidden hover:border-lantern-amber/40 transition-all"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={photo.thumbnail_url}
                      alt={photo.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-lantern-gold mb-1">
                      {photo.title}
                    </h3>
                    {photo.description && (
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {photo.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-xs text-gray-500">
                        {photo.location && <span>📍 {photo.location}</span>}
                      </div>
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="px-3 py-1 text-xs bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded text-red-400 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

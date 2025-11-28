import { getPhotos } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Gallery Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-lantern-amber via-lantern-gold to-lantern-glow bg-clip-text text-transparent">
          Lantern Gallery
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          A collection of {photos.length} beautiful lantern{photos.length !== 1 ? 's' : ''} from around the world
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 pb-20">
        {photos.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-2xl bg-lantern-navy/50 border border-lantern-amber/20">
              <p className="text-2xl text-lantern-gold mb-2">🏮</p>
              <p className="text-xl text-gray-300 mb-2">No photos yet</p>
              <p className="text-sm text-gray-400">
                The first lanterns will appear here soon...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <article
                key={photo.id}
                className="group relative overflow-hidden rounded-2xl bg-lantern-navy/50 border border-lantern-amber/20 lantern-glow-hover"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.thumbnail_url || photo.image_url}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-lantern-dark via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-lantern-gold mb-2">
                    {photo.title}
                  </h3>

                  {photo.description && (
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {photo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    {photo.location && (
                      <span className="flex items-center gap-1">
                        <span>📍</span>
                        {photo.location}
                      </span>
                    )}
                    {photo.date_taken && (
                      <span className="flex items-center gap-1">
                        <span>📅</span>
                        {new Date(photo.date_taken).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* View button on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={photo.image_url}
                    target="_blank"
                    className="px-4 py-2 bg-lantern-amber hover:bg-lantern-gold text-lantern-dark font-semibold rounded-lg text-sm shadow-lg"
                  >
                    View Full
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-lantern-amber/20 bg-lantern-dark/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Laterna by Sven. Made with ✨ and 🏮</p>
        </div>
      </footer>
    </div>
  );
}

import { getPhotos } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const photos = await getPhotos();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-lantern-dark/80 border-b border-lantern-amber/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-lantern-gold">
                🏮 Laterna
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Capturing the glow of lanterns around the world
              </p>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 text-sm bg-lantern-amber/10 hover:bg-lantern-amber/20 border border-lantern-amber/30 rounded-lg transition-all"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-lantern-amber via-lantern-gold to-lantern-glow bg-clip-text text-transparent">
          A Journey Through Light
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Every lantern tells a story. Explore my collection of lantern photography
          from travels across the globe.
        </p>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4 pb-20">
        {photos.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-2xl bg-lantern-navy/50 border border-lantern-amber/20">
              <p className="text-2xl text-lantern-gold mb-2">🏮</p>
              <p className="text-xl text-gray-300 mb-2">No photos yet</p>
              <p className="text-sm text-gray-400">
                Upload your first lantern photo from the{' '}
                <Link href="/admin" className="text-lantern-amber hover:text-lantern-gold underline">
                  admin panel
                </Link>
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
          <p>© {new Date().getFullYear()} Laterna. Made with ✨ and 🏮</p>
        </div>
      </footer>
    </div>
  );
}

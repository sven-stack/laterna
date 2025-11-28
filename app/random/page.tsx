import { getPhotos } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import RefreshButton from '@/components/RefreshButton';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RandomPage() {
  const photos = await getPhotos();

  // If no photos, redirect to gallery
  if (photos.length === 0) {
    redirect('/gallery');
  }

  // Pick a random photo
  const randomIndex = Math.floor(Math.random() * photos.length);
  const randomPhoto = photos[randomIndex];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-lantern-amber via-lantern-gold to-lantern-glow bg-clip-text text-transparent">
          Random Lantern
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Each refresh brings a new surprise
        </p>
        <RefreshButton />
      </section>

      {/* Random Photo Display */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-lantern-navy/50 border border-lantern-amber/20 rounded-2xl overflow-hidden lantern-glow">
            {/* Image */}
            <div className="relative aspect-video">
              <Image
                src={randomPhoto.image_url}
                alt={randomPhoto.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-lantern-gold mb-4">
                {randomPhoto.title}
              </h2>

              {randomPhoto.description && (
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {randomPhoto.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400">
                {randomPhoto.location && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📍</span>
                    <span className="font-medium">{randomPhoto.location}</span>
                  </div>
                )}
                {randomPhoto.date_taken && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    <span>
                      {new Date(randomPhoto.date_taken).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-lantern-amber/20">
                <Link
                  href={randomPhoto.image_url}
                  target="_blank"
                  className="px-6 py-3 bg-lantern-navy hover:bg-lantern-navy/70 border border-lantern-amber/30 text-lantern-gold font-medium rounded-lg transition-all"
                >
                  🔍 View Full Size
                </Link>
                <Link
                  href="/gallery"
                  className="px-6 py-3 bg-lantern-navy hover:bg-lantern-navy/70 border border-lantern-amber/30 text-gray-300 font-medium rounded-lg transition-all"
                >
                  🖼️ View All Lanterns
                </Link>
              </div>
            </div>
          </div>

          {/* Fun Fact */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              You're viewing lantern #{randomIndex + 1} of {photos.length}
            </p>
          </div>
        </div>
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

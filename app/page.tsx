import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getPhotos } from '@/lib/db';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const photos = await getPhotos();
  const featuredPhotos = photos.slice(0, 3); // Show 3 latest photos

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-lantern-amber via-lantern-gold to-lantern-glow bg-clip-text text-transparent animate-float">
            Welcome to Laterna
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            A Journey Through Light & Lanterns
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Where every glow tells a story from around the world
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-lantern-navy/50 border border-lantern-amber/20 rounded-2xl p-12 lantern-glow">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl">🏮</div>
            <div>
              <h2 className="text-3xl font-bold text-lantern-gold mb-4">
                About This Project
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Hi, I'm <span className="text-lantern-gold font-semibold">Sven</span>, and I love lanterns.
                </p>
                <p>
                  I love the glow, warmth, and direction they represent. Lanterns have been on many of my journeys. From marathons to 100km+ bike rides to the Mammut Marsch (a 100km march), to quiet strolls at night, they've lit the way and created moments of wonder.
                </p>
                <p>
                  The lanterns in this collection come from all over Germany and Spain currently, captured during these adventures. Each one tells a story of a place, a moment, a journey completed or still underway.
                </p>
                <p>
                  This is my way of sharing the <span className="text-lantern-amber">coolest lanterns</span> I've discovered along the way. I hope their light brings you as much joy as it has brought me.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-lantern-amber/20 text-center">
            <p className="text-gray-400 mb-6">
              Join me on this luminous journey
            </p>
            <Link
              href="/gallery"
              className="inline-block px-8 py-4 bg-lantern-amber hover:bg-lantern-gold text-lantern-dark font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore the Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Lanterns */}
      {featuredPhotos.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-lantern-gold mb-12">
            Latest Discoveries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredPhotos.map((photo) => (
              <Link
                key={photo.id}
                href="/gallery"
                className="group relative overflow-hidden rounded-2xl bg-lantern-navy/50 border border-lantern-amber/20 lantern-glow-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.thumbnail_url || photo.image_url}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lantern-dark via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-lantern-gold">
                    {photo.title}
                  </h3>
                  {photo.location && (
                    <p className="text-sm text-gray-400 mt-1">
                      📍 {photo.location}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="text-lantern-amber hover:text-lantern-gold transition-colors font-medium"
            >
              View All Lanterns →
            </Link>
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link
            href="/gallery"
            className="p-8 bg-lantern-navy/30 border border-lantern-amber/20 rounded-xl hover:border-lantern-amber/40 transition-all text-center group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              🖼️
            </div>
            <h3 className="text-xl font-bold text-lantern-gold mb-2">
              Full Gallery
            </h3>
            <p className="text-gray-400 text-sm">
              Browse all {photos.length} lantern{photos.length !== 1 ? 's' : ''} from my travels
            </p>
          </Link>

          <Link
            href="/random"
            className="p-8 bg-lantern-navy/30 border border-lantern-amber/20 rounded-xl hover:border-lantern-amber/40 transition-all text-center group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              🎲
            </div>
            <h3 className="text-xl font-bold text-lantern-gold mb-2">
              Random Lantern
            </h3>
            <p className="text-gray-400 text-sm">
              Discover a surprise lantern
            </p>
          </Link>

          <Link
            href="/faq"
            className="p-8 bg-lantern-navy/30 border border-lantern-amber/20 rounded-xl hover:border-lantern-amber/40 transition-all text-center group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              ❓
            </div>
            <h3 className="text-xl font-bold text-lantern-gold mb-2">
              FAQ
            </h3>
            <p className="text-gray-400 text-sm">
              Learn more about this project
            </p>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-lantern-amber/20 bg-lantern-dark/50 backdrop-blur mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Laterna by Sven. Made with ✨ and 🏮</p>
        </div>
      </footer>
    </div>
  );
}

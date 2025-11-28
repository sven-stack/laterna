import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-lantern-dark/80 border-b border-lantern-amber/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-4xl font-bold text-lantern-gold">
              🏮 Laterna
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Capturing the glow of lanterns around the world
            </p>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-lantern-gold transition-colors text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/gallery"
              className="text-gray-300 hover:text-lantern-gold transition-colors text-sm font-medium"
            >
              Gallery
            </Link>
            <Link
              href="/random"
              className="text-gray-300 hover:text-lantern-gold transition-colors text-sm font-medium"
            >
              Random
            </Link>
            <Link
              href="/faq"
              className="text-gray-300 hover:text-lantern-gold transition-colors text-sm font-medium"
            >
              FAQ
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 text-sm bg-lantern-amber/10 hover:bg-lantern-amber/20 border border-lantern-amber/30 rounded-lg transition-all"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

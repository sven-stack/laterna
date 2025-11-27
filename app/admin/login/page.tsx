'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lantern-amber hover:text-lantern-gold mb-8 transition-colors"
        >
          <span>←</span> Back to Gallery
        </Link>

        {/* Login Card */}
        <div className="bg-lantern-navy/50 backdrop-blur-lg border border-lantern-amber/20 rounded-2xl p-8 lantern-glow">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-lantern-gold mb-2">
              🏮 Admin Login
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to manage your lantern gallery
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-lantern-dark/50 border border-lantern-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lantern-amber focus:border-transparent text-white placeholder-gray-500"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-lantern-dark/50 border border-lantern-amber/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lantern-amber focus:border-transparent text-white placeholder-gray-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-lantern-amber hover:bg-lantern-gold text-lantern-dark font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-lantern-amber/20">
            <p className="text-xs text-gray-500 text-center">
              First time? You'll need to create an admin account via the API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

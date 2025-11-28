'use client';

export default function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-3 bg-lantern-amber hover:bg-lantern-gold text-lantern-dark font-semibold rounded-lg transition-all shadow-lg"
    >
      🎲 Show Another Random Lantern
    </button>
  );
}

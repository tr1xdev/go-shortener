import { useState } from 'react';
import { useShortener } from './use-shortener';

export default function HomePage() {
  const [url, setUrl] = useState<string>('');
  const [shortKey, setShortKey] = useState<string | null>(null);
  const { shorten, loading, error } = useShortener();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = await shorten(url);
      if (result) setShortKey(result.key);
    };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">Shortener</h1>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? '...' : 'Shorten URL'}
          </button>
        </form>

        {error && <p className="text-center text-red-500 text-sm">{error}</p>}

        {shortKey && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg text-center shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Your short link:</p>
            <a
              href={`http://localhost:8181/shorten/${shortKey}`}
              target="_blank"
              className="text-blue-600 font-mono break-all"
            >
              http://localhost:8181/shorten/{shortKey}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

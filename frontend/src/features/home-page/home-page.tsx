import React, { useState } from 'react';
import { useShortener } from './use-shortener';
import ShortenerForm from './components/shortener-form';
import ShortenerResult from './components/shortener-result';
import HistoryList from './components/history-list';

interface HistoryItem {
  originalUrl: string;
  shortKey: string;
}

export default function HomePage() {
  const [url, setUrl] = useState<string>('');
  const [shortKey, setShortKey] = useState<string | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const savedData: string | null = localStorage.getItem('shortener_history');
    if (savedData) {
      try {
        const parsedData: HistoryItem[] = JSON.parse(savedData);
        return parsedData;
      } catch (err: unknown) {
        console.error(err);
      }
    }
    return [];
  });

  const { shorten, loading, error } = useShortener();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const result: { key: string } | null = await shorten(url);

    if (result) {
      setShortKey(result.key);

      const newItem: HistoryItem = { originalUrl: url, shortKey: result.key };
      const updatedHistory: HistoryItem[] = [
        newItem,
        ...history.filter((item: HistoryItem) => item.shortKey !== result.key)
      ];

      setHistory(updatedHistory);
      localStorage.setItem('shortener_history', JSON.stringify(updatedHistory));
      setUrl('');
    }
  };

  const handleClearHistory = (): void => {
    setHistory([]);
    localStorage.removeItem('shortener_history');
    setShortKey(null);
  };

  return (
    <main className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 bg-slate-50 font-sans overflow-hidden">
      <div className="w-full max-w-xl flex flex-col gap-6 max-h-full py-4">
        <div className="shrink-0 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              URL Shortener
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Paste your long link below to make it short and clean.
            </p>
          </div>

          <ShortenerForm
            url={url}
            setUrl={setUrl}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}

          {shortKey && <ShortenerResult shortKey={shortKey} />}
        </div>

        {history.length > 0 && (
          <HistoryList history={history} onClear={handleClearHistory} />
        )}
      </div>
    </main>
  );
}

import { useState } from 'react';

interface ShortenerResultProps {
  shortKey: string;
}

export default function ShortenerResult({ shortKey }: ShortenerResultProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`http://localhost:8181/shorten/${shortKey}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <div className="mt-6 p-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest block mb-0.5">
            Link Generated Successfully
          </span>
          <a
            href={`http://localhost:8181/shorten/${shortKey}`}
            target="_blank"
            rel="noreferrer"
            className="text-base font-bold text-slate-800 hover:text-indigo-600 transition-colors break-all"
          >
            localhost:8181/{shortKey}
          </a>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className={`shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center gap-2 border active:scale-[0.97] ${
          copied
            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/10'
            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80 shadow-sm hover:shadow'
        }`}
      >
        {copied ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

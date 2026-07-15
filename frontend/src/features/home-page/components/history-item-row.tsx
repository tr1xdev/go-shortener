import { useState } from 'react';

interface HistoryItem {
  originalUrl: string;
  shortKey: string;
}

interface HistoryItemRowProps {
  item: HistoryItem;
}

export default function HistoryItemRow({ item }: HistoryItemRowProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`http://localhost:8181/shorten/${item.shortKey}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <div className="group p-4 m-2 flex flex-col sm:flex-row sm:items-center justify-between bg-white hover:bg-slate-50/80 rounded-2xl border border-slate-100 hover:border-slate-200/60 hover:shadow-sm transition-all duration-200 gap-3">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            Original Link
          </span>
          <p className="text-sm font-medium text-slate-600 truncate" title={item.originalUrl}>
            {item.originalUrl}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t border-slate-50 sm:border-t-0 pt-3 sm:pt-0">
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-0.5 sm:hidden">
            Short Link
          </span>
          <a
            href={`http://localhost:8181/shorten/${item.shortKey}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline break-all transition-colors"
          >
            localhost:8181/{item.shortKey}
          </a>
        </div>

        <button
          onClick={handleCopy}
          className={`shrink-0 p-2.5 rounded-xl border transition-all duration-200 ${
            copied
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
              : 'bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 border-slate-100'
          }`}
          aria-label="Copy link"
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
          )}
        </button>
      </div>
    </div>
  );
}

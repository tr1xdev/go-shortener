import HistoryItemRow from './history-item-row';

interface HistoryItem {
  originalUrl: string;
  shortKey: string;
}

interface HistoryListProps {
  history: HistoryItem[];
  onClear: () => void;
}

export default function HistoryList({ history, onClear }: HistoryListProps) {
  return (
    <div className="flex-1 min-h-0 bg-white rounded-3xl shadow-xl shadow-slate-200/30 border border-slate-100/80 overflow-hidden flex flex-col transition-all duration-300">
      <div className="px-6 py-4 border-b border-slate-100/80 flex justify-between items-center bg-slate-50/30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
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
              <path d="M12 8V12L14 14" />
              <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Recent Links
            </h2>
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-bold rounded-full bg-slate-100 text-slate-500">
              {history.length}
            </span>
          </div>
        </div>

        <button
          onClick={onClear}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50/50 rounded-xl border border-slate-100 hover:border-red-100 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
          Clear
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3 pr-1.5 scrollbar-gutter-stable scrollbar-thin [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
        <div className="flex flex-col gap-1">
          {history.map((item: HistoryItem) => (
            <HistoryItemRow key={item.shortKey} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

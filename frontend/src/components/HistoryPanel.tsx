import { useEffect, useState } from "react";
import { Clock, History, Code2, Trash2 } from "lucide-react";
import { getComparisonHistory, deleteComparison } from "../services/history";

interface Comparison {
  _id: string;
  language: string;
  originalCode: string;
  modifiedCode: string;
  aiResponse: string;
  createdAt: string;
}

const HistoryPanel = ({
  onSelect,
}: {
  onSelect: (item: Comparison) => void;
}) => {
  const [history, setHistory] = useState<Comparison[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getComparisonHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadHistory();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    try {
      await deleteComparison(id);

      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-xl">
      <div className="mb-5 flex items-center gap-2">
        <History className="text-violet-400" size={22} />
        <h2 className="text-xl font-bold text-white">Comparison History</h2>
      </div>

      {history.length === 0 ? (
        <div className="py-10 text-center">
          <Code2 size={48} className="mx-auto mb-3 text-zinc-600" />
          <p className="text-zinc-400">No comparisons yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item._id}
              onClick={() => onSelect(item)}
              className="cursor-pointer rounded-xl border border-zinc-700 bg-zinc-800 p-4 transition-all duration-200 hover:border-violet-500 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-violet-600/20 px-3 py-1 text-xs font-semibold text-violet-300">
                  {item.language}
                </span>

                <button
                  onClick={(e) => handleDelete(e, item._id)}
                  className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
                <Clock size={14} />
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;

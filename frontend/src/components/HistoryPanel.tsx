import { useEffect, useState } from "react";
import { getComparisonHistory } from "../services/history";

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
    const fetchHistory = async () => {
      try {
        const data = await getComparisonHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Comparison History
      </h2>

      {history.length === 0 ? (
        <p>No comparisons yet.</p>
      ) : (
        history.map((item) => (
          <div
            key={item._id}
            onClick={() => onSelect(item)}
            className="border-b border-gray-700 py-3 cursor-pointer hover:bg-zinc-800 rounded px-2"
            >
            <p className="font-medium">{item.language}</p>

            <p className="text-sm text-gray-400">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryPanel;
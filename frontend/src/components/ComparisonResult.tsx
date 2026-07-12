  interface ComparisonResultProps {
    similarity: number;
    added: number;
    removed: number;
    modified: number;
    analysis: string;
    loading: boolean;
  }

  const ComparisonResult = ({
    similarity,
    added,
    removed,
    modified,
    analysis,
    loading,
  }: ComparisonResultProps) => {
    return (
  <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
    <h2 className="mb-6 text-2xl font-bold text-white">
      Comparison Result
    </h2>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-lg bg-zinc-800 p-4">
        <p className="text-gray-400">Similarity</p>
        <p className="text-3xl font-bold text-green-400">
          {similarity}%
        </p>
      </div>

      <div className="rounded-lg bg-zinc-800 p-4">
        <p className="text-gray-400">Added</p>
        <p className="text-3xl font-bold text-green-500">
          {added}
        </p>
      </div>

      <div className="rounded-lg bg-zinc-800 p-4">
        <p className="text-gray-400">Removed</p>
        <p className="text-3xl font-bold text-red-500">
          {removed}
        </p>
      </div>

      <div className="rounded-lg bg-zinc-800 p-4">
        <p className="text-gray-400">Modified</p>
        <p className="text-3xl font-bold text-yellow-400">
          {modified}
        </p>
      </div>
    </div>

    {/* 👇 Add this entire block here */}
    <div className="mt-8 rounded-lg bg-zinc-800 p-5">
      <h3 className="mb-3 text-xl font-semibold text-white">
        🤖 AI Analysis
      </h3>

      {loading ? (
        <p className="text-gray-400">Analyzing code...</p>
      ) : (
        <pre className="whitespace-pre-wrap text-gray-300">
          {analysis || "Click Compare Code to generate AI analysis."}
        </pre>
      )}
    </div>

  </div>
);
  };

  export default ComparisonResult;
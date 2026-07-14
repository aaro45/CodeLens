import { Loader2, Sparkles, Plus, Minus, Pencil, Percent } from "lucide-react";

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
    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl p-6">
      <h2 className="mb-6 text-3xl font-bold text-white">Comparison Result</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-green-500/20 bg-zinc-800 p-5 transition hover:scale-105">
          <div className="flex items-center gap-2 text-green-400">
            <Percent size={20} />
            <p className="text-sm">Similarity</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{similarity}%</p>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-zinc-800 p-5 transition hover:scale-105">
          <div className="flex items-center gap-2 text-emerald-400">
            <Plus size={20} />
            <p className="text-sm">Added</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{added}</p>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-zinc-800 p-5 transition hover:scale-105">
          <div className="flex items-center gap-2 text-red-400">
            <Minus size={20} />
            <p className="text-sm">Removed</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{removed}</p>
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-zinc-800 p-5 transition hover:scale-105">
          <div className="flex items-center gap-2 text-yellow-400">
            <Pencil size={20} />
            <p className="text-sm">Modified</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{modified}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-zinc-700 bg-zinc-800 p-6">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="text-blue-400" size={22} />
          <h3 className="text-xl font-semibold text-white">AI Code Review</h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="mb-4 animate-spin text-blue-400" size={40} />

            <p className="text-lg font-semibold text-white">
              AI is reviewing your code...
            </p>

            <p className="mt-3 text-center text-gray-400">
              Analyzing code structure...
              <br />
              Comparing logic...
              <br />
              Finding improvements...
              <br />
              Generating review...
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            {analysis ? (
              <div className="space-y-4">
                {analysis.split("\n").map((line, index) => {
                  const text = line.trim();

                  if (!text) return null;

                  if (
                    text.startsWith("Summary") ||
                    text.startsWith("Strength") ||
                    text.startsWith("Issue") ||
                    text.startsWith("Suggestion") ||
                    text.startsWith("Best Practice") ||
                    text.startsWith("Conclusion")
                  ) {
                    return (
                      <h4
                        key={index}
                        className="mt-4 border-l-4 border-violet-500 pl-3 text-lg font-semibold text-violet-300"
                      >
                        {text}
                      </h4>
                    );
                  }

                  if (
                    text.startsWith("-") ||
                    text.startsWith("•") ||
                    /^\d+\./.test(text)
                  ) {
                    return (
                      <div
                        key={index}
                        className="rounded-lg bg-zinc-800 p-3 text-gray-300"
                      >
                        {text}
                      </div>
                    );
                  }

                  return (
                    <p key={index} className="leading-7 text-gray-300">
                      {text}
                    </p>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center text-zinc-500">
                Click{" "}
                <span className="font-semibold text-violet-400">
                  Compare Code
                </span>{" "}
                to generate an AI review.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonResult;

import { useEffect, useState } from "react";
import { diffLines } from "diff";
import ComparisonResult from "./ComparisonResult";
import CodeEditor from "./CodeEditor";
import DiffViewer from "./DiffViewer";
import { analyzeCode, reviewPullRequest } from "../services/gemini";
import { exportPDF } from "../utils/exportPdf";
import type { Comparison } from "../pages/Home";
import { fetchPullRequest } from "../services/github";

interface Props {
  selectedComparison: Comparison | null;
}

const EditorSection = ({ selectedComparison }: Props) => {
  const [originalCode, setOriginalCode] = useState("// Write your code here...");
  const [modifiedCode, setModifiedCode] = useState("// Write your code here...");
  const [result, setResult] = useState<{
    similarity: number;
    added: number;
    removed: number;
    modified: number;
  } | null>(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [prUrl, setPrUrl] = useState("");

  const [githubFiles, setGithubFiles] = useState<any[]>([]);
  const openGithubFile = (file: any) => {
    setOriginalCode(file.originalContent);
    setModifiedCode(file.modifiedContent);
  };

  const [loadingPR, setLoadingPR] = useState(false);
  useEffect(() => {
    if (!selectedComparison) return;

    setOriginalCode(selectedComparison.originalCode);
    setModifiedCode(selectedComparison.modifiedCode);
    setLanguage(selectedComparison.language);
    setAnalysis(selectedComparison.aiResponse);

    const changes = diffLines(
      selectedComparison.originalCode,
      selectedComparison.modifiedCode
    );

    let added = 0;
    let removed = 0;
    let modified = 0;

    for (let i = 0; i < changes.length; i++) {
      if (changes[i].added) {
        added += changes[i].count || 0;
      } else if (changes[i].removed) {
        removed += changes[i].count || 0;

        if (i + 1 < changes.length && changes[i + 1].added) {
          modified += Math.min(
            changes[i].count || 0,
            changes[i + 1].count || 0
          );
        }
      }
    }

    const totalLines = Math.max(
      selectedComparison.originalCode.split("\n").length,
      selectedComparison.modifiedCode.split("\n").length
    );

    const similarity = Math.max(
      0,
      Math.round(
        ((totalLines - added - removed) / totalLines) * 100
      )
    );

    setResult({
      similarity,
      added,
      removed,
      modified,
    });
  }, [selectedComparison]);
    const handleFetchPR = async () => {
  if (!prUrl.trim()) {
    alert("Enter GitHub PR URL");
    return;
  }

  try {
    setLoadingPR(true);

    const data = await fetchPullRequest(prUrl);

    console.log("========== BACKEND RESPONSE ==========");
    console.log(data);

    setGithubFiles(data.files);

    console.log("========== FILES ==========");
    console.log(data.files);

    if (data.files.length > 0) {
      console.log("========== FIRST FILE ==========");
      console.log(data.files[0]);

      console.log("Original Length:", data.files[0].originalContent?.length);
      console.log("Modified Length:", data.files[0].modifiedContent?.length);

      setOriginalCode(data.files[0].originalContent);
      setModifiedCode(data.files[0].modifiedContent);
    } else {
      console.log("No files returned!");
    }
  } catch (err) {
    console.error("FETCH PR ERROR");
    console.error(err);
    alert("Failed to fetch Pull Request");
  } finally {
    setLoadingPR(false);
  }
};
  const handleCompare = async () => {
    const changes = diffLines(originalCode, modifiedCode);

    let added = 0;
    let removed = 0;
    let modified = 0;

    for (let i = 0; i < changes.length; i++) {
      if (changes[i].added) {
        added += changes[i].count || 0;
      } else if (changes[i].removed) {
        removed += changes[i].count || 0;

        if (i + 1 < changes.length && changes[i + 1].added) {
          modified += Math.min(
            changes[i].count || 0,
            changes[i + 1].count || 0
          );
        }
      }
    }

    const totalLines = Math.max(
      originalCode.split("\n").length,
      modifiedCode.split("\n").length
    );

    const similarity = Math.max(
      0,
      Math.round(
        ((totalLines - added - removed) / totalLines) * 100
      )
    );

    setResult({
      similarity,
      added,
      removed,
      modified,
    });
    setLoading(true);

    try {
      const aiResponse = await analyzeCode(originalCode, modifiedCode, language);
      setAnalysis(aiResponse);
    } catch (error) {
      console.error(error);
      setAnalysis("Failed to generate AI analysis.");
    } finally {
      setLoading(false);
    }
  };
  const handleReviewPR = async () => {
  console.log("Review PR button clicked");

  console.log("GitHub Files:", githubFiles);

  if (githubFiles.length === 0) {
    alert("Fetch a Pull Request first.");
    return;
  }

  setLoading(true);

  try {
    console.log("Sending request to backend...");

    const response = await reviewPullRequest(githubFiles);

    console.log("Backend Response:");
    console.log(response);

    setAnalysis(response);
  } catch (err) {
    console.error("Review PR Error:");
    console.error(err);

    setAnalysis("Failed to review PR.");
  } finally {
    setLoading(false);
  }
};
  return (
    
    <section className="mx-auto mt-10 max-w-7xl px-4 md:px-8">
      <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">

        <h2 className="mb-4 text-xl font-bold text-white">
          GitHub Pull Request
        </h2>

        <div className="flex gap-3">

          <input
            value={prUrl}
            onChange={(e) => setPrUrl(e.target.value)}
            placeholder="https://github.com/owner/repo/pull/1"
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          />

          <button
            onClick={handleFetchPR}
            disabled={loadingPR}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            {loadingPR ? "Fetching..." : "Fetch PR"}
          </button>

        </div>

      </div>
      <div className="mb-6 flex justify-end">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <CodeEditor
          title="Original Code"
          code={originalCode}
          setCode={setOriginalCode}
          language={language}
        />

        <CodeEditor
          title="Modified Code"
          code={modifiedCode}
          setCode={setModifiedCode}
          language={language}
        />
      </div>
      {
        githubFiles.length > 0 && (

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">

            <h2 className="mb-4 text-xl font-bold text-white">

              Changed Files

            </h2>

            <div className="space-y-2">

              {githubFiles.map((file) => (
                <button
                  key={file.sha}
                  onClick={() => openGithubFile(file)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-left text-white transition hover:border-violet-500 hover:bg-zinc-800"
                >
                  📄 {file.filename}
                </button>
              ))}

            </div>

          </div>

        )
      }

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleCompare}
          className="w-full sm:w-auto rounded-xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
        >
          Compare Code
        </button>
        <button
          onClick={handleReviewPR}
          disabled={loading || githubFiles.length === 0}
          className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Reviewing..." : "Review Entire PR"}
        </button>
        <button
          onClick={() =>
            result &&
            exportPDF({
              similarity: result.similarity,
              added: result.added,
              removed: result.removed,
              modified: result.modified,
              analysis,
              language,
              originalCode,
              modifiedCode,
            })
          }
          className="rounded-xl bg-green-600 px-8 py-4 text-xl font-semibold text-white transition hover:bg-green-700"
        >
          Export PDF
        </button>
      </div>
      {result && (
        <ComparisonResult
        similarity={result.similarity}
        added={result.added}
        removed={result.removed}
        modified={result.modified}
        analysis={analysis}
        loading={loading}
      />
      )}
      {result && (
        <DiffViewer
          original={originalCode}
          modified={modifiedCode}
          language={language}
        />
      )}
    </section>
  );
};

export default EditorSection;
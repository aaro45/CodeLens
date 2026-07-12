import { DiffEditor } from "@monaco-editor/react";

interface DiffViewerProps{
    original:string;
    modified:string;
    language:string;
}

const DiffViewer = ({
  original,
  modified,
  language,
}: DiffViewerProps) => {
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-white">
        Code Differences
      </h2>

      <DiffEditor
        height="500px"
        original={original}
        modified={modified}
        language={language}
        theme="vs-dark"
        options={{
          readOnly: true,
          renderSideBySide: true,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default DiffViewer;
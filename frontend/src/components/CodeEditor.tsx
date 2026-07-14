import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  title: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
}

const CodeEditor = ({ title, code, setCode, language }: CodeEditorProps) => {
  return (
    <div className="w-full">
      <h2 className="mb-2 text-lg font-semibold text-white">{title}</h2>

      <Editor
        height="500px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
      />
    </div>
  );
};

export default CodeEditor;

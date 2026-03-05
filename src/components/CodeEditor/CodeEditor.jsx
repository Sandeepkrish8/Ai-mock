import Editor from "@monaco-editor/react";
import "./CodeEditor.css";

const CodeEditor = ({ 
  code, 
  setCode, 
  language, 
  setLanguage, 
  isRunning, 
  onRun, 
  onSubmit,
  languages = ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go"]
}) => {
  const languageToMonaco = {
    "JavaScript": "javascript",
    "Python": "python",
    "Java": "java",
    "C++": "cpp",
    "TypeScript": "typescript",
    "Go": "go",
    "Rust": "rust",
    "C#": "csharp",
    "Ruby": "ruby",
    "PHP": "php",
  };

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <div className="language-selector">
          <label htmlFor="language">Language:</label>
          <select 
            id="language"
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-dropdown"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="editor-actions">
          <button 
            className="run-btn" 
            onClick={onRun}
            disabled={isRunning}
          >
            {isRunning ? "⏳ Running..." : "▶ Run Code"}
          </button>
          <button 
            className="submit-btn" 
            onClick={onSubmit}
            disabled={isRunning}
          >
            ✓ Submit
          </button>
        </div>
      </div>

      <div className="editor-wrapper">
        <Editor
          height="100%"
          language={languageToMonaco[language] || "javascript"}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            suggestOnTriggerCharacters: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;

import "./ProblemDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import problemsData from "../problems";
import { useState, useEffect } from "react";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import TestCasesPanel from "../../components/TestCasesPanel/TestCasesPanel";
import { executeCode, runTestCases } from "../../services/executionService";

// Deterministic (pure) ID generator
const getSubmissionId = (problemId, count) => `${problemId}-${count + 1}`;

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const problem = problemsData.find((p) => p.id === Number(id));

  const [language, setLanguage] = useState(problem?.defaultLanguage || "JavaScript");
  const [code, setCode] = useState("// Write your solution here\n");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [isShowingHints, setIsShowingHints] = useState(false);
  const [isShowingSolution, setIsShowingSolution] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [submissions, setSubmissions] = useState(() => {
    if (problem) {
      const saved = localStorage.getItem(`submissions_${problem.id}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Update code when language changes
  useEffect(() => {
    setCode((prevCode) => {
      if (problem && problem.codeTemplates && problem.codeTemplates[language]) {
        return problem.codeTemplates[language];
      }
      return prevCode;
    });
  }, [language, problem]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      const result = await executeCode(code, language, "");
      setOutput(result.output || result.error || "No output");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }

    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if (!problem?.testCases) {
      setOutput("No test cases available for this problem");
      return;
    }

    setIsRunning(true);
    setOutput("Running test cases...");

    try {
      const result = await runTestCases(code, language, problem.testCases);

      const submission = {
        id: getSubmissionId(problem.id, submissions.length),
        timestamp: new Date().toISOString(),
        language,
        code,
        testResults: result,
        passed: result.allPassed,
      };

      // Save to localStorage
      const newSubmissions = [...submissions, submission];
      setSubmissions(newSubmissions);
      localStorage.setItem(`submissions_${problem.id}`, JSON.stringify(newSubmissions));

      // Display results
      if (result.allPassed) {
        setOutput(
          `✅ All ${result.totalCount} test cases passed! Great job!`
        );
      } else {
        setOutput(
          `⚠️ ${result.passedCount}/${result.totalCount} test cases passed. Keep trying!`
        );
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }

    setIsRunning(false);
  };

  const handleNextHint = () => {
    if (problem && currentHintIndex < problem.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  if (!problem) {
    return (
      <div className="problem-page">
        <div className="not-found">
          <h2>Problem Not Found</h2>
          <button onClick={() => navigate("/practice")}>← Back to Practice</button>
        </div>
      </div>
    );
  }

  return (
    <div className="problem-page">
      {/* LEFT SIDE - PROBLEM DESCRIPTION */}
      <div className="problem-left">
        <button className="back-btn" onClick={() => navigate("/practice")}>
          ← Back
        </button>

        <div className="problem-header">
          <h1>{problem.title}</h1>
          <span className={`difficulty ${problem.difficulty}`}>
            {problem.difficulty}
          </span>
        </div>

        {problem.topCompanies && problem.topCompanies.length > 0 && (
          <div className="companies-section">
            <p className="section-label">Asked by:</p>
            <div className="companies-list">
              {problem.topCompanies.map((company) => (
                <span key={company} className="company-badge">
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="problem-section">
          <h3>📝 Description</h3>
          <p>{problem.description}</p>
        </div>

        {problem.example && (
          <div className="problem-section">
            <h3>📌 Example</h3>
            <pre className="example-block">{problem.example}</pre>
          </div>
        )}

        {problem.constraints && (
          <div className="problem-section">
            <h3>⚙️ Constraints</h3>
            <pre className="constraints-block">{problem.constraints}</pre>
          </div>
        )}

        {problem.timeComplexity && (
          <div className="complexity-section">
            <div className="complexity-item">
              <span className="complexity-label">Time Complexity:</span>
              <span className="complexity-value">{problem.timeComplexity}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Space Complexity:</span>
              <span className="complexity-value">{problem.spaceComplexity}</span>
            </div>
          </div>
        )}

        {/* HINTS SECTION */}
        <div className="hints-section">
          <button
            className="hints-toggle"
            onClick={() => setIsShowingHints(!isShowingHints)}
          >
            {isShowingHints ? "Hide Hints" : "Show Hints 💡"}
          </button>

          {isShowingHints && problem.hints && (
            <div className="hints-content">
              <div className="hint-item">
                <span className="hint-number">Hint {currentHintIndex + 1}:</span>
                <p>{problem.hints[currentHintIndex]}</p>
              </div>

              {currentHintIndex < problem.hints.length - 1 && (
                <button className="next-hint-btn" onClick={handleNextHint}>
                  Next Hint →
                </button>
              )}
            </div>
          )}
        </div>

        {/* SOLUTION SECTION */}
        <div className="solution-section">
          <button
            className="solution-toggle"
            onClick={() => setIsShowingSolution(!isShowingSolution)}
          >
            {isShowingSolution ? "Hide Solution" : "View Solution ✓"}
          </button>

          {isShowingSolution && problem.solution && (
            <div className="solution-content">
              <pre className="solution-code">{problem.solution}</pre>
            </div>
          )}
        </div>

        {/* SUBMISSION HISTORY */}
        {submissions.length > 0 && (
          <div className="submission-history">
            <h3>📚 Your Submissions ({submissions.length})</h3>
            <div className="submissions-list">
              {submissions.slice(-3).map((sub) => (
                <div
                  key={sub.id}
                  className={`submission-badge ${sub.passed ? "passed" : "failed"}`}
                >
                  <span className="submission-date">
                    {new Date(sub.timestamp).toLocaleDateString()}
                  </span>
                  <span className="submission-status">
                    {sub.passed ? "✓ Passed" : "✗ Failed"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - CODE EDITOR */}
      <div className="problem-right">
        <CodeEditor
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          isRunning={isRunning}
          onRun={handleRun}
          onSubmit={handleSubmit}
          languages={problem.languages || ["JavaScript", "Python", "Java", "C++"]}
        />

        <div className="output-container">
          <TestCasesPanel
            testCases={problem.testCases || []}
            output={output}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
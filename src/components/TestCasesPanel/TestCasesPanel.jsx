import { useState } from "react";
import "./TestCasesPanel.css";

const TestCasesPanel = ({ testCases = [], output }) => {
  const [expandedTest, setExpandedTest] = useState(null);
  const [testResults] = useState({});

  const handleTestClick = (index) => {
    setExpandedTest(expandedTest === index ? null : index);
  };

  return (
    <div className="test-cases-panel">
      <div className="test-header">
        <h3>📋 Test Cases</h3>
        <span className="test-count">{testCases.length} tests</span>
      </div>

      {testCases.length === 0 ? (
        <div className="no-tests">
          <p>No test cases available for this problem</p>
        </div>
      ) : (
        <div className="test-cases-list">
          {testCases.map((testCase, index) => (
            <div
              key={index}
              className={`test-case-item ${
                testResults[index] ? (testResults[index].passed ? "passed" : "failed") : ""
              }`}
            >
              <div
                className="test-case-header"
                onClick={() => handleTestClick(index)}
              >
                <span className="test-number">Test {index + 1}</span>
                <span className="test-status">
                  {testResults[index] ? (
                    testResults[index].passed ? (
                      <span className="status-badge passed">✓ Passed</span>
                    ) : (
                      <span className="status-badge failed">✗ Failed</span>
                    )
                  ) : (
                    <span className="status-badge pending">⊘ Pending</span>
                  )}
                </span>
                <span className={`toggle-icon ${expandedTest === index ? "open" : ""}`}>
                  ▼
                </span>
              </div>

              {expandedTest === index && (
                <div className="test-case-details">
                  <div className="test-section">
                    <label>Input:</label>
                    <pre className="code-block">{testCase.input}</pre>
                  </div>

                  <div className="test-section">
                    <label>Expected Output:</label>
                    <pre className="code-block expected">{testCase.expected}</pre>
                  </div>

                  {testResults[index]?.actual && (
                    <div className="test-section">
                      <label>Actual Output:</label>
                      <pre className={`code-block ${testResults[index].passed ? "actual-pass" : "actual-fail"}`}>
                        {testResults[index].actual}
                      </pre>
                    </div>
                  )}

                  {testCase.explanation && (
                    <div className="test-section">
                      <label>Explanation:</label>
                      <p className="explanation">{testCase.explanation}</p>
                    </div>
                  )}

                  {testResults[index]?.error && (
                    <div className="test-section error">
                      <label>Error:</label>
                      <pre className="error-block">{testResults[index].error}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {output && (
        <div className="output-section">
          <h4>📤 Execution Output</h4>
          <pre className="output-block">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default TestCasesPanel;

// Piston API - Free, open-source code execution
// Documentation: https://piston.readthedocs.io/en/latest/

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

// Language mappings for Piston API
const PISTON_LANGUAGES = {
  JavaScript: "javascript",
  Python: "python",
  Java: "java",
  "C++": "cpp",
  TypeScript: "typescript",
  Go: "go",
  Rust: "rust",
  "C#": "csharp",
  Ruby: "ruby",
  PHP: "php",
};

/**
 * Execute code using Piston API
 * @param {string} code - The code to execute
 * @param {string} language - The programming language
 * @param {string} stdin - Input for the program
 * @returns {Promise<{output: string, error: string|null}>}
 */
export const executeCode = async (code, language, stdin = "") => {
  try {
    const pistonLang = PISTON_LANGUAGES[language];

    if (!pistonLang) {
      throw new Error(`Language ${language} not supported`);
    }

    const response = await fetch(PISTON_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: pistonLang,
        version: "*",
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
        stdin: stdin,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();

    if (result.run) {
      const { stdout, stderr, output } = result.run;
      return {
        output: stdout || output || "",
        error: stderr || null,
        success: !stderr,
      };
    }

    return {
      output: "",
      error: "Unexpected API response format",
      success: false,
    };
  } catch (error) {
    return {
      output: "",
      error: `Execution Error: ${error.message}`,
      success: false,
    };
  }
};

/**
 * Get file extension for a language
 */
function getFileExtension(language) {
  const extensions = {
    JavaScript: "js",
    Python: "py",
    Java: "java",
    "C++": "cpp",
    TypeScript: "ts",
    Go: "go",
    Rust: "rs",
    "C#": "cs",
    Ruby: "rb",
    PHP: "php",
  };
  return extensions[language] || "txt";
}

/**
 * Run code against test cases
 * @param {string} code - The code to execute
 * @param {string} language - The programming language
 * @param {Array} testCases - Array of {input, expected} objects
 * @returns {Promise<{results: Array, allPassed: boolean}>}
 */
export const runTestCases = async (code, language, testCases = []) => {
  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    try {
      const { output, error, success } = await executeCode(
        code,
        language,
        testCase.input
      );

      // Normalize output for comparison
      const normalizedOutput = output.trim();
      const normalizedExpected = testCase.expected.trim();

      const passed = success && normalizedOutput === normalizedExpected;

      results.push({
        index: i + 1,
        passed,
        actual: normalizedOutput,
        expected: normalizedExpected,
        error: error,
        testCase,
      });
    } catch (err) {
      results.push({
        index: i + 1,
        passed: false,
        actual: "",
        expected: testCase.expected,
        error: err.message,
        testCase,
      });
    }
  }

  const allPassed = results.every((r) => r.passed);

  return {
    results,
    allPassed,
    passedCount: results.filter((r) => r.passed).length,
    totalCount: results.length,
  };
};

/**
 * Mock execution for testing (when API is unavailable)
 */
export const mockExecuteCode = async (code, language) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        if (language === "JavaScript") {
          // Simple mock execution for JavaScript
          const result = eval(code);
          resolve({
            output: String(result),
            error: null,
            success: true,
          });
        } else {
          resolve({
            output: "Mock execution output",
            error: null,
            success: true,
          });
        }
      } catch (error) {
        resolve({
          output: "",
          error: error.message,
          success: false,
        });
      }
    }, 500);
  });
};

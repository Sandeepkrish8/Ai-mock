import "./Practice.css";
import problemsData from "../problems";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Practice = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const companies = ["Google", "Amazon", "Meta", "Microsoft"];

  const handleCompanyToggle = (company) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  const filteredProblems = problemsData.filter((problem) => {
    const matchesCategory = category === "All" || problem.category === category;
    const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;
    const matchesSearch = problem.title.toLowerCase().includes(search.toLowerCase());
    const matchesCompany =
      selectedCompanies.length === 0 ||
      (problem.topCompanies && selectedCompanies.some((company) => problem.topCompanies.includes(company)));

    return matchesCategory && matchesDifficulty && matchesSearch && matchesCompany;
  });

  const solvedCount = 12;
  const totalLevel = 3;

  return (
    <div className="practice-container">

      {/* HERO */}
      <div className="practice-hero">
        <h1>🔥 DSA Practice Hub</h1>
        <p>
          Practice Top Interview Questions asked in Product Companies
        </p>
      </div>

      {/* STATS */}
      <div className="practice-stats">
        <div className="stat-card">
          <h2>{solvedCount}</h2>
          <p>Patterns Covered</p>
        </div>

        <div className="stat-card">
          <h2>{totalLevel}</h2>
          <p>Difficulty Levels</p>
        </div>

        <div className="stat-card">
          <h2>
            8
          </h2>
          <p>Core Categories</p>
        </div>
      </div>

      {/* FILTER */}
      <div className="filters">

        <input
          type="text"
          placeholder="Search problem..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Array</option>
          <option>String</option>
          <option>DP</option>
          <option>Graph</option>
          <option>Tree</option>
          <option>Stack</option>
          <option>Design</option>
          <option>Binary Search</option>
        </select>

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* COMPANY FILTER */}
      <div className="company-filter">
        <p className="filter-label">Filter by Companies:</p>
        <div className="company-buttons">
          {companies.map((company) => (
            <button
              key={company}
              className={`company-btn ${selectedCompanies.includes(company) ? "active" : ""}`}
              onClick={() => handleCompanyToggle(company)}
            >
              {company}
            </button>
          ))}
        </div>
      </div>

      {/* PROBLEMS */}
      <div className="problem-grid">

        {filteredProblems.map((problem) => (
          <div key={problem.id} className="problem-card">

            <h3>{problem.title}</h3>

            <div className="problem-info">
              <span className={`difficulty ${problem.difficulty}`}>
                {problem.difficulty}
              </span>

              <span>{problem.category}</span>
            </div>

            {problem.topCompanies && problem.topCompanies.length > 0 && (
              <div className="companies-tag">
                🏢 {problem.topCompanies.join(", ")}
              </div>
            )}

            <button
  className="solve-btn"
  onClick={() => navigate(`/practice/${problem.id}`)}
>
  Solve →
</button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Practice;
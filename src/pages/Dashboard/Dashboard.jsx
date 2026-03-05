import "./Dashboard.css";
import { useState, useEffect } from "react";
import {
  calculateStats,
  getRecentSubmissions,
  getSubmissionsByCategory,
  getSubmissionsByDifficulty,
  generateAchievements,
} from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSolved: 0,
    completionPercentage: 0,
    streak: 0,
    totalProblems: 0,
  });

  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [categoryProgress, setCategoryProgress] = useState({});
  const [difficultyStats, setDifficultyStats] = useState({
    Easy: 0,
    Medium: 0,
    Hard: 0,
  });
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Calculate all dashboard data
    const dashboardStats = calculateStats();
    setStats(dashboardStats);

    const recent = getRecentSubmissions(5);
    setRecentSubmissions(recent);

    const categories = getSubmissionsByCategory();
    setCategoryProgress(categories);

    const difficulties = getSubmissionsByDifficulty();
    setDifficultyStats(difficulties);

    const unlockedAchievements = generateAchievements();
    setAchievements(unlockedAchievements);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const categories = Object.keys(categoryProgress);
  const maxCategoryCount = Math.max(...Object.values(categoryProgress), 1);

  return (
    <div className="dashboard-container">
      {/* HERO SECTION */}
      <div className="dashboard-hero">
        <h1>📊 Your Progress Dashboard</h1>
        <p>Track your coding practice and celebrate your achievements</p>
      </div>

      {/* STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalSolved}</div>
          <div className="stat-label">Problems Solved</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.completionPercentage}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.streak}</div>
          <div className="stat-label">Current Streak</div>
        </div>
      </div>

      {/* RECENT SUBMISSIONS */}
      {recentSubmissions.length > 0 && (
        <div className="recent-submissions">
          <h2>📝 Recent Submissions</h2>
          <div className="submissions-list">
            {recentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className={`submission-item ${submission.passed ? "passed" : "failed"}`}
              >
                <div className="submission-title">
                  <div className="submission-problem">{submission.problemTitle}</div>
                  <div className="submission-time">{formatDate(submission.timestamp)}</div>
                </div>
                <span
                  className={`submission-status ${submission.passed ? "passed" : "failed"}`}
                >
                  {submission.passed ? "✓ Passed" : "✗ Failed"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY PROGRESS */}
      {categories.length > 0 && (
        <div className="category-progress">
          <h2>📚 Category Progress</h2>
          <div className="progress-items">
            {categories
              .sort((a, b) => categoryProgress[b] - categoryProgress[a])
              .map((category) => (
                <div key={category} className="progress-item">
                  <div className="progress-header">
                    <span className="progress-name">{category}</span>
                    <span className="progress-count">
                      {categoryProgress[category]} solved
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${
                          maxCategoryCount > 0
                            ? (categoryProgress[category] / maxCategoryCount) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* DIFFICULTY BREAKDOWN */}
      <div className="difficulty-section">
        <h2>⚙️ Difficulty Breakdown</h2>
        <div className="difficulty-grid">
          <div className="difficulty-card difficulty-easy">
            <div className="difficulty-label">Easy</div>
            <div className="difficulty-value">{difficultyStats.Easy}</div>
            <div className="difficulty-percent">{difficultyStats.easyPercent}%</div>
          </div>
          <div className="difficulty-card difficulty-medium">
            <div className="difficulty-label">Medium</div>
            <div className="difficulty-value">{difficultyStats.Medium}</div>
            <div className="difficulty-percent">{difficultyStats.mediumPercent}%</div>
          </div>
          <div className="difficulty-card difficulty-hard">
            <div className="difficulty-label">Hard</div>
            <div className="difficulty-value">{difficultyStats.Hard}</div>
            <div className="difficulty-percent">{difficultyStats.hardPercent}%</div>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div className="achievements-section">
        <h2>🏆 Achievements & Badges</h2>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-badge ${achievement.unlocked ? "unlocked" : "locked"}`}
              title={achievement.description}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-name">{achievement.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
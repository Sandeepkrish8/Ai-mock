import "./Leaderboard.css";
import { useState, useEffect } from "react";
import {
  getGlobalLeaderboard,
  getStreakLeaderboard,
  getSuccessLeaderboard,
  getCurrentUserRank,
} from "../../services/leaderboardService";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRanks, setUserRanks] = useState({
    globalRank: 0,
    streakRank: 0,
    successRank: 0,
  });

  useEffect(() => {
    loadLeaderboardData();
  }, [activeTab]);

  const loadLeaderboardData = () => {
    let data;

    switch (activeTab) {
      case "global":
        data = getGlobalLeaderboard();
        break;
      case "streak":
        data = getStreakLeaderboard();
        break;
      case "success":
        data = getSuccessLeaderboard();
        break;
      default:
        data = getGlobalLeaderboard();
    }

    setLeaderboard(data);
    setUserRanks(getCurrentUserRank());
  };

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "rank-other";
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  const getMetricLabel = () => {
    switch (activeTab) {
      case "streak":
        return "Current Streak";
      case "success":
        return "Success Rate %";
      default:
        return "Problems Solved";
    }
  };

  const getMetricValue = (user) => {
    switch (activeTab) {
      case "streak":
        return user.streak;
      case "success":
        return user.successRate;
      default:
        return user.problemsSolved;
    }
  };

  return (
    <div className="leaderboard-container">
      {/* HERO SECTION */}
      <div className="leaderboard-hero">
        <h1>🏆 Leaderboard</h1>
        <p>Compete with other coders and climb the ranks</p>
      </div>

      {/* USER RANKS INFO */}
      <div className="user-ranks-info">
        <div className="rank-card">
          <div className="rank-label">Global Rank</div>
          <div className="rank-value">#{userRanks.globalRank}</div>
        </div>
        <div className="rank-card">
          <div className="rank-label">Streak Rank</div>
          <div className="rank-value">#{userRanks.streakRank}</div>
        </div>
        <div className="rank-card">
          <div className="rank-label">Success Rank</div>
          <div className="rank-value">#{userRanks.successRank}</div>
        </div>
      </div>

      {/* TABS */}
      <div className="leaderboard-tabs">
        <button
          className={`tab-button ${activeTab === "global" ? "active" : ""}`}
          onClick={() => setActiveTab("global")}
        >
          📊 Global
        </button>
        <button
          className={`tab-button ${activeTab === "streak" ? "active" : ""}`}
          onClick={() => setActiveTab("streak")}
        >
          🔥 Streak
        </button>
        <button
          className={`tab-button ${activeTab === "success" ? "active" : ""}`}
          onClick={() => setActiveTab("success")}
        >
          ⚡ Success Rate
        </button>
      </div>

      {/* LEADERBOARD TABLE */}
      {leaderboard.length > 0 ? (
        <div className="leaderboard-table">
          {/* HEADER */}
          <div className="leaderboard-header">
            <div>RANK</div>
            <div>USER</div>
            <div>{getMetricLabel()}</div>
            <div>Success Rate</div>
            <div>Streak</div>
            <div>Badge</div>
          </div>

          {/* ROWS */}
          {leaderboard.map((user) => (
            <div
              key={user.id}
              className={`leaderboard-row ${
                user.isCurrentUser ? "current-user" : ""
              }`}
            >
              {/* RANK */}
              <div className="rank-cell">
                <div className={`rank-badge ${getRankBadgeClass(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </div>
              </div>

              {/* USER INFO */}
              <div className="user-cell">
                <div className="user-avatar">{user.avatar}</div>
                <div className="user-info">
                  <div className="user-name">
                    {user.name}
                    {user.isCurrentUser && (
                      <span className="current-user-tag">YOU</span>
                    )}
                  </div>
                  <div className="user-badge">
                    {user.badge.icon} {user.badge.name}
                  </div>
                </div>
              </div>

              {/* MAIN METRIC */}
              <div className="stat-cell">
                <div className="stat-number">{getMetricValue(user)}</div>
              </div>

              {/* SUCCESS RATE */}
              <div className="stat-cell">
                <div className="stat-number">{user.successRate}%</div>
                <div className="stat-label">Success</div>
              </div>

              {/* STREAK */}
              <div className="stat-cell">
                <div className="stat-number">{user.streak}</div>
                <div className="stat-label">Days</div>
              </div>

              {/* BADGE DISPLAY */}
              <div className="stat-cell">
                <div style={{ fontSize: "24px" }}>{user.badge.icon}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p>No leaderboard data available yet</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

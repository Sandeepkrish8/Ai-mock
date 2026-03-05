import "./Roadmap.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRoadmaps,
  getModuleProgress,
  getUserRoadmapProgress,
  getNextRecommendedTopic,
} from "../../services/roadmapService";

const Roadmap = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [nextTopic, setNextTopic] = useState(null);

  useEffect(() => {
    const allRoadmaps = getRoadmaps();
    setRoadmaps(allRoadmaps);

    const progress = getUserRoadmapProgress();
    setUserProgress(progress);
  }, []);

  const handleSelectRoadmap = (roadmap) => {
    setSelectedRoadmap(roadmap);
    const next = getNextRecommendedTopic(roadmap.id);
    setNextTopic(next);
  };

  const handleBackToRoadmaps = () => {
    setSelectedRoadmap(null);
    setNextTopic(null);
  };

  const handleStartModule = (categories) => {
    navigate("/practice");
  };

  const getRoadmapCompletion = (roadmapId) => {
    const progress = userProgress.find((p) => p.roadmapId === roadmapId);
    return progress ? progress.completion : 0;
  };

  if (selectedRoadmap) {
    return (
      <div className="roadmap-container">
        {/* DETAIL VIEW */}
        <div className="roadmap-detail">
          <div style={{ marginBottom: "30px" }}>
            <button className="back-button" onClick={handleBackToRoadmaps}>
              ← Back to Roadmaps
            </button>
          </div>

          {/* HEADER */}
          <div className="roadmap-detail-header">
            <div className="detail-icon">{selectedRoadmap.icon}</div>
            <div className="detail-title-section">
              <h1 className="detail-title">{selectedRoadmap.title}</h1>
              <p className="detail-description">{selectedRoadmap.description}</p>
              <div className="detail-meta">
                <div className="detail-meta-item">
                  📅 <span className="detail-meta-value">{selectedRoadmap.duration}</span>
                </div>
                <div className="detail-meta-item">
                  📊 <span className="detail-meta-value">{selectedRoadmap.difficulty}</span>
                </div>
                <div className="detail-meta-item">
                  ✅ <span className="detail-meta-value">{getRoadmapCompletion(selectedRoadmap.id)}%</span> Complete
                </div>
              </div>
            </div>
          </div>

          {/* NEXT RECOMMENDED */}
          {nextTopic && (
            <div
              style={{
                background: "rgba(56, 189, 248, 0.1)",
                border: "1px solid #38bdf8",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "30px",
              }}
            >
              <div style={{ color: "#38bdf8", fontWeight: "600", marginBottom: "10px" }}>
                🎯 Continue Learning
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#f1f5f9", marginBottom: "8px" }}>
                {nextTopic.title}
              </div>
              <p style={{ color: "#cbd5e1", marginBottom: "15px", fontSize: "14px" }}>
                {nextTopic.description}
              </p>
              <button
                className="module-start-button"
                onClick={() => handleStartModule(nextTopic.problems)}
              >
                Start Learning →
              </button>
            </div>
          )}

          {/* MODULES */}
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}>
            📚 Learning Modules
          </h2>
          <div className="modules-list">
            {selectedRoadmap.modules.map((module) => {
              const progress = getModuleProgress(module.id, module.problems);
              const isCompleted = progress === 100;

              return (
                <div key={module.id} className="module-item">
                  <div className="module-content">
                    <h3 className="module-title">{module.title}</h3>
                    <p className="module-description">{module.description}</p>
                    <div className="module-info">
                      <div className="module-info-item">
                        📖 {module.topicCount} topics
                      </div>
                      <div className="module-info-item">
                        ⏱️ {module.estimatedTime}
                      </div>
                      <div className="module-info-item">
                        📊 {module.difficulty}
                      </div>
                    </div>
                  </div>

                  <div className="module-stats">
                    <div className="module-progress-container">
                      <div className="module-progress-label">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="module-progress-bar">
                        <div
                          className="module-progress-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="completion-badge" style={{
                      borderColor: isCompleted ? "#10b981" : progress > 0 ? "#38bdf8" : "#334155",
                      background: isCompleted
                        ? "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))"
                        : progress > 0
                        ? "linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(129, 140, 248, 0.1))"
                        : "linear-gradient(135deg, #0f172a, #1e293b)",
                      color: isCompleted ? "#10b981" : progress > 0 ? "#38bdf8" : "#64748b",
                    }}>
                      {isCompleted ? "✓" : progress > 0 ? `${progress}%` : "0%"}
                    </div>

                    <button
                      className={`module-start-button ${isCompleted ? "completed" : ""}`}
                      onClick={() => handleStartModule(module.problems)}
                      disabled={isCompleted}
                    >
                      {isCompleted ? "✓ Completed" : "Start →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap-container">
      {/* HERO */}
      <div className="roadmap-hero">
        <h1>🗺️ Learning Roadmaps</h1>
        <p>Choose a structured path to master DSA and ace your interviews</p>
      </div>

      {/* ROADMAP CARDS */}
      <div className="roadmaps-grid">
        {roadmaps.map((roadmap) => {
          const completion = getRoadmapCompletion(roadmap.id);

          return (
            <div
              key={roadmap.id}
              className="roadmap-card"
              onClick={() => handleSelectRoadmap(roadmap)}
            >
              <div className="roadmap-header">
                <div className="roadmap-icon">{roadmap.icon}</div>
                <div className="roadmap-difficulty">{roadmap.difficulty}</div>
              </div>

              <h2 className="roadmap-title">{roadmap.title}</h2>
              <p className="roadmap-description">{roadmap.description}</p>

              <div className="roadmap-meta">
                <div className="meta-item">
                  📚 {roadmap.modules.length} <span className="meta-value">Modules</span>
                </div>
                <div className="meta-item">
                  ⏱️ <span className="meta-value">{roadmap.duration}</span>
                </div>
                <div className="meta-item">
                  📊 <span className="meta-value">{completion}%</span>
                </div>
              </div>

              <div className="roadmap-progress">
                <div className="progress-label">
                  <span>Your Progress</span>
                  <span>{completion}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>

              <button className="roadmap-button">
                {completion === 0
                  ? "Start Roadmap →"
                  : completion === 100
                  ? "✓ Completed"
                  : "Continue →"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;

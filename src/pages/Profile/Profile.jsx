import "./Profile.css";
import { useState, useEffect } from "react";
import {
  getUserProfile,
  updateUserProfile,
  getUserStats,
  getStreakInfo,
  getTopLanguages,
} from "../../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [streak, setStreak] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const availableLanguages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "TypeScript",
    "Go",
    "Rust",
    "C#",
  ];

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = () => {
    const userProfile = getUserProfile();
    const userStats = getUserStats();
    const streakInfo = getStreakInfo();
    const topLanguages = getTopLanguages();

    setProfile(userProfile);
    setStats(userStats);
    setStreak(streakInfo);
    setLanguages(topLanguages);
    setEditData(userProfile);
    setSelectedLanguages(userProfile.preferredLanguages || []);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditData(profile);
    setSelectedLanguages(profile.preferredLanguages || []);
  };

  const handleSave = () => {
    const updatedProfile = {
      ...editData,
      preferredLanguages: selectedLanguages,
    };
    updateUserProfile(updatedProfile);
    setProfile(updatedProfile);
    setIsEditMode(false);
  };

  const toggleLanguage = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!profile || !stats || !streak) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      {/* HEADER GRID */}
      <div className="profile-header">
        {/* PROFILE CARD */}
        <div className="profile-card">
          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="profile-name">{profile.name}</h1>
          <p className="profile-email">{profile.email}</p>
          <p className="profile-bio">{profile.bio}</p>
          <div className="profile-meta">
            <div className="meta-item">
              <span className="meta-label">Joined</span>
              <span className="meta-value">{formatDate(profile.joinedDate)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Timezone</span>
              <span className="meta-value">{profile.timezone}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Theme</span>
              <span className="meta-value">{profile.theme}</span>
            </div>
          </div>
          <button className="edit-profile-btn" onClick={handleEditClick}>
            ✏️ Edit Profile
          </button>
        </div>

        {/* STATS OVERVIEW */}
        <div className="stats-overview">
          <h3>📊 Statistics</h3>
          <div className="stats-grid">
            <div className="stats-item">
              <div className="stats-number">{stats.totalSolved}</div>
              <div className="stats-label">Problems Solved</div>
            </div>
            <div className="stats-item">
              <div className="stats-number">{stats.successRate}%</div>
              <div className="stats-label">Success Rate</div>
            </div>
            <div className="stats-item">
              <div className="stats-number">{stats.totalSubmissions}</div>
              <div className="stats-label">Total Submissions</div>
            </div>
            <div className="stats-item">
              <div className="stats-number">{streak.totalActiveDays}</div>
              <div className="stats-label">Active Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* STREAK SECTION */}
      <div className="streak-section">
        <h3>🔥 Streak Stats</h3>
        <div className="streak-items">
          <div className="streak-item active">
            <div className="streak-icon">🔥</div>
            <div className="streak-value">{streak.currentStreak}</div>
            <div className="streak-label">Current Streak</div>
          </div>
          <div className="streak-item">
            <div className="streak-icon">⭐</div>
            <div className="streak-value">{streak.maxStreak}</div>
            <div className="streak-label">Max Streak</div>
          </div>
          <div className="streak-item">
            <div className="streak-icon">📅</div>
            <div className="streak-value">{streak.totalActiveDays}</div>
            <div className="streak-label">Active Days</div>
          </div>
        </div>
      </div>

      {/* LANGUAGES SECTION */}
      {languages.length > 0 && (
        <div className="languages-section">
          <h3>🗣️ Top Languages</h3>
          <div className="language-list">
            {languages.map((lang) => (
              <div key={lang.language} className="language-item">
                <span className="language-name">{lang.language}</span>
                <span className="language-count">{lang.count} problems</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PREFERENCES SECTION */}
      {!isEditMode && (
        <div className="preferences-section">
          <h3>⚙️ Preferences</h3>
          <div className="form-group">
            <label>Study Goal</label>
            <p style={{ color: "#94a3b8" }}>{profile.studyGoal}</p>
          </div>
          <div className="form-group">
            <label>Preferred Languages</label>
            <div className="language-tags">
              {profile.preferredLanguages.map((lang) => (
                <span key={lang} className="language-tag selected">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditMode && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCancel}>
              ✕
            </button>
            <h2 className="modal-header">Edit Profile</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={editData.bio}
                onChange={(e) =>
                  setEditData({ ...editData, bio: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Study Goal</label>
              <input
                type="text"
                value={editData.studyGoal}
                onChange={(e) =>
                  setEditData({ ...editData, studyGoal: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Timezone</label>
              <input
                type="text"
                value={editData.timezone}
                onChange={(e) =>
                  setEditData({ ...editData, timezone: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Preferred Languages</label>
              <div className="language-tags">
                {availableLanguages.map((lang) => (
                  <span
                    key={lang}
                    className={`language-tag ${
                      selectedLanguages.includes(lang) ? "selected" : ""
                    }`}
                    onClick={() => toggleLanguage(lang)}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="button-group">
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

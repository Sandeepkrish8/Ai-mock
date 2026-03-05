/**
 * Profile & User Management Service
 */

/**
 * Get or initialize user profile
 */
export const getUserProfile = () => {
  const userStr = localStorage.getItem("user");
  const userProfile = localStorage.getItem("userProfile");

  if (!userProfile) {
    const defaultProfile = {
      id: userStr ? JSON.parse(userStr).id : Date.now().toString(),
      name: userStr ? JSON.parse(userStr).name || "User" : "User",
      email: userStr ? JSON.parse(userStr).email || "user@example.com" : "user@example.com",
      joinedDate: new Date().toISOString(),
      bio: "Passionate about coding and problem-solving",
      preferredLanguages: ["JavaScript"],
      studyGoal: "Master DSA for interviews",
      timezone: "UTC",
      theme: "dark",
    };
    localStorage.setItem("userProfile", JSON.stringify(defaultProfile));
    return defaultProfile;
  }

  return JSON.parse(userProfile);
};

/**
 * Update user profile
 */
export const updateUserProfile = (updates) => {
  const profile = getUserProfile();
  const updatedProfile = { ...profile, ...updates };
  localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  return updatedProfile;
};

/**
 * Get user statistics
 */
export const getUserStats = () => {
  // Count submissions across all problems
  let totalSolved = 0;
  let totalSubmissions = 0;
  let languageStats = {};
  let lastActivityDate = null;

  for (let i = 1; i <= 100; i++) {
    const saved = localStorage.getItem(`submissions_${i}`);
    if (saved) {
      try {
        const submissions = JSON.parse(saved);
        submissions.forEach((sub) => {
          totalSubmissions++;
          if (sub.passed) totalSolved++;
          if (sub.language) {
            languageStats[sub.language] = (languageStats[sub.language] || 0) + 1;
          }
          const subDate = new Date(sub.timestamp);
          if (!lastActivityDate || subDate > lastActivityDate) {
            lastActivityDate = subDate;
          }
        });
      } catch (error) {
        console.error(`Error parsing submissions for problem ${i}:`, error);
      }
    }
  }

  return {
    totalSolved,
    totalSubmissions,
    successRate:
      totalSubmissions > 0 ? Math.round((totalSolved / totalSubmissions) * 100) : 0,
    languageStats: Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [lang, count]) => {
        acc[lang] = count;
        return acc;
      }, {}),
    lastActivityDate,
  };
};

/**
 * Get study streak info
 */
export const getStreakInfo = () => {
  const allDates = new Set();

  for (let i = 1; i <= 100; i++) {
    const saved = localStorage.getItem(`submissions_${i}`);
    if (saved) {
      try {
        const submissions = JSON.parse(saved);
        submissions.forEach((sub) => {
          const date = new Date(sub.timestamp).toDateString();
          allDates.add(date);
        });
      } catch (error) {
        console.error(`Error parsing submissions for problem ${i}:`, error);
      }
    }
  }

  const sortedDates = Array.from(allDates)
    .map((d) => new Date(d))
    .sort((a, b) => b - a);

  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedDates.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);

    if (sortedDates[i].getTime() === expected.getTime()) {
      currentStreak++;
    } else {
      break;
    }
  }

  const maxStreak =
    sortedDates.length > 0
      ? calculateMaxStreak(sortedDates)
      : 0;

  return {
    currentStreak,
    maxStreak,
    totalActiveDays: sortedDates.length,
  };
};

/**
 * Calculate maximum consecutive streak from dates
 */
const calculateMaxStreak = (dates) => {
  let maxStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const dayDiff =
      (dates[i - 1] - dates[i]) / (1000 * 60 * 60 * 24);
    if (dayDiff === 1) {
      currentStreak++;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 1;
    }
  }

  return Math.max(maxStreak, currentStreak);
};

/**
 * Get most used languages
 */
export const getTopLanguages = (limit = 3) => {
  const stats = getUserStats();
  return Object.entries(stats.languageStats)
    .slice(0, limit)
    .map(([lang, count]) => ({ language: lang, count }));
};

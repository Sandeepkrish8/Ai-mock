/**
 * Leaderboard Service
 */

import problemsData from "../pages/problems";

/**
 * Get current user's leaderboard entry
 */
const getCurrentUserEntry = () => {
  const userProfile = localStorage.getItem("userProfile");
  const profile = userProfile ? JSON.parse(userProfile) : { name: "You" };

  let totalSolved = 0;
  let totalSubmissions = 0;

  for (let i = 1; i <= 100; i++) {
    const saved = localStorage.getItem(`submissions_${i}`);
    if (saved) {
      try {
        const submissions = JSON.parse(saved);
        submissions.forEach((sub) => {
          totalSubmissions++;
          if (sub.passed) totalSolved++;
        });
      } catch (e) {
        console.error(`Error parsing submissions for problem ${i}:`, e);
      }
    }
  }

  const successRate =
    totalSubmissions > 0 ? Math.round((totalSolved / totalSubmissions) * 100) : 0;

  return {
    id: "current-user",
    name: profile.name || "You",
    avatar: profile.name ? profile.name.charAt(0).toUpperCase() : "Y",
    problemsSolved: totalSolved,
    successRate,
    streak: calculateStreak(),
    badge: getBadge(totalSolved),
    isCurrentUser: true,
  };
};

/**
 * Generate mock leaderboard users
 */
const generateMockUsers = () => {
  const mockNames = [
    "Alex Chen",
    "Sarah Johnson",
    "Mike Rodriguez",
    "Emma Wilson",
    "James Lee",
    "Lisa Wang",
    "David Brown",
    "Rachel Martinez",
    "Chris Taylor",
    "Nicole Anderson",
  ];

  return mockNames.map((name, idx) => ({
    id: `user-${idx}`,
    name,
    avatar: name.charAt(0).toUpperCase(),
    problemsSolved: Math.floor(Math.random() * 50) + 5,
    successRate: Math.floor(Math.random() * 40) + 60,
    streak: Math.floor(Math.random() * 20) + 1,
    badge: getBadge(Math.floor(Math.random() * 50) + 5),
    isCurrentUser: false,
  }));
};

/**
 * Calculate user's current streak
 */
const calculateStreak = () => {
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
      } catch (e) {
        console.error(`Error parsing submissions for problem ${i}:`, e);
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

  return currentStreak;
};

/**
 * Get badge based on problems solved
 */
const getBadge = (solvedCount) => {
  if (solvedCount >= 50) return { icon: "👑", name: "Legend" };
  if (solvedCount >= 30) return { icon: "🌟", name: "Master" };
  if (solvedCount >= 20) return { icon: "💪", name: "Pro" };
  if (solvedCount >= 10) return { icon: "⚡", name: "Intermediate" };
  if (solvedCount >= 5) return { icon: "🚀", name: "Starter" };
  return { icon: "🎯", name: "Beginner" };
};

/**
 * Get global leaderboard (sorted by problems solved)
 */
export const getGlobalLeaderboard = () => {
  const currentUser = getCurrentUserEntry();
  const mockUsers = generateMockUsers();

  const allUsers = [currentUser, ...mockUsers].sort(
    (a, b) => b.problemsSolved - a.problemsSolved
  );

  return allUsers.map((user, idx) => ({
    ...user,
    rank: idx + 1,
  }));
};

/**
 * Get streak leaderboard (sorted by current streak)
 */
export const getStreakLeaderboard = () => {
  const currentUser = getCurrentUserEntry();
  const mockUsers = generateMockUsers();

  const allUsers = [currentUser, ...mockUsers].sort((a, b) => b.streak - a.streak);

  return allUsers.map((user, idx) => ({
    ...user,
    rank: idx + 1,
  }));
};

/**
 * Get success rate leaderboard
 */
export const getSuccessLeaderboard = () => {
  const currentUser = getCurrentUserEntry();
  const mockUsers = generateMockUsers();

  const allUsers = [currentUser, ...mockUsers].sort(
    (a, b) => b.successRate - a.successRate
  );

  return allUsers.map((user, idx) => ({
    ...user,
    rank: idx + 1,
  }));
};

/**
 * Get current user's rank in different categories
 */
export const getCurrentUserRank = () => {
  const globalLeaderboard = getGlobalLeaderboard();
  const streakLeaderboard = getStreakLeaderboard();
  const successLeaderboard = getSuccessLeaderboard();

  const findUserRank = (leaderboard) =>
    leaderboard.find((user) => user.isCurrentUser)?.rank || 0;

  return {
    globalRank: findUserRank(globalLeaderboard),
    streakRank: findUserRank(streakLeaderboard),
    successRank: findUserRank(successLeaderboard),
  };
};

import problemsData from "../pages/problems";

/**
 * Fetch all submissions from localStorage across all problems
 */
export const getAllSubmissions = () => {
  const submissions = [];

  problemsData.forEach((problem) => {
    const saved = localStorage.getItem(`submissions_${problem.id}`);
    if (saved) {
      try {
        const problemSubmissions = JSON.parse(saved);
        submissions.push(
          ...problemSubmissions.map((sub) => ({
            ...sub,
            problemId: problem.id,
            problemTitle: problem.title,
            problemCategory: problem.category,
            problemDifficulty: problem.difficulty,
          }))
        );
      } catch (error) {
        console.error(`Error parsing submissions for problem ${problem.id}:`, error);
      }
    }
  });

  return submissions;
};

/**
 * Calculate dashboard statistics
 */
export const calculateStats = () => {
  const submissions = getAllSubmissions();

  const uniqueSolvedProblems = new Set(
    submissions.filter((sub) => sub.passed).map((sub) => sub.problemId)
  ).size;

  const totalProblems = problemsData.length;
  const completionPercentage = totalProblems > 0 
    ? Math.round((uniqueSolvedProblems / totalProblems) * 100)
    : 0;

  // Calculate streak (consecutive days with submissions)
  const streak = calculateStreak(submissions);

  return {
    totalSolved: uniqueSolvedProblems,
    completionPercentage,
    streak,
    totalProblems,
    totalSubmissions: submissions.length,
  };
};

/**
 * Calculate current streak
 */
const calculateStreak = (submissions) => {
  if (submissions.length === 0) return 0;

  const dates = submissions
    .map((sub) => new Date(sub.timestamp).toDateString())
    .filter((date, idx, arr) => arr.indexOf(date) === idx) // unique dates
    .map((date) => new Date(date))
    .sort((a, b) => b - a); // sort descending

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < dates.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);

    if (dates[i].getTime() === expected.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Get submissions organized by category
 */
export const getSubmissionsByCategory = () => {
  const submissions = getAllSubmissions();
  const categories = {};

  problemsData.forEach((problem) => {
    categories[problem.category] = 0;
  });

  submissions
    .filter((sub) => sub.passed)
    .forEach((sub) => {
      if (categories.hasOwnProperty(sub.problemCategory)) {
        categories[sub.problemCategory]++;
      }
    });

  return categories;
};

/**
 * Get submission counts by difficulty
 */
export const getSubmissionsByDifficulty = () => {
  const submissions = getAllSubmissions();
  const difficulties = {
    Easy: 0,
    Medium: 0,
    Hard: 0,
  };

  const solvedProblems = new Map();

  submissions
    .filter((sub) => sub.passed)
    .forEach((sub) => {
      solvedProblems.set(sub.problemId, sub.problemDifficulty);
    });

  solvedProblems.forEach((difficulty) => {
    if (difficulties.hasOwnProperty(difficulty)) {
      difficulties[difficulty]++;
    }
  });

  const total = Object.values(difficulties).reduce((a, b) => a + b, 0);

  return {
    ...difficulties,
    total,
    easyPercent: total > 0 ? Math.round((difficulties.Easy / total) * 100) : 0,
    mediumPercent: total > 0 ? Math.round((difficulties.Medium / total) * 100) : 0,
    hardPercent: total > 0 ? Math.round((difficulties.Hard / total) * 100) : 0,
  };
};

/**
 * Get recent submissions (last N)
 */
export const getRecentSubmissions = (limit = 5) => {
  const submissions = getAllSubmissions();

  return submissions
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
};

/**
 * Generate achievements based on progress
 */
export const generateAchievements = () => {
  const stats = calculateStats();
  const difficulty = getSubmissionsByDifficulty();
  const submissions = getAllSubmissions();

  const achievements = [
    {
      id: "first-solve",
      name: "First Solve",
      icon: "🎯",
      description: "Solve your first problem",
      unlocked: stats.totalSolved >= 1,
    },
    {
      id: "five-solved",
      name: "Getting Started",
      icon: "🚀",
      description: "Solve 5 problems",
      unlocked: stats.totalSolved >= 5,
    },
    {
      id: "ten-solved",
      name: "Momentum",
      icon: "⚡",
      description: "Solve 10 problems",
      unlocked: stats.totalSolved >= 10,
    },
    {
      id: "twenty-solved",
      name: "Pro Coder",
      icon: "💪",
      description: "Solve 20 problems",
      unlocked: stats.totalSolved >= 20,
    },
    {
      id: "easy-master",
      name: "Easy Master",
      icon: "✨",
      description: "Solve 5 Easy problems",
      unlocked: difficulty.Easy >= 5,
    },
    {
      id: "medium-master",
      name: "Medium Master",
      icon: "🔥",
      description: "Solve 5 Medium problems",
      unlocked: difficulty.Medium >= 5,
    },
    {
      id: "hard-master",
      name: "Hard Master",
      icon: "👑",
      description: "Solve 5 Hard problems",
      unlocked: difficulty.Hard >= 5,
    },
    {
      id: "streak-7",
      name: "Week Warrior",
      icon: "🌟",
      description: "Maintain 7-day streak",
      unlocked: stats.streak >= 7,
    },
    {
      id: "perfect-day",
      name: "Perfect Day",
      icon: "🎉",
      description: "Solve 3 problems in 1 day",
      unlocked: hasMultipleSolutionsInDay(submissions, 3),
    },
    {
      id: "polyglot",
      name: "Polyglot",
      icon: "🗣️",
      description: "Solve in 3 different languages",
      unlocked: getUniqueLangs(submissions) >= 3,
    },
  ];

  return achievements;
};

/**
 * Check if user solved N problems in single day
 */
const hasMultipleSolutionsInDay = (submissions, count) => {
  const solutionsByDay = {};

  submissions
    .filter((sub) => sub.passed)
    .forEach((sub) => {
      const date = new Date(sub.timestamp).toDateString();
      solutionsByDay[date] = (solutionsByDay[date] || 0) + 1;
    });

  return Object.values(solutionsByDay).some((val) => val >= count);
};

/**
 * Count unique programming languages used
 */
const getUniqueLangs = (submissions) => {
  return new Set(submissions.map((sub) => sub.language)).size;
};

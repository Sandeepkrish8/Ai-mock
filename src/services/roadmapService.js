/**
 * Roadmap & Learning Paths Service
 */

import problemsData from "../pages/problems";

/**
 * Predefined learning roadmaps
 */
export const getRoadmaps = () => {
  return [
    {
      id: "dsa-fundamentals",
      title: "DSA Fundamentals",
      description: "Start with the core data structures and algorithms concepts",
      duration: "4 weeks",
      difficulty: "Beginner",
      icon: "📚",
      completion: calculateRoadmapCompletion("dsa-fundamentals"),
      modules: [
        {
          id: "arrays",
          title: "Arrays & Lists",
          description: "Master array manipulation and basic list operations",
          topicCount: 8,
          problems: ["Array", "String"],
          difficulty: "Easy to Medium",
          estimatedTime: "5-7 hours",
        },
        {
          id: "strings",
          title: "String Manipulation",
          description: "Learn string patterns and manipulation techniques",
          topicCount: 6,
          problems: ["String"],
          difficulty: "Easy to Medium",
          estimatedTime: "4-6 hours",
        },
        {
          id: "linked-lists",
          title: "Linked Lists",
          description: "Understand linked list operations and traversals",
          topicCount: 7,
          problems: ["Linked List"],
          difficulty: "Medium",
          estimatedTime: "6-8 hours",
        },
        {
          id: "stacks-queues",
          title: "Stacks & Queues",
          description: "Learn LIFO and FIFO data structures",
          topicCount: 6,
          problems: ["Stack", "Queue"],
          difficulty: "Medium",
          estimatedTime: "5-7 hours",
        },
      ],
    },
    {
      id: "advanced-dsa",
      title: "Advanced DSA",
      description: "Dive into advanced algorithms and complex problem solving",
      duration: "6 weeks",
      difficulty: "Intermediate to Advanced",
      icon: "🚀",
      completion: calculateRoadmapCompletion("advanced-dsa"),
      modules: [
        {
          id: "trees",
          title: "Trees & Binary Search Trees",
          description: "Master tree traversals and BST operations",
          topicCount: 10,
          problems: ["Tree"],
          difficulty: "Medium to Hard",
          estimatedTime: "8-10 hours",
        },
        {
          id: "graphs",
          title: "Graphs & Graph Algorithms",
          description: "Learn DFS, BFS, Dijkstra, and more",
          topicCount: 12,
          problems: ["Graph"],
          difficulty: "Hard",
          estimatedTime: "10-12 hours",
        },
        {
          id: "dynamic-programming",
          title: "Dynamic Programming",
          description: "Solve optimization problems with memoization",
          topicCount: 15,
          problems: ["DP"],
          difficulty: "Hard",
          estimatedTime: "12-15 hours",
        },
        {
          id: "greedy",
          title: "Greedy Algorithms",
          description: "Master greedy approach for optimal solutions",
          topicCount: 8,
          problems: ["Greedy"],
          difficulty: "Medium to Hard",
          estimatedTime: "6-8 hours",
        },
      ],
    },
    {
      id: "tech-interview-prep",
      title: "Tech Interview Prep",
      description: "Comprehensive preparation for FAANG interviews",
      duration: "8 weeks",
      difficulty: "Intermediate to Advanced",
      icon: "🎯",
      completion: calculateRoadmapCompletion("tech-interview-prep"),
      modules: [
        {
          id: "interview-arrays",
          title: "Arrays in Interviews",
          description: "Common array problems in tech interviews",
          topicCount: 12,
          problems: ["Array"],
          difficulty: "Medium",
          estimatedTime: "8-10 hours",
        },
        {
          id: "interview-strings",
          title: "String Problems",
          description: "String manipulation in interviews",
          topicCount: 10,
          problems: ["String"],
          difficulty: "Medium",
          estimatedTime: "7-9 hours",
        },
        {
          id: "interview-trees-graphs",
          title: "Trees & Graphs",
          description: "Trees and graphs in real interviews",
          topicCount: 15,
          problems: ["Tree", "Graph"],
          difficulty: "Hard",
          estimatedTime: "12-14 hours",
        },
        {
          id: "interview-dp",
          title: "DP in Interviews",
          description: "Dynamic programming interview questions",
          topicCount: 12,
          problems: ["DP"],
          difficulty: "Hard",
          estimatedTime: "10-12 hours",
        },
        {
          id: "system-design",
          title: "System Design Basics",
          description: "Introduction to system design concepts",
          topicCount: 8,
          problems: ["System Design"],
          difficulty: "Advanced",
          estimatedTime: "10-12 hours",
        },
        {
          id: "behavioral",
          title: "Behavioral Prep",
          description: "Prepare for behavioral interview questions",
          topicCount: 5,
          problems: ["Behavioral"],
          difficulty: "Intermediate",
          estimatedTime: "4-6 hours",
        },
      ],
    },
  ];
};

/**
 * Calculate completion percentage for a roadmap
 */
const calculateRoadmapCompletion = (roadmapId) => {
  // For now, return mock data
  const completions = {
    "dsa-fundamentals": 45,
    "advanced-dsa": 20,
    "tech-interview-prep": 35,
  };
  return completions[roadmapId] || 0;
};

/**
 * Get recommended problems for a module
 */
export const getModuleProblems = (categories) => {
  return problemsData
    .filter((problem) => categories.includes(problem.category))
    .slice(0, 5);
};

/**
 * Get module progress
 */
export const getModuleProgress = (moduleId, categories) => {
  if (!categories || categories.length === 0) return 0;

  const relevantProblems = problemsData.filter((p) =>
    categories.includes(p.category)
  );

  let solvedCount = 0;

  relevantProblems.forEach((problem) => {
    const saved = localStorage.getItem(`submissions_${problem.id}`);
    if (saved) {
      try {
        const submissions = JSON.parse(saved);
        const hasPassed = submissions.some((sub) => sub.passed);
        if (hasPassed) solvedCount++;
      } catch (e) {
        console.error(`Error parsing submissions for problem ${problem.id}:`, e);
      }
    }
  });

  if (relevantProblems.length === 0) return 0;

  return Math.round((solvedCount / relevantProblems.length) * 100);
};

/**
 * Get user's current progress on all roadmaps
 */
export const getUserRoadmapProgress = () => {
  const roadmaps = getRoadmaps();
  const progress = [];

  roadmaps.forEach((roadmap) => {
    let totalProgress = 0;
    let moduleCount = 0;

    roadmap.modules.forEach((module) => {
      const moduleProgress = getModuleProgress(module.id, module.problems);
      totalProgress += moduleProgress;
      moduleCount++;
    });

    progress.push({
      roadmapId: roadmap.id,
      title: roadmap.title,
      completion: moduleCount > 0 ? Math.round(totalProgress / moduleCount) : 0,
      moduleProgresses: roadmap.modules.map((module) => ({
        moduleId: module.id,
        title: module.title,
        completion: getModuleProgress(module.id, module.problems),
      })),
    });
  });

  return progress;
};

/**
 * Get next recommended topic in a roadmap
 */
export const getNextRecommendedTopic = (roadmapId) => {
  const roadmaps = getRoadmaps();
  const roadmap = roadmaps.find((r) => r.id === roadmapId);

  if (!roadmap) return null;

  for (const module of roadmap.modules) {
    const progress = getModuleProgress(module.id, module.problems);
    if (progress < 100) {
      return module;
    }
  }

  return null;
};

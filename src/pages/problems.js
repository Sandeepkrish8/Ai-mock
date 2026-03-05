const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    topCompanies: ["Google", "Amazon", "Meta"],

    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice. You can return the answer in any order.",

    example:
`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 0, index2 = 1.`,

    constraints:
`2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9`,

    languages: ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go"],
    defaultLanguage: "JavaScript",
    
    codeTemplates: {
      JavaScript: `function twoSum(nums, target) {
  // Create a map to store value and its index
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`,
      Python: `def twoSum(nums, target):
    # Create a dictionary to store value and its index
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    return []`,
      Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        
        return new int[]{};
    }
}`,
    },

    testCases: [
      {
        input: "nums = [2,7,11,15], target = 9",
        expected: "[0,1]",
        explanation: "The sum of 2 and 7 is 9. Therefore, index1 = 0, index2 = 1."
      },
      {
        input: "nums = [3,2,4], target = 6",
        expected: "[1,2]",
        explanation: "The sum of 2 and 4 is 6. Therefore, index1 = 1, index2 = 2."
      },
      {
        input: "nums = [3,3], target = 6",
        expected: "[0,1]",
        explanation: "The sum of 3 and 3 is 6. Therefore, index1 = 0, index2 = 1."
      }
    ],

    hints: [
      "A brute force approach would use two nested loops to find the pair whose sum equals the target.",
      "A better approach is to use a hash map to store the values you've seen and their indices. For each number, check if the complement (target - number) exists in the map.",
      "The optimal solution uses a hash map with O(n) time complexity and O(n) space complexity."
    ],

    solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`,

    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    topicsTried: [],
  },

  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    topCompanies: ["Google", "Amazon"],
    
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: 1) Open brackets must be closed by the same type of brackets. 2) Open brackets must be closed in the correct order. 3) Every close bracket has a corresponding open bracket of the same type.",

    example:
`Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false`,

    constraints:
`1 <= s.length <= 10^4
s consists of parentheses only '()[]{}`,

    languages: ["JavaScript", "Python", "Java", "C++"],
    defaultLanguage: "JavaScript",

    codeTemplates: {
      JavaScript: `function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (!stack.length || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}`,
      Python: `def isValid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in '({[':
            stack.append(char)
        else:
            if not stack or stack.pop() != pairs[char]:
                return False
    
    return len(stack) == 0`,
    },

    testCases: [
      {
        input: 's = "()"',
        expected: "true",
        explanation: "Simple parentheses"
      },
      {
        input: 's = "()[]{}"',
        expected: "true",
        explanation: "Multiple types of parentheses"
      },
      {
        input: 's = "(]"',
        expected: "false",
        explanation: "Mismatched parentheses"
      },
      {
        input: 's = "([)]"',
        expected: "false",
        explanation: "Wrong order"
      }
    ],

    hints: [
      "Use a stack data structure to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the most recent opening bracket.",
      "If all brackets are properly matched and the stack is empty at the end, the string is valid."
    ],

    solution: `function isValid(s) {
    const stack = [];
    const pairs = {')': '(', '}': '{', ']': '['};
    
    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (!stack.length || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}`,

    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    topicsTried: [],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    topCompanies: ["Google", "Meta"],
    
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",

    example:
`Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.`,

    constraints:
`0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.`,

    languages: ["JavaScript", "Python", "Java", "C++"],
    defaultLanguage: "JavaScript",

    codeTemplates: {
      JavaScript: `function lengthOfLongestSubstring(s) {
    const charIndex = {};
    let maxLength = 0;
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
        if (charIndex[s[end]] !== undefined) {
            start = Math.max(start, charIndex[s[end]] + 1);
        }
        charIndex[s[end]] = end;
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}`,
    },

    testCases: [
      {
        input: 's = "abcabcbb"',
        expected: "3",
        explanation: "Substring 'abc' has length 3"
      },
      {
        input: 's = "bbbbb"',
        expected: "1",
        explanation: "Substring 'b' has length 1"
      },
      {
        input: 's = "pwwkew"',
        expected: "3",
        explanation: "Substring 'wke' has length 3"
      }
    ],

    hints: [
      "Use a sliding window approach with two pointers.",
      "Keep track of characters you've seen using a hash map.",
      "When you encounter a repeating character, move the start pointer to skip the previous occurrence."
    ],

    solution: `function lengthOfLongestSubstring(s) {
    const charIndex = {};
    let maxLength = 0;
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
        if (charIndex[s[end]] !== undefined) {
            start = Math.max(start, charIndex[s[end]] + 1);
        }
        charIndex[s[end]] = end;
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}`,

    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m, n))",
    topicsTried: [],
  },
  {
    id: 4,
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array",
    topCompanies: ["Amazon", "Microsoft"],
    
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",

    example:
`Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].`,

    constraints:
`1 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^4`,

    languages: ["JavaScript", "Python", "Java"],
    defaultLanguage: "JavaScript",

    codeTemplates: {
      JavaScript: `function merge(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const last = merged[merged.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            merged.push(intervals[i]);
        }
    }
    
    return merged;
}`,
    },

    testCases: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        expected: "[[1,6],[8,10],[15,18]]",
        explanation: "Merge overlapping intervals"
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        expected: "[[1,5]]",
        explanation: "Touching intervals merge"
      }
    ],

    hints: [
      "Sort intervals by their start value.",
      "Iterate through sorted intervals and merge overlapping ones by comparing the end of the last merged interval with the start of the current interval."
    ],

    solution: `function merge(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const last = merged[merged.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            merged.push(intervals[i]);
        }
    }
    
    return merged;
}`,

    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    topicsTried: [],
  },
  {
    id: 5,
    title: "LRU Cache",
    difficulty: "Hard",
    category: "Design",
    topCompanies: ["Google", "Amazon", "Meta"],
    
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) methods.",

    languages: ["JavaScript", "Python", "Java"],
    defaultLanguage: "JavaScript",

    codeTemplates: {
      JavaScript: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        
        if (this.cache.size > this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}`,
    },

    testCases: [
      {
        input: 'LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); get(2)',
        expected: "1, -1",
        explanation: "Cache stores 2 items, evicting LRU item when capacity exceeded"
      }
    ],

    hints: [
      "Use a Map to store key-value pairs and maintain insertion order.",
      "On every access (get or put), move the key to the end to mark it as recently used.",
      "When capacity is exceeded, remove the first item (least recently used)."
    ],

    timeComplexity: "O(1) for get and put",
    spaceComplexity: "O(capacity)",
    topicsTried: [],
  },
  {
    id: 6,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree",
    topCompanies: ["Google", "Microsoft"],
    
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",

    languages: ["JavaScript", "Python", "Java"],
    defaultLanguage: "JavaScript",

    codeTemplates: {
      JavaScript: `function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const levelLength = queue.length;
        const level = [];
        
        for (let i = 0; i < levelLength; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    
    return result;
}`,
    },

    testCases: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        expected: "[[3],[9,20],[15,7]]",
        explanation: "Level order traversal of binary tree"
      }
    ],

    hints: [
      "Use a queue to store nodes at each level.",
      "Process each level separately to group values by level."
    ],

    timeComplexity: "O(n)",
    spaceComplexity: "O(w)",
    topicsTried: [],
  },
  {
    id: 7,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "DP",
    topCompanies: ["Amazon"],
    
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",

    languages: ["JavaScript", "Python", "Java"],
    defaultLanguage: "JavaScript",

    codeTemplates: {
      JavaScript: `function climbStairs(n) {
    if (n <= 1) return 1;
    
    let prev = 1, current = 1;
    
    for (let i = 2; i <= n; i++) {
        const temp = current;
        current = prev + current;
        prev = temp;
    }
    
    return current;
}`,
    },

    testCases: [
      { input: "n = 2", expected: "2", explanation: "1 step + 1 step; 2 steps" },
      { input: "n = 3", expected: "3", explanation: "1+1+1; 1+2; 2+1" },
      { input: "n = 4", expected: "5", explanation: "5 distinct ways to climb" }
    ],

    hints: [
      "Think about how many ways you can reach step n.",
      "You can reach step n from step n-1 or n-2, so ways[n] = ways[n-1] + ways[n-2].",
      "This is the Fibonacci sequence!"
    ],

    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    topicsTried: [],
  },
  {
    id: 8,
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graph",
    topCompanies: ["Google", "Amazon"],
    
    description: "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists. Graph traversal problem using BFS.",

    languages: ["JavaScript", "Python", "Java"],
    defaultLanguage: "JavaScript",

    codeTemplates: {
      JavaScript: `function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]];
    
    while (queue.length) {
        const [word, length] = queue.shift();
        if (word === endWord) return length;
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const newWord = word.substring(0, i) + String.fromCharCode(c) + word.substring(i + 1);
                if (wordSet.has(newWord)) {
                    wordSet.delete(newWord);
                    queue.push([newWord, length + 1]);
                }
            }
        }
    }
    
    return 0;
}`,
    },

    testCases: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', expected: "5", explanation: "hit -> hot -> dot -> dog -> cog" }
    ],

    hints: [
      "Use BFS to find the shortest path.",
      "Transform each word by changing one letter at a time."
    ],

    timeComplexity: "O(n * l * 26)",
    spaceComplexity: "O(n)",
    topicsTried: [],
  },
  {
    id: 9,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    topCompanies: ["Meta", "Microsoft"],
    
    description: "There is an integer array nums sorted in ascending order (with distinct values), then rotated between 1 and n times. Given the rotated array nums and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",

    languages: ["JavaScript", "Python", "Java"],
    defaultLanguage: "JavaScript",

    codeTemplates: {
      JavaScript: `function search(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}`,
    },

    testCases: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", expected: "4", explanation: "Target found at index 4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", expected: "-1", explanation: "Target not found" }
    ],

    hints: [
      "Determine which half of the array is sorted.",
      "Check if the target is in the sorted half.",
      "Narrow down the search space using binary search."
    ],

    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    topicsTried: [],
  },
  {
    id: 10,
    title: "Maximum Subarray",
    difficulty: "Easy",
    category: "DP",
    topCompanies: ["Google", "Amazon"],
    
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. (Kadane's Algorithm)",

    languages: ["JavaScript", "Python", "Java"],
    defaultLanguage: "JavaScript",

    codeTemplates: {
      JavaScript: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
    },

    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expected: "6", explanation: "Subarray [4,-1,2,1] has the largest sum 6" },
      { input: "nums = [5,4,-1,7,8]", expected: "23", explanation: "Entire array gives maximum sum" },
      { input: "nums = [-1]", expected: "-1", explanation: "Single element" }
    ],

    hints: [
      "Keep track of the maximum sum ending at the current position.",
      "At each position, decide whether to start a new subarray or extend the existing one.",
      "This is Kadane's algorithm for maximum subarray problem."
    ],

    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    topicsTried: [],
  },
];

export default problems;
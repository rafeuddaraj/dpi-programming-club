// Mock Users
export const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
  },
];

// Mock Quizzes
export const quizzes = [
  {
    id: "1",
    name: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    totalMarks: 100,
    duration: 15, // 15 minutes
    isActive: true,
    startTime: new Date(Date.now() - 86400000), // 1 day ago
    endTime: new Date(Date.now() + 86400000 * 7), // 7 days from now
    createdAt: new Date(Date.now() - 86400000 * 10),
    updatedAt: new Date(Date.now() - 86400000 * 10),
  },
  {
    id: "2",
    name: "React Essentials",
    description: "Test your understanding of React core concepts",
    totalMarks: 100,
    duration: 20, // 20 minutes
    isActive: true,
    startTime: new Date(Date.now() - 86400000 * 2), // 2 days ago
    endTime: new Date(Date.now() + 86400000 * 5), // 5 days from now
    createdAt: new Date(Date.now() - 86400000 * 15),
    updatedAt: new Date(Date.now() - 86400000 * 12),
  },
  {
    id: "3",
    name: "CSS Mastery",
    description: "Advanced CSS concepts and techniques",
    totalMarks: 50,
    duration: 10, // 10 minutes
    isActive: false,
    startTime: new Date(Date.now() + 86400000 * 2), // 2 days from now
    endTime: new Date(Date.now() + 86400000 * 9), // 9 days from now
    createdAt: new Date(Date.now() - 86400000 * 5),
    updatedAt: new Date(Date.now() - 86400000 * 5),
  },
];

// Mock Quiz Questions
export const quizQuestions = [
  // JavaScript Fundamentals Quiz Questions
  {
    id: "101",
    quizId: "1",
    question: "What is the output of: console.log(typeof [])?",
    options: ["array", "object", "undefined", "null"],
    isActive: true,
    correctIndex: 1, // "object"
    marks: 10,
  },
  {
    id: "102",
    quizId: "1",
    question: "Which method is used to add elements to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    isActive: true,
    correctIndex: 0, // "push()"
    marks: 10,
  },
  {
    id: "103",
    quizId: "1",
    question: "What does the '===' operator do?",
    options: [
      "Compares values only",
      "Compares types only",
      "Compares both values and types",
      "None of the above",
    ],
    isActive: true,
    correctIndex: 2, // "Compares both values and types"
    marks: 10,
  },
  {
    id: "104",
    quizId: "1",
    question: "Which function is used to parse a string to an integer?",
    options: [
      "Integer.parse()",
      "parseInteger()",
      "parseInt()",
      "Number.parseInt()",
    ],
    isActive: true,
    correctIndex: 2, // "parseInt()"
    marks: 10,
  },
  {
    id: "105",
    quizId: "1",
    question: "What is a closure in JavaScript?",
    options: [
      "A function that has access to variables in its outer scope",
      "A way to close a browser window",
      "A method to end a loop",
      "A data structure for storing key-value pairs",
    ],
    isActive: true,
    correctIndex: 0, // "A function that has access to variables in its outer scope"
    marks: 10,
  },

  // React Essentials Quiz Questions
  {
    id: "201",
    quizId: "2",
    question: "What is JSX?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JavaScript Extension",
      "JavaScript Extra",
    ],
    isActive: true,
    correctIndex: 0, // "JavaScript XML"
    marks: 10,
  },
  {
    id: "202",
    quizId: "2",
    question: "What hook is used to manage state in functional components?",
    options: ["useEffect()", "useState()", "useContext()", "useReducer()"],
    isActive: true,
    correctIndex: 1, // "useState()"
    marks: 10,
  },
  {
    id: "203",
    quizId: "2",
    question: "What is the virtual DOM?",
    options: [
      "A direct copy of the real DOM",
      "A lightweight copy of the real DOM in memory",
      "A DOM that only exists virtually",
      "A DOM that is visible to users",
    ],
    isActive: true,
    correctIndex: 1, // "A lightweight copy of the real DOM in memory"
    marks: 10,
  },
  {
    id: "204",
    quizId: "2",
    question: "Which lifecycle method is called after a component renders?",
    options: [
      "componentDidMount",
      "componentWillMount",
      "componentDidUpdate",
      "render",
    ],
    isActive: true,
    correctIndex: 0, // "componentDidMount"
    marks: 10,
  },
  {
    id: "205",
    quizId: "2",
    question: "What is the purpose of keys in React lists?",
    options: [
      "To style list items",
      "To help React identify which items have changed",
      "To create unique IDs for database",
      "To encrypt data in the list",
    ],
    isActive: true,
    correctIndex: 1, // "To help React identify which items have changed"
    marks: 10,
  },

  // CSS Mastery Quiz Questions
  {
    id: "301",
    quizId: "3",
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    isActive: true,
    correctIndex: 0, // "Cascading Style Sheets"
    marks: 10,
  },
  {
    id: "302",
    quizId: "3",
    question: "Which property is used to change the background color?",
    options: ["color", "bgcolor", "background-color", "background"],
    isActive: true,
    correctIndex: 2, // "background-color"
    marks: 10,
  },
  {
    id: "303",
    quizId: "3",
    question:
      "What is the correct CSS syntax for making all the <p> elements bold?",
    options: [
      "p {font-weight: bold;}",
      "p {text-size: bold;}",
      "<p style='font-size: bold'>",
      "p {font: bold;}",
    ],
    isActive: true,
    correctIndex: 0, // "p {font-weight: bold;}"
    marks: 10,
  },
  {
    id: "304",
    quizId: "3",
    question: "Which CSS property controls the text size?",
    options: ["text-size", "font-style", "font-size", "text-style"],
    isActive: true,
    correctIndex: 2, // "font-size"
    marks: 10,
  },
  {
    id: "305",
    quizId: "3",
    question: "What is the purpose of media queries?",
    options: [
      "To query databases from CSS",
      "To create responsive designs for different screen sizes",
      "To import media files into CSS",
      "To connect CSS with JavaScript",
    ],
    isActive: true,
    correctIndex: 1, // "To create responsive designs for different screen sizes"
    marks: 10,
  },
];

// Mock Quiz Results
export const quizResults = [
  {
    id: "1001",
    quizId: "1",
    userId: "1",
    score: 80,
    completedAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(Date.now() - 86400000 * 3),
  },
  {
    id: "1002",
    quizId: "2",
    userId: "1",
    score: 70,
    completedAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
    createdAt: new Date(Date.now() - 86400000 * 1),
    updatedAt: new Date(Date.now() - 86400000 * 1),
  },
  {
    id: "1003",
    quizId: "1",
    userId: "2",
    score: 90,
    completedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(Date.now() - 86400000 * 2),
  },
];

// Mock Quiz Links
export const quizLinks = [
  {
    id: "10001",
    quizId: "1",
    type: "Course",
    relatedId: "course-101",
  },
  {
    id: "10002",
    quizId: "2",
    type: "Workshop",
    relatedId: "workshop-202",
  },
  {
    id: "10003",
    quizId: "3",
    type: "Event",
    relatedId: "event-303",
  },
];

// Helper functions to simulate database operations

// Get all quizzes
export function getAllQuizzes() {
  return [...quizzes];
}

// Get active quizzes
export function getActiveQuizzes() {
  const now = new Date();
  return quizzes.filter(
    (quiz) => quiz.isActive && quiz.startTime <= now && quiz.endTime >= now
  );
}

// Get quiz by ID
export function getQuizById(id) {
  return quizzes.find((quiz) => quiz.id === id);
}

// Get questions for a quiz
export function getQuestionsByQuizId(quizId) {
  return quizQuestions.filter((question) => question.quizId === quizId);
}

// Get results for a user
export function getResultsByUserId(userId) {
  return quizResults.filter((result) => result.userId === userId);
}

// Get result for a specific quiz and user
export function getQuizResultForUser(quizId, userId) {
  return quizResults.find(
    (result) => result.quizId === quizId && result.userId === userId
  );
}

// Get user by ID
export function getUserById(id) {
  return users.find((user) => user.id === id);
}

// Create a new quiz (simulated)
export function createQuiz(quiz) {
  const newQuiz = {
    ...quiz,
    id: `quiz-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  quizzes.push(newQuiz);
  return newQuiz;
}

// Update a quiz (simulated)
export function updateQuiz(id, updates) {
  const index = quizzes.findIndex((quiz) => quiz.id === id);
  if (index === -1) return undefined;

  quizzes[index] = {
    ...quizzes[index],
    ...updates,
    updatedAt: new Date(),
  };

  return quizzes[index];
}

// Delete a quiz (simulated)
export function deleteQuiz(id) {
  const initialLength = quizzes.length;
  const filteredQuizzes = quizzes.filter((quiz) => quiz.id !== id);
  quizzes.length = 0;
  quizzes.push(...filteredQuizzes);
  return quizzes.length < initialLength;
}

// Create a quiz question (simulated)
export function createQuizQuestion(question) {
  const newQuestion = {
    ...question,
    id: `question-${Date.now()}`,
  };
  quizQuestions.push(newQuestion);
  return newQuestion;
}

// Update a quiz question (simulated)
export function updateQuizQuestion(id, updates) {
  const index = quizQuestions.findIndex((question) => question.id === id);
  if (index === -1) return undefined;

  quizQuestions[index] = {
    ...quizQuestions[index],
    ...updates,
  };

  return quizQuestions[index];
}

// Delete a quiz question (simulated)
export function deleteQuizQuestion(id) {
  const initialLength = quizQuestions.length;
  const filteredQuestions = quizQuestions.filter(
    (question) => question.id !== id
  );
  quizQuestions.length = 0;
  quizQuestions.push(...filteredQuestions);
  return quizQuestions.length < initialLength;
}

// Create a quiz result (simulated)
export function createQuizResult(result) {
  const newResult = {
    ...result,
    id: `result-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  quizResults.push(newResult);
  return newResult;
}

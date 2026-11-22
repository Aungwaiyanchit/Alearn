export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Category {
  id: string;
  slug: string;
  name: string;
  burmeseName: string;
  description: string;
  icon: string;
  accentColor: string;
  isRandom: boolean;
  questionCount: number;
  completedCount: number;
  createdAt: string;
}

export interface LessonQuestion {
  id: string;
  categoryId: string;
  categoryName?: string;
  burmesePrompt: string;
  englishAnswer: string;
  acceptedAnswers: string[];
  hint: string;
  grammarNote: string;
  difficulty: Difficulty;
}

export type WordMatchStatus = "correct" | "incorrect" | "missing" | "extra";

export interface WordDiffToken {
  word: string;
  expected?: string;
  status: WordMatchStatus;
}

export interface EvaluationResult {
  isCorrect: boolean;
  accuracy: number;
  matchedTarget: string;
  wordTokens: WordDiffToken[];
  feedbackMessage: string;
}

export interface SessionResultItem {
  question: LessonQuestion;
  userAnswer: string;
  evaluation: EvaluationResult;
}

export interface PracticeStats {
  totalAttempts: number;
  correctAttempts: number;
  averageAccuracy: number;
  masteredCount: number;
  totalQuestions: number;
}

export interface CreateRandomCategoryInput {
  name: string;
  count: number;
  difficulty: Difficulty | "all";
}

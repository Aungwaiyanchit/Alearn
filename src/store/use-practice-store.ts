"use client";

import { create } from "zustand";
import { evaluateAnswer } from "@/lib/answer-evaluator";
import { useProgressStore } from "@/store/use-progress-store";
import type {
  Category,
  CreateRandomCategoryInput,
  EvaluationResult,
  LessonQuestion,
  PracticeStats,
  SessionResultItem,
} from "@/types/practice";

interface PracticeState {
  categories: Category[];
  selectedCategoryId: string;
  questions: LessonQuestion[];
  currentIndex: number;
  typedAnswer: string;
  keystrokePulse: number;
  shakeCount: number;
  celebrationCount: number;
  showHint: boolean;
  evaluation: EvaluationResult | null;
  streak: number;
  bestStreak: number;
  sessionResults: SessionResultItem[];
  isSessionComplete: boolean;
  stats: PracticeStats;
  isLoadingQuestions: boolean;
  isCreatingRandom: boolean;
  isRandomModalOpen: boolean;
  error: string | null;

  hydrateInitial: (params: {
    categories: Category[];
    questions: LessonQuestion[];
    stats: PracticeStats;
    selectedCategoryId: string;
  }) => void;
  selectCategory: (
    categoryId: string,
    options?: { shuffle?: boolean; count?: number },
  ) => Promise<void>;
  setTypedAnswer: (value: string) => void;
  toggleHint: () => void;
  submitAnswer: () => Promise<void>;
  retryCurrent: () => void;
  nextQuestion: () => void;
  restartSession: (shuffle?: boolean) => Promise<void>;
  openRandomModal: () => void;
  closeRandomModal: () => void;
  createRandomCategory: (input: CreateRandomCategoryInput) => Promise<void>;
  deleteRandomCategory: (categoryId: string) => Promise<void>;
}

const DEFAULT_STATS: PracticeStats = {
  totalAttempts: 0,
  correctAttempts: 0,
  averageAccuracy: 0,
  masteredCount: 0,
  totalQuestions: 0,
};

export const usePracticeStore = create<PracticeState>((set, get) => ({
  categories: [],
  selectedCategoryId: "cat-daily",
  questions: [],
  currentIndex: 0,
  typedAnswer: "",
  keystrokePulse: 0,
  shakeCount: 0,
  celebrationCount: 0,
  showHint: false,
  evaluation: null,
  streak: 0,
  bestStreak: 0,
  sessionResults: [],
  isSessionComplete: false,
  stats: DEFAULT_STATS,
  isLoadingQuestions: false,
  isCreatingRandom: false,
  isRandomModalOpen: false,
  error: null,

  hydrateInitial: ({ categories, questions, stats, selectedCategoryId }) => {
    set({
      categories,
      questions,
      stats,
      selectedCategoryId,
      currentIndex: 0,
      typedAnswer: "",
      showHint: false,
      evaluation: null,
      sessionResults: [],
      isSessionComplete: false,
      error: null,
    });
  },

  selectCategory: async (categoryId, options) => {
    set({
      selectedCategoryId: categoryId,
      isLoadingQuestions: true,
      error: null,
      typedAnswer: "",
      showHint: false,
      evaluation: null,
      currentIndex: 0,
      sessionResults: [],
      isSessionComplete: false,
    });

    try {
      const params = new URLSearchParams({ categoryId });
      if (options?.shuffle) {
        params.set("shuffle", "true");
      }
      if (options?.count) {
        params.set("count", String(options.count));
      }

      const response = await fetch(`/api/lessons?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Could not load practice lessons");
      }

      const data = (await response.json()) as { questions: LessonQuestion[] };
      set({
        questions: data.questions,
        isLoadingQuestions: false,
      });
    } catch (err) {
      set({
        isLoadingQuestions: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load practice lessons",
      });
    }
  },

  setTypedAnswer: (value) => {
    set((state) => ({
      typedAnswer: value,
      keystrokePulse: state.keystrokePulse + 1,
    }));
  },

  toggleHint: () => {
    set((state) => ({ showHint: !state.showHint }));
  },

  submitAnswer: async () => {
    const state = get();
    const currentQuestion = state.questions[state.currentIndex];
    if (!currentQuestion || !state.typedAnswer.trim() || state.evaluation) {
      return;
    }

    const evaluation = evaluateAnswer(
      state.typedAnswer,
      currentQuestion.englishAnswer,
      currentQuestion.acceptedAnswers,
    );

    const nextStreak = evaluation.isCorrect ? state.streak + 1 : 0;
    const nextBestStreak = Math.max(state.bestStreak, nextStreak);

    const existingResultIndex = state.sessionResults.findIndex(
      (item) => item.question.id === currentQuestion.id,
    );
    const updatedResults = [...state.sessionResults];
    const entry: SessionResultItem = {
      question: currentQuestion,
      userAnswer: state.typedAnswer.trim(),
      evaluation,
    };

    if (existingResultIndex >= 0) {
      updatedResults[existingResultIndex] = entry;
    } else {
      updatedResults.push(entry);
    }

    set({
      evaluation,
      streak: nextStreak,
      bestStreak: nextBestStreak,
      sessionResults: updatedResults,
      celebrationCount: evaluation.isCorrect
        ? state.celebrationCount + 1
        : state.celebrationCount,
      shakeCount: evaluation.isCorrect
        ? state.shakeCount
        : state.shakeCount + 1,
    });

    // Persist personal mastered score & accuracy in browser localStorage
    useProgressStore.getState().recordAttempt({
      questionId: currentQuestion.id,
      isCorrect: evaluation.isCorrect,
      accuracy: evaluation.accuracy,
      currentStreak: nextStreak,
    });
  },

  retryCurrent: () => {
    set({
      typedAnswer: "",
      evaluation: null,
    });
  },

  nextQuestion: () => {
    const state = get();
    const isLast = state.currentIndex >= state.questions.length - 1;

    if (isLast) {
      set({
        isSessionComplete: true,
        celebrationCount: state.celebrationCount + 1,
      });
      return;
    }

    set({
      currentIndex: state.currentIndex + 1,
      typedAnswer: "",
      showHint: false,
      evaluation: null,
    });
  },

  restartSession: async (shuffle = false) => {
    const { selectedCategoryId, selectCategory } = get();
    await selectCategory(selectedCategoryId, { shuffle });
  },

  openRandomModal: () => set({ isRandomModalOpen: true, error: null }),
  closeRandomModal: () => set({ isRandomModalOpen: false }),

  createRandomCategory: async (input) => {
    set({ isCreatingRandom: true, error: null });
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Could not create random category");
      }

      const data = (await response.json()) as {
        category: Category;
        categories: Category[];
      };

      set({
        categories: data.categories,
        isCreatingRandom: false,
        isRandomModalOpen: false,
      });

      await get().selectCategory(data.category.id);
    } catch (err) {
      set({
        isCreatingRandom: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to create random category",
      });
    }
  },

  deleteRandomCategory: async (categoryId) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete custom category");
      }

      const data = (await response.json()) as {
        categories: Category[];
      };

      const wasSelected = get().selectedCategoryId === categoryId;
      set({ categories: data.categories });

      if (wasSelected) {
        const fallbackId = data.categories[0]?.id ?? "random-mix";
        await get().selectCategory(fallbackId);
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to delete category",
      });
    }
  },
}));

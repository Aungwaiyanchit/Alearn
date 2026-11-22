"use client";

import { create } from "zustand";
import type {
  CategoryMutationInput,
  QuestionMutationInput,
} from "@/types/admin";
import type {
  Category,
  Difficulty,
  LessonQuestion,
  PracticeStats,
} from "@/types/practice";

export type AdminTab = "questions" | "categories";

export interface AdminNotice {
  id: number;
  type: "success" | "error";
  message: string;
}

interface AdminState {
  categories: Category[];
  questions: LessonQuestion[];
  stats: PracticeStats;
  databasePath: string;
  activeTab: AdminTab;
  searchQuery: string;
  filterCategoryId: string;
  filterDifficulty: Difficulty | "all";
  questionPage: number;
  questionPageSize: number;
  categoryPage: number;
  categoryPageSize: number;
  isSaving: boolean;
  notice: AdminNotice | null;

  // Modals
  isCategoryModalOpen: boolean;
  editingCategory: Category | null;
  isQuestionModalOpen: boolean;
  editingQuestion: LessonQuestion | null;

  hydrateInitial: (params: {
    categories: Category[];
    questions: LessonQuestion[];
    stats: PracticeStats;
    databasePath: string;
  }) => void;
  setActiveTab: (tab: AdminTab) => void;
  setSearchQuery: (query: string) => void;
  setFilterCategoryId: (categoryId: string) => void;
  setFilterDifficulty: (difficulty: Difficulty | "all") => void;
  setQuestionPage: (page: number) => void;
  setQuestionPageSize: (pageSize: number) => void;
  setCategoryPage: (page: number) => void;
  setCategoryPageSize: (pageSize: number) => void;
  clearNotice: () => void;

  openCreateCategoryModal: () => void;
  openEditCategoryModal: (category: Category) => void;
  closeCategoryModal: () => void;

  openCreateQuestionModal: () => void;
  openEditQuestionModal: (question: LessonQuestion) => void;
  closeQuestionModal: () => void;

  saveCategory: (input: CategoryMutationInput) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  saveQuestion: (input: QuestionMutationInput) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  resetProgress: () => Promise<void>;
}

const DEFAULT_STATS: PracticeStats = {
  totalAttempts: 0,
  correctAttempts: 0,
  averageAccuracy: 0,
  masteredCount: 0,
  totalQuestions: 0,
};

export const useAdminStore = create<AdminState>((set, get) => ({
  categories: [],
  questions: [],
  stats: DEFAULT_STATS,
  databasePath: "",
  activeTab: "questions",
  searchQuery: "",
  filterCategoryId: "all",
  filterDifficulty: "all",
  questionPage: 1,
  questionPageSize: 10,
  categoryPage: 1,
  categoryPageSize: 6,
  isSaving: false,
  notice: null,

  isCategoryModalOpen: false,
  editingCategory: null,
  isQuestionModalOpen: false,
  editingQuestion: null,

  hydrateInitial: ({ categories, questions, stats, databasePath }) => {
    set({ categories, questions, stats, databasePath });
  },

  setActiveTab: (activeTab) => set({ activeTab }),
  setSearchQuery: (searchQuery) => set({ searchQuery, questionPage: 1 }),
  setFilterCategoryId: (filterCategoryId) =>
    set({ filterCategoryId, questionPage: 1 }),
  setFilterDifficulty: (filterDifficulty) =>
    set({ filterDifficulty, questionPage: 1 }),
  setQuestionPage: (questionPage) => set({ questionPage }),
  setQuestionPageSize: (questionPageSize) =>
    set({ questionPageSize, questionPage: 1 }),
  setCategoryPage: (categoryPage) => set({ categoryPage }),
  setCategoryPageSize: (categoryPageSize) =>
    set({ categoryPageSize, categoryPage: 1 }),
  clearNotice: () => set({ notice: null }),

  openCreateCategoryModal: () =>
    set({ isCategoryModalOpen: true, editingCategory: null }),
  openEditCategoryModal: (category) =>
    set({ isCategoryModalOpen: true, editingCategory: category }),
  closeCategoryModal: () =>
    set({ isCategoryModalOpen: false, editingCategory: null }),

  openCreateQuestionModal: () =>
    set({ isQuestionModalOpen: true, editingQuestion: null }),
  openEditQuestionModal: (question) =>
    set({ isQuestionModalOpen: true, editingQuestion: question }),
  closeQuestionModal: () =>
    set({ isQuestionModalOpen: false, editingQuestion: null }),

  saveCategory: async (input) => {
    const editing = get().editingCategory;
    set({ isSaving: true });

    try {
      const endpoint = editing
        ? `/api/admin/categories/${editing.id}`
        : "/api/admin/categories";
      const method = editing ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const payload = (await response.json()) as {
        error?: string;
        categories?: Category[];
        questions?: LessonQuestion[];
        stats?: PracticeStats;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to save category");
      }

      set((state) => ({
        categories: payload.categories ?? state.categories,
        questions: payload.questions ?? state.questions,
        stats: payload.stats ?? state.stats,
        isSaving: false,
        isCategoryModalOpen: false,
        editingCategory: null,
        notice: {
          id: Date.now(),
          type: "success",
          message: editing
            ? `Updated category "${input.name}"`
            : `Created category "${input.name}"`,
        },
      }));
    } catch (error) {
      set({
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "error",
          message:
            error instanceof Error ? error.message : "Failed to save category",
        },
      });
    }
  },

  deleteCategory: async (id) => {
    set({ isSaving: true });
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      const payload = (await response.json()) as {
        error?: string;
        categories?: Category[];
        questions?: LessonQuestion[];
        stats?: PracticeStats;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to delete category");
      }

      set((state) => ({
        categories: payload.categories ?? state.categories,
        questions: payload.questions ?? state.questions,
        stats: payload.stats ?? state.stats,
        filterCategoryId:
          state.filterCategoryId === id ? "all" : state.filterCategoryId,
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "success",
          message: "Category deleted from SQLite",
        },
      }));
    } catch (error) {
      set({
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Failed to delete category",
        },
      });
    }
  },

  saveQuestion: async (input) => {
    const editing = get().editingQuestion;
    set({ isSaving: true });

    try {
      const endpoint = editing
        ? `/api/admin/questions/${editing.id}`
        : "/api/admin/questions";
      const method = editing ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const payload = (await response.json()) as {
        error?: string;
        categories?: Category[];
        questions?: LessonQuestion[];
        stats?: PracticeStats;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to save question");
      }

      set((state) => ({
        categories: payload.categories ?? state.categories,
        questions: payload.questions ?? state.questions,
        stats: payload.stats ?? state.stats,
        isSaving: false,
        isQuestionModalOpen: false,
        editingQuestion: null,
        notice: {
          id: Date.now(),
          type: "success",
          message: editing ? "Question updated" : "New question added",
        },
      }));
    } catch (error) {
      set({
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "error",
          message:
            error instanceof Error ? error.message : "Failed to save question",
        },
      });
    }
  },

  deleteQuestion: async (id) => {
    set({ isSaving: true });
    try {
      const response = await fetch(`/api/admin/questions/${id}`, {
        method: "DELETE",
      });

      const payload = (await response.json()) as {
        error?: string;
        categories?: Category[];
        questions?: LessonQuestion[];
        stats?: PracticeStats;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to delete question");
      }

      set((state) => ({
        categories: payload.categories ?? state.categories,
        questions: payload.questions ?? state.questions,
        stats: payload.stats ?? state.stats,
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "success",
          message: "Question deleted",
        },
      }));
    } catch (error) {
      set({
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Failed to delete question",
        },
      });
    }
  },

  resetProgress: async () => {
    set({ isSaving: true });
    try {
      const response = await fetch("/api/admin/attempts", {
        method: "DELETE",
      });

      const payload = (await response.json()) as {
        error?: string;
        clearedCount?: number;
        categories?: Category[];
        stats?: PracticeStats;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to reset progress");
      }

      set((state) => ({
        categories: payload.categories ?? state.categories,
        stats: payload.stats ?? state.stats,
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "success",
          message: `Cleared ${payload.clearedCount ?? 0} saved practice attempts`,
        },
      }));
    } catch (error) {
      set({
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "error",
          message:
            error instanceof Error ? error.message : "Failed to reset progress",
        },
      });
    }
  },
}));

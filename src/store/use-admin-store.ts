"use client";

import { create } from "zustand";
import type {
  CategoryMutationInput,
  GuideLessonMutationInput,
  QuestionMutationInput,
} from "@/types/admin";
import type { LessonTrack, TenseLesson, WritingTip } from "@/types/guide";
import type {
  Category,
  Difficulty,
  LessonQuestion,
  PracticeStats,
} from "@/types/practice";

export type AdminTab = "questions" | "categories" | "guide";

export interface AdminNotice {
  id: number;
  type: "success" | "error";
  message: string;
}

interface AdminState {
  categories: Category[];
  questions: LessonQuestion[];
  guideLessons: TenseLesson[];
  guideTips: WritingTip[];
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
  guideSearchQuery: string;
  guideTrackFilter: LessonTrack;
  guidePage: number;
  guidePageSize: number;
  isSaving: boolean;
  notice: AdminNotice | null;

  // Modals
  isCategoryModalOpen: boolean;
  editingCategory: Category | null;
  isQuestionModalOpen: boolean;
  editingQuestion: LessonQuestion | null;
  isGuideModalOpen: boolean;
  editingGuideLesson: TenseLesson | null;
  isBulkImportModalOpen: boolean;
  isDestroyModalOpen: boolean;

  hydrateInitial: (params: {
    categories: Category[];
    questions: LessonQuestion[];
    guideLessons: TenseLesson[];
    guideTips: WritingTip[];
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
  setGuideSearchQuery: (query: string) => void;
  setGuideTrackFilter: (track: LessonTrack) => void;
  setGuidePage: (page: number) => void;
  setGuidePageSize: (pageSize: number) => void;
  clearNotice: () => void;

  openCreateCategoryModal: () => void;
  openEditCategoryModal: (category: Category) => void;
  closeCategoryModal: () => void;

  openCreateQuestionModal: () => void;
  openEditQuestionModal: (question: LessonQuestion) => void;
  closeQuestionModal: () => void;

  openCreateGuideModal: () => void;
  openEditGuideModal: (lesson: TenseLesson) => void;
  closeGuideModal: () => void;

  openBulkImportModal: () => void;
  closeBulkImportModal: () => void;
  openDestroyModal: () => void;
  closeDestroyModal: () => void;

  saveCategory: (input: CategoryMutationInput) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  saveQuestion: (input: QuestionMutationInput) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  saveGuideLesson: (input: GuideLessonMutationInput) => Promise<void>;
  deleteGuideLesson: (id: string) => Promise<void>;
  bulkImportCsv: (csvText: string) => Promise<boolean>;
  resetProgress: () => Promise<void>;
  destroyEverything: (confirmation: string) => Promise<boolean>;
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
  guideLessons: [],
  guideTips: [],
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
  guideSearchQuery: "",
  guideTrackFilter: "all",
  guidePage: 1,
  guidePageSize: 10,
  isSaving: false,
  notice: null,

  isCategoryModalOpen: false,
  editingCategory: null,
  isQuestionModalOpen: false,
  editingQuestion: null,
  isGuideModalOpen: false,
  editingGuideLesson: null,
  isBulkImportModalOpen: false,
  isDestroyModalOpen: false,

  hydrateInitial: ({
    categories,
    questions,
    guideLessons,
    guideTips,
    stats,
    databasePath,
  }) => {
    set({
      categories,
      questions,
      guideLessons,
      guideTips,
      stats,
      databasePath,
    });
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
  setGuideSearchQuery: (guideSearchQuery) =>
    set({ guideSearchQuery, guidePage: 1 }),
  setGuideTrackFilter: (guideTrackFilter) =>
    set({ guideTrackFilter, guidePage: 1 }),
  setGuidePage: (guidePage) => set({ guidePage }),
  setGuidePageSize: (guidePageSize) => set({ guidePageSize, guidePage: 1 }),
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

  openCreateGuideModal: () =>
    set({ isGuideModalOpen: true, editingGuideLesson: null }),
  openEditGuideModal: (lesson) =>
    set({ isGuideModalOpen: true, editingGuideLesson: lesson }),
  closeGuideModal: () =>
    set({ isGuideModalOpen: false, editingGuideLesson: null }),

  openBulkImportModal: () => set({ isBulkImportModalOpen: true }),
  closeBulkImportModal: () => set({ isBulkImportModalOpen: false }),
  openDestroyModal: () => set({ isDestroyModalOpen: true }),
  closeDestroyModal: () => set({ isDestroyModalOpen: false }),

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

  bulkImportCsv: async (csvText) => {
    set({ isSaving: true });
    try {
      const response = await fetch("/api/admin/questions/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvText }),
      });

      const payload = (await response.json()) as {
        error?: string;
        summary?: { insertedQuestions: number; createdCategories: number };
        categories?: Category[];
        questions?: LessonQuestion[];
        stats?: PracticeStats;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Bulk CSV import failed");
      }

      const inserted = payload.summary?.insertedQuestions ?? 0;
      const createdCats = payload.summary?.createdCategories ?? 0;
      const categorySuffix =
        createdCats > 0
          ? ` and created ${createdCats} new ${createdCats === 1 ? "category" : "categories"}`
          : "";

      set((state) => ({
        categories: payload.categories ?? state.categories,
        questions: payload.questions ?? state.questions,
        stats: payload.stats ?? state.stats,
        questionPage: 1,
        isSaving: false,
        isBulkImportModalOpen: false,
        notice: {
          id: Date.now(),
          type: "success",
          message: `Imported ${inserted} ${inserted === 1 ? "question" : "questions"}${categorySuffix}`,
        },
      }));

      return true;
    } catch (error) {
      set({
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "error",
          message:
            error instanceof Error ? error.message : "Bulk CSV import failed",
        },
      });
      return false;
    }
  },

  saveGuideLesson: async (input) => {
    const editing = get().editingGuideLesson;
    set({ isSaving: true });

    try {
      const endpoint = editing
        ? `/api/admin/guide-lessons/${editing.id}`
        : "/api/admin/guide-lessons";
      const method = editing ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const payload = (await response.json()) as {
        error?: string;
        guideLessons?: TenseLesson[];
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to save guide lesson");
      }

      set((state) => ({
        guideLessons: payload.guideLessons ?? state.guideLessons,
        isSaving: false,
        isGuideModalOpen: false,
        editingGuideLesson: null,
        notice: {
          id: Date.now(),
          type: "success",
          message: editing
            ? `Updated lesson "${input.title}"`
            : `Added lesson "${input.title}"`,
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
              : "Failed to save guide lesson",
        },
      });
    }
  },

  deleteGuideLesson: async (id) => {
    set({ isSaving: true });
    try {
      const response = await fetch(`/api/admin/guide-lessons/${id}`, {
        method: "DELETE",
      });

      const payload = (await response.json()) as {
        error?: string;
        guideLessons?: TenseLesson[];
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to delete guide lesson");
      }

      set((state) => ({
        guideLessons: payload.guideLessons ?? state.guideLessons,
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "success",
          message: "Guide lesson deleted",
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
              : "Failed to delete guide lesson",
        },
      });
    }
  },

  destroyEverything: async (confirmation) => {
    set({ isSaving: true });
    try {
      const response = await fetch("/api/admin/destroy", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation }),
      });

      const payload = (await response.json()) as {
        error?: string;
        deleted?: {
          deletedCategories: number;
          deletedQuestions: number;
          deletedAttempts: number;
          deletedGuideLessons?: number;
        };
        categories?: Category[];
        questions?: LessonQuestion[];
        guideLessons?: TenseLesson[];
        stats?: PracticeStats;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to destroy data");
      }

      const deleted = payload.deleted;
      set({
        categories: payload.categories ?? [],
        questions: payload.questions ?? [],
        guideLessons: payload.guideLessons ?? [],
        stats: payload.stats ?? DEFAULT_STATS,
        filterCategoryId: "all",
        filterDifficulty: "all",
        searchQuery: "",
        guideSearchQuery: "",
        guideTrackFilter: "all",
        questionPage: 1,
        categoryPage: 1,
        guidePage: 1,
        isSaving: false,
        isDestroyModalOpen: false,
        notice: {
          id: Date.now(),
          type: "success",
          message: deleted
            ? `Destroyed ${deleted.deletedCategories} categories, ${deleted.deletedQuestions} questions, ${deleted.deletedGuideLessons ?? 0} guide lessons, and ${deleted.deletedAttempts} attempts`
            : "Destroyed all local database records",
        },
      });

      return true;
    } catch (error) {
      set({
        isSaving: false,
        notice: {
          id: Date.now(),
          type: "error",
          message:
            error instanceof Error ? error.message : "Failed to destroy data",
        },
      });
      return false;
    }
  },
}));

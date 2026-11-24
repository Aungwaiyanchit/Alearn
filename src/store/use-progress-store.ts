"use client";

import { create } from "zustand";
import {
  applyAttemptToProgress,
  clearLocalProgress,
  EMPTY_LOCAL_PROGRESS,
  type LocalProgressData,
  readLocalProgress,
  writeLocalProgress,
} from "@/lib/local-progress";

interface ProgressState {
  progress: LocalProgressData;
  isHydrated: boolean;

  hydrateFromStorage: () => void;
  recordAttempt: (params: {
    questionId: string;
    isCorrect: boolean;
    accuracy: number;
    currentStreak?: number;
  }) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: { ...EMPTY_LOCAL_PROGRESS, masteredQuestionIds: [] },
  isHydrated: false,

  hydrateFromStorage: () => {
    if (get().isHydrated) {
      return;
    }
    const stored = readLocalProgress();
    set({ progress: stored, isHydrated: true });
  },

  recordAttempt: (params) => {
    const current = get().isHydrated ? get().progress : readLocalProgress();
    const next = applyAttemptToProgress(current, params);
    writeLocalProgress(next);
    set({ progress: next, isHydrated: true });
  },

  resetProgress: () => {
    clearLocalProgress();
    set({
      progress: { ...EMPTY_LOCAL_PROGRESS, masteredQuestionIds: [] },
      isHydrated: true,
    });
  },
}));

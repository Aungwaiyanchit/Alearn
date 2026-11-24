import type { PracticeStats } from "@/types/practice";

export const LOCAL_PROGRESS_STORAGE_KEY = "alearn.progress.v1";

export interface LocalProgressData {
  masteredQuestionIds: string[];
  totalAttempts: number;
  correctAttempts: number;
  accuracySum: number;
  bestStreak: number;
}

export const EMPTY_LOCAL_PROGRESS: LocalProgressData = {
  masteredQuestionIds: [],
  totalAttempts: 0,
  correctAttempts: 0,
  accuracySum: 0,
  bestStreak: 0,
};

interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

function getBrowserStorage(): StorageLike | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readLocalProgress(
  storage: StorageLike | null = getBrowserStorage(),
): LocalProgressData {
  if (!storage) {
    return { ...EMPTY_LOCAL_PROGRESS, masteredQuestionIds: [] };
  }

  try {
    const raw = storage.getItem(LOCAL_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return { ...EMPTY_LOCAL_PROGRESS, masteredQuestionIds: [] };
    }

    const parsed = JSON.parse(raw) as Partial<LocalProgressData>;
    const masteredQuestionIds = Array.isArray(parsed.masteredQuestionIds)
      ? Array.from(
          new Set(
            parsed.masteredQuestionIds.filter(
              (item): item is string =>
                typeof item === "string" && item.length > 0,
            ),
          ),
        )
      : [];

    const totalAttempts =
      typeof parsed.totalAttempts === "number" && parsed.totalAttempts >= 0
        ? Math.floor(parsed.totalAttempts)
        : 0;
    const correctAttempts =
      typeof parsed.correctAttempts === "number" && parsed.correctAttempts >= 0
        ? Math.floor(parsed.correctAttempts)
        : 0;
    const accuracySum =
      typeof parsed.accuracySum === "number" && parsed.accuracySum >= 0
        ? parsed.accuracySum
        : 0;
    const bestStreak =
      typeof parsed.bestStreak === "number" && parsed.bestStreak >= 0
        ? Math.floor(parsed.bestStreak)
        : 0;

    return {
      masteredQuestionIds,
      totalAttempts,
      correctAttempts,
      accuracySum,
      bestStreak,
    };
  } catch {
    return { ...EMPTY_LOCAL_PROGRESS, masteredQuestionIds: [] };
  }
}

export function writeLocalProgress(
  data: LocalProgressData,
  storage: StorageLike | null = getBrowserStorage(),
): void {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(LOCAL_PROGRESS_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota or private-mode write restrictions
  }
}

export function clearLocalProgress(
  storage: StorageLike | null = getBrowserStorage(),
): void {
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(LOCAL_PROGRESS_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function applyAttemptToProgress(
  current: LocalProgressData,
  attempt: {
    questionId: string;
    isCorrect: boolean;
    accuracy: number;
    currentStreak?: number;
  },
): LocalProgressData {
  const clampedAccuracy = Math.min(
    Math.max(Math.round(attempt.accuracy), 0),
    100,
  );
  const masteredSet = new Set(current.masteredQuestionIds);

  if (attempt.isCorrect && attempt.questionId) {
    masteredSet.add(attempt.questionId);
  }

  return {
    masteredQuestionIds: Array.from(masteredSet),
    totalAttempts: current.totalAttempts + 1,
    correctAttempts: current.correctAttempts + (attempt.isCorrect ? 1 : 0),
    accuracySum: current.accuracySum + clampedAccuracy,
    bestStreak: Math.max(current.bestStreak, attempt.currentStreak ?? 0),
  };
}

export function computePracticeStatsFromLocal(
  progress: LocalProgressData,
  totalQuestions: number,
  validQuestionIds?: ReadonlySet<string>,
): PracticeStats {
  const masteredCount = validQuestionIds
    ? progress.masteredQuestionIds.filter((id) => validQuestionIds.has(id))
        .length
    : Math.min(progress.masteredQuestionIds.length, totalQuestions);

  const averageAccuracy =
    progress.totalAttempts > 0
      ? Math.round(progress.accuracySum / progress.totalAttempts)
      : 0;

  return {
    totalAttempts: progress.totalAttempts,
    correctAttempts: progress.correctAttempts,
    averageAccuracy,
    masteredCount,
    totalQuestions,
  };
}

export function countMasteredInCategory(
  categoryQuestionIds: readonly string[] | undefined,
  masteredIds: readonly string[],
): number {
  if (!categoryQuestionIds || categoryQuestionIds.length === 0) {
    return 0;
  }

  const masteredSet = new Set(masteredIds);
  let count = 0;
  for (const id of categoryQuestionIds) {
    if (masteredSet.has(id)) {
      count += 1;
    }
  }
  return count;
}

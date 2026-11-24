import { describe, expect, test } from "bun:test";
import {
  applyAttemptToProgress,
  clearLocalProgress,
  computePracticeStatsFromLocal,
  countMasteredInCategory,
  EMPTY_LOCAL_PROGRESS,
  readLocalProgress,
  writeLocalProgress,
} from "@/lib/local-progress";

function createMemoryStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
  };
}

describe("localStorage mastery progress", () => {
  test("tracks unique mastered question IDs and average accuracy", () => {
    let progress = applyAttemptToProgress(EMPTY_LOCAL_PROGRESS, {
      questionId: "q-daily-1",
      isCorrect: true,
      accuracy: 100,
      currentStreak: 1,
    });

    progress = applyAttemptToProgress(progress, {
      questionId: "q-daily-1",
      isCorrect: true,
      accuracy: 100,
      currentStreak: 2,
    });

    progress = applyAttemptToProgress(progress, {
      questionId: "q-daily-2",
      isCorrect: false,
      accuracy: 50,
      currentStreak: 0,
    });

    expect(progress.masteredQuestionIds).toEqual(["q-daily-1"]);
    expect(progress.totalAttempts).toBe(3);
    expect(progress.correctAttempts).toBe(2);
    expect(progress.bestStreak).toBe(2);

    const stats = computePracticeStatsFromLocal(progress, 36);
    expect(stats.masteredCount).toBe(1);
    expect(stats.averageAccuracy).toBe(83);
    expect(stats.totalQuestions).toBe(36);
  });

  test("persists and clears cleanly from storage", () => {
    const storage = createMemoryStorage();
    const updated = applyAttemptToProgress(EMPTY_LOCAL_PROGRESS, {
      questionId: "q-work-1",
      isCorrect: true,
      accuracy: 96,
      currentStreak: 1,
    });

    writeLocalProgress(updated, storage);
    expect(readLocalProgress(storage)).toEqual(updated);

    clearLocalProgress(storage);
    expect(readLocalProgress(storage)).toEqual(EMPTY_LOCAL_PROGRESS);
  });

  test("counts mastered questions per category accurately", () => {
    const count = countMasteredInCategory(
      ["q-1", "q-2", "q-3"],
      ["q-1", "q-3", "q-99"],
    );
    expect(count).toBe(2);
  });
});

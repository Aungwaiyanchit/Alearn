import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "@/db/client";
import {
  createRandomCategory,
  deleteRandomCategory,
  getQuestionsForCategory,
  listCategories,
} from "@/db/repository";

describe("sqlite repository", () => {
  const originalDbPath = process.env.DATABASE_PATH;
  const tempDbPath = path.join(
    os.tmpdir(),
    `alearn-repo-test-${Date.now()}.sqlite`,
  );

  beforeAll(() => {
    closeDb();
    process.env.DATABASE_PATH = tempDbPath;
  });

  afterAll(() => {
    closeDb();
    if (originalDbPath === undefined) {
      delete process.env.DATABASE_PATH;
    } else {
      process.env.DATABASE_PATH = originalDbPath;
    }
    rmSync(tempDbPath, { force: true });
    rmSync(`${tempDbPath}-wal`, { force: true });
    rmSync(`${tempDbPath}-shm`, { force: true });
  });

  test("seeds default Burmese-to-English categories and questions", () => {
    const categories = listCategories();
    expect(categories.length).toBeGreaterThanOrEqual(6);

    const dailyQuestions = getQuestionsForCategory("cat-daily");
    expect(dailyQuestions.length).toBeGreaterThanOrEqual(6);
    expect(dailyQuestions[0]?.burmesePrompt.length).toBeGreaterThan(0);
    expect(dailyQuestions[0]?.englishAnswer.length).toBeGreaterThan(0);
  });

  test("returns shuffled prompts for instant random-mix mode", () => {
    const randomQuestions = getQuestionsForCategory("random-mix", { count: 8 });
    expect(randomQuestions.length).toBe(8);
  });

  test("creates and deletes a custom persisted random category", () => {
    const created = createRandomCategory({
      name: "Test Random Sprint",
      count: 5,
      difficulty: "beginner",
    });

    expect(created.isRandom).toBe(true);
    expect(created.name).toBe("Test Random Sprint");
    expect(created.questionCount).toBe(5);

    const questions = getQuestionsForCategory(created.id);
    expect(questions.length).toBe(5);

    const deleted = deleteRandomCategory(created.id);
    expect(deleted).toBe(true);
  });
});

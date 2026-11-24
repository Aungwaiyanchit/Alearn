import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { closeDb } from "@/db/client";
import {
  createGuideLesson,
  deleteGuideLessonById,
  listGuideLessons,
  listGuideTips,
  updateGuideLesson,
} from "@/db/guide-repository";

describe("guide sqlite repository", () => {
  const originalDbPath = process.env.DATABASE_PATH;
  const tempDbPath = path.join(
    os.tmpdir(),
    `alearn-guide-test-${Date.now()}.sqlite`,
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

  test("seeds default guide lessons and tips into sqlite", () => {
    const lessons = listGuideLessons();
    const tips = listGuideTips();

    expect(lessons.length).toBeGreaterThanOrEqual(14);
    expect(tips.length).toBeGreaterThanOrEqual(8);
    expect(lessons.some((lesson) => lesson.id === "used-to")).toBe(true);
    expect(lessons.some((lesson) => lesson.id === "be-going-to")).toBe(true);
  });

  test("creates, updates, and deletes a custom guide lesson", () => {
    const created = createGuideLesson({
      title: "would rather (Preferences)",
      burmeseTitle: "ပိုပြီးနှစ်သက်တယ် (would rather)",
      track: "grammar",
      subgroup: "Preferences",
      level: "intermediate",
      summary: "Express a clear preference between two choices.",
      burmeseSummary: "ရွေးချယ်စရာနှစ်ခုထဲမှ ပိုနှစ်သက်ရာကို ဖော်ပြသည်။",
      timelineType: "rule-pattern",
      timelineCaption: "Choice A preferred over Choice B",
      formula: {
        positive: "Subject + would rather + V1 (than V1)",
        negative: "Subject + would rather not + V1",
        question: "Would + Subject + rather + V1 ...?",
      },
      whenToUse: ["Stating preferences politely"],
      signalWords: ["would rather", "than"],
      examples: [
        {
          id: "wr-1",
          burmese: "ကျွန်တော် အိမ်မှာပဲ နေချင်တယ်။",
          english: "I would rather stay at home.",
          highlight: "would rather stay",
          note: "Follow directly with base verb V1.",
        },
      ],
      mistake: {
        wrong: "I would rather to stay home.",
        correct: "I would rather stay home.",
        reason: "Never use 'to' after 'would rather'.",
      },
      cheatSheet: [
        {
          pattern: "would rather + V1",
          english: "I'd rather drink tea.",
          burmese: "လက်ဖက်ရည်ပဲ သောက်ချင်တယ်။",
          usage: "Direct preference",
        },
      ],
      relatedTipIds: ["tip-svo"],
      practiceCategoryId: "cat-daily",
    });

    expect(created.title).toBe("would rather (Preferences)");
    expect(created.examples.length).toBe(1);

    const updated = updateGuideLesson(created.id, {
      ...created,
      title: "would rather (Updated)",
    });

    expect(updated?.title).toBe("would rather (Updated)");
    expect(deleteGuideLessonById(created.id)).toBe(true);
    expect(listGuideLessons().some((item) => item.id === created.id)).toBe(
      false,
    );
  });
});

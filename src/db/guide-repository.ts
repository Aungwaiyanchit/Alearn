import { randomUUID } from "node:crypto";
import { getDb } from "@/db/client";
import type { GuideLessonMutationInput } from "@/types/admin";
import type {
  CommonMistake,
  LessonCheatSheetRow,
  LessonTrack,
  TenseExample,
  TenseFormula,
  TenseLesson,
  TimelineVisualType,
  WritingTip,
} from "@/types/guide";
import type { Difficulty } from "@/types/practice";

interface GuideLessonRow {
  id: string;
  title: string;
  burmese_title: string;
  track: Exclude<LessonTrack, "all">;
  subgroup: string;
  level: Difficulty;
  summary: string;
  burmese_summary: string;
  timeline_type: TimelineVisualType;
  timeline_caption: string;
  formula_json: string;
  when_to_use_json: string;
  signal_words_json: string;
  examples_json: string;
  mistake_json: string;
  cheat_sheet_json: string;
  related_tip_ids_json: string;
  practice_category_id: string;
}

interface GuideTipRow {
  id: string;
  tag: WritingTip["tag"];
  title: string;
  burmese_title: string;
  summary: string;
  trick: string;
  before_text: string;
  after_text: string;
}

function safeParseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function mapGuideLessonRow(row: GuideLessonRow): TenseLesson {
  return {
    id: row.id,
    title: row.title,
    burmeseTitle: row.burmese_title,
    track: row.track,
    subgroup: row.subgroup,
    level: row.level,
    summary: row.summary,
    burmeseSummary: row.burmese_summary,
    timelineType: row.timeline_type,
    timelineCaption: row.timeline_caption,
    formula: safeParseJson<TenseFormula>(row.formula_json, {
      positive: "",
      negative: "",
      question: "",
    }),
    whenToUse: safeParseJson<string[]>(row.when_to_use_json, []),
    signalWords: safeParseJson<string[]>(row.signal_words_json, []),
    examples: safeParseJson<TenseExample[]>(row.examples_json, []),
    mistake: safeParseJson<CommonMistake>(row.mistake_json, {
      wrong: "",
      correct: "",
      reason: "",
    }),
    cheatSheet: safeParseJson<LessonCheatSheetRow[]>(row.cheat_sheet_json, []),
    relatedTipIds: safeParseJson<string[]>(row.related_tip_ids_json, []),
    practiceCategoryId: row.practice_category_id,
  };
}

function mapGuideTipRow(row: GuideTipRow): WritingTip {
  return {
    id: row.id,
    tag: row.tag,
    title: row.title,
    burmeseTitle: row.burmese_title,
    summary: row.summary,
    trick: row.trick,
    before: row.before_text,
    after: row.after_text,
  };
}

function buildLessonId(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
  return `lesson-${slug || "rule"}-${randomUUID().slice(0, 6)}`;
}

export function listGuideLessons(): TenseLesson[] {
  const db = getDb();
  const rows = db
    .query<GuideLessonRow, []>(`
      SELECT
        id,
        title,
        burmese_title,
        track,
        subgroup,
        level,
        summary,
        burmese_summary,
        timeline_type,
        timeline_caption,
        formula_json,
        when_to_use_json,
        signal_words_json,
        examples_json,
        mistake_json,
        cheat_sheet_json,
        related_tip_ids_json,
        practice_category_id
      FROM guide_lessons
      ORDER BY position ASC, created_at ASC
    `)
    .all();

  return rows.map(mapGuideLessonRow);
}

export function listGuideTips(): WritingTip[] {
  const db = getDb();
  const rows = db
    .query<GuideTipRow, []>(`
      SELECT
        id,
        tag,
        title,
        burmese_title,
        summary,
        trick,
        before_text,
        after_text
      FROM guide_tips
      ORDER BY created_at ASC
    `)
    .all();

  return rows.map(mapGuideTipRow);
}

export function createGuideLesson(
  input: GuideLessonMutationInput,
): TenseLesson {
  const db = getDb();
  const id = buildLessonId(input.title);

  const nextPosRow = db
    .query<{ next_pos: number }, []>(
      "SELECT COALESCE(MAX(position) + 1, 0) AS next_pos FROM guide_lessons",
    )
    .get();

  const normalizedExamples: TenseExample[] = input.examples.map(
    (example, idx) => ({
      id: example.id || `${id}-ex-${idx + 1}`,
      burmese: example.burmese.trim(),
      english: example.english.trim(),
      highlight: example.highlight.trim(),
      note: example.note.trim(),
    }),
  );

  db.prepare(`
    INSERT INTO guide_lessons (
      id,
      title,
      burmese_title,
      track,
      subgroup,
      level,
      summary,
      burmese_summary,
      timeline_type,
      timeline_caption,
      formula_json,
      when_to_use_json,
      signal_words_json,
      examples_json,
      mistake_json,
      cheat_sheet_json,
      related_tip_ids_json,
      practice_category_id,
      position
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    input.title.trim(),
    input.burmeseTitle.trim(),
    input.track,
    input.subgroup.trim(),
    input.level,
    input.summary.trim(),
    input.burmeseSummary.trim(),
    input.timelineType,
    input.timelineCaption.trim(),
    JSON.stringify(input.formula),
    JSON.stringify(input.whenToUse),
    JSON.stringify(input.signalWords),
    JSON.stringify(normalizedExamples),
    JSON.stringify(input.mistake),
    JSON.stringify(input.cheatSheet),
    JSON.stringify(input.relatedTipIds),
    input.practiceCategoryId.trim() || "random-mix",
    nextPosRow?.next_pos ?? 0,
  );

  const created = listGuideLessons().find((lesson) => lesson.id === id);
  if (!created) {
    throw new Error("Failed to load created guide lesson");
  }
  return created;
}

export function updateGuideLesson(
  id: string,
  input: GuideLessonMutationInput,
): TenseLesson | null {
  const db = getDb();

  const normalizedExamples: TenseExample[] = input.examples.map(
    (example, idx) => ({
      id: example.id || `${id}-ex-${idx + 1}`,
      burmese: example.burmese.trim(),
      english: example.english.trim(),
      highlight: example.highlight.trim(),
      note: example.note.trim(),
    }),
  );

  const result = db
    .prepare(`
      UPDATE guide_lessons
      SET
        title = ?,
        burmese_title = ?,
        track = ?,
        subgroup = ?,
        level = ?,
        summary = ?,
        burmese_summary = ?,
        timeline_type = ?,
        timeline_caption = ?,
        formula_json = ?,
        when_to_use_json = ?,
        signal_words_json = ?,
        examples_json = ?,
        mistake_json = ?,
        cheat_sheet_json = ?,
        related_tip_ids_json = ?,
        practice_category_id = ?
      WHERE id = ?
    `)
    .run(
      input.title.trim(),
      input.burmeseTitle.trim(),
      input.track,
      input.subgroup.trim(),
      input.level,
      input.summary.trim(),
      input.burmeseSummary.trim(),
      input.timelineType,
      input.timelineCaption.trim(),
      JSON.stringify(input.formula),
      JSON.stringify(input.whenToUse),
      JSON.stringify(input.signalWords),
      JSON.stringify(normalizedExamples),
      JSON.stringify(input.mistake),
      JSON.stringify(input.cheatSheet),
      JSON.stringify(input.relatedTipIds),
      input.practiceCategoryId.trim() || "random-mix",
      id,
    );

  if (result.changes === 0) {
    return null;
  }

  return listGuideLessons().find((lesson) => lesson.id === id) ?? null;
}

export function deleteGuideLessonById(id: string): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM guide_lessons WHERE id = ?").run(id);
  return result.changes > 0;
}

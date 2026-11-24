import {
  type GuideLessonMutationInput,
  TIMELINE_TYPE_OPTIONS,
} from "@/types/admin";
import type {
  LessonCheatSheetRow,
  LessonTrack,
  TenseExample,
  TimelineVisualType,
} from "@/types/guide";
import type { Difficulty } from "@/types/practice";

const ALLOWED_TRACKS = new Set<Exclude<LessonTrack, "all">>([
  "tenses",
  "grammar",
]);
const ALLOWED_LEVELS = new Set<Difficulty>([
  "beginner",
  "intermediate",
  "advanced",
]);
const ALLOWED_TIMELINES = new Set<TimelineVisualType>(
  TIMELINE_TYPE_OPTIONS.map((option) => option.value),
);

function cleanStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function parseExamples(value: unknown): TenseExample[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const examples: TenseExample[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const row = item as Record<string, unknown>;
    const burmese = typeof row.burmese === "string" ? row.burmese.trim() : "";
    const english = typeof row.english === "string" ? row.english.trim() : "";
    const highlight =
      typeof row.highlight === "string" ? row.highlight.trim() : "";
    const note = typeof row.note === "string" ? row.note.trim() : "";
    const id = typeof row.id === "string" ? row.id.trim() : "";

    if (!burmese && !english) {
      continue;
    }

    examples.push({ id, burmese, english, highlight, note });
  }

  return examples;
}

function parseCheatSheet(value: unknown): LessonCheatSheetRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const rows: LessonCheatSheetRow[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const row = item as Record<string, unknown>;
    const pattern = typeof row.pattern === "string" ? row.pattern.trim() : "";
    const english = typeof row.english === "string" ? row.english.trim() : "";
    const burmese = typeof row.burmese === "string" ? row.burmese.trim() : "";
    const usage = typeof row.usage === "string" ? row.usage.trim() : "";

    if (!pattern && !english) {
      continue;
    }

    rows.push({ pattern, english, burmese, usage });
  }

  return rows;
}

export function parseGuideLessonMutationBody(
  body: unknown,
): { data: GuideLessonMutationInput } | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request payload" };
  }

  const record = body as Record<string, unknown>;
  const title = typeof record.title === "string" ? record.title.trim() : "";
  const burmeseTitle =
    typeof record.burmeseTitle === "string" ? record.burmeseTitle.trim() : "";
  const rawTrack = typeof record.track === "string" ? record.track : "grammar";
  const subgroup =
    typeof record.subgroup === "string" ? record.subgroup.trim() : "";
  const rawLevel = typeof record.level === "string" ? record.level : "beginner";
  const summary =
    typeof record.summary === "string" ? record.summary.trim() : "";
  const burmeseSummary =
    typeof record.burmeseSummary === "string"
      ? record.burmeseSummary.trim()
      : "";
  const rawTimeline =
    typeof record.timelineType === "string"
      ? record.timelineType
      : "rule-pattern";
  const timelineCaption =
    typeof record.timelineCaption === "string"
      ? record.timelineCaption.trim()
      : "";
  const practiceCategoryId =
    typeof record.practiceCategoryId === "string"
      ? record.practiceCategoryId.trim()
      : "random-mix";

  if (!title) {
    return { error: "Lesson title is required" };
  }
  if (!burmeseTitle) {
    return { error: "Burmese title is required" };
  }
  if (!summary) {
    return { error: "Summary explanation is required" };
  }

  const formulaRecord =
    record.formula && typeof record.formula === "object"
      ? (record.formula as Record<string, unknown>)
      : {};
  const formula = {
    positive:
      typeof formulaRecord.positive === "string"
        ? formulaRecord.positive.trim()
        : "",
    negative:
      typeof formulaRecord.negative === "string"
        ? formulaRecord.negative.trim()
        : "",
    question:
      typeof formulaRecord.question === "string"
        ? formulaRecord.question.trim()
        : "",
  };

  if (!formula.positive) {
    return { error: "Positive formula is required" };
  }

  const mistakeRecord =
    record.mistake && typeof record.mistake === "object"
      ? (record.mistake as Record<string, unknown>)
      : {};
  const mistake = {
    wrong:
      typeof mistakeRecord.wrong === "string" ? mistakeRecord.wrong.trim() : "",
    correct:
      typeof mistakeRecord.correct === "string"
        ? mistakeRecord.correct.trim()
        : "",
    reason:
      typeof mistakeRecord.reason === "string"
        ? mistakeRecord.reason.trim()
        : "",
  };

  const track: Exclude<LessonTrack, "all"> = ALLOWED_TRACKS.has(
    rawTrack as Exclude<LessonTrack, "all">,
  )
    ? (rawTrack as Exclude<LessonTrack, "all">)
    : "grammar";

  const level: Difficulty = ALLOWED_LEVELS.has(rawLevel as Difficulty)
    ? (rawLevel as Difficulty)
    : "beginner";

  const timelineType: TimelineVisualType = ALLOWED_TIMELINES.has(
    rawTimeline as TimelineVisualType,
  )
    ? (rawTimeline as TimelineVisualType)
    : "rule-pattern";

  return {
    data: {
      title,
      burmeseTitle,
      track,
      subgroup: subgroup || (track === "tenses" ? "Present" : "Grammar"),
      level,
      summary,
      burmeseSummary,
      timelineType,
      timelineCaption: timelineCaption || summary,
      formula,
      whenToUse: cleanStringArray(record.whenToUse),
      signalWords: cleanStringArray(record.signalWords),
      examples: parseExamples(record.examples),
      mistake,
      cheatSheet: parseCheatSheet(record.cheatSheet),
      relatedTipIds: cleanStringArray(record.relatedTipIds),
      practiceCategoryId: practiceCategoryId || "random-mix",
    },
  };
}

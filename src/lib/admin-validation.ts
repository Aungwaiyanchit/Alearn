import {
  CATEGORY_COLOR_OPTIONS,
  CATEGORY_ICON_OPTIONS,
  type CategoryMutationInput,
  type QuestionMutationInput,
} from "@/types/admin";
import type { Difficulty } from "@/types/practice";

const ALLOWED_ICONS = new Set<string>(
  CATEGORY_ICON_OPTIONS.map((item) => item.value),
);
const ALLOWED_COLORS = new Set<string>(
  CATEGORY_COLOR_OPTIONS.map((item) => item.value),
);
const ALLOWED_DIFFICULTIES = new Set<Difficulty>([
  "beginner",
  "intermediate",
  "advanced",
]);

export function parseCategoryMutationBody(
  body: unknown,
): { data: CategoryMutationInput } | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request payload" };
  }

  const record = body as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const burmeseName =
    typeof record.burmeseName === "string" ? record.burmeseName.trim() : "";
  const description =
    typeof record.description === "string" ? record.description.trim() : "";
  const rawIcon = typeof record.icon === "string" ? record.icon : "book-open";
  const rawColor =
    typeof record.accentColor === "string" ? record.accentColor : "amber";

  if (!name) {
    return { error: "Category name is required" };
  }
  if (!burmeseName) {
    return { error: "Burmese category name is required" };
  }

  return {
    data: {
      name,
      burmeseName,
      description: description || "Custom English writing practice lessons.",
      icon: ALLOWED_ICONS.has(rawIcon) ? rawIcon : "book-open",
      accentColor: ALLOWED_COLORS.has(rawColor) ? rawColor : "amber",
    },
  };
}

export function parseQuestionMutationBody(
  body: unknown,
): { data: QuestionMutationInput } | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request payload" };
  }

  const record = body as Record<string, unknown>;
  const categoryId =
    typeof record.categoryId === "string" ? record.categoryId.trim() : "";
  const burmesePrompt =
    typeof record.burmesePrompt === "string" ? record.burmesePrompt.trim() : "";
  const englishAnswer =
    typeof record.englishAnswer === "string" ? record.englishAnswer.trim() : "";
  const hint = typeof record.hint === "string" ? record.hint.trim() : "";
  const grammarNote =
    typeof record.grammarNote === "string" ? record.grammarNote.trim() : "";
  const rawDifficulty =
    typeof record.difficulty === "string" ? record.difficulty : "beginner";

  const acceptedAnswers = Array.isArray(record.acceptedAnswers)
    ? record.acceptedAnswers
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [];

  if (!categoryId) {
    return { error: "Category is required" };
  }
  if (!burmesePrompt) {
    return { error: "Burmese prompt is required" };
  }
  if (!englishAnswer) {
    return { error: "Primary English answer is required" };
  }

  const difficulty: Difficulty = ALLOWED_DIFFICULTIES.has(
    rawDifficulty as Difficulty,
  )
    ? (rawDifficulty as Difficulty)
    : "beginner";

  return {
    data: {
      categoryId,
      burmesePrompt,
      englishAnswer,
      acceptedAnswers,
      hint,
      grammarNote,
      difficulty,
    },
  };
}

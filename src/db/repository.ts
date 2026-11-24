import { randomUUID } from "node:crypto";
import { getDb } from "@/db/client";
import type {
  Category,
  CreateRandomCategoryInput,
  Difficulty,
  LessonQuestion,
  PracticeStats,
} from "@/types/practice";

interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  burmese_name: string;
  description: string;
  icon: string;
  accent_color: string;
  is_random: number;
  created_at: string;
  question_count: number;
  completed_count: number;
  question_ids: string | null;
}

interface QuestionRow {
  id: string;
  category_id: string;
  category_name: string | null;
  burmese_prompt: string;
  english_answer: string;
  accepted_answers: string;
  hint: string;
  grammar_note: string;
  difficulty: Difficulty;
}

const RANDOM_ACCENT_COLORS = [
  "amber",
  "emerald",
  "indigo",
  "rose",
  "sky",
  "violet",
] as const;

const RANDOM_BURMESE_LABELS: Record<Difficulty | "all", string> = {
  all: "ကျပန်း ရောနှောလေ့ကျင့်ခန်း",
  beginner: "ကျပန်း အခြေခံလေ့ကျင့်ခန်း",
  intermediate: "ကျပန်း အလယ်အလတ်လေ့ကျင့်ခန်း",
  advanced: "ကျပန်း အဆင့်မြင့်လေ့ကျင့်ခန်း",
};

function mapCategoryRow(row: CategoryRow): Category {
  const questionIds = row.question_ids
    ? row.question_ids
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id.length > 0)
    : [];

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    burmeseName: row.burmese_name,
    description: row.description,
    icon: row.icon,
    accentColor: row.accent_color,
    isRandom: row.is_random === 1,
    questionCount: row.question_count,
    completedCount: row.completed_count,
    questionIds,
    createdAt: row.created_at,
  };
}

function mapQuestionRow(row: QuestionRow): LessonQuestion {
  let acceptedAnswers: string[] = [];
  try {
    const parsed: unknown = JSON.parse(row.accepted_answers);
    if (Array.isArray(parsed)) {
      acceptedAnswers = parsed.filter(
        (item): item is string => typeof item === "string",
      );
    }
  } catch {
    acceptedAnswers = [];
  }

  return {
    id: row.id,
    categoryId: row.category_id,
    categoryName: row.category_name ?? undefined,
    burmesePrompt: row.burmese_prompt,
    englishAnswer: row.english_answer,
    acceptedAnswers,
    hint: row.hint,
    grammarNote: row.grammar_note,
    difficulty: row.difficulty,
  };
}

export function listCategories(): Category[] {
  const db = getDb();
  const rows = db
    .query<CategoryRow, []>(`
      SELECT
        c.id,
        c.slug,
        c.name,
        c.burmese_name,
        c.description,
        c.icon,
        c.accent_color,
        c.is_random,
        c.created_at,
        COUNT(DISTINCT cq.question_id) AS question_count,
        0 AS completed_count,
        GROUP_CONCAT(DISTINCT cq.question_id) AS question_ids
      FROM categories c
      LEFT JOIN category_questions cq ON cq.category_id = c.id
      GROUP BY c.id
      ORDER BY c.is_random ASC, c.created_at ASC
    `)
    .all();

  return rows.map(mapCategoryRow);
}

export function getQuestionsForCategory(
  categoryId: string,
  options?: { shuffle?: boolean; count?: number },
): LessonQuestion[] {
  const db = getDb();

  if (categoryId === "random-mix") {
    const limit = Math.min(Math.max(options?.count ?? 8, 1), 36);
    const rows = db
      .query<QuestionRow, [number]>(`
        SELECT
          q.id,
          q.category_id,
          c.name AS category_name,
          q.burmese_prompt,
          q.english_answer,
          q.accepted_answers,
          q.hint,
          q.grammar_note,
          q.difficulty
        FROM questions q
        LEFT JOIN categories c ON c.id = q.category_id
        ORDER BY RANDOM()
        LIMIT ?
      `)
      .all(limit);

    return rows.map(mapQuestionRow);
  }

  const orderBy = options?.shuffle
    ? "ORDER BY RANDOM()"
    : "ORDER BY cq.position ASC";
  const rows = db
    .query<QuestionRow, [string]>(`
      SELECT
        q.id,
        q.category_id,
        c.name AS category_name,
        q.burmese_prompt,
        q.english_answer,
        q.accepted_answers,
        q.hint,
        q.grammar_note,
        q.difficulty
      FROM category_questions cq
      INNER JOIN questions q ON q.id = cq.question_id
      LEFT JOIN categories c ON c.id = q.category_id
      WHERE cq.category_id = ?
      ${orderBy}
    `)
    .all(categoryId);

  return rows.map(mapQuestionRow);
}

export function createRandomCategory(
  input: CreateRandomCategoryInput,
): Category {
  const db = getDb();
  const trimmedName = input.name.trim() || "Random Challenge";
  const count = Math.min(Math.max(Math.floor(input.count) || 6, 3), 15);
  const difficulty = input.difficulty;

  const sampledIds =
    difficulty === "all"
      ? db
          .query<{ id: string }, [number]>(
            "SELECT id FROM questions ORDER BY RANDOM() LIMIT ?",
          )
          .all(count)
      : db
          .query<{ id: string }, [string, number]>(
            "SELECT id FROM questions WHERE difficulty = ? ORDER BY RANDOM() LIMIT ?",
          )
          .all(difficulty, count);

  const finalIds =
    sampledIds.length > 0
      ? sampledIds
      : db
          .query<{ id: string }, [number]>(
            "SELECT id FROM questions ORDER BY RANDOM() LIMIT ?",
          )
          .all(count);

  const id = `cat-rand-${randomUUID().slice(0, 8)}`;
  const slugBase = trimmedName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const slug = `${slugBase || "random-mix"}-${id.slice(-4)}`;
  const accentColor =
    RANDOM_ACCENT_COLORS[
      Math.floor(Math.random() * RANDOM_ACCENT_COLORS.length)
    ];
  const burmeseName = RANDOM_BURMESE_LABELS[difficulty];
  const difficultyLabel =
    difficulty === "all" ? "mixed levels" : `${difficulty} level`;
  const description = `Custom random set of ${finalIds.length} ${difficultyLabel} writing prompts.`;

  const insertCategory = db.prepare(`
    INSERT INTO categories (id, slug, name, burmese_name, description, icon, accent_color, is_random)
    VALUES (?, ?, ?, ?, ?, 'shuffle', ?, 1)
  `);

  const insertLink = db.prepare(`
    INSERT INTO category_questions (category_id, question_id, position)
    VALUES (?, ?, ?)
  `);

  const createTx = db.transaction(() => {
    insertCategory.run(
      id,
      slug,
      trimmedName,
      burmeseName,
      description,
      accentColor,
    );
    finalIds.forEach((row, index) => {
      insertLink.run(id, row.id, index);
    });
  });

  createTx();

  const created = listCategories().find((cat) => cat.id === id);
  if (!created) {
    throw new Error("Failed to load newly created random category");
  }

  return created;
}

export function deleteRandomCategory(categoryId: string): boolean {
  const db = getDb();
  const result = db
    .prepare("DELETE FROM categories WHERE id = ? AND is_random = 1")
    .run(categoryId);
  return result.changes > 0;
}

export function recordAttempt(params: {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  accuracy: number;
}): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO attempts (question_id, user_answer, is_correct, accuracy)
    VALUES (?, ?, ?, ?)
  `).run(
    params.questionId,
    params.userAnswer,
    params.isCorrect ? 1 : 0,
    params.accuracy,
  );
}

export function getPracticeStats(): PracticeStats {
  const db = getDb();
  const attemptSummary = db
    .query<
      {
        total_attempts: number;
        correct_attempts: number;
        avg_accuracy: number | null;
      },
      []
    >(`
      SELECT
        COUNT(*) AS total_attempts,
        SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) AS correct_attempts,
        AVG(accuracy) AS avg_accuracy
      FROM attempts
    `)
    .get();

  const masteredRow = db
    .query<{ count: number }, []>(
      "SELECT COUNT(DISTINCT question_id) AS count FROM attempts WHERE is_correct = 1",
    )
    .get();

  const totalQuestionsRow = db
    .query<{ count: number }, []>("SELECT COUNT(*) AS count FROM questions")
    .get();

  return {
    totalAttempts: attemptSummary?.total_attempts ?? 0,
    correctAttempts: attemptSummary?.correct_attempts ?? 0,
    averageAccuracy: Math.round(attemptSummary?.avg_accuracy ?? 0),
    masteredCount: masteredRow?.count ?? 0,
    totalQuestions: totalQuestionsRow?.count ?? 0,
  };
}

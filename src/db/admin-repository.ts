import { randomUUID } from "node:crypto";
import { getDb } from "@/db/client";
import { listCategories } from "@/db/repository";
import type { BulkCsvQuestionRow } from "@/lib/csv-questions";
import type {
  CategoryMutationInput,
  QuestionMutationInput,
} from "@/types/admin";
import type { Category, Difficulty, LessonQuestion } from "@/types/practice";

const IMPORT_ACCENT_COLORS = [
  "amber",
  "indigo",
  "emerald",
  "rose",
  "sky",
  "violet",
] as const;

export interface BulkImportSummary {
  insertedQuestions: number;
  createdCategories: number;
}

export interface DestroyAllSummary {
  deletedCategories: number;
  deletedQuestions: number;
  deletedAttempts: number;
  deletedGuideLessons: number;
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

function buildSlug(name: string, suffix: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base || "category"}-${suffix}`;
}

export function listAllQuestions(): LessonQuestion[] {
  const db = getDb();
  const rows = db
    .query<QuestionRow, []>(`
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
      ORDER BY c.is_random ASC, c.created_at ASC, q.rowid DESC
    `)
    .all();

  return rows.map(mapQuestionRow);
}

export function getCategoryById(id: string): Category | null {
  return listCategories().find((category) => category.id === id) ?? null;
}

export function getQuestionById(id: string): LessonQuestion | null {
  return listAllQuestions().find((question) => question.id === id) ?? null;
}

export function createCategory(input: CategoryMutationInput): Category {
  const db = getDb();
  const id = `cat-${randomUUID().slice(0, 8)}`;
  const slug = buildSlug(input.name, id.slice(-4));

  db.prepare(`
    INSERT INTO categories (id, slug, name, burmese_name, description, icon, accent_color, is_random)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0)
  `).run(
    id,
    slug,
    input.name.trim(),
    input.burmeseName.trim(),
    input.description.trim(),
    input.icon,
    input.accentColor,
  );

  const created = listCategories().find((cat) => cat.id === id);
  if (!created) {
    throw new Error("Failed to load created category");
  }
  return created;
}

export function updateCategory(
  id: string,
  input: CategoryMutationInput,
): Category | null {
  const db = getDb();
  const result = db
    .prepare(`
      UPDATE categories
      SET name = ?, burmese_name = ?, description = ?, icon = ?, accent_color = ?
      WHERE id = ?
    `)
    .run(
      input.name.trim(),
      input.burmeseName.trim(),
      input.description.trim(),
      input.icon,
      input.accentColor,
      id,
    );

  if (result.changes === 0) {
    return null;
  }

  return listCategories().find((cat) => cat.id === id) ?? null;
}

export function deleteCategoryById(id: string): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM categories WHERE id = ?").run(id);
  return result.changes > 0;
}

export function createQuestion(input: QuestionMutationInput): LessonQuestion {
  const db = getDb();
  const id = `q-${randomUUID().slice(0, 8)}`;
  const cleanAccepted = input.acceptedAnswers
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const tx = db.transaction(() => {
    db.prepare(`
      INSERT INTO questions (
        id,
        category_id,
        burmese_prompt,
        english_answer,
        accepted_answers,
        hint,
        grammar_note,
        difficulty
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      input.categoryId,
      input.burmesePrompt.trim(),
      input.englishAnswer.trim(),
      JSON.stringify(cleanAccepted),
      input.hint.trim(),
      input.grammarNote.trim(),
      input.difficulty,
    );

    const nextPosRow = db
      .query<{ next_pos: number }, [string]>(
        "SELECT COALESCE(MAX(position) + 1, 0) AS next_pos FROM category_questions WHERE category_id = ?",
      )
      .get(input.categoryId);

    db.prepare(`
      INSERT OR IGNORE INTO category_questions (category_id, question_id, position)
      VALUES (?, ?, ?)
    `).run(input.categoryId, id, nextPosRow?.next_pos ?? 0);
  });

  tx();

  const created = listAllQuestions().find((question) => question.id === id);
  if (!created) {
    throw new Error("Failed to load created question");
  }
  return created;
}

export function updateQuestion(
  id: string,
  input: QuestionMutationInput,
): LessonQuestion | null {
  const db = getDb();
  const existing = db
    .query<{ category_id: string }, [string]>(
      "SELECT category_id FROM questions WHERE id = ?",
    )
    .get(id);

  if (!existing) {
    return null;
  }

  const cleanAccepted = input.acceptedAnswers
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const tx = db.transaction(() => {
    db.prepare(`
      UPDATE questions
      SET
        category_id = ?,
        burmese_prompt = ?,
        english_answer = ?,
        accepted_answers = ?,
        hint = ?,
        grammar_note = ?,
        difficulty = ?
      WHERE id = ?
    `).run(
      input.categoryId,
      input.burmesePrompt.trim(),
      input.englishAnswer.trim(),
      JSON.stringify(cleanAccepted),
      input.hint.trim(),
      input.grammarNote.trim(),
      input.difficulty,
      id,
    );

    if (existing.category_id !== input.categoryId) {
      db.prepare(
        "DELETE FROM category_questions WHERE category_id = ? AND question_id = ?",
      ).run(existing.category_id, id);

      const nextPosRow = db
        .query<{ next_pos: number }, [string]>(
          "SELECT COALESCE(MAX(position) + 1, 0) AS next_pos FROM category_questions WHERE category_id = ?",
        )
        .get(input.categoryId);

      db.prepare(`
        INSERT OR IGNORE INTO category_questions (category_id, question_id, position)
        VALUES (?, ?, ?)
      `).run(input.categoryId, id, nextPosRow?.next_pos ?? 0);
    }
  });

  tx();

  return listAllQuestions().find((question) => question.id === id) ?? null;
}

export function deleteQuestionById(id: string): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM questions WHERE id = ?").run(id);
  return result.changes > 0;
}

export function resetAllAttempts(): number {
  const db = getDb();
  const result = db.prepare("DELETE FROM attempts").run();
  return result.changes;
}

function formatCategoryDisplayName(rawCategory: string): string {
  const trimmed = rawCategory.trim();
  if (!trimmed.includes("-") || trimmed.includes(" ")) {
    return trimmed;
  }

  return trimmed
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function bulkInsertQuestionsFromCsv(
  rows: BulkCsvQuestionRow[],
): BulkImportSummary {
  const db = getDb();
  const existingCategories = db
    .query<{ id: string; slug: string; name: string }, []>(
      "SELECT id, slug, name FROM categories WHERE is_random = 0",
    )
    .all();

  const categoryLookup = new Map<string, string>();
  for (const cat of existingCategories) {
    categoryLookup.set(cat.id.toLowerCase(), cat.id);
    categoryLookup.set(cat.slug.toLowerCase(), cat.id);
    categoryLookup.set(cat.name.toLowerCase(), cat.id);
  }

  const insertCategoryStmt = db.prepare(`
    INSERT INTO categories (id, slug, name, burmese_name, description, icon, accent_color, is_random)
    VALUES (?, ?, ?, ?, ?, 'book-open', ?, 0)
  `);

  const insertQuestionStmt = db.prepare(`
    INSERT INTO questions (
      id,
      category_id,
      burmese_prompt,
      english_answer,
      accepted_answers,
      hint,
      grammar_note,
      difficulty
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertLinkStmt = db.prepare(`
    INSERT OR IGNORE INTO category_questions (category_id, question_id, position)
    VALUES (?, ?, ?)
  `);

  const nextPositionByCategory = new Map<string, number>();
  let createdCategories = 0;
  let insertedQuestions = 0;

  const getNextPosition = (categoryId: string): number => {
    const cached = nextPositionByCategory.get(categoryId);
    if (cached !== undefined) {
      nextPositionByCategory.set(categoryId, cached + 1);
      return cached;
    }

    const row = db
      .query<{ next_pos: number }, [string]>(
        "SELECT COALESCE(MAX(position) + 1, 0) AS next_pos FROM category_questions WHERE category_id = ?",
      )
      .get(categoryId);
    const startPos = row?.next_pos ?? 0;
    nextPositionByCategory.set(categoryId, startPos + 1);
    return startPos;
  };

  const tx = db.transaction(() => {
    for (const row of rows) {
      const normalizedKey = row.category.trim().toLowerCase();
      let categoryId = categoryLookup.get(normalizedKey);

      if (!categoryId) {
        const displayName = formatCategoryDisplayName(row.category);
        const newId = `cat-${randomUUID().slice(0, 8)}`;
        const slug = buildSlug(displayName, newId.slice(-4));
        const color =
          IMPORT_ACCENT_COLORS[
            (existingCategories.length + createdCategories) %
              IMPORT_ACCENT_COLORS.length
          ];

        insertCategoryStmt.run(
          newId,
          slug,
          displayName,
          row.categoryBurmese || displayName,
          "Imported writing practice lessons.",
          color,
        );

        categoryId = newId;
        createdCategories += 1;
        categoryLookup.set(normalizedKey, newId);
        categoryLookup.set(displayName.toLowerCase(), newId);
        categoryLookup.set(slug.toLowerCase(), newId);
      }

      const questionId = `q-${randomUUID().slice(0, 8)}`;
      insertQuestionStmt.run(
        questionId,
        categoryId,
        row.burmesePrompt,
        row.englishAnswer,
        JSON.stringify(row.acceptedAnswers),
        row.hint,
        row.grammarNote,
        row.difficulty,
      );

      insertLinkStmt.run(categoryId, questionId, getNextPosition(categoryId));
      insertedQuestions += 1;
    }
  });

  tx();

  return { insertedQuestions, createdCategories };
}

export function destroyAllData(): DestroyAllSummary {
  const db = getDb();

  let deletedCategories = 0;
  let deletedQuestions = 0;
  let deletedAttempts = 0;
  let deletedGuideLessons = 0;

  const tx = db.transaction(() => {
    deletedAttempts = db.prepare("DELETE FROM attempts").run().changes;
    db.prepare("DELETE FROM category_questions").run();
    deletedQuestions = db.prepare("DELETE FROM questions").run().changes;
    deletedCategories = db.prepare("DELETE FROM categories").run().changes;
    deletedGuideLessons = db.prepare("DELETE FROM guide_lessons").run().changes;
    db.prepare(
      "INSERT OR REPLACE INTO app_meta (key, value) VALUES ('initialized', '1')",
    ).run();
    db.prepare(
      "INSERT OR REPLACE INTO app_meta (key, value) VALUES ('guide_initialized', '1')",
    ).run();
  });

  tx();

  return {
    deletedCategories,
    deletedQuestions,
    deletedAttempts,
    deletedGuideLessons,
  };
}

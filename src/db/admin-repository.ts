import { randomUUID } from "node:crypto";
import { getDb } from "@/db/client";
import { listCategories } from "@/db/repository";
import type {
  CategoryMutationInput,
  QuestionMutationInput,
} from "@/types/admin";
import type { Category, Difficulty, LessonQuestion } from "@/types/practice";

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

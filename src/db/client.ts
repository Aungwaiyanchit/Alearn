import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { SEED_CATEGORIES, SEED_QUESTIONS } from "@/db/seed-data";

const globalForDb = globalThis as unknown as {
  alearnDb?: Database;
};

function initializeSchema(db: Database): void {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      burmese_name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      accent_color TEXT NOT NULL,
      is_random INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      burmese_prompt TEXT NOT NULL,
      english_answer TEXT NOT NULL,
      accepted_answers TEXT NOT NULL,
      hint TEXT NOT NULL,
      grammar_note TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS category_questions (
      category_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      position INTEGER NOT NULL,
      PRIMARY KEY (category_id, question_id),
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id TEXT NOT NULL,
      user_answer TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    );
  `);
}

function seedDatabaseIfEmpty(db: Database): void {
  const row = db
    .query<{ count: number }, []>("SELECT COUNT(*) as count FROM categories")
    .get();

  if (row && row.count > 0) {
    return;
  }

  const insertCategory = db.prepare(`
    INSERT INTO categories (id, slug, name, burmese_name, description, icon, accent_color, is_random)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0)
  `);

  const insertQuestion = db.prepare(`
    INSERT INTO questions (id, category_id, burmese_prompt, english_answer, accepted_answers, hint, grammar_note, difficulty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertLink = db.prepare(`
    INSERT INTO category_questions (category_id, question_id, position)
    VALUES (?, ?, ?)
  `);

  const runSeed = db.transaction(() => {
    for (const category of SEED_CATEGORIES) {
      insertCategory.run(
        category.id,
        category.slug,
        category.name,
        category.burmeseName,
        category.description,
        category.icon,
        category.accentColor,
      );
    }

    const positionByCategory = new Map<string, number>();

    for (const question of SEED_QUESTIONS) {
      insertQuestion.run(
        question.id,
        question.categoryId,
        question.burmesePrompt,
        question.englishAnswer,
        JSON.stringify(question.acceptedAnswers),
        question.hint,
        question.grammarNote,
        question.difficulty,
      );

      const pos = positionByCategory.get(question.categoryId) ?? 0;
      insertLink.run(question.categoryId, question.id, pos);
      positionByCategory.set(question.categoryId, pos + 1);
    }
  });

  runSeed();
}

export function getDb(): Database {
  if (globalForDb.alearnDb) {
    return globalForDb.alearnDb;
  }

  const dataDir = path.join(process.cwd(), "data");
  mkdirSync(dataDir, { recursive: true });

  const dbPath = path.join(dataDir, "alearn.sqlite");
  const db = new Database(dbPath, { create: true });

  initializeSchema(db);
  seedDatabaseIfEmpty(db);

  globalForDb.alearnDb = db;
  return db;
}

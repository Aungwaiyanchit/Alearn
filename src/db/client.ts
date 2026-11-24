import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { TENSE_LESSONS, WRITING_TIPS } from "@/data/lessons-guide-data";
import { resolveDatabasePath } from "@/db/config";
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

    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS guide_lessons (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      burmese_title TEXT NOT NULL,
      track TEXT NOT NULL,
      subgroup TEXT NOT NULL,
      level TEXT NOT NULL,
      summary TEXT NOT NULL,
      burmese_summary TEXT NOT NULL,
      timeline_type TEXT NOT NULL,
      timeline_caption TEXT NOT NULL,
      formula_json TEXT NOT NULL,
      when_to_use_json TEXT NOT NULL,
      signal_words_json TEXT NOT NULL,
      examples_json TEXT NOT NULL,
      mistake_json TEXT NOT NULL,
      cheat_sheet_json TEXT NOT NULL,
      related_tip_ids_json TEXT NOT NULL,
      practice_category_id TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS guide_tips (
      id TEXT PRIMARY KEY,
      tag TEXT NOT NULL,
      title TEXT NOT NULL,
      burmese_title TEXT NOT NULL,
      summary TEXT NOT NULL,
      trick TEXT NOT NULL,
      before_text TEXT NOT NULL,
      after_text TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
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
  const initialized = db
    .query<{ value: string }, []>(
      "SELECT value FROM app_meta WHERE key = 'initialized'",
    )
    .get();

  if (initialized?.value === "1") {
    return;
  }

  const row = db
    .query<{ count: number }, []>("SELECT COUNT(*) as count FROM categories")
    .get();

  if (row && row.count > 0) {
    db.prepare(
      "INSERT OR REPLACE INTO app_meta (key, value) VALUES ('initialized', '1')",
    ).run();
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
    db.prepare(
      "INSERT OR REPLACE INTO app_meta (key, value) VALUES ('initialized', '1')",
    ).run();
  });

  runSeed();
}

function seedGuideIfEmpty(db: Database): void {
  const initialized = db
    .query<{ value: string }, []>(
      "SELECT value FROM app_meta WHERE key = 'guide_initialized'",
    )
    .get();

  if (initialized?.value === "1") {
    return;
  }

  const existing = db
    .query<{ count: number }, []>("SELECT COUNT(*) AS count FROM guide_lessons")
    .get();

  if (existing && existing.count > 0) {
    db.prepare(
      "INSERT OR REPLACE INTO app_meta (key, value) VALUES ('guide_initialized', '1')",
    ).run();
    return;
  }

  const insertTip = db.prepare(`
    INSERT OR IGNORE INTO guide_tips (
      id, tag, title, burmese_title, summary, trick, before_text, after_text
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertLesson = db.prepare(`
    INSERT OR IGNORE INTO guide_lessons (
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
  `);

  const runGuideSeed = db.transaction(() => {
    for (const tip of WRITING_TIPS) {
      insertTip.run(
        tip.id,
        tip.tag,
        tip.title,
        tip.burmeseTitle,
        tip.summary,
        tip.trick,
        tip.before,
        tip.after,
      );
    }

    TENSE_LESSONS.forEach((lesson, index) => {
      insertLesson.run(
        lesson.id,
        lesson.title,
        lesson.burmeseTitle,
        lesson.track,
        lesson.subgroup,
        lesson.level,
        lesson.summary,
        lesson.burmeseSummary,
        lesson.timelineType,
        lesson.timelineCaption,
        JSON.stringify(lesson.formula),
        JSON.stringify(lesson.whenToUse),
        JSON.stringify(lesson.signalWords),
        JSON.stringify(lesson.examples),
        JSON.stringify(lesson.mistake),
        JSON.stringify(lesson.cheatSheet),
        JSON.stringify(lesson.relatedTipIds),
        lesson.practiceCategoryId,
        index,
      );
    });

    db.prepare(
      "INSERT OR REPLACE INTO app_meta (key, value) VALUES ('guide_initialized', '1')",
    ).run();
  });

  runGuideSeed();
}

export function getDb(): Database {
  if (globalForDb.alearnDb) {
    return globalForDb.alearnDb;
  }

  const dbPath = resolveDatabasePath();
  mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath, { create: true });

  initializeSchema(db);
  seedDatabaseIfEmpty(db);
  seedGuideIfEmpty(db);

  globalForDb.alearnDb = db;
  return db;
}

export function closeDb(): void {
  if (globalForDb.alearnDb) {
    globalForDb.alearnDb.close();
    globalForDb.alearnDb = undefined;
  }
}

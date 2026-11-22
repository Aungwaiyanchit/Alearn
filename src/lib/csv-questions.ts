import type { Difficulty } from "@/types/practice";

export const CSV_HEADERS = [
  "category",
  "category_burmese",
  "burmese_prompt",
  "english_answer",
  "accepted_answers",
  "hint",
  "grammar_note",
  "difficulty",
] as const;

export interface BulkCsvQuestionRow {
  rowNumber: number;
  category: string;
  categoryBurmese: string;
  burmesePrompt: string;
  englishAnswer: string;
  acceptedAnswers: string[];
  hint: string;
  grammarNote: string;
  difficulty: Difficulty;
}

export interface CsvParseError {
  rowNumber: number;
  message: string;
}

export interface CsvParseResult {
  rows: BulkCsvQuestionRow[];
  errors: CsvParseError[];
}

const VALID_DIFFICULTIES = new Set<Difficulty>([
  "beginner",
  "intermediate",
  "advanced",
]);

function stripBom(input: string): string {
  return input.charCodeAt(0) === 0xfeff ? input.slice(1) : input;
}

/**
 * RFC-4180 compliant CSV parser supporting quoted commas, escaped quotes (""),
 * and both CRLF and LF line endings.
 */
export function parseRawCsvRecords(csvText: string): string[][] {
  const text = stripBom(csvText);
  const records: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      currentRow.push(currentField);
      currentField = "";
    } else if (char === "\r" && nextChar === "\n") {
      currentRow.push(currentField);
      records.push(currentRow);
      currentRow = [];
      currentField = "";
      i += 1;
    } else if (char === "\n" || char === "\r") {
      currentRow.push(currentField);
      records.push(currentRow);
      currentRow = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    records.push(currentRow);
  }

  return records.filter((row) => row.some((cell) => cell.trim().length > 0));
}

function escapeCsvCell(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function generateQuestionsCsvTemplate(): string {
  const sampleRows: string[][] = [
    [
      "daily-conversations",
      "နေ့စဉ်စကားပြော",
      "မနက်ဖြန် ကျွန်တော်တို့ ကော်ဖီအတူသောက်ကြရအောင်။",
      "Let's have coffee together tomorrow.",
      "Let's drink coffee together tomorrow.|Let us have coffee together tomorrow.",
      "အတူသောက်ကြရအောင် = Let's have ... together",
      "Use 'have coffee' for natural everyday English rather than 'drink coffee'.",
      "beginner",
    ],
    [
      "work-and-office",
      "ရုံးတွင်းနှင့်အလုပ်ခွင်",
      "ဒီအစီအစဉ်နဲ့ပတ်သက်ပြီး မင်းရဲ့ထင်မြင်ချက်ကို သိချင်ပါတယ်။",
      "I would like to hear your thoughts on this plan.",
      "I'd like to know your opinion on this plan.|I want to hear your thoughts about this plan.",
      "ထင်မြင်ချက် = thoughts / opinion",
      "'I would like to hear your thoughts on...' is polite and natural in meetings.",
      "intermediate",
    ],
    [
      "travel-and-places",
      "ခရီးသွားနှင့်လမ်းညွှန်",
      "ကျွန်တော်တို့ လေယာဉ်ချိန်မီဖို့ စောစောထွက်သင့်တယ်။",
      "We should leave early so we do not miss our flight.",
      "We should leave early to catch our flight on time.|We ought to leave early so we don't miss our flight.",
      "လေယာဉ်ချိန်မီဖို့ = so we don't miss our flight / to catch our flight",
      "Use 'so (that) + subject + verb' to clearly explain the purpose of an action.",
      "advanced",
    ],
  ];

  const lines = [
    CSV_HEADERS.join(","),
    ...sampleRows.map((row) => row.map(escapeCsvCell).join(",")),
  ];

  // Include UTF-8 BOM so Myanmar Unicode renders cleanly in Excel and Numbers
  return `\uFEFF${lines.join("\n")}\n`;
}

export function parseQuestionsCsv(csvText: string): CsvParseResult {
  const records = parseRawCsvRecords(csvText);
  if (records.length === 0) {
    return {
      rows: [],
      errors: [{ rowNumber: 1, message: "CSV file is empty." }],
    };
  }

  const headerRow = records[0].map((cell) =>
    cell.trim().toLowerCase().replace(/\s+/g, "_"),
  );
  const columnIndex = new Map<string, number>();
  headerRow.forEach((name, idx) => {
    columnIndex.set(name, idx);
  });

  const requiredColumns = ["category", "burmese_prompt", "english_answer"];
  const missingColumns = requiredColumns.filter(
    (column) => !columnIndex.has(column),
  );

  if (missingColumns.length > 0) {
    return {
      rows: [],
      errors: [
        {
          rowNumber: 1,
          message: `Missing required header column(s): ${missingColumns.join(", ")}`,
        },
      ],
    };
  }

  const rows: BulkCsvQuestionRow[] = [];
  const errors: CsvParseError[] = [];

  const readCell = (record: string[], column: string): string => {
    const idx = columnIndex.get(column);
    if (idx === undefined) {
      return "";
    }
    return (record[idx] ?? "").trim();
  };

  for (let i = 1; i < records.length; i += 1) {
    const record = records[i];
    const rowNumber = i + 1;

    const category = readCell(record, "category");
    const categoryBurmese = readCell(record, "category_burmese");
    const burmesePrompt = readCell(record, "burmese_prompt");
    const englishAnswer = readCell(record, "english_answer");
    const rawAccepted = readCell(record, "accepted_answers");
    const hint = readCell(record, "hint");
    const grammarNote = readCell(record, "grammar_note");
    const rawDifficulty = readCell(record, "difficulty").toLowerCase();

    if (!category) {
      errors.push({ rowNumber, message: "Category is required." });
      continue;
    }
    if (!burmesePrompt) {
      errors.push({ rowNumber, message: "Burmese prompt is required." });
      continue;
    }
    if (!englishAnswer) {
      errors.push({ rowNumber, message: "English answer is required." });
      continue;
    }

    if (rawDifficulty && !VALID_DIFFICULTIES.has(rawDifficulty as Difficulty)) {
      errors.push({
        rowNumber,
        message: `Invalid difficulty "${rawDifficulty}". Use beginner, intermediate, or advanced.`,
      });
      continue;
    }

    const difficulty: Difficulty = rawDifficulty
      ? (rawDifficulty as Difficulty)
      : "beginner";

    const acceptedAnswers = rawAccepted
      ? rawAccepted
          .split("|")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
      : [];

    rows.push({
      rowNumber,
      category,
      categoryBurmese,
      burmesePrompt,
      englishAnswer,
      acceptedAnswers,
      hint,
      grammarNote,
      difficulty,
    });
  }

  if (rows.length === 0 && errors.length === 0) {
    errors.push({
      rowNumber: 2,
      message: "No data rows found below the CSV header.",
    });
  }

  return { rows, errors };
}

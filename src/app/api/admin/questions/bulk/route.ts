import { NextResponse } from "next/server";
import {
  bulkInsertQuestionsFromCsv,
  listAllQuestions,
} from "@/db/admin-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { parseQuestionsCsv } from "@/lib/csv-questions";
import { guardLocalAdminApiRequest } from "@/lib/local-only";

export async function POST(request: Request) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  try {
    const body = (await request.json()) as { csvText?: unknown };
    if (typeof body.csvText !== "string" || !body.csvText.trim()) {
      return NextResponse.json(
        { error: "CSV content is required." },
        { status: 400 },
      );
    }

    const parsed = parseQuestionsCsv(body.csvText);
    if (parsed.errors.length > 0) {
      return NextResponse.json(
        {
          error: `Found ${parsed.errors.length} CSV validation issue(s). Fix them before importing.`,
          errors: parsed.errors,
        },
        { status: 400 },
      );
    }

    const summary = bulkInsertQuestionsFromCsv(parsed.rows);

    return NextResponse.json(
      {
        summary,
        categories: listCategories(),
        questions: listAllQuestions(),
        stats: getPracticeStats(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Admin failed bulk CSV import:", error);
    return NextResponse.json(
      { error: "Failed to import questions from CSV." },
      { status: 500 },
    );
  }
}

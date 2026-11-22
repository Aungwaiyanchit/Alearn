import { NextResponse } from "next/server";
import { createQuestion, listAllQuestions } from "@/db/admin-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { parseQuestionMutationBody } from "@/lib/admin-validation";
import { guardLocalAdminApiRequest } from "@/lib/local-only";

export async function GET(request: Request) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  return NextResponse.json({
    questions: listAllQuestions(),
    categories: listCategories(),
    stats: getPracticeStats(),
  });
}

export async function POST(request: Request) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  try {
    const body: unknown = await request.json();
    const parsed = parseQuestionMutationBody(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const question = createQuestion(parsed.data);
    return NextResponse.json(
      {
        question,
        questions: listAllQuestions(),
        categories: listCategories(),
        stats: getPracticeStats(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Admin failed to create question:", error);
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 },
    );
  }
}

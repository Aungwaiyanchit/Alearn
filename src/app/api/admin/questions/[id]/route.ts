import { NextResponse } from "next/server";
import {
  deleteQuestionById,
  listAllQuestions,
  updateQuestion,
} from "@/db/admin-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { parseQuestionMutationBody } from "@/lib/admin-validation";
import { guardLocalAdminApiRequest } from "@/lib/local-only";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  try {
    const { id } = await context.params;
    const body: unknown = await request.json();
    const parsed = parseQuestionMutationBody(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const updated = updateQuestion(id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      question: updated,
      questions: listAllQuestions(),
      categories: listCategories(),
      stats: getPracticeStats(),
    });
  } catch (error) {
    console.error("Admin failed to update question:", error);
    return NextResponse.json(
      { error: "Failed to update question" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  try {
    const { id } = await context.params;
    const deleted = deleteQuestionById(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      deletedId: id,
      questions: listAllQuestions(),
      categories: listCategories(),
      stats: getPracticeStats(),
    });
  } catch (error) {
    console.error("Admin failed to delete question:", error);
    return NextResponse.json(
      { error: "Failed to delete question" },
      { status: 500 },
    );
  }
}

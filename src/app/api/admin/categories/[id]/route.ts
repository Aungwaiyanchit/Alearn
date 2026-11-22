import { NextResponse } from "next/server";
import {
  deleteCategoryById,
  listAllQuestions,
  updateCategory,
} from "@/db/admin-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { parseCategoryMutationBody } from "@/lib/admin-validation";
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
    const parsed = parseCategoryMutationBody(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const updated = updateCategory(id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      category: updated,
      categories: listCategories(),
      questions: listAllQuestions(),
      stats: getPracticeStats(),
    });
  } catch (error) {
    console.error("Admin failed to update category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
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
    const deleted = deleteCategoryById(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      deletedId: id,
      categories: listCategories(),
      questions: listAllQuestions(),
      stats: getPracticeStats(),
    });
  } catch (error) {
    console.error("Admin failed to delete category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}

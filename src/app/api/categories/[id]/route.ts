import { NextResponse } from "next/server";
import { deleteRandomCategory, listCategories } from "@/db/repository";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const deleted = deleteRandomCategory(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Custom random category not found" },
        { status: 404 },
      );
    }

    const categories = listCategories();
    return NextResponse.json({ deletedId: id, categories });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}

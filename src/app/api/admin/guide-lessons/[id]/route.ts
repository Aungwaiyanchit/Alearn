import { NextResponse } from "next/server";
import {
  deleteGuideLessonById,
  listGuideLessons,
  updateGuideLesson,
} from "@/db/guide-repository";
import { parseGuideLessonMutationBody } from "@/lib/guide-validation";
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
    const parsed = parseGuideLessonMutationBody(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const updated = updateGuideLesson(id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { error: "Guide lesson not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      lesson: updated,
      guideLessons: listGuideLessons(),
    });
  } catch (error) {
    console.error("Admin failed to update guide lesson:", error);
    return NextResponse.json(
      { error: "Failed to update guide lesson" },
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
    const deleted = deleteGuideLessonById(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Guide lesson not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      deletedId: id,
      guideLessons: listGuideLessons(),
    });
  } catch (error) {
    console.error("Admin failed to delete guide lesson:", error);
    return NextResponse.json(
      { error: "Failed to delete guide lesson" },
      { status: 500 },
    );
  }
}

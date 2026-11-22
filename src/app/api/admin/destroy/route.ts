import { NextResponse } from "next/server";
import { destroyAllData } from "@/db/admin-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { guardLocalAdminApiRequest } from "@/lib/local-only";

export async function DELETE(request: Request) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  try {
    const body = (await request.json()) as { confirmation?: unknown };
    if (body.confirmation !== "DESTROY") {
      return NextResponse.json(
        { error: 'Confirmation text "DESTROY" is required.' },
        { status: 400 },
      );
    }

    const deleted = destroyAllData();

    return NextResponse.json({
      deleted,
      categories: listCategories(),
      questions: [],
      stats: getPracticeStats(),
    });
  } catch (error) {
    console.error("Admin failed to destroy all data:", error);
    return NextResponse.json(
      { error: "Failed to destroy local database content." },
      { status: 500 },
    );
  }
}

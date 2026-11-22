import { NextResponse } from "next/server";
import { createCategory } from "@/db/admin-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { parseCategoryMutationBody } from "@/lib/admin-validation";
import { guardLocalAdminApiRequest } from "@/lib/local-only";

export async function GET(request: Request) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  return NextResponse.json({
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
    const parsed = parseCategoryMutationBody(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const category = createCategory(parsed.data);
    return NextResponse.json(
      {
        category,
        categories: listCategories(),
        stats: getPracticeStats(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Admin failed to create category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}

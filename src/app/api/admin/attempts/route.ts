import { NextResponse } from "next/server";
import { resetAllAttempts } from "@/db/admin-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { guardLocalAdminApiRequest } from "@/lib/local-only";

export async function DELETE(request: Request) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  try {
    const clearedCount = resetAllAttempts();
    return NextResponse.json({
      clearedCount,
      categories: listCategories(),
      stats: getPracticeStats(),
    });
  } catch (error) {
    console.error("Admin failed to reset attempts:", error);
    return NextResponse.json(
      { error: "Failed to reset practice attempts" },
      { status: 500 },
    );
  }
}

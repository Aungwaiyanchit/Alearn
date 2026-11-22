import { NextResponse } from "next/server";
import { generateQuestionsCsvTemplate } from "@/lib/csv-questions";
import { guardLocalAdminApiRequest } from "@/lib/local-only";

export async function GET(request: Request) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  const csvContent = generateQuestionsCsvTemplate();

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="alearn-questions-template.csv"',
      "Cache-Control": "no-store",
    },
  });
}

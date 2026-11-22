import { NextResponse } from "next/server";
import { getQuestionsForCategory } from "@/db/repository";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId") ?? "cat-daily";
    const shuffle = searchParams.get("shuffle") === "true";
    const countParam = searchParams.get("count");
    const count = countParam ? Number.parseInt(countParam, 10) : undefined;

    const questions = getQuestionsForCategory(categoryId, {
      shuffle,
      count: Number.isNaN(count) ? undefined : count,
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Failed to load lesson questions:", error);
    return NextResponse.json(
      { error: "Failed to load lesson questions" },
      { status: 500 },
    );
  }
}
